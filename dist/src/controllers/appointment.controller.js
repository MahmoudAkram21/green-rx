"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayAppointments = exports.completeAppointment = exports.confirmAppointment = exports.cancelAppointment = exports.updateAppointment = exports.getAppointmentsByDoctor = exports.getAppointmentsByPatient = exports.getAppointmentById = exports.createAppointment = void 0;
const prisma_1 = require("../lib/prisma");
const client_1 = require("../generated/client");
// Create appointment
const createAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate, duration, notes } = req.body;
        // Validate required fields
        if (!patientId || !doctorId || !appointmentDate) {
            return res.status(400).json({
                message: 'Patient ID, Doctor ID, and appointment date are required'
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
        // Check for conflicting appointments
        const appointmentDateTime = new Date(appointmentDate);
        const appointmentDuration = duration || 30; // Default 30 minutes
        const appointmentEnd = new Date(appointmentDateTime.getTime() + appointmentDuration * 60000);
        const conflictingAppointments = await prisma_1.prisma.appointment.findMany({
            where: {
                doctorId,
                appointmentDate: {
                    gte: appointmentDateTime,
                    lt: appointmentEnd
                },
                status: {
                    in: [client_1.AppointmentStatus.Scheduled, client_1.AppointmentStatus.Confirmed]
                }
            }
        });
        if (conflictingAppointments.length > 0) {
            return res.status(400).json({
                message: 'Doctor has a conflicting appointment at this time',
                conflicts: conflictingAppointments
            });
        }
        const appointment = await prisma_1.prisma.appointment.create({
            data: {
                patientId,
                doctorId,
                appointmentDate: appointmentDateTime,
                duration: appointmentDuration,
                status: client_1.AppointmentStatus.Scheduled,
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
    }
    catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: 'Error creating appointment', error });
    }
};
exports.createAppointment = createAppointment;
// Get appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await prisma_1.prisma.appointment.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching appointment:', error);
        return res.status(500).json({ message: 'Error fetching appointment', error });
    }
};
exports.getAppointmentById = getAppointmentById;
// Get appointments by patient
const getAppointmentsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { status, upcoming = 'false', page = 1, limit = 20 } = req.query;
        const where = { patientId: parseInt(patientId) };
        if (status) {
            where.status = status;
        }
        if (upcoming === 'true') {
            where.appointmentDate = {
                gte: new Date()
            };
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [appointments, total] = await Promise.all([
            prisma_1.prisma.appointment.findMany({
                where,
                skip,
                take: parseInt(limit),
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
            prisma_1.prisma.appointment.count({ where })
        ]);
        return res.json({
            appointments,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ message: 'Error fetching appointments', error });
    }
};
exports.getAppointmentsByPatient = getAppointmentsByPatient;
// Get appointments by doctor
const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { status, date, page = 1, limit = 20 } = req.query;
        const where = { doctorId: parseInt(doctorId) };
        if (status) {
            where.status = status;
        }
        if (date) {
            const targetDate = new Date(date);
            const nextDay = new Date(targetDate);
            nextDay.setDate(nextDay.getDate() + 1);
            where.appointmentDate = {
                gte: targetDate,
                lt: nextDay
            };
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [appointments, total] = await Promise.all([
            prisma_1.prisma.appointment.findMany({
                where,
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
                    appointmentDate: 'asc'
                }
            }),
            prisma_1.prisma.appointment.count({ where })
        ]);
        return res.json({
            appointments,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ message: 'Error fetching appointments', error });
    }
};
exports.getAppointmentsByDoctor = getAppointmentsByDoctor;
// Update appointment
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { appointmentDate, duration, status, notes } = req.body;
        const existingAppointment = await prisma_1.prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        const appointment = await prisma_1.prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined,
                duration,
                status: status,
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
    }
    catch (error) {
        console.error('Error updating appointment:', error);
        return res.status(500).json({ message: 'Error updating appointment', error });
    }
};
exports.updateAppointment = updateAppointment;
// Cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await prisma_1.prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        if (appointment.status === client_1.AppointmentStatus.Cancelled) {
            return res.status(400).json({ message: 'Appointment is already cancelled' });
        }
        const cancelledAppointment = await prisma_1.prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                status: client_1.AppointmentStatus.Cancelled
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
    }
    catch (error) {
        console.error('Error cancelling appointment:', error);
        return res.status(500).json({ message: 'Error cancelling appointment', error });
    }
};
exports.cancelAppointment = cancelAppointment;
// Confirm appointment
const confirmAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await prisma_1.prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        if (appointment.status !== client_1.AppointmentStatus.Scheduled) {
            return res.status(400).json({
                message: 'Only scheduled appointments can be confirmed',
                currentStatus: appointment.status
            });
        }
        const confirmedAppointment = await prisma_1.prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                status: client_1.AppointmentStatus.Confirmed
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
    }
    catch (error) {
        console.error('Error confirming appointment:', error);
        return res.status(500).json({ message: 'Error confirming appointment', error });
    }
};
exports.confirmAppointment = confirmAppointment;
// Complete appointment
const completeAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await prisma_1.prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        const completedAppointment = await prisma_1.prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                status: client_1.AppointmentStatus.Completed
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
    }
    catch (error) {
        console.error('Error completing appointment:', error);
        return res.status(500).json({ message: 'Error completing appointment', error });
    }
};
exports.completeAppointment = completeAppointment;
// Get today's appointments for a doctor
const getTodayAppointments = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const appointments = await prisma_1.prisma.appointment.findMany({
            where: {
                doctorId: parseInt(doctorId),
                appointmentDate: {
                    gte: today,
                    lt: tomorrow
                },
                status: {
                    in: [client_1.AppointmentStatus.Scheduled, client_1.AppointmentStatus.Confirmed]
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
    }
    catch (error) {
        console.error('Error fetching today appointments:', error);
        return res.status(500).json({ message: 'Error fetching appointments', error });
    }
};
exports.getTodayAppointments = getTodayAppointments;
//# sourceMappingURL=appointment.controller.js.map