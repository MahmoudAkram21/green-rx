"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const prisma_1 = require("../lib/prisma");
/** Strip passwordHash from user object for API response (RMMSY: admin must never see passwords). */
function omitPassword(user) {
    const { passwordHash: _, ...rest } = user;
    return rest;
}
// Get all users (password never returned), include profile names for list display
const getAllUsers = async (_req, res, next) => {
    try {
        const users = await prisma_1.prisma.user.findMany({
            include: {
                patient: { select: { name: true } },
                doctor: { select: { name: true } },
                pharmacist: { select: { name: true } }
            }
        });
        res.json(users.map(omitPassword));
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID with role-specific profile (password never returned)
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.prisma.user.findUnique({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
// Create new user
const createUser = async (req, res, next) => {
    try {
        const { email, passwordHash, role } = req.body;
        if (!email || !passwordHash || !role) {
            res.status(400).json({ error: 'Email, passwordHash, and role are required' });
            return;
        }
        const user = await prisma_1.prisma.user.create({
            data: { email, passwordHash, role, isActive: true }
        });
        res.status(201).json(omitPassword(user));
    }
    catch (error) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Email already exists' });
            return;
        }
        next(error);
    }
};
exports.createUser = createUser;
// Update user
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, isActive } = req.body;
        const user = await prisma_1.prisma.user.update({
            where: { id: parseInt(id) },
            data: { email, isActive }
        });
        res.json(omitPassword(user));
    }
    catch (error) {
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
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        next(error);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map