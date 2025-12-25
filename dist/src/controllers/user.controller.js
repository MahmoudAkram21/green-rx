import prisma from '../config/database.js';
// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
// Get user by ID
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
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
// Create new user
export const createUser = async (req, res, next) => {
    try {
        const { email, passwordHash, role } = req.body;
        if (!email || !passwordHash || !role) {
            res.status(400).json({ error: 'Email, passwordHash, and role are required' });
            return;
        }
        const user = await prisma.user.create({
            data: { email, passwordHash, role, isActive: true }
        });
        res.status(201).json(user);
    }
    catch (error) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Email already exists' });
            return;
        }
        next(error);
    }
};
// Update user
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, isActive } = req.body;
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { email, isActive }
        });
        res.json(user);
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
// Delete user
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
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
//# sourceMappingURL=user.controller.js.map