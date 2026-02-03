"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcomingFollowUps = exports.deleteConsultation = exports.updateConsultation = exports.getConsultationsByDoctor = exports.getConsultationsByPatient = exports.getConsultationById = exports.createConsultation = void 0;
const prisma_1 = require("../lib/prisma");
// Create consultation
const createConsultation = async (req, res) => {
    try {
        const { patientId, doctorId, consultationDate, notes, diagnosis, followUpRequired, followUpDate } = req.body;
        // Validate required fields
        if (!patientId || !doctorId) {
            return res.status(400).json({
                message: 'Patient ID and Doctor ID are required'
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
        const consultation = await prisma_1.prisma.consultation.create({
            data: {
                patientId,
                doctorId,
                consultationDate: consultationDate ? new Date(consultationDate) : new Date(),
                notes,
                diagnosis,
                followUpRequired: followUpRequired || false,
                followUpDate: followUpDate ? new Date(followUpDate) : null
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
                        specialization: true
                    }
                }
            }
        });
        return res.status(201).json({
            message: 'Consultation created successfully',
            consultation
        });
    }
    catch (error) {
        console.error('Error creating consultation:', error);
        return res.status(500).json({ message: 'Error creating consultation', error });
    }
};
exports.createConsultation = createConsultation;
// Get consultation by ID
const getConsultationById = async (req, res) => {
    try {
        const { id } = req.params;
        const consultation = await prisma_1.prisma.consultation.findUnique({
            where: { id: parseInt(id) },
            include: {
                patient: {
                    include: {
                        allergies: true,
                        patientDiseases: {
                            include: {
                                disease: true
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
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.json(consultation);
    }
    catch (error) {
        console.error('Error fetching consultation:', error);
        return res.status(500).json({ message: 'Error fetching consultation', error });
    }
};
exports.getConsultationById = getConsultationById;
// Get consultations for a patient
const getConsultationsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [consultations, total] = await Promise.all([
            prisma_1.prisma.consultation.findMany({
                where: { patientId: parseInt(patientId) },
                skip,
                take: parseInt(limit),
                include: {
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            specialization: true
                        }
                    }
                },
                orderBy: {
                    consultationDate: 'desc'
                }
            }),
            prisma_1.prisma.consultation.count({ where: { patientId: parseInt(patientId) } })
        ]);
        return res.json({
            consultations,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching consultations:', error);
        return res.status(500).json({ message: 'Error fetching consultations', error });
    }
};
exports.getConsultationsByPatient = getConsultationsByPatient;
// Get consultations for a doctor
const getConsultationsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [consultations, total] = await Promise.all([
            prisma_1.prisma.consultation.findMany({
                where: { doctorId: parseInt(doctorId) },
                skip,
                take: parseInt(limit),
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            age: true,
                            gender: true
                        }
                    }
                },
                orderBy: {
                    consultationDate: 'desc'
                }
            }),
            prisma_1.prisma.consultation.count({ where: { doctorId: parseInt(doctorId) } })
        ]);
        return res.json({
            consultations,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching consultations:', error);
        return res.status(500).json({ message: 'Error fetching consultations', error });
    }
};
exports.getConsultationsByDoctor = getConsultationsByDoctor;
// Update consultation
const updateConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes, diagnosis, followUpRequired, followUpDate } = req.body;
        const existingConsultation = await prisma_1.prisma.consultation.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingConsultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        const consultation = await prisma_1.prisma.consultation.update({
            where: { id: parseInt(id) },
            data: {
                notes,
                diagnosis,
                followUpRequired,
                followUpDate: followUpDate ? new Date(followUpDate) : null
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
            message: 'Consultation updated successfully',
            consultation
        });
    }
    catch (error) {
        console.error('Error updating consultation:', error);
        return res.status(500).json({ message: 'Error updating consultation', error });
    }
};
exports.updateConsultation = updateConsultation;
// Delete consultation
const deleteConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        const consultation = await prisma_1.prisma.consultation.findUnique({
            where: { id: parseInt(id) }
        });
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        await prisma_1.prisma.consultation.delete({
            where: { id: parseInt(id) }
        });
        return res.json({ message: 'Consultation deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting consultation:', error);
        return res.status(500).json({ message: 'Error deleting consultation', error });
    }
};
exports.deleteConsultation = deleteConsultation;
// Get upcoming follow-ups for a doctor
const getUpcomingFollowUps = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const consultations = await prisma_1.prisma.consultation.findMany({
            where: {
                doctorId: parseInt(doctorId),
                followUpRequired: true,
                followUpDate: {
                    gte: new Date()
                }
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        age: true,
                        gender: true
                    }
                }
            },
            orderBy: {
                followUpDate: 'asc'
            }
        });
        return res.json(consultations);
    }
    catch (error) {
        console.error('Error fetching follow-ups:', error);
        return res.status(500).json({ message: 'Error fetching follow-ups', error });
    }
};
exports.getUpcomingFollowUps = getUpcomingFollowUps;
//# sourceMappingURL=consultation.controller.js.map