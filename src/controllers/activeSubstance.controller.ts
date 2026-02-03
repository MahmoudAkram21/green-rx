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
      companyId,
      requiresPrescription,
      page = "1",
      limit = "20",
    } = req.query;

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        {
          activeSubstance: { contains: search as string, mode: "insensitive" },
        },
        { classification: { contains: search as string, mode: "insensitive" } },
      ];
    }

    if (therapeuticClass) {
      whereClause.classification = {
        contains: therapeuticClass as string,
        mode: "insensitive",
      };
    }

    if (companyId) {
      whereClause.companyId = parseInt(companyId as string);
    }

    if (requiresPrescription !== undefined) {
      whereClause.requiresPrescription = requiresPrescription === "true";
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const [substances, total] = await Promise.all([
      prisma.activeSubstance.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { activeSubstance: "asc" },
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
              tradeNameId: {
                in: tradeNameIds,
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
            tradeName: {
              include: {
                activeSubstance: {
                  select: {
                    id: true,
                    activeSubstance: true,
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
                activeSubstance: true,
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
