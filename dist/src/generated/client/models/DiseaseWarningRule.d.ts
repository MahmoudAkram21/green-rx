import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DiseaseWarningRule
 *
 */
export type DiseaseWarningRuleModel = runtime.Types.Result.DefaultSelection<Prisma.$DiseaseWarningRulePayload>;
export type AggregateDiseaseWarningRule = {
    _count: DiseaseWarningRuleCountAggregateOutputType | null;
    _avg: DiseaseWarningRuleAvgAggregateOutputType | null;
    _sum: DiseaseWarningRuleSumAggregateOutputType | null;
    _min: DiseaseWarningRuleMinAggregateOutputType | null;
    _max: DiseaseWarningRuleMaxAggregateOutputType | null;
};
export type DiseaseWarningRuleAvgAggregateOutputType = {
    id: number | null;
    diseaseId: number | null;
    targetActiveSubstanceId: number | null;
    createdBy: number | null;
};
export type DiseaseWarningRuleSumAggregateOutputType = {
    id: number | null;
    diseaseId: number | null;
    targetActiveSubstanceId: number | null;
    createdBy: number | null;
};
export type DiseaseWarningRuleMinAggregateOutputType = {
    id: number | null;
    diseaseId: number | null;
    ruleType: $Enums.WarningRuleType | null;
    targetActiveSubstanceId: number | null;
    targetDrugClass: string | null;
    severity: $Enums.WarningSeverity | null;
    warningMessage: string | null;
    autoBlock: boolean | null;
    requiresOverride: boolean | null;
    requiredMonitoring: string | null;
    createdBy: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiseaseWarningRuleMaxAggregateOutputType = {
    id: number | null;
    diseaseId: number | null;
    ruleType: $Enums.WarningRuleType | null;
    targetActiveSubstanceId: number | null;
    targetDrugClass: string | null;
    severity: $Enums.WarningSeverity | null;
    warningMessage: string | null;
    autoBlock: boolean | null;
    requiresOverride: boolean | null;
    requiredMonitoring: string | null;
    createdBy: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiseaseWarningRuleCountAggregateOutputType = {
    id: number;
    diseaseId: number;
    ruleType: number;
    targetActiveSubstanceId: number;
    targetDrugClass: number;
    severity: number;
    warningMessage: number;
    autoBlock: number;
    requiresOverride: number;
    requiredMonitoring: number;
    createdBy: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DiseaseWarningRuleAvgAggregateInputType = {
    id?: true;
    diseaseId?: true;
    targetActiveSubstanceId?: true;
    createdBy?: true;
};
export type DiseaseWarningRuleSumAggregateInputType = {
    id?: true;
    diseaseId?: true;
    targetActiveSubstanceId?: true;
    createdBy?: true;
};
export type DiseaseWarningRuleMinAggregateInputType = {
    id?: true;
    diseaseId?: true;
    ruleType?: true;
    targetActiveSubstanceId?: true;
    targetDrugClass?: true;
    severity?: true;
    warningMessage?: true;
    autoBlock?: true;
    requiresOverride?: true;
    requiredMonitoring?: true;
    createdBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiseaseWarningRuleMaxAggregateInputType = {
    id?: true;
    diseaseId?: true;
    ruleType?: true;
    targetActiveSubstanceId?: true;
    targetDrugClass?: true;
    severity?: true;
    warningMessage?: true;
    autoBlock?: true;
    requiresOverride?: true;
    requiredMonitoring?: true;
    createdBy?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiseaseWarningRuleCountAggregateInputType = {
    id?: true;
    diseaseId?: true;
    ruleType?: true;
    targetActiveSubstanceId?: true;
    targetDrugClass?: true;
    severity?: true;
    warningMessage?: true;
    autoBlock?: true;
    requiresOverride?: true;
    requiredMonitoring?: true;
    createdBy?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DiseaseWarningRuleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiseaseWarningRule to aggregate.
     */
    where?: Prisma.DiseaseWarningRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiseaseWarningRules to fetch.
     */
    orderBy?: Prisma.DiseaseWarningRuleOrderByWithRelationInput | Prisma.DiseaseWarningRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DiseaseWarningRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiseaseWarningRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiseaseWarningRules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DiseaseWarningRules
    **/
    _count?: true | DiseaseWarningRuleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DiseaseWarningRuleAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DiseaseWarningRuleSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DiseaseWarningRuleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DiseaseWarningRuleMaxAggregateInputType;
};
export type GetDiseaseWarningRuleAggregateType<T extends DiseaseWarningRuleAggregateArgs> = {
    [P in keyof T & keyof AggregateDiseaseWarningRule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiseaseWarningRule[P]> : Prisma.GetScalarType<T[P], AggregateDiseaseWarningRule[P]>;
};
export type DiseaseWarningRuleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiseaseWarningRuleWhereInput;
    orderBy?: Prisma.DiseaseWarningRuleOrderByWithAggregationInput | Prisma.DiseaseWarningRuleOrderByWithAggregationInput[];
    by: Prisma.DiseaseWarningRuleScalarFieldEnum[] | Prisma.DiseaseWarningRuleScalarFieldEnum;
    having?: Prisma.DiseaseWarningRuleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiseaseWarningRuleCountAggregateInputType | true;
    _avg?: DiseaseWarningRuleAvgAggregateInputType;
    _sum?: DiseaseWarningRuleSumAggregateInputType;
    _min?: DiseaseWarningRuleMinAggregateInputType;
    _max?: DiseaseWarningRuleMaxAggregateInputType;
};
export type DiseaseWarningRuleGroupByOutputType = {
    id: number;
    diseaseId: number;
    ruleType: $Enums.WarningRuleType;
    targetActiveSubstanceId: number | null;
    targetDrugClass: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock: boolean;
    requiresOverride: boolean;
    requiredMonitoring: string | null;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
    _count: DiseaseWarningRuleCountAggregateOutputType | null;
    _avg: DiseaseWarningRuleAvgAggregateOutputType | null;
    _sum: DiseaseWarningRuleSumAggregateOutputType | null;
    _min: DiseaseWarningRuleMinAggregateOutputType | null;
    _max: DiseaseWarningRuleMaxAggregateOutputType | null;
};
type GetDiseaseWarningRuleGroupByPayload<T extends DiseaseWarningRuleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiseaseWarningRuleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiseaseWarningRuleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiseaseWarningRuleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiseaseWarningRuleGroupByOutputType[P]>;
}>>;
export type DiseaseWarningRuleWhereInput = {
    AND?: Prisma.DiseaseWarningRuleWhereInput | Prisma.DiseaseWarningRuleWhereInput[];
    OR?: Prisma.DiseaseWarningRuleWhereInput[];
    NOT?: Prisma.DiseaseWarningRuleWhereInput | Prisma.DiseaseWarningRuleWhereInput[];
    id?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    diseaseId?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    ruleType?: Prisma.EnumWarningRuleTypeFilter<"DiseaseWarningRule"> | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.IntNullableFilter<"DiseaseWarningRule"> | number | null;
    targetDrugClass?: Prisma.StringNullableFilter<"DiseaseWarningRule"> | string | null;
    severity?: Prisma.EnumWarningSeverityFilter<"DiseaseWarningRule"> | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFilter<"DiseaseWarningRule"> | string;
    autoBlock?: Prisma.BoolFilter<"DiseaseWarningRule"> | boolean;
    requiresOverride?: Prisma.BoolFilter<"DiseaseWarningRule"> | boolean;
    requiredMonitoring?: Prisma.StringNullableFilter<"DiseaseWarningRule"> | string | null;
    createdBy?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    createdAt?: Prisma.DateTimeFilter<"DiseaseWarningRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiseaseWarningRule"> | Date | string;
    disease?: Prisma.XOR<Prisma.DiseaseScalarRelationFilter, Prisma.DiseaseWhereInput>;
    activeSubstance?: Prisma.XOR<Prisma.ActiveSubstanceNullableScalarRelationFilter, Prisma.ActiveSubstanceWhereInput> | null;
    creator?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DiseaseWarningRuleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    ruleType?: Prisma.SortOrder;
    targetActiveSubstanceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetDrugClass?: Prisma.SortOrderInput | Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    warningMessage?: Prisma.SortOrder;
    autoBlock?: Prisma.SortOrder;
    requiresOverride?: Prisma.SortOrder;
    requiredMonitoring?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    disease?: Prisma.DiseaseOrderByWithRelationInput;
    activeSubstance?: Prisma.ActiveSubstanceOrderByWithRelationInput;
    creator?: Prisma.UserOrderByWithRelationInput;
};
export type DiseaseWarningRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.DiseaseWarningRuleWhereInput | Prisma.DiseaseWarningRuleWhereInput[];
    OR?: Prisma.DiseaseWarningRuleWhereInput[];
    NOT?: Prisma.DiseaseWarningRuleWhereInput | Prisma.DiseaseWarningRuleWhereInput[];
    diseaseId?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    ruleType?: Prisma.EnumWarningRuleTypeFilter<"DiseaseWarningRule"> | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.IntNullableFilter<"DiseaseWarningRule"> | number | null;
    targetDrugClass?: Prisma.StringNullableFilter<"DiseaseWarningRule"> | string | null;
    severity?: Prisma.EnumWarningSeverityFilter<"DiseaseWarningRule"> | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFilter<"DiseaseWarningRule"> | string;
    autoBlock?: Prisma.BoolFilter<"DiseaseWarningRule"> | boolean;
    requiresOverride?: Prisma.BoolFilter<"DiseaseWarningRule"> | boolean;
    requiredMonitoring?: Prisma.StringNullableFilter<"DiseaseWarningRule"> | string | null;
    createdBy?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    createdAt?: Prisma.DateTimeFilter<"DiseaseWarningRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiseaseWarningRule"> | Date | string;
    disease?: Prisma.XOR<Prisma.DiseaseScalarRelationFilter, Prisma.DiseaseWhereInput>;
    activeSubstance?: Prisma.XOR<Prisma.ActiveSubstanceNullableScalarRelationFilter, Prisma.ActiveSubstanceWhereInput> | null;
    creator?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type DiseaseWarningRuleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    ruleType?: Prisma.SortOrder;
    targetActiveSubstanceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetDrugClass?: Prisma.SortOrderInput | Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    warningMessage?: Prisma.SortOrder;
    autoBlock?: Prisma.SortOrder;
    requiresOverride?: Prisma.SortOrder;
    requiredMonitoring?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DiseaseWarningRuleCountOrderByAggregateInput;
    _avg?: Prisma.DiseaseWarningRuleAvgOrderByAggregateInput;
    _max?: Prisma.DiseaseWarningRuleMaxOrderByAggregateInput;
    _min?: Prisma.DiseaseWarningRuleMinOrderByAggregateInput;
    _sum?: Prisma.DiseaseWarningRuleSumOrderByAggregateInput;
};
export type DiseaseWarningRuleScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiseaseWarningRuleScalarWhereWithAggregatesInput | Prisma.DiseaseWarningRuleScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiseaseWarningRuleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiseaseWarningRuleScalarWhereWithAggregatesInput | Prisma.DiseaseWarningRuleScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"DiseaseWarningRule"> | number;
    diseaseId?: Prisma.IntWithAggregatesFilter<"DiseaseWarningRule"> | number;
    ruleType?: Prisma.EnumWarningRuleTypeWithAggregatesFilter<"DiseaseWarningRule"> | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.IntNullableWithAggregatesFilter<"DiseaseWarningRule"> | number | null;
    targetDrugClass?: Prisma.StringNullableWithAggregatesFilter<"DiseaseWarningRule"> | string | null;
    severity?: Prisma.EnumWarningSeverityWithAggregatesFilter<"DiseaseWarningRule"> | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringWithAggregatesFilter<"DiseaseWarningRule"> | string;
    autoBlock?: Prisma.BoolWithAggregatesFilter<"DiseaseWarningRule"> | boolean;
    requiresOverride?: Prisma.BoolWithAggregatesFilter<"DiseaseWarningRule"> | boolean;
    requiredMonitoring?: Prisma.StringNullableWithAggregatesFilter<"DiseaseWarningRule"> | string | null;
    createdBy?: Prisma.IntWithAggregatesFilter<"DiseaseWarningRule"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DiseaseWarningRule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DiseaseWarningRule"> | Date | string;
};
export type DiseaseWarningRuleCreateInput = {
    ruleType: $Enums.WarningRuleType;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    disease: Prisma.DiseaseCreateNestedOneWithoutDiseaseWarningRulesInput;
    activeSubstance?: Prisma.ActiveSubstanceCreateNestedOneWithoutDiseaseWarningRulesInput;
    creator: Prisma.UserCreateNestedOneWithoutDiseaseWarningRulesInput;
};
export type DiseaseWarningRuleUncheckedCreateInput = {
    id?: number;
    diseaseId: number;
    ruleType: $Enums.WarningRuleType;
    targetActiveSubstanceId?: number | null;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdBy: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleUpdateInput = {
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disease?: Prisma.DiseaseUpdateOneRequiredWithoutDiseaseWarningRulesNestedInput;
    activeSubstance?: Prisma.ActiveSubstanceUpdateOneWithoutDiseaseWarningRulesNestedInput;
    creator?: Prisma.UserUpdateOneRequiredWithoutDiseaseWarningRulesNestedInput;
};
export type DiseaseWarningRuleUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleCreateManyInput = {
    id?: number;
    diseaseId: number;
    ruleType: $Enums.WarningRuleType;
    targetActiveSubstanceId?: number | null;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdBy: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleUpdateManyMutationInput = {
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleListRelationFilter = {
    every?: Prisma.DiseaseWarningRuleWhereInput;
    some?: Prisma.DiseaseWarningRuleWhereInput;
    none?: Prisma.DiseaseWarningRuleWhereInput;
};
export type DiseaseWarningRuleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DiseaseWarningRuleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    ruleType?: Prisma.SortOrder;
    targetActiveSubstanceId?: Prisma.SortOrder;
    targetDrugClass?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    warningMessage?: Prisma.SortOrder;
    autoBlock?: Prisma.SortOrder;
    requiresOverride?: Prisma.SortOrder;
    requiredMonitoring?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiseaseWarningRuleAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    targetActiveSubstanceId?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
};
export type DiseaseWarningRuleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    ruleType?: Prisma.SortOrder;
    targetActiveSubstanceId?: Prisma.SortOrder;
    targetDrugClass?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    warningMessage?: Prisma.SortOrder;
    autoBlock?: Prisma.SortOrder;
    requiresOverride?: Prisma.SortOrder;
    requiredMonitoring?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiseaseWarningRuleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    ruleType?: Prisma.SortOrder;
    targetActiveSubstanceId?: Prisma.SortOrder;
    targetDrugClass?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    warningMessage?: Prisma.SortOrder;
    autoBlock?: Prisma.SortOrder;
    requiresOverride?: Prisma.SortOrder;
    requiredMonitoring?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiseaseWarningRuleSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    diseaseId?: Prisma.SortOrder;
    targetActiveSubstanceId?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
};
export type DiseaseWarningRuleCreateNestedManyWithoutCreatorInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput> | Prisma.DiseaseWarningRuleCreateWithoutCreatorInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyCreatorInputEnvelope;
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
};
export type DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput> | Prisma.DiseaseWarningRuleCreateWithoutCreatorInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyCreatorInputEnvelope;
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
};
export type DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput> | Prisma.DiseaseWarningRuleCreateWithoutCreatorInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput[];
    upsert?: Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutCreatorInput | Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutCreatorInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyCreatorInputEnvelope;
    set?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    disconnect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    delete?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    update?: Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutCreatorInput | Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutCreatorInput[];
    updateMany?: Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutCreatorInput | Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutCreatorInput[];
    deleteMany?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
};
export type DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput> | Prisma.DiseaseWarningRuleCreateWithoutCreatorInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutCreatorInput[];
    upsert?: Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutCreatorInput | Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutCreatorInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyCreatorInputEnvelope;
    set?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    disconnect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    delete?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    update?: Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutCreatorInput | Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutCreatorInput[];
    updateMany?: Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutCreatorInput | Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutCreatorInput[];
    deleteMany?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
};
export type DiseaseWarningRuleCreateNestedManyWithoutDiseaseInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput> | Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyDiseaseInputEnvelope;
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
};
export type DiseaseWarningRuleUncheckedCreateNestedManyWithoutDiseaseInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput> | Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyDiseaseInputEnvelope;
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
};
export type DiseaseWarningRuleUpdateManyWithoutDiseaseNestedInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput> | Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput[];
    upsert?: Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutDiseaseInput | Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutDiseaseInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyDiseaseInputEnvelope;
    set?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    disconnect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    delete?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    update?: Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutDiseaseInput | Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutDiseaseInput[];
    updateMany?: Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutDiseaseInput | Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutDiseaseInput[];
    deleteMany?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
};
export type DiseaseWarningRuleUncheckedUpdateManyWithoutDiseaseNestedInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput> | Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput[];
    upsert?: Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutDiseaseInput | Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutDiseaseInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyDiseaseInputEnvelope;
    set?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    disconnect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    delete?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    update?: Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutDiseaseInput | Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutDiseaseInput[];
    updateMany?: Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutDiseaseInput | Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutDiseaseInput[];
    deleteMany?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
};
export type EnumWarningRuleTypeFieldUpdateOperationsInput = {
    set?: $Enums.WarningRuleType;
};
export type EnumWarningSeverityFieldUpdateOperationsInput = {
    set?: $Enums.WarningSeverity;
};
export type DiseaseWarningRuleCreateNestedManyWithoutActiveSubstanceInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput> | Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyActiveSubstanceInputEnvelope;
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
};
export type DiseaseWarningRuleUncheckedCreateNestedManyWithoutActiveSubstanceInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput> | Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyActiveSubstanceInputEnvelope;
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
};
export type DiseaseWarningRuleUpdateManyWithoutActiveSubstanceNestedInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput> | Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput[];
    upsert?: Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutActiveSubstanceInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyActiveSubstanceInputEnvelope;
    set?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    disconnect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    delete?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    update?: Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutActiveSubstanceInput[];
    updateMany?: Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutActiveSubstanceInput[];
    deleteMany?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
};
export type DiseaseWarningRuleUncheckedUpdateManyWithoutActiveSubstanceNestedInput = {
    create?: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput> | Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput[] | Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput[];
    connectOrCreate?: Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput[];
    upsert?: Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleUpsertWithWhereUniqueWithoutActiveSubstanceInput[];
    createMany?: Prisma.DiseaseWarningRuleCreateManyActiveSubstanceInputEnvelope;
    set?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    disconnect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    delete?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    connect?: Prisma.DiseaseWarningRuleWhereUniqueInput | Prisma.DiseaseWarningRuleWhereUniqueInput[];
    update?: Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleUpdateWithWhereUniqueWithoutActiveSubstanceInput[];
    updateMany?: Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutActiveSubstanceInput | Prisma.DiseaseWarningRuleUpdateManyWithWhereWithoutActiveSubstanceInput[];
    deleteMany?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
};
export type DiseaseWarningRuleCreateWithoutCreatorInput = {
    ruleType: $Enums.WarningRuleType;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    disease: Prisma.DiseaseCreateNestedOneWithoutDiseaseWarningRulesInput;
    activeSubstance?: Prisma.ActiveSubstanceCreateNestedOneWithoutDiseaseWarningRulesInput;
};
export type DiseaseWarningRuleUncheckedCreateWithoutCreatorInput = {
    id?: number;
    diseaseId: number;
    ruleType: $Enums.WarningRuleType;
    targetActiveSubstanceId?: number | null;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleCreateOrConnectWithoutCreatorInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput>;
};
export type DiseaseWarningRuleCreateManyCreatorInputEnvelope = {
    data: Prisma.DiseaseWarningRuleCreateManyCreatorInput | Prisma.DiseaseWarningRuleCreateManyCreatorInput[];
    skipDuplicates?: boolean;
};
export type DiseaseWarningRuleUpsertWithWhereUniqueWithoutCreatorInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedUpdateWithoutCreatorInput>;
    create: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutCreatorInput>;
};
export type DiseaseWarningRuleUpdateWithWhereUniqueWithoutCreatorInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateWithoutCreatorInput, Prisma.DiseaseWarningRuleUncheckedUpdateWithoutCreatorInput>;
};
export type DiseaseWarningRuleUpdateManyWithWhereWithoutCreatorInput = {
    where: Prisma.DiseaseWarningRuleScalarWhereInput;
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateManyMutationInput, Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorInput>;
};
export type DiseaseWarningRuleScalarWhereInput = {
    AND?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
    OR?: Prisma.DiseaseWarningRuleScalarWhereInput[];
    NOT?: Prisma.DiseaseWarningRuleScalarWhereInput | Prisma.DiseaseWarningRuleScalarWhereInput[];
    id?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    diseaseId?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    ruleType?: Prisma.EnumWarningRuleTypeFilter<"DiseaseWarningRule"> | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.IntNullableFilter<"DiseaseWarningRule"> | number | null;
    targetDrugClass?: Prisma.StringNullableFilter<"DiseaseWarningRule"> | string | null;
    severity?: Prisma.EnumWarningSeverityFilter<"DiseaseWarningRule"> | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFilter<"DiseaseWarningRule"> | string;
    autoBlock?: Prisma.BoolFilter<"DiseaseWarningRule"> | boolean;
    requiresOverride?: Prisma.BoolFilter<"DiseaseWarningRule"> | boolean;
    requiredMonitoring?: Prisma.StringNullableFilter<"DiseaseWarningRule"> | string | null;
    createdBy?: Prisma.IntFilter<"DiseaseWarningRule"> | number;
    createdAt?: Prisma.DateTimeFilter<"DiseaseWarningRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiseaseWarningRule"> | Date | string;
};
export type DiseaseWarningRuleCreateWithoutDiseaseInput = {
    ruleType: $Enums.WarningRuleType;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    activeSubstance?: Prisma.ActiveSubstanceCreateNestedOneWithoutDiseaseWarningRulesInput;
    creator: Prisma.UserCreateNestedOneWithoutDiseaseWarningRulesInput;
};
export type DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput = {
    id?: number;
    ruleType: $Enums.WarningRuleType;
    targetActiveSubstanceId?: number | null;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdBy: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleCreateOrConnectWithoutDiseaseInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput>;
};
export type DiseaseWarningRuleCreateManyDiseaseInputEnvelope = {
    data: Prisma.DiseaseWarningRuleCreateManyDiseaseInput | Prisma.DiseaseWarningRuleCreateManyDiseaseInput[];
    skipDuplicates?: boolean;
};
export type DiseaseWarningRuleUpsertWithWhereUniqueWithoutDiseaseInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedUpdateWithoutDiseaseInput>;
    create: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutDiseaseInput>;
};
export type DiseaseWarningRuleUpdateWithWhereUniqueWithoutDiseaseInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateWithoutDiseaseInput, Prisma.DiseaseWarningRuleUncheckedUpdateWithoutDiseaseInput>;
};
export type DiseaseWarningRuleUpdateManyWithWhereWithoutDiseaseInput = {
    where: Prisma.DiseaseWarningRuleScalarWhereInput;
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateManyMutationInput, Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutDiseaseInput>;
};
export type DiseaseWarningRuleCreateWithoutActiveSubstanceInput = {
    ruleType: $Enums.WarningRuleType;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    disease: Prisma.DiseaseCreateNestedOneWithoutDiseaseWarningRulesInput;
    creator: Prisma.UserCreateNestedOneWithoutDiseaseWarningRulesInput;
};
export type DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput = {
    id?: number;
    diseaseId: number;
    ruleType: $Enums.WarningRuleType;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdBy: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleCreateOrConnectWithoutActiveSubstanceInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput>;
};
export type DiseaseWarningRuleCreateManyActiveSubstanceInputEnvelope = {
    data: Prisma.DiseaseWarningRuleCreateManyActiveSubstanceInput | Prisma.DiseaseWarningRuleCreateManyActiveSubstanceInput[];
    skipDuplicates?: boolean;
};
export type DiseaseWarningRuleUpsertWithWhereUniqueWithoutActiveSubstanceInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedUpdateWithoutActiveSubstanceInput>;
    create: Prisma.XOR<Prisma.DiseaseWarningRuleCreateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedCreateWithoutActiveSubstanceInput>;
};
export type DiseaseWarningRuleUpdateWithWhereUniqueWithoutActiveSubstanceInput = {
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateWithoutActiveSubstanceInput, Prisma.DiseaseWarningRuleUncheckedUpdateWithoutActiveSubstanceInput>;
};
export type DiseaseWarningRuleUpdateManyWithWhereWithoutActiveSubstanceInput = {
    where: Prisma.DiseaseWarningRuleScalarWhereInput;
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateManyMutationInput, Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutActiveSubstanceInput>;
};
export type DiseaseWarningRuleCreateManyCreatorInput = {
    id?: number;
    diseaseId: number;
    ruleType: $Enums.WarningRuleType;
    targetActiveSubstanceId?: number | null;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleUpdateWithoutCreatorInput = {
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disease?: Prisma.DiseaseUpdateOneRequiredWithoutDiseaseWarningRulesNestedInput;
    activeSubstance?: Prisma.ActiveSubstanceUpdateOneWithoutDiseaseWarningRulesNestedInput;
};
export type DiseaseWarningRuleUncheckedUpdateWithoutCreatorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleCreateManyDiseaseInput = {
    id?: number;
    ruleType: $Enums.WarningRuleType;
    targetActiveSubstanceId?: number | null;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdBy: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleUpdateWithoutDiseaseInput = {
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeSubstance?: Prisma.ActiveSubstanceUpdateOneWithoutDiseaseWarningRulesNestedInput;
    creator?: Prisma.UserUpdateOneRequiredWithoutDiseaseWarningRulesNestedInput;
};
export type DiseaseWarningRuleUncheckedUpdateWithoutDiseaseInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleUncheckedUpdateManyWithoutDiseaseInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetActiveSubstanceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleCreateManyActiveSubstanceInput = {
    id?: number;
    diseaseId: number;
    ruleType: $Enums.WarningRuleType;
    targetDrugClass?: string | null;
    severity: $Enums.WarningSeverity;
    warningMessage: string;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: string | null;
    createdBy: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiseaseWarningRuleUpdateWithoutActiveSubstanceInput = {
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    disease?: Prisma.DiseaseUpdateOneRequiredWithoutDiseaseWarningRulesNestedInput;
    creator?: Prisma.UserUpdateOneRequiredWithoutDiseaseWarningRulesNestedInput;
};
export type DiseaseWarningRuleUncheckedUpdateWithoutActiveSubstanceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleUncheckedUpdateManyWithoutActiveSubstanceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    diseaseId?: Prisma.IntFieldUpdateOperationsInput | number;
    ruleType?: Prisma.EnumWarningRuleTypeFieldUpdateOperationsInput | $Enums.WarningRuleType;
    targetDrugClass?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    severity?: Prisma.EnumWarningSeverityFieldUpdateOperationsInput | $Enums.WarningSeverity;
    warningMessage?: Prisma.StringFieldUpdateOperationsInput | string;
    autoBlock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiresOverride?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    requiredMonitoring?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiseaseWarningRuleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    diseaseId?: boolean;
    ruleType?: boolean;
    targetActiveSubstanceId?: boolean;
    targetDrugClass?: boolean;
    severity?: boolean;
    warningMessage?: boolean;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
    activeSubstance?: boolean | Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs>;
    creator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diseaseWarningRule"]>;
export type DiseaseWarningRuleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    diseaseId?: boolean;
    ruleType?: boolean;
    targetActiveSubstanceId?: boolean;
    targetDrugClass?: boolean;
    severity?: boolean;
    warningMessage?: boolean;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
    activeSubstance?: boolean | Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs>;
    creator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diseaseWarningRule"]>;
export type DiseaseWarningRuleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    diseaseId?: boolean;
    ruleType?: boolean;
    targetActiveSubstanceId?: boolean;
    targetDrugClass?: boolean;
    severity?: boolean;
    warningMessage?: boolean;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
    activeSubstance?: boolean | Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs>;
    creator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diseaseWarningRule"]>;
export type DiseaseWarningRuleSelectScalar = {
    id?: boolean;
    diseaseId?: boolean;
    ruleType?: boolean;
    targetActiveSubstanceId?: boolean;
    targetDrugClass?: boolean;
    severity?: boolean;
    warningMessage?: boolean;
    autoBlock?: boolean;
    requiresOverride?: boolean;
    requiredMonitoring?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DiseaseWarningRuleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "diseaseId" | "ruleType" | "targetActiveSubstanceId" | "targetDrugClass" | "severity" | "warningMessage" | "autoBlock" | "requiresOverride" | "requiredMonitoring" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["diseaseWarningRule"]>;
export type DiseaseWarningRuleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
    activeSubstance?: boolean | Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs>;
    creator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DiseaseWarningRuleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
    activeSubstance?: boolean | Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs>;
    creator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DiseaseWarningRuleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    disease?: boolean | Prisma.DiseaseDefaultArgs<ExtArgs>;
    activeSubstance?: boolean | Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs>;
    creator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DiseaseWarningRulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiseaseWarningRule";
    objects: {
        disease: Prisma.$DiseasePayload<ExtArgs>;
        activeSubstance: Prisma.$ActiveSubstancePayload<ExtArgs> | null;
        creator: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        diseaseId: number;
        ruleType: $Enums.WarningRuleType;
        targetActiveSubstanceId: number | null;
        targetDrugClass: string | null;
        severity: $Enums.WarningSeverity;
        warningMessage: string;
        autoBlock: boolean;
        requiresOverride: boolean;
        requiredMonitoring: string | null;
        createdBy: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["diseaseWarningRule"]>;
    composites: {};
};
export type DiseaseWarningRuleGetPayload<S extends boolean | null | undefined | DiseaseWarningRuleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload, S>;
export type DiseaseWarningRuleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiseaseWarningRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiseaseWarningRuleCountAggregateInputType | true;
};
export interface DiseaseWarningRuleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiseaseWarningRule'];
        meta: {
            name: 'DiseaseWarningRule';
        };
    };
    /**
     * Find zero or one DiseaseWarningRule that matches the filter.
     * @param {DiseaseWarningRuleFindUniqueArgs} args - Arguments to find a DiseaseWarningRule
     * @example
     * // Get one DiseaseWarningRule
     * const diseaseWarningRule = await prisma.diseaseWarningRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiseaseWarningRuleFindUniqueArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DiseaseWarningRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiseaseWarningRuleFindUniqueOrThrowArgs} args - Arguments to find a DiseaseWarningRule
     * @example
     * // Get one DiseaseWarningRule
     * const diseaseWarningRule = await prisma.diseaseWarningRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiseaseWarningRuleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiseaseWarningRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseWarningRuleFindFirstArgs} args - Arguments to find a DiseaseWarningRule
     * @example
     * // Get one DiseaseWarningRule
     * const diseaseWarningRule = await prisma.diseaseWarningRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiseaseWarningRuleFindFirstArgs>(args?: Prisma.SelectSubset<T, DiseaseWarningRuleFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiseaseWarningRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseWarningRuleFindFirstOrThrowArgs} args - Arguments to find a DiseaseWarningRule
     * @example
     * // Get one DiseaseWarningRule
     * const diseaseWarningRule = await prisma.diseaseWarningRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiseaseWarningRuleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiseaseWarningRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DiseaseWarningRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseWarningRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiseaseWarningRules
     * const diseaseWarningRules = await prisma.diseaseWarningRule.findMany()
     *
     * // Get first 10 DiseaseWarningRules
     * const diseaseWarningRules = await prisma.diseaseWarningRule.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const diseaseWarningRuleWithIdOnly = await prisma.diseaseWarningRule.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DiseaseWarningRuleFindManyArgs>(args?: Prisma.SelectSubset<T, DiseaseWarningRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DiseaseWarningRule.
     * @param {DiseaseWarningRuleCreateArgs} args - Arguments to create a DiseaseWarningRule.
     * @example
     * // Create one DiseaseWarningRule
     * const DiseaseWarningRule = await prisma.diseaseWarningRule.create({
     *   data: {
     *     // ... data to create a DiseaseWarningRule
     *   }
     * })
     *
     */
    create<T extends DiseaseWarningRuleCreateArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleCreateArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DiseaseWarningRules.
     * @param {DiseaseWarningRuleCreateManyArgs} args - Arguments to create many DiseaseWarningRules.
     * @example
     * // Create many DiseaseWarningRules
     * const diseaseWarningRule = await prisma.diseaseWarningRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DiseaseWarningRuleCreateManyArgs>(args?: Prisma.SelectSubset<T, DiseaseWarningRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DiseaseWarningRules and returns the data saved in the database.
     * @param {DiseaseWarningRuleCreateManyAndReturnArgs} args - Arguments to create many DiseaseWarningRules.
     * @example
     * // Create many DiseaseWarningRules
     * const diseaseWarningRule = await prisma.diseaseWarningRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DiseaseWarningRules and only return the `id`
     * const diseaseWarningRuleWithIdOnly = await prisma.diseaseWarningRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DiseaseWarningRuleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiseaseWarningRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DiseaseWarningRule.
     * @param {DiseaseWarningRuleDeleteArgs} args - Arguments to delete one DiseaseWarningRule.
     * @example
     * // Delete one DiseaseWarningRule
     * const DiseaseWarningRule = await prisma.diseaseWarningRule.delete({
     *   where: {
     *     // ... filter to delete one DiseaseWarningRule
     *   }
     * })
     *
     */
    delete<T extends DiseaseWarningRuleDeleteArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleDeleteArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DiseaseWarningRule.
     * @param {DiseaseWarningRuleUpdateArgs} args - Arguments to update one DiseaseWarningRule.
     * @example
     * // Update one DiseaseWarningRule
     * const diseaseWarningRule = await prisma.diseaseWarningRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DiseaseWarningRuleUpdateArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleUpdateArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DiseaseWarningRules.
     * @param {DiseaseWarningRuleDeleteManyArgs} args - Arguments to filter DiseaseWarningRules to delete.
     * @example
     * // Delete a few DiseaseWarningRules
     * const { count } = await prisma.diseaseWarningRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DiseaseWarningRuleDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiseaseWarningRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiseaseWarningRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseWarningRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiseaseWarningRules
     * const diseaseWarningRule = await prisma.diseaseWarningRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DiseaseWarningRuleUpdateManyArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiseaseWarningRules and returns the data updated in the database.
     * @param {DiseaseWarningRuleUpdateManyAndReturnArgs} args - Arguments to update many DiseaseWarningRules.
     * @example
     * // Update many DiseaseWarningRules
     * const diseaseWarningRule = await prisma.diseaseWarningRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DiseaseWarningRules and only return the `id`
     * const diseaseWarningRuleWithIdOnly = await prisma.diseaseWarningRule.updateManyAndReturn({
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
    updateManyAndReturn<T extends DiseaseWarningRuleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DiseaseWarningRule.
     * @param {DiseaseWarningRuleUpsertArgs} args - Arguments to update or create a DiseaseWarningRule.
     * @example
     * // Update or create a DiseaseWarningRule
     * const diseaseWarningRule = await prisma.diseaseWarningRule.upsert({
     *   create: {
     *     // ... data to create a DiseaseWarningRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiseaseWarningRule we want to update
     *   }
     * })
     */
    upsert<T extends DiseaseWarningRuleUpsertArgs>(args: Prisma.SelectSubset<T, DiseaseWarningRuleUpsertArgs<ExtArgs>>): Prisma.Prisma__DiseaseWarningRuleClient<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DiseaseWarningRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseWarningRuleCountArgs} args - Arguments to filter DiseaseWarningRules to count.
     * @example
     * // Count the number of DiseaseWarningRules
     * const count = await prisma.diseaseWarningRule.count({
     *   where: {
     *     // ... the filter for the DiseaseWarningRules we want to count
     *   }
     * })
    **/
    count<T extends DiseaseWarningRuleCountArgs>(args?: Prisma.Subset<T, DiseaseWarningRuleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiseaseWarningRuleCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DiseaseWarningRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseWarningRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiseaseWarningRuleAggregateArgs>(args: Prisma.Subset<T, DiseaseWarningRuleAggregateArgs>): Prisma.PrismaPromise<GetDiseaseWarningRuleAggregateType<T>>;
    /**
     * Group by DiseaseWarningRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseWarningRuleGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DiseaseWarningRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiseaseWarningRuleGroupByArgs['orderBy'];
    } : {
        orderBy?: DiseaseWarningRuleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiseaseWarningRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiseaseWarningRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DiseaseWarningRule model
     */
    readonly fields: DiseaseWarningRuleFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DiseaseWarningRule.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DiseaseWarningRuleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    disease<T extends Prisma.DiseaseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiseaseDefaultArgs<ExtArgs>>): Prisma.Prisma__DiseaseClient<runtime.Types.Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    activeSubstance<T extends Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiseaseWarningRule$activeSubstanceArgs<ExtArgs>>): Prisma.Prisma__ActiveSubstanceClient<runtime.Types.Result.GetResult<Prisma.$ActiveSubstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    creator<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DiseaseWarningRule model
 */
export interface DiseaseWarningRuleFieldRefs {
    readonly id: Prisma.FieldRef<"DiseaseWarningRule", 'Int'>;
    readonly diseaseId: Prisma.FieldRef<"DiseaseWarningRule", 'Int'>;
    readonly ruleType: Prisma.FieldRef<"DiseaseWarningRule", 'WarningRuleType'>;
    readonly targetActiveSubstanceId: Prisma.FieldRef<"DiseaseWarningRule", 'Int'>;
    readonly targetDrugClass: Prisma.FieldRef<"DiseaseWarningRule", 'String'>;
    readonly severity: Prisma.FieldRef<"DiseaseWarningRule", 'WarningSeverity'>;
    readonly warningMessage: Prisma.FieldRef<"DiseaseWarningRule", 'String'>;
    readonly autoBlock: Prisma.FieldRef<"DiseaseWarningRule", 'Boolean'>;
    readonly requiresOverride: Prisma.FieldRef<"DiseaseWarningRule", 'Boolean'>;
    readonly requiredMonitoring: Prisma.FieldRef<"DiseaseWarningRule", 'String'>;
    readonly createdBy: Prisma.FieldRef<"DiseaseWarningRule", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"DiseaseWarningRule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DiseaseWarningRule", 'DateTime'>;
}
/**
 * DiseaseWarningRule findUnique
 */
export type DiseaseWarningRuleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * Filter, which DiseaseWarningRule to fetch.
     */
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
};
/**
 * DiseaseWarningRule findUniqueOrThrow
 */
export type DiseaseWarningRuleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * Filter, which DiseaseWarningRule to fetch.
     */
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
};
/**
 * DiseaseWarningRule findFirst
 */
export type DiseaseWarningRuleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * Filter, which DiseaseWarningRule to fetch.
     */
    where?: Prisma.DiseaseWarningRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiseaseWarningRules to fetch.
     */
    orderBy?: Prisma.DiseaseWarningRuleOrderByWithRelationInput | Prisma.DiseaseWarningRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiseaseWarningRules.
     */
    cursor?: Prisma.DiseaseWarningRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiseaseWarningRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiseaseWarningRules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiseaseWarningRules.
     */
    distinct?: Prisma.DiseaseWarningRuleScalarFieldEnum | Prisma.DiseaseWarningRuleScalarFieldEnum[];
};
/**
 * DiseaseWarningRule findFirstOrThrow
 */
export type DiseaseWarningRuleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * Filter, which DiseaseWarningRule to fetch.
     */
    where?: Prisma.DiseaseWarningRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiseaseWarningRules to fetch.
     */
    orderBy?: Prisma.DiseaseWarningRuleOrderByWithRelationInput | Prisma.DiseaseWarningRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiseaseWarningRules.
     */
    cursor?: Prisma.DiseaseWarningRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiseaseWarningRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiseaseWarningRules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiseaseWarningRules.
     */
    distinct?: Prisma.DiseaseWarningRuleScalarFieldEnum | Prisma.DiseaseWarningRuleScalarFieldEnum[];
};
/**
 * DiseaseWarningRule findMany
 */
export type DiseaseWarningRuleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * Filter, which DiseaseWarningRules to fetch.
     */
    where?: Prisma.DiseaseWarningRuleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiseaseWarningRules to fetch.
     */
    orderBy?: Prisma.DiseaseWarningRuleOrderByWithRelationInput | Prisma.DiseaseWarningRuleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DiseaseWarningRules.
     */
    cursor?: Prisma.DiseaseWarningRuleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiseaseWarningRules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiseaseWarningRules.
     */
    skip?: number;
    distinct?: Prisma.DiseaseWarningRuleScalarFieldEnum | Prisma.DiseaseWarningRuleScalarFieldEnum[];
};
/**
 * DiseaseWarningRule create
 */
export type DiseaseWarningRuleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * The data needed to create a DiseaseWarningRule.
     */
    data: Prisma.XOR<Prisma.DiseaseWarningRuleCreateInput, Prisma.DiseaseWarningRuleUncheckedCreateInput>;
};
/**
 * DiseaseWarningRule createMany
 */
export type DiseaseWarningRuleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiseaseWarningRules.
     */
    data: Prisma.DiseaseWarningRuleCreateManyInput | Prisma.DiseaseWarningRuleCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DiseaseWarningRule createManyAndReturn
 */
export type DiseaseWarningRuleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * The data used to create many DiseaseWarningRules.
     */
    data: Prisma.DiseaseWarningRuleCreateManyInput | Prisma.DiseaseWarningRuleCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DiseaseWarningRule update
 */
export type DiseaseWarningRuleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * The data needed to update a DiseaseWarningRule.
     */
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateInput, Prisma.DiseaseWarningRuleUncheckedUpdateInput>;
    /**
     * Choose, which DiseaseWarningRule to update.
     */
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
};
/**
 * DiseaseWarningRule updateMany
 */
export type DiseaseWarningRuleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DiseaseWarningRules.
     */
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateManyMutationInput, Prisma.DiseaseWarningRuleUncheckedUpdateManyInput>;
    /**
     * Filter which DiseaseWarningRules to update
     */
    where?: Prisma.DiseaseWarningRuleWhereInput;
    /**
     * Limit how many DiseaseWarningRules to update.
     */
    limit?: number;
};
/**
 * DiseaseWarningRule updateManyAndReturn
 */
export type DiseaseWarningRuleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * The data used to update DiseaseWarningRules.
     */
    data: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateManyMutationInput, Prisma.DiseaseWarningRuleUncheckedUpdateManyInput>;
    /**
     * Filter which DiseaseWarningRules to update
     */
    where?: Prisma.DiseaseWarningRuleWhereInput;
    /**
     * Limit how many DiseaseWarningRules to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DiseaseWarningRule upsert
 */
export type DiseaseWarningRuleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * The filter to search for the DiseaseWarningRule to update in case it exists.
     */
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
    /**
     * In case the DiseaseWarningRule found by the `where` argument doesn't exist, create a new DiseaseWarningRule with this data.
     */
    create: Prisma.XOR<Prisma.DiseaseWarningRuleCreateInput, Prisma.DiseaseWarningRuleUncheckedCreateInput>;
    /**
     * In case the DiseaseWarningRule was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DiseaseWarningRuleUpdateInput, Prisma.DiseaseWarningRuleUncheckedUpdateInput>;
};
/**
 * DiseaseWarningRule delete
 */
export type DiseaseWarningRuleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
    /**
     * Filter which DiseaseWarningRule to delete.
     */
    where: Prisma.DiseaseWarningRuleWhereUniqueInput;
};
/**
 * DiseaseWarningRule deleteMany
 */
export type DiseaseWarningRuleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiseaseWarningRules to delete
     */
    where?: Prisma.DiseaseWarningRuleWhereInput;
    /**
     * Limit how many DiseaseWarningRules to delete.
     */
    limit?: number;
};
/**
 * DiseaseWarningRule.activeSubstance
 */
export type DiseaseWarningRule$activeSubstanceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSubstance
     */
    select?: Prisma.ActiveSubstanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ActiveSubstance
     */
    omit?: Prisma.ActiveSubstanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ActiveSubstanceInclude<ExtArgs> | null;
    where?: Prisma.ActiveSubstanceWhereInput;
};
/**
 * DiseaseWarningRule without action
 */
export type DiseaseWarningRuleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiseaseWarningRule
     */
    select?: Prisma.DiseaseWarningRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiseaseWarningRule
     */
    omit?: Prisma.DiseaseWarningRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiseaseWarningRuleInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DiseaseWarningRule.d.ts.map