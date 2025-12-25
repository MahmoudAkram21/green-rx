import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/password.util';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.util';
import { UserRole } from '../generated/client';

// Validation Schemas
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.nativeEnum(UserRole).default(UserRole.Patient),
    name: z.string().min(2).optional() // For creating patient/doctor profile stub
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const refreshTokenSchema = z.object({
    refreshToken: z.string()
});

// Register
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const { email, password, role, name } = validatedData;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            res.status(409).json({ error: 'Email already exists' });
            return;
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user in transaction to ensure profile creation if needed
        const result = await prisma.$transaction(async (tx: any) => {
            // 1. Create User
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role,
                    isActive: true
                }
            });

            // 2. Create Profile based on role (optional stub)
            if (role === UserRole.Patient && name) {
                // We need date of birth and gender ideally, but we can creating a minimal profile or skip until profile completion
                // For now, let's just create the user. Profile completion will happen in next step.
            }

            return user;
        });

        // Generate tokens
        const tokenPayload = { userId: result.id, email: result.email, role: result.role };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        // Create Session
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

        await prisma.session.create({
            data: {
                userId: result.id,
                token: accessToken,
                refreshToken,
                expiresAt,
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: result.id, email: result.email, role: result.role },
            accessToken,
            refreshToken
        });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !user.isActive) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate tokens
        const tokenPayload = { userId: user.id, email: user.email, role: user.role };
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
                userAgent: req.headers['user-agent']
            }
        });

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        });

        res.json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, role: user.role },
            accessToken,
            refreshToken
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
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = refreshTokenSchema.parse(req.body);

        // Verify token
        let payload;
        try {
            payload = verifyRefreshToken(refreshToken);
        } catch (e) {
            res.status(401).json({ error: 'Invalid refresh token' });
            return;
        }

        // Check if session exists and is valid
        const session = await prisma.session.findUnique({
            where: { refreshToken }
        });

        if (!session || !session.isActive || session.expiresAt < new Date()) {
            res.status(401).json({ error: 'Session expired or invalid' });
            return;
        }

        // Generate new access token
        const tokenPayload = { userId: payload.userId, email: payload.email, role: payload.role };
        const newAccessToken = generateAccessToken(tokenPayload);

        // Update Session with new access token (keep refresh token same or rotate it - implementing rotation is better but simple for now)
        // Let's just update the access token in session for tracking
        await prisma.session.update({
            where: { id: session.id },
            data: { token: newAccessToken }
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
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

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
                    data: { isActive: false }
                });
            } catch (e) {
                // Ignore if session not found, user is logging out anyway
            }
        }

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

// Get Current User Profile
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // req.user is set by auth middleware
        if (!req.user) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                patient: true, // Include profiles if they exist
                doctor: true,
                pharmacist: true
            }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};
