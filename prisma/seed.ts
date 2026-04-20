/** @format */

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma, ActiveSubstanceLifestyleField } from "../generated/client/client";
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
  await prisma.allergenCategory.deleteMany();
  await prisma.patientDisease.deleteMany();
  await prisma.familyHistory.deleteMany();
  await prisma.medicalHistory.deleteMany();
  await prisma.surgicalHistory.deleteMany();
  await prisma.organ.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctorClinic.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.pharmacist.deleteMany();
  await prisma.session.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();

  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();

  await prisma.diseaseBodySystemMapping.deleteMany();

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
  await prisma.instructionPdf.deleteMany();
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
  const classificationNames = [
    "Analgesic/Antipyretic",
    "NSAID",
    "Antibiotic (Penicillin)",
    "Antidiabetic (Biguanide)",
    "Calcium Channel Blocker",
    "Proton Pump Inhibitor",
    "Statin",
    "Beta-2 Agonist",
    "Antihistamine",
    "ARB (Angiotensin Receptor Blocker)",
  ];
  await prisma.classification.createMany({
    data: classificationNames.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const classifications = await prisma.classification.findMany({
    where: { name: { in: classificationNames } },
    select: { id: true, name: true },
  });
  const classificationByName = new Map(
    classifications.map((c) => [c.name, c.id]),
  );
  const activeSubstances = await Promise.all([
    prisma.activeSubstance.create({
      data: {
        name: "Paracetamol",
        concentration: "500mg",
        classificationId: classificationByName.get("Analgesic/Antipyretic"),
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
        name: "Ibuprofen",
        concentration: "400mg",
        classificationId: classificationByName.get("NSAID"),
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
        name: "Amoxicillin",
        concentration: "500mg",
        classificationId: classificationByName.get("Antibiotic (Penicillin)"),
        dosageForm: "Capsule",
        indication: "Bacterial infections",
        adultDoseMaxPerDay: "3000mg",
        pediatricDose: "20-40mg/kg/day divided",
        contraindications: ["Penicillin allergy"],
      },
    }),
    prisma.activeSubstance.create({
      data: {
        name: "Metformin",
        concentration: "500mg",
        classificationId: classificationByName.get("Antidiabetic (Biguanide)"),
        dosageForm: "Tablet",
        indication: "Type 2 Diabetes Mellitus",
        adultDoseMaxPerDay: "2550mg",
        renalWarning: "Contraindicated in severe renal impairment",
        hepaticWarning: "Use with caution in hepatic disease",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        name: "Amlodipine",
        concentration: "5mg",
        classificationId: classificationByName.get("Calcium Channel Blocker"),
        dosageForm: "Tablet",
        indication: "Hypertension, Angina",
        adultDoseMaxPerDay: "10mg",
        cardiacWarning: "Monitor blood pressure",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        name: "Omeprazole",
        concentration: "20mg",
        classificationId: classificationByName.get("Proton Pump Inhibitor"),
        dosageForm: "Capsule",
        indication: "GERD, Peptic ulcer",
        adultDoseMaxPerDay: "40mg",
        hepaticWarning: "Dose adjustment may be needed",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        name: "Atorvastatin",
        concentration: "20mg",
        classificationId: classificationByName.get("Statin"),
        dosageForm: "Tablet",
        indication: "Hyperlipidemia",
        adultDoseMaxPerDay: "80mg",
        musculoSkeletalWarning: "May cause myalgia",
        hepaticWarning: "Monitor liver enzymes",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        name: "Salbutamol",
        concentration: "100mcg",
        dosageForm: "Inhaler",
        classificationId: classificationByName.get("Beta-2 Agonist"),
        indication: "Asthma, COPD",
        adultDoseMaxPerDay: "800mcg",
        cardiacWarning: "Use with caution in cardiac disease",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        name: "Cetirizine",
        concentration: "10mg",
        classificationId: classificationByName.get("Antihistamine"),
        dosageForm: "Tablet",
        indication: "Allergic rhinitis, Urticaria",
        adultDoseMaxPerDay: "10mg",
        nervousSystemWarning: "May cause drowsiness",
      },
    }),
    prisma.activeSubstance.create({
      data: {
        name: "Losartan",
        concentration: "50mg",
        classificationId: classificationByName.get(
          "ARB (Angiotensin Receptor Blocker)",
        ),
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
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Brufen",
        activeSubstanceId: activeSubstances[1].id,
        companyId: companies[0].id, // Pfizer
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Amoxil",
        activeSubstanceId: activeSubstances[2].id,
        companyId: companies[2].id, // GSK
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Glucophage",
        activeSubstanceId: activeSubstances[3].id,
        companyId: companies[3].id, // Sanofi
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Norvasc",
        activeSubstanceId: activeSubstances[4].id,
        companyId: companies[0].id, // Pfizer
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Losec",
        activeSubstanceId: activeSubstances[5].id,
        companyId: companies[1].id, // Novartis
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Lipitor",
        activeSubstanceId: activeSubstances[6].id,
        companyId: companies[0].id, // Pfizer
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Ventolin",
        activeSubstanceId: activeSubstances[7].id,
        companyId: companies[2].id, // GSK
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Zyrtec",
        activeSubstanceId: activeSubstances[8].id,
        companyId: companies[1].id, // Novartis
      },
    }),
    prisma.tradeName.create({
      data: {
        title: "Cozaar",
        activeSubstanceId: activeSubstances[9].id,
        companyId: companies[0].id, // Pfizer
      },
    }),
  ]);
  console.log(`✅ Created ${tradeNames.length} trade names`);

  // ============================================
  // SECTION 3.0.5: INSTRUCTION PDFs
  // ============================================
  console.log("\n📄 Creating instruction PDFs...");
  const instructionPdfs = await Promise.all([
    prisma.instructionPdf.create({
      data: {
        tradeNameId: tradeNames[0].id, // Panadol
        url: "https://cdn.example.com/instructions/panadol.pdf",
      },
    }),
    prisma.instructionPdf.create({
      data: {
        tradeNameId: tradeNames[1].id, // Brufen
        url: "https://cdn.example.com/instructions/brufen.pdf",
      },
    }),
    prisma.instructionPdf.create({
      data: {
        tradeNameId: tradeNames[6].id, // Lipitor
        url: "https://cdn.example.com/instructions/lipitor.pdf",
      },
    }),
    prisma.instructionPdf.create({
      data: {
        tradeNameId: tradeNames[7].id, // Ventolin
        url: "https://cdn.example.com/instructions/ventolin.pdf",
      },
    }),
  ]);
  console.log(`✅ Created ${instructionPdfs.length} instruction PDFs`);

  // ============================================
  // SECTION 3.1: EXCIPIENTS
  // ============================================
  console.log("\n🧪 Creating excipients...");
  const excipients = await Promise.all([
    prisma.excipient.create({
      data: {
        name: "Lactose Monohydrate",
        description: "Common tablet filler/diluent in oral solid dosage forms",
      },
    }),
    prisma.excipient.create({
      data: {
        name: "Microcrystalline Cellulose",
        description: "Binder and filler used in compressed tablets",
      },
    }),
    prisma.excipient.create({
      data: {
        name: "Magnesium Stearate",
        description:
          "Lubricant used to prevent ingredients from sticking during manufacturing",
      },
    }),
    prisma.excipient.create({
      data: {
        name: "Sodium Benzoate",
        description: "Preservative in liquid and oral formulations",
      },
    }),
    prisma.excipient.create({
      data: {
        name: "Propylene Glycol",
        description: "Solvent/humectant used in liquid dosage forms",
      },
    }),
    prisma.excipient.create({
      data: {
        name: "Polysorbate 80",
        description: "Emulsifier to stabilize suspensions and injections",
      },
    }),
  ]);
  console.log(`✅ Created ${excipients.length} excipients`);

  await prisma.excipientTradeName.createMany({
    data: [
      { tradeNameId: tradeNames[0].id, excipientId: excipients[0].id }, // Panadol -> Lactose
      { tradeNameId: tradeNames[0].id, excipientId: excipients[2].id }, // Panadol -> Magnesium Stearate
      { tradeNameId: tradeNames[1].id, excipientId: excipients[1].id }, // Brufen -> MCC
      { tradeNameId: tradeNames[2].id, excipientId: excipients[2].id }, // Amoxil -> Magnesium Stearate
      { tradeNameId: tradeNames[3].id, excipientId: excipients[4].id }, // Glucophage -> Propylene Glycol
      { tradeNameId: tradeNames[7].id, excipientId: excipients[5].id }, // Ventolin -> Polysorbate 80
      { tradeNameId: tradeNames[9].id, excipientId: excipients[3].id }, // Cozaar -> Sodium Benzoate
    ],
    skipDuplicates: true,
  });
  console.log("✅ Linked excipients to trade names");

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
      isEmailVerified: true,
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
      isEmailVerified: true,
      isActive: true,
    },
  });

  await prisma.user.create({
    data: {
      email: "admin2@greenrx.com",
      passwordHash: hashedPassword,
      role: "Admin",
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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

  // Pending verification pharmacists (for /dashboard/pharmacists/verify)
  await prisma.user.create({
    data: {
      email: "pharmacist.pending1@greenrx.com",
      name: "Sarah Wilson",
      passwordHash: hashedPassword,
      role: "Pharmacist",
      isEmailVerified: false,
      isActive: true,
      pharmacist: {
        create: {
          name: "Sarah Wilson",
          licenseNumber: "PH-PEND-001",
          pharmacyName: "Sunrise Pharmacy",
          phoneNumber: "+1-555-1001",
          address: "100 Oak Street",
          city: "Chicago",
          isVerified: false,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "pharmacist.pending2@greenrx.com",
      name: "Ahmed Hassan",
      passwordHash: hashedPassword,
      role: "Pharmacist",
      isEmailVerified: false,
      isActive: true,
      pharmacist: {
        create: {
          name: "Ahmed Hassan",
          licenseNumber: "PH-PEND-002",
          pharmacyName: "Green Valley Pharmacy",
          phoneNumber: "+20-111-222-3344",
          address: "15 Tahrir Square",
          city: "Cairo",
          isVerified: false,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "pharmacist.pending3@greenrx.com",
      name: "Maria Garcia",
      passwordHash: hashedPassword,
      role: "Pharmacist",
      isEmailVerified: false,
      isActive: true,
      pharmacist: {
        create: {
          name: "Maria Garcia",
          licenseNumber: "PH-PEND-003",
          pharmacyName: "Downtown Drug Store",
          phoneNumber: "+1-555-3003",
          address: "200 Commerce Blvd",
          city: "Houston",
          isVerified: false,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "pharmacist.pending4@greenrx.com",
      name: "Omar Khalil",
      passwordHash: hashedPassword,
      role: "Pharmacist",
      isEmailVerified: false,
      isActive: true,
      pharmacist: {
        create: {
          name: "Omar Khalil",
          licenseNumber: "PH-PEND-004",
          pharmacyName: "Al-Noor Pharmacy",
          phoneNumber: "+966-50-123-4567",
          address: "King Fahd Road",
          city: "Riyadh",
          isVerified: false,
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "pharmacist.pending5@greenrx.com",
      name: "Jennifer Lee",
      passwordHash: hashedPassword,
      role: "Pharmacist",
      isEmailVerified: false,
      isActive: true,
      pharmacist: {
        create: {
          name: "Jennifer Lee",
          licenseNumber: "PH-PEND-005",
          pharmacyName: "Wellness Corner",
          phoneNumber: "+1-555-5005",
          address: "88 Health Lane",
          city: "Seattle",
          isVerified: false,
        },
      },
    },
  });

  console.log("✅ Created 2 verified + 5 pending Pharmacist users");

  // Patients (name on User; age/ageClassification from dateOfBirth; smoking in lifestyle questions)
  const patientUser1 = await prisma.user.create({
    data: {
      email: "patient1@greenrx.com",
      name: "Alice Cooper",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
      isEmailVerified: true,
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
  // SECTION 6a: DOCTOR CLINICS (multiple clinics per doctor)
  // ============================================
  console.log("\n🏥 Creating doctor clinics...");
  const clinicData: Array<{
    doctorId: number;
    name: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    workingHours: object;
  }> = [];
  const workingHoursWeek = [
    { day: "monday", startTime: "09:00", endTime: "17:00" },
    { day: "tuesday", startTime: "09:00", endTime: "17:00" },
    { day: "wednesday", startTime: "09:00", endTime: "17:00" },
    { day: "thursday", startTime: "09:00", endTime: "17:00" },
    { day: "friday", startTime: "09:00", endTime: "15:00" },
  ];
  for (const d of doctors) {
    clinicData.push({
      doctorId: d.id,
      name: "Main Clinic",
      address: d.address ?? "Main Street",
      city: d.city ?? "City",
      latitude: 40.7128,
      longitude: -74.006,
      workingHours: workingHoursWeek,
    });
    if (doctors.indexOf(d) < 3) {
      clinicData.push({
        doctorId: d.id,
        name: "Branch Office",
        address: "100 Second Ave",
        city: d.city ?? "City",
        latitude: 40.72,
        longitude: -74.01,
        workingHours: [
          { day: "monday", startTime: "14:00", endTime: "18:00" },
          { day: "wednesday", startTime: "14:00", endTime: "18:00" },
        ],
      });
    }
  }
  await prisma.doctorClinic.createMany({ data: clinicData });
  console.log(
    `✅ Created ${clinicData.length} doctor clinics for ${doctors.length} doctors`,
  );

  // ============================================
  // SECTION 6b: ORGANS (for surgical history dropdown)
  // ============================================
  console.log("\n🫀 Creating organs...");
  const organHeart = await prisma.organ.create({ data: { name: "Heart" } });
  const organLiver = await prisma.organ.create({ data: { name: "Liver" } });
  const organKidney = await prisma.organ.create({ data: { name: "Kidney" } });
  const organLung = await prisma.organ.create({ data: { name: "Lung" } });
  const organEye = await prisma.organ.create({ data: { name: "Eye" } });
  const organAppendix = await prisma.organ.create({
    data: { name: "Appendix" },
  });
  const organGallbladder = await prisma.organ.create({
    data: { name: "Gallbladder" },
  });
  const organKnee = await prisma.organ.create({ data: { name: "Knee" } });
  const organTonsils = await prisma.organ.create({ data: { name: "Tonsils" } });
  console.log("✅ Created 9 organs");

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

  // Surgical Histories (one entry per patient per organ — @@unique([patientId, organId]))
  await prisma.surgicalHistory.createMany({
    data: [
      // Patient 1 (Alice Cooper)
      { patientId: patients[0].id, organId: organAppendix.id },
      { patientId: patients[0].id, organId: organEye.id },
      // Patient 2 (Bob Martinez)
      { patientId: patients[1].id, organId: organKnee.id },
      { patientId: patients[1].id, organId: organGallbladder.id },
      { patientId: patients[1].id, organId: organHeart.id },
      // Patient 3 (Carol White)
      { patientId: patients[2].id, organId: organTonsils.id },
      // Patient 4 (David Lee)
      { patientId: patients[3].id, organId: organLiver.id },
      // Patient 5 (Emma Thompson)
      { patientId: patients[4].id, organId: organLung.id },
      { patientId: patients[4].id, organId: organKidney.id },
    ],
  });
  console.log("✅ Created surgical histories for patients");

  // Family Histories - Comprehensive
  await prisma.familyHistory.createMany({
    data: [
      // Patient 1 (Alice Cooper) - Family History
      {
        patientId: patients[0].id,
        diseaseId: diseases[0].id, // Diabetes
        severity: "Moderate",
        notes:
          "Diagnosed at age 55. Type 2 Diabetes. Currently on medication. HbA1c controlled around 7.0%",
      },
      {
        patientId: patients[0].id,
        diseaseId: diseases[1].id, // Hypertension
        severity: "Moderate",
        notes:
          "Diagnosed at age 58. On antihypertensive medication. BP well controlled.",
      },
      {
        patientId: patients[0].id,
        diseaseId: diseases[0].id, // Diabetes
        severity: "Moderate",
        notes: "Type 2 Diabetes, diagnosed in her 60s",
      },
      {
        patientId: patients[0].id,
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes:
          "Heart attack at age 72. Had bypass surgery. Died at age 78 from cardiac complications.",
      },
      {
        patientId: patients[0].id,
        diseaseId: diseases[0].id, // Diabetes
        severity: "Mild",
        notes: "Pre-diabetic, managing with diet and exercise",
      },
      // Patient 2 (Bob Martinez) - Extensive Family History
      {
        patientId: patients[1].id,
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes:
          "Heart attack at age 65. Had triple bypass surgery. Currently on multiple cardiac medications.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[1].id, // Hypertension
        severity: "Moderate",
        notes: "Hypertension diagnosed at age 60, before cardiac event",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[4].id, // Hyperlipidemia
        severity: "Moderate",
        notes: "High cholesterol, on statin therapy",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[1].id, // Hypertension
        severity: "Mild",
        notes: "Borderline hypertension, managed with lifestyle",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[1].id, // Hypertension
        severity: "Mild",
        notes: "Diagnosed at age 45. On medication. Also has pre-diabetes.",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[4].id, // Hyperlipidemia
        severity: "Mild",
        notes: "Elevated cholesterol, managing with diet",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[7].id, // Coronary Artery Disease
        severity: "Severe",
        notes: "Multiple heart attacks, died at age 70",
      },
      {
        patientId: patients[1].id,
        diseaseId: diseases[0].id, // Diabetes
        severity: "Moderate",
        notes: "Type 2 Diabetes, diagnosed at age 50",
      },
      // Patient 3 (Carol White) - Allergic Family History
      {
        patientId: patients[2].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Seasonal allergies, uses antihistamines as needed",
      },
      {
        patientId: patients[2].id,
        diseaseId: diseases[2].id, // Asthma
        severity: "Moderate",
        notes:
          "Childhood asthma, now well controlled. Uses inhaler occasionally.",
      },
      {
        patientId: patients[2].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Chronic allergies, multiple triggers",
      },
      {
        patientId: patients[2].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Similar seasonal allergy pattern",
      },
      {
        patientId: patients[2].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis (potential)
        severity: "None",
        notes: "Too young to diagnose, but monitoring for allergy symptoms",
      },
      // Patient 4 (David Lee) - GERD and Cardiovascular
      {
        patientId: patients[3].id,
        diseaseId: diseases[3].id, // GERD
        severity: "Moderate",
        notes:
          "Chronic GERD, on long-term PPI therapy. Had endoscopy showing esophagitis.",
      },
      {
        patientId: patients[3].id,
        diseaseId: diseases[1].id, // Hypertension
        severity: "Moderate",
        notes: "Hypertension, on medication",
      },
      {
        patientId: patients[3].id,
        diseaseId: diseases[1].id, // Hypertension
        severity: "Mild",
        notes: "Borderline hypertension",
      },
      {
        patientId: patients[3].id,
        diseaseId: diseases[3].id, // GERD
        severity: "Moderate",
        notes: "Chronic acid reflux, Barrett's esophagus",
      },
      {
        patientId: patients[3].id,
        diseaseId: diseases[3].id, // GERD
        severity: "Mild",
        notes: "Occasional heartburn, manages with OTC medications",
      },
      // Patient 5 (Emma Thompson) - Pediatric Family History
      {
        patientId: patients[4].id,
        diseaseId: diseases[2].id, // Asthma
        severity: "Mild",
        notes: "Childhood asthma, resolved in adulthood",
      },
      {
        patientId: patients[4].id,
        diseaseId: diseases[6].id, // Allergic Rhinitis
        severity: "Mild",
        notes: "Seasonal allergies",
      },
      {
        patientId: patients[4].id,
        diseaseId: diseases[2].id, // Asthma
        severity: "Moderate",
        notes: "Adult-onset asthma, uses maintenance inhaler",
      },
      {
        patientId: patients[4].id,
        diseaseId: diseases[2].id, // Asthma
        severity: "Mild",
        notes: "Exercise-induced asthma",
      },
    ],
  });

  // ============================================
  // ALLERGEN CATEGORIES + ALLERGEN CATALOG
  // ============================================
  console.log("\n🌿 Creating allergen categories...");

  const catRespiratory = await prisma.allergenCategory.create({
    data: { name: { en: "Respiratory", ar: "الجهاز التنفسي" } },
  });
  const catFood = await prisma.allergenCategory.create({
    data: { name: { en: "Food", ar: "الغذاء" } },
  });
  await prisma.allergenCategory.create({
    data: { name: { en: "Skin", ar: "الجلد" } },
  });
  await prisma.allergenCategory.create({
    data: { name: { en: "Insect Stings", ar: "لسعات الحشرات" } },
  });
  const catMedication = await prisma.allergenCategory.create({
    data: { name: { en: "Medication", ar: "الأدوية" } },
  });
  console.log("✅ Created 5 allergen categories");

  console.log("\n💊 Creating allergen catalog...");

  // Respiratory
  const allergenPollen = await prisma.allergen.create({
    data: { name: "Pollen Grain", allergenCategoryId: catRespiratory.id },
  });

  // Food
  await prisma.allergen.create({
    data: { name: "Lactose", allergenCategoryId: catFood.id },
  });
  const allergenEggs = await prisma.allergen.create({
    data: { name: "Eggs", allergenCategoryId: catFood.id },
  });
  await prisma.allergen.create({
    data: { name: "Egg Yolk", allergenCategoryId: catFood.id },
  });
  await prisma.allergen.create({
    data: { name: "Fish", allergenCategoryId: catFood.id },
  });
  const allergenMarineProducts = await prisma.allergen.create({
    data: { name: "Marine Products", allergenCategoryId: catFood.id },
  });
  await prisma.allergen.create({
    data: { name: "Nuts", allergenCategoryId: catFood.id },
  });
  const allergenPeanuts = await prisma.allergen.create({
    data: { name: "Peanuts", allergenCategoryId: catFood.id },
  });
  const allergenWheat = await prisma.allergen.create({
    data: { name: "Wheat", allergenCategoryId: catFood.id },
  });
  const allergenSoybeans = await prisma.allergen.create({
    data: { name: "Soybeans", allergenCategoryId: catFood.id },
  });
  await prisma.allergen.create({
    data: { name: "Sesame", allergenCategoryId: catFood.id },
  });
  await prisma.allergen.create({
    data: {
      name: "Animals Product as Gelatin",
      allergenCategoryId: catFood.id,
    },
  });

  // Skin (category created; no allergens in provided list)

  // Insect Stings (category created; no allergens in provided list)

  // Medication
  const allergenIron = await prisma.allergen.create({
    data: {
      name: "Iron, Ferric Products",
      allergenCategoryId: catMedication.id,
    },
  });
  await prisma.allergen.create({
    data: {
      name: "Non-steroidal Anti-inflammatory Drugs (e.g. Ketoprofen, Diclofenac)",
      allergenCategoryId: catMedication.id,
    },
  });
  const allergenPenicillin = await prisma.allergen.create({
    data: { name: "Penicillin", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Quinolones", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Cephalosporines", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Benzodiazepines", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Sulfonylureas", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Insulin", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Anesthetics", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Food Colors", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: { name: "Hormones", allergenCategoryId: catMedication.id },
  });
  await prisma.allergen.create({
    data: {
      name: "Preservatives Products",
      allergenCategoryId: catMedication.id,
    },
  });
  console.log("✅ Created allergen catalog");

  // Link allergens to active substances and excipients
  await prisma.allergenActiveSubstance.createMany({
    data: [
      {
        allergenId: allergenPenicillin.id,
        activeSubstanceId: activeSubstances[2].id,
      }, // Penicillin -> Amoxicillin
      {
        allergenId: allergenIron.id,
        activeSubstanceId: activeSubstances[3].id,
      }, // Iron sensitivity context -> Metformin use-case cohort
      {
        allergenId: allergenPollen.id,
        activeSubstanceId: activeSubstances[7].id,
      }, // Pollen/allergic cohort -> Salbutamol
      {
        allergenId: allergenPeanuts.id,
        activeSubstanceId: activeSubstances[8].id,
      }, // Allergic cohort -> Cetirizine
    ],
    skipDuplicates: true,
  });

  await prisma.allergenExcipient.createMany({
    data: [
      { allergenId: allergenWheat.id, excipientId: excipients[0].id }, // Wheat/celiac sensitivity with lactose-containing formulations
      { allergenId: allergenSoybeans.id, excipientId: excipients[5].id }, // Soy-related hypersensitivity context
      { allergenId: allergenEggs.id, excipientId: excipients[3].id }, // Egg allergy context with preservative sensitivity
      { allergenId: allergenMarineProducts.id, excipientId: excipients[4].id }, // Marine product allergy context
    ],
    skipDuplicates: true,
  });
  console.log("✅ Linked allergens to active substances and excipients");

  // Patient allergies (new model: PatientAllergyReport + PatientAllergy joins)
  const patientAllergySeed = [
    {
      patientId: patients[0].id,
      allergenIds: [allergenPenicillin.id, allergenIron.id],
      reaction: "Anaphylaxis",
      notes: "Avoid all penicillin derivatives. Use alternative antibiotics.",
    },
    {
      patientId: patients[1].id,
      allergenIds: [allergenPollen.id],
      reaction: "Rhinitis",
      notes: "Seasonal, spring and fall",
    },
    {
      patientId: patients[2].id,
      allergenIds: [allergenMarineProducts.id, allergenWheat.id],
      reaction: "Urticaria",
      notes: "Hives and swelling",
    },
    {
      patientId: patients[3].id,
      allergenIds: [allergenSoybeans.id],
      reaction: "Contact dermatitis",
    },
    {
      patientId: patients[4].id,
      allergenIds: [allergenPeanuts.id, allergenEggs.id],
      reaction: "Anaphylaxis",
      notes: "Life-threatening, carry epinephrine",
    },
  ];

  for (const entry of patientAllergySeed) {
    const report = await prisma.patientAllergyReport.create({
      data: {
        patientId: entry.patientId,
        reaction: entry.reaction,
        notes: entry.notes,
      },
    });

    await prisma.patientAllergy.createMany({
      data: entry.allergenIds.map((allergenId) => ({
        patientAllergyReportId: report.id,
        allergenId,
      })),
    });
  }
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
    data: {
      question: "Alcohol use",
      activeSubstanceField: ActiveSubstanceLifestyleField.interactionAlcohol,
    },
  });
  const lifestyleCaffeine = await prisma.lifestyle.create({
    data: {
      question: "Excess caffeine / xanthines",
      activeSubstanceField: ActiveSubstanceLifestyleField.interactionXanthines,
    },
  });
  const lifestyleVitaminsFood = await prisma.lifestyle.create({
    data: {
      question: "Vitamins / food interactions",
      activeSubstanceField: ActiveSubstanceLifestyleField.interactionVitaminsFood,
    },
  });
  const lifestyleMuscleRelaxant = await prisma.lifestyle.create({
    data: {
      question: "Muscle relaxant use",
      activeSubstanceField: ActiveSubstanceLifestyleField.interactionMuscleRelaxant,
    },
  });
  const lifestyleAnticoagulant = await prisma.lifestyle.create({
    data: {
      question: "Anticoagulant use",
      activeSubstanceField: ActiveSubstanceLifestyleField.interactionAnticoagulant,
    },
  });
  const lifestyleCorticosteroids = await prisma.lifestyle.create({
    data: {
      question: "Corticosteroid use",
      activeSubstanceField: ActiveSubstanceLifestyleField.interactionCorticosteroids,
    },
  });

  // Patient lifestyle answers (many-to-many: patientId, lifestyleId, value) — all patients have answers for all questions
  await prisma.patientLifestyle.createMany({
    data: [
      // Patient 0
      {
        patientId: patients[0].id,
        lifestyleId: lifestyleAlcohol.id,
        value: false,
      },
      {
        patientId: patients[0].id,
        lifestyleId: lifestyleCaffeine.id,
        value: true,
      },
      {
        patientId: patients[0].id,
        lifestyleId: lifestyleVitaminsFood.id,
        value: true,
      },
      {
        patientId: patients[0].id,
        lifestyleId: lifestyleMuscleRelaxant.id,
        value: false,
      },
      {
        patientId: patients[0].id,
        lifestyleId: lifestyleAnticoagulant.id,
        value: false,
      },
      {
        patientId: patients[0].id,
        lifestyleId: lifestyleCorticosteroids.id,
        value: false,
      },
      // Patient 1
      {
        patientId: patients[1].id,
        lifestyleId: lifestyleAlcohol.id,
        value: false,
      },
      {
        patientId: patients[1].id,
        lifestyleId: lifestyleCaffeine.id,
        value: false,
      },
      {
        patientId: patients[1].id,
        lifestyleId: lifestyleVitaminsFood.id,
        value: false,
      },
      {
        patientId: patients[1].id,
        lifestyleId: lifestyleMuscleRelaxant.id,
        value: false,
      },
      {
        patientId: patients[1].id,
        lifestyleId: lifestyleAnticoagulant.id,
        value: true,
      },
      {
        patientId: patients[1].id,
        lifestyleId: lifestyleCorticosteroids.id,
        value: false,
      },
      // Patient 2
      {
        patientId: patients[2].id,
        lifestyleId: lifestyleAlcohol.id,
        value: false,
      },
      {
        patientId: patients[2].id,
        lifestyleId: lifestyleCaffeine.id,
        value: false,
      },
      {
        patientId: patients[2].id,
        lifestyleId: lifestyleVitaminsFood.id,
        value: true,
      },
      {
        patientId: patients[2].id,
        lifestyleId: lifestyleMuscleRelaxant.id,
        value: false,
      },
      {
        patientId: patients[2].id,
        lifestyleId: lifestyleAnticoagulant.id,
        value: false,
      },
      {
        patientId: patients[2].id,
        lifestyleId: lifestyleCorticosteroids.id,
        value: true,
      },
      // Patient 3
      {
        patientId: patients[3].id,
        lifestyleId: lifestyleAlcohol.id,
        value: false,
      },
      {
        patientId: patients[3].id,
        lifestyleId: lifestyleCaffeine.id,
        value: true,
      },
      {
        patientId: patients[3].id,
        lifestyleId: lifestyleVitaminsFood.id,
        value: false,
      },
      {
        patientId: patients[3].id,
        lifestyleId: lifestyleMuscleRelaxant.id,
        value: true,
      },
      {
        patientId: patients[3].id,
        lifestyleId: lifestyleAnticoagulant.id,
        value: false,
      },
      {
        patientId: patients[3].id,
        lifestyleId: lifestyleCorticosteroids.id,
        value: false,
      },
      // Patient 4
      {
        patientId: patients[4].id,
        lifestyleId: lifestyleAlcohol.id,
        value: false,
      },
      {
        patientId: patients[4].id,
        lifestyleId: lifestyleCaffeine.id,
        value: false,
      },
      {
        patientId: patients[4].id,
        lifestyleId: lifestyleVitaminsFood.id,
        value: false,
      },
      {
        patientId: patients[4].id,
        lifestyleId: lifestyleMuscleRelaxant.id,
        value: false,
      },
      {
        patientId: patients[4].id,
        lifestyleId: lifestyleAnticoagulant.id,
        value: false,
      },
      {
        patientId: patients[4].id,
        lifestyleId: lifestyleCorticosteroids.id,
        value: false,
      },
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
  console.log(
    `   - ${lifestyleCatalogCount} Lifestyle catalog, ${patientLifestyleCount} PatientLifestyle records`,
  );
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
  console.log(
    "✅ Created patient-doctor relationships (all 5 patients linked to Dr. John Smith)",
  );

  // ============================================
  // SECTION 10: PRESCRIPTIONS (Prescription + PatientMedicine + PrescriptionMedicine)
  // ============================================
  console.log("\n📋 Creating prescriptions...");
  const prescriptionSpecs: Array<{
    doctorId: number;
    patientId: number;
    status: "Approved" | "Filled";
    prescriptionDate: Date;
    validFrom: Date;
    validUntil: Date;
    dosage?: string;
    frequency?: string;
    duration?: string;
    instructions?: string;
    maxRefills: number;
    currentRefillCount?: number;
    notes?: string;
    tradeNameId: number;
    medicineName: string;
  }> = [
    {
      doctorId: doctors[0].id,
      patientId: patients[0].id,
      status: "Approved",
      prescriptionDate: new Date(),
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "90 days",
      instructions: "Take with meals to reduce GI side effects",
      maxRefills: 3,
      notes: "Monitor blood glucose levels",
      tradeNameId: tradeNames[3].id,
      medicineName: "Glucophage",
    },
    {
      doctorId: doctors[0].id,
      patientId: patients[1].id,
      status: "Filled",
      prescriptionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      validFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      validUntil: new Date(Date.now() + 83 * 24 * 60 * 60 * 1000),
      dosage: "5mg",
      frequency: "Once daily",
      duration: "90 days",
      instructions: "Take in the morning with or without food",
      maxRefills: 6,
      currentRefillCount: 1,
      tradeNameId: tradeNames[4].id,
      medicineName: "Concor",
    },
    {
      doctorId: doctors[0].id,
      patientId: patients[1].id,
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
      tradeNameId: tradeNames[6].id,
      medicineName: "Lipitor",
    },
    {
      doctorId: doctors[2].id,
      patientId: patients[2].id,
      status: "Approved",
      prescriptionDate: new Date(),
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      instructions: "Take at bedtime to avoid drowsiness during day",
      maxRefills: 2,
      tradeNameId: tradeNames[8].id,
      medicineName: "Zyrtec",
    },
    {
      doctorId: doctors[2].id,
      patientId: patients[3].id,
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
      tradeNameId: tradeNames[5].id,
      medicineName: "Omeprazole",
    },
    {
      doctorId: doctors[1].id,
      patientId: patients[4].id,
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
      tradeNameId: tradeNames[7].id,
      medicineName: "Ventolin",
    },
  ];

  const prescriptions: Array<{ id: number }> = [];
  for (const spec of prescriptionSpecs) {
    const prescription = await prisma.prescription.create({
      data: {
        doctorId: spec.doctorId,
        patientId: spec.patientId,
        status: spec.status,
        prescriptionDate: spec.prescriptionDate,
        validFrom: spec.validFrom,
        validUntil: spec.validUntil,
        dosage: spec.dosage,
        frequency: spec.frequency,
        duration: spec.duration,
        instructions: spec.instructions,
        maxRefills: spec.maxRefills,
        currentRefillCount: spec.currentRefillCount ?? 0,
        notes: spec.notes,
        isAddedToProfile: true,
      },
    });
    const tn = await prisma.tradeName.findUnique({
      where: { id: spec.tradeNameId },
      select: { activeSubstanceId: true },
    });
    const pm = await prisma.patientMedicine.create({
      data: {
        patientId: spec.patientId,
        tradeNameId: spec.tradeNameId,
        activeSubstanceId: tn?.activeSubstanceId ?? undefined,
        medicineName: spec.medicineName,
        isOngoing: true,
      },
    });
    await prisma.prescriptionMedicine.create({
      data: {
        prescriptionId: prescription.id,
        patientMedicineId: pm.id,
        sortOrder: 0,
      },
    });
    prescriptions.push({ id: prescription.id });
  }
  console.log(`✅ Created ${prescriptions.length} prescriptions`);

  // ============================================
  // SECTION 11: VISITS
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
        message:
          "Your prescription for Glucophage is ready for pickup at City Pharmacy",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: patientUser2.id,
        type: "SystemAlert",
        title: "Follow-up reminder",
        message: "Follow-up visit with Dr. Smith is coming up in 2 days",
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
        type: "SystemAlert",
        title: "Follow-up reminder",
        message:
          "Reminder: Diabetes follow-up with Dr. Smith is in 2 days",
        isRead: true,
        readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        deliveryStatus: "Delivered",
      },
      {
        userId: patientUser5.id,
        type: "SystemAlert",
        title: "Pediatric follow-up",
        message:
          "Emma's asthma management review with Dr. Johnson is in 14 days",
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
        message:
          "Potential interaction detected between Metformin and Ibuprofen for patient Bob Martinez",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: doctorUser2.id,
        type: "SystemAlert",
        title: "Account Verified",
        message:
          "Your doctor account has been verified. You can now create prescriptions.",
        isRead: true,
        readAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        deliveryStatus: "Delivered",
      },
      {
        userId: admin1.id,
        type: "SystemAlert",
        title: "Pending Doctor Verifications",
        message:
          "There are 2 doctors awaiting verification: Dr. Emily Chen and Dr. Robert Kumar",
        isRead: false,
        deliveryStatus: "Delivered",
      },
      {
        userId: superAdmin.id,
        type: "SystemAlert",
        title: "New ADR Report Submitted",
        message:
          "A new adverse drug reaction report has been submitted for Zyrtec (Cetirizine)",
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
  console.log(
    "\n📋 Creating prescription versions and drug interaction alerts...",
  );
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
        changes: {
          status: { from: "Approved", to: "Filled" },
          currentRefillCount: { from: 0, to: 1 },
        },
        changedBy: doctorUser1.id,
      },
      {
        prescriptionId: prescriptions[2].id, // Lipitor
        version: 1,
        changes: {
          created: true,
          dosage: "20mg",
          frequency: "Once daily at bedtime",
        },
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

  // Drug Interaction Alerts (including extra warnings for Patient 1 - Alice Cooper)
  await prisma.drugInteractionAlert.createMany({
    data: [
      {
        prescriptionId: prescriptions[0].id, // Glucophage prescription (Patient 1)
        interactingMedicineId: tradeNames[1].id, // Brufen (Ibuprofen)
        interactionType: "Pharmacodynamic",
        severity: "Moderate",
        message:
          "NSAIDs like Ibuprofen may reduce the effectiveness of Metformin and increase risk of lactic acidosis. Monitor blood glucose closely.",
        acknowledgedByDoctor: true,
        acknowledgedByPatient: false,
        acknowledgedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        prescriptionId: prescriptions[0].id, // Patient 1 - Glucophage + Panadol
        interactingMedicineId: tradeNames[0].id, // Panadol (Paracetamol)
        interactionType: "Pharmacodynamic",
        severity: "Minor",
        message:
          "High doses of paracetamol with metformin may increase risk of lactic acidosis in susceptible patients. Avoid excessive paracetamol; monitor if used long-term.",
        acknowledgedByDoctor: false,
        acknowledgedByPatient: false,
      },
      {
        prescriptionId: prescriptions[0].id, // Patient 1 - Glucophage + Losec
        interactingMedicineId: tradeNames[5].id, // Losec (Omeprazole)
        interactionType: "Pharmacokinetic",
        severity: "Moderate",
        message:
          "PPIs like omeprazole can reduce vitamin B12 absorption. Long-term metformin use may also affect B12. Consider monitoring B12 in patients on both.",
        acknowledgedByDoctor: false,
        acknowledgedByPatient: false,
      },
      {
        prescriptionId: prescriptions[2].id, // Lipitor
        interactingMedicineId: tradeNames[4].id, // Norvasc (Amlodipine)
        interactionType: "Pharmacokinetic",
        severity: "Minor",
        message:
          "Amlodipine may slightly increase Atorvastatin levels. Monitor for statin-related side effects such as myalgia.",
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
      {
        contractingCompanyId: contractingCompanies[0].id,
        tradeNameId: tradeNames[1].id,
      }, // MedSupply + Brufen
      {
        contractingCompanyId: contractingCompanies[0].id,
        tradeNameId: tradeNames[4].id,
      }, // MedSupply + Norvasc
      {
        contractingCompanyId: contractingCompanies[0].id,
        tradeNameId: tradeNames[6].id,
      }, // MedSupply + Lipitor
      {
        contractingCompanyId: contractingCompanies[1].id,
        tradeNameId: tradeNames[0].id,
      }, // PharmaDist + Panadol
      {
        contractingCompanyId: contractingCompanies[1].id,
        tradeNameId: tradeNames[2].id,
      }, // PharmaDist + Amoxil
      {
        contractingCompanyId: contractingCompanies[1].id,
        tradeNameId: tradeNames[7].id,
      }, // PharmaDist + Ventolin
      {
        contractingCompanyId: contractingCompanies[2].id,
        tradeNameId: tradeNames[5].id,
      }, // NovaDist + Losec
      {
        contractingCompanyId: contractingCompanies[2].id,
        tradeNameId: tradeNames[8].id,
      }, // NovaDist + Zyrtec
    ],
  });
  console.log(
    `✅ Created ${contractingCompanies.length} contracting companies with trade name links`,
  );

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
        reason:
          "Safer alternative for patients with GI issues, renal impairment, or cardiovascular risk",
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
        reason:
          "Alternative antihypertensive when ARB is not tolerated or contraindicated in pregnancy",
      },
      {
        // Atorvastatin → Cetirizine is not an alt, use Losartan as alt for Atorvastatin → different drug class
        activeSubstanceId: activeSubstances[6].id,
        alternativeActiveSubstanceId: activeSubstances[9].id,
        reason:
          "When statin is contraindicated (myopathy), consider ARB for cardiovascular protection",
      },
      {
        // Amoxicillin → Cetirizine is not right; Amoxicillin alternative is itself in different class
        // Salbutamol (inhaler) → Cetirizine for allergy-induced asthma prevention
        activeSubstanceId: activeSubstances[7].id,
        alternativeActiveSubstanceId: activeSubstances[8].id,
        reason:
          "For allergy-triggered asthma, antihistamines can reduce trigger exposure",
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
    {
      name: "Neuroleptic malignant syndrome",
      nameAr: "متلازمة الذهان الخبيثة",
    },
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
      }),
    ),
  );
  const sideEffectMap = Object.fromEntries(
    sideEffects.map((s) => [s.name, s.id]),
  );

  const medicationSideEffectData: Array<{
    activeSubstanceId: number;
    sideEffectId: number;
    frequency: string;
    bodySystem?: string;
  }> = [
    // Paracetamol (0)
    {
      activeSubstanceId: activeSubstances[0].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "Rare",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[0].id,
      sideEffectId: sideEffectMap["Nausea"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[0].id,
      sideEffectId: sideEffectMap["Rash"],
      frequency: "Uncommon",
      bodySystem: "Skin",
    },
    {
      activeSubstanceId: activeSubstances[0].id,
      sideEffectId: sideEffectMap["Liver damage"],
      frequency: "Rare",
      bodySystem: "Hepatic",
    },
    // Ibuprofen (1)
    {
      activeSubstanceId: activeSubstances[1].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[1].id,
      sideEffectId: sideEffectMap["Nausea"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[1].id,
      sideEffectId: sideEffectMap["Dizziness"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[1].id,
      sideEffectId: sideEffectMap["Stomach upset"],
      frequency: "VeryCommon",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[1].id,
      sideEffectId: sideEffectMap["GI bleeding"],
      frequency: "Rare",
      bodySystem: "GIT",
    },
    // Amoxicillin (2)
    {
      activeSubstanceId: activeSubstances[2].id,
      sideEffectId: sideEffectMap["Nausea"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[2].id,
      sideEffectId: sideEffectMap["Diarrhea"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[2].id,
      sideEffectId: sideEffectMap["Rash"],
      frequency: "Common",
      bodySystem: "Skin",
    },
    {
      activeSubstanceId: activeSubstances[2].id,
      sideEffectId: sideEffectMap["Allergic reaction"],
      frequency: "Rare",
      bodySystem: "Immune",
    },
    // Metformin (3)
    {
      activeSubstanceId: activeSubstances[3].id,
      sideEffectId: sideEffectMap["Nausea"],
      frequency: "VeryCommon",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[3].id,
      sideEffectId: sideEffectMap["Diarrhea"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[3].id,
      sideEffectId: sideEffectMap["Stomach upset"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    // Amlodipine (4)
    {
      activeSubstanceId: activeSubstances[4].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "VeryCommon",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[4].id,
      sideEffectId: sideEffectMap["Dizziness"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[4].id,
      sideEffectId: sideEffectMap["Edema"],
      frequency: "Common",
      bodySystem: "Vascular",
    },
    {
      activeSubstanceId: activeSubstances[4].id,
      sideEffectId: sideEffectMap["Flushing"],
      frequency: "Common",
      bodySystem: "Vascular",
    },
    // Omeprazole (5)
    {
      activeSubstanceId: activeSubstances[5].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[5].id,
      sideEffectId: sideEffectMap["Nausea"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[5].id,
      sideEffectId: sideEffectMap["Abdominal pain"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    // Atorvastatin (6)
    {
      activeSubstanceId: activeSubstances[6].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[6].id,
      sideEffectId: sideEffectMap["Muscle pain"],
      frequency: "Common",
      bodySystem: "Musculoskeletal",
    },
    {
      activeSubstanceId: activeSubstances[6].id,
      sideEffectId: sideEffectMap["Nausea"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    // Salbutamol (7)
    {
      activeSubstanceId: activeSubstances[7].id,
      sideEffectId: sideEffectMap["Tremor"],
      frequency: "VeryCommon",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[7].id,
      sideEffectId: sideEffectMap["Palpitations"],
      frequency: "Common",
      bodySystem: "Cardiac",
    },
    {
      activeSubstanceId: activeSubstances[7].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    // Cetirizine (8)
    {
      activeSubstanceId: activeSubstances[8].id,
      sideEffectId: sideEffectMap["Drowsiness"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[8].id,
      sideEffectId: sideEffectMap["Dry mouth"],
      frequency: "Common",
      bodySystem: "GIT",
    },
    {
      activeSubstanceId: activeSubstances[8].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    // Losartan (9)
    {
      activeSubstanceId: activeSubstances[9].id,
      sideEffectId: sideEffectMap["Dizziness"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[9].id,
      sideEffectId: sideEffectMap["Headache"],
      frequency: "Common",
      bodySystem: "NervousSystem",
    },
    {
      activeSubstanceId: activeSubstances[9].id,
      sideEffectId: sideEffectMap["Fatigue"],
      frequency: "Common",
      bodySystem: "General",
    },
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

  console.log(
    `✅ Created ${sideEffects.length} side effects, ${medicationSideEffectData.length} active-substance (medication) side effect links`,
  );

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
        warningMessage:
          "NSAIDs in diabetic patients increase risk of renal impairment and mask hypoglycemia symptoms. Monitor blood glucose and renal function closely.",
        severity: "High",
      },
      {
        diseaseId: diseases[1].id, // Hypertension
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "vascularWarning",
        warningMessage:
          "NSAIDs can elevate blood pressure and reduce efficacy of antihypertensives. Avoid or use with close BP monitoring.",
        severity: "High",
      },
      {
        diseaseId: diseases[1].id, // Hypertension
        activeSubstanceId: activeSubstances[9].id, // Losartan
        warningFieldName: "renalWarning",
        warningMessage:
          "ARBs require renal function monitoring in hypertensive patients, especially elderly or those with pre-existing kidney disease.",
        severity: "Medium",
      },
      {
        diseaseId: diseases[5].id, // Chronic Kidney Disease
        activeSubstanceId: activeSubstances[3].id, // Metformin
        warningFieldName: "renalWarning",
        warningMessage:
          "Metformin is contraindicated in severe renal impairment (eGFR < 30). Risk of lactic acidosis. Dose reduction required if eGFR 30-45.",
        severity: "Critical",
      },
      {
        diseaseId: diseases[5].id, // Chronic Kidney Disease
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "renalWarning",
        warningMessage:
          "NSAIDs are contraindicated in chronic kidney disease as they can cause acute kidney injury and worsen renal function.",
        severity: "Critical",
      },
      {
        diseaseId: diseases[2].id, // Asthma
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "pulmonaryWarning",
        warningMessage:
          "NSAIDs can trigger bronchospasm in aspirin/NSAID-sensitive asthmatic patients (Samter's triad). Contraindicated in known NSAID-sensitive asthma.",
        severity: "High",
      },
      {
        diseaseId: diseases[7].id, // Coronary Artery Disease
        activeSubstanceId: activeSubstances[1].id, // Ibuprofen
        warningFieldName: "cardiacWarning",
        warningMessage:
          "NSAIDs increase cardiovascular risk in patients with established CAD. Use minimum effective dose for shortest possible duration.",
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
      // Panadol — multiple batches (trade name can have many batch numbers)
      {
        tradeNameId: tradeNames[0].id,
        batchNumber: "BN-PAN-2024-001",
        manufacturingDate: new Date("2024-01-15"),
        expiryDate: new Date("2026-01-14"),
        quantity: 50000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[0].id,
        batchNumber: "BN-PAN-2024-002",
        manufacturingDate: new Date("2024-03-01"),
        expiryDate: new Date("2026-02-28"),
        quantity: 45000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[0].id,
        batchNumber: "BN-PAN-2024-003",
        manufacturingDate: new Date("2024-05-10"),
        expiryDate: new Date("2026-05-09"),
        quantity: 48000,
        isRecalled: false,
      },
      // Brufen — multiple batches
      {
        tradeNameId: tradeNames[1].id,
        batchNumber: "BN-BRU-2024-001",
        manufacturingDate: new Date("2024-02-10"),
        expiryDate: new Date("2026-02-09"),
        quantity: 30000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[1].id,
        batchNumber: "BN-BRU-2024-002",
        manufacturingDate: new Date("2024-04-15"),
        expiryDate: new Date("2026-04-14"),
        quantity: 32000,
        isRecalled: false,
      },
      // Amoxil
      {
        tradeNameId: tradeNames[2].id,
        batchNumber: "BN-AMX-2024-001",
        manufacturingDate: new Date("2024-01-20"),
        expiryDate: new Date("2025-07-19"),
        quantity: 20000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[2].id,
        batchNumber: "BN-AMX-2024-002",
        manufacturingDate: new Date("2024-06-01"),
        expiryDate: new Date("2025-11-30"),
        quantity: 18000,
        isRecalled: false,
      },
      // Glucophage — multiple batches
      {
        tradeNameId: tradeNames[3].id,
        batchNumber: "BN-GLC-2024-001",
        manufacturingDate: new Date("2024-03-01"),
        expiryDate: new Date("2026-02-28"),
        quantity: 40000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[3].id,
        batchNumber: "BN-GLC-2024-002",
        manufacturingDate: new Date("2024-05-12"),
        expiryDate: new Date("2026-05-11"),
        quantity: 38000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[3].id,
        batchNumber: "BN-GLC-2024-003",
        manufacturingDate: new Date("2024-08-01"),
        expiryDate: new Date("2026-07-31"),
        quantity: 42000,
        isRecalled: false,
      },
      // Lipitor — one recalled batch
      {
        tradeNameId: tradeNames[6].id,
        batchNumber: "BN-LIP-2023-099",
        manufacturingDate: new Date("2023-10-01"),
        expiryDate: new Date("2025-09-30"),
        quantity: 25000,
        isRecalled: true,
        recallReason:
          "Labeling error — incorrect dosage information on package insert",
        recallDate: new Date("2024-01-10"),
      },
      {
        tradeNameId: tradeNames[6].id,
        batchNumber: "BN-LIP-2024-001",
        manufacturingDate: new Date("2024-02-01"),
        expiryDate: new Date("2026-01-31"),
        quantity: 30000,
        isRecalled: false,
      },
      // Ventolin
      {
        tradeNameId: tradeNames[7].id,
        batchNumber: "BN-VEN-2024-001",
        manufacturingDate: new Date("2024-04-01"),
        expiryDate: new Date("2026-03-31"),
        quantity: 15000,
        isRecalled: false,
      },
      {
        tradeNameId: tradeNames[7].id,
        batchNumber: "BN-VEN-2024-002",
        manufacturingDate: new Date("2024-07-01"),
        expiryDate: new Date("2026-06-30"),
        quantity: 16000,
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
    prisma.permission.create({
      data: {
        code: "users.view",
        name: "View Users",
        description: "Can view user list and profiles",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "users.manage",
        name: "Manage Users",
        description: "Can create, update, and deactivate users",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "doctors.verify",
        name: "Verify Doctors",
        description: "Can approve or reject doctor applications",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "pharmacists.verify",
        name: "Verify Pharmacists",
        description: "Can approve or reject pharmacist applications",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "medicines.view",
        name: "View Medicines",
        description: "Can browse the medicine catalog",
        adminOnly: false,
      },
    }),
    prisma.permission.create({
      data: {
        code: "medicines.manage",
        name: "Manage Medicines",
        description:
          "Can create, edit, and delete active substances and trade names",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "prescriptions.create",
        name: "Create Prescriptions",
        description: "Can write new prescriptions",
        adminOnly: false,
      },
    }),
    prisma.permission.create({
      data: {
        code: "prescriptions.view",
        name: "View Prescriptions",
        description: "Can view prescription records",
        adminOnly: false,
      },
    }),
    prisma.permission.create({
      data: {
        code: "reports.view",
        name: "View Reports",
        description: "Can view analytics and ADR reports",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "import.manage",
        name: "Manage Imports",
        description: "Can import bulk data from Excel files",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "export.manage",
        name: "Manage Exports",
        description: "Can export data to Excel files",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "audit.view",
        name: "View Audit Logs",
        description: "Can view system audit trail",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "settings.manage",
        name: "Manage Settings",
        description: "Can update application settings",
        adminOnly: true,
      },
    }),
    prisma.permission.create({
      data: {
        code: "adr.submit",
        name: "Submit ADR",
        description: "Can submit adverse drug reaction reports",
        adminOnly: false,
      },
    }),
    prisma.permission.create({
      data: {
        code: "adr.review",
        name: "Review ADR",
        description: "Can review and close ADR reports",
        adminOnly: true,
      },
    }),
  ]);

  await prisma.rolePermission.createMany({
    data: [
      // SuperAdmin gets all permissions
      ...permissions.map((p) => ({ role: "SuperAdmin", permissionId: p.id })),
      // Admin gets most permissions except settings
      ...permissions
        .filter((p) => p.code !== "settings.manage")
        .map((p) => ({ role: "Admin", permissionId: p.id })),
      // Doctor permissions
      {
        role: "Doctor",
        permissionId: permissions.find((p) => p.code === "medicines.view")!.id,
      },
      {
        role: "Doctor",
        permissionId: permissions.find(
          (p) => p.code === "prescriptions.create",
        )!.id,
      },
      {
        role: "Doctor",
        permissionId: permissions.find((p) => p.code === "prescriptions.view")!
          .id,
      },
      {
        role: "Doctor",
        permissionId: permissions.find((p) => p.code === "adr.submit")!.id,
      },
      // Pharmacist permissions
      {
        role: "Pharmacist",
        permissionId: permissions.find((p) => p.code === "medicines.view")!.id,
      },
      {
        role: "Pharmacist",
        permissionId: permissions.find((p) => p.code === "prescriptions.view")!
          .id,
      },
      // Patient permissions
      {
        role: "Patient",
        permissionId: permissions.find((p) => p.code === "medicines.view")!.id,
      },
      {
        role: "Patient",
        permissionId: permissions.find((p) => p.code === "prescriptions.view")!
          .id,
      },
      {
        role: "Patient",
        permissionId: permissions.find((p) => p.code === "adr.submit")!.id,
      },
    ],
  });
  console.log(
    `✅ Created ${permissions.length} permissions with role assignments`,
  );

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
        changes: {
          patientId: patients[0].id,
          tradeNameId: tradeNames[3].id,
          status: "Approved",
        },
        ipAddress: "10.0.0.5",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: doctorUser1.id,
        action: "CREATE_PRESCRIPTION",
        entityType: "Prescription",
        entityId: prescriptions[1].id,
        changes: {
          patientId: patients[1].id,
          tradeNameId: tradeNames[4].id,
          status: "Filled",
        },
        ipAddress: "10.0.0.5",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: superAdmin.id,
        action: "UPDATE_ACTIVE_SUBSTANCE",
        entityType: "ActiveSubstance",
        entityId: activeSubstances[0].id,
        changes: {
          pregnancyWarning: { from: null, to: "Category B - Generally safe" },
        },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: admin1.id,
        action: "DELETE_TRADE_NAME",
        entityType: "TradeName",
        entityId: 999,
        changes: {
          title: "Discontinued Product",
          reason: "Product withdrawn from market",
        },
        ipAddress: "192.168.1.2",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: superAdmin.id,
        action: "REVIEW_MEDICINE_SUGGESTION",
        entityType: "MedicineSuggestion",
        entityId: 2,
        changes: {
          status: { from: "Pending", to: "Approved" },
          reviewNotes: "Approved for catalog",
        },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0 (seed)",
      },
      {
        userId: admin1.id,
        action: "REVIEW_MEDICINE_SUGGESTION",
        entityType: "MedicineSuggestion",
        entityId: 3,
        changes: {
          status: { from: "Pending", to: "Rejected" },
          reviewNotes: "Duplicate product",
        },
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
        alternativeTerms: [
          "liver disease",
          "hepatic disease",
          "liver failure",
          "cirrhosis",
          "hepatitis",
          "liver dysfunction",
        ],
        category: "Organ",
        warningFieldName: "hepaticWarning",
      },
      {
        standardTerm: "Renal Impairment",
        alternativeTerms: [
          "kidney disease",
          "renal disease",
          "kidney failure",
          "CKD",
          "chronic kidney disease",
          "renal dysfunction",
        ],
        category: "Organ",
        warningFieldName: "renalWarning",
      },
      {
        standardTerm: "Pregnancy",
        alternativeTerms: [
          "pregnant",
          "pregnancy",
          "gestational",
          "prenatal",
          "gravid",
          "expecting",
        ],
        category: "Population",
        warningFieldName: "pregnancyWarning",
      },
      {
        standardTerm: "Breastfeeding",
        alternativeTerms: [
          "lactation",
          "nursing",
          "breastfeeding",
          "breast-feeding",
          "postnatal",
          "lactating",
        ],
        category: "Population",
        warningFieldName: "lactationWarning",
      },
      {
        standardTerm: "Pediatric",
        alternativeTerms: [
          "children",
          "child",
          "pediatric",
          "paediatric",
          "infant",
          "neonatal",
          "juvenile",
        ],
        category: "Population",
        warningFieldName: "specialPopulationChildren",
      },
      {
        standardTerm: "Elderly",
        alternativeTerms: [
          "geriatric",
          "elderly",
          "old age",
          "senior",
          "aged",
          "over 65",
        ],
        category: "Population",
        warningFieldName: "specialPopulationElderly",
      },
      {
        standardTerm: "Cardiac Disease",
        alternativeTerms: [
          "heart disease",
          "cardiac",
          "heart failure",
          "arrhythmia",
          "coronary",
          "myocardial",
        ],
        category: "Organ",
        warningFieldName: "cardiacWarning",
      },
      {
        standardTerm: "Respiratory Disease",
        alternativeTerms: [
          "asthma",
          "COPD",
          "pulmonary",
          "respiratory",
          "lung disease",
          "bronchospasm",
        ],
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
      // Patient 1 (Alice Cooper) — takes Panadol OTC + Glucophage prescribed + Brufen (triggers Diabetes + NSAIDs warning for dr.smith's patients/warnings)
      {
        patientId: patients[0].id,
        tradeNameId: tradeNames[0].id, // Panadol (in system)
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
      {
        patientId: patients[0].id,
        tradeNameId: tradeNames[1].id, // Brufen (Ibuprofen) — triggers Rule 2: Diabetes + NSAIDs
        activeSubstanceId: activeSubstances[1].id,
        medicineName: "Brufen",
        dosageAmount: 400,
        frequencyCount: 2,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2024-03-01"),
        isOngoing: true,
        notes:
          "Self-reported for joint pain; patient has Type 2 Diabetes — warning expected",
        isVerified: true,
        verifiedBy: admin1.id,
        verifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      // Patient 2 (Bob Martinez) — takes Brufen self-purchased + Glucophage (triggers Hypertension + Metformin warning for dr.smith's patients/warnings)
      {
        patientId: patients[1].id,
        tradeNameId: tradeNames[1].id, // Brufen (in system)
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
      {
        patientId: patients[1].id,
        tradeNameId: tradeNames[3].id, // Glucophage (Metformin) — triggers Rule 7: Hypertension + Metformin
        activeSubstanceId: activeSubstances[3].id,
        medicineName: "Glucophage",
        dosageAmount: 500,
        frequencyCount: 2,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2024-01-15"),
        isOngoing: true,
        notes:
          "Added for diabetes prevention; patient has hypertension — warning expected",
        isVerified: true,
        verifiedBy: admin1.id,
        verifiedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      // Patient 3 (Carol White) — takes a vitamin supplement NOT in system + Brufen (triggers Asthma + NSAIDs warning for dr.smith's patients/warnings)
      {
        patientId: patients[2].id,
        tradeNameId: null, // NOT in system
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
        isVerified: false, // Pending admin/doctor verification
      },
      {
        patientId: patients[2].id,
        tradeNameId: tradeNames[1].id, // Brufen (Ibuprofen) — triggers Rule 8: Asthma + NSAIDs
        activeSubstanceId: activeSubstances[1].id,
        medicineName: "Brufen",
        dosageAmount: 200,
        frequencyCount: 1,
        frequencyPeriod: 1,
        frequencyUnit: "Days",
        startDate: new Date("2024-06-01"),
        isOngoing: true,
        notes:
          "Occasional use for headaches; patient has asthma — warning expected",
        isVerified: true,
        verifiedBy: admin1.id,
        verifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      // Patient 4 (David Lee) — takes Losec (in system)
      {
        patientId: patients[3].id,
        tradeNameId: tradeNames[5].id, // Losec (in system)
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
        tradeNameId: tradeNames[7].id, // Ventolin (in system)
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
        tradeNameId: null, // NOT in system
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
    `   - 18 Users (1 SuperAdmin, 2 Admins, 5 Doctors, 7 Pharmacists, 5 Patients)`,
  );
  console.log(`   - ${prescriptions.length} Prescriptions`);
  console.log(`   - Comprehensive patient data including:`);
  console.log(`     • Medical histories, family histories, allergies`);
  console.log(`     • Lifestyle data, child profiles`);
  console.log(`     • Visits, medical reports`);
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
            (d) =>
              d.name.includes("Breast Cancer") || d.name.includes("Cancer"),
          )?.id || diseases[0].id,
        ruleType: "BLOCK_ACTIVE_SUBSTANCE",
        targetActiveSubstanceId: activeSubstances.find(
          (a) => a.name.includes("MMR") || a.name.includes("Vaccine"),
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
          (a) => a.name.includes("Ibuprofen") || a.name.includes("NSAID"),
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

    // Rule 3: Hypertension + Losartan (substance-specific; not global to all drugs)
    // Production DBs seeded before this change: delete or update any disease_warning_rules
    // rows that still tie pregnancy Category D text to Asthma with REQUIRE_MONITORING + autoBlock.
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId: diseases[1].id, // Hypertension
        ruleType: "WARN_ACTIVE_SUBSTANCE",
        targetActiveSubstanceId:
          activeSubstances.find((a) => a.name === "Losartan")?.id ?? activeSubstances[9].id,
        severity: "High",
        warningMessage:
          "Hypertension on Losartan (ARB): contraindicated in pregnancy (especially 2nd/3rd trimester). Confirm pregnancy status when clinically relevant.",
        autoBlock: false,
        requiresOverride: false,
        createdBy: superAdmin.id,
      },
    }),

    // Rule 4: Medium - Kidney Disease Monitoring
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId:
          diseases.find(
            (d) => d.name.includes("Kidney") || d.name.includes("Renal"),
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
            (d) => d.name.includes("Liver") || d.name.includes("Hepatic"),
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

    // Rule 6: Type 2 Diabetes + Metformin (Glucophage) — so GET /patients/:id/warnings returns warnings for patient on Glucophage
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId: diseases[0].id, // Type 2 Diabetes Mellitus
        ruleType: "WARN_ACTIVE_SUBSTANCE",
        targetActiveSubstanceId: activeSubstances[3].id, // Metformin (Glucophage)
        severity: "High",
        warningMessage:
          "Monitor renal function and vitamin B12 in diabetic patients on metformin long-term. Consider annual B12 and eGFR check.",
        autoBlock: false,
        requiresOverride: false,
        requiredMonitoring: "eGFR and vitamin B12 annually",
        createdBy: admin1.id,
      },
    }),

    // Rule 7: Hypertension + Metformin — extra warning so byMedicine shows multiple warnings for Glucophage
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId: diseases[1].id, // Hypertension
        ruleType: "WARN_ACTIVE_SUBSTANCE",
        targetActiveSubstanceId: activeSubstances[3].id, // Metformin (Glucophage)
        severity: "Medium",
        warningMessage:
          "In hypertensive patients with renal impairment, metformin dose may need adjustment. Monitor BP and renal function.",
        autoBlock: false,
        requiresOverride: false,
        createdBy: admin1.id,
      },
    }),

    // Rule 8: Asthma + NSAIDs (Ibuprofen) — for dr.smith's patients (e.g. Carol White) to have warnings
    prisma.diseaseWarningRule.create({
      data: {
        diseaseId: diseases[2].id, // Asthma
        ruleType: "WARN_ACTIVE_SUBSTANCE",
        targetActiveSubstanceId: activeSubstances[1].id, // Ibuprofen
        severity: "High",
        warningMessage:
          "🟠 ASTHMA: NSAIDs may precipitate bronchospasm in aspirin-sensitive asthmatics. Use with caution; prefer paracetamol if needed.",
        autoBlock: false,
        requiresOverride: false,
        createdBy: admin1.id,
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
  // SECTION 12: SAFETY ENGINE TEST SCENARIOS
  // ============================================
  // 8 dedicated patients, each proving exactly ONE safety check.
  //
  //  A → RED   Check 1: Allergy              test.red.allergy@greenrx.com
  //  B → RED   Check 2: Contraindication kw  test.red.contraind@greenrx.com
  //  C → RED   Check 6: Drug Interaction     test.red.interaction@greenrx.com
  //  D → RED   Check 7: Cancer Risk          test.red.cancer@greenrx.com
  //  E → ORANGE Check 2: Body System Mapping test.orange.disease@greenrx.com
  //  F → ORANGE Check 5: Surgical History    test.orange.surgery@greenrx.com
  //  G → ORANGE Check 3: Family Disease      test.orange.family@greenrx.com
  //  H → GREEN  (no conflicts at all)        test.green@greenrx.com
  // ============================================
  console.log("\n🧪 Creating Safety Engine test scenarios...");

  // ── Step 1: Enrich active substances with engine test fields ──────────────

  // Metformin → JSON contraindications containing "renal failure" keyword
  await prisma.activeSubstance.update({
    where: { id: activeSubstances[3].id },
    data: {
      contraindications: {
        en: "Contraindicated in patients with severe renal failure, acute kidney injury, or eGFR < 30 mL/min/1.73m2. Kidney function must be assessed before initiation and monitored regularly.",
        ar: "موانع في الفشل الكلوي الحاد وانخفاض معدل الترشيح الكبيبي",
      },
    },
  });

  // Ibuprofen → anticoagulant interaction JSON (HIGH_SEVERITY → RED when patient on warfarin)
  await prisma.activeSubstance.update({
    where: { id: activeSubstances[1].id },
    data: {
      interactionAnticoagulant: {
        en: "Co-administration with warfarin or acenocoumarol significantly increases the risk of serious bleeding events, including gastrointestinal haemorrhage. Warfarin INR must be closely monitored and the warfarin dose adjusted accordingly.",
        ar: "التفاعل مع مضادات التخثر يزيد خطر النزيف بشكل ملحوظ",
      },
    },
  });

  // Atorvastatin → carcinogenicity data (String field)
  await prisma.activeSubstance.update({
    where: { id: activeSubstances[6].id },
    data: {
      carcinogenicityMutagenicity:
        "Animal studies at supratherapeutic doses showed hepatocellular adenomas in rats. Clinical relevance in patients with a family history of colorectal or liver cancer warrants careful risk-benefit assessment before long-term prescription.",
    },
  });

  // Amlodipine → strengthen vascularWarning for body-system ORANGE test
  await prisma.activeSubstance.update({
    where: { id: activeSubstances[4].id },
    data: {
      vascularWarning:
        "May cause peripheral vasodilation and dependent oedema. Use with caution in patients with pre-existing vascular disease or hypertension-related vasculopathy. Monitor blood pressure closely.",
    },
  });

  // ── Step 2: Create Warfarin (needed for drug-interaction RED test) ─────────
  const warfarinSubstance = await prisma.activeSubstance.create({
    data: {
      name: "Warfarin",
      concentration: "5mg",
      dosageForm: "Tablet",
      indication: "Anticoagulation: prevention of thromboembolic events",
      adultDoseMaxPerDay: "10mg",
      pregnancyWarning: "Category X - Contraindicated (teratogenic, fetal haemorrhage)",
    },
  });

  const warfarinTradeName = await prisma.tradeName.create({
    data: {
      title: "Coumadin",
      activeSubstanceId: warfarinSubstance.id,
      companyId: companies[0].id, // Pfizer
    },
  });

  // ── Step 3: Enrich diseases with contraindicationKeywords + cancer flag ────

  // CKD → keywords matching Metformin's contraindications text
  await prisma.disease.update({
    where: { id: diseases[5].id }, // Chronic Kidney Disease
    data: {
      contraindicationKeywords: ["renal failure", "kidney"],
      requiresSpecialHandling: true,
    },
  });

  // Hypertension → keywords (general use)
  await prisma.disease.update({
    where: { id: diseases[1].id }, // Hypertension
    data: {
      contraindicationKeywords: ["hypertension", "hypertensive"],
    },
  });

  // New: Colorectal Cancer disease with triggersCancerCheck = true
  const colonCancerDisease = await prisma.disease.create({
    data: {
      name: "Colorectal Cancer",
      severity: "Severe",
      description: "Malignant tumour of the colon or rectum",
      triggersCancerCheck: true,
    },
  });

  // ── Step 4: Body System Mappings (disease → ActiveSubstance warning field) ─
  await prisma.diseaseBodySystemMapping.createMany({
    data: [
      { diseaseId: diseases[1].id,  fieldName: "vascularWarning"  }, // Hypertension → vascularWarning
      { diseaseId: diseases[1].id,  fieldName: "cardiacWarning"   }, // Hypertension → cardiacWarning
      { diseaseId: diseases[5].id,  fieldName: "renalWarning"     }, // CKD → renalWarning
      { diseaseId: diseases[7].id,  fieldName: "cardiacWarning"   }, // Coronary Artery Disease → cardiacWarning
      { diseaseId: diseases[0].id,  fieldName: "metabolismWarning"}, // Diabetes → metabolismWarning
      { diseaseId: diseases[6].id,  fieldName: "immuneSystemWarning" }, // Allergic Rhinitis → immuneSystemWarning
    ],
    skipDuplicates: true,
  });

  // ── Step 5: Create 8 safety test patients ─────────────────────────────────

  // ─ Patient A: RED via Allergy ─────────────────────────────────────────────
  // Penicillin allergy (already linked to Amoxicillin activeSubstance)
  // Expected: search Amoxil → RED
  const testUserA = await prisma.user.create({
    data: {
      email: "test.red.allergy@greenrx.com",
      name: "Test RED - Allergy",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 34, ageClassification: "Adults", dateOfBirth: new Date("1991-06-15"), gender: "Female", weight: 65, height: 162 } },
    },
    include: { patient: true },
  });
  const allergyReportA = await prisma.patientAllergyReport.create({
    data: { patientId: testUserA.patient!.id, reaction: "Anaphylaxis", notes: "Immediate hypersensitivity. EpiPen prescribed. Avoid all penicillin-class antibiotics." },
  });
  await prisma.patientAllergy.create({
    data: { patientAllergyReportId: allergyReportA.id, allergenId: allergenPenicillin.id },
  });

  // ─ Patient B: RED via Contraindication Keyword ────────────────────────────
  // Has CKD (contraindicationKeywords: ["renal failure","kidney"])
  // Metformin contraindications text contains "renal failure"
  // Expected: search Glucophage / Metformin → RED
  const testUserB = await prisma.user.create({
    data: {
      email: "test.red.contraind@greenrx.com",
      name: "Test RED - Contraindication",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 56, ageClassification: "Adults", dateOfBirth: new Date("1969-02-20"), gender: "Male", weight: 82, height: 175 } },
    },
    include: { patient: true },
  });
  await prisma.patientDisease.create({
    data: {
      patientId: testUserB.patient!.id,
      diseaseId: diseases[5].id, // CKD
      diagnosisDate: new Date("2020-04-10"),
      severity: "Severe",
      notes: "eGFR: 22 mL/min/1.73m2. Stage 4 CKD. Nephrology follow-up.",
    },
  });

  // ─ Patient C: RED via Drug Interaction (HIGH_SEVERITY anticoagulant) ──────
  // Currently on Warfarin (ongoing PatientMedicine)
  // Ibuprofen.interactionAnticoagulant contains "warfarin" → HIGH_SEVERITY → RED
  // Expected: search Brufen / Ibuprofen → RED
  const testUserC = await prisma.user.create({
    data: {
      email: "test.red.interaction@greenrx.com",
      name: "Test RED - Drug Interaction",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 49, ageClassification: "Adults", dateOfBirth: new Date("1976-10-03"), gender: "Male", weight: 78, height: 178 } },
    },
    include: { patient: true },
  });
  await prisma.patientMedicine.create({
    data: {
      patientId: testUserC.patient!.id,
      tradeNameId: warfarinTradeName.id,
      activeSubstanceId: warfarinSubstance.id,
      medicineName: "Coumadin (Warfarin 5mg)",
      dosageAmount: 1,
      frequencyCount: 1,
      frequencyPeriod: 1,
      frequencyUnit: "Days",
      isOngoing: true,
      notes: "Anticoagulation for atrial fibrillation. INR target 2.0–3.0. Monthly INR monitoring.",
    },
  });

  // ─ Patient D: RED via Cancer Risk ─────────────────────────────────────────
  // Father had Colorectal Cancer (triggersCancerCheck = true)
  // Atorvastatin has carcinogenicityMutagenicity text → RED
  // Expected: search Lipitor / Atorvastatin → RED
  const testUserD = await prisma.user.create({
    data: {
      email: "test.red.cancer@greenrx.com",
      name: "Test RED - Cancer Risk",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 43, ageClassification: "Adults", dateOfBirth: new Date("1982-09-12"), gender: "Female", weight: 68, height: 165 } },
    },
    include: { patient: true },
  });
  await prisma.familyHistory.create({
    data: {
      patientId: testUserD.patient!.id,
      diseaseId: colonCancerDisease.id,
      relation: "Father",
      severity: "Severe",
      notes: "Father diagnosed with colorectal cancer at age 61. Underwent hemicolectomy.",
    },
  });

  // ─ Patient E: ORANGE via Disease Body System Mapping ──────────────────────
  // Has Hypertension (mapped to vascularWarning)
  // Amlodipine.vascularWarning has content → ORANGE
  // Expected: search Norvasc / Amlodipine → ORANGE
  const testUserE = await prisma.user.create({
    data: {
      email: "test.orange.disease@greenrx.com",
      name: "Test ORANGE - Disease Body System",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 51, ageClassification: "Adults", dateOfBirth: new Date("1974-03-28"), gender: "Male", weight: 90, height: 180 } },
    },
    include: { patient: true },
  });
  await prisma.patientDisease.create({
    data: {
      patientId: testUserE.patient!.id,
      diseaseId: diseases[1].id, // Hypertension → vascularWarning mapping
      diagnosisDate: new Date("2017-11-05"),
      severity: "Moderate",
      notes: "Essential hypertension diagnosed 2017. Currently unmedicated, lifestyle management only.",
    },
  });

  // ─ Patient F: ORANGE via Surgical History ────────────────────────────────
  // Recent liver surgery (THREE_MONTHS) → ORGAN_TO_WARNING_FIELD: liver → hepaticWarning
  // Atorvastatin.hepaticWarning = "Monitor liver enzymes" → ORANGE
  // Expected: search Lipitor / Atorvastatin → ORANGE
  const testUserF = await prisma.user.create({
    data: {
      email: "test.orange.surgery@greenrx.com",
      name: "Test ORANGE - Surgical History",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 46, ageClassification: "Adults", dateOfBirth: new Date("1979-07-18"), gender: "Female", weight: 72, height: 167 } },
    },
    include: { patient: true },
  });
  await prisma.surgicalHistory.create({
    data: {
      patientId: testUserF.patient!.id,
      organId: organLiver.id, // "Liver" → maps to hepaticWarning
      surgeryTimeframe: "THREE_MONTHS",
    },
  });

  // ─ Patient G: ORANGE via Family Disease History ───────────────────────────
  // Mother had Coronary Artery Disease (CAD → cardiacWarning mapping)
  // Amlodipine.cardiacWarning = "Monitor blood pressure" → family ORANGE
  // Expected: search Norvasc / Amlodipine → ORANGE
  const testUserG = await prisma.user.create({
    data: {
      email: "test.orange.family@greenrx.com",
      name: "Test ORANGE - Family History",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 39, ageClassification: "Adults", dateOfBirth: new Date("1986-12-01"), gender: "Male", weight: 83, height: 182 } },
    },
    include: { patient: true },
  });
  await prisma.familyHistory.create({
    data: {
      patientId: testUserG.patient!.id,
      diseaseId: diseases[7].id, // Coronary Artery Disease → cardiacWarning
      relation: "Mother",
      severity: "Severe",
      notes: "Mother underwent CABG (coronary artery bypass graft) at age 55.",
    },
  });

  // ─ Patient H: GREEN — no conflicts ──────────────────────────────────────
  // Healthy 25-year-old, zero allergies / diseases / meds / surgeries / family flags
  // Expected: search Panadol / Paracetamol → GREEN
  await prisma.user.create({
    data: {
      email: "test.green@greenrx.com",
      name: "Test GREEN - No Conflicts",
      passwordHash: hashedPassword,
      role: "Patient",
      isEmailVerified: true,
      isActive: true,
      patient: { create: { age: 25, ageClassification: "Adults", dateOfBirth: new Date("2001-04-10"), gender: "Female", weight: 58, height: 160 } },
    },
  });

  console.log("✅ Created 8 Safety Engine test patients (A–H)");
  console.log("✅ Updated Metformin contraindications, Ibuprofen anticoagulant interaction, Atorvastatin carcinogenicity, Amlodipine vascularWarning");
  console.log("✅ Created DiseaseBodySystemMapping for Hypertension, CKD, CAD, Diabetes, Allergic Rhinitis");

  // ============================================
  // SECTION 13: TRADE NAME ← → SIDE EFFECT LINKS
  // ============================================
  console.log("\n📋 Linking Trade Names to their common side effects...");

  const tradeNameSideEffectLinks = await prisma.tradeNameSideEffect.createMany({
    data: [
      // Amoxil (Amoxicillin) → common side effects
      { tradeNameId: tradeNames[0].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common" },
      { tradeNameId: tradeNames[0].id, sideEffectId: sideEffectMap["Diarrhea"], frequency: "Common" },
      { tradeNameId: tradeNames[0].id, sideEffectId: sideEffectMap["Rash"], frequency: "Uncommon" },

      // Brufen (Ibuprofen) → common side effects
      { tradeNameId: tradeNames[1].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common" },
      { tradeNameId: tradeNames[1].id, sideEffectId: sideEffectMap["Abdominal pain"], frequency: "Common" },

      // Glucophage (Metformin) → common side effects
      { tradeNameId: tradeNames[2].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common" },
      { tradeNameId: tradeNames[2].id, sideEffectId: sideEffectMap["Diarrhea"], frequency: "Common" },
      { tradeNameId: tradeNames[2].id, sideEffectId: sideEffectMap["Metallic taste"], frequency: "Uncommon" },

      // Norvasc (Amlodipine) → common side effects
      { tradeNameId: tradeNames[3].id, sideEffectId: sideEffectMap["Edema"], frequency: "Common", bodySystem: "Vascular" },
      { tradeNameId: tradeNames[3].id, sideEffectId: sideEffectMap["Headache"], frequency: "Uncommon" },

      // Lipitor (Atorvastatin) → common side effects
      { tradeNameId: tradeNames[4].id, sideEffectId: sideEffectMap["Muscle pain"], frequency: "Common" },
      { tradeNameId: tradeNames[4].id, sideEffectId: sideEffectMap["Headache"], frequency: "Uncommon" },

      // Panadol (Paracetamol) → common side effects
      { tradeNameId: tradeNames[5].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Rare" },
      { tradeNameId: tradeNames[5].id, sideEffectId: sideEffectMap["Rash"], frequency: "Rare" },

      // Aspirin → common side effects
      { tradeNameId: tradeNames[6].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Common" },
      { tradeNameId: tradeNames[6].id, sideEffectId: sideEffectMap["Abdominal pain"], frequency: "Common" },

      // Dupixent (Dupilumab) → common side effects
      { tradeNameId: tradeNames[7].id, sideEffectId: sideEffectMap["Headache"], frequency: "Common" },
      { tradeNameId: tradeNames[7].id, sideEffectId: sideEffectMap["Nausea"], frequency: "Uncommon" },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${tradeNameSideEffectLinks.count} Trade Name ↔ Side Effect links`);

  // ============================================
  // SECTION 14: CONTRACTING COMPANY ↔ TRADE NAME LINKS
  // ============================================
  console.log("\n🤝 Linking Contracting Companies to their available Trade Names...");

  const contractingCompanyTradeNameLinks = await prisma.contractingCompanyTradeName.createMany({
    data: [
      // MedSupply Egypt (contractingCompanies[0])
      // Note: Already has links to Brufen, Norvasc, and Lipitor created in Section 11
      // Adding additional strategic links for complementary products
      { contractingCompanyId: contractingCompanies[0].id, tradeNameId: tradeNames[0].id }, // MedSupply → Panadol (pain relief complement)
      { contractingCompanyId: contractingCompanies[0].id, tradeNameId: tradeNames[3].id }, // MedSupply → Glucophage (chronic disease)

      // PharmaDist MENA (contractingCompanies[1])
      // Note: Already has links to Panadol, Amoxil, and Ventolin created in Section 11
      // Adding complementary products
      { contractingCompanyId: contractingCompanies[1].id, tradeNameId: tradeNames[9].id }, // PharmaDist → Cozaar (cardiovascular)

      // NovaDist Corp (contractingCompanies[2])
      // Note: Already has links to Losec and Zyrtec created in Section 11
      // Adding complementary products
      { contractingCompanyId: contractingCompanies[2].id, tradeNameId: tradeNames[6].id }, // NovaDist → Lipitor (cardio)
      { contractingCompanyId: contractingCompanies[2].id, tradeNameId: tradeNames[1].id }, // NovaDist → Brufen (pain relief)
      { contractingCompanyId: contractingCompanies[2].id, tradeNameId: tradeNames[4].id }, // NovaDist → Norvasc (cardiovascular)
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created/linked ${contractingCompanyTradeNameLinks.count} additional Contracting Company ↔ Trade Name relationships`);

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
  console.log(
    `   - 18 Users (1 SuperAdmin, 2 Admins, 5 Doctors, 7 Pharmacists, 5 Patients)`,
  );
  console.log(`   - ${subscriptions.length} Subscriptions + Payments`);
  console.log(
    `   - ${prescriptions.length} Prescriptions with versions & interaction alerts`,
  );
  console.log(`   - Comprehensive patient data:`);
  console.log(`     • Medical histories, family histories, allergies`);
  console.log(`     • Lifestyle data, child profiles, patient diseases`);
  console.log(`     • Visits, medical reports`);
  console.log(`     • Medical reports, adverse drug reactions`);
  console.log(`     • Share links, ratings, notifications`);
  console.log(`   - Supporting data:`);
  console.log(`     • Side effects catalog + medication links`);
  console.log(`     • Medicine alternatives, batch histories`);
  console.log(`     • Disease-substance warnings`);
  console.log(`     • Contracting companies + trade name links`);
  console.log(`     • Audit logs, import/export history`);
  console.log(`     • Contraindication term mappings`);

  // App settings: default nearby doctors search radius (km)
  await prisma.appSetting.upsert({
    where: { key: "nearbyDoctorsRadiusKm" },
    create: { key: "nearbyDoctorsRadiusKm", valueText: "50" },
    update: { valueText: "50" },
  });

  console.log("\n🔑 Test Credentials (all passwords: Password@123):");
  console.log("   SuperAdmin: superadmin@greenrx.com");
  console.log("   Admin:      admin1@greenrx.com");
  console.log("   Doctor:     dr.smith@greenrx.com");
  console.log("   Pharmacist: pharmacist1@greenrx.com");
  console.log("   Patient:    patient1@greenrx.com");
  console.log("\n🧪 Safety Engine Test Patients (password: Password@123):");
  console.log("   [RED  - Allergy]           test.red.allergy@greenrx.com       → GET /trade-names/search?q=Amoxil&patientId={id}");
  console.log("   [RED  - Contraindication]  test.red.contraind@greenrx.com     → GET /active-substances/search?search=Metformin&patientId={id}");
  console.log("   [RED  - Drug Interaction]  test.red.interaction@greenrx.com   → GET /trade-names/search?q=Brufen&patientId={id}");
  console.log("   [RED  - Cancer Risk]       test.red.cancer@greenrx.com        → GET /active-substances/search?search=Atorvastatin&patientId={id}");
  console.log("   [ORANGE - Disease Body]    test.orange.disease@greenrx.com    → GET /trade-names/search?q=Norvasc&patientId={id}");
  console.log("   [ORANGE - Surgical]        test.orange.surgery@greenrx.com    → GET /trade-names/search?q=Lipitor&patientId={id}");
  console.log("   [ORANGE - Family History]  test.orange.family@greenrx.com     → GET /trade-names/search?q=Norvasc&patientId={id}");
  console.log("   [GREEN  - No Conflicts]    test.green@greenrx.com             → GET /active-substances/search?search=Paracetamol&patientId={id}");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
