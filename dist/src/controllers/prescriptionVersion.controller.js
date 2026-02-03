"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
class PrescriptionVersionController {
    // Get all versions of a prescription
    async getPrescriptionVersions(req, res, next) {
        try {
            const { prescriptionId } = req.params;
            const versions = await prisma_1.prisma.prescriptionVersion.findMany({
                where: { prescriptionId: Number(prescriptionId) },
                orderBy: { version: 'desc' }
            });
            res.json(versions);
        }
        catch (error) {
            next(error);
        }
    }
    // Get a specific version
    async getVersion(req, res, next) {
        try {
            const { id } = req.params;
            const version = await prisma_1.prisma.prescriptionVersion.findUnique({
                where: { id: Number(id) },
                include: {
                    prescription: {
                        include: {
                            tradeName: {
                                include: { activeSubstance: true }
                            },
                            patient: {
                                select: { name: true, age: true }
                            }
                        }
                    }
                }
            });
            if (!version) {
                return res.status(404).json({ error: 'Version not found' });
            }
            res.json(version);
        }
        catch (error) {
            next(error);
        }
    }
    // Create a new version when prescription is modified
    async createVersion(req, res, next) {
        try {
            const { prescriptionId } = req.params;
            const { changes } = req.body;
            const userId = req.user?.id || 1;
            // Get current prescription  data
            const prescription = await prisma_1.prisma.prescription.findUnique({
                where: { id: Number(prescriptionId) }
            });
            if (!prescription) {
                return res.status(404).json({ error: 'Prescription not found' });
            }
            // Get the latest version number
            const latestVersion = await prisma_1.prisma.prescriptionVersion.findFirst({
                where: { prescriptionId: Number(prescriptionId) },
                orderBy: { version: 'desc' }
            });
            const newVersionNumber = (latestVersion?.version || 0) + 1;
            // Create new version
            const version = await prisma_1.prisma.prescriptionVersion.create({
                data: {
                    prescriptionId: Number(prescriptionId),
                    version: newVersionNumber,
                    changes: changes || {},
                    changedBy: userId
                }
            });
            res.status(201).json(version);
        }
        catch (error) {
            next(error);
        }
    }
    // Compare two versions
    async compareVersions(req, res, next) {
        try {
            const { prescriptionId } = req.params;
            const { version1, version2 } = req.query;
            const [v1, v2] = await Promise.all([
                prisma_1.prisma.prescriptionVersion.findFirst({
                    where: {
                        prescriptionId: Number(prescriptionId),
                        version: Number(version1)
                    }
                }),
                prisma_1.prisma.prescriptionVersion.findFirst({
                    where: {
                        prescriptionId: Number(prescriptionId),
                        version: Number(version2)
                    }
                })
            ]);
            if (!v1 || !v2) {
                return res.status(404).json({ error: 'One or both versions not found' });
            }
            res.json({
                version1: v1,
                version2: v2,
                differences: this.calculateDifferences(v1.changes, v2.changes)
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Helper method to calculate differences
    calculateDifferences(data1, data2) {
        const differences = [];
        const keys = new Set([...Object.keys(data1 || {}), ...Object.keys(data2 || {})]);
        keys.forEach(key => {
            if (JSON.stringify(data1?.[key]) !== JSON.stringify(data2?.[key])) {
                differences.push({
                    field: key,
                    oldValue: data1?.[key],
                    newValue: data2?.[key]
                });
            }
        });
        return differences;
    }
}
exports.default = new PrescriptionVersionController();
//# sourceMappingURL=prescriptionVersion.controller.js.map