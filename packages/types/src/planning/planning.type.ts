import {z} from "zod";

export const PlanningSchema = z.object({
    id: z.string(),
    userId: z.string(),
    date: z.date(),
    mood: z.number(),
    aiRecommendations: z.string(),
    totalEstimatedTime: z.number(),
    actualProductivity: z.number().nullable(),
    createdAt: z.date(),
});

export type Planning = z.infer<typeof PlanningSchema>;