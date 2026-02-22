import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.pricingPlan`: Exposes CRUD operations for the **PricingPlan** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PricingPlans
      * const pricingPlans = await prisma.pricingPlan.findMany()
      * ```
      */
    get pricingPlan(): Prisma.PricingPlanDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Subscriptions
      * const subscriptions = await prisma.subscription.findMany()
      * ```
      */
    get subscription(): Prisma.SubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Payments
      * const payments = await prisma.payment.findMany()
      * ```
      */
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Patients
      * const patients = await prisma.patient.findMany()
      * ```
      */
    get patient(): Prisma.PatientDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.medicalHistory`: Exposes CRUD operations for the **MedicalHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MedicalHistories
      * const medicalHistories = await prisma.medicalHistory.findMany()
      * ```
      */
    get medicalHistory(): Prisma.MedicalHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.familyHistory`: Exposes CRUD operations for the **FamilyHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FamilyHistories
      * const familyHistories = await prisma.familyHistory.findMany()
      * ```
      */
    get familyHistory(): Prisma.FamilyHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.lifestyle`: Exposes CRUD operations for the **Lifestyle** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Lifestyles
      * const lifestyles = await prisma.lifestyle.findMany()
      * ```
      */
    get lifestyle(): Prisma.LifestyleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.allergy`: Exposes CRUD operations for the **Allergy** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Allergies
      * const allergies = await prisma.allergy.findMany()
      * ```
      */
    get allergy(): Prisma.AllergyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Doctors
      * const doctors = await prisma.doctor.findMany()
      * ```
      */
    get doctor(): Prisma.DoctorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patientDoctor`: Exposes CRUD operations for the **PatientDoctor** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PatientDoctors
      * const patientDoctors = await prisma.patientDoctor.findMany()
      * ```
      */
    get patientDoctor(): Prisma.PatientDoctorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.consultation`: Exposes CRUD operations for the **Consultation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Consultations
      * const consultations = await prisma.consultation.findMany()
      * ```
      */
    get consultation(): Prisma.ConsultationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Appointments
      * const appointments = await prisma.appointment.findMany()
      * ```
      */
    get appointment(): Prisma.AppointmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.disease`: Exposes CRUD operations for the **Disease** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Diseases
      * const diseases = await prisma.disease.findMany()
      * ```
      */
    get disease(): Prisma.DiseaseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patientDisease`: Exposes CRUD operations for the **PatientDisease** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PatientDiseases
      * const patientDiseases = await prisma.patientDisease.findMany()
      * ```
      */
    get patientDisease(): Prisma.PatientDiseaseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.diseaseWarningRule`: Exposes CRUD operations for the **DiseaseWarningRule** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DiseaseWarningRules
      * const diseaseWarningRules = await prisma.diseaseWarningRule.findMany()
      * ```
      */
    get diseaseWarningRule(): Prisma.DiseaseWarningRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.activeSubstance`: Exposes CRUD operations for the **ActiveSubstance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ActiveSubstances
      * const activeSubstances = await prisma.activeSubstance.findMany()
      * ```
      */
    get activeSubstance(): Prisma.ActiveSubstanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.diseaseActiveSubstanceWarning`: Exposes CRUD operations for the **DiseaseActiveSubstanceWarning** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DiseaseActiveSubstanceWarnings
      * const diseaseActiveSubstanceWarnings = await prisma.diseaseActiveSubstanceWarning.findMany()
      * ```
      */
    get diseaseActiveSubstanceWarning(): Prisma.DiseaseActiveSubstanceWarningDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.medicineAlternative`: Exposes CRUD operations for the **MedicineAlternative** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MedicineAlternatives
      * const medicineAlternatives = await prisma.medicineAlternative.findMany()
      * ```
      */
    get medicineAlternative(): Prisma.MedicineAlternativeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.tradeName`: Exposes CRUD operations for the **TradeName** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more TradeNames
      * const tradeNames = await prisma.tradeName.findMany()
      * ```
      */
    get tradeName(): Prisma.TradeNameDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.company`: Exposes CRUD operations for the **Company** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Companies
      * const companies = await prisma.company.findMany()
      * ```
      */
    get company(): Prisma.CompanyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.contractingCompany`: Exposes CRUD operations for the **ContractingCompany** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ContractingCompanies
      * const contractingCompanies = await prisma.contractingCompany.findMany()
      * ```
      */
    get contractingCompany(): Prisma.ContractingCompanyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.contractingCompanyTradeName`: Exposes CRUD operations for the **ContractingCompanyTradeName** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ContractingCompanyTradeNames
      * const contractingCompanyTradeNames = await prisma.contractingCompanyTradeName.findMany()
      * ```
      */
    get contractingCompanyTradeName(): Prisma.ContractingCompanyTradeNameDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.prescription`: Exposes CRUD operations for the **Prescription** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Prescriptions
      * const prescriptions = await prisma.prescription.findMany()
      * ```
      */
    get prescription(): Prisma.PrescriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.prescriptionVersion`: Exposes CRUD operations for the **PrescriptionVersion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PrescriptionVersions
      * const prescriptionVersions = await prisma.prescriptionVersion.findMany()
      * ```
      */
    get prescriptionVersion(): Prisma.PrescriptionVersionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.drugInteractionAlert`: Exposes CRUD operations for the **DrugInteractionAlert** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DrugInteractionAlerts
      * const drugInteractionAlerts = await prisma.drugInteractionAlert.findMany()
      * ```
      */
    get drugInteractionAlert(): Prisma.DrugInteractionAlertDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AuditLogs
      * const auditLogs = await prisma.auditLog.findMany()
      * ```
      */
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Permissions
      * const permissions = await prisma.permission.findMany()
      * ```
      */
    get permission(): Prisma.PermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RolePermissions
      * const rolePermissions = await prisma.rolePermission.findMany()
      * ```
      */
    get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.appSetting`: Exposes CRUD operations for the **AppSetting** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AppSettings
      * const appSettings = await prisma.appSetting.findMany()
      * ```
      */
    get appSetting(): Prisma.AppSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.session`: Exposes CRUD operations for the **Session** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sessions
      * const sessions = await prisma.session.findMany()
      * ```
      */
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.pharmacist`: Exposes CRUD operations for the **Pharmacist** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Pharmacists
      * const pharmacists = await prisma.pharmacist.findMany()
      * ```
      */
    get pharmacist(): Prisma.PharmacistDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.medicalReport`: Exposes CRUD operations for the **MedicalReport** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MedicalReports
      * const medicalReports = await prisma.medicalReport.findMany()
      * ```
      */
    get medicalReport(): Prisma.MedicalReportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.patientShareLink`: Exposes CRUD operations for the **PatientShareLink** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PatientShareLinks
      * const patientShareLinks = await prisma.patientShareLink.findMany()
      * ```
      */
    get patientShareLink(): Prisma.PatientShareLinkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.adverseDrugReaction`: Exposes CRUD operations for the **AdverseDrugReaction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AdverseDrugReactions
      * const adverseDrugReactions = await prisma.adverseDrugReaction.findMany()
      * ```
      */
    get adverseDrugReaction(): Prisma.AdverseDrugReactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.childProfile`: Exposes CRUD operations for the **ChildProfile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ChildProfiles
      * const childProfiles = await prisma.childProfile.findMany()
      * ```
      */
    get childProfile(): Prisma.ChildProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rating`: Exposes CRUD operations for the **Rating** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Ratings
      * const ratings = await prisma.rating.findMany()
      * ```
      */
    get rating(): Prisma.RatingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.visit`: Exposes CRUD operations for the **Visit** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Visits
      * const visits = await prisma.visit.findMany()
      * ```
      */
    get visit(): Prisma.VisitDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.contraindicationTermMapping`: Exposes CRUD operations for the **ContraindicationTermMapping** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ContraindicationTermMappings
      * const contraindicationTermMappings = await prisma.contraindicationTermMapping.findMany()
      * ```
      */
    get contraindicationTermMapping(): Prisma.ContraindicationTermMappingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.batchHistory`: Exposes CRUD operations for the **BatchHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more BatchHistories
      * const batchHistories = await prisma.batchHistory.findMany()
      * ```
      */
    get batchHistory(): Prisma.BatchHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.importHistory`: Exposes CRUD operations for the **ImportHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ImportHistories
      * const importHistories = await prisma.importHistory.findMany()
      * ```
      */
    get importHistory(): Prisma.ImportHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.medicineSuggestion`: Exposes CRUD operations for the **MedicineSuggestion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MedicineSuggestions
      * const medicineSuggestions = await prisma.medicineSuggestion.findMany()
      * ```
      */
    get medicineSuggestion(): Prisma.MedicineSuggestionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.exportHistory`: Exposes CRUD operations for the **ExportHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ExportHistories
      * const exportHistories = await prisma.exportHistory.findMany()
      * ```
      */
    get exportHistory(): Prisma.ExportHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map