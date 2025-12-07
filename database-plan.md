# Green RX Database Schema Plan

## 📋 Overview

This document outlines the complete database schema for the Green RX application, including all entities, relationships, and improvements based on system design review.

---

## 🎯 Core Entities

### 1. User & Authentication
**Purpose:** Base user model with role-based access control

**Fields:**
- id (Int, Primary Key)
- email (String, Unique)
- passwordHash (String)
- role (Enum: Patient, Doctor, Admin, Company, SuperAdmin)
- emailVerified (Boolean, default: false)
- emailVerificationToken (String, nullable)
- passwordResetToken (String, nullable)
- passwordResetExpires (DateTime, nullable)
- isActive (Boolean, default: true)
- lastLoginAt (DateTime, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime, nullable) - Soft delete

**Relations:**
- User (1) → (1) PricingPlan (subscription)
- User (1) → (1) Patient OR Doctor
- User (1) → (N) AuditLog
- User (1) → (N) Notification
- User (1) → (N) Session

**Indexes:**
- email (unique)
- role
- deletedAt

---

### 2. PricingPlan
**Purpose:** Subscription and pricing management

**Fields:**
- id (Int, Primary Key)
- title (String)
- price (Decimal)
- salePrice (Decimal, nullable)
- duration (Int) - in days
- isDefault (Boolean, default: false)
- features (JSON) - array of feature strings
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)

**Default Data:**
- "Free Trial" plan: price=0, duration=7, isDefault=true

**Relations:**
- PricingPlan (1) → (N) User
- PricingPlan (1) → (N) Subscription

**Indexes:**
- isDefault

---

### 3. Subscription
**Purpose:** Track user subscriptions to pricing plans

**Fields:**
- id (Int, Primary Key)
- userId (Int, Foreign Key)
- pricingPlanId (Int, Foreign Key)
- status (Enum: Active, Expired, Cancelled, Suspended)
- startDate (DateTime)
- endDate (DateTime)
- autoRenew (Boolean, default: true)
- cancelledAt (DateTime, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Subscription (N) → (1) User
- Subscription (N) → (1) PricingPlan
- Subscription (1) → (N) Payment

**Indexes:**
- userId
- status
- endDate

---

### 4. Patient
**Purpose:** Patient medical and personal information

**Fields:**
- id (Int, Primary Key)
- userId (Int, Foreign Key, Unique)
- name (String)
- age (Int)
- ageClassification (Enum: Neonates, Infants, Toddlers, Children, Adolescents, Adults, Elderly) - auto-calculated
- weight (Decimal, nullable) - in kg
- height (Decimal, nullable) - in cm
- gender (Enum: Male, Female, Other)
- smoking (Boolean, default: false)
- pregnancyWarning (Boolean, default: false)
- lactation (Boolean, default: false)
- profileCompleteness (Int, default: 0) - percentage
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime, nullable)

**Relations:**
- Patient (1) → (1) User
- Patient (1) → (N) Prescription
- Patient (N) → (N) Disease (via PatientDisease)
- Patient (1) → (N) MedicalHistory
- Patient (1) → (N) FamilyHistory
- Patient (1) → (1) Lifestyle
- Patient (1) → (N) Allergy
- Patient (N) → (N) Doctor (via PatientDoctor)
- Patient (1) → (N) Consultation

**Indexes:**
- userId (unique)
- age
- ageClassification

---

### 5. Doctor
**Purpose:** Doctor information and credentials

**Fields:**
- id (Int, Primary Key)
- userId (Int, Foreign Key, Unique)
- name (String)
- licenseNumber (String, Unique)
- specialization (String)
- isVerified (Boolean, default: false)
- verifiedAt (DateTime, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime, nullable)

**Relations:**
- Doctor (1) → (1) User
- Doctor (1) → (N) Prescription
- Doctor (N) → (N) Patient (via PatientDoctor)
- Doctor (1) → (N) PrescriptionTemplate
- Doctor (1) → (N) Consultation

**Indexes:**
- userId (unique)
- licenseNumber (unique)
- specialization

---

### 6. Disease
**Purpose:** Disease definitions with severity levels

**Fields:**
- id (Int, Primary Key)
- name (String, Unique)
- severity (Enum: None, Mild, Moderate, Severe, Critical)
- description (String, nullable)
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Disease (N) → (N) ActiveSubstance (via DiseaseActiveSubstanceWarning)
- Disease (N) → (N) Patient (via PatientDisease)

**Indexes:**
- name (unique)
- severity

---

### 7. DiseaseActiveSubstanceWarning
**Purpose:** Junction table linking diseases to active substances with warning configuration

**Fields:**
- id (Int, Primary Key)
- diseaseId (Int, Foreign Key)
- activeSubstanceId (Int, Foreign Key)
- warningFieldName (String) - which ActiveSubstance field to check (e.g., "hepaticWarning", "renalWarning")
- warningMessage (String) - custom warning message for doctor/patient
- severity (Enum: Low, Medium, High, Critical)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- DiseaseActiveSubstanceWarning (N) → (1) Disease
- DiseaseActiveSubstanceWarning (N) → (1) ActiveSubstance

**Indexes:**
- (diseaseId, activeSubstanceId) - composite unique
- warningFieldName

---

### 8. PatientDisease
**Purpose:** Track patient diseases with diagnosis details

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key)
- diseaseId (Int, Foreign Key)
- diagnosisDate (DateTime)
- severity (Enum: None, Mild, Moderate, Severe, Critical)
- status (Enum: Active, Resolved, Chronic)
- notes (String, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- PatientDisease (N) → (1) Patient
- PatientDisease (N) → (1) Disease

**Indexes:**
- (patientId, diseaseId) - composite
- status

---

### 9. ActiveSubstance
**Purpose:** Comprehensive medicine active substance data (100+ fields)

**Core Fields:**
- id (Int, Primary Key)
- activeSubstance (String)
- concentration (String, nullable)
- classification (String, nullable)
- dosageForm (String, nullable)
- indication (String, nullable)

**Dosage Fields:**
- adultDoseMaxPerDay (String, nullable)
- adultDoseMgPerKg (String, nullable)
- doseInKg (String, nullable) - for children starting from 17 years
- pediatricDose (String, nullable)

**Warning Fields (all as String, nullable):**
- hepaticWarning, renalWarning, cardiacWarning, psychiatricWarning, nervousSystemWarning, etc.

**Drug Interaction Fields (JSON arrays):**
- All interaction fields as JSON arrays

**Side Effects Fields (JSON arrays by frequency):**
- All side effect fields as JSON arrays

**Additional Fields:**
- version (Int, default: 1) - for versioning
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime, nullable)

**Relations:**
- ActiveSubstance (1) → (N) TradeName
- ActiveSubstance (N) → (N) Disease (via DiseaseActiveSubstanceWarning)
- ActiveSubstance (N) → (N) ActiveSubstance (via MedicineAlternative)

**Indexes:**
- activeSubstance (full-text search)
- isActive

---

### 10. TradeName
**Purpose:** Medicine trade names linked to active substances

**Fields:**
- id (Int, Primary Key)
- title (String)
- activeSubstanceId (Int, Foreign Key)
- companyId (Int, Foreign Key)
- warningNotification (String, nullable) - for doctors only
- availabilityStatus (Enum: InStock, OutOfStock, Discontinued)
- stockQuantity (Int, nullable)
- expiryDate (DateTime, nullable)
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime, nullable)

**Relations:**
- TradeName (N) → (1) ActiveSubstance
- TradeName (N) → (1) Company
- TradeName (1) → (N) Prescription

**Indexes:**
- title (full-text search)
- activeSubstanceId
- companyId

---

### 11. Company
**Purpose:** Pharmaceutical companies

**Fields:**
- id (Int, Primary Key)
- name (String, Unique)
- contactInfo (JSON, nullable)
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime, nullable)

**Relations:**
- Company (1) → (N) TradeName
- Company (1) → (N) ContractingCompany

**Indexes:**
- name (unique)

---

### 12. ContractingCompany
**Purpose:** Companies with contracts for specific medicines

**Fields:**
- id (Int, Primary Key)
- title (String)
- companyId (Int, Foreign Key)
- contractingDate (DateTime)
- expiryDate (DateTime, nullable)
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- ContractingCompany (N) → (1) Company
- ContractingCompany (N) → (N) TradeName (via ContractingCompanyTradeName)

**Indexes:**
- contractingDate

---

### 13. Prescription
**Purpose:** Doctor prescriptions for patients

**Fields:**
- id (Int, Primary Key)
- doctorId (Int, Foreign Key)
- patientId (Int, Foreign Key)
- tradeNameId (Int, Foreign Key)
- status (Enum: Draft, Pending, Approved, Filled, Cancelled)
- prescriptionDate (DateTime)
- validFrom (DateTime)
- validUntil (DateTime)
- dosage (String, nullable)
- frequency (String, nullable)
- duration (String, nullable)
- instructions (String, nullable)
- maxRefills (Int, default: 0)
- currentRefillCount (Int, default: 0)
- notes (String, nullable)
- version (Int, default: 1)
- createdAt (DateTime)
- updatedAt (DateTime)
- deletedAt (DateTime, nullable)

**Relations:**
- Prescription (N) → (1) Doctor
- Prescription (N) → (1) Patient
- Prescription (N) → (1) TradeName
- Prescription (1) → (N) PrescriptionVersion
- Prescription (1) → (N) DrugInteractionAlert

**Indexes:**
- doctorId
- patientId
- status

---

### 14. DrugInteractionAlert
**Purpose:** Track drug interaction alerts

**Fields:**
- id (Int, Primary Key)
- prescriptionId (Int, Foreign Key)
- interactingMedicineId (Int, Foreign Key)
- interactionType (String)
- severity (Enum: Minor, Moderate, Major, Contraindicated)
- message (String)
- acknowledgedByDoctor (Boolean, default: false)
- acknowledgedByPatient (Boolean, default: false)
- createdAt (DateTime)

**Relations:**
- DrugInteractionAlert (N) → (1) Prescription
- DrugInteractionAlert (N) → (1) TradeName

**Indexes:**
- prescriptionId
- severity

---

### 15. Allergy
**Purpose:** Patient allergies

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key)
- allergen (String)
- severity (Enum: Mild, Moderate, Severe, LifeThreatening)
- reactionType (String, nullable)
- notes (String, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Allergy (N) → (1) Patient

**Indexes:**
- patientId
- allergen

---

### 16. PatientDoctor
**Purpose:** Patient-Doctor relationships

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key)
- doctorId (Int, Foreign Key)
- relationshipType (Enum: PrimaryCare, Specialist, Consultant)
- startDate (DateTime)
- endDate (DateTime, nullable)
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- PatientDoctor (N) → (1) Patient
- PatientDoctor (N) → (1) Doctor

**Indexes:**
- (patientId, doctorId) - composite
- isActive

---

### 17. Consultation
**Purpose:** Doctor consultations with patients

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key)
- doctorId (Int, Foreign Key)
- consultationDate (DateTime)
- notes (String, nullable)
- diagnosis (String, nullable)
- followUpRequired (Boolean, default: false)
- followUpDate (DateTime, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Consultation (N) → (1) Patient
- Consultation (N) → (1) Doctor

**Indexes:**
- patientId
- doctorId
- consultationDate

---

### 18. Appointment
**Purpose:** Appointment scheduling

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key)
- doctorId (Int, Foreign Key)
- appointmentDate (DateTime)
- duration (Int) - in minutes
- status (Enum: Scheduled, Confirmed, Completed, Cancelled, NoShow)
- notes (String, nullable)
- reminderSent (Boolean, default: false)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Appointment (N) → (1) Patient
- Appointment (N) → (1) Doctor

**Indexes:**
- patientId
- doctorId
- appointmentDate
- status

---

### 19. MedicalHistory
**Purpose:** Patient medical history records

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key)
- condition (String)
- diagnosisDate (DateTime, nullable)
- treatment (String, nullable)
- status (Enum: Active, Resolved, Chronic)
- notes (String, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- MedicalHistory (N) → (1) Patient

**Indexes:**
- patientId
- status

---

### 20. FamilyHistory
**Purpose:** Patient family medical history

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key)
- relation (String) - e.g., "Father", "Mother", "Sibling"
- condition (String)
- notes (String, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- FamilyHistory (N) → (1) Patient

**Indexes:**
- patientId

---

### 21. Lifestyle
**Purpose:** Patient lifestyle factors

**Fields:**
- id (Int, Primary Key)
- patientId (Int, Foreign Key, Unique)
- noGlasses (Boolean, default: false)
- alcoholAbuse (Boolean, default: false)
- excessCaffeine (Boolean, default: false)
- waterDaily (Decimal, nullable) - liters per day
- travellerAbroad (Boolean, default: false)
- annualVaccination (Boolean, default: false)
- surgeriesLast3Months (Boolean, default: false)
- surgeriesDetails (String, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Lifestyle (1) → (1) Patient

**Indexes:**
- patientId (unique)

---

### 22. Notification
**Purpose:** System notifications for users

**Fields:**
- id (Int, Primary Key)
- userId (Int, Foreign Key)
- type (Enum: PrescriptionReady, DrugInteraction, AppointmentReminder, SystemAlert)
- title (String)
- message (String)
- isRead (Boolean, default: false)
- readAt (DateTime, nullable)
- deliveryStatus (Enum: Pending, Sent, Delivered, Failed)
- createdAt (DateTime)

**Relations:**
- Notification (N) → (1) User

**Indexes:**
- userId
- isRead
- type

---

### 23. AuditLog
**Purpose:** Track all sensitive operations for compliance

**Fields:**
- id (Int, Primary Key)
- userId (Int, Foreign Key, nullable)
- action (String)
- entityType (String)
- entityId (Int)
- changes (JSON, nullable)
- ipAddress (String, nullable)
- userAgent (String, nullable)
- createdAt (DateTime)

**Relations:**
- AuditLog (N) → (1) User (nullable)

**Indexes:**
- userId
- action
- entityType
- createdAt

---

### 24. Session
**Purpose:** User session management

**Fields:**
- id (Int, Primary Key)
- userId (Int, Foreign Key)
- token (String, Unique)
- refreshToken (String, Unique, nullable)
- expiresAt (DateTime)
- ipAddress (String, nullable)
- userAgent (String, nullable)
- isActive (Boolean, default: true)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Session (N) → (1) User

**Indexes:**
- userId
- token (unique)
- refreshToken (unique)
- expiresAt

---

### 25. Payment
**Purpose:** Payment transactions for subscriptions

**Fields:**
- id (Int, Primary Key)
- subscriptionId (Int, Foreign Key)
- amount (Decimal)
- currency (String, default: "USD")
- paymentMethod (String, nullable)
- transactionId (String, Unique, nullable)
- status (Enum: Pending, Completed, Failed, Refunded)
- paidAt (DateTime, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)

**Relations:**
- Payment (N) → (1) Subscription

**Indexes:**
- subscriptionId
- transactionId (unique)
- status

---

## 🔗 Key Relationships Summary

```
User (1) ──→ (1) PricingPlan (default: Free Trial)
User (1) ──→ (1) Subscription
User (1) ──→ (1) Patient OR Doctor
User (1) ──→ (N) Notification
User (1) ──→ (N) AuditLog
User (1) ──→ (N) Session

Patient (1) ──→ (1) User
Patient (N) ──→ (N) Disease (via PatientDisease)
Patient (1) ──→ (N) Prescription
Patient (1) ──→ (N) Allergy
Patient (1) ──→ (1) Lifestyle
Patient (1) ──→ (N) MedicalHistory
Patient (1) ──→ (N) FamilyHistory
Patient (N) ──→ (N) Doctor (via PatientDoctor)
Patient (1) ──→ (N) Consultation
Patient (1) ──→ (N) Appointment

Doctor (1) ──→ (1) User
Doctor (1) ──→ (N) Prescription
Doctor (N) ──→ (N) Patient (via PatientDoctor)
Doctor (1) ──→ (N) Consultation
Doctor (1) ──→ (N) Appointment

Disease (N) ──→ (N) ActiveSubstance (via DiseaseActiveSubstanceWarning)
Disease (N) ──→ (N) Patient (via PatientDisease)

ActiveSubstance (1) ──→ (N) TradeName
ActiveSubstance (N) ──→ (N) Disease (via DiseaseActiveSubstanceWarning)

TradeName (N) ──→ (1) ActiveSubstance
TradeName (N) ──→ (1) Company
TradeName (1) ──→ (N) Prescription

Prescription (N) ──→ (1) Doctor
Prescription (N) ──→ (1) Patient
Prescription (N) ──→ (1) TradeName
Prescription (1) ──→ (N) DrugInteractionAlert
```

---

## 🎯 Disease-ActiveSubstance Warning Flow

1. **Admin creates Disease** (e.g., "Liver Disease")
2. **Admin links Disease to ActiveSubstance** (e.g., "Paracetamol")
3. **Admin specifies:**
   - `warningFieldName`: "hepaticWarning" (which ActiveSubstance field to check)
   - `warningMessage`: "This medicine may cause liver damage in patients with liver disease"
   - `severity`: High
4. **When patient with this disease is prescribed this medicine:**
   - System checks `ActiveSubstance.warningFieldName` (e.g., `hepaticWarning`)
   - Shows `warningMessage` to doctor and patient
   - Alerts based on `severity` level

---

## 📊 Enums

### UserRole
- Patient
- Doctor
- Admin
- Company
- SuperAdmin

### Gender
- Male
- Female
- Other

### AgeClassification
- Neonates (0-28 days)
- Infants (1-12 months)
- Toddlers (1-3 years)
- Children (4-11 years)
- Adolescents (12-17 years)
- Adults (18-64 years)
- Elderly (65+ years)

### DiseaseSeverity
- None
- Mild
- Moderate
- Severe
- Critical

### DiseaseStatus
- Active
- Resolved
- Chronic

### PrescriptionStatus
- Draft
- Pending
- Approved
- Filled
- Cancelled

### SubscriptionStatus
- Active
- Expired
- Cancelled
- Suspended

### MedicineAvailabilityStatus
- InStock
- OutOfStock
- Discontinued

### InteractionSeverity
- Minor
- Moderate
- Major
- Contraindicated

### AllergySeverity
- Mild
- Moderate
- Severe
- LifeThreatening

### RelationshipType
- PrimaryCare
- Specialist
- Consultant

### AppointmentStatus
- Scheduled
- Confirmed
- Completed
- Cancelled
- NoShow

### NotificationType
- PrescriptionReady
- DrugInteraction
- AppointmentReminder
- SystemAlert

### PaymentStatus
- Pending
- Completed
- Failed
- Refunded

---

## 🔒 Security & Compliance Features

1. **Soft Deletes:** All critical models have `deletedAt` field
2. **Audit Logs:** Track all sensitive operations
3. **Data Versioning:** ActiveSubstance and Prescription have version tracking
4. **Session Management:** JWT tokens with refresh tokens
5. **Email Verification:** Required for account activation
6. **Password Reset:** Secure token-based reset
7. **Role-Based Access:** Granular permissions per role

---

## 📈 Performance Optimizations

1. **Indexes:** Strategic indexes on foreign keys, search fields, and frequently queried columns
2. **Full-Text Search:** On medicine names, active substances, diseases
3. **Composite Indexes:** For common query patterns
4. **Soft Delete Indexes:** For efficient filtering of deleted records

---

## 🚀 Default Data

1. **PricingPlan:** "Free Trial" (isDefault: true, price: 0, duration: 7 days)
2. **All new users** automatically assigned Free Trial plan

---

## ✅ Implementation Priority

### High Priority (Phase 1)
1. User & Authentication
2. PricingPlan & Subscription
3. Patient & Doctor
4. Disease & ActiveSubstance
5. DiseaseActiveSubstanceWarning
6. TradeName & Company
7. Prescription (basic)
8. PatientDisease

### Medium Priority (Phase 2)
9. DrugInteractionAlert
10. Allergy
11. PatientDoctor
12. Consultation
13. Notification system
14. AuditLog
15. Session management

### Low Priority (Phase 3)
16. Appointment scheduling
17. PrescriptionTemplate
18. DosageSchedule
19. MedicineAlternative
20. SearchHistory
21. FavoriteMedicine
22. Analytics models

