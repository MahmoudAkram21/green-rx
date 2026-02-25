import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    id: number | null;
};
export type UserSumAggregateOutputType = {
    id: number | null;
};
export type UserMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    role: $Enums.UserRole | null;
    emailVerified: boolean | null;
    emailVerificationToken: string | null;
    passwordResetToken: string | null;
    passwordResetExpires: Date | null;
    isActive: boolean | null;
    lastLoginAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    role: $Enums.UserRole | null;
    emailVerified: boolean | null;
    emailVerificationToken: string | null;
    passwordResetToken: string | null;
    passwordResetExpires: Date | null;
    isActive: boolean | null;
    lastLoginAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    phone: number;
    passwordHash: number;
    role: number;
    emailVerified: number;
    emailVerificationToken: number;
    passwordResetToken: number;
    passwordResetExpires: number;
    isActive: number;
    lastLoginAt: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    id?: true;
};
export type UserSumAggregateInputType = {
    id?: true;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    role?: true;
    emailVerified?: true;
    emailVerificationToken?: true;
    passwordResetToken?: true;
    passwordResetExpires?: true;
    isActive?: true;
    lastLoginAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    role?: true;
    emailVerified?: true;
    emailVerificationToken?: true;
    passwordResetToken?: true;
    passwordResetExpires?: true;
    isActive?: true;
    lastLoginAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    role?: true;
    emailVerified?: true;
    emailVerificationToken?: true;
    passwordResetToken?: true;
    passwordResetExpires?: true;
    isActive?: true;
    lastLoginAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: number;
    email: string;
    phone: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified: boolean;
    emailVerificationToken: string | null;
    passwordResetToken: string | null;
    passwordResetExpires: Date | null;
    isActive: boolean;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.IntFilter<"User"> | number;
    email?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    emailVerified?: Prisma.BoolFilter<"User"> | boolean;
    emailVerificationToken?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordResetToken?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordResetExpires?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    subscription?: Prisma.XOR<Prisma.SubscriptionNullableScalarRelationFilter, Prisma.SubscriptionWhereInput> | null;
    patient?: Prisma.XOR<Prisma.PatientNullableScalarRelationFilter, Prisma.PatientWhereInput> | null;
    doctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    pharmacist?: Prisma.XOR<Prisma.PharmacistNullableScalarRelationFilter, Prisma.PharmacistWhereInput> | null;
    notifications?: Prisma.NotificationListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    sessions?: Prisma.SessionListRelationFilter;
    importHistory?: Prisma.ImportHistoryListRelationFilter;
    exportHistory?: Prisma.ExportHistoryListRelationFilter;
    uploadedReports?: Prisma.MedicalReportListRelationFilter;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleListRelationFilter;
    reviewedSuggestions?: Prisma.MedicineSuggestionListRelationFilter;
    verifiedMedicines?: Prisma.PatientMedicineListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    emailVerificationToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordResetToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordResetExpires?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    subscription?: Prisma.SubscriptionOrderByWithRelationInput;
    patient?: Prisma.PatientOrderByWithRelationInput;
    doctor?: Prisma.DoctorOrderByWithRelationInput;
    pharmacist?: Prisma.PharmacistOrderByWithRelationInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    auditLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
    sessions?: Prisma.SessionOrderByRelationAggregateInput;
    importHistory?: Prisma.ImportHistoryOrderByRelationAggregateInput;
    exportHistory?: Prisma.ExportHistoryOrderByRelationAggregateInput;
    uploadedReports?: Prisma.MedicalReportOrderByRelationAggregateInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleOrderByRelationAggregateInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionOrderByRelationAggregateInput;
    verifiedMedicines?: Prisma.PatientMedicineOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    emailVerified?: Prisma.BoolFilter<"User"> | boolean;
    emailVerificationToken?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordResetToken?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordResetExpires?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    subscription?: Prisma.XOR<Prisma.SubscriptionNullableScalarRelationFilter, Prisma.SubscriptionWhereInput> | null;
    patient?: Prisma.XOR<Prisma.PatientNullableScalarRelationFilter, Prisma.PatientWhereInput> | null;
    doctor?: Prisma.XOR<Prisma.DoctorNullableScalarRelationFilter, Prisma.DoctorWhereInput> | null;
    pharmacist?: Prisma.XOR<Prisma.PharmacistNullableScalarRelationFilter, Prisma.PharmacistWhereInput> | null;
    notifications?: Prisma.NotificationListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    sessions?: Prisma.SessionListRelationFilter;
    importHistory?: Prisma.ImportHistoryListRelationFilter;
    exportHistory?: Prisma.ExportHistoryListRelationFilter;
    uploadedReports?: Prisma.MedicalReportListRelationFilter;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleListRelationFilter;
    reviewedSuggestions?: Prisma.MedicineSuggestionListRelationFilter;
    verifiedMedicines?: Prisma.PatientMedicineListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    emailVerificationToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordResetToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordResetExpires?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"User"> | number;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    emailVerified?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    emailVerificationToken?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    passwordResetToken?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    passwordResetExpires?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    lastLoginAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
};
export type UserCreateInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateManyInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type UserUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    emailVerificationToken?: Prisma.SortOrder;
    passwordResetToken?: Prisma.SortOrder;
    passwordResetExpires?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    emailVerificationToken?: Prisma.SortOrder;
    passwordResetToken?: Prisma.SortOrder;
    passwordResetExpires?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    emailVerificationToken?: Prisma.SortOrder;
    passwordResetToken?: Prisma.SortOrder;
    passwordResetExpires?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type UserCreateNestedOneWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubscriptionInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubscriptionInput;
    upsert?: Prisma.UserUpsertWithoutSubscriptionInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionInput, Prisma.UserUpdateWithoutSubscriptionInput>, Prisma.UserUncheckedUpdateWithoutSubscriptionInput>;
};
export type UserCreateNestedOneWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPatientInput, Prisma.UserUncheckedCreateWithoutPatientInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPatientInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPatientInput, Prisma.UserUncheckedCreateWithoutPatientInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPatientInput;
    upsert?: Prisma.UserUpsertWithoutPatientInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPatientInput, Prisma.UserUpdateWithoutPatientInput>, Prisma.UserUncheckedUpdateWithoutPatientInput>;
};
export type UserCreateNestedOneWithoutDoctorInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDoctorInput, Prisma.UserUncheckedCreateWithoutDoctorInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDoctorInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDoctorNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDoctorInput, Prisma.UserUncheckedCreateWithoutDoctorInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDoctorInput;
    upsert?: Prisma.UserUpsertWithoutDoctorInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDoctorInput, Prisma.UserUpdateWithoutDoctorInput>, Prisma.UserUncheckedUpdateWithoutDoctorInput>;
};
export type UserCreateNestedOneWithoutDiseaseWarningRulesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDiseaseWarningRulesInput, Prisma.UserUncheckedCreateWithoutDiseaseWarningRulesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDiseaseWarningRulesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDiseaseWarningRulesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDiseaseWarningRulesInput, Prisma.UserUncheckedCreateWithoutDiseaseWarningRulesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDiseaseWarningRulesInput;
    upsert?: Prisma.UserUpsertWithoutDiseaseWarningRulesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDiseaseWarningRulesInput, Prisma.UserUpdateWithoutDiseaseWarningRulesInput>, Prisma.UserUncheckedUpdateWithoutDiseaseWarningRulesInput>;
};
export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.UserUpsertWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput, Prisma.UserUpdateWithoutNotificationsInput>, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.UserUpsertWithoutAuditLogsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.UserUpdateWithoutAuditLogsInput>, Prisma.UserUncheckedUpdateWithoutAuditLogsInput>;
};
export type UserCreateNestedOneWithoutSessionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    upsert?: Prisma.UserUpsertWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput, Prisma.UserUpdateWithoutSessionsInput>, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserCreateNestedOneWithoutPharmacistInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPharmacistInput, Prisma.UserUncheckedCreateWithoutPharmacistInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPharmacistInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPharmacistNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPharmacistInput, Prisma.UserUncheckedCreateWithoutPharmacistInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPharmacistInput;
    upsert?: Prisma.UserUpsertWithoutPharmacistInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPharmacistInput, Prisma.UserUpdateWithoutPharmacistInput>, Prisma.UserUncheckedUpdateWithoutPharmacistInput>;
};
export type UserCreateNestedOneWithoutUploadedReportsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUploadedReportsInput, Prisma.UserUncheckedCreateWithoutUploadedReportsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUploadedReportsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutUploadedReportsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUploadedReportsInput, Prisma.UserUncheckedCreateWithoutUploadedReportsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUploadedReportsInput;
    upsert?: Prisma.UserUpsertWithoutUploadedReportsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutUploadedReportsInput, Prisma.UserUpdateWithoutUploadedReportsInput>, Prisma.UserUncheckedUpdateWithoutUploadedReportsInput>;
};
export type UserCreateNestedOneWithoutVerifiedMedicinesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutVerifiedMedicinesInput, Prisma.UserUncheckedCreateWithoutVerifiedMedicinesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutVerifiedMedicinesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutVerifiedMedicinesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutVerifiedMedicinesInput, Prisma.UserUncheckedCreateWithoutVerifiedMedicinesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutVerifiedMedicinesInput;
    upsert?: Prisma.UserUpsertWithoutVerifiedMedicinesInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutVerifiedMedicinesInput, Prisma.UserUpdateWithoutVerifiedMedicinesInput>, Prisma.UserUncheckedUpdateWithoutVerifiedMedicinesInput>;
};
export type UserCreateNestedOneWithoutImportHistoryInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutImportHistoryInput, Prisma.UserUncheckedCreateWithoutImportHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutImportHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutImportHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutImportHistoryInput, Prisma.UserUncheckedCreateWithoutImportHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutImportHistoryInput;
    upsert?: Prisma.UserUpsertWithoutImportHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutImportHistoryInput, Prisma.UserUpdateWithoutImportHistoryInput>, Prisma.UserUncheckedUpdateWithoutImportHistoryInput>;
};
export type UserCreateNestedOneWithoutReviewedSuggestionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewedSuggestionsInput, Prisma.UserUncheckedCreateWithoutReviewedSuggestionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewedSuggestionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutReviewedSuggestionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewedSuggestionsInput, Prisma.UserUncheckedCreateWithoutReviewedSuggestionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewedSuggestionsInput;
    upsert?: Prisma.UserUpsertWithoutReviewedSuggestionsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReviewedSuggestionsInput, Prisma.UserUpdateWithoutReviewedSuggestionsInput>, Prisma.UserUncheckedUpdateWithoutReviewedSuggestionsInput>;
};
export type UserCreateNestedOneWithoutExportHistoryInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExportHistoryInput, Prisma.UserUncheckedCreateWithoutExportHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExportHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutExportHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExportHistoryInput, Prisma.UserUncheckedCreateWithoutExportHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExportHistoryInput;
    upsert?: Prisma.UserUpsertWithoutExportHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExportHistoryInput, Prisma.UserUpdateWithoutExportHistoryInput>, Prisma.UserUncheckedUpdateWithoutExportHistoryInput>;
};
export type UserCreateWithoutSubscriptionInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutSubscriptionInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutSubscriptionInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
};
export type UserUpsertWithoutSubscriptionInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSubscriptionInput, Prisma.UserUncheckedUpdateWithoutSubscriptionInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionInput, Prisma.UserUncheckedCreateWithoutSubscriptionInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSubscriptionInput, Prisma.UserUncheckedUpdateWithoutSubscriptionInput>;
};
export type UserUpdateWithoutSubscriptionInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutSubscriptionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutPatientInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutPatientInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutPatientInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPatientInput, Prisma.UserUncheckedCreateWithoutPatientInput>;
};
export type UserUpsertWithoutPatientInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPatientInput, Prisma.UserUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPatientInput, Prisma.UserUncheckedCreateWithoutPatientInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPatientInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPatientInput, Prisma.UserUncheckedUpdateWithoutPatientInput>;
};
export type UserUpdateWithoutPatientInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutDoctorInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutDoctorInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutDoctorInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDoctorInput, Prisma.UserUncheckedCreateWithoutDoctorInput>;
};
export type UserUpsertWithoutDoctorInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDoctorInput, Prisma.UserUncheckedUpdateWithoutDoctorInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDoctorInput, Prisma.UserUncheckedCreateWithoutDoctorInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDoctorInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDoctorInput, Prisma.UserUncheckedUpdateWithoutDoctorInput>;
};
export type UserUpdateWithoutDoctorInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutDoctorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutDiseaseWarningRulesInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutDiseaseWarningRulesInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutDiseaseWarningRulesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDiseaseWarningRulesInput, Prisma.UserUncheckedCreateWithoutDiseaseWarningRulesInput>;
};
export type UserUpsertWithoutDiseaseWarningRulesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDiseaseWarningRulesInput, Prisma.UserUncheckedUpdateWithoutDiseaseWarningRulesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDiseaseWarningRulesInput, Prisma.UserUncheckedCreateWithoutDiseaseWarningRulesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDiseaseWarningRulesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDiseaseWarningRulesInput, Prisma.UserUncheckedUpdateWithoutDiseaseWarningRulesInput>;
};
export type UserUpdateWithoutDiseaseWarningRulesInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutDiseaseWarningRulesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutNotificationsInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
};
export type UserUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserUpdateWithoutNotificationsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutAuditLogsInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
};
export type UserUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAuditLogsInput, Prisma.UserUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAuditLogsInput, Prisma.UserUncheckedUpdateWithoutAuditLogsInput>;
};
export type UserUpdateWithoutAuditLogsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutSessionsInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutSessionsInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutSessionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
};
export type UserUpsertWithoutSessionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserUpdateWithoutSessionsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutPharmacistInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutPharmacistInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutPharmacistInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPharmacistInput, Prisma.UserUncheckedCreateWithoutPharmacistInput>;
};
export type UserUpsertWithoutPharmacistInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPharmacistInput, Prisma.UserUncheckedUpdateWithoutPharmacistInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPharmacistInput, Prisma.UserUncheckedCreateWithoutPharmacistInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPharmacistInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPharmacistInput, Prisma.UserUncheckedUpdateWithoutPharmacistInput>;
};
export type UserUpdateWithoutPharmacistInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutPharmacistInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutUploadedReportsInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutUploadedReportsInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutUploadedReportsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutUploadedReportsInput, Prisma.UserUncheckedCreateWithoutUploadedReportsInput>;
};
export type UserUpsertWithoutUploadedReportsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutUploadedReportsInput, Prisma.UserUncheckedUpdateWithoutUploadedReportsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutUploadedReportsInput, Prisma.UserUncheckedCreateWithoutUploadedReportsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutUploadedReportsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutUploadedReportsInput, Prisma.UserUncheckedUpdateWithoutUploadedReportsInput>;
};
export type UserUpdateWithoutUploadedReportsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutUploadedReportsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutVerifiedMedicinesInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
};
export type UserUncheckedCreateWithoutVerifiedMedicinesInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
};
export type UserCreateOrConnectWithoutVerifiedMedicinesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutVerifiedMedicinesInput, Prisma.UserUncheckedCreateWithoutVerifiedMedicinesInput>;
};
export type UserUpsertWithoutVerifiedMedicinesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutVerifiedMedicinesInput, Prisma.UserUncheckedUpdateWithoutVerifiedMedicinesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutVerifiedMedicinesInput, Prisma.UserUncheckedCreateWithoutVerifiedMedicinesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutVerifiedMedicinesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutVerifiedMedicinesInput, Prisma.UserUncheckedUpdateWithoutVerifiedMedicinesInput>;
};
export type UserUpdateWithoutVerifiedMedicinesInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
};
export type UserUncheckedUpdateWithoutVerifiedMedicinesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
};
export type UserCreateWithoutImportHistoryInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutImportHistoryInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutImportHistoryInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutImportHistoryInput, Prisma.UserUncheckedCreateWithoutImportHistoryInput>;
};
export type UserUpsertWithoutImportHistoryInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutImportHistoryInput, Prisma.UserUncheckedUpdateWithoutImportHistoryInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutImportHistoryInput, Prisma.UserUncheckedCreateWithoutImportHistoryInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutImportHistoryInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutImportHistoryInput, Prisma.UserUncheckedUpdateWithoutImportHistoryInput>;
};
export type UserUpdateWithoutImportHistoryInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutImportHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutReviewedSuggestionsInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutReviewedSuggestionsInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    exportHistory?: Prisma.ExportHistoryUncheckedCreateNestedManyWithoutUserInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutReviewedSuggestionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewedSuggestionsInput, Prisma.UserUncheckedCreateWithoutReviewedSuggestionsInput>;
};
export type UserUpsertWithoutReviewedSuggestionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReviewedSuggestionsInput, Prisma.UserUncheckedUpdateWithoutReviewedSuggestionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewedSuggestionsInput, Prisma.UserUncheckedCreateWithoutReviewedSuggestionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReviewedSuggestionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReviewedSuggestionsInput, Prisma.UserUncheckedUpdateWithoutReviewedSuggestionsInput>;
};
export type UserUpdateWithoutReviewedSuggestionsInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutReviewedSuggestionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    exportHistory?: Prisma.ExportHistoryUncheckedUpdateManyWithoutUserNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
export type UserCreateWithoutExportHistoryInput = {
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryCreateNestedManyWithoutImporterInput;
    uploadedReports?: Prisma.MedicalReportCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineCreateNestedManyWithoutVerifierInput;
};
export type UserUncheckedCreateWithoutExportHistoryInput = {
    id?: number;
    email: string;
    phone?: string | null;
    passwordHash: string;
    role: $Enums.UserRole;
    emailVerified?: boolean;
    emailVerificationToken?: string | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: Date | string | null;
    isActive?: boolean;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
    patient?: Prisma.PatientUncheckedCreateNestedOneWithoutUserInput;
    doctor?: Prisma.DoctorUncheckedCreateNestedOneWithoutUserInput;
    pharmacist?: Prisma.PharmacistUncheckedCreateNestedOneWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    importHistory?: Prisma.ImportHistoryUncheckedCreateNestedManyWithoutImporterInput;
    uploadedReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutUploaderInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedCreateNestedManyWithoutCreatorInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedCreateNestedManyWithoutReviewerInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutVerifierInput;
};
export type UserCreateOrConnectWithoutExportHistoryInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExportHistoryInput, Prisma.UserUncheckedCreateWithoutExportHistoryInput>;
};
export type UserUpsertWithoutExportHistoryInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExportHistoryInput, Prisma.UserUncheckedUpdateWithoutExportHistoryInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExportHistoryInput, Prisma.UserUncheckedCreateWithoutExportHistoryInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExportHistoryInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExportHistoryInput, Prisma.UserUncheckedUpdateWithoutExportHistoryInput>;
};
export type UserUpdateWithoutExportHistoryInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUpdateManyWithoutImporterNestedInput;
    uploadedReports?: Prisma.MedicalReportUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUpdateManyWithoutVerifierNestedInput;
};
export type UserUncheckedUpdateWithoutExportHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordResetExpires?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subscription?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
    patient?: Prisma.PatientUncheckedUpdateOneWithoutUserNestedInput;
    doctor?: Prisma.DoctorUncheckedUpdateOneWithoutUserNestedInput;
    pharmacist?: Prisma.PharmacistUncheckedUpdateOneWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    importHistory?: Prisma.ImportHistoryUncheckedUpdateManyWithoutImporterNestedInput;
    uploadedReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutUploaderNestedInput;
    diseaseWarningRules?: Prisma.DiseaseWarningRuleUncheckedUpdateManyWithoutCreatorNestedInput;
    reviewedSuggestions?: Prisma.MedicineSuggestionUncheckedUpdateManyWithoutReviewerNestedInput;
    verifiedMedicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutVerifierNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    notifications: number;
    auditLogs: number;
    sessions: number;
    importHistory: number;
    exportHistory: number;
    uploadedReports: number;
    diseaseWarningRules: number;
    reviewedSuggestions: number;
    verifiedMedicines: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs;
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    importHistory?: boolean | UserCountOutputTypeCountImportHistoryArgs;
    exportHistory?: boolean | UserCountOutputTypeCountExportHistoryArgs;
    uploadedReports?: boolean | UserCountOutputTypeCountUploadedReportsArgs;
    diseaseWarningRules?: boolean | UserCountOutputTypeCountDiseaseWarningRulesArgs;
    reviewedSuggestions?: boolean | UserCountOutputTypeCountReviewedSuggestionsArgs;
    verifiedMedicines?: boolean | UserCountOutputTypeCountVerifiedMedicinesArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountImportHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImportHistoryWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountExportHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExportHistoryWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountUploadedReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicalReportWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountDiseaseWarningRulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiseaseWarningRuleWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountReviewedSuggestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicineSuggestionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountVerifiedMedicinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientMedicineWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    emailVerified?: boolean;
    emailVerificationToken?: boolean;
    passwordResetToken?: boolean;
    passwordResetExpires?: boolean;
    isActive?: boolean;
    lastLoginAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    subscription?: boolean | Prisma.User$subscriptionArgs<ExtArgs>;
    patient?: boolean | Prisma.User$patientArgs<ExtArgs>;
    doctor?: boolean | Prisma.User$doctorArgs<ExtArgs>;
    pharmacist?: boolean | Prisma.User$pharmacistArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.User$auditLogsArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    importHistory?: boolean | Prisma.User$importHistoryArgs<ExtArgs>;
    exportHistory?: boolean | Prisma.User$exportHistoryArgs<ExtArgs>;
    uploadedReports?: boolean | Prisma.User$uploadedReportsArgs<ExtArgs>;
    diseaseWarningRules?: boolean | Prisma.User$diseaseWarningRulesArgs<ExtArgs>;
    reviewedSuggestions?: boolean | Prisma.User$reviewedSuggestionsArgs<ExtArgs>;
    verifiedMedicines?: boolean | Prisma.User$verifiedMedicinesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    emailVerified?: boolean;
    emailVerificationToken?: boolean;
    passwordResetToken?: boolean;
    passwordResetExpires?: boolean;
    isActive?: boolean;
    lastLoginAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    emailVerified?: boolean;
    emailVerificationToken?: boolean;
    passwordResetToken?: boolean;
    passwordResetExpires?: boolean;
    isActive?: boolean;
    lastLoginAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    emailVerified?: boolean;
    emailVerificationToken?: boolean;
    passwordResetToken?: boolean;
    passwordResetExpires?: boolean;
    isActive?: boolean;
    lastLoginAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "phone" | "passwordHash" | "role" | "emailVerified" | "emailVerificationToken" | "passwordResetToken" | "passwordResetExpires" | "isActive" | "lastLoginAt" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subscription?: boolean | Prisma.User$subscriptionArgs<ExtArgs>;
    patient?: boolean | Prisma.User$patientArgs<ExtArgs>;
    doctor?: boolean | Prisma.User$doctorArgs<ExtArgs>;
    pharmacist?: boolean | Prisma.User$pharmacistArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.User$auditLogsArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    importHistory?: boolean | Prisma.User$importHistoryArgs<ExtArgs>;
    exportHistory?: boolean | Prisma.User$exportHistoryArgs<ExtArgs>;
    uploadedReports?: boolean | Prisma.User$uploadedReportsArgs<ExtArgs>;
    diseaseWarningRules?: boolean | Prisma.User$diseaseWarningRulesArgs<ExtArgs>;
    reviewedSuggestions?: boolean | Prisma.User$reviewedSuggestionsArgs<ExtArgs>;
    verifiedMedicines?: boolean | Prisma.User$verifiedMedicinesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        subscription: Prisma.$SubscriptionPayload<ExtArgs> | null;
        patient: Prisma.$PatientPayload<ExtArgs> | null;
        doctor: Prisma.$DoctorPayload<ExtArgs> | null;
        pharmacist: Prisma.$PharmacistPayload<ExtArgs> | null;
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
        sessions: Prisma.$SessionPayload<ExtArgs>[];
        importHistory: Prisma.$ImportHistoryPayload<ExtArgs>[];
        exportHistory: Prisma.$ExportHistoryPayload<ExtArgs>[];
        uploadedReports: Prisma.$MedicalReportPayload<ExtArgs>[];
        diseaseWarningRules: Prisma.$DiseaseWarningRulePayload<ExtArgs>[];
        reviewedSuggestions: Prisma.$MedicineSuggestionPayload<ExtArgs>[];
        verifiedMedicines: Prisma.$PatientMedicinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: $Enums.UserRole;
        emailVerified: boolean;
        emailVerificationToken: string | null;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        isActive: boolean;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    subscription<T extends Prisma.User$subscriptionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$subscriptionArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    patient<T extends Prisma.User$patientArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$patientArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    doctor<T extends Prisma.User$doctorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$doctorArgs<ExtArgs>>): Prisma.Prisma__DoctorClient<runtime.Types.Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    pharmacist<T extends Prisma.User$pharmacistArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$pharmacistArgs<ExtArgs>>): Prisma.Prisma__PharmacistClient<runtime.Types.Result.GetResult<Prisma.$PharmacistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    notifications<T extends Prisma.User$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditLogs<T extends Prisma.User$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sessions<T extends Prisma.User$sessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    importHistory<T extends Prisma.User$importHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$importHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImportHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    exportHistory<T extends Prisma.User$exportHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$exportHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExportHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    uploadedReports<T extends Prisma.User$uploadedReportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$uploadedReportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicalReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    diseaseWarningRules<T extends Prisma.User$diseaseWarningRulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$diseaseWarningRulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiseaseWarningRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviewedSuggestions<T extends Prisma.User$reviewedSuggestionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$reviewedSuggestionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicineSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    verifiedMedicines<T extends Prisma.User$verifiedMedicinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$verifiedMedicinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'Int'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly emailVerified: Prisma.FieldRef<"User", 'Boolean'>;
    readonly emailVerificationToken: Prisma.FieldRef<"User", 'String'>;
    readonly passwordResetToken: Prisma.FieldRef<"User", 'String'>;
    readonly passwordResetExpires: Prisma.FieldRef<"User", 'DateTime'>;
    readonly isActive: Prisma.FieldRef<"User", 'Boolean'>;
    readonly lastLoginAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.subscription
 */
export type User$subscriptionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subscription
     */
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionWhereInput;
};
/**
 * User.patient
 */
export type User$patientArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where?: Prisma.PatientWhereInput;
};
/**
 * User.doctor
 */
export type User$doctorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.pharmacist
 */
export type User$pharmacistArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.PharmacistWhereInput;
};
/**
 * User.notifications
 */
export type User$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
/**
 * User.auditLogs
 */
export type User$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
/**
 * User.sessions
 */
export type User$sessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: Prisma.SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionScalarFieldEnum | Prisma.SessionScalarFieldEnum[];
};
/**
 * User.importHistory
 */
export type User$importHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportHistory
     */
    select?: Prisma.ImportHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ImportHistory
     */
    omit?: Prisma.ImportHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ImportHistoryInclude<ExtArgs> | null;
    where?: Prisma.ImportHistoryWhereInput;
    orderBy?: Prisma.ImportHistoryOrderByWithRelationInput | Prisma.ImportHistoryOrderByWithRelationInput[];
    cursor?: Prisma.ImportHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImportHistoryScalarFieldEnum | Prisma.ImportHistoryScalarFieldEnum[];
};
/**
 * User.exportHistory
 */
export type User$exportHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportHistory
     */
    select?: Prisma.ExportHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExportHistory
     */
    omit?: Prisma.ExportHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExportHistoryInclude<ExtArgs> | null;
    where?: Prisma.ExportHistoryWhereInput;
    orderBy?: Prisma.ExportHistoryOrderByWithRelationInput | Prisma.ExportHistoryOrderByWithRelationInput[];
    cursor?: Prisma.ExportHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExportHistoryScalarFieldEnum | Prisma.ExportHistoryScalarFieldEnum[];
};
/**
 * User.uploadedReports
 */
export type User$uploadedReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalReport
     */
    select?: Prisma.MedicalReportSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicalReport
     */
    omit?: Prisma.MedicalReportOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicalReportInclude<ExtArgs> | null;
    where?: Prisma.MedicalReportWhereInput;
    orderBy?: Prisma.MedicalReportOrderByWithRelationInput | Prisma.MedicalReportOrderByWithRelationInput[];
    cursor?: Prisma.MedicalReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MedicalReportScalarFieldEnum | Prisma.MedicalReportScalarFieldEnum[];
};
/**
 * User.diseaseWarningRules
 */
export type User$diseaseWarningRulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.DiseaseWarningRuleWhereInput;
    orderBy?: Prisma.DiseaseWarningRuleOrderByWithRelationInput | Prisma.DiseaseWarningRuleOrderByWithRelationInput[];
    cursor?: Prisma.DiseaseWarningRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiseaseWarningRuleScalarFieldEnum | Prisma.DiseaseWarningRuleScalarFieldEnum[];
};
/**
 * User.reviewedSuggestions
 */
export type User$reviewedSuggestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.MedicineSuggestionWhereInput;
    orderBy?: Prisma.MedicineSuggestionOrderByWithRelationInput | Prisma.MedicineSuggestionOrderByWithRelationInput[];
    cursor?: Prisma.MedicineSuggestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MedicineSuggestionScalarFieldEnum | Prisma.MedicineSuggestionScalarFieldEnum[];
};
/**
 * User.verifiedMedicines
 */
export type User$verifiedMedicinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientMedicine
     */
    select?: Prisma.PatientMedicineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientMedicine
     */
    omit?: Prisma.PatientMedicineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientMedicineInclude<ExtArgs> | null;
    where?: Prisma.PatientMedicineWhereInput;
    orderBy?: Prisma.PatientMedicineOrderByWithRelationInput | Prisma.PatientMedicineOrderByWithRelationInput[];
    cursor?: Prisma.PatientMedicineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientMedicineScalarFieldEnum | Prisma.PatientMedicineScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=User.d.ts.map