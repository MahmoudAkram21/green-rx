-- CreateEnum
CREATE TYPE "FamilyRelation" AS ENUM ('Father', 'Mother', 'Sibling', 'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Child', 'Other');

-- AlterTable: preserve existing data by adding new column, backfilling, then swapping
ALTER TABLE "family_histories" ADD COLUMN "relation_new" "FamilyRelation";

-- Backfill: map existing string values to enum (unknown -> 'Other')
UPDATE "family_histories"
SET "relation_new" = CASE
  WHEN "relation" = 'Father' THEN 'Father'::"FamilyRelation"
  WHEN "relation" = 'Mother' THEN 'Mother'::"FamilyRelation"
  WHEN "relation" = 'Sibling' THEN 'Sibling'::"FamilyRelation"
  WHEN "relation" = 'Grandfather' THEN 'Grandfather'::"FamilyRelation"
  WHEN "relation" = 'Grandmother' THEN 'Grandmother'::"FamilyRelation"
  WHEN "relation" = 'Uncle' THEN 'Uncle'::"FamilyRelation"
  WHEN "relation" = 'Aunt' THEN 'Aunt'::"FamilyRelation"
  WHEN "relation" = 'Child' THEN 'Child'::"FamilyRelation"
  WHEN "relation" = 'Other' THEN 'Other'::"FamilyRelation"
  ELSE 'Other'::"FamilyRelation"
END;

ALTER TABLE "family_histories" ALTER COLUMN "relation_new" SET NOT NULL;
ALTER TABLE "family_histories" DROP COLUMN "relation";
ALTER TABLE "family_histories" RENAME COLUMN "relation_new" TO "relation";
