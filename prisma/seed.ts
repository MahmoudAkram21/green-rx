import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/client";
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
  await prisma.lifestyle.deleteMany();
  await prisma.allergy.deleteMany();
  await prisma.patientDisease.deleteMany();
  await prisma.familyHistory.deleteMany();
  await prisma.medicalHistory.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.pharmacist.deleteMany();
  await prisma.session.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();

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

  // Patients
  const patientUser1 = await prisma.user.create({
    data: {
      email: "patient1@greenrx.com",
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          name: "Alice Cooper",
          age: 45,
          ageClassification: "Adults",
          weight: 70.5,
          height: 165,
          gender: "Female",
          smoking: false,
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
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          name: "Bob Martinez",
          age: 62,
          ageClassification: "Elderly",
          weight: 85.0,
          height: 178,
          gender: "Male",
          smoking: true,
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
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          name: "Carol White",
          age: 28,
          ageClassification: "Adults",
          weight: 62.0,
          height: 160,
          gender: "Female",
          smoking: false,
          pregnancyWarning: true,
          lactation: false,
          profileCompleteness: 90,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "patient4@greenrx.com",
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          name: "David Lee",
          age: 35,
          ageClassification: "Adults",
          weight: 78.5,
          height: 175,
          gender: "Male",
          smoking: false,
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
      passwordHash: hashedPassword,
      role: "Patient",
      emailVerified: true,
      isActive: true,
      patient: {
        create: {
          name: "Emma Thompson",
          age: 8,
          ageClassification: "Children",
          weight: 25.0,
          height: 125,
          gender: "Female",
          smoking: false,
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
        relation: "Maternal Grandmother",
        diseaseId: diseases[0].id, // Diabetes
        severity: "Moderate",
        notes: "Type 2 Diabetes, diagnosed in her 60s",
      },
      {
        patientId: patients[0].id,
        relation: "Paternal Grandfather",
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes:
          "Heart attack at age 72. Had bypass surgery. Died at age 78 from cardiac complications.",
      },
      {
        patientId: patients[0].id,
        relation: "Sister",
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
        relation: "Brother",
        diseaseId: diseases[1].id, // Hypertension
        severity: "Mild",
        notes: "Diagnosed at age 45. On medication. Also has pre-diabetes.",
      },
      {
        patientId: patients[1].id,
        relation: "Brother",
        diseaseId: diseases[4].id, // Hyperlipidemia
        severity: "Mild",
        notes: "Elevated cholesterol, managing with diet",
      },
      {
        patientId: patients[1].id,
        relation: "Paternal Grandfather",
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes: "Multiple heart attacks, died at age 70",
      },
      {
        patientId: patients[1].id,
        relation: "Maternal Uncle",
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
        relation: "Maternal Grandmother",
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Chronic allergies, multiple triggers",
      },
      {
        patientId: patients[2].id,
        relation: "Sister",
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Similar seasonal allergy pattern",
      },
      {
        patientId: patients[2].id,
        relation: "Daughter (Sophie)",
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
        relation: "Paternal Grandfather",
        diseaseId: diseases[3].id, // GERD
        severity: "Moderate",
        notes: "Chronic acid reflux, Barrett's esophagus",
      },
      {
        patientId: patients[3].id,
        relation: "Brother",
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
        relation: "Maternal Grandmother",
        diseaseId: diseases[2].id, // Asthma
        severity: "Moderate",
        notes: "Adult-onset asthma, uses maintenance inhaler",
      },
      {
        patientId: patients[4].id,
        relation: "Paternal Uncle",
        diseaseId: diseases[2].id, // Asthma
        severity: "Mild",
        notes: "Exercise-induced asthma",
      },
    ],
  });

  // Allergies for all patients
  await prisma.allergy.createMany({
    data: [
      {
        patientId: patients[0].id,
        allergen: "Penicillin",
        severity: "Severe",
        reactionType: "Anaphylaxis",
        notes: "Avoid all penicillin derivatives. Use alternative antibiotics.",
      },
      {
        patientId: patients[0].id,
        allergen: "Sulfa drugs",
        severity: "Moderate",
        reactionType: "Rash",
        notes: "Mild rash, avoid sulfonamides",
      },
      {
        patientId: patients[1].id,
        allergen: "Pollen",
        severity: "Mild",
        reactionType: "Rhinitis",
        notes: "Seasonal, spring and fall",
      },
      {
        patientId: patients[2].id,
        allergen: "Shellfish",
        severity: "Moderate",
        reactionType: "Urticaria",
        notes: "Hives and swelling",
      },
      {
        patientId: patients[2].id,
        allergen: "Dust mites",
        severity: "Mild",
        reactionType: "Rhinitis",
      },
      {
        patientId: patients[3].id,
        allergen: "Latex",
        severity: "Moderate",
        reactionType: "Contact dermatitis",
      },
      {
        patientId: patients[4].id,
        allergen: "Peanuts",
        severity: "Severe",
        reactionType: "Anaphylaxis",
        notes: "Life-threatening, carry epinephrine",
      },
    ],
  });

  // Patient Diseases - Comprehensive
  await prisma.patientDisease.createMany({
    data: [
      // Patient 1 (Alice Cooper)
      {
        patientId: patients[0].id,
        diseaseId: diseases[0].id, // Diabetes
        diagnosisDate: new Date("2018-03-15"),
        severity: "Moderate",
        status: "Chronic",
        notes:
          "Type 2 Diabetes, well controlled. HbA1c: 6.8%. Fasting glucose: 110-120 mg/dL. Patient compliant with medication and diet.",
      },
      {
        patientId: patients[0].id,
        diseaseId: diseases[1].id, // Hypertension (borderline)
        diagnosisDate: new Date("2019-05-20"),
        severity: "Mild",
        status: "Active",
        notes:
          "Borderline hypertension. BP: 135/88 mmHg. Managing with lifestyle modifications.",
      },
      // Patient 2 (Bob Martinez)
      {
        patientId: patients[1].id,
        diseaseId: diseases[1].id, // Hypertension
        diagnosisDate: new Date("2015-06-20"),
        severity: "Moderate",
        status: "Chronic",
        notes:
          "Essential hypertension. BP controlled with medication. Last reading: 130/85 mmHg. Regular monitoring required.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[4].id, // Hyperlipidemia
        diagnosisDate: new Date("2019-01-10"),
        severity: "Moderate",
        status: "Chronic",
        notes:
          "Mixed hyperlipidemia. Total cholesterol: 180 mg/dL (down from 240). LDL: 110 mg/dL. Triglycerides: 150 mg/dL. Responding well to statin therapy.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[7].id, // Coronary Artery Disease (high risk)
        diagnosisDate: new Date("2020-08-15"),
        severity: "Mild",
        status: "Active",
        notes:
          "High risk due to family history. Regular cardiac monitoring. Currently asymptomatic. EKG normal. Stress test pending.",
      },
      // Patient 3 (Carol White)
      {
        patientId: patients[2].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        diagnosisDate: new Date("2020-04-10"),
        severity: "Mild",
        status: "Active",
        notes:
          "Seasonal allergic rhinitis. Primary triggers: pollen (spring), ragweed (fall). Symptoms include sneezing, nasal congestion, itchy eyes.",
      },
      {
        patientId: patients[2].id,
        diseaseId: diseases[2].id, // Asthma (exercise-induced)
        diagnosisDate: new Date("2021-09-05"),
        severity: "Mild",
        status: "Active",
        notes:
          "Exercise-induced asthma. Symptoms occur during vigorous exercise. Well controlled with pre-exercise bronchodilator.",
      },
      // Patient 4 (David Lee)
      {
        patientId: patients[3].id,
        diseaseId: diseases[3].id, // GERD
        diagnosisDate: new Date("2021-08-15"),
        severity: "Mild",
        status: "Active",
        notes:
          "Gastroesophageal reflux disease. Symptoms well controlled with PPI therapy. No nighttime symptoms. Avoids trigger foods.",
      },
      {
        patientId: patients[3].id,
        diseaseId: diseases[1].id, // Hypertension (borderline)
        diagnosisDate: new Date("2022-01-10"),
        severity: "Mild",
        status: "Active",
        notes:
          "Borderline hypertension. BP: 138/88 mmHg. Monitoring without medication initially. Lifestyle modifications recommended.",
      },
      // Patient 5 (Emma Thompson)
      {
        patientId: patients[4].id,
        diseaseId: diseases[2].id, // Asthma
        diagnosisDate: new Date("2022-02-20"),
        severity: "Mild",
        status: "Active",
        notes:
          "Exercise-induced asthma in pediatric patient. Uses rescue inhaler before physical activity. No nighttime symptoms. Regular monitoring.",
      },
      {
        patientId: patients[4].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        diagnosisDate: new Date("2022-03-15"),
        severity: "Mild",
        status: "Active",
        notes:
          "Seasonal allergies, primarily in spring. Symptoms include runny nose and sneezing. Managed with pediatric dose antihistamines.",
      },
    ],
  });

  // Lifestyle data for all patients
  await prisma.lifestyle.createMany({
    data: [
      {
        patientId: patients[0].id,
        noGlasses: false,
        alcoholAbuse: false,
        excessCaffeine: true,
        waterDaily: 2.5,
        travellerAbroad: true,
        annualVaccination: true,
        surgeriesLast3Months: false,
        surgeriesDetails: null,
      },
      {
        patientId: patients[1].id,
        noGlasses: false,
        alcoholAbuse: false,
        excessCaffeine: false,
        waterDaily: 2.0,
        travellerAbroad: false,
        annualVaccination: true,
        surgeriesLast3Months: false,
      },
      {
        patientId: patients[2].id,
        noGlasses: true,
        alcoholAbuse: false,
        excessCaffeine: false,
        waterDaily: 2.8,
        travellerAbroad: false,
        annualVaccination: true,
        surgeriesLast3Months: false,
      },
      {
        patientId: patients[3].id,
        noGlasses: false,
        alcoholAbuse: false,
        excessCaffeine: true,
        waterDaily: 3.0,
        travellerAbroad: true,
        annualVaccination: true,
        surgeriesLast3Months: true,
        surgeriesDetails: "Appendectomy in June 2024",
      },
      {
        patientId: patients[4].id,
        noGlasses: true,
        alcoholAbuse: false,
        excessCaffeine: false,
        waterDaily: 1.5,
        travellerAbroad: false,
        annualVaccination: true,
        surgeriesLast3Months: false,
      },
    ],
  });

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
  const allergyCount = await prisma.allergy.count();
  const patientDiseaseCount = await prisma.patientDisease.count();
  const lifestyleCount = await prisma.lifestyle.count();
  const childProfileCount = await prisma.childProfile.count();

  console.log("✅ Created comprehensive patient medical data");
  console.log(`   - ${medicalHistoryCount} Medical History records`);
  console.log(`   - ${familyHistoryCount} Family History records`);
  console.log(`   - ${allergyCount} Allergy records`);
  console.log(`   - ${patientDiseaseCount} Patient Disease records`);
  console.log(`   - ${lifestyleCount} Lifestyle records`);
  console.log(`   - ${childProfileCount} Child Profile records`);

  // ============================================
  // SECTION 9: PATIENT-DOCTOR RELATIONSHIPS
  // ============================================
  console.log("\n👨‍⚕️ Creating patient-doctor relationships...");
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
        doctorId: doctors[2].id,
        relationshipType: "PrimaryCare",
        startDate: new Date("2021-03-20"),
        isActive: true,
      },
      {
        patientId: patients[4].id,
        doctorId: doctors[1].id, // Pediatrician
        relationshipType: "PrimaryCare",
        startDate: new Date("2022-01-10"),
        isActive: true,
      },
    ],
  });
  console.log("✅ Created patient-doctor relationships");

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
        doctorId: doctors[2].id,
        visitDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        visitType: "FollowUp",
        isNewVisit: false,
        diagnosis: "Allergic Rhinitis",
        treatmentPlan: "Cetirizine 10mg daily as needed",
        notes: "Symptoms improved",
      },
      {
        patientId: patients[4].id,
        doctorId: doctors[1].id,
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
        message:
          "Your prescription for Glucophage is ready for pickup at City Pharmacy",
        isRead: false,
      },
      {
        userId: patientUser2.id,
        type: "AppointmentReminder",
        title: "Appointment Reminder",
        message: "You have an appointment with Dr. Smith in 2 days",
        isRead: false,
      },
    ],
  });
  console.log("✅ Created notifications");

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
  console.log(`   - ${activeSubstances.length} Active Substances`);
  console.log(`   - ${tradeNames.length} Trade Names`);
  console.log(`   - ${diseases.length} Diseases`);
  console.log(`   - ${warningRules.length} Disease Warning Rules (P0)`);
  console.log(`   - ${medicineSuggestions.length} Medicine Suggestions (P0)`);
  console.log(`   - ${pricingPlans.length} Pricing Plans`);
  console.log(
    `   - 13 Users (1 SuperAdmin, 2 Admins, 3 Doctors, 2 Pharmacists, 5 Patients)`
  );
  console.log(`   - ${prescriptions.length} Prescriptions`);
  console.log(`   - Comprehensive patient data including:`);
  console.log(`     • Medical histories, family histories, allergies`);
  console.log(`     • Lifestyle data, child profiles`);
  console.log(`     • Consultations, visits, medical reports`);
  console.log(`     • Adverse drug reactions, share links, ratings`);
  console.log("\n🔑 Test Credentials:");
  console.log("   SuperAdmin: superadmin@greenrx.com / Password@123");
  console.log("   Admin:      admin1@greenrx.com / Password@123");
  console.log("   Doctor:     dr.smith@greenrx.com / Password@123");
  console.log("   Pharmacist: pharmacist1@greenrx.com / Password@123");
  console.log("   Patient:    patient1@greenrx.com / Password@123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
