import {z} from "zod";

export const MoodSchema = z.object({
    id: z.string(),
    userId: z.string(),
    value: z.number().min(1).max(10),
    date: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Mood = z.infer<typeof MoodSchema>;

export type MoodData = {
    date: Date;
    mood: number;
    taskCompleted: { total: number, tasksId: string[] };
}

export type NewMood = {
    date: string;
    mood: number;
}

export type UpdateWeeklyMood = {
    date: Date;
    productivity: number;
    taskId: string;
}