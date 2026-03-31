import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import {
  createActiveSubstanceSchema,
  updateActiveSubstanceSchema,
} from "../zod/createActiveSubstance.zod";

// Create Active Substance
export const createActiveSubstance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = createActiveSubstanceSchema.parse(req.body);

    const activeSubstance = await prisma.activeSubstance.create({
      data: validatedData as any, // Cast due to 178 fields complexity
    });

    res.status(201).json({
      message: "Active substance created successfully",
      activeSubstance,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    if (error.code === "P2002") {
      res
        .status(409)
        .json({ error: "Active substance with this name already exists" });
      return;
    }
    next(error);
  }
};

// Get Active Substance by ID
export const getActiveSubstanceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const activeSubstance = await prisma.activeSubstance.findUnique({
      where: { id: parseInt(id) },
      include: {
        tradeNames: true,
        adverseReactions: {
          take: 10,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!activeSubstance) {
      res.status(404).json({ error: "Active substance not found" });
      return;
    }

    res.json(activeSubstance);
  } catch (error) {
    next(error);
  }
};

// List distinct classifications (Step 1 of doctor Add A New Drug flow)
export const listClassifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const rows = await prisma.classification.findMany({
      where: q ? { name: { contains: q, mode: "insensitive" } } : undefined,
      select: { name: true, id: true },
      orderBy: { name: "asc" },
      take: 200,
    });
    const classifications = rows
      .map((r) => ({ name: r.name, id: r.id }))
      .filter((c): c is { name: string, id: number } => c != null && c.name !== "" && c.id !== undefined)
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
    res.json({ classifications });
  } catch (error) {
    next(error);
  }
};

// List distinct concentrations (Conc for this API - doctor Add A New Drug flow)
export const listConcentrations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const classification = typeof req.query.classification === "string" ? req.query.classification.trim() : "";
    const activeSubstanceIdParam = req.query.activeSubstanceId;
    const activeSubstanceId =
      activeSubstanceIdParam !== undefined && activeSubstanceIdParam !== ""
        ? parseInt(String(activeSubstanceIdParam), 10)
        : undefined;

    const where: any = { concentration: { not: null } };
    if (q) {
      where.concentration = { contains: q, mode: "insensitive" };
    }
    if (classification) {
      where.classification = { is: { name: { contains: classification, mode: "insensitive" } } };
    }
    if (activeSubstanceId !== undefined && !Number.isNaN(activeSubstanceId)) {
      where.id = activeSubstanceId;
    }

    const rows = await prisma.activeSubstance.findMany({
      where,
      select: { concentration: true },
      distinct: ["concentration"],
      orderBy: { concentration: "asc" },
      take: 200,
    });
    const concentrations = rows
      .map((r) => r.concentration)
      .filter((c): c is string => c != null)
      .sort((a, b) => (a || "").localeCompare(b || "", undefined, { sensitivity: "base" }));
    res.json({ concentrations });
  } catch (error) {
    next(error);
  }
};

// List distinct dosage forms (Step 3 of doctor Add A New Drug flow)
export const listDosageForms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const classification = typeof req.query.classification === "string" ? req.query.classification.trim() : "";
    const activeSubstanceIdParam = req.query.activeSubstanceId;
    const activeSubstanceId =
      activeSubstanceIdParam !== undefined && activeSubstanceIdParam !== ""
        ? parseInt(String(activeSubstanceIdParam), 10)
        : undefined;

    const where: any = { dosageForm: { not: null } };
    if (q) {
      where.dosageForm = { contains: q, mode: "insensitive" };
    }
    if (classification) {
      where.classification = { is: { name: { contains: classification, mode: "insensitive" } } };
    }
    if (activeSubstanceId !== undefined && !Number.isNaN(activeSubstanceId)) {
      where.id = activeSubstanceId;
    }

    const rows = await prisma.activeSubstance.findMany({
      where,
      select: { dosageForm: true },
      distinct: ["dosageForm"],
      orderBy: { dosageForm: "asc" },
      take: 200,
    });
    const dosageForms = rows
      .map((r) => r.dosageForm)
      .filter((d): d is string => d != null)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    res.json({ dosageForms });
  } catch (error) {
    next(error);
  }
};

// Search Active Substances
export const searchActiveSubstances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search,
      therapeuticClass,
      classification,
      page = "1",
      limit = "20",
    } = req.query;

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        {
          name: { contains: search as string, mode: "insensitive" },
        },
        {
          classification: {
            is: { name: { contains: search as string, mode: "insensitive" } },
          },
        },
      ];
    }

    const classificationFilter = classification || therapeuticClass;
    if (classificationFilter) {
      whereClause.classification = {
        is: {
          name: { contains: classificationFilter as string, mode: "insensitive" },
        },
      };
    }

    // NOTE: companyId/requiresPrescription were removed from ActiveSubstance schema.

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const [substances, total] = await Promise.all([
      prisma.activeSubstance.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { name: "asc" },
        include: {
          _count: { select: { tradeNames: true } },
        },
      }),
      prisma.activeSubstance.count({ where: whereClause }),
    ]);

    res.json({
      substances,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update Active Substance
export const updateActiveSubstance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validatedData = updateActiveSubstanceSchema.parse(req.body);

    const activeSubstance = await prisma.activeSubstance.update({
      where: { id: parseInt(id) },
      data: validatedData as any,
    });

    res.json({
      message: "Active substance updated successfully",
      activeSubstance,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Active substance not found" });
      return;
    }
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

// Delete Active Substance
export const deleteActiveSubstance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.activeSubstance.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Active substance deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Active substance not found" });
      return;
    }
    next(error);
  }
};

// Get Drug Interactions for Active Substance
export const getDrugInteractions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Get all trade names for this active substance
    const tradeNames = await prisma.tradeName.findMany({
      where: { activeSubstanceId: parseInt(id) },
      select: { id: true },
    });

    const tradeNameIds = tradeNames.map((tn) => tn.id);

    if (tradeNameIds.length === 0) {
      res.json([]);
      return;
    }

    // Find all drug interaction alerts for prescriptions that use trade names of this active substance
    // or where the interacting medicine is a trade name of this active substance
    const interactions = await prisma.drugInteractionAlert.findMany({
      where: {
        OR: [
          {
            prescription: {
              prescriptionMedicines: {
                some: { patientMedicine: { tradeNameId: { in: tradeNameIds } } },
              },
            },
          },
          {
            interactingMedicineId: {
              in: tradeNameIds,
            },
          },
        ],
      },
      include: {
        prescription: {
          include: {
            prescriptionMedicines: {
              include: {
                patientMedicine: {
                  include: {
                    tradeName: {
                      include: {
                        activeSubstance: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        interactingMedicine: {
          include: {
            activeSubstance: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(interactions);
  } catch (error) {
    next(error);
  }
};
