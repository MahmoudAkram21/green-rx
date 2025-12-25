-- CreateEnum
CREATE TYPE "ADRSeverity" AS ENUM ('Mild', 'Moderate', 'Severe', 'LifeThreatening');

-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('Doctor', 'Pharmacist');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('LabTest', 'Imaging', 'Consultation', 'Procedure', 'Other');

-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('FirstVisit', 'FollowUp', 'Emergency', 'Consultation');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'Pharmacist';

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "address" TEXT,
ADD COLUMN     "averageRating" DECIMAL(3,2),
ADD COLUMN     "city" TEXT,
ADD COLUMN     "consultationFee" DECIMAL(8,2),
ADD COLUMN     "latitude" DECIMAL(10,8),
ADD COLUMN     "longitude" DECIMAL(11,8),
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "totalRatings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verificationNotes" TEXT,
ADD COLUMN     "verifiedBy" INTEGER,
ADD COLUMN     "workingHours" JSONB;

-- AlterTable
ALTER TABLE "prescriptions" ADD COLUMN     "isAddedToProfile" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSharedViaApp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pdfUrl" TEXT,
ADD COLUMN     "sharedVia" JSONB;

-- CreateTable
CREATE TABLE "pharmacists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "pharmacyName" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" INTEGER,
    "verificationNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "pharmacists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_reports" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER,
    "reportType" "ReportType",
    "reportDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_share_links" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "shareToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "accessCount" INTEGER NOT NULL DEFAULT 0,
    "lastAccessedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_share_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adverse_drug_reactions" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER,
    "tradeNameId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "activeSubstanceId" INTEGER,
    "severity" "ADRSeverity" NOT NULL,
    "reaction" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "reportedToEDA" BOOLEAN NOT NULL DEFAULT false,
    "edaReferenceNum" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Submitted',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adverse_drug_reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_profiles" (
    "id" SERIAL NOT NULL,
    "parentPatientId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "weight" DECIMAL(5,2),
    "height" DECIMAL(5,2),
    "ageClassification" "AgeClassification" NOT NULL,
    "allergies" JSONB,
    "diseases" JSONB,
    "medicalHistory" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "child_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER,
    "pharmacistId" INTEGER,
    "ratedType" "RatingType" NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "visitType" "VisitType" NOT NULL DEFAULT 'FollowUp',
    "isNewVisit" BOOLEAN NOT NULL DEFAULT true,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "diagnosis" TEXT,
    "treatmentPlan" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contraindication_term_mappings" (
    "id" SERIAL NOT NULL,
    "standardTerm" TEXT NOT NULL,
    "alternativeTerms" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "warningFieldName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contraindication_term_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_histories" (
    "id" SERIAL NOT NULL,
    "tradeNameId" INTEGER NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "manufacturingDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER,
    "isRecalled" BOOLEAN NOT NULL DEFAULT false,
    "recallReason" TEXT,
    "recallDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_histories" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "totalRows" INTEGER NOT NULL,
    "successfulRows" INTEGER NOT NULL,
    "failedRows" INTEGER NOT NULL,
    "skippedRows" INTEGER NOT NULL DEFAULT 0,
    "importedBy" INTEGER NOT NULL,
    "importDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "errors" JSONB,
    "executionTime" INTEGER,

    CONSTRAINT "import_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "export_histories" (
    "id" SERIAL NOT NULL,
    "format" TEXT NOT NULL,
    "totalRecords" INTEGER NOT NULL,
    "filters" JSONB,
    "exportedBy" INTEGER NOT NULL,
    "exportDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "export_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pharmacists_userId_key" ON "pharmacists"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "pharmacists_licenseNumber_key" ON "pharmacists"("licenseNumber");

-- CreateIndex
CREATE INDEX "pharmacists_isVerified_idx" ON "pharmacists"("isVerified");

-- CreateIndex
CREATE INDEX "pharmacists_licenseNumber_idx" ON "pharmacists"("licenseNumber");

-- CreateIndex
CREATE INDEX "medical_reports_patientId_idx" ON "medical_reports"("patientId");

-- CreateIndex
CREATE INDEX "medical_reports_uploadedBy_idx" ON "medical_reports"("uploadedBy");

-- CreateIndex
CREATE INDEX "medical_reports_reportDate_idx" ON "medical_reports"("reportDate");

-- CreateIndex
CREATE UNIQUE INDEX "patient_share_links_shareToken_key" ON "patient_share_links"("shareToken");

-- CreateIndex
CREATE INDEX "patient_share_links_shareToken_idx" ON "patient_share_links"("shareToken");

-- CreateIndex
CREATE INDEX "patient_share_links_expiresAt_idx" ON "patient_share_links"("expiresAt");

-- CreateIndex
CREATE INDEX "adverse_drug_reactions_companyId_idx" ON "adverse_drug_reactions"("companyId");

-- CreateIndex
CREATE INDEX "adverse_drug_reactions_status_idx" ON "adverse_drug_reactions"("status");

-- CreateIndex
CREATE INDEX "adverse_drug_reactions_severity_idx" ON "adverse_drug_reactions"("severity");

-- CreateIndex
CREATE INDEX "child_profiles_parentPatientId_idx" ON "child_profiles"("parentPatientId");

-- CreateIndex
CREATE INDEX "ratings_doctorId_idx" ON "ratings"("doctorId");

-- CreateIndex
CREATE INDEX "ratings_pharmacistId_idx" ON "ratings"("pharmacistId");

-- CreateIndex
CREATE INDEX "ratings_patientId_idx" ON "ratings"("patientId");

-- CreateIndex
CREATE INDEX "ratings_rating_idx" ON "ratings"("rating");

-- CreateIndex
CREATE INDEX "visits_doctorId_idx" ON "visits"("doctorId");

-- CreateIndex
CREATE INDEX "visits_patientId_idx" ON "visits"("patientId");

-- CreateIndex
CREATE INDEX "visits_visitDate_idx" ON "visits"("visitDate");

-- CreateIndex
CREATE INDEX "visits_isArchived_idx" ON "visits"("isArchived");

-- CreateIndex
CREATE INDEX "contraindication_term_mappings_standardTerm_idx" ON "contraindication_term_mappings"("standardTerm");

-- CreateIndex
CREATE INDEX "batch_histories_batchNumber_idx" ON "batch_histories"("batchNumber");

-- CreateIndex
CREATE INDEX "batch_histories_tradeNameId_idx" ON "batch_histories"("tradeNameId");

-- CreateIndex
CREATE INDEX "batch_histories_expiryDate_idx" ON "batch_histories"("expiryDate");

-- CreateIndex
CREATE INDEX "import_histories_importedBy_idx" ON "import_histories"("importedBy");

-- CreateIndex
CREATE INDEX "import_histories_importDate_idx" ON "import_histories"("importDate");

-- CreateIndex
CREATE INDEX "export_histories_exportedBy_idx" ON "export_histories"("exportedBy");

-- CreateIndex
CREATE INDEX "export_histories_exportDate_idx" ON "export_histories"("exportDate");

-- AddForeignKey
ALTER TABLE "pharmacists" ADD CONSTRAINT "pharmacists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_reports" ADD CONSTRAINT "medical_reports_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_reports" ADD CONSTRAINT "medical_reports_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_share_links" ADD CONSTRAINT "patient_share_links_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adverse_drug_reactions" ADD CONSTRAINT "adverse_drug_reactions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adverse_drug_reactions" ADD CONSTRAINT "adverse_drug_reactions_tradeNameId_fkey" FOREIGN KEY ("tradeNameId") REFERENCES "trade_names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adverse_drug_reactions" ADD CONSTRAINT "adverse_drug_reactions_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adverse_drug_reactions" ADD CONSTRAINT "adverse_drug_reactions_activeSubstanceId_fkey" FOREIGN KEY ("activeSubstanceId") REFERENCES "active_substances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_profiles" ADD CONSTRAINT "child_profiles_parentPatientId_fkey" FOREIGN KEY ("parentPatientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_pharmacistId_fkey" FOREIGN KEY ("pharmacistId") REFERENCES "pharmacists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_histories" ADD CONSTRAINT "batch_histories_tradeNameId_fkey" FOREIGN KEY ("tradeNameId") REFERENCES "trade_names"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_histories" ADD CONSTRAINT "import_histories_importedBy_fkey" FOREIGN KEY ("importedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "export_histories" ADD CONSTRAINT "export_histories_exportedBy_fkey" FOREIGN KEY ("exportedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
