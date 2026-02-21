-- RMMSY spec: Company address, governorate, country
ALTER TABLE "companies" ADD COLUMN "address" TEXT;
ALTER TABLE "companies" ADD COLUMN "governorate" TEXT;
ALTER TABLE "companies" ADD COLUMN "country" TEXT;

-- RMMSY spec: Patient dateOfBirth, pregnancyStatus, trimester
ALTER TABLE "patients" ADD COLUMN "dateOfBirth" TIMESTAMP(3);
ALTER TABLE "patients" ADD COLUMN "pregnancyStatus" BOOLEAN;
ALTER TABLE "patients" ADD COLUMN "trimester" INTEGER;

-- RMMSY spec: Allergy allergenType (Drug | Food)
ALTER TABLE "allergies" ADD COLUMN "allergenType" TEXT;
