import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppointmentStatus } from '../../generated/client/client';

// Create appointment
export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { patientId, doctorId, appointmentDate, duration, notes } = req.body;

        // Validate required fields
        if (!patientId || !doctorId || !appointmentDate) {
            return res.status(400).json({
                message: 'Patient ID, Doctor ID, and appointment date are required'
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

        // Check for conflicting appointments
        const appointmentDateTime = new Date(appointmentDate);
        const appointmentDuration = duration || 30; // Default 30 minutes
        const appointmentEnd = new Date(appointmentDateTime.getTime() + appointmentDuration * 60000);

        const conflictingAppointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                appointmentDate: {
                    gte: appointmentDateTime,
                    lt: appointmentEnd
                },
                status: {
                    in: [AppointmentStatus.Scheduled, AppointmentStatus.Confirmed]
                }
            }
        });

        if (conflictingAppointments.length > 0) {
            return res.status(400).json({
                message: 'Doctor has a conflicting appointment at this time',
                conflicts: conflictingAppointments
            });
        }

        const appointment = await prisma.appointment.create({
            data: {
                patientId,
                doctorId,
                appointmentDate: appointmentDateTime,
                duration: appointmentDuration,
                status: AppointmentStatus.Scheduled,
                notes,
                reminderSent: false
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
                        phoneNumber: true
                    }
                }
            }
        });

        return res.status(201).json({
            message: 'Appointment created successfully',
            appointment
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: 'Error creating appointment', error });
    }
};

// Get appointment by ID
export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.findUnique({
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

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.json(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        return res.status(500).json({ message: 'Error fetching appointment', error });
    }
};

// Get appointments by patient
export const getAppointmentsByPatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;
        const { status, upcoming = 'false', page = 1, limit = 20 } = req.query;

        const where: any = { patientId: parseInt(patientId) };
        if (status) {
            where.status = status as AppointmentStatus;
        }
        if (upcoming === 'true') {
            where.appointmentDate = {
                gte: new Date()
            };
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [appointments, total] = await Promise.all([
            prisma.appointment.findMany({
                where,
                skip,
                take: parseInt(limit as string),
                include: {
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            specialization: true,
                            phoneNumber: true
                        }
                    }
                },
                orderBy: {
                    appointmentDate: 'desc'
                }
            }),
            prisma.appointment.count({ where })
        ]);

        return res.json({
            appointments,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

// Get appointments by doctor
export const getAppointmentsByDoctor = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params;
        const { status, date, page = 1, limit = 20 } = req.query;

        const where: any = { doctorId: parseInt(doctorId) };
        if (status) {
            where.status = status as AppointmentStatus;
        }
        if (date) {
            const targetDate = new Date(date as string);
            const nextDay = new Date(targetDate);
            nextDay.setDate(nextDay.getDate() + 1);
            where.appointmentDate = {
                gte: targetDate,
                lt: nextDay
            };
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [appointments, total] = await Promise.all([
            prisma.appointment.findMany({
                where,
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
                    appointmentDate: 'asc'
                }
            }),
            prisma.appointment.count({ where })
        ]);

        return res.json({
            appointments,
            pagination: {
                total,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                totalPages: Math.ceil(total / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ message: 'Error fetching appointments', error });
    }
};

// Update appointment
export const updateAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { appointmentDate, duration, status, notes } = req.body;

        const existingAppointment = await prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const appointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined,
                duration,
                status: status as AppointmentStatus,
                notes
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
            message: 'Appointment updated successfully',
            appointment
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
        return res.status(500).json({ message: 'Error updating appointment', error });
    }
};

// Cancel appointment
export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.status === AppointmentStatus.Cancelled) {
            return res.status(400).json({ message: 'Appointment is already cancelled' });
        }

        const cancelledAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                status: AppointmentStatus.Cancelled
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
            message: 'Appointment cancelled successfully',
            appointment: cancelledAppointment
        });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        return res.status(500).json({ message: 'Error cancelling appointment', error });
    }
};

// Confirm appointment
export const confirmAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.status !== AppointmentStatus.Scheduled) {
            return res.status(400).json({
                message: 'Only scheduled appointments can be confirmed',
                currentStatus: appointment.status
            });
        }

        const confirmedAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                status: AppointmentStatus.Confirmed
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
            message: 'Appointment confirmed successfully',
            appointment: confirmedAppointment
        });
    } catch (error) {
        console.error('Error confirming appointment:', error);
        return res.status(500).json({ message: 'Error confirming appointment', error });
    }
};

// Complete appointment
export const completeAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const completedAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                status: AppointmentStatus.Completed
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
            message: 'Appointment completed successfully',
            appointment: completedAppointment
        });
    } catch (error) {
        console.error('Error completing appointment:', error);
        return res.status(500).json({ message: 'Error completing appointment', error });
    }
};

// Get today's appointments for a doctor
export const getTodayAppointments = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId: parseInt(doctorId),
                appointmentDate: {
                    gte: today,
                    lt: tomorrow
                },
                status: {
                    in: [AppointmentStatus.Scheduled, AppointmentStatus.Confirmed]
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
                appointmentDate: 'asc'
            }
        });

        return res.json(appointments);
    } catch (error) {
        console.error('Error fetching today appointments:', error);
        return res.status(500).json({ message: 'Error fetching appointments', error });
    }
};
