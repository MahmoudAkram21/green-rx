/*
  Warnings:

  - The values [Critical] on the enum `DiseaseSeverity` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `operationName` on the `surgical_histories` table. All the data in the column will be lost.
  - Added the required column `operationId` to the `surgical_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DiseaseSeverity_new" AS ENUM ('None', 'Mild', 'Moderate', 'Severe');
ALTER TABLE "medical_histories" ALTER COLUMN "severity" TYPE "DiseaseSeverity_new" USING ("severity"::text::"DiseaseSeverity_new");
ALTER TABLE "family_histories" ALTER COLUMN "severity" TYPE "DiseaseSeverity_new" USING ("severity"::text::"DiseaseSeverity_new");
ALTER TABLE "diseases" ALTER COLUMN "severity" TYPE "DiseaseSeverity_new" USING ("severity"::text::"DiseaseSeverity_new");
ALTER TABLE "patient_diseases" ALTER COLUMN "severity" TYPE "DiseaseSeverity_new" USING ("severity"::text::"DiseaseSeverity_new");
ALTER TYPE "DiseaseSeverity" RENAME TO "DiseaseSeverity_old";
ALTER TYPE "DiseaseSeverity_new" RENAME TO "DiseaseSeverity";
DROP TYPE "public"."DiseaseSeverity_old";
COMMIT;

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "licenseImageUrl" TEXT;

-- AlterTable
ALTER TABLE "surgical_histories" DROP COLUMN "operationName",
ADD COLUMN     "operationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "operations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "surgical_histories" ADD CONSTRAINT "surgical_histories_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "operations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
