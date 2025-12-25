import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model BatchHistory
 *
 */
export type BatchHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$BatchHistoryPayload>;
export type AggregateBatchHistory = {
    _count: BatchHistoryCountAggregateOutputType | null;
    _avg: BatchHistoryAvgAggregateOutputType | null;
    _sum: BatchHistorySumAggregateOutputType | null;
    _min: BatchHistoryMinAggregateOutputType | null;
    _max: BatchHistoryMaxAggregateOutputType | null;
};
export type BatchHistoryAvgAggregateOutputType = {
    id: number | null;
    tradeNameId: number | null;
    quantity: number | null;
};
export type BatchHistorySumAggregateOutputType = {
    id: number | null;
    tradeNameId: number | null;
    quantity: number | null;
};
export type BatchHistoryMinAggregateOutputType = {
    id: number | null;
    tradeNameId: number | null;
    batchNumber: string | null;
    manufacturingDate: Date | null;
    expiryDate: Date | null;
    quantity: number | null;
    isRecalled: boolean | null;
    recallReason: string | null;
    recallDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BatchHistoryMaxAggregateOutputType = {
    id: number | null;
    tradeNameId: number | null;
    batchNumber: string | null;
    manufacturingDate: Date | null;
    expiryDate: Date | null;
    quantity: number | null;
    isRecalled: boolean | null;
    recallReason: string | null;
    recallDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BatchHistoryCountAggregateOutputType = {
    id: number;
    tradeNameId: number;
    batchNumber: number;
    manufacturingDate: number;
    expiryDate: number;
    quantity: number;
    isRecalled: number;
    recallReason: number;
    recallDate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BatchHistoryAvgAggregateInputType = {
    id?: true;
    tradeNameId?: true;
    quantity?: true;
};
export type BatchHistorySumAggregateInputType = {
    id?: true;
    tradeNameId?: true;
    quantity?: true;
};
export type BatchHistoryMinAggregateInputType = {
    id?: true;
    tradeNameId?: true;
    batchNumber?: true;
    manufacturingDate?: true;
    expiryDate?: true;
    quantity?: true;
    isRecalled?: true;
    recallReason?: true;
    recallDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BatchHistoryMaxAggregateInputType = {
    id?: true;
    tradeNameId?: true;
    batchNumber?: true;
    manufacturingDate?: true;
    expiryDate?: true;
    quantity?: true;
    isRecalled?: true;
    recallReason?: true;
    recallDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BatchHistoryCountAggregateInputType = {
    id?: true;
    tradeNameId?: true;
    batchNumber?: true;
    manufacturingDate?: true;
    expiryDate?: true;
    quantity?: true;
    isRecalled?: true;
    recallReason?: true;
    recallDate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BatchHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which BatchHistory to aggregate.
     */
    where?: Prisma.BatchHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BatchHistories to fetch.
     */
    orderBy?: Prisma.BatchHistoryOrderByWithRelationInput | Prisma.BatchHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.BatchHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BatchHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BatchHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned BatchHistories
    **/
    _count?: true | BatchHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: BatchHistoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: BatchHistorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BatchHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BatchHistoryMaxAggregateInputType;
};
export type GetBatchHistoryAggregateType<T extends BatchHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateBatchHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBatchHistory[P]> : Prisma.GetScalarType<T[P], AggregateBatchHistory[P]>;
};
export type BatchHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BatchHistoryWhereInput;
    orderBy?: Prisma.BatchHistoryOrderByWithAggregationInput | Prisma.BatchHistoryOrderByWithAggregationInput[];
    by: Prisma.BatchHistoryScalarFieldEnum[] | Prisma.BatchHistoryScalarFieldEnum;
    having?: Prisma.BatchHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BatchHistoryCountAggregateInputType | true;
    _avg?: BatchHistoryAvgAggregateInputType;
    _sum?: BatchHistorySumAggregateInputType;
    _min?: BatchHistoryMinAggregateInputType;
    _max?: BatchHistoryMaxAggregateInputType;
};
export type BatchHistoryGroupByOutputType = {
    id: number;
    tradeNameId: number;
    batchNumber: string;
    manufacturingDate: Date;
    expiryDate: Date;
    quantity: number | null;
    isRecalled: boolean;
    recallReason: string | null;
    recallDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BatchHistoryCountAggregateOutputType | null;
    _avg: BatchHistoryAvgAggregateOutputType | null;
    _sum: BatchHistorySumAggregateOutputType | null;
    _min: BatchHistoryMinAggregateOutputType | null;
    _max: BatchHistoryMaxAggregateOutputType | null;
};
type GetBatchHistoryGroupByPayload<T extends BatchHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BatchHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BatchHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BatchHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BatchHistoryGroupByOutputType[P]>;
}>>;
export type BatchHistoryWhereInput = {
    AND?: Prisma.BatchHistoryWhereInput | Prisma.BatchHistoryWhereInput[];
    OR?: Prisma.BatchHistoryWhereInput[];
    NOT?: Prisma.BatchHistoryWhereInput | Prisma.BatchHistoryWhereInput[];
    id?: Prisma.IntFilter<"BatchHistory"> | number;
    tradeNameId?: Prisma.IntFilter<"BatchHistory"> | number;
    batchNumber?: Prisma.StringFilter<"BatchHistory"> | string;
    manufacturingDate?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    quantity?: Prisma.IntNullableFilter<"BatchHistory"> | number | null;
    isRecalled?: Prisma.BoolFilter<"BatchHistory"> | boolean;
    recallReason?: Prisma.StringNullableFilter<"BatchHistory"> | string | null;
    recallDate?: Prisma.DateTimeNullableFilter<"BatchHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    tradeName?: Prisma.XOR<Prisma.TradeNameScalarRelationFilter, Prisma.TradeNameWhereInput>;
};
export type BatchHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    manufacturingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    quantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    recallDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tradeName?: Prisma.TradeNameOrderByWithRelationInput;
};
export type BatchHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.BatchHistoryWhereInput | Prisma.BatchHistoryWhereInput[];
    OR?: Prisma.BatchHistoryWhereInput[];
    NOT?: Prisma.BatchHistoryWhereInput | Prisma.BatchHistoryWhereInput[];
    tradeNameId?: Prisma.IntFilter<"BatchHistory"> | number;
    batchNumber?: Prisma.StringFilter<"BatchHistory"> | string;
    manufacturingDate?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    quantity?: Prisma.IntNullableFilter<"BatchHistory"> | number | null;
    isRecalled?: Prisma.BoolFilter<"BatchHistory"> | boolean;
    recallReason?: Prisma.StringNullableFilter<"BatchHistory"> | string | null;
    recallDate?: Prisma.DateTimeNullableFilter<"BatchHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    tradeName?: Prisma.XOR<Prisma.TradeNameScalarRelationFilter, Prisma.TradeNameWhereInput>;
}, "id">;
export type BatchHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    manufacturingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    quantity?: Prisma.SortOrderInput | Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    recallDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BatchHistoryCountOrderByAggregateInput;
    _avg?: Prisma.BatchHistoryAvgOrderByAggregateInput;
    _max?: Prisma.BatchHistoryMaxOrderByAggregateInput;
    _min?: Prisma.BatchHistoryMinOrderByAggregateInput;
    _sum?: Prisma.BatchHistorySumOrderByAggregateInput;
};
export type BatchHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.BatchHistoryScalarWhereWithAggregatesInput | Prisma.BatchHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.BatchHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BatchHistoryScalarWhereWithAggregatesInput | Prisma.BatchHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"BatchHistory"> | number;
    tradeNameId?: Prisma.IntWithAggregatesFilter<"BatchHistory"> | number;
    batchNumber?: Prisma.StringWithAggregatesFilter<"BatchHistory"> | string;
    manufacturingDate?: Prisma.DateTimeWithAggregatesFilter<"BatchHistory"> | Date | string;
    expiryDate?: Prisma.DateTimeWithAggregatesFilter<"BatchHistory"> | Date | string;
    quantity?: Prisma.IntNullableWithAggregatesFilter<"BatchHistory"> | number | null;
    isRecalled?: Prisma.BoolWithAggregatesFilter<"BatchHistory"> | boolean;
    recallReason?: Prisma.StringNullableWithAggregatesFilter<"BatchHistory"> | string | null;
    recallDate?: Prisma.DateTimeNullableWithAggregatesFilter<"BatchHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BatchHistory"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BatchHistory"> | Date | string;
};
export type BatchHistoryCreateInput = {
    batchNumber: string;
    manufacturingDate: Date | string;
    expiryDate: Date | string;
    quantity?: number | null;
    isRecalled?: boolean;
    recallReason?: string | null;
    recallDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tradeName: Prisma.TradeNameCreateNestedOneWithoutBatchHistoriesInput;
};
export type BatchHistoryUncheckedCreateInput = {
    id?: number;
    tradeNameId: number;
    batchNumber: string;
    manufacturingDate: Date | string;
    expiryDate: Date | string;
    quantity?: number | null;
    isRecalled?: boolean;
    recallReason?: string | null;
    recallDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BatchHistoryUpdateInput = {
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recallDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tradeName?: Prisma.TradeNameUpdateOneRequiredWithoutBatchHistoriesNestedInput;
};
export type BatchHistoryUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeNameId?: Prisma.IntFieldUpdateOperationsInput | number;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recallDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BatchHistoryCreateManyInput = {
    id?: number;
    tradeNameId: number;
    batchNumber: string;
    manufacturingDate: Date | string;
    expiryDate: Date | string;
    quantity?: number | null;
    isRecalled?: boolean;
    recallReason?: string | null;
    recallDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BatchHistoryUpdateManyMutationInput = {
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recallDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BatchHistoryUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeNameId?: Prisma.IntFieldUpdateOperationsInput | number;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recallDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BatchHistoryListRelationFilter = {
    every?: Prisma.BatchHistoryWhereInput;
    some?: Prisma.BatchHistoryWhereInput;
    none?: Prisma.BatchHistoryWhereInput;
};
export type BatchHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BatchHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    manufacturingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrder;
    recallDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BatchHistoryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type BatchHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    manufacturingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrder;
    recallDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BatchHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    manufacturingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    isRecalled?: Prisma.SortOrder;
    recallReason?: Prisma.SortOrder;
    recallDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BatchHistorySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tradeNameId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
};
export type BatchHistoryCreateNestedManyWithoutTradeNameInput = {
    create?: Prisma.XOR<Prisma.BatchHistoryCreateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput> | Prisma.BatchHistoryCreateWithoutTradeNameInput[] | Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput | Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput[];
    createMany?: Prisma.BatchHistoryCreateManyTradeNameInputEnvelope;
    connect?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
};
export type BatchHistoryUncheckedCreateNestedManyWithoutTradeNameInput = {
    create?: Prisma.XOR<Prisma.BatchHistoryCreateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput> | Prisma.BatchHistoryCreateWithoutTradeNameInput[] | Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput | Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput[];
    createMany?: Prisma.BatchHistoryCreateManyTradeNameInputEnvelope;
    connect?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
};
export type BatchHistoryUpdateManyWithoutTradeNameNestedInput = {
    create?: Prisma.XOR<Prisma.BatchHistoryCreateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput> | Prisma.BatchHistoryCreateWithoutTradeNameInput[] | Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput | Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput[];
    upsert?: Prisma.BatchHistoryUpsertWithWhereUniqueWithoutTradeNameInput | Prisma.BatchHistoryUpsertWithWhereUniqueWithoutTradeNameInput[];
    createMany?: Prisma.BatchHistoryCreateManyTradeNameInputEnvelope;
    set?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    disconnect?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    delete?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    connect?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    update?: Prisma.BatchHistoryUpdateWithWhereUniqueWithoutTradeNameInput | Prisma.BatchHistoryUpdateWithWhereUniqueWithoutTradeNameInput[];
    updateMany?: Prisma.BatchHistoryUpdateManyWithWhereWithoutTradeNameInput | Prisma.BatchHistoryUpdateManyWithWhereWithoutTradeNameInput[];
    deleteMany?: Prisma.BatchHistoryScalarWhereInput | Prisma.BatchHistoryScalarWhereInput[];
};
export type BatchHistoryUncheckedUpdateManyWithoutTradeNameNestedInput = {
    create?: Prisma.XOR<Prisma.BatchHistoryCreateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput> | Prisma.BatchHistoryCreateWithoutTradeNameInput[] | Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput[];
    connectOrCreate?: Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput | Prisma.BatchHistoryCreateOrConnectWithoutTradeNameInput[];
    upsert?: Prisma.BatchHistoryUpsertWithWhereUniqueWithoutTradeNameInput | Prisma.BatchHistoryUpsertWithWhereUniqueWithoutTradeNameInput[];
    createMany?: Prisma.BatchHistoryCreateManyTradeNameInputEnvelope;
    set?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    disconnect?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    delete?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    connect?: Prisma.BatchHistoryWhereUniqueInput | Prisma.BatchHistoryWhereUniqueInput[];
    update?: Prisma.BatchHistoryUpdateWithWhereUniqueWithoutTradeNameInput | Prisma.BatchHistoryUpdateWithWhereUniqueWithoutTradeNameInput[];
    updateMany?: Prisma.BatchHistoryUpdateManyWithWhereWithoutTradeNameInput | Prisma.BatchHistoryUpdateManyWithWhereWithoutTradeNameInput[];
    deleteMany?: Prisma.BatchHistoryScalarWhereInput | Prisma.BatchHistoryScalarWhereInput[];
};
export type BatchHistoryCreateWithoutTradeNameInput = {
    batchNumber: string;
    manufacturingDate: Date | string;
    expiryDate: Date | string;
    quantity?: number | null;
    isRecalled?: boolean;
    recallReason?: string | null;
    recallDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BatchHistoryUncheckedCreateWithoutTradeNameInput = {
    id?: number;
    batchNumber: string;
    manufacturingDate: Date | string;
    expiryDate: Date | string;
    quantity?: number | null;
    isRecalled?: boolean;
    recallReason?: string | null;
    recallDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BatchHistoryCreateOrConnectWithoutTradeNameInput = {
    where: Prisma.BatchHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BatchHistoryCreateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput>;
};
export type BatchHistoryCreateManyTradeNameInputEnvelope = {
    data: Prisma.BatchHistoryCreateManyTradeNameInput | Prisma.BatchHistoryCreateManyTradeNameInput[];
    skipDuplicates?: boolean;
};
export type BatchHistoryUpsertWithWhereUniqueWithoutTradeNameInput = {
    where: Prisma.BatchHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.BatchHistoryUpdateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedUpdateWithoutTradeNameInput>;
    create: Prisma.XOR<Prisma.BatchHistoryCreateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedCreateWithoutTradeNameInput>;
};
export type BatchHistoryUpdateWithWhereUniqueWithoutTradeNameInput = {
    where: Prisma.BatchHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.BatchHistoryUpdateWithoutTradeNameInput, Prisma.BatchHistoryUncheckedUpdateWithoutTradeNameInput>;
};
export type BatchHistoryUpdateManyWithWhereWithoutTradeNameInput = {
    where: Prisma.BatchHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.BatchHistoryUpdateManyMutationInput, Prisma.BatchHistoryUncheckedUpdateManyWithoutTradeNameInput>;
};
export type BatchHistoryScalarWhereInput = {
    AND?: Prisma.BatchHistoryScalarWhereInput | Prisma.BatchHistoryScalarWhereInput[];
    OR?: Prisma.BatchHistoryScalarWhereInput[];
    NOT?: Prisma.BatchHistoryScalarWhereInput | Prisma.BatchHistoryScalarWhereInput[];
    id?: Prisma.IntFilter<"BatchHistory"> | number;
    tradeNameId?: Prisma.IntFilter<"BatchHistory"> | number;
    batchNumber?: Prisma.StringFilter<"BatchHistory"> | string;
    manufacturingDate?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    expiryDate?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    quantity?: Prisma.IntNullableFilter<"BatchHistory"> | number | null;
    isRecalled?: Prisma.BoolFilter<"BatchHistory"> | boolean;
    recallReason?: Prisma.StringNullableFilter<"BatchHistory"> | string | null;
    recallDate?: Prisma.DateTimeNullableFilter<"BatchHistory"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BatchHistory"> | Date | string;
};
export type BatchHistoryCreateManyTradeNameInput = {
    id?: number;
    batchNumber: string;
    manufacturingDate: Date | string;
    expiryDate: Date | string;
    quantity?: number | null;
    isRecalled?: boolean;
    recallReason?: string | null;
    recallDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BatchHistoryUpdateWithoutTradeNameInput = {
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recallDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BatchHistoryUncheckedUpdateWithoutTradeNameInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recallDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BatchHistoryUncheckedUpdateManyWithoutTradeNameInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quantity?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    isRecalled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    recallReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recallDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BatchHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tradeNameId?: boolean;
    batchNumber?: boolean;
    manufacturingDate?: boolean;
    expiryDate?: boolean;
    quantity?: boolean;
    isRecalled?: boolean;
    recallReason?: boolean;
    recallDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tradeName?: boolean | Prisma.TradeNameDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["batchHistory"]>;
export type BatchHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tradeNameId?: boolean;
    batchNumber?: boolean;
    manufacturingDate?: boolean;
    expiryDate?: boolean;
    quantity?: boolean;
    isRecalled?: boolean;
    recallReason?: boolean;
    recallDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tradeName?: boolean | Prisma.TradeNameDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["batchHistory"]>;
export type BatchHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tradeNameId?: boolean;
    batchNumber?: boolean;
    manufacturingDate?: boolean;
    expiryDate?: boolean;
    quantity?: boolean;
    isRecalled?: boolean;
    recallReason?: boolean;
    recallDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tradeName?: boolean | Prisma.TradeNameDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["batchHistory"]>;
export type BatchHistorySelectScalar = {
    id?: boolean;
    tradeNameId?: boolean;
    batchNumber?: boolean;
    manufacturingDate?: boolean;
    expiryDate?: boolean;
    quantity?: boolean;
    isRecalled?: boolean;
    recallReason?: boolean;
    recallDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BatchHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tradeNameId" | "batchNumber" | "manufacturingDate" | "expiryDate" | "quantity" | "isRecalled" | "recallReason" | "recallDate" | "createdAt" | "updatedAt", ExtArgs["result"]["batchHistory"]>;
export type BatchHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tradeName?: boolean | Prisma.TradeNameDefaultArgs<ExtArgs>;
};
export type BatchHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tradeName?: boolean | Prisma.TradeNameDefaultArgs<ExtArgs>;
};
export type BatchHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tradeName?: boolean | Prisma.TradeNameDefaultArgs<ExtArgs>;
};
export type $BatchHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BatchHistory";
    objects: {
        tradeName: Prisma.$TradeNamePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        tradeNameId: number;
        batchNumber: string;
        manufacturingDate: Date;
        expiryDate: Date;
        quantity: number | null;
        isRecalled: boolean;
        recallReason: string | null;
        recallDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["batchHistory"]>;
    composites: {};
};
export type BatchHistoryGetPayload<S extends boolean | null | undefined | BatchHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload, S>;
export type BatchHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BatchHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BatchHistoryCountAggregateInputType | true;
};
export interface BatchHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BatchHistory'];
        meta: {
            name: 'BatchHistory';
        };
    };
    /**
     * Find zero or one BatchHistory that matches the filter.
     * @param {BatchHistoryFindUniqueArgs} args - Arguments to find a BatchHistory
     * @example
     * // Get one BatchHistory
     * const batchHistory = await prisma.batchHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, BatchHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one BatchHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BatchHistoryFindUniqueOrThrowArgs} args - Arguments to find a BatchHistory
     * @example
     * // Get one BatchHistory
     * const batchHistory = await prisma.batchHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BatchHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BatchHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchHistoryFindFirstArgs} args - Arguments to find a BatchHistory
     * @example
     * // Get one BatchHistory
     * const batchHistory = await prisma.batchHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, BatchHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BatchHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchHistoryFindFirstOrThrowArgs} args - Arguments to find a BatchHistory
     * @example
     * // Get one BatchHistory
     * const batchHistory = await prisma.batchHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BatchHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more BatchHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BatchHistories
     * const batchHistories = await prisma.batchHistory.findMany()
     *
     * // Get first 10 BatchHistories
     * const batchHistories = await prisma.batchHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const batchHistoryWithIdOnly = await prisma.batchHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BatchHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, BatchHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a BatchHistory.
     * @param {BatchHistoryCreateArgs} args - Arguments to create a BatchHistory.
     * @example
     * // Create one BatchHistory
     * const BatchHistory = await prisma.batchHistory.create({
     *   data: {
     *     // ... data to create a BatchHistory
     *   }
     * })
     *
     */
    create<T extends BatchHistoryCreateArgs>(args: Prisma.SelectSubset<T, BatchHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many BatchHistories.
     * @param {BatchHistoryCreateManyArgs} args - Arguments to create many BatchHistories.
     * @example
     * // Create many BatchHistories
     * const batchHistory = await prisma.batchHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BatchHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, BatchHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many BatchHistories and returns the data saved in the database.
     * @param {BatchHistoryCreateManyAndReturnArgs} args - Arguments to create many BatchHistories.
     * @example
     * // Create many BatchHistories
     * const batchHistory = await prisma.batchHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many BatchHistories and only return the `id`
     * const batchHistoryWithIdOnly = await prisma.batchHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BatchHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BatchHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a BatchHistory.
     * @param {BatchHistoryDeleteArgs} args - Arguments to delete one BatchHistory.
     * @example
     * // Delete one BatchHistory
     * const BatchHistory = await prisma.batchHistory.delete({
     *   where: {
     *     // ... filter to delete one BatchHistory
     *   }
     * })
     *
     */
    delete<T extends BatchHistoryDeleteArgs>(args: Prisma.SelectSubset<T, BatchHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one BatchHistory.
     * @param {BatchHistoryUpdateArgs} args - Arguments to update one BatchHistory.
     * @example
     * // Update one BatchHistory
     * const batchHistory = await prisma.batchHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BatchHistoryUpdateArgs>(args: Prisma.SelectSubset<T, BatchHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more BatchHistories.
     * @param {BatchHistoryDeleteManyArgs} args - Arguments to filter BatchHistories to delete.
     * @example
     * // Delete a few BatchHistories
     * const { count } = await prisma.batchHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BatchHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, BatchHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more BatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BatchHistories
     * const batchHistory = await prisma.batchHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BatchHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, BatchHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more BatchHistories and returns the data updated in the database.
     * @param {BatchHistoryUpdateManyAndReturnArgs} args - Arguments to update many BatchHistories.
     * @example
     * // Update many BatchHistories
     * const batchHistory = await prisma.batchHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more BatchHistories and only return the `id`
     * const batchHistoryWithIdOnly = await prisma.batchHistory.updateManyAndReturn({
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
    updateManyAndReturn<T extends BatchHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BatchHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one BatchHistory.
     * @param {BatchHistoryUpsertArgs} args - Arguments to update or create a BatchHistory.
     * @example
     * // Update or create a BatchHistory
     * const batchHistory = await prisma.batchHistory.upsert({
     *   create: {
     *     // ... data to create a BatchHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BatchHistory we want to update
     *   }
     * })
     */
    upsert<T extends BatchHistoryUpsertArgs>(args: Prisma.SelectSubset<T, BatchHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__BatchHistoryClient<runtime.Types.Result.GetResult<Prisma.$BatchHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of BatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchHistoryCountArgs} args - Arguments to filter BatchHistories to count.
     * @example
     * // Count the number of BatchHistories
     * const count = await prisma.batchHistory.count({
     *   where: {
     *     // ... the filter for the BatchHistories we want to count
     *   }
     * })
    **/
    count<T extends BatchHistoryCountArgs>(args?: Prisma.Subset<T, BatchHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BatchHistoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a BatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BatchHistoryAggregateArgs>(args: Prisma.Subset<T, BatchHistoryAggregateArgs>): Prisma.PrismaPromise<GetBatchHistoryAggregateType<T>>;
    /**
     * Group by BatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchHistoryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends BatchHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BatchHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: BatchHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BatchHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the BatchHistory model
     */
    readonly fields: BatchHistoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for BatchHistory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__BatchHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tradeName<T extends Prisma.TradeNameDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TradeNameDefaultArgs<ExtArgs>>): Prisma.Prisma__TradeNameClient<runtime.Types.Result.GetResult<Prisma.$TradeNamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the BatchHistory model
 */
export interface BatchHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"BatchHistory", 'Int'>;
    readonly tradeNameId: Prisma.FieldRef<"BatchHistory", 'Int'>;
    readonly batchNumber: Prisma.FieldRef<"BatchHistory", 'String'>;
    readonly manufacturingDate: Prisma.FieldRef<"BatchHistory", 'DateTime'>;
    readonly expiryDate: Prisma.FieldRef<"BatchHistory", 'DateTime'>;
    readonly quantity: Prisma.FieldRef<"BatchHistory", 'Int'>;
    readonly isRecalled: Prisma.FieldRef<"BatchHistory", 'Boolean'>;
    readonly recallReason: Prisma.FieldRef<"BatchHistory", 'String'>;
    readonly recallDate: Prisma.FieldRef<"BatchHistory", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"BatchHistory", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BatchHistory", 'DateTime'>;
}
/**
 * BatchHistory findUnique
 */
export type BatchHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which BatchHistory to fetch.
     */
    where: Prisma.BatchHistoryWhereUniqueInput;
};
/**
 * BatchHistory findUniqueOrThrow
 */
export type BatchHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which BatchHistory to fetch.
     */
    where: Prisma.BatchHistoryWhereUniqueInput;
};
/**
 * BatchHistory findFirst
 */
export type BatchHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which BatchHistory to fetch.
     */
    where?: Prisma.BatchHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BatchHistories to fetch.
     */
    orderBy?: Prisma.BatchHistoryOrderByWithRelationInput | Prisma.BatchHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BatchHistories.
     */
    cursor?: Prisma.BatchHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BatchHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BatchHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BatchHistories.
     */
    distinct?: Prisma.BatchHistoryScalarFieldEnum | Prisma.BatchHistoryScalarFieldEnum[];
};
/**
 * BatchHistory findFirstOrThrow
 */
export type BatchHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which BatchHistory to fetch.
     */
    where?: Prisma.BatchHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BatchHistories to fetch.
     */
    orderBy?: Prisma.BatchHistoryOrderByWithRelationInput | Prisma.BatchHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BatchHistories.
     */
    cursor?: Prisma.BatchHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BatchHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BatchHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BatchHistories.
     */
    distinct?: Prisma.BatchHistoryScalarFieldEnum | Prisma.BatchHistoryScalarFieldEnum[];
};
/**
 * BatchHistory findMany
 */
export type BatchHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which BatchHistories to fetch.
     */
    where?: Prisma.BatchHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BatchHistories to fetch.
     */
    orderBy?: Prisma.BatchHistoryOrderByWithRelationInput | Prisma.BatchHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing BatchHistories.
     */
    cursor?: Prisma.BatchHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BatchHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BatchHistories.
     */
    skip?: number;
    distinct?: Prisma.BatchHistoryScalarFieldEnum | Prisma.BatchHistoryScalarFieldEnum[];
};
/**
 * BatchHistory create
 */
export type BatchHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a BatchHistory.
     */
    data: Prisma.XOR<Prisma.BatchHistoryCreateInput, Prisma.BatchHistoryUncheckedCreateInput>;
};
/**
 * BatchHistory createMany
 */
export type BatchHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many BatchHistories.
     */
    data: Prisma.BatchHistoryCreateManyInput | Prisma.BatchHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * BatchHistory createManyAndReturn
 */
export type BatchHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * The data used to create many BatchHistories.
     */
    data: Prisma.BatchHistoryCreateManyInput | Prisma.BatchHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * BatchHistory update
 */
export type BatchHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a BatchHistory.
     */
    data: Prisma.XOR<Prisma.BatchHistoryUpdateInput, Prisma.BatchHistoryUncheckedUpdateInput>;
    /**
     * Choose, which BatchHistory to update.
     */
    where: Prisma.BatchHistoryWhereUniqueInput;
};
/**
 * BatchHistory updateMany
 */
export type BatchHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update BatchHistories.
     */
    data: Prisma.XOR<Prisma.BatchHistoryUpdateManyMutationInput, Prisma.BatchHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which BatchHistories to update
     */
    where?: Prisma.BatchHistoryWhereInput;
    /**
     * Limit how many BatchHistories to update.
     */
    limit?: number;
};
/**
 * BatchHistory updateManyAndReturn
 */
export type BatchHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * The data used to update BatchHistories.
     */
    data: Prisma.XOR<Prisma.BatchHistoryUpdateManyMutationInput, Prisma.BatchHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which BatchHistories to update
     */
    where?: Prisma.BatchHistoryWhereInput;
    /**
     * Limit how many BatchHistories to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * BatchHistory upsert
 */
export type BatchHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the BatchHistory to update in case it exists.
     */
    where: Prisma.BatchHistoryWhereUniqueInput;
    /**
     * In case the BatchHistory found by the `where` argument doesn't exist, create a new BatchHistory with this data.
     */
    create: Prisma.XOR<Prisma.BatchHistoryCreateInput, Prisma.BatchHistoryUncheckedCreateInput>;
    /**
     * In case the BatchHistory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.BatchHistoryUpdateInput, Prisma.BatchHistoryUncheckedUpdateInput>;
};
/**
 * BatchHistory delete
 */
export type BatchHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
    /**
     * Filter which BatchHistory to delete.
     */
    where: Prisma.BatchHistoryWhereUniqueInput;
};
/**
 * BatchHistory deleteMany
 */
export type BatchHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which BatchHistories to delete
     */
    where?: Prisma.BatchHistoryWhereInput;
    /**
     * Limit how many BatchHistories to delete.
     */
    limit?: number;
};
/**
 * BatchHistory without action
 */
export type BatchHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchHistory
     */
    select?: Prisma.BatchHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BatchHistory
     */
    omit?: Prisma.BatchHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BatchHistoryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=BatchHistory.d.ts.map