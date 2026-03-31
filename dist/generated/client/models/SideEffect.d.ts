import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SideEffect
 *
 */
export type SideEffectModel = runtime.Types.Result.DefaultSelection<Prisma.$SideEffectPayload>;
export type AggregateSideEffect = {
    _count: SideEffectCountAggregateOutputType | null;
    _avg: SideEffectAvgAggregateOutputType | null;
    _sum: SideEffectSumAggregateOutputType | null;
    _min: SideEffectMinAggregateOutputType | null;
    _max: SideEffectMaxAggregateOutputType | null;
};
export type SideEffectAvgAggregateOutputType = {
    id: number | null;
    createdByUserId: number | null;
};
export type SideEffectSumAggregateOutputType = {
    id: number | null;
    createdByUserId: number | null;
};
export type SideEffectMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    nameAr: string | null;
    createdBy: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    createdByUserId: number | null;
};
export type SideEffectMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    nameAr: string | null;
    createdBy: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    createdByUserId: number | null;
};
export type SideEffectCountAggregateOutputType = {
    id: number;
    name: number;
    nameAr: number;
    createdBy: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    createdByUserId: number;
    _all: number;
};
export type SideEffectAvgAggregateInputType = {
    id?: true;
    createdByUserId?: true;
};
export type SideEffectSumAggregateInputType = {
    id?: true;
    createdByUserId?: true;
};
export type SideEffectMinAggregateInputType = {
    id?: true;
    name?: true;
    nameAr?: true;
    createdBy?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    createdByUserId?: true;
};
export type SideEffectMaxAggregateInputType = {
    id?: true;
    name?: true;
    nameAr?: true;
    createdBy?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    createdByUserId?: true;
};
export type SideEffectCountAggregateInputType = {
    id?: true;
    name?: true;
    nameAr?: true;
    createdBy?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    createdByUserId?: true;
    _all?: true;
};
export type SideEffectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SideEffect to aggregate.
     */
    where?: Prisma.SideEffectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SideEffects to fetch.
     */
    orderBy?: Prisma.SideEffectOrderByWithRelationInput | Prisma.SideEffectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SideEffectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SideEffects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SideEffects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SideEffects
    **/
    _count?: true | SideEffectCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SideEffectAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SideEffectSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SideEffectMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SideEffectMaxAggregateInputType;
};
export type GetSideEffectAggregateType<T extends SideEffectAggregateArgs> = {
    [P in keyof T & keyof AggregateSideEffect]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSideEffect[P]> : Prisma.GetScalarType<T[P], AggregateSideEffect[P]>;
};
export type SideEffectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SideEffectWhereInput;
    orderBy?: Prisma.SideEffectOrderByWithAggregationInput | Prisma.SideEffectOrderByWithAggregationInput[];
    by: Prisma.SideEffectScalarFieldEnum[] | Prisma.SideEffectScalarFieldEnum;
    having?: Prisma.SideEffectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SideEffectCountAggregateInputType | true;
    _avg?: SideEffectAvgAggregateInputType;
    _sum?: SideEffectSumAggregateInputType;
    _min?: SideEffectMinAggregateInputType;
    _max?: SideEffectMaxAggregateInputType;
};
export type SideEffectGroupByOutputType = {
    id: number;
    name: string;
    nameAr: string | null;
    createdBy: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    createdByUserId: number | null;
    _count: SideEffectCountAggregateOutputType | null;
    _avg: SideEffectAvgAggregateOutputType | null;
    _sum: SideEffectSumAggregateOutputType | null;
    _min: SideEffectMinAggregateOutputType | null;
    _max: SideEffectMaxAggregateOutputType | null;
};
type GetSideEffectGroupByPayload<T extends SideEffectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SideEffectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SideEffectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SideEffectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SideEffectGroupByOutputType[P]>;
}>>;
export type SideEffectWhereInput = {
    AND?: Prisma.SideEffectWhereInput | Prisma.SideEffectWhereInput[];
    OR?: Prisma.SideEffectWhereInput[];
    NOT?: Prisma.SideEffectWhereInput | Prisma.SideEffectWhereInput[];
    id?: Prisma.IntFilter<"SideEffect"> | number;
    name?: Prisma.StringFilter<"SideEffect"> | string;
    nameAr?: Prisma.StringNullableFilter<"SideEffect"> | string | null;
    createdBy?: Prisma.StringFilter<"SideEffect"> | string;
    status?: Prisma.StringFilter<"SideEffect"> | string;
    createdAt?: Prisma.DateTimeFilter<"SideEffect"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SideEffect"> | Date | string;
    createdByUserId?: Prisma.IntNullableFilter<"SideEffect"> | number | null;
    createdByUser?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    tradeNames?: Prisma.TradeNameSideEffectListRelationFilter;
};
export type SideEffectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameAr?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdByUser?: Prisma.UserOrderByWithRelationInput;
    tradeNames?: Prisma.TradeNameSideEffectOrderByRelationAggregateInput;
};
export type SideEffectWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.SideEffectWhereInput | Prisma.SideEffectWhereInput[];
    OR?: Prisma.SideEffectWhereInput[];
    NOT?: Prisma.SideEffectWhereInput | Prisma.SideEffectWhereInput[];
    name?: Prisma.StringFilter<"SideEffect"> | string;
    nameAr?: Prisma.StringNullableFilter<"SideEffect"> | string | null;
    createdBy?: Prisma.StringFilter<"SideEffect"> | string;
    status?: Prisma.StringFilter<"SideEffect"> | string;
    createdAt?: Prisma.DateTimeFilter<"SideEffect"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SideEffect"> | Date | string;
    createdByUserId?: Prisma.IntNullableFilter<"SideEffect"> | number | null;
    createdByUser?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    tradeNames?: Prisma.TradeNameSideEffectListRelationFilter;
}, "id">;
export type SideEffectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameAr?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SideEffectCountOrderByAggregateInput;
    _avg?: Prisma.SideEffectAvgOrderByAggregateInput;
    _max?: Prisma.SideEffectMaxOrderByAggregateInput;
    _min?: Prisma.SideEffectMinOrderByAggregateInput;
    _sum?: Prisma.SideEffectSumOrderByAggregateInput;
};
export type SideEffectScalarWhereWithAggregatesInput = {
    AND?: Prisma.SideEffectScalarWhereWithAggregatesInput | Prisma.SideEffectScalarWhereWithAggregatesInput[];
    OR?: Prisma.SideEffectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SideEffectScalarWhereWithAggregatesInput | Prisma.SideEffectScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"SideEffect"> | number;
    name?: Prisma.StringWithAggregatesFilter<"SideEffect"> | string;
    nameAr?: Prisma.StringNullableWithAggregatesFilter<"SideEffect"> | string | null;
    createdBy?: Prisma.StringWithAggregatesFilter<"SideEffect"> | string;
    status?: Prisma.StringWithAggregatesFilter<"SideEffect"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SideEffect"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SideEffect"> | Date | string;
    createdByUserId?: Prisma.IntNullableWithAggregatesFilter<"SideEffect"> | number | null;
};
export type SideEffectCreateInput = {
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdByUser?: Prisma.UserCreateNestedOneWithoutCreatedSideEffectsInput;
    tradeNames?: Prisma.TradeNameSideEffectCreateNestedManyWithoutSideEffectInput;
};
export type SideEffectUncheckedCreateInput = {
    id?: number;
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdByUserId?: number | null;
    tradeNames?: Prisma.TradeNameSideEffectUncheckedCreateNestedManyWithoutSideEffectInput;
};
export type SideEffectUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdByUser?: Prisma.UserUpdateOneWithoutCreatedSideEffectsNestedInput;
    tradeNames?: Prisma.TradeNameSideEffectUpdateManyWithoutSideEffectNestedInput;
};
export type SideEffectUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdByUserId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tradeNames?: Prisma.TradeNameSideEffectUncheckedUpdateManyWithoutSideEffectNestedInput;
};
export type SideEffectCreateManyInput = {
    id?: number;
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdByUserId?: number | null;
};
export type SideEffectUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SideEffectUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdByUserId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SideEffectListRelationFilter = {
    every?: Prisma.SideEffectWhereInput;
    some?: Prisma.SideEffectWhereInput;
    none?: Prisma.SideEffectWhereInput;
};
export type SideEffectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SideEffectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameAr?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
};
export type SideEffectAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
};
export type SideEffectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameAr?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
};
export type SideEffectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameAr?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
};
export type SideEffectSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
};
export type SideEffectScalarRelationFilter = {
    is?: Prisma.SideEffectWhereInput;
    isNot?: Prisma.SideEffectWhereInput;
};
export type SideEffectCreateNestedManyWithoutCreatedByUserInput = {
    create?: Prisma.XOR<Prisma.SideEffectCreateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput> | Prisma.SideEffectCreateWithoutCreatedByUserInput[] | Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput | Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput[];
    createMany?: Prisma.SideEffectCreateManyCreatedByUserInputEnvelope;
    connect?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
};
export type SideEffectUncheckedCreateNestedManyWithoutCreatedByUserInput = {
    create?: Prisma.XOR<Prisma.SideEffectCreateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput> | Prisma.SideEffectCreateWithoutCreatedByUserInput[] | Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput | Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput[];
    createMany?: Prisma.SideEffectCreateManyCreatedByUserInputEnvelope;
    connect?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
};
export type SideEffectUpdateManyWithoutCreatedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.SideEffectCreateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput> | Prisma.SideEffectCreateWithoutCreatedByUserInput[] | Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput | Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput[];
    upsert?: Prisma.SideEffectUpsertWithWhereUniqueWithoutCreatedByUserInput | Prisma.SideEffectUpsertWithWhereUniqueWithoutCreatedByUserInput[];
    createMany?: Prisma.SideEffectCreateManyCreatedByUserInputEnvelope;
    set?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    disconnect?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    delete?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    connect?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    update?: Prisma.SideEffectUpdateWithWhereUniqueWithoutCreatedByUserInput | Prisma.SideEffectUpdateWithWhereUniqueWithoutCreatedByUserInput[];
    updateMany?: Prisma.SideEffectUpdateManyWithWhereWithoutCreatedByUserInput | Prisma.SideEffectUpdateManyWithWhereWithoutCreatedByUserInput[];
    deleteMany?: Prisma.SideEffectScalarWhereInput | Prisma.SideEffectScalarWhereInput[];
};
export type SideEffectUncheckedUpdateManyWithoutCreatedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.SideEffectCreateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput> | Prisma.SideEffectCreateWithoutCreatedByUserInput[] | Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?: Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput | Prisma.SideEffectCreateOrConnectWithoutCreatedByUserInput[];
    upsert?: Prisma.SideEffectUpsertWithWhereUniqueWithoutCreatedByUserInput | Prisma.SideEffectUpsertWithWhereUniqueWithoutCreatedByUserInput[];
    createMany?: Prisma.SideEffectCreateManyCreatedByUserInputEnvelope;
    set?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    disconnect?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    delete?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    connect?: Prisma.SideEffectWhereUniqueInput | Prisma.SideEffectWhereUniqueInput[];
    update?: Prisma.SideEffectUpdateWithWhereUniqueWithoutCreatedByUserInput | Prisma.SideEffectUpdateWithWhereUniqueWithoutCreatedByUserInput[];
    updateMany?: Prisma.SideEffectUpdateManyWithWhereWithoutCreatedByUserInput | Prisma.SideEffectUpdateManyWithWhereWithoutCreatedByUserInput[];
    deleteMany?: Prisma.SideEffectScalarWhereInput | Prisma.SideEffectScalarWhereInput[];
};
export type SideEffectCreateNestedOneWithoutTradeNamesInput = {
    create?: Prisma.XOR<Prisma.SideEffectCreateWithoutTradeNamesInput, Prisma.SideEffectUncheckedCreateWithoutTradeNamesInput>;
    connectOrCreate?: Prisma.SideEffectCreateOrConnectWithoutTradeNamesInput;
    connect?: Prisma.SideEffectWhereUniqueInput;
};
export type SideEffectUpdateOneRequiredWithoutTradeNamesNestedInput = {
    create?: Prisma.XOR<Prisma.SideEffectCreateWithoutTradeNamesInput, Prisma.SideEffectUncheckedCreateWithoutTradeNamesInput>;
    connectOrCreate?: Prisma.SideEffectCreateOrConnectWithoutTradeNamesInput;
    upsert?: Prisma.SideEffectUpsertWithoutTradeNamesInput;
    connect?: Prisma.SideEffectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SideEffectUpdateToOneWithWhereWithoutTradeNamesInput, Prisma.SideEffectUpdateWithoutTradeNamesInput>, Prisma.SideEffectUncheckedUpdateWithoutTradeNamesInput>;
};
export type SideEffectCreateWithoutCreatedByUserInput = {
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tradeNames?: Prisma.TradeNameSideEffectCreateNestedManyWithoutSideEffectInput;
};
export type SideEffectUncheckedCreateWithoutCreatedByUserInput = {
    id?: number;
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tradeNames?: Prisma.TradeNameSideEffectUncheckedCreateNestedManyWithoutSideEffectInput;
};
export type SideEffectCreateOrConnectWithoutCreatedByUserInput = {
    where: Prisma.SideEffectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SideEffectCreateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput>;
};
export type SideEffectCreateManyCreatedByUserInputEnvelope = {
    data: Prisma.SideEffectCreateManyCreatedByUserInput | Prisma.SideEffectCreateManyCreatedByUserInput[];
    skipDuplicates?: boolean;
};
export type SideEffectUpsertWithWhereUniqueWithoutCreatedByUserInput = {
    where: Prisma.SideEffectWhereUniqueInput;
    update: Prisma.XOR<Prisma.SideEffectUpdateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedUpdateWithoutCreatedByUserInput>;
    create: Prisma.XOR<Prisma.SideEffectCreateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedCreateWithoutCreatedByUserInput>;
};
export type SideEffectUpdateWithWhereUniqueWithoutCreatedByUserInput = {
    where: Prisma.SideEffectWhereUniqueInput;
    data: Prisma.XOR<Prisma.SideEffectUpdateWithoutCreatedByUserInput, Prisma.SideEffectUncheckedUpdateWithoutCreatedByUserInput>;
};
export type SideEffectUpdateManyWithWhereWithoutCreatedByUserInput = {
    where: Prisma.SideEffectScalarWhereInput;
    data: Prisma.XOR<Prisma.SideEffectUpdateManyMutationInput, Prisma.SideEffectUncheckedUpdateManyWithoutCreatedByUserInput>;
};
export type SideEffectScalarWhereInput = {
    AND?: Prisma.SideEffectScalarWhereInput | Prisma.SideEffectScalarWhereInput[];
    OR?: Prisma.SideEffectScalarWhereInput[];
    NOT?: Prisma.SideEffectScalarWhereInput | Prisma.SideEffectScalarWhereInput[];
    id?: Prisma.IntFilter<"SideEffect"> | number;
    name?: Prisma.StringFilter<"SideEffect"> | string;
    nameAr?: Prisma.StringNullableFilter<"SideEffect"> | string | null;
    createdBy?: Prisma.StringFilter<"SideEffect"> | string;
    status?: Prisma.StringFilter<"SideEffect"> | string;
    createdAt?: Prisma.DateTimeFilter<"SideEffect"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SideEffect"> | Date | string;
    createdByUserId?: Prisma.IntNullableFilter<"SideEffect"> | number | null;
};
export type SideEffectCreateWithoutTradeNamesInput = {
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdByUser?: Prisma.UserCreateNestedOneWithoutCreatedSideEffectsInput;
};
export type SideEffectUncheckedCreateWithoutTradeNamesInput = {
    id?: number;
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdByUserId?: number | null;
};
export type SideEffectCreateOrConnectWithoutTradeNamesInput = {
    where: Prisma.SideEffectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SideEffectCreateWithoutTradeNamesInput, Prisma.SideEffectUncheckedCreateWithoutTradeNamesInput>;
};
export type SideEffectUpsertWithoutTradeNamesInput = {
    update: Prisma.XOR<Prisma.SideEffectUpdateWithoutTradeNamesInput, Prisma.SideEffectUncheckedUpdateWithoutTradeNamesInput>;
    create: Prisma.XOR<Prisma.SideEffectCreateWithoutTradeNamesInput, Prisma.SideEffectUncheckedCreateWithoutTradeNamesInput>;
    where?: Prisma.SideEffectWhereInput;
};
export type SideEffectUpdateToOneWithWhereWithoutTradeNamesInput = {
    where?: Prisma.SideEffectWhereInput;
    data: Prisma.XOR<Prisma.SideEffectUpdateWithoutTradeNamesInput, Prisma.SideEffectUncheckedUpdateWithoutTradeNamesInput>;
};
export type SideEffectUpdateWithoutTradeNamesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdByUser?: Prisma.UserUpdateOneWithoutCreatedSideEffectsNestedInput;
};
export type SideEffectUncheckedUpdateWithoutTradeNamesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdByUserId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type SideEffectCreateManyCreatedByUserInput = {
    id?: number;
    name: string;
    nameAr?: string | null;
    createdBy?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SideEffectUpdateWithoutCreatedByUserInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tradeNames?: Prisma.TradeNameSideEffectUpdateManyWithoutSideEffectNestedInput;
};
export type SideEffectUncheckedUpdateWithoutCreatedByUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tradeNames?: Prisma.TradeNameSideEffectUncheckedUpdateManyWithoutSideEffectNestedInput;
};
export type SideEffectUncheckedUpdateManyWithoutCreatedByUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameAr?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type SideEffectCountOutputType
 */
export type SideEffectCountOutputType = {
    tradeNames: number;
};
export type SideEffectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tradeNames?: boolean | SideEffectCountOutputTypeCountTradeNamesArgs;
};
/**
 * SideEffectCountOutputType without action
 */
export type SideEffectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffectCountOutputType
     */
    select?: Prisma.SideEffectCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SideEffectCountOutputType without action
 */
export type SideEffectCountOutputTypeCountTradeNamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TradeNameSideEffectWhereInput;
};
export type SideEffectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    nameAr?: boolean;
    createdBy?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    createdByUserId?: boolean;
    createdByUser?: boolean | Prisma.SideEffect$createdByUserArgs<ExtArgs>;
    tradeNames?: boolean | Prisma.SideEffect$tradeNamesArgs<ExtArgs>;
    _count?: boolean | Prisma.SideEffectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sideEffect"]>;
export type SideEffectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    nameAr?: boolean;
    createdBy?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    createdByUserId?: boolean;
    createdByUser?: boolean | Prisma.SideEffect$createdByUserArgs<ExtArgs>;
}, ExtArgs["result"]["sideEffect"]>;
export type SideEffectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    nameAr?: boolean;
    createdBy?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    createdByUserId?: boolean;
    createdByUser?: boolean | Prisma.SideEffect$createdByUserArgs<ExtArgs>;
}, ExtArgs["result"]["sideEffect"]>;
export type SideEffectSelectScalar = {
    id?: boolean;
    name?: boolean;
    nameAr?: boolean;
    createdBy?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    createdByUserId?: boolean;
};
export type SideEffectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "nameAr" | "createdBy" | "status" | "createdAt" | "updatedAt" | "createdByUserId", ExtArgs["result"]["sideEffect"]>;
export type SideEffectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdByUser?: boolean | Prisma.SideEffect$createdByUserArgs<ExtArgs>;
    tradeNames?: boolean | Prisma.SideEffect$tradeNamesArgs<ExtArgs>;
    _count?: boolean | Prisma.SideEffectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SideEffectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdByUser?: boolean | Prisma.SideEffect$createdByUserArgs<ExtArgs>;
};
export type SideEffectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    createdByUser?: boolean | Prisma.SideEffect$createdByUserArgs<ExtArgs>;
};
export type $SideEffectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SideEffect";
    objects: {
        createdByUser: Prisma.$UserPayload<ExtArgs> | null;
        tradeNames: Prisma.$TradeNameSideEffectPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        nameAr: string | null;
        createdBy: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        createdByUserId: number | null;
    }, ExtArgs["result"]["sideEffect"]>;
    composites: {};
};
export type SideEffectGetPayload<S extends boolean | null | undefined | SideEffectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SideEffectPayload, S>;
export type SideEffectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SideEffectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SideEffectCountAggregateInputType | true;
};
export interface SideEffectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SideEffect'];
        meta: {
            name: 'SideEffect';
        };
    };
    /**
     * Find zero or one SideEffect that matches the filter.
     * @param {SideEffectFindUniqueArgs} args - Arguments to find a SideEffect
     * @example
     * // Get one SideEffect
     * const sideEffect = await prisma.sideEffect.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SideEffectFindUniqueArgs>(args: Prisma.SelectSubset<T, SideEffectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SideEffect that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SideEffectFindUniqueOrThrowArgs} args - Arguments to find a SideEffect
     * @example
     * // Get one SideEffect
     * const sideEffect = await prisma.sideEffect.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SideEffectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SideEffectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SideEffect that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SideEffectFindFirstArgs} args - Arguments to find a SideEffect
     * @example
     * // Get one SideEffect
     * const sideEffect = await prisma.sideEffect.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SideEffectFindFirstArgs>(args?: Prisma.SelectSubset<T, SideEffectFindFirstArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SideEffect that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SideEffectFindFirstOrThrowArgs} args - Arguments to find a SideEffect
     * @example
     * // Get one SideEffect
     * const sideEffect = await prisma.sideEffect.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SideEffectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SideEffectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SideEffects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SideEffectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SideEffects
     * const sideEffects = await prisma.sideEffect.findMany()
     *
     * // Get first 10 SideEffects
     * const sideEffects = await prisma.sideEffect.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sideEffectWithIdOnly = await prisma.sideEffect.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SideEffectFindManyArgs>(args?: Prisma.SelectSubset<T, SideEffectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SideEffect.
     * @param {SideEffectCreateArgs} args - Arguments to create a SideEffect.
     * @example
     * // Create one SideEffect
     * const SideEffect = await prisma.sideEffect.create({
     *   data: {
     *     // ... data to create a SideEffect
     *   }
     * })
     *
     */
    create<T extends SideEffectCreateArgs>(args: Prisma.SelectSubset<T, SideEffectCreateArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SideEffects.
     * @param {SideEffectCreateManyArgs} args - Arguments to create many SideEffects.
     * @example
     * // Create many SideEffects
     * const sideEffect = await prisma.sideEffect.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SideEffectCreateManyArgs>(args?: Prisma.SelectSubset<T, SideEffectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SideEffects and returns the data saved in the database.
     * @param {SideEffectCreateManyAndReturnArgs} args - Arguments to create many SideEffects.
     * @example
     * // Create many SideEffects
     * const sideEffect = await prisma.sideEffect.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SideEffects and only return the `id`
     * const sideEffectWithIdOnly = await prisma.sideEffect.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SideEffectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SideEffectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SideEffect.
     * @param {SideEffectDeleteArgs} args - Arguments to delete one SideEffect.
     * @example
     * // Delete one SideEffect
     * const SideEffect = await prisma.sideEffect.delete({
     *   where: {
     *     // ... filter to delete one SideEffect
     *   }
     * })
     *
     */
    delete<T extends SideEffectDeleteArgs>(args: Prisma.SelectSubset<T, SideEffectDeleteArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SideEffect.
     * @param {SideEffectUpdateArgs} args - Arguments to update one SideEffect.
     * @example
     * // Update one SideEffect
     * const sideEffect = await prisma.sideEffect.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SideEffectUpdateArgs>(args: Prisma.SelectSubset<T, SideEffectUpdateArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SideEffects.
     * @param {SideEffectDeleteManyArgs} args - Arguments to filter SideEffects to delete.
     * @example
     * // Delete a few SideEffects
     * const { count } = await prisma.sideEffect.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SideEffectDeleteManyArgs>(args?: Prisma.SelectSubset<T, SideEffectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SideEffects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SideEffectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SideEffects
     * const sideEffect = await prisma.sideEffect.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SideEffectUpdateManyArgs>(args: Prisma.SelectSubset<T, SideEffectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SideEffects and returns the data updated in the database.
     * @param {SideEffectUpdateManyAndReturnArgs} args - Arguments to update many SideEffects.
     * @example
     * // Update many SideEffects
     * const sideEffect = await prisma.sideEffect.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SideEffects and only return the `id`
     * const sideEffectWithIdOnly = await prisma.sideEffect.updateManyAndReturn({
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
    updateManyAndReturn<T extends SideEffectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SideEffectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SideEffect.
     * @param {SideEffectUpsertArgs} args - Arguments to update or create a SideEffect.
     * @example
     * // Update or create a SideEffect
     * const sideEffect = await prisma.sideEffect.upsert({
     *   create: {
     *     // ... data to create a SideEffect
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SideEffect we want to update
     *   }
     * })
     */
    upsert<T extends SideEffectUpsertArgs>(args: Prisma.SelectSubset<T, SideEffectUpsertArgs<ExtArgs>>): Prisma.Prisma__SideEffectClient<runtime.Types.Result.GetResult<Prisma.$SideEffectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SideEffects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SideEffectCountArgs} args - Arguments to filter SideEffects to count.
     * @example
     * // Count the number of SideEffects
     * const count = await prisma.sideEffect.count({
     *   where: {
     *     // ... the filter for the SideEffects we want to count
     *   }
     * })
    **/
    count<T extends SideEffectCountArgs>(args?: Prisma.Subset<T, SideEffectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SideEffectCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SideEffect.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SideEffectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SideEffectAggregateArgs>(args: Prisma.Subset<T, SideEffectAggregateArgs>): Prisma.PrismaPromise<GetSideEffectAggregateType<T>>;
    /**
     * Group by SideEffect.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SideEffectGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SideEffectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SideEffectGroupByArgs['orderBy'];
    } : {
        orderBy?: SideEffectGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SideEffectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSideEffectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SideEffect model
     */
    readonly fields: SideEffectFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SideEffect.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SideEffectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    createdByUser<T extends Prisma.SideEffect$createdByUserArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SideEffect$createdByUserArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    tradeNames<T extends Prisma.SideEffect$tradeNamesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SideEffect$tradeNamesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TradeNameSideEffectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the SideEffect model
 */
export interface SideEffectFieldRefs {
    readonly id: Prisma.FieldRef<"SideEffect", 'Int'>;
    readonly name: Prisma.FieldRef<"SideEffect", 'String'>;
    readonly nameAr: Prisma.FieldRef<"SideEffect", 'String'>;
    readonly createdBy: Prisma.FieldRef<"SideEffect", 'String'>;
    readonly status: Prisma.FieldRef<"SideEffect", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SideEffect", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SideEffect", 'DateTime'>;
    readonly createdByUserId: Prisma.FieldRef<"SideEffect", 'Int'>;
}
/**
 * SideEffect findUnique
 */
export type SideEffectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * Filter, which SideEffect to fetch.
     */
    where: Prisma.SideEffectWhereUniqueInput;
};
/**
 * SideEffect findUniqueOrThrow
 */
export type SideEffectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * Filter, which SideEffect to fetch.
     */
    where: Prisma.SideEffectWhereUniqueInput;
};
/**
 * SideEffect findFirst
 */
export type SideEffectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * Filter, which SideEffect to fetch.
     */
    where?: Prisma.SideEffectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SideEffects to fetch.
     */
    orderBy?: Prisma.SideEffectOrderByWithRelationInput | Prisma.SideEffectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SideEffects.
     */
    cursor?: Prisma.SideEffectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SideEffects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SideEffects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SideEffects.
     */
    distinct?: Prisma.SideEffectScalarFieldEnum | Prisma.SideEffectScalarFieldEnum[];
};
/**
 * SideEffect findFirstOrThrow
 */
export type SideEffectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * Filter, which SideEffect to fetch.
     */
    where?: Prisma.SideEffectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SideEffects to fetch.
     */
    orderBy?: Prisma.SideEffectOrderByWithRelationInput | Prisma.SideEffectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SideEffects.
     */
    cursor?: Prisma.SideEffectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SideEffects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SideEffects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SideEffects.
     */
    distinct?: Prisma.SideEffectScalarFieldEnum | Prisma.SideEffectScalarFieldEnum[];
};
/**
 * SideEffect findMany
 */
export type SideEffectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * Filter, which SideEffects to fetch.
     */
    where?: Prisma.SideEffectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SideEffects to fetch.
     */
    orderBy?: Prisma.SideEffectOrderByWithRelationInput | Prisma.SideEffectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SideEffects.
     */
    cursor?: Prisma.SideEffectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SideEffects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SideEffects.
     */
    skip?: number;
    distinct?: Prisma.SideEffectScalarFieldEnum | Prisma.SideEffectScalarFieldEnum[];
};
/**
 * SideEffect create
 */
export type SideEffectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * The data needed to create a SideEffect.
     */
    data: Prisma.XOR<Prisma.SideEffectCreateInput, Prisma.SideEffectUncheckedCreateInput>;
};
/**
 * SideEffect createMany
 */
export type SideEffectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SideEffects.
     */
    data: Prisma.SideEffectCreateManyInput | Prisma.SideEffectCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SideEffect createManyAndReturn
 */
export type SideEffectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * The data used to create many SideEffects.
     */
    data: Prisma.SideEffectCreateManyInput | Prisma.SideEffectCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * SideEffect update
 */
export type SideEffectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * The data needed to update a SideEffect.
     */
    data: Prisma.XOR<Prisma.SideEffectUpdateInput, Prisma.SideEffectUncheckedUpdateInput>;
    /**
     * Choose, which SideEffect to update.
     */
    where: Prisma.SideEffectWhereUniqueInput;
};
/**
 * SideEffect updateMany
 */
export type SideEffectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SideEffects.
     */
    data: Prisma.XOR<Prisma.SideEffectUpdateManyMutationInput, Prisma.SideEffectUncheckedUpdateManyInput>;
    /**
     * Filter which SideEffects to update
     */
    where?: Prisma.SideEffectWhereInput;
    /**
     * Limit how many SideEffects to update.
     */
    limit?: number;
};
/**
 * SideEffect updateManyAndReturn
 */
export type SideEffectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * The data used to update SideEffects.
     */
    data: Prisma.XOR<Prisma.SideEffectUpdateManyMutationInput, Prisma.SideEffectUncheckedUpdateManyInput>;
    /**
     * Filter which SideEffects to update
     */
    where?: Prisma.SideEffectWhereInput;
    /**
     * Limit how many SideEffects to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * SideEffect upsert
 */
export type SideEffectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * The filter to search for the SideEffect to update in case it exists.
     */
    where: Prisma.SideEffectWhereUniqueInput;
    /**
     * In case the SideEffect found by the `where` argument doesn't exist, create a new SideEffect with this data.
     */
    create: Prisma.XOR<Prisma.SideEffectCreateInput, Prisma.SideEffectUncheckedCreateInput>;
    /**
     * In case the SideEffect was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SideEffectUpdateInput, Prisma.SideEffectUncheckedUpdateInput>;
};
/**
 * SideEffect delete
 */
export type SideEffectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
    /**
     * Filter which SideEffect to delete.
     */
    where: Prisma.SideEffectWhereUniqueInput;
};
/**
 * SideEffect deleteMany
 */
export type SideEffectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SideEffects to delete
     */
    where?: Prisma.SideEffectWhereInput;
    /**
     * Limit how many SideEffects to delete.
     */
    limit?: number;
};
/**
 * SideEffect.createdByUser
 */
export type SideEffect$createdByUserArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * SideEffect.tradeNames
 */
export type SideEffect$tradeNamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeNameSideEffect
     */
    select?: Prisma.TradeNameSideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TradeNameSideEffect
     */
    omit?: Prisma.TradeNameSideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TradeNameSideEffectInclude<ExtArgs> | null;
    where?: Prisma.TradeNameSideEffectWhereInput;
    orderBy?: Prisma.TradeNameSideEffectOrderByWithRelationInput | Prisma.TradeNameSideEffectOrderByWithRelationInput[];
    cursor?: Prisma.TradeNameSideEffectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TradeNameSideEffectScalarFieldEnum | Prisma.TradeNameSideEffectScalarFieldEnum[];
};
/**
 * SideEffect without action
 */
export type SideEffectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SideEffect
     */
    select?: Prisma.SideEffectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SideEffect
     */
    omit?: Prisma.SideEffectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SideEffectInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=SideEffect.d.ts.map