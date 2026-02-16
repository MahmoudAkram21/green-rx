export declare const UserRole: {
    readonly Patient: "Patient";
    readonly Doctor: "Doctor";
    readonly Pharmacist: "Pharmacist";
    readonly Admin: "Admin";
    readonly Company: "Company";
    readonly SuperAdmin: "SuperAdmin";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const Gender: {
    readonly Male: "Male";
    readonly Female: "Female";
    readonly Other: "Other";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const AgeClassification: {
    readonly Neonates: "Neonates";
    readonly Infants: "Infants";
    readonly Toddlers: "Toddlers";
    readonly Children: "Children";
    readonly Adolescents: "Adolescents";
    readonly Adults: "Adults";
    readonly Elderly: "Elderly";
};
export type AgeClassification = (typeof AgeClassification)[keyof typeof AgeClassification];
export declare const DiseaseSeverity: {
    readonly None: "None";
    readonly Mild: "Mild";
    readonly Moderate: "Moderate";
    readonly Severe: "Severe";
    readonly Critical: "Critical";
};
export type DiseaseSeverity = (typeof DiseaseSeverity)[keyof typeof DiseaseSeverity];
export declare const DiseaseStatus: {
    readonly Active: "Active";
    readonly Resolved: "Resolved";
    readonly Chronic: "Chronic";
};
export type DiseaseStatus = (typeof DiseaseStatus)[keyof typeof DiseaseStatus];
export declare const PrescriptionStatus: {
    readonly Draft: "Draft";
    readonly Pending: "Pending";
    readonly Approved: "Approved";
    readonly Filled: "Filled";
    readonly Cancelled: "Cancelled";
};
export type PrescriptionStatus = (typeof PrescriptionStatus)[keyof typeof PrescriptionStatus];
export declare const SubscriptionStatus: {
    readonly Active: "Active";
    readonly Expired: "Expired";
    readonly Cancelled: "Cancelled";
    readonly Suspended: "Suspended";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const MedicineAvailabilityStatus: {
    readonly InStock: "InStock";
    readonly OutOfStock: "OutOfStock";
    readonly Discontinued: "Discontinued";
};
export type MedicineAvailabilityStatus = (typeof MedicineAvailabilityStatus)[keyof typeof MedicineAvailabilityStatus];
export declare const InteractionSeverity: {
    readonly Minor: "Minor";
    readonly Moderate: "Moderate";
    readonly Major: "Major";
    readonly Contraindicated: "Contraindicated";
};
export type InteractionSeverity = (typeof InteractionSeverity)[keyof typeof InteractionSeverity];
export declare const AllergySeverity: {
    readonly Mild: "Mild";
    readonly Moderate: "Moderate";
    readonly Severe: "Severe";
    readonly LifeThreatening: "LifeThreatening";
};
export type AllergySeverity = (typeof AllergySeverity)[keyof typeof AllergySeverity];
export declare const RelationshipType: {
    readonly PrimaryCare: "PrimaryCare";
    readonly Specialist: "Specialist";
    readonly Consultant: "Consultant";
};
export type RelationshipType = (typeof RelationshipType)[keyof typeof RelationshipType];
export declare const AppointmentStatus: {
    readonly Scheduled: "Scheduled";
    readonly Confirmed: "Confirmed";
    readonly Completed: "Completed";
    readonly Cancelled: "Cancelled";
    readonly NoShow: "NoShow";
};
export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];
export declare const NotificationType: {
    readonly PrescriptionReady: "PrescriptionReady";
    readonly DrugInteraction: "DrugInteraction";
    readonly AppointmentReminder: "AppointmentReminder";
    readonly SystemAlert: "SystemAlert";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const PaymentStatus: {
    readonly Pending: "Pending";
    readonly Completed: "Completed";
    readonly Failed: "Failed";
    readonly Refunded: "Refunded";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const WarningSeverity: {
    readonly Info: "Info";
    readonly Low: "Low";
    readonly Medium: "Medium";
    readonly High: "High";
    readonly Critical: "Critical";
};
export type WarningSeverity = (typeof WarningSeverity)[keyof typeof WarningSeverity];
export declare const WarningRuleType: {
    readonly BLOCK_ACTIVE_SUBSTANCE: "BLOCK_ACTIVE_SUBSTANCE";
    readonly WARN_ACTIVE_SUBSTANCE: "WARN_ACTIVE_SUBSTANCE";
    readonly REQUIRE_MONITORING: "REQUIRE_MONITORING";
    readonly ADJUST_DOSAGE: "ADJUST_DOSAGE";
    readonly BLOCK_DRUG_CLASS: "BLOCK_DRUG_CLASS";
    readonly REQUIRE_SPECIALIST_APPROVAL: "REQUIRE_SPECIALIST_APPROVAL";
};
export type WarningRuleType = (typeof WarningRuleType)[keyof typeof WarningRuleType];
export declare const SuggestionStatus: {
    readonly Pending: "Pending";
    readonly Approved: "Approved";
    readonly Rejected: "Rejected";
};
export type SuggestionStatus = (typeof SuggestionStatus)[keyof typeof SuggestionStatus];
export declare const ADRSeverity: {
    readonly Mild: "Mild";
    readonly Moderate: "Moderate";
    readonly Severe: "Severe";
    readonly LifeThreatening: "LifeThreatening";
};
export type ADRSeverity = (typeof ADRSeverity)[keyof typeof ADRSeverity];
export declare const RatingType: {
    readonly Doctor: "Doctor";
    readonly Pharmacist: "Pharmacist";
};
export type RatingType = (typeof RatingType)[keyof typeof RatingType];
export declare const ReportType: {
    readonly LabTest: "LabTest";
    readonly Imaging: "Imaging";
    readonly Consultation: "Consultation";
    readonly Procedure: "Procedure";
    readonly Other: "Other";
};
export type ReportType = (typeof ReportType)[keyof typeof ReportType];
export declare const VisitType: {
    readonly FirstVisit: "FirstVisit";
    readonly FollowUp: "FollowUp";
    readonly Emergency: "Emergency";
    readonly Consultation: "Consultation";
};
export type VisitType = (typeof VisitType)[keyof typeof VisitType];
//# sourceMappingURL=enums.d.ts.map