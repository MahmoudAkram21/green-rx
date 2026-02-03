import { WarningSeverity } from '../generated/client';
export interface Warning {
    severity: WarningSeverity;
    type: string;
    message: string;
    blocked?: boolean;
    diseaseId?: number;
    diseaseName?: string;
    requiredTests?: string;
}
export interface WarningResult {
    blocked: boolean;
    warnings: Warning[];
}
/**
 * Generate comprehensive warnings for a prescription based on patient profile
 */
export declare function generateWarnings(patientId: number, tradeNameId: number): Promise<WarningResult>;
/**
 * Check for drug interactions WITHIN a batch of medicines being prescribed together
 * This prevents dangerous combinations in the same prescription
 */
export declare function checkBatchInteractions(medicineIds: number[]): Promise<Warning[]>;
//# sourceMappingURL=warningService.d.ts.map