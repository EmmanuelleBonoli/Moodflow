import {z} from "zod";

export const MoodSchema = z.object({
    id: z.string(),
    userId: z.string(),
    value: z.number().min(1).max(10),
    emotions: z.array(z.string()).nullable(),
    energy: z.number().min(1).max(10).nullable(),
    context: z.string().nullable(),
    createdAt: z.date(),
});

export type Mood = z.infer<typeof MoodSchema>;

export interface MoodData {
    date: string;
    mood: number;
    productivity: number;
}