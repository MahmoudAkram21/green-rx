/**
 * Medicine reminder job: runs every 10 minutes, finds PatientMedicines with
 * reminderEnabled and reminderTimes, and creates in-app Notification records
 * for due slots (with deduplication by patientMedicineId in last 12h).
 */
import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { NotificationType } from '../../generated/client/client';

const CRON_SCHEDULE = '*/10 * * * *'; // every 10 minutes
const DEDUP_HOURS = 12;
const WINDOW_MINUTES = 15; // consider "due" if current time is within WINDOW_MINUTES of a reminder time

function parseTimeToMinutes(timeStr: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr.trim());
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

function isTimeInWindow(nowMinutes: number, slotMinutes: number): boolean {
  const diff = Math.abs(nowMinutes - slotMinutes);
  const wrap = 24 * 60;
  return diff <= WINDOW_MINUTES || wrap - diff <= WINDOW_MINUTES;
}

export function startMedicineReminderJob(): void {
  cron.schedule(CRON_SCHEDULE, async () => {
    try {
      const now = new Date();
      const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
      const dedupSince = new Date(now.getTime() - DEDUP_HOURS * 60 * 60 * 1000);

      const medicines = await prisma.patientMedicine.findMany({
        where: {
          reminderEnabled: true,
          reminderTimes: { isEmpty: false },
          OR: [
            { isOngoing: true },
            { isOngoing: false, startDate: { lte: now }, endDate: null },
            { isOngoing: false, startDate: { lte: now }, endDate: { gte: now } },
          ],
        },
        select: {
          id: true,
          medicineName: true,
          reminderTimes: true,
          patientId: true,
          patient: { select: { userId: true } },
        },
      });

      for (const med of medicines) {
        const userId = med.patient.userId;
        const times: string[] = Array.isArray(med.reminderTimes) ? med.reminderTimes : [];
        for (const timeStr of times) {
          const slotMinutes = parseTimeToMinutes(timeStr);
          if (slotMinutes == null) continue;
          if (!isTimeInWindow(nowMinutes, slotMinutes)) continue;

          const existing = await prisma.notification.findFirst({
            where: {
              type: NotificationType.MedicineReminder,
              userId,
              patientMedicineId: med.id,
              createdAt: { gte: dedupSince },
            },
          });
          if (existing) continue;

          await prisma.notification.create({
            data: {
              userId,
              type: NotificationType.MedicineReminder,
              title: 'Medicine reminder',
              message: `Take ${med.medicineName}`,
              patientMedicineId: med.id,
            },
          });
        }
      }
    } catch (err) {
      console.error('[medicineReminderJob] Error:', err);
    }
  });
}
