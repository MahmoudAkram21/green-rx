import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { SuggestionStatus } from '../../generated/client/client';

class MedicineSuggestionController {
  // Create a new medicine suggestion (Doctor)
  async createSuggestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        tradeName,
        activeSubstance,
        concentration,
        dosageForm,
        manufacturer,
        reason
      } = req.body;

      const userId = (req.user as any)?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Get doctor ID from user
      const doctor = await prisma.doctor.findUnique({
        where: { userId }
      });

      if (!doctor) {
        res.status(403).json({ error: 'Only doctors can suggest medicines' });
        return;
      }

      const suggestion = await prisma.medicineSuggestion.create({
        data: {
          doctorId: doctor.id,
          tradeName,
          activeSubstance,
          concentration,
          dosageForm,
          manufacturer,
          reason,
          status: SuggestionStatus.Pending
        },
        include: {
          doctor: {
            select: {
              id: true,
              name: true,
              specialization: true
            }
          }
        }
      });

      res.status(201).json(suggestion);
    } catch (error) {
      next(error);
    }
  }

  // Get all suggestions (Admin sees all, Doctor sees own)
  async getSuggestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.query;
      const userId = (req.user as any)?.id;
      const userRole = (req.user as any)?.role;

      const where: any = {};
      if (status) where.status = status as SuggestionStatus;

      // If doctor, only show their own suggestions
      if (userRole === 'Doctor') {
        const doctor = await prisma.doctor.findUnique({
          where: { userId }
        });

        if (!doctor) {
          res.status(403).json({ error: 'Doctor not found' });
          return;
        }

        where.doctorId = doctor.id;
      }

      const suggestions = await prisma.medicineSuggestion.findMany({
        where,
        include: {
          doctor: {
            select: {
              id: true,
              name: true,
              specialization: true
            }
          },
          reviewer: {
            select: {
              id: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json(suggestions);
    } catch (error) {
      next(error);
    }
  }

  // Get a single suggestion by ID
  async getSuggestionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const suggestion = await prisma.medicineSuggestion.findUnique({
        where: { id: Number(id) },
        include: {
          doctor: {
            select: {
              id: true,
              name: true,
              specialization: true,
              user: {
                select: {
                  email: true
                }
              }
            }
          },
          reviewer: {
            select: {
              id: true,
              email: true
            }
          }
        }
      });

      if (!suggestion) {
        res.status(404).json({ error: 'Suggestion not found' });
        return;
      }

      res.json(suggestion);
    } catch (error) {
      next(error);
    }
  }

  // Review a suggestion (Admin only)
  async reviewSuggestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status, reviewNotes } = req.body;

      const userId = (req.user as any)?.id;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      if (!status || !['Approved', 'Rejected'].includes(status)) {
        res.status(400).json({ error: 'Status must be Approved or Rejected' });
        return;
      }

      const suggestion = await prisma.medicineSuggestion.update({
        where: { id: Number(id) },
        data: {
          status: status as SuggestionStatus,
          reviewedBy: userId,
          reviewNotes,
          reviewedAt: new Date()
        },
        include: {
          doctor: {
            select: {
              id: true,
              name: true,
              user: {
                select: {
                  email: true
                }
              }
            }
          },
          reviewer: {
            select: {
              id: true,
              email: true
            }
          }
        }
      });

      // TODO: Send notification to doctor
      // await notificationService.notifyDoctorOfSuggestionReview(suggestion);

      res.json(suggestion);
    } catch (error) {
      next(error);
    }
  }

  // Delete a suggestion (Doctor can delete own pending, Admin can delete any)
  async deleteSuggestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = (req.user as any)?.id;
      const userRole = (req.user as any)?.role;

      const suggestion = await prisma.medicineSuggestion.findUnique({
        where: { id: Number(id) },
        include: { doctor: true }
      });

      if (!suggestion) {
        res.status(404).json({ error: 'Suggestion not found' });
        return;
      }

      // Check permissions: Doctor can only delete own pending suggestions
      if (userRole === 'Doctor') {
        if (suggestion.doctor.userId !== userId) {
          res.status(403).json({ error: 'You can only delete your own suggestions' });
          return;
        }

        if (suggestion.status !== SuggestionStatus.Pending) {
          res.status(403).json({ error: 'You can only delete pending suggestions' });
          return;
        }
      }

      await prisma.medicineSuggestion.delete({
        where: { id: Number(id) }
      });

      res.json({ message: 'Suggestion deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new MedicineSuggestionController();
