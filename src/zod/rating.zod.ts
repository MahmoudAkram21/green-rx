import { z } from "zod";

export const ratingSchema = z.object({
  patientId: z.number(),
  ratedType: z.enum(["Doctor", "Pharmacist"]),
  doctorId: z.number().optional(),
  pharmacistId: z.number().optional(),
  rating: z.number().min(1).max(5),
  review: z.string().optional(),
});

export const updateRatingSchema = ratingSchema.partial();
