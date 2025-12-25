/*
  Warnings:

  - You are about to drop the `import_histories` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WarningRuleType" AS ENUM ('BLOCK_ACTIVE_SUBSTANCE', 'WARN_ACTIVE_SUBSTANCE', 'REQUIRE_MONITORING', 'ADJUST_DOSAGE', 'BLOCK_DRUG_CLASS', 'REQUIRE_SPECIALIST_APPROVAL');

-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterEnum
ALTER TYPE "WarningSeverity" ADD VALUE 'Info';

-- DropForeignKey
ALTER TABLE "import_histories" DROP CONSTRAINT "import_histories_importedBy_fkey";

-- AlterTable
ALTER TABLE "diseases" ADD COLUMN     "requiresSpecialHandling" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "warningConfig" JSONB,
ADD COLUMN     "warningMessage" TEXT;

-- AlterTable
ALTER TABLE "patient_share_links" ADD COLUMN     "doctorId" INTEGER;

-- DropTable
DROP TABLE "import_histories";

-- CreateTable
CREATE TABLE "disease_warning_rules" (
    "id" SERIAL NOT NULL,
    "diseaseId" INTEGER NOT NULL,
    "ruleType" "WarningRuleType" NOT NULL,
    "targetActiveSubstanceId" INTEGER,
    "targetDrugClass" TEXT,
    "severity" "WarningSeverity" NOT NULL,
    "warningMessage" TEXT NOT NULL,
    "autoBlock" BOOLEAN NOT NULL DEFAULT false,
    "requiresOverride" BOOLEAN NOT NULL DEFAULT false,
    "requiredMonitoring" TEXT,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disease_warning_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_history" (
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

    CONSTRAINT "import_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicine_suggestions" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "tradeName" TEXT NOT NULL,
    "activeSubstance" TEXT NOT NULL,
    "concentration" TEXT,
    "dosageForm" TEXT,
    "manufacturer" TEXT,
    "reason" TEXT NOT NULL,
    "status" "SuggestionStatus" NOT NULL DEFAULT 'Pending',
    "reviewedBy" INTEGER,
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "medicine_suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "disease_warning_rules_diseaseId_idx" ON "disease_warning_rules"("diseaseId");

-- CreateIndex
CREATE INDEX "disease_warning_rules_ruleType_idx" ON "disease_warning_rules"("ruleType");

-- CreateIndex
CREATE INDEX "disease_warning_rules_severity_idx" ON "disease_warning_rules"("severity");

-- CreateIndex
CREATE INDEX "import_history_importedBy_idx" ON "import_history"("importedBy");

-- CreateIndex
CREATE INDEX "import_history_importDate_idx" ON "import_history"("importDate");

-- CreateIndex
CREATE INDEX "medicine_suggestions_doctorId_idx" ON "medicine_suggestions"("doctorId");

-- CreateIndex
CREATE INDEX "medicine_suggestions_status_idx" ON "medicine_suggestions"("status");

-- CreateIndex
CREATE INDEX "patient_share_links_doctorId_idx" ON "patient_share_links"("doctorId");

-- AddForeignKey
ALTER TABLE "disease_warning_rules" ADD CONSTRAINT "disease_warning_rules_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disease_warning_rules" ADD CONSTRAINT "disease_warning_rules_targetActiveSubstanceId_fkey" FOREIGN KEY ("targetActiveSubstanceId") REFERENCES "active_substances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disease_warning_rules" ADD CONSTRAINT "disease_warning_rules_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_share_links" ADD CONSTRAINT "patient_share_links_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_history" ADD CONSTRAINT "import_history_importedBy_fkey" FOREIGN KEY ("importedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_suggestions" ADD CONSTRAINT "medicine_suggestions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine_suggestions" ADD CONSTRAINT "medicine_suggestions_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
