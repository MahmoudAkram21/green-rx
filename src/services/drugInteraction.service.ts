import { prisma } from '../lib/prisma';
import {
    ActiveSubstance,
    Patient,
} from '../../generated/client/client';

interface DrugInteractionCheck {
    hasDrugInteractions: boolean;
    hasAllergyConflicts: boolean;
    hasDiseaseWarnings: boolean;
    hasPregnancyWarnings: boolean;
    hasAgeWarnings: boolean;
    hasLifestyleWarnings: boolean;
    warnings: DrugWarning[];
    alerts: DrugAlert[];
}

interface DrugWarning {
    type: 'interaction' | 'allergy' | 'disease' | 'pregnancy' | 'lactation' | 'age' | 'renal' | 'hepatic' | 'lifestyle';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    affectedDrug?: string;
    conflictingDrug?: string;
}

interface DrugAlert {
    interactionType: string;
    severity: string;
    message: string;
    requiresAcknowledgement: boolean;
}

class DrugInteractionService {
    /**
     * Comprehensive drug interaction and safety check
     */
    async checkDrugSafety(
        patientId: number,
        activeSubstanceId: number,
        _tradeNameId?: number
    ): Promise<DrugInteractionCheck> {
        // Fetch patient data with all relevant medical information (prescriptions + self-reported medicines)
        const patient = await prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                allergyReports: {
                    include: {
                        patientAllergies: { include: { allergen: true } },
                        activeSubstancePatientAllergies: { include: { activeSubstance: true } },
                        tradeName: { include: { activeSubstance: true } }
                    }
                },
                patientLifestyles: { include: { lifestyle: true } },
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
                        prescriptionMedicines: {
                            include: {
                                patientMedicine: {
                                    include: {
                                        tradeName: { include: { activeSubstance: true } },
                                        activeSubstance: true
                                    }
                                }
                            }
                        }
                    }
                },
                medicines: {
                    where: { isOngoing: true },
                    include: {
                        tradeName: { include: { activeSubstance: true } },
                        activeSubstance: true
                    }
                }
            }
        });

        if (!patient) {
            throw new Error('Patient not found');
        }

        // Fetch the active substance being prescribed
        const newDrug = await prisma.activeSubstance.findUnique({
            where: { id: activeSubstanceId }
        });

        if (!newDrug) {
            throw new Error('Active substance not found');
        }

        const warnings: DrugWarning[] = [];
        const alerts: DrugAlert[] = [];

        // 1. Check allergy conflicts
        const report = (patient as any).allergyReports;
        const normalizedPatientAllergies = [
            ...((report?.patientAllergies ?? []).map((x: any) => ({
                reaction: report?.reaction ?? null,
                allergenId: x.allergenId ?? null,
                activeSubstanceId: null,
                tradeNameId: null,
                allergen: x.allergen ?? null,
                activeSubstance: null,
                tradeName: null
            }))),
            ...((report?.activeSubstancePatientAllergies ?? []).map((x: any) => ({
                reaction: report?.reaction ?? null,
                allergenId: null,
                activeSubstanceId: x.activeSubstanceId ?? null,
                tradeNameId: null,
                allergen: null,
                activeSubstance: x.activeSubstance ?? null,
                tradeName: null
            }))),
            ...(report?.tradeName ? [{
                reaction: report?.reaction ?? null,
                allergenId: null,
                activeSubstanceId: null,
                tradeNameId: report.tradeNameId ?? null,
                allergen: null,
                activeSubstance: null,
                tradeName: report.tradeName
            }] : [])
        ];
        const allergyCheck = this.checkAllergies(normalizedPatientAllergies, newDrug, _tradeNameId);
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
                affectedDrug: newDrug.name
            });
        }

        if (patient.lactation && newDrug.lactationWarning) {
            warnings.push({
                type: 'lactation',
                severity: 'high',
                message: `Lactation Warning: ${newDrug.lactationWarning}`,
                affectedDrug: newDrug.name
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

        // 7. Check lifestyle-based warnings (e.g. alcohol, caffeine)
        const lifestyleCheck = this.checkLifestyleWarnings((patient as any).patientLifestyles ?? [], newDrug);
        if (lifestyleCheck.length > 0) {
            warnings.push(...lifestyleCheck);
        }

        return {
            hasDrugInteractions: interactionCheck.warnings.length > 0 || interactionCheck.alerts.length > 0,
            hasAllergyConflicts: allergyCheck.length > 0,
            hasDiseaseWarnings: diseaseCheck.length > 0,
            hasPregnancyWarnings: (patient.pregnancyWarning || patient.lactation) &&
                (!!newDrug.pregnancyWarning || !!newDrug.lactationWarning),
            hasAgeWarnings: ageCheck.length > 0,
            hasLifestyleWarnings: lifestyleCheck.length > 0,
            warnings,
            alerts
        };
    }

    /**
     * Check lifestyle-based drug warnings (patient indicated e.g. alcohol use; drug has interaction field set).
     */
    private checkLifestyleWarnings(
        patientLifestyles: Array<{ value: boolean; lifestyle: { question: string; activeSubstanceField: string } }>,
        drug: ActiveSubstance
    ): DrugWarning[] {
        const warnings: DrugWarning[] = [];
        for (const pl of patientLifestyles) {
            if (!pl.value) continue;
            const fieldName = pl.lifestyle?.activeSubstanceField;
            if (!fieldName) continue;
            const fieldValue = (drug as any)[fieldName];
            if (fieldValue == null || fieldValue === '') continue;
            let message = fieldValue;
            if (typeof fieldValue === 'object' && fieldValue !== null && 'en' in fieldValue) {
                message = (fieldValue as { en?: string }).en ?? JSON.stringify(fieldValue);
            } else if (typeof fieldValue !== 'string') {
                message = String(fieldValue);
            }
            warnings.push({
                type: 'lifestyle',
                severity: 'medium',
                message: `Lifestyle: Patient indicated "${pl.lifestyle.question}". This medicine has a relevant warning: ${message}`,
                affectedDrug: drug.name
            });
        }
        return warnings;
    }

    /**
     * Check for allergy conflicts.
     * Handles catalog allergens (allergenId), active substance allergies (activeSubstanceId), and trade name allergies (tradeNameId).
     */
    private checkAllergies(
        patientAllergies: Array<{
            reaction: string | null;
            allergenId: number | null;
            activeSubstanceId: number | null;
            tradeNameId: number | null;
            allergen: { name: string } | null;
            activeSubstance: { id: number; name: string } | null;
            tradeName: { id: number; title: string; activeSubstanceId: number; activeSubstance: { id: number; name: string } | null } | null;
        }>,
        drug: ActiveSubstance,
        tradeNameId?: number
    ): DrugWarning[] {
        const warnings: DrugWarning[] = [];
        const drugSubstanceLower = (drug.name ?? '').toLowerCase();
        const drugClassLower = String(drug.classificationId ?? '').toLowerCase();

        for (const pa of patientAllergies) {
            let matched = false;
            let allergyLabel = '';

            if (pa.activeSubstanceId !== null) {
                // Direct active substance FK match
                if (pa.activeSubstanceId === drug.id) {
                    matched = true;
                    allergyLabel = pa.activeSubstance?.name ?? `ActiveSubstance#${pa.activeSubstanceId}`;
                }
            } else if (pa.tradeNameId !== null) {
                // Trade name FK match: match if same trade name OR same underlying active substance
                if (pa.tradeNameId === tradeNameId) {
                    matched = true;
                    allergyLabel = pa.tradeName?.title ?? `TradeName#${pa.tradeNameId}`;
                } else if (pa.tradeName?.activeSubstance?.id === drug.id) {
                    matched = true;
                    allergyLabel = `${pa.tradeName?.title ?? ''} (active substance: ${pa.tradeName?.activeSubstance?.name ?? ''})`;
                }
            } else if (pa.allergen) {
                const allergenName = pa.allergen.name ?? '';
                const allergenLower = allergenName.toLowerCase();
                if (allergenLower &&
                    (drugSubstanceLower.includes(allergenLower) || allergenLower.includes(drugSubstanceLower) || drugClassLower.includes(allergenLower))
                ) {
                    matched = true;
                    allergyLabel = allergenName;
                }
            }

            if (matched) {
                // Check contraindications for additional context
                const inContraindications = Array.isArray(drug.contraindications) &&
                    drug.contraindications.some((c: any) =>
                        typeof c === 'string' && c.toLowerCase().includes(allergyLabel.toLowerCase())
                    );

                warnings.push({
                    type: 'allergy',
                    severity: inContraindications ? 'critical' : 'high',
                    message: `ALLERGY ALERT: Patient has a documented allergy to ${allergyLabel}. ` +
                        `Reaction: ${pa.reaction || 'Not specified'}`,
                        affectedDrug: drug.name
                });
            }
        }

        return warnings;
    }

    /**
     * Check disease-medication warnings
     */
    private async checkDiseaseWarnings(
        patient: any,
        drug: ActiveSubstance
    ): Promise<DrugWarning[]> {
        const warnings: DrugWarning[] = [];

        for (const patientDisease of patient.patientDiseases) {
            const diseaseWarnings = patientDisease.disease.diseaseActiveSubstanceWarnings;

            // Check database-driven warnings only
            for (const warning of diseaseWarnings) {
                const warningFieldValue = (drug as any)[warning.warningFieldName];

                if (warningFieldValue) {
                    warnings.push({
                        type: 'disease',
                        severity: warning.severity.toLowerCase() as any,
                        message: `Disease Warning (${patientDisease.disease.name}): ${warning.warningMessage}. ` +
                            `Additional info: ${warningFieldValue}`,
                        affectedDrug: drug.name
                    });
                }
            }
        }

        return warnings;
    }

    /**
     * Check drug-drug interactions
     */
    private async checkDrugInteractions(patient: any, newDrug: ActiveSubstance): Promise<{
        warnings: DrugWarning[];
        alerts: DrugAlert[];
    }> {
        const warnings: DrugWarning[] = [];
        const alerts: DrugAlert[] = [];

        // Get current medications from prescriptions (via prescriptionMedicines) and self-reported PatientMedicine (ongoing)
        const fromPrescriptions: ActiveSubstance[] = [];
        for (const p of patient.prescriptions || []) {
            for (const link of (p as any).prescriptionMedicines ?? []) {
                const pm = (link as any).patientMedicine;
                const asub = pm?.tradeName?.activeSubstance ?? pm?.activeSubstance;
                if (asub) fromPrescriptions.push(asub);
            }
        }
        const fromMedicines = (patient.medicines || []).map((m: any) => m.tradeName?.activeSubstance ?? m.activeSubstance).filter(Boolean);
        const currentMeds = [...fromPrescriptions, ...fromMedicines];

        // All interaction fields from the database schema
        const jsonInteractionFields = [
            'interactionVitaminsFood', 'interactionBisphosphonates', 'interactionAlcohol',
            'interactionMuscleRelaxant', 'interactionRetinoids', 'interactionCorticosteroids',
            'interactionXanthines', 'interactionSympathomimetics', 'interactionAnticholinergic',
            'interactionChemotherapy', 'interactionAntibiotics', 'interactionHormones',
            'interactionStatins', 'interactionAntihypertensive', 'interactionAntidiuretics',
            'interactionAntidepressant', 'interactionAntidiabetic', 'interactionLowBloodSugarAgents',
            'interactionDigoxin', 'interactionAnticoagulant', 'interactionNSAIDs',
            'interactionImmunosuppressive', 'interactionAntacids', 'interactionUricosurics',
            'interactionProtectants', 'interactionAntiParkinson', 'interactionHIVProtease',
            'interactionBloodProduct', 'interactionVaccines', 'interactionAnthelmintics',
            'interactionPDE5Inhibitors'
        ];

        const stringInteractionFields = ['ironChelator'];

        // Field name to readable class mapping
        const fieldToClassMap: { [key: string]: string } = {
            'interactionVitaminsFood': 'Vitamins/Food',
            'interactionBisphosphonates': 'Bisphosphonate',
            'interactionAlcohol': 'Alcohol',
            'interactionMuscleRelaxant': 'Muscle Relaxant',
            'interactionRetinoids': 'Retinoid',
            'interactionCorticosteroids': 'Corticosteroid',
            'interactionXanthines': 'Xanthine',
            'interactionSympathomimetics': 'Sympathomimetic',
            'interactionAnticholinergic': 'Anticholinergic',
            'interactionChemotherapy': 'Chemotherapy',
            'interactionAntibiotics': 'Antibiotic',
            'interactionHormones': 'Hormone',
            'interactionStatins': 'Statin',
            'interactionAntihypertensive': 'Antihypertensive',
            'interactionAntidiuretics': 'Antidiuretic',
            'interactionAntidepressant': 'Antidepressant',
            'interactionAntidiabetic': 'Antidiabetic',
            'interactionLowBloodSugarAgents': 'Low Blood Sugar Agent',
            'interactionDigoxin': 'Digoxin',
            'interactionAnticoagulant': 'Anticoagulant',
            'interactionNSAIDs': 'NSAID',
            'interactionImmunosuppressive': 'Immunosuppressive',
            'interactionAntacids': 'Antacid',
            'interactionUricosurics': 'Uricosuric',
            'interactionProtectants': 'Protectant',
            'interactionAntiParkinson': 'Anti-Parkinson',
            'interactionHIVProtease': 'HIV Protease Inhibitor',
            'interactionBloodProduct': 'Blood Product',
            'interactionVaccines': 'Vaccine',
            'interactionAnthelmintics': 'Anthelmintic',
            'interactionPDE5Inhibitors': 'PDE5 Inhibitor',
            'ironChelator': 'Iron Chelator'
        };

        // Check all interaction fields for each current medication
        for (const currentDrug of currentMeds) {
            const allInteractionFields = [...jsonInteractionFields, ...stringInteractionFields];

            for (const field of allInteractionFields) {
                const interactionData = (newDrug as any)[field];
                
                if (interactionData) {
                    let searchText = '';
                    let interactionText = '';
                    
                    try {
                        if (jsonInteractionFields.includes(field)) {
                            // Handle JSON field with translations
                            const parsed = typeof interactionData === 'string' 
                                ? JSON.parse(interactionData) 
                                : interactionData;
                            searchText = parsed.en || '';
                            interactionText = parsed.en || '';
                        } else {
                            // Handle string field
                            searchText = interactionData;
                            interactionText = interactionData;
                        }

                        // Search for current drug name in the interaction text (case-insensitive)
                        if (searchText.toLowerCase().includes(currentDrug.name.toLowerCase())) {
                            const drugClass = fieldToClassMap[field] || field.replace('interaction', '');
                            
                            warnings.push({
                                type: 'interaction',
                                severity: 'high',
                                message: `Drug Interaction with ${drugClass}: ${interactionText}`,
                                affectedDrug: newDrug.name,
                                conflictingDrug: currentDrug.name
                            });

                            alerts.push({
                                interactionType: drugClass,
                                severity: 'Major',
                                message: `Interaction detected between ${newDrug.name} and ${currentDrug.name}`,
                                requiresAcknowledgement: true
                            });
                        }
                    } catch (error) {
                        console.warn(`Error parsing interaction data for field ${field}:`, error);
                        // Continue with next field if JSON parsing fails
                    }
                }
            }
        }

        return { warnings, alerts };
    }

    /**
     * Check age-based warnings
     */
    private checkAgeWarnings(patient: Patient, drug: ActiveSubstance): DrugWarning[] {
        const warnings: DrugWarning[] = [];

        // Elderly warnings
        if (patient.age >= 65 && drug.specialPopulationElderly) {
            warnings.push({
                type: 'age',
                severity: 'medium',
                message: `Elderly Patient Warning: ${drug.specialPopulationElderly}`,
                affectedDrug: drug.name
            });
        }

        // Pediatric warnings
        if (patient.age < 18 && drug.specialPopulationChildren) {
            warnings.push({
                type: 'age',
                severity: 'medium',
                message: `Pediatric Warning: ${drug.specialPopulationChildren}`,
                affectedDrug: drug.name
            });
        }

        // Check pediatric dosing
        if (patient.age < 18 && !drug.pediatricDose) {
            warnings.push({
                type: 'age',
                severity: 'high',
                message: `No pediatric dosing information available for this medication. ` +
                    `Consultation with specialist recommended.`,
                affectedDrug: drug.name
            });
        }

        return warnings;
    }

    /**
     * Check organ-specific warnings
     */
    private checkOrganWarnings(drug: ActiveSubstance): DrugWarning[] {
        const warnings: DrugWarning[] = [];

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
                    affectedDrug: drug.name
                });
            }
        }

        return warnings;
    }

    
    /**
     * Create drug interaction alert in database
     */
    async createDrugInteractionAlert(
        prescriptionId: number,
        interactingMedicineId: number,
        interactionType: string,
        severity: 'Minor' | 'Moderate' | 'Major' | 'Contraindicated',
        message: string
    ) {
        return await prisma.drugInteractionAlert.create({
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

export default new DrugInteractionService();
