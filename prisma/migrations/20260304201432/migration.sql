/*
  Warnings:

  - You are about to drop the `allergies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "allergies" DROP CONSTRAINT "allergies_patientId_fkey";

-- DropTable
DROP TABLE "allergies";

-- CreateTable
CREATE TABLE "allergens" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "allergenType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allergens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_allergies" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "allergenId" INTEGER NOT NULL,
    "severity" "AllergySeverity" NOT NULL,
    "reaction" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_allergies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "allergens_name_idx" ON "allergens"("name");

-- CreateIndex
CREATE INDEX "patient_allergies_patientId_idx" ON "patient_allergies"("patientId");

-- CreateIndex
CREATE INDEX "patient_allergies_allergenId_idx" ON "patient_allergies"("allergenId");

-- CreateIndex
CREATE UNIQUE INDEX "patient_allergies_patientId_allergenId_key" ON "patient_allergies"("patientId", "allergenId");

-- AddForeignKey
ALTER TABLE "patient_allergies" ADD CONSTRAINT "patient_allergies_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_allergies" ADD CONSTRAINT "patient_allergies_allergenId_fkey" FOREIGN KEY ("allergenId") REFERENCES "allergens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
