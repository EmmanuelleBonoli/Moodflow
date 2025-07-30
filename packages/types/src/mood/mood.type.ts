import {z} from "zod";

export const MoodSchema = z.object({
    id: z.string(),
    userId: z.string(),
    value: z.number().min(1).max(10),
    date: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Mood = z.infer<typeof MoodSchema>;

export interface MoodData {
    date: string;
    mood: number;
    productivity: number;
}