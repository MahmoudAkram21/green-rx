import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MedicineAlternative
 *
 */
export type MedicineAlternativeModel = runtime.Types.Result.DefaultSelection<Prisma.$MedicineAlternativePayload>;
export type AggregateMedicineAlternative = {
    _count: MedicineAlternativeCountAggregateOutputType | null;
    _avg: MedicineAlternativeAvgAggregateOutputType | null;
    _sum: MedicineAlternativeSumAggregateOutputType | null;
    _min: MedicineAlternativeMinAggregateOutputType | null;
    _max: MedicineAlternativeMaxAggregateOutputType | null;
};
export type MedicineAlternativeAvgAggregateOutputType = {
    id: number | null;
    activeSubstanceId: number | null;
    alternativeActiveSubstanceId: number | null;
};
export type MedicineAlternativeSumAggregateOutputType = {
    id: number | null;
    activeSubstanceId: number | null;
    alternativeActiveSubstanceId: number | null;
};
export type MedicineAlternativeMinAggregateOutputType = {
    id: number | null;
    activeSubstanceId: number | null;
    alternativeActiveSubstanceId: number | null;
    reason: string | null;
    createdAt: Date | null;
};
export type MedicineAlternativeMaxAggregateOutputType = {
    id: number | null;
    activeSubstanceId: number | null;
    alternativeActiveSubstanceId: number | null;
    reason: string | null;
    createdAt: Date | null;
};
export type MedicineAlternativeCountAggregateOutputType = {
    id: number;
    activeSubstanceId: number;
    alternativeActiveSubstanceId: number;
    reason: number;
    createdAt: number;
    _all: number;
};
export type MedicineAlternativeAvgAggregateInputType = {
    id?: true;
    activeSubstanceId?: true;
    alternativeActiveSubstanceId?: true;
};
export type MedicineAlternativeSumAggregateInputType = {
    id?: true;
    activeSubstanceId?: true;
    alternativeActiveSubstanceId?: true;
};
export type MedicineAlternativeMinAggregateInputType = {
    id?: true;
    activeSubstanceId?: true;
    alternativeActiveSubstanceId?: true;
    reason?: true;
    createdAt?: true;
};
export type MedicineAlternativeMaxAggregateInputType = {
    id?: true;
    activeSubstanceId?: true;
    alternativeActiveSubstanceId?: true;
    reason?: true;
    createdAt?: true;
};
export type MedicineAlternativeCountAggregateInputType = {
    id?: true;
    activeSubstanceId?: true;
    alternativeActiveSubstanceId?: true;
    reason?: true;
    createdAt?: true;
    _all?: true;
};
export type MedicineAlternativeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineAlternative to aggregate.
     */
    where?: Prisma.MedicineAlternativeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineAlternatives to fetch.
     */
    orderBy?: Prisma.MedicineAlternativeOrderByWithRelationInput | Prisma.MedicineAlternativeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MedicineAlternativeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineAlternatives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineAlternatives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MedicineAlternatives
    **/
    _count?: true | MedicineAlternativeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MedicineAlternativeAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MedicineAlternativeSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MedicineAlternativeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MedicineAlternativeMaxAggregateInputType;
};
export type GetMedicineAlternativeAggregateType<T extends MedicineAlternativeAggregateArgs> = {
    [P in keyof T & keyof AggregateMedicineAlternative]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMedicineAlternative[P]> : Prisma.GetScalarType<T[P], AggregateMedicineAlternative[P]>;
};
export type MedicineAlternativeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicineAlternativeWhereInput;
    orderBy?: Prisma.MedicineAlternativeOrderByWithAggregationInput | Prisma.MedicineAlternativeOrderByWithAggregationInput[];
    by: Prisma.MedicineAlternativeScalarFieldEnum[] | Prisma.MedicineAlternativeScalarFieldEnum;
    having?: Prisma.MedicineAlternativeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MedicineAlternativeCountAggregateInputType | true;
    _avg?: MedicineAlternativeAvgAggregateInputType;
    _sum?: MedicineAlternativeSumAggregateInputType;
    _min?: MedicineAlternativeMinAggregateInputType;
    _max?: MedicineAlternativeMaxAggregateInputType;
};
export type MedicineAlternativeGroupByOutputType = {
    id: number;
    activeSubstanceId: number;
    alternativeActiveSubstanceId: number;
    reason: string | null;
    createdAt: Date;
    _count: MedicineAlternativeCountAggregateOutputType | null;
    _avg: MedicineAlternativeAvgAggregateOutputType | null;
    _sum: MedicineAlternativeSumAggregateOutputType | null;
    _min: MedicineAlternativeMinAggregateOutputType | null;
    _max: MedicineAlternativeMaxAggregateOutputType | null;
};
type GetMedicineAlternativeGroupByPayload<T extends MedicineAlternativeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MedicineAlternativeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MedicineAlternativeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MedicineAlternativeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MedicineAlternativeGroupByOutputType[P]>;
}>>;
export type MedicineAlternativeWhereInput = {
    AND?: Prisma.MedicineAlternativeWhereInput | Prisma.MedicineAlternativeWhereInput[];
    OR?: Prisma.MedicineAlternativeWhereInput[];
    NOT?: Prisma.MedicineAlternativeWhereInput | Prisma.MedicineAlternativeWhereInput[];
    id?: Prisma.IntFilter<"MedicineAlternative"> | number;
    activeSubstanceId?: Prisma.IntFilter<"MedicineAlternative"> | number;
    alternativeActiveSubstanceId?: Prisma.IntFilter<"MedicineAlternative"> | number;
    reason?: Prisma.StringNullableFilter<"MedicineAlternative"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MedicineAlternative"> | Date | string;
    activeSubstance?: Prisma.XOR<Prisma.ActiveSubstanceScalarRelationFilter, Prisma.ActiveSubstanceWhereInput>;
    alternativeActiveSubstance?: Prisma.XOR<Prisma.ActiveSubstanceScalarRelationFilter, Prisma.ActiveSubstanceWhereInput>;
};
export type MedicineAlternativeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    activeSubstanceId?: Prisma.SortOrder;
    alternativeActiveSubstanceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    activeSubstance?: Prisma.ActiveSubstanceOrderByWithRelationInput;
    alternativeActiveSubstance?: Prisma.ActiveSubstanceOrderByWithRelationInput;
};
export type MedicineAlternativeWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.MedicineAlternativeWhereInput | Prisma.MedicineAlternativeWhereInput[];
    OR?: Prisma.MedicineAlternativeWhereInput[];
    NOT?: Prisma.MedicineAlternativeWhereInput | Prisma.MedicineAlternativeWhereInput[];
    activeSubstanceId?: Prisma.IntFilter<"MedicineAlternative"> | number;
    alternativeActiveSubstanceId?: Prisma.IntFilter<"MedicineAlternative"> | number;
    reason?: Prisma.StringNullableFilter<"MedicineAlternative"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MedicineAlternative"> | Date | string;
    activeSubstance?: Prisma.XOR<Prisma.ActiveSubstanceScalarRelationFilter, Prisma.ActiveSubstanceWhereInput>;
    alternativeActiveSubstance?: Prisma.XOR<Prisma.ActiveSubstanceScalarRelationFilter, Prisma.ActiveSubstanceWhereInput>;
}, "id">;
export type MedicineAlternativeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    activeSubstanceId?: Prisma.SortOrder;
    alternativeActiveSubstanceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MedicineAlternativeCountOrderByAggregateInput;
    _avg?: Prisma.MedicineAlternativeAvgOrderByAggregateInput;
    _max?: Prisma.MedicineAlternativeMaxOrderByAggregateInput;
    _min?: Prisma.MedicineAlternativeMinOrderByAggregateInput;
    _sum?: Prisma.MedicineAlternativeSumOrderByAggregateInput;
};
export type MedicineAlternativeScalarWhereWithAggregatesInput = {
    AND?: Prisma.MedicineAlternativeScalarWhereWithAggregatesInput | Prisma.MedicineAlternativeScalarWhereWithAggregatesInput[];
    OR?: Prisma.MedicineAlternativeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MedicineAlternativeScalarWhereWithAggregatesInput | Prisma.MedicineAlternativeScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MedicineAlternative"> | number;
    activeSubstanceId?: Prisma.IntWithAggregatesFilter<"MedicineAlternative"> | number;
    alternativeActiveSubstanceId?: Prisma.IntWithAggregatesFilter<"MedicineAlternative"> | number;
    reason?: Prisma.StringNullableWithAggregatesFilter<"MedicineAlternative"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MedicineAlternative"> | Date | string;
};
export type MedicineAlternativeCreateInput = {
    reason?: string | null;
    createdAt?: Date | string;
    activeSubstance: Prisma.ActiveSubstanceCreateNestedOneWithoutMedicineAlternativesInput;
    alternativeActiveSubstance: Prisma.ActiveSubstanceCreateNestedOneWithoutAlternativeToInput;
};
export type MedicineAlternativeUncheckedCreateInput = {
    id?: number;
    activeSubstanceId: number;
    alternativeActiveSubstanceId: number;
    reason?: string | null;
    createdAt?: Date | string;
};
export type MedicineAlternativeUpdateInput = {
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeSubstance?: Prisma.ActiveSubstanceUpdateOneRequiredWithoutMedicineAlternativesNestedInput;
    alternativeActiveSubstance?: Prisma.ActiveSubstanceUpdateOneRequiredWithoutAlternativeToNestedInput;
};
export type MedicineAlternativeUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    activeSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    alternativeActiveSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicineAlternativeCreateManyInput = {
    id?: number;
    activeSubstanceId: number;
    alternativeActiveSubstanceId: number;
    reason?: string | null;
    createdAt?: Date | string;
};
export type MedicineAlternativeUpdateManyMutationInput = {
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicineAlternativeUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    activeSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    alternativeActiveSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicineAlternativeListRelationFilter = {
    every?: Prisma.MedicineAlternativeWhereInput;
    some?: Prisma.MedicineAlternativeWhereInput;
    none?: Prisma.MedicineAlternativeWhereInput;
};
export type MedicineAlternativeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MedicineAlternativeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    activeSubstanceId?: Prisma.SortOrder;
    alternativeActiveSubstanceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MedicineAlternativeAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    activeSubstanceId?: Prisma.SortOrder;
    alternativeActiveSubstanceId?: Prisma.SortOrder;
};
export type MedicineAlternativeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    activeSubstanceId?: Prisma.SortOrder;
    alternativeActiveSubstanceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MedicineAlternativeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    activeSubstanceId?: Prisma.SortOrder;
    alternativeActiveSubstanceId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MedicineAlternativeSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    activeSubstanceId?: Prisma.SortOrder;
    alternativeActiveSubstanceId?: Prisma.SortOrder;
};
export type MedicineAlternativeCreateNestedManyWithoutActiveSubstanceInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyActiveSubstanceInputEnvelope;
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
};
export type MedicineAlternativeCreateNestedManyWithoutAlternativeActiveSubstanceInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyAlternativeActiveSubstanceInputEnvelope;
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
};
export type MedicineAlternativeUncheckedCreateNestedManyWithoutActiveSubstanceInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyActiveSubstanceInputEnvelope;
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
};
export type MedicineAlternativeUncheckedCreateNestedManyWithoutAlternativeActiveSubstanceInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyAlternativeActiveSubstanceInputEnvelope;
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
};
export type MedicineAlternativeUpdateManyWithoutActiveSubstanceNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput[];
    upsert?: Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutActiveSubstanceInput | Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyActiveSubstanceInputEnvelope;
    set?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    disconnect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    delete?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    update?: Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutActiveSubstanceInput | Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutActiveSubstanceInput[];
    updateMany?: Prisma.MedicineAlternativeUpdateManyWithWhereWithoutActiveSubstanceInput | Prisma.MedicineAlternativeUpdateManyWithWhereWithoutActiveSubstanceInput[];
    deleteMany?: Prisma.MedicineAlternativeScalarWhereInput | Prisma.MedicineAlternativeScalarWhereInput[];
};
export type MedicineAlternativeUpdateManyWithoutAlternativeActiveSubstanceNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput[];
    upsert?: Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutAlternativeActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyAlternativeActiveSubstanceInputEnvelope;
    set?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    disconnect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    delete?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    update?: Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutAlternativeActiveSubstanceInput[];
    updateMany?: Prisma.MedicineAlternativeUpdateManyWithWhereWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeUpdateManyWithWhereWithoutAlternativeActiveSubstanceInput[];
    deleteMany?: Prisma.MedicineAlternativeScalarWhereInput | Prisma.MedicineAlternativeScalarWhereInput[];
};
export type MedicineAlternativeUncheckedUpdateManyWithoutActiveSubstanceNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput[];
    upsert?: Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutActiveSubstanceInput | Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyActiveSubstanceInputEnvelope;
    set?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    disconnect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    delete?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    update?: Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutActiveSubstanceInput | Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutActiveSubstanceInput[];
    updateMany?: Prisma.MedicineAlternativeUpdateManyWithWhereWithoutActiveSubstanceInput | Prisma.MedicineAlternativeUpdateManyWithWhereWithoutActiveSubstanceInput[];
    deleteMany?: Prisma.MedicineAlternativeScalarWhereInput | Prisma.MedicineAlternativeScalarWhereInput[];
};
export type MedicineAlternativeUncheckedUpdateManyWithoutAlternativeActiveSubstanceNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput> | Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput[] | Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput[];
    connectOrCreate?: Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput[];
    upsert?: Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeUpsertWithWhereUniqueWithoutAlternativeActiveSubstanceInput[];
    createMany?: Prisma.MedicineAlternativeCreateManyAlternativeActiveSubstanceInputEnvelope;
    set?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    disconnect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    delete?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    connect?: Prisma.MedicineAlternativeWhereUniqueInput | Prisma.MedicineAlternativeWhereUniqueInput[];
    update?: Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeUpdateWithWhereUniqueWithoutAlternativeActiveSubstanceInput[];
    updateMany?: Prisma.MedicineAlternativeUpdateManyWithWhereWithoutAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeUpdateManyWithWhereWithoutAlternativeActiveSubstanceInput[];
    deleteMany?: Prisma.MedicineAlternativeScalarWhereInput | Prisma.MedicineAlternativeScalarWhereInput[];
};
export type MedicineAlternativeCreateWithoutActiveSubstanceInput = {
    reason?: string | null;
    createdAt?: Date | string;
    alternativeActiveSubstance: Prisma.ActiveSubstanceCreateNestedOneWithoutAlternativeToInput;
};
export type MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput = {
    id?: number;
    alternativeActiveSubstanceId: number;
    reason?: string | null;
    createdAt?: Date | string;
};
export type MedicineAlternativeCreateOrConnectWithoutActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput>;
};
export type MedicineAlternativeCreateManyActiveSubstanceInputEnvelope = {
    data: Prisma.MedicineAlternativeCreateManyActiveSubstanceInput | Prisma.MedicineAlternativeCreateManyActiveSubstanceInput[];
    skipDuplicates?: boolean;
};
export type MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput = {
    reason?: string | null;
    createdAt?: Date | string;
    activeSubstance: Prisma.ActiveSubstanceCreateNestedOneWithoutMedicineAlternativesInput;
};
export type MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput = {
    id?: number;
    activeSubstanceId: number;
    reason?: string | null;
    createdAt?: Date | string;
};
export type MedicineAlternativeCreateOrConnectWithoutAlternativeActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput>;
};
export type MedicineAlternativeCreateManyAlternativeActiveSubstanceInputEnvelope = {
    data: Prisma.MedicineAlternativeCreateManyAlternativeActiveSubstanceInput | Prisma.MedicineAlternativeCreateManyAlternativeActiveSubstanceInput[];
    skipDuplicates?: boolean;
};
export type MedicineAlternativeUpsertWithWhereUniqueWithoutActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeWhereUniqueInput;
    update: Prisma.XOR<Prisma.MedicineAlternativeUpdateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedUpdateWithoutActiveSubstanceInput>;
    create: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutActiveSubstanceInput>;
};
export type MedicineAlternativeUpdateWithWhereUniqueWithoutActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeWhereUniqueInput;
    data: Prisma.XOR<Prisma.MedicineAlternativeUpdateWithoutActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedUpdateWithoutActiveSubstanceInput>;
};
export type MedicineAlternativeUpdateManyWithWhereWithoutActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeScalarWhereInput;
    data: Prisma.XOR<Prisma.MedicineAlternativeUpdateManyMutationInput, Prisma.MedicineAlternativeUncheckedUpdateManyWithoutActiveSubstanceInput>;
};
export type MedicineAlternativeScalarWhereInput = {
    AND?: Prisma.MedicineAlternativeScalarWhereInput | Prisma.MedicineAlternativeScalarWhereInput[];
    OR?: Prisma.MedicineAlternativeScalarWhereInput[];
    NOT?: Prisma.MedicineAlternativeScalarWhereInput | Prisma.MedicineAlternativeScalarWhereInput[];
    id?: Prisma.IntFilter<"MedicineAlternative"> | number;
    activeSubstanceId?: Prisma.IntFilter<"MedicineAlternative"> | number;
    alternativeActiveSubstanceId?: Prisma.IntFilter<"MedicineAlternative"> | number;
    reason?: Prisma.StringNullableFilter<"MedicineAlternative"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MedicineAlternative"> | Date | string;
};
export type MedicineAlternativeUpsertWithWhereUniqueWithoutAlternativeActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeWhereUniqueInput;
    update: Prisma.XOR<Prisma.MedicineAlternativeUpdateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedUpdateWithoutAlternativeActiveSubstanceInput>;
    create: Prisma.XOR<Prisma.MedicineAlternativeCreateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedCreateWithoutAlternativeActiveSubstanceInput>;
};
export type MedicineAlternativeUpdateWithWhereUniqueWithoutAlternativeActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeWhereUniqueInput;
    data: Prisma.XOR<Prisma.MedicineAlternativeUpdateWithoutAlternativeActiveSubstanceInput, Prisma.MedicineAlternativeUncheckedUpdateWithoutAlternativeActiveSubstanceInput>;
};
export type MedicineAlternativeUpdateManyWithWhereWithoutAlternativeActiveSubstanceInput = {
    where: Prisma.MedicineAlternativeScalarWhereInput;
    data: Prisma.XOR<Prisma.MedicineAlternativeUpdateManyMutationInput, Prisma.MedicineAlternativeUncheckedUpdateManyWithoutAlternativeActiveSubstanceInput>;
};
export type MedicineAlternativeCreateManyActiveSubstanceInput = {
    id?: number;
    alternativeActiveSubstanceId: number;
    reason?: string | null;
    createdAt?: Date | string;
};
export type MedicineAlternativeCreateManyAlternativeActiveSubstanceInput = {
    id?: number;
    activeSubstanceId: number;
    reason?: string | null;
    createdAt?: Date | string;
};
export type MedicineAlternativeUpdateWithoutActiveSubstanceInput = {
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    alternativeActiveSubstance?: Prisma.ActiveSubstanceUpdateOneRequiredWithoutAlternativeToNestedInput;
};
export type MedicineAlternativeUncheckedUpdateWithoutActiveSubstanceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    alternativeActiveSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicineAlternativeUncheckedUpdateManyWithoutActiveSubstanceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    alternativeActiveSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicineAlternativeUpdateWithoutAlternativeActiveSubstanceInput = {
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeSubstance?: Prisma.ActiveSubstanceUpdateOneRequiredWithoutMedicineAlternativesNestedInput;
};
export type MedicineAlternativeUncheckedUpdateWithoutAlternativeActiveSubstanceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    activeSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicineAlternativeUncheckedUpdateManyWithoutAlternativeActiveSubstanceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    activeSubstanceId?: Prisma.IntFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MedicineAlternativeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    activeSubstanceId?: boolean;
    alternativeActiveSubstanceId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    activeSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
    alternativeActiveSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["medicineAlternative"]>;
export type MedicineAlternativeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    activeSubstanceId?: boolean;
    alternativeActiveSubstanceId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    activeSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
    alternativeActiveSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["medicineAlternative"]>;
export type MedicineAlternativeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    activeSubstanceId?: boolean;
    alternativeActiveSubstanceId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    activeSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
    alternativeActiveSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["medicineAlternative"]>;
export type MedicineAlternativeSelectScalar = {
    id?: boolean;
    activeSubstanceId?: boolean;
    alternativeActiveSubstanceId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
};
export type MedicineAlternativeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "activeSubstanceId" | "alternativeActiveSubstanceId" | "reason" | "createdAt", ExtArgs["result"]["medicineAlternative"]>;
export type MedicineAlternativeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    activeSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
    alternativeActiveSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
};
export type MedicineAlternativeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    activeSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
    alternativeActiveSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
};
export type MedicineAlternativeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    activeSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
    alternativeActiveSubstance?: boolean | Prisma.ActiveSubstanceDefaultArgs<ExtArgs>;
};
export type $MedicineAlternativePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MedicineAlternative";
    objects: {
        activeSubstance: Prisma.$ActiveSubstancePayload<ExtArgs>;
        alternativeActiveSubstance: Prisma.$ActiveSubstancePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        activeSubstanceId: number;
        alternativeActiveSubstanceId: number;
        reason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["medicineAlternative"]>;
    composites: {};
};
export type MedicineAlternativeGetPayload<S extends boolean | null | undefined | MedicineAlternativeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload, S>;
export type MedicineAlternativeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MedicineAlternativeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MedicineAlternativeCountAggregateInputType | true;
};
export interface MedicineAlternativeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MedicineAlternative'];
        meta: {
            name: 'MedicineAlternative';
        };
    };
    /**
     * Find zero or one MedicineAlternative that matches the filter.
     * @param {MedicineAlternativeFindUniqueArgs} args - Arguments to find a MedicineAlternative
     * @example
     * // Get one MedicineAlternative
     * const medicineAlternative = await prisma.medicineAlternative.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicineAlternativeFindUniqueArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MedicineAlternative that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicineAlternativeFindUniqueOrThrowArgs} args - Arguments to find a MedicineAlternative
     * @example
     * // Get one MedicineAlternative
     * const medicineAlternative = await prisma.medicineAlternative.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicineAlternativeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MedicineAlternative that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAlternativeFindFirstArgs} args - Arguments to find a MedicineAlternative
     * @example
     * // Get one MedicineAlternative
     * const medicineAlternative = await prisma.medicineAlternative.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicineAlternativeFindFirstArgs>(args?: Prisma.SelectSubset<T, MedicineAlternativeFindFirstArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MedicineAlternative that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAlternativeFindFirstOrThrowArgs} args - Arguments to find a MedicineAlternative
     * @example
     * // Get one MedicineAlternative
     * const medicineAlternative = await prisma.medicineAlternative.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicineAlternativeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MedicineAlternativeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MedicineAlternatives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAlternativeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicineAlternatives
     * const medicineAlternatives = await prisma.medicineAlternative.findMany()
     *
     * // Get first 10 MedicineAlternatives
     * const medicineAlternatives = await prisma.medicineAlternative.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const medicineAlternativeWithIdOnly = await prisma.medicineAlternative.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MedicineAlternativeFindManyArgs>(args?: Prisma.SelectSubset<T, MedicineAlternativeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MedicineAlternative.
     * @param {MedicineAlternativeCreateArgs} args - Arguments to create a MedicineAlternative.
     * @example
     * // Create one MedicineAlternative
     * const MedicineAlternative = await prisma.medicineAlternative.create({
     *   data: {
     *     // ... data to create a MedicineAlternative
     *   }
     * })
     *
     */
    create<T extends MedicineAlternativeCreateArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeCreateArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MedicineAlternatives.
     * @param {MedicineAlternativeCreateManyArgs} args - Arguments to create many MedicineAlternatives.
     * @example
     * // Create many MedicineAlternatives
     * const medicineAlternative = await prisma.medicineAlternative.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MedicineAlternativeCreateManyArgs>(args?: Prisma.SelectSubset<T, MedicineAlternativeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MedicineAlternatives and returns the data saved in the database.
     * @param {MedicineAlternativeCreateManyAndReturnArgs} args - Arguments to create many MedicineAlternatives.
     * @example
     * // Create many MedicineAlternatives
     * const medicineAlternative = await prisma.medicineAlternative.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MedicineAlternatives and only return the `id`
     * const medicineAlternativeWithIdOnly = await prisma.medicineAlternative.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MedicineAlternativeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MedicineAlternativeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MedicineAlternative.
     * @param {MedicineAlternativeDeleteArgs} args - Arguments to delete one MedicineAlternative.
     * @example
     * // Delete one MedicineAlternative
     * const MedicineAlternative = await prisma.medicineAlternative.delete({
     *   where: {
     *     // ... filter to delete one MedicineAlternative
     *   }
     * })
     *
     */
    delete<T extends MedicineAlternativeDeleteArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeDeleteArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MedicineAlternative.
     * @param {MedicineAlternativeUpdateArgs} args - Arguments to update one MedicineAlternative.
     * @example
     * // Update one MedicineAlternative
     * const medicineAlternative = await prisma.medicineAlternative.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MedicineAlternativeUpdateArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeUpdateArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MedicineAlternatives.
     * @param {MedicineAlternativeDeleteManyArgs} args - Arguments to filter MedicineAlternatives to delete.
     * @example
     * // Delete a few MedicineAlternatives
     * const { count } = await prisma.medicineAlternative.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MedicineAlternativeDeleteManyArgs>(args?: Prisma.SelectSubset<T, MedicineAlternativeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MedicineAlternatives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAlternativeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicineAlternatives
     * const medicineAlternative = await prisma.medicineAlternative.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MedicineAlternativeUpdateManyArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MedicineAlternatives and returns the data updated in the database.
     * @param {MedicineAlternativeUpdateManyAndReturnArgs} args - Arguments to update many MedicineAlternatives.
     * @example
     * // Update many MedicineAlternatives
     * const medicineAlternative = await prisma.medicineAlternative.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MedicineAlternatives and only return the `id`
     * const medicineAlternativeWithIdOnly = await prisma.medicineAlternative.updateManyAndReturn({
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
    updateManyAndReturn<T extends MedicineAlternativeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MedicineAlternative.
     * @param {MedicineAlternativeUpsertArgs} args - Arguments to update or create a MedicineAlternative.
     * @example
     * // Update or create a MedicineAlternative
     * const medicineAlternative = await prisma.medicineAlternative.upsert({
     *   create: {
     *     // ... data to create a MedicineAlternative
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicineAlternative we want to update
     *   }
     * })
     */
    upsert<T extends MedicineAlternativeUpsertArgs>(args: Prisma.SelectSubset<T, MedicineAlternativeUpsertArgs<ExtArgs>>): Prisma.Prisma__MedicineAlternativeClient<runtime.Types.Result.GetResult<Prisma.$MedicineAlternativePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MedicineAlternatives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAlternativeCountArgs} args - Arguments to filter MedicineAlternatives to count.
     * @example
     * // Count the number of MedicineAlternatives
     * const count = await prisma.medicineAlternative.count({
     *   where: {
     *     // ... the filter for the MedicineAlternatives we want to count
     *   }
     * })
    **/
    count<T extends MedicineAlternativeCountArgs>(args?: Prisma.Subset<T, MedicineAlternativeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MedicineAlternativeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MedicineAlternative.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAlternativeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicineAlternativeAggregateArgs>(args: Prisma.Subset<T, MedicineAlternativeAggregateArgs>): Prisma.PrismaPromise<GetMedicineAlternativeAggregateType<T>>;
    /**
     * Group by MedicineAlternative.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineAlternativeGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MedicineAlternativeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MedicineAlternativeGroupByArgs['orderBy'];
    } : {
        orderBy?: MedicineAlternativeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MedicineAlternativeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicineAlternativeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MedicineAlternative model
     */
    readonly fields: MedicineAlternativeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MedicineAlternative.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MedicineAlternativeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    activeSubstance<T extends Prisma.ActiveSubstanceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ActiveSubstanceDefaultArgs<ExtArgs>>): Prisma.Prisma__ActiveSubstanceClient<runtime.Types.Result.GetResult<Prisma.$ActiveSubstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    alternativeActiveSubstance<T extends Prisma.ActiveSubstanceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ActiveSubstanceDefaultArgs<ExtArgs>>): Prisma.Prisma__ActiveSubstanceClient<runtime.Types.Result.GetResult<Prisma.$ActiveSubstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MedicineAlternative model
 */
export interface MedicineAlternativeFieldRefs {
    readonly id: Prisma.FieldRef<"MedicineAlternative", 'Int'>;
    readonly activeSubstanceId: Prisma.FieldRef<"MedicineAlternative", 'Int'>;
    readonly alternativeActiveSubstanceId: Prisma.FieldRef<"MedicineAlternative", 'Int'>;
    readonly reason: Prisma.FieldRef<"MedicineAlternative", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MedicineAlternative", 'DateTime'>;
}
/**
 * MedicineAlternative findUnique
 */
export type MedicineAlternativeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineAlternative to fetch.
     */
    where: Prisma.MedicineAlternativeWhereUniqueInput;
};
/**
 * MedicineAlternative findUniqueOrThrow
 */
export type MedicineAlternativeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineAlternative to fetch.
     */
    where: Prisma.MedicineAlternativeWhereUniqueInput;
};
/**
 * MedicineAlternative findFirst
 */
export type MedicineAlternativeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineAlternative to fetch.
     */
    where?: Prisma.MedicineAlternativeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineAlternatives to fetch.
     */
    orderBy?: Prisma.MedicineAlternativeOrderByWithRelationInput | Prisma.MedicineAlternativeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MedicineAlternatives.
     */
    cursor?: Prisma.MedicineAlternativeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineAlternatives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineAlternatives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MedicineAlternatives.
     */
    distinct?: Prisma.MedicineAlternativeScalarFieldEnum | Prisma.MedicineAlternativeScalarFieldEnum[];
};
/**
 * MedicineAlternative findFirstOrThrow
 */
export type MedicineAlternativeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineAlternative to fetch.
     */
    where?: Prisma.MedicineAlternativeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineAlternatives to fetch.
     */
    orderBy?: Prisma.MedicineAlternativeOrderByWithRelationInput | Prisma.MedicineAlternativeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MedicineAlternatives.
     */
    cursor?: Prisma.MedicineAlternativeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineAlternatives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineAlternatives.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MedicineAlternatives.
     */
    distinct?: Prisma.MedicineAlternativeScalarFieldEnum | Prisma.MedicineAlternativeScalarFieldEnum[];
};
/**
 * MedicineAlternative findMany
 */
export type MedicineAlternativeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineAlternatives to fetch.
     */
    where?: Prisma.MedicineAlternativeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineAlternatives to fetch.
     */
    orderBy?: Prisma.MedicineAlternativeOrderByWithRelationInput | Prisma.MedicineAlternativeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MedicineAlternatives.
     */
    cursor?: Prisma.MedicineAlternativeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineAlternatives from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineAlternatives.
     */
    skip?: number;
    distinct?: Prisma.MedicineAlternativeScalarFieldEnum | Prisma.MedicineAlternativeScalarFieldEnum[];
};
/**
 * MedicineAlternative create
 */
export type MedicineAlternativeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * The data needed to create a MedicineAlternative.
     */
    data: Prisma.XOR<Prisma.MedicineAlternativeCreateInput, Prisma.MedicineAlternativeUncheckedCreateInput>;
};
/**
 * MedicineAlternative createMany
 */
export type MedicineAlternativeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicineAlternatives.
     */
    data: Prisma.MedicineAlternativeCreateManyInput | Prisma.MedicineAlternativeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MedicineAlternative createManyAndReturn
 */
export type MedicineAlternativeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * The data used to create many MedicineAlternatives.
     */
    data: Prisma.MedicineAlternativeCreateManyInput | Prisma.MedicineAlternativeCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MedicineAlternative update
 */
export type MedicineAlternativeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * The data needed to update a MedicineAlternative.
     */
    data: Prisma.XOR<Prisma.MedicineAlternativeUpdateInput, Prisma.MedicineAlternativeUncheckedUpdateInput>;
    /**
     * Choose, which MedicineAlternative to update.
     */
    where: Prisma.MedicineAlternativeWhereUniqueInput;
};
/**
 * MedicineAlternative updateMany
 */
export type MedicineAlternativeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicineAlternatives.
     */
    data: Prisma.XOR<Prisma.MedicineAlternativeUpdateManyMutationInput, Prisma.MedicineAlternativeUncheckedUpdateManyInput>;
    /**
     * Filter which MedicineAlternatives to update
     */
    where?: Prisma.MedicineAlternativeWhereInput;
    /**
     * Limit how many MedicineAlternatives to update.
     */
    limit?: number;
};
/**
 * MedicineAlternative updateManyAndReturn
 */
export type MedicineAlternativeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * The data used to update MedicineAlternatives.
     */
    data: Prisma.XOR<Prisma.MedicineAlternativeUpdateManyMutationInput, Prisma.MedicineAlternativeUncheckedUpdateManyInput>;
    /**
     * Filter which MedicineAlternatives to update
     */
    where?: Prisma.MedicineAlternativeWhereInput;
    /**
     * Limit how many MedicineAlternatives to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MedicineAlternative upsert
 */
export type MedicineAlternativeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * The filter to search for the MedicineAlternative to update in case it exists.
     */
    where: Prisma.MedicineAlternativeWhereUniqueInput;
    /**
     * In case the MedicineAlternative found by the `where` argument doesn't exist, create a new MedicineAlternative with this data.
     */
    create: Prisma.XOR<Prisma.MedicineAlternativeCreateInput, Prisma.MedicineAlternativeUncheckedCreateInput>;
    /**
     * In case the MedicineAlternative was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MedicineAlternativeUpdateInput, Prisma.MedicineAlternativeUncheckedUpdateInput>;
};
/**
 * MedicineAlternative delete
 */
export type MedicineAlternativeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
    /**
     * Filter which MedicineAlternative to delete.
     */
    where: Prisma.MedicineAlternativeWhereUniqueInput;
};
/**
 * MedicineAlternative deleteMany
 */
export type MedicineAlternativeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineAlternatives to delete
     */
    where?: Prisma.MedicineAlternativeWhereInput;
    /**
     * Limit how many MedicineAlternatives to delete.
     */
    limit?: number;
};
/**
 * MedicineAlternative without action
 */
export type MedicineAlternativeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineAlternative
     */
    select?: Prisma.MedicineAlternativeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineAlternative
     */
    omit?: Prisma.MedicineAlternativeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineAlternativeInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MedicineAlternative.d.ts.map