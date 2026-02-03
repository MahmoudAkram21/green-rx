import { z } from "zod";
export declare const createTradeNameSchema: z.ZodObject<{
    title: z.ZodString;
    activeSubstanceId: z.ZodNumber;
    companyId: z.ZodNumber;
    batchNumber: z.ZodOptional<z.ZodString>;
    barCode: z.ZodOptional<z.ZodString>;
    warningNotification: z.ZodOptional<z.ZodString>;
    availabilityStatus: z.ZodOptional<z.ZodEnum<{
        InStock: "InStock";
        OutOfStock: "OutOfStock";
        Discontinued: "Discontinued";
        Pending: "Pending";
    }>>;
    stockQuantity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    expiryDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const updateTradeNameSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    activeSubstanceId: z.ZodOptional<z.ZodNumber>;
    companyId: z.ZodOptional<z.ZodNumber>;
    batchNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    barCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    warningNotification: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    availabilityStatus: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        InStock: "InStock";
        OutOfStock: "OutOfStock";
        Discontinued: "Discontinued";
        Pending: "Pending";
    }>>>;
    stockQuantity: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    expiryDate: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strip>;
//# sourceMappingURL=tradeName.zod.d.ts.map