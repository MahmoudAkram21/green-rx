import { Request, Response, NextFunction } from "express";
import ExcelJS from "exceljs";
import * as fs from "fs";
import { prisma } from "../lib/prisma";
import { cleanupFile } from "../config/multer.config";

const BATCH_SIZE = 100;

/** Read Excel/CSV file and return array of row objects (like XLSX.utils.sheet_to_json). */
async function readSheetToJson(
  filePath: string
): Promise<{ sheetNames: string[]; rows: Record<string, unknown>[] }> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheetNames = workbook.worksheets.map((ws) => ws.name);
  if (sheetNames.length === 0) {
    return { sheetNames: [], rows: [] };
  }
  const worksheet = workbook.worksheets[0];
  const headerRow = worksheet.getRow(1);
  const headers: string[] = [];
  headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    const val = cell.value;
    headers[colNumber - 1] =
      val != null && typeof val === "object" && "text" in val
        ? String((val as { text: string }).text)
        : val != null
          ? String(val)
          : "";
  });
  const rows: Record<string, unknown>[] = [];
  const rowCount = worksheet.rowCount ?? 0;
  for (let r = 2; r <= rowCount; r++) {
    const row = worksheet.getRow(r);
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      const cell = row.getCell(i + 1);
      const v = cell.value;
      obj[h] =
        v != null && typeof v === "object" && "result" in v
          ? (v as { result: unknown }).result
          : v != null && typeof v === "object" && "text" in v
            ? (v as { text: string }).text
            : v != null
              ? v
              : "";
    });
    rows.push(obj);
  }
  return { sheetNames, rows };
}

class ImportController {
  // Import Active Substances from Excel/CSV
  async importActiveSubstances(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    let filePath: string | undefined;
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" }) as any;
      }

      filePath = req.file.path;

      if (!filePath || !fs.existsSync(filePath)) {
        return res
          .status(400)
          .json({ error: "File not found or invalid" }) as any;
      }

      let rawData: any[];
      try {
        const { sheetNames, rows } = await readSheetToJson(filePath);
        if (!sheetNames.length || rows.length === 0) {
          return res
            .status(400)
            .json({ error: "File contains no sheets or is empty" }) as any;
        }
        rawData = rows as any[];
      } catch (error: any) {
        return res.status(400).json({
          error: "Failed to read file",
          message: error.message || "Invalid file format",
        }) as any;
      }

      if (rawData.length === 0) {
        return res.status(400).json({ error: "File is empty" }) as any;
      }

      const results = {
        total: rawData.length,
        successful: 0,
        created: 0,
        updated: 0,
        failed: 0,
        errors: [] as Array<{ row: number; data: string; error: string }>
      };

      // Debug: Log first row keys to see what Excel parsed
      if (rawData.length > 0) {
        console.log("First row keys:", Object.keys(rawData[0]));
        console.log(
          "Sample row data:",
          JSON.stringify(rawData[0], null, 2).substring(0, 500)
        );
      }

      // Process in batches
      for (let i = 0; i < rawData.length; i += BATCH_SIZE) {
        const batch = rawData.slice(i, i + BATCH_SIZE);

        for (const row of batch) {
          try {
            // Validate required field - try multiple variations
            const activeSubstanceName =
              row["Active substance"] ||
              row["activeSubstance"] ||
              row["Active Substance"] ||
              row["Active substance "] ||
              this.getFieldValue(row, [
                "Active substance",
                "activeSubstance",
                "Active Substance",
              ]);

            if (
              !activeSubstanceName ||
              String(activeSubstanceName).trim() === ""
            ) {
              throw new Error(
                `Active substance name is required. Available keys: ${Object.keys(
                  row
                )
                  .slice(0, 10)
                  .join(", ")}`
              );
            }

            // Map CSV columns to database fields - comprehensive mapping
            const data: any = {
              activeSubstance: String(activeSubstanceName).trim(),
              concentration: this.getFieldValue(row, [
                "Concentration ",
                "Concentration",
                "concentration",
              ]),
              classification: this.getFieldValue(row, [
                "Classification",
                "classification",
              ]),
              dosageForm: this.getFieldValue(row, [
                "Dosage form",
                "dosageForm",
              ]),
              indication: this.getFieldValue(row, [
                "Indication ",
                "Indication",
                "indication",
              ]),

              // Dosage Fields
              adultDoseMaxPerDay: this.getFieldValue(row, [
                "Adult Dose (Max. Dose per day)",
                "adultDoseMaxPerDay",
              ]),
              adultDoseMgPerKg: this.getFieldValue(row, [
                "Adult dose (mg/kg - iF applicable) ",
                "adultDoseMgPerKg",
              ]),
              doseInKg: this.getFieldValue(row, [
                "Dose in Kg (for children) starting from 17 years",
                "doseInKg",
              ]),
              pediatricDose: this.getFieldValue(row, [
                "Pediatric Dose ",
                "Pediatric Dose",
                "pediatricDose",
              ]),

              // Content Fields
              glucoseContent: this.getFieldValue(row, [
                "Glucose/Lactose/Fructose Content/Preservatives in Occular Products",
                "glucoseContent",
              ]),
              lactoseContent: this.getFieldValue(row, ["lactoseContent"]),
              fructoseContent: this.getFieldValue(row, ["fructoseContent"]),
              preservativesInOcularProducts: this.getFieldValue(row, [
                "preservativesInOcularProducts",
              ]),
              eliminationPathway: this.getFieldValue(row, [
                "Elimination Pathway",
                "eliminationPathway",
              ]),

              // Warning Fields
              contraindications: this.parseArrayField(
                this.getFieldValue(row, [
                  "Contraindication ",
                  "Contraindication",
                  "contraindications",
                ])
              ),
              pregnancyWarning: this.getFieldValue(row, [
                "Female (Pegnancy Warning & Lactation)",
                "pregnancyWarning",
              ]),
              lactationWarning: this.getFieldValue(row, ["lactationWarning"]),
              reproductiveWarningFemale: this.getFieldValue(row, [
                "Warning (Reproductive ADR /Urinogenital) - Female",
                "reproductiveWarningFemale",
              ]),
              reproductiveWarningMale: this.getFieldValue(row, [
                "Warning (Reproductive ADR /Urinogenital) - Male",
                "reproductiveWarningMale",
              ]),
              specialPopulationChildren: this.getFieldValue(row, [
                "Warning (Special Population)- Children",
                "specialPopulationChildren",
              ]),
              specialPopulationElderly: this.getFieldValue(row, [
                "Warning (Special Population)- Elderly",
                "specialPopulationElderly",
              ]),
              ethnicAction: this.getFieldValue(row, [
                "Ethenic Action",
                "Ethenic Action ",
                "ethnicAction",
              ]),
              hepaticWarning: this.getFieldValue(row, [
                "Warning (Hepatic)",
                "hepaticWarning",
              ]),
              renalWarning: this.getFieldValue(row, [
                "Warning (Renal) ",
                "Warning (Renal)",
                "renalWarning",
              ]),
              medicationErrorWarning: this.getFieldValue(row, [
                "Warning to avoid Potential Medication error",
                "medicationErrorWarning",
              ]),
              carcinogenicityMutagenicity: this.getFieldValue(row, [
                "Carcinogenicity /Mutagenicity",
                "carcinogenicityMutagenicity",
              ]),
              gitWarning: this.getFieldValue(row, [
                "Warning (GIT)",
                "gitWarning",
              ]),
              metabolismWarning: this.getFieldValue(row, [
                "Warning (Metabolism)",
                "metabolismWarning",
              ]),
              pulmonaryWarning: this.getFieldValue(row, [
                "Warning (Pulmonary)",
                "pulmonaryWarning",
              ]),
              immuneSystemWarning: this.getFieldValue(row, [
                "Warning (Immune System)",
                "immuneSystemWarning",
              ]),
              infectionWarning: this.getFieldValue(row, [
                "Warning (Infection)",
                "infectionWarning",
              ]),
              bloodWarning: this.getFieldValue(row, [
                "Warning  (Blood)",
                "Warning (Blood)",
                "bloodWarning",
              ]),
              vascularWarning: this.getFieldValue(row, [
                "Warning (Vascular)",
                "vascularWarning",
              ]),
              electrolyteImbalanceWarning: this.getFieldValue(row, [
                "Warning (Electrolyte imbalance)",
                "electrolyteImbalanceWarning",
              ]),
              cardiacWarning: this.getFieldValue(row, [
                "Warning (Cardiac)",
                "cardiacWarning",
              ]),
              psychiatricWarning: this.getFieldValue(row, [
                "Warning (Psychatric)",
                "Warning (Psychiatric)",
                "psychiatricWarning",
              ]),
              nervousSystemWarning: this.getFieldValue(row, [
                "Warning (Nervous System)",
                "nervousSystemWarning",
              ]),
              skinConnectiveTissueWarning: this.getFieldValue(row, [
                "Warning (Skin & Connective Tissue)",
                "skinConnectiveTissueWarning",
              ]),
              musculoSkeletalWarning: this.getFieldValue(row, [
                "Warning (Musclo-Skeletal)",
                "musculoSkeletalWarning",
              ]),
              eyeDisordersWarning: this.getFieldValue(row, [
                "Warning (Eye disorders)",
                "eyeDisordersWarning",
              ]),
              earDisordersWarning: this.getFieldValue(row, [
                "Warning (Ear disorders)",
                "earDisordersWarning",
              ]),

              // Additional Fields
              additiveRMM: this.getFieldValue(row, [
                "Additive RMM ",
                "Additive RMM",
                "additiveRMM",
              ]),
              pregnancyCategory: this.getFieldValue(row, [
                "Pregnacy  Category",
                "Pregnancy Category",
                "pregnancyCategory",
              ]),
              highlightedWarning: this.getFieldValue(row, [
                "Highlighted warning",
                "Highlighted warning ",
                "highlightedWarning",
              ]),
              interferenceLabTests: this.getFieldValue(row, [
                "Interference with laboratory tests / Investigations",
                "interferenceLabTests",
              ]),
              effectOnDriving: this.getFieldValue(row, [
                "Effect on Driving & using Machines",
                "effectOnDriving",
              ]),
              ironChelator: this.getFieldValue(row, [
                "Iron Chelator ",
                "Iron Chelator",
                "ironChelator",
              ]),
            };

            // Map drug interaction fields dynamically
            const interactionFieldMap: { [key: string]: string } = {
              "Harmful  Drug Interaction with Viatmins/food/digestive enzymes/ colestyramine":
                "interactionVitaminsFood",
              "Harmful  Drug Interaction with bisphosphonates ":
                "interactionBisphosphonates",
              " harmful  Drug Interaction with Alcohol ": "interactionAlcohol",
              "Drug interaction with Muscle relaxant":
                "interactionMuscleRelaxant",
              "Drug Interaction  with Retenoids": "interactionRetinoids",
              "Drug Interaction  with Corticosteroids":
                "interactionCorticosteroids",
              "Drug Interactions with xanthines (theophylline, caffeine or pentoxifylline)":
                "interactionXanthines",
              "Drug Interactions with Sympathomimetics (such as epinephrine [adrenaline], or salbutamol, terbutaline used to treat asthma)":
                "interactionSympathomimetics",
              "Drug Interactions with Anticholinergic (e.g Atropine) ":
                "interactionAnticholinergic",
              "Drug Interaction with Chemotherapy & Neoplastic /5-HT3 antagonist (anti-vomiting)":
                "interactionChemotherapy",
              "Drug Interaction with Antibiotics/Antifungal ":
                "interactionAntibiotics",
              "Drug Interaction with hormons /Antihormones":
                "interactionHormones",
              "Drug Interaction with Statins /Antilipidemic":
                "interactionStatins",
              "Drug Interaction with Antihypertensive agents /antiarrhythmic drugs":
                "interactionAntihypertensive",
              "Drug Interaction with Antidiuretics agents /Laxatives":
                "interactionAntidiuretics",
              "Drug Interaction with Antidepressant /anticonvulsant agents ":
                "interactionAntidepressant",
              "Drug Interaction with Antidiabetic agents ":
                "interactionAntidiabetic",
              "Drug Interaction with agents treating low blood sugar level":
                "interactionLowBloodSugarAgents",
              "Drug Interaction with Digioxin/cardiac Glycosids (Organic compounds)/Anti-arrhythmias":
                "interactionDigoxin",
              "Drug Interaction with anticoagulant (as Warfarin (Vitamin K antagonists)":
                "interactionAnticoagulant",
              "Drug Interaction with NSAIDs/Paracetamol/ Narcotic analgiscs/Antihistaminic":
                "interactionNSAIDs",
              "Drug Interaction with immunosuppressive\nagents":
                "interactionImmunosuppressive",
              "Drug Interaction with antacids": "interactionAntacids",
              "Drug Interaction with Uricosurics (e.g Probenecid)":
                "interactionUricosurics",
              "Drug Interaction with Protectants (Sucralfate)":
                "interactionProtectants",
              "Drug Interaction with Anti-Parkinson Drugs (Dopamine Agonist)/alzheimer's disease":
                "interactionAntiParkinson",
              "Drug interaction with (HIV-1 protease inhibitor)/other antiviral drugs (HCV antiviral":
                "interactionHIVProtease",
              "Drug Interaction (Blood Product/ Immunoglobulin) ":
                "interactionBloodProduct",
              "Drug Interaction with Vaccines": "interactionVaccines",
              "Drug interactions with anthelmintics /antimalaria (Parasites)/antiprotozoal ":
                "interactionAnthelmintics",
              "Drug interactions with PDE5 inhibitors ":
                "interactionPDE5Inhibitors",
            };

            for (const csvKey in interactionFieldMap) {
              const dbKey = interactionFieldMap[csvKey];
              if (
                row[csvKey] !== undefined &&
                row[csvKey] !== null &&
                row[csvKey] !== ""
              ) {
                data[dbKey] = this.parseArrayField(row[csvKey]);
              }
            }

            // Map side effects fields dynamically
            for (const key in row) {
              if (
                key.includes("Very Common") ||
                key.includes("Common") ||
                key.includes("Uncommon") ||
                key.includes("Rare") ||
                key.includes("Very Rare") ||
                key.includes("Unknown")
              ) {
                const fieldName = this.mapSideEffectField(key);
                if (
                  fieldName &&
                  row[key] !== undefined &&
                  row[key] !== null &&
                  row[key] !== ""
                ) {
                  data[fieldName] = this.parseArrayField(row[key]);
                }
              }
            }

            // Remove undefined/null values to avoid Prisma issues
            const cleanData: any = {};
            for (const key in data) {
              if (
                data[key] !== undefined &&
                data[key] !== null &&
                data[key] !== ""
              ) {
                cleanData[key] = data[key];
              }
            }

            // Ensure required field exists
            if (!cleanData.activeSubstance) {
              throw new Error("Active substance name is required");
            }

            // Always create new record (allow duplicates)
            await prisma.activeSubstance.create({ data: cleanData });
            results.created++;
            results.successful++;
          } catch (error: any) {
            results.failed++;
            const errorMsg = error.message || String(error);
            console.error(
              `Row ${i + batch.indexOf(row) + 2} error:`,
              errorMsg,
              error
            );
            results.errors.push({
              row: i + batch.indexOf(row) + 2, // +2 for header and 0-index
              data: String(row["Active substance"] ?? "Unknown"),
              error: errorMsg,
            });
          }
        }
      }

      // Create import history record
      const fileExtension =
        req.file.originalname.split(".").pop()?.toLowerCase() || "csv";
      const userId = (req as any).user?.id;

      // Verify user exists or find/create a default admin user
      let validUserId = userId;
      if (!validUserId) {
        // Try to find the first admin user
        const adminUser = await prisma.user.findFirst({
          where: {
            role: { in: ["Admin", "SuperAdmin"] },
          },
          select: { id: true },
        });
        validUserId = adminUser?.id;
      }

      // If still no valid user, skip history creation (optional)
      if (validUserId) {
        try {
          await prisma.importHistory.create({
            data: {
              fileName: req.file.originalname,
              fileSize: req.file.size,
              fileType: fileExtension,
              totalRows: results.total,
              successfulRows: results.successful,
              failedRows: results.failed,
              skippedRows: 0,
              importedBy: validUserId,
              errors: results.errors.length > 0 ? results.errors : undefined,
            },
          });
        } catch (historyError: any) {
          // Log but don't fail the import if history creation fails
          console.error(
            "Failed to create import history:",
            historyError.message
          );
        }
      }

      // Cleanup uploaded file
      if (filePath) {
        cleanupFile(filePath);
      }

      res.json({
        message: "Import completed",
        ...results,
      });
    } catch (error: any) {
      // Cleanup uploaded file on error
      if (filePath) {
        try {
          cleanupFile(filePath);
        } catch (cleanupError) {
          console.error("File cleanup error:", cleanupError);
        }
      }

      console.error("Import error:", error);
      console.error("Error stack:", error.stack);
      res.status(500).json({
        error: "Import failed",
        message: error.message || "Unknown error occurred",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }

  // Generic import for other entities
  async importEntity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { entityType } = req.params;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" }) as any;
      }

      const { rows: data } = await readSheetToJson(req.file.path);

      // Entity-specific import logic would go here
      const validEntities = [
        "Company",
        "Disease",
        "TradeName",
        "ContractingCompany",
      ];

      if (!validEntities.includes(entityType)) {
        return res.status(400).json({ error: "Invalid entity type" }) as any;
      }

      res.json({
        message: `${entityType} import completed`,
        recordsProcessed: data.length,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get import history
  async getImportHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page = 1, limit = 20 } = req.query;

      const [history, total] = await Promise.all([
        prisma.importHistory.findMany({
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
          orderBy: { importDate: "desc" },
          include: {
            importer: {
              select: {
                id: true,
                email: true,
                role: true,
              },
            },
          },
        }),
        prisma.importHistory.count(),
      ]);

      res.json({
        history,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Helper methods
  private parseArrayField(value: any): any {
    if (!value || value === "NA") return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      // Try to parse as JSON array
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
      } catch {
        // Split by comma or newline
        return value
          .split(/[,\n]/)
          .map((s: string) => s.trim())
          .filter((s: string) => s);
      }
    }
    return [String(value)];
  }

  private getFieldValue(row: any, possibleKeys: string[]): string | null {
    // First try exact matches
    for (const key of possibleKeys) {
      const value = row[key];
      if (value !== undefined && value !== null && value !== "") {
        return String(value).trim();
      }
    }

    // Then try case-insensitive and trimmed matches
    const rowKeys = Object.keys(row);
    for (const key of possibleKeys) {
      const normalizedKey = key.trim().toLowerCase();
      for (const rowKey of rowKeys) {
        if (rowKey.trim().toLowerCase() === normalizedKey) {
          const value = row[rowKey];
          if (value !== undefined && value !== null && value !== "") {
            return String(value).trim();
          }
        }
      }
    }

    return null;
  }

  private mapSideEffectField(csvKey: string): string | null {
    const normalized = csvKey.trim().replace(/\s+/g, " ");
    const lower = normalized.toLowerCase();

    // Determine frequency prefix
    let prefix = "";
    if (lower.includes("very common")) prefix = "veryCommon";
    else if (
      lower.includes("common") &&
      !lower.includes("uncommon") &&
      !lower.includes("very")
    )
      prefix = "common";
    else if (lower.includes("uncommon")) prefix = "uncommon";
    else if (lower.includes("very rare")) prefix = "veryRare";
    else if (lower.includes("rare") && !lower.includes("very")) prefix = "rare";
    else if (lower.includes("unknown")) prefix = "unknown";
    else return null;

    // Determine system suffix - match exact Prisma schema field names
    let suffix = "";
    if (lower.includes("git") || lower.includes("gastrointestinal")) {
      suffix = "GIT";
    } else if (lower.includes("blood") || lower.includes("lymphatic")) {
      suffix = "Blood";
    } else if (lower.includes("vascular")) {
      suffix = "Vascular";
    } else if (lower.includes("cardiac") || lower.includes("heart")) {
      suffix = "Cardiac";
    } else if (lower.includes("musculoskeletal") || lower.includes("musculo")) {
      suffix = "Musculoskeletal";
    } else if (lower.includes("nervous") && !lower.includes("psychiatric")) {
      if (
        prefix === "uncommon" ||
        prefix === "rare" ||
        prefix === "veryRare" ||
        prefix === "unknown"
      ) {
        suffix = "Nervous";
      } else {
        suffix = "NervousSystem";
      }
    } else if (lower.includes("eye") || lower.includes("ocular")) {
      suffix = "Eye";
    } else if (lower.includes("metabolism") || lower.includes("nutrition")) {
      suffix = "Metabolism";
    } else if (lower.includes("ear") || lower.includes("labyrinth")) {
      suffix = "Ear";
    } else if (
      lower.includes("respiratory") ||
      lower.includes("respiratory") ||
      lower.includes("pulmonary")
    ) {
      suffix = "Respiratory";
    } else if (lower.includes("skin") || lower.includes("subcutaneous")) {
      suffix = "Skin";
    } else if (lower.includes("infection") || lower.includes("infestation")) {
      suffix = "Infections";
    } else if (lower.includes("psychiatric")) {
      suffix = "Psychiatric";
    } else if (lower.includes("renal") || lower.includes("kidney")) {
      suffix = "Renal";
    } else if (
      lower.includes("hepatic") ||
      lower.includes("hepatobiliary") ||
      lower.includes("liver")
    ) {
      if (
        prefix === "common" ||
        prefix === "uncommon" ||
        prefix === "veryRare" ||
        prefix === "unknown"
      ) {
        suffix = "Hepatobiliary";
      } else {
        suffix = "Hepatic";
      }
    } else if (lower.includes("immune") || lower.includes("immunity")) {
      if (prefix === "common" || prefix === "uncommon") {
        suffix = "Immunity";
      } else if (prefix === "rare" || prefix === "veryRare") {
        suffix = "Immune";
      } else {
        suffix = "Immune";
      }
    } else if (lower.includes("endocrine")) {
      suffix = "Endocrine";
    } else if (lower.includes("general")) {
      suffix = "General";
    } else {
      return null;
    }

    // Special handling for specific field name variations
    const fieldName = `${prefix}${suffix}`;

    // Validate against known Prisma schema field names
    const validFields = [
      "veryCommonGIT",
      "veryCommonBlood",
      "veryCommonVascular",
      "veryCommonCardiac",
      "veryCommonMusculoskeletal",
      "veryCommonNervousSystem",
      "veryCommonEye",
      "veryCommonMetabolism",
      "veryCommonEar",
      "veryCommonRespiratory",
      "veryCommonSkin",
      "veryCommonInfection",
      "veryCommonPsychiatric",
      "veryCommonRenal",
      "veryCommonHepatic",
      "veryCommonGeneral",
      "commonGIT",
      "commonVascular",
      "commonInfections",
      "commonRespiratory",
      "commonCardiac",
      "commonBlood",
      "commonSkin",
      "commonEye",
      "commonEar",
      "commonMetabolism",
      "commonGeneral",
      "commonHepatobiliary",
      "commonImmunity",
      "commonPsychiatric",
      "commonNervousSystem",
      "commonRenal",
      "commonMusculoskeletal",
      "uncommonNervous",
      "uncommonInfections",
      "uncommonPsychiatric",
      "uncommonEye",
      "uncommonRespiratory",
      "uncommonSkin",
      "uncommonRenal",
      "uncommonHepatobiliary",
      "uncommonVascular",
      "uncommonGIT",
      "uncommonMusculoskeletal",
      "uncommonMetabolism",
      "uncommonEar",
      "uncommonCardiac",
      "uncommonBlood",
      "uncommonImmunity",
      "uncommonGeneral",
      "rareEar",
      "rareBlood",
      "rareGIT",
      "rareHepatic",
      "rareInfections",
      "rareCardiac",
      "rareVascular",
      "rareImmune",
      "rareMetabolism",
      "rareNervous",
      "rareMusculoskeletal",
      "rarePsychiatric",
      "rareEye",
      "rareRenal",
      "rareSkin",
      "rareRespiratory",
      "rareEndocrine",
      "rareGeneral",
      "veryRareVascular",
      "veryRareEndocrine",
      "veryRareNervous",
      "veryRarePsychiatric",
      "veryRareEye",
      "veryRareMusculoskeletal",
      "veryRareBlood",
      "veryRareCardiac",
      "veryRareImmune",
      "veryRareEar",
      "veryRareRenal",
      "veryRareGIT",
      "veryRareHepatobiliary",
      "veryRareInfections",
      "veryRareRespiratory",
      "veryRareSkin",
      "veryRareGeneral",
      "veryRareMetabolism",
      "unknownNervous",
      "unknownMusculoskeletal",
      "unknownPsychiatric",
      "unknownHepatobiliary",
      "unknownRenal",
      "unknownSkin",
      "unknownRespiratory",
      "unknownImmune",
      "unknownVascular",
      "unknownEar",
      "unknownGIT",
      "unknownGeneral",
      "unknownMetabolism",
      "unknownEye",
      "unknownBlood",
      "unknownCardiac",
      "unknownInfections",
      "unknownEndocrine",
    ];

    if (validFields.includes(fieldName)) {
      return fieldName;
    }

    return null;
  }
}

export default new ImportController();
