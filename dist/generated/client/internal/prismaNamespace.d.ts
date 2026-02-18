import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.4.0
 * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly PricingPlan: "PricingPlan";
    readonly Subscription: "Subscription";
    readonly Payment: "Payment";
    readonly Patient: "Patient";
    readonly MedicalHistory: "MedicalHistory";
    readonly FamilyHistory: "FamilyHistory";
    readonly Lifestyle: "Lifestyle";
    readonly Allergy: "Allergy";
    readonly Doctor: "Doctor";
    readonly PatientDoctor: "PatientDoctor";
    readonly Consultation: "Consultation";
    readonly Appointment: "Appointment";
    readonly Disease: "Disease";
    readonly PatientDisease: "PatientDisease";
    readonly DiseaseWarningRule: "DiseaseWarningRule";
    readonly ActiveSubstance: "ActiveSubstance";
    readonly DiseaseActiveSubstanceWarning: "DiseaseActiveSubstanceWarning";
    readonly MedicineAlternative: "MedicineAlternative";
    readonly TradeName: "TradeName";
    readonly Company: "Company";
    readonly ContractingCompany: "ContractingCompany";
    readonly ContractingCompanyTradeName: "ContractingCompanyTradeName";
    readonly Prescription: "Prescription";
    readonly PrescriptionVersion: "PrescriptionVersion";
    readonly DrugInteractionAlert: "DrugInteractionAlert";
    readonly Notification: "Notification";
    readonly AuditLog: "AuditLog";
    readonly Permission: "Permission";
    readonly RolePermission: "RolePermission";
    readonly Session: "Session";
    readonly Pharmacist: "Pharmacist";
    readonly MedicalReport: "MedicalReport";
    readonly PatientShareLink: "PatientShareLink";
    readonly AdverseDrugReaction: "AdverseDrugReaction";
    readonly ChildProfile: "ChildProfile";
    readonly Rating: "Rating";
    readonly Visit: "Visit";
    readonly ContraindicationTermMapping: "ContraindicationTermMapping";
    readonly BatchHistory: "BatchHistory";
    readonly ImportHistory: "ImportHistory";
    readonly MedicineSuggestion: "MedicineSuggestion";
    readonly ExportHistory: "ExportHistory";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "pricingPlan" | "subscription" | "payment" | "patient" | "medicalHistory" | "familyHistory" | "lifestyle" | "allergy" | "doctor" | "patientDoctor" | "consultation" | "appointment" | "disease" | "patientDisease" | "diseaseWarningRule" | "activeSubstance" | "diseaseActiveSubstanceWarning" | "medicineAlternative" | "tradeName" | "company" | "contractingCompany" | "contractingCompanyTradeName" | "prescription" | "prescriptionVersion" | "drugInteractionAlert" | "notification" | "auditLog" | "permission" | "rolePermission" | "session" | "pharmacist" | "medicalReport" | "patientShareLink" | "adverseDrugReaction" | "childProfile" | "rating" | "visit" | "contraindicationTermMapping" | "batchHistory" | "importHistory" | "medicineSuggestion" | "exportHistory";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        PricingPlan: {
            payload: Prisma.$PricingPlanPayload<ExtArgs>;
            fields: Prisma.PricingPlanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PricingPlanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PricingPlanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>;
                };
                findFirst: {
                    args: Prisma.PricingPlanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PricingPlanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>;
                };
                findMany: {
                    args: Prisma.PricingPlanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>[];
                };
                create: {
                    args: Prisma.PricingPlanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>;
                };
                createMany: {
                    args: Prisma.PricingPlanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PricingPlanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>[];
                };
                delete: {
                    args: Prisma.PricingPlanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>;
                };
                update: {
                    args: Prisma.PricingPlanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>;
                };
                deleteMany: {
                    args: Prisma.PricingPlanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PricingPlanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PricingPlanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>[];
                };
                upsert: {
                    args: Prisma.PricingPlanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricingPlanPayload>;
                };
                aggregate: {
                    args: Prisma.PricingPlanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePricingPlan>;
                };
                groupBy: {
                    args: Prisma.PricingPlanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PricingPlanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PricingPlanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PricingPlanCountAggregateOutputType> | number;
                };
            };
        };
        Subscription: {
            payload: Prisma.$SubscriptionPayload<ExtArgs>;
            fields: Prisma.SubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.SubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.SubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                create: {
                    args: Prisma.SubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.SubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.SubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                update: {
                    args: Prisma.SubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.SubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.SubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSubscription>;
                };
                groupBy: {
                    args: Prisma.SubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionCountAggregateOutputType> | number;
                };
            };
        };
        Payment: {
            payload: Prisma.$PaymentPayload<ExtArgs>;
            fields: Prisma.PaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findMany: {
                    args: Prisma.PaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                create: {
                    args: Prisma.PaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                createMany: {
                    args: Prisma.PaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                delete: {
                    args: Prisma.PaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                update: {
                    args: Prisma.PaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePayment>;
                };
                groupBy: {
                    args: Prisma.PaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentCountAggregateOutputType> | number;
                };
            };
        };
        Patient: {
            payload: Prisma.$PatientPayload<ExtArgs>;
            fields: Prisma.PatientFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                findFirst: {
                    args: Prisma.PatientFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                findMany: {
                    args: Prisma.PatientFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>[];
                };
                create: {
                    args: Prisma.PatientCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                createMany: {
                    args: Prisma.PatientCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>[];
                };
                delete: {
                    args: Prisma.PatientDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                update: {
                    args: Prisma.PatientUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                deleteMany: {
                    args: Prisma.PatientDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>[];
                };
                upsert: {
                    args: Prisma.PatientUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientPayload>;
                };
                aggregate: {
                    args: Prisma.PatientAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatient>;
                };
                groupBy: {
                    args: Prisma.PatientGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientCountAggregateOutputType> | number;
                };
            };
        };
        MedicalHistory: {
            payload: Prisma.$MedicalHistoryPayload<ExtArgs>;
            fields: Prisma.MedicalHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicalHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicalHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.MedicalHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicalHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>;
                };
                findMany: {
                    args: Prisma.MedicalHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>[];
                };
                create: {
                    args: Prisma.MedicalHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>;
                };
                createMany: {
                    args: Prisma.MedicalHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicalHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>[];
                };
                delete: {
                    args: Prisma.MedicalHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>;
                };
                update: {
                    args: Prisma.MedicalHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.MedicalHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicalHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicalHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.MedicalHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.MedicalHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedicalHistory>;
                };
                groupBy: {
                    args: Prisma.MedicalHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicalHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicalHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicalHistoryCountAggregateOutputType> | number;
                };
            };
        };
        FamilyHistory: {
            payload: Prisma.$FamilyHistoryPayload<ExtArgs>;
            fields: Prisma.FamilyHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FamilyHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FamilyHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.FamilyHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FamilyHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>;
                };
                findMany: {
                    args: Prisma.FamilyHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>[];
                };
                create: {
                    args: Prisma.FamilyHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>;
                };
                createMany: {
                    args: Prisma.FamilyHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FamilyHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>[];
                };
                delete: {
                    args: Prisma.FamilyHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>;
                };
                update: {
                    args: Prisma.FamilyHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.FamilyHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FamilyHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FamilyHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.FamilyHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FamilyHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.FamilyHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFamilyHistory>;
                };
                groupBy: {
                    args: Prisma.FamilyHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FamilyHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FamilyHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FamilyHistoryCountAggregateOutputType> | number;
                };
            };
        };
        Lifestyle: {
            payload: Prisma.$LifestylePayload<ExtArgs>;
            fields: Prisma.LifestyleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LifestyleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LifestyleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>;
                };
                findFirst: {
                    args: Prisma.LifestyleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LifestyleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>;
                };
                findMany: {
                    args: Prisma.LifestyleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>[];
                };
                create: {
                    args: Prisma.LifestyleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>;
                };
                createMany: {
                    args: Prisma.LifestyleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LifestyleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>[];
                };
                delete: {
                    args: Prisma.LifestyleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>;
                };
                update: {
                    args: Prisma.LifestyleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>;
                };
                deleteMany: {
                    args: Prisma.LifestyleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LifestyleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LifestyleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>[];
                };
                upsert: {
                    args: Prisma.LifestyleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LifestylePayload>;
                };
                aggregate: {
                    args: Prisma.LifestyleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLifestyle>;
                };
                groupBy: {
                    args: Prisma.LifestyleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LifestyleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LifestyleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LifestyleCountAggregateOutputType> | number;
                };
            };
        };
        Allergy: {
            payload: Prisma.$AllergyPayload<ExtArgs>;
            fields: Prisma.AllergyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AllergyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AllergyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>;
                };
                findFirst: {
                    args: Prisma.AllergyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AllergyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>;
                };
                findMany: {
                    args: Prisma.AllergyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>[];
                };
                create: {
                    args: Prisma.AllergyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>;
                };
                createMany: {
                    args: Prisma.AllergyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AllergyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>[];
                };
                delete: {
                    args: Prisma.AllergyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>;
                };
                update: {
                    args: Prisma.AllergyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>;
                };
                deleteMany: {
                    args: Prisma.AllergyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AllergyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AllergyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>[];
                };
                upsert: {
                    args: Prisma.AllergyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AllergyPayload>;
                };
                aggregate: {
                    args: Prisma.AllergyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAllergy>;
                };
                groupBy: {
                    args: Prisma.AllergyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AllergyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AllergyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AllergyCountAggregateOutputType> | number;
                };
            };
        };
        Doctor: {
            payload: Prisma.$DoctorPayload<ExtArgs>;
            fields: Prisma.DoctorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DoctorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                findFirst: {
                    args: Prisma.DoctorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                findMany: {
                    args: Prisma.DoctorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>[];
                };
                create: {
                    args: Prisma.DoctorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                createMany: {
                    args: Prisma.DoctorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>[];
                };
                delete: {
                    args: Prisma.DoctorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                update: {
                    args: Prisma.DoctorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                deleteMany: {
                    args: Prisma.DoctorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DoctorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DoctorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>[];
                };
                upsert: {
                    args: Prisma.DoctorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DoctorPayload>;
                };
                aggregate: {
                    args: Prisma.DoctorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDoctor>;
                };
                groupBy: {
                    args: Prisma.DoctorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DoctorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DoctorCountAggregateOutputType> | number;
                };
            };
        };
        PatientDoctor: {
            payload: Prisma.$PatientDoctorPayload<ExtArgs>;
            fields: Prisma.PatientDoctorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientDoctorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientDoctorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>;
                };
                findFirst: {
                    args: Prisma.PatientDoctorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientDoctorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>;
                };
                findMany: {
                    args: Prisma.PatientDoctorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>[];
                };
                create: {
                    args: Prisma.PatientDoctorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>;
                };
                createMany: {
                    args: Prisma.PatientDoctorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientDoctorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>[];
                };
                delete: {
                    args: Prisma.PatientDoctorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>;
                };
                update: {
                    args: Prisma.PatientDoctorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>;
                };
                deleteMany: {
                    args: Prisma.PatientDoctorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientDoctorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientDoctorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>[];
                };
                upsert: {
                    args: Prisma.PatientDoctorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDoctorPayload>;
                };
                aggregate: {
                    args: Prisma.PatientDoctorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatientDoctor>;
                };
                groupBy: {
                    args: Prisma.PatientDoctorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientDoctorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientDoctorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientDoctorCountAggregateOutputType> | number;
                };
            };
        };
        Consultation: {
            payload: Prisma.$ConsultationPayload<ExtArgs>;
            fields: Prisma.ConsultationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConsultationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                findFirst: {
                    args: Prisma.ConsultationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                findMany: {
                    args: Prisma.ConsultationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>[];
                };
                create: {
                    args: Prisma.ConsultationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                createMany: {
                    args: Prisma.ConsultationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConsultationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>[];
                };
                delete: {
                    args: Prisma.ConsultationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                update: {
                    args: Prisma.ConsultationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                deleteMany: {
                    args: Prisma.ConsultationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConsultationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConsultationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>[];
                };
                upsert: {
                    args: Prisma.ConsultationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsultationPayload>;
                };
                aggregate: {
                    args: Prisma.ConsultationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConsultation>;
                };
                groupBy: {
                    args: Prisma.ConsultationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsultationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConsultationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsultationCountAggregateOutputType> | number;
                };
            };
        };
        Appointment: {
            payload: Prisma.$AppointmentPayload<ExtArgs>;
            fields: Prisma.AppointmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AppointmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>;
                };
                findFirst: {
                    args: Prisma.AppointmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>;
                };
                findMany: {
                    args: Prisma.AppointmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>[];
                };
                create: {
                    args: Prisma.AppointmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>;
                };
                createMany: {
                    args: Prisma.AppointmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>[];
                };
                delete: {
                    args: Prisma.AppointmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>;
                };
                update: {
                    args: Prisma.AppointmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>;
                };
                deleteMany: {
                    args: Prisma.AppointmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AppointmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>[];
                };
                upsert: {
                    args: Prisma.AppointmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AppointmentPayload>;
                };
                aggregate: {
                    args: Prisma.AppointmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAppointment>;
                };
                groupBy: {
                    args: Prisma.AppointmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AppointmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AppointmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AppointmentCountAggregateOutputType> | number;
                };
            };
        };
        Disease: {
            payload: Prisma.$DiseasePayload<ExtArgs>;
            fields: Prisma.DiseaseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiseaseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiseaseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>;
                };
                findFirst: {
                    args: Prisma.DiseaseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiseaseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>;
                };
                findMany: {
                    args: Prisma.DiseaseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>[];
                };
                create: {
                    args: Prisma.DiseaseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>;
                };
                createMany: {
                    args: Prisma.DiseaseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiseaseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>[];
                };
                delete: {
                    args: Prisma.DiseaseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>;
                };
                update: {
                    args: Prisma.DiseaseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>;
                };
                deleteMany: {
                    args: Prisma.DiseaseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiseaseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiseaseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>[];
                };
                upsert: {
                    args: Prisma.DiseaseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseasePayload>;
                };
                aggregate: {
                    args: Prisma.DiseaseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDisease>;
                };
                groupBy: {
                    args: Prisma.DiseaseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiseaseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiseaseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiseaseCountAggregateOutputType> | number;
                };
            };
        };
        PatientDisease: {
            payload: Prisma.$PatientDiseasePayload<ExtArgs>;
            fields: Prisma.PatientDiseaseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientDiseaseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientDiseaseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>;
                };
                findFirst: {
                    args: Prisma.PatientDiseaseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientDiseaseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>;
                };
                findMany: {
                    args: Prisma.PatientDiseaseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>[];
                };
                create: {
                    args: Prisma.PatientDiseaseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>;
                };
                createMany: {
                    args: Prisma.PatientDiseaseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientDiseaseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>[];
                };
                delete: {
                    args: Prisma.PatientDiseaseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>;
                };
                update: {
                    args: Prisma.PatientDiseaseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>;
                };
                deleteMany: {
                    args: Prisma.PatientDiseaseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientDiseaseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientDiseaseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>[];
                };
                upsert: {
                    args: Prisma.PatientDiseaseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientDiseasePayload>;
                };
                aggregate: {
                    args: Prisma.PatientDiseaseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatientDisease>;
                };
                groupBy: {
                    args: Prisma.PatientDiseaseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientDiseaseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientDiseaseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientDiseaseCountAggregateOutputType> | number;
                };
            };
        };
        DiseaseWarningRule: {
            payload: Prisma.$DiseaseWarningRulePayload<ExtArgs>;
            fields: Prisma.DiseaseWarningRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiseaseWarningRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiseaseWarningRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>;
                };
                findFirst: {
                    args: Prisma.DiseaseWarningRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiseaseWarningRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>;
                };
                findMany: {
                    args: Prisma.DiseaseWarningRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>[];
                };
                create: {
                    args: Prisma.DiseaseWarningRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>;
                };
                createMany: {
                    args: Prisma.DiseaseWarningRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiseaseWarningRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>[];
                };
                delete: {
                    args: Prisma.DiseaseWarningRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>;
                };
                update: {
                    args: Prisma.DiseaseWarningRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>;
                };
                deleteMany: {
                    args: Prisma.DiseaseWarningRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiseaseWarningRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiseaseWarningRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>[];
                };
                upsert: {
                    args: Prisma.DiseaseWarningRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseWarningRulePayload>;
                };
                aggregate: {
                    args: Prisma.DiseaseWarningRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiseaseWarningRule>;
                };
                groupBy: {
                    args: Prisma.DiseaseWarningRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiseaseWarningRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiseaseWarningRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiseaseWarningRuleCountAggregateOutputType> | number;
                };
            };
        };
        ActiveSubstance: {
            payload: Prisma.$ActiveSubstancePayload<ExtArgs>;
            fields: Prisma.ActiveSubstanceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ActiveSubstanceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ActiveSubstanceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>;
                };
                findFirst: {
                    args: Prisma.ActiveSubstanceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ActiveSubstanceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>;
                };
                findMany: {
                    args: Prisma.ActiveSubstanceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>[];
                };
                create: {
                    args: Prisma.ActiveSubstanceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>;
                };
                createMany: {
                    args: Prisma.ActiveSubstanceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ActiveSubstanceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>[];
                };
                delete: {
                    args: Prisma.ActiveSubstanceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>;
                };
                update: {
                    args: Prisma.ActiveSubstanceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>;
                };
                deleteMany: {
                    args: Prisma.ActiveSubstanceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ActiveSubstanceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ActiveSubstanceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>[];
                };
                upsert: {
                    args: Prisma.ActiveSubstanceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ActiveSubstancePayload>;
                };
                aggregate: {
                    args: Prisma.ActiveSubstanceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateActiveSubstance>;
                };
                groupBy: {
                    args: Prisma.ActiveSubstanceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActiveSubstanceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ActiveSubstanceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ActiveSubstanceCountAggregateOutputType> | number;
                };
            };
        };
        DiseaseActiveSubstanceWarning: {
            payload: Prisma.$DiseaseActiveSubstanceWarningPayload<ExtArgs>;
            fields: Prisma.DiseaseActiveSubstanceWarningFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiseaseActiveSubstanceWarningFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiseaseActiveSubstanceWarningFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>;
                };
                findFirst: {
                    args: Prisma.DiseaseActiveSubstanceWarningFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiseaseActiveSubstanceWarningFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>;
                };
                findMany: {
                    args: Prisma.DiseaseActiveSubstanceWarningFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>[];
                };
                create: {
                    args: Prisma.DiseaseActiveSubstanceWarningCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>;
                };
                createMany: {
                    args: Prisma.DiseaseActiveSubstanceWarningCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiseaseActiveSubstanceWarningCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>[];
                };
                delete: {
                    args: Prisma.DiseaseActiveSubstanceWarningDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>;
                };
                update: {
                    args: Prisma.DiseaseActiveSubstanceWarningUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>;
                };
                deleteMany: {
                    args: Prisma.DiseaseActiveSubstanceWarningDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiseaseActiveSubstanceWarningUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiseaseActiveSubstanceWarningUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>[];
                };
                upsert: {
                    args: Prisma.DiseaseActiveSubstanceWarningUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiseaseActiveSubstanceWarningPayload>;
                };
                aggregate: {
                    args: Prisma.DiseaseActiveSubstanceWarningAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiseaseActiveSubstanceWarning>;
                };
                groupBy: {
                    args: Prisma.DiseaseActiveSubstanceWarningGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiseaseActiveSubstanceWarningGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiseaseActiveSubstanceWarningCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiseaseActiveSubstanceWarningCountAggregateOutputType> | number;
                };
            };
        };
        MedicineAlternative: {
            payload: Prisma.$MedicineAlternativePayload<ExtArgs>;
            fields: Prisma.MedicineAlternativeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicineAlternativeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicineAlternativeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>;
                };
                findFirst: {
                    args: Prisma.MedicineAlternativeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicineAlternativeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>;
                };
                findMany: {
                    args: Prisma.MedicineAlternativeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>[];
                };
                create: {
                    args: Prisma.MedicineAlternativeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>;
                };
                createMany: {
                    args: Prisma.MedicineAlternativeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicineAlternativeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>[];
                };
                delete: {
                    args: Prisma.MedicineAlternativeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>;
                };
                update: {
                    args: Prisma.MedicineAlternativeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>;
                };
                deleteMany: {
                    args: Prisma.MedicineAlternativeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicineAlternativeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicineAlternativeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>[];
                };
                upsert: {
                    args: Prisma.MedicineAlternativeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineAlternativePayload>;
                };
                aggregate: {
                    args: Prisma.MedicineAlternativeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedicineAlternative>;
                };
                groupBy: {
                    args: Prisma.MedicineAlternativeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineAlternativeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicineAlternativeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineAlternativeCountAggregateOutputType> | number;
                };
            };
        };
        TradeName: {
            payload: Prisma.$TradeNamePayload<ExtArgs>;
            fields: Prisma.TradeNameFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TradeNameFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TradeNameFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>;
                };
                findFirst: {
                    args: Prisma.TradeNameFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TradeNameFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>;
                };
                findMany: {
                    args: Prisma.TradeNameFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>[];
                };
                create: {
                    args: Prisma.TradeNameCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>;
                };
                createMany: {
                    args: Prisma.TradeNameCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TradeNameCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>[];
                };
                delete: {
                    args: Prisma.TradeNameDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>;
                };
                update: {
                    args: Prisma.TradeNameUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>;
                };
                deleteMany: {
                    args: Prisma.TradeNameDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TradeNameUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TradeNameUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>[];
                };
                upsert: {
                    args: Prisma.TradeNameUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TradeNamePayload>;
                };
                aggregate: {
                    args: Prisma.TradeNameAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTradeName>;
                };
                groupBy: {
                    args: Prisma.TradeNameGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TradeNameGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TradeNameCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TradeNameCountAggregateOutputType> | number;
                };
            };
        };
        Company: {
            payload: Prisma.$CompanyPayload<ExtArgs>;
            fields: Prisma.CompanyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CompanyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                findFirst: {
                    args: Prisma.CompanyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                findMany: {
                    args: Prisma.CompanyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                create: {
                    args: Prisma.CompanyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                createMany: {
                    args: Prisma.CompanyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                delete: {
                    args: Prisma.CompanyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                update: {
                    args: Prisma.CompanyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                deleteMany: {
                    args: Prisma.CompanyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CompanyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                upsert: {
                    args: Prisma.CompanyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                aggregate: {
                    args: Prisma.CompanyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCompany>;
                };
                groupBy: {
                    args: Prisma.CompanyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CompanyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyCountAggregateOutputType> | number;
                };
            };
        };
        ContractingCompany: {
            payload: Prisma.$ContractingCompanyPayload<ExtArgs>;
            fields: Prisma.ContractingCompanyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ContractingCompanyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ContractingCompanyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>;
                };
                findFirst: {
                    args: Prisma.ContractingCompanyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ContractingCompanyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>;
                };
                findMany: {
                    args: Prisma.ContractingCompanyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>[];
                };
                create: {
                    args: Prisma.ContractingCompanyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>;
                };
                createMany: {
                    args: Prisma.ContractingCompanyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ContractingCompanyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>[];
                };
                delete: {
                    args: Prisma.ContractingCompanyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>;
                };
                update: {
                    args: Prisma.ContractingCompanyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>;
                };
                deleteMany: {
                    args: Prisma.ContractingCompanyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ContractingCompanyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ContractingCompanyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>[];
                };
                upsert: {
                    args: Prisma.ContractingCompanyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyPayload>;
                };
                aggregate: {
                    args: Prisma.ContractingCompanyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateContractingCompany>;
                };
                groupBy: {
                    args: Prisma.ContractingCompanyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContractingCompanyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ContractingCompanyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContractingCompanyCountAggregateOutputType> | number;
                };
            };
        };
        ContractingCompanyTradeName: {
            payload: Prisma.$ContractingCompanyTradeNamePayload<ExtArgs>;
            fields: Prisma.ContractingCompanyTradeNameFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ContractingCompanyTradeNameFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ContractingCompanyTradeNameFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>;
                };
                findFirst: {
                    args: Prisma.ContractingCompanyTradeNameFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ContractingCompanyTradeNameFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>;
                };
                findMany: {
                    args: Prisma.ContractingCompanyTradeNameFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>[];
                };
                create: {
                    args: Prisma.ContractingCompanyTradeNameCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>;
                };
                createMany: {
                    args: Prisma.ContractingCompanyTradeNameCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ContractingCompanyTradeNameCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>[];
                };
                delete: {
                    args: Prisma.ContractingCompanyTradeNameDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>;
                };
                update: {
                    args: Prisma.ContractingCompanyTradeNameUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>;
                };
                deleteMany: {
                    args: Prisma.ContractingCompanyTradeNameDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ContractingCompanyTradeNameUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ContractingCompanyTradeNameUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>[];
                };
                upsert: {
                    args: Prisma.ContractingCompanyTradeNameUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContractingCompanyTradeNamePayload>;
                };
                aggregate: {
                    args: Prisma.ContractingCompanyTradeNameAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateContractingCompanyTradeName>;
                };
                groupBy: {
                    args: Prisma.ContractingCompanyTradeNameGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContractingCompanyTradeNameGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ContractingCompanyTradeNameCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContractingCompanyTradeNameCountAggregateOutputType> | number;
                };
            };
        };
        Prescription: {
            payload: Prisma.$PrescriptionPayload<ExtArgs>;
            fields: Prisma.PrescriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrescriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrescriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>;
                };
                findFirst: {
                    args: Prisma.PrescriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrescriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>;
                };
                findMany: {
                    args: Prisma.PrescriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>[];
                };
                create: {
                    args: Prisma.PrescriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>;
                };
                createMany: {
                    args: Prisma.PrescriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrescriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>[];
                };
                delete: {
                    args: Prisma.PrescriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>;
                };
                update: {
                    args: Prisma.PrescriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.PrescriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrescriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrescriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>[];
                };
                upsert: {
                    args: Prisma.PrescriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionPayload>;
                };
                aggregate: {
                    args: Prisma.PrescriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrescription>;
                };
                groupBy: {
                    args: Prisma.PrescriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrescriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrescriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrescriptionCountAggregateOutputType> | number;
                };
            };
        };
        PrescriptionVersion: {
            payload: Prisma.$PrescriptionVersionPayload<ExtArgs>;
            fields: Prisma.PrescriptionVersionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrescriptionVersionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrescriptionVersionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>;
                };
                findFirst: {
                    args: Prisma.PrescriptionVersionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrescriptionVersionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>;
                };
                findMany: {
                    args: Prisma.PrescriptionVersionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>[];
                };
                create: {
                    args: Prisma.PrescriptionVersionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>;
                };
                createMany: {
                    args: Prisma.PrescriptionVersionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrescriptionVersionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>[];
                };
                delete: {
                    args: Prisma.PrescriptionVersionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>;
                };
                update: {
                    args: Prisma.PrescriptionVersionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>;
                };
                deleteMany: {
                    args: Prisma.PrescriptionVersionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrescriptionVersionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrescriptionVersionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>[];
                };
                upsert: {
                    args: Prisma.PrescriptionVersionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrescriptionVersionPayload>;
                };
                aggregate: {
                    args: Prisma.PrescriptionVersionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrescriptionVersion>;
                };
                groupBy: {
                    args: Prisma.PrescriptionVersionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrescriptionVersionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrescriptionVersionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrescriptionVersionCountAggregateOutputType> | number;
                };
            };
        };
        DrugInteractionAlert: {
            payload: Prisma.$DrugInteractionAlertPayload<ExtArgs>;
            fields: Prisma.DrugInteractionAlertFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DrugInteractionAlertFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DrugInteractionAlertFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>;
                };
                findFirst: {
                    args: Prisma.DrugInteractionAlertFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DrugInteractionAlertFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>;
                };
                findMany: {
                    args: Prisma.DrugInteractionAlertFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>[];
                };
                create: {
                    args: Prisma.DrugInteractionAlertCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>;
                };
                createMany: {
                    args: Prisma.DrugInteractionAlertCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DrugInteractionAlertCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>[];
                };
                delete: {
                    args: Prisma.DrugInteractionAlertDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>;
                };
                update: {
                    args: Prisma.DrugInteractionAlertUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>;
                };
                deleteMany: {
                    args: Prisma.DrugInteractionAlertDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DrugInteractionAlertUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DrugInteractionAlertUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>[];
                };
                upsert: {
                    args: Prisma.DrugInteractionAlertUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DrugInteractionAlertPayload>;
                };
                aggregate: {
                    args: Prisma.DrugInteractionAlertAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDrugInteractionAlert>;
                };
                groupBy: {
                    args: Prisma.DrugInteractionAlertGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DrugInteractionAlertGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DrugInteractionAlertCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DrugInteractionAlertCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        Permission: {
            payload: Prisma.$PermissionPayload<ExtArgs>;
            fields: Prisma.PermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findFirst: {
                    args: Prisma.PermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                findMany: {
                    args: Prisma.PermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                create: {
                    args: Prisma.PermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                createMany: {
                    args: Prisma.PermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                delete: {
                    args: Prisma.PermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                update: {
                    args: Prisma.PermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.PermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[];
                };
                upsert: {
                    args: Prisma.PermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>;
                };
                aggregate: {
                    args: Prisma.PermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePermission>;
                };
                groupBy: {
                    args: Prisma.PermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PermissionCountAggregateOutputType> | number;
                };
            };
        };
        RolePermission: {
            payload: Prisma.$RolePermissionPayload<ExtArgs>;
            fields: Prisma.RolePermissionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findFirst: {
                    args: Prisma.RolePermissionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                findMany: {
                    args: Prisma.RolePermissionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                create: {
                    args: Prisma.RolePermissionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                createMany: {
                    args: Prisma.RolePermissionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                delete: {
                    args: Prisma.RolePermissionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                update: {
                    args: Prisma.RolePermissionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                deleteMany: {
                    args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>[];
                };
                upsert: {
                    args: Prisma.RolePermissionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePermissionPayload>;
                };
                aggregate: {
                    args: Prisma.RolePermissionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRolePermission>;
                };
                groupBy: {
                    args: Prisma.RolePermissionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RolePermissionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolePermissionCountAggregateOutputType> | number;
                };
            };
        };
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        Pharmacist: {
            payload: Prisma.$PharmacistPayload<ExtArgs>;
            fields: Prisma.PharmacistFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PharmacistFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PharmacistFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>;
                };
                findFirst: {
                    args: Prisma.PharmacistFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PharmacistFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>;
                };
                findMany: {
                    args: Prisma.PharmacistFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>[];
                };
                create: {
                    args: Prisma.PharmacistCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>;
                };
                createMany: {
                    args: Prisma.PharmacistCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PharmacistCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>[];
                };
                delete: {
                    args: Prisma.PharmacistDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>;
                };
                update: {
                    args: Prisma.PharmacistUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>;
                };
                deleteMany: {
                    args: Prisma.PharmacistDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PharmacistUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PharmacistUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>[];
                };
                upsert: {
                    args: Prisma.PharmacistUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PharmacistPayload>;
                };
                aggregate: {
                    args: Prisma.PharmacistAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePharmacist>;
                };
                groupBy: {
                    args: Prisma.PharmacistGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PharmacistGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PharmacistCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PharmacistCountAggregateOutputType> | number;
                };
            };
        };
        MedicalReport: {
            payload: Prisma.$MedicalReportPayload<ExtArgs>;
            fields: Prisma.MedicalReportFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicalReportFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicalReportFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>;
                };
                findFirst: {
                    args: Prisma.MedicalReportFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicalReportFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>;
                };
                findMany: {
                    args: Prisma.MedicalReportFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>[];
                };
                create: {
                    args: Prisma.MedicalReportCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>;
                };
                createMany: {
                    args: Prisma.MedicalReportCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicalReportCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>[];
                };
                delete: {
                    args: Prisma.MedicalReportDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>;
                };
                update: {
                    args: Prisma.MedicalReportUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>;
                };
                deleteMany: {
                    args: Prisma.MedicalReportDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicalReportUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicalReportUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>[];
                };
                upsert: {
                    args: Prisma.MedicalReportUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicalReportPayload>;
                };
                aggregate: {
                    args: Prisma.MedicalReportAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedicalReport>;
                };
                groupBy: {
                    args: Prisma.MedicalReportGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicalReportGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicalReportCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicalReportCountAggregateOutputType> | number;
                };
            };
        };
        PatientShareLink: {
            payload: Prisma.$PatientShareLinkPayload<ExtArgs>;
            fields: Prisma.PatientShareLinkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PatientShareLinkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PatientShareLinkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>;
                };
                findFirst: {
                    args: Prisma.PatientShareLinkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PatientShareLinkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>;
                };
                findMany: {
                    args: Prisma.PatientShareLinkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>[];
                };
                create: {
                    args: Prisma.PatientShareLinkCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>;
                };
                createMany: {
                    args: Prisma.PatientShareLinkCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PatientShareLinkCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>[];
                };
                delete: {
                    args: Prisma.PatientShareLinkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>;
                };
                update: {
                    args: Prisma.PatientShareLinkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>;
                };
                deleteMany: {
                    args: Prisma.PatientShareLinkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PatientShareLinkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PatientShareLinkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>[];
                };
                upsert: {
                    args: Prisma.PatientShareLinkUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PatientShareLinkPayload>;
                };
                aggregate: {
                    args: Prisma.PatientShareLinkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePatientShareLink>;
                };
                groupBy: {
                    args: Prisma.PatientShareLinkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientShareLinkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PatientShareLinkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PatientShareLinkCountAggregateOutputType> | number;
                };
            };
        };
        AdverseDrugReaction: {
            payload: Prisma.$AdverseDrugReactionPayload<ExtArgs>;
            fields: Prisma.AdverseDrugReactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AdverseDrugReactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AdverseDrugReactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>;
                };
                findFirst: {
                    args: Prisma.AdverseDrugReactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AdverseDrugReactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>;
                };
                findMany: {
                    args: Prisma.AdverseDrugReactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>[];
                };
                create: {
                    args: Prisma.AdverseDrugReactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>;
                };
                createMany: {
                    args: Prisma.AdverseDrugReactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AdverseDrugReactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>[];
                };
                delete: {
                    args: Prisma.AdverseDrugReactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>;
                };
                update: {
                    args: Prisma.AdverseDrugReactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>;
                };
                deleteMany: {
                    args: Prisma.AdverseDrugReactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AdverseDrugReactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AdverseDrugReactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>[];
                };
                upsert: {
                    args: Prisma.AdverseDrugReactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdverseDrugReactionPayload>;
                };
                aggregate: {
                    args: Prisma.AdverseDrugReactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAdverseDrugReaction>;
                };
                groupBy: {
                    args: Prisma.AdverseDrugReactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdverseDrugReactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AdverseDrugReactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdverseDrugReactionCountAggregateOutputType> | number;
                };
            };
        };
        ChildProfile: {
            payload: Prisma.$ChildProfilePayload<ExtArgs>;
            fields: Prisma.ChildProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChildProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChildProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>;
                };
                findFirst: {
                    args: Prisma.ChildProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChildProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>;
                };
                findMany: {
                    args: Prisma.ChildProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>[];
                };
                create: {
                    args: Prisma.ChildProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>;
                };
                createMany: {
                    args: Prisma.ChildProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChildProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>[];
                };
                delete: {
                    args: Prisma.ChildProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>;
                };
                update: {
                    args: Prisma.ChildProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.ChildProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChildProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChildProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>[];
                };
                upsert: {
                    args: Prisma.ChildProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChildProfilePayload>;
                };
                aggregate: {
                    args: Prisma.ChildProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChildProfile>;
                };
                groupBy: {
                    args: Prisma.ChildProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChildProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChildProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChildProfileCountAggregateOutputType> | number;
                };
            };
        };
        Rating: {
            payload: Prisma.$RatingPayload<ExtArgs>;
            fields: Prisma.RatingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RatingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                findFirst: {
                    args: Prisma.RatingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                findMany: {
                    args: Prisma.RatingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>[];
                };
                create: {
                    args: Prisma.RatingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                createMany: {
                    args: Prisma.RatingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RatingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>[];
                };
                delete: {
                    args: Prisma.RatingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                update: {
                    args: Prisma.RatingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                deleteMany: {
                    args: Prisma.RatingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RatingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RatingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>[];
                };
                upsert: {
                    args: Prisma.RatingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatingPayload>;
                };
                aggregate: {
                    args: Prisma.RatingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRating>;
                };
                groupBy: {
                    args: Prisma.RatingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RatingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatingCountAggregateOutputType> | number;
                };
            };
        };
        Visit: {
            payload: Prisma.$VisitPayload<ExtArgs>;
            fields: Prisma.VisitFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VisitFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VisitFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>;
                };
                findFirst: {
                    args: Prisma.VisitFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VisitFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>;
                };
                findMany: {
                    args: Prisma.VisitFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>[];
                };
                create: {
                    args: Prisma.VisitCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>;
                };
                createMany: {
                    args: Prisma.VisitCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VisitCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>[];
                };
                delete: {
                    args: Prisma.VisitDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>;
                };
                update: {
                    args: Prisma.VisitUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>;
                };
                deleteMany: {
                    args: Prisma.VisitDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VisitUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VisitUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>[];
                };
                upsert: {
                    args: Prisma.VisitUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VisitPayload>;
                };
                aggregate: {
                    args: Prisma.VisitAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVisit>;
                };
                groupBy: {
                    args: Prisma.VisitGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VisitGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VisitCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VisitCountAggregateOutputType> | number;
                };
            };
        };
        ContraindicationTermMapping: {
            payload: Prisma.$ContraindicationTermMappingPayload<ExtArgs>;
            fields: Prisma.ContraindicationTermMappingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ContraindicationTermMappingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ContraindicationTermMappingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>;
                };
                findFirst: {
                    args: Prisma.ContraindicationTermMappingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ContraindicationTermMappingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>;
                };
                findMany: {
                    args: Prisma.ContraindicationTermMappingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>[];
                };
                create: {
                    args: Prisma.ContraindicationTermMappingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>;
                };
                createMany: {
                    args: Prisma.ContraindicationTermMappingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ContraindicationTermMappingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>[];
                };
                delete: {
                    args: Prisma.ContraindicationTermMappingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>;
                };
                update: {
                    args: Prisma.ContraindicationTermMappingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>;
                };
                deleteMany: {
                    args: Prisma.ContraindicationTermMappingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ContraindicationTermMappingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ContraindicationTermMappingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>[];
                };
                upsert: {
                    args: Prisma.ContraindicationTermMappingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContraindicationTermMappingPayload>;
                };
                aggregate: {
                    args: Prisma.ContraindicationTermMappingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateContraindicationTermMapping>;
                };
                groupBy: {
                    args: Prisma.ContraindicationTermMappingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContraindicationTermMappingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ContraindicationTermMappingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContraindicationTermMappingCountAggregateOutputType> | number;
                };
            };
        };
        BatchHistory: {
            payload: Prisma.$BatchHistoryPayload<ExtArgs>;
            fields: Prisma.BatchHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BatchHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BatchHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.BatchHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BatchHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>;
                };
                findMany: {
                    args: Prisma.BatchHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>[];
                };
                create: {
                    args: Prisma.BatchHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>;
                };
                createMany: {
                    args: Prisma.BatchHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BatchHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>[];
                };
                delete: {
                    args: Prisma.BatchHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>;
                };
                update: {
                    args: Prisma.BatchHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.BatchHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BatchHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BatchHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.BatchHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BatchHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.BatchHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBatchHistory>;
                };
                groupBy: {
                    args: Prisma.BatchHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BatchHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BatchHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BatchHistoryCountAggregateOutputType> | number;
                };
            };
        };
        ImportHistory: {
            payload: Prisma.$ImportHistoryPayload<ExtArgs>;
            fields: Prisma.ImportHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ImportHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ImportHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.ImportHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ImportHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>;
                };
                findMany: {
                    args: Prisma.ImportHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>[];
                };
                create: {
                    args: Prisma.ImportHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>;
                };
                createMany: {
                    args: Prisma.ImportHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ImportHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>[];
                };
                delete: {
                    args: Prisma.ImportHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>;
                };
                update: {
                    args: Prisma.ImportHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.ImportHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ImportHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ImportHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.ImportHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImportHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.ImportHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateImportHistory>;
                };
                groupBy: {
                    args: Prisma.ImportHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ImportHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ImportHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ImportHistoryCountAggregateOutputType> | number;
                };
            };
        };
        MedicineSuggestion: {
            payload: Prisma.$MedicineSuggestionPayload<ExtArgs>;
            fields: Prisma.MedicineSuggestionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MedicineSuggestionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MedicineSuggestionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>;
                };
                findFirst: {
                    args: Prisma.MedicineSuggestionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MedicineSuggestionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>;
                };
                findMany: {
                    args: Prisma.MedicineSuggestionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>[];
                };
                create: {
                    args: Prisma.MedicineSuggestionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>;
                };
                createMany: {
                    args: Prisma.MedicineSuggestionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MedicineSuggestionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>[];
                };
                delete: {
                    args: Prisma.MedicineSuggestionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>;
                };
                update: {
                    args: Prisma.MedicineSuggestionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>;
                };
                deleteMany: {
                    args: Prisma.MedicineSuggestionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MedicineSuggestionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MedicineSuggestionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>[];
                };
                upsert: {
                    args: Prisma.MedicineSuggestionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MedicineSuggestionPayload>;
                };
                aggregate: {
                    args: Prisma.MedicineSuggestionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMedicineSuggestion>;
                };
                groupBy: {
                    args: Prisma.MedicineSuggestionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineSuggestionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MedicineSuggestionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MedicineSuggestionCountAggregateOutputType> | number;
                };
            };
        };
        ExportHistory: {
            payload: Prisma.$ExportHistoryPayload<ExtArgs>;
            fields: Prisma.ExportHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExportHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExportHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.ExportHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExportHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>;
                };
                findMany: {
                    args: Prisma.ExportHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>[];
                };
                create: {
                    args: Prisma.ExportHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>;
                };
                createMany: {
                    args: Prisma.ExportHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExportHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>[];
                };
                delete: {
                    args: Prisma.ExportHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>;
                };
                update: {
                    args: Prisma.ExportHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.ExportHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExportHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExportHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.ExportHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExportHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.ExportHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExportHistory>;
                };
                groupBy: {
                    args: Prisma.ExportHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExportHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExportHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExportHistoryCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly emailVerified: "emailVerified";
    readonly emailVerificationToken: "emailVerificationToken";
    readonly passwordResetToken: "passwordResetToken";
    readonly passwordResetExpires: "passwordResetExpires";
    readonly isActive: "isActive";
    readonly lastLoginAt: "lastLoginAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const PricingPlanScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly price: "price";
    readonly salePrice: "salePrice";
    readonly duration: "duration";
    readonly isDefault: "isDefault";
    readonly features: "features";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PricingPlanScalarFieldEnum = (typeof PricingPlanScalarFieldEnum)[keyof typeof PricingPlanScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly pricingPlanId: "pricingPlanId";
    readonly status: "status";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly autoRenew: "autoRenew";
    readonly cancelledAt: "cancelledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly subscriptionId: "subscriptionId";
    readonly amount: "amount";
    readonly currency: "currency";
    readonly paymentMethod: "paymentMethod";
    readonly transactionId: "transactionId";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const PatientScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly age: "age";
    readonly ageClassification: "ageClassification";
    readonly weight: "weight";
    readonly height: "height";
    readonly gender: "gender";
    readonly smoking: "smoking";
    readonly pregnancyWarning: "pregnancyWarning";
    readonly lactation: "lactation";
    readonly profileCompleteness: "profileCompleteness";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum];
export declare const MedicalHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly diseaseId: "diseaseId";
    readonly diagnosisDate: "diagnosisDate";
    readonly severity: "severity";
    readonly treatment: "treatment";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MedicalHistoryScalarFieldEnum = (typeof MedicalHistoryScalarFieldEnum)[keyof typeof MedicalHistoryScalarFieldEnum];
export declare const FamilyHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly relation: "relation";
    readonly diseaseId: "diseaseId";
    readonly severity: "severity";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FamilyHistoryScalarFieldEnum = (typeof FamilyHistoryScalarFieldEnum)[keyof typeof FamilyHistoryScalarFieldEnum];
export declare const LifestyleScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly noGlasses: "noGlasses";
    readonly alcoholAbuse: "alcoholAbuse";
    readonly excessCaffeine: "excessCaffeine";
    readonly waterDaily: "waterDaily";
    readonly travellerAbroad: "travellerAbroad";
    readonly annualVaccination: "annualVaccination";
    readonly surgeriesLast3Months: "surgeriesLast3Months";
    readonly surgeriesDetails: "surgeriesDetails";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LifestyleScalarFieldEnum = (typeof LifestyleScalarFieldEnum)[keyof typeof LifestyleScalarFieldEnum];
export declare const AllergyScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly allergen: "allergen";
    readonly severity: "severity";
    readonly reactionType: "reactionType";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AllergyScalarFieldEnum = (typeof AllergyScalarFieldEnum)[keyof typeof AllergyScalarFieldEnum];
export declare const DoctorScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly licenseNumber: "licenseNumber";
    readonly specialization: "specialization";
    readonly phoneNumber: "phoneNumber";
    readonly address: "address";
    readonly city: "city";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly consultationFee: "consultationFee";
    readonly workingHours: "workingHours";
    readonly averageRating: "averageRating";
    readonly totalRatings: "totalRatings";
    readonly isVerified: "isVerified";
    readonly verifiedAt: "verifiedAt";
    readonly verifiedBy: "verifiedBy";
    readonly verificationNotes: "verificationNotes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum];
export declare const PatientDoctorScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly relationshipType: "relationshipType";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PatientDoctorScalarFieldEnum = (typeof PatientDoctorScalarFieldEnum)[keyof typeof PatientDoctorScalarFieldEnum];
export declare const ConsultationScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly consultationDate: "consultationDate";
    readonly notes: "notes";
    readonly diagnosis: "diagnosis";
    readonly followUpRequired: "followUpRequired";
    readonly followUpDate: "followUpDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum];
export declare const AppointmentScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly appointmentDate: "appointmentDate";
    readonly duration: "duration";
    readonly status: "status";
    readonly notes: "notes";
    readonly reminderSent: "reminderSent";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum];
export declare const DiseaseScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly severity: "severity";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly requiresSpecialHandling: "requiresSpecialHandling";
    readonly warningMessage: "warningMessage";
    readonly warningConfig: "warningConfig";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiseaseScalarFieldEnum = (typeof DiseaseScalarFieldEnum)[keyof typeof DiseaseScalarFieldEnum];
export declare const PatientDiseaseScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly diseaseId: "diseaseId";
    readonly diagnosisDate: "diagnosisDate";
    readonly severity: "severity";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PatientDiseaseScalarFieldEnum = (typeof PatientDiseaseScalarFieldEnum)[keyof typeof PatientDiseaseScalarFieldEnum];
export declare const DiseaseWarningRuleScalarFieldEnum: {
    readonly id: "id";
    readonly diseaseId: "diseaseId";
    readonly ruleType: "ruleType";
    readonly targetActiveSubstanceId: "targetActiveSubstanceId";
    readonly targetDrugClass: "targetDrugClass";
    readonly severity: "severity";
    readonly warningMessage: "warningMessage";
    readonly autoBlock: "autoBlock";
    readonly requiresOverride: "requiresOverride";
    readonly requiredMonitoring: "requiredMonitoring";
    readonly createdBy: "createdBy";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiseaseWarningRuleScalarFieldEnum = (typeof DiseaseWarningRuleScalarFieldEnum)[keyof typeof DiseaseWarningRuleScalarFieldEnum];
export declare const ActiveSubstanceScalarFieldEnum: {
    readonly id: "id";
    readonly activeSubstance: "activeSubstance";
    readonly concentration: "concentration";
    readonly classification: "classification";
    readonly dosageForm: "dosageForm";
    readonly indication: "indication";
    readonly adultDoseMaxPerDay: "adultDoseMaxPerDay";
    readonly adultDoseMgPerKg: "adultDoseMgPerKg";
    readonly doseInKg: "doseInKg";
    readonly pediatricDose: "pediatricDose";
    readonly glucoseContent: "glucoseContent";
    readonly lactoseContent: "lactoseContent";
    readonly fructoseContent: "fructoseContent";
    readonly preservativesInOcularProducts: "preservativesInOcularProducts";
    readonly eliminationPathway: "eliminationPathway";
    readonly contraindications: "contraindications";
    readonly pregnancyWarning: "pregnancyWarning";
    readonly lactationWarning: "lactationWarning";
    readonly reproductiveWarningFemale: "reproductiveWarningFemale";
    readonly reproductiveWarningMale: "reproductiveWarningMale";
    readonly specialPopulationChildren: "specialPopulationChildren";
    readonly specialPopulationElderly: "specialPopulationElderly";
    readonly ethnicAction: "ethnicAction";
    readonly hepaticWarning: "hepaticWarning";
    readonly renalWarning: "renalWarning";
    readonly medicationErrorWarning: "medicationErrorWarning";
    readonly carcinogenicityMutagenicity: "carcinogenicityMutagenicity";
    readonly gitWarning: "gitWarning";
    readonly metabolismWarning: "metabolismWarning";
    readonly pulmonaryWarning: "pulmonaryWarning";
    readonly immuneSystemWarning: "immuneSystemWarning";
    readonly infectionWarning: "infectionWarning";
    readonly bloodWarning: "bloodWarning";
    readonly vascularWarning: "vascularWarning";
    readonly electrolyteImbalanceWarning: "electrolyteImbalanceWarning";
    readonly cardiacWarning: "cardiacWarning";
    readonly psychiatricWarning: "psychiatricWarning";
    readonly nervousSystemWarning: "nervousSystemWarning";
    readonly skinConnectiveTissueWarning: "skinConnectiveTissueWarning";
    readonly musculoSkeletalWarning: "musculoSkeletalWarning";
    readonly eyeDisordersWarning: "eyeDisordersWarning";
    readonly earDisordersWarning: "earDisordersWarning";
    readonly interactionVitaminsFood: "interactionVitaminsFood";
    readonly interactionBisphosphonates: "interactionBisphosphonates";
    readonly interactionAlcohol: "interactionAlcohol";
    readonly interactionMuscleRelaxant: "interactionMuscleRelaxant";
    readonly interactionRetinoids: "interactionRetinoids";
    readonly interactionCorticosteroids: "interactionCorticosteroids";
    readonly interactionXanthines: "interactionXanthines";
    readonly interactionSympathomimetics: "interactionSympathomimetics";
    readonly interactionAnticholinergic: "interactionAnticholinergic";
    readonly interactionChemotherapy: "interactionChemotherapy";
    readonly interactionAntibiotics: "interactionAntibiotics";
    readonly interactionHormones: "interactionHormones";
    readonly interactionStatins: "interactionStatins";
    readonly interactionAntihypertensive: "interactionAntihypertensive";
    readonly interactionAntidiuretics: "interactionAntidiuretics";
    readonly interactionAntidepressant: "interactionAntidepressant";
    readonly interactionAntidiabetic: "interactionAntidiabetic";
    readonly interactionLowBloodSugarAgents: "interactionLowBloodSugarAgents";
    readonly interactionDigoxin: "interactionDigoxin";
    readonly interactionAnticoagulant: "interactionAnticoagulant";
    readonly interactionNSAIDs: "interactionNSAIDs";
    readonly interactionImmunosuppressive: "interactionImmunosuppressive";
    readonly interactionAntacids: "interactionAntacids";
    readonly interactionUricosurics: "interactionUricosurics";
    readonly interactionProtectants: "interactionProtectants";
    readonly interactionAntiParkinson: "interactionAntiParkinson";
    readonly interactionHIVProtease: "interactionHIVProtease";
    readonly ironChelator: "ironChelator";
    readonly interactionBloodProduct: "interactionBloodProduct";
    readonly interactionVaccines: "interactionVaccines";
    readonly interactionAnthelmintics: "interactionAnthelmintics";
    readonly interactionPDE5Inhibitors: "interactionPDE5Inhibitors";
    readonly interferenceLabTests: "interferenceLabTests";
    readonly effectOnDriving: "effectOnDriving";
    readonly veryCommonGIT: "veryCommonGIT";
    readonly veryCommonBlood: "veryCommonBlood";
    readonly veryCommonVascular: "veryCommonVascular";
    readonly veryCommonCardiac: "veryCommonCardiac";
    readonly veryCommonMusculoskeletal: "veryCommonMusculoskeletal";
    readonly veryCommonNervousSystem: "veryCommonNervousSystem";
    readonly veryCommonEye: "veryCommonEye";
    readonly veryCommonMetabolism: "veryCommonMetabolism";
    readonly veryCommonEar: "veryCommonEar";
    readonly veryCommonRespiratory: "veryCommonRespiratory";
    readonly veryCommonSkin: "veryCommonSkin";
    readonly veryCommonInfection: "veryCommonInfection";
    readonly veryCommonPsychiatric: "veryCommonPsychiatric";
    readonly veryCommonRenal: "veryCommonRenal";
    readonly veryCommonHepatic: "veryCommonHepatic";
    readonly veryCommonGeneral: "veryCommonGeneral";
    readonly commonGIT: "commonGIT";
    readonly commonVascular: "commonVascular";
    readonly commonInfections: "commonInfections";
    readonly commonRespiratory: "commonRespiratory";
    readonly commonCardiac: "commonCardiac";
    readonly commonBlood: "commonBlood";
    readonly commonSkin: "commonSkin";
    readonly commonEye: "commonEye";
    readonly commonEar: "commonEar";
    readonly commonMetabolism: "commonMetabolism";
    readonly commonGeneral: "commonGeneral";
    readonly commonHepatobiliary: "commonHepatobiliary";
    readonly commonImmunity: "commonImmunity";
    readonly commonPsychiatric: "commonPsychiatric";
    readonly commonNervousSystem: "commonNervousSystem";
    readonly commonRenal: "commonRenal";
    readonly commonMusculoskeletal: "commonMusculoskeletal";
    readonly uncommonNervous: "uncommonNervous";
    readonly uncommonInfections: "uncommonInfections";
    readonly uncommonPsychiatric: "uncommonPsychiatric";
    readonly uncommonEye: "uncommonEye";
    readonly uncommonRespiratory: "uncommonRespiratory";
    readonly uncommonSkin: "uncommonSkin";
    readonly uncommonRenal: "uncommonRenal";
    readonly uncommonHepatobiliary: "uncommonHepatobiliary";
    readonly uncommonVascular: "uncommonVascular";
    readonly uncommonGIT: "uncommonGIT";
    readonly uncommonMusculoskeletal: "uncommonMusculoskeletal";
    readonly uncommonMetabolism: "uncommonMetabolism";
    readonly uncommonEar: "uncommonEar";
    readonly uncommonCardiac: "uncommonCardiac";
    readonly uncommonBlood: "uncommonBlood";
    readonly uncommonImmunity: "uncommonImmunity";
    readonly uncommonGeneral: "uncommonGeneral";
    readonly rareEar: "rareEar";
    readonly rareBlood: "rareBlood";
    readonly rareGIT: "rareGIT";
    readonly rareHepatic: "rareHepatic";
    readonly rareInfections: "rareInfections";
    readonly rareCardiac: "rareCardiac";
    readonly rareVascular: "rareVascular";
    readonly rareImmune: "rareImmune";
    readonly rareMetabolism: "rareMetabolism";
    readonly rareNervous: "rareNervous";
    readonly rareMusculoskeletal: "rareMusculoskeletal";
    readonly rarePsychiatric: "rarePsychiatric";
    readonly rareEye: "rareEye";
    readonly rareRenal: "rareRenal";
    readonly rareSkin: "rareSkin";
    readonly rareRespiratory: "rareRespiratory";
    readonly rareEndocrine: "rareEndocrine";
    readonly rareGeneral: "rareGeneral";
    readonly veryRareVascular: "veryRareVascular";
    readonly veryRareEndocrine: "veryRareEndocrine";
    readonly veryRareNervous: "veryRareNervous";
    readonly veryRarePsychiatric: "veryRarePsychiatric";
    readonly veryRareEye: "veryRareEye";
    readonly veryRareMusculoskeletal: "veryRareMusculoskeletal";
    readonly veryRareBlood: "veryRareBlood";
    readonly veryRareCardiac: "veryRareCardiac";
    readonly veryRareImmune: "veryRareImmune";
    readonly veryRareEar: "veryRareEar";
    readonly veryRareRenal: "veryRareRenal";
    readonly veryRareGIT: "veryRareGIT";
    readonly veryRareHepatobiliary: "veryRareHepatobiliary";
    readonly veryRareInfections: "veryRareInfections";
    readonly veryRareRespiratory: "veryRareRespiratory";
    readonly veryRareSkin: "veryRareSkin";
    readonly veryRareGeneral: "veryRareGeneral";
    readonly veryRareMetabolism: "veryRareMetabolism";
    readonly unknownNervous: "unknownNervous";
    readonly unknownMusculoskeletal: "unknownMusculoskeletal";
    readonly unknownPsychiatric: "unknownPsychiatric";
    readonly unknownHepatobiliary: "unknownHepatobiliary";
    readonly unknownRenal: "unknownRenal";
    readonly unknownSkin: "unknownSkin";
    readonly unknownRespiratory: "unknownRespiratory";
    readonly unknownImmune: "unknownImmune";
    readonly unknownVascular: "unknownVascular";
    readonly unknownEar: "unknownEar";
    readonly unknownGIT: "unknownGIT";
    readonly unknownGeneral: "unknownGeneral";
    readonly unknownMetabolism: "unknownMetabolism";
    readonly unknownEye: "unknownEye";
    readonly unknownBlood: "unknownBlood";
    readonly unknownCardiac: "unknownCardiac";
    readonly unknownInfections: "unknownInfections";
    readonly unknownEndocrine: "unknownEndocrine";
    readonly additiveRMM: "additiveRMM";
    readonly pregnancyCategory: "pregnancyCategory";
    readonly additionalMonitoring: "additionalMonitoring";
    readonly highlightedWarning: "highlightedWarning";
    readonly version: "version";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ActiveSubstanceScalarFieldEnum = (typeof ActiveSubstanceScalarFieldEnum)[keyof typeof ActiveSubstanceScalarFieldEnum];
export declare const DiseaseActiveSubstanceWarningScalarFieldEnum: {
    readonly id: "id";
    readonly diseaseId: "diseaseId";
    readonly activeSubstanceId: "activeSubstanceId";
    readonly warningFieldName: "warningFieldName";
    readonly warningMessage: "warningMessage";
    readonly severity: "severity";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiseaseActiveSubstanceWarningScalarFieldEnum = (typeof DiseaseActiveSubstanceWarningScalarFieldEnum)[keyof typeof DiseaseActiveSubstanceWarningScalarFieldEnum];
export declare const MedicineAlternativeScalarFieldEnum: {
    readonly id: "id";
    readonly activeSubstanceId: "activeSubstanceId";
    readonly alternativeActiveSubstanceId: "alternativeActiveSubstanceId";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type MedicineAlternativeScalarFieldEnum = (typeof MedicineAlternativeScalarFieldEnum)[keyof typeof MedicineAlternativeScalarFieldEnum];
export declare const TradeNameScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly activeSubstanceId: "activeSubstanceId";
    readonly companyId: "companyId";
    readonly warningNotification: "warningNotification";
    readonly batchNumber: "batchNumber";
    readonly barCode: "barCode";
    readonly availabilityStatus: "availabilityStatus";
    readonly stockQuantity: "stockQuantity";
    readonly expiryDate: "expiryDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type TradeNameScalarFieldEnum = (typeof TradeNameScalarFieldEnum)[keyof typeof TradeNameScalarFieldEnum];
export declare const CompanyScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly contactInfo: "contactInfo";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum];
export declare const ContractingCompanyScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly companyId: "companyId";
    readonly contractingDate: "contractingDate";
    readonly expiryDate: "expiryDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ContractingCompanyScalarFieldEnum = (typeof ContractingCompanyScalarFieldEnum)[keyof typeof ContractingCompanyScalarFieldEnum];
export declare const ContractingCompanyTradeNameScalarFieldEnum: {
    readonly id: "id";
    readonly contractingCompanyId: "contractingCompanyId";
    readonly tradeNameId: "tradeNameId";
    readonly createdAt: "createdAt";
};
export type ContractingCompanyTradeNameScalarFieldEnum = (typeof ContractingCompanyTradeNameScalarFieldEnum)[keyof typeof ContractingCompanyTradeNameScalarFieldEnum];
export declare const PrescriptionScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly patientId: "patientId";
    readonly tradeNameId: "tradeNameId";
    readonly status: "status";
    readonly prescriptionDate: "prescriptionDate";
    readonly validFrom: "validFrom";
    readonly validUntil: "validUntil";
    readonly dosage: "dosage";
    readonly frequency: "frequency";
    readonly duration: "duration";
    readonly instructions: "instructions";
    readonly maxRefills: "maxRefills";
    readonly currentRefillCount: "currentRefillCount";
    readonly notes: "notes";
    readonly version: "version";
    readonly pdfUrl: "pdfUrl";
    readonly isSharedViaApp: "isSharedViaApp";
    readonly sharedVia: "sharedVia";
    readonly isAddedToProfile: "isAddedToProfile";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum];
export declare const PrescriptionVersionScalarFieldEnum: {
    readonly id: "id";
    readonly prescriptionId: "prescriptionId";
    readonly version: "version";
    readonly changes: "changes";
    readonly changedBy: "changedBy";
    readonly createdAt: "createdAt";
};
export type PrescriptionVersionScalarFieldEnum = (typeof PrescriptionVersionScalarFieldEnum)[keyof typeof PrescriptionVersionScalarFieldEnum];
export declare const DrugInteractionAlertScalarFieldEnum: {
    readonly id: "id";
    readonly prescriptionId: "prescriptionId";
    readonly interactingMedicineId: "interactingMedicineId";
    readonly interactionType: "interactionType";
    readonly severity: "severity";
    readonly message: "message";
    readonly acknowledgedByDoctor: "acknowledgedByDoctor";
    readonly acknowledgedByPatient: "acknowledgedByPatient";
    readonly acknowledgedAt: "acknowledgedAt";
    readonly createdAt: "createdAt";
};
export type DrugInteractionAlertScalarFieldEnum = (typeof DrugInteractionAlertScalarFieldEnum)[keyof typeof DrugInteractionAlertScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly title: "title";
    readonly message: "message";
    readonly isRead: "isRead";
    readonly readAt: "readAt";
    readonly deliveryStatus: "deliveryStatus";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly changes: "changes";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly description: "description";
    readonly adminOnly: "adminOnly";
    readonly createdAt: "createdAt";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const RolePermissionScalarFieldEnum: {
    readonly id: "id";
    readonly role: "role";
    readonly permissionId: "permissionId";
};
export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly refreshToken: "refreshToken";
    readonly expiresAt: "expiresAt";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const PharmacistScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly licenseNumber: "licenseNumber";
    readonly pharmacyName: "pharmacyName";
    readonly phoneNumber: "phoneNumber";
    readonly address: "address";
    readonly city: "city";
    readonly isVerified: "isVerified";
    readonly verifiedAt: "verifiedAt";
    readonly verifiedBy: "verifiedBy";
    readonly verificationNotes: "verificationNotes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type PharmacistScalarFieldEnum = (typeof PharmacistScalarFieldEnum)[keyof typeof PharmacistScalarFieldEnum];
export declare const MedicalReportScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly uploadedBy: "uploadedBy";
    readonly fileName: "fileName";
    readonly fileUrl: "fileUrl";
    readonly fileType: "fileType";
    readonly fileSize: "fileSize";
    readonly reportType: "reportType";
    readonly reportDate: "reportDate";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MedicalReportScalarFieldEnum = (typeof MedicalReportScalarFieldEnum)[keyof typeof MedicalReportScalarFieldEnum];
export declare const PatientShareLinkScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly shareToken: "shareToken";
    readonly expiresAt: "expiresAt";
    readonly isActive: "isActive";
    readonly accessCount: "accessCount";
    readonly lastAccessedAt: "lastAccessedAt";
    readonly createdAt: "createdAt";
};
export type PatientShareLinkScalarFieldEnum = (typeof PatientShareLinkScalarFieldEnum)[keyof typeof PatientShareLinkScalarFieldEnum];
export declare const AdverseDrugReactionScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly tradeNameId: "tradeNameId";
    readonly companyId: "companyId";
    readonly activeSubstanceId: "activeSubstanceId";
    readonly severity: "severity";
    readonly reaction: "reaction";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isAnonymous: "isAnonymous";
    readonly reportedToEDA: "reportedToEDA";
    readonly edaReferenceNum: "edaReferenceNum";
    readonly status: "status";
    readonly adminNotes: "adminNotes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AdverseDrugReactionScalarFieldEnum = (typeof AdverseDrugReactionScalarFieldEnum)[keyof typeof AdverseDrugReactionScalarFieldEnum];
export declare const ChildProfileScalarFieldEnum: {
    readonly id: "id";
    readonly parentPatientId: "parentPatientId";
    readonly name: "name";
    readonly dateOfBirth: "dateOfBirth";
    readonly gender: "gender";
    readonly weight: "weight";
    readonly height: "height";
    readonly ageClassification: "ageClassification";
    readonly allergies: "allergies";
    readonly diseases: "diseases";
    readonly medicalHistory: "medicalHistory";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChildProfileScalarFieldEnum = (typeof ChildProfileScalarFieldEnum)[keyof typeof ChildProfileScalarFieldEnum];
export declare const RatingScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly pharmacistId: "pharmacistId";
    readonly ratedType: "ratedType";
    readonly rating: "rating";
    readonly review: "review";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum];
export declare const VisitScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly visitDate: "visitDate";
    readonly visitType: "visitType";
    readonly isNewVisit: "isNewVisit";
    readonly isArchived: "isArchived";
    readonly archivedAt: "archivedAt";
    readonly diagnosis: "diagnosis";
    readonly treatmentPlan: "treatmentPlan";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VisitScalarFieldEnum = (typeof VisitScalarFieldEnum)[keyof typeof VisitScalarFieldEnum];
export declare const ContraindicationTermMappingScalarFieldEnum: {
    readonly id: "id";
    readonly standardTerm: "standardTerm";
    readonly alternativeTerms: "alternativeTerms";
    readonly category: "category";
    readonly warningFieldName: "warningFieldName";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ContraindicationTermMappingScalarFieldEnum = (typeof ContraindicationTermMappingScalarFieldEnum)[keyof typeof ContraindicationTermMappingScalarFieldEnum];
export declare const BatchHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly tradeNameId: "tradeNameId";
    readonly batchNumber: "batchNumber";
    readonly manufacturingDate: "manufacturingDate";
    readonly expiryDate: "expiryDate";
    readonly quantity: "quantity";
    readonly isRecalled: "isRecalled";
    readonly recallReason: "recallReason";
    readonly recallDate: "recallDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BatchHistoryScalarFieldEnum = (typeof BatchHistoryScalarFieldEnum)[keyof typeof BatchHistoryScalarFieldEnum];
export declare const ImportHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly fileName: "fileName";
    readonly fileSize: "fileSize";
    readonly fileType: "fileType";
    readonly totalRows: "totalRows";
    readonly successfulRows: "successfulRows";
    readonly failedRows: "failedRows";
    readonly skippedRows: "skippedRows";
    readonly importedBy: "importedBy";
    readonly importDate: "importDate";
    readonly errors: "errors";
    readonly executionTime: "executionTime";
};
export type ImportHistoryScalarFieldEnum = (typeof ImportHistoryScalarFieldEnum)[keyof typeof ImportHistoryScalarFieldEnum];
export declare const MedicineSuggestionScalarFieldEnum: {
    readonly id: "id";
    readonly doctorId: "doctorId";
    readonly tradeName: "tradeName";
    readonly activeSubstance: "activeSubstance";
    readonly concentration: "concentration";
    readonly dosageForm: "dosageForm";
    readonly manufacturer: "manufacturer";
    readonly reason: "reason";
    readonly status: "status";
    readonly reviewedBy: "reviewedBy";
    readonly reviewNotes: "reviewNotes";
    readonly createdAt: "createdAt";
    readonly reviewedAt: "reviewedAt";
};
export type MedicineSuggestionScalarFieldEnum = (typeof MedicineSuggestionScalarFieldEnum)[keyof typeof MedicineSuggestionScalarFieldEnum];
export declare const ExportHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly format: "format";
    readonly totalRecords: "totalRecords";
    readonly filters: "filters";
    readonly exportedBy: "exportedBy";
    readonly exportDate: "exportDate";
};
export type ExportHistoryScalarFieldEnum = (typeof ExportHistoryScalarFieldEnum)[keyof typeof ExportHistoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'UserRole'
 */
export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>;
/**
 * Reference to a field of type 'UserRole[]'
 */
export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Decimal'
 */
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
/**
 * Reference to a field of type 'Decimal[]'
 */
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'SubscriptionStatus'
 */
export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>;
/**
 * Reference to a field of type 'SubscriptionStatus[]'
 */
export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>;
/**
 * Reference to a field of type 'PaymentStatus'
 */
export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>;
/**
 * Reference to a field of type 'PaymentStatus[]'
 */
export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;
/**
 * Reference to a field of type 'AgeClassification'
 */
export type EnumAgeClassificationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgeClassification'>;
/**
 * Reference to a field of type 'AgeClassification[]'
 */
export type ListEnumAgeClassificationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgeClassification[]'>;
/**
 * Reference to a field of type 'Gender'
 */
export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>;
/**
 * Reference to a field of type 'Gender[]'
 */
export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>;
/**
 * Reference to a field of type 'DiseaseSeverity'
 */
export type EnumDiseaseSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiseaseSeverity'>;
/**
 * Reference to a field of type 'DiseaseSeverity[]'
 */
export type ListEnumDiseaseSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiseaseSeverity[]'>;
/**
 * Reference to a field of type 'DiseaseStatus'
 */
export type EnumDiseaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiseaseStatus'>;
/**
 * Reference to a field of type 'DiseaseStatus[]'
 */
export type ListEnumDiseaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiseaseStatus[]'>;
/**
 * Reference to a field of type 'AllergySeverity'
 */
export type EnumAllergySeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AllergySeverity'>;
/**
 * Reference to a field of type 'AllergySeverity[]'
 */
export type ListEnumAllergySeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AllergySeverity[]'>;
/**
 * Reference to a field of type 'RelationshipType'
 */
export type EnumRelationshipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RelationshipType'>;
/**
 * Reference to a field of type 'RelationshipType[]'
 */
export type ListEnumRelationshipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RelationshipType[]'>;
/**
 * Reference to a field of type 'AppointmentStatus'
 */
export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>;
/**
 * Reference to a field of type 'AppointmentStatus[]'
 */
export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>;
/**
 * Reference to a field of type 'WarningRuleType'
 */
export type EnumWarningRuleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarningRuleType'>;
/**
 * Reference to a field of type 'WarningRuleType[]'
 */
export type ListEnumWarningRuleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarningRuleType[]'>;
/**
 * Reference to a field of type 'WarningSeverity'
 */
export type EnumWarningSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarningSeverity'>;
/**
 * Reference to a field of type 'WarningSeverity[]'
 */
export type ListEnumWarningSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarningSeverity[]'>;
/**
 * Reference to a field of type 'MedicineAvailabilityStatus'
 */
export type EnumMedicineAvailabilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MedicineAvailabilityStatus'>;
/**
 * Reference to a field of type 'MedicineAvailabilityStatus[]'
 */
export type ListEnumMedicineAvailabilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MedicineAvailabilityStatus[]'>;
/**
 * Reference to a field of type 'PrescriptionStatus'
 */
export type EnumPrescriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrescriptionStatus'>;
/**
 * Reference to a field of type 'PrescriptionStatus[]'
 */
export type ListEnumPrescriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrescriptionStatus[]'>;
/**
 * Reference to a field of type 'InteractionSeverity'
 */
export type EnumInteractionSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionSeverity'>;
/**
 * Reference to a field of type 'InteractionSeverity[]'
 */
export type ListEnumInteractionSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionSeverity[]'>;
/**
 * Reference to a field of type 'NotificationType'
 */
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
/**
 * Reference to a field of type 'NotificationType[]'
 */
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
/**
 * Reference to a field of type 'ReportType'
 */
export type EnumReportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportType'>;
/**
 * Reference to a field of type 'ReportType[]'
 */
export type ListEnumReportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportType[]'>;
/**
 * Reference to a field of type 'ADRSeverity'
 */
export type EnumADRSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ADRSeverity'>;
/**
 * Reference to a field of type 'ADRSeverity[]'
 */
export type ListEnumADRSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ADRSeverity[]'>;
/**
 * Reference to a field of type 'RatingType'
 */
export type EnumRatingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RatingType'>;
/**
 * Reference to a field of type 'RatingType[]'
 */
export type ListEnumRatingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RatingType[]'>;
/**
 * Reference to a field of type 'VisitType'
 */
export type EnumVisitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisitType'>;
/**
 * Reference to a field of type 'VisitType[]'
 */
export type ListEnumVisitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisitType[]'>;
/**
 * Reference to a field of type 'SuggestionStatus'
 */
export type EnumSuggestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuggestionStatus'>;
/**
 * Reference to a field of type 'SuggestionStatus[]'
 */
export type ListEnumSuggestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuggestionStatus[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    pricingPlan?: Prisma.PricingPlanOmit;
    subscription?: Prisma.SubscriptionOmit;
    payment?: Prisma.PaymentOmit;
    patient?: Prisma.PatientOmit;
    medicalHistory?: Prisma.MedicalHistoryOmit;
    familyHistory?: Prisma.FamilyHistoryOmit;
    lifestyle?: Prisma.LifestyleOmit;
    allergy?: Prisma.AllergyOmit;
    doctor?: Prisma.DoctorOmit;
    patientDoctor?: Prisma.PatientDoctorOmit;
    consultation?: Prisma.ConsultationOmit;
    appointment?: Prisma.AppointmentOmit;
    disease?: Prisma.DiseaseOmit;
    patientDisease?: Prisma.PatientDiseaseOmit;
    diseaseWarningRule?: Prisma.DiseaseWarningRuleOmit;
    activeSubstance?: Prisma.ActiveSubstanceOmit;
    diseaseActiveSubstanceWarning?: Prisma.DiseaseActiveSubstanceWarningOmit;
    medicineAlternative?: Prisma.MedicineAlternativeOmit;
    tradeName?: Prisma.TradeNameOmit;
    company?: Prisma.CompanyOmit;
    contractingCompany?: Prisma.ContractingCompanyOmit;
    contractingCompanyTradeName?: Prisma.ContractingCompanyTradeNameOmit;
    prescription?: Prisma.PrescriptionOmit;
    prescriptionVersion?: Prisma.PrescriptionVersionOmit;
    drugInteractionAlert?: Prisma.DrugInteractionAlertOmit;
    notification?: Prisma.NotificationOmit;
    auditLog?: Prisma.AuditLogOmit;
    permission?: Prisma.PermissionOmit;
    rolePermission?: Prisma.RolePermissionOmit;
    session?: Prisma.SessionOmit;
    pharmacist?: Prisma.PharmacistOmit;
    medicalReport?: Prisma.MedicalReportOmit;
    patientShareLink?: Prisma.PatientShareLinkOmit;
    adverseDrugReaction?: Prisma.AdverseDrugReactionOmit;
    childProfile?: Prisma.ChildProfileOmit;
    rating?: Prisma.RatingOmit;
    visit?: Prisma.VisitOmit;
    contraindicationTermMapping?: Prisma.ContraindicationTermMappingOmit;
    batchHistory?: Prisma.BatchHistoryOmit;
    importHistory?: Prisma.ImportHistoryOmit;
    medicineSuggestion?: Prisma.MedicineSuggestionOmit;
    exportHistory?: Prisma.ExportHistoryOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map