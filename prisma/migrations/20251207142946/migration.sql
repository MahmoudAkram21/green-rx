/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Patient', 'Doctor', 'Admin', 'Company', 'SuperAdmin');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "AgeClassification" AS ENUM ('Neonates', 'Infants', 'Toddlers', 'Children', 'Adolescents', 'Adults', 'Elderly');

-- CreateEnum
CREATE TYPE "DiseaseSeverity" AS ENUM ('None', 'Mild', 'Moderate', 'Severe', 'Critical');

-- CreateEnum
CREATE TYPE "DiseaseStatus" AS ENUM ('Active', 'Resolved', 'Chronic');

-- CreateEnum
CREATE TYPE "PrescriptionStatus" AS ENUM ('Draft', 'Pending', 'Approved', 'Filled', 'Cancelled');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('Active', 'Expired', 'Cancelled', 'Suspended');

-- CreateEnum
CREATE TYPE "MedicineAvailabilityStatus" AS ENUM ('InStock', 'OutOfStock', 'Discontinued');

-- CreateEnum
CREATE TYPE "InteractionSeverity" AS ENUM ('Minor', 'Moderate', 'Major', 'Contraindicated');

-- CreateEnum
CREATE TYPE "AllergySeverity" AS ENUM ('Mild', 'Moderate', 'Severe', 'LifeThreatening');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('PrimaryCare', 'Specialist', 'Consultant');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'NoShow');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PrescriptionReady', 'DrugInteraction', 'AppointmentReminder', 'SystemAlert');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Refunded');

-- CreateEnum
CREATE TYPE "WarningSeverity" AS ENUM ('Low', 'Medium', 'High', 'Critical');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_plans" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "salePrice" DECIMAL(10,2),
    "duration" INTEGER NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "features" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pricingPlanId" INTEGER NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'Active',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'Pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "ageClassification" "AgeClassification" NOT NULL,
    "weight" DECIMAL(5,2),
    "height" DECIMAL(5,2),
    "gender" "Gender" NOT NULL,
    "smoking" BOOLEAN NOT NULL DEFAULT false,
    "pregnancyWarning" BOOLEAN NOT NULL DEFAULT false,
    "lactation" BOOLEAN NOT NULL DEFAULT false,
    "profileCompleteness" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_histories" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "diagnosisDate" TIMESTAMP(3),
    "treatment" TEXT,
    "status" "DiseaseStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_histories" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "relation" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lifestyles" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "noGlasses" BOOLEAN NOT NULL DEFAULT false,
    "alcoholAbuse" BOOLEAN NOT NULL DEFAULT false,
    "excessCaffeine" BOOLEAN NOT NULL DEFAULT false,
    "waterDaily" DECIMAL(4,2),
    "travellerAbroad" BOOLEAN NOT NULL DEFAULT false,
    "annualVaccination" BOOLEAN NOT NULL DEFAULT false,
    "surgeriesLast3Months" BOOLEAN NOT NULL DEFAULT false,
    "surgeriesDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lifestyles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergies" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "allergen" TEXT NOT NULL,
    "severity" "AllergySeverity" NOT NULL,
    "reactionType" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_doctors" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "relationshipType" "RelationshipType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "consultationDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "diagnosis" TEXT,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "followUpDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'Scheduled',
    "notes" TEXT,
    "reminderSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diseases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "severity" "DiseaseSeverity" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_diseases" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "diseaseId" INTEGER NOT NULL,
    "diagnosisDate" TIMESTAMP(3) NOT NULL,
    "severity" "DiseaseSeverity" NOT NULL,
    "status" "DiseaseStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_substances" (
    "id" SERIAL NOT NULL,
    "activeSubstance" TEXT NOT NULL,
    "concentration" TEXT,
    "classification" TEXT,
    "dosageForm" TEXT,
    "indication" TEXT,
    "adultDoseMaxPerDay" TEXT,
    "adultDoseMgPerKg" TEXT,
    "doseInKg" TEXT,
    "pediatricDose" TEXT,
    "glucoseContent" TEXT,
    "lactoseContent" TEXT,
    "fructoseContent" TEXT,
    "preservativesInOcularProducts" TEXT,
    "eliminationPathway" TEXT,
    "contraindications" JSONB,
    "pregnancyWarning" TEXT,
    "lactationWarning" TEXT,
    "reproductiveWarningFemale" TEXT,
    "reproductiveWarningMale" TEXT,
    "specialPopulationChildren" TEXT,
    "specialPopulationElderly" TEXT,
    "ethnicAction" TEXT,
    "hepaticWarning" TEXT,
    "renalWarning" TEXT,
    "medicationErrorWarning" TEXT,
    "carcinogenicityMutagenicity" TEXT,
    "gitWarning" TEXT,
    "metabolismWarning" TEXT,
    "pulmonaryWarning" TEXT,
    "immuneSystemWarning" TEXT,
    "infectionWarning" TEXT,
    "bloodWarning" TEXT,
    "vascularWarning" TEXT,
    "electrolyteImbalanceWarning" TEXT,
    "cardiacWarning" TEXT,
    "psychiatricWarning" TEXT,
    "nervousSystemWarning" TEXT,
    "skinConnectiveTissueWarning" TEXT,
    "musculoSkeletalWarning" TEXT,
    "eyeDisordersWarning" TEXT,
    "earDisordersWarning" TEXT,
    "interactionVitaminsFood" JSONB,
    "interactionBisphosphonates" JSONB,
    "interactionAlcohol" JSONB,
    "interactionMuscleRelaxant" JSONB,
    "interactionRetinoids" JSONB,
    "interactionCorticosteroids" JSONB,
    "interactionXanthines" JSONB,
    "interactionSympathomimetics" JSONB,
    "interactionAnticholinergic" JSONB,
    "interactionChemotherapy" JSONB,
    "interactionAntibiotics" JSONB,
    "interactionHormones" JSONB,
    "interactionStatins" JSONB,
    "interactionAntihypertensive" JSONB,
    "interactionAntidiuretics" JSONB,
    "interactionAntidepressant" JSONB,
    "interactionAntidiabetic" JSONB,
    "interactionLowBloodSugarAgents" JSONB,
    "interactionDigoxin" JSONB,
    "interactionAnticoagulant" JSONB,
    "interactionNSAIDs" JSONB,
    "interactionImmunosuppressive" JSONB,
    "interactionAntacids" JSONB,
    "interactionUricosurics" JSONB,
    "interactionProtectants" JSONB,
    "interactionAntiParkinson" JSONB,
    "interactionHIVProtease" JSONB,
    "ironChelator" TEXT,
    "interactionBloodProduct" JSONB,
    "interactionVaccines" JSONB,
    "interactionAnthelmintics" JSONB,
    "interactionPDE5Inhibitors" JSONB,
    "interferenceLabTests" TEXT,
    "effectOnDriving" TEXT,
    "veryCommonGIT" JSONB,
    "veryCommonBlood" JSONB,
    "veryCommonVascular" JSONB,
    "veryCommonCardiac" JSONB,
    "veryCommonMusculoskeletal" JSONB,
    "veryCommonNervousSystem" JSONB,
    "veryCommonEye" JSONB,
    "veryCommonMetabolism" JSONB,
    "veryCommonEar" JSONB,
    "veryCommonRespiratory" JSONB,
    "veryCommonSkin" JSONB,
    "veryCommonInfection" JSONB,
    "veryCommonPsychiatric" JSONB,
    "veryCommonRenal" JSONB,
    "veryCommonHepatic" JSONB,
    "veryCommonGeneral" JSONB,
    "commonGIT" JSONB,
    "commonVascular" JSONB,
    "commonInfections" JSONB,
    "commonRespiratory" JSONB,
    "commonCardiac" JSONB,
    "commonBlood" JSONB,
    "commonSkin" JSONB,
    "commonEye" JSONB,
    "commonEar" JSONB,
    "commonMetabolism" JSONB,
    "commonGeneral" JSONB,
    "commonHepatobiliary" JSONB,
    "commonImmunity" JSONB,
    "commonPsychiatric" JSONB,
    "commonNervousSystem" JSONB,
    "commonRenal" JSONB,
    "commonMusculoskeletal" JSONB,
    "uncommonNervous" JSONB,
    "uncommonInfections" JSONB,
    "uncommonPsychiatric" JSONB,
    "uncommonEye" JSONB,
    "uncommonRespiratory" JSONB,
    "uncommonSkin" JSONB,
    "uncommonRenal" JSONB,
    "uncommonHepatobiliary" JSONB,
    "uncommonVascular" JSONB,
    "uncommonGIT" JSONB,
    "uncommonMusculoskeletal" JSONB,
    "uncommonMetabolism" JSONB,
    "uncommonEar" JSONB,
    "uncommonCardiac" JSONB,
    "uncommonBlood" JSONB,
    "uncommonImmunity" JSONB,
    "uncommonGeneral" JSONB,
    "rareEar" JSONB,
    "rareBlood" JSONB,
    "rareGIT" JSONB,
    "rareHepatic" JSONB,
    "rareInfections" JSONB,
    "rareCardiac" JSONB,
    "rareVascular" JSONB,
    "rareImmune" JSONB,
    "rareMetabolism" JSONB,
    "rareNervous" JSONB,
    "rareMusculoskeletal" JSONB,
    "rarePsychiatric" JSONB,
    "rareEye" JSONB,
    "rareRenal" JSONB,
    "rareSkin" JSONB,
    "rareRespiratory" JSONB,
    "rareEndocrine" JSONB,
    "rareGeneral" JSONB,
    "veryRareVascular" JSONB,
    "veryRareEndocrine" JSONB,
    "veryRareNervous" JSONB,
    "veryRarePsychiatric" JSONB,
    "veryRareEye" JSONB,
    "veryRareMusculoskeletal" JSONB,
    "veryRareBlood" JSONB,
    "veryRareCardiac" JSONB,
    "veryRareImmune" JSONB,
    "veryRareEar" JSONB,
    "veryRareRenal" JSONB,
    "veryRareGIT" JSONB,
    "veryRareHepatobiliary" JSONB,
    "veryRareInfections" JSONB,
    "veryRareRespiratory" JSONB,
    "veryRareSkin" JSONB,
    "veryRareGeneral" JSONB,
    "veryRareMetabolism" JSONB,
    "unknownNervous" JSONB,
    "unknownMusculoskeletal" JSONB,
    "unknownPsychiatric" JSONB,
    "unknownHepatobiliary" JSONB,
    "unknownRenal" JSONB,
    "unknownSkin" JSONB,
    "unknownRespiratory" JSONB,
    "unknownImmune" JSONB,
    "unknownVascular" JSONB,
    "unknownEar" JSONB,
    "unknownGIT" JSONB,
    "unknownGeneral" JSONB,
    "unknownMetabolism" JSONB,
    "unknownEye" JSONB,
    "unknownBlood" JSONB,
    "unknownCardiac" JSONB,
    "unknownInfections" JSONB,
    "unknownEndocrine" JSONB,
    "additiveRMM" TEXT,
    "pregnancyCategory" TEXT,
    "additionalMonitoring" TEXT,
    "highlightedWarning" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "active_substances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disease_active_substance_warnings" (
    "id" SERIAL NOT NULL,
    "diseaseId" INTEGER NOT NULL,
    "activeSubstanceId" INTEGER NOT NULL,
    "warningFieldName" TEXT NOT NULL,
    "warningMessage" TEXT NOT NULL,
    "severity" "WarningSeverity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disease_active_substance_warnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicine_alternatives" (
    "id" SERIAL NOT NULL,
    "activeSubstanceId" INTEGER NOT NULL,
    "alternativeActiveSubstanceId" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medicine_alternatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trade_names" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "activeSubstanceId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "warningNotification" TEXT,
    "batchNumber" TEXT,
    "barCode" TEXT,
    "availabilityStatus" "MedicineAvailabilityStatus" NOT NULL DEFAULT 'InStock',
    "stockQuantity" INTEGER,
    "expiryDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "trade_names_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracting_companies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "contractingDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contracting_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracting_company_trade_names" (
    "id" SERIAL NOT NULL,
    "contractingCompanyId" INTEGER NOT NULL,
    "tradeNameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contracting_company_trade_names_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "tradeNameId" INTEGER NOT NULL,
    "status" "PrescriptionStatus" NOT NULL DEFAULT 'Draft',
    "prescriptionDate" TIMESTAMP(3) NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "dosage" TEXT,
    "frequency" TEXT,
    "duration" TEXT,
    "instructions" TEXT,
    "maxRefills" INTEGER NOT NULL DEFAULT 0,
    "currentRefillCount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescription_versions" (
    "id" SERIAL NOT NULL,
    "prescriptionId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "changes" JSONB,
    "changedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prescription_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drug_interaction_alerts" (
    "id" SERIAL NOT NULL,
    "prescriptionId" INTEGER NOT NULL,
    "interactingMedicineId" INTEGER NOT NULL,
    "interactionType" TEXT NOT NULL,
    "severity" "InteractionSeverity" NOT NULL,
    "message" TEXT NOT NULL,
    "acknowledgedByDoctor" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgedByPatient" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drug_interaction_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "deliveryStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,
    "changes" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "users"("deletedAt");

-- CreateIndex
CREATE INDEX "pricing_plans_isDefault_idx" ON "pricing_plans"("isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "subscriptions_endDate_idx" ON "subscriptions"("endDate");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "patients_userId_key" ON "patients"("userId");

-- CreateIndex
CREATE INDEX "patients_age_idx" ON "patients"("age");

-- CreateIndex
CREATE INDEX "patients_ageClassification_idx" ON "patients"("ageClassification");

-- CreateIndex
CREATE INDEX "medical_histories_patientId_idx" ON "medical_histories"("patientId");

-- CreateIndex
CREATE INDEX "medical_histories_status_idx" ON "medical_histories"("status");

-- CreateIndex
CREATE INDEX "family_histories_patientId_idx" ON "family_histories"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "lifestyles_patientId_key" ON "lifestyles"("patientId");

-- CreateIndex
CREATE INDEX "allergies_patientId_idx" ON "allergies"("patientId");

-- CreateIndex
CREATE INDEX "allergies_allergen_idx" ON "allergies"("allergen");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_userId_key" ON "doctors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_licenseNumber_key" ON "doctors"("licenseNumber");

-- CreateIndex
CREATE INDEX "doctors_specialization_idx" ON "doctors"("specialization");

-- CreateIndex
CREATE INDEX "patient_doctors_isActive_idx" ON "patient_doctors"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "patient_doctors_patientId_doctorId_key" ON "patient_doctors"("patientId", "doctorId");

-- CreateIndex
CREATE INDEX "consultations_patientId_idx" ON "consultations"("patientId");

-- CreateIndex
CREATE INDEX "consultations_doctorId_idx" ON "consultations"("doctorId");

-- CreateIndex
CREATE INDEX "consultations_consultationDate_idx" ON "consultations"("consultationDate");

-- CreateIndex
CREATE INDEX "appointments_patientId_idx" ON "appointments"("patientId");

-- CreateIndex
CREATE INDEX "appointments_doctorId_idx" ON "appointments"("doctorId");

-- CreateIndex
CREATE INDEX "appointments_appointmentDate_idx" ON "appointments"("appointmentDate");

-- CreateIndex
CREATE INDEX "appointments_status_idx" ON "appointments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "diseases_name_key" ON "diseases"("name");

-- CreateIndex
CREATE INDEX "diseases_severity_idx" ON "diseases"("severity");

-- CreateIndex
CREATE INDEX "patient_diseases_patientId_diseaseId_idx" ON "patient_diseases"("patientId", "diseaseId");

-- CreateIndex
CREATE INDEX "patient_diseases_status_idx" ON "patient_diseases"("status");

-- CreateIndex
CREATE INDEX "active_substances_activeSubstance_idx" ON "active_substances"("activeSubstance");

-- CreateIndex
CREATE INDEX "active_substances_isActive_idx" ON "active_substances"("isActive");

-- CreateIndex
CREATE INDEX "disease_active_substance_warnings_warningFieldName_idx" ON "disease_active_substance_warnings"("warningFieldName");

-- CreateIndex
CREATE UNIQUE INDEX "disease_active_substance_warnings_diseaseId_activeSubstance_key" ON "disease_active_substance_warnings"("diseaseId", "activeSubstanceId");

-- CreateIndex
CREATE INDEX "medicine_alternatives_activeSubstanceId_idx" ON "medicine_alternatives"("activeSubstanceId");

-- CreateIndex
CREATE INDEX "medicine_alternatives_alternativeActiveSubstanceId_idx" ON "medicine_alternatives"("alternativeActiveSubstanceId");

-- CreateIndex
CREATE INDEX "trade_names_title_idx" ON "trade_names"("title");

-- CreateIndex
CREATE INDEX "trade_names_activeSubstanceId_idx" ON "trade_names"("activeSubstanceId");

-- CreateIndex
CREATE INDEX "trade_names_companyId_idx" ON "trade_names"("companyId");

-- CreateIndex
CREATE INDEX "trade_names_availabilityStatus_idx" ON "trade_names"("availabilityStatus");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE INDEX "contracting_companies_contractingDate_idx" ON "contracting_companies"("contractingDate");

-- CreateIndex
CREATE UNIQUE INDEX "contracting_company_trade_names_contractingCompanyId_tradeN_key" ON "contracting_company_trade_names"("contractingCompanyId", "tradeNameId");

-- CreateIndex
CREATE INDEX "prescriptions_doctorId_idx" ON "prescriptions"("doctorId");

-- CreateIndex
CREATE INDEX "prescriptions_patientId_idx" ON "prescriptions"("patientId");

-- CreateIndex
CREATE INDEX "prescriptions_status_idx" ON "prescriptions"("status");

-- CreateIndex
CREATE INDEX "prescriptions_prescriptionDate_idx" ON "prescriptions"("prescriptionDate");

-- CreateIndex
CREATE INDEX "prescription_versions_prescriptionId_idx" ON "prescription_versions"("prescriptionId");

-- CreateIndex
CREATE INDEX "prescription_versions_version_idx" ON "prescription_versions"("version");

-- CreateIndex
CREATE INDEX "drug_interaction_alerts_prescriptionId_idx" ON "drug_interaction_alerts"("prescriptionId");

-- CreateIndex
CREATE INDEX "drug_interaction_alerts_severity_idx" ON "drug_interaction_alerts"("severity");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_idx" ON "audit_logs"("entityType");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refreshToken_key" ON "sessions"("refreshToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_pricingPlanId_fkey" FOREIGN KEY ("pricingPlanId") REFERENCES "pricing_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_histories" ADD CONSTRAINT "medical_histories_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_histories" ADD CONSTRAINT "family_histories_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lifestyles" ADD CONSTRAINT "lifestyles_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allergies" ADD CONSTRAINT "allergies_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_doctors" ADD CONSTRAINT "patient_doctors_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_doctors" ADD CONSTRAINT "patient_doctors_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_diseases" ADD CONSTRAINT "patient_diseases_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_diseases" ADD CONSTRAINT "patient_diseases_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disease_active_substance_warnings" ADD CONSTRAINT "disease_active_substance_warnings_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disease_active_substance_warnings" ADD CONSTRAINT "disease_active_substance_warnings_activeSubstanceId_fkey" FOREIGN KEY ("activeSubstanceId") REFERENCES "active_substances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_alternatives" ADD CONSTRAINT "medicine_alternatives_activeSubstanceId_fkey" FOREIGN KEY ("activeSubstanceId") REFERENCES "active_substances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_alternatives" ADD CONSTRAINT "medicine_alternatives_alternativeActiveSubstanceId_fkey" FOREIGN KEY ("alternativeActiveSubstanceId") REFERENCES "active_substances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_names" ADD CONSTRAINT "trade_names_activeSubstanceId_fkey" FOREIGN KEY ("activeSubstanceId") REFERENCES "active_substances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_names" ADD CONSTRAINT "trade_names_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracting_companies" ADD CONSTRAINT "contracting_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracting_company_trade_names" ADD CONSTRAINT "contracting_company_trade_names_contractingCompanyId_fkey" FOREIGN KEY ("contractingCompanyId") REFERENCES "contracting_companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracting_company_trade_names" ADD CONSTRAINT "contracting_company_trade_names_tradeNameId_fkey" FOREIGN KEY ("tradeNameId") REFERENCES "trade_names"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_tradeNameId_fkey" FOREIGN KEY ("tradeNameId") REFERENCES "trade_names"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescription_versions" ADD CONSTRAINT "prescription_versions_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "prescriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drug_interaction_alerts" ADD CONSTRAINT "drug_interaction_alerts_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "prescriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drug_interaction_alerts" ADD CONSTRAINT "drug_interaction_alerts_interactingMedicineId_fkey" FOREIGN KEY ("interactingMedicineId") REFERENCES "trade_names"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
