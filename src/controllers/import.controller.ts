import { Request, Response, NextFunction } from "express";
import ExcelJS from "exceljs";
import * as fs from "fs";
import * as path from "path";
import { prisma } from "../lib/prisma";
import { cleanupFile } from "../config/multer.config";

const BATCH_SIZE = 100;

async function loadWorkbook(filePath: string): Promise<ExcelJS.Workbook> {
  const workbook = new ExcelJS.Workbook();
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".csv") {
    await workbook.csv.readFile(filePath);
  } else {
    await workbook.xlsx.readFile(filePath);
  }
  return workbook;
}

/** Read Excel/CSV file and return array of row objects (like XLSX.utils.sheet_to_json). */
async function readSheetToJson(
  filePath: string
): Promise<{ sheetNames: string[]; rows: Record<string, unknown>[] }> {
  const workbook = await loadWorkbook(filePath);
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

/** Read Excel file and return rows indexed by 1-based column number (header row is skipped). */
async function readSheetByColIndex(
  filePath: string
): Promise<{ sheetNames: string[]; rows: Record<number, unknown>[] }> {
  const workbook = await loadWorkbook(filePath);
  const sheetNames = workbook.worksheets.map((ws) => ws.name);
  if (sheetNames.length === 0) {
    return { sheetNames: [], rows: [] };
  }
  const worksheet = workbook.worksheets[0];
  const rows: Record<number, unknown>[] = [];
  const rowCount = worksheet.rowCount ?? 0;
  for (let r = 2; r <= rowCount; r++) {
    const excelRow = worksheet.getRow(r);
    const obj: Record<number, unknown> = {};
    excelRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const v = cell.value;
      obj[colNumber] =
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

/**
 * Maps 1-based Excel column index → { field: Prisma field name, isArray: parse as array }
 * Column order matches the actual client CSV layout (183 columns total).
 * Columns with no matching Prisma field (e.g. excipients, Trade Name) are intentionally omitted.
 */
const ACTIVE_SUBSTANCE_COLUMNS: Record<number, { field: string; isArray: boolean }> = {
  // ── Basic Info (cols 1–9) ─────────────────────────────────────────────────
  1:   { field: "activeSubstance",               isArray: false },
  2:   { field: "concentration",                 isArray: false },
  3:   { field: "classification",                isArray: false },
  4:   { field: "dosageForm",                    isArray: false },
  5:   { field: "indication",                    isArray: false },
  // ── Dosage (cols 6–9) ─────────────────────────────────────────────────────
  6:   { field: "adultDoseMaxPerDay",            isArray: false },
  7:   { field: "adultDoseMgPerKg",              isArray: false },
  8:   { field: "doseInKg",                      isArray: false },
  9:   { field: "pediatricDose",                 isArray: false },
  // col 10 = "excipients" → separate model, not stored on activeSubstance
  // ── Warnings (cols 11–37) ─────────────────────────────────────────────────
  11:  { field: "eliminationPathway",            isArray: false },
  12:  { field: "contraindications",             isArray: true  },
  13:  { field: "pregnancyWarning",              isArray: false },
  14:  { field: "reproductiveWarningFemale",     isArray: false },
  15:  { field: "reproductiveWarningMale",       isArray: false },
  16:  { field: "specialPopulationChildren",     isArray: false },
  17:  { field: "specialPopulationElderly",      isArray: false },
  18:  { field: "ethnicAction",                  isArray: false },
  19:  { field: "hepaticWarning",                isArray: false },
  20:  { field: "renalWarning",                  isArray: false },
  21:  { field: "medicationErrorWarning",        isArray: false },
  22:  { field: "carcinogenicityMutagenicity",   isArray: false },
  23:  { field: "gitWarning",                    isArray: false },
  24:  { field: "metabolismWarning",             isArray: false },
  25:  { field: "pulmonaryWarning",              isArray: false },
  26:  { field: "immuneSystemWarning",           isArray: false },
  27:  { field: "infectionWarning",              isArray: false },
  28:  { field: "bloodWarning",                  isArray: false },
  29:  { field: "vascularWarning",               isArray: false },
  30:  { field: "electrolyteImbalanceWarning",   isArray: false },
  31:  { field: "cardiacWarning",                isArray: false },
  32:  { field: "psychiatricWarning",            isArray: false },
  33:  { field: "nervousSystemWarning",          isArray: false },
  34:  { field: "skinConnectiveTissueWarning",   isArray: false },
  35:  { field: "musculoSkeletalWarning",        isArray: false },
  36:  { field: "eyeDisordersWarning",           isArray: false },
  37:  { field: "earDisordersWarning",           isArray: false },
  // ── Drug Interactions (cols 38–69) ───────────────────────────────────────
  38:  { field: "interactionVitaminsFood",       isArray: true  },
  39:  { field: "interactionBisphosphonates",    isArray: true  },
  40:  { field: "interactionAlcohol",            isArray: true  },
  41:  { field: "interactionMuscleRelaxant",     isArray: true  },
  42:  { field: "interactionRetinoids",          isArray: true  },
  43:  { field: "interactionCorticosteroids",    isArray: true  },
  44:  { field: "interactionXanthines",          isArray: true  },
  45:  { field: "interactionSympathomimetics",   isArray: true  },
  46:  { field: "interactionAnticholinergic",    isArray: true  },
  47:  { field: "interactionChemotherapy",       isArray: true  },
  48:  { field: "interactionAntibiotics",        isArray: true  },
  49:  { field: "interactionHormones",           isArray: true  },
  50:  { field: "interactionStatins",            isArray: true  },
  51:  { field: "interactionAntihypertensive",   isArray: true  },
  52:  { field: "interactionAntidiuretics",      isArray: true  },
  53:  { field: "interactionAntidepressant",     isArray: true  },
  54:  { field: "interactionAntidiabetic",       isArray: true  },
  55:  { field: "interactionLowBloodSugarAgents",isArray: true  },
  56:  { field: "interactionDigoxin",            isArray: true  },
  57:  { field: "interactionAnticoagulant",      isArray: true  },
  58:  { field: "interactionNSAIDs",             isArray: true  },
  59:  { field: "interactionImmunosuppressive",  isArray: true  },
  60:  { field: "interactionAntacids",           isArray: true  },
  61:  { field: "interactionUricosurics",        isArray: true  },
  62:  { field: "interactionProtectants",        isArray: true  },
  63:  { field: "interactionAntiParkinson",      isArray: true  },
  64:  { field: "interactionHIVProtease",        isArray: true  },
  65:  { field: "ironChelator",                  isArray: false },
  66:  { field: "interactionBloodProduct",       isArray: true  },
  67:  { field: "interactionVaccines",           isArray: true  },
  68:  { field: "interactionAnthelmintics",      isArray: true  },
  69:  { field: "interactionPDE5Inhibitors",     isArray: true  },
  // ── Lab / Driving (cols 70–71) ────────────────────────────────────────────
  70:  { field: "interferenceLabTests",          isArray: false },
  71:  { field: "effectOnDriving",               isArray: false },
  // ── Side Effects: Very Common (cols 72–87) ───────────────────────────────
  72:  { field: "veryCommonGIT",                 isArray: true  },
  73:  { field: "veryCommonBlood",               isArray: true  },
  74:  { field: "veryCommonVascular",            isArray: true  },
  75:  { field: "veryCommonCardiac",             isArray: true  },
  76:  { field: "veryCommonMusculoskeletal",     isArray: true  },
  77:  { field: "veryCommonNervousSystem",       isArray: true  },
  78:  { field: "veryCommonEye",                 isArray: true  },
  79:  { field: "veryCommonMetabolism",          isArray: true  },
  80:  { field: "veryCommonEar",                 isArray: true  },
  81:  { field: "veryCommonRespiratory",         isArray: true  },
  82:  { field: "veryCommonSkin",                isArray: true  },
  83:  { field: "veryCommonInfection",           isArray: true  },
  84:  { field: "veryCommonPsychiatric",         isArray: true  },
  85:  { field: "veryCommonRenal",               isArray: true  },
  86:  { field: "veryCommonHepatic",             isArray: true  },
  87:  { field: "veryCommonGeneral",             isArray: true  },
  // ── Side Effects: Common (cols 88–104) ───────────────────────────────────
  88:  { field: "commonGIT",                     isArray: true  },
  89:  { field: "commonVascular",                isArray: true  },
  90:  { field: "commonInfections",              isArray: true  },
  91:  { field: "commonRespiratory",             isArray: true  },
  92:  { field: "commonCardiac",                 isArray: true  },
  93:  { field: "commonBlood",                   isArray: true  },
  94:  { field: "commonSkin",                    isArray: true  },
  95:  { field: "commonEye",                     isArray: true  },
  96:  { field: "commonEar",                     isArray: true  },
  97:  { field: "commonMetabolism",              isArray: true  },
  98:  { field: "commonGeneral",                 isArray: true  },
  99:  { field: "commonHepatobiliary",           isArray: true  },
  100: { field: "commonImmunity",                isArray: true  },
  101: { field: "commonPsychiatric",             isArray: true  },
  102: { field: "commonNervousSystem",           isArray: true  },
  103: { field: "commonRenal",                   isArray: true  },
  104: { field: "commonMusculoskeletal",         isArray: true  },
  // ── Side Effects: Uncommon (cols 105–121) ────────────────────────────────
  105: { field: "uncommonNervous",               isArray: true  },
  106: { field: "uncommonInfections",            isArray: true  },
  107: { field: "uncommonPsychiatric",           isArray: true  },
  108: { field: "uncommonEye",                   isArray: true  },
  109: { field: "uncommonRespiratory",           isArray: true  },
  110: { field: "uncommonSkin",                  isArray: true  },
  111: { field: "uncommonRenal",                 isArray: true  },
  112: { field: "uncommonHepatobiliary",         isArray: true  },
  113: { field: "uncommonVascular",              isArray: true  },
  114: { field: "uncommonGIT",                   isArray: true  },
  115: { field: "uncommonMusculoskeletal",       isArray: true  },
  116: { field: "uncommonMetabolism",            isArray: true  },
  117: { field: "uncommonEar",                   isArray: true  },
  118: { field: "uncommonCardiac",               isArray: true  },
  119: { field: "uncommonBlood",                 isArray: true  },
  120: { field: "uncommonImmunity",              isArray: true  },
  121: { field: "uncommonGeneral",               isArray: true  },
  // ── Side Effects: Rare (cols 122–139) ────────────────────────────────────
  122: { field: "rareEar",                       isArray: true  },
  123: { field: "rareBlood",                     isArray: true  },
  124: { field: "rareGIT",                       isArray: true  },
  125: { field: "rareHepatic",                   isArray: true  },
  126: { field: "rareInfections",                isArray: true  },
  127: { field: "rareCardiac",                   isArray: true  },
  128: { field: "rareVascular",                  isArray: true  },
  129: { field: "rareImmune",                    isArray: true  },
  130: { field: "rareMetabolism",                isArray: true  },
  131: { field: "rareNervous",                   isArray: true  },
  132: { field: "rareMusculoskeletal",           isArray: true  },
  133: { field: "rarePsychiatric",               isArray: true  },
  134: { field: "rareEye",                       isArray: true  },
  135: { field: "rareRenal",                     isArray: true  },
  136: { field: "rareSkin",                      isArray: true  },
  137: { field: "rareRespiratory",               isArray: true  },
  138: { field: "rareEndocrine",                 isArray: true  },
  139: { field: "rareGeneral",                   isArray: true  },
  // ── Side Effects: Very Rare (cols 140–157) ───────────────────────────────
  140: { field: "veryRareVascular",              isArray: true  },
  141: { field: "veryRareEndocrine",             isArray: true  },
  142: { field: "veryRareNervous",               isArray: true  },
  143: { field: "veryRarePsychiatric",           isArray: true  },
  144: { field: "veryRareEye",                   isArray: true  },
  145: { field: "veryRareMusculoskeletal",       isArray: true  },
  146: { field: "veryRareBlood",                 isArray: true  },
  147: { field: "veryRareCardiac",               isArray: true  },
  148: { field: "veryRareImmune",                isArray: true  },
  149: { field: "veryRareEar",                   isArray: true  },
  150: { field: "veryRareRenal",                 isArray: true  },
  151: { field: "veryRareGIT",                   isArray: true  },
  152: { field: "veryRareHepatobiliary",         isArray: true  },
  153: { field: "veryRareInfections",            isArray: true  },
  154: { field: "veryRareRespiratory",           isArray: true  },
  155: { field: "veryRareSkin",                  isArray: true  },
  156: { field: "veryRareGeneral",               isArray: true  },
  157: { field: "veryRareMetabolism",            isArray: true  },
  // ── Side Effects: Unknown (cols 158–175) ─────────────────────────────────
  158: { field: "unknownNervous",                isArray: true  },
  159: { field: "unknownMusculoskeletal",        isArray: true  },
  160: { field: "unknownPsychiatric",            isArray: true  },
  161: { field: "unknownHepatobiliary",          isArray: true  },
  162: { field: "unknownRenal",                  isArray: true  },
  163: { field: "unknownSkin",                   isArray: true  },
  164: { field: "unknownRespiratory",            isArray: true  },
  165: { field: "unknownImmune",                 isArray: true  },
  166: { field: "unknownVascular",               isArray: true  },
  167: { field: "unknownEar",                    isArray: true  },
  168: { field: "unknownGIT",                    isArray: true  },
  169: { field: "unknownGeneral",                isArray: true  },
  170: { field: "unknownMetabolism",             isArray: true  },
  171: { field: "unknownEye",                    isArray: true  },
  172: { field: "unknownBlood",                  isArray: true  },
  173: { field: "unknownCardiac",                isArray: true  },
  174: { field: "unknownInfections",             isArray: true  },
  175: { field: "unknownEndocrine",              isArray: true  },
  // ── Additional (cols 176–179) ─────────────────────────────────────────────
  176: { field: "additiveRMM",                   isArray: false },
  177: { field: "pregnancyCategory",             isArray: false },
  178: { field: "additionalMonitoring",          isArray: false },
  179: { field: "highlightedWarning",            isArray: false },
  // col 180 = Trade Name (handled during active-substance import to create TradeName rows)
  // cols 181–183 = MAH, Batch Number, Bar Code (currently skipped in this flow)
};

class ImportController {
  private activeSubstanceDbColumnsCache: Set<string> | null = null;

  private async getActiveSubstanceDbColumns(): Promise<Set<string> | null> {
    if (this.activeSubstanceDbColumnsCache) {
      return this.activeSubstanceDbColumnsCache;
    }
    try {
      const columns = await prisma.$queryRaw<Array<{ column_name: string }>>`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'active_substances'
      `;
      this.activeSubstanceDbColumnsCache = new Set(
        columns.map((row) => row.column_name)
      );
      return this.activeSubstanceDbColumnsCache;
    } catch (error) {
      console.warn(
        "Could not read active_substances columns from information_schema; falling back to full payload.",
        error
      );
      return null;
    }
  }

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

      let rawData: Record<number, unknown>[];
      try {
        const { sheetNames, rows } = await readSheetByColIndex(filePath);
        if (!sheetNames.length || rows.length === 0) {
          return res
            .status(400)
            .json({ error: "File contains no sheets or is empty" }) as any;
        }
        rawData = rows;
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
        errors: [] as Array<{ row: number; data: string; error: string }>,
      };

      const activeSubstanceDbColumns = await this.getActiveSubstanceDbColumns();

      for (let i = 0; i < rawData.length; i += BATCH_SIZE) {
        const batch = rawData.slice(i, i + BATCH_SIZE);

        for (const row of batch) {
          const rowIndex = i + batch.indexOf(row) + 2;
          try {
            console.log("row", row);
            const activeSubstanceName = row[1];
            if (!activeSubstanceName || String(activeSubstanceName).trim() === "") {
              throw new Error("Active substance name is required (column 1 is empty)");
            }

            const cleanData: any = {};
            for (const [colStr, { field, isArray }] of Object.entries(ACTIVE_SUBSTANCE_COLUMNS)) {
              if (activeSubstanceDbColumns && !activeSubstanceDbColumns.has(field)) {
                continue;
              }
              const value = row[Number(colStr)];
              if (value === undefined || value === null || value === "") continue;
              cleanData[field] = isArray
                ? this.parseArrayField(value)
                : String(value).trim();
            }

            if (!cleanData.activeSubstance) {
              throw new Error("Active substance name is required");
            }

            const createdActiveSubstance = await prisma.activeSubstance.create({
              data: cleanData,
              // Important: DB may be behind Prisma schema. Returning only `id`
              // avoids selecting missing columns on INSERT response.
              select: { id: true },
            });

            // Column 180 contains one or many trade names, comma-separated.
            // Create TradeName records linked to the newly created active substance.
            const tradeNameCell = row[180];
            const parsedTradeNames = this.parseCommaSeparatedTradeNames(tradeNameCell);
            for (const tradeNameTitle of parsedTradeNames) {
              await prisma.tradeName.create({
                data: {
                  title: tradeNameTitle,
                  activeSubstanceId: createdActiveSubstance.id,
                },
              });
            }
            results.created++;
            results.successful++;
          } catch (error: any) {
            results.failed++;
            const errorMsg = error.message || String(error);
            console.error(`Row ${rowIndex} error:`, errorMsg);
            results.errors.push({
              row: rowIndex,
              data: String(row[1] ?? "Unknown"),
              error: errorMsg,
            });
          }
        }
      }

      const fileExtension =
        req.file.originalname.split(".").pop()?.toLowerCase() || "csv";
      const userId = (req as any).user?.id;

      let validUserId = userId;
      if (!validUserId) {
        const adminUser = await prisma.user.findFirst({
          where: { role: { in: ["Admin", "SuperAdmin"] } },
          select: { id: true },
        });
        validUserId = adminUser?.id;
      }

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
          console.error("Failed to create import history:", historyError.message);
        }
      }

      if (filePath) {
        cleanupFile(filePath);
      }

      res.json({ message: "Import completed", ...results });
    } catch (error: any) {
      if (filePath) {
        try {
          cleanupFile(filePath);
        } catch (cleanupError) {
          console.error("File cleanup error:", cleanupError);
        }
      }
      console.error("Import error:", error);
      res.status(500).json({
        error: "Import failed",
        message: error.message || "Unknown error occurred",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  }

  // Generic import for other entities
  async importEntity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const filePath = req.file?.path;
    try {
      const { entityType } = req.params;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" }) as any;
      }

      const validEntities = [
        "Company",
        "Disease",
        "TradeName",
        "ContractingCompany",
      ];

      if (!validEntities.includes(entityType)) {
        cleanupFile(req.file.path);
        return res.status(400).json({ error: "Invalid entity type" }) as any;
      }

      const { rows: data } = await readSheetToJson(req.file.path);

      const results = { total: data.length, successful: 0, failed: 0, errors: [] as string[] };

      if (entityType === "Company") {
        for (const row of data) {
          try {
            const name = this.getFieldValue(row, ["name", "company name"]);
            if (!name) { results.failed++; results.errors.push("Row missing required field: name"); continue; }
            const address = this.getFieldValue(row, ["address"]);
            const governorate = this.getFieldValue(row, ["governorate"]);
            const country = this.getFieldValue(row, ["country"]);
            await prisma.company.upsert({
              where: { name: String(name) },
              update: {
                address: address ? String(address) : undefined,
                governorate: governorate ? String(governorate) : undefined,
                country: country ? String(country) : undefined,
              },
              create: {
                name: String(name),
                address: address ? String(address) : undefined,
                governorate: governorate ? String(governorate) : undefined,
                country: country ? String(country) : undefined,
              },
            });
            results.successful++;
          } catch (err: any) {
            results.failed++;
            results.errors.push(err.message);
          }
        }
      } else if (entityType === "Disease") {
        const validSeverities = ["None", "Mild", "Moderate", "Severe", "Critical"];
        for (const row of data) {
          try {
            const name = this.getFieldValue(row, ["name", "disease name"]);
            const severityRaw = this.getFieldValue(row, ["severity"]);
            const severity = validSeverities.includes(String(severityRaw)) ? String(severityRaw) : "None";
            if (!name) { results.failed++; results.errors.push("Row missing required field: name"); continue; }
            const description = this.getFieldValue(row, ["description"]);
            await prisma.disease.upsert({
              where: { name: String(name) },
              update: {
                severity: severity as any,
                description: description ? String(description) : undefined,
              },
              create: {
                name: String(name),
                severity: severity as any,
                description: description ? String(description) : undefined,
              },
            });
            results.successful++;
          } catch (err: any) {
            results.failed++;
            results.errors.push(err.message);
          }
        }
      } else if (entityType === "TradeName") {
        for (const row of data) {
          try {
            const title = this.getFieldValue(row, ["title", "trade name"]);
            const activeSubstanceId = this.getFieldValue(row, ["activesubstanceid", "active substance id"]);
            const companyId = this.getFieldValue(row, ["companyid", "company id"]);
            if (!title || !activeSubstanceId || !companyId) {
              results.failed++;
              results.errors.push("Row missing required fields: title, activeSubstanceId, companyId");
              continue;
            }
            const barCode = this.getFieldValue(row, ["barcode", "bar code"]);
            await prisma.tradeName.create({
              data: {
                title: String(title),
                activeSubstanceId: Number(activeSubstanceId),
                companyId: Number(companyId),
                barCode: barCode ? String(barCode) : undefined,
              },
            });
            results.successful++;
          } catch (err: any) {
            results.failed++;
            results.errors.push(err.message);
          }
        }
      } else if (entityType === "ContractingCompany") {
        for (const row of data) {
          try {
            const title = this.getFieldValue(row, ["title", "contracting company"]);
            const companyId = this.getFieldValue(row, ["companyid", "company id"]);
            const contractingDateRaw = this.getFieldValue(row, ["contractingdate", "contracting date"]);
            if (!title || !companyId || !contractingDateRaw) {
              results.failed++;
              results.errors.push("Row missing required fields: title, companyId, contractingDate");
              continue;
            }
            const expiryDateRaw = this.getFieldValue(row, ["expirydate", "expiry date"]);
            await prisma.contractingCompany.create({
              data: {
                title: String(title),
                companyId: Number(companyId),
                contractingDate: new Date(String(contractingDateRaw)),
                expiryDate: expiryDateRaw ? new Date(String(expiryDateRaw)) : undefined,
              },
            });
            results.successful++;
          } catch (err: any) {
            results.failed++;
            results.errors.push(err.message);
          }
        }
      }

      // Record import history
      const userId = (req as any).user?.userId;
      const validUserId = userId && !isNaN(Number(userId)) ? Number(userId) : null;
      if (validUserId) {
        try {
          const fileExtension = req.file.originalname.split(".").pop()?.toLowerCase() || "xlsx";
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
          console.error("Failed to create import history:", historyError.message);
        }
      }

      if (filePath) cleanupFile(filePath);

      res.json({
        message: `${entityType} import completed`,
        ...results,
      });
    } catch (error) {
      if (filePath) {
        try { cleanupFile(filePath); } catch (_) {}
      }
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

  private parseCommaSeparatedTradeNames(value: unknown): string[] {
    if (value === undefined || value === null) return [];

    const normalized = String(value)
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    // De-duplicate trade names per row while preserving order.
    return Array.from(new Set(normalized));
  }

}

export default new ImportController();
