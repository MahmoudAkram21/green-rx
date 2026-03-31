import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PatientMedicine
 *
 */
export type PatientMedicineModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientMedicinePayload>;
export type AggregatePatientMedicine = {
    _count: PatientMedicineCountAggregateOutputType | null;
    _avg: PatientMedicineAvgAggregateOutputType | null;
    _sum: PatientMedicineSumAggregateOutputType | null;
    _min: PatientMedicineMinAggregateOutputType | null;
    _max: PatientMedicineMaxAggregateOutputType | null;
};
export type PatientMedicineAvgAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    tradeNameId: number | null;
    dosageAmount: runtime.Decimal | null;
    frequencyCount: number | null;
    frequencyPeriod: number | null;
    durationValue: number | null;
};
export type PatientMedicineSumAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    tradeNameId: number | null;
    dosageAmount: runtime.Decimal | null;
    frequencyCount: number | null;
    frequencyPeriod: number | null;
    durationValue: number | null;
};
export type PatientMedicineMinAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    tradeNameId: number | null;
    medicineName: string | null;
    dosageAmount: runtime.Decimal | null;
    frequencyCount: number | null;
    frequencyPeriod: number | null;
    frequencyUnit: string | null;
    durationValue: number | null;
    durationUnit: string | null;
    startDate: Date | null;
    endDate: Date | null;
    isOngoing: boolean | null;
    notes: string | null;
    reminderEnabled: boolean | null;
    imageUrl: string | null;
    isVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientMedicineMaxAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    tradeNameId: number | null;
    medicineName: string | null;
    dosageAmount: runtime.Decimal | null;
    frequencyCount: number | null;
    frequencyPeriod: number | null;
    frequencyUnit: string | null;
    durationValue: number | null;
    durationUnit: string | null;
    startDate: Date | null;
    endDate: Date | null;
    isOngoing: boolean | null;
    notes: string | null;
    reminderEnabled: boolean | null;
    imageUrl: string | null;
    isVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientMedicineCountAggregateOutputType = {
    id: number;
    patientId: number;
    tradeNameId: number;
    medicineName: number;
    dosageAmount: number;
    frequencyCount: number;
    frequencyPeriod: number;
    frequencyUnit: number;
    durationValue: number;
    durationUnit: number;
    startDate: number;
    endDate: number;
    isOngoing: number;
    notes: number;
    reminderEnabled: number;
    reminderTimes: number;
    imageUrl: number;
    isVerified: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PatientMedicineAvgAggregateInputType = {
    id?: true;
    patientId?: true;
    tradeNameId?: true;
    dosageAmount?: true;
    frequencyCount?: true;
    frequencyPeriod?: true;
    durationValue?: true;
};
export type PatientMedicineSumAggregateInputType = {
    id?: true;
    patientId?: true;
    tradeNameId?: true;
    dosageAmount?: true;
    frequencyCount?: true;
    frequencyPeriod?: true;
    durationValue?: true;
};
export type PatientMedicineMinAggregateInputType = {
    id?: true;
    patientId?: true;
    tradeNameId?: true;
    medicineName?: true;
    dosageAmount?: true;
    frequencyCount?: true;
    frequencyPeriod?: true;
    frequencyUnit?: true;
    durationValue?: true;
    durationUnit?: true;
    startDate?: true;
    endDate?: true;
    isOngoing?: true;
    notes?: true;
    reminderEnabled?: true;
    imageUrl?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientMedicineMaxAggregateInputType = {
    id?: true;
    patientId?: true;
    tradeNameId?: true;
    medicineName?: true;
    dosageAmount?: true;
    frequencyCount?: true;
    frequencyPeriod?: true;
    frequencyUnit?: true;
    durationValue?: true;
    durationUnit?: true;
    startDate?: true;
    endDate?: true;
    isOngoing?: true;
    notes?: true;
    reminderEnabled?: true;
    imageUrl?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientMedicineCountAggregateInputType = {
    id?: true;
    patientId?: true;
    tradeNameId?: true;
    medicineName?: true;
    dosageAmount?: true;
    frequencyCount?: true;
    frequencyPeriod?: true;
    frequencyUnit?: true;
    durationValue?: true;
    durationUnit?: true;
    startDate?: true;
    endDate?: true;
    isOngoing?: true;
    notes?: true;
    reminderEnabled?: true;
    reminderTimes?: true;
    imageUrl?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PatientMedicineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientMedicine to aggregate.
     */
    where?: Prisma.PatientMedicineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientMedicines to fetch.
     */
    orderBy?: Prisma.PatientMedicineOrderByWithRelationInput | Prisma.PatientMedicineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientMedicineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientMedicines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientMedicines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PatientMedicines
    **/
    _count?: true | PatientMedicineCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PatientMedicineAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PatientMedicineSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientMedicineMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientMedicineMaxAggregateInputType;
};
export type GetPatientMedicineAggregateType<T extends PatientMedicineAggregateArgs> = {
    [P in keyof T & keyof AggregatePatientMedicine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatientMedicine[P]> : Prisma.GetScalarType<T[P], AggregatePatientMedicine[P]>;
};
export type PatientMedicineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientMedicineWhereInput;
    orderBy?: Prisma.PatientMedicineOrderByWithAggregationInput | Prisma.PatientMedicineOrderByWithAggregationInput[];
    by: Prisma.PatientMedicineScalarFieldEnum[] | Prisma.PatientMedicineScalarFieldEnum;
    having?: Prisma.PatientMedicineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientMedicineCountAggregateInputType | true;
    _avg?: PatientMedicineAvgAggregateInputType;
    _sum?: PatientMedicineSumAggregateInputType;
    _min?: PatientMedicineMinAggregateInputType;
    _max?: PatientMedicineMaxAggregateInputType;
};
export type PatientMedicineGroupByOutputType = {
    id: number;
    patientId: number;
    tradeNameId: number | null;
    medicineName: string;
    dosageAmount: runtime.Decimal | null;
    frequencyCount: number | null;
    frequencyPeriod: number | null;
    frequencyUnit: string | null;
    durationValue: number | null;
    durationUnit: string | null;
    startDate: Date | null;
    endDate: Date | null;
    isOngoing: boolean;
    notes: string | null;
    reminderEnabled: boolean;
    reminderTimes: runtime.JsonValue | null;
    imageUrl: string | null;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PatientMedicineCountAggregateOutputType | null;
    _avg: PatientMedicineAvgAggregateOutputType | null;
    _sum: PatientMedicineSumAggregateOutputType | null;
    _min: PatientMedicineMinAggregateOutputType | null;
    _max: PatientMedicineMaxAggregateOutputType | null;
};
type GetPatientMedicineGroupByPayload<T extends PatientMedicineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientMedicineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientMedicineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientMedicineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientMedicineGroupByOutputType[P]>;
}>>;
export type PatientMedicineWhereInput = {
    AND?: Prisma.PatientMedicineWhereInput | Prisma.PatientMedicineWhereInput[];
    OR?: Prisma.PatientMedicineWhereInput[];
    NOT?: Prisma.PatientMedicineWhereInput | Prisma.PatientMedicineWhereInput[];
    id?: Prisma.IntFilter<"PatientMedicine"> | number;
    patientId?: Prisma.IntFilter<"PatientMedicine"> | number;
    tradeNameId?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    medicineName?: Prisma.StringFilter<"PatientMedicine"> | string;
    dosageAmount?: Prisma.DecimalNullableFilter<"PatientMedicine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    frequencyPeriod?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    frequencyUnit?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    durationValue?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    durationUnit?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"PatientMedicine"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"PatientMedicine"> | Date | string | null;
    isOngoing?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    notes?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    reminderEnabled?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    reminderTimes?: Prisma.JsonNullableFilter<"PatientMedicine">;
    imageUrl?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    isVerified?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PatientMedicine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientMedicine"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    tradeName?: Prisma.XOR<Prisma.TradeNameNullableScalarRelationFilter, Prisma.TradeNameWhereInput> | null;
    addMedicineRequests?: Prisma.AddMedicineRequestListRelationFilter;
};
export type PatientMedicineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrderInput | Prisma.SortOrder;
    medicineName?: Prisma.SortOrder;
    dosageAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequencyCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequencyPeriod?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequencyUnit?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationUnit?: Prisma.SortOrderInput | Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    isOngoing?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    reminderEnabled?: Prisma.SortOrder;
    reminderTimes?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
    tradeName?: Prisma.TradeNameOrderByWithRelationInput;
    addMedicineRequests?: Prisma.AddMedicineRequestOrderByRelationAggregateInput;
};
export type PatientMedicineWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PatientMedicineWhereInput | Prisma.PatientMedicineWhereInput[];
    OR?: Prisma.PatientMedicineWhereInput[];
    NOT?: Prisma.PatientMedicineWhereInput | Prisma.PatientMedicineWhereInput[];
    patientId?: Prisma.IntFilter<"PatientMedicine"> | number;
    tradeNameId?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    medicineName?: Prisma.StringFilter<"PatientMedicine"> | string;
    dosageAmount?: Prisma.DecimalNullableFilter<"PatientMedicine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    frequencyPeriod?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    frequencyUnit?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    durationValue?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    durationUnit?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"PatientMedicine"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"PatientMedicine"> | Date | string | null;
    isOngoing?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    notes?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    reminderEnabled?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    reminderTimes?: Prisma.JsonNullableFilter<"PatientMedicine">;
    imageUrl?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    isVerified?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PatientMedicine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientMedicine"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    tradeName?: Prisma.XOR<Prisma.TradeNameNullableScalarRelationFilter, Prisma.TradeNameWhereInput> | null;
    addMedicineRequests?: Prisma.AddMedicineRequestListRelationFilter;
}, "id">;
export type PatientMedicineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrderInput | Prisma.SortOrder;
    medicineName?: Prisma.SortOrder;
    dosageAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequencyCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequencyPeriod?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequencyUnit?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationUnit?: Prisma.SortOrderInput | Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    isOngoing?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    reminderEnabled?: Prisma.SortOrder;
    reminderTimes?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PatientMedicineCountOrderByAggregateInput;
    _avg?: Prisma.PatientMedicineAvgOrderByAggregateInput;
    _max?: Prisma.PatientMedicineMaxOrderByAggregateInput;
    _min?: Prisma.PatientMedicineMinOrderByAggregateInput;
    _sum?: Prisma.PatientMedicineSumOrderByAggregateInput;
};
export type PatientMedicineScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientMedicineScalarWhereWithAggregatesInput | Prisma.PatientMedicineScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientMedicineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientMedicineScalarWhereWithAggregatesInput | Prisma.PatientMedicineScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"PatientMedicine"> | number;
    patientId?: Prisma.IntWithAggregatesFilter<"PatientMedicine"> | number;
    tradeNameId?: Prisma.IntNullableWithAggregatesFilter<"PatientMedicine"> | number | null;
    medicineName?: Prisma.StringWithAggregatesFilter<"PatientMedicine"> | string;
    dosageAmount?: Prisma.DecimalNullableWithAggregatesFilter<"PatientMedicine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.IntNullableWithAggregatesFilter<"PatientMedicine"> | number | null;
    frequencyPeriod?: Prisma.IntNullableWithAggregatesFilter<"PatientMedicine"> | number | null;
    frequencyUnit?: Prisma.StringNullableWithAggregatesFilter<"PatientMedicine"> | string | null;
    durationValue?: Prisma.IntNullableWithAggregatesFilter<"PatientMedicine"> | number | null;
    durationUnit?: Prisma.StringNullableWithAggregatesFilter<"PatientMedicine"> | string | null;
    startDate?: Prisma.DateTimeNullableWithAggregatesFilter<"PatientMedicine"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"PatientMedicine"> | Date | string | null;
    isOngoing?: Prisma.BoolWithAggregatesFilter<"PatientMedicine"> | boolean;
    notes?: Prisma.StringNullableWithAggregatesFilter<"PatientMedicine"> | string | null;
    reminderEnabled?: Prisma.BoolWithAggregatesFilter<"PatientMedicine"> | boolean;
    reminderTimes?: Prisma.JsonNullableWithAggregatesFilter<"PatientMedicine">;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"PatientMedicine"> | string | null;
    isVerified?: Prisma.BoolWithAggregatesFilter<"PatientMedicine"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PatientMedicine"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PatientMedicine"> | Date | string;
};
export type PatientMedicineCreateInput = {
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientMedicinesInput;
    tradeName?: Prisma.TradeNameCreateNestedOneWithoutPatientMedicinesInput;
    addMedicineRequests?: Prisma.AddMedicineRequestCreateNestedManyWithoutPatientMedicineInput;
};
export type PatientMedicineUncheckedCreateInput = {
    id?: number;
    patientId: number;
    tradeNameId?: number | null;
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    addMedicineRequests?: Prisma.AddMedicineRequestUncheckedCreateNestedManyWithoutPatientMedicineInput;
};
export type PatientMedicineUpdateInput = {
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientMedicinesNestedInput;
    tradeName?: Prisma.TradeNameUpdateOneWithoutPatientMedicinesNestedInput;
    addMedicineRequests?: Prisma.AddMedicineRequestUpdateManyWithoutPatientMedicineNestedInput;
};
export type PatientMedicineUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeNameId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addMedicineRequests?: Prisma.AddMedicineRequestUncheckedUpdateManyWithoutPatientMedicineNestedInput;
};
export type PatientMedicineCreateManyInput = {
    id?: number;
    patientId: number;
    tradeNameId?: number | null;
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientMedicineUpdateManyMutationInput = {
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientMedicineUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeNameId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientMedicineListRelationFilter = {
    every?: Prisma.PatientMedicineWhereInput;
    some?: Prisma.PatientMedicineWhereInput;
    none?: Prisma.PatientMedicineWhereInput;
};
export type PatientMedicineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientMedicineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    medicineName?: Prisma.SortOrder;
    dosageAmount?: Prisma.SortOrder;
    frequencyCount?: Prisma.SortOrder;
    frequencyPeriod?: Prisma.SortOrder;
    frequencyUnit?: Prisma.SortOrder;
    durationValue?: Prisma.SortOrder;
    durationUnit?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isOngoing?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    reminderEnabled?: Prisma.SortOrder;
    reminderTimes?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientMedicineAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    dosageAmount?: Prisma.SortOrder;
    frequencyCount?: Prisma.SortOrder;
    frequencyPeriod?: Prisma.SortOrder;
    durationValue?: Prisma.SortOrder;
};
export type PatientMedicineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    medicineName?: Prisma.SortOrder;
    dosageAmount?: Prisma.SortOrder;
    frequencyCount?: Prisma.SortOrder;
    frequencyPeriod?: Prisma.SortOrder;
    frequencyUnit?: Prisma.SortOrder;
    durationValue?: Prisma.SortOrder;
    durationUnit?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isOngoing?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    reminderEnabled?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientMedicineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    medicineName?: Prisma.SortOrder;
    dosageAmount?: Prisma.SortOrder;
    frequencyCount?: Prisma.SortOrder;
    frequencyPeriod?: Prisma.SortOrder;
    frequencyUnit?: Prisma.SortOrder;
    durationValue?: Prisma.SortOrder;
    durationUnit?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    isOngoing?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    reminderEnabled?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientMedicineSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    dosageAmount?: Prisma.SortOrder;
    frequencyCount?: Prisma.SortOrder;
    frequencyPeriod?: Prisma.SortOrder;
    durationValue?: Prisma.SortOrder;
};
export type PatientMedicineScalarRelationFilter = {
    is?: Prisma.PatientMedicineWhereInput;
    isNot?: Prisma.PatientMedicineWhereInput;
};
export type PatientMedicineCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutPatientInput, Prisma.PatientMedicineUncheckedCreateWithoutPatientInput> | Prisma.PatientMedicineCreateWithoutPatientInput[] | Prisma.PatientMedicineUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutPatientInput | Prisma.PatientMedicineCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientMedicineCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
};
export type PatientMedicineUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutPatientInput, Prisma.PatientMedicineUncheckedCreateWithoutPatientInput> | Prisma.PatientMedicineCreateWithoutPatientInput[] | Prisma.PatientMedicineUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutPatientInput | Prisma.PatientMedicineCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientMedicineCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
};
export type PatientMedicineUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutPatientInput, Prisma.PatientMedicineUncheckedCreateWithoutPatientInput> | Prisma.PatientMedicineCreateWithoutPatientInput[] | Prisma.PatientMedicineUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutPatientInput | Prisma.PatientMedicineCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientMedicineUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientMedicineUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientMedicineCreateManyPatientInputEnvelope;
    set?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    disconnect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    delete?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    update?: Prisma.PatientMedicineUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientMedicineUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientMedicineUpdateManyWithWhereWithoutPatientInput | Prisma.PatientMedicineUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientMedicineScalarWhereInput | Prisma.PatientMedicineScalarWhereInput[];
};
export type PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutPatientInput, Prisma.PatientMedicineUncheckedCreateWithoutPatientInput> | Prisma.PatientMedicineCreateWithoutPatientInput[] | Prisma.PatientMedicineUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutPatientInput | Prisma.PatientMedicineCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientMedicineUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientMedicineUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientMedicineCreateManyPatientInputEnvelope;
    set?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    disconnect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    delete?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    update?: Prisma.PatientMedicineUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientMedicineUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientMedicineUpdateManyWithWhereWithoutPatientInput | Prisma.PatientMedicineUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientMedicineScalarWhereInput | Prisma.PatientMedicineScalarWhereInput[];
};
export type PatientMedicineCreateNestedManyWithoutTradeNameInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput> | Prisma.PatientMedicineCreateWithoutTradeNameInput[] | Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput | Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput[];
    createMany?: Prisma.PatientMedicineCreateManyTradeNameInputEnvelope;
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
};
export type PatientMedicineUncheckedCreateNestedManyWithoutTradeNameInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput> | Prisma.PatientMedicineCreateWithoutTradeNameInput[] | Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput | Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput[];
    createMany?: Prisma.PatientMedicineCreateManyTradeNameInputEnvelope;
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
};
export type PatientMedicineUpdateManyWithoutTradeNameNestedInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput> | Prisma.PatientMedicineCreateWithoutTradeNameInput[] | Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput | Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput[];
    upsert?: Prisma.PatientMedicineUpsertWithWhereUniqueWithoutTradeNameInput | Prisma.PatientMedicineUpsertWithWhereUniqueWithoutTradeNameInput[];
    createMany?: Prisma.PatientMedicineCreateManyTradeNameInputEnvelope;
    set?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    disconnect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    delete?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    update?: Prisma.PatientMedicineUpdateWithWhereUniqueWithoutTradeNameInput | Prisma.PatientMedicineUpdateWithWhereUniqueWithoutTradeNameInput[];
    updateMany?: Prisma.PatientMedicineUpdateManyWithWhereWithoutTradeNameInput | Prisma.PatientMedicineUpdateManyWithWhereWithoutTradeNameInput[];
    deleteMany?: Prisma.PatientMedicineScalarWhereInput | Prisma.PatientMedicineScalarWhereInput[];
};
export type PatientMedicineUncheckedUpdateManyWithoutTradeNameNestedInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput> | Prisma.PatientMedicineCreateWithoutTradeNameInput[] | Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput | Prisma.PatientMedicineCreateOrConnectWithoutTradeNameInput[];
    upsert?: Prisma.PatientMedicineUpsertWithWhereUniqueWithoutTradeNameInput | Prisma.PatientMedicineUpsertWithWhereUniqueWithoutTradeNameInput[];
    createMany?: Prisma.PatientMedicineCreateManyTradeNameInputEnvelope;
    set?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    disconnect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    delete?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    connect?: Prisma.PatientMedicineWhereUniqueInput | Prisma.PatientMedicineWhereUniqueInput[];
    update?: Prisma.PatientMedicineUpdateWithWhereUniqueWithoutTradeNameInput | Prisma.PatientMedicineUpdateWithWhereUniqueWithoutTradeNameInput[];
    updateMany?: Prisma.PatientMedicineUpdateManyWithWhereWithoutTradeNameInput | Prisma.PatientMedicineUpdateManyWithWhereWithoutTradeNameInput[];
    deleteMany?: Prisma.PatientMedicineScalarWhereInput | Prisma.PatientMedicineScalarWhereInput[];
};
export type PatientMedicineCreateNestedOneWithoutAddMedicineRequestsInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutAddMedicineRequestsInput, Prisma.PatientMedicineUncheckedCreateWithoutAddMedicineRequestsInput>;
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutAddMedicineRequestsInput;
    connect?: Prisma.PatientMedicineWhereUniqueInput;
};
export type PatientMedicineUpdateOneRequiredWithoutAddMedicineRequestsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientMedicineCreateWithoutAddMedicineRequestsInput, Prisma.PatientMedicineUncheckedCreateWithoutAddMedicineRequestsInput>;
    connectOrCreate?: Prisma.PatientMedicineCreateOrConnectWithoutAddMedicineRequestsInput;
    upsert?: Prisma.PatientMedicineUpsertWithoutAddMedicineRequestsInput;
    connect?: Prisma.PatientMedicineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientMedicineUpdateToOneWithWhereWithoutAddMedicineRequestsInput, Prisma.PatientMedicineUpdateWithoutAddMedicineRequestsInput>, Prisma.PatientMedicineUncheckedUpdateWithoutAddMedicineRequestsInput>;
};
export type PatientMedicineCreateWithoutPatientInput = {
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tradeName?: Prisma.TradeNameCreateNestedOneWithoutPatientMedicinesInput;
    addMedicineRequests?: Prisma.AddMedicineRequestCreateNestedManyWithoutPatientMedicineInput;
};
export type PatientMedicineUncheckedCreateWithoutPatientInput = {
    id?: number;
    tradeNameId?: number | null;
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    addMedicineRequests?: Prisma.AddMedicineRequestUncheckedCreateNestedManyWithoutPatientMedicineInput;
};
export type PatientMedicineCreateOrConnectWithoutPatientInput = {
    where: Prisma.PatientMedicineWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientMedicineCreateWithoutPatientInput, Prisma.PatientMedicineUncheckedCreateWithoutPatientInput>;
};
export type PatientMedicineCreateManyPatientInputEnvelope = {
    data: Prisma.PatientMedicineCreateManyPatientInput | Prisma.PatientMedicineCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type PatientMedicineUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientMedicineWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientMedicineUpdateWithoutPatientInput, Prisma.PatientMedicineUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.PatientMedicineCreateWithoutPatientInput, Prisma.PatientMedicineUncheckedCreateWithoutPatientInput>;
};
export type PatientMedicineUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientMedicineWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientMedicineUpdateWithoutPatientInput, Prisma.PatientMedicineUncheckedUpdateWithoutPatientInput>;
};
export type PatientMedicineUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.PatientMedicineScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientMedicineUpdateManyMutationInput, Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientInput>;
};
export type PatientMedicineScalarWhereInput = {
    AND?: Prisma.PatientMedicineScalarWhereInput | Prisma.PatientMedicineScalarWhereInput[];
    OR?: Prisma.PatientMedicineScalarWhereInput[];
    NOT?: Prisma.PatientMedicineScalarWhereInput | Prisma.PatientMedicineScalarWhereInput[];
    id?: Prisma.IntFilter<"PatientMedicine"> | number;
    patientId?: Prisma.IntFilter<"PatientMedicine"> | number;
    tradeNameId?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    medicineName?: Prisma.StringFilter<"PatientMedicine"> | string;
    dosageAmount?: Prisma.DecimalNullableFilter<"PatientMedicine"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    frequencyPeriod?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    frequencyUnit?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    durationValue?: Prisma.IntNullableFilter<"PatientMedicine"> | number | null;
    durationUnit?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"PatientMedicine"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"PatientMedicine"> | Date | string | null;
    isOngoing?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    notes?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    reminderEnabled?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    reminderTimes?: Prisma.JsonNullableFilter<"PatientMedicine">;
    imageUrl?: Prisma.StringNullableFilter<"PatientMedicine"> | string | null;
    isVerified?: Prisma.BoolFilter<"PatientMedicine"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PatientMedicine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientMedicine"> | Date | string;
};
export type PatientMedicineCreateWithoutTradeNameInput = {
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientMedicinesInput;
    addMedicineRequests?: Prisma.AddMedicineRequestCreateNestedManyWithoutPatientMedicineInput;
};
export type PatientMedicineUncheckedCreateWithoutTradeNameInput = {
    id?: number;
    patientId: number;
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    addMedicineRequests?: Prisma.AddMedicineRequestUncheckedCreateNestedManyWithoutPatientMedicineInput;
};
export type PatientMedicineCreateOrConnectWithoutTradeNameInput = {
    where: Prisma.PatientMedicineWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientMedicineCreateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput>;
};
export type PatientMedicineCreateManyTradeNameInputEnvelope = {
    data: Prisma.PatientMedicineCreateManyTradeNameInput | Prisma.PatientMedicineCreateManyTradeNameInput[];
    skipDuplicates?: boolean;
};
export type PatientMedicineUpsertWithWhereUniqueWithoutTradeNameInput = {
    where: Prisma.PatientMedicineWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientMedicineUpdateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedUpdateWithoutTradeNameInput>;
    create: Prisma.XOR<Prisma.PatientMedicineCreateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedCreateWithoutTradeNameInput>;
};
export type PatientMedicineUpdateWithWhereUniqueWithoutTradeNameInput = {
    where: Prisma.PatientMedicineWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientMedicineUpdateWithoutTradeNameInput, Prisma.PatientMedicineUncheckedUpdateWithoutTradeNameInput>;
};
export type PatientMedicineUpdateManyWithWhereWithoutTradeNameInput = {
    where: Prisma.PatientMedicineScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientMedicineUpdateManyMutationInput, Prisma.PatientMedicineUncheckedUpdateManyWithoutTradeNameInput>;
};
export type PatientMedicineCreateWithoutAddMedicineRequestsInput = {
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientMedicinesInput;
    tradeName?: Prisma.TradeNameCreateNestedOneWithoutPatientMedicinesInput;
};
export type PatientMedicineUncheckedCreateWithoutAddMedicineRequestsInput = {
    id?: number;
    patientId: number;
    tradeNameId?: number | null;
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientMedicineCreateOrConnectWithoutAddMedicineRequestsInput = {
    where: Prisma.PatientMedicineWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientMedicineCreateWithoutAddMedicineRequestsInput, Prisma.PatientMedicineUncheckedCreateWithoutAddMedicineRequestsInput>;
};
export type PatientMedicineUpsertWithoutAddMedicineRequestsInput = {
    update: Prisma.XOR<Prisma.PatientMedicineUpdateWithoutAddMedicineRequestsInput, Prisma.PatientMedicineUncheckedUpdateWithoutAddMedicineRequestsInput>;
    create: Prisma.XOR<Prisma.PatientMedicineCreateWithoutAddMedicineRequestsInput, Prisma.PatientMedicineUncheckedCreateWithoutAddMedicineRequestsInput>;
    where?: Prisma.PatientMedicineWhereInput;
};
export type PatientMedicineUpdateToOneWithWhereWithoutAddMedicineRequestsInput = {
    where?: Prisma.PatientMedicineWhereInput;
    data: Prisma.XOR<Prisma.PatientMedicineUpdateWithoutAddMedicineRequestsInput, Prisma.PatientMedicineUncheckedUpdateWithoutAddMedicineRequestsInput>;
};
export type PatientMedicineUpdateWithoutAddMedicineRequestsInput = {
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientMedicinesNestedInput;
    tradeName?: Prisma.TradeNameUpdateOneWithoutPatientMedicinesNestedInput;
};
export type PatientMedicineUncheckedUpdateWithoutAddMedicineRequestsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeNameId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientMedicineCreateManyPatientInput = {
    id?: number;
    tradeNameId?: number | null;
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientMedicineUpdateWithoutPatientInput = {
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tradeName?: Prisma.TradeNameUpdateOneWithoutPatientMedicinesNestedInput;
    addMedicineRequests?: Prisma.AddMedicineRequestUpdateManyWithoutPatientMedicineNestedInput;
};
export type PatientMedicineUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeNameId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addMedicineRequests?: Prisma.AddMedicineRequestUncheckedUpdateManyWithoutPatientMedicineNestedInput;
};
export type PatientMedicineUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeNameId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientMedicineCreateManyTradeNameInput = {
    id?: number;
    patientId: number;
    medicineName: string;
    dosageAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: number | null;
    frequencyPeriod?: number | null;
    frequencyUnit?: string | null;
    durationValue?: number | null;
    durationUnit?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isOngoing?: boolean;
    notes?: string | null;
    reminderEnabled?: boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientMedicineUpdateWithoutTradeNameInput = {
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientMedicinesNestedInput;
    addMedicineRequests?: Prisma.AddMedicineRequestUpdateManyWithoutPatientMedicineNestedInput;
};
export type PatientMedicineUncheckedUpdateWithoutTradeNameInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addMedicineRequests?: Prisma.AddMedicineRequestUncheckedUpdateManyWithoutPatientMedicineNestedInput;
};
export type PatientMedicineUncheckedUpdateManyWithoutTradeNameInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    medicineName?: Prisma.StringFieldUpdateOperationsInput | string;
    dosageAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    frequencyCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyPeriod?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    frequencyUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationValue?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationUnit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isOngoing?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reminderEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reminderTimes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type PatientMedicineCountOutputType
 */
export type PatientMedicineCountOutputType = {
    addMedicineRequests: number;
};
export type PatientMedicineCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    addMedicineRequests?: boolean | PatientMedicineCountOutputTypeCountAddMedicineRequestsArgs;
};
/**
 * PatientMedicineCountOutputType without action
 */
export type PatientMedicineCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicineCountOutputType
     */
    select?: Prisma.PatientMedicineCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PatientMedicineCountOutputType without action
 */
export type PatientMedicineCountOutputTypeCountAddMedicineRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AddMedicineRequestWhereInput;
};
export type PatientMedicineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    tradeNameId?: boolean;
    medicineName?: boolean;
    dosageAmount?: boolean;
    frequencyCount?: boolean;
    frequencyPeriod?: boolean;
    frequencyUnit?: boolean;
    durationValue?: boolean;
    durationUnit?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isOngoing?: boolean;
    notes?: boolean;
    reminderEnabled?: boolean;
    reminderTimes?: boolean;
    imageUrl?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    tradeName?: boolean | Prisma.PatientMedicine$tradeNameArgs<ExtArgs>;
    addMedicineRequests?: boolean | Prisma.PatientMedicine$addMedicineRequestsArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientMedicineCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientMedicine"]>;
export type PatientMedicineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    tradeNameId?: boolean;
    medicineName?: boolean;
    dosageAmount?: boolean;
    frequencyCount?: boolean;
    frequencyPeriod?: boolean;
    frequencyUnit?: boolean;
    durationValue?: boolean;
    durationUnit?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isOngoing?: boolean;
    notes?: boolean;
    reminderEnabled?: boolean;
    reminderTimes?: boolean;
    imageUrl?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    tradeName?: boolean | Prisma.PatientMedicine$tradeNameArgs<ExtArgs>;
}, ExtArgs["result"]["patientMedicine"]>;
export type PatientMedicineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    tradeNameId?: boolean;
    medicineName?: boolean;
    dosageAmount?: boolean;
    frequencyCount?: boolean;
    frequencyPeriod?: boolean;
    frequencyUnit?: boolean;
    durationValue?: boolean;
    durationUnit?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isOngoing?: boolean;
    notes?: boolean;
    reminderEnabled?: boolean;
    reminderTimes?: boolean;
    imageUrl?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    tradeName?: boolean | Prisma.PatientMedicine$tradeNameArgs<ExtArgs>;
}, ExtArgs["result"]["patientMedicine"]>;
export type PatientMedicineSelectScalar = {
    id?: boolean;
    patientId?: boolean;
    tradeNameId?: boolean;
    medicineName?: boolean;
    dosageAmount?: boolean;
    frequencyCount?: boolean;
    frequencyPeriod?: boolean;
    frequencyUnit?: boolean;
    durationValue?: boolean;
    durationUnit?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isOngoing?: boolean;
    notes?: boolean;
    reminderEnabled?: boolean;
    reminderTimes?: boolean;
    imageUrl?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PatientMedicineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "patientId" | "tradeNameId" | "medicineName" | "dosageAmount" | "frequencyCount" | "frequencyPeriod" | "frequencyUnit" | "durationValue" | "durationUnit" | "startDate" | "endDate" | "isOngoing" | "notes" | "reminderEnabled" | "reminderTimes" | "imageUrl" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["patientMedicine"]>;
export type PatientMedicineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    tradeName?: boolean | Prisma.PatientMedicine$tradeNameArgs<ExtArgs>;
    addMedicineRequests?: boolean | Prisma.PatientMedicine$addMedicineRequestsArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientMedicineCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PatientMedicineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    tradeName?: boolean | Prisma.PatientMedicine$tradeNameArgs<ExtArgs>;
};
export type PatientMedicineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    tradeName?: boolean | Prisma.PatientMedicine$tradeNameArgs<ExtArgs>;
};
export type $PatientMedicinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PatientMedicine";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
        tradeName: Prisma.$TradeNamePayload<ExtArgs> | null;
        addMedicineRequests: Prisma.$AddMedicineRequestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        patientId: number;
        tradeNameId: number | null;
        medicineName: string;
        dosageAmount: runtime.Decimal | null;
        frequencyCount: number | null;
        frequencyPeriod: number | null;
        frequencyUnit: string | null;
        durationValue: number | null;
        durationUnit: string | null;
        startDate: Date | null;
        endDate: Date | null;
        isOngoing: boolean;
        notes: string | null;
        reminderEnabled: boolean;
        reminderTimes: runtime.JsonValue | null;
        imageUrl: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["patientMedicine"]>;
    composites: {};
};
export type PatientMedicineGetPayload<S extends boolean | null | undefined | PatientMedicineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload, S>;
export type PatientMedicineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientMedicineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientMedicineCountAggregateInputType | true;
};
export interface PatientMedicineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PatientMedicine'];
        meta: {
            name: 'PatientMedicine';
        };
    };
    /**
     * Find zero or one PatientMedicine that matches the filter.
     * @param {PatientMedicineFindUniqueArgs} args - Arguments to find a PatientMedicine
     * @example
     * // Get one PatientMedicine
     * const patientMedicine = await prisma.patientMedicine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientMedicineFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientMedicineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PatientMedicine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientMedicineFindUniqueOrThrowArgs} args - Arguments to find a PatientMedicine
     * @example
     * // Get one PatientMedicine
     * const patientMedicine = await prisma.patientMedicine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientMedicineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientMedicineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientMedicine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientMedicineFindFirstArgs} args - Arguments to find a PatientMedicine
     * @example
     * // Get one PatientMedicine
     * const patientMedicine = await prisma.patientMedicine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientMedicineFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientMedicineFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientMedicine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientMedicineFindFirstOrThrowArgs} args - Arguments to find a PatientMedicine
     * @example
     * // Get one PatientMedicine
     * const patientMedicine = await prisma.patientMedicine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientMedicineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientMedicineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PatientMedicines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientMedicineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientMedicines
     * const patientMedicines = await prisma.patientMedicine.findMany()
     *
     * // Get first 10 PatientMedicines
     * const patientMedicines = await prisma.patientMedicine.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const patientMedicineWithIdOnly = await prisma.patientMedicine.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PatientMedicineFindManyArgs>(args?: Prisma.SelectSubset<T, PatientMedicineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PatientMedicine.
     * @param {PatientMedicineCreateArgs} args - Arguments to create a PatientMedicine.
     * @example
     * // Create one PatientMedicine
     * const PatientMedicine = await prisma.patientMedicine.create({
     *   data: {
     *     // ... data to create a PatientMedicine
     *   }
     * })
     *
     */
    create<T extends PatientMedicineCreateArgs>(args: Prisma.SelectSubset<T, PatientMedicineCreateArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PatientMedicines.
     * @param {PatientMedicineCreateManyArgs} args - Arguments to create many PatientMedicines.
     * @example
     * // Create many PatientMedicines
     * const patientMedicine = await prisma.patientMedicine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientMedicineCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientMedicineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PatientMedicines and returns the data saved in the database.
     * @param {PatientMedicineCreateManyAndReturnArgs} args - Arguments to create many PatientMedicines.
     * @example
     * // Create many PatientMedicines
     * const patientMedicine = await prisma.patientMedicine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PatientMedicines and only return the `id`
     * const patientMedicineWithIdOnly = await prisma.patientMedicine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientMedicineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientMedicineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PatientMedicine.
     * @param {PatientMedicineDeleteArgs} args - Arguments to delete one PatientMedicine.
     * @example
     * // Delete one PatientMedicine
     * const PatientMedicine = await prisma.patientMedicine.delete({
     *   where: {
     *     // ... filter to delete one PatientMedicine
     *   }
     * })
     *
     */
    delete<T extends PatientMedicineDeleteArgs>(args: Prisma.SelectSubset<T, PatientMedicineDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PatientMedicine.
     * @param {PatientMedicineUpdateArgs} args - Arguments to update one PatientMedicine.
     * @example
     * // Update one PatientMedicine
     * const patientMedicine = await prisma.patientMedicine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientMedicineUpdateArgs>(args: Prisma.SelectSubset<T, PatientMedicineUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PatientMedicines.
     * @param {PatientMedicineDeleteManyArgs} args - Arguments to filter PatientMedicines to delete.
     * @example
     * // Delete a few PatientMedicines
     * const { count } = await prisma.patientMedicine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientMedicineDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientMedicineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientMedicines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientMedicineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientMedicines
     * const patientMedicine = await prisma.patientMedicine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientMedicineUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientMedicineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientMedicines and returns the data updated in the database.
     * @param {PatientMedicineUpdateManyAndReturnArgs} args - Arguments to update many PatientMedicines.
     * @example
     * // Update many PatientMedicines
     * const patientMedicine = await prisma.patientMedicine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PatientMedicines and only return the `id`
     * const patientMedicineWithIdOnly = await prisma.patientMedicine.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PatientMedicineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientMedicineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PatientMedicine.
     * @param {PatientMedicineUpsertArgs} args - Arguments to update or create a PatientMedicine.
     * @example
     * // Update or create a PatientMedicine
     * const patientMedicine = await prisma.patientMedicine.upsert({
     *   create: {
     *     // ... data to create a PatientMedicine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientMedicine we want to update
     *   }
     * })
     */
    upsert<T extends PatientMedicineUpsertArgs>(args: Prisma.SelectSubset<T, PatientMedicineUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientMedicineClient<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PatientMedicines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientMedicineCountArgs} args - Arguments to filter PatientMedicines to count.
     * @example
     * // Count the number of PatientMedicines
     * const count = await prisma.patientMedicine.count({
     *   where: {
     *     // ... the filter for the PatientMedicines we want to count
     *   }
     * })
    **/
    count<T extends PatientMedicineCountArgs>(args?: Prisma.Subset<T, PatientMedicineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientMedicineCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PatientMedicine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientMedicineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientMedicineAggregateArgs>(args: Prisma.Subset<T, PatientMedicineAggregateArgs>): Prisma.PrismaPromise<GetPatientMedicineAggregateType<T>>;
    /**
     * Group by PatientMedicine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientMedicineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends PatientMedicineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientMedicineGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientMedicineGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientMedicineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientMedicineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PatientMedicine model
     */
    readonly fields: PatientMedicineFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PatientMedicine.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientMedicineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tradeName<T extends Prisma.PatientMedicine$tradeNameArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientMedicine$tradeNameArgs<ExtArgs>>): Prisma.Prisma__TradeNameClient<runtime.Types.Result.GetResult<Prisma.$TradeNamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    addMedicineRequests<T extends Prisma.PatientMedicine$addMedicineRequestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientMedicine$addMedicineRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AddMedicineRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the PatientMedicine model
 */
export interface PatientMedicineFieldRefs {
    readonly id: Prisma.FieldRef<"PatientMedicine", 'Int'>;
    readonly patientId: Prisma.FieldRef<"PatientMedicine", 'Int'>;
    readonly tradeNameId: Prisma.FieldRef<"PatientMedicine", 'Int'>;
    readonly medicineName: Prisma.FieldRef<"PatientMedicine", 'String'>;
    readonly dosageAmount: Prisma.FieldRef<"PatientMedicine", 'Decimal'>;
    readonly frequencyCount: Prisma.FieldRef<"PatientMedicine", 'Int'>;
    readonly frequencyPeriod: Prisma.FieldRef<"PatientMedicine", 'Int'>;
    readonly frequencyUnit: Prisma.FieldRef<"PatientMedicine", 'String'>;
    readonly durationValue: Prisma.FieldRef<"PatientMedicine", 'Int'>;
    readonly durationUnit: Prisma.FieldRef<"PatientMedicine", 'String'>;
    readonly startDate: Prisma.FieldRef<"PatientMedicine", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"PatientMedicine", 'DateTime'>;
    readonly isOngoing: Prisma.FieldRef<"PatientMedicine", 'Boolean'>;
    readonly notes: Prisma.FieldRef<"PatientMedicine", 'String'>;
    readonly reminderEnabled: Prisma.FieldRef<"PatientMedicine", 'Boolean'>;
    readonly reminderTimes: Prisma.FieldRef<"PatientMedicine", 'Json'>;
    readonly imageUrl: Prisma.FieldRef<"PatientMedicine", 'String'>;
    readonly isVerified: Prisma.FieldRef<"PatientMedicine", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PatientMedicine", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PatientMedicine", 'DateTime'>;
}
/**
 * PatientMedicine findUnique
 */
export type PatientMedicineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * Filter, which PatientMedicine to fetch.
     */
    where: Prisma.PatientMedicineWhereUniqueInput;
};
/**
 * PatientMedicine findUniqueOrThrow
 */
export type PatientMedicineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * Filter, which PatientMedicine to fetch.
     */
    where: Prisma.PatientMedicineWhereUniqueInput;
};
/**
 * PatientMedicine findFirst
 */
export type PatientMedicineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * Filter, which PatientMedicine to fetch.
     */
    where?: Prisma.PatientMedicineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientMedicines to fetch.
     */
    orderBy?: Prisma.PatientMedicineOrderByWithRelationInput | Prisma.PatientMedicineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientMedicines.
     */
    cursor?: Prisma.PatientMedicineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientMedicines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientMedicines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientMedicines.
     */
    distinct?: Prisma.PatientMedicineScalarFieldEnum | Prisma.PatientMedicineScalarFieldEnum[];
};
/**
 * PatientMedicine findFirstOrThrow
 */
export type PatientMedicineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * Filter, which PatientMedicine to fetch.
     */
    where?: Prisma.PatientMedicineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientMedicines to fetch.
     */
    orderBy?: Prisma.PatientMedicineOrderByWithRelationInput | Prisma.PatientMedicineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientMedicines.
     */
    cursor?: Prisma.PatientMedicineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientMedicines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientMedicines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientMedicines.
     */
    distinct?: Prisma.PatientMedicineScalarFieldEnum | Prisma.PatientMedicineScalarFieldEnum[];
};
/**
 * PatientMedicine findMany
 */
export type PatientMedicineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * Filter, which PatientMedicines to fetch.
     */
    where?: Prisma.PatientMedicineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientMedicines to fetch.
     */
    orderBy?: Prisma.PatientMedicineOrderByWithRelationInput | Prisma.PatientMedicineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PatientMedicines.
     */
    cursor?: Prisma.PatientMedicineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientMedicines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientMedicines.
     */
    skip?: number;
    distinct?: Prisma.PatientMedicineScalarFieldEnum | Prisma.PatientMedicineScalarFieldEnum[];
};
/**
 * PatientMedicine create
 */
export type PatientMedicineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * The data needed to create a PatientMedicine.
     */
    data: Prisma.XOR<Prisma.PatientMedicineCreateInput, Prisma.PatientMedicineUncheckedCreateInput>;
};
/**
 * PatientMedicine createMany
 */
export type PatientMedicineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientMedicines.
     */
    data: Prisma.PatientMedicineCreateManyInput | Prisma.PatientMedicineCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PatientMedicine createManyAndReturn
 */
export type PatientMedicineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * The data used to create many PatientMedicines.
     */
    data: Prisma.PatientMedicineCreateManyInput | Prisma.PatientMedicineCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientMedicine update
 */
export type PatientMedicineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * The data needed to update a PatientMedicine.
     */
    data: Prisma.XOR<Prisma.PatientMedicineUpdateInput, Prisma.PatientMedicineUncheckedUpdateInput>;
    /**
     * Choose, which PatientMedicine to update.
     */
    where: Prisma.PatientMedicineWhereUniqueInput;
};
/**
 * PatientMedicine updateMany
 */
export type PatientMedicineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientMedicines.
     */
    data: Prisma.XOR<Prisma.PatientMedicineUpdateManyMutationInput, Prisma.PatientMedicineUncheckedUpdateManyInput>;
    /**
     * Filter which PatientMedicines to update
     */
    where?: Prisma.PatientMedicineWhereInput;
    /**
     * Limit how many PatientMedicines to update.
     */
    limit?: number;
};
/**
 * PatientMedicine updateManyAndReturn
 */
export type PatientMedicineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * The data used to update PatientMedicines.
     */
    data: Prisma.XOR<Prisma.PatientMedicineUpdateManyMutationInput, Prisma.PatientMedicineUncheckedUpdateManyInput>;
    /**
     * Filter which PatientMedicines to update
     */
    where?: Prisma.PatientMedicineWhereInput;
    /**
     * Limit how many PatientMedicines to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientMedicine upsert
 */
export type PatientMedicineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * The filter to search for the PatientMedicine to update in case it exists.
     */
    where: Prisma.PatientMedicineWhereUniqueInput;
    /**
     * In case the PatientMedicine found by the `where` argument doesn't exist, create a new PatientMedicine with this data.
     */
    create: Prisma.XOR<Prisma.PatientMedicineCreateInput, Prisma.PatientMedicineUncheckedCreateInput>;
    /**
     * In case the PatientMedicine was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientMedicineUpdateInput, Prisma.PatientMedicineUncheckedUpdateInput>;
};
/**
 * PatientMedicine delete
 */
export type PatientMedicineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    /**
     * Filter which PatientMedicine to delete.
     */
    where: Prisma.PatientMedicineWhereUniqueInput;
};
/**
 * PatientMedicine deleteMany
 */
export type PatientMedicineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientMedicines to delete
     */
    where?: Prisma.PatientMedicineWhereInput;
    /**
     * Limit how many PatientMedicines to delete.
     */
    limit?: number;
};
/**
 * PatientMedicine.tradeName
 */
export type PatientMedicine$tradeNameArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeName
     */
    select?: Prisma.TradeNameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TradeName
     */
    omit?: Prisma.TradeNameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TradeNameInclude<ExtArgs> | null;
    where?: Prisma.TradeNameWhereInput;
};
/**
 * PatientMedicine.addMedicineRequests
 */
export type PatientMedicine$addMedicineRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddMedicineRequest
     */
    select?: Prisma.AddMedicineRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AddMedicineRequest
     */
    omit?: Prisma.AddMedicineRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AddMedicineRequestInclude<ExtArgs> | null;
    where?: Prisma.AddMedicineRequestWhereInput;
    orderBy?: Prisma.AddMedicineRequestOrderByWithRelationInput | Prisma.AddMedicineRequestOrderByWithRelationInput[];
    cursor?: Prisma.AddMedicineRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AddMedicineRequestScalarFieldEnum | Prisma.AddMedicineRequestScalarFieldEnum[];
};
/**
 * PatientMedicine without action
 */
export type PatientMedicineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PatientMedicine.d.ts.map