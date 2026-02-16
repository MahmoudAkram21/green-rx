import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model MedicineSuggestion
 *
 */
export type MedicineSuggestionModel = runtime.Types.Result.DefaultSelection<Prisma.$MedicineSuggestionPayload>;
export type AggregateMedicineSuggestion = {
    _count: MedicineSuggestionCountAggregateOutputType | null;
    _avg: MedicineSuggestionAvgAggregateOutputType | null;
    _sum: MedicineSuggestionSumAggregateOutputType | null;
    _min: MedicineSuggestionMinAggregateOutputType | null;
    _max: MedicineSuggestionMaxAggregateOutputType | null;
};
export type MedicineSuggestionAvgAggregateOutputType = {
    id: number | null;
    doctorId: number | null;
    reviewedBy: number | null;
};
export type MedicineSuggestionSumAggregateOutputType = {
    id: number | null;
    doctorId: number | null;
    reviewedBy: number | null;
};
export type MedicineSuggestionMinAggregateOutputType = {
    id: number | null;
    doctorId: number | null;
    tradeName: string | null;
    activeSubstance: string | null;
    concentration: string | null;
    dosageForm: string | null;
    manufacturer: string | null;
    reason: string | null;
    status: $Enums.SuggestionStatus | null;
    reviewedBy: number | null;
    reviewNotes: string | null;
    createdAt: Date | null;
    reviewedAt: Date | null;
};
export type MedicineSuggestionMaxAggregateOutputType = {
    id: number | null;
    doctorId: number | null;
    tradeName: string | null;
    activeSubstance: string | null;
    concentration: string | null;
    dosageForm: string | null;
    manufacturer: string | null;
    reason: string | null;
    status: $Enums.SuggestionStatus | null;
    reviewedBy: number | null;
    reviewNotes: string | null;
    createdAt: Date | null;
    reviewedAt: Date | null;
};
export type MedicineSuggestionCountAggregateOutputType = {
    id: number;
    doctorId: number;
    tradeName: number;
    activeSubstance: number;
    concentration: number;
    dosageForm: number;
    manufacturer: number;
    reason: number;
    status: number;
    reviewedBy: number;
    reviewNotes: number;
    createdAt: number;
    reviewedAt: number;
    _all: number;
};
export type MedicineSuggestionAvgAggregateInputType = {
    id?: true;
    doctorId?: true;
    reviewedBy?: true;
};
export type MedicineSuggestionSumAggregateInputType = {
    id?: true;
    doctorId?: true;
    reviewedBy?: true;
};
export type MedicineSuggestionMinAggregateInputType = {
    id?: true;
    doctorId?: true;
    tradeName?: true;
    activeSubstance?: true;
    concentration?: true;
    dosageForm?: true;
    manufacturer?: true;
    reason?: true;
    status?: true;
    reviewedBy?: true;
    reviewNotes?: true;
    createdAt?: true;
    reviewedAt?: true;
};
export type MedicineSuggestionMaxAggregateInputType = {
    id?: true;
    doctorId?: true;
    tradeName?: true;
    activeSubstance?: true;
    concentration?: true;
    dosageForm?: true;
    manufacturer?: true;
    reason?: true;
    status?: true;
    reviewedBy?: true;
    reviewNotes?: true;
    createdAt?: true;
    reviewedAt?: true;
};
export type MedicineSuggestionCountAggregateInputType = {
    id?: true;
    doctorId?: true;
    tradeName?: true;
    activeSubstance?: true;
    concentration?: true;
    dosageForm?: true;
    manufacturer?: true;
    reason?: true;
    status?: true;
    reviewedBy?: true;
    reviewNotes?: true;
    createdAt?: true;
    reviewedAt?: true;
    _all?: true;
};
export type MedicineSuggestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineSuggestion to aggregate.
     */
    where?: Prisma.MedicineSuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineSuggestions to fetch.
     */
    orderBy?: Prisma.MedicineSuggestionOrderByWithRelationInput | Prisma.MedicineSuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MedicineSuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineSuggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineSuggestions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MedicineSuggestions
    **/
    _count?: true | MedicineSuggestionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MedicineSuggestionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MedicineSuggestionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MedicineSuggestionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MedicineSuggestionMaxAggregateInputType;
};
export type GetMedicineSuggestionAggregateType<T extends MedicineSuggestionAggregateArgs> = {
    [P in keyof T & keyof AggregateMedicineSuggestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMedicineSuggestion[P]> : Prisma.GetScalarType<T[P], AggregateMedicineSuggestion[P]>;
};
export type MedicineSuggestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicineSuggestionWhereInput;
    orderBy?: Prisma.MedicineSuggestionOrderByWithAggregationInput | Prisma.MedicineSuggestionOrderByWithAggregationInput[];
    by: Prisma.MedicineSuggestionScalarFieldEnum[] | Prisma.MedicineSuggestionScalarFieldEnum;
    having?: Prisma.MedicineSuggestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MedicineSuggestionCountAggregateInputType | true;
    _avg?: MedicineSuggestionAvgAggregateInputType;
    _sum?: MedicineSuggestionSumAggregateInputType;
    _min?: MedicineSuggestionMinAggregateInputType;
    _max?: MedicineSuggestionMaxAggregateInputType;
};
export type MedicineSuggestionGroupByOutputType = {
    id: number;
    doctorId: number;
    tradeName: string;
    activeSubstance: string;
    concentration: string | null;
    dosageForm: string | null;
    manufacturer: string | null;
    reason: string;
    status: $Enums.SuggestionStatus;
    reviewedBy: number | null;
    reviewNotes: string | null;
    createdAt: Date;
    reviewedAt: Date | null;
    _count: MedicineSuggestionCountAggregateOutputType | null;
    _avg: MedicineSuggestionAvgAggregateOutputType | null;
    _sum: MedicineSuggestionSumAggregateOutputType | null;
    _min: MedicineSuggestionMinAggregateOutputType | null;
    _max: MedicineSuggestionMaxAggregateOutputType | null;
};
type GetMedicineSuggestionGroupByPayload<T extends MedicineSuggestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MedicineSuggestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MedicineSuggestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MedicineSuggestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MedicineSuggestionGroupByOutputType[P]>;
}>>;
export type MedicineSuggestionWhereInput = {
    AND?: Prisma.MedicineSuggestionWhereInput | Prisma.MedicineSuggestionWhereInput[];
    OR?: Prisma.MedicineSuggestionWhereInput[];
    NOT?: Prisma.MedicineSuggestionWhereInput | Prisma.MedicineSuggestionWhereInput[];
    id?: Prisma.IntFilter<"MedicineSuggestion"> | number;
    doctorId?: Prisma.IntFilter<"MedicineSuggestion"> | number;
    tradeName?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    activeSubstance?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    concentration?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    dosageForm?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    manufacturer?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    reason?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    status?: Prisma.EnumSuggestionStatusFilter<"MedicineSuggestion"> | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.IntNullableFilter<"MedicineSuggestion"> | number | null;
    reviewNotes?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MedicineSuggestion"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"MedicineSuggestion"> | Date | string | null;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type MedicineSuggestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    tradeName?: Prisma.SortOrder;
    activeSubstance?: Prisma.SortOrder;
    concentration?: Prisma.SortOrderInput | Prisma.SortOrder;
    dosageForm?: Prisma.SortOrderInput | Prisma.SortOrder;
    manufacturer?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    doctor?: Prisma.DoctorOrderByWithRelationInput;
    reviewer?: Prisma.UserOrderByWithRelationInput;
};
export type MedicineSuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.MedicineSuggestionWhereInput | Prisma.MedicineSuggestionWhereInput[];
    OR?: Prisma.MedicineSuggestionWhereInput[];
    NOT?: Prisma.MedicineSuggestionWhereInput | Prisma.MedicineSuggestionWhereInput[];
    doctorId?: Prisma.IntFilter<"MedicineSuggestion"> | number;
    tradeName?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    activeSubstance?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    concentration?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    dosageForm?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    manufacturer?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    reason?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    status?: Prisma.EnumSuggestionStatusFilter<"MedicineSuggestion"> | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.IntNullableFilter<"MedicineSuggestion"> | number | null;
    reviewNotes?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MedicineSuggestion"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"MedicineSuggestion"> | Date | string | null;
    doctor?: Prisma.XOR<Prisma.DoctorScalarRelationFilter, Prisma.DoctorWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type MedicineSuggestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    tradeName?: Prisma.SortOrder;
    activeSubstance?: Prisma.SortOrder;
    concentration?: Prisma.SortOrderInput | Prisma.SortOrder;
    dosageForm?: Prisma.SortOrderInput | Prisma.SortOrder;
    manufacturer?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MedicineSuggestionCountOrderByAggregateInput;
    _avg?: Prisma.MedicineSuggestionAvgOrderByAggregateInput;
    _max?: Prisma.MedicineSuggestionMaxOrderByAggregateInput;
    _min?: Prisma.MedicineSuggestionMinOrderByAggregateInput;
    _sum?: Prisma.MedicineSuggestionSumOrderByAggregateInput;
};
export type MedicineSuggestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.MedicineSuggestionScalarWhereWithAggregatesInput | Prisma.MedicineSuggestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.MedicineSuggestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MedicineSuggestionScalarWhereWithAggregatesInput | Prisma.MedicineSuggestionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MedicineSuggestion"> | number;
    doctorId?: Prisma.IntWithAggregatesFilter<"MedicineSuggestion"> | number;
    tradeName?: Prisma.StringWithAggregatesFilter<"MedicineSuggestion"> | string;
    activeSubstance?: Prisma.StringWithAggregatesFilter<"MedicineSuggestion"> | string;
    concentration?: Prisma.StringNullableWithAggregatesFilter<"MedicineSuggestion"> | string | null;
    dosageForm?: Prisma.StringNullableWithAggregatesFilter<"MedicineSuggestion"> | string | null;
    manufacturer?: Prisma.StringNullableWithAggregatesFilter<"MedicineSuggestion"> | string | null;
    reason?: Prisma.StringWithAggregatesFilter<"MedicineSuggestion"> | string;
    status?: Prisma.EnumSuggestionStatusWithAggregatesFilter<"MedicineSuggestion"> | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.IntNullableWithAggregatesFilter<"MedicineSuggestion"> | number | null;
    reviewNotes?: Prisma.StringNullableWithAggregatesFilter<"MedicineSuggestion"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MedicineSuggestion"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MedicineSuggestion"> | Date | string | null;
};
export type MedicineSuggestionCreateInput = {
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
    doctor: Prisma.DoctorCreateNestedOneWithoutMedicineSuggestionsInput;
    reviewer?: Prisma.UserCreateNestedOneWithoutReviewedSuggestionsInput;
};
export type MedicineSuggestionUncheckedCreateInput = {
    id?: number;
    doctorId: number;
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewedBy?: number | null;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
};
export type MedicineSuggestionUpdateInput = {
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutMedicineSuggestionsNestedInput;
    reviewer?: Prisma.UserUpdateOneWithoutReviewedSuggestionsNestedInput;
};
export type MedicineSuggestionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MedicineSuggestionCreateManyInput = {
    id?: number;
    doctorId: number;
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewedBy?: number | null;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
};
export type MedicineSuggestionUpdateManyMutationInput = {
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MedicineSuggestionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MedicineSuggestionListRelationFilter = {
    every?: Prisma.MedicineSuggestionWhereInput;
    some?: Prisma.MedicineSuggestionWhereInput;
    none?: Prisma.MedicineSuggestionWhereInput;
};
export type MedicineSuggestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MedicineSuggestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    tradeName?: Prisma.SortOrder;
    activeSubstance?: Prisma.SortOrder;
    concentration?: Prisma.SortOrder;
    dosageForm?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
};
export type MedicineSuggestionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
};
export type MedicineSuggestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    tradeName?: Prisma.SortOrder;
    activeSubstance?: Prisma.SortOrder;
    concentration?: Prisma.SortOrder;
    dosageForm?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
};
export type MedicineSuggestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    tradeName?: Prisma.SortOrder;
    activeSubstance?: Prisma.SortOrder;
    concentration?: Prisma.SortOrder;
    dosageForm?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
    reviewNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
};
export type MedicineSuggestionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    doctorId?: Prisma.SortOrder;
    reviewedBy?: Prisma.SortOrder;
};
export type MedicineSuggestionCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput> | Prisma.MedicineSuggestionCreateWithoutReviewerInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput | Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyReviewerInputEnvelope;
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
};
export type MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput> | Prisma.MedicineSuggestionCreateWithoutReviewerInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput | Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyReviewerInputEnvelope;
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
};
export type MedicineSuggestionUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput> | Prisma.MedicineSuggestionCreateWithoutReviewerInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput | Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutReviewerInput | Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyReviewerInputEnvelope;
    set?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    disconnect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    delete?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    update?: Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutReviewerInput | Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.MedicineSuggestionUpdateManyWithWhereWithoutReviewerInput | Prisma.MedicineSuggestionUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.MedicineSuggestionScalarWhereInput | Prisma.MedicineSuggestionScalarWhereInput[];
};
export type MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput> | Prisma.MedicineSuggestionCreateWithoutReviewerInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput | Prisma.MedicineSuggestionCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutReviewerInput | Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyReviewerInputEnvelope;
    set?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    disconnect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    delete?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    update?: Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutReviewerInput | Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.MedicineSuggestionUpdateManyWithWhereWithoutReviewerInput | Prisma.MedicineSuggestionUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.MedicineSuggestionScalarWhereInput | Prisma.MedicineSuggestionScalarWhereInput[];
};
export type MedicineSuggestionCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput> | Prisma.MedicineSuggestionCreateWithoutDoctorInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput | Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyDoctorInputEnvelope;
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
};
export type MedicineSuggestionUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput> | Prisma.MedicineSuggestionCreateWithoutDoctorInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput | Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyDoctorInputEnvelope;
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
};
export type MedicineSuggestionUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput> | Prisma.MedicineSuggestionCreateWithoutDoctorInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput | Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutDoctorInput | Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyDoctorInputEnvelope;
    set?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    disconnect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    delete?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    update?: Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutDoctorInput | Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.MedicineSuggestionUpdateManyWithWhereWithoutDoctorInput | Prisma.MedicineSuggestionUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.MedicineSuggestionScalarWhereInput | Prisma.MedicineSuggestionScalarWhereInput[];
};
export type MedicineSuggestionUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput> | Prisma.MedicineSuggestionCreateWithoutDoctorInput[] | Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput[];
    connectOrCreate?: Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput | Prisma.MedicineSuggestionCreateOrConnectWithoutDoctorInput[];
    upsert?: Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutDoctorInput | Prisma.MedicineSuggestionUpsertWithWhereUniqueWithoutDoctorInput[];
    createMany?: Prisma.MedicineSuggestionCreateManyDoctorInputEnvelope;
    set?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    disconnect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    delete?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    connect?: Prisma.MedicineSuggestionWhereUniqueInput | Prisma.MedicineSuggestionWhereUniqueInput[];
    update?: Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutDoctorInput | Prisma.MedicineSuggestionUpdateWithWhereUniqueWithoutDoctorInput[];
    updateMany?: Prisma.MedicineSuggestionUpdateManyWithWhereWithoutDoctorInput | Prisma.MedicineSuggestionUpdateManyWithWhereWithoutDoctorInput[];
    deleteMany?: Prisma.MedicineSuggestionScalarWhereInput | Prisma.MedicineSuggestionScalarWhereInput[];
};
export type EnumSuggestionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SuggestionStatus;
};
export type MedicineSuggestionCreateWithoutReviewerInput = {
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
    doctor: Prisma.DoctorCreateNestedOneWithoutMedicineSuggestionsInput;
};
export type MedicineSuggestionUncheckedCreateWithoutReviewerInput = {
    id?: number;
    doctorId: number;
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
};
export type MedicineSuggestionCreateOrConnectWithoutReviewerInput = {
    where: Prisma.MedicineSuggestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput>;
};
export type MedicineSuggestionCreateManyReviewerInputEnvelope = {
    data: Prisma.MedicineSuggestionCreateManyReviewerInput | Prisma.MedicineSuggestionCreateManyReviewerInput[];
    skipDuplicates?: boolean;
};
export type MedicineSuggestionUpsertWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.MedicineSuggestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.MedicineSuggestionUpdateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedUpdateWithoutReviewerInput>;
    create: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedCreateWithoutReviewerInput>;
};
export type MedicineSuggestionUpdateWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.MedicineSuggestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.MedicineSuggestionUpdateWithoutReviewerInput, Prisma.MedicineSuggestionUncheckedUpdateWithoutReviewerInput>;
};
export type MedicineSuggestionUpdateManyWithWhereWithoutReviewerInput = {
    where: Prisma.MedicineSuggestionScalarWhereInput;
    data: Prisma.XOR<Prisma.MedicineSuggestionUpdateManyMutationInput, Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerInput>;
};
export type MedicineSuggestionScalarWhereInput = {
    AND?: Prisma.MedicineSuggestionScalarWhereInput | Prisma.MedicineSuggestionScalarWhereInput[];
    OR?: Prisma.MedicineSuggestionScalarWhereInput[];
    NOT?: Prisma.MedicineSuggestionScalarWhereInput | Prisma.MedicineSuggestionScalarWhereInput[];
    id?: Prisma.IntFilter<"MedicineSuggestion"> | number;
    doctorId?: Prisma.IntFilter<"MedicineSuggestion"> | number;
    tradeName?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    activeSubstance?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    concentration?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    dosageForm?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    manufacturer?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    reason?: Prisma.StringFilter<"MedicineSuggestion"> | string;
    status?: Prisma.EnumSuggestionStatusFilter<"MedicineSuggestion"> | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.IntNullableFilter<"MedicineSuggestion"> | number | null;
    reviewNotes?: Prisma.StringNullableFilter<"MedicineSuggestion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MedicineSuggestion"> | Date | string;
    reviewedAt?: Prisma.DateTimeNullableFilter<"MedicineSuggestion"> | Date | string | null;
};
export type MedicineSuggestionCreateWithoutDoctorInput = {
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
    reviewer?: Prisma.UserCreateNestedOneWithoutReviewedSuggestionsInput;
};
export type MedicineSuggestionUncheckedCreateWithoutDoctorInput = {
    id?: number;
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewedBy?: number | null;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
};
export type MedicineSuggestionCreateOrConnectWithoutDoctorInput = {
    where: Prisma.MedicineSuggestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput>;
};
export type MedicineSuggestionCreateManyDoctorInputEnvelope = {
    data: Prisma.MedicineSuggestionCreateManyDoctorInput | Prisma.MedicineSuggestionCreateManyDoctorInput[];
    skipDuplicates?: boolean;
};
export type MedicineSuggestionUpsertWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.MedicineSuggestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.MedicineSuggestionUpdateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.MedicineSuggestionCreateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedCreateWithoutDoctorInput>;
};
export type MedicineSuggestionUpdateWithWhereUniqueWithoutDoctorInput = {
    where: Prisma.MedicineSuggestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.MedicineSuggestionUpdateWithoutDoctorInput, Prisma.MedicineSuggestionUncheckedUpdateWithoutDoctorInput>;
};
export type MedicineSuggestionUpdateManyWithWhereWithoutDoctorInput = {
    where: Prisma.MedicineSuggestionScalarWhereInput;
    data: Prisma.XOR<Prisma.MedicineSuggestionUpdateManyMutationInput, Prisma.MedicineSuggestionUncheckedUpdateManyWithoutDoctorInput>;
};
export type MedicineSuggestionCreateManyReviewerInput = {
    id?: number;
    doctorId: number;
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
};
export type MedicineSuggestionUpdateWithoutReviewerInput = {
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    doctor?: Prisma.DoctorUpdateOneRequiredWithoutMedicineSuggestionsNestedInput;
};
export type MedicineSuggestionUncheckedUpdateWithoutReviewerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MedicineSuggestionUncheckedUpdateManyWithoutReviewerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    doctorId?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MedicineSuggestionCreateManyDoctorInput = {
    id?: number;
    tradeName: string;
    activeSubstance: string;
    concentration?: string | null;
    dosageForm?: string | null;
    manufacturer?: string | null;
    reason: string;
    status?: $Enums.SuggestionStatus;
    reviewedBy?: number | null;
    reviewNotes?: string | null;
    createdAt?: Date | string;
    reviewedAt?: Date | string | null;
};
export type MedicineSuggestionUpdateWithoutDoctorInput = {
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewer?: Prisma.UserUpdateOneWithoutReviewedSuggestionsNestedInput;
};
export type MedicineSuggestionUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MedicineSuggestionUncheckedUpdateManyWithoutDoctorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tradeName?: Prisma.StringFieldUpdateOperationsInput | string;
    activeSubstance?: Prisma.StringFieldUpdateOperationsInput | string;
    concentration?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dosageForm?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumSuggestionStatusFieldUpdateOperationsInput | $Enums.SuggestionStatus;
    reviewedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    reviewNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MedicineSuggestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    tradeName?: boolean;
    activeSubstance?: boolean;
    concentration?: boolean;
    dosageForm?: boolean;
    manufacturer?: boolean;
    reason?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewNotes?: boolean;
    createdAt?: boolean;
    reviewedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MedicineSuggestion$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["medicineSuggestion"]>;
export type MedicineSuggestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    tradeName?: boolean;
    activeSubstance?: boolean;
    concentration?: boolean;
    dosageForm?: boolean;
    manufacturer?: boolean;
    reason?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewNotes?: boolean;
    createdAt?: boolean;
    reviewedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MedicineSuggestion$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["medicineSuggestion"]>;
export type MedicineSuggestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    doctorId?: boolean;
    tradeName?: boolean;
    activeSubstance?: boolean;
    concentration?: boolean;
    dosageForm?: boolean;
    manufacturer?: boolean;
    reason?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewNotes?: boolean;
    createdAt?: boolean;
    reviewedAt?: boolean;
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MedicineSuggestion$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["medicineSuggestion"]>;
export type MedicineSuggestionSelectScalar = {
    id?: boolean;
    doctorId?: boolean;
    tradeName?: boolean;
    activeSubstance?: boolean;
    concentration?: boolean;
    dosageForm?: boolean;
    manufacturer?: boolean;
    reason?: boolean;
    status?: boolean;
    reviewedBy?: boolean;
    reviewNotes?: boolean;
    createdAt?: boolean;
    reviewedAt?: boolean;
};
export type MedicineSuggestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "doctorId" | "tradeName" | "activeSubstance" | "concentration" | "dosageForm" | "manufacturer" | "reason" | "status" | "reviewedBy" | "reviewNotes" | "createdAt" | "reviewedAt", ExtArgs["result"]["medicineSuggestion"]>;
export type MedicineSuggestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MedicineSuggestion$reviewerArgs<ExtArgs>;
};
export type MedicineSuggestionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MedicineSuggestion$reviewerArgs<ExtArgs>;
};
export type MedicineSuggestionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    doctor?: boolean | Prisma.DoctorDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MedicineSuggestion$reviewerArgs<ExtArgs>;
};
export type $MedicineSuggestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MedicineSuggestion";
    objects: {
        doctor: Prisma.$DoctorPayload<ExtArgs>;
        reviewer: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        doctorId: number;
        tradeName: string;
        activeSubstance: string;
        concentration: string | null;
        dosageForm: string | null;
        manufacturer: string | null;
        reason: string;
        status: $Enums.SuggestionStatus;
        reviewedBy: number | null;
        reviewNotes: string | null;
        createdAt: Date;
        reviewedAt: Date | null;
    }, ExtArgs["result"]["medicineSuggestion"]>;
    composites: {};
};
export type MedicineSuggestionGetPayload<S extends boolean | null | undefined | MedicineSuggestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload, S>;
export type MedicineSuggestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MedicineSuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MedicineSuggestionCountAggregateInputType | true;
};
export interface MedicineSuggestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MedicineSuggestion'];
        meta: {
            name: 'MedicineSuggestion';
        };
    };
    /**
     * Find zero or one MedicineSuggestion that matches the filter.
     * @param {MedicineSuggestionFindUniqueArgs} args - Arguments to find a MedicineSuggestion
     * @example
     * // Get one MedicineSuggestion
     * const medicineSuggestion = await prisma.medicineSuggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicineSuggestionFindUniqueArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MedicineSuggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicineSuggestionFindUniqueOrThrowArgs} args - Arguments to find a MedicineSuggestion
     * @example
     * // Get one MedicineSuggestion
     * const medicineSuggestion = await prisma.medicineSuggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicineSuggestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MedicineSuggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineSuggestionFindFirstArgs} args - Arguments to find a MedicineSuggestion
     * @example
     * // Get one MedicineSuggestion
     * const medicineSuggestion = await prisma.medicineSuggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicineSuggestionFindFirstArgs>(args?: Prisma.SelectSubset<T, MedicineSuggestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MedicineSuggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineSuggestionFindFirstOrThrowArgs} args - Arguments to find a MedicineSuggestion
     * @example
     * // Get one MedicineSuggestion
     * const medicineSuggestion = await prisma.medicineSuggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicineSuggestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MedicineSuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MedicineSuggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineSuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicineSuggestions
     * const medicineSuggestions = await prisma.medicineSuggestion.findMany()
     *
     * // Get first 10 MedicineSuggestions
     * const medicineSuggestions = await prisma.medicineSuggestion.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const medicineSuggestionWithIdOnly = await prisma.medicineSuggestion.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MedicineSuggestionFindManyArgs>(args?: Prisma.SelectSubset<T, MedicineSuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MedicineSuggestion.
     * @param {MedicineSuggestionCreateArgs} args - Arguments to create a MedicineSuggestion.
     * @example
     * // Create one MedicineSuggestion
     * const MedicineSuggestion = await prisma.medicineSuggestion.create({
     *   data: {
     *     // ... data to create a MedicineSuggestion
     *   }
     * })
     *
     */
    create<T extends MedicineSuggestionCreateArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionCreateArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MedicineSuggestions.
     * @param {MedicineSuggestionCreateManyArgs} args - Arguments to create many MedicineSuggestions.
     * @example
     * // Create many MedicineSuggestions
     * const medicineSuggestion = await prisma.medicineSuggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MedicineSuggestionCreateManyArgs>(args?: Prisma.SelectSubset<T, MedicineSuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MedicineSuggestions and returns the data saved in the database.
     * @param {MedicineSuggestionCreateManyAndReturnArgs} args - Arguments to create many MedicineSuggestions.
     * @example
     * // Create many MedicineSuggestions
     * const medicineSuggestion = await prisma.medicineSuggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MedicineSuggestions and only return the `id`
     * const medicineSuggestionWithIdOnly = await prisma.medicineSuggestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MedicineSuggestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MedicineSuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MedicineSuggestion.
     * @param {MedicineSuggestionDeleteArgs} args - Arguments to delete one MedicineSuggestion.
     * @example
     * // Delete one MedicineSuggestion
     * const MedicineSuggestion = await prisma.medicineSuggestion.delete({
     *   where: {
     *     // ... filter to delete one MedicineSuggestion
     *   }
     * })
     *
     */
    delete<T extends MedicineSuggestionDeleteArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionDeleteArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MedicineSuggestion.
     * @param {MedicineSuggestionUpdateArgs} args - Arguments to update one MedicineSuggestion.
     * @example
     * // Update one MedicineSuggestion
     * const medicineSuggestion = await prisma.medicineSuggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MedicineSuggestionUpdateArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionUpdateArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MedicineSuggestions.
     * @param {MedicineSuggestionDeleteManyArgs} args - Arguments to filter MedicineSuggestions to delete.
     * @example
     * // Delete a few MedicineSuggestions
     * const { count } = await prisma.medicineSuggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MedicineSuggestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, MedicineSuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MedicineSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineSuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicineSuggestions
     * const medicineSuggestion = await prisma.medicineSuggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MedicineSuggestionUpdateManyArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MedicineSuggestions and returns the data updated in the database.
     * @param {MedicineSuggestionUpdateManyAndReturnArgs} args - Arguments to update many MedicineSuggestions.
     * @example
     * // Update many MedicineSuggestions
     * const medicineSuggestion = await prisma.medicineSuggestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MedicineSuggestions and only return the `id`
     * const medicineSuggestionWithIdOnly = await prisma.medicineSuggestion.updateManyAndReturn({
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
    updateManyAndReturn<T extends MedicineSuggestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MedicineSuggestion.
     * @param {MedicineSuggestionUpsertArgs} args - Arguments to update or create a MedicineSuggestion.
     * @example
     * // Update or create a MedicineSuggestion
     * const medicineSuggestion = await prisma.medicineSuggestion.upsert({
     *   create: {
     *     // ... data to create a MedicineSuggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicineSuggestion we want to update
     *   }
     * })
     */
    upsert<T extends MedicineSuggestionUpsertArgs>(args: Prisma.SelectSubset<T, MedicineSuggestionUpsertArgs<ExtArgs>>): Prisma.Prisma__MedicineSuggestionClient<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MedicineSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineSuggestionCountArgs} args - Arguments to filter MedicineSuggestions to count.
     * @example
     * // Count the number of MedicineSuggestions
     * const count = await prisma.medicineSuggestion.count({
     *   where: {
     *     // ... the filter for the MedicineSuggestions we want to count
     *   }
     * })
    **/
    count<T extends MedicineSuggestionCountArgs>(args?: Prisma.Subset<T, MedicineSuggestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MedicineSuggestionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MedicineSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineSuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicineSuggestionAggregateArgs>(args: Prisma.Subset<T, MedicineSuggestionAggregateArgs>): Prisma.PrismaPromise<GetMedicineSuggestionAggregateType<T>>;
    /**
     * Group by MedicineSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineSuggestionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MedicineSuggestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MedicineSuggestionGroupByArgs['orderBy'];
    } : {
        orderBy?: MedicineSuggestionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MedicineSuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicineSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MedicineSuggestion model
     */
    readonly fields: MedicineSuggestionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MedicineSuggestion.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MedicineSuggestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    doctor<T extends Prisma.DoctorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DoctorDefaultArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewer<T extends Prisma.MedicineSuggestion$reviewerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MedicineSuggestion$reviewerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MedicineSuggestion model
 */
export interface MedicineSuggestionFieldRefs {
    readonly id: Prisma.FieldRef<"MedicineSuggestion", 'Int'>;
    readonly doctorId: Prisma.FieldRef<"MedicineSuggestion", 'Int'>;
    readonly tradeName: Prisma.FieldRef<"MedicineSuggestion", 'String'>;
    readonly activeSubstance: Prisma.FieldRef<"MedicineSuggestion", 'String'>;
    readonly concentration: Prisma.FieldRef<"MedicineSuggestion", 'String'>;
    readonly dosageForm: Prisma.FieldRef<"MedicineSuggestion", 'String'>;
    readonly manufacturer: Prisma.FieldRef<"MedicineSuggestion", 'String'>;
    readonly reason: Prisma.FieldRef<"MedicineSuggestion", 'String'>;
    readonly status: Prisma.FieldRef<"MedicineSuggestion", 'SuggestionStatus'>;
    readonly reviewedBy: Prisma.FieldRef<"MedicineSuggestion", 'Int'>;
    readonly reviewNotes: Prisma.FieldRef<"MedicineSuggestion", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MedicineSuggestion", 'DateTime'>;
    readonly reviewedAt: Prisma.FieldRef<"MedicineSuggestion", 'DateTime'>;
}
/**
 * MedicineSuggestion findUnique
 */
export type MedicineSuggestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineSuggestion to fetch.
     */
    where: Prisma.MedicineSuggestionWhereUniqueInput;
};
/**
 * MedicineSuggestion findUniqueOrThrow
 */
export type MedicineSuggestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineSuggestion to fetch.
     */
    where: Prisma.MedicineSuggestionWhereUniqueInput;
};
/**
 * MedicineSuggestion findFirst
 */
export type MedicineSuggestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineSuggestion to fetch.
     */
    where?: Prisma.MedicineSuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineSuggestions to fetch.
     */
    orderBy?: Prisma.MedicineSuggestionOrderByWithRelationInput | Prisma.MedicineSuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MedicineSuggestions.
     */
    cursor?: Prisma.MedicineSuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineSuggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineSuggestions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MedicineSuggestions.
     */
    distinct?: Prisma.MedicineSuggestionScalarFieldEnum | Prisma.MedicineSuggestionScalarFieldEnum[];
};
/**
 * MedicineSuggestion findFirstOrThrow
 */
export type MedicineSuggestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineSuggestion to fetch.
     */
    where?: Prisma.MedicineSuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineSuggestions to fetch.
     */
    orderBy?: Prisma.MedicineSuggestionOrderByWithRelationInput | Prisma.MedicineSuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MedicineSuggestions.
     */
    cursor?: Prisma.MedicineSuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineSuggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineSuggestions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MedicineSuggestions.
     */
    distinct?: Prisma.MedicineSuggestionScalarFieldEnum | Prisma.MedicineSuggestionScalarFieldEnum[];
};
/**
 * MedicineSuggestion findMany
 */
export type MedicineSuggestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which MedicineSuggestions to fetch.
     */
    where?: Prisma.MedicineSuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MedicineSuggestions to fetch.
     */
    orderBy?: Prisma.MedicineSuggestionOrderByWithRelationInput | Prisma.MedicineSuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MedicineSuggestions.
     */
    cursor?: Prisma.MedicineSuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MedicineSuggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MedicineSuggestions.
     */
    skip?: number;
    distinct?: Prisma.MedicineSuggestionScalarFieldEnum | Prisma.MedicineSuggestionScalarFieldEnum[];
};
/**
 * MedicineSuggestion create
 */
export type MedicineSuggestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * The data needed to create a MedicineSuggestion.
     */
    data: Prisma.XOR<Prisma.MedicineSuggestionCreateInput, Prisma.MedicineSuggestionUncheckedCreateInput>;
};
/**
 * MedicineSuggestion createMany
 */
export type MedicineSuggestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicineSuggestions.
     */
    data: Prisma.MedicineSuggestionCreateManyInput | Prisma.MedicineSuggestionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MedicineSuggestion createManyAndReturn
 */
export type MedicineSuggestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * The data used to create many MedicineSuggestions.
     */
    data: Prisma.MedicineSuggestionCreateManyInput | Prisma.MedicineSuggestionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MedicineSuggestion update
 */
export type MedicineSuggestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * The data needed to update a MedicineSuggestion.
     */
    data: Prisma.XOR<Prisma.MedicineSuggestionUpdateInput, Prisma.MedicineSuggestionUncheckedUpdateInput>;
    /**
     * Choose, which MedicineSuggestion to update.
     */
    where: Prisma.MedicineSuggestionWhereUniqueInput;
};
/**
 * MedicineSuggestion updateMany
 */
export type MedicineSuggestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicineSuggestions.
     */
    data: Prisma.XOR<Prisma.MedicineSuggestionUpdateManyMutationInput, Prisma.MedicineSuggestionUncheckedUpdateManyInput>;
    /**
     * Filter which MedicineSuggestions to update
     */
    where?: Prisma.MedicineSuggestionWhereInput;
    /**
     * Limit how many MedicineSuggestions to update.
     */
    limit?: number;
};
/**
 * MedicineSuggestion updateManyAndReturn
 */
export type MedicineSuggestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * The data used to update MedicineSuggestions.
     */
    data: Prisma.XOR<Prisma.MedicineSuggestionUpdateManyMutationInput, Prisma.MedicineSuggestionUncheckedUpdateManyInput>;
    /**
     * Filter which MedicineSuggestions to update
     */
    where?: Prisma.MedicineSuggestionWhereInput;
    /**
     * Limit how many MedicineSuggestions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MedicineSuggestion upsert
 */
export type MedicineSuggestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * The filter to search for the MedicineSuggestion to update in case it exists.
     */
    where: Prisma.MedicineSuggestionWhereUniqueInput;
    /**
     * In case the MedicineSuggestion found by the `where` argument doesn't exist, create a new MedicineSuggestion with this data.
     */
    create: Prisma.XOR<Prisma.MedicineSuggestionCreateInput, Prisma.MedicineSuggestionUncheckedCreateInput>;
    /**
     * In case the MedicineSuggestion was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MedicineSuggestionUpdateInput, Prisma.MedicineSuggestionUncheckedUpdateInput>;
};
/**
 * MedicineSuggestion delete
 */
export type MedicineSuggestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
    /**
     * Filter which MedicineSuggestion to delete.
     */
    where: Prisma.MedicineSuggestionWhereUniqueInput;
};
/**
 * MedicineSuggestion deleteMany
 */
export type MedicineSuggestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineSuggestions to delete
     */
    where?: Prisma.MedicineSuggestionWhereInput;
    /**
     * Limit how many MedicineSuggestions to delete.
     */
    limit?: number;
};
/**
 * MedicineSuggestion.reviewer
 */
export type MedicineSuggestion$reviewerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * MedicineSuggestion without action
 */
export type MedicineSuggestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineSuggestion
     */
    select?: Prisma.MedicineSuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicineSuggestion
     */
    omit?: Prisma.MedicineSuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicineSuggestionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MedicineSuggestion.d.ts.map