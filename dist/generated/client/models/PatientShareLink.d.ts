import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PatientShareLink
 *
 */
export type PatientShareLinkModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientShareLinkPayload>;
export type AggregatePatientShareLink = {
    _count: PatientShareLinkCountAggregateOutputType | null;
    _avg: PatientShareLinkAvgAggregateOutputType | null;
    _sum: PatientShareLinkSumAggregateOutputType | null;
    _min: PatientShareLinkMinAggregateOutputType | null;
    _max: PatientShareLinkMaxAggregateOutputType | null;
};
export type PatientShareLinkAvgAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    doctorId: number | null;
    accessCount: number | null;
};
export type PatientShareLinkSumAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    doctorId: number | null;
    accessCount: number | null;
};
export type PatientShareLinkMinAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    doctorId: number | null;
    shareToken: string | null;
    expiresAt: Date | null;
    isActive: boolean | null;
    accessCount: number | null;
    lastAccessedAt: Date | null;
    createdAt: Date | null;
};
export type PatientShareLinkMaxAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    doctorId: number | null;
    shareToken: string | null;
    expiresAt: Date | null;
    isActive: boolean | null;
    accessCount: number | null;
    lastAccessedAt: Date | null;
    createdAt: Date | null;
};
export type PatientShareLinkCountAggregateOutputType = {
    id: number;
    patientId: number;
    doctorId: number;
    shareToken: number;
    expiresAt: number;
    isActive: number;
    accessCount: number;
    lastAccessedAt: number;
    createdAt: number;
    _all: number;
};
export type PatientShareLinkAvgAggregateInputType = {
    id?: true;
    patientId?: true;
    doctorId?: true;
    accessCount?: true;
};
export type PatientShareLinkSumAggregateInputType = {
    id?: true;
    patientId?: true;
    doctorId?: true;
    accessCount?: true;
};
export type PatientShareLinkMinAggregateInputType = {
    id?: true;
    patientId?: true;
    doctorId?: true;
    shareToken?: true;
    expiresAt?: true;
    isActive?: true;
    accessCount?: true;
    lastAccessedAt?: true;
    createdAt?: true;
};
export type PatientShareLinkMaxAggregateInputType = {
    id?: true;
    patientId?: true;
    doctorId?: true;
    shareToken?: true;
    expiresAt?: true;
    isActive?: true;
    accessCount?: true;
    lastAccessedAt?: true;
    createdAt?: true;
};
export type PatientShareLinkCountAggregateInputType = {
    id?: true;
    patientId?: true;
    doctorId?: true;
    shareToken?: true;
    expiresAt?: true;
    isActive?: true;
    accessCount?: true;
    lastAccessedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type PatientShareLinkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientShareLink to aggregate.
     */
    where?: Prisma.PatientShareLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientShareLinks to fetch.
     */
    orderBy?: Prisma.PatientShareLinkOrderByWithRelationInput | Prisma.PatientShareLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientShareLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientShareLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientShareLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PatientShareLinks
    **/
    _count?: true | PatientShareLinkCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PatientShareLinkAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PatientShareLinkSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientShareLinkMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientShareLinkMaxAggregateInputType;
};
export type GetPatientShareLinkAggregateType<T extends PatientShareLinkAggregateArgs> = {
    [P in keyof T & keyof AggregatePatientShareLink]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatientShareLink[P]> : Prisma.GetScalarType<T[P], AggregatePatientShareLink[P]>;
};
export type PatientShareLinkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientShareLinkWhereInput;
    orderBy?: Prisma.PatientShareLinkOrderByWithAggregationInput | Prisma.PatientShareLinkOrderByWithAggregationInput[];
    by: Prisma.PatientShareLinkScalarFieldEnum[] | Prisma.PatientShareLinkScalarFieldEnum;
    having?: Prisma.PatientShareLinkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientShareLinkCountAggregateInputType | true;
    _avg?: PatientShareLinkAvgAggregateInputType;
    _sum?: PatientShareLinkSumAggregateInputType;
    _min?: PatientShareLinkMinAggregateInputType;
    _max?: PatientShareLinkMaxAggregateInputType;
};
export type PatientShareLinkGroupByOutputType = {
    id: number;
    patientId: number;
    doctorId: number | null;
    shareToken: string;
    expiresAt: Date | null;
    isActive: boolean;
    accessCount: number;
    lastAccessedAt: Date | null;
    createdAt: Date;
    _count: PatientShareLinkCountAggregateOutputType | null;
    _avg: PatientShareLinkAvgAggregateOutputType | null;
    _sum: PatientShareLinkSumAggregateOutputType | null;
    _min: PatientShareLinkMinAggregateOutputType | null;
    _max: PatientShareLinkMaxAggregateOutputType | null;
};
type GetPatientShareLinkGroupByPayload<T extends PatientShareLinkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientShareLinkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientShareLinkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientShareLinkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientShareLinkGroupByOutputType[P]>;
}>>;
export type PatientShareLinkWhereInput = {
    AND?: Prisma.PatientShareLinkWhereInput | Prisma.PatientShareLinkWhereInput[];
    OR?: Prisma.PatientShareLinkWhereInput[];
    NOT?: Prisma.PatientShareLinkWhereInput | Prisma.PatientShareLinkWhereInput[];
    id?: Prisma.IntFilter<"PatientShareLink"> | number;
    patientId?: Prisma.IntFilter<"PatientShareLink"> | number;
    doctorId?: Prisma.IntNullableFilter<"PatientShareLink"> | number | null;
    shareToken?: Prisma.StringFilter<"PatientShareLink"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"PatientShareLink"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"PatientShareLink"> | boolean;
    accessCount?: Prisma.IntFilter<"PatientShareLink"> | number;
    lastAccessedAt?: Prisma.DateTimeNullableFilter<"PatientShareLink"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientShareLink"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    doctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
};
export type PatientShareLinkOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    shareToken?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    accessCount?: Prisma.SortOrder;
    lastAccessedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
    doctor?: Prisma.DoctorOrderByWithRelationInput;
};
export type PatientShareLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    shareToken?: string;
    AND?: Prisma.PatientShareLinkWhereInput | Prisma.PatientShareLinkWhereInput[];
    OR?: Prisma.PatientShareLinkWhereInput[];
    NOT?: Prisma.PatientShareLinkWhereInput | Prisma.PatientShareLinkWhereInput[];
    patientId?: Prisma.IntFilter<"PatientShareLink"> | number;
    doctorId?: Prisma.IntNullableFilter<"PatientShareLink"> | number | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"PatientShareLink"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"PatientShareLink"> | boolean;
    accessCount?: Prisma.IntFilter<"PatientShareLink"> | number;
    lastAccessedAt?: Prisma.DateTimeNullableFilter<"PatientShareLink"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientShareLink"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    doctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
}, "id" | "shareToken">;
export type PatientShareLinkOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    shareToken?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    accessCount?: Prisma.SortOrder;
    lastAccessedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PatientShareLinkCountOrderByAggregateInput;
    _avg?: Prisma.PatientShareLinkAvgOrderByAggregateInput;
    _max?: Prisma.PatientShareLinkMaxOrderByAggregateInput;
    _min?: Prisma.PatientShareLinkMinOrderByAggregateInput;
    _sum?: Prisma.PatientShareLinkSumOrderByAggregateInput;
};
export type PatientShareLinkScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientShareLinkScalarWhereWithAggregatesInput | Prisma.PatientShareLinkScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientShareLinkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientShareLinkScalarWhereWithAggregatesInput | Prisma.PatientShareLinkScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"PatientShareLink"> | number;
    patientId?: Prisma.IntWithAggregatesFilter<"PatientShareLink"> | number;
    doctorId?: Prisma.IntNullableWithAggregatesFilter<"PatientShareLink"> | number | null;
    shareToken?: Prisma.StringWithAggregatesFilter<"PatientShareLink"> | string;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PatientShareLink"> | Date | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"PatientShareLink"> | boolean;
    accessCount?: Prisma.IntWithAggregatesFilter<"PatientShareLink"> | number;
    lastAccessedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PatientShareLink"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PatientShareLink"> | Date | string;
};
export type PatientShareLinkCreateInput = {
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutShareLinksInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutPatientShareLinksInput;
};
export type PatientShareLinkUncheckedCreateInput = {
    id?: number;
    patientId: number;
    doctorId?: number | null;
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PatientShareLinkUpdateInput = {
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutShareLinksNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutPatientShareLinksNestedInput;
};
export type PatientShareLinkUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientShareLinkCreateManyInput = {
    id?: number;
    patientId: number;
    doctorId?: number | null;
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PatientShareLinkUpdateManyMutationInput = {
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientShareLinkUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientShareLinkListRelationFilter = {
    every?: Prisma.PatientShareLinkWhereInput;
    some?: Prisma.PatientShareLinkWhereInput;
    none?: Prisma.PatientShareLinkWhereInput;
};
export type PatientShareLinkOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientShareLinkCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    shareToken?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    accessCount?: Prisma.SortOrder;
    lastAccessedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PatientShareLinkAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    accessCount?: Prisma.SortOrder;
};
export type PatientShareLinkMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    shareToken?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    accessCount?: Prisma.SortOrder;
    lastAccessedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PatientShareLinkMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    shareToken?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    accessCount?: Prisma.SortOrder;
    lastAccessedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PatientShareLinkSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    accessCount?: Prisma.SortOrder;
};
export type PatientShareLinkCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutPatientInput, Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput> | Prisma.PatientShareLinkCreateWithoutPatientInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput | Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientShareLinkCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
};
export type PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutPatientInput, Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput> | Prisma.PatientShareLinkCreateWithoutPatientInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput | Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientShareLinkCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
};
export type PatientShareLinkUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutPatientInput, Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput> | Prisma.PatientShareLinkCreateWithoutPatientInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput | Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientShareLinkCreateManyPatientInputEnvelope;
    set?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    disconnect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    delete?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    update?: Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientShareLinkUpdateManyWithWhereWithoutPatientInput | Prisma.PatientShareLinkUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientShareLinkScalarWhereInput | Prisma.PatientShareLinkScalarWhereInput[];
};
export type PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutPatientInput, Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput> | Prisma.PatientShareLinkCreateWithoutPatientInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput | Prisma.PatientShareLinkCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientShareLinkCreateManyPatientInputEnvelope;
    set?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    disconnect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    delete?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    update?: Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientShareLinkUpdateManyWithWhereWithoutPatientInput | Prisma.PatientShareLinkUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientShareLinkScalarWhereInput | Prisma.PatientShareLinkScalarWhereInput[];
};
export type PatientShareLinkCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput> | Prisma.PatientShareLinkCreateWithoutDoctorInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput | Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.PatientShareLinkCreateManyDoctorInputEnvelope;
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
};
export type PatientShareLinkUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput> | Prisma.PatientShareLinkCreateWithoutDoctorInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput | Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.PatientShareLinkCreateManyDoctorInputEnvelope;
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
};
export type PatientShareLinkUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput> | Prisma.PatientShareLinkCreateWithoutDoctorInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput | Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutDoctorInput | Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.PatientShareLinkCreateManyDoctorInputEnvelope;
    set?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    disconnect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    delete?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    update?: Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutDoctorInput | Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.PatientShareLinkUpdateManyWithWhereWithoutDoctorInput | Prisma.PatientShareLinkUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.PatientShareLinkScalarWhereInput | Prisma.PatientShareLinkScalarWhereInput[];
};
export type PatientShareLinkUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput> | Prisma.PatientShareLinkCreateWithoutDoctorInput[] | Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput | Prisma.PatientShareLinkCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutDoctorInput | Prisma.PatientShareLinkUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.PatientShareLinkCreateManyDoctorInputEnvelope;
    set?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    disconnect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    delete?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    connect?: Prisma.PatientShareLinkWhereUniqueInput | Prisma.PatientShareLinkWhereUniqueInput[];
    update?: Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutDoctorInput | Prisma.PatientShareLinkUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.PatientShareLinkUpdateManyWithWhereWithoutDoctorInput | Prisma.PatientShareLinkUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.PatientShareLinkScalarWhereInput | Prisma.PatientShareLinkScalarWhereInput[];
};
export type PatientShareLinkCreateWithoutPatientInput = {
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
    doctor?: Prisma.DoctorCreateNestedOneWithoutPatientShareLinksInput;
};
export type PatientShareLinkUncheckedCreateWithoutPatientInput = {
    id?: number;
    doctorId?: number | null;
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PatientShareLinkCreateOrConnectWithoutPatientInput = {
    where: Prisma.PatientShareLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutPatientInput, Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput>;
};
export type PatientShareLinkCreateManyPatientInputEnvelope = {
    data: Prisma.PatientShareLinkCreateManyPatientInput | Prisma.PatientShareLinkCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type PatientShareLinkUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientShareLinkWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientShareLinkUpdateWithoutPatientInput, Prisma.PatientShareLinkUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutPatientInput, Prisma.PatientShareLinkUncheckedCreateWithoutPatientInput>;
};
export type PatientShareLinkUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientShareLinkWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientShareLinkUpdateWithoutPatientInput, Prisma.PatientShareLinkUncheckedUpdateWithoutPatientInput>;
};
export type PatientShareLinkUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.PatientShareLinkScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientShareLinkUpdateManyMutationInput, Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientInput>;
};
export type PatientShareLinkScalarWhereInput = {
    AND?: Prisma.PatientShareLinkScalarWhereInput | Prisma.PatientShareLinkScalarWhereInput[];
    OR?: Prisma.PatientShareLinkScalarWhereInput[];
    NOT?: Prisma.PatientShareLinkScalarWhereInput | Prisma.PatientShareLinkScalarWhereInput[];
    id?: Prisma.IntFilter<"PatientShareLink"> | number;
    patientId?: Prisma.IntFilter<"PatientShareLink"> | number;
    doctorId?: Prisma.IntNullableFilter<"PatientShareLink"> | number | null;
    shareToken?: Prisma.StringFilter<"PatientShareLink"> | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"PatientShareLink"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"PatientShareLink"> | boolean;
    accessCount?: Prisma.IntFilter<"PatientShareLink"> | number;
    lastAccessedAt?: Prisma.DateTimeNullableFilter<"PatientShareLink"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientShareLink"> | Date | string;
};
export type PatientShareLinkCreateWithoutDoctorInput = {
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutShareLinksInput;
};
export type PatientShareLinkUncheckedCreateWithoutDoctorInput = {
    id?: number;
    patientId: number;
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PatientShareLinkCreateOrConnectWithoutDoctorInput = {
    where: Prisma.PatientShareLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput>;
};
export type PatientShareLinkCreateManyDoctorInputEnvelope = {
    data: Prisma.PatientShareLinkCreateManyDoctorInput | Prisma.PatientShareLinkCreateManyDoctorInput[];
    skipDuplicates?: boolean;
};
export type PatientShareLinkUpsertWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.PatientShareLinkWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientShareLinkUpdateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.PatientShareLinkCreateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedCreateWithoutDoctorInput>;
};
export type PatientShareLinkUpdateWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.PatientShareLinkWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientShareLinkUpdateWithoutDoctorInput, Prisma.PatientShareLinkUncheckedUpdateWithoutDoctorInput>;
};
export type PatientShareLinkUpdateManyWithWhereWithoutDoctorInput = {
    where: Prisma.PatientShareLinkScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientShareLinkUpdateManyMutationInput, Prisma.PatientShareLinkUncheckedUpdateManyWithoutDoctorInput>;
};
export type PatientShareLinkCreateManyPatientInput = {
    id?: number;
    doctorId?: number | null;
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PatientShareLinkUpdateWithoutPatientInput = {
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    doctor?: Prisma.DoctorUpdateOneWithoutPatientShareLinksNestedInput;
};
export type PatientShareLinkUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientShareLinkUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientShareLinkCreateManyDoctorInput = {
    id?: number;
    patientId: number;
    shareToken: string;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    accessCount?: number;
    lastAccessedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PatientShareLinkUpdateWithoutDoctorInput = {
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutShareLinksNestedInput;
};
export type PatientShareLinkUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientShareLinkUncheckedUpdateManyWithoutDoctorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    shareToken?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastAccessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientShareLinkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    doctorId?: boolean;
    shareToken?: boolean;
    expiresAt?: boolean;
    isActive?: boolean;
    accessCount?: boolean;
    lastAccessedAt?: boolean;
    createdAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    doctor?: boolean | Prisma.PatientShareLink$doctorArgs<ExtArgs>;
}, ExtArgs["result"]["patientShareLink"]>;
export type PatientShareLinkSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    doctorId?: boolean;
    shareToken?: boolean;
    expiresAt?: boolean;
    isActive?: boolean;
    accessCount?: boolean;
    lastAccessedAt?: boolean;
    createdAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    doctor?: boolean | Prisma.PatientShareLink$doctorArgs<ExtArgs>;
}, ExtArgs["result"]["patientShareLink"]>;
export type PatientShareLinkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    doctorId?: boolean;
    shareToken?: boolean;
    expiresAt?: boolean;
    isActive?: boolean;
    accessCount?: boolean;
    lastAccessedAt?: boolean;
    createdAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    doctor?: boolean | Prisma.PatientShareLink$doctorArgs<ExtArgs>;
}, ExtArgs["result"]["patientShareLink"]>;
export type PatientShareLinkSelectScalar = {
    id?: boolean;
    patientId?: boolean;
    doctorId?: boolean;
    shareToken?: boolean;
    expiresAt?: boolean;
    isActive?: boolean;
    accessCount?: boolean;
    lastAccessedAt?: boolean;
    createdAt?: boolean;
};
export type PatientShareLinkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "patientId" | "doctorId" | "shareToken" | "expiresAt" | "isActive" | "accessCount" | "lastAccessedAt" | "createdAt", ExtArgs["result"]["patientShareLink"]>;
export type PatientShareLinkInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    doctor?: boolean | Prisma.PatientShareLink$doctorArgs<ExtArgs>;
};
export type PatientShareLinkIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    doctor?: boolean | Prisma.PatientShareLink$doctorArgs<ExtArgs>;
};
export type PatientShareLinkIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    doctor?: boolean | Prisma.PatientShareLink$doctorArgs<ExtArgs>;
};
export type $PatientShareLinkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PatientShareLink";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
        doctor: Prisma.$DoctorPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        patientId: number;
        doctorId: number | null;
        shareToken: string;
        expiresAt: Date | null;
        isActive: boolean;
        accessCount: number;
        lastAccessedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["patientShareLink"]>;
    composites: {};
};
export type PatientShareLinkGetPayload<S extends boolean | null | undefined | PatientShareLinkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload, S>;
export type PatientShareLinkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientShareLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientShareLinkCountAggregateInputType | true;
};
export interface PatientShareLinkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PatientShareLink'];
        meta: {
            name: 'PatientShareLink';
        };
    };
    /**
     * Find zero or one PatientShareLink that matches the filter.
     * @param {PatientShareLinkFindUniqueArgs} args - Arguments to find a PatientShareLink
     * @example
     * // Get one PatientShareLink
     * const patientShareLink = await prisma.patientShareLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientShareLinkFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientShareLinkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PatientShareLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientShareLinkFindUniqueOrThrowArgs} args - Arguments to find a PatientShareLink
     * @example
     * // Get one PatientShareLink
     * const patientShareLink = await prisma.patientShareLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientShareLinkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientShareLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientShareLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientShareLinkFindFirstArgs} args - Arguments to find a PatientShareLink
     * @example
     * // Get one PatientShareLink
     * const patientShareLink = await prisma.patientShareLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientShareLinkFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientShareLinkFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientShareLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientShareLinkFindFirstOrThrowArgs} args - Arguments to find a PatientShareLink
     * @example
     * // Get one PatientShareLink
     * const patientShareLink = await prisma.patientShareLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientShareLinkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientShareLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PatientShareLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientShareLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientShareLinks
     * const patientShareLinks = await prisma.patientShareLink.findMany()
     *
     * // Get first 10 PatientShareLinks
     * const patientShareLinks = await prisma.patientShareLink.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const patientShareLinkWithIdOnly = await prisma.patientShareLink.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PatientShareLinkFindManyArgs>(args?: Prisma.SelectSubset<T, PatientShareLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PatientShareLink.
     * @param {PatientShareLinkCreateArgs} args - Arguments to create a PatientShareLink.
     * @example
     * // Create one PatientShareLink
     * const PatientShareLink = await prisma.patientShareLink.create({
     *   data: {
     *     // ... data to create a PatientShareLink
     *   }
     * })
     *
     */
    create<T extends PatientShareLinkCreateArgs>(args: Prisma.SelectSubset<T, PatientShareLinkCreateArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PatientShareLinks.
     * @param {PatientShareLinkCreateManyArgs} args - Arguments to create many PatientShareLinks.
     * @example
     * // Create many PatientShareLinks
     * const patientShareLink = await prisma.patientShareLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientShareLinkCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientShareLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PatientShareLinks and returns the data saved in the database.
     * @param {PatientShareLinkCreateManyAndReturnArgs} args - Arguments to create many PatientShareLinks.
     * @example
     * // Create many PatientShareLinks
     * const patientShareLink = await prisma.patientShareLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PatientShareLinks and only return the `id`
     * const patientShareLinkWithIdOnly = await prisma.patientShareLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientShareLinkCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientShareLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PatientShareLink.
     * @param {PatientShareLinkDeleteArgs} args - Arguments to delete one PatientShareLink.
     * @example
     * // Delete one PatientShareLink
     * const PatientShareLink = await prisma.patientShareLink.delete({
     *   where: {
     *     // ... filter to delete one PatientShareLink
     *   }
     * })
     *
     */
    delete<T extends PatientShareLinkDeleteArgs>(args: Prisma.SelectSubset<T, PatientShareLinkDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PatientShareLink.
     * @param {PatientShareLinkUpdateArgs} args - Arguments to update one PatientShareLink.
     * @example
     * // Update one PatientShareLink
     * const patientShareLink = await prisma.patientShareLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientShareLinkUpdateArgs>(args: Prisma.SelectSubset<T, PatientShareLinkUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PatientShareLinks.
     * @param {PatientShareLinkDeleteManyArgs} args - Arguments to filter PatientShareLinks to delete.
     * @example
     * // Delete a few PatientShareLinks
     * const { count } = await prisma.patientShareLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientShareLinkDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientShareLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientShareLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientShareLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientShareLinks
     * const patientShareLink = await prisma.patientShareLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientShareLinkUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientShareLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientShareLinks and returns the data updated in the database.
     * @param {PatientShareLinkUpdateManyAndReturnArgs} args - Arguments to update many PatientShareLinks.
     * @example
     * // Update many PatientShareLinks
     * const patientShareLink = await prisma.patientShareLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PatientShareLinks and only return the `id`
     * const patientShareLinkWithIdOnly = await prisma.patientShareLink.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientShareLinkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientShareLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PatientShareLink.
     * @param {PatientShareLinkUpsertArgs} args - Arguments to update or create a PatientShareLink.
     * @example
     * // Update or create a PatientShareLink
     * const patientShareLink = await prisma.patientShareLink.upsert({
     *   create: {
     *     // ... data to create a PatientShareLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientShareLink we want to update
     *   }
     * })
     */
    upsert<T extends PatientShareLinkUpsertArgs>(args: Prisma.SelectSubset<T, PatientShareLinkUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientShareLinkClient<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PatientShareLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientShareLinkCountArgs} args - Arguments to filter PatientShareLinks to count.
     * @example
     * // Count the number of PatientShareLinks
     * const count = await prisma.patientShareLink.count({
     *   where: {
     *     // ... the filter for the PatientShareLinks we want to count
     *   }
     * })
    **/
    count<T extends PatientShareLinkCountArgs>(args?: Prisma.Subset<T, PatientShareLinkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientShareLinkCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PatientShareLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientShareLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientShareLinkAggregateArgs>(args: Prisma.Subset<T, PatientShareLinkAggregateArgs>): Prisma.PrismaPromise<GetPatientShareLinkAggregateType<T>>;
    /**
     * Group by PatientShareLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientShareLinkGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PatientShareLinkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientShareLinkGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientShareLinkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientShareLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientShareLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PatientShareLink model
     */
    readonly fields: PatientShareLinkFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PatientShareLink.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientShareLinkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    doctor<T extends Prisma.PatientShareLink$doctorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientShareLink$doctorArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PatientShareLink model
 */
export interface PatientShareLinkFieldRefs {
    readonly id: Prisma.FieldRef<"PatientShareLink", 'Int'>;
    readonly patientId: Prisma.FieldRef<"PatientShareLink", 'Int'>;
    readonly doctorId: Prisma.FieldRef<"PatientShareLink", 'Int'>;
    readonly shareToken: Prisma.FieldRef<"PatientShareLink", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"PatientShareLink", 'DateTime'>;
    readonly isActive: Prisma.FieldRef<"PatientShareLink", 'Boolean'>;
    readonly accessCount: Prisma.FieldRef<"PatientShareLink", 'Int'>;
    readonly lastAccessedAt: Prisma.FieldRef<"PatientShareLink", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PatientShareLink", 'DateTime'>;
}
/**
 * PatientShareLink findUnique
 */
export type PatientShareLinkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * Filter, which PatientShareLink to fetch.
     */
    where: Prisma.PatientShareLinkWhereUniqueInput;
};
/**
 * PatientShareLink findUniqueOrThrow
 */
export type PatientShareLinkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * Filter, which PatientShareLink to fetch.
     */
    where: Prisma.PatientShareLinkWhereUniqueInput;
};
/**
 * PatientShareLink findFirst
 */
export type PatientShareLinkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * Filter, which PatientShareLink to fetch.
     */
    where?: Prisma.PatientShareLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientShareLinks to fetch.
     */
    orderBy?: Prisma.PatientShareLinkOrderByWithRelationInput | Prisma.PatientShareLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientShareLinks.
     */
    cursor?: Prisma.PatientShareLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientShareLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientShareLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientShareLinks.
     */
    distinct?: Prisma.PatientShareLinkScalarFieldEnum | Prisma.PatientShareLinkScalarFieldEnum[];
};
/**
 * PatientShareLink findFirstOrThrow
 */
export type PatientShareLinkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * Filter, which PatientShareLink to fetch.
     */
    where?: Prisma.PatientShareLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientShareLinks to fetch.
     */
    orderBy?: Prisma.PatientShareLinkOrderByWithRelationInput | Prisma.PatientShareLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientShareLinks.
     */
    cursor?: Prisma.PatientShareLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientShareLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientShareLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientShareLinks.
     */
    distinct?: Prisma.PatientShareLinkScalarFieldEnum | Prisma.PatientShareLinkScalarFieldEnum[];
};
/**
 * PatientShareLink findMany
 */
export type PatientShareLinkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * Filter, which PatientShareLinks to fetch.
     */
    where?: Prisma.PatientShareLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientShareLinks to fetch.
     */
    orderBy?: Prisma.PatientShareLinkOrderByWithRelationInput | Prisma.PatientShareLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PatientShareLinks.
     */
    cursor?: Prisma.PatientShareLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientShareLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientShareLinks.
     */
    skip?: number;
    distinct?: Prisma.PatientShareLinkScalarFieldEnum | Prisma.PatientShareLinkScalarFieldEnum[];
};
/**
 * PatientShareLink create
 */
export type PatientShareLinkCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * The data needed to create a PatientShareLink.
     */
    data: Prisma.XOR<Prisma.PatientShareLinkCreateInput, Prisma.PatientShareLinkUncheckedCreateInput>;
};
/**
 * PatientShareLink createMany
 */
export type PatientShareLinkCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientShareLinks.
     */
    data: Prisma.PatientShareLinkCreateManyInput | Prisma.PatientShareLinkCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PatientShareLink createManyAndReturn
 */
export type PatientShareLinkCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * The data used to create many PatientShareLinks.
     */
    data: Prisma.PatientShareLinkCreateManyInput | Prisma.PatientShareLinkCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientShareLink update
 */
export type PatientShareLinkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * The data needed to update a PatientShareLink.
     */
    data: Prisma.XOR<Prisma.PatientShareLinkUpdateInput, Prisma.PatientShareLinkUncheckedUpdateInput>;
    /**
     * Choose, which PatientShareLink to update.
     */
    where: Prisma.PatientShareLinkWhereUniqueInput;
};
/**
 * PatientShareLink updateMany
 */
export type PatientShareLinkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientShareLinks.
     */
    data: Prisma.XOR<Prisma.PatientShareLinkUpdateManyMutationInput, Prisma.PatientShareLinkUncheckedUpdateManyInput>;
    /**
     * Filter which PatientShareLinks to update
     */
    where?: Prisma.PatientShareLinkWhereInput;
    /**
     * Limit how many PatientShareLinks to update.
     */
    limit?: number;
};
/**
 * PatientShareLink updateManyAndReturn
 */
export type PatientShareLinkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * The data used to update PatientShareLinks.
     */
    data: Prisma.XOR<Prisma.PatientShareLinkUpdateManyMutationInput, Prisma.PatientShareLinkUncheckedUpdateManyInput>;
    /**
     * Filter which PatientShareLinks to update
     */
    where?: Prisma.PatientShareLinkWhereInput;
    /**
     * Limit how many PatientShareLinks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientShareLink upsert
 */
export type PatientShareLinkUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * The filter to search for the PatientShareLink to update in case it exists.
     */
    where: Prisma.PatientShareLinkWhereUniqueInput;
    /**
     * In case the PatientShareLink found by the `where` argument doesn't exist, create a new PatientShareLink with this data.
     */
    create: Prisma.XOR<Prisma.PatientShareLinkCreateInput, Prisma.PatientShareLinkUncheckedCreateInput>;
    /**
     * In case the PatientShareLink was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientShareLinkUpdateInput, Prisma.PatientShareLinkUncheckedUpdateInput>;
};
/**
 * PatientShareLink delete
 */
export type PatientShareLinkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
    /**
     * Filter which PatientShareLink to delete.
     */
    where: Prisma.PatientShareLinkWhereUniqueInput;
};
/**
 * PatientShareLink deleteMany
 */
export type PatientShareLinkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientShareLinks to delete
     */
    where?: Prisma.PatientShareLinkWhereInput;
    /**
     * Limit how many PatientShareLinks to delete.
     */
    limit?: number;
};
/**
 * PatientShareLink.doctor
 */
export type PatientShareLink$doctorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: Prisma.DoctorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Doctor
     */
    omit?: Prisma.DoctorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DoctorInclude<ExtArgs> | null;
    where?: Prisma.DoctorWhereInput;
};
/**
 * PatientShareLink without action
 */
export type PatientShareLinkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientShareLink
     */
    select?: Prisma.PatientShareLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientShareLink
     */
    omit?: Prisma.PatientShareLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientShareLinkInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PatientShareLink.d.ts.map