import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Lifestyle
 *
 */
export type LifestyleModel = runtime.Types.Result.DefaultSelection<Prisma.$LifestylePayload>;
export type AggregateLifestyle = {
    _count: LifestyleCountAggregateOutputType | null;
    _avg: LifestyleAvgAggregateOutputType | null;
    _sum: LifestyleSumAggregateOutputType | null;
    _min: LifestyleMinAggregateOutputType | null;
    _max: LifestyleMaxAggregateOutputType | null;
};
export type LifestyleAvgAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    waterDaily: runtime.Decimal | null;
};
export type LifestyleSumAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    waterDaily: runtime.Decimal | null;
};
export type LifestyleMinAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    noGlasses: boolean | null;
    alcoholAbuse: boolean | null;
    excessCaffeine: boolean | null;
    waterDaily: runtime.Decimal | null;
    travellerAbroad: boolean | null;
    annualVaccination: boolean | null;
    surgeriesLast3Months: boolean | null;
    surgeriesDetails: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LifestyleMaxAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    noGlasses: boolean | null;
    alcoholAbuse: boolean | null;
    excessCaffeine: boolean | null;
    waterDaily: runtime.Decimal | null;
    travellerAbroad: boolean | null;
    annualVaccination: boolean | null;
    surgeriesLast3Months: boolean | null;
    surgeriesDetails: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LifestyleCountAggregateOutputType = {
    id: number;
    patientId: number;
    noGlasses: number;
    alcoholAbuse: number;
    excessCaffeine: number;
    waterDaily: number;
    travellerAbroad: number;
    annualVaccination: number;
    surgeriesLast3Months: number;
    surgeriesDetails: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LifestyleAvgAggregateInputType = {
    id?: true;
    patientId?: true;
    waterDaily?: true;
};
export type LifestyleSumAggregateInputType = {
    id?: true;
    patientId?: true;
    waterDaily?: true;
};
export type LifestyleMinAggregateInputType = {
    id?: true;
    patientId?: true;
    noGlasses?: true;
    alcoholAbuse?: true;
    excessCaffeine?: true;
    waterDaily?: true;
    travellerAbroad?: true;
    annualVaccination?: true;
    surgeriesLast3Months?: true;
    surgeriesDetails?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LifestyleMaxAggregateInputType = {
    id?: true;
    patientId?: true;
    noGlasses?: true;
    alcoholAbuse?: true;
    excessCaffeine?: true;
    waterDaily?: true;
    travellerAbroad?: true;
    annualVaccination?: true;
    surgeriesLast3Months?: true;
    surgeriesDetails?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LifestyleCountAggregateInputType = {
    id?: true;
    patientId?: true;
    noGlasses?: true;
    alcoholAbuse?: true;
    excessCaffeine?: true;
    waterDaily?: true;
    travellerAbroad?: true;
    annualVaccination?: true;
    surgeriesLast3Months?: true;
    surgeriesDetails?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LifestyleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Lifestyle to aggregate.
     */
    where?: Prisma.LifestyleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lifestyles to fetch.
     */
    orderBy?: Prisma.LifestyleOrderByWithRelationInput | Prisma.LifestyleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LifestyleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lifestyles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lifestyles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Lifestyles
    **/
    _count?: true | LifestyleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: LifestyleAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: LifestyleSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LifestyleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LifestyleMaxAggregateInputType;
};
export type GetLifestyleAggregateType<T extends LifestyleAggregateArgs> = {
    [P in keyof T & keyof AggregateLifestyle]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLifestyle[P]> : Prisma.GetScalarType<T[P], AggregateLifestyle[P]>;
};
export type LifestyleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LifestyleWhereInput;
    orderBy?: Prisma.LifestyleOrderByWithAggregationInput | Prisma.LifestyleOrderByWithAggregationInput[];
    by: Prisma.LifestyleScalarFieldEnum[] | Prisma.LifestyleScalarFieldEnum;
    having?: Prisma.LifestyleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LifestyleCountAggregateInputType | true;
    _avg?: LifestyleAvgAggregateInputType;
    _sum?: LifestyleSumAggregateInputType;
    _min?: LifestyleMinAggregateInputType;
    _max?: LifestyleMaxAggregateInputType;
};
export type LifestyleGroupByOutputType = {
    id: number;
    patientId: number;
    noGlasses: boolean;
    alcoholAbuse: boolean;
    excessCaffeine: boolean;
    waterDaily: runtime.Decimal | null;
    travellerAbroad: boolean;
    annualVaccination: boolean;
    surgeriesLast3Months: boolean;
    surgeriesDetails: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LifestyleCountAggregateOutputType | null;
    _avg: LifestyleAvgAggregateOutputType | null;
    _sum: LifestyleSumAggregateOutputType | null;
    _min: LifestyleMinAggregateOutputType | null;
    _max: LifestyleMaxAggregateOutputType | null;
};
type GetLifestyleGroupByPayload<T extends LifestyleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LifestyleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LifestyleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LifestyleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LifestyleGroupByOutputType[P]>;
}>>;
export type LifestyleWhereInput = {
    AND?: Prisma.LifestyleWhereInput | Prisma.LifestyleWhereInput[];
    OR?: Prisma.LifestyleWhereInput[];
    NOT?: Prisma.LifestyleWhereInput | Prisma.LifestyleWhereInput[];
    id?: Prisma.IntFilter<"Lifestyle"> | number;
    patientId?: Prisma.IntFilter<"Lifestyle"> | number;
    noGlasses?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    alcoholAbuse?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    excessCaffeine?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    waterDaily?: Prisma.DecimalNullableFilter<"Lifestyle"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    annualVaccination?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    surgeriesLast3Months?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    surgeriesDetails?: Prisma.StringNullableFilter<"Lifestyle"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Lifestyle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lifestyle"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
};
export type LifestyleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    noGlasses?: Prisma.SortOrder;
    alcoholAbuse?: Prisma.SortOrder;
    excessCaffeine?: Prisma.SortOrder;
    waterDaily?: Prisma.SortOrderInput | Prisma.SortOrder;
    travellerAbroad?: Prisma.SortOrder;
    annualVaccination?: Prisma.SortOrder;
    surgeriesLast3Months?: Prisma.SortOrder;
    surgeriesDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
};
export type LifestyleWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    patientId?: number;
    AND?: Prisma.LifestyleWhereInput | Prisma.LifestyleWhereInput[];
    OR?: Prisma.LifestyleWhereInput[];
    NOT?: Prisma.LifestyleWhereInput | Prisma.LifestyleWhereInput[];
    noGlasses?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    alcoholAbuse?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    excessCaffeine?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    waterDaily?: Prisma.DecimalNullableFilter<"Lifestyle"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    annualVaccination?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    surgeriesLast3Months?: Prisma.BoolFilter<"Lifestyle"> | boolean;
    surgeriesDetails?: Prisma.StringNullableFilter<"Lifestyle"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Lifestyle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Lifestyle"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
}, "id" | "patientId">;
export type LifestyleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    noGlasses?: Prisma.SortOrder;
    alcoholAbuse?: Prisma.SortOrder;
    excessCaffeine?: Prisma.SortOrder;
    waterDaily?: Prisma.SortOrderInput | Prisma.SortOrder;
    travellerAbroad?: Prisma.SortOrder;
    annualVaccination?: Prisma.SortOrder;
    surgeriesLast3Months?: Prisma.SortOrder;
    surgeriesDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LifestyleCountOrderByAggregateInput;
    _avg?: Prisma.LifestyleAvgOrderByAggregateInput;
    _max?: Prisma.LifestyleMaxOrderByAggregateInput;
    _min?: Prisma.LifestyleMinOrderByAggregateInput;
    _sum?: Prisma.LifestyleSumOrderByAggregateInput;
};
export type LifestyleScalarWhereWithAggregatesInput = {
    AND?: Prisma.LifestyleScalarWhereWithAggregatesInput | Prisma.LifestyleScalarWhereWithAggregatesInput[];
    OR?: Prisma.LifestyleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LifestyleScalarWhereWithAggregatesInput | Prisma.LifestyleScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Lifestyle"> | number;
    patientId?: Prisma.IntWithAggregatesFilter<"Lifestyle"> | number;
    noGlasses?: Prisma.BoolWithAggregatesFilter<"Lifestyle"> | boolean;
    alcoholAbuse?: Prisma.BoolWithAggregatesFilter<"Lifestyle"> | boolean;
    excessCaffeine?: Prisma.BoolWithAggregatesFilter<"Lifestyle"> | boolean;
    waterDaily?: Prisma.DecimalNullableWithAggregatesFilter<"Lifestyle"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolWithAggregatesFilter<"Lifestyle"> | boolean;
    annualVaccination?: Prisma.BoolWithAggregatesFilter<"Lifestyle"> | boolean;
    surgeriesLast3Months?: Prisma.BoolWithAggregatesFilter<"Lifestyle"> | boolean;
    surgeriesDetails?: Prisma.StringNullableWithAggregatesFilter<"Lifestyle"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Lifestyle"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Lifestyle"> | Date | string;
};
export type LifestyleCreateInput = {
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutLifestyleInput;
};
export type LifestyleUncheckedCreateInput = {
    id?: number;
    patientId: number;
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LifestyleUpdateInput = {
    noGlasses?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alcoholAbuse?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    excessCaffeine?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    waterDaily?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    annualVaccination?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesLast3Months?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutLifestyleNestedInput;
};
export type LifestyleUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    noGlasses?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alcoholAbuse?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    excessCaffeine?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    waterDaily?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    annualVaccination?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesLast3Months?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifestyleCreateManyInput = {
    id?: number;
    patientId: number;
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LifestyleUpdateManyMutationInput = {
    noGlasses?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alcoholAbuse?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    excessCaffeine?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    waterDaily?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    annualVaccination?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesLast3Months?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifestyleUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    noGlasses?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alcoholAbuse?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    excessCaffeine?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    waterDaily?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    annualVaccination?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesLast3Months?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifestyleNullableScalarRelationFilter = {
    is?: Prisma.LifestyleWhereInput | null;
    isNot?: Prisma.LifestyleWhereInput | null;
};
export type LifestyleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    noGlasses?: Prisma.SortOrder;
    alcoholAbuse?: Prisma.SortOrder;
    excessCaffeine?: Prisma.SortOrder;
    waterDaily?: Prisma.SortOrder;
    travellerAbroad?: Prisma.SortOrder;
    annualVaccination?: Prisma.SortOrder;
    surgeriesLast3Months?: Prisma.SortOrder;
    surgeriesDetails?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LifestyleAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    waterDaily?: Prisma.SortOrder;
};
export type LifestyleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    noGlasses?: Prisma.SortOrder;
    alcoholAbuse?: Prisma.SortOrder;
    excessCaffeine?: Prisma.SortOrder;
    waterDaily?: Prisma.SortOrder;
    travellerAbroad?: Prisma.SortOrder;
    annualVaccination?: Prisma.SortOrder;
    surgeriesLast3Months?: Prisma.SortOrder;
    surgeriesDetails?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LifestyleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    noGlasses?: Prisma.SortOrder;
    alcoholAbuse?: Prisma.SortOrder;
    excessCaffeine?: Prisma.SortOrder;
    waterDaily?: Prisma.SortOrder;
    travellerAbroad?: Prisma.SortOrder;
    annualVaccination?: Prisma.SortOrder;
    surgeriesLast3Months?: Prisma.SortOrder;
    surgeriesDetails?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LifestyleSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    waterDaily?: Prisma.SortOrder;
};
export type LifestyleCreateNestedOneWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.LifestyleCreateWithoutPatientInput, Prisma.LifestyleUncheckedCreateWithoutPatientInput>;
    connectOrCreate?: Prisma.LifestyleCreateOrConnectWithoutPatientInput;
    connect?: Prisma.LifestyleWhereUniqueInput;
};
export type LifestyleUncheckedCreateNestedOneWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.LifestyleCreateWithoutPatientInput, Prisma.LifestyleUncheckedCreateWithoutPatientInput>;
    connectOrCreate?: Prisma.LifestyleCreateOrConnectWithoutPatientInput;
    connect?: Prisma.LifestyleWhereUniqueInput;
};
export type LifestyleUpdateOneWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.LifestyleCreateWithoutPatientInput, Prisma.LifestyleUncheckedCreateWithoutPatientInput>;
    connectOrCreate?: Prisma.LifestyleCreateOrConnectWithoutPatientInput;
    upsert?: Prisma.LifestyleUpsertWithoutPatientInput;
    disconnect?: Prisma.LifestyleWhereInput | boolean;
    delete?: Prisma.LifestyleWhereInput | boolean;
    connect?: Prisma.LifestyleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LifestyleUpdateToOneWithWhereWithoutPatientInput, Prisma.LifestyleUpdateWithoutPatientInput>, Prisma.LifestyleUncheckedUpdateWithoutPatientInput>;
};
export type LifestyleUncheckedUpdateOneWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.LifestyleCreateWithoutPatientInput, Prisma.LifestyleUncheckedCreateWithoutPatientInput>;
    connectOrCreate?: Prisma.LifestyleCreateOrConnectWithoutPatientInput;
    upsert?: Prisma.LifestyleUpsertWithoutPatientInput;
    disconnect?: Prisma.LifestyleWhereInput | boolean;
    delete?: Prisma.LifestyleWhereInput | boolean;
    connect?: Prisma.LifestyleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LifestyleUpdateToOneWithWhereWithoutPatientInput, Prisma.LifestyleUpdateWithoutPatientInput>, Prisma.LifestyleUncheckedUpdateWithoutPatientInput>;
};
export type LifestyleCreateWithoutPatientInput = {
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LifestyleUncheckedCreateWithoutPatientInput = {
    id?: number;
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LifestyleCreateOrConnectWithoutPatientInput = {
    where: Prisma.LifestyleWhereUniqueInput;
    create: Prisma.XOR<Prisma.LifestyleCreateWithoutPatientInput, Prisma.LifestyleUncheckedCreateWithoutPatientInput>;
};
export type LifestyleUpsertWithoutPatientInput = {
    update: Prisma.XOR<Prisma.LifestyleUpdateWithoutPatientInput, Prisma.LifestyleUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.LifestyleCreateWithoutPatientInput, Prisma.LifestyleUncheckedCreateWithoutPatientInput>;
    where?: Prisma.LifestyleWhereInput;
};
export type LifestyleUpdateToOneWithWhereWithoutPatientInput = {
    where?: Prisma.LifestyleWhereInput;
    data: Prisma.XOR<Prisma.LifestyleUpdateWithoutPatientInput, Prisma.LifestyleUncheckedUpdateWithoutPatientInput>;
};
export type LifestyleUpdateWithoutPatientInput = {
    noGlasses?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alcoholAbuse?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    excessCaffeine?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    waterDaily?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    annualVaccination?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesLast3Months?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifestyleUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    noGlasses?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    alcoholAbuse?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    excessCaffeine?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    waterDaily?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    travellerAbroad?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    annualVaccination?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesLast3Months?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    surgeriesDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LifestyleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: boolean;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lifestyle"]>;
export type LifestyleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: boolean;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lifestyle"]>;
export type LifestyleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: boolean;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lifestyle"]>;
export type LifestyleSelectScalar = {
    id?: boolean;
    patientId?: boolean;
    noGlasses?: boolean;
    alcoholAbuse?: boolean;
    excessCaffeine?: boolean;
    waterDaily?: boolean;
    travellerAbroad?: boolean;
    annualVaccination?: boolean;
    surgeriesLast3Months?: boolean;
    surgeriesDetails?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LifestyleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "patientId" | "noGlasses" | "alcoholAbuse" | "excessCaffeine" | "waterDaily" | "travellerAbroad" | "annualVaccination" | "surgeriesLast3Months" | "surgeriesDetails" | "createdAt" | "updatedAt", ExtArgs["result"]["lifestyle"]>;
export type LifestyleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type LifestyleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type LifestyleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type $LifestylePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Lifestyle";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        patientId: number;
        noGlasses: boolean;
        alcoholAbuse: boolean;
        excessCaffeine: boolean;
        waterDaily: runtime.Decimal | null;
        travellerAbroad: boolean;
        annualVaccination: boolean;
        surgeriesLast3Months: boolean;
        surgeriesDetails: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["lifestyle"]>;
    composites: {};
};
export type LifestyleGetPayload<S extends boolean | null | undefined | LifestyleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LifestylePayload, S>;
export type LifestyleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LifestyleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LifestyleCountAggregateInputType | true;
};
export interface LifestyleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Lifestyle'];
        meta: {
            name: 'Lifestyle';
        };
    };
    /**
     * Find zero or one Lifestyle that matches the filter.
     * @param {LifestyleFindUniqueArgs} args - Arguments to find a Lifestyle
     * @example
     * // Get one Lifestyle
     * const lifestyle = await prisma.lifestyle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LifestyleFindUniqueArgs>(args: Prisma.SelectSubset<T, LifestyleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Lifestyle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LifestyleFindUniqueOrThrowArgs} args - Arguments to find a Lifestyle
     * @example
     * // Get one Lifestyle
     * const lifestyle = await prisma.lifestyle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LifestyleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LifestyleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Lifestyle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifestyleFindFirstArgs} args - Arguments to find a Lifestyle
     * @example
     * // Get one Lifestyle
     * const lifestyle = await prisma.lifestyle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LifestyleFindFirstArgs>(args?: Prisma.SelectSubset<T, LifestyleFindFirstArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Lifestyle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifestyleFindFirstOrThrowArgs} args - Arguments to find a Lifestyle
     * @example
     * // Get one Lifestyle
     * const lifestyle = await prisma.lifestyle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LifestyleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LifestyleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Lifestyles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifestyleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lifestyles
     * const lifestyles = await prisma.lifestyle.findMany()
     *
     * // Get first 10 Lifestyles
     * const lifestyles = await prisma.lifestyle.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const lifestyleWithIdOnly = await prisma.lifestyle.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LifestyleFindManyArgs>(args?: Prisma.SelectSubset<T, LifestyleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Lifestyle.
     * @param {LifestyleCreateArgs} args - Arguments to create a Lifestyle.
     * @example
     * // Create one Lifestyle
     * const Lifestyle = await prisma.lifestyle.create({
     *   data: {
     *     // ... data to create a Lifestyle
     *   }
     * })
     *
     */
    create<T extends LifestyleCreateArgs>(args: Prisma.SelectSubset<T, LifestyleCreateArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Lifestyles.
     * @param {LifestyleCreateManyArgs} args - Arguments to create many Lifestyles.
     * @example
     * // Create many Lifestyles
     * const lifestyle = await prisma.lifestyle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LifestyleCreateManyArgs>(args?: Prisma.SelectSubset<T, LifestyleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Lifestyles and returns the data saved in the database.
     * @param {LifestyleCreateManyAndReturnArgs} args - Arguments to create many Lifestyles.
     * @example
     * // Create many Lifestyles
     * const lifestyle = await prisma.lifestyle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Lifestyles and only return the `id`
     * const lifestyleWithIdOnly = await prisma.lifestyle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LifestyleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LifestyleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Lifestyle.
     * @param {LifestyleDeleteArgs} args - Arguments to delete one Lifestyle.
     * @example
     * // Delete one Lifestyle
     * const Lifestyle = await prisma.lifestyle.delete({
     *   where: {
     *     // ... filter to delete one Lifestyle
     *   }
     * })
     *
     */
    delete<T extends LifestyleDeleteArgs>(args: Prisma.SelectSubset<T, LifestyleDeleteArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Lifestyle.
     * @param {LifestyleUpdateArgs} args - Arguments to update one Lifestyle.
     * @example
     * // Update one Lifestyle
     * const lifestyle = await prisma.lifestyle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LifestyleUpdateArgs>(args: Prisma.SelectSubset<T, LifestyleUpdateArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Lifestyles.
     * @param {LifestyleDeleteManyArgs} args - Arguments to filter Lifestyles to delete.
     * @example
     * // Delete a few Lifestyles
     * const { count } = await prisma.lifestyle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LifestyleDeleteManyArgs>(args?: Prisma.SelectSubset<T, LifestyleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Lifestyles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifestyleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lifestyles
     * const lifestyle = await prisma.lifestyle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LifestyleUpdateManyArgs>(args: Prisma.SelectSubset<T, LifestyleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Lifestyles and returns the data updated in the database.
     * @param {LifestyleUpdateManyAndReturnArgs} args - Arguments to update many Lifestyles.
     * @example
     * // Update many Lifestyles
     * const lifestyle = await prisma.lifestyle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Lifestyles and only return the `id`
     * const lifestyleWithIdOnly = await prisma.lifestyle.updateManyAndReturn({
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
    updateManyAndReturn<T extends LifestyleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LifestyleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Lifestyle.
     * @param {LifestyleUpsertArgs} args - Arguments to update or create a Lifestyle.
     * @example
     * // Update or create a Lifestyle
     * const lifestyle = await prisma.lifestyle.upsert({
     *   create: {
     *     // ... data to create a Lifestyle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lifestyle we want to update
     *   }
     * })
     */
    upsert<T extends LifestyleUpsertArgs>(args: Prisma.SelectSubset<T, LifestyleUpsertArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Lifestyles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifestyleCountArgs} args - Arguments to filter Lifestyles to count.
     * @example
     * // Count the number of Lifestyles
     * const count = await prisma.lifestyle.count({
     *   where: {
     *     // ... the filter for the Lifestyles we want to count
     *   }
     * })
    **/
    count<T extends LifestyleCountArgs>(args?: Prisma.Subset<T, LifestyleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LifestyleCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Lifestyle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifestyleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LifestyleAggregateArgs>(args: Prisma.Subset<T, LifestyleAggregateArgs>): Prisma.PrismaPromise<GetLifestyleAggregateType<T>>;
    /**
     * Group by Lifestyle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LifestyleGroupByArgs} args - Group by arguments.
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
    groupBy<T extends LifestyleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LifestyleGroupByArgs['orderBy'];
    } : {
        orderBy?: LifestyleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LifestyleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLifestyleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Lifestyle model
     */
    readonly fields: LifestyleFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Lifestyle.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LifestyleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the Lifestyle model
 */
export interface LifestyleFieldRefs {
    readonly id: Prisma.FieldRef<"Lifestyle", 'Int'>;
    readonly patientId: Prisma.FieldRef<"Lifestyle", 'Int'>;
    readonly noGlasses: Prisma.FieldRef<"Lifestyle", 'Boolean'>;
    readonly alcoholAbuse: Prisma.FieldRef<"Lifestyle", 'Boolean'>;
    readonly excessCaffeine: Prisma.FieldRef<"Lifestyle", 'Boolean'>;
    readonly waterDaily: Prisma.FieldRef<"Lifestyle", 'Decimal'>;
    readonly travellerAbroad: Prisma.FieldRef<"Lifestyle", 'Boolean'>;
    readonly annualVaccination: Prisma.FieldRef<"Lifestyle", 'Boolean'>;
    readonly surgeriesLast3Months: Prisma.FieldRef<"Lifestyle", 'Boolean'>;
    readonly surgeriesDetails: Prisma.FieldRef<"Lifestyle", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Lifestyle", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Lifestyle", 'DateTime'>;
}
/**
 * Lifestyle findUnique
 */
export type LifestyleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * Filter, which Lifestyle to fetch.
     */
    where: Prisma.LifestyleWhereUniqueInput;
};
/**
 * Lifestyle findUniqueOrThrow
 */
export type LifestyleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * Filter, which Lifestyle to fetch.
     */
    where: Prisma.LifestyleWhereUniqueInput;
};
/**
 * Lifestyle findFirst
 */
export type LifestyleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * Filter, which Lifestyle to fetch.
     */
    where?: Prisma.LifestyleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lifestyles to fetch.
     */
    orderBy?: Prisma.LifestyleOrderByWithRelationInput | Prisma.LifestyleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Lifestyles.
     */
    cursor?: Prisma.LifestyleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lifestyles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lifestyles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Lifestyles.
     */
    distinct?: Prisma.LifestyleScalarFieldEnum | Prisma.LifestyleScalarFieldEnum[];
};
/**
 * Lifestyle findFirstOrThrow
 */
export type LifestyleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * Filter, which Lifestyle to fetch.
     */
    where?: Prisma.LifestyleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lifestyles to fetch.
     */
    orderBy?: Prisma.LifestyleOrderByWithRelationInput | Prisma.LifestyleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Lifestyles.
     */
    cursor?: Prisma.LifestyleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lifestyles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lifestyles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Lifestyles.
     */
    distinct?: Prisma.LifestyleScalarFieldEnum | Prisma.LifestyleScalarFieldEnum[];
};
/**
 * Lifestyle findMany
 */
export type LifestyleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * Filter, which Lifestyles to fetch.
     */
    where?: Prisma.LifestyleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Lifestyles to fetch.
     */
    orderBy?: Prisma.LifestyleOrderByWithRelationInput | Prisma.LifestyleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Lifestyles.
     */
    cursor?: Prisma.LifestyleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Lifestyles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Lifestyles.
     */
    skip?: number;
    distinct?: Prisma.LifestyleScalarFieldEnum | Prisma.LifestyleScalarFieldEnum[];
};
/**
 * Lifestyle create
 */
export type LifestyleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * The data needed to create a Lifestyle.
     */
    data: Prisma.XOR<Prisma.LifestyleCreateInput, Prisma.LifestyleUncheckedCreateInput>;
};
/**
 * Lifestyle createMany
 */
export type LifestyleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lifestyles.
     */
    data: Prisma.LifestyleCreateManyInput | Prisma.LifestyleCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Lifestyle createManyAndReturn
 */
export type LifestyleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * The data used to create many Lifestyles.
     */
    data: Prisma.LifestyleCreateManyInput | Prisma.LifestyleCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Lifestyle update
 */
export type LifestyleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * The data needed to update a Lifestyle.
     */
    data: Prisma.XOR<Prisma.LifestyleUpdateInput, Prisma.LifestyleUncheckedUpdateInput>;
    /**
     * Choose, which Lifestyle to update.
     */
    where: Prisma.LifestyleWhereUniqueInput;
};
/**
 * Lifestyle updateMany
 */
export type LifestyleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Lifestyles.
     */
    data: Prisma.XOR<Prisma.LifestyleUpdateManyMutationInput, Prisma.LifestyleUncheckedUpdateManyInput>;
    /**
     * Filter which Lifestyles to update
     */
    where?: Prisma.LifestyleWhereInput;
    /**
     * Limit how many Lifestyles to update.
     */
    limit?: number;
};
/**
 * Lifestyle updateManyAndReturn
 */
export type LifestyleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * The data used to update Lifestyles.
     */
    data: Prisma.XOR<Prisma.LifestyleUpdateManyMutationInput, Prisma.LifestyleUncheckedUpdateManyInput>;
    /**
     * Filter which Lifestyles to update
     */
    where?: Prisma.LifestyleWhereInput;
    /**
     * Limit how many Lifestyles to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Lifestyle upsert
 */
export type LifestyleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * The filter to search for the Lifestyle to update in case it exists.
     */
    where: Prisma.LifestyleWhereUniqueInput;
    /**
     * In case the Lifestyle found by the `where` argument doesn't exist, create a new Lifestyle with this data.
     */
    create: Prisma.XOR<Prisma.LifestyleCreateInput, Prisma.LifestyleUncheckedCreateInput>;
    /**
     * In case the Lifestyle was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LifestyleUpdateInput, Prisma.LifestyleUncheckedUpdateInput>;
};
/**
 * Lifestyle delete
 */
export type LifestyleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    /**
     * Filter which Lifestyle to delete.
     */
    where: Prisma.LifestyleWhereUniqueInput;
};
/**
 * Lifestyle deleteMany
 */
export type LifestyleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Lifestyles to delete
     */
    where?: Prisma.LifestyleWhereInput;
    /**
     * Limit how many Lifestyles to delete.
     */
    limit?: number;
};
/**
 * Lifestyle without action
 */
export type LifestyleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Lifestyle.d.ts.map