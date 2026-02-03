"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWarnings = generateWarnings;
exports.checkBatchInteractions = checkBatchInteractions;
const prisma_1 = require("../lib/prisma");
const client_1 = require("../generated/client");
/**
 * Generate comprehensive warnings for a prescription based on patient profile
 */
async function generateWarnings(patientId, tradeNameId) {
    const warnings = [];
    let blocked = false;
    // Get complete patient profile
    const patient = await prisma_1.prisma.patient.findUnique({
        where: { id: patientId },
        include: {
            allergies: true,
            patientDiseases: {
                where: { status: 'Active' },
                include: {
                    disease: {
                        include: {
                            diseaseWarningRules: true
                        }
                    }
                }
            },
            medicalHistories: {
                include: {
                    disease: {
                        include: {
                            diseaseWarningRules: true
                        }
                    }
                }
            },
            familyHistories: {
                include: {
                    disease: true
                }
            },
            prescriptions: {
                where: {
                    status: { in: ['Approved', 'Filled'] },
                    validUntil: { gte: new Date() }
                },
                include: {
                    tradeName: {
                        include: {
                            activeSubstance: true
                        }
                    }
                }
            }
        }
    });
    if (!patient) {
        throw new Error('Patient not found');
    }
    // Get medicine details
    const tradeName = await prisma_1.prisma.tradeName.findUnique({
        where: { id: tradeNameId },
        include: {
            activeSubstance: true
        }
    });
    if (!tradeName) {
        throw new Error('Medicine not found');
    }
    const activeSubstance = tradeName.activeSubstance;
    // ============================================
    // CHECK 1: ALLERGY WARNINGS (CRITICAL)
    // ============================================
    const allergyWarnings = checkAllergyWarnings(patient, tradeName, activeSubstance);
    warnings.push(...allergyWarnings.warnings);
    if (allergyWarnings.blocked) {
        blocked = true;
    }
    // ============================================
    // CHECK 2: DISEASE CONTRAINDICATION (via DiseaseWarningRule)
    // ============================================
    const diseaseWarnings = await checkDiseaseWarningRules(patient, activeSubstance.id);
    warnings.push(...diseaseWarnings.warnings);
    if (diseaseWarnings.blocked) {
        blocked = true;
    }
    // ============================================
    // CHECK 3: PREGNANCY WARNINGS
    // ============================================
    if (patient.gender === 'Female' && patient.pregnancyWarning) {
        const pregnancyWarnings = checkPregnancyWarnings(activeSubstance);
        warnings.push(...pregnancyWarnings);
    }
    // ============================================
    // CHECK 4: LACTATION WARNINGS
    // ============================================
    if (patient.gender === 'Female' && patient.lactation) {
        const lactationWarnings = checkLactationWarnings(activeSubstance);
        warnings.push(...lactationWarnings);
    }
    // ============================================
    // CHECK 5: AGE-BASED WARNINGS
    // ============================================
    const ageWarnings = checkAgeWarnings(patient, activeSubstance);
    warnings.push(...ageWarnings);
    // ============================================
    // CHECK 6: ORGAN-SPECIFIC WARNINGS (Renal/Hepatic)
    // ============================================
    const organWarnings = checkOrganWarnings(patient, activeSubstance);
    warnings.push(...organWarnings);
    // ============================================
    // CHECK 7: DRUG-DRUG INTERACTION WARNINGS
    // ============================================
    const interactionWarnings = checkDrugInteractions(patient, activeSubstance);
    warnings.push(...interactionWarnings);
    // ============================================
    // CHECK 8: FAMILY HISTORY RISK WARNINGS
    // ============================================
    const familyWarnings = checkFamilyHistoryRisks(patient);
    warnings.push(...familyWarnings);
    return {
        blocked,
        warnings: warnings.sort((a, b) => {
            // Sort by severity: Critical > High > Medium > Low > Info
            const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3, Info: 4 };
            return severityOrder[a.severity] - severityOrder[b.severity];
        })
    };
}
// ============================================
// HELPER FUNCTIONS FOR EACH WARNING TYPE
// ============================================
function checkAllergyWarnings(patient, tradeName, activeSubstance) {
    const warnings = [];
    let blocked = false;
    for (const allergy of patient.allergies) {
        const allergenLower = allergy.allergen.toLowerCase();
        const substanceLower = activeSubstance.activeSubstance.toLowerCase();
        const tradeNameLower = tradeName.title.toLowerCase();
        if (substanceLower.includes(allergenLower) || tradeNameLower.includes(allergenLower)) {
            const severity = allergy.severity === 'LifeThreatening' || allergy.severity === 'Severe'
                ? client_1.WarningSeverity.Critical
                : client_1.WarningSeverity.High;
            warnings.push({
                severity,
                type: 'AllergyWarning',
                message: `⚠️ ALLERGY ALERT: Patient is allergic to ${allergy.allergen}. ${allergy.reaction || 'Severe allergic reaction possible.'}`,
                blocked: severity === client_1.WarningSeverity.Critical
            });
            if (severity === client_1.WarningSeverity.Critical) {
                blocked = true;
            }
        }
    }
    return { warnings, blocked };
}
async function checkDiseaseWarningRules(patient, activeSubstanceId) {
    const warnings = [];
    let blocked = false;
    // Collect all diseases (current + medical history)
    const allDiseases = [
        ...patient.patientDiseases.map((pd) => pd.disease),
        ...patient.medicalHistories
            .filter((mh) => mh.status === 'Active' || mh.status === 'Chronic')
            .map((mh) => mh.disease)
    ];
    for (const disease of allDiseases) {
        if (!disease.diseaseWarningRules || disease.diseaseWarningRules.length === 0) {
            continue;
        }
        for (const rule of disease.diseaseWarningRules) {
            // Check if rule applies to this medicine
            let ruleApplies = false;
            if (rule.ruleType === client_1.WarningRuleType.BLOCK_ACTIVE_SUBSTANCE ||
                rule.ruleType === client_1.WarningRuleType.WARN_ACTIVE_SUBSTANCE) {
                if (rule.targetActiveSubstanceId === activeSubstanceId) {
                    ruleApplies = true;
                }
            }
            else if (rule.ruleType === client_1.WarningRuleType.BLOCK_DRUG_CLASS ||
                rule.ruleType === client_1.WarningRuleType.REQUIRE_MONITORING ||
                rule.ruleType === client_1.WarningRuleType.REQUIRE_SPECIALIST_APPROVAL) {
                // These apply to all medicines for this disease
                ruleApplies = true;
            }
            if (ruleApplies) {
                warnings.push({
                    severity: rule.severity,
                    type: 'DiseaseContraindication',
                    message: rule.warningMessage,
                    blocked: rule.autoBlock,
                    diseaseId: disease.id,
                    diseaseName: disease.name,
                    requiredTests: rule.requiredMonitoring || undefined
                });
                if (rule.autoBlock) {
                    blocked = true;
                }
            }
        }
    }
    return { warnings, blocked };
}
function checkPregnancyWarnings(activeSubstance) {
    const warnings = [];
    if (activeSubstance.pregnancyWarning) {
        const warningData = typeof activeSubstance.pregnancyWarning === 'string'
            ? activeSubstance.pregnancyWarning
            : JSON.stringify(activeSubstance.pregnancyWarning);
        warnings.push({
            severity: client_1.WarningSeverity.High,
            type: 'PregnancyWarning',
            message: `🤰 PREGNANCY WARNING: ${warningData}`
        });
    }
    if (activeSubstance.pregnancyCategory) {
        const category = activeSubstance.pregnancyCategory.toUpperCase();
        if (category === 'D' || category === 'X') {
            warnings.push({
                severity: client_1.WarningSeverity.Critical,
                type: 'PregnancyWarning',
                message: `🚫 PREGNANCY CATEGORY ${category}: Contraindicated in pregnancy. Consult doctor immediately.`
            });
        }
        else if (category === 'C') {
            warnings.push({
                severity: client_1.WarningSeverity.High,
                type: 'PregnancyWarning',
                message: `⚠️ PREGNANCY CATEGORY C: Use with caution. Consult your doctor.`
            });
        }
    }
    return warnings;
}
function checkLactationWarnings(activeSubstance) {
    const warnings = [];
    if (activeSubstance.lactationWarning) {
        const warningData = typeof activeSubstance.lactationWarning === 'string'
            ? activeSubstance.lactationWarning
            : JSON.stringify(activeSubstance.lactationWarning);
        warnings.push({
            severity: client_1.WarningSeverity.High,
            type: 'LactationWarning',
            message: `🤱 BREASTFEEDING WARNING: ${warningData}`
        });
    }
    return warnings;
}
function checkAgeWarnings(patient, activeSubstance) {
    const warnings = [];
    // Pediatric warnings
    if (patient.ageClassification === 'Children' ||
        patient.ageClassification === 'Infants' ||
        patient.ageClassification === 'Toddlers' ||
        patient.ageClassification === 'Neonates') {
        if (activeSubstance.pediatricDose) {
            warnings.push({
                severity: client_1.WarningSeverity.Medium,
                type: 'PediatricWarning',
                message: `👶 PEDIATRIC DOSING: ${activeSubstance.pediatricDose}`
            });
        }
        else {
            warnings.push({
                severity: client_1.WarningSeverity.High,
                type: 'PediatricWarning',
                message: `⚠️ AGE WARNING: Pediatric dosing information not available. Consult pediatrician.`
            });
        }
    }
    // Geriatric warnings
    if (patient.ageClassification === 'Elderly') {
        warnings.push({
            severity: client_1.WarningSeverity.Medium,
            type: 'GeriatricWarning',
            message: `👴 ELDERLY WARNING: Dose adjustment may be required for elderly patients. Monitor closely.`
        });
    }
    return warnings;
}
function checkOrganWarnings(patient, activeSubstance) {
    const warnings = [];
    // Check for kidney disease
    const hasRenalDisease = patient.patientDiseases.some((pd) => pd.disease.name.toLowerCase().includes('kidney') ||
        pd.disease.name.toLowerCase().includes('renal') ||
        pd.disease.name.toLowerCase().includes('ckd'));
    if (hasRenalDisease && activeSubstance.renalWarning) {
        const warningData = typeof activeSubstance.renalWarning === 'string'
            ? activeSubstance.renalWarning
            : JSON.stringify(activeSubstance.renalWarning);
        warnings.push({
            severity: client_1.WarningSeverity.High,
            type: 'RenalWarning',
            message: `🚫 KIDNEY WARNING: ${warningData}`
        });
    }
    // Check for liver disease
    const hasHepaticDisease = patient.patientDiseases.some((pd) => pd.disease.name.toLowerCase().includes('liver') ||
        pd.disease.name.toLowerCase().includes('hepatic') ||
        pd.disease.name.toLowerCase().includes('cirrhosis'));
    if (hasHepaticDisease && activeSubstance.hepaticWarning) {
        const warningData = typeof activeSubstance.hepaticWarning === 'string'
            ? activeSubstance.hepaticWarning
            : JSON.stringify(activeSubstance.hepaticWarning);
        warnings.push({
            severity: client_1.WarningSeverity.High,
            type: 'HepaticWarning',
            message: `🚫 LIVER WARNING: ${warningData}`
        });
    }
    return warnings;
}
function checkDrugInteractions(patient, newSubstance) {
    const warnings = [];
    // Complete list of all 28 drug interaction types from schema
    const interactionFields = [
        // Critical/High severity interactions
        { field: 'interactionAnticoagulant', type: 'Anticoagulants', severity: client_1.WarningSeverity.High },
        { field: 'interactionAntidiabetic', type: 'Antidiabetics', severity: client_1.WarningSeverity.High },
        { field: 'interactionAntidepressant', type: 'Antidepressants', severity: client_1.WarningSeverity.High },
        { field: 'interactionChemotherapy', type: 'Chemotherapy', severity: client_1.WarningSeverity.High },
        { field: 'interactionHIVProtease', type: 'HIV Protease Inhibitors', severity: client_1.WarningSeverity.High },
        { field: 'interactionImmunosuppressive', type: 'Immunosuppressives', severity: client_1.WarningSeverity.High },
        { field: 'interactionDigoxin', type: 'Digoxin/Cardiac Glycosides', severity: client_1.WarningSeverity.High },
        // Medium severity interactions
        { field: 'interactionAntibiotics', type: 'Antibiotics', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionNSAIDs', type: 'NSAIDs/Pain Relievers', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionAntihypertensive', type: 'Antihypertensives', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionCorticosteroids', type: 'Corticosteroids', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionStatins', type: 'Statins', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionHormones', type: 'Hormones/Antihormones', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionAntiParkinson', type: 'Anti-Parkinson Drugs', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionXanthines', type: 'Xanthines (Theophylline/Caffeine)', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionSympathomimetics', type: 'Sympathomimetics', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionAnticholinergic', type: 'Anticholinergics', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionLowBloodSugarAgents', type: 'Low Blood Sugar Agents', severity: client_1.WarningSeverity.Medium },
        // Low severity interactions (monitoring recommended)
        { field: 'interactionVitaminsFood', type: 'Vitamins/Food/Supplements', severity: client_1.WarningSeverity.Low },
        { field: 'interactionBisphosphonates', type: 'Bisphosphonates', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAlcohol', type: 'Alcohol', severity: client_1.WarningSeverity.Low },
        { field: 'interactionMuscleRelaxant', type: 'Muscle Relaxants', severity: client_1.WarningSeverity.Low },
        { field: 'interactionRetinoids', type: 'Retinoids', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAntidiuretics', type: 'Antidiuretics/Laxatives', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAntacids', type: 'Antacids', severity: client_1.WarningSeverity.Low },
        { field: 'interactionUricosurics', type: 'Uricosurics', severity: client_1.WarningSeverity.Low },
        { field: 'interactionProtectants', type: 'Protectants (Sucralfate)', severity: client_1.WarningSeverity.Low },
        { field: 'interactionBloodProduct', type: 'Blood Products/Immunoglobulin', severity: client_1.WarningSeverity.Low },
        { field: 'interactionVaccines', type: 'Vaccines', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAnthelmintics', type: 'Anthelmintics/Antimalarials', severity: client_1.WarningSeverity.Low },
        { field: 'interactionPDE5Inhibitors', type: 'PDE5 Inhibitors', severity: client_1.WarningSeverity.Low }
    ];
    for (const currentRx of patient.prescriptions) {
        const currentSubstance = currentRx.tradeName.activeSubstance;
        for (const { field, type, severity } of interactionFields) {
            const interactionData = newSubstance[field];
            if (interactionData && Array.isArray(interactionData) && interactionData.length > 0) {
                const hasInteraction = interactionData.some((item) => typeof item === 'string' &&
                    currentSubstance.activeSubstance.toLowerCase().includes(item.toLowerCase()));
                if (hasInteraction) {
                    warnings.push({
                        severity,
                        type: 'DrugInteraction',
                        message: `💊 DRUG INTERACTION: May interact with ${currentSubstance.activeSubstance} (${type}). Monitor closely.`
                    });
                }
            }
        }
    }
    return warnings;
}
function checkFamilyHistoryRisks(patient) {
    const warnings = [];
    // Check if family members had adverse reactions
    for (const familyHistory of patient.familyHistories) {
        const diseaseName = familyHistory.disease.name.toLowerCase();
        // Simple heuristic: warn if family member had severe allergic reactions
        if ((diseaseName.includes('allergy') || diseaseName.includes('anaphylaxis')) &&
            familyHistory.severity === 'Severe') {
            warnings.push({
                severity: client_1.WarningSeverity.Low,
                type: 'FamilyHistoryRisk',
                message: `👨‍👩‍👧 FAMILY HISTORY: ${familyHistory.relation} had severe allergic reactions. Monitor for similar reactions.`
            });
        }
    }
    return warnings;
}
/**
 * Check for drug interactions WITHIN a batch of medicines being prescribed together
 * This prevents dangerous combinations in the same prescription
 */
async function checkBatchInteractions(medicineIds) {
    const warnings = [];
    if (medicineIds.length < 2) {
        return warnings; // No interactions possible with single medicine
    }
    // Fetch all active substances for the medicines
    const medicines = await prisma_1.prisma.tradeName.findMany({
        where: { id: { in: medicineIds } },
        include: { activeSubstance: true }
    });
    // Check each medicine against all others in the batch
    for (let i = 0; i < medicines.length; i++) {
        for (let j = i + 1; j < medicines.length; j++) {
            const medicine1 = medicines[i];
            const medicine2 = medicines[j];
            // Check if medicine1 interacts with medicine2's active substance
            const interactionChecks = checkInteractionBetweenTwo(medicine1.activeSubstance, medicine2.activeSubstance, medicine1.title, medicine2.title);
            warnings.push(...interactionChecks);
        }
    }
    return warnings;
}
/**
 * Check interaction between two specific active substances
 */
function checkInteractionBetweenTwo(substance1, substance2, name1, name2) {
    const warnings = [];
    const interactionFields = [
        { field: 'interactionAnticoagulant', type: 'Anticoagulants', severity: client_1.WarningSeverity.High },
        { field: 'interactionAntidiabetic', type: 'Antidiabetics', severity: client_1.WarningSeverity.High },
        { field: 'interactionAntidepressant', type: 'Antidepressants', severity: client_1.WarningSeverity.High },
        { field: 'interactionChemotherapy', type: 'Chemotherapy', severity: client_1.WarningSeverity.High },
        { field: 'interactionHIVProtease', type: 'HIV Protease Inhibitors', severity: client_1.WarningSeverity.High },
        { field: 'interactionImmunosuppressive', type: 'Immunosuppressives', severity: client_1.WarningSeverity.High },
        { field: 'interactionDigoxin', type: 'Digoxin/Cardiac Glycosides', severity: client_1.WarningSeverity.High },
        { field: 'interactionAntibiotics', type: 'Antibiotics', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionNSAIDs', type: 'NSAIDs/Pain Relievers', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionAntihypertensive', type: 'Antihypertensives', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionCorticosteroids', type: 'Corticosteroids', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionStatins', type: 'Statins', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionHormones', type: 'Hormones/Antihormones', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionAntiParkinson', type: 'Anti-Parkinson Drugs', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionXanthines', type: 'Xanthines', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionSympathomimetics', type: 'Sympathomimetics', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionAnticholinergic', type: 'Anticholinergics', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionLowBloodSugarAgents', type: 'Low Blood Sugar Agents', severity: client_1.WarningSeverity.Medium },
        { field: 'interactionVitaminsFood', type: 'Vitamins/Food/Supplements', severity: client_1.WarningSeverity.Low },
        { field: 'interactionBisphosphonates', type: 'Bisphosphonates', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAlcohol', type: 'Alcohol', severity: client_1.WarningSeverity.Low },
        { field: 'interactionMuscleRelaxant', type: 'Muscle Relaxants', severity: client_1.WarningSeverity.Low },
        { field: 'interactionRetinoids', type: 'Retinoids', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAntidiuretics', type: 'Antidiuretics/Laxatives', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAntacids', type: 'Antacids', severity: client_1.WarningSeverity.Low },
        { field: 'interactionUricosurics', type: 'Uricosurics', severity: client_1.WarningSeverity.Low },
        { field: 'interactionProtectants', type: 'Protectants', severity: client_1.WarningSeverity.Low },
        { field: 'interactionBloodProduct', type: 'Blood Products/Immunoglobulin', severity: client_1.WarningSeverity.Low },
        { field: 'interactionVaccines', type: 'Vaccines', severity: client_1.WarningSeverity.Low },
        { field: 'interactionAnthelmintics', type: 'Anthelmintics/Antimalarials', severity: client_1.WarningSeverity.Low },
        { field: 'interactionPDE5Inhibitors', type: 'PDE5 Inhibitors', severity: client_1.WarningSeverity.Low }
    ];
    // Check both directions (substance1 might interact with substance2, or vice versa)
    for (const { field, type, severity } of interactionFields) {
        // Check if substance1 has interaction data for substance2
        const interactionData1 = substance1[field];
        if (interactionData1 && Array.isArray(interactionData1) && interactionData1.length > 0) {
            const hasInteraction = interactionData1.some((item) => typeof item === 'string' &&
                substance2.activeSubstance.toLowerCase().includes(item.toLowerCase()));
            if (hasInteraction) {
                warnings.push({
                    severity,
                    type: 'BatchDrugInteraction',
                    message: `⚠️ SAME PRESCRIPTION INTERACTION: ${name1} may interact with ${name2} (${type}). Review combination.`
                });
            }
        }
        // Check reverse direction
        const interactionData2 = substance2[field];
        if (interactionData2 && Array.isArray(interactionData2) && interactionData2.length > 0) {
            const hasInteraction = interactionData2.some((item) => typeof item === 'string' &&
                substance1.activeSubstance.toLowerCase().includes(item.toLowerCase()));
            if (hasInteraction) {
                warnings.push({
                    severity,
                    type: 'BatchDrugInteraction',
                    message: `⚠️ SAME PRESCRIPTION INTERACTION: ${name2} may interact with ${name1} (${type}). Review combination.`
                });
            }
        }
    }
    return warnings;
}
//# sourceMappingURL=warningService.js.map