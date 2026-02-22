import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

/** Strip passwordHash from user object for API response (RMMSY: admin must never see passwords). */
function omitPassword<T extends { passwordHash?: string }>(user: T): Omit<T, 'passwordHash'> {
  const { passwordHash: _, ...rest } = user;
  return rest as Omit<T, 'passwordHash'>;
}

// Get all users (password never returned), include profile names for list display
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        patient: { select: { name: true } },
        doctor: { select: { name: true } },
        pharmacist: { select: { name: true } }
      }
    });
    res.json(users.map(omitPassword));
  } catch (error) {
    next(error);
  }
};

// Get user by ID with role-specific profile (password never returned)
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        patient: {
          include: {
            _count: { select: { prescriptions: true, allergies: true, patientDiseases: true, medicalHistories: true } }
          }
        },
        doctor: {
          include: {
            _count: { select: { prescriptions: true, patientDoctors: true, consultations: true, appointments: true } }
          }
        },
        pharmacist: {
          include: {
            _count: { select: { ratings: true } }
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(omitPassword(user));
  } catch (error) {
    next(error);
  }
};

// Create new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, passwordHash, role } = req.body;

    if (!email || !passwordHash || !role) {
      res.status(400).json({ error: 'Email, passwordHash, and role are required' });
      return;
    }

    const user = await prisma.user.create({
      data: { email, passwordHash, role, isActive: true }
    });

    res.status(201).json(omitPassword(user));
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }
    next(error);
  }
};

// Update user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email, isActive } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, isActive }
    });

    res.json(omitPassword(user));
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }
    next(error);
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    next(error);
  }
};

