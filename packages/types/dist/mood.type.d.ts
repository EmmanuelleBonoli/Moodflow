import { z } from "zod";
export declare const MoodSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    value: z.ZodNumber;
    emotions: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    energy: z.ZodNullable<z.ZodNumber>;
    context: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    value: number;
    userId: string;
    createdAt: Date;
    emotions: string[] | null;
    energy: number | null;
    context: string | null;
}, {
    id: string;
    value: number;
    userId: string;
    createdAt: Date;
    emotions: string[] | null;
    energy: number | null;
    context: string | null;
}>;
export type Mood = z.infer<typeof MoodSchema>;
