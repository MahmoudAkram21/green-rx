-- DropForeignKey (old Lifestyle had patientId FK to patients)
ALTER TABLE "lifestyles" DROP CONSTRAINT IF EXISTS "lifestyles_patientId_fkey";

-- DropTable (old 1:1 Lifestyle table; data not migrated per plan)
DROP TABLE "lifestyles";

-- CreateTable (new Lifestyle catalog)
CREATE TABLE "lifestyles" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "activeSubstanceField" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lifestyles_pkey" PRIMARY KEY ("id")
);

-- CreateTable (PatientLifestyle join table)
CREATE TABLE "patient_lifestyles" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "lifestyleId" INTEGER NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_lifestyles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_lifestyles_patientId_lifestyleId_key" ON "patient_lifestyles"("patientId", "lifestyleId");

-- CreateIndex
CREATE INDEX "patient_lifestyles_patientId_idx" ON "patient_lifestyles"("patientId");

-- CreateIndex
CREATE INDEX "patient_lifestyles_lifestyleId_idx" ON "patient_lifestyles"("lifestyleId");

-- AddForeignKey
ALTER TABLE "patient_lifestyles" ADD CONSTRAINT "patient_lifestyles_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_lifestyles" ADD CONSTRAINT "patient_lifestyles_lifestyleId_fkey" FOREIGN KEY ("lifestyleId") REFERENCES "lifestyles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
