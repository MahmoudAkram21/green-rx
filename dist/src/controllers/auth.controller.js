"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.refresh = exports.login = exports.register = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const password_util_1 = require("../utils/password.util");
const jwt_util_1 = require("../utils/jwt.util");
const client_1 = require("../../generated/client/client");
const auth_zod_1 = require("../zod/auth.zod");
// Register
const register = async (req, res, next) => {
    try {
        const validatedData = auth_zod_1.registerSchema.parse(req.body);
        const { email, password, role, name } = validatedData;
        // Check if user exists
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            res.status(409).json({ error: 'Email already exists' });
            return;
        }
        // Hash password
        const passwordHash = await (0, password_util_1.hashPassword)(password);
        // Create user in transaction to ensure profile creation if needed
        const result = await prisma_1.prisma.$transaction(async (tx) => {
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
            if (role === client_1.UserRole.Patient && name) {
                // We need date of birth and gender ideally, but we can creating a minimal profile or skip until profile completion
                // For now, let's just create the user. Profile completion will happen in next step.
            }
            return user;
        });
        // Generate tokens
        const tokenPayload = { userId: result.id, email: result.email, role: result.role };
        const accessToken = (0, jwt_util_1.generateAccessToken)(tokenPayload);
        const refreshToken = (0, jwt_util_1.generateRefreshToken)(tokenPayload);
        // Create Session
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
        await prisma_1.prisma.session.create({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.register = register;
// Login
const login = async (req, res, next) => {
    try {
        const { email, password } = auth_zod_1.loginSchema.parse(req.body);
        // Find user
        const user = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user || !user.isActive) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Verify password
        const isPasswordValid = await (0, password_util_1.comparePassword)(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Generate tokens
        const tokenPayload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = (0, jwt_util_1.generateAccessToken)(tokenPayload);
        const refreshToken = (0, jwt_util_1.generateRefreshToken)(tokenPayload);
        // Create Session
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
        await prisma_1.prisma.session.create({
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
        await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        });
        res.json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, role: user.role },
            accessToken,
            refreshToken
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.login = login;
// Refresh Token
const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = auth_zod_1.refreshTokenSchema.parse(req.body);
        // Verify token
        let payload;
        try {
            payload = (0, jwt_util_1.verifyRefreshToken)(refreshToken);
        }
        catch (e) {
            res.status(401).json({ error: 'Invalid refresh token' });
            return;
        }
        // Check if session exists and is valid
        const session = await prisma_1.prisma.session.findUnique({
            where: { refreshToken }
        });
        if (!session || !session.isActive || session.expiresAt < new Date()) {
            res.status(401).json({ error: 'Session expired or invalid' });
            return;
        }
        // Generate new access token
        const tokenPayload = { userId: payload.userId, email: payload.email, role: payload.role };
        const newAccessToken = (0, jwt_util_1.generateAccessToken)(tokenPayload);
        // Update Session with new access token (keep refresh token same or rotate it - implementing rotation is better but simple for now)
        // Let's just update the access token in session for tracking
        await prisma_1.prisma.session.update({
            where: { id: session.id },
            data: { token: newAccessToken }
        });
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ error: error.issues });
            return;
        }
        next(error);
    }
};
exports.refresh = refresh;
// Logout
const logout = async (req, res, next) => {
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
                await prisma_1.prisma.session.update({
                    where: { token },
                    data: { isActive: false }
                });
            }
            catch (e) {
                // Ignore if session not found, user is logging out anyway
            }
        }
        res.json({ message: 'Logged out successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
// Get Current User Profile
const getMe = async (req, res, next) => {
    try {
        // req.user is set by auth middleware
        if (!req.user) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }
        const user = await prisma_1.prisma.user.findUnique({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth.controller.js.map