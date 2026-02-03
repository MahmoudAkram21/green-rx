"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
class DrugInteractionService {
    /**
     * Comprehensive drug interaction and safety check
     */
    async checkDrugSafety(patientId, activeSubstanceId, _tradeNameId) {
        // Fetch patient data with all relevant medical information
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                allergies: true,
                patientDiseases: {
                    include: {
                        disease: {
                            include: {
                                diseaseActiveSubstanceWarnings: {
                                    where: { activeSubstanceId },
                                    include: { activeSubstance: true }
                                }
                            }
                        }
                    }
                },
                prescriptions: {
                    where: { status: { in: ['Approved', 'Filled'] } },
                    include: {
                        tradeName: {
                            include: { activeSubstance: true }
                        }
                    }
                }
            }
        });
        if (!patient) {
            throw new Error('Patient not found');
        }
        // Fetch the active substance being prescribed
        const newDrug = await prisma_1.prisma.activeSubstance.findUnique({
            where: { id: activeSubstanceId }
        });
        if (!newDrug) {
            throw new Error('Active substance not found');
        }
        const warnings = [];
        const alerts = [];
        // 1. Check allergy conflicts
        const allergyCheck = this.checkAllergies(patient.allergies, newDrug);
        if (allergyCheck.length > 0) {
            warnings.push(...allergyCheck);
        }
        // 2. Check disease-medication warnings
        const diseaseCheck = await this.checkDiseaseWarnings(patient, newDrug);
        if (diseaseCheck.length > 0) {
            warnings.push(...diseaseCheck);
        }
        // 3. Check drug-drug interactions with current medications
        const interactionCheck = await this.checkDrugInteractions(patient, newDrug);
        if (interactionCheck.warnings.length > 0) {
            warnings.push(...interactionCheck.warnings);
        }
        if (interactionCheck.alerts.length > 0) {
            alerts.push(...interactionCheck.alerts);
        }
        // 4. Check pregnancy and lactation warnings
        if (patient.pregnancyWarning && newDrug.pregnancyWarning) {
            warnings.push({
                type: 'pregnancy',
                severity: 'high',
                message: `Pregnancy Warning: ${newDrug.pregnancyWarning}`,
                affectedDrug: newDrug.activeSubstance
            });
        }
        if (patient.lactation && newDrug.lactationWarning) {
            warnings.push({
                type: 'lactation',
                severity: 'high',
                message: `Lactation Warning: ${newDrug.lactationWarning}`,
                affectedDrug: newDrug.activeSubstance
            });
        }
        // 5. Check age-based warnings
        const ageCheck = this.checkAgeWarnings(patient, newDrug);
        if (ageCheck.length > 0) {
            warnings.push(...ageCheck);
        }
        // 6. Check organ-specific warnings
        const organCheck = this.checkOrganWarnings(newDrug);
        if (organCheck.length > 0) {
            warnings.push(...organCheck);
        }
        return {
            hasDrugInteractions: interactionCheck.warnings.length > 0 || interactionCheck.alerts.length > 0,
            hasAllergyConflicts: allergyCheck.length > 0,
            hasDiseaseWarnings: diseaseCheck.length > 0,
            hasPregnancyWarnings: (patient.pregnancyWarning || patient.lactation) &&
                (!!newDrug.pregnancyWarning || !!newDrug.lactationWarning),
            hasAgeWarnings: ageCheck.length > 0,
            warnings,
            alerts
        };
    }
    /**
     * Check for allergy conflicts
     */
    checkAllergies(allergies, drug) {
        const warnings = [];
        for (const allergy of allergies) {
            // Check contraindications
            if (Array.isArray(drug.contraindications) &&
                drug.contraindications.some((c) => typeof c === 'string' && c.toLowerCase().includes(allergy.allergen.toLowerCase()))) {
                warnings.push({
                    type: 'allergy',
                    severity: allergy.severity === 'LifeThreatening' ? 'critical' :
                        allergy.severity === 'Severe' ? 'high' : 'medium',
                    message: `ALLERGY ALERT: Patient is allergic to ${allergy.allergen}. ` +
                        `This medication contains or is related to this allergen. ` +
                        `Severity: ${allergy.severity}. Reaction: ${allergy.reactionType || 'Not specified'}`,
                    affectedDrug: drug.activeSubstance
                });
            }
            // Check if allergen name matches drug classification or active substance
            if (drug.activeSubstance?.toLowerCase().includes(allergy.allergen.toLowerCase()) ||
                drug.classification?.toLowerCase().includes(allergy.allergen.toLowerCase())) {
                warnings.push({
                    type: 'allergy',
                    severity: 'critical',
                    message: `CRITICAL ALLERGY: Patient has documented allergy to ${allergy.allergen}. ` +
                        `This medication may cause severe allergic reaction.`,
                    affectedDrug: drug.activeSubstance
                });
            }
        }
        return warnings;
    }
    /**
     * Check disease-medication warnings
     */
    async checkDiseaseWarnings(patient, drug) {
        const warnings = [];
        for (const patientDisease of patient.patientDiseases) {
            const diseaseWarnings = patientDisease.disease.diseaseActiveSubstanceWarnings;
            for (const warning of diseaseWarnings) {
                // Check the specific warning field mentioned in the database
                const warningFieldValue = drug[warning.warningFieldName];
                if (warningFieldValue) {
                    warnings.push({
                        type: 'disease',
                        severity: warning.severity.toLowerCase(),
                        message: `Disease Warning (${patientDisease.disease.name}): ${warning.warningMessage}. ` +
                            `Additional info: ${warningFieldValue}`,
                        affectedDrug: drug.activeSubstance
                    });
                }
            }
            // Additional general disease checks
            if (patientDisease.disease.name.toLowerCase().includes('renal') && drug.renalWarning) {
                warnings.push({
                    type: 'renal',
                    severity: 'high',
                    message: `Renal Disease Warning: ${drug.renalWarning}`,
                    affectedDrug: drug.activeSubstance
                });
            }
            if (patientDisease.disease.name.toLowerCase().includes('liver') ||
                patientDisease.disease.name.toLowerCase().includes('hepatic')) {
                if (drug.hepaticWarning) {
                    warnings.push({
                        type: 'hepatic',
                        severity: 'high',
                        message: `Hepatic Disease Warning: ${drug.hepaticWarning}`,
                        affectedDrug: drug.activeSubstance
                    });
                }
            }
        }
        return warnings;
    }
    /**
     * Check drug-drug interactions
     */
    async checkDrugInteractions(patient, newDrug) {
        const warnings = [];
        const alerts = [];
        // Get current medications
        const currentMeds = patient.prescriptions.map((p) => p.tradeName.activeSubstance);
        for (const currentDrug of currentMeds) {
            // Check various interaction categories
            const interactionChecks = [
                { field: 'drugInteractionStatins', drugClass: 'Statin', drugNames: ['atorvastatin', 'rosuvastatin', 'simvastatin'] },
                { field: 'drugInteractionAntibiotics', drugClass: 'Antibiotic', drugNames: ['amoxicillin', 'azithromycin'] },
                { field: 'drugInteractionAntihypertensive', drugClass: 'Antihypertensive', drugNames: ['amlodipine', 'losartan'] },
                { field: 'drugInteractionNSAIDs', drugClass: 'NSAID', drugNames: ['ibuprofen', 'diclofenac'] },
                { field: 'drugInteractionAnticoagulant', drugClass: 'Anticoagulant', drugNames: ['warfarin'] },
                { field: 'drugInteractionAntidiabetic', drugClass: 'Antidiabetic', drugNames: ['metformin', 'insulin'] }
            ];
            for (const check of interactionChecks) {
                if (this.drugMatchesClass(currentDrug, check.drugNames) && newDrug[check.field]) {
                    const interaction = newDrug[check.field];
                    warnings.push({
                        type: 'interaction',
                        severity: 'high',
                        message: `Drug Interaction with ${check.drugClass}: ${interaction}`,
                        affectedDrug: newDrug.activeSubstance,
                        conflictingDrug: currentDrug.activeSubstance
                    });
                    alerts.push({
                        interactionType: check.drugClass,
                        severity: 'Major',
                        message: `Interaction detected between ${newDrug.activeSubstance} and ${currentDrug.activeSubstance}`,
                        requiresAcknowledgement: true
                    });
                }
            }
        }
        return { warnings, alerts };
    }
    /**
     * Check age-based warnings
     */
    checkAgeWarnings(patient, drug) {
        const warnings = [];
        // Elderly warnings
        if (patient.age >= 65 && drug.specialPopulationElderly) {
            warnings.push({
                type: 'age',
                severity: 'medium',
                message: `Elderly Patient Warning: ${drug.specialPopulationElderly}`,
                affectedDrug: drug.activeSubstance
            });
        }
        // Pediatric warnings
        if (patient.age < 18 && drug.specialPopulationChildren) {
            warnings.push({
                type: 'age',
                severity: 'medium',
                message: `Pediatric Warning: ${drug.specialPopulationChildren}`,
                affectedDrug: drug.activeSubstance
            });
        }
        // Check pediatric dosing
        if (patient.age < 18 && !drug.pediatricDose) {
            warnings.push({
                type: 'age',
                severity: 'high',
                message: `No pediatric dosing information available for this medication. ` +
                    `Consultation with specialist recommended.`,
                affectedDrug: drug.activeSubstance
            });
        }
        return warnings;
    }
    /**
     * Check organ-specific warnings
     */
    checkOrganWarnings(drug) {
        const warnings = [];
        const organChecks = [
            { warning: drug.cardiacWarning, type: 'Cardiac' },
            { warning: drug.nervousSystemWarning, type: 'Nervous System' },
            { warning: drug.pulmonaryWarning, type: 'Pulmonary' },
            { warning: drug.gitWarning, type: 'GI Tract' }
        ];
        for (const check of organChecks) {
            if (check.warning) {
                warnings.push({
                    type: 'disease',
                    severity: 'medium',
                    message: `${check.type} Warning: ${check.warning}`,
                    affectedDrug: drug.activeSubstance
                });
            }
        }
        return warnings;
    }
    /**
     * Helper method to check if drug matches a class
     */
    drugMatchesClass(drug, drugNames) {
        const drugLower = drug.activeSubstance?.toLowerCase() || '';
        const classLower = drug.classification?.toLowerCase() || '';
        return drugNames.some(name => drugLower.includes(name.toLowerCase()) ||
            classLower.includes(name.toLowerCase()));
    }
    /**
     * Create drug interaction alert in database
     */
    async createDrugInteractionAlert(prescriptionId, interactingMedicineId, interactionType, severity, message) {
        return await prisma_1.prisma.drugInteractionAlert.create({
            data: {
                prescriptionId,
                interactingMedicineId,
                interactionType,
                severity,
                message,
                acknowledgedByDoctor: false,
                acknowledgedByPatient: false
            }
        });
    }
}
exports.default = new DrugInteractionService();
//# sourceMappingURL=drugInteraction.service.js.map