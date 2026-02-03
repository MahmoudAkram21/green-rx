"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = __importDefault(require("exceljs"));
const prisma_1 = require("../lib/prisma");
class ExportController {
    // Helper to format JSON array/object fields
    formatField(value) {
        if (value === null || value === undefined || value === '') {
            return '';
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }
    // Export Active Substances to Excel
    async exportActiveSubstances(req, res, next) {
        try {
            const activeSubstances = await prisma_1.prisma.activeSubstance.findMany({
                orderBy: { activeSubstance: 'asc' }
            });
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet('Active Substances');
            // Define all columns matching the original CSV structure (178+ fields)
            const columns = [
                { header: 'Active substance', key: 'activeSubstance', width: 30 },
                { header: 'Concentration ', key: 'concentration', width: 15 },
                { header: 'Classification', key: 'classification', width: 25 },
                { header: 'Dosage form', key: 'dosageForm', width: 20 },
                { header: 'Indication ', key: 'indication', width: 40 },
                { header: 'Adult Dose (Max. Dose per day)', key: 'adultDoseMaxPerDay', width: 25 },
                { header: 'Adult dose (mg/kg - iF applicable) ', key: 'adultDoseMgPerKg', width: 30 },
                { header: 'Dose in Kg (for children) starting from 17 years', key: 'doseInKg', width: 40 },
                { header: 'Pediatric Dose ', key: 'pediatricDose', width: 30 },
                { header: 'Glucose/Lactose/Fructose Content/Preservatives in Occular Products', key: 'glucoseContent', width: 50 },
                { header: 'Elimination Pathway', key: 'eliminationPathway', width: 25 },
                { header: 'Contraindication ', key: 'contraindications', width: 40 },
                { header: 'Female (Pegnancy Warning & Lactation)', key: 'pregnancyWarning', width: 40 },
                { header: 'Warning (Reproductive ADR /Urinogenital) - Female', key: 'reproductiveWarningFemale', width: 45 },
                { header: 'Warning (Reproductive ADR /Urinogenital) - Male', key: 'reproductiveWarningMale', width: 45 },
                { header: 'Warning (Special Population)- Children', key: 'specialPopulationChildren', width: 35 },
                { header: 'Warning (Special Population)- Elderly', key: 'specialPopulationElderly', width: 35 },
                { header: 'Ethenic Action', key: 'ethnicAction', width: 20 },
                { header: 'Warning (Hepatic)', key: 'hepaticWarning', width: 30 },
                { header: 'Warning (Renal) ', key: 'renalWarning', width: 30 },
                { header: 'Warning to avoid Potential Medication error', key: 'medicationErrorWarning', width: 40 },
                { header: 'Carcinogenicity /Mutagenicity', key: 'carcinogenicityMutagenicity', width: 30 },
                { header: 'Warning (GIT)', key: 'gitWarning', width: 30 },
                { header: 'Warning (Metabolism)', key: 'metabolismWarning', width: 30 },
                { header: 'Warning (Pulmonary)', key: 'pulmonaryWarning', width: 30 },
                { header: 'Warning (Immune System)', key: 'immuneSystemWarning', width: 30 },
                { header: 'Warning (Infection)', key: 'infectionWarning', width: 30 },
                { header: 'Warning  (Blood)', key: 'bloodWarning', width: 30 },
                { header: 'Warning (Vascular)', key: 'vascularWarning', width: 30 },
                { header: 'Warning (Electrolyte imbalance)', key: 'electrolyteImbalanceWarning', width: 35 },
                { header: 'Warning (Cardiac)', key: 'cardiacWarning', width: 30 },
                { header: 'Warning (Psychatric)', key: 'psychiatricWarning', width: 30 },
                { header: 'Warning (Nervous System)', key: 'nervousSystemWarning', width: 30 },
                { header: 'Warning (Skin & Connective Tissue)', key: 'skinConnectiveTissueWarning', width: 40 },
                { header: 'Warning (Musclo-Skeletal)', key: 'musculoSkeletalWarning', width: 35 },
                { header: 'Warning (Eye disorders)', key: 'eyeDisordersWarning', width: 30 },
                { header: 'Warning (Ear disorders)', key: 'earDisordersWarning', width: 30 },
                { header: 'Harmful  Drug Interaction with Viatmins/food/digestive enzymes/ colestyramine', key: 'interactionVitaminsFood', width: 60 },
                { header: 'Harmful  Drug Interaction with bisphosphonates ', key: 'interactionBisphosphonates', width: 45 },
                { header: ' harmful  Drug Interaction with Alcohol ', key: 'interactionAlcohol', width: 40 },
                { header: 'Drug interaction with Muscle relaxant', key: 'interactionMuscleRelaxant', width: 35 },
                { header: 'Drug Interaction  with Retenoids', key: 'interactionRetinoids', width: 35 },
                { header: 'Drug Interaction  with Corticosteroids', key: 'interactionCorticosteroids', width: 40 },
                { header: 'Drug Interactions with xanthines (theophylline, caffeine or pentoxifylline)', key: 'interactionXanthines', width: 60 },
                { header: 'Drug Interactions with Sympathomimetics (such as epinephrine [adrenaline], or salbutamol, terbutaline used to treat asthma)', key: 'interactionSympathomimetics', width: 80 },
                { header: 'Drug Interactions with Anticholinergic (e.g Atropine) ', key: 'interactionAnticholinergic', width: 45 },
                { header: 'Drug Interaction with Chemotherapy & Neoplastic /5-HT3 antagonist (anti-vomiting)', key: 'interactionChemotherapy', width: 65 },
                { header: 'Drug Interaction with Antibiotics/Antifungal ', key: 'interactionAntibiotics', width: 40 },
                { header: 'Drug Interaction with hormons /Antihormones', key: 'interactionHormones', width: 40 },
                { header: 'Drug Interaction with Statins /Antilipidemic', key: 'interactionStatins', width: 40 },
                { header: 'Drug Interaction with Antihypertensive agents /antiarrhythmic drugs', key: 'interactionAntihypertensive', width: 55 },
                { header: 'Drug Interaction with Antidiuretics agents /Laxatives', key: 'interactionAntidiuretics', width: 45 },
                { header: 'Drug Interaction with Antidepressant /anticonvulsant agents ', key: 'interactionAntidepressant', width: 50 },
                { header: 'Drug Interaction with Antidiabetic agents ', key: 'interactionAntidiabetic', width: 40 },
                { header: 'Drug Interaction with agents treating low blood sugar level', key: 'interactionLowBloodSugarAgents', width: 50 },
                { header: 'Drug Interaction with Digioxin/cardiac Glycosids (Organic compounds)/Anti-arrhythmias', key: 'interactionDigoxin', width: 70 },
                { header: 'Drug Interaction with anticoagulant (as Warfarin (Vitamin K antagonists)', key: 'interactionAnticoagulant', width: 60 },
                { header: 'Drug Interaction with NSAIDs/Paracetamol/ Narcotic analgiscs/Antihistaminic', key: 'interactionNSAIDs', width: 60 },
                { header: 'Drug Interaction with immunosuppressive\nagents', key: 'interactionImmunosuppressive', width: 50 },
                { header: 'Drug Interaction with antacids', key: 'interactionAntacids', width: 30 },
                { header: 'Drug Interaction with Uricosurics (e.g Probenecid)', key: 'interactionUricosurics', width: 40 },
                { header: 'Drug Interaction with Protectants (Sucralfate)', key: 'interactionProtectants', width: 40 },
                { header: 'Drug Interaction with Anti-Parkinson Drugs (Dopamine Agonist)/alzheimer\'s disease', key: 'interactionAntiParkinson', width: 65 },
                { header: 'Drug interaction with (HIV-1 protease inhibitor)/other antiviral drugs (HCV antiviral', key: 'interactionHIVProtease', width: 70 },
                { header: 'Iron Chelator ', key: 'ironChelator', width: 20 },
                { header: 'Drug Interaction (Blood Product/ Immunoglobulin) ', key: 'interactionBloodProduct', width: 50 },
                { header: 'Drug Interaction with Vaccines', key: 'interactionVaccines', width: 35 },
                { header: 'Drug interactions with anthelmintics /antimalaria (Parasites)/antiprotozoal ', key: 'interactionAnthelmintics', width: 60 },
                { header: 'Drug interactions with PDE5 inhibitors ', key: 'interactionPDE5Inhibitors', width: 40 },
                { header: 'Interference with laboratory tests / Investigations', key: 'interferenceLabTests', width: 45 },
                { header: 'Effect on Driving & using Machines', key: 'effectOnDriving', width: 35 },
                // Very Common Side Effects
                { header: 'Very Common (GIT) ', key: 'veryCommonGIT', width: 30 },
                { header: 'Very Common (Blood & Lymphatic disorder) ', key: 'veryCommonBlood', width: 40 },
                { header: 'Very Common (Vascular disorder) ', key: 'veryCommonVascular', width: 35 },
                { header: 'Very Common Cardiac disorder) ', key: 'veryCommonCardiac', width: 35 },
                { header: 'Very Common ADR  (Musculoskeletal and connective tissue disorders) ', key: 'veryCommonMusculoskeletal', width: 55 },
                { header: 'Very Common (Nervous System) ', key: 'veryCommonNervousSystem', width: 35 },
                { header: 'Very Common (Eye Disorder)  ', key: 'veryCommonEye', width: 30 },
                { header: 'Very Common (Metabolism & Nutrition) ', key: 'veryCommonMetabolism', width: 40 },
                { header: 'Very Common (Ear) ', key: 'veryCommonEar', width: 25 },
                { header: 'Very Common (Respitatory System) ', key: 'veryCommonRespiratory', width: 35 },
                { header: 'Very Common (skin & subcutaneous Disorder) ', key: 'veryCommonSkin', width: 40 },
                { header: 'Very Common (infection) ', key: 'veryCommonInfection', width: 30 },
                { header: 'Very Common (Psychiatric )', key: 'veryCommonPsychiatric', width: 30 },
                { header: 'Very Common (Renal Disorder )', key: 'veryCommonRenal', width: 30 },
                { header: 'Very Common (Hepatic Disorder )', key: 'veryCommonHepatic', width: 35 },
                { header: 'Very Common (General)', key: 'veryCommonGeneral', width: 25 },
                // Common Side Effects
                { header: 'Common (GIT)', key: 'commonGIT', width: 20 },
                { header: 'Common (Vascular)', key: 'commonVascular', width: 25 },
                { header: 'Common (Infections)', key: 'commonInfections', width: 25 },
                { header: 'Common ADR  (Respiratory System) ', key: 'commonRespiratory', width: 35 },
                { header: 'Common ADR (Cardiac disorder) ', key: 'commonCardiac', width: 30 },
                { header: ' Common (Blood & Lymphatic disorder) ', key: 'commonBlood', width: 40 },
                { header: 'Common ADR (skin & subcutaneous Disorder) ', key: 'commonSkin', width: 40 },
                { header: 'Common ADR (Eye Disorder)', key: 'commonEye', width: 30 },
                { header: 'Common ADR (Ear and labyrinth disorders )', key: 'commonEar', width: 40 },
                { header: 'Common ADR (Metabolism and nutrition disorders)', key: 'commonMetabolism', width: 45 },
                { header: 'Common ADR  (General Disorder) ', key: 'commonGeneral', width: 30 },
                { header: 'Common ADR (Hebatobilary Disorder) ', key: 'commonHepatobiliary', width: 35 },
                { header: 'Common ADR  (Immunity)', key: 'commonImmunity', width: 25 },
                { header: 'Common ADR  (Psychiatric )', key: 'commonPsychiatric', width: 30 },
                { header: 'Common ADR  (Nervous System)', key: 'commonNervousSystem', width: 30 },
                { header: 'Common ADR (Renal  Disorder) ', key: 'commonRenal', width: 30 },
                { header: 'Common ADR  (Musculoskeletal and connective tissue disorders) ', key: 'commonMusculoskeletal', width: 55 },
                // Uncommon Side Effects
                { header: 'Uncommon (Nervous Disorder) ', key: 'uncommonNervous', width: 30 },
                { header: 'Uncommon (Infections & infestations)', key: 'uncommonInfections', width: 35 },
                { header: 'Uncommon (Psychiatric) ', key: 'uncommonPsychiatric', width: 30 },
                { header: 'Uncommon (EYE disorder) ', key: 'uncommonEye', width: 25 },
                { header: 'Uncommon (Respiratory System) ', key: 'uncommonRespiratory', width: 35 },
                { header: 'Uncommon ( (skin & subcutaneous Disorder) ', key: 'uncommonSkin', width: 40 },
                { header: 'Uncommon  (Renal disorders)', key: 'uncommonRenal', width: 30 },
                { header: 'Uncommon (Hepatobiliary disorders) ', key: 'uncommonHepatobiliary', width: 35 },
                { header: 'Uncommon (Vascular Disorder) ', key: 'uncommonVascular', width: 30 },
                { header: 'Uncommon (GIT)', key: 'uncommonGIT', width: 20 },
                { header: 'UnCommon ADR  (Musculoskeletal and connective tissue disorders) ', key: 'uncommonMusculoskeletal', width: 55 },
                { header: 'Uncommon (Metabolism & Nutrition)', key: 'uncommonMetabolism', width: 35 },
                { header: 'Uncommon (Ear and Labyrinth disorders)', key: 'uncommonEar', width: 40 },
                { header: 'Uncommon (Cardiac System) ', key: 'uncommonCardiac', width: 30 },
                { header: 'Uncommon (blood Disorder) ', key: 'uncommonBlood', width: 30 },
                { header: 'Uncommon (Immunity)', key: 'uncommonImmunity', width: 25 },
                { header: 'Uncommin (General)', key: 'uncommonGeneral', width: 25 },
                // Rare Side Effects
                { header: 'Rare (Ear and Labyrinth disorders)', key: 'rareEar', width: 40 },
                { header: 'Rare (Blood & Lymphatic disorders) ', key: 'rareBlood', width: 40 },
                { header: ' Rare (GIT) ', key: 'rareGIT', width: 20 },
                { header: 'Rare (Hepatic Disorder)', key: 'rareHepatic', width: 30 },
                { header: 'Rare (Infections)', key: 'rareInfections', width: 25 },
                { header: 'Rare (Cardiac Disorder)', key: 'rareCardiac', width: 30 },
                { header: 'Rare (Vascular Disorder)', key: 'rareVascular', width: 30 },
                { header: 'Rare (Immune system disorders) ', key: 'rareImmune', width: 35 },
                { header: 'Rare (Metabolism & Nutrition) ', key: 'rareMetabolism', width: 35 },
                { header: 'Rare (Nervous system disorders) ', key: 'rareNervous', width: 35 },
                { header: 'Rare (Musculo-skeletal and connective tissue disorders) ', key: 'rareMusculoskeletal', width: 55 },
                { header: 'Rare (Psychiatric disorders) ', key: 'rarePsychiatric', width: 30 },
                { header: 'Rare (Eye Disorder)', key: 'rareEye', width: 25 },
                { header: 'Rare (Renal Disorder)', key: 'rareRenal', width: 30 },
                { header: 'Rare (Skin & Subcutaneous Tissue) ', key: 'rareSkin', width: 40 },
                { header: 'Rare (Respiratory System) ', key: 'rareRespiratory', width: 35 },
                { header: 'Rare (Endocrine Disorder) ', key: 'rareEndocrine', width: 30 },
                { header: 'Rare (General Disorder)', key: 'rareGeneral', width: 30 },
                // Very Rare Side Effects
                { header: 'Very Rare (Vascular System) ', key: 'veryRareVascular', width: 30 },
                { header: 'Very Rare (Endocrine Disorde)', key: 'veryRareEndocrine', width: 30 },
                { header: 'Very Rare (Nervous System) ', key: 'veryRareNervous', width: 30 },
                { header: 'Very Rare (psychiatric  disorder) ', key: 'veryRarePsychiatric', width: 35 },
                { header: 'Very Rare (eye diorder)', key: 'veryRareEye', width: 25 },
                { header: 'Very Rare (Musculoskeletal and connective tissue disorders) ', key: 'veryRareMusculoskeletal', width: 55 },
                { header: 'Very Rare (Blood & Lymphatic  diorder)', key: 'veryRareBlood', width: 40 },
                { header: 'Very Rare (Cardiac Disorder) ', key: 'veryRareCardiac', width: 30 },
                { header: 'Very Rare (Immune System) ', key: 'veryRareImmune', width: 30 },
                { header: 'Very Rare (Ear and labyrinth disorders) ', key: 'veryRareEar', width: 40 },
                { header: 'Very Rare  (Renal disorders) ', key: 'veryRareRenal', width: 30 },
                { header: 'Very Rare (GIT) ', key: 'veryRareGIT', width: 20 },
                { header: 'Very Rare (Hepatobiliary disorders) ', key: 'veryRareHepatobiliary', width: 40 },
                { header: 'Very Rare (Infections) ', key: 'veryRareInfections', width: 30 },
                { header: 'Very Rare (Respiratory System) ', key: 'veryRareRespiratory', width: 35 },
                { header: 'Very Rare (Skin & Subcutaneous Tissue) ', key: 'veryRareSkin', width: 40 },
                { header: 'Very Rare (General)', key: 'veryRareGeneral', width: 25 },
                { header: 'Very Rare (metabolism & nutrition Disorder) ', key: 'veryRareMetabolism', width: 45 },
                // Unknown Side Effects
                { header: 'Unknown (Nervous Disorder)', key: 'unknownNervous', width: 30 },
                { header: 'Unknown (Mucloskeletal Connective Tissue)', key: 'unknownMusculoskeletal', width: 45 },
                { header: 'Unknown (Psychiatric)', key: 'unknownPsychiatric', width: 25 },
                { header: 'Unknown (Hepatobilary disorders)', key: 'unknownHepatobiliary', width: 40 },
                { header: 'Unknown (Renal disorders)', key: 'unknownRenal', width: 30 },
                { header: 'Unknown (Skin & Subcutaneous Tissue) ', key: 'unknownSkin', width: 40 },
                { header: 'Unknown (Respiratory disorders)', key: 'unknownRespiratory', width: 35 },
                { header: 'Unknown (Immune System) ', key: 'unknownImmune', width: 30 },
                { header: 'Unknown (Vascular Disorder)', key: 'unknownVascular', width: 30 },
                { header: 'Unknown (Ear and Labyrinth disorders)', key: 'unknownEar', width: 40 },
                { header: 'Unknown (GIT)', key: 'unknownGIT', width: 20 },
                { header: 'Unknown (General)', key: 'unknownGeneral', width: 25 },
                { header: 'Unknown (Metabolism & Nutrition)', key: 'unknownMetabolism', width: 35 },
                { header: 'Unknown (Eye Disorder)', key: 'unknownEye', width: 25 },
                { header: 'Unknown (Blood & Lymphatic disorders)', key: 'unknownBlood', width: 40 },
                { header: 'Unknown (Cardiac disorders)', key: 'unknownCardiac', width: 30 },
                { header: 'Unknown (infections & infestation)', key: 'unknownInfections', width: 35 },
                { header: 'Unknown (Endocrine System)', key: 'unknownEndocrine', width: 30 },
                // Additional Fields
                { header: 'Additive RMM ', key: 'additiveRMM', width: 20 },
                { header: 'Pregnacy  Category', key: 'pregnancyCategory', width: 25 },
                { header: 'Highlighted warning', key: 'highlightedWarning', width: 30 },
            ];
            worksheet.columns = columns;
            // Add data rows
            activeSubstances.forEach(substance => {
                const row = {};
                // Map all fields
                row.activeSubstance = substance.activeSubstance || '';
                row.concentration = substance.concentration || '';
                row.classification = substance.classification || '';
                row.dosageForm = substance.dosageForm || '';
                row.indication = substance.indication || '';
                row.adultDoseMaxPerDay = substance.adultDoseMaxPerDay || '';
                row.adultDoseMgPerKg = substance.adultDoseMgPerKg || '';
                row.doseInKg = substance.doseInKg || '';
                row.pediatricDose = substance.pediatricDose || '';
                row.glucoseContent = substance.glucoseContent || '';
                row.eliminationPathway = substance.eliminationPathway || '';
                row.contraindications = this.formatField(substance.contraindications);
                row.pregnancyWarning = substance.pregnancyWarning || '';
                row.reproductiveWarningFemale = substance.reproductiveWarningFemale || '';
                row.reproductiveWarningMale = substance.reproductiveWarningMale || '';
                row.specialPopulationChildren = substance.specialPopulationChildren || '';
                row.specialPopulationElderly = substance.specialPopulationElderly || '';
                row.ethnicAction = substance.ethnicAction || '';
                row.hepaticWarning = substance.hepaticWarning || '';
                row.renalWarning = substance.renalWarning || '';
                row.medicationErrorWarning = substance.medicationErrorWarning || '';
                row.carcinogenicityMutagenicity = substance.carcinogenicityMutagenicity || '';
                row.gitWarning = substance.gitWarning || '';
                row.metabolismWarning = substance.metabolismWarning || '';
                row.pulmonaryWarning = substance.pulmonaryWarning || '';
                row.immuneSystemWarning = substance.immuneSystemWarning || '';
                row.infectionWarning = substance.infectionWarning || '';
                row.bloodWarning = substance.bloodWarning || '';
                row.vascularWarning = substance.vascularWarning || '';
                row.electrolyteImbalanceWarning = substance.electrolyteImbalanceWarning || '';
                row.cardiacWarning = substance.cardiacWarning || '';
                row.psychiatricWarning = substance.psychiatricWarning || '';
                row.nervousSystemWarning = substance.nervousSystemWarning || '';
                row.skinConnectiveTissueWarning = substance.skinConnectiveTissueWarning || '';
                row.musculoSkeletalWarning = substance.musculoSkeletalWarning || '';
                row.eyeDisordersWarning = substance.eyeDisordersWarning || '';
                row.earDisordersWarning = substance.earDisordersWarning || '';
                // Drug Interactions
                row.interactionVitaminsFood = this.formatField(substance.interactionVitaminsFood);
                row.interactionBisphosphonates = this.formatField(substance.interactionBisphosphonates);
                row.interactionAlcohol = this.formatField(substance.interactionAlcohol);
                row.interactionMuscleRelaxant = this.formatField(substance.interactionMuscleRelaxant);
                row.interactionRetinoids = this.formatField(substance.interactionRetinoids);
                row.interactionCorticosteroids = this.formatField(substance.interactionCorticosteroids);
                row.interactionXanthines = this.formatField(substance.interactionXanthines);
                row.interactionSympathomimetics = this.formatField(substance.interactionSympathomimetics);
                row.interactionAnticholinergic = this.formatField(substance.interactionAnticholinergic);
                row.interactionChemotherapy = this.formatField(substance.interactionChemotherapy);
                row.interactionAntibiotics = this.formatField(substance.interactionAntibiotics);
                row.interactionHormones = this.formatField(substance.interactionHormones);
                row.interactionStatins = this.formatField(substance.interactionStatins);
                row.interactionAntihypertensive = this.formatField(substance.interactionAntihypertensive);
                row.interactionAntidiuretics = this.formatField(substance.interactionAntidiuretics);
                row.interactionAntidepressant = this.formatField(substance.interactionAntidepressant);
                row.interactionAntidiabetic = this.formatField(substance.interactionAntidiabetic);
                row.interactionLowBloodSugarAgents = this.formatField(substance.interactionLowBloodSugarAgents);
                row.interactionDigoxin = this.formatField(substance.interactionDigoxin);
                row.interactionAnticoagulant = this.formatField(substance.interactionAnticoagulant);
                row.interactionNSAIDs = this.formatField(substance.interactionNSAIDs);
                row.interactionImmunosuppressive = this.formatField(substance.interactionImmunosuppressive);
                row.interactionAntacids = this.formatField(substance.interactionAntacids);
                row.interactionUricosurics = this.formatField(substance.interactionUricosurics);
                row.interactionProtectants = this.formatField(substance.interactionProtectants);
                row.interactionAntiParkinson = this.formatField(substance.interactionAntiParkinson);
                row.interactionHIVProtease = this.formatField(substance.interactionHIVProtease);
                row.ironChelator = substance.ironChelator || '';
                row.interactionBloodProduct = this.formatField(substance.interactionBloodProduct);
                row.interactionVaccines = this.formatField(substance.interactionVaccines);
                row.interactionAnthelmintics = this.formatField(substance.interactionAnthelmintics);
                row.interactionPDE5Inhibitors = this.formatField(substance.interactionPDE5Inhibitors);
                row.interferenceLabTests = substance.interferenceLabTests || '';
                row.effectOnDriving = substance.effectOnDriving || '';
                // Side Effects - Very Common
                row.veryCommonGIT = this.formatField(substance.veryCommonGIT);
                row.veryCommonBlood = this.formatField(substance.veryCommonBlood);
                row.veryCommonVascular = this.formatField(substance.veryCommonVascular);
                row.veryCommonCardiac = this.formatField(substance.veryCommonCardiac);
                row.veryCommonMusculoskeletal = this.formatField(substance.veryCommonMusculoskeletal);
                row.veryCommonNervousSystem = this.formatField(substance.veryCommonNervousSystem);
                row.veryCommonEye = this.formatField(substance.veryCommonEye);
                row.veryCommonMetabolism = this.formatField(substance.veryCommonMetabolism);
                row.veryCommonEar = this.formatField(substance.veryCommonEar);
                row.veryCommonRespiratory = this.formatField(substance.veryCommonRespiratory);
                row.veryCommonSkin = this.formatField(substance.veryCommonSkin);
                row.veryCommonInfection = this.formatField(substance.veryCommonInfection);
                row.veryCommonPsychiatric = this.formatField(substance.veryCommonPsychiatric);
                row.veryCommonRenal = this.formatField(substance.veryCommonRenal);
                row.veryCommonHepatic = this.formatField(substance.veryCommonHepatic);
                row.veryCommonGeneral = this.formatField(substance.veryCommonGeneral);
                // Side Effects - Common
                row.commonGIT = this.formatField(substance.commonGIT);
                row.commonVascular = this.formatField(substance.commonVascular);
                row.commonInfections = this.formatField(substance.commonInfections);
                row.commonRespiratory = this.formatField(substance.commonRespiratory);
                row.commonCardiac = this.formatField(substance.commonCardiac);
                row.commonBlood = this.formatField(substance.commonBlood);
                row.commonSkin = this.formatField(substance.commonSkin);
                row.commonEye = this.formatField(substance.commonEye);
                row.commonEar = this.formatField(substance.commonEar);
                row.commonMetabolism = this.formatField(substance.commonMetabolism);
                row.commonGeneral = this.formatField(substance.commonGeneral);
                row.commonHepatobiliary = this.formatField(substance.commonHepatobiliary);
                row.commonImmunity = this.formatField(substance.commonImmunity);
                row.commonPsychiatric = this.formatField(substance.commonPsychiatric);
                row.commonNervousSystem = this.formatField(substance.commonNervousSystem);
                row.commonRenal = this.formatField(substance.commonRenal);
                row.commonMusculoskeletal = this.formatField(substance.commonMusculoskeletal);
                // Side Effects - Uncommon
                row.uncommonNervous = this.formatField(substance.uncommonNervous);
                row.uncommonInfections = this.formatField(substance.uncommonInfections);
                row.uncommonPsychiatric = this.formatField(substance.uncommonPsychiatric);
                row.uncommonEye = this.formatField(substance.uncommonEye);
                row.uncommonRespiratory = this.formatField(substance.uncommonRespiratory);
                row.uncommonSkin = this.formatField(substance.uncommonSkin);
                row.uncommonRenal = this.formatField(substance.uncommonRenal);
                row.uncommonHepatobiliary = this.formatField(substance.uncommonHepatobiliary);
                row.uncommonVascular = this.formatField(substance.uncommonVascular);
                row.uncommonGIT = this.formatField(substance.uncommonGIT);
                row.uncommonMusculoskeletal = this.formatField(substance.uncommonMusculoskeletal);
                row.uncommonMetabolism = this.formatField(substance.uncommonMetabolism);
                row.uncommonEar = this.formatField(substance.uncommonEar);
                row.uncommonCardiac = this.formatField(substance.uncommonCardiac);
                row.uncommonBlood = this.formatField(substance.uncommonBlood);
                row.uncommonImmunity = this.formatField(substance.uncommonImmunity);
                row.uncommonGeneral = this.formatField(substance.uncommonGeneral);
                // Side Effects - Rare
                row.rareEar = this.formatField(substance.rareEar);
                row.rareBlood = this.formatField(substance.rareBlood);
                row.rareGIT = this.formatField(substance.rareGIT);
                row.rareHepatic = this.formatField(substance.rareHepatic);
                row.rareInfections = this.formatField(substance.rareInfections);
                row.rareCardiac = this.formatField(substance.rareCardiac);
                row.rareVascular = this.formatField(substance.rareVascular);
                row.rareImmune = this.formatField(substance.rareImmune);
                row.rareMetabolism = this.formatField(substance.rareMetabolism);
                row.rareNervous = this.formatField(substance.rareNervous);
                row.rareMusculoskeletal = this.formatField(substance.rareMusculoskeletal);
                row.rarePsychiatric = this.formatField(substance.rarePsychiatric);
                row.rareEye = this.formatField(substance.rareEye);
                row.rareRenal = this.formatField(substance.rareRenal);
                row.rareSkin = this.formatField(substance.rareSkin);
                row.rareRespiratory = this.formatField(substance.rareRespiratory);
                row.rareEndocrine = this.formatField(substance.rareEndocrine);
                row.rareGeneral = this.formatField(substance.rareGeneral);
                // Side Effects - Very Rare
                row.veryRareVascular = this.formatField(substance.veryRareVascular);
                row.veryRareEndocrine = this.formatField(substance.veryRareEndocrine);
                row.veryRareNervous = this.formatField(substance.veryRareNervous);
                row.veryRarePsychiatric = this.formatField(substance.veryRarePsychiatric);
                row.veryRareEye = this.formatField(substance.veryRareEye);
                row.veryRareMusculoskeletal = this.formatField(substance.veryRareMusculoskeletal);
                row.veryRareBlood = this.formatField(substance.veryRareBlood);
                row.veryRareCardiac = this.formatField(substance.veryRareCardiac);
                row.veryRareImmune = this.formatField(substance.veryRareImmune);
                row.veryRareEar = this.formatField(substance.veryRareEar);
                row.veryRareRenal = this.formatField(substance.veryRareRenal);
                row.veryRareGIT = this.formatField(substance.veryRareGIT);
                row.veryRareHepatobiliary = this.formatField(substance.veryRareHepatobiliary);
                row.veryRareInfections = this.formatField(substance.veryRareInfections);
                row.veryRareRespiratory = this.formatField(substance.veryRareRespiratory);
                row.veryRareSkin = this.formatField(substance.veryRareSkin);
                row.veryRareGeneral = this.formatField(substance.veryRareGeneral);
                row.veryRareMetabolism = this.formatField(substance.veryRareMetabolism);
                // Side Effects - Unknown
                row.unknownNervous = this.formatField(substance.unknownNervous);
                row.unknownMusculoskeletal = this.formatField(substance.unknownMusculoskeletal);
                row.unknownPsychiatric = this.formatField(substance.unknownPsychiatric);
                row.unknownHepatobiliary = this.formatField(substance.unknownHepatobiliary);
                row.unknownRenal = this.formatField(substance.unknownRenal);
                row.unknownSkin = this.formatField(substance.unknownSkin);
                row.unknownRespiratory = this.formatField(substance.unknownRespiratory);
                row.unknownImmune = this.formatField(substance.unknownImmune);
                row.unknownVascular = this.formatField(substance.unknownVascular);
                row.unknownEar = this.formatField(substance.unknownEar);
                row.unknownGIT = this.formatField(substance.unknownGIT);
                row.unknownGeneral = this.formatField(substance.unknownGeneral);
                row.unknownMetabolism = this.formatField(substance.unknownMetabolism);
                row.unknownEye = this.formatField(substance.unknownEye);
                row.unknownBlood = this.formatField(substance.unknownBlood);
                row.unknownCardiac = this.formatField(substance.unknownCardiac);
                row.unknownInfections = this.formatField(substance.unknownInfections);
                row.unknownEndocrine = this.formatField(substance.unknownEndocrine);
                // Additional Fields
                row.additiveRMM = substance.additiveRMM || '';
                row.pregnancyCategory = substance.pregnancyCategory || '';
                row.highlightedWarning = substance.highlightedWarning || '';
                worksheet.addRow(row);
            });
            // Style header row
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' }
            };
            // Create export history
            const userId = req.user?.id;
            if (userId) {
                try {
                    await prisma_1.prisma.exportHistory.create({
                        data: {
                            format: 'xlsx',
                            totalRecords: activeSubstances.length,
                            exportedBy: userId
                        }
                    });
                }
                catch (historyError) {
                    // Log but don't fail export if history creation fails
                    console.error('Failed to create export history:', historyError);
                }
            }
            // Set response headers
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=ActiveSubstances_${new Date().toISOString().split('T')[0]}.xlsx`);
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            next(error);
        }
    }
    // Export Trade Names
    async exportTradeNames(req, res, next) {
        try {
            const tradeNames = await prisma_1.prisma.tradeName.findMany({
                include: {
                    activeSubstance: true,
                    company: true
                }
            });
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet('Trade Names');
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Trade Name', key: 'title', width: 30 },
                { header: 'Active Substance', key: 'activeSubstance', width: 30 },
                { header: 'Company', key: 'company', width: 25 },
                { header: 'Availability Status', key: 'availabilityStatus', width: 20 },
                { header: 'Stock Quantity', key: 'stockQuantity', width: 15 },
                { header: 'Expiry Date', key: 'expiryDate', width: 15 },
                { header: 'Created At', key: 'createdAt', width: 20 },
            ];
            tradeNames.forEach(tn => {
                worksheet.addRow({
                    id: tn.id,
                    title: tn.title,
                    activeSubstance: tn.activeSubstance.activeSubstance,
                    company: tn.company.name,
                    availabilityStatus: tn.availabilityStatus,
                    stockQuantity: tn.stockQuantity,
                    expiryDate: tn.expiryDate,
                    createdAt: tn.createdAt
                });
            });
            worksheet.getRow(1).font = { bold: true };
            const userId = req.user?.id;
            if (userId) {
                try {
                    await prisma_1.prisma.exportHistory.create({
                        data: {
                            format: 'xlsx',
                            totalRecords: tradeNames.length,
                            exportedBy: userId
                        }
                    });
                }
                catch (historyError) {
                    console.error('Failed to create export history:', historyError);
                }
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=TradeNames_${new Date().toISOString().split('T')[0]}.xlsx`);
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            next(error);
        }
    }
    // Export Diseases
    async exportDiseases(_req, res, next) {
        try {
            const diseases = await prisma_1.prisma.disease.findMany({
                include: {
                    diseaseActiveSubstanceWarnings: {
                        include: {
                            activeSubstance: true
                        }
                    }
                }
            });
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet('Diseases');
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Name', key: 'name', width: 30 },
                { header: 'Severity', key: 'severity', width: 15 },
                { header: 'Description', key: 'description', width: 50 },
                { header: 'Active Substance Warnings', key: 'warnings', width: 40 },
                { header: 'Created At', key: 'createdAt', width: 20 },
            ];
            diseases.forEach(disease => {
                worksheet.addRow({
                    id: disease.id,
                    name: disease.name,
                    severity: disease.severity,
                    description: disease.description,
                    warnings: disease.diseaseActiveSubstanceWarnings
                        .map((w) => `${w.activeSubstance.activeSubstance} (${w.severity})`)
                        .join('; '),
                    createdAt: disease.createdAt
                });
            });
            worksheet.getRow(1).font = { bold: true };
            const userId = _req.user?.id;
            if (userId) {
                try {
                    await prisma_1.prisma.exportHistory.create({
                        data: {
                            format: 'xlsx',
                            totalRecords: diseases.length,
                            exportedBy: userId
                        }
                    });
                }
                catch (historyError) {
                    console.error('Failed to create export history:', historyError);
                }
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=Diseases_${new Date().toISOString().split('T')[0]}.xlsx`);
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            next(error);
        }
    }
    // Export Companies
    async exportCompanies(_req, res, next) {
        try {
            const companies = await prisma_1.prisma.company.findMany({
                include: {
                    _count: {
                        select: { tradeNames: true }
                    }
                }
            });
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet('Companies');
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Name', key: 'name', width: 30 },
                { header: 'Contact Info', key: 'contactInfo', width: 40 },
                { header: 'Trade Names Count', key: 'tradeNamesCount', width: 20 },
                { header: 'Created At', key: 'createdAt', width: 20 },
            ];
            companies.forEach(company => {
                worksheet.addRow({
                    id: company.id,
                    name: company.name,
                    contactInfo: JSON.stringify(company.contactInfo),
                    tradeNamesCount: company._count.tradeNames,
                    createdAt: company.createdAt
                });
            });
            worksheet.getRow(1).font = { bold: true };
            const userId = _req.user?.id;
            if (userId) {
                try {
                    await prisma_1.prisma.exportHistory.create({
                        data: {
                            format: 'xlsx',
                            totalRecords: companies.length,
                            exportedBy: userId
                        }
                    });
                }
                catch (historyError) {
                    console.error('Failed to create export history:', historyError);
                }
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=Companies_${new Date().toISOString().split('T')[0]}.xlsx`);
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            next(error);
        }
    }
    // Get export history
    async getExportHistory(req, res, next) {
        try {
            const { page = 1, limit = 20 } = req.query;
            const [history, total] = await Promise.all([
                prisma_1.prisma.exportHistory.findMany({
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit),
                    orderBy: { exportDate: 'desc' },
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                role: true
                            }
                        }
                    }
                }),
                prisma_1.prisma.exportHistory.count()
            ]);
            res.json({
                history,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new ExportController();
//# sourceMappingURL=export.controller.js.map