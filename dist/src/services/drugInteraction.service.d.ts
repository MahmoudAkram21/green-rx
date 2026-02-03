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
declare class DrugInteractionService {
    /**
     * Comprehensive drug interaction and safety check
     */
    checkDrugSafety(patientId: number, activeSubstanceId: number, _tradeNameId?: number): Promise<DrugInteractionCheck>;
    /**
     * Check for allergy conflicts
     */
    private checkAllergies;
    /**
     * Check disease-medication warnings
     */
    private checkDiseaseWarnings;
    /**
     * Check drug-drug interactions
     */
    private checkDrugInteractions;
    /**
     * Check age-based warnings
     */
    private checkAgeWarnings;
    /**
     * Check organ-specific warnings
     */
    private checkOrganWarnings;
    /**
     * Helper method to check if drug matches a class
     */
    private drugMatchesClass;
    /**
     * Create drug interaction alert in database
     */
    createDrugInteractionAlert(prescriptionId: number, interactingMedicineId: number, interactionType: string, severity: 'Minor' | 'Moderate' | 'Major' | 'Contraindicated', message: string): Promise<{
        message: string;
        id: number;
        createdAt: Date;
        severity: import("../generated/client").InteractionSeverity;
        prescriptionId: number;
        interactingMedicineId: number;
        interactionType: string;
        acknowledgedByDoctor: boolean;
        acknowledgedByPatient: boolean;
        acknowledgedAt: Date | null;
    }>;
}
declare const _default: DrugInteractionService;
export default _default;
//# sourceMappingURL=drugInteraction.service.d.ts.map