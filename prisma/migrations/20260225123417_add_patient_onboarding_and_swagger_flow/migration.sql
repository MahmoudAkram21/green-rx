-- AlterTable
ALTER TABLE "lifestyles" ADD COLUMN     "dietaryHabits" TEXT,
ADD COLUMN     "physicalActivity" TEXT;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "bloodType" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "surgical_histories" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "operationName" TEXT NOT NULL,
    "surgeryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surgical_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "surgical_histories_patientId_idx" ON "surgical_histories"("patientId");

-- AddForeignKey
ALTER TABLE "surgical_histories" ADD CONSTRAINT "surgical_histories_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
