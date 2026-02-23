-- CreateTable
CREATE TABLE "patient_medicines" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "tradeNameId" INTEGER,
    "activeSubstanceId" INTEGER,
    "medicineName" TEXT NOT NULL,
    "dosage" TEXT,
    "frequency" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isOngoing" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "imageUrl" TEXT,
    "imageFileName" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedBy" INTEGER,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_medicines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "patient_medicines_patientId_idx" ON "patient_medicines"("patientId");

-- CreateIndex
CREATE INDEX "patient_medicines_tradeNameId_idx" ON "patient_medicines"("tradeNameId");

-- CreateIndex
CREATE INDEX "patient_medicines_isOngoing_idx" ON "patient_medicines"("isOngoing");

-- AddForeignKey
ALTER TABLE "patient_medicines" ADD CONSTRAINT "patient_medicines_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_medicines" ADD CONSTRAINT "patient_medicines_tradeNameId_fkey" FOREIGN KEY ("tradeNameId") REFERENCES "trade_names"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_medicines" ADD CONSTRAINT "patient_medicines_activeSubstanceId_fkey" FOREIGN KEY ("activeSubstanceId") REFERENCES "active_substances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_medicines" ADD CONSTRAINT "patient_medicines_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
