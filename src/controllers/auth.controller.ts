import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/password.util";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt.util";
import {
  UserRole,
  AgeClassification,
  Gender,
} from "../../generated/client/client";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  verifyEmailSchema,
} from "../zod/auth.zod";
import { cleanupFile, moveLicenseToRoleFolder } from "../config/multer.config";
import { computeBmi } from "../utils/bmi.util";
import { sendOtpEmail } from "../services/mail.service";
import emailOtpRepository from "../repositories/mail.repository";
// Register
const MAX_ATTEMPTS = process.env.MAX_ATTEMPTS
  ? parseInt(process.env.MAX_ATTEMPTS)
  : 3;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleFromBody = req.body?.role;
    if (
      (roleFromBody === "Doctor" || roleFromBody === "Pharmacist") &&
      !req.file
    ) {
      res.status(400).json({
        error:
          roleFromBody === "Doctor"
            ? "License image is required for doctor registration"
            : "License image is required for pharmacist registration",
      });
      return;
    }

    const validatedData = registerSchema.parse(req.body);
    const {
      email,
      password,
      role,
      name,
      phone,
      licenseNumber,
      specialization,
    } = validatedData;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (req.file?.path) {
        try {
          cleanupFile(req.file.path);
        } catch (_) {}
      }
      res.status(409).json({ error: "Email already exists" });
      return;
    }

    // Doctor: ensure license number is unique before creating user
    if (role === UserRole.Doctor && licenseNumber) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { licenseNumber: licenseNumber.trim() },
      });
      if (existingDoctor) {
        if (req.file?.path) {
          try {
            cleanupFile(req.file.path);
          } catch (_) {}
        }
        res.status(409).json({
          error: "A doctor with this license number is already registered",
        });
        return;
      }
    }

    // Pharmacist: ensure license number is unique before creating user
    if (role === UserRole.Pharmacist && licenseNumber) {
      const existingPharmacist = await prisma.pharmacist.findUnique({
        where: { licenseNumber: licenseNumber.trim() },
      });
      if (existingPharmacist) {
        if (req.file?.path) {
          try {
            cleanupFile(req.file.path);
          } catch (_) {}
        }
        res.status(409).json({
          error: "A pharmacist with this license number is already registered",
        });
        return;
      }
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Move uploaded license to role-specific folder (Doctor or Pharmacist) and get URL
    let licenseImageUrl: string | undefined;
    if (
      req.file &&
      (role === UserRole.Doctor || role === UserRole.Pharmacist)
    ) {
      licenseImageUrl = moveLicenseToRoleFolder(req.file.path, role);
    } else if (req.file?.path) {
      try {
        cleanupFile(req.file.path);
      } catch (_) {}
    }

    // Create user in transaction; create Doctor or Pharmacist profile when role matches
    const result = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          email,
          ...(name != null && name.trim().length >= 1
            ? { name: name.trim() }
            : {}),
          ...(phone != null && phone !== "" ? { phone } : {}),
          passwordHash,
          role,
          isActive: false,
        },
      });

      if (
        role === UserRole.Doctor &&
        name &&
        licenseNumber &&
        specialization &&
        licenseImageUrl
      ) {
        await tx.doctor.create({
          data: {
            userId: user.id,
            name,
            licenseNumber,
            licenseImageUrl,
            specialization,
            isVerified: false,
          },
        });
      }

      if (
        role === UserRole.Pharmacist &&
        name &&
        licenseNumber &&
        licenseImageUrl
      ) {
        await tx.pharmacist.create({
          data: {
            userId: user.id,
            name,
            licenseNumber,
            licenseImageUrl,
            isVerified: false,
          },
        });
      }

      if (role === UserRole.Patient) {
        await tx.patient.create({
          data: {
            userId: user.id,
            age: 0,
            ageClassification: AgeClassification.Adults,
            gender: Gender.Other,
          },
        });
      }

      return user;
    });

    // Generate tokens
    const tokenPayload = {
      userId: result.id,
      email: result.email,
      role: result.role,
    };
    const otpToken = generateAccessToken(tokenPayload);

    // Create Session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const otp = await sendOtpEmail(result.email, otpToken, result.id);

    res.status(201).json({
      message: "User registered successfully and OTP sent to email",
      otpToken,
      ...(process.env.NODE_ENV !== "production" ? { otp } : {}),
    });
  } catch (error: any) {
    if (req.file?.path) {
      try {
        cleanupFile(req.file.path);
      } catch (_) {}
    }
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    // Prisma unique constraint (e.g. duplicate licenseNumber or email)
    if (error?.code === "P2002") {
      const target = Array.isArray(error?.meta?.target)
        ? error.meta.target
        : [];
      if (target.includes("licenseNumber")) {
        res.status(409).json({
          error: "A user with this license number is already registered",
        });
        return;
      }
      if (target.includes("email")) {
        res.status(409).json({ error: "Email already exists" });
        return;
      }
    }
    next(error);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { otp } = verifyEmailSchema.parse(req.body);

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const decoded = verifyAccessToken(token);
    const otpSession = await prisma.otpSession.findFirst({
      where: {
        token,
        userId: decoded.userId,
      },
      include: {
        otp: true,
      },
    });
    if (!otpSession) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (otpSession.otp.attempts >= MAX_ATTEMPTS) {
      res
        .status(429)
        .json({ error: "Too many attempts. Please request a new OTP." });
      return;
    }

    if (otpSession.otp.expiresAt < new Date()) {
      res
        .status(401)
        .json({ error: "OTP has expired. Please request a new one." });
      return;
    }

    if (otpSession.otp.otp !== otp) {
      await emailOtpRepository.updateOtp(otpSession.otpId, {
        attempts: otpSession.otp.attempts + 1,
      });
      res.status(401).json({ error: "Invalid OTP" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        isEmailVerified: true,
        lastLoginAt: new Date(),
        ...(decoded.role === UserRole.Patient ? { isActive: true } : {}),
      },
      include: {
        patient: true,
        doctor: true,
        pharmacist: true,
      },
    });
    await prisma.otpSession.delete({
      where: {
        userId_otpId: {
          userId: decoded.userId,
          otpId: otpSession.otpId,
        },
      },
    });

    const tokenPayload = {
      userId: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Create Session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.session.create({
      data: {
        userId: updatedUser.id,
        token: accessToken,
        refreshToken,
        expiresAt,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    const userPayload: {
      id: number;
      email: string;
      role: string;
      patientId?: number;
      doctorId?: number;
      pharmacistId?: number;
      isVerified?: boolean;
    } = {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
    };
    if (updatedUser.role === UserRole.Patient) {
      const patient = await prisma.patient.findUnique({
        where: { userId: updatedUser.id },
        select: { id: true },
      });
      if (patient) userPayload.patientId = patient.id;
    }
    if (updatedUser.role === UserRole.Doctor) {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: updatedUser.id },
        select: { id: true, isVerified: true },
      });
      if (doctor) {
        userPayload.doctorId = doctor.id;
        userPayload.isVerified = doctor.isVerified;
      }
    }
    if (updatedUser.role === UserRole.Pharmacist) {
      const pharmacist = await prisma.pharmacist.findUnique({
        where: { userId: updatedUser.id },
        select: { id: true, isVerified: true },
      });
      if (pharmacist) {
        userPayload.pharmacistId = pharmacist.id;
        userPayload.isVerified = pharmacist.isVerified;
      }
    }

    res.status(200).json({
      message: "OTP verified successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        ...(updatedUser.role === UserRole.Patient ? { patientId: updatedUser.patient?.id } : {}),
        ...(updatedUser.role === UserRole.Doctor ? { doctorId: updatedUser.doctor?.id, isVerified: updatedUser.doctor?.isVerified } : {}),
        ...(updatedUser.role === UserRole.Pharmacist ? { pharmacistId: updatedUser.pharmacist?.id, isVerified: updatedUser.pharmacist?.isVerified } : {}),
      },
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    next(error);
  }
};

export const resendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const decoded = verifyAccessToken(token);
    if (!decoded.email) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const newOtpToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    const otp = await sendOtpEmail(decoded.email, newOtpToken, decoded.userId);
    res
      .status(200)
      .json({
        message: "OTP resent successfully",
        otpToken: newOtpToken,
        otp,
      });
  } catch (error: any) {
    next(error);
  }
};

// Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user (email is already lowercased by schema)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(
        "[Auth] 401 reason: no user for email:",
        JSON.stringify(email),
      );
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (!user.isActive) {
      console.log("[Auth] 401 reason: user inactive:", email);
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Verify password (same bcryptjs as seed)
    let isPasswordValid = await comparePassword(password, user.passwordHash);
    // Dev fix: if superadmin + Password@123 but hash mismatch, repair hash and allow login
    if (
      !isPasswordValid &&
      process.env.NODE_ENV !== "production" &&
      email === "superadmin@greenrx.com" &&
      password === "Password@123"
    ) {
      const newHash = await hashPassword("Password@123");
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      });
      isPasswordValid = true;
      console.log("[Auth] SuperAdmin password hash repaired; login allowed.");
    }
    if (!isPasswordValid) {
      console.log("[Auth] 401 reason: password mismatch for:", email);
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Create Session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.session.create({
      data: {
        userId: user.id,
        token: accessToken,
        refreshToken,
        expiresAt,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const userPayload: {
      id: number;
      email: string;
      role: string;
      patientId?: number;
      doctorId?: number;
      pharmacistId?: number;
      isVerified?: boolean;
    } = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    if (user.role === UserRole.Patient) {
      const patient = await prisma.patient.findUnique({
        where: { userId: user.id },
        select: { id: true },
      });
      if (patient) userPayload.patientId = patient.id;
    }
    if (user.role === UserRole.Doctor) {
      const doctor = await prisma.doctor.findUnique({
        where: { userId: user.id },
        select: { id: true, isVerified: true },
      });
      if (doctor) {
        userPayload.doctorId = doctor.id;
        userPayload.isVerified = doctor.isVerified;
      }
    }
    if (user.role === UserRole.Pharmacist) {
      const pharmacist = await prisma.pharmacist.findUnique({
        where: { userId: user.id },
        select: { id: true, isVerified: true },
      });
      if (pharmacist) {
        userPayload.pharmacistId = pharmacist.id;
        userPayload.isVerified = pharmacist.isVerified;
      }
    }

    res.json({
      message: "Login successful",
      user: userPayload,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

// Refresh Token
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body);

    // Verify token
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (e) {
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }

    // Check if session exists and is valid
    const session = await prisma.session.findUnique({
      where: { refreshToken },
    });

    if (!session || !session.isActive || session.expiresAt < new Date()) {
      res.status(401).json({ error: "Session expired or invalid" });
      return;
    }

    // Generate new access token
    const tokenPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
    const newAccessToken = generateAccessToken(tokenPayload);

    // Update Session with new access token (keep refresh token same or rotate it - implementing rotation is better but simple for now)
    // Let's just update the access token in session for tracking
    await prisma.session.update({
      where: { id: session.id },
      data: { token: newAccessToken },
    });

    res.json({ accessToken: newAccessToken });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    next(error);
  }
};

// Logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      // Deactivate session
      // We find session by access token
      // Note: token field in session is not unique in schema? let's check.
      // Schema says: token String @unique
      // But wait, if we refresh token, we generate NEW access token.
      // If we don't update session with new access token, then we can't find it by new access token.
      // In refresh I updated the session. So valid.

      // Try/catch in case session not found
      try {
        await prisma.session.update({
          where: { token },
          data: { isActive: false },
        });
      } catch (e) {
        // Ignore if session not found, user is logging out anyway
      }
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// Same patient include as GET /patients/:id so auth/me returns full patient data for Patient role
const patientProfileInclude = {
  user: { select: { email: true, role: true, isActive: true, name: true } },
  medicalHistories: { include: { disease: true } },
  familyHistories: { include: { disease: true } },
  patientLifestyles: { include: { lifestyle: true } },
  allergyReports: true,
  childrenProfiles: true,
  patientDiseases: { include: { disease: true } },
} as const;

// Get Current User Profile
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // req.user is set by auth middleware
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    // Use explicit selects so we don't fail when the DB is missing columns (e.g. User.name or Doctor columns added in later migrations)
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        patient: { select: { id: true } },
        doctor: {
          select: {
            id: true,
            userId: true,
            name: true,
            licenseNumber: true,
            specialization: true,
            isVerified: true,
            doctorClinics: true,
          },
        },
        pharmacist: {
          select: {
            id: true,
            userId: true,
            name: true,
            licenseNumber: true,
            isVerified: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // For Patient role: load full patient data (same as GET /patients/:id) and attach to response
    if (user.role === "Patient" && user.patient?.id) {
      const fullPatient = await prisma.patient.findUnique({
        where: { id: user.patient.id },
        include: patientProfileInclude,
      });
      if (fullPatient) {
        const bodyMassIndex = computeBmi(
          fullPatient.weight,
          fullPatient.height,
        );
        const patientPayload = {
          ...fullPatient,
          bodyMassIndex: bodyMassIndex ?? undefined,
        };
        res.json({ ...user, patient: patientPayload });
        return;
      }
    }

    res.json(user);
  } catch (error: any) {
    // If Prisma fails due to a missing column (e.g. production DB not migrated), retry with minimal user fields only
    const isColumnError =
      error?.code === "P2010" ||
      error?.code === "P2022" ||
      (error?.message && String(error.message).includes("does not exist"));
    if (isColumnError && req.user) {
      try {
        const fallback = await prisma.user.findUnique({
          where: { id: req.user.userId },
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        });
        if (fallback) {
          res.json({
            ...fallback,
            name: null,
            patient: null,
            doctor: null,
            pharmacist: null,
          });
          return;
        }
      } catch (_) {
        // fall through to next(error)
      }
    }
    next(error);
  }
};

/** Development only: reset SuperAdmin password so login works (same hash as server uses). */
export const devResetSuperAdminPassword = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV === "production") {
    res.status(404).json({ error: "Not found" });
    return;
  }
  try {
    const email = "superadmin@greenrx.com";
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res
        .status(404)
        .json({ error: "SuperAdmin user not found. Run seed first." });
      return;
    }
    const newHash = await hashPassword("Password@123");
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newHash },
    });
    console.log(
      "[Auth] SuperAdmin password reset OK. You can login with:",
      email,
      "/ Password@123",
    );
    res.json({
      message:
        "SuperAdmin password reset. Login with superadmin@greenrx.com / Password@123",
    });
  } catch (error) {
    next(error);
  }
};
