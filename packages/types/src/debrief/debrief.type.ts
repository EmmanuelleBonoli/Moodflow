import {z} from "zod";

export const DebriefSchema = z.object({
    id: z.string(),
    planningId: z.string(),
    userReflexion: z.string(),
    aiAnalysis: z.string(),
    success: z.string(),
    improvementAvenues: z.string(),
    createdAt: z.date(),
})

export type Debrief = z.infer<typeof DebriefSchema>;