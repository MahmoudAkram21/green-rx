import express, { Request, Response } from 'express';
const router = express.Router();

// Import route modules
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import patientRoutes from './patient.routes';
import doctorRoutes from './doctor.routes';
import pharmacistRoutes from './pharmacist.routes';
import activeSubstanceRoutes from './activeSubstance.routes';
import tradeNameRoutes from './tradeName.routes';
import companyRoutes from './company.routes';
import diseaseRoutes from './disease.routes';
import prescriptionRoutes from './prescription.routes';
import allergyRoutes from './allergy.routes';
import pricingPlanRoutes from './pricingPlan.routes';
import subscriptionRoutes from './subscription.routes';
import paymentRoutes from './payment.routes';
import patientDoctorRoutes from './patientDoctor.routes';
import consultationRoutes from './consultation.routes';
import appointmentRoutes from './appointment.routes';
import importRoutes from './import.routes';
import exportRoutes from './export.routes';
import drugInteractionAlertRoutes from './drugInteractionAlert.routes';
import notificationRoutes from './notification.routes';
import adminRoutes from './admin.routes';
import medicalReportRoutes from './medicalReport.routes';
import ratingRoutes from './rating.routes';
import visitRoutes from './visit.routes';
import prescriptionVersionRoutes from './prescriptionVersion.routes';
import adverseDrugReactionRoutes from './adverseDrugReaction.routes';
import patientShareLinkRoutes from './patientShareLink.routes';
import patientDiseaseRoutes from './patientDisease.routes';
import diseaseWarningRuleRoutes from './diseaseWarningRule.routes';
import medicineSuggestionRoutes from './medicineSuggestion.routes';
import patientMedicineRoutes from './patientMedicine.routes';
import settingsRoutes from './settings.routes';

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/patients', patientRoutes);
router.use('/doctors', doctorRoutes);
router.use('/pharmacists', pharmacistRoutes);
router.use('/active-substances', activeSubstanceRoutes);
router.use('/trade-names', tradeNameRoutes);
router.use('/companies', companyRoutes);
router.use('/diseases', diseaseRoutes);
router.use('/prescriptions', prescriptionRoutes);
router.use('/allergies', allergyRoutes);
router.use('/pricing-plans', pricingPlanRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/payments', paymentRoutes);
router.use('/patient-doctors', patientDoctorRoutes);
router.use('/consultations', consultationRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/import', importRoutes);
router.use('/export', exportRoutes);
router.use('/drug-interactions', drugInteractionAlertRoutes);
router.use('/notifications', notificationRoutes);
router.use('/admin', adminRoutes);
router.use('/medical-reports', medicalReportRoutes);
router.use('/ratings', ratingRoutes);
router.use('/visits', visitRoutes);
router.use('/prescription-versions', prescriptionVersionRoutes);
router.use('/adverse-drug-reactions', adverseDrugReactionRoutes);
router.use('/share-links', patientShareLinkRoutes);
router.use('/patient-diseases', patientDiseaseRoutes);
router.use('/disease-warning-rules', diseaseWarningRuleRoutes);
router.use('/medicine-suggestions', medicineSuggestionRoutes);
router.use('/patient-medicines', patientMedicineRoutes);
router.use('/settings', settingsRoutes);

// Example route
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'API is working' });
});

export default router;

