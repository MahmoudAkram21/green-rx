import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Prisma, UserRole } from '../../generated/client/client';
import { prisma } from '../lib/prisma';
import { hashPassword } from '../utils/password.util';
import { adminUpdateUserSchema } from '../zod/adminUser.zod';

/** Strip passwordHash from user object for API response (RMMSY: admin must never see passwords). */
function omitPassword<T extends { passwordHash?: string }>(user: T): Omit<T, 'passwordHash'> {
  const { passwordHash: _, ...rest } = user;
  return rest as Omit<T, 'passwordHash'>;
}

const userDetailInclude = {
  patient: {
    include: {
      _count: { select: { prescriptions: true, patientDiseases: true, medicalHistories: true } },
      allergyReports: { select: { id: true } },
    },
  },
  doctor: {
    include: {
      _count: { select: { prescriptions: true, patientDoctors: true, visits: true } },
    },
  },
  pharmacist: {
    include: {
      _count: { select: { ratings: true } },
    },
  },
} as const;

function toPrismaDecimal(value: unknown): Prisma.Decimal | null {
  if (value === null || value === undefined || value === '') return null;
  try {
    return new Prisma.Decimal(String(value));
  } catch {
    throw new Error('Invalid numeric value');
  }
}

function assertRoleChangeAllowed(
  existing: { role: UserRole; patient: unknown; doctor: unknown; pharmacist: unknown },
  nextRole: UserRole,
) {
  if (existing.patient && nextRole !== UserRole.Patient) {
    throw new Error('ROLE_CHANGE_BLOCKED: User has a patient profile; role must stay Patient.');
  }
  if (existing.doctor && nextRole !== UserRole.Doctor) {
    throw new Error('ROLE_CHANGE_BLOCKED: User has a doctor profile; role must stay Doctor.');
  }
  if (existing.pharmacist && nextRole !== UserRole.Pharmacist) {
    throw new Error('ROLE_CHANGE_BLOCKED: User has a pharmacist profile; role must stay Pharmacist.');
  }
}

function buildPatientUpdateData(
  input: NonNullable<z.infer<typeof adminUpdateUserSchema>['patientProfile']>,
): Prisma.PatientUpdateInput {
  const data: Prisma.PatientUpdateInput = {};
  if (input.age !== undefined) data.age = input.age;
  if (input.ageClassification !== undefined) data.ageClassification = input.ageClassification;
  if (input.dateOfBirth !== undefined) {
    if (input.dateOfBirth === null || input.dateOfBirth === '') data.dateOfBirth = null;
    else {
      const d = new Date(input.dateOfBirth);
      if (Number.isNaN(d.getTime())) throw new Error('Invalid dateOfBirth');
      data.dateOfBirth = d;
    }
  }
  if (input.weight !== undefined) {
    if (input.weight === null || input.weight === '') data.weight = null;
    else data.weight = toPrismaDecimal(input.weight);
  }
  if (input.height !== undefined) {
    if (input.height === null || input.height === '') data.height = null;
    else data.height = toPrismaDecimal(input.height);
  }
  if (input.gender !== undefined) data.gender = input.gender;
  if (input.pregnancyWarning !== undefined) data.pregnancyWarning = input.pregnancyWarning;
  if (input.pregnancyStatus !== undefined) data.pregnancyStatus = input.pregnancyStatus;
  if (input.trimester !== undefined) data.trimester = input.trimester;
  if (input.lactation !== undefined) data.lactation = input.lactation;
  if (input.contracipient !== undefined) data.contracipient = input.contracipient;
  if (input.isContracipientHormonal !== undefined) data.isContracipientHormonal = input.isContracipientHormonal;
  if (input.bloodType !== undefined) data.bloodType = input.bloodType;
  if (input.profileCompleteness !== undefined) data.profileCompleteness = input.profileCompleteness;
  return data;
}

function normalizeWorkingHours(value: unknown): Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.JsonNull;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return Prisma.JsonNull;
    try {
      return JSON.parse(trimmed) as Prisma.InputJsonValue;
    } catch {
      throw new Error('Invalid workingHours JSON');
    }
  }
  return value as Prisma.InputJsonValue;
}

function buildDoctorUpdateData(
  input: NonNullable<z.infer<typeof adminUpdateUserSchema>['doctorProfile']>,
): Prisma.DoctorUpdateInput {
  const data: Prisma.DoctorUpdateInput = {};
  if (input.name !== undefined) data.name = input.name;
  if (input.licenseNumber !== undefined) data.licenseNumber = input.licenseNumber;
  if (input.licenseImageUrl !== undefined) data.licenseImageUrl = input.licenseImageUrl;
  if (input.specialization !== undefined) data.specialization = input.specialization;
  if (input.phoneNumber !== undefined) data.phoneNumber = input.phoneNumber;
  if (input.address !== undefined) data.address = input.address;
  if (input.city !== undefined) data.city = input.city;
  if (input.latitude !== undefined) {
    if (input.latitude === null || input.latitude === '') data.latitude = null;
    else data.latitude = toPrismaDecimal(input.latitude);
  }
  if (input.longitude !== undefined) {
    if (input.longitude === null || input.longitude === '') data.longitude = null;
    else data.longitude = toPrismaDecimal(input.longitude);
  }
  if (input.consultationFee !== undefined) {
    if (input.consultationFee === null || input.consultationFee === '') data.consultationFee = null;
    else data.consultationFee = toPrismaDecimal(input.consultationFee);
  }
  const wh = normalizeWorkingHours(input.workingHours);
  if (wh !== undefined) data.workingHours = wh;
  if (input.isVerified !== undefined) data.isVerified = input.isVerified;
  if (input.verifiedAt !== undefined) {
    if (input.verifiedAt === null || input.verifiedAt === '') data.verifiedAt = null;
    else {
      const d = new Date(input.verifiedAt);
      if (Number.isNaN(d.getTime())) throw new Error('Invalid verifiedAt');
      data.verifiedAt = d;
    }
  }
  if (input.verifiedBy !== undefined) data.verifiedBy = input.verifiedBy;
  if (input.verificationNotes !== undefined) data.verificationNotes = input.verificationNotes;
  return data;
}

function buildPharmacistUpdateData(
  input: NonNullable<z.infer<typeof adminUpdateUserSchema>['pharmacistProfile']>,
): Prisma.PharmacistUpdateInput {
  const data: Prisma.PharmacistUpdateInput = {};
  if (input.name !== undefined) data.name = input.name;
  if (input.licenseNumber !== undefined) data.licenseNumber = input.licenseNumber;
  if (input.licenseImageUrl !== undefined) data.licenseImageUrl = input.licenseImageUrl;
  if (input.pharmacyName !== undefined) data.pharmacyName = input.pharmacyName;
  if (input.phoneNumber !== undefined) data.phoneNumber = input.phoneNumber;
  if (input.address !== undefined) data.address = input.address;
  if (input.city !== undefined) data.city = input.city;
  if (input.isVerified !== undefined) data.isVerified = input.isVerified;
  if (input.verifiedAt !== undefined) {
    if (input.verifiedAt === null || input.verifiedAt === '') data.verifiedAt = null;
    else {
      const d = new Date(input.verifiedAt);
      if (Number.isNaN(d.getTime())) throw new Error('Invalid verifiedAt');
      data.verifiedAt = d;
    }
  }
  if (input.verifiedBy !== undefined) data.verifiedBy = input.verifiedBy;
  if (input.verificationNotes !== undefined) data.verificationNotes = input.verificationNotes;
  return data;
}

// Get all users (password never returned), include profile names for list display
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        patient: { select: { id: true } },
        doctor: { select: { name: true } },
        pharmacist: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
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
      include: userDetailInclude,
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
    const { email, passwordHash, password, role, name, phone, isActive } = req.body ?? {};

    let finalHash: string | undefined = typeof passwordHash === 'string' ? passwordHash : undefined;
    if (typeof password === 'string' && password.trim() !== '') {
      finalHash = await hashPassword(password.trim());
    }

    if (!email || !finalHash || !role) {
      res.status(400).json({ error: 'Email, role, and password (or passwordHash) are required' });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: finalHash,
        role,
        isActive: typeof isActive === 'boolean' ? isActive : true,
        ...(name !== undefined && { name: name ?? null }),
        ...(phone !== undefined && { phone: phone ?? null }),
      },
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

// Update user (account + role profile)
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (Number.isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user id' });
      return;
    }

    const parsed = adminUpdateUserSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const body = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { id: userId },
      include: { patient: true, doctor: true, pharmacist: true },
    });

    if (!existing) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (body.role !== undefined && body.role !== existing.role) {
      try {
        assertRoleChangeAllowed(existing, body.role);
      } catch (e: any) {
        const msg = e?.message?.startsWith('ROLE_CHANGE_BLOCKED') ? e.message.replace('ROLE_CHANGE_BLOCKED: ', '') : String(e?.message ?? e);
        res.status(400).json({ error: msg });
        return;
      }
    }

    const userData: Prisma.UserUpdateInput = {};
    if (body.email !== undefined) userData.email = body.email;
    if (body.name !== undefined) userData.name = body.name;
    if (body.phone !== undefined) userData.phone = body.phone;
    if (body.isActive !== undefined) userData.isActive = body.isActive;
    if (body.isEmailVerified !== undefined) userData.isEmailVerified = body.isEmailVerified;
    if (body.role !== undefined) userData.role = body.role;

    if (body.password !== undefined && body.password.trim() !== '') {
      userData.passwordHash = await hashPassword(body.password.trim());
    }

    let patientPatch: Prisma.PatientUpdateInput | null = null;
    if (body.patientProfile) {
      const built = buildPatientUpdateData(body.patientProfile);
      if (Object.keys(built).length > 0) patientPatch = built;
    }
    let doctorPatch: Prisma.DoctorUpdateInput | null = null;
    if (body.doctorProfile) {
      const built = buildDoctorUpdateData(body.doctorProfile);
      if (Object.keys(built).length > 0) doctorPatch = built;
    }
    let pharmacistPatch: Prisma.PharmacistUpdateInput | null = null;
    if (body.pharmacistProfile) {
      const built = buildPharmacistUpdateData(body.pharmacistProfile);
      if (Object.keys(built).length > 0) pharmacistPatch = built;
    }

    if (body.patientProfile && !existing.patient) {
      res.status(400).json({ error: 'This user has no patient profile to update' });
      return;
    }
    if (body.doctorProfile && !existing.doctor) {
      res.status(400).json({ error: 'This user has no doctor profile to update' });
      return;
    }
    if (body.pharmacistProfile && !existing.pharmacist) {
      res.status(400).json({ error: 'This user has no pharmacist profile to update' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      if (Object.keys(userData).length > 0) {
        await tx.user.update({ where: { id: userId }, data: userData });
      }
      if (patientPatch && existing.patient) {
        await tx.patient.update({ where: { id: existing.patient.id }, data: patientPatch });
      }
      if (doctorPatch && existing.doctor) {
        await tx.doctor.update({ where: { id: existing.doctor.id }, data: doctorPatch });
      }
      if (pharmacistPatch && existing.pharmacist) {
        await tx.pharmacist.update({ where: { id: existing.pharmacist.id }, data: pharmacistPatch });
      }
    });

    const refreshed = await prisma.user.findUnique({
      where: { id: userId },
      include: userDetailInclude,
    });

    res.json(omitPassword(refreshed!));
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Unique constraint violation (e.g. email or license number)' });
      return;
    }
    const msg = typeof error?.message === 'string' ? error.message : 'Update failed';
    if (
      msg.includes('Invalid') ||
      msg.includes('ROLE_CHANGE') ||
      msg.includes('decimal') ||
      msg.includes('JSON')
    ) {
      res.status(400).json({ error: msg });
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
      where: { id: parseInt(id) },
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
