import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Pharmacist
 *
 */
export type PharmacistModel = runtime.Types.Result.DefaultSelection<Prisma.$PharmacistPayload>;
export type AggregatePharmacist = {
    _count: PharmacistCountAggregateOutputType | null;
    _avg: PharmacistAvgAggregateOutputType | null;
    _sum: PharmacistSumAggregateOutputType | null;
    _min: PharmacistMinAggregateOutputType | null;
    _max: PharmacistMaxAggregateOutputType | null;
};
export type PharmacistAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    verifiedBy: number | null;
};
export type PharmacistSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    verifiedBy: number | null;
};
export type PharmacistMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    name: string | null;
    licenseNumber: string | null;
    pharmacyName: string | null;
    phoneNumber: string | null;
    address: string | null;
    city: string | null;
    isVerified: boolean | null;
    verifiedAt: Date | null;
    verifiedBy: number | null;
    verificationNotes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PharmacistMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    name: string | null;
    licenseNumber: string | null;
    pharmacyName: string | null;
    phoneNumber: string | null;
    address: string | null;
    city: string | null;
    isVerified: boolean | null;
    verifiedAt: Date | null;
    verifiedBy: number | null;
    verificationNotes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PharmacistCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    licenseNumber: number;
    pharmacyName: number;
    phoneNumber: number;
    address: number;
    city: number;
    isVerified: number;
    verifiedAt: number;
    verifiedBy: number;
    verificationNotes: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type PharmacistAvgAggregateInputType = {
    id?: true;
    userId?: true;
    verifiedBy?: true;
};
export type PharmacistSumAggregateInputType = {
    id?: true;
    userId?: true;
    verifiedBy?: true;
};
export type PharmacistMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    licenseNumber?: true;
    pharmacyName?: true;
    phoneNumber?: true;
    address?: true;
    city?: true;
    isVerified?: true;
    verifiedAt?: true;
    verifiedBy?: true;
    verificationNotes?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PharmacistMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    licenseNumber?: true;
    pharmacyName?: true;
    phoneNumber?: true;
    address?: true;
    city?: true;
    isVerified?: true;
    verifiedAt?: true;
    verifiedBy?: true;
    verificationNotes?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PharmacistCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    licenseNumber?: true;
    pharmacyName?: true;
    phoneNumber?: true;
    address?: true;
    city?: true;
    isVerified?: true;
    verifiedAt?: true;
    verifiedBy?: true;
    verificationNotes?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type PharmacistAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Pharmacist to aggregate.
     */
    where?: Prisma.PharmacistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pharmacists to fetch.
     */
    orderBy?: Prisma.PharmacistOrderByWithRelationInput | Prisma.PharmacistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PharmacistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pharmacists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pharmacists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Pharmacists
    **/
    _count?: true | PharmacistCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PharmacistAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PharmacistSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PharmacistMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PharmacistMaxAggregateInputType;
};
export type GetPharmacistAggregateType<T extends PharmacistAggregateArgs> = {
    [P in keyof T & keyof AggregatePharmacist]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePharmacist[P]> : Prisma.GetScalarType<T[P], AggregatePharmacist[P]>;
};
export type PharmacistGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PharmacistWhereInput;
    orderBy?: Prisma.PharmacistOrderByWithAggregationInput | Prisma.PharmacistOrderByWithAggregationInput[];
    by: Prisma.PharmacistScalarFieldEnum[] | Prisma.PharmacistScalarFieldEnum;
    having?: Prisma.PharmacistScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PharmacistCountAggregateInputType | true;
    _avg?: PharmacistAvgAggregateInputType;
    _sum?: PharmacistSumAggregateInputType;
    _min?: PharmacistMinAggregateInputType;
    _max?: PharmacistMaxAggregateInputType;
};
export type PharmacistGroupByOutputType = {
    id: number;
    userId: number;
    name: string;
    licenseNumber: string;
    pharmacyName: string | null;
    phoneNumber: string | null;
    address: string | null;
    city: string | null;
    isVerified: boolean;
    verifiedAt: Date | null;
    verifiedBy: number | null;
    verificationNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: PharmacistCountAggregateOutputType | null;
    _avg: PharmacistAvgAggregateOutputType | null;
    _sum: PharmacistSumAggregateOutputType | null;
    _min: PharmacistMinAggregateOutputType | null;
    _max: PharmacistMaxAggregateOutputType | null;
};
type GetPharmacistGroupByPayload<T extends PharmacistGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PharmacistGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PharmacistGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PharmacistGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PharmacistGroupByOutputType[P]>;
}>>;
export type PharmacistWhereInput = {
    AND?: Prisma.PharmacistWhereInput | Prisma.PharmacistWhereInput[];
    OR?: Prisma.PharmacistWhereInput[];
    NOT?: Prisma.PharmacistWhereInput | Prisma.PharmacistWhereInput[];
    id?: Prisma.IntFilter<"Pharmacist"> | number;
    userId?: Prisma.IntFilter<"Pharmacist"> | number;
    name?: Prisma.StringFilter<"Pharmacist"> | string;
    licenseNumber?: Prisma.StringFilter<"Pharmacist"> | string;
    pharmacyName?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    phoneNumber?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    address?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    city?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    isVerified?: Prisma.BoolFilter<"Pharmacist"> | boolean;
    verifiedAt?: Prisma.DateTimeNullableFilter<"Pharmacist"> | Date | string | null;
    verifiedBy?: Prisma.IntNullableFilter<"Pharmacist"> | number | null;
    verificationNotes?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Pharmacist"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pharmacist"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Pharmacist"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    ratings?: Prisma.RatingListRelationFilter;
};
export type PharmacistOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    licenseNumber?: Prisma.SortOrder;
    pharmacyName?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    verificationNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    ratings?: Prisma.RatingOrderByRelationAggregateInput;
};
export type PharmacistWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId?: number;
    licenseNumber?: string;
    AND?: Prisma.PharmacistWhereInput | Prisma.PharmacistWhereInput[];
    OR?: Prisma.PharmacistWhereInput[];
    NOT?: Prisma.PharmacistWhereInput | Prisma.PharmacistWhereInput[];
    name?: Prisma.StringFilter<"Pharmacist"> | string;
    pharmacyName?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    phoneNumber?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    address?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    city?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    isVerified?: Prisma.BoolFilter<"Pharmacist"> | boolean;
    verifiedAt?: Prisma.DateTimeNullableFilter<"Pharmacist"> | Date | string | null;
    verifiedBy?: Prisma.IntNullableFilter<"Pharmacist"> | number | null;
    verificationNotes?: Prisma.StringNullableFilter<"Pharmacist"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Pharmacist"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pharmacist"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Pharmacist"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    ratings?: Prisma.RatingListRelationFilter;
}, "id" | "userId" | "licenseNumber">;
export type PharmacistOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    licenseNumber?: Prisma.SortOrder;
    pharmacyName?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    city?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    verificationNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PharmacistCountOrderByAggregateInput;
    _avg?: Prisma.PharmacistAvgOrderByAggregateInput;
    _max?: Prisma.PharmacistMaxOrderByAggregateInput;
    _min?: Prisma.PharmacistMinOrderByAggregateInput;
    _sum?: Prisma.PharmacistSumOrderByAggregateInput;
};
export type PharmacistScalarWhereWithAggregatesInput = {
    AND?: Prisma.PharmacistScalarWhereWithAggregatesInput | Prisma.PharmacistScalarWhereWithAggregatesInput[];
    OR?: Prisma.PharmacistScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PharmacistScalarWhereWithAggregatesInput | Prisma.PharmacistScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Pharmacist"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Pharmacist"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Pharmacist"> | string;
    licenseNumber?: Prisma.StringWithAggregatesFilter<"Pharmacist"> | string;
    pharmacyName?: Prisma.StringNullableWithAggregatesFilter<"Pharmacist"> | string | null;
    phoneNumber?: Prisma.StringNullableWithAggregatesFilter<"Pharmacist"> | string | null;
    address?: Prisma.StringNullableWithAggregatesFilter<"Pharmacist"> | string | null;
    city?: Prisma.StringNullableWithAggregatesFilter<"Pharmacist"> | string | null;
    isVerified?: Prisma.BoolWithAggregatesFilter<"Pharmacist"> | boolean;
    verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Pharmacist"> | Date | string | null;
    verifiedBy?: Prisma.IntNullableWithAggregatesFilter<"Pharmacist"> | number | null;
    verificationNotes?: Prisma.StringNullableWithAggregatesFilter<"Pharmacist"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Pharmacist"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Pharmacist"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Pharmacist"> | Date | string | null;
};
export type PharmacistCreateInput = {
    name: string;
    licenseNumber: string;
    pharmacyName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    isVerified?: boolean;
    verifiedAt?: Date | string | null;
    verifiedBy?: number | null;
    verificationNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPharmacistInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPharmacistInput;
};
export type PharmacistUncheckedCreateInput = {
    id?: number;
    userId: number;
    name: string;
    licenseNumber: string;
    pharmacyName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    isVerified?: boolean;
    verifiedAt?: Date | string | null;
    verifiedBy?: number | null;
    verificationNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPharmacistInput;
};
export type PharmacistUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPharmacistNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPharmacistNestedInput;
};
export type PharmacistUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPharmacistNestedInput;
};
export type PharmacistCreateManyInput = {
    id?: number;
    userId: number;
    name: string;
    licenseNumber: string;
    pharmacyName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    isVerified?: boolean;
    verifiedAt?: Date | string | null;
    verifiedBy?: number | null;
    verificationNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type PharmacistUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PharmacistUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PharmacistNullableScalarRelationFilter = {
    is?: Prisma.PharmacistWhereInput | null;
    isNot?: Prisma.PharmacistWhereInput | null;
};
export type PharmacistCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    licenseNumber?: Prisma.SortOrder;
    pharmacyName?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
    verificationNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PharmacistAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
};
export type PharmacistMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    licenseNumber?: Prisma.SortOrder;
    pharmacyName?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
    verificationNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PharmacistMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    licenseNumber?: Prisma.SortOrder;
    pharmacyName?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
    verificationNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PharmacistSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    verifiedBy?: Prisma.SortOrder;
};
export type PharmacistCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PharmacistCreateWithoutUserInput, Prisma.PharmacistUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PharmacistCreateOrConnectWithoutUserInput;
    connect?: Prisma.PharmacistWhereUniqueInput;
};
export type PharmacistUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PharmacistCreateWithoutUserInput, Prisma.PharmacistUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PharmacistCreateOrConnectWithoutUserInput;
    connect?: Prisma.PharmacistWhereUniqueInput;
};
export type PharmacistUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PharmacistCreateWithoutUserInput, Prisma.PharmacistUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PharmacistCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PharmacistUpsertWithoutUserInput;
    disconnect?: Prisma.PharmacistWhereInput | boolean;
    delete?: Prisma.PharmacistWhereInput | boolean;
    connect?: Prisma.PharmacistWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PharmacistUpdateToOneWithWhereWithoutUserInput, Prisma.PharmacistUpdateWithoutUserInput>, Prisma.PharmacistUncheckedUpdateWithoutUserInput>;
};
export type PharmacistUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PharmacistCreateWithoutUserInput, Prisma.PharmacistUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PharmacistCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PharmacistUpsertWithoutUserInput;
    disconnect?: Prisma.PharmacistWhereInput | boolean;
    delete?: Prisma.PharmacistWhereInput | boolean;
    connect?: Prisma.PharmacistWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PharmacistUpdateToOneWithWhereWithoutUserInput, Prisma.PharmacistUpdateWithoutUserInput>, Prisma.PharmacistUncheckedUpdateWithoutUserInput>;
};
export type PharmacistCreateNestedOneWithoutRatingsInput = {
    create?: Prisma.XOR<Prisma.PharmacistCreateWithoutRatingsInput, Prisma.PharmacistUncheckedCreateWithoutRatingsInput>;
    connectOrCreate?: Prisma.PharmacistCreateOrConnectWithoutRatingsInput;
    connect?: Prisma.PharmacistWhereUniqueInput;
};
export type PharmacistUpdateOneWithoutRatingsNestedInput = {
    create?: Prisma.XOR<Prisma.PharmacistCreateWithoutRatingsInput, Prisma.PharmacistUncheckedCreateWithoutRatingsInput>;
    connectOrCreate?: Prisma.PharmacistCreateOrConnectWithoutRatingsInput;
    upsert?: Prisma.PharmacistUpsertWithoutRatingsInput;
    disconnect?: Prisma.PharmacistWhereInput | boolean;
    delete?: Prisma.PharmacistWhereInput | boolean;
    connect?: Prisma.PharmacistWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PharmacistUpdateToOneWithWhereWithoutRatingsInput, Prisma.PharmacistUpdateWithoutRatingsInput>, Prisma.PharmacistUncheckedUpdateWithoutRatingsInput>;
};
export type PharmacistCreateWithoutUserInput = {
    name: string;
    licenseNumber: string;
    pharmacyName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    isVerified?: boolean;
    verifiedAt?: Date | string | null;
    verifiedBy?: number | null;
    verificationNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    ratings?: Prisma.RatingCreateNestedManyWithoutPharmacistInput;
};
export type PharmacistUncheckedCreateWithoutUserInput = {
    id?: number;
    name: string;
    licenseNumber: string;
    pharmacyName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    isVerified?: boolean;
    verifiedAt?: Date | string | null;
    verifiedBy?: number | null;
    verificationNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPharmacistInput;
};
export type PharmacistCreateOrConnectWithoutUserInput = {
    where: Prisma.PharmacistWhereUniqueInput;
    create: Prisma.XOR<Prisma.PharmacistCreateWithoutUserInput, Prisma.PharmacistUncheckedCreateWithoutUserInput>;
};
export type PharmacistUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.PharmacistUpdateWithoutUserInput, Prisma.PharmacistUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PharmacistCreateWithoutUserInput, Prisma.PharmacistUncheckedCreateWithoutUserInput>;
    where?: Prisma.PharmacistWhereInput;
};
export type PharmacistUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.PharmacistWhereInput;
    data: Prisma.XOR<Prisma.PharmacistUpdateWithoutUserInput, Prisma.PharmacistUncheckedUpdateWithoutUserInput>;
};
export type PharmacistUpdateWithoutUserInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ratings?: Prisma.RatingUpdateManyWithoutPharmacistNestedInput;
};
export type PharmacistUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPharmacistNestedInput;
};
export type PharmacistCreateWithoutRatingsInput = {
    name: string;
    licenseNumber: string;
    pharmacyName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    isVerified?: boolean;
    verifiedAt?: Date | string | null;
    verifiedBy?: number | null;
    verificationNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPharmacistInput;
};
export type PharmacistUncheckedCreateWithoutRatingsInput = {
    id?: number;
    userId: number;
    name: string;
    licenseNumber: string;
    pharmacyName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    isVerified?: boolean;
    verifiedAt?: Date | string | null;
    verifiedBy?: number | null;
    verificationNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type PharmacistCreateOrConnectWithoutRatingsInput = {
    where: Prisma.PharmacistWhereUniqueInput;
    create: Prisma.XOR<Prisma.PharmacistCreateWithoutRatingsInput, Prisma.PharmacistUncheckedCreateWithoutRatingsInput>;
};
export type PharmacistUpsertWithoutRatingsInput = {
    update: Prisma.XOR<Prisma.PharmacistUpdateWithoutRatingsInput, Prisma.PharmacistUncheckedUpdateWithoutRatingsInput>;
    create: Prisma.XOR<Prisma.PharmacistCreateWithoutRatingsInput, Prisma.PharmacistUncheckedCreateWithoutRatingsInput>;
    where?: Prisma.PharmacistWhereInput;
};
export type PharmacistUpdateToOneWithWhereWithoutRatingsInput = {
    where?: Prisma.PharmacistWhereInput;
    data: Prisma.XOR<Prisma.PharmacistUpdateWithoutRatingsInput, Prisma.PharmacistUncheckedUpdateWithoutRatingsInput>;
};
export type PharmacistUpdateWithoutRatingsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPharmacistNestedInput;
};
export type PharmacistUncheckedUpdateWithoutRatingsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    licenseNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    pharmacyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    verifiedBy?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    verificationNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type PharmacistCountOutputType
 */
export type PharmacistCountOutputType = {
    ratings: number;
};
export type PharmacistCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ratings?: boolean | PharmacistCountOutputTypeCountRatingsArgs;
};
/**
 * PharmacistCountOutputType without action
 */
export type PharmacistCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacistCountOutputType
     */
    select?: Prisma.PharmacistCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PharmacistCountOutputType without action
 */
export type PharmacistCountOutputTypeCountRatingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingWhereInput;
};
export type PharmacistSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    licenseNumber?: boolean;
    pharmacyName?: boolean;
    phoneNumber?: boolean;
    address?: boolean;
    city?: boolean;
    isVerified?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
    verificationNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    ratings?: boolean | Prisma.Pharmacist$ratingsArgs<ExtArgs>;
    _count?: boolean | Prisma.PharmacistCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pharmacist"]>;
export type PharmacistSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    licenseNumber?: boolean;
    pharmacyName?: boolean;
    phoneNumber?: boolean;
    address?: boolean;
    city?: boolean;
    isVerified?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
    verificationNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pharmacist"]>;
export type PharmacistSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    licenseNumber?: boolean;
    pharmacyName?: boolean;
    phoneNumber?: boolean;
    address?: boolean;
    city?: boolean;
    isVerified?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
    verificationNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pharmacist"]>;
export type PharmacistSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    licenseNumber?: boolean;
    pharmacyName?: boolean;
    phoneNumber?: boolean;
    address?: boolean;
    city?: boolean;
    isVerified?: boolean;
    verifiedAt?: boolean;
    verifiedBy?: boolean;
    verificationNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type PharmacistOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "licenseNumber" | "pharmacyName" | "phoneNumber" | "address" | "city" | "isVerified" | "verifiedAt" | "verifiedBy" | "verificationNotes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["pharmacist"]>;
export type PharmacistInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    ratings?: boolean | Prisma.Pharmacist$ratingsArgs<ExtArgs>;
    _count?: boolean | Prisma.PharmacistCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PharmacistIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PharmacistIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PharmacistPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Pharmacist";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        ratings: Prisma.$RatingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        name: string;
        licenseNumber: string;
        pharmacyName: string | null;
        phoneNumber: string | null;
        address: string | null;
        city: string | null;
        isVerified: boolean;
        verifiedAt: Date | null;
        verifiedBy: number | null;
        verificationNotes: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["pharmacist"]>;
    composites: {};
};
export type PharmacistGetPayload<S extends boolean | null | undefined | PharmacistDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PharmacistPayload, S>;
export type PharmacistCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PharmacistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PharmacistCountAggregateInputType | true;
};
export interface PharmacistDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Pharmacist'];
        meta: {
            name: 'Pharmacist';
        };
    };
    /**
     * Find zero or one Pharmacist that matches the filter.
     * @param {PharmacistFindUniqueArgs} args - Arguments to find a Pharmacist
     * @example
     * // Get one Pharmacist
     * const pharmacist = await prisma.pharmacist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PharmacistFindUniqueArgs>(args: Prisma.SelectSubset<T, PharmacistFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Pharmacist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PharmacistFindUniqueOrThrowArgs} args - Arguments to find a Pharmacist
     * @example
     * // Get one Pharmacist
     * const pharmacist = await prisma.pharmacist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PharmacistFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PharmacistFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Pharmacist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacistFindFirstArgs} args - Arguments to find a Pharmacist
     * @example
     * // Get one Pharmacist
     * const pharmacist = await prisma.pharmacist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PharmacistFindFirstArgs>(args?: Prisma.SelectSubset<T, PharmacistFindFirstArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Pharmacist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacistFindFirstOrThrowArgs} args - Arguments to find a Pharmacist
     * @example
     * // Get one Pharmacist
     * const pharmacist = await prisma.pharmacist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PharmacistFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PharmacistFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Pharmacists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pharmacists
     * const pharmacists = await prisma.pharmacist.findMany()
     *
     * // Get first 10 Pharmacists
     * const pharmacists = await prisma.pharmacist.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const pharmacistWithIdOnly = await prisma.pharmacist.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PharmacistFindManyArgs>(args?: Prisma.SelectSubset<T, PharmacistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Pharmacist.
     * @param {PharmacistCreateArgs} args - Arguments to create a Pharmacist.
     * @example
     * // Create one Pharmacist
     * const Pharmacist = await prisma.pharmacist.create({
     *   data: {
     *     // ... data to create a Pharmacist
     *   }
     * })
     *
     */
    create<T extends PharmacistCreateArgs>(args: Prisma.SelectSubset<T, PharmacistCreateArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Pharmacists.
     * @param {PharmacistCreateManyArgs} args - Arguments to create many Pharmacists.
     * @example
     * // Create many Pharmacists
     * const pharmacist = await prisma.pharmacist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PharmacistCreateManyArgs>(args?: Prisma.SelectSubset<T, PharmacistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Pharmacists and returns the data saved in the database.
     * @param {PharmacistCreateManyAndReturnArgs} args - Arguments to create many Pharmacists.
     * @example
     * // Create many Pharmacists
     * const pharmacist = await prisma.pharmacist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Pharmacists and only return the `id`
     * const pharmacistWithIdOnly = await prisma.pharmacist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PharmacistCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PharmacistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Pharmacist.
     * @param {PharmacistDeleteArgs} args - Arguments to delete one Pharmacist.
     * @example
     * // Delete one Pharmacist
     * const Pharmacist = await prisma.pharmacist.delete({
     *   where: {
     *     // ... filter to delete one Pharmacist
     *   }
     * })
     *
     */
    delete<T extends PharmacistDeleteArgs>(args: Prisma.SelectSubset<T, PharmacistDeleteArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Pharmacist.
     * @param {PharmacistUpdateArgs} args - Arguments to update one Pharmacist.
     * @example
     * // Update one Pharmacist
     * const pharmacist = await prisma.pharmacist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PharmacistUpdateArgs>(args: Prisma.SelectSubset<T, PharmacistUpdateArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Pharmacists.
     * @param {PharmacistDeleteManyArgs} args - Arguments to filter Pharmacists to delete.
     * @example
     * // Delete a few Pharmacists
     * const { count } = await prisma.pharmacist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PharmacistDeleteManyArgs>(args?: Prisma.SelectSubset<T, PharmacistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Pharmacists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pharmacists
     * const pharmacist = await prisma.pharmacist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PharmacistUpdateManyArgs>(args: Prisma.SelectSubset<T, PharmacistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Pharmacists and returns the data updated in the database.
     * @param {PharmacistUpdateManyAndReturnArgs} args - Arguments to update many Pharmacists.
     * @example
     * // Update many Pharmacists
     * const pharmacist = await prisma.pharmacist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Pharmacists and only return the `id`
     * const pharmacistWithIdOnly = await prisma.pharmacist.updateManyAndReturn({
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
    updateManyAndReturn<T extends PharmacistUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PharmacistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Pharmacist.
     * @param {PharmacistUpsertArgs} args - Arguments to update or create a Pharmacist.
     * @example
     * // Update or create a Pharmacist
     * const pharmacist = await prisma.pharmacist.upsert({
     *   create: {
     *     // ... data to create a Pharmacist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pharmacist we want to update
     *   }
     * })
     */
    upsert<T extends PharmacistUpsertArgs>(args: Prisma.SelectSubset<T, PharmacistUpsertArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Pharmacists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacistCountArgs} args - Arguments to filter Pharmacists to count.
     * @example
     * // Count the number of Pharmacists
     * const count = await prisma.pharmacist.count({
     *   where: {
     *     // ... the filter for the Pharmacists we want to count
     *   }
     * })
    **/
    count<T extends PharmacistCountArgs>(args?: Prisma.Subset<T, PharmacistCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PharmacistCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Pharmacist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PharmacistAggregateArgs>(args: Prisma.Subset<T, PharmacistAggregateArgs>): Prisma.PrismaPromise<GetPharmacistAggregateType<T>>;
    /**
     * Group by Pharmacist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacistGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PharmacistGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PharmacistGroupByArgs['orderBy'];
    } : {
        orderBy?: PharmacistGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PharmacistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPharmacistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Pharmacist model
     */
    readonly fields: PharmacistFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Pharmacist.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PharmacistClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    ratings<T extends Prisma.Pharmacist$ratingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Pharmacist$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Pharmacist model
 */
export interface PharmacistFieldRefs {
    readonly id: Prisma.FieldRef<"Pharmacist", 'Int'>;
    readonly userId: Prisma.FieldRef<"Pharmacist", 'Int'>;
    readonly name: Prisma.FieldRef<"Pharmacist", 'String'>;
    readonly licenseNumber: Prisma.FieldRef<"Pharmacist", 'String'>;
    readonly pharmacyName: Prisma.FieldRef<"Pharmacist", 'String'>;
    readonly phoneNumber: Prisma.FieldRef<"Pharmacist", 'String'>;
    readonly address: Prisma.FieldRef<"Pharmacist", 'String'>;
    readonly city: Prisma.FieldRef<"Pharmacist", 'String'>;
    readonly isVerified: Prisma.FieldRef<"Pharmacist", 'Boolean'>;
    readonly verifiedAt: Prisma.FieldRef<"Pharmacist", 'DateTime'>;
    readonly verifiedBy: Prisma.FieldRef<"Pharmacist", 'Int'>;
    readonly verificationNotes: Prisma.FieldRef<"Pharmacist", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Pharmacist", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Pharmacist", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Pharmacist", 'DateTime'>;
}
/**
 * Pharmacist findUnique
 */
export type PharmacistFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * Filter, which Pharmacist to fetch.
     */
    where: Prisma.PharmacistWhereUniqueInput;
};
/**
 * Pharmacist findUniqueOrThrow
 */
export type PharmacistFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * Filter, which Pharmacist to fetch.
     */
    where: Prisma.PharmacistWhereUniqueInput;
};
/**
 * Pharmacist findFirst
 */
export type PharmacistFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * Filter, which Pharmacist to fetch.
     */
    where?: Prisma.PharmacistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pharmacists to fetch.
     */
    orderBy?: Prisma.PharmacistOrderByWithRelationInput | Prisma.PharmacistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Pharmacists.
     */
    cursor?: Prisma.PharmacistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pharmacists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pharmacists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Pharmacists.
     */
    distinct?: Prisma.PharmacistScalarFieldEnum | Prisma.PharmacistScalarFieldEnum[];
};
/**
 * Pharmacist findFirstOrThrow
 */
export type PharmacistFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * Filter, which Pharmacist to fetch.
     */
    where?: Prisma.PharmacistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pharmacists to fetch.
     */
    orderBy?: Prisma.PharmacistOrderByWithRelationInput | Prisma.PharmacistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Pharmacists.
     */
    cursor?: Prisma.PharmacistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pharmacists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pharmacists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Pharmacists.
     */
    distinct?: Prisma.PharmacistScalarFieldEnum | Prisma.PharmacistScalarFieldEnum[];
};
/**
 * Pharmacist findMany
 */
export type PharmacistFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * Filter, which Pharmacists to fetch.
     */
    where?: Prisma.PharmacistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Pharmacists to fetch.
     */
    orderBy?: Prisma.PharmacistOrderByWithRelationInput | Prisma.PharmacistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Pharmacists.
     */
    cursor?: Prisma.PharmacistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Pharmacists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Pharmacists.
     */
    skip?: number;
    distinct?: Prisma.PharmacistScalarFieldEnum | Prisma.PharmacistScalarFieldEnum[];
};
/**
 * Pharmacist create
 */
export type PharmacistCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * The data needed to create a Pharmacist.
     */
    data: Prisma.XOR<Prisma.PharmacistCreateInput, Prisma.PharmacistUncheckedCreateInput>;
};
/**
 * Pharmacist createMany
 */
export type PharmacistCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pharmacists.
     */
    data: Prisma.PharmacistCreateManyInput | Prisma.PharmacistCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Pharmacist createManyAndReturn
 */
export type PharmacistCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * The data used to create many Pharmacists.
     */
    data: Prisma.PharmacistCreateManyInput | Prisma.PharmacistCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Pharmacist update
 */
export type PharmacistUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * The data needed to update a Pharmacist.
     */
    data: Prisma.XOR<Prisma.PharmacistUpdateInput, Prisma.PharmacistUncheckedUpdateInput>;
    /**
     * Choose, which Pharmacist to update.
     */
    where: Prisma.PharmacistWhereUniqueInput;
};
/**
 * Pharmacist updateMany
 */
export type PharmacistUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Pharmacists.
     */
    data: Prisma.XOR<Prisma.PharmacistUpdateManyMutationInput, Prisma.PharmacistUncheckedUpdateManyInput>;
    /**
     * Filter which Pharmacists to update
     */
    where?: Prisma.PharmacistWhereInput;
    /**
     * Limit how many Pharmacists to update.
     */
    limit?: number;
};
/**
 * Pharmacist updateManyAndReturn
 */
export type PharmacistUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * The data used to update Pharmacists.
     */
    data: Prisma.XOR<Prisma.PharmacistUpdateManyMutationInput, Prisma.PharmacistUncheckedUpdateManyInput>;
    /**
     * Filter which Pharmacists to update
     */
    where?: Prisma.PharmacistWhereInput;
    /**
     * Limit how many Pharmacists to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Pharmacist upsert
 */
export type PharmacistUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * The filter to search for the Pharmacist to update in case it exists.
     */
    where: Prisma.PharmacistWhereUniqueInput;
    /**
     * In case the Pharmacist found by the `where` argument doesn't exist, create a new Pharmacist with this data.
     */
    create: Prisma.XOR<Prisma.PharmacistCreateInput, Prisma.PharmacistUncheckedCreateInput>;
    /**
     * In case the Pharmacist was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PharmacistUpdateInput, Prisma.PharmacistUncheckedUpdateInput>;
};
/**
 * Pharmacist delete
 */
export type PharmacistDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
    /**
     * Filter which Pharmacist to delete.
     */
    where: Prisma.PharmacistWhereUniqueInput;
};
/**
 * Pharmacist deleteMany
 */
export type PharmacistDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Pharmacists to delete
     */
    where?: Prisma.PharmacistWhereInput;
    /**
     * Limit how many Pharmacists to delete.
     */
    limit?: number;
};
/**
 * Pharmacist.ratings
 */
export type Pharmacist$ratingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: Prisma.RatingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Rating
     */
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithRelationInput | Prisma.RatingOrderByWithRelationInput[];
    cursor?: Prisma.RatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingScalarFieldEnum | Prisma.RatingScalarFieldEnum[];
};
/**
 * Pharmacist without action
 */
export type PharmacistDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pharmacist
     */
    select?: Prisma.PharmacistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pharmacist
     */
    omit?: Prisma.PharmacistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PharmacistInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Pharmacist.d.ts.map