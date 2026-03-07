import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "../generated/client/client";
import * as bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // ============================================
  // CLEANUP: Delete existing data in reverse dependency order
  // ============================================
  console.log("\n🧹 Cleaning up existing data...");

  // Delete all dependent data first
  await prisma.patientSideEffect.deleteMany();
  await prisma.patientShareToken.deleteMany();
  await prisma.patientMedicine.deleteMany();
  await prisma.drugInteractionAlert.deleteMany();
  await prisma.prescriptionVersion.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.patientDoctor.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.visit.deleteMany();
  await prisma.patientShareLink.deleteMany();
  await prisma.medicalReport.deleteMany();
  await prisma.adverseDrugReaction.deleteMany();
  await prisma.childProfile.deleteMany();
  await prisma.patientLifestyle.deleteMany();
  await prisma.lifestyle.deleteMany();
  await prisma.patientAllergy.deleteMany();
  await prisma.allergen.deleteMany();
  await prisma.patientDisease.deleteMany();
  await prisma.familyHistory.deleteMany();
  await prisma.medicalHistory.deleteMany();
  await prisma.surgicalHistory.deleteMany();
  await prisma.operation.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.pharmacist.deleteMany();
  await prisma.session.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();

  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();

  // P0: Delete tables that reference users BEFORE deleting users
  await prisma.diseaseWarningRule.deleteMany();
  await prisma.medicineSuggestion.deleteMany();

  // Delete import/export histories BEFORE users (they reference users)
  await prisma.importHistory.deleteMany();
  await prisma.exportHistory.deleteMany();

  // Now we can delete users
  await prisma.user.deleteMany();

  // Delete other data
  await prisma.pricingPlan.deleteMany();
  await prisma.diseaseActiveSubstanceWarning.deleteMany();
  await prisma.disease.deleteMany();
  await prisma.batchHistory.deleteMany();
  await prisma.contractingCompanyTradeName.deleteMany();
  await prisma.contractingCompany.deleteMany();
  await prisma.tradeName.deleteMany();
  await prisma.medicineAlternative.deleteMany();
  await prisma.medicationSideEffect.deleteMany();
  await prisma.sideEffect.deleteMany();
  await prisma.activeSubstance.deleteMany();
  await prisma.company.deleteMany();
  await prisma.contraindicationTermMapping.deleteMany();

  console.log("✅ Cleanup completed");

  // ============================================
  // SECTION 1: COMPANIES
  // ============================================
  console.log("\n📦 Creating companies...");
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: "Pfizer Inc.",
        contactInfo: {
          phone: "+1-212-733-2323",
          email: "contact@pfizer.com",
          website: "https://www.pfizer.com",
        },
        address: "235 East 42nd Street",
        governorate: "New York",
        country: "USA",
      },
    }),
    prisma.company.create({
      data: {
        name: "Novartis AG",
        contactInfo: {
          phone: "+41-61-324-1111",
          email: "info@novartis.com",
          website: "https://www.novartis.com",
        },
        address: "Lichtstrasse 35",
        governorate: "Basel-Stadt",
        country: "Switzerland",
      },
    }),
    prisma.company.create({
      data: {
        name: "GlaxoSmithKline",
        contactInfo: {
          phone: "+44-20-8047-5000",
          email: "contact@gsk.com",
          website: "https://www.gsk.com",
        },
        address: "980 Great West Road",
        governorate: "Brentford",
        country: "United Kingdom",
      },
    }),
    prisma.company.create({
      data: {
        name: "Sanofi",
        contactInfo: {
          phone: "+33-1-53-77-40-00",
          email: "info@sanofi.com",
          website: "https://www.sanofi.com",
        },
        address: "54 Rue La Boétie",
        governorate: "Paris",
        country: "France",
      },
    }),
    prisma.company.create({
      data: {
        name: "Roche",
        contactInfo: {
          phone: "+41-61-688-1111",
          email: "contact@roche.com",
          website: "https://www.roche.com",
        },
        address: "Grenzacherstrasse 124",
        governorate: "Basel",
        country: "Switzerland",
      },
    }),
  ]);
  console.log(`✅ Created ${companies.length} companies`);

  // ============================================
  // SECTION 2: ACTIVE SUBSTANCES
  // ============================================
  console.log("\n💊 Creating active substances...");
  const activeSubstances = await Promise.all([
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Paracetamol",
        concentration: "500mg",
        classification: "Analgesic/Antipyretic",
        dosageForm: "Tablet",
        indication: "Pain relief and fever reduction",
        adultDoseMaxPerDay: "4000mg",
        pediatricDose: "10-15mg/kg every 4-6 hours",
        pregnancyWarning: "Category B - Generally safe",
        lactationWarning: "Compatible with breastfeeding",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Ibuprofen",
        concentration: "400mg",
        classification: "NSAID",
        dosageForm: "Tablet",
        indication: "Pain, inflammation, and fever",
        adultDoseMaxPerDay: "2400mg",
        pediatricDose: "5-10mg/kg every 6-8 hours",
        pregnancyWarning: "Category C - Use with caution",
        gitWarning: "May cause gastric irritation",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Amoxicillin",
        concentration: "500mg",
        classification: "Antibiotic (Penicillin)",
        dosageForm: "Capsule",
        indication: "Bacterial infections",
        adultDoseMaxPerDay: "3000mg",
        pediatricDose: "20-40mg/kg/day divided",
        contraindications: ["Penicillin allergy"],
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Metformin",
        concentration: "500mg",
        classification: "Antidiabetic (Biguanide)",
        dosageForm: "Tablet",
        indication: "Type 2 Diabetes Mellitus",
        adultDoseMaxPerDay: "2550mg",
        renalWarning: "Contraindicated in severe renal impairment",
        hepaticWarning: "Use with caution in hepatic disease",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Amlodipine",
        concentration: "5mg",
        classification: "Calcium Channel Blocker",
        dosageForm: "Tablet",
        indication: "Hypertension, Angina",
        adultDoseMaxPerDay: "10mg",
        cardiacWarning: "Monitor blood pressure",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Omeprazole",
        concentration: "20mg",
        classification: "Proton Pump Inhibitor",
        dosageForm: "Capsule",
        indication: "GERD, Peptic ulcer",
        adultDoseMaxPerDay: "40mg",
        hepaticWarning: "Dose adjustment may be needed",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Atorvastatin",
        concentration: "20mg",
        classification: "Statin",
        dosageForm: "Tablet",
        indication: "Hyperlipidemia",
        adultDoseMaxPerDay: "80mg",
        musculoSkeletalWarning: "May cause myalgia",
        hepaticWarning: "Monitor liver enzymes",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Salbutamol",
        concentration: "100mcg",
        dosageForm: "Inhaler",
        classification: "Beta-2 Agonist",
        indication: "Asthma, COPD",
        adultDoseMaxPerDay: "800mcg",
        cardiacWarning: "Use with caution in cardiac disease",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Cetirizine",
        concentration: "10mg",
        classification: "Antihistamine",
        dosageForm: "Tablet",
        indication: "Allergic rhinitis, Urticaria",
        adultDoseMaxPerDay: "10mg",
        nervousSystemWarning: "May cause drowsiness",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        activeSubstance: "Losartan",
        concentration: "50mg",
        classification: "ARB (Angiotensin Receptor Blocker)",
        dosageForm: "Tablet",
        indication: "Hypertension, Heart failure",
        adultDoseMaxPerDay: "100mg",
        pregnancyWarning: "Category D - Contraindicated",
        renalWarning: "Monitor renal function",
      },
    }),
  ]);
  console.log(`✅ Created ${activeSubstances.length} active substances`);

  // ============================================
  // SECTION 3: TRADE NAMES
  // ============================================
  console.log("\n🏷️  Creating trade names...");
  const tradeNames = await Promise.all([
    prisma.tradeName.create({
      data: {
        title: "Panadol",
        activeSubstanceId: activeSubstances[0].id,
        companyId: companies[2].id, // GSK
        availabilityStatus: "InStock",
        stockQuantity: 5000,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Brufen",
        activeSubstanceId: activeSubstances[1].id,
        companyId: companies[0].id, // Pfizer
        availabilityStatus: "InStock",
        stockQuantity: 3000,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Amoxil",
        activeSubstanceId: activeSubstances[2].id,
        companyId: companies[2].id, // GSK
        availabilityStatus: "InStock",
        stockQuantity: 2000,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Glucophage",
        activeSubstanceId: activeSubstances[3].id,
        companyId: companies[3].id, // Sanofi
        availabilityStatus: "InStock",
        stockQuantity: 4000,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Norvasc",
        activeSubstanceId: activeSubstances[4].id,
        companyId: companies[0].id, // Pfizer
        availabilityStatus: "InStock",
        stockQuantity: 3500,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Losec",
        activeSubstanceId: activeSubstances[5].id,
        companyId: companies[1].id, // Novartis
        availabilityStatus: "InStock",
        stockQuantity: 2500,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Lipitor",
        activeSubstanceId: activeSubstances[6].id,
        companyId: companies[0].id, // Pfizer
        availabilityStatus: "InStock",
        stockQuantity: 4500,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Ventolin",
        activeSubstanceId: activeSubstances[7].id,
        companyId: companies[2].id, // GSK
        availabilityStatus: "InStock",
        stockQuantity: 1500,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Zyrtec",
        activeSubstanceId: activeSubstances[8].id,
        companyId: companies[1].id, // Novartis
        availabilityStatus: "InStock",
        stockQuantity: 3000,
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Cozaar",
        activeSubstanceId: activeSubstances[9].id,
        companyId: companies[0].id, // Pfizer
        availabilityStatus: "InStock",
        stockQuantity: 2800,
      },
    }),
  ]);
  console.log(`✅ Created ${tradeNames.length} trade names`);

  // ============================================
  // SECTION 4: DISEASES
  // ============================================
  console.log("\n🏥 Creating diseases...");
  const diseases = await Promise.all([
    prisma.disease.create({
      data: {
        name: "Type 2 Diabetes Mellitus",
        severity: "Moderate",
        description:
          "Chronic metabolic disorder characterized by high blood sugar levels",
      },
    }),
    prisma.disease.create({
      data: {
        name: "Hypertension",
        severity: "Moderate",
        description: "Persistently elevated blood pressure",
      },
    }),
    prisma.disease.create({
      data: {
        name: "Asthma",
        severity: "Mild",
        description: "Chronic inflammatory disease of the airways",
      },
    }),
    prisma.disease.create({
      data: {
        name: "Gastroesophageal Reflux Disease (GERD)",
        severity: "Mild",
        description: "Chronic digestive disease",
      },
    }),
    prisma.disease.create({
      data: {
        name: "Hyperlipidemia",
        severity: "Moderate",
        description: "High levels of fats in the blood",
      },
    }),
    prisma.disease.create({
      data: {
        name: "Chronic Kidney Disease",
        severity: "Severe",
        description: "Gradual loss of kidney function",
      },
    }),
    prisma.disease.create({
      data: {
        name: "Allergic Rhinitis",
        severity: "Mild",
        description: "Inflammation of the nasal passages",
      },
    }),
    prisma.disease.create({
      data: {
        name: "Coronary Artery Disease",
        severity: "Severe",
        description: "Narrowing of the coronary arteries",
      },
    }),
  ]);
  console.log(`✅ Created ${diseases.length} diseases`);

  // ============================================
  // SECTION 5: PRICING PLANS
  // ============================================
  console.log("\n💰 Creating pricing plans...");
  const pricingPlans = await Promise.all([
    prisma.pricingPlan.create({
      data: {
        title: "Free Plan",
        price: 0,
        duration: 365,
        isDefault: true,
        features: [
          "Basic prescription management",
          "5 patients max",
          "Limited reports",
        ],
      },
    }),
    prisma.pricingPlan.create({
      data: {
        title: "Professional",
        price: 99.99,
        salePrice: 79.99,
        duration: 30,
        features: [
          "Unlimited patients",
          "Advanced analytics",
          "Priority support",
          "Drug interaction alerts",
        ],
      },
    }),
    prisma.pricingPlan.create({
      data: {
        title: "Enterprise",
        price: 299.99,
        duration: 30,
        features: [
          "All Professional features",
          "Custom integrations",
          "Dedicated account manager",
          "API access",
        ],
      },
    }),
  ]);
  console.log(`✅ Created ${pricingPlans.length} pricing plans`);

  // ============================================
  // SECTION 6: USERS
  // ============================================
  console.log("\n👥 Creating users...");
  const hashedPassword = await bcrypt.hash("Password@123", 10);

  // SuperAdmin
  const superAdmin = await prisma.user.create({
    data: {
      email: "superadmin@greenrx.com",
      passwordHash: hashedPassword,
      role: "SuperAdmin",
      emailVerified: true,
      isActive: true,
    },
  });
  console.log("✅ Created SuperAdmin user");

  // Admins
  const admin1 = await prisma.user.create({
    data: {
      email: "admin1@greenrx.com",
      passwordHash: hashedPassword,
      role: "Admin",
      emailVerified: true,
      isActive: true,
    },
  });

  await prisma.user.create({
    data: {
      email: "admin2@greenrx.com",
      passwordHash: hashedPassword,
      role: "Admin",
      emailVerified: true,
      isActive: true,
    },
  });
  console.log("✅ Created 2 Admin users");

  // Doctors
  const doctorUser1 = await prisma.user.create({
    data: {
      email: "dr.smith@greenrx.com",
      passwordHash: hashedPassword,
      role: "Doctor",
      emailVerified: true,
      isActive: true,
      doctor: {
        create: {
          name: "Dr. John Smith",
          licenseNumber: "MD-12345",
          specialization: "Cardiology",
          phoneNumber: "+1-555-0101",
          address: "123 Medical Center Dr",
          city: "New York",
          consultationFee: 150.0,
          isVerified: true,
          verifiedAt: new Date(),
        },
      },
    },
  });

  const doctorUser2 = await prisma.user.create({
    data: {
      email: "dr.johnson@greenrx.com",
      passwordHash: hashedPassword,
      role: "Doctor",
      emailVerified: true,
      isActive: true,
      doctor: {
        create: {
          name: "Dr. Sarah Johnson",
          licenseNumber: "MD-67890",
          specialization: "Pediatrics",
          phoneNumber: "+1-555-0102",
          address: "456 Children Hospital",
          city: "Los Angeles",
          consultationFee: 120.0,
          isVerified: true,
          verifiedAt: new Date(),
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "dr.williams@greenrx.com",
      passwordHash: hashedPassword,
      role: "Doctor",
      emailVerified: true,
      isActive: true,
      doctor: {
        create: {
          name: "Dr. Michael Williams",
          licenseNumber: "MD-11223",
          specialization: "General Medicine",
          phoneNumber: "+1-555-0103",
          address: "789 Health Clinic",
          city: "Chicago",
          consultationFee: 100.0,
          isVerified: true,
          verifiedAt: new Date(),
        },
      },
    },
  });

  // Add unverified doctors for testing verification workflow
  await prisma.user.create({
    data: {
      email: "dr.pending1@greenrx.com",
      passwordHash: hashedPassword,
      role: "Doctor",
      emailVerified: true,
      isActive: true,
      doctor: {
        create: {
          name: "Dr. Emily Chen",
          licenseNumber: "MD-99887",
          specialization: "Dermatology",
          phoneNumber: "+1-555-0201",
          address: "321 Skin Care Center",
          city: "Boston",
          consultationFee: 180.0,
          isVerified: false, // PENDING VERIFICATION
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "dr.pending2@greenrx.com",
      passwordHash: hashedPassword,
      role: "Doctor",
      emailVerified: true,
      isActive: true,
      doctor: {
        create: {
          name: "Dr. Robert Kumar",
          licenseNumber: "MD-55443",
          specialization: "Neurology",
          phoneNumber: "+1-555-0202",
          address: "654 Brain & Nerve Clinic",
          city: "San Francisco",
          consultationFee: 200.0,
          isVerified: false, // PENDING VERIFICATION
        },
      },
    },
  });
  console.log("✅ Created 3 Verified Doctor users + 2 Pending Verification");

  // Pharmacists
  await prisma.user.create({
    data: {
      email: "pharmacist1@greenrx.com",
      passwordHash: hashedPassword,
      role: "Pharmacist",
      emailVerified: true,
      isActive: true,
      pharmacist: {
        create: {
          name: "Emily Davis",
          licenseNumber: "PH-54321",
          pharmacyName: "City Pharmacy",
          phoneNumber: "+1-555-0201",
          address: "321 Main Street",
          city: "Boston",
          isVerified: true,
          verifiedAt: new Date(),
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "pharmacist2@greenrx.com",
      passwordHash: hashedPassword,
      role: "Pharmacist",
      emailVerified: true,
      isActive: true,
      pharmacist: {
        create: {
          name: "Robert Brown",
          licenseNumber: "PH-98765",
          pharmacyName: "HealthPlus Pharmacy",
          phoneNumber: "+1-555-0202",
          address: "654 Park Avenue",
          city: "Miami",
          isVerified: true,
          verifiedAt: new Date(),
        },
      },
    },
  });
  console.log("✅ Created 2 Pharmacist users");

  // Patients (name on User; age/ageClassification from dateOfBirth; smoking in lifestyle questions)
  const patientUser1 = await prisma.user.create({
    data: {
      email: "patient1@greenrx.com",
      name: "Alice Cooper",
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          age: 45,
          ageClassification: "Adults",
          dateOfBirth: new Date("1979-05-15"),
          weight: 70.5,
          height: 165,
          gender: "Female",
          pregnancyWarning: false,
          lactation: false,
          profileCompleteness: 85,
        },
      },
    },
  });

  const patientUser2 = await prisma.user.create({
    data: {
      email: "patient2@greenrx.com",
      name: "Bob Martinez",
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          age: 62,
          ageClassification: "Elderly",
          dateOfBirth: new Date("1962-08-22"),
          weight: 85.0,
          height: 178,
          gender: "Male",
          pregnancyWarning: false,
          lactation: false,
          profileCompleteness: 75,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "patient3@greenrx.com",
      name: "Carol White",
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          age: 28,
          ageClassification: "Adults",
          dateOfBirth: new Date("1996-03-10"),
          weight: 62.0,
          height: 160,
          gender: "Female",
          pregnancyWarning: true,
          pregnancyStatus: true,
          trimester: 2,
          lactation: false,
          profileCompleteness: 90,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "patient4@greenrx.com",
      name: "David Lee",
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          age: 35,
          ageClassification: "Adults",
          dateOfBirth: new Date("1989-11-01"),
          weight: 78.5,
          height: 175,
          gender: "Male",
          pregnancyWarning: false,
          lactation: false,
          profileCompleteness: 80,
        },
      },
    },
  });

  const patientUser5 = await prisma.user.create({
    data: {
      email: "patient5@greenrx.com",
      name: "Emma Thompson",
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          age: 8,
          ageClassification: "Children",
          dateOfBirth: new Date("2016-07-20"),
          weight: 25.0,
          height: 125,
          gender: "Female",
          pregnancyWarning: false,
          lactation: false,
          profileCompleteness: 70,
        },
      },
    },
  });
  console.log("✅ Created 5 Patient users");

  // Get the created doctors and patients
  const doctors = await prisma.doctor.findMany();
  const patients = await prisma.patient.findMany();

  // ============================================
  // SECTION 6b: OPERATIONS (for surgical history dropdown)
  // ============================================
  console.log("\n🏥 Creating operations...");
  const opAppendectomy = await prisma.operation.create({ data: { name: "Appendectomy" } });
  const opCholecystectomy = await prisma.operation.create({ data: { name: "Cholecystectomy" } });
  const opCataractSurgery = await prisma.operation.create({ data: { name: "Cataract Surgery" } });
  const opKneeReplacement = await prisma.operation.create({ data: { name: "Knee Replacement" } });
  await prisma.operation.create({ data: { name: "Cesarean Section" } });
  const opTonsillectomy = await prisma.operation.create({ data: { name: "Tonsillectomy" } });
  const opHerniaRepair = await prisma.operation.create({ data: { name: "Hernia Repair" } });
  await prisma.operation.create({ data: { name: "Hysterectomy" } });
  await prisma.operation.create({ data: { name: "Gallbladder Removal" } });
  console.log("✅ Created 9 operations");

  // ============================================
  // SECTION 7: SUBSCRIPTIONS
  // ============================================
  console.log("\n📅 Creating subscriptions...");
  const subscriptions = await Promise.all([
    prisma.subscription.create({
      data: {
        userId: doctorUser1.id,
        pricingPlanId: pricingPlans[1].id, // Professional
        status: "Active",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    }),
    prisma.subscription.create({
      data: {
        userId: doctorUser2.id,
        pricingPlanId: pricingPlans[2].id, // Enterprise
        status: "Active",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  console.log(`✅ Created ${subscriptions.length} subscriptions`);

  // ============================================
  // SECTION 8: COMPREHENSIVE PATIENT MEDICAL DATA
  // ============================================
  console.log("\n🩺 Creating comprehensive patient medical data...");

  // Medical Histories for all patients - Comprehensive
  await prisma.medicalHistory.createMany({
    data: [
      // Patient 1 (Alice Cooper) - Multiple conditions
      {
        patientId: patients[0].id,
        diseaseId: diseases[0].id, // Type 2 Diabetes
        severity: "Moderate",
        diagnosisDate: new Date("2018-03-15"),
        treatment:
          "Metformin 500mg twice daily, lifestyle modifications, regular exercise",
        status: "Chronic",
        notes:
          "Well controlled with medication. HbA1c: 6.8% (last check). Fasting glucose: 110-120 mg/dL. Patient compliant with diet and medication.",
      },
      {
        patientId: patients[0].id,
        diseaseId: diseases[1].id, // Hypertension (secondary)
        severity: "Mild",
        diagnosisDate: new Date("2019-05-20"),
        treatment: "Lifestyle modifications, monitoring",
        status: "Active",
        notes:
          "Borderline hypertension, managed with diet and exercise. BP: 135/88 mmHg",
      },
      // Patient 2 (Bob Martinez) - Multiple chronic conditions
      {
        patientId: patients[1].id,
        diseaseId: diseases[1].id, // Hypertension
        severity: "Moderate",
        diagnosisDate: new Date("2015-06-20"),
        treatment:
          "Amlodipine 5mg once daily, low sodium diet, regular monitoring",
        status: "Chronic",
        notes:
          "BP controlled. Last reading: 130/85 mmHg. Patient advised to reduce salt intake and maintain healthy weight.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[4].id, // Hyperlipidemia
        severity: "Moderate",
        diagnosisDate: new Date("2019-01-10"),
        treatment: "Atorvastatin 20mg at bedtime, dietary modifications",
        status: "Chronic",
        notes:
          "Cholesterol levels improving. Total cholesterol: 180 mg/dL (down from 240). LDL: 110 mg/dL. Triglycerides: 150 mg/dL.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[7].id, // Coronary Artery Disease (family history concern)
        severity: "Mild",
        diagnosisDate: new Date("2020-08-15"),
        treatment: "Preventive measures, regular cardiac monitoring",
        status: "Active",
        notes:
          "High risk due to family history. Regular EKG and stress tests recommended. Currently asymptomatic.",
      },
      // Patient 3 (Carol White) - Allergic conditions
      {
        patientId: patients[2].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        diagnosisDate: new Date("2020-04-10"),
        treatment:
          "Cetirizine 10mg as needed, nasal corticosteroid spray, allergen avoidance",
        status: "Active",
        notes:
          "Seasonal allergies, worse in spring (pollen) and fall (ragweed). Symptoms include sneezing, nasal congestion, and itchy eyes.",
      },
      {
        patientId: patients[2].id,
        diseaseId: diseases[2].id, // Asthma (mild, exercise-induced)
        severity: "Mild",
        diagnosisDate: new Date("2021-09-05"),
        treatment: "Salbutamol inhaler before exercise, avoid triggers",
        status: "Active",
        notes:
          "Exercise-induced asthma. Symptoms occur during vigorous exercise. Well controlled with pre-exercise medication.",
      },
      // Patient 4 (David Lee) - GERD and related
      {
        patientId: patients[3].id,
        diseaseId: diseases[3].id, // GERD
        severity: "Mild",
        diagnosisDate: new Date("2021-08-15"),
        treatment:
          "Omeprazole 20mg once daily before breakfast, dietary modifications, elevate head of bed",
        status: "Active",
        notes:
          "Symptoms well controlled. Patient avoids trigger foods (spicy, acidic, fatty). No nighttime symptoms since treatment.",
      },
      {
        patientId: patients[3].id,
        diseaseId: diseases[1].id, // Hypertension (mild)
        severity: "Mild",
        diagnosisDate: new Date("2022-01-10"),
        treatment: "Lifestyle modifications, monitoring",
        status: "Active",
        notes:
          "Borderline hypertension. BP: 138/88 mmHg. Monitoring without medication initially.",
      },
      // Patient 5 (Emma Thompson) - Pediatric conditions
      {
        patientId: patients[4].id,
        diseaseId: diseases[2].id, // Asthma
        severity: "Mild",
        diagnosisDate: new Date("2022-02-20"),
        treatment:
          "Salbutamol inhaler as needed, avoid triggers (cold air, exercise, allergens)",
        status: "Active",
        notes:
          "Exercise-induced asthma. Symptoms occur during physical activity. Uses inhaler before PE class. No nighttime symptoms.",
      },
      {
        patientId: patients[4].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        diagnosisDate: new Date("2022-03-15"),
        treatment:
          "Cetirizine 5mg as needed (pediatric dose), nasal saline rinses",
        status: "Active",
        notes:
          "Seasonal allergies, primarily in spring. Symptoms include runny nose and sneezing.",
      },
    ],
  });

  // Surgical Histories (one entry per patient per operation — @@unique([patientId, operationId]))
  await prisma.surgicalHistory.createMany({
    data: [
      // Patient 1 (Alice Cooper)
      { patientId: patients[0].id, operationId: opAppendectomy.id, surgeryDate: new Date("2015-06-20") },
      { patientId: patients[0].id, operationId: opCataractSurgery.id, surgeryDate: new Date("2020-03-10") },
      // Patient 2 (Bob Martinez)
      { patientId: patients[1].id, operationId: opKneeReplacement.id, surgeryDate: new Date("2018-11-15") },
      { patientId: patients[1].id, operationId: opCholecystectomy.id, surgeryDate: new Date("2019-04-22") },
      // Patient 3 (Carol White)
      { patientId: patients[2].id, operationId: opTonsillectomy.id, surgeryDate: new Date("2010-08-05") },
      // Patient 4 (David Lee)
      { patientId: patients[3].id, operationId: opHerniaRepair.id, surgeryDate: new Date("2021-02-14") },
      // Patient 5 (Emma Thompson)
      { patientId: patients[4].id, operationId: opHerniaRepair.id, surgeryDate: new Date("2022-07-01") },
    ],
  });
  console.log("✅ Created surgical histories for patients");

  // Family Histories - Comprehensive
  await prisma.familyHistory.createMany({
    data: [
      // Patient 1 (Alice Cooper) - Family History
      {
        patientId: patients[0].id,
        relation: "Mother",
        diseaseId: diseases[0].id, // Diabetes
        severity: "Moderate",
        notes:
          "Diagnosed at age 55. Type 2 Diabetes. Currently on medication. HbA1c controlled around 7.0%",
      },
      {
        patientId: patients[0].id,
        relation: "Father",
        diseaseId: diseases[1].id, // Hypertension
        severity: "Moderate",
        notes:
          "Diagnosed at age 58. On antihypertensive medication. BP well controlled.",
      },
      {
        patientId: patients[0].id,
        relation: "Grandmother",
        diseaseId: diseases[0].id, // Diabetes
        severity: "Moderate",
        notes: "Type 2 Diabetes, diagnosed in her 60s",
      },
      {
        patientId: patients[0].id,
        relation: "Grandfather",
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes:
          "Heart attack at age 72. Had bypass surgery. Died at age 78 from cardiac complications.",
      },
      {
        patientId: patients[0].id,
        relation: "Sibling",
        diseaseId: diseases[0].id, // Diabetes
        severity: "Mild",
        notes: "Pre-diabetic, managing with diet and exercise",
      },
      // Patient 2 (Bob Martinez) - Extensive Family History
      {
        patientId: patients[1].id,
        relation: "Father",
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes:
          "Heart attack at age 65. Had triple bypass surgery. Currently on multiple cardiac medications.",
      },
      {
        patientId: patients[1].id,
        relation: "Father",
        diseaseId: diseases[1].id, // Hypertension
        severity: "Moderate",
        notes: "Hypertension diagnosed at age 60, before cardiac event",
      },
      {
        patientId: patients[1].id,
        relation: "Father",
        diseaseId: diseases[4].id, // Hyperlipidemia
        severity: "Moderate",
        notes: "High cholesterol, on statin therapy",
      },
      {
        patientId: patients[1].id,
        relation: "Mother",
        diseaseId: diseases[1].id, // Hypertension
        severity: "Mild",
        notes: "Borderline hypertension, managed with lifestyle",
      },
      {
        patientId: patients[1].id,
        relation: "Sibling",
        diseaseId: diseases[1].id, // Hypertension
        severity: "Mild",
        notes: "Diagnosed at age 45. On medication. Also has pre-diabetes.",
      },
      {
        patientId: patients[1].id,
        relation: "Sibling",
        diseaseId: diseases[4].id, // Hyperlipidemia
        severity: "Mild",
        notes: "Elevated cholesterol, managing with diet",
      },
      {
        patientId: patients[1].id,
        relation: "Grandfather",
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes: "Multiple heart attacks, died at age 70",
      },
      {
        patientId: patients[1].id,
        relation: "Uncle",
        diseaseId: diseases[0].id, // Diabetes
        severity: "Moderate",
        notes: "Type 2 Diabetes, diagnosed at age 50",
      },
      // Patient 3 (Carol White) - Allergic Family History
      {
        patientId: patients[2].id,
        relation: "Mother",
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Seasonal allergies, uses antihistamines as needed",
      },
      {
        patientId: patients[2].id,
        relation: "Father",
        diseaseId: diseases[2].id, // Asthma
        severity: "Moderate",
        notes:
          "Childhood asthma, now well controlled. Uses inhaler occasionally.",
      },
      {
        patientId: patients[2].id,
        relation: "Grandmother",
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Chronic allergies, multiple triggers",
      },
      {
        patientId: patients[2].id,
        relation: "Sibling",
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Similar seasonal allergy pattern",
      },
      {
        patientId: patients[2].id,
        relation: "Child",
        diseaseId: diseases[6].id, // Allergic Rhinitis (potential)
        severity: "None",
        notes: "Too young to diagnose, but monitoring for allergy symptoms",
      },
      // Patient 4 (David Lee) - GERD and Cardiovascular
      {
        patientId: patients[3].id,
        relation: "Father",
        diseaseId: diseases[3].id, // GERD
        severity: "Moderate",
        notes:
          "Chronic GERD, on long-term PPI therapy. Had endoscopy showing esophagitis.",
      },
      {
        patientId: patients[3].id,
        relation: "Father",
        diseaseId: diseases[1].id, // Hypertension
        severity: "Moderate",
        notes: "Hypertension, on medication",
      },
      {
        patientId: patients[3].id,
        relation: "Mother",
        diseaseId: diseases[1].id, // Hypertension
        severity: "Mild",
        notes: "Borderline hypertension",
      },
      {
        patientId: patients[3].id,
        relation: "Grandfather",
        diseaseId: diseases[3].id, // GERD
        severity: "Moderate",
        notes: "Chronic acid reflux, Barrett's esophagus",
      },
      {
        patientId: patients[3].id,
        relation: "Sibling",
        diseaseId: diseases[3].id, // GERD
        severity: "Mild",
        notes: "Occasional heartburn, manages with OTC medications",
      },
      // Patient 5 (Emma Thompson) - Pediatric Family History
      {
        patientId: patients[4].id,
        relation: "Mother",
        diseaseId: diseases[2].id, // Asthma
        severity: "Mild",
        notes: "Childhood asthma, resolved in adulthood",
      },
      {
        patientId: patients[4].id,
        relation: "Father",
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Seasonal allergies",
      },
      {
        patientId: patients[4].id,
        relation: "Grandmother",
        diseaseId: diseases[2].id, // Asthma
        severity: "Moderate",
        notes: "Adult-onset asthma, uses maintenance inhaler",
      },
      {
        patientId: patients[4].id,
        relation: "Uncle",
        diseaseId: diseases[2].id, // Asthma
        severity: "Mild",
        notes: "Exercise-induced asthma",
      },
    ],
  });

  // Allergen catalog (admin-managed). Patients link to these via PatientAllergy.
  const allergenPenicillin = await prisma.allergen.create({ data: { name: "Penicillin", allergenType: "Drug" } });
  const allergenSulfa = await prisma.allergen.create({ data: { name: "Sulfa drugs", allergenType: "Drug" } });
  const allergenPollen = await prisma.allergen.create({ data: { name: "Pollen", allergenType: "Pollen" } });
  const allergenShellfish = await prisma.allergen.create({ data: { name: "Shellfish", allergenType: "Food" } });
  const allergenDustMites = await prisma.allergen.create({ data: { name: "Dust mites", allergenType: "Dust" } });
  const allergenLatex = await prisma.allergen.create({ data: { name: "Latex", allergenType: "Other" } });
  const allergenPeanuts = await prisma.allergen.create({ data: { name: "Peanuts", allergenType: "Food" } });
  console.log("✅ Created allergen catalog");

  // Patient allergies (many-to-many: patient links to catalog)
  await prisma.patientAllergy.createMany({
    data: [
      { patientId: patients[0].id, allergenId: allergenPenicillin.id, severity: "Severe", reaction: "Anaphylaxis", notes: "Avoid all penicillin derivatives. Use alternative antibiotics." },
      { patientId: patients[0].id, allergenId: allergenSulfa.id, severity: "Moderate", reaction: "Rash", notes: "Mild rash, avoid sulfonamides" },
      { patientId: patients[1].id, allergenId: allergenPollen.id, severity: "Mild", reaction: "Rhinitis", notes: "Seasonal, spring and fall" },
      { patientId: patients[2].id, allergenId: allergenShellfish.id, severity: "Moderate", reaction: "Urticaria", notes: "Hives and swelling" },
      { patientId: patients[2].id, allergenId: allergenDustMites.id, severity: "Mild", reaction: "Rhinitis" },
      { patientId: patients[3].id, allergenId: allergenLatex.id, severity: "Moderate", reaction: "Contact dermatitis" },
      { patientId: patients[4].id, allergenId: allergenPeanuts.id, severity: "Severe", reaction: "Anaphylaxis", notes: "Life-threatening, carry epinephrine" },
    ],
  });
  console.log("✅ Created patient allergies");

  // Patient Diseases - Comprehensive
  await prisma.patientDisease.createMany({
    data: [
      // Patient 1 (Alice Cooper)
      {
        patientId: patients[0].id,
        diseaseId: diseases[0].id, // Diabetes
        diagnosisDate: new Date("2018-03-15"),
        severity: "Moderate",
        notes:
          "Type 2 Diabetes, well controlled. HbA1c: 6.8%. Fasting glucose: 110-120 mg/dL. Patient compliant with medication and diet.",
      },
      {
        patientId: patients[0].id,
        diseaseId: diseases[1].id, // Hypertension (borderline)
        diagnosisDate: new Date("2019-05-20"),
        severity: "Mild",
        notes:
          "Borderline hypertension. BP: 135/88 mmHg. Managing with lifestyle modifications.",
      },
      // Patient 2 (Bob Martinez)
      {
        patientId: patients[1].id,
        diseaseId: diseases[1].id, // Hypertension
        diagnosisDate: new Date("2015-06-20"),
        severity: "Moderate",
        notes:
          "Essential hypertension. BP controlled with medication. Last reading: 130/85 mmHg. Regular monitoring required.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[4].id, // Hyperlipidemia
        diagnosisDate: new Date("2019-01-10"),
        severity: "Moderate",
        notes:
          "Mixed hyperlipidemia. Total cholesterol: 180 mg/dL (down from 240). LDL: 110 mg/dL. Triglycerides: 150 mg/dL. Responding well to statin therapy.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[7].id, // Coronary Artery Disease (high risk)
        diagnosisDate: new Date("2020-08-15"),
        severity: "Mild",
        notes:
          "High risk due to family history. Regular cardiac monitoring. Currently asymptomatic. EKG normal. Stress test pending.",
      },
      // Patient 3 (Carol White)
      {
        patientId: patients[2].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        diagnosisDate: new Date("2020-04-10"),
        severity: "Mild",
        notes:
          "Seasonal allergic rhinitis. Primary triggers: pollen (spring), ragweed (fall). Symptoms include sneezing, nasal congestion, itchy eyes.",
      },
      {
        patientId: patients[2].id,
        diseaseId: diseases[2].id, // Asthma (exercise-induced)
        diagnosisDate: new Date("2021-09-05"),
        severity: "Mild",
        notes:
          "Exercise-induced asthma. Symptoms occur during vigorous exercise. Well controlled with pre-exercise bronchodilator.",
      },
      // Patient 4 (David Lee)
      {
        patientId: patients[3].id,
        diseaseId: diseases[3].id, // GERD
        diagnosisDate: new Date("2021-08-15"),
        severity: "Mild",
        notes:
          "Gastroesophageal reflux disease. Symptoms well controlled with PPI therapy. No nighttime symptoms. Avoids trigger foods.",
      },
      {
        patientId: patients[3].id,
        diseaseId: diseases[1].id, // Hypertension (borderline)
        diagnosisDate: new Date("2022-01-10"),
        severity: "Mild",
        notes:
          "Borderline hypertension. BP: 138/88 mmHg. Monitoring without medication initially. Lifestyle modifications recommended.",
      },
      // Patient 5 (Emma Thompson)
      {
        patientId: patients[4].id,
        diseaseId: diseases[2].id, // Asthma
        diagnosisDate: new Date("2022-02-20"),
        severity: "Mild",
        notes:
          "Exercise-induced asthma in pediatric patient. Uses rescue inhaler before physical activity. No nighttime symptoms. Regular monitoring.",
      },
      {
        patientId: patients[4].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        diagnosisDate: new Date("2022-03-15"),
        severity: "Mild",
        notes:
          "Seasonal allergies, primarily in spring. Symptoms include runny nose and sneezing. Managed with pediatric dose antihistamines.",
      },
    ],
  });

  // Lifestyle catalog (admin-managed questions + ActiveSubstance field for drug warnings)
  const lifestyleAlcohol = await prisma.lifestyle.create({
    data: { question: "Alcohol use", activeSubstanceField: "interactionAlcohol" },
  });
  const lifestyleCaffeine = await prisma.lifestyle.create({
    data: { question: "Excess caffeine / xanthines", activeSubstanceField: "interactionXanthines" },
  });
  const lifestyleVitaminsFood = await prisma.lifestyle.create({
    data: { question: "Vitamins / food interactions", activeSubstanceField: "interactionVitaminsFood" },
  });
  const lifestyleMuscleRelaxant = await prisma.lifestyle.create({
    data: { question: "Muscle relaxant use", activeSubstanceField: "interactionMuscleRelaxant" },
  });
  const lifestyleAnticoagulant = await prisma.lifestyle.create({
    data: { question: "Anticoagulant use", activeSubstanceField: "interactionAnticoagulant" },
  });
  const lifestyleCorticosteroids = await prisma.lifestyle.create({
    data: { question: "Corticosteroid use", activeSubstanceField: "interactionCorticosteroids" },
  });

  // Patient lifestyle answers (many-to-many: patientId, lifestyleId, value) — all patients have answers for all questions
  await prisma.patientLifestyle.createMany({
    data: [
      // Patient 0
      { patientId: patients[0].id, lifestyleId: lifestyleAlcohol.id, value: false },
      { patientId: patients[0].id, lifestyleId: lifestyleCaffeine.id, value: true },
      { patientId: patients[0].id, lifestyleId: lifestyleVitaminsFood.id, value: true },
      { patientId: patients[0].id, lifestyleId: lifestyleMuscleRelaxant.id, value: false },
      { patientId: patients[0].id, lifestyleId: lifestyleAnticoagulant.id, value: false },
      { patientId: patients[0].id, lifestyleId: lifestyleCorticosteroids.id, value: false },
      // Patient 1
      { patientId: patients[1].id, lifestyleId: lifestyleAlcohol.id, value: false },
      { patientId: patients[1].id, lifestyleId: lifestyleCaffeine.id, value: false },
      { patientId: patients[1].id, lifestyleId: lifestyleVitaminsFood.id, value: false },
      { patientId: patients[1].id, lifestyleId: lifestyleMuscleRelaxant.id, value: false },
      { patientId: patients[1].id, lifestyleId: lifestyleAnticoagulant.id, value: true },
      { patientId: patients[1].id, lifestyleId: lifestyleCorticosteroids.id, value: false },
      // Patient 2
      { patientId: patients[2].id, lifestyleId: lifestyleAlcohol.id, value: false },
      { patientId: patients[2].id, lifestyleId: lifestyleCaffeine.id, value: false },
      { patientId: patients[2].id, lifestyleId: lifestyleVitaminsFood.id, value: true },
      { patientId: patients[2].id, lifestyleId: lifestyleMuscleRelaxant.id, value: false },
      { patientId: patients[2].id, lifestyleId: lifestyleAnticoagulant.id, value: false },
      { patientId: patients[2].id, lifestyleId: lifestyleCorticosteroids.id, value: true },
      // Patient 3
      { patientId: patients[3].id, lifestyleId: lifestyleAlcohol.id, value: false },
      { patientId: patients[3].id, lifestyleId: lifestyleCaffeine.id, value: true },
      { patientId: patients[3].id, lifestyleId: lifestyleVitaminsFood.id, value: false },
      { patientId: patients[3].id, lifestyleId: lifestyleMuscleRelaxant.id, value: true },
      { patientId: patients[3].id, lifestyleId: lifestyleAnticoagulant.id, value: false },
      { patientId: patients[3].id, lifestyleId: lifestyleCorticosteroids.id, value: false },
      // Patient 4
      { patientId: patients[4].id, lifestyleId: lifestyleAlcohol.id, value: false },
      { patientId: patients[4].id, lifestyleId: lifestyleCaffeine.id, value: false },
      { patientId: patients[4].id, lifestyleId: lifestyleVitaminsFood.id, value: false },
      { patientId: patients[4].id, lifestyleId: lifestyleMuscleRelaxant.id, value: false },
      { patientId: patients[4].id, lifestyleId: lifestyleAnticoagulant.id, value: false },
      { patientId: patients[4].id, lifestyleId: lifestyleCorticosteroids.id, value: false },
    ],
  });

  const lifestyleCatalogCount = await prisma.lifestyle.count();
  const patientLifestyleCount = await prisma.patientLifestyle.count();

  // Child Profiles (for patients who are parents)
  await prisma.childProfile.createMany({
    data: [
      {
        parentPatientId: patients[2].id, // Carol White
        name: "Sophie White",
        dateOfBirth: new Date("2020-05-15"),
        gender: "Female",
        weight: 15.5,
        height: 95,
        ageClassification: "Toddlers",
        allergies: [
          { allergen: "Eggs", severity: "Mild", reactionType: "Rash" },
        ],
        diseases: [],
        medicalHistory: { vaccinations: "Up to date", notes: "Healthy child" },
      },
      {
        parentPatientId: patients[3].id, // David Lee
        name: "James Lee",
        dateOfBirth: new Date("2019-11-20"),
        gender: "Male",
        weight: 18.0,
        height: 105,
        ageClassification: "Toddlers",
        allergies: [],
        diseases: [],
        medicalHistory: { vaccinations: "Up to date" },
      },
    ],
  });

  const medicalHistoryCount = await prisma.medicalHistory.count();
  const familyHistoryCount = await prisma.familyHistory.count();
  const allergyCount = await prisma.patientAllergy.count();
  const patientDiseaseCount = await prisma.patientDisease.count();
  const childProfileCount = await prisma.childProfile.count();

  console.log("✅ Created comprehensive patient medical data");
  console.log(`   - ${medicalHistoryCount} Medical History records`);
  console.log(`   - ${familyHistoryCount} Family History records`);
  console.log(`   - ${allergyCount} Allergy records`);
  console.log(`   - ${patientDiseaseCount} Patient Disease records`);
  console.log(`   - ${lifestyleCatalogCount} Lifestyle catalog, ${patientLifestyleCount} PatientLifestyle records`);
  console.log(`   - ${childProfileCount} Child Profile records`);

  // ============================================
  // SECTION 9: PATIENT-DOCTOR RELATIONSHIPS
  // ============================================
  console.log("\n👨‍⚕️ Creating patient-doctor relationships...");
  // Assign all 5 patients to the first doctor (Dr. John Smith) so the doctor can get full patient data for each
  await prisma.patientDoctor.createMany({
    data: [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        relationshipType: "PrimaryCare",
        startDate: new Date("2020-01-01"),
        isActive: true,
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[0].id,
        relationshipType: "PrimaryCare",
        startDate: new Date("2019-06-15"),
        isActive: true,
      },
      {
        patientId: patients[2].id,
        doctorId: doctors[0].id,
        relationshipType: "PrimaryCare",
        startDate: new Date("2021-03-20"),
        isActive: true,
      },
      {
        patientId: patients[3].id,
        doctorId: doctors[0].id,
        relationshipType: "PrimaryCare",
        startDate: new Date("2021-08-01"),
        isActive: true,
      },
      {
        patientId: patients[4].id,
        doctorId: doctors[0].id,
        relationshipType: "PrimaryCare",
        startDate: new Date("2022-01-10"),
        isActive: true,
      },
    ],
  });
  console.log("✅ Created patient-doctor relationships (all 5 patients linked to Dr. John Smith)");

  // ============================================
  // SECTION 10: PRESCRIPTIONS
  // ============================================
  console.log("\n📋 Creating prescriptions...");
  const prescriptions = await Promise.all([
    // Patient 1 - Diabetes medication
    prisma.prescription.create({
      data: {
        doctorId: doctors[0].id,
        patientId: patients[0].id,
        tradeNameId: tradeNames[3].id, // Glucophage
        status: "Approved",
        prescriptionDate: new Date(),
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "90 days",
        instructions: "Take with meals to reduce GI side effects",
        maxRefills: 3,
        notes: "Monitor blood glucose levels",
        isAddedToProfile: true,
      },
    }),
    // Patient 2 - Hypertension medication
    prisma.prescription.create({
      data: {
        doctorId: doctors[0].id,
        patientId: patients[1].id,
        tradeNameId: tradeNames[4].id, // Norvasc
        status: "Filled",
        prescriptionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        validFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        validUntil: new Date(Date.now() + 83 * 24 * 60 * 60 * 1000),
        dosage: "5mg",
        frequency: "Once daily",
        duration: "90 days",
        instructions: "Take in the morning with or without food",
        maxRefills: 6,
        currentRefillCount: 1,
        isAddedToProfile: true,
      },
    }),
    // Patient 2 - Cholesterol medication
    prisma.prescription.create({
      data: {
        doctorId: doctors[0].id,
        patientId: patients[1].id,
        tradeNameId: tradeNames[6].id, // Lipitor
        status: "Approved",
        prescriptionDate: new Date(),
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        dosage: "20mg",
        frequency: "Once daily at bedtime",
        duration: "90 days",
        instructions: "Take with or without food. Monitor liver enzymes",
        maxRefills: 6,
        notes: "Check lipid panel in 3 months",
        isAddedToProfile: true,
      },
    }),
    // Patient 3 - Allergy medication
    prisma.prescription.create({
      data: {
        doctorId: doctors[2].id,
        patientId: patients[2].id,
        tradeNameId: tradeNames[8].id, // Zyrtec
        status: "Approved",
        prescriptionDate: new Date(),
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take at bedtime to avoid drowsiness during day",
        maxRefills: 2,
        isAddedToProfile: true,
      },
    }),
    // Patient 4 - GERD medication
    prisma.prescription.create({
      data: {
        doctorId: doctors[2].id,
        patientId: patients[3].id,
        tradeNameId: tradeNames[5].id, // Losec
        status: "Approved",
        prescriptionDate: new Date(),
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        dosage: "20mg",
        frequency: "Once daily",
        duration: "60 days",
        instructions: "Take 30 minutes before breakfast on empty stomach",
        maxRefills: 3,
        notes: "Avoid taking with food",
        isAddedToProfile: true,
      },
    }),
    // Patient 5 - Asthma medication
    prisma.prescription.create({
      data: {
        doctorId: doctors[1].id, // Pediatrician
        patientId: patients[4].id,
        tradeNameId: tradeNames[7].id, // Ventolin
        status: "Approved",
        prescriptionDate: new Date(),
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        dosage: "2 puffs",
        frequency: "As needed for symptoms",
        duration: "180 days",
        instructions:
          "Use before exercise or when experiencing shortness of breath",
        maxRefills: 2,
        notes: "Rescue medication only",
        isAddedToProfile: true,
      },
    }),
  ]);
  console.log(`✅ Created ${prescriptions.length} prescriptions`);

  // ============================================
  // SECTION 11: APPOINTMENTS
  // ============================================
  console.log("\n📅 Creating appointments...");
  await prisma.appointment.createMany({
    data: [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        duration: 30,
        status: "Scheduled",
        notes: "Regular diabetes checkup - review HbA1c results",
        reminderSent: false,
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[0].id,
        appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        duration: 45,
        status: "Confirmed",
        notes:
          "Follow-up on hypertension and hyperlipidemia - review lab results",
        reminderSent: true,
      },
      {
        patientId: patients[2].id,
        doctorId: doctors[2].id,
        appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        duration: 20,
        status: "Scheduled",
        notes: "Allergy consultation - seasonal symptoms",
        reminderSent: false,
      },
      {
        patientId: patients[3].id,
        doctorId: doctors[2].id,
        appointmentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        duration: 30,
        status: "Scheduled",
        notes: "GERD follow-up",
        reminderSent: false,
      },
      {
        patientId: patients[4].id,
        doctorId: doctors[1].id, // Pediatrician
        appointmentDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        duration: 30,
        status: "Scheduled",
        notes: "Asthma management review",
        reminderSent: false,
      },
    ],
  });
  console.log("✅ Created appointments");

  // ============================================
  // SECTION 11B: CONSULTATIONS
  // ============================================
  console.log("\n💬 Creating consultations...");
  await prisma.consultation.createMany({
    data: [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        consultationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        notes:
          "Patient reports good glucose control. No hypoglycemic episodes.",
        diagnosis: "Type 2 Diabetes Mellitus - Well controlled",
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[0].id,
        consultationDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        notes: "BP stable on current medication. Lipid panel ordered.",
        diagnosis:
          "Hypertension - Controlled, Hyperlipidemia - Under treatment",
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[2].id,
        doctorId: doctors[2].id,
        consultationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        notes: "Allergic rhinitis symptoms improved with medication.",
        diagnosis: "Allergic Rhinitis - Responding to treatment",
        followUpRequired: false,
      },
      {
        patientId: patients[4].id,
        doctorId: doctors[1].id,
        consultationDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        notes: "Asthma well controlled. No recent exacerbations.",
        diagnosis: "Mild persistent asthma - Well controlled",
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    ],
  });
  console.log("✅ Created consultations");

  // ============================================
  // SECTION 11C: VISITS
  // ============================================
  console.log("\n🏥 Creating visit records...");
  await prisma.visit.createMany({
    data: [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        visitDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        visitType: "FollowUp",
        isNewVisit: false,
        diagnosis: "Type 2 Diabetes Mellitus - Well controlled",
        treatmentPlan:
          "Continue Metformin 500mg BID. Monitor HbA1c every 3 months.",
        notes: "Patient compliant with medication and diet",
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[0].id,
        visitDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        visitType: "FollowUp",
        isNewVisit: false,
        diagnosis: "Hypertension, Hyperlipidemia",
        treatmentPlan:
          "Continue Amlodipine 5mg daily and Atorvastatin 20mg at bedtime",
        notes: "BP: 130/85. Lipid panel ordered.",
      },
      {
        patientId: patients[2].id,
        doctorId: doctors[0].id,
        visitDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        visitType: "FollowUp",
        isNewVisit: false,
        diagnosis: "Allergic Rhinitis",
        treatmentPlan: "Cetirizine 10mg daily as needed",
        notes: "Symptoms improved",
      },
      {
        patientId: patients[3].id,
        doctorId: doctors[0].id,
        visitDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        visitType: "FollowUp",
        isNewVisit: false,
        diagnosis: "Tension Headache",
        treatmentPlan: "Rest, hydration, OTC analgesics as needed",
        notes: "No red flags. Follow up if recurrent.",
      },
      {
        patientId: patients[4].id,
        doctorId: doctors[0].id,
        visitDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        visitType: "FollowUp",
        isNewVisit: false,
        diagnosis: "Mild persistent asthma",
        treatmentPlan: "Salbutamol inhaler as needed",
        notes: "No recent exacerbations",
      },
    ],
  });
  console.log("✅ Created visit records");

  // ============================================
  // SECTION 11D: MEDICAL REPORTS
  // ============================================
  console.log("\n📄 Creating medical reports...");
  await prisma.medicalReport.createMany({
    data: [
      {
        patientId: patients[0].id,
        uploadedBy: patientUser1.id,
        fileName: "HbA1c_Report_2024.pdf",
        fileUrl: "/reports/patient1/hba1c_2024.pdf",
        fileType: "pdf",
        fileSize: 245760,
        reportType: "LabTest",
        reportDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        notes: "HbA1c: 6.8% - Good control",
      },
      {
        patientId: patients[1].id,
        uploadedBy: patientUser2.id,
        fileName: "Lipid_Panel_2024.pdf",
        fileUrl: "/reports/patient2/lipid_2024.pdf",
        fileType: "pdf",
        fileSize: 189440,
        reportType: "LabTest",
        reportDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        notes: "Total Cholesterol: 180 mg/dL, LDL: 110 mg/dL",
      },
      {
        patientId: patients[1].id,
        uploadedBy: doctorUser1.id, // Use doctorUser1.id (userId) not doctors[0].id
        fileName: "ECG_Report_2024.pdf",
        fileUrl: "/reports/patient2/ecg_2024.pdf",
        fileType: "pdf",
        fileSize: 156672,
        reportType: "Imaging",
        reportDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        notes: "Normal sinus rhythm",
      },
      {
        patientId: patients[4].id,
        uploadedBy: patientUser5.id,
        fileName: "Chest_XRay_2024.jpg",
        fileUrl: "/reports/patient5/xray_2024.jpg",
        fileType: "jpg",
        fileSize: 524288,
        reportType: "Imaging",
        reportDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        notes: "Clear lungs, no abnormalities",
      },
      {
        patientId: patients[3].id,
        uploadedBy: doctorUser1.id,
        fileName: "GERD_FollowUp_2024.pdf",
        fileUrl: "/reports/patient4/gerd_followup_2024.pdf",
        fileType: "pdf",
        fileSize: 102400,
        reportType: "LabTest",
        reportDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        notes: "GERD and hypertension follow-up. PPI continued.",
      },
    ],
  });
  console.log("✅ Created medical reports");

  // ============================================
  // SECTION 11E: ADVERSE DRUG REACTIONS
  // ============================================
  console.log("\n⚠️ Creating adverse drug reactions...");
  await prisma.adverseDrugReaction.createMany({
    data: [
      {
        patientId: patients[1].id,
        tradeNameId: tradeNames[4].id, // Norvasc
        companyId: companies[0].id,
        activeSubstanceId: activeSubstances[4].id,
        severity: "Mild",
        reaction: "Mild ankle swelling, no other symptoms",
        startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        isAnonymous: false,
        reportedToEDA: false,
        status: "Closed",
        adminNotes: "Common side effect, patient informed. No action needed.",
      },
      {
        patientId: patients[2].id,
        tradeNameId: tradeNames[8].id, // Zyrtec
        companyId: companies[1].id,
        activeSubstanceId: activeSubstances[8].id,
        severity: "Mild",
        reaction: "Mild drowsiness in the morning",
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        endDate: null,
        isAnonymous: false,
        reportedToEDA: false,
        status: "Submitted",
      },
    ],
  });
  console.log("✅ Created adverse drug reactions");

  // ============================================
  // SECTION 11F: PATIENT SHARE LINKS
  // ============================================
  console.log("\n🔗 Creating patient share links...");
  await prisma.patientShareLink.createMany({
    data: [
      {
        patientId: patients[0].id,
        shareToken: "abc123def456",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true,
        accessCount: 2,
        lastAccessedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[1].id,
        shareToken: "xyz789ghi012",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        isActive: true,
        accessCount: 0,
        lastAccessedAt: null,
      },
    ],
  });
  console.log("✅ Created patient share links");

  // ============================================
  // SECTION 11G: RATINGS
  // ============================================
  console.log("\n⭐ Creating ratings...");
  await prisma.rating.createMany({
    data: [
      {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        pharmacistId: null,
        ratedType: "Doctor",
        rating: 5,
        review: "Excellent doctor, very thorough and caring",
      },
      {
        patientId: patients[1].id,
        doctorId: doctors[0].id,
        pharmacistId: null,
        ratedType: "Doctor",
        rating: 4,
        review: "Good care, explains everything clearly",
      },
      {
        patientId: patients[2].id,
        doctorId: doctors[2].id,
        pharmacistId: null,
        ratedType: "Doctor",
        rating: 5,
        review: "Very helpful with my allergies",
      },
      {
        patientId: patients[4].id,
        doctorId: doctors[1].id,
        pharmacistId: null,
        ratedType: "Doctor",
        rating: 5,
        review: "Great pediatrician, my child feels comfortable",
      },
    ],
  });
  console.log("✅ Created ratings");

  // ============================================
  // SECTION 12: NOTIFICATIONS
  // ============================================
  console.log("\n🔔 Creating notifications...");
  await prisma.notification.createMany({
    data: [
      {
        userId: patientUser1.id,
        type: "PrescriptionReady",
        title: "Prescription Ready",
        message: "Your prescription for Glucophage is ready for pickup at City Pharmacy",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: patientUser2.id,
        type: "AppointmentReminder",
        title: "Appointment Reminder",
        message: "You have an appointment with Dr. Smith in 2 days",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: patientUser2.id,
        type: "PrescriptionReady",
        title: "Prescription Filled",
        message: "Your Norvasc prescription has been filled successfully",
        isRead: true,
        readAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        deliveryStatus: "Delivered",
      },
      {
        userId: patientUser1.id,
        type: "AppointmentReminder",
        title: "Upcoming Appointment",
        message: "Reminder: You have a diabetes checkup with Dr. Smith in 2 days",
        isRead: true,
        readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        deliveryStatus: "Delivered",
      },
      {
        userId: patientUser5.id,
        type: "AppointmentReminder",
        title: "Pediatric Checkup Reminder",
        message: "Emma's asthma management review with Dr. Johnson is in 14 days",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: doctorUser1.id,
        type: "SystemAlert",
        title: "New Patient Assigned",
        message: "Patient Alice Cooper has been assigned to your care",
        isRead: true,
        readAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        deliveryStatus: "Delivered",
      },
      {
        userId: doctorUser1.id,
        type: "DrugInteraction",
        title: "Drug Interaction Alert",
        message: "Potential interaction detected between Metformin and Ibuprofen for patient Bob Martinez",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: doctorUser2.id,
        type: "SystemAlert",
        title: "Account Verified",
        message: "Your doctor account has been verified. You can now create prescriptions.",
        isRead: true,
        readAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        deliveryStatus: "Delivered",
      },
      {
        userId: admin1.id,
        type: "SystemAlert",
        title: "Pending Doctor Verifications",
        message: "There are 2 doctors awaiting verification: Dr. Emily Chen and Dr. Robert Kumar",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: superAdmin.id,
        type: "SystemAlert",
        title: "New ADR Report Submitted",
        message: "A new adverse drug reaction report has been submitted for Zyrtec (Cetirizine)",
        isRead: false,
        deliveryStatus: "Delivered",
      },
    ],
  });
  console.log("✅ Created notifications");

  // ============================================
  // SECTION 13: PAYMENTS
  // ============================================
  console.log("\n💳 Creating payments...");
  await prisma.payment.createMany({
    data: [
      {
        subscriptionId: subscriptions[0].id, // Dr. Smith - Professional
        amount: 79.99,
        currency: "USD",
        paymentMethod: "CreditCard",
        transactionId: "TXN-2024-001",
        status: "Completed",
        paidAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      },
      {
        subscriptionId: subscriptions[1].id, // Dr. Johnson - Enterprise
        amount: 299.99,
        currency: "USD",
        paymentMethod: "BankTransfer",
        transactionId: "TXN-2024-002",
        status: "Completed",
        paidAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
      },
    ],
  });
  console.log("✅ Created payments");

  // ============================================
  // SECTION 14: PRESCRIPTION VERSIONS + DRUG INTERACTION ALERTS
  // ============================================
  console.log("\n📋 Creating prescription versions and drug interaction alerts...");
  await prisma.prescriptionVersion.createMany({
    data: [
      {
        prescriptionId: prescriptions[0].id, // Glucophage
        version: 1,
        changes: { created: true, dosage: "500mg", frequency: "Twice daily" },
        changedBy: doctorUser1.id,
      },
      {
        prescriptionId: prescriptions[1].id, // Norvasc
        version: 1,
        changes: { created: true, dosage: "5mg", frequency: "Once daily" },
        changedBy: doctorUser1.id,
      },
      {
        prescriptionId: prescriptions[1].id, // Norvasc - status update
        version: 2,
        changes: { status: { from: "Approved", to: "Filled" }, currentRefillCount: { from: 0, to: 1 } },
        changedBy: doctorUser1.id,
      },
      {
        prescriptionId: prescriptions[2].id, // Lipitor
        version: 1,
        changes: { created: true, dosage: "20mg", frequency: "Once daily at bedtime" },
        changedBy: doctorUser1.id,
      },
      {
        prescriptionId: prescriptions[3].id, // Zyrtec
        version: 1,
        changes: { created: true, dosage: "10mg", frequency: "Once daily" },
        changedBy: doctorUser1.id,
      },
    ],
  });

  // Drug Interaction Alert: Metformin (diabetes) + Ibuprofen (NSAID) interaction
  await prisma.drugInteractionAlert.createMany({
    data: [
      {
        prescriptionId: prescriptions[0].id, // Glucophage prescription
        interactingMedicineId: tradeNames[1].id, // Brufen (Ibuprofen)
        interactionType: "Pharmacodynamic",
        severity: "Moderate",
        message: "NSAIDs like Ibuprofen may reduce the effectiveness of Metformin and increase risk of lactic acidosis. Monitor blood glucose closely.",
        acknowledgedByDoctor: true,
        acknowledgedByPatient: false,
        acknowledgedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        prescriptionId: prescriptions[2].id, // Lipitor
        interactingMedicineId: tradeNames[4].id, // Norvasc (Amlodipine)
        interactionType: "Pharmacokinetic",
        severity: "Minor",
        message: "Amlodipine may slightly increase Atorvastatin levels. Monitor for statin-related side effects such as myalgia.",
        acknowledgedByDoctor: true,
        acknowledgedByPatient: true,
        acknowledgedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
  });
  console.log("✅ Created prescription versions and drug interaction alerts");

  // ============================================
  // SECTION 15: CONTRACTING COMPANIES
  // ============================================
  console.log("\n🏢 Creating contracting companies...");
  const contractingCompanies = await Promise.all([
    prisma.contractingCompany.create({
      data: {
        title: "MedSupply Egypt",
        companyId: companies[0].id, // Pfizer
        contractingDate: new Date("2023-01-01"),
        expiryDate: new Date("2025-12-31"),
        isActive: true,
      },
    }),
    prisma.contractingCompany.create({
      data: {
        title: "PharmaDist MENA",
        companyId: companies[2].id, // GSK
        contractingDate: new Date("2022-06-01"),
        expiryDate: new Date("2024-12-31"),
        isActive: true,
      },
    }),
    prisma.contractingCompany.create({
      data: {
        title: "NovaDist Corp",
        companyId: companies[1].id, // Novartis
        contractingDate: new Date("2023-03-15"),
        expiryDate: new Date("2025-03-14"),
        isActive: true,
      },
    }),
  ]);

  await prisma.contractingCompanyTradeName.createMany({
    data: [
      { contractingCompanyId: contractingCompanies[0].id, tradeNameId: tradeNames[1].id }, // MedSupply + Brufen
      { contractingCompanyId: contractingCompanies[0].id, tradeNameId: tradeNames[4].id }, // MedSupply + Norvasc
      { contractingCompanyId: contractingCompanies[0].id, tradeNameId: tradeNames[6].id }, // MedSupply + Lipitor
      { contractingCompanyId: contractingCompanies[1].id, tradeNameId: tradeNames[0].id }, // PharmaDist + Panadol
      { contractingCompanyId: contractingCompanies[1].id, tradeNameId: tradeNames[2].id }, // PharmaDist + Amoxil
      { contractingCompanyId: contractingCompanies[1].id, tradeNameId: tradeNames[7].id }, // PharmaDist + Ventolin
      { contractingCompanyId: contractingCompanies[2].id, tradeNameId: tradeNames[5].id }, // NovaDist + Losec
      { contractingCompanyId: contractingCompanies[2].id, tradeNameId: tradeNames[8].id }, // NovaDist + Zyrtec
    ],
  });
  console.log(`✅ Created ${contractingCompanies.length} contracting companies with trade name links`);

  // ============================================
  // SECTION 16: MEDICINE ALTERNATIVES
  // ============================================
  console.log("\n🔄 Creating medicine alternatives...");
  await prisma.medicineAlternative.createMany({
    data: [
      {
        // Ibuprofen → Paracetamol (for pain, when NSAID contraindicated)
        activeSubstanceId: activeSubstances[1].id,
        alternativeActiveSubstanceId: activeSubstances[0].id,
        reason: "Safer alternative for patients with GI issues, renal impairment, or cardiovascular risk",
      },
      {
        // Paracetamol → Ibuprofen (for inflammatory pain)
        activeSubstanceId: activeSubstances[0].id,
        alternativeActiveSubstanceId: activeSubstances[1].id,
        reason: "Alternative when anti-inflammatory effect is needed",
      },
      {
        // Losartan → Amlodipine (ARB → CCB for hypertension)
        activeSubstanceId: activeSubstances[9].id,
        alternativeActiveSubstanceId: activeSubstances[4].id,
        reason: "Alternative antihypertensive when ARB is not tolerated or contraindicated in pregnancy",
      },
      {
        // Atorvastatin → Cetirizine is not an alt, use Losartan as alt for Atorvastatin → different drug class
        activeSubstanceId: activeSubstances[6].id,
        alternativeActiveSubstanceId: activeSubstances[9].id,
        reason: "When statin is contraindicated (myopathy), consider ARB for cardiovascular protection",
      },
      {
        // Amoxicillin → Cetirizine is not right; Amoxicillin alternative is itself in different class
        // Salbutamol (inhaler) → Cetirizine for allergy-induced asthma prevention
        activeSubstanceId: activeSubstances[7].id,
        alternativeActiveSubstanceId: activeSubstances[8].id,
        reason: "For allergy-triggered asthma, antihistamines can reduce trigger exposure",
      },
    ],
  });
  console.log("✅ Created medicine alternatives");

  // ============================================
  // SECTION 16b: SIDE EFFECTS (100+ in English & Arabic)
  // ============================================
  console.log("\n💊 Creating side effects catalog and medication links...");
  const sideEffectData: Array<{ name: string; nameAr: string }> = [
    { name: "Headache", nameAr: "صداع" },
    { name: "Nausea", nameAr: "غثيان" },
    { name: "Dizziness", nameAr: "دوار" },
    { name: "Drowsiness", nameAr: "نعاس" },
    { name: "Rash", nameAr: "طفح جلدي" },
    { name: "Stomach upset", nameAr: "اضطراب المعدة" },
    { name: "Diarrhea", nameAr: "إسهال" },
    { name: "Fatigue", nameAr: "إرهاق" },
    { name: "Dry mouth", nameAr: "جفاف الفم" },
    { name: "Muscle pain", nameAr: "ألم عضلي" },
    { name: "Edema", nameAr: "وذمة" },
    { name: "Flushing", nameAr: "احمرار الوجه" },
    { name: "Palpitations", nameAr: "خفقان القلب" },
    { name: "Tremor", nameAr: "رعشة" },
    { name: "Abdominal pain", nameAr: "ألم البطن" },
    { name: "Allergic reaction", nameAr: "تفاعل تحسسي" },
    { name: "Liver damage", nameAr: "تلف الكبد" },
    { name: "GI bleeding", nameAr: "نزيف الجهاز الهضمي" },
    { name: "Constipation", nameAr: "إمساك" },
    { name: "Vomiting", nameAr: "قيء" },
    { name: "Insomnia", nameAr: "أرق" },
    { name: "Anxiety", nameAr: "قلق" },
    { name: "Depression", nameAr: "اكتئاب" },
    { name: "Blurred vision", nameAr: "تشوش الرؤية" },
    { name: "Tinnitus", nameAr: "طنين الأذن" },
    { name: "Cough", nameAr: "سعال" },
    { name: "Shortness of breath", nameAr: "ضيق التنفس" },
    { name: "Chest pain", nameAr: "ألم الصدر" },
    { name: "Back pain", nameAr: "ألم الظهر" },
    { name: "Joint pain", nameAr: "ألم المفاصل" },
    { name: "Swelling", nameAr: "تورم" },
    { name: "Itching", nameAr: "حكة" },
    { name: "Hives", nameAr: "شرى" },
    { name: "Photosensitivity", nameAr: "حساسية للضوء" },
    { name: "Hair loss", nameAr: "تساقط الشعر" },
    { name: "Weight gain", nameAr: "زيادة الوزن" },
    { name: "Weight loss", nameAr: "فقدان الوزن" },
    { name: "Loss of appetite", nameAr: "فقدان الشهية" },
    { name: "Increased appetite", nameAr: "زيادة الشهية" },
    { name: "Sweating", nameAr: "تعرق" },
    { name: "Fever", nameAr: "حمى" },
    { name: "Chills", nameAr: "قشعريرة" },
    { name: "Weakness", nameAr: "ضعف" },
    { name: "Confusion", nameAr: "ارتباك" },
    { name: "Memory problems", nameAr: "مشاكل الذاكرة" },
    { name: "Difficulty concentrating", nameAr: "صعوبة التركيز" },
    { name: "Mood changes", nameAr: "تغيرات المزاج" },
    { name: "Irritability", nameAr: "تهيج" },
    { name: "Agitation", nameAr: "هياج" },
    { name: "Hallucinations", nameAr: "هلوسة" },
    { name: "Seizures", nameAr: "نوبات" },
    { name: "Numbness", nameAr: "تنميل" },
    { name: "Tingling", nameAr: "وخز" },
    { name: "Muscle weakness", nameAr: "ضعف العضلات" },
    { name: "Muscle cramps", nameAr: "تشنجات عضلية" },
    { name: "Joint swelling", nameAr: "تورم المفاصل" },
    { name: "Stiffness", nameAr: "تيبس" },
    { name: "Bruising", nameAr: "كدمات" },
    { name: "Bleeding", nameAr: "نزيف" },
    { name: "Anemia", nameAr: "فقر دم" },
    { name: "Low blood pressure", nameAr: "انخفاض ضغط الدم" },
    { name: "High blood pressure", nameAr: "ارتفاع ضغط الدم" },
    { name: "Irregular heartbeat", nameAr: "عدم انتظام ضربات القلب" },
    { name: "Kidney problems", nameAr: "مشاكل الكلى" },
    { name: "Urinary retention", nameAr: "احتباس البول" },
    { name: "Frequent urination", nameAr: "كثرة التبول" },
    { name: "Painful urination", nameAr: "ألم عند التبول" },
    { name: "Decreased libido", nameAr: "انخفاض الرغبة الجنسية" },
    { name: "Erectile dysfunction", nameAr: "ضعف الانتصاب" },
    { name: "Menstrual changes", nameAr: "تغيرات الدورة الشهرية" },
    { name: "Breast tenderness", nameAr: "ألم الثدي" },
    { name: "Nasal congestion", nameAr: "احتقان الأنف" },
    { name: "Runny nose", nameAr: "سيلان الأنف" },
    { name: "Sore throat", nameAr: "التهاب الحلق" },
    { name: "Taste changes", nameAr: "تغيرات التذوق" },
    { name: "Metallic taste", nameAr: "طعم معدني" },
    { name: "Indigestion", nameAr: "عسر الهضم" },
    { name: "Heartburn", nameAr: "حرقة المعدة" },
    { name: "Gas", nameAr: "غازات" },
    { name: "Bloating", nameAr: "انتفاخ" },
    { name: "Black stools", nameAr: "براز أسود" },
    { name: "Blood in urine", nameAr: "دم في البول" },
    { name: "Yellowing of skin", nameAr: "اصفرار الجلد" },
    { name: "Dark urine", nameAr: "بول داكن" },
    { name: "Pale stools", nameAr: "براز شاحب" },
    { name: "Skin discoloration", nameAr: "تغير لون الجلد" },
    { name: "Acne", nameAr: "حب الشباب" },
    { name: "Dry skin", nameAr: "جفاف الجلد" },
    { name: "Oily skin", nameAr: "بشرة دهنية" },
    { name: "Easy bruising", nameAr: "كدمات سهلة" },
    { name: "Slow wound healing", nameAr: "بطء التئام الجروح" },
    { name: "Increased thirst", nameAr: "زيادة العطش" },
    { name: "Increased urination", nameAr: "زيادة التبول" },
    { name: "Hypoglycemia", nameAr: "انخفاض السكر" },
    { name: "Hyperglycemia", nameAr: "ارتفاع السكر" },
    { name: "Thyroid problems", nameAr: "مشاكل الغدة الدرقية" },
    { name: "Adrenal insufficiency", nameAr: "قصور الغدة الكظرية" },
    { name: "Electrolyte imbalance", nameAr: "اختلال التوازن الكهربائي" },
    { name: "Dehydration", nameAr: "جفاف" },
    { name: "Fluid retention", nameAr: "احتباس السوائل" },
    { name: "Increased cholesterol", nameAr: "ارتفاع الكوليسترول" },
    { name: "Pancreatitis", nameAr: "التهاب البنكرياس" },
    { name: "Stomach ulcer", nameAr: "قرحة المعدة" },
    { name: "Esophagitis", nameAr: "التهاب المريء" },
    { name: "Colitis", nameAr: "التهاب القولون" },
    { name: "Stevens-Johnson syndrome", nameAr: "متلازمة ستيفنز جونسون" },
    { name: "Toxic epidermal necrolysis", nameAr: "تنخر البشرة السمي" },
    { name: "Anaphylaxis", nameAr: "صدمة تحسسية" },
    { name: "Angioedema", nameAr: "وذمة وعائية" },
    { name: "Lupus-like syndrome", nameAr: "متلازمة شبيهة بالذئبة" },
    { name: "Interstitial lung disease", nameAr: "مرض الرئة الخلالي" },
    { name: "Pulmonary fibrosis", nameAr: "تليف الرئة" },
    { name: "Bronchospasm", nameAr: "تشنج قصبي" },
    { name: "Pneumonitis", nameAr: "التهاب الرئة" },
    { name: "Peripheral neuropathy", nameAr: "اعتلال الأعصاب المحيطية" },
    { name: "Optic neuropathy", nameAr: "اعتلال العصب البصري" },
    { name: "Hearing loss", nameAr: "فقدان السمع" },
    { name: "Vertigo", nameAr: "دوار" },
    { name: "Balance problems", nameAr: "مشاكل التوازن" },
    { name: "Coordination problems", nameAr: "مشاكل التنسيق" },
    { name: "Slurred speech", nameAr: "ثقل في الكلام" },
    { name: "Difficulty swallowing", nameAr: "صعوبة البلع" },
    { name: "Mouth ulcers", nameAr: "قرحات الفم" },
    { name: "Gum problems", nameAr: "مشاكل اللثة" },
    { name: "Tooth discoloration", nameAr: "تغير لون الأسنان" },
    { name: "Bone pain", nameAr: "ألم العظام" },
    { name: "Osteoporosis", nameAr: "هشاشة العظام" },
    { name: "Tendon rupture", nameAr: "تمزق الوتر" },
    { name: "Rhabdomyolysis", nameAr: "انحلال العضلات" },
    { name: "Serotonin syndrome", nameAr: "متلازمة السيروتونين" },
    { name: "Neuroleptic malignant syndrome", nameAr: "متلازمة الذهان الخبيثة" },
    { name: "Extrapyramidal symptoms", nameAr: "أعراض خارج هرمية" },
    { name: "Tardive dyskinesia", nameAr: "خلل الحركة المتأخر" },
    { name: "Restless legs", nameAr: "متلازمة تململ الساقين" },
    { name: "Sleep disturbances", nameAr: "اضطرابات النوم" },
    { name: "Nightmares", nameAr: "كوابيس" },
    { name: "Vivid dreams", nameAr: "أحلام واضحة" },
    { name: "Sleepwalking", nameAr: "المشي أثناء النوم" },
    { name: "Sleep apnea", nameAr: "انقطاع النفس النومي" },
    { name: "Snoring", nameAr: "الشخير" },
    { name: "Daytime sleepiness", nameAr: "النعاس النهاري" },
    { name: "Hyperactivity", nameAr: "فرط النشاط" },
    { name: "Nervousness", nameAr: "توتر عصبي" },
    { name: "Panic attacks", nameAr: "نوبات الهلع" },
    { name: "Suicidal thoughts", nameAr: "أفكار انتحارية" },
    { name: "Mania", nameAr: "هوس" },
    { name: "Psychosis", nameAr: "ذهان" },
    { name: "Paranoia", nameAr: "جنون العظمة" },
    { name: "Delusions", nameAr: "أوهام" },
    { name: "Disorientation", nameAr: "توهان" },
    { name: "Dementia-like symptoms", nameAr: "أعراض شبيهة بالخرف" },
    { name: "Cognitive impairment", nameAr: "ضعف إدراكي" },
    { name: "Brain fog", nameAr: "ضبابية الدماغ" },
    { name: "Lightheadedness", nameAr: "دوخة" },
    { name: "Fainting", nameAr: "إغماء" },
    { name: "Syncope", nameAr: "إغماء" },
    { name: "Shock", nameAr: "صدمة" },
    { name: "Hypersensitivity", nameAr: "فرط الحساسية" },
    { name: "Drug interaction", nameAr: "تفاعل دوائي" },
    { name: "Withdrawal symptoms", nameAr: "أعراض انسحاب" },
    { name: "Rebound effect", nameAr: "تأثير ارتدادي" },
    { name: "Tolerance", nameAr: "تحمل" },
    { name: "Dependence", nameAr: "اعتماد" },
    { name: "Addiction", nameAr: "إدمان" },
    { name: "Overdose risk", nameAr: "خطر الجرعة الزائدة" },
  ];
  const sideEffects = await Promise.all(
    sideEffectData.map(({ name, nameAr }) =>
      prisma.sideEffect.upsert({
        where: { name },
        create: { name, nameAr },
        update: { nameAr },
      })
    )
  );
  const sideEffectMap = Object.fromEntries(sideEffects.map((s) => [s.name, s.id]));

  const medicationSideEffectData: Array<{
    activeSubstanceId: number;
    sideEffectId: number;
    frequency: string;
    bodySystem?: string;
  }> = [
    // Paracetamol (0)
    { activeSubstanceId: activeSubstances[0].id, sideEffectId: sideEffectMap["Headache"], frequency: "Rare", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[0].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[0].id, sideEffectId: sideEffectMap["Rash"], frequency: "Uncommon", bodySystem: "Skin" },
    { activeSubstanceId: activeSubstances[0].id, sideEffectId: sideEffectMap["Liver damage"], frequency: "Rare", bodySystem: "Hepatic" },
    // Ibuprofen (1)
    { activeSubstanceId: activeSubstances[1].id, sideEffectId: sideEffectMap["Headache"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[1].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[1].id, sideEffectId: sideEffectMap["Dizziness"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[1].id, sideEffectId: sideEffectMap["Stomach upset"], frequency: "VeryCommon", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[1].id, sideEffectId: sideEffectMap["GI bleeding"], frequency: "Rare", bodySystem: "GIT" },
    // Amoxicillin (2)
    { activeSubstanceId: activeSubstances[2].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[2].id, sideEffectId: sideEffectMap["Diarrhea"], frequency: "Common", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[2].id, sideEffectId: sideEffectMap["Rash"], frequency: "Common", bodySystem: "Skin" },
    { activeSubstanceId: activeSubstances[2].id, sideEffectId: sideEffectMap["Allergic reaction"], frequency: "Rare", bodySystem: "Immune" },
    // Metformin (3)
    { activeSubstanceId: activeSubstances[3].id, sideEffectId: sideEffectMap["Nausea"], frequency: "VeryCommon", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[3].id, sideEffectId: sideEffectMap["Diarrhea"], frequency: "Common", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[3].id, sideEffectId: sideEffectMap["Stomach upset"], frequency: "Common", bodySystem: "GIT" },
    // Amlodipine (4)
    { activeSubstanceId: activeSubstances[4].id, sideEffectId: sideEffectMap["Headache"], frequency: "VeryCommon", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[4].id, sideEffectId: sideEffectMap["Dizziness"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[4].id, sideEffectId: sideEffectMap["Edema"], frequency: "Common", bodySystem: "Vascular" },
    { activeSubstanceId: activeSubstances[4].id, sideEffectId: sideEffectMap["Flushing"], frequency: "Common", bodySystem: "Vascular" },
    // Omeprazole (5)
    { activeSubstanceId: activeSubstances[5].id, sideEffectId: sideEffectMap["Headache"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[5].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[5].id, sideEffectId: sideEffectMap["Abdominal pain"], frequency: "Common", bodySystem: "GIT" },
    // Atorvastatin (6)
    { activeSubstanceId: activeSubstances[6].id, sideEffectId: sideEffectMap["Headache"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[6].id, sideEffectId: sideEffectMap["Muscle pain"], frequency: "Common", bodySystem: "Musculoskeletal" },
    { activeSubstanceId: activeSubstances[6].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common", bodySystem: "GIT" },
    // Salbutamol (7)
    { activeSubstanceId: activeSubstances[7].id, sideEffectId: sideEffectMap["Tremor"], frequency: "VeryCommon", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[7].id, sideEffectId: sideEffectMap["Palpitations"], frequency: "Common", bodySystem: "Cardiac" },
    { activeSubstanceId: activeSubstances[7].id, sideEffectId: sideEffectMap["Headache"], frequency: "Common", bodySystem: "NervousSystem" },
    // Cetirizine (8)
    { activeSubstanceId: activeSubstances[8].id, sideEffectId: sideEffectMap["Drowsiness"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[8].id, sideEffectId: sideEffectMap["Dry mouth"], frequency: "Common", bodySystem: "GIT" },
    { activeSubstanceId: activeSubstances[8].id, sideEffectId: sideEffectMap["Headache"], frequency: "Common", bodySystem: "NervousSystem" },
    // Losartan (9)
    { activeSubstanceId: activeSubstances[9].id, sideEffectId: sideEffectMap["Dizziness"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[9].id, sideEffectId: sideEffectMap["Headache"], frequency: "Common", bodySystem: "NervousSystem" },
    { activeSubstanceId: activeSubstances[9].id, sideEffectId: sideEffectMap["Fatigue"], frequency: "Common", bodySystem: "General" },
  ];

  await prisma.medicationSideEffect.createMany({
    data: medicationSideEffectData.map((d) => ({
      activeSubstanceId: d.activeSubstanceId,
      sideEffectId: d.sideEffectId,
      frequency: d.frequency,
      bodySystem: d.bodySystem,
    })),
    skipDuplicates: true,
  });
  console.log(`✅ Created ${sideEffects.length} side effects and ${medicationSideEffectData.length} medication-side effect links`);

  // ============================================
  // SECTION 17: DISEASE ACTIVE SUBSTANCE WARNINGS
  // ============================================
  console.log("\n⚠️  Creating disease-active substance warnings...");
  await prisma.diseaseActiveSubstanceWarning.createMany({
    data: [
      {
        diseaseId: diseases[0].id, // Type 2 Diabetes
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "gitWarning",
        warningMessage: "NSAIDs in diabetic patients increase risk of renal impairment and mask hypoglycemia symptoms. Monitor blood glucose and renal function closely.",
        severity: "High",
      },
      {
        diseaseId: diseases[1].id, // Hypertension
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "vascularWarning",
        warningMessage: "NSAIDs can elevate blood pressure and reduce efficacy of antihypertensives. Avoid or use with close BP monitoring.",
        severity: "High",
      },
      {
        diseaseId: diseases[1].id, // Hypertension
        activeSubstanceId: activeSubstances[9].id, // Losartan
        warningFieldName: "renalWarning",
        warningMessage: "ARBs require renal function monitoring in hypertensive patients, especially elderly or those with pre-existing kidney disease.",
        severity: "Medium",
      },
      {
        diseaseId: diseases[5].id, // Chronic Kidney Disease
        activeSubstanceId: activeSubstances[3].id, // Metformin
        warningFieldName: "renalWarning",
        warningMessage: "Metformin is contraindicated in severe renal impairment (eGFR < 30). Risk of lactic acidosis. Dose reduction required if eGFR 30-45.",
        severity: "Critical",
      },
      {
        diseaseId: diseases[5].id, // Chronic Kidney Disease
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "renalWarning",
        warningMessage: "NSAIDs are contraindicated in chronic kidney disease as they can cause acute kidney injury and worsen renal function.",
        severity: "Critical",
      },
      {
        diseaseId: diseases[2].id, // Asthma
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "pulmonaryWarning",
        warningMessage: "NSAIDs can trigger bronchospasm in aspirin/NSAID-sensitive asthmatic patients (Samter's triad). Contraindicated in known NSAID-sensitive asthma.",
        severity: "High",
      },
      {
        diseaseId: diseases[7].id, // Coronary Artery Disease
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "cardiacWarning",
        warningMessage: "NSAIDs increase cardiovascular risk in patients with established CAD. Use minimum effective dose for shortest possible duration.",
        severity: "Critical",
      },
    ],
  });
  console.log("✅ Created disease-active substance warnings");

  // ============================================
  // SECTION 18: BATCH HISTORY
  // ============================================
  console.log("\n📦 Creating batch histories...");
  await prisma.batchHistory.createMany({
    data: [
      {
        tradeNameId: tradeNames[0].id, // Panadol
        batchNumber: "BN-PAN-2024-001",
        manufacturingDate: new Date("2024-01-15"),
        expiryDate: new Date("2026-01-14"),
        quantity: 50000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[1].id, // Brufen
        batchNumber: "BN-BRU-2024-001",
        manufacturingDate: new Date("2024-02-10"),
        expiryDate: new Date("2026-02-09"),
        quantity: 30000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[2].id, // Amoxil
        batchNumber: "BN-AMX-2024-001",
        manufacturingDate: new Date("2024-01-20"),
        expiryDate: new Date("2025-07-19"),
        quantity: 20000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[3].id, // Glucophage
        batchNumber: "BN-GLC-2024-001",
        manufacturingDate: new Date("2024-03-01"),
        expiryDate: new Date("2026-02-28"),
        quantity: 40000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[6].id, // Lipitor
        batchNumber: "BN-LIP-2023-099",
        manufacturingDate: new Date("2023-10-01"),
        expiryDate: new Date("2025-09-30"),
        quantity: 25000,
        isRecalled: true,
        recallReason: "Labeling error — incorrect dosage information on package insert",
        recallDate: new Date("2024-01-10"),
      },
      {
        tradeNameId: tradeNames[7].id, // Ventolin
        batchNumber: "BN-VEN-2024-001",
        manufacturingDate: new Date("2024-04-01"),
        expiryDate: new Date("2026-03-31"),
        quantity: 15000,
        isRecalled: false,
      },
    ],
  });
  console.log("✅ Created batch histories");

  // ============================================
  // SECTION 19: PERMISSIONS & ROLE PERMISSIONS
  // ============================================
  console.log("\n🔐 Creating permissions and role permissions...");
  const permissions = await Promise.all([
    prisma.permission.create({ data: { code: "users.view", name: "View Users", description: "Can view user list and profiles", adminOnly: true } }),
    prisma.permission.create({ data: { code: "users.manage", name: "Manage Users", description: "Can create, update, and deactivate users", adminOnly: true } }),
    prisma.permission.create({ data: { code: "doctors.verify", name: "Verify Doctors", description: "Can approve or reject doctor applications", adminOnly: true } }),
    prisma.permission.create({ data: { code: "pharmacists.verify", name: "Verify Pharmacists", description: "Can approve or reject pharmacist applications", adminOnly: true } }),
    prisma.permission.create({ data: { code: "medicines.view", name: "View Medicines", description: "Can browse the medicine catalog", adminOnly: false } }),
    prisma.permission.create({ data: { code: "medicines.manage", name: "Manage Medicines", description: "Can create, edit, and delete active substances and trade names", adminOnly: true } }),
    prisma.permission.create({ data: { code: "prescriptions.create", name: "Create Prescriptions", description: "Can write new prescriptions", adminOnly: false } }),
    prisma.permission.create({ data: { code: "prescriptions.view", name: "View Prescriptions", description: "Can view prescription records", adminOnly: false } }),
    prisma.permission.create({ data: { code: "reports.view", name: "View Reports", description: "Can view analytics and ADR reports", adminOnly: true } }),
    prisma.permission.create({ data: { code: "import.manage", name: "Manage Imports", description: "Can import bulk data from Excel files", adminOnly: true } }),
    prisma.permission.create({ data: { code: "export.manage", name: "Manage Exports", description: "Can export data to Excel files", adminOnly: true } }),
    prisma.permission.create({ data: { code: "audit.view", name: "View Audit Logs", description: "Can view system audit trail", adminOnly: true } }),
    prisma.permission.create({ data: { code: "settings.manage", name: "Manage Settings", description: "Can update application settings", adminOnly: true } }),
    prisma.permission.create({ data: { code: "adr.submit", name: "Submit ADR", description: "Can submit adverse drug reaction reports", adminOnly: false } }),
    prisma.permission.create({ data: { code: "adr.review", name: "Review ADR", description: "Can review and close ADR reports", adminOnly: true } }),
  ]);

  await prisma.rolePermission.createMany({
    data: [
      // SuperAdmin gets all permissions
      ...permissions.map(p => ({ role: "SuperAdmin", permissionId: p.id })),
      // Admin gets most permissions except settings
      ...permissions.filter(p => p.code !== "settings.manage").map(p => ({ role: "Admin", permissionId: p.id })),
      // Doctor permissions
      { role: "Doctor", permissionId: permissions.find(p => p.code === "medicines.view")!.id },
      { role: "Doctor", permissionId: permissions.find(p => p.code === "prescriptions.create")!.id },
      { role: "Doctor", permissionId: permissions.find(p => p.code === "prescriptions.view")!.id },
      { role: "Doctor", permissionId: permissions.find(p => p.code === "adr.submit")!.id },
      // Pharmacist permissions
      { role: "Pharmacist", permissionId: permissions.find(p => p.code === "medicines.view")!.id },
      { role: "Pharmacist", permissionId: permissions.find(p => p.code === "prescriptions.view")!.id },
      // Patient permissions
      { role: "Patient", permissionId: permissions.find(p => p.code === "medicines.view")!.id },
      { role: "Patient", permissionId: permissions.find(p => p.code === "prescriptions.view")!.id },
      { role: "Patient", permissionId: permissions.find(p => p.code === "adr.submit")!.id },
    ],
  });
  console.log(`✅ Created ${permissions.length} permissions with role assignments`);

  // ============================================
  // SECTION 20: AUDIT LOGS
  // ============================================
  console.log("\n📝 Creating audit logs...");
  await prisma.auditLog.createMany({
    data: [
      {
        userId: superAdmin.id,
        action: "CREATE_USER",
        entityType: "User",
        entityId: doctorUser1.id,
        changes: { role: "Doctor", email: "dr.smith@greenrx.com" },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: admin1.id,
        action: "VERIFY_DOCTOR",
        entityType: "Doctor",
        entityId: doctors[0].id,
        changes: { isVerified: { from: false, to: true } },
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: admin1.id,
        action: "VERIFY_DOCTOR",
        entityType: "Doctor",
        entityId: doctors[1].id,
        changes: { isVerified: { from: false, to: true } },
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: admin1.id,
        action: "VERIFY_DOCTOR",
        entityType: "Doctor",
        entityId: doctors[2].id,
        changes: { isVerified: { from: false, to: true } },
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: doctorUser1.id,
        action: "CREATE_PRESCRIPTION",
        entityType: "Prescription",
        entityId: prescriptions[0].id,
        changes: { patientId: patients[0].id, tradeNameId: tradeNames[3].id, status: "Approved" },
        ipAddress: "10.0.0.5",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: doctorUser1.id,
        action: "CREATE_PRESCRIPTION",
        entityType: "Prescription",
        entityId: prescriptions[1].id,
        changes: { patientId: patients[1].id, tradeNameId: tradeNames[4].id, status: "Filled" },
        ipAddress: "10.0.0.5",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: superAdmin.id,
        action: "UPDATE_ACTIVE_SUBSTANCE",
        entityType: "ActiveSubstance",
        entityId: activeSubstances[0].id,
        changes: { pregnancyWarning: { from: null, to: "Category B - Generally safe" } },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: admin1.id,
        action: "DELETE_TRADE_NAME",
        entityType: "TradeName",
        entityId: 999,
        changes: { title: "Discontinued Product", reason: "Product withdrawn from market" },
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: superAdmin.id,
        action: "REVIEW_MEDICINE_SUGGESTION",
        entityType: "MedicineSuggestion",
        entityId: 2,
        changes: { status: { from: "Pending", to: "Approved" }, reviewNotes: "Approved for catalog" },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: admin1.id,
        action: "REVIEW_MEDICINE_SUGGESTION",
        entityType: "MedicineSuggestion",
        entityId: 3,
        changes: { status: { from: "Pending", to: "Rejected" }, reviewNotes: "Duplicate product" },
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0 (seed)",
      },
    ],
  });
  console.log("✅ Created audit logs");

  // ============================================
  // SECTION 21: CONTRAINDICATION TERM MAPPINGS
  // ============================================
  console.log("\n📖 Creating contraindication term mappings...");
  await prisma.contraindicationTermMapping.createMany({
    data: [
      {
        standardTerm: "Hepatic Impairment",
        alternativeTerms: ["liver disease", "hepatic disease", "liver failure", "cirrhosis", "hepatitis", "liver dysfunction"],
        category: "Organ",
        warningFieldName: "hepaticWarning",
      },
      {
        standardTerm: "Renal Impairment",
        alternativeTerms: ["kidney disease", "renal disease", "kidney failure", "CKD", "chronic kidney disease", "renal dysfunction"],
        category: "Organ",
        warningFieldName: "renalWarning",
      },
      {
        standardTerm: "Pregnancy",
        alternativeTerms: ["pregnant", "pregnancy", "gestational", "prenatal", "gravid", "expecting"],
        category: "Population",
        warningFieldName: "pregnancyWarning",
      },
      {
        standardTerm: "Breastfeeding",
        alternativeTerms: ["lactation", "nursing", "breastfeeding", "breast-feeding", "postnatal", "lactating"],
        category: "Population",
        warningFieldName: "lactationWarning",
      },
      {
        standardTerm: "Pediatric",
        alternativeTerms: ["children", "child", "pediatric", "paediatric", "infant", "neonatal", "juvenile"],
        category: "Population",
        warningFieldName: "specialPopulationChildren",
      },
      {
        standardTerm: "Elderly",
        alternativeTerms: ["geriatric", "elderly", "old age", "senior", "aged", "over 65"],
        category: "Population",
        warningFieldName: "specialPopulationElderly",
      },
      {
        standardTerm: "Cardiac Disease",
        alternativeTerms: ["heart disease", "cardiac", "heart failure", "arrhythmia", "coronary", "myocardial"],
        category: "Organ",
        warningFieldName: "cardiacWarning",
      },
      {
        standardTerm: "Respiratory Disease",
        alternativeTerms: ["asthma", "COPD", "pulmonary", "respiratory", "lung disease", "bronchospasm"],
        category: "Condition",
        warningFieldName: "pulmonaryWarning",
      },
    ],
  });
  console.log("✅ Created contraindication term mappings");

  // ============================================
  // SECTION 22: PATIENT SELF-REPORTED MEDICINES
  // ============================================
  console.log("\n💊 Creating patient self-reported medicines...");
  await prisma.patientMedicine.createMany({
    data: [
      // Patient 1 (Alice Cooper) — takes Panadol OTC + Glucophage prescribed
      {
        patientId: patients[0].id,
        tradeNameId: tradeNames[0].id,         // Panadol (in system)
        activeSubstanceId: activeSubstances[0].id,
        medicineName: "Panadol",
        dosageAmount: 500,
        frequencyCount: 1,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2023-01-01"),
        isOngoing: true,
        notes: "OTC — takes occasionally for headaches",
        isVerified: true,
        verifiedBy: admin1.id,
        verifiedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      // Patient 2 (Bob Martinez) — takes Brufen self-purchased
      {
        patientId: patients[1].id,
        tradeNameId: tradeNames[1].id,         // Brufen (in system)
        activeSubstanceId: activeSubstances[1].id,
        medicineName: "Brufen",
        dosageAmount: 400,
        frequencyCount: 2,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2024-02-01"),
        isOngoing: true,
        notes: "Bought OTC for lower back pain",
        isVerified: true,
        verifiedBy: admin1.id,
        verifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      // Patient 3 (Carol White) — takes a vitamin supplement NOT in system → image upload
      {
        patientId: patients[2].id,
        tradeNameId: null,                     // NOT in system
        medicineName: "Pregnacare Original",
        dosageAmount: 1,
        frequencyCount: 1,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2024-08-01"),
        isOngoing: true,
        notes: "Pregnancy multivitamin — bought from pharmacy",
        imageUrl: "/uploads/patient-medicines/sample-pregnacare.jpg",
        imageFileName: "pregnacare.jpg",
        isVerified: false,                     // Pending admin/doctor verification
      },
      // Patient 4 (David Lee) — takes Losec (in system)
      {
        patientId: patients[3].id,
        tradeNameId: tradeNames[5].id,         // Losec (in system)
        activeSubstanceId: activeSubstances[5].id,
        medicineName: "Losec",
        dosageAmount: 20,
        frequencyCount: 1,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2021-08-15"),
        isOngoing: true,
        isVerified: true,
        verifiedBy: admin1.id,
        verifiedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
      // Patient 5 (Emma Thompson) — takes Ventolin (in system) + unknown herbal drops NOT in system
      {
        patientId: patients[4].id,
        tradeNameId: tradeNames[7].id,         // Ventolin (in system)
        activeSubstanceId: activeSubstances[7].id,
        medicineName: "Ventolin Inhaler",
        dosageAmount: 2,
        frequencyCount: 1,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2022-02-20"),
        isOngoing: true,
        isVerified: true,
        verifiedBy: admin1.id,
        verifiedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[4].id,
        tradeNameId: null,                     // NOT in system
        medicineName: "Nature's Bounty Vitamin D3",
        dosageAmount: 400,
        frequencyCount: 1,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2023-09-01"),
        isOngoing: true,
        notes: "Vitamin D supplement recommended by school nurse",
        imageUrl: "/uploads/patient-medicines/sample-vitamind3.jpg",
        imageFileName: "vitamin-d3.jpg",
        isVerified: false,
      },
    ],
  });
  console.log("✅ Created patient self-reported medicines");

  // ============================================
  // SECTION 23: IMPORT / EXPORT HISTORY
  // ============================================
  console.log("\n📂 Creating import/export history...");
  await prisma.importHistory.createMany({
    data: [
      {
        fileName: "ActiveSubstances_2024_Q1.xlsx",
        fileSize: 1048576,
        fileType: "xlsx",
        totalRows: 150,
        successfulRows: 148,
        failedRows: 2,
        skippedRows: 0,
        importedBy: superAdmin.id,
        importDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        errors: [
          { row: 45, error: "Missing required field: activeSubstance" },
          { row: 102, error: "Invalid dosageForm value" },
        ],
        executionTime: 4250,
      },
      {
        fileName: "TradeNames_2024_March.xlsx",
        fileSize: 524288,
        fileType: "xlsx",
        totalRows: 80,
        successfulRows: 80,
        failedRows: 0,
        skippedRows: 0,
        importedBy: admin1.id,
        importDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        errors: Prisma.JsonNull,
        executionTime: 1820,
      },
      {
        fileName: "Diseases_2024.csv",
        fileSize: 98304,
        fileType: "csv",
        totalRows: 45,
        successfulRows: 44,
        failedRows: 1,
        skippedRows: 0,
        importedBy: admin1.id,
        importDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        errors: [{ row: 23, error: "Duplicate disease name: Hypertension" }],
        executionTime: 980,
      },
    ],
  });

  await prisma.exportHistory.createMany({
    data: [
      {
        format: "xlsx",
        totalRecords: 148,
        filters: { isActive: true, classification: "Antibiotic" },
        exportedBy: superAdmin.id,
        exportDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        format: "xlsx",
        totalRecords: 80,
        filters: { companyId: companies[0].id },
        exportedBy: admin1.id,
        exportDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ],
  });
  console.log("✅ Created import/export history");

  console.log("\n✨ Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - ${companies.length} Companies`);
  console.log(`   - ${activeSubstances.length} Active Substances`);
  console.log(`   - ${tradeNames.length} Trade Names`);
  console.log(`   - ${diseases.length} Diseases`);
  console.log(`   - ${pricingPlans.length} Pricing Plans`);
  console.log(
    `   - 13 Users (1 SuperAdmin, 2 Admins, 3 Doctors, 2 Pharmacists, 5 Patients)`
  );
  console.log(`   - ${prescriptions.length} Prescriptions`);
  console.log(`   - Comprehensive patient data including:`);
  console.log(`     • Medical histories, family histories, allergies`);
  console.log(`     • Lifestyle data, child profiles`);
  console.log(`     • Consultations, visits, medical reports`);
  console.log(`   - Adverse drug reactions, share links, ratings`);

  // ============================================
  // P0 FEATURES: DISEASE WARNING RULES
  // ============================================
  console.log("\n⚠️  Creating Disease Warning Rules...");

  const warningRules = await Promise.all([
    // Rule 1: Critical - Breast Cancer + Live Vaccines
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId:
          diseases.find(
            (d) => d.name.includes("Breast Cancer") || d.name.includes("Cancer")
          )?.id || diseases[0].id,
        ruleType: "BLOCK_ACTIVE_SUBSTANCE",
        targetActiveSubstanceId: activeSubstances.find(
          (a) =>
            a.activeSubstance.includes("MMR") ||
            a.activeSubstance.includes("Vaccine")
        )?.id,
        severity: "Critical",
        warningMessage:
          "🔴 CRITICAL: Live vaccines are absolutely contraindicated during active chemotherapy. Risk of severe infection.",
        autoBlock: true,
        requiresOverride: false,
        createdBy: superAdmin.id, // SuperAdmin
      },
    }),

    // Rule 2: High - Diabetes + NSAIDs
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId:
          diseases.find((d) => d.name.includes("Diabetes"))?.id ||
          diseases[1].id,
        ruleType: "WARN_ACTIVE_SUBSTANCE",
        targetActiveSubstanceId: activeSubstances.find(
          (a) =>
            a.activeSubstance.includes("Ibuprofen") ||
            a.activeSubstance.includes("NSAID")
        )?.id,
        severity: "High",
        warningMessage:
          "🟠 WARNING: NSAIDs may affect blood glucose control. Monitor blood sugar closely.",
        autoBlock: false,
        requiresOverride: false,
        requiredMonitoring: "Blood glucose monitoring 3x daily for 1 week",
        createdBy: admin1.id, // Admin
      },
    }),

    // Rule 3: Critical - Pregnancy + ACE Inhibitors
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId: diseases[2]?.id || diseases[0].id,
        ruleType: "REQUIRE_MONITORING",
        severity: "Critical",
        warningMessage:
          "🔴 PREGNANCY CATEGORY D: Fetal toxicity risk. Contraindicated in 2nd and 3rd trimesters.",
        autoBlock: true,
        requiresOverride: false,
        createdBy: superAdmin.id,
      },
    }),

    // Rule 4: Medium - Kidney Disease Monitoring
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId:
          diseases.find(
            (d) => d.name.includes("Kidney") || d.name.includes("Renal")
          )?.id ||
          diseases[3]?.id ||
          diseases[0].id,
        ruleType: "REQUIRE_MONITORING",
        severity: "High",
        warningMessage:
          "🟠 RENAL WARNING: Dose adjustment required for patients with renal impairment.",
        autoBlock: false,
        requiresOverride: false,
        requiredMonitoring:
          "Serum creatinine, GFR, and electrolytes weekly for first month",
        createdBy: admin1.id,
      },
    }),

    // Rule 5: High - Liver Disease + Hepatotoxic Drugs
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId:
          diseases.find(
            (d) => d.name.includes("Liver") || d.name.includes("Hepatic")
          )?.id ||
          diseases[4]?.id ||
          diseases[0].id,
        ruleType: "BLOCK_DRUG_CLASS",
        targetDrugClass: "Hepatotoxic Agents",
        severity: "Critical",
        warningMessage:
          "🔴 HEPATIC WARNING: This drug class is contraindicated in active liver disease. Risk of hepatic failure.",
        autoBlock: true,
        requiresOverride: true,
        requiredMonitoring:
          "Liver function tests (AST, ALT, Bilirubin) before and weekly during treatment",
        createdBy: superAdmin.id,
      },
    }),
  ]);

  console.log(`✅ Created ${warningRules.length} Disease Warning Rules`);

  // ============================================
  // P0 FEATURES: MEDICINE SUGGESTIONS
  // ============================================
  console.log("\n💊 Creating Medicine Suggestions...");

  const medicineSuggestions = await Promise.all([
    // Suggestion 1: Pending - Ozempic (GLP-1 for diabetes)
    prisma.medicineSuggestion.create({
      data: {
        doctorId: doctors[0].id, // Dr. Smith
        tradeName: "Ozempic",
        activeSubstance: "Semaglutide",
        concentration: "1mg/ml",
        dosageForm: "Pre-filled injection pen",
        manufacturer: "Novo Nordisk",
        reason:
          "Many type 2 diabetic patients are requesting this GLP-1 agonist for better glucose control and weight management. It has shown excellent results in clinical trials.",
        status: "Pending",
      },
    }),

    // Suggestion 2: Approved - Dupixent (for eczema)
    prisma.medicineSuggestion.create({
      data: {
        doctorId: doctors[1].id, // Dr. Johnson
        tradeName: "Dupixent",
        activeSubstance: "Dupilumab",
        concentration: "300mg/2ml",
        dosageForm: "Injection",
        manufacturer: "Sanofi",
        reason:
          "Effective biologic for moderate-to-severe atopic dermatitis. Several patients with resistant eczema would benefit.",
        status: "Approved",
        reviewedBy: superAdmin.id, // SuperAdmin
        reviewNotes:
          "Excellent suggestion. Added to catalog as requested. Will be available for prescribing starting next week.",
        reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    }),

    // Suggestion 3: Rejected
    prisma.medicineSuggestion.create({
      data: {
        doctorId: doctors[2].id, // Dr. Williams
        tradeName: "Generic Paracetamol 1000mg",
        activeSubstance: "Paracetamol",
        concentration: "1000mg",
        dosageForm: "Tablet",
        manufacturer: "Various",
        reason: "Higher dose paracetamol for severe pain cases",
        status: "Rejected",
        reviewedBy: admin1.id, // Admin
        reviewNotes:
          "We already have Paracetamol 500mg in multiple brands. Patients can take 2 tablets for 1000mg dose. No need for separate product.",
        reviewedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
    }),

    // Suggestion 4: Pending - New antibiotic
    prisma.medicineSuggestion.create({
      data: {
        doctorId: doctors[0].id, // Dr. Smith
        tradeName: "Zerbaxa",
        activeSubstance: "Ceftolozane/Tazobactam",
        concentration: "1g/0.5g",
        dosageForm: "IV Infusion",
        manufacturer: "Merck",
        reason:
          "Advanced antibiotic for complicated UTIs and intra-abdominal infections. Needed for patients with multi-drug resistant bacteria.",
        status: "Pending",
      },
    }),
  ]);

  console.log(`✅ Created ${medicineSuggestions.length} Medicine Suggestions`);

  // ============================================
  // FINAL SUMMARY
  // ============================================
  console.log("\n✨ Database seeded successfully!");
  console.log(`   - ${companies.length} Companies`);
  console.log(`   - ${contractingCompanies.length} Contracting Companies`);
  console.log(`   - ${activeSubstances.length} Active Substances`);
  console.log(`   - ${tradeNames.length} Trade Names`);
  console.log(`   - ${diseases.length} Diseases`);
  console.log(`   - ${warningRules.length} Disease Warning Rules`);
  console.log(`   - ${medicineSuggestions.length} Medicine Suggestions`);
  console.log(`   - ${pricingPlans.length} Pricing Plans`);
  console.log(`   - ${permissions.length} Permissions with role assignments`);
  console.log(`   - 13 Users (1 SuperAdmin, 2 Admins, 5 Doctors, 2 Pharmacists, 5 Patients)`);
  console.log(`   - ${subscriptions.length} Subscriptions + Payments`);
  console.log(`   - ${prescriptions.length} Prescriptions with versions & interaction alerts`);
  console.log(`   - Comprehensive patient data:`);
  console.log(`     • Medical histories, family histories, allergies`);
  console.log(`     • Lifestyle data, child profiles, patient diseases`);
  console.log(`     • Consultations, visits, appointments`);
  console.log(`     • Medical reports, adverse drug reactions`);
  console.log(`     • Share links, ratings, notifications`);
  console.log(`   - Supporting data:`);
  console.log(`     • Side effects catalog + medication links`);
  console.log(`     • Medicine alternatives, batch histories`);
  console.log(`     • Disease-substance warnings`);
  console.log(`     • Contracting companies + trade name links`);
  console.log(`     • Audit logs, import/export history`);
  console.log(`     • Contraindication term mappings`);
  console.log("\n🔑 Test Credentials (all passwords: Password@123):");
  console.log("   SuperAdmin: superadmin@greenrx.com");
  console.log("   Admin:      admin1@greenrx.com");
  console.log("   Doctor:     dr.smith@greenrx.com");
  console.log("   Pharmacist: pharmacist1@greenrx.com");
  console.log("   Patient:    patient1@greenrx.com");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
