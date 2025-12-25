import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// Create consultation
export const createConsultation = async (req: Request, res: Response) => {
    try {
        const { patientId, doctorId, consultationDate, notes, diagnosis, followUpRequired, followUpDate } = req.body;

        // Validate required fields
        if (!patientId || !doctorId) {
            return res.status(400).json({
                message: 'Patient ID and Doctor ID are required'
            });
        }

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: patientId }
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Check if doctor exists
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const consultation = await prisma.consultation.create({
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
    } catch (error) {
        console.error('Error creating consultation:', error);
        return res.status(500).json({ message: 'Error creating consultation', error });
    }
};

// Get consultation by ID
export const getConsultationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const consultation = await prisma.consultation.findUnique({
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
    } catch (error) {
        console.error('Error fetching consultation:', error);
        return res.status(500).json({ message: 'Error fetching consultation', error });
    }
};

// Get consultations for a patient
export const getConsultationsByPatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;
        const { page = 1, limit = 20 } = req.query;

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [consultations, total] = await Promise.all([
            prisma.consultation.findMany({
                where: { patientId: parseInt(patientId) },
                skip,
                take: parseInt(limit as string),
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
            prisma.consultation.count({ where: { patientId: parseInt(patientId) } })
        ]);

        return res.json({
            consultations,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Error fetching consultations:', error);
        return res.status(500).json({ message: 'Error fetching consultations', error });
    }
};

// Get consultations for a doctor
export const getConsultationsByDoctor = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params;
        const { page = 1, limit = 20 } = req.query;

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [consultations, total] = await Promise.all([
            prisma.consultation.findMany({
                where: { doctorId: parseInt(doctorId) },
                skip,
                take: parseInt(limit as string),
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
            prisma.consultation.count({ where: { doctorId: parseInt(doctorId) } })
        ]);

        return res.json({
            consultations,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Error fetching consultations:', error);
        return res.status(500).json({ message: 'Error fetching consultations', error });
    }
};

// Update consultation
export const updateConsultation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { notes, diagnosis, followUpRequired, followUpDate } = req.body;

        const existingConsultation = await prisma.consultation.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingConsultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        const consultation = await prisma.consultation.update({
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
    } catch (error) {
        console.error('Error updating consultation:', error);
        return res.status(500).json({ message: 'Error updating consultation', error });
    }
};

// Delete consultation
export const deleteConsultation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const consultation = await prisma.consultation.findUnique({
            where: { id: parseInt(id) }
        });

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        await prisma.consultation.delete({
            where: { id: parseInt(id) }
        });

        return res.json({ message: 'Consultation deleted successfully' });
    } catch (error) {
        console.error('Error deleting consultation:', error);
        return res.status(500).json({ message: 'Error deleting consultation', error });
    }
};

// Get upcoming follow-ups for a doctor
export const getUpcomingFollowUps = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params;

        const consultations = await prisma.consultation.findMany({
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
    } catch (error) {
        console.error('Error fetching follow-ups:', error);
        return res.status(500).json({ message: 'Error fetching follow-ups', error });
    }
};
