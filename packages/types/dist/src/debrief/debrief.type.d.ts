import { z } from "zod";
export declare const DebriefSchema: z.ZodObject<{
    id: z.ZodString;
    planningId: z.ZodString;
    userReflexion: z.ZodString;
    aiAnalysis: z.ZodString;
    success: z.ZodString;
    improvementAvenues: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    success: string;
    createdAt: Date;
    planningId: string;
    userReflexion: string;
    aiAnalysis: string;
    improvementAvenues: string;
}, {
    id: string;
    success: string;
    createdAt: Date;
    planningId: string;
    userReflexion: string;
    aiAnalysis: string;
    improvementAvenues: string;
}>;
export type Debrief = z.infer<typeof DebriefSchema>;
