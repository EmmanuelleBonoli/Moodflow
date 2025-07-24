import {z} from "zod/index";

export const MoodSchema = z.object({
    id: z.string(),
    userId: z.string(),
    value: z.number().min(1).max(10),
    emotions: z.array(z.string()).optional(),
    energy: z.number().min(1).max(10).optional(),
    context: z.string().optional(),
    createdAt: z.date(),
});

export type Mood = z.infer<typeof MoodSchema>;