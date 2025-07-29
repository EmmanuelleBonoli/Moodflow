import { z } from "zod";
export declare const PlanningSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    date: z.ZodDate;
    mood: z.ZodNumber;
    aiRecommendations: z.ZodString;
    totalEstimatedTime: z.ZodNumber;
    actualProductivity: z.ZodNullable<z.ZodNumber>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    date: Date;
    userId: string;
    createdAt: Date;
    mood: number;
    aiRecommendations: string;
    totalEstimatedTime: number;
    actualProductivity: number | null;
}, {
    id: string;
    date: Date;
    userId: string;
    createdAt: Date;
    mood: number;
    aiRecommendations: string;
    totalEstimatedTime: number;
    actualProductivity: number | null;
}>;
export type Planning = z.infer<typeof PlanningSchema>;
