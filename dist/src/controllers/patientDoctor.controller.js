"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelationshipById = exports.endRelationship = exports.updatePatientDoctor = exports.getRelationshipsByDoctor = exports.getRelationshipsByPatient = exports.createPatientDoctor = void 0;
const prisma_1 = require("../lib/prisma");
// Create patient-doctor relationship
const createPatientDoctor = async (req, res) => {
    try {
        const { patientId, doctorId, relationshipType } = req.body;
        // Validate required fields
        if (!patientId || !doctorId || !relationshipType) {
            return res.status(400).json({
                message: 'Patient ID, Doctor ID, and relationship type are required'
            });
        }
        // Check if patient exists
        const patient = await prisma_1.prisma.patient.findUnique({
            where: { id: patientId }
        });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        // Check if doctor exists
        const doctor = await prisma_1.prisma.doctor.findUnique({
            where: { id: doctorId }
        });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        // Check if relationship already exists
        const existingRelationship = await prisma_1.prisma.patientDoctor.findFirst({
            where: {
                patientId,
                doctorId,
                isActive: true
            }
        });
        if (existingRelationship) {
            return res.status(400).json({
                message: 'Active relationship already exists between this patient and doctor',
                relationship: existingRelationship
            });
        }
        const patientDoctor = await prisma_1.prisma.patientDoctor.create({
            data: {
                patientId,
                doctorId,
                relationshipType: relationshipType,
                startDate: new Date(),
                isActive: true
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        age: true,
                        gender: true
                    }
                },
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true,
                        licenseNumber: true
                    }
                }
            }
        });
        return res.status(201).json({
            message: 'Patient-Doctor relationship created successfully',
            relationship: patientDoctor
        });
    }
    catch (error) {
        console.error('Error creating patient-doctor relationship:', error);
        return res.status(500).json({ message: 'Error creating relationship', error });
    }
};
exports.createPatientDoctor = createPatientDoctor;
// Get all relationships for a patient
const getRelationshipsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { activeOnly = 'true' } = req.query;
        const where = { patientId: parseInt(patientId) };
        if (activeOnly === 'true') {
            where.isActive = true;
        }
        const relationships = await prisma_1.prisma.patientDoctor.findMany({
            where,
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true,
                        phoneNumber: true,
                        city: true
                    }
                }
            },
            orderBy: {
                startDate: 'desc'
            }
        });
        return res.json(relationships);
    }
    catch (error) {
        console.error('Error fetching patient relationships:', error);
        return res.status(500).json({ message: 'Error fetching relationships', error });
    }
};
exports.getRelationshipsByPatient = getRelationshipsByPatient;
// Get all relationships for a doctor
const getRelationshipsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { activeOnly = 'true' } = req.query;
        const where = { doctorId: parseInt(doctorId) };
        if (activeOnly === 'true') {
            where.isActive = true;
        }
        const relationships = await prisma_1.prisma.patientDoctor.findMany({
            where,
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        age: true,
                        gender: true,
                        ageClassification: true
                    }
                }
            },
            orderBy: {
                startDate: 'desc'
            }
        });
        return res.json(relationships);
    }
    catch (error) {
        console.error('Error fetching doctor relationships:', error);
        return res.status(500).json({ message: 'Error fetching relationships', error });
    }
};
exports.getRelationshipsByDoctor = getRelationshipsByDoctor;
// Update relationship
const updatePatientDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { relationshipType, isActive, endDate } = req.body;
        const relationship = await prisma_1.prisma.patientDoctor.findUnique({
            where: { id: parseInt(id) }
        });
        if (!relationship) {
            return res.status(404).json({ message: 'Relationship not found' });
        }
        const updateData = {};
        if (relationshipType)
            updateData.relationshipType = relationshipType;
        if (isActive !== undefined)
            updateData.isActive = isActive;
        if (endDate)
            updateData.endDate = new Date(endDate);
        // If deactivating, set end date if not provided
        if (isActive === false && !endDate && !relationship.endDate) {
            updateData.endDate = new Date();
        }
        const updatedRelationship = await prisma_1.prisma.patientDoctor.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true
                    }
                }
            }
        });
        return res.json({
            message: 'Relationship updated successfully',
            relationship: updatedRelationship
        });
    }
    catch (error) {
        console.error('Error updating relationship:', error);
        return res.status(500).json({ message: 'Error updating relationship', error });
    }
};
exports.updatePatientDoctor = updatePatientDoctor;
// End relationship
const endRelationship = async (req, res) => {
    try {
        const { id } = req.params;
        const relationship = await prisma_1.prisma.patientDoctor.findUnique({
            where: { id: parseInt(id) }
        });
        if (!relationship) {
            return res.status(404).json({ message: 'Relationship not found' });
        }
        if (!relationship.isActive) {
            return res.status(400).json({ message: 'Relationship is already inactive' });
        }
        const endedRelationship = await prisma_1.prisma.patientDoctor.update({
            where: { id: parseInt(id) },
            data: {
                isActive: false,
                endDate: new Date()
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                doctor: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return res.json({
            message: 'Relationship ended successfully',
            relationship: endedRelationship
        });
    }
    catch (error) {
        console.error('Error ending relationship:', error);
        return res.status(500).json({ message: 'Error ending relationship', error });
    }
};
exports.endRelationship = endRelationship;
// Get relationship by ID
const getRelationshipById = async (req, res) => {
    try {
        const { id } = req.params;
        const relationship = await prisma_1.prisma.patientDoctor.findUnique({
            where: { id: parseInt(id) },
            include: {
                patient: {
                    include: {
                        user: {
                            select: {
                                email: true
                            }
                        }
                    }
                },
                doctor: {
                    include: {
                        user: {
                            select: {
                                email: true
                            }
                        }
                    }
                }
            }
        });
        if (!relationship) {
            return res.status(404).json({ message: 'Relationship not found' });
        }
        return res.json(relationship);
    }
    catch (error) {
        console.error('Error fetching relationship:', error);
        return res.status(500).json({ message: 'Error fetching relationship', error });
    }
};
exports.getRelationshipById = getRelationshipById;
//# sourceMappingURL=patientDoctor.controller.js.map