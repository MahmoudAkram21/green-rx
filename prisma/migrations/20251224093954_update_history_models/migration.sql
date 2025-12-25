/*
  Warnings:

  - You are about to drop the column `condition` on the `family_histories` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `medical_histories` table. All the data in the column will be lost.
  - Added the required column `diseaseId` to the `family_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `family_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diseaseId` to the `medical_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `medical_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "family_histories" DROP COLUMN "condition",
ADD COLUMN     "diseaseId" INTEGER NOT NULL,
ADD COLUMN     "severity" "DiseaseSeverity" NOT NULL;

-- AlterTable
ALTER TABLE "medical_histories" DROP COLUMN "condition",
ADD COLUMN     "diseaseId" INTEGER NOT NULL,
ADD COLUMN     "severity" "DiseaseSeverity" NOT NULL;

-- CreateIndex
CREATE INDEX "family_histories_diseaseId_idx" ON "family_histories"("diseaseId");

-- CreateIndex
CREATE INDEX "medical_histories_diseaseId_idx" ON "medical_histories"("diseaseId");

-- AddForeignKey
ALTER TABLE "medical_histories" ADD CONSTRAINT "medical_histories_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_histories" ADD CONSTRAINT "family_histories_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
