import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Patient
 *
 */
export type PatientModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientPayload>;
export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null;
    _avg: PatientAvgAggregateOutputType | null;
    _sum: PatientSumAggregateOutputType | null;
    _min: PatientMinAggregateOutputType | null;
    _max: PatientMaxAggregateOutputType | null;
};
export type PatientAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    age: number | null;
    weight: runtime.Decimal | null;
    height: runtime.Decimal | null;
    trimester: number | null;
    profileCompleteness: number | null;
};
export type PatientSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    age: number | null;
    weight: runtime.Decimal | null;
    height: runtime.Decimal | null;
    trimester: number | null;
    profileCompleteness: number | null;
};
export type PatientMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    name: string | null;
    age: number | null;
    ageClassification: $Enums.AgeClassification | null;
    dateOfBirth: Date | null;
    weight: runtime.Decimal | null;
    height: runtime.Decimal | null;
    gender: $Enums.Gender | null;
    smoking: boolean | null;
    pregnancyWarning: boolean | null;
    pregnancyStatus: boolean | null;
    trimester: number | null;
    lactation: boolean | null;
    bloodType: string | null;
    profileCompleteness: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PatientMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    name: string | null;
    age: number | null;
    ageClassification: $Enums.AgeClassification | null;
    dateOfBirth: Date | null;
    weight: runtime.Decimal | null;
    height: runtime.Decimal | null;
    gender: $Enums.Gender | null;
    smoking: boolean | null;
    pregnancyWarning: boolean | null;
    pregnancyStatus: boolean | null;
    trimester: number | null;
    lactation: boolean | null;
    bloodType: string | null;
    profileCompleteness: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PatientCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    age: number;
    ageClassification: number;
    dateOfBirth: number;
    weight: number;
    height: number;
    gender: number;
    smoking: number;
    pregnancyWarning: number;
    pregnancyStatus: number;
    trimester: number;
    lactation: number;
    bloodType: number;
    profileCompleteness: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type PatientAvgAggregateInputType = {
    id?: true;
    userId?: true;
    age?: true;
    weight?: true;
    height?: true;
    trimester?: true;
    profileCompleteness?: true;
};
export type PatientSumAggregateInputType = {
    id?: true;
    userId?: true;
    age?: true;
    weight?: true;
    height?: true;
    trimester?: true;
    profileCompleteness?: true;
};
export type PatientMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    age?: true;
    ageClassification?: true;
    dateOfBirth?: true;
    weight?: true;
    height?: true;
    gender?: true;
    smoking?: true;
    pregnancyWarning?: true;
    pregnancyStatus?: true;
    trimester?: true;
    lactation?: true;
    bloodType?: true;
    profileCompleteness?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PatientMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    age?: true;
    ageClassification?: true;
    dateOfBirth?: true;
    weight?: true;
    height?: true;
    gender?: true;
    smoking?: true;
    pregnancyWarning?: true;
    pregnancyStatus?: true;
    trimester?: true;
    lactation?: true;
    bloodType?: true;
    profileCompleteness?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PatientCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    age?: true;
    ageClassification?: true;
    dateOfBirth?: true;
    weight?: true;
    height?: true;
    gender?: true;
    smoking?: true;
    pregnancyWarning?: true;
    pregnancyStatus?: true;
    trimester?: true;
    lactation?: true;
    bloodType?: true;
    profileCompleteness?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type PatientAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PatientAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PatientSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType;
};
export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
    [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatient[P]> : Prisma.GetScalarType<T[P], AggregatePatient[P]>;
};
export type PatientGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithAggregationInput | Prisma.PatientOrderByWithAggregationInput[];
    by: Prisma.PatientScalarFieldEnum[] | Prisma.PatientScalarFieldEnum;
    having?: Prisma.PatientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientCountAggregateInputType | true;
    _avg?: PatientAvgAggregateInputType;
    _sum?: PatientSumAggregateInputType;
    _min?: PatientMinAggregateInputType;
    _max?: PatientMaxAggregateInputType;
};
export type PatientGroupByOutputType = {
    id: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth: Date | null;
    weight: runtime.Decimal | null;
    height: runtime.Decimal | null;
    gender: $Enums.Gender;
    smoking: boolean;
    pregnancyWarning: boolean;
    pregnancyStatus: boolean | null;
    trimester: number | null;
    lactation: boolean;
    bloodType: string | null;
    profileCompleteness: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: PatientCountAggregateOutputType | null;
    _avg: PatientAvgAggregateOutputType | null;
    _sum: PatientSumAggregateOutputType | null;
    _min: PatientMinAggregateOutputType | null;
    _max: PatientMaxAggregateOutputType | null;
};
type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientGroupByOutputType[P]>;
}>>;
export type PatientWhereInput = {
    AND?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    OR?: Prisma.PatientWhereInput[];
    NOT?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    id?: Prisma.IntFilter<"Patient"> | number;
    userId?: Prisma.IntFilter<"Patient"> | number;
    name?: Prisma.StringFilter<"Patient"> | string;
    age?: Prisma.IntFilter<"Patient"> | number;
    ageClassification?: Prisma.EnumAgeClassificationFilter<"Patient"> | $Enums.AgeClassification;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    weight?: Prisma.DecimalNullableFilter<"Patient"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.DecimalNullableFilter<"Patient"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFilter<"Patient"> | $Enums.Gender;
    smoking?: Prisma.BoolFilter<"Patient"> | boolean;
    pregnancyWarning?: Prisma.BoolFilter<"Patient"> | boolean;
    pregnancyStatus?: Prisma.BoolNullableFilter<"Patient"> | boolean | null;
    trimester?: Prisma.IntNullableFilter<"Patient"> | number | null;
    lactation?: Prisma.BoolFilter<"Patient"> | boolean;
    bloodType?: Prisma.StringNullableFilter<"Patient"> | string | null;
    profileCompleteness?: Prisma.IntFilter<"Patient"> | number;
    createdAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    prescriptions?: Prisma.PrescriptionListRelationFilter;
    patientDiseases?: Prisma.PatientDiseaseListRelationFilter;
    medicalHistories?: Prisma.MedicalHistoryListRelationFilter;
    familyHistories?: Prisma.FamilyHistoryListRelationFilter;
    surgicalHistories?: Prisma.SurgicalHistoryListRelationFilter;
    lifestyle?: Prisma.XOR<Prisma.LifestyleNullableScalarRelationFilter, Prisma.LifestyleWhereInput> | null;
    allergies?: Prisma.AllergyListRelationFilter;
    patientDoctors?: Prisma.PatientDoctorListRelationFilter;
    consultations?: Prisma.ConsultationListRelationFilter;
    appointments?: Prisma.AppointmentListRelationFilter;
    medicalReports?: Prisma.MedicalReportListRelationFilter;
    shareLinks?: Prisma.PatientShareLinkListRelationFilter;
    adverseReactions?: Prisma.AdverseDrugReactionListRelationFilter;
    childrenProfiles?: Prisma.ChildProfileListRelationFilter;
    ratings?: Prisma.RatingListRelationFilter;
    visits?: Prisma.VisitListRelationFilter;
    medicines?: Prisma.PatientMedicineListRelationFilter;
};
export type PatientOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    ageClassification?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrderInput | Prisma.SortOrder;
    weight?: Prisma.SortOrderInput | Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    smoking?: Prisma.SortOrder;
    pregnancyWarning?: Prisma.SortOrder;
    pregnancyStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    trimester?: Prisma.SortOrderInput | Prisma.SortOrder;
    lactation?: Prisma.SortOrder;
    bloodType?: Prisma.SortOrderInput | Prisma.SortOrder;
    profileCompleteness?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    prescriptions?: Prisma.PrescriptionOrderByRelationAggregateInput;
    patientDiseases?: Prisma.PatientDiseaseOrderByRelationAggregateInput;
    medicalHistories?: Prisma.MedicalHistoryOrderByRelationAggregateInput;
    familyHistories?: Prisma.FamilyHistoryOrderByRelationAggregateInput;
    surgicalHistories?: Prisma.SurgicalHistoryOrderByRelationAggregateInput;
    lifestyle?: Prisma.LifestyleOrderByWithRelationInput;
    allergies?: Prisma.AllergyOrderByRelationAggregateInput;
    patientDoctors?: Prisma.PatientDoctorOrderByRelationAggregateInput;
    consultations?: Prisma.ConsultationOrderByRelationAggregateInput;
    appointments?: Prisma.AppointmentOrderByRelationAggregateInput;
    medicalReports?: Prisma.MedicalReportOrderByRelationAggregateInput;
    shareLinks?: Prisma.PatientShareLinkOrderByRelationAggregateInput;
    adverseReactions?: Prisma.AdverseDrugReactionOrderByRelationAggregateInput;
    childrenProfiles?: Prisma.ChildProfileOrderByRelationAggregateInput;
    ratings?: Prisma.RatingOrderByRelationAggregateInput;
    visits?: Prisma.VisitOrderByRelationAggregateInput;
    medicines?: Prisma.PatientMedicineOrderByRelationAggregateInput;
};
export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId?: number;
    AND?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    OR?: Prisma.PatientWhereInput[];
    NOT?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    name?: Prisma.StringFilter<"Patient"> | string;
    age?: Prisma.IntFilter<"Patient"> | number;
    ageClassification?: Prisma.EnumAgeClassificationFilter<"Patient"> | $Enums.AgeClassification;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    weight?: Prisma.DecimalNullableFilter<"Patient"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.DecimalNullableFilter<"Patient"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFilter<"Patient"> | $Enums.Gender;
    smoking?: Prisma.BoolFilter<"Patient"> | boolean;
    pregnancyWarning?: Prisma.BoolFilter<"Patient"> | boolean;
    pregnancyStatus?: Prisma.BoolNullableFilter<"Patient"> | boolean | null;
    trimester?: Prisma.IntNullableFilter<"Patient"> | number | null;
    lactation?: Prisma.BoolFilter<"Patient"> | boolean;
    bloodType?: Prisma.StringNullableFilter<"Patient"> | string | null;
    profileCompleteness?: Prisma.IntFilter<"Patient"> | number;
    createdAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    prescriptions?: Prisma.PrescriptionListRelationFilter;
    patientDiseases?: Prisma.PatientDiseaseListRelationFilter;
    medicalHistories?: Prisma.MedicalHistoryListRelationFilter;
    familyHistories?: Prisma.FamilyHistoryListRelationFilter;
    surgicalHistories?: Prisma.SurgicalHistoryListRelationFilter;
    lifestyle?: Prisma.XOR<Prisma.LifestyleNullableScalarRelationFilter, Prisma.LifestyleWhereInput> | null;
    allergies?: Prisma.AllergyListRelationFilter;
    patientDoctors?: Prisma.PatientDoctorListRelationFilter;
    consultations?: Prisma.ConsultationListRelationFilter;
    appointments?: Prisma.AppointmentListRelationFilter;
    medicalReports?: Prisma.MedicalReportListRelationFilter;
    shareLinks?: Prisma.PatientShareLinkListRelationFilter;
    adverseReactions?: Prisma.AdverseDrugReactionListRelationFilter;
    childrenProfiles?: Prisma.ChildProfileListRelationFilter;
    ratings?: Prisma.RatingListRelationFilter;
    visits?: Prisma.VisitListRelationFilter;
    medicines?: Prisma.PatientMedicineListRelationFilter;
}, "id" | "userId">;
export type PatientOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    ageClassification?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrderInput | Prisma.SortOrder;
    weight?: Prisma.SortOrderInput | Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    smoking?: Prisma.SortOrder;
    pregnancyWarning?: Prisma.SortOrder;
    pregnancyStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    trimester?: Prisma.SortOrderInput | Prisma.SortOrder;
    lactation?: Prisma.SortOrder;
    bloodType?: Prisma.SortOrderInput | Prisma.SortOrder;
    profileCompleteness?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PatientCountOrderByAggregateInput;
    _avg?: Prisma.PatientAvgOrderByAggregateInput;
    _max?: Prisma.PatientMaxOrderByAggregateInput;
    _min?: Prisma.PatientMinOrderByAggregateInput;
    _sum?: Prisma.PatientSumOrderByAggregateInput;
};
export type PatientScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientScalarWhereWithAggregatesInput | Prisma.PatientScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientScalarWhereWithAggregatesInput | Prisma.PatientScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Patient"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Patient"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    age?: Prisma.IntWithAggregatesFilter<"Patient"> | number;
    ageClassification?: Prisma.EnumAgeClassificationWithAggregatesFilter<"Patient"> | $Enums.AgeClassification;
    dateOfBirth?: Prisma.DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null;
    weight?: Prisma.DecimalNullableWithAggregatesFilter<"Patient"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.DecimalNullableWithAggregatesFilter<"Patient"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderWithAggregatesFilter<"Patient"> | $Enums.Gender;
    smoking?: Prisma.BoolWithAggregatesFilter<"Patient"> | boolean;
    pregnancyWarning?: Prisma.BoolWithAggregatesFilter<"Patient"> | boolean;
    pregnancyStatus?: Prisma.BoolNullableWithAggregatesFilter<"Patient"> | boolean | null;
    trimester?: Prisma.IntNullableWithAggregatesFilter<"Patient"> | number | null;
    lactation?: Prisma.BoolWithAggregatesFilter<"Patient"> | boolean;
    bloodType?: Prisma.StringNullableWithAggregatesFilter<"Patient"> | string | null;
    profileCompleteness?: Prisma.IntWithAggregatesFilter<"Patient"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Patient"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null;
};
export type PatientCreateInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateManyInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type PatientUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PatientUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PatientNullableScalarRelationFilter = {
    is?: Prisma.PatientWhereInput | null;
    isNot?: Prisma.PatientWhereInput | null;
};
export type PatientCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    ageClassification?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    smoking?: Prisma.SortOrder;
    pregnancyWarning?: Prisma.SortOrder;
    pregnancyStatus?: Prisma.SortOrder;
    trimester?: Prisma.SortOrder;
    lactation?: Prisma.SortOrder;
    bloodType?: Prisma.SortOrder;
    profileCompleteness?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PatientAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    trimester?: Prisma.SortOrder;
    profileCompleteness?: Prisma.SortOrder;
};
export type PatientMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    ageClassification?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    smoking?: Prisma.SortOrder;
    pregnancyWarning?: Prisma.SortOrder;
    pregnancyStatus?: Prisma.SortOrder;
    trimester?: Prisma.SortOrder;
    lactation?: Prisma.SortOrder;
    bloodType?: Prisma.SortOrder;
    profileCompleteness?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PatientMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    ageClassification?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    smoking?: Prisma.SortOrder;
    pregnancyWarning?: Prisma.SortOrder;
    pregnancyStatus?: Prisma.SortOrder;
    trimester?: Prisma.SortOrder;
    lactation?: Prisma.SortOrder;
    bloodType?: Prisma.SortOrder;
    profileCompleteness?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PatientSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    trimester?: Prisma.SortOrder;
    profileCompleteness?: Prisma.SortOrder;
};
export type PatientScalarRelationFilter = {
    is?: Prisma.PatientWhereInput;
    isNot?: Prisma.PatientWhereInput;
};
export type PatientCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutUserInput, Prisma.PatientUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutUserInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutUserInput, Prisma.PatientUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutUserInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutUserInput, Prisma.PatientUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PatientUpsertWithoutUserInput;
    disconnect?: Prisma.PatientWhereInput | boolean;
    delete?: Prisma.PatientWhereInput | boolean;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutUserInput, Prisma.PatientUpdateWithoutUserInput>, Prisma.PatientUncheckedUpdateWithoutUserInput>;
};
export type PatientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutUserInput, Prisma.PatientUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PatientUpsertWithoutUserInput;
    disconnect?: Prisma.PatientWhereInput | boolean;
    delete?: Prisma.PatientWhereInput | boolean;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutUserInput, Prisma.PatientUpdateWithoutUserInput>, Prisma.PatientUncheckedUpdateWithoutUserInput>;
};
export type EnumAgeClassificationFieldUpdateOperationsInput = {
    set?: $Enums.AgeClassification;
};
export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender;
};
export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PatientCreateNestedOneWithoutMedicalHistoriesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutMedicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutMedicalHistoriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutMedicalHistoriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutMedicalHistoriesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutMedicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutMedicalHistoriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutMedicalHistoriesInput;
    upsert?: Prisma.PatientUpsertWithoutMedicalHistoriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutMedicalHistoriesInput, Prisma.PatientUpdateWithoutMedicalHistoriesInput>, Prisma.PatientUncheckedUpdateWithoutMedicalHistoriesInput>;
};
export type PatientCreateNestedOneWithoutFamilyHistoriesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutFamilyHistoriesInput, Prisma.PatientUncheckedCreateWithoutFamilyHistoriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutFamilyHistoriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutFamilyHistoriesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutFamilyHistoriesInput, Prisma.PatientUncheckedCreateWithoutFamilyHistoriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutFamilyHistoriesInput;
    upsert?: Prisma.PatientUpsertWithoutFamilyHistoriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutFamilyHistoriesInput, Prisma.PatientUpdateWithoutFamilyHistoriesInput>, Prisma.PatientUncheckedUpdateWithoutFamilyHistoriesInput>;
};
export type PatientCreateNestedOneWithoutSurgicalHistoriesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutSurgicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutSurgicalHistoriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutSurgicalHistoriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutSurgicalHistoriesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutSurgicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutSurgicalHistoriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutSurgicalHistoriesInput;
    upsert?: Prisma.PatientUpsertWithoutSurgicalHistoriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutSurgicalHistoriesInput, Prisma.PatientUpdateWithoutSurgicalHistoriesInput>, Prisma.PatientUncheckedUpdateWithoutSurgicalHistoriesInput>;
};
export type PatientCreateNestedOneWithoutLifestyleInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutLifestyleInput, Prisma.PatientUncheckedCreateWithoutLifestyleInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutLifestyleInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutLifestyleNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutLifestyleInput, Prisma.PatientUncheckedCreateWithoutLifestyleInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutLifestyleInput;
    upsert?: Prisma.PatientUpsertWithoutLifestyleInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutLifestyleInput, Prisma.PatientUpdateWithoutLifestyleInput>, Prisma.PatientUncheckedUpdateWithoutLifestyleInput>;
};
export type PatientCreateNestedOneWithoutAllergiesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAllergiesInput, Prisma.PatientUncheckedCreateWithoutAllergiesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAllergiesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutAllergiesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAllergiesInput, Prisma.PatientUncheckedCreateWithoutAllergiesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAllergiesInput;
    upsert?: Prisma.PatientUpsertWithoutAllergiesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutAllergiesInput, Prisma.PatientUpdateWithoutAllergiesInput>, Prisma.PatientUncheckedUpdateWithoutAllergiesInput>;
};
export type PatientCreateNestedOneWithoutPatientDoctorsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPatientDoctorsInput, Prisma.PatientUncheckedCreateWithoutPatientDoctorsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPatientDoctorsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutPatientDoctorsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPatientDoctorsInput, Prisma.PatientUncheckedCreateWithoutPatientDoctorsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPatientDoctorsInput;
    upsert?: Prisma.PatientUpsertWithoutPatientDoctorsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutPatientDoctorsInput, Prisma.PatientUpdateWithoutPatientDoctorsInput>, Prisma.PatientUncheckedUpdateWithoutPatientDoctorsInput>;
};
export type PatientCreateNestedOneWithoutConsultationsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutConsultationsInput, Prisma.PatientUncheckedCreateWithoutConsultationsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutConsultationsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutConsultationsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutConsultationsInput, Prisma.PatientUncheckedCreateWithoutConsultationsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutConsultationsInput;
    upsert?: Prisma.PatientUpsertWithoutConsultationsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutConsultationsInput, Prisma.PatientUpdateWithoutConsultationsInput>, Prisma.PatientUncheckedUpdateWithoutConsultationsInput>;
};
export type PatientCreateNestedOneWithoutAppointmentsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAppointmentsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAppointmentsInput;
    upsert?: Prisma.PatientUpsertWithoutAppointmentsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutAppointmentsInput, Prisma.PatientUpdateWithoutAppointmentsInput>, Prisma.PatientUncheckedUpdateWithoutAppointmentsInput>;
};
export type PatientCreateNestedOneWithoutPatientDiseasesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPatientDiseasesInput, Prisma.PatientUncheckedCreateWithoutPatientDiseasesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPatientDiseasesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutPatientDiseasesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPatientDiseasesInput, Prisma.PatientUncheckedCreateWithoutPatientDiseasesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPatientDiseasesInput;
    upsert?: Prisma.PatientUpsertWithoutPatientDiseasesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutPatientDiseasesInput, Prisma.PatientUpdateWithoutPatientDiseasesInput>, Prisma.PatientUncheckedUpdateWithoutPatientDiseasesInput>;
};
export type PatientCreateNestedOneWithoutPrescriptionsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPrescriptionsInput, Prisma.PatientUncheckedCreateWithoutPrescriptionsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPrescriptionsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutPrescriptionsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutPrescriptionsInput, Prisma.PatientUncheckedCreateWithoutPrescriptionsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutPrescriptionsInput;
    upsert?: Prisma.PatientUpsertWithoutPrescriptionsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutPrescriptionsInput, Prisma.PatientUpdateWithoutPrescriptionsInput>, Prisma.PatientUncheckedUpdateWithoutPrescriptionsInput>;
};
export type PatientCreateNestedOneWithoutMedicalReportsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutMedicalReportsInput, Prisma.PatientUncheckedCreateWithoutMedicalReportsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutMedicalReportsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutMedicalReportsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutMedicalReportsInput, Prisma.PatientUncheckedCreateWithoutMedicalReportsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutMedicalReportsInput;
    upsert?: Prisma.PatientUpsertWithoutMedicalReportsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutMedicalReportsInput, Prisma.PatientUpdateWithoutMedicalReportsInput>, Prisma.PatientUncheckedUpdateWithoutMedicalReportsInput>;
};
export type PatientCreateNestedOneWithoutShareLinksInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutShareLinksInput, Prisma.PatientUncheckedCreateWithoutShareLinksInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutShareLinksInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutShareLinksNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutShareLinksInput, Prisma.PatientUncheckedCreateWithoutShareLinksInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutShareLinksInput;
    upsert?: Prisma.PatientUpsertWithoutShareLinksInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutShareLinksInput, Prisma.PatientUpdateWithoutShareLinksInput>, Prisma.PatientUncheckedUpdateWithoutShareLinksInput>;
};
export type PatientCreateNestedOneWithoutAdverseReactionsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAdverseReactionsInput, Prisma.PatientUncheckedCreateWithoutAdverseReactionsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAdverseReactionsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneWithoutAdverseReactionsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAdverseReactionsInput, Prisma.PatientUncheckedCreateWithoutAdverseReactionsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAdverseReactionsInput;
    upsert?: Prisma.PatientUpsertWithoutAdverseReactionsInput;
    disconnect?: Prisma.PatientWhereInput | boolean;
    delete?: Prisma.PatientWhereInput | boolean;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutAdverseReactionsInput, Prisma.PatientUpdateWithoutAdverseReactionsInput>, Prisma.PatientUncheckedUpdateWithoutAdverseReactionsInput>;
};
export type PatientCreateNestedOneWithoutChildrenProfilesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutChildrenProfilesInput, Prisma.PatientUncheckedCreateWithoutChildrenProfilesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutChildrenProfilesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutChildrenProfilesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutChildrenProfilesInput, Prisma.PatientUncheckedCreateWithoutChildrenProfilesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutChildrenProfilesInput;
    upsert?: Prisma.PatientUpsertWithoutChildrenProfilesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutChildrenProfilesInput, Prisma.PatientUpdateWithoutChildrenProfilesInput>, Prisma.PatientUncheckedUpdateWithoutChildrenProfilesInput>;
};
export type PatientCreateNestedOneWithoutRatingsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutRatingsInput, Prisma.PatientUncheckedCreateWithoutRatingsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutRatingsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutRatingsInput, Prisma.PatientUncheckedCreateWithoutRatingsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutRatingsInput;
    upsert?: Prisma.PatientUpsertWithoutRatingsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutRatingsInput, Prisma.PatientUpdateWithoutRatingsInput>, Prisma.PatientUncheckedUpdateWithoutRatingsInput>;
};
export type PatientCreateNestedOneWithoutVisitsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutVisitsInput, Prisma.PatientUncheckedCreateWithoutVisitsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutVisitsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutVisitsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutVisitsInput, Prisma.PatientUncheckedCreateWithoutVisitsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutVisitsInput;
    upsert?: Prisma.PatientUpsertWithoutVisitsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutVisitsInput, Prisma.PatientUpdateWithoutVisitsInput>, Prisma.PatientUncheckedUpdateWithoutVisitsInput>;
};
export type PatientCreateNestedOneWithoutMedicinesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutMedicinesInput, Prisma.PatientUncheckedCreateWithoutMedicinesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutMedicinesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutMedicinesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutMedicinesInput, Prisma.PatientUncheckedCreateWithoutMedicinesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutMedicinesInput;
    upsert?: Prisma.PatientUpsertWithoutMedicinesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutMedicinesInput, Prisma.PatientUpdateWithoutMedicinesInput>, Prisma.PatientUncheckedUpdateWithoutMedicinesInput>;
};
export type PatientCreateWithoutUserInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutUserInput = {
    id?: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutUserInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutUserInput, Prisma.PatientUncheckedCreateWithoutUserInput>;
};
export type PatientUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutUserInput, Prisma.PatientUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutUserInput, Prisma.PatientUncheckedCreateWithoutUserInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutUserInput, Prisma.PatientUncheckedUpdateWithoutUserInput>;
};
export type PatientUpdateWithoutUserInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutMedicalHistoriesInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutMedicalHistoriesInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutMedicalHistoriesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutMedicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutMedicalHistoriesInput>;
};
export type PatientUpsertWithoutMedicalHistoriesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutMedicalHistoriesInput, Prisma.PatientUncheckedUpdateWithoutMedicalHistoriesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutMedicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutMedicalHistoriesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutMedicalHistoriesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutMedicalHistoriesInput, Prisma.PatientUncheckedUpdateWithoutMedicalHistoriesInput>;
};
export type PatientUpdateWithoutMedicalHistoriesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutMedicalHistoriesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutFamilyHistoriesInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutFamilyHistoriesInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutFamilyHistoriesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutFamilyHistoriesInput, Prisma.PatientUncheckedCreateWithoutFamilyHistoriesInput>;
};
export type PatientUpsertWithoutFamilyHistoriesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutFamilyHistoriesInput, Prisma.PatientUncheckedUpdateWithoutFamilyHistoriesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutFamilyHistoriesInput, Prisma.PatientUncheckedCreateWithoutFamilyHistoriesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutFamilyHistoriesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutFamilyHistoriesInput, Prisma.PatientUncheckedUpdateWithoutFamilyHistoriesInput>;
};
export type PatientUpdateWithoutFamilyHistoriesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutFamilyHistoriesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutSurgicalHistoriesInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutSurgicalHistoriesInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutSurgicalHistoriesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutSurgicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutSurgicalHistoriesInput>;
};
export type PatientUpsertWithoutSurgicalHistoriesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutSurgicalHistoriesInput, Prisma.PatientUncheckedUpdateWithoutSurgicalHistoriesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutSurgicalHistoriesInput, Prisma.PatientUncheckedCreateWithoutSurgicalHistoriesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutSurgicalHistoriesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutSurgicalHistoriesInput, Prisma.PatientUncheckedUpdateWithoutSurgicalHistoriesInput>;
};
export type PatientUpdateWithoutSurgicalHistoriesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutSurgicalHistoriesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutLifestyleInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutLifestyleInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutLifestyleInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutLifestyleInput, Prisma.PatientUncheckedCreateWithoutLifestyleInput>;
};
export type PatientUpsertWithoutLifestyleInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutLifestyleInput, Prisma.PatientUncheckedUpdateWithoutLifestyleInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutLifestyleInput, Prisma.PatientUncheckedCreateWithoutLifestyleInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutLifestyleInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutLifestyleInput, Prisma.PatientUncheckedUpdateWithoutLifestyleInput>;
};
export type PatientUpdateWithoutLifestyleInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutLifestyleInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutAllergiesInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutAllergiesInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutAllergiesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAllergiesInput, Prisma.PatientUncheckedCreateWithoutAllergiesInput>;
};
export type PatientUpsertWithoutAllergiesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutAllergiesInput, Prisma.PatientUncheckedUpdateWithoutAllergiesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAllergiesInput, Prisma.PatientUncheckedCreateWithoutAllergiesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutAllergiesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutAllergiesInput, Prisma.PatientUncheckedUpdateWithoutAllergiesInput>;
};
export type PatientUpdateWithoutAllergiesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutAllergiesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutPatientDoctorsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutPatientDoctorsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutPatientDoctorsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPatientDoctorsInput, Prisma.PatientUncheckedCreateWithoutPatientDoctorsInput>;
};
export type PatientUpsertWithoutPatientDoctorsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutPatientDoctorsInput, Prisma.PatientUncheckedUpdateWithoutPatientDoctorsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPatientDoctorsInput, Prisma.PatientUncheckedCreateWithoutPatientDoctorsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutPatientDoctorsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutPatientDoctorsInput, Prisma.PatientUncheckedUpdateWithoutPatientDoctorsInput>;
};
export type PatientUpdateWithoutPatientDoctorsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutPatientDoctorsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutConsultationsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutConsultationsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutConsultationsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutConsultationsInput, Prisma.PatientUncheckedCreateWithoutConsultationsInput>;
};
export type PatientUpsertWithoutConsultationsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutConsultationsInput, Prisma.PatientUncheckedUpdateWithoutConsultationsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutConsultationsInput, Prisma.PatientUncheckedCreateWithoutConsultationsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutConsultationsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutConsultationsInput, Prisma.PatientUncheckedUpdateWithoutConsultationsInput>;
};
export type PatientUpdateWithoutConsultationsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutConsultationsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutAppointmentsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutAppointmentsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutAppointmentsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
};
export type PatientUpsertWithoutAppointmentsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutAppointmentsInput, Prisma.PatientUncheckedUpdateWithoutAppointmentsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutAppointmentsInput, Prisma.PatientUncheckedUpdateWithoutAppointmentsInput>;
};
export type PatientUpdateWithoutAppointmentsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutAppointmentsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutPatientDiseasesInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutPatientDiseasesInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutPatientDiseasesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPatientDiseasesInput, Prisma.PatientUncheckedCreateWithoutPatientDiseasesInput>;
};
export type PatientUpsertWithoutPatientDiseasesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutPatientDiseasesInput, Prisma.PatientUncheckedUpdateWithoutPatientDiseasesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPatientDiseasesInput, Prisma.PatientUncheckedCreateWithoutPatientDiseasesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutPatientDiseasesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutPatientDiseasesInput, Prisma.PatientUncheckedUpdateWithoutPatientDiseasesInput>;
};
export type PatientUpdateWithoutPatientDiseasesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutPatientDiseasesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutPrescriptionsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutPrescriptionsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutPrescriptionsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPrescriptionsInput, Prisma.PatientUncheckedCreateWithoutPrescriptionsInput>;
};
export type PatientUpsertWithoutPrescriptionsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutPrescriptionsInput, Prisma.PatientUncheckedUpdateWithoutPrescriptionsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutPrescriptionsInput, Prisma.PatientUncheckedCreateWithoutPrescriptionsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutPrescriptionsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutPrescriptionsInput, Prisma.PatientUncheckedUpdateWithoutPrescriptionsInput>;
};
export type PatientUpdateWithoutPrescriptionsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutPrescriptionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutMedicalReportsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutMedicalReportsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutMedicalReportsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutMedicalReportsInput, Prisma.PatientUncheckedCreateWithoutMedicalReportsInput>;
};
export type PatientUpsertWithoutMedicalReportsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutMedicalReportsInput, Prisma.PatientUncheckedUpdateWithoutMedicalReportsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutMedicalReportsInput, Prisma.PatientUncheckedCreateWithoutMedicalReportsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutMedicalReportsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutMedicalReportsInput, Prisma.PatientUncheckedUpdateWithoutMedicalReportsInput>;
};
export type PatientUpdateWithoutMedicalReportsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutMedicalReportsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutShareLinksInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutShareLinksInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutShareLinksInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutShareLinksInput, Prisma.PatientUncheckedCreateWithoutShareLinksInput>;
};
export type PatientUpsertWithoutShareLinksInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutShareLinksInput, Prisma.PatientUncheckedUpdateWithoutShareLinksInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutShareLinksInput, Prisma.PatientUncheckedCreateWithoutShareLinksInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutShareLinksInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutShareLinksInput, Prisma.PatientUncheckedUpdateWithoutShareLinksInput>;
};
export type PatientUpdateWithoutShareLinksInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutShareLinksInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutAdverseReactionsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutAdverseReactionsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutAdverseReactionsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAdverseReactionsInput, Prisma.PatientUncheckedCreateWithoutAdverseReactionsInput>;
};
export type PatientUpsertWithoutAdverseReactionsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutAdverseReactionsInput, Prisma.PatientUncheckedUpdateWithoutAdverseReactionsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAdverseReactionsInput, Prisma.PatientUncheckedCreateWithoutAdverseReactionsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutAdverseReactionsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutAdverseReactionsInput, Prisma.PatientUncheckedUpdateWithoutAdverseReactionsInput>;
};
export type PatientUpdateWithoutAdverseReactionsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutAdverseReactionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutChildrenProfilesInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutChildrenProfilesInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutChildrenProfilesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutChildrenProfilesInput, Prisma.PatientUncheckedCreateWithoutChildrenProfilesInput>;
};
export type PatientUpsertWithoutChildrenProfilesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutChildrenProfilesInput, Prisma.PatientUncheckedUpdateWithoutChildrenProfilesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutChildrenProfilesInput, Prisma.PatientUncheckedCreateWithoutChildrenProfilesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutChildrenProfilesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutChildrenProfilesInput, Prisma.PatientUncheckedUpdateWithoutChildrenProfilesInput>;
};
export type PatientUpdateWithoutChildrenProfilesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutChildrenProfilesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutRatingsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutRatingsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutRatingsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutRatingsInput, Prisma.PatientUncheckedCreateWithoutRatingsInput>;
};
export type PatientUpsertWithoutRatingsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutRatingsInput, Prisma.PatientUncheckedUpdateWithoutRatingsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutRatingsInput, Prisma.PatientUncheckedCreateWithoutRatingsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutRatingsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutRatingsInput, Prisma.PatientUncheckedUpdateWithoutRatingsInput>;
};
export type PatientUpdateWithoutRatingsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutRatingsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutVisitsInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutVisitsInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    medicines?: Prisma.PatientMedicineUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutVisitsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutVisitsInput, Prisma.PatientUncheckedCreateWithoutVisitsInput>;
};
export type PatientUpsertWithoutVisitsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutVisitsInput, Prisma.PatientUncheckedUpdateWithoutVisitsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutVisitsInput, Prisma.PatientUncheckedCreateWithoutVisitsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutVisitsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutVisitsInput, Prisma.PatientUncheckedUpdateWithoutVisitsInput>;
};
export type PatientUpdateWithoutVisitsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutVisitsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    medicines?: Prisma.PatientMedicineUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutMedicinesInput = {
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutPatientInput;
    prescriptions?: Prisma.PrescriptionCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutMedicinesInput = {
    id?: number;
    userId: number;
    name: string;
    age: number;
    ageClassification: $Enums.AgeClassification;
    dateOfBirth?: Date | string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender: $Enums.Gender;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean | null;
    trimester?: number | null;
    lactation?: boolean;
    bloodType?: string | null;
    profileCompleteness?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedCreateNestedManyWithoutPatientInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedCreateNestedManyWithoutPatientInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedCreateNestedManyWithoutPatientInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedCreateNestedManyWithoutPatientInput;
    lifestyle?: Prisma.LifestyleUncheckedCreateNestedOneWithoutPatientInput;
    allergies?: Prisma.AllergyUncheckedCreateNestedManyWithoutPatientInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedCreateNestedManyWithoutPatientInput;
    consultations?: Prisma.ConsultationUncheckedCreateNestedManyWithoutPatientInput;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    medicalReports?: Prisma.MedicalReportUncheckedCreateNestedManyWithoutPatientInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedCreateNestedManyWithoutPatientInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedCreateNestedManyWithoutPatientInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedCreateNestedManyWithoutParentInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutPatientInput;
    visits?: Prisma.VisitUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutMedicinesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutMedicinesInput, Prisma.PatientUncheckedCreateWithoutMedicinesInput>;
};
export type PatientUpsertWithoutMedicinesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutMedicinesInput, Prisma.PatientUncheckedUpdateWithoutMedicinesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutMedicinesInput, Prisma.PatientUncheckedCreateWithoutMedicinesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutMedicinesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutMedicinesInput, Prisma.PatientUncheckedUpdateWithoutMedicinesInput>;
};
export type PatientUpdateWithoutMedicinesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutPatientNestedInput;
    prescriptions?: Prisma.PrescriptionUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutMedicinesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    ageClassification?: Prisma.EnumAgeClassificationFieldUpdateOperationsInput | $Enums.AgeClassification;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    smoking?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyWarning?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pregnancyStatus?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    trimester?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lactation?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bloodType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileCompleteness?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    prescriptions?: Prisma.PrescriptionUncheckedUpdateManyWithoutPatientNestedInput;
    patientDiseases?: Prisma.PatientDiseaseUncheckedUpdateManyWithoutPatientNestedInput;
    medicalHistories?: Prisma.MedicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    familyHistories?: Prisma.FamilyHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    surgicalHistories?: Prisma.SurgicalHistoryUncheckedUpdateManyWithoutPatientNestedInput;
    lifestyle?: Prisma.LifestyleUncheckedUpdateOneWithoutPatientNestedInput;
    allergies?: Prisma.AllergyUncheckedUpdateManyWithoutPatientNestedInput;
    patientDoctors?: Prisma.PatientDoctorUncheckedUpdateManyWithoutPatientNestedInput;
    consultations?: Prisma.ConsultationUncheckedUpdateManyWithoutPatientNestedInput;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    medicalReports?: Prisma.MedicalReportUncheckedUpdateManyWithoutPatientNestedInput;
    shareLinks?: Prisma.PatientShareLinkUncheckedUpdateManyWithoutPatientNestedInput;
    adverseReactions?: Prisma.AdverseDrugReactionUncheckedUpdateManyWithoutPatientNestedInput;
    childrenProfiles?: Prisma.ChildProfileUncheckedUpdateManyWithoutParentNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutPatientNestedInput;
    visits?: Prisma.VisitUncheckedUpdateManyWithoutPatientNestedInput;
};
/**
 * Count Type PatientCountOutputType
 */
export type PatientCountOutputType = {
    prescriptions: number;
    patientDiseases: number;
    medicalHistories: number;
    familyHistories: number;
    surgicalHistories: number;
    allergies: number;
    patientDoctors: number;
    consultations: number;
    appointments: number;
    medicalReports: number;
    shareLinks: number;
    adverseReactions: number;
    childrenProfiles: number;
    ratings: number;
    visits: number;
    medicines: number;
};
export type PatientCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prescriptions?: boolean | PatientCountOutputTypeCountPrescriptionsArgs;
    patientDiseases?: boolean | PatientCountOutputTypeCountPatientDiseasesArgs;
    medicalHistories?: boolean | PatientCountOutputTypeCountMedicalHistoriesArgs;
    familyHistories?: boolean | PatientCountOutputTypeCountFamilyHistoriesArgs;
    surgicalHistories?: boolean | PatientCountOutputTypeCountSurgicalHistoriesArgs;
    allergies?: boolean | PatientCountOutputTypeCountAllergiesArgs;
    patientDoctors?: boolean | PatientCountOutputTypeCountPatientDoctorsArgs;
    consultations?: boolean | PatientCountOutputTypeCountConsultationsArgs;
    appointments?: boolean | PatientCountOutputTypeCountAppointmentsArgs;
    medicalReports?: boolean | PatientCountOutputTypeCountMedicalReportsArgs;
    shareLinks?: boolean | PatientCountOutputTypeCountShareLinksArgs;
    adverseReactions?: boolean | PatientCountOutputTypeCountAdverseReactionsArgs;
    childrenProfiles?: boolean | PatientCountOutputTypeCountChildrenProfilesArgs;
    ratings?: boolean | PatientCountOutputTypeCountRatingsArgs;
    visits?: boolean | PatientCountOutputTypeCountVisitsArgs;
    medicines?: boolean | PatientCountOutputTypeCountMedicinesArgs;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: Prisma.PatientCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountPrescriptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrescriptionWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountPatientDiseasesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientDiseaseWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountMedicalHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicalHistoryWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountFamilyHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FamilyHistoryWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountSurgicalHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SurgicalHistoryWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountAllergiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AllergyWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountPatientDoctorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientDoctorWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountConsultationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsultationWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountMedicalReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MedicalReportWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountShareLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientShareLinkWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountAdverseReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdverseDrugReactionWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountChildrenProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChildProfileWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountRatingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountVisitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisitWhereInput;
};
/**
 * PatientCountOutputType without action
 */
export type PatientCountOutputTypeCountMedicinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientMedicineWhereInput;
};
export type PatientSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    age?: boolean;
    ageClassification?: boolean;
    dateOfBirth?: boolean;
    weight?: boolean;
    height?: boolean;
    gender?: boolean;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean;
    trimester?: boolean;
    lactation?: boolean;
    bloodType?: boolean;
    profileCompleteness?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    prescriptions?: boolean | Prisma.Patient$prescriptionsArgs<ExtArgs>;
    patientDiseases?: boolean | Prisma.Patient$patientDiseasesArgs<ExtArgs>;
    medicalHistories?: boolean | Prisma.Patient$medicalHistoriesArgs<ExtArgs>;
    familyHistories?: boolean | Prisma.Patient$familyHistoriesArgs<ExtArgs>;
    surgicalHistories?: boolean | Prisma.Patient$surgicalHistoriesArgs<ExtArgs>;
    lifestyle?: boolean | Prisma.Patient$lifestyleArgs<ExtArgs>;
    allergies?: boolean | Prisma.Patient$allergiesArgs<ExtArgs>;
    patientDoctors?: boolean | Prisma.Patient$patientDoctorsArgs<ExtArgs>;
    consultations?: boolean | Prisma.Patient$consultationsArgs<ExtArgs>;
    appointments?: boolean | Prisma.Patient$appointmentsArgs<ExtArgs>;
    medicalReports?: boolean | Prisma.Patient$medicalReportsArgs<ExtArgs>;
    shareLinks?: boolean | Prisma.Patient$shareLinksArgs<ExtArgs>;
    adverseReactions?: boolean | Prisma.Patient$adverseReactionsArgs<ExtArgs>;
    childrenProfiles?: boolean | Prisma.Patient$childrenProfilesArgs<ExtArgs>;
    ratings?: boolean | Prisma.Patient$ratingsArgs<ExtArgs>;
    visits?: boolean | Prisma.Patient$visitsArgs<ExtArgs>;
    medicines?: boolean | Prisma.Patient$medicinesArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    age?: boolean;
    ageClassification?: boolean;
    dateOfBirth?: boolean;
    weight?: boolean;
    height?: boolean;
    gender?: boolean;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean;
    trimester?: boolean;
    lactation?: boolean;
    bloodType?: boolean;
    profileCompleteness?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    age?: boolean;
    ageClassification?: boolean;
    dateOfBirth?: boolean;
    weight?: boolean;
    height?: boolean;
    gender?: boolean;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean;
    trimester?: boolean;
    lactation?: boolean;
    bloodType?: boolean;
    profileCompleteness?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    age?: boolean;
    ageClassification?: boolean;
    dateOfBirth?: boolean;
    weight?: boolean;
    height?: boolean;
    gender?: boolean;
    smoking?: boolean;
    pregnancyWarning?: boolean;
    pregnancyStatus?: boolean;
    trimester?: boolean;
    lactation?: boolean;
    bloodType?: boolean;
    profileCompleteness?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type PatientOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "age" | "ageClassification" | "dateOfBirth" | "weight" | "height" | "gender" | "smoking" | "pregnancyWarning" | "pregnancyStatus" | "trimester" | "lactation" | "bloodType" | "profileCompleteness" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["patient"]>;
export type PatientInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    prescriptions?: boolean | Prisma.Patient$prescriptionsArgs<ExtArgs>;
    patientDiseases?: boolean | Prisma.Patient$patientDiseasesArgs<ExtArgs>;
    medicalHistories?: boolean | Prisma.Patient$medicalHistoriesArgs<ExtArgs>;
    familyHistories?: boolean | Prisma.Patient$familyHistoriesArgs<ExtArgs>;
    surgicalHistories?: boolean | Prisma.Patient$surgicalHistoriesArgs<ExtArgs>;
    lifestyle?: boolean | Prisma.Patient$lifestyleArgs<ExtArgs>;
    allergies?: boolean | Prisma.Patient$allergiesArgs<ExtArgs>;
    patientDoctors?: boolean | Prisma.Patient$patientDoctorsArgs<ExtArgs>;
    consultations?: boolean | Prisma.Patient$consultationsArgs<ExtArgs>;
    appointments?: boolean | Prisma.Patient$appointmentsArgs<ExtArgs>;
    medicalReports?: boolean | Prisma.Patient$medicalReportsArgs<ExtArgs>;
    shareLinks?: boolean | Prisma.Patient$shareLinksArgs<ExtArgs>;
    adverseReactions?: boolean | Prisma.Patient$adverseReactionsArgs<ExtArgs>;
    childrenProfiles?: boolean | Prisma.Patient$childrenProfilesArgs<ExtArgs>;
    ratings?: boolean | Prisma.Patient$ratingsArgs<ExtArgs>;
    visits?: boolean | Prisma.Patient$visitsArgs<ExtArgs>;
    medicines?: boolean | Prisma.Patient$medicinesArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PatientIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PatientIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PatientPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Patient";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        prescriptions: Prisma.$PrescriptionPayload<ExtArgs>[];
        patientDiseases: Prisma.$PatientDiseasePayload<ExtArgs>[];
        medicalHistories: Prisma.$MedicalHistoryPayload<ExtArgs>[];
        familyHistories: Prisma.$FamilyHistoryPayload<ExtArgs>[];
        surgicalHistories: Prisma.$SurgicalHistoryPayload<ExtArgs>[];
        lifestyle: Prisma.$LifestylePayload<ExtArgs> | null;
        allergies: Prisma.$AllergyPayload<ExtArgs>[];
        patientDoctors: Prisma.$PatientDoctorPayload<ExtArgs>[];
        consultations: Prisma.$ConsultationPayload<ExtArgs>[];
        appointments: Prisma.$AppointmentPayload<ExtArgs>[];
        medicalReports: Prisma.$MedicalReportPayload<ExtArgs>[];
        shareLinks: Prisma.$PatientShareLinkPayload<ExtArgs>[];
        adverseReactions: Prisma.$AdverseDrugReactionPayload<ExtArgs>[];
        childrenProfiles: Prisma.$ChildProfilePayload<ExtArgs>[];
        ratings: Prisma.$RatingPayload<ExtArgs>[];
        visits: Prisma.$VisitPayload<ExtArgs>[];
        medicines: Prisma.$PatientMedicinePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        name: string;
        age: number;
        ageClassification: $Enums.AgeClassification;
        dateOfBirth: Date | null;
        weight: runtime.Decimal | null;
        height: runtime.Decimal | null;
        gender: $Enums.Gender;
        smoking: boolean;
        pregnancyWarning: boolean;
        pregnancyStatus: boolean | null;
        trimester: number | null;
        lactation: boolean;
        bloodType: string | null;
        profileCompleteness: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["patient"]>;
    composites: {};
};
export type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientPayload, S>;
export type PatientCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientCountAggregateInputType | true;
};
export interface PatientDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Patient'];
        meta: {
            name: 'Patient';
        };
    };
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     *
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PatientFindManyArgs>(args?: Prisma.SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     *
     */
    create<T extends PatientCreateArgs>(args: Prisma.SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PatientCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     *
     */
    delete<T extends PatientDeleteArgs>(args: Prisma.SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PatientUpdateArgs>(args: Prisma.SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PatientUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: Prisma.SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(args?: Prisma.Subset<T, PatientCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientAggregateArgs>(args: Prisma.Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>;
    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PatientGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Patient model
     */
    readonly fields: PatientFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Patient.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PatientClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    prescriptions<T extends Prisma.Patient$prescriptionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$prescriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    patientDiseases<T extends Prisma.Patient$patientDiseasesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$patientDiseasesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientDiseasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    medicalHistories<T extends Prisma.Patient$medicalHistoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$medicalHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicalHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    familyHistories<T extends Prisma.Patient$familyHistoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$familyHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FamilyHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    surgicalHistories<T extends Prisma.Patient$surgicalHistoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$surgicalHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SurgicalHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    lifestyle<T extends Prisma.Patient$lifestyleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$lifestyleArgs<ExtArgs>>): Prisma.Prisma__LifestyleClient<runtime.Types.Result.GetResult<Prisma.$LifestylePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    allergies<T extends Prisma.Patient$allergiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$allergiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AllergyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    patientDoctors<T extends Prisma.Patient$patientDoctorsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$patientDoctorsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientDoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    consultations<T extends Prisma.Patient$consultationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$consultationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    appointments<T extends Prisma.Patient$appointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    medicalReports<T extends Prisma.Patient$medicalReportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$medicalReportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MedicalReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    shareLinks<T extends Prisma.Patient$shareLinksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$shareLinksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientShareLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    adverseReactions<T extends Prisma.Patient$adverseReactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$adverseReactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdverseDrugReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    childrenProfiles<T extends Prisma.Patient$childrenProfilesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$childrenProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChildProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ratings<T extends Prisma.Patient$ratingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    visits<T extends Prisma.Patient$visitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    medicines<T extends Prisma.Patient$medicinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$medicinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientMedicinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Patient model
 */
export interface PatientFieldRefs {
    readonly id: Prisma.FieldRef<"Patient", 'Int'>;
    readonly userId: Prisma.FieldRef<"Patient", 'Int'>;
    readonly name: Prisma.FieldRef<"Patient", 'String'>;
    readonly age: Prisma.FieldRef<"Patient", 'Int'>;
    readonly ageClassification: Prisma.FieldRef<"Patient", 'AgeClassification'>;
    readonly dateOfBirth: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly weight: Prisma.FieldRef<"Patient", 'Decimal'>;
    readonly height: Prisma.FieldRef<"Patient", 'Decimal'>;
    readonly gender: Prisma.FieldRef<"Patient", 'Gender'>;
    readonly smoking: Prisma.FieldRef<"Patient", 'Boolean'>;
    readonly pregnancyWarning: Prisma.FieldRef<"Patient", 'Boolean'>;
    readonly pregnancyStatus: Prisma.FieldRef<"Patient", 'Boolean'>;
    readonly trimester: Prisma.FieldRef<"Patient", 'Int'>;
    readonly lactation: Prisma.FieldRef<"Patient", 'Boolean'>;
    readonly bloodType: Prisma.FieldRef<"Patient", 'String'>;
    readonly profileCompleteness: Prisma.FieldRef<"Patient", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Patient", 'DateTime'>;
}
/**
 * Patient findUnique
 */
export type PatientFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Patient to fetch.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient findUniqueOrThrow
 */
export type PatientFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Patient to fetch.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient findFirst
 */
export type PatientFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Patient to fetch.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Patients.
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Patients.
     */
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
/**
 * Patient findFirstOrThrow
 */
export type PatientFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Patient to fetch.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Patients.
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Patients.
     */
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
/**
 * Patient findMany
 */
export type PatientFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Patients to fetch.
     */
    where?: Prisma.PatientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Patients to fetch.
     */
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Patients.
     */
    cursor?: Prisma.PatientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Patients.
     */
    skip?: number;
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
/**
 * Patient create
 */
export type PatientCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Patient.
     */
    data: Prisma.XOR<Prisma.PatientCreateInput, Prisma.PatientUncheckedCreateInput>;
};
/**
 * Patient createMany
 */
export type PatientCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: Prisma.PatientCreateManyInput | Prisma.PatientCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Patient createManyAndReturn
 */
export type PatientCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * The data used to create many Patients.
     */
    data: Prisma.PatientCreateManyInput | Prisma.PatientCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Patient update
 */
export type PatientUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Patient.
     */
    data: Prisma.XOR<Prisma.PatientUpdateInput, Prisma.PatientUncheckedUpdateInput>;
    /**
     * Choose, which Patient to update.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient updateMany
 */
export type PatientUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: Prisma.XOR<Prisma.PatientUpdateManyMutationInput, Prisma.PatientUncheckedUpdateManyInput>;
    /**
     * Filter which Patients to update
     */
    where?: Prisma.PatientWhereInput;
    /**
     * Limit how many Patients to update.
     */
    limit?: number;
};
/**
 * Patient updateManyAndReturn
 */
export type PatientUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: Prisma.PatientSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Patient
     */
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    /**
     * The data used to update Patients.
     */
    data: Prisma.XOR<Prisma.PatientUpdateManyMutationInput, Prisma.PatientUncheckedUpdateManyInput>;
    /**
     * Filter which Patients to update
     */
    where?: Prisma.PatientWhereInput;
    /**
     * Limit how many Patients to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Patient upsert
 */
export type PatientUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: Prisma.PatientWhereUniqueInput;
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: Prisma.XOR<Prisma.PatientCreateInput, Prisma.PatientUncheckedCreateInput>;
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PatientUpdateInput, Prisma.PatientUncheckedUpdateInput>;
};
/**
 * Patient delete
 */
export type PatientDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Patient to delete.
     */
    where: Prisma.PatientWhereUniqueInput;
};
/**
 * Patient deleteMany
 */
export type PatientDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: Prisma.PatientWhereInput;
    /**
     * Limit how many Patients to delete.
     */
    limit?: number;
};
/**
 * Patient.prescriptions
 */
export type Patient$prescriptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: Prisma.PrescriptionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Prescription
     */
    omit?: Prisma.PrescriptionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PrescriptionInclude<ExtArgs> | null;
    where?: Prisma.PrescriptionWhereInput;
    orderBy?: Prisma.PrescriptionOrderByWithRelationInput | Prisma.PrescriptionOrderByWithRelationInput[];
    cursor?: Prisma.PrescriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrescriptionScalarFieldEnum | Prisma.PrescriptionScalarFieldEnum[];
};
/**
 * Patient.patientDiseases
 */
export type Patient$patientDiseasesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.PatientDiseaseWhereInput;
    orderBy?: Prisma.PatientDiseaseOrderByWithRelationInput | Prisma.PatientDiseaseOrderByWithRelationInput[];
    cursor?: Prisma.PatientDiseaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientDiseaseScalarFieldEnum | Prisma.PatientDiseaseScalarFieldEnum[];
};
/**
 * Patient.medicalHistories
 */
export type Patient$medicalHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalHistory
     */
    select?: Prisma.MedicalHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MedicalHistory
     */
    omit?: Prisma.MedicalHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MedicalHistoryInclude<ExtArgs> | null;
    where?: Prisma.MedicalHistoryWhereInput;
    orderBy?: Prisma.MedicalHistoryOrderByWithRelationInput | Prisma.MedicalHistoryOrderByWithRelationInput[];
    cursor?: Prisma.MedicalHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MedicalHistoryScalarFieldEnum | Prisma.MedicalHistoryScalarFieldEnum[];
};
/**
 * Patient.familyHistories
 */
export type Patient$familyHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyHistory
     */
    select?: Prisma.FamilyHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FamilyHistory
     */
    omit?: Prisma.FamilyHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FamilyHistoryInclude<ExtArgs> | null;
    where?: Prisma.FamilyHistoryWhereInput;
    orderBy?: Prisma.FamilyHistoryOrderByWithRelationInput | Prisma.FamilyHistoryOrderByWithRelationInput[];
    cursor?: Prisma.FamilyHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FamilyHistoryScalarFieldEnum | Prisma.FamilyHistoryScalarFieldEnum[];
};
/**
 * Patient.surgicalHistories
 */
export type Patient$surgicalHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurgicalHistory
     */
    select?: Prisma.SurgicalHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SurgicalHistory
     */
    omit?: Prisma.SurgicalHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SurgicalHistoryInclude<ExtArgs> | null;
    where?: Prisma.SurgicalHistoryWhereInput;
    orderBy?: Prisma.SurgicalHistoryOrderByWithRelationInput | Prisma.SurgicalHistoryOrderByWithRelationInput[];
    cursor?: Prisma.SurgicalHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SurgicalHistoryScalarFieldEnum | Prisma.SurgicalHistoryScalarFieldEnum[];
};
/**
 * Patient.lifestyle
 */
export type Patient$lifestyleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lifestyle
     */
    select?: Prisma.LifestyleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Lifestyle
     */
    omit?: Prisma.LifestyleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LifestyleInclude<ExtArgs> | null;
    where?: Prisma.LifestyleWhereInput;
};
/**
 * Patient.allergies
 */
export type Patient$allergiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allergy
     */
    select?: Prisma.AllergySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Allergy
     */
    omit?: Prisma.AllergyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AllergyInclude<ExtArgs> | null;
    where?: Prisma.AllergyWhereInput;
    orderBy?: Prisma.AllergyOrderByWithRelationInput | Prisma.AllergyOrderByWithRelationInput[];
    cursor?: Prisma.AllergyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AllergyScalarFieldEnum | Prisma.AllergyScalarFieldEnum[];
};
/**
 * Patient.patientDoctors
 */
export type Patient$patientDoctorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientDoctor
     */
    select?: Prisma.PatientDoctorSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PatientDoctor
     */
    omit?: Prisma.PatientDoctorOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PatientDoctorInclude<ExtArgs> | null;
    where?: Prisma.PatientDoctorWhereInput;
    orderBy?: Prisma.PatientDoctorOrderByWithRelationInput | Prisma.PatientDoctorOrderByWithRelationInput[];
    cursor?: Prisma.PatientDoctorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientDoctorScalarFieldEnum | Prisma.PatientDoctorScalarFieldEnum[];
};
/**
 * Patient.consultations
 */
export type Patient$consultationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: Prisma.ConsultationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Consultation
     */
    omit?: Prisma.ConsultationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConsultationInclude<ExtArgs> | null;
    where?: Prisma.ConsultationWhereInput;
    orderBy?: Prisma.ConsultationOrderByWithRelationInput | Prisma.ConsultationOrderByWithRelationInput[];
    cursor?: Prisma.ConsultationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsultationScalarFieldEnum | Prisma.ConsultationScalarFieldEnum[];
};
/**
 * Patient.appointments
 */
export type Patient$appointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Appointment
     */
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
/**
 * Patient.medicalReports
 */
export type Patient$medicalReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Patient.shareLinks
 */
export type Patient$shareLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.PatientShareLinkWhereInput;
    orderBy?: Prisma.PatientShareLinkOrderByWithRelationInput | Prisma.PatientShareLinkOrderByWithRelationInput[];
    cursor?: Prisma.PatientShareLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientShareLinkScalarFieldEnum | Prisma.PatientShareLinkScalarFieldEnum[];
};
/**
 * Patient.adverseReactions
 */
export type Patient$adverseReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdverseDrugReaction
     */
    select?: Prisma.AdverseDrugReactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AdverseDrugReaction
     */
    omit?: Prisma.AdverseDrugReactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AdverseDrugReactionInclude<ExtArgs> | null;
    where?: Prisma.AdverseDrugReactionWhereInput;
    orderBy?: Prisma.AdverseDrugReactionOrderByWithRelationInput | Prisma.AdverseDrugReactionOrderByWithRelationInput[];
    cursor?: Prisma.AdverseDrugReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdverseDrugReactionScalarFieldEnum | Prisma.AdverseDrugReactionScalarFieldEnum[];
};
/**
 * Patient.childrenProfiles
 */
export type Patient$childrenProfilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChildProfile
     */
    select?: Prisma.ChildProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChildProfile
     */
    omit?: Prisma.ChildProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChildProfileInclude<ExtArgs> | null;
    where?: Prisma.ChildProfileWhereInput;
    orderBy?: Prisma.ChildProfileOrderByWithRelationInput | Prisma.ChildProfileOrderByWithRelationInput[];
    cursor?: Prisma.ChildProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChildProfileScalarFieldEnum | Prisma.ChildProfileScalarFieldEnum[];
};
/**
 * Patient.ratings
 */
export type Patient$ratingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Patient.visits
 */
export type Patient$visitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visit
     */
    select?: Prisma.VisitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Visit
     */
    omit?: Prisma.VisitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisitInclude<ExtArgs> | null;
    where?: Prisma.VisitWhereInput;
    orderBy?: Prisma.VisitOrderByWithRelationInput | Prisma.VisitOrderByWithRelationInput[];
    cursor?: Prisma.VisitWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VisitScalarFieldEnum | Prisma.VisitScalarFieldEnum[];
};
/**
 * Patient.medicines
 */
export type Patient$medicinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Patient without action
 */
export type PatientDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Patient.d.ts.map