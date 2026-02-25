import { prisma } from '../lib/prisma';
import {
    ActiveSubstance,
    Patient,
    Allergy
} from '../../generated/client/client';

interface DrugInteractionCheck {
    hasDrugInteractions: boolean;
    hasAllergyConflicts: boolean;
    hasDiseaseWarnings: boolean;
    hasPregnancyWarnings: boolean;
    hasAgeWarnings: boolean;
    warnings: DrugWarning[];
    alerts: DrugAlert[];
}

interface DrugWarning {
    type: 'interaction' | 'allergy' | 'disease' | 'pregnancy' | 'lactation' | 'age' | 'renal' | 'hepatic';
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
        // Fetch patient data with all relevant medical information
        const patient = await prisma.patient.findUnique({
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
        const newDrug = await prisma.activeSubstance.findUnique({
            where: { id: activeSubstanceId }
        });

        if (!newDrug) {
            throw new Error('Active substance not found');
        }

        const warnings: DrugWarning[] = [];
        const alerts: DrugAlert[] = [];

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
    private checkAllergies(allergies: Allergy[], drug: ActiveSubstance): DrugWarning[] {
        const warnings: DrugWarning[] = [];

        for (const allergy of allergies) {
            // Check contraindications
            if (Array.isArray(drug.contraindications) &&
                drug.contraindications.some((c: any) =>
                    typeof c === 'string' && c.toLowerCase().includes(allergy.allergen.toLowerCase())
                )) {
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
    private async checkDrugInteractions(patient: any, newDrug: ActiveSubstance): Promise<{
        warnings: DrugWarning[];
        alerts: DrugAlert[];
    }> {
        const warnings: DrugWarning[] = [];
        const alerts: DrugAlert[] = [];

        // Get current medications
        const currentMeds = patient.prescriptions.map((p: any) => p.tradeName.activeSubstance);

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
                        if (searchText.toLowerCase().includes(currentDrug.activeSubstance.toLowerCase())) {
                            const drugClass = fieldToClassMap[field] || field.replace('interaction', '');
                            
                            warnings.push({
                                type: 'interaction',
                                severity: 'high',
                                message: `Drug Interaction with ${drugClass}: ${interactionText}`,
                                affectedDrug: newDrug.activeSubstance,
                                conflictingDrug: currentDrug.activeSubstance
                            });

                            alerts.push({
                                interactionType: drugClass,
                                severity: 'Major',
                                message: `Interaction detected between ${newDrug.activeSubstance} and ${currentDrug.activeSubstance}`,
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
                    affectedDrug: drug.activeSubstance
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
