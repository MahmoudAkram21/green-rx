import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ContractingCompany
 *
 */
export type ContractingCompanyModel = runtime.Types.Result.DefaultSelection<Prisma.$ContractingCompanyPayload>;
export type AggregateContractingCompany = {
    _count: ContractingCompanyCountAggregateOutputType | null;
    _avg: ContractingCompanyAvgAggregateOutputType | null;
    _sum: ContractingCompanySumAggregateOutputType | null;
    _min: ContractingCompanyMinAggregateOutputType | null;
    _max: ContractingCompanyMaxAggregateOutputType | null;
};
export type ContractingCompanyAvgAggregateOutputType = {
    id: number | null;
    companyId: number | null;
};
export type ContractingCompanySumAggregateOutputType = {
    id: number | null;
    companyId: number | null;
};
export type ContractingCompanyMinAggregateOutputType = {
    id: number | null;
    title: string | null;
    companyId: number | null;
    contractingDate: Date | null;
    expiryDate: Date | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ContractingCompanyMaxAggregateOutputType = {
    id: number | null;
    title: string | null;
    companyId: number | null;
    contractingDate: Date | null;
    expiryDate: Date | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ContractingCompanyCountAggregateOutputType = {
    id: number;
    title: number;
    companyId: number;
    contractingDate: number;
    expiryDate: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ContractingCompanyAvgAggregateInputType = {
    id?: true;
    companyId?: true;
};
export type ContractingCompanySumAggregateInputType = {
    id?: true;
    companyId?: true;
};
export type ContractingCompanyMinAggregateInputType = {
    id?: true;
    title?: true;
    companyId?: true;
    contractingDate?: true;
    expiryDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ContractingCompanyMaxAggregateInputType = {
    id?: true;
    title?: true;
    companyId?: true;
    contractingDate?: true;
    expiryDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ContractingCompanyCountAggregateInputType = {
    id?: true;
    title?: true;
    companyId?: true;
    contractingDate?: true;
    expiryDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ContractingCompanyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ContractingCompany to aggregate.
     */
    where?: Prisma.ContractingCompanyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ContractingCompanies to fetch.
     */
    orderBy?: Prisma.ContractingCompanyOrderByWithRelationInput | Prisma.ContractingCompanyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ContractingCompanyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ContractingCompanies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ContractingCompanies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ContractingCompanies
    **/
    _count?: true | ContractingCompanyCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ContractingCompanyAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ContractingCompanySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ContractingCompanyMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ContractingCompanyMaxAggregateInputType;
};
export type GetContractingCompanyAggregateType<T extends ContractingCompanyAggregateArgs> = {
    [P in keyof T & keyof AggregateContractingCompany]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateContractingCompany[P]> : Prisma.GetScalarType<T[P], AggregateContractingCompany[P]>;
};
export type ContractingCompanyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContractingCompanyWhereInput;
    orderBy?: Prisma.ContractingCompanyOrderByWithAggregationInput | Prisma.ContractingCompanyOrderByWithAggregationInput[];
    by: Prisma.ContractingCompanyScalarFieldEnum[] | Prisma.ContractingCompanyScalarFieldEnum;
    having?: Prisma.ContractingCompanyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ContractingCompanyCountAggregateInputType | true;
    _avg?: ContractingCompanyAvgAggregateInputType;
    _sum?: ContractingCompanySumAggregateInputType;
    _min?: ContractingCompanyMinAggregateInputType;
    _max?: ContractingCompanyMaxAggregateInputType;
};
export type ContractingCompanyGroupByOutputType = {
    id: number;
    title: string;
    companyId: number;
    contractingDate: Date;
    expiryDate: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ContractingCompanyCountAggregateOutputType | null;
    _avg: ContractingCompanyAvgAggregateOutputType | null;
    _sum: ContractingCompanySumAggregateOutputType | null;
    _min: ContractingCompanyMinAggregateOutputType | null;
    _max: ContractingCompanyMaxAggregateOutputType | null;
};
type GetContractingCompanyGroupByPayload<T extends ContractingCompanyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ContractingCompanyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ContractingCompanyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ContractingCompanyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ContractingCompanyGroupByOutputType[P]>;
}>>;
export type ContractingCompanyWhereInput = {
    AND?: Prisma.ContractingCompanyWhereInput | Prisma.ContractingCompanyWhereInput[];
    OR?: Prisma.ContractingCompanyWhereInput[];
    NOT?: Prisma.ContractingCompanyWhereInput | Prisma.ContractingCompanyWhereInput[];
    id?: Prisma.IntFilter<"ContractingCompany"> | number;
    title?: Prisma.StringFilter<"ContractingCompany"> | string;
    companyId?: Prisma.IntFilter<"ContractingCompany"> | number;
    contractingDate?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"ContractingCompany"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"ContractingCompany"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameListRelationFilter;
};
export type ContractingCompanyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    contractingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameOrderByRelationAggregateInput;
};
export type ContractingCompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ContractingCompanyWhereInput | Prisma.ContractingCompanyWhereInput[];
    OR?: Prisma.ContractingCompanyWhereInput[];
    NOT?: Prisma.ContractingCompanyWhereInput | Prisma.ContractingCompanyWhereInput[];
    title?: Prisma.StringFilter<"ContractingCompany"> | string;
    companyId?: Prisma.IntFilter<"ContractingCompany"> | number;
    contractingDate?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"ContractingCompany"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"ContractingCompany"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameListRelationFilter;
}, "id">;
export type ContractingCompanyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    contractingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ContractingCompanyCountOrderByAggregateInput;
    _avg?: Prisma.ContractingCompanyAvgOrderByAggregateInput;
    _max?: Prisma.ContractingCompanyMaxOrderByAggregateInput;
    _min?: Prisma.ContractingCompanyMinOrderByAggregateInput;
    _sum?: Prisma.ContractingCompanySumOrderByAggregateInput;
};
export type ContractingCompanyScalarWhereWithAggregatesInput = {
    AND?: Prisma.ContractingCompanyScalarWhereWithAggregatesInput | Prisma.ContractingCompanyScalarWhereWithAggregatesInput[];
    OR?: Prisma.ContractingCompanyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ContractingCompanyScalarWhereWithAggregatesInput | Prisma.ContractingCompanyScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ContractingCompany"> | number;
    title?: Prisma.StringWithAggregatesFilter<"ContractingCompany"> | string;
    companyId?: Prisma.IntWithAggregatesFilter<"ContractingCompany"> | number;
    contractingDate?: Prisma.DateTimeWithAggregatesFilter<"ContractingCompany"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableWithAggregatesFilter<"ContractingCompany"> | Date | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"ContractingCompany"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ContractingCompany"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ContractingCompany"> | Date | string;
};
export type ContractingCompanyCreateInput = {
    title: string;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutContractingCompaniesInput;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameCreateNestedManyWithoutContractingCompanyInput;
};
export type ContractingCompanyUncheckedCreateInput = {
    id?: number;
    title: string;
    companyId: number;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameUncheckedCreateNestedManyWithoutContractingCompanyInput;
};
export type ContractingCompanyUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutContractingCompaniesNestedInput;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameUpdateManyWithoutContractingCompanyNestedInput;
};
export type ContractingCompanyUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.IntFieldUpdateOperationsInput | number;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameUncheckedUpdateManyWithoutContractingCompanyNestedInput;
};
export type ContractingCompanyCreateManyInput = {
    id?: number;
    title: string;
    companyId: number;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContractingCompanyUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContractingCompanyUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.IntFieldUpdateOperationsInput | number;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContractingCompanyListRelationFilter = {
    every?: Prisma.ContractingCompanyWhereInput;
    some?: Prisma.ContractingCompanyWhereInput;
    none?: Prisma.ContractingCompanyWhereInput;
};
export type ContractingCompanyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ContractingCompanyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    contractingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContractingCompanyAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
};
export type ContractingCompanyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    contractingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContractingCompanyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    contractingDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContractingCompanySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
};
export type ContractingCompanyScalarRelationFilter = {
    is?: Prisma.ContractingCompanyWhereInput;
    isNot?: Prisma.ContractingCompanyWhereInput;
};
export type ContractingCompanyCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput> | Prisma.ContractingCompanyCreateWithoutCompanyInput[] | Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput | Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.ContractingCompanyCreateManyCompanyInputEnvelope;
    connect?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
};
export type ContractingCompanyUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput> | Prisma.ContractingCompanyCreateWithoutCompanyInput[] | Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput | Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.ContractingCompanyCreateManyCompanyInputEnvelope;
    connect?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
};
export type ContractingCompanyUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput> | Prisma.ContractingCompanyCreateWithoutCompanyInput[] | Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput | Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.ContractingCompanyUpsertWithWhereUniqueWithoutCompanyInput | Prisma.ContractingCompanyUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.ContractingCompanyCreateManyCompanyInputEnvelope;
    set?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    disconnect?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    delete?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    connect?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    update?: Prisma.ContractingCompanyUpdateWithWhereUniqueWithoutCompanyInput | Prisma.ContractingCompanyUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.ContractingCompanyUpdateManyWithWhereWithoutCompanyInput | Prisma.ContractingCompanyUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.ContractingCompanyScalarWhereInput | Prisma.ContractingCompanyScalarWhereInput[];
};
export type ContractingCompanyUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput> | Prisma.ContractingCompanyCreateWithoutCompanyInput[] | Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput | Prisma.ContractingCompanyCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.ContractingCompanyUpsertWithWhereUniqueWithoutCompanyInput | Prisma.ContractingCompanyUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.ContractingCompanyCreateManyCompanyInputEnvelope;
    set?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    disconnect?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    delete?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    connect?: Prisma.ContractingCompanyWhereUniqueInput | Prisma.ContractingCompanyWhereUniqueInput[];
    update?: Prisma.ContractingCompanyUpdateWithWhereUniqueWithoutCompanyInput | Prisma.ContractingCompanyUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.ContractingCompanyUpdateManyWithWhereWithoutCompanyInput | Prisma.ContractingCompanyUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.ContractingCompanyScalarWhereInput | Prisma.ContractingCompanyScalarWhereInput[];
};
export type ContractingCompanyCreateNestedOneWithoutContractingCompanyTradeNamesInput = {
    create?: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutContractingCompanyTradeNamesInput, Prisma.ContractingCompanyUncheckedCreateWithoutContractingCompanyTradeNamesInput>;
    connectOrCreate?: Prisma.ContractingCompanyCreateOrConnectWithoutContractingCompanyTradeNamesInput;
    connect?: Prisma.ContractingCompanyWhereUniqueInput;
};
export type ContractingCompanyUpdateOneRequiredWithoutContractingCompanyTradeNamesNestedInput = {
    create?: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutContractingCompanyTradeNamesInput, Prisma.ContractingCompanyUncheckedCreateWithoutContractingCompanyTradeNamesInput>;
    connectOrCreate?: Prisma.ContractingCompanyCreateOrConnectWithoutContractingCompanyTradeNamesInput;
    upsert?: Prisma.ContractingCompanyUpsertWithoutContractingCompanyTradeNamesInput;
    connect?: Prisma.ContractingCompanyWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ContractingCompanyUpdateToOneWithWhereWithoutContractingCompanyTradeNamesInput, Prisma.ContractingCompanyUpdateWithoutContractingCompanyTradeNamesInput>, Prisma.ContractingCompanyUncheckedUpdateWithoutContractingCompanyTradeNamesInput>;
};
export type ContractingCompanyCreateWithoutCompanyInput = {
    title: string;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameCreateNestedManyWithoutContractingCompanyInput;
};
export type ContractingCompanyUncheckedCreateWithoutCompanyInput = {
    id?: number;
    title: string;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameUncheckedCreateNestedManyWithoutContractingCompanyInput;
};
export type ContractingCompanyCreateOrConnectWithoutCompanyInput = {
    where: Prisma.ContractingCompanyWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput>;
};
export type ContractingCompanyCreateManyCompanyInputEnvelope = {
    data: Prisma.ContractingCompanyCreateManyCompanyInput | Prisma.ContractingCompanyCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type ContractingCompanyUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.ContractingCompanyWhereUniqueInput;
    update: Prisma.XOR<Prisma.ContractingCompanyUpdateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedCreateWithoutCompanyInput>;
};
export type ContractingCompanyUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.ContractingCompanyWhereUniqueInput;
    data: Prisma.XOR<Prisma.ContractingCompanyUpdateWithoutCompanyInput, Prisma.ContractingCompanyUncheckedUpdateWithoutCompanyInput>;
};
export type ContractingCompanyUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.ContractingCompanyScalarWhereInput;
    data: Prisma.XOR<Prisma.ContractingCompanyUpdateManyMutationInput, Prisma.ContractingCompanyUncheckedUpdateManyWithoutCompanyInput>;
};
export type ContractingCompanyScalarWhereInput = {
    AND?: Prisma.ContractingCompanyScalarWhereInput | Prisma.ContractingCompanyScalarWhereInput[];
    OR?: Prisma.ContractingCompanyScalarWhereInput[];
    NOT?: Prisma.ContractingCompanyScalarWhereInput | Prisma.ContractingCompanyScalarWhereInput[];
    id?: Prisma.IntFilter<"ContractingCompany"> | number;
    title?: Prisma.StringFilter<"ContractingCompany"> | string;
    companyId?: Prisma.IntFilter<"ContractingCompany"> | number;
    contractingDate?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    expiryDate?: Prisma.DateTimeNullableFilter<"ContractingCompany"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"ContractingCompany"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContractingCompany"> | Date | string;
};
export type ContractingCompanyCreateWithoutContractingCompanyTradeNamesInput = {
    title: string;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutContractingCompaniesInput;
};
export type ContractingCompanyUncheckedCreateWithoutContractingCompanyTradeNamesInput = {
    id?: number;
    title: string;
    companyId: number;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContractingCompanyCreateOrConnectWithoutContractingCompanyTradeNamesInput = {
    where: Prisma.ContractingCompanyWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutContractingCompanyTradeNamesInput, Prisma.ContractingCompanyUncheckedCreateWithoutContractingCompanyTradeNamesInput>;
};
export type ContractingCompanyUpsertWithoutContractingCompanyTradeNamesInput = {
    update: Prisma.XOR<Prisma.ContractingCompanyUpdateWithoutContractingCompanyTradeNamesInput, Prisma.ContractingCompanyUncheckedUpdateWithoutContractingCompanyTradeNamesInput>;
    create: Prisma.XOR<Prisma.ContractingCompanyCreateWithoutContractingCompanyTradeNamesInput, Prisma.ContractingCompanyUncheckedCreateWithoutContractingCompanyTradeNamesInput>;
    where?: Prisma.ContractingCompanyWhereInput;
};
export type ContractingCompanyUpdateToOneWithWhereWithoutContractingCompanyTradeNamesInput = {
    where?: Prisma.ContractingCompanyWhereInput;
    data: Prisma.XOR<Prisma.ContractingCompanyUpdateWithoutContractingCompanyTradeNamesInput, Prisma.ContractingCompanyUncheckedUpdateWithoutContractingCompanyTradeNamesInput>;
};
export type ContractingCompanyUpdateWithoutContractingCompanyTradeNamesInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutContractingCompaniesNestedInput;
};
export type ContractingCompanyUncheckedUpdateWithoutContractingCompanyTradeNamesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.IntFieldUpdateOperationsInput | number;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContractingCompanyCreateManyCompanyInput = {
    id?: number;
    title: string;
    contractingDate: Date | string;
    expiryDate?: Date | string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContractingCompanyUpdateWithoutCompanyInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameUpdateManyWithoutContractingCompanyNestedInput;
};
export type ContractingCompanyUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    contractingCompanyTradeNames?: Prisma.ContractingCompanyTradeNameUncheckedUpdateManyWithoutContractingCompanyNestedInput;
};
export type ContractingCompanyUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    contractingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ContractingCompanyCountOutputType
 */
export type ContractingCompanyCountOutputType = {
    contractingCompanyTradeNames: number;
};
export type ContractingCompanyCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    contractingCompanyTradeNames?: boolean | ContractingCompanyCountOutputTypeCountContractingCompanyTradeNamesArgs;
};
/**
 * ContractingCompanyCountOutputType without action
 */
export type ContractingCompanyCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompanyCountOutputType
     */
    select?: Prisma.ContractingCompanyCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ContractingCompanyCountOutputType without action
 */
export type ContractingCompanyCountOutputTypeCountContractingCompanyTradeNamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContractingCompanyTradeNameWhereInput;
};
export type ContractingCompanySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    companyId?: boolean;
    contractingDate?: boolean;
    expiryDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    contractingCompanyTradeNames?: boolean | Prisma.ContractingCompany$contractingCompanyTradeNamesArgs<ExtArgs>;
    _count?: boolean | Prisma.ContractingCompanyCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["contractingCompany"]>;
export type ContractingCompanySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    companyId?: boolean;
    contractingDate?: boolean;
    expiryDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["contractingCompany"]>;
export type ContractingCompanySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    companyId?: boolean;
    contractingDate?: boolean;
    expiryDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["contractingCompany"]>;
export type ContractingCompanySelectScalar = {
    id?: boolean;
    title?: boolean;
    companyId?: boolean;
    contractingDate?: boolean;
    expiryDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ContractingCompanyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "companyId" | "contractingDate" | "expiryDate" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["contractingCompany"]>;
export type ContractingCompanyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    contractingCompanyTradeNames?: boolean | Prisma.ContractingCompany$contractingCompanyTradeNamesArgs<ExtArgs>;
    _count?: boolean | Prisma.ContractingCompanyCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ContractingCompanyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type ContractingCompanyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type $ContractingCompanyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ContractingCompany";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs>;
        contractingCompanyTradeNames: Prisma.$ContractingCompanyTradeNamePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        title: string;
        companyId: number;
        contractingDate: Date;
        expiryDate: Date | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["contractingCompany"]>;
    composites: {};
};
export type ContractingCompanyGetPayload<S extends boolean | null | undefined | ContractingCompanyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload, S>;
export type ContractingCompanyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ContractingCompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ContractingCompanyCountAggregateInputType | true;
};
export interface ContractingCompanyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ContractingCompany'];
        meta: {
            name: 'ContractingCompany';
        };
    };
    /**
     * Find zero or one ContractingCompany that matches the filter.
     * @param {ContractingCompanyFindUniqueArgs} args - Arguments to find a ContractingCompany
     * @example
     * // Get one ContractingCompany
     * const contractingCompany = await prisma.contractingCompany.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractingCompanyFindUniqueArgs>(args: Prisma.SelectSubset<T, ContractingCompanyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ContractingCompany that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractingCompanyFindUniqueOrThrowArgs} args - Arguments to find a ContractingCompany
     * @example
     * // Get one ContractingCompany
     * const contractingCompany = await prisma.contractingCompany.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractingCompanyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ContractingCompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ContractingCompany that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractingCompanyFindFirstArgs} args - Arguments to find a ContractingCompany
     * @example
     * // Get one ContractingCompany
     * const contractingCompany = await prisma.contractingCompany.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractingCompanyFindFirstArgs>(args?: Prisma.SelectSubset<T, ContractingCompanyFindFirstArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ContractingCompany that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractingCompanyFindFirstOrThrowArgs} args - Arguments to find a ContractingCompany
     * @example
     * // Get one ContractingCompany
     * const contractingCompany = await prisma.contractingCompany.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractingCompanyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ContractingCompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ContractingCompanies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractingCompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractingCompanies
     * const contractingCompanies = await prisma.contractingCompany.findMany()
     *
     * // Get first 10 ContractingCompanies
     * const contractingCompanies = await prisma.contractingCompany.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const contractingCompanyWithIdOnly = await prisma.contractingCompany.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ContractingCompanyFindManyArgs>(args?: Prisma.SelectSubset<T, ContractingCompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ContractingCompany.
     * @param {ContractingCompanyCreateArgs} args - Arguments to create a ContractingCompany.
     * @example
     * // Create one ContractingCompany
     * const ContractingCompany = await prisma.contractingCompany.create({
     *   data: {
     *     // ... data to create a ContractingCompany
     *   }
     * })
     *
     */
    create<T extends ContractingCompanyCreateArgs>(args: Prisma.SelectSubset<T, ContractingCompanyCreateArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ContractingCompanies.
     * @param {ContractingCompanyCreateManyArgs} args - Arguments to create many ContractingCompanies.
     * @example
     * // Create many ContractingCompanies
     * const contractingCompany = await prisma.contractingCompany.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ContractingCompanyCreateManyArgs>(args?: Prisma.SelectSubset<T, ContractingCompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ContractingCompanies and returns the data saved in the database.
     * @param {ContractingCompanyCreateManyAndReturnArgs} args - Arguments to create many ContractingCompanies.
     * @example
     * // Create many ContractingCompanies
     * const contractingCompany = await prisma.contractingCompany.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ContractingCompanies and only return the `id`
     * const contractingCompanyWithIdOnly = await prisma.contractingCompany.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ContractingCompanyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ContractingCompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ContractingCompany.
     * @param {ContractingCompanyDeleteArgs} args - Arguments to delete one ContractingCompany.
     * @example
     * // Delete one ContractingCompany
     * const ContractingCompany = await prisma.contractingCompany.delete({
     *   where: {
     *     // ... filter to delete one ContractingCompany
     *   }
     * })
     *
     */
    delete<T extends ContractingCompanyDeleteArgs>(args: Prisma.SelectSubset<T, ContractingCompanyDeleteArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ContractingCompany.
     * @param {ContractingCompanyUpdateArgs} args - Arguments to update one ContractingCompany.
     * @example
     * // Update one ContractingCompany
     * const contractingCompany = await prisma.contractingCompany.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ContractingCompanyUpdateArgs>(args: Prisma.SelectSubset<T, ContractingCompanyUpdateArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ContractingCompanies.
     * @param {ContractingCompanyDeleteManyArgs} args - Arguments to filter ContractingCompanies to delete.
     * @example
     * // Delete a few ContractingCompanies
     * const { count } = await prisma.contractingCompany.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ContractingCompanyDeleteManyArgs>(args?: Prisma.SelectSubset<T, ContractingCompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ContractingCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractingCompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractingCompanies
     * const contractingCompany = await prisma.contractingCompany.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ContractingCompanyUpdateManyArgs>(args: Prisma.SelectSubset<T, ContractingCompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ContractingCompanies and returns the data updated in the database.
     * @param {ContractingCompanyUpdateManyAndReturnArgs} args - Arguments to update many ContractingCompanies.
     * @example
     * // Update many ContractingCompanies
     * const contractingCompany = await prisma.contractingCompany.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ContractingCompanies and only return the `id`
     * const contractingCompanyWithIdOnly = await prisma.contractingCompany.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContractingCompanyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ContractingCompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ContractingCompany.
     * @param {ContractingCompanyUpsertArgs} args - Arguments to update or create a ContractingCompany.
     * @example
     * // Update or create a ContractingCompany
     * const contractingCompany = await prisma.contractingCompany.upsert({
     *   create: {
     *     // ... data to create a ContractingCompany
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractingCompany we want to update
     *   }
     * })
     */
    upsert<T extends ContractingCompanyUpsertArgs>(args: Prisma.SelectSubset<T, ContractingCompanyUpsertArgs<ExtArgs>>): Prisma.Prisma__ContractingCompanyClient<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ContractingCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractingCompanyCountArgs} args - Arguments to filter ContractingCompanies to count.
     * @example
     * // Count the number of ContractingCompanies
     * const count = await prisma.contractingCompany.count({
     *   where: {
     *     // ... the filter for the ContractingCompanies we want to count
     *   }
     * })
    **/
    count<T extends ContractingCompanyCountArgs>(args?: Prisma.Subset<T, ContractingCompanyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ContractingCompanyCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ContractingCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractingCompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContractingCompanyAggregateArgs>(args: Prisma.Subset<T, ContractingCompanyAggregateArgs>): Prisma.PrismaPromise<GetContractingCompanyAggregateType<T>>;
    /**
     * Group by ContractingCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractingCompanyGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ContractingCompanyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ContractingCompanyGroupByArgs['orderBy'];
    } : {
        orderBy?: ContractingCompanyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ContractingCompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractingCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ContractingCompany model
     */
    readonly fields: ContractingCompanyFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ContractingCompany.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ContractingCompanyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    contractingCompanyTradeNames<T extends Prisma.ContractingCompany$contractingCompanyTradeNamesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ContractingCompany$contractingCompanyTradeNamesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContractingCompanyTradeNamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the ContractingCompany model
 */
export interface ContractingCompanyFieldRefs {
    readonly id: Prisma.FieldRef<"ContractingCompany", 'Int'>;
    readonly title: Prisma.FieldRef<"ContractingCompany", 'String'>;
    readonly companyId: Prisma.FieldRef<"ContractingCompany", 'Int'>;
    readonly contractingDate: Prisma.FieldRef<"ContractingCompany", 'DateTime'>;
    readonly expiryDate: Prisma.FieldRef<"ContractingCompany", 'DateTime'>;
    readonly isActive: Prisma.FieldRef<"ContractingCompany", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ContractingCompany", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ContractingCompany", 'DateTime'>;
}
/**
 * ContractingCompany findUnique
 */
export type ContractingCompanyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * Filter, which ContractingCompany to fetch.
     */
    where: Prisma.ContractingCompanyWhereUniqueInput;
};
/**
 * ContractingCompany findUniqueOrThrow
 */
export type ContractingCompanyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * Filter, which ContractingCompany to fetch.
     */
    where: Prisma.ContractingCompanyWhereUniqueInput;
};
/**
 * ContractingCompany findFirst
 */
export type ContractingCompanyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * Filter, which ContractingCompany to fetch.
     */
    where?: Prisma.ContractingCompanyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ContractingCompanies to fetch.
     */
    orderBy?: Prisma.ContractingCompanyOrderByWithRelationInput | Prisma.ContractingCompanyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ContractingCompanies.
     */
    cursor?: Prisma.ContractingCompanyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ContractingCompanies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ContractingCompanies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ContractingCompanies.
     */
    distinct?: Prisma.ContractingCompanyScalarFieldEnum | Prisma.ContractingCompanyScalarFieldEnum[];
};
/**
 * ContractingCompany findFirstOrThrow
 */
export type ContractingCompanyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * Filter, which ContractingCompany to fetch.
     */
    where?: Prisma.ContractingCompanyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ContractingCompanies to fetch.
     */
    orderBy?: Prisma.ContractingCompanyOrderByWithRelationInput | Prisma.ContractingCompanyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ContractingCompanies.
     */
    cursor?: Prisma.ContractingCompanyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ContractingCompanies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ContractingCompanies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ContractingCompanies.
     */
    distinct?: Prisma.ContractingCompanyScalarFieldEnum | Prisma.ContractingCompanyScalarFieldEnum[];
};
/**
 * ContractingCompany findMany
 */
export type ContractingCompanyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * Filter, which ContractingCompanies to fetch.
     */
    where?: Prisma.ContractingCompanyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ContractingCompanies to fetch.
     */
    orderBy?: Prisma.ContractingCompanyOrderByWithRelationInput | Prisma.ContractingCompanyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ContractingCompanies.
     */
    cursor?: Prisma.ContractingCompanyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ContractingCompanies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ContractingCompanies.
     */
    skip?: number;
    distinct?: Prisma.ContractingCompanyScalarFieldEnum | Prisma.ContractingCompanyScalarFieldEnum[];
};
/**
 * ContractingCompany create
 */
export type ContractingCompanyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * The data needed to create a ContractingCompany.
     */
    data: Prisma.XOR<Prisma.ContractingCompanyCreateInput, Prisma.ContractingCompanyUncheckedCreateInput>;
};
/**
 * ContractingCompany createMany
 */
export type ContractingCompanyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractingCompanies.
     */
    data: Prisma.ContractingCompanyCreateManyInput | Prisma.ContractingCompanyCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ContractingCompany createManyAndReturn
 */
export type ContractingCompanyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * The data used to create many ContractingCompanies.
     */
    data: Prisma.ContractingCompanyCreateManyInput | Prisma.ContractingCompanyCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ContractingCompany update
 */
export type ContractingCompanyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * The data needed to update a ContractingCompany.
     */
    data: Prisma.XOR<Prisma.ContractingCompanyUpdateInput, Prisma.ContractingCompanyUncheckedUpdateInput>;
    /**
     * Choose, which ContractingCompany to update.
     */
    where: Prisma.ContractingCompanyWhereUniqueInput;
};
/**
 * ContractingCompany updateMany
 */
export type ContractingCompanyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractingCompanies.
     */
    data: Prisma.XOR<Prisma.ContractingCompanyUpdateManyMutationInput, Prisma.ContractingCompanyUncheckedUpdateManyInput>;
    /**
     * Filter which ContractingCompanies to update
     */
    where?: Prisma.ContractingCompanyWhereInput;
    /**
     * Limit how many ContractingCompanies to update.
     */
    limit?: number;
};
/**
 * ContractingCompany updateManyAndReturn
 */
export type ContractingCompanyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * The data used to update ContractingCompanies.
     */
    data: Prisma.XOR<Prisma.ContractingCompanyUpdateManyMutationInput, Prisma.ContractingCompanyUncheckedUpdateManyInput>;
    /**
     * Filter which ContractingCompanies to update
     */
    where?: Prisma.ContractingCompanyWhereInput;
    /**
     * Limit how many ContractingCompanies to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ContractingCompany upsert
 */
export type ContractingCompanyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * The filter to search for the ContractingCompany to update in case it exists.
     */
    where: Prisma.ContractingCompanyWhereUniqueInput;
    /**
     * In case the ContractingCompany found by the `where` argument doesn't exist, create a new ContractingCompany with this data.
     */
    create: Prisma.XOR<Prisma.ContractingCompanyCreateInput, Prisma.ContractingCompanyUncheckedCreateInput>;
    /**
     * In case the ContractingCompany was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ContractingCompanyUpdateInput, Prisma.ContractingCompanyUncheckedUpdateInput>;
};
/**
 * ContractingCompany delete
 */
export type ContractingCompanyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
    /**
     * Filter which ContractingCompany to delete.
     */
    where: Prisma.ContractingCompanyWhereUniqueInput;
};
/**
 * ContractingCompany deleteMany
 */
export type ContractingCompanyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ContractingCompanies to delete
     */
    where?: Prisma.ContractingCompanyWhereInput;
    /**
     * Limit how many ContractingCompanies to delete.
     */
    limit?: number;
};
/**
 * ContractingCompany.contractingCompanyTradeNames
 */
export type ContractingCompany$contractingCompanyTradeNamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompanyTradeName
     */
    select?: Prisma.ContractingCompanyTradeNameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompanyTradeName
     */
    omit?: Prisma.ContractingCompanyTradeNameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyTradeNameInclude<ExtArgs> | null;
    where?: Prisma.ContractingCompanyTradeNameWhereInput;
    orderBy?: Prisma.ContractingCompanyTradeNameOrderByWithRelationInput | Prisma.ContractingCompanyTradeNameOrderByWithRelationInput[];
    cursor?: Prisma.ContractingCompanyTradeNameWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContractingCompanyTradeNameScalarFieldEnum | Prisma.ContractingCompanyTradeNameScalarFieldEnum[];
};
/**
 * ContractingCompany without action
 */
export type ContractingCompanyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractingCompany
     */
    select?: Prisma.ContractingCompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ContractingCompany
     */
    omit?: Prisma.ContractingCompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ContractingCompanyInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ContractingCompany.d.ts.map