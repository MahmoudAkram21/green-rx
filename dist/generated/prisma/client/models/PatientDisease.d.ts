import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model PatientDisease
 *
 */
export type PatientDiseaseModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientDiseasePayload>;
export type AggregatePatientDisease = {
    _count: PatientDiseaseCountAggregateOutputType | null;
    _avg: PatientDiseaseAvgAggregateOutputType | null;
    _sum: PatientDiseaseSumAggregateOutputType | null;
    _min: PatientDiseaseMinAggregateOutputType | null;
    _max: PatientDiseaseMaxAggregateOutputType | null;
};
export type PatientDiseaseAvgAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    diseaseId: number | null;
};
export type PatientDiseaseSumAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    diseaseId: number | null;
};
export type PatientDiseaseMinAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    diseaseId: number | null;
    diagnosisDate: Date | null;
    severity: $Enums.DiseaseSeverity | null;
    status: $Enums.DiseaseStatus | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientDiseaseMaxAggregateOutputType = {
    id: number | null;
    patientId: number | null;
    diseaseId: number | null;
    diagnosisDate: Date | null;
    severity: $Enums.DiseaseSeverity | null;
    status: $Enums.DiseaseStatus | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientDiseaseCountAggregateOutputType = {
    id: number;
    patientId: number;
    diseaseId: number;
    diagnosisDate: number;
    severity: number;
    status: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PatientDiseaseAvgAggregateInputType = {
    id?: true;
    patientId?: true;
    diseaseId?: true;
};
export type PatientDiseaseSumAggregateInputType = {
    id?: true;
    patientId?: true;
    diseaseId?: true;
};
export type PatientDiseaseMinAggregateInputType = {
    id?: true;
    patientId?: true;
    diseaseId?: true;
    diagnosisDate?: true;
    severity?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientDiseaseMaxAggregateInputType = {
    id?: true;
    patientId?: true;
    diseaseId?: true;
    diagnosisDate?: true;
    severity?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientDiseaseCountAggregateInputType = {
    id?: true;
    patientId?: true;
    diseaseId?: true;
    diagnosisDate?: true;
    severity?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PatientDiseaseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientDisease to aggregate.
     */
    where?: Prisma.PatientDiseaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientDiseases to fetch.
     */
    orderBy?: Prisma.PatientDiseaseOrderByWithRelationInput | Prisma.PatientDiseaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientDiseaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientDiseases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientDiseases.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PatientDiseases
    **/
    _count?: true | PatientDiseaseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PatientDiseaseAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PatientDiseaseSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientDiseaseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientDiseaseMaxAggregateInputType;
};
export type GetPatientDiseaseAggregateType<T extends PatientDiseaseAggregateArgs> = {
    [P in keyof T & keyof AggregatePatientDisease]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatientDisease[P]> : Prisma.GetScalarType<T[P], AggregatePatientDisease[P]>;
};
export type PatientDiseaseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientDiseaseWhereInput;
    orderBy?: Prisma.PatientDiseaseOrderByWithAggregationInput | Prisma.PatientDiseaseOrderByWithAggregationInput[];
    by: Prisma.PatientDiseaseScalarFieldEnum[] | Prisma.PatientDiseaseScalarFieldEnum;
    having?: Prisma.PatientDiseaseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientDiseaseCountAggregateInputType | true;
    _avg?: PatientDiseaseAvgAggregateInputType;
    _sum?: PatientDiseaseSumAggregateInputType;
    _min?: PatientDiseaseMinAggregateInputType;
    _max?: PatientDiseaseMaxAggregateInputType;
};
export type PatientDiseaseGroupByOutputType = {
    id: number;
    patientId: number;
    diseaseId: number;
    diagnosisDate: Date;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PatientDiseaseCountAggregateOutputType | null;
    _avg: PatientDiseaseAvgAggregateOutputType | null;
    _sum: PatientDiseaseSumAggregateOutputType | null;
    _min: PatientDiseaseMinAggregateOutputType | null;
    _max: PatientDiseaseMaxAggregateOutputType | null;
};
type GetPatientDiseaseGroupByPayload<T extends PatientDiseaseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientDiseaseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientDiseaseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientDiseaseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientDiseaseGroupByOutputType[P]>;
}>>;
export type PatientDiseaseWhereInput = {
    AND?: Prisma.PatientDiseaseWhereInput | Prisma.PatientDiseaseWhereInput[];
    OR?: Prisma.PatientDiseaseWhereInput[];
    NOT?: Prisma.PatientDiseaseWhereInput | Prisma.PatientDiseaseWhereInput[];
    id?: Prisma.IntFilter<"PatientDisease"> | number;
    patientId?: Prisma.IntFilter<"PatientDisease"> | number;
    diseaseId?: Prisma.IntFilter<"PatientDisease"> | number;
    diagnosisDate?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFilter<"PatientDisease"> | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFilter<"PatientDisease"> | $Enums.DiseaseStatus;
    notes?: Prisma.StringNullableFilter<"PatientDisease"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    disease?: Prisma.XOR<Prisma.DiseaseScalarRelationFilter, Prisma.DiseaseWhereInput>;
};
export type PatientDiseaseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    diagnosisDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
    disease?: Prisma.DiseaseOrderByWithRelationInput;
};
export type PatientDiseaseWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PatientDiseaseWhereInput | Prisma.PatientDiseaseWhereInput[];
    OR?: Prisma.PatientDiseaseWhereInput[];
    NOT?: Prisma.PatientDiseaseWhereInput | Prisma.PatientDiseaseWhereInput[];
    patientId?: Prisma.IntFilter<"PatientDisease"> | number;
    diseaseId?: Prisma.IntFilter<"PatientDisease"> | number;
    diagnosisDate?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFilter<"PatientDisease"> | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFilter<"PatientDisease"> | $Enums.DiseaseStatus;
    notes?: Prisma.StringNullableFilter<"PatientDisease"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    disease?: Prisma.XOR<Prisma.DiseaseScalarRelationFilter, Prisma.DiseaseWhereInput>;
}, "id">;
export type PatientDiseaseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    diagnosisDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PatientDiseaseCountOrderByAggregateInput;
    _avg?: Prisma.PatientDiseaseAvgOrderByAggregateInput;
    _max?: Prisma.PatientDiseaseMaxOrderByAggregateInput;
    _min?: Prisma.PatientDiseaseMinOrderByAggregateInput;
    _sum?: Prisma.PatientDiseaseSumOrderByAggregateInput;
};
export type PatientDiseaseScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientDiseaseScalarWhereWithAggregatesInput | Prisma.PatientDiseaseScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientDiseaseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientDiseaseScalarWhereWithAggregatesInput | Prisma.PatientDiseaseScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"PatientDisease"> | number;
    patientId?: Prisma.IntWithAggregatesFilter<"PatientDisease"> | number;
    diseaseId?: Prisma.IntWithAggregatesFilter<"PatientDisease"> | number;
    diagnosisDate?: Prisma.DateTimeWithAggregatesFilter<"PatientDisease"> | Date | string;
    severity?: Prisma.EnumDiseaseSeverityWithAggregatesFilter<"PatientDisease"> | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusWithAggregatesFilter<"PatientDisease"> | $Enums.DiseaseStatus;
    notes?: Prisma.StringNullableWithAggregatesFilter<"PatientDisease"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PatientDisease"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PatientDisease"> | Date | string;
};
export type PatientDiseaseCreateInput = {
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientDiseasesInput;
    disease: Prisma.DiseaseCreateNestedOneWithoutPatientDiseasesInput;
};
export type PatientDiseaseUncheckedCreateInput = {
    id?: number;
    patientId: number;
    diseaseId: number;
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientDiseaseUpdateInput = {
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientDiseasesNestedInput;
    disease?: Prisma.DiseaseUpdateOneRequiredWithoutPatientDiseasesNestedInput;
};
export type PatientDiseaseUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientDiseaseCreateManyInput = {
    id?: number;
    patientId: number;
    diseaseId: number;
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientDiseaseUpdateManyMutationInput = {
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientDiseaseUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientDiseaseListRelationFilter = {
    every?: Prisma.PatientDiseaseWhereInput;
    some?: Prisma.PatientDiseaseWhereInput;
    none?: Prisma.PatientDiseaseWhereInput;
};
export type PatientDiseaseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientDiseaseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    diagnosisDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientDiseaseAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
};
export type PatientDiseaseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    diagnosisDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientDiseaseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    diagnosisDate?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientDiseaseSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
};
export type PatientDiseaseCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutPatientInput, Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput> | Prisma.PatientDiseaseCreateWithoutPatientInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput | Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientDiseaseCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
};
export type PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutPatientInput, Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput> | Prisma.PatientDiseaseCreateWithoutPatientInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput | Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.PatientDiseaseCreateManyPatientInputEnvelope;
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
};
export type PatientDiseaseUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutPatientInput, Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput> | Prisma.PatientDiseaseCreateWithoutPatientInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput | Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientDiseaseCreateManyPatientInputEnvelope;
    set?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    disconnect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    delete?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    update?: Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientDiseaseUpdateManyWithWhereWithoutPatientInput | Prisma.PatientDiseaseUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientDiseaseScalarWhereInput | Prisma.PatientDiseaseScalarWhereInput[];
};
export type PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutPatientInput, Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput> | Prisma.PatientDiseaseCreateWithoutPatientInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput | Prisma.PatientDiseaseCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutPatientInput | Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.PatientDiseaseCreateManyPatientInputEnvelope;
    set?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    disconnect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    delete?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    update?: Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutPatientInput | Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.PatientDiseaseUpdateManyWithWhereWithoutPatientInput | Prisma.PatientDiseaseUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.PatientDiseaseScalarWhereInput | Prisma.PatientDiseaseScalarWhereInput[];
};
export type PatientDiseaseCreateNestedManyWithoutDiseaseInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput> | Prisma.PatientDiseaseCreateWithoutDiseaseInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput | Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput[];
    createMany?: Prisma.PatientDiseaseCreateManyDiseaseInputEnvelope;
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
};
export type PatientDiseaseUncheckedCreateNestedManyWithoutDiseaseInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput> | Prisma.PatientDiseaseCreateWithoutDiseaseInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput | Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput[];
    createMany?: Prisma.PatientDiseaseCreateManyDiseaseInputEnvelope;
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
};
export type PatientDiseaseUpdateManyWithoutDiseaseNestedInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput> | Prisma.PatientDiseaseCreateWithoutDiseaseInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput | Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput[];
    upsert?: Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutDiseaseInput | Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutDiseaseInput[];
    createMany?: Prisma.PatientDiseaseCreateManyDiseaseInputEnvelope;
    set?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    disconnect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    delete?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    update?: Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutDiseaseInput | Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutDiseaseInput[];
    updateMany?: Prisma.PatientDiseaseUpdateManyWithWhereWithoutDiseaseInput | Prisma.PatientDiseaseUpdateManyWithWhereWithoutDiseaseInput[];
    deleteMany?: Prisma.PatientDiseaseScalarWhereInput | Prisma.PatientDiseaseScalarWhereInput[];
};
export type PatientDiseaseUncheckedUpdateManyWithoutDiseaseNestedInput = {
    create?: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput> | Prisma.PatientDiseaseCreateWithoutDiseaseInput[] | Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput | Prisma.PatientDiseaseCreateOrConnectWithoutDiseaseInput[];
    upsert?: Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutDiseaseInput | Prisma.PatientDiseaseUpsertWithWhereUniqueWithoutDiseaseInput[];
    createMany?: Prisma.PatientDiseaseCreateManyDiseaseInputEnvelope;
    set?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    disconnect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    delete?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    connect?: Prisma.PatientDiseaseWhereUniqueInput | Prisma.PatientDiseaseWhereUniqueInput[];
    update?: Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutDiseaseInput | Prisma.PatientDiseaseUpdateWithWhereUniqueWithoutDiseaseInput[];
    updateMany?: Prisma.PatientDiseaseUpdateManyWithWhereWithoutDiseaseInput | Prisma.PatientDiseaseUpdateManyWithWhereWithoutDiseaseInput[];
    deleteMany?: Prisma.PatientDiseaseScalarWhereInput | Prisma.PatientDiseaseScalarWhereInput[];
};
export type PatientDiseaseCreateWithoutPatientInput = {
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    disease: Prisma.DiseaseCreateNestedOneWithoutPatientDiseasesInput;
};
export type PatientDiseaseUncheckedCreateWithoutPatientInput = {
    id?: number;
    diseaseId: number;
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientDiseaseCreateOrConnectWithoutPatientInput = {
    where: Prisma.PatientDiseaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutPatientInput, Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput>;
};
export type PatientDiseaseCreateManyPatientInputEnvelope = {
    data: Prisma.PatientDiseaseCreateManyPatientInput | Prisma.PatientDiseaseCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type PatientDiseaseUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientDiseaseWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientDiseaseUpdateWithoutPatientInput, Prisma.PatientDiseaseUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutPatientInput, Prisma.PatientDiseaseUncheckedCreateWithoutPatientInput>;
};
export type PatientDiseaseUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.PatientDiseaseWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientDiseaseUpdateWithoutPatientInput, Prisma.PatientDiseaseUncheckedUpdateWithoutPatientInput>;
};
export type PatientDiseaseUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.PatientDiseaseScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientDiseaseUpdateManyMutationInput, Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientInput>;
};
export type PatientDiseaseScalarWhereInput = {
    AND?: Prisma.PatientDiseaseScalarWhereInput | Prisma.PatientDiseaseScalarWhereInput[];
    OR?: Prisma.PatientDiseaseScalarWhereInput[];
    NOT?: Prisma.PatientDiseaseScalarWhereInput | Prisma.PatientDiseaseScalarWhereInput[];
    id?: Prisma.IntFilter<"PatientDisease"> | number;
    patientId?: Prisma.IntFilter<"PatientDisease"> | number;
    diseaseId?: Prisma.IntFilter<"PatientDisease"> | number;
    diagnosisDate?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFilter<"PatientDisease"> | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFilter<"PatientDisease"> | $Enums.DiseaseStatus;
    notes?: Prisma.StringNullableFilter<"PatientDisease"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PatientDisease"> | Date | string;
};
export type PatientDiseaseCreateWithoutDiseaseInput = {
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutPatientDiseasesInput;
};
export type PatientDiseaseUncheckedCreateWithoutDiseaseInput = {
    id?: number;
    patientId: number;
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientDiseaseCreateOrConnectWithoutDiseaseInput = {
    where: Prisma.PatientDiseaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput>;
};
export type PatientDiseaseCreateManyDiseaseInputEnvelope = {
    data: Prisma.PatientDiseaseCreateManyDiseaseInput | Prisma.PatientDiseaseCreateManyDiseaseInput[];
    skipDuplicates?: boolean;
};
export type PatientDiseaseUpsertWithWhereUniqueWithoutDiseaseInput = {
    where: Prisma.PatientDiseaseWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientDiseaseUpdateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedUpdateWithoutDiseaseInput>;
    create: Prisma.XOR<Prisma.PatientDiseaseCreateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedCreateWithoutDiseaseInput>;
};
export type PatientDiseaseUpdateWithWhereUniqueWithoutDiseaseInput = {
    where: Prisma.PatientDiseaseWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientDiseaseUpdateWithoutDiseaseInput, Prisma.PatientDiseaseUncheckedUpdateWithoutDiseaseInput>;
};
export type PatientDiseaseUpdateManyWithWhereWithoutDiseaseInput = {
    where: Prisma.PatientDiseaseScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientDiseaseUpdateManyMutationInput, Prisma.PatientDiseaseUncheckedUpdateManyWithoutDiseaseInput>;
};
export type PatientDiseaseCreateManyPatientInput = {
    id?: number;
    diseaseId: number;
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientDiseaseUpdateWithoutPatientInput = {
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disease?: Prisma.DiseaseUpdateOneRequiredWithoutPatientDiseasesNestedInput;
};
export type PatientDiseaseUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientDiseaseUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientDiseaseCreateManyDiseaseInput = {
    id?: number;
    patientId: number;
    diagnosisDate: Date | string;
    severity: $Enums.DiseaseSeverity;
    status: $Enums.DiseaseStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientDiseaseUpdateWithoutDiseaseInput = {
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutPatientDiseasesNestedInput;
};
export type PatientDiseaseUncheckedUpdateWithoutDiseaseInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientDiseaseUncheckedUpdateManyWithoutDiseaseInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    patientId?: Prisma.IntFieldUpdateOperationsInput | number;
    diagnosisDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    severity?: Prisma.EnumDiseaseSeverityFieldUpdateOperationsInput | $Enums.DiseaseSeverity;
    status?: Prisma.EnumDiseaseStatusFieldUpdateOperationsInput | $Enums.DiseaseStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientDiseaseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    diseaseId?: boolean;
    diagnosisDate?: boolean;
    severity?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientDisease"]>;
export type PatientDiseaseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    diseaseId?: boolean;
    diagnosisDate?: boolean;
    severity?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientDisease"]>;
export type PatientDiseaseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    diseaseId?: boolean;
    diagnosisDate?: boolean;
    severity?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patientDisease"]>;
export type PatientDiseaseSelectScalar = {
    id?: boolean;
    patientId?: boolean;
    diseaseId?: boolean;
    diagnosisDate?: boolean;
    severity?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PatientDiseaseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "patientId" | "diseaseId" | "diagnosisDate" | "severity" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["patientDisease"]>;
export type PatientDiseaseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
};
export type PatientDiseaseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
};
export type PatientDiseaseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
};
export type $PatientDiseasePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PatientDisease";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
        disease: Prisma.$DiseasePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        patientId: number;
        diseaseId: number;
        diagnosisDate: Date;
        severity: $Enums.DiseaseSeverity;
        status: $Enums.DiseaseStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["patientDisease"]>;
    composites: {};
};
export type PatientDiseaseGetPayload<S extends boolean | null | undefined | PatientDiseaseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload, S>;
export type PatientDiseaseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientDiseaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientDiseaseCountAggregateInputType | true;
};
export interface PatientDiseaseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PatientDisease'];
        meta: {
            name: 'PatientDisease';
        };
    };
    /**
     * Find zero or one PatientDisease that matches the filter.
     * @param {PatientDiseaseFindUniqueArgs} args - Arguments to find a PatientDisease
     * @example
     * // Get one PatientDisease
     * const patientDisease = await prisma.patientDisease.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientDiseaseFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientDiseaseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PatientDisease that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientDiseaseFindUniqueOrThrowArgs} args - Arguments to find a PatientDisease
     * @example
     * // Get one PatientDisease
     * const patientDisease = await prisma.patientDisease.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientDiseaseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientDiseaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientDisease that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientDiseaseFindFirstArgs} args - Arguments to find a PatientDisease
     * @example
     * // Get one PatientDisease
     * const patientDisease = await prisma.patientDisease.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientDiseaseFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientDiseaseFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PatientDisease that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientDiseaseFindFirstOrThrowArgs} args - Arguments to find a PatientDisease
     * @example
     * // Get one PatientDisease
     * const patientDisease = await prisma.patientDisease.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientDiseaseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientDiseaseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PatientDiseases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientDiseaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientDiseases
     * const patientDiseases = await prisma.patientDisease.findMany()
     *
     * // Get first 10 PatientDiseases
     * const patientDiseases = await prisma.patientDisease.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const patientDiseaseWithIdOnly = await prisma.patientDisease.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PatientDiseaseFindManyArgs>(args?: Prisma.SelectSubset<T, PatientDiseaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PatientDisease.
     * @param {PatientDiseaseCreateArgs} args - Arguments to create a PatientDisease.
     * @example
     * // Create one PatientDisease
     * const PatientDisease = await prisma.patientDisease.create({
     *   data: {
     *     // ... data to create a PatientDisease
     *   }
     * })
     *
     */
    create<T extends PatientDiseaseCreateArgs>(args: Prisma.SelectSubset<T, PatientDiseaseCreateArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PatientDiseases.
     * @param {PatientDiseaseCreateManyArgs} args - Arguments to create many PatientDiseases.
     * @example
     * // Create many PatientDiseases
     * const patientDisease = await prisma.patientDisease.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientDiseaseCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientDiseaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PatientDiseases and returns the data saved in the database.
     * @param {PatientDiseaseCreateManyAndReturnArgs} args - Arguments to create many PatientDiseases.
     * @example
     * // Create many PatientDiseases
     * const patientDisease = await prisma.patientDisease.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PatientDiseases and only return the `id`
     * const patientDiseaseWithIdOnly = await prisma.patientDisease.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientDiseaseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientDiseaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PatientDisease.
     * @param {PatientDiseaseDeleteArgs} args - Arguments to delete one PatientDisease.
     * @example
     * // Delete one PatientDisease
     * const PatientDisease = await prisma.patientDisease.delete({
     *   where: {
     *     // ... filter to delete one PatientDisease
     *   }
     * })
     *
     */
    delete<T extends PatientDiseaseDeleteArgs>(args: Prisma.SelectSubset<T, PatientDiseaseDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PatientDisease.
     * @param {PatientDiseaseUpdateArgs} args - Arguments to update one PatientDisease.
     * @example
     * // Update one PatientDisease
     * const patientDisease = await prisma.patientDisease.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientDiseaseUpdateArgs>(args: Prisma.SelectSubset<T, PatientDiseaseUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PatientDiseases.
     * @param {PatientDiseaseDeleteManyArgs} args - Arguments to filter PatientDiseases to delete.
     * @example
     * // Delete a few PatientDiseases
     * const { count } = await prisma.patientDisease.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientDiseaseDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientDiseaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientDiseases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientDiseaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientDiseases
     * const patientDisease = await prisma.patientDisease.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientDiseaseUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientDiseaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PatientDiseases and returns the data updated in the database.
     * @param {PatientDiseaseUpdateManyAndReturnArgs} args - Arguments to update many PatientDiseases.
     * @example
     * // Update many PatientDiseases
     * const patientDisease = await prisma.patientDisease.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PatientDiseases and only return the `id`
     * const patientDiseaseWithIdOnly = await prisma.patientDisease.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientDiseaseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientDiseaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PatientDisease.
     * @param {PatientDiseaseUpsertArgs} args - Arguments to update or create a PatientDisease.
     * @example
     * // Update or create a PatientDisease
     * const patientDisease = await prisma.patientDisease.upsert({
     *   create: {
     *     // ... data to create a PatientDisease
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientDisease we want to update
     *   }
     * })
     */
    upsert<T extends PatientDiseaseUpsertArgs>(args: Prisma.SelectSubset<T, PatientDiseaseUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientDiseaseClient<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PatientDiseases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientDiseaseCountArgs} args - Arguments to filter PatientDiseases to count.
     * @example
     * // Count the number of PatientDiseases
     * const count = await prisma.patientDisease.count({
     *   where: {
     *     // ... the filter for the PatientDiseases we want to count
     *   }
     * })
    **/
    count<T extends PatientDiseaseCountArgs>(args?: Prisma.Subset<T, PatientDiseaseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientDiseaseCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PatientDisease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientDiseaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientDiseaseAggregateArgs>(args: Prisma.Subset<T, PatientDiseaseAggregateArgs>): Prisma.PrismaPromise<GetPatientDiseaseAggregateType<T>>;
    /**
     * Group by PatientDisease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientDiseaseGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PatientDiseaseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientDiseaseGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientDiseaseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientDiseaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientDiseaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PatientDisease model
     */
    readonly fields: PatientDiseaseFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PatientDisease.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientDiseaseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    disease<T extends Prisma.DiseaseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiseaseDefaultArgs<ExtArgs>>): Prisma.Prisma__DiseaseClient<runtime.Types.Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PatientDisease model
 */
export interface PatientDiseaseFieldRefs {
    readonly id: Prisma.FieldRef<"PatientDisease", 'Int'>;
    readonly patientId: Prisma.FieldRef<"PatientDisease", 'Int'>;
    readonly diseaseId: Prisma.FieldRef<"PatientDisease", 'Int'>;
    readonly diagnosisDate: Prisma.FieldRef<"PatientDisease", 'DateTime'>;
    readonly severity: Prisma.FieldRef<"PatientDisease", 'DiseaseSeverity'>;
    readonly status: Prisma.FieldRef<"PatientDisease", 'DiseaseStatus'>;
    readonly notes: Prisma.FieldRef<"PatientDisease", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PatientDisease", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PatientDisease", 'DateTime'>;
}
/**
 * PatientDisease findUnique
 */
export type PatientDiseaseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * Filter, which PatientDisease to fetch.
     */
    where: Prisma.PatientDiseaseWhereUniqueInput;
};
/**
 * PatientDisease findUniqueOrThrow
 */
export type PatientDiseaseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * Filter, which PatientDisease to fetch.
     */
    where: Prisma.PatientDiseaseWhereUniqueInput;
};
/**
 * PatientDisease findFirst
 */
export type PatientDiseaseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * Filter, which PatientDisease to fetch.
     */
    where?: Prisma.PatientDiseaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientDiseases to fetch.
     */
    orderBy?: Prisma.PatientDiseaseOrderByWithRelationInput | Prisma.PatientDiseaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientDiseases.
     */
    cursor?: Prisma.PatientDiseaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientDiseases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientDiseases.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientDiseases.
     */
    distinct?: Prisma.PatientDiseaseScalarFieldEnum | Prisma.PatientDiseaseScalarFieldEnum[];
};
/**
 * PatientDisease findFirstOrThrow
 */
export type PatientDiseaseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * Filter, which PatientDisease to fetch.
     */
    where?: Prisma.PatientDiseaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientDiseases to fetch.
     */
    orderBy?: Prisma.PatientDiseaseOrderByWithRelationInput | Prisma.PatientDiseaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PatientDiseases.
     */
    cursor?: Prisma.PatientDiseaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientDiseases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientDiseases.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PatientDiseases.
     */
    distinct?: Prisma.PatientDiseaseScalarFieldEnum | Prisma.PatientDiseaseScalarFieldEnum[];
};
/**
 * PatientDisease findMany
 */
export type PatientDiseaseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * Filter, which PatientDiseases to fetch.
     */
    where?: Prisma.PatientDiseaseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PatientDiseases to fetch.
     */
    orderBy?: Prisma.PatientDiseaseOrderByWithRelationInput | Prisma.PatientDiseaseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PatientDiseases.
     */
    cursor?: Prisma.PatientDiseaseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PatientDiseases from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PatientDiseases.
     */
    skip?: number;
    distinct?: Prisma.PatientDiseaseScalarFieldEnum | Prisma.PatientDiseaseScalarFieldEnum[];
};
/**
 * PatientDisease create
 */
export type PatientDiseaseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * The data needed to create a PatientDisease.
     */
    data: Prisma.XOR<Prisma.PatientDiseaseCreateInput, Prisma.PatientDiseaseUncheckedCreateInput>;
};
/**
 * PatientDisease createMany
 */
export type PatientDiseaseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientDiseases.
     */
    data: Prisma.PatientDiseaseCreateManyInput | Prisma.PatientDiseaseCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PatientDisease createManyAndReturn
 */
export type PatientDiseaseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * The data used to create many PatientDiseases.
     */
    data: Prisma.PatientDiseaseCreateManyInput | Prisma.PatientDiseaseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientDisease update
 */
export type PatientDiseaseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * The data needed to update a PatientDisease.
     */
    data: Prisma.XOR<Prisma.PatientDiseaseUpdateInput, Prisma.PatientDiseaseUncheckedUpdateInput>;
    /**
     * Choose, which PatientDisease to update.
     */
    where: Prisma.PatientDiseaseWhereUniqueInput;
};
/**
 * PatientDisease updateMany
 */
export type PatientDiseaseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientDiseases.
     */
    data: Prisma.XOR<Prisma.PatientDiseaseUpdateManyMutationInput, Prisma.PatientDiseaseUncheckedUpdateManyInput>;
    /**
     * Filter which PatientDiseases to update
     */
    where?: Prisma.PatientDiseaseWhereInput;
    /**
     * Limit how many PatientDiseases to update.
     */
    limit?: number;
};
/**
 * PatientDisease updateManyAndReturn
 */
export type PatientDiseaseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * The data used to update PatientDiseases.
     */
    data: Prisma.XOR<Prisma.PatientDiseaseUpdateManyMutationInput, Prisma.PatientDiseaseUncheckedUpdateManyInput>;
    /**
     * Filter which PatientDiseases to update
     */
    where?: Prisma.PatientDiseaseWhereInput;
    /**
     * Limit how many PatientDiseases to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PatientDisease upsert
 */
export type PatientDiseaseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * The filter to search for the PatientDisease to update in case it exists.
     */
    where: Prisma.PatientDiseaseWhereUniqueInput;
    /**
     * In case the PatientDisease found by the `where` argument doesn't exist, create a new PatientDisease with this data.
     */
    create: Prisma.XOR<Prisma.PatientDiseaseCreateInput, Prisma.PatientDiseaseUncheckedCreateInput>;
    /**
     * In case the PatientDisease was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientDiseaseUpdateInput, Prisma.PatientDiseaseUncheckedUpdateInput>;
};
/**
 * PatientDisease delete
 */
export type PatientDiseaseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
    /**
     * Filter which PatientDisease to delete.
     */
    where: Prisma.PatientDiseaseWhereUniqueInput;
};
/**
 * PatientDisease deleteMany
 */
export type PatientDiseaseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PatientDiseases to delete
     */
    where?: Prisma.PatientDiseaseWhereInput;
    /**
     * Limit how many PatientDiseases to delete.
     */
    limit?: number;
};
/**
 * PatientDisease without action
 */
export type PatientDiseaseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDisease
     */
    select?: Prisma.PatientDiseaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDisease
     */
    omit?: Prisma.PatientDiseaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDiseaseInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PatientDisease.d.ts.map