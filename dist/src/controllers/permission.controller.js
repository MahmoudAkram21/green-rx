"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPermissions = listPermissions;
exports.createPermission = createPermission;
exports.deletePermission = deletePermission;
exports.getRolePermissions = getRolePermissions;
exports.addPermissionToRole = addPermissionToRole;
exports.removePermissionFromRole = removePermissionFromRole;
const prisma_1 = require("../lib/prisma");
const ALLOWED_ROLES = ['Patient', 'Doctor', 'Pharmacist', 'Admin', 'Company', 'SuperAdmin'];
const ADMIN_ROLES = ['Admin', 'SuperAdmin'];
async function listPermissions(_req, res, next) {
    try {
        const permissions = await prisma_1.prisma.permission.findMany({
            orderBy: [{ code: 'asc' }]
        });
        res.json(permissions);
    }
    catch (error) {
        next(error);
    }
}
async function createPermission(req, res, next) {
    try {
        const { code, name, description, adminOnly } = req.body;
        if (!code || !name || typeof code !== 'string' || typeof name !== 'string') {
            res.status(400).json({ error: 'code and name are required' });
            return;
        }
        const permission = await prisma_1.prisma.permission.create({
            data: {
                code: code.trim(),
                name: name.trim(),
                description: description ? String(description).trim() : null,
                adminOnly: Boolean(adminOnly)
            }
        });
        res.status(201).json(permission);
    }
    catch (error) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'A permission with this code already exists' });
            return;
        }
        next(error);
    }
}
async function deletePermission(req, res, next) {
    try {
        const { id } = req.params;
        await prisma_1.prisma.permission.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Permission not found' });
            return;
        }
        next(error);
    }
}
async function getRolePermissions(req, res, next) {
    try {
        const { role } = req.params;
        if (!ALLOWED_ROLES.includes(role)) {
            res.status(400).json({ error: 'Invalid role' });
            return;
        }
        const rolePermissions = await prisma_1.prisma.rolePermission.findMany({
            where: { role },
            include: { permission: true }
        });
        res.json(rolePermissions.map((rp) => rp.permission));
    }
    catch (error) {
        next(error);
    }
}
/** Add a permission to a role. Rejects if permission is adminOnly and role is not Admin/SuperAdmin. */
async function addPermissionToRole(req, res, next) {
    try {
        const { role } = req.params;
        const { permissionId } = req.body;
        if (!ALLOWED_ROLES.includes(role)) {
            res.status(400).json({ error: 'Invalid role' });
            return;
        }
        const permId = Number(permissionId);
        if (Number.isNaN(permId)) {
            res.status(400).json({ error: 'permissionId is required' });
            return;
        }
        const permission = await prisma_1.prisma.permission.findUnique({
            where: { id: permId }
        });
        if (!permission) {
            res.status(404).json({ error: 'Permission not found' });
            return;
        }
        if (permission.adminOnly && !ADMIN_ROLES.includes(role)) {
            res.status(403).json({
                error: 'This permission is restricted to Admin and SuperAdmin roles only. It cannot be assigned to this role.'
            });
            return;
        }
        await prisma_1.prisma.rolePermission.create({
            data: { role, permissionId: permId }
        });
        const created = await prisma_1.prisma.rolePermission.findFirst({
            where: { role, permissionId: permId },
            include: { permission: true }
        });
        res.status(201).json(created?.permission ?? permission);
    }
    catch (error) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'This permission is already assigned to this role' });
            return;
        }
        next(error);
    }
}
/** Remove a permission from a role. */
async function removePermissionFromRole(req, res, next) {
    try {
        const { role, permissionId } = req.params;
        if (!ALLOWED_ROLES.includes(role)) {
            res.status(400).json({ error: 'Invalid role' });
            return;
        }
        const permId = Number(permissionId);
        if (Number.isNaN(permId)) {
            res.status(400).json({ error: 'Invalid permissionId' });
            return;
        }
        await prisma_1.prisma.rolePermission.deleteMany({
            where: { role, permissionId: permId }
        });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=permission.controller.js.map