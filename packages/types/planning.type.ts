import {z} from "zod/index";
import {TaskSchema} from "./task.type";

export const PlanningSchema = z.object({
    id: z.string(),
    userId: z.string(),
    date: z.date(),
    mood: z.number(),
    tasks: z.array(TaskSchema),
    aiRecommendations: z.string(),
    totalEstimatedTime: z.number(),
    actualProductivity: z.number().optional(),
    createdAt: z.date(),
});

export type Planning = z.infer<typeof PlanningSchema>;