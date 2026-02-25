"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSchema = exports.notificationSchema = exports.updateMedicalReportSchema = exports.medicalReportSchema = exports.updateRatingSchema = exports.ratingSchema = exports.updateVisitSchema = exports.visitSchema = exports.updatePharmacistSchema = exports.createPharmacistSchema = exports.updateCompanySchema = exports.createCompanySchema = exports.updateAdrSchema = exports.adrSchema = exports.updateWarningSchema = exports.createWarningSchema = exports.updateDiseaseSchema = exports.createDiseaseSchema = exports.assignPatientSchema = exports.verifyDoctorSchema = exports.updateDoctorSchema = exports.createDoctorSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = exports.childProfileSchema = exports.batchAllergySchema = exports.allergySchema = exports.lifestyleSchema = exports.familyHistorySchema = exports.medicalHistorySchema = exports.createPatientSchema = exports.updateTradeNameSchema = exports.createTradeNameSchema = exports.updateActiveSubstanceSchema = exports.createActiveSubstanceSchema = void 0;
// Active Substance Schemas
var createActiveSubstance_zod_1 = require("./createActiveSubstance.zod");
Object.defineProperty(exports, "createActiveSubstanceSchema", { enumerable: true, get: function () { return createActiveSubstance_zod_1.createActiveSubstanceSchema; } });
Object.defineProperty(exports, "updateActiveSubstanceSchema", { enumerable: true, get: function () { return createActiveSubstance_zod_1.updateActiveSubstanceSchema; } });
// Trade Name Schemas
var tradeName_zod_1 = require("./tradeName.zod");
Object.defineProperty(exports, "createTradeNameSchema", { enumerable: true, get: function () { return tradeName_zod_1.createTradeNameSchema; } });
Object.defineProperty(exports, "updateTradeNameSchema", { enumerable: true, get: function () { return tradeName_zod_1.updateTradeNameSchema; } });
// Patient Schemas
var patient_zod_1 = require("./patient.zod");
Object.defineProperty(exports, "createPatientSchema", { enumerable: true, get: function () { return patient_zod_1.createPatientSchema; } });
Object.defineProperty(exports, "medicalHistorySchema", { enumerable: true, get: function () { return patient_zod_1.medicalHistorySchema; } });
Object.defineProperty(exports, "familyHistorySchema", { enumerable: true, get: function () { return patient_zod_1.familyHistorySchema; } });
Object.defineProperty(exports, "lifestyleSchema", { enumerable: true, get: function () { return patient_zod_1.lifestyleSchema; } });
Object.defineProperty(exports, "allergySchema", { enumerable: true, get: function () { return patient_zod_1.allergySchema; } });
Object.defineProperty(exports, "batchAllergySchema", { enumerable: true, get: function () { return patient_zod_1.batchAllergySchema; } });
Object.defineProperty(exports, "childProfileSchema", { enumerable: true, get: function () { return patient_zod_1.childProfileSchema; } });
// Auth Schemas
var auth_zod_1 = require("./auth.zod");
Object.defineProperty(exports, "registerSchema", { enumerable: true, get: function () { return auth_zod_1.registerSchema; } });
Object.defineProperty(exports, "loginSchema", { enumerable: true, get: function () { return auth_zod_1.loginSchema; } });
Object.defineProperty(exports, "refreshTokenSchema", { enumerable: true, get: function () { return auth_zod_1.refreshTokenSchema; } });
// Doctor Schemas
var doctor_zod_1 = require("./doctor.zod");
Object.defineProperty(exports, "createDoctorSchema", { enumerable: true, get: function () { return doctor_zod_1.createDoctorSchema; } });
Object.defineProperty(exports, "updateDoctorSchema", { enumerable: true, get: function () { return doctor_zod_1.updateDoctorSchema; } });
Object.defineProperty(exports, "verifyDoctorSchema", { enumerable: true, get: function () { return doctor_zod_1.verifyDoctorSchema; } });
Object.defineProperty(exports, "assignPatientSchema", { enumerable: true, get: function () { return doctor_zod_1.assignPatientSchema; } });
// Disease Schemas
var disease_zod_1 = require("./disease.zod");
Object.defineProperty(exports, "createDiseaseSchema", { enumerable: true, get: function () { return disease_zod_1.createDiseaseSchema; } });
Object.defineProperty(exports, "updateDiseaseSchema", { enumerable: true, get: function () { return disease_zod_1.updateDiseaseSchema; } });
Object.defineProperty(exports, "createWarningSchema", { enumerable: true, get: function () { return disease_zod_1.createWarningSchema; } });
Object.defineProperty(exports, "updateWarningSchema", { enumerable: true, get: function () { return disease_zod_1.updateWarningSchema; } });
// Adverse Drug Reaction Schemas
var adverseDrugReaction_zod_1 = require("./adverseDrugReaction.zod");
Object.defineProperty(exports, "adrSchema", { enumerable: true, get: function () { return adverseDrugReaction_zod_1.adrSchema; } });
Object.defineProperty(exports, "updateAdrSchema", { enumerable: true, get: function () { return adverseDrugReaction_zod_1.updateAdrSchema; } });
// Company Schemas
var company_zod_1 = require("./company.zod");
Object.defineProperty(exports, "createCompanySchema", { enumerable: true, get: function () { return company_zod_1.createCompanySchema; } });
Object.defineProperty(exports, "updateCompanySchema", { enumerable: true, get: function () { return company_zod_1.updateCompanySchema; } });
// Pharmacist Schemas
var pharmacist_zod_1 = require("./pharmacist.zod");
Object.defineProperty(exports, "createPharmacistSchema", { enumerable: true, get: function () { return pharmacist_zod_1.createPharmacistSchema; } });
Object.defineProperty(exports, "updatePharmacistSchema", { enumerable: true, get: function () { return pharmacist_zod_1.updatePharmacistSchema; } });
// Visit Schemas
var visit_zod_1 = require("./visit.zod");
Object.defineProperty(exports, "visitSchema", { enumerable: true, get: function () { return visit_zod_1.visitSchema; } });
Object.defineProperty(exports, "updateVisitSchema", { enumerable: true, get: function () { return visit_zod_1.updateVisitSchema; } });
// Rating Schemas
var rating_zod_1 = require("./rating.zod");
Object.defineProperty(exports, "ratingSchema", { enumerable: true, get: function () { return rating_zod_1.ratingSchema; } });
Object.defineProperty(exports, "updateRatingSchema", { enumerable: true, get: function () { return rating_zod_1.updateRatingSchema; } });
// Medical Report Schemas
var medicalReport_zod_1 = require("./medicalReport.zod");
Object.defineProperty(exports, "medicalReportSchema", { enumerable: true, get: function () { return medicalReport_zod_1.medicalReportSchema; } });
Object.defineProperty(exports, "updateMedicalReportSchema", { enumerable: true, get: function () { return medicalReport_zod_1.updateMedicalReportSchema; } });
// Notification Schemas
var notification_zod_1 = require("./notification.zod");
Object.defineProperty(exports, "notificationSchema", { enumerable: true, get: function () { return notification_zod_1.notificationSchema; } });
Object.defineProperty(exports, "updateNotificationSchema", { enumerable: true, get: function () { return notification_zod_1.updateNotificationSchema; } });
//# sourceMappingURL=index.js.map