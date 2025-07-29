import { z } from "zod";
export interface TaskCompletion {
    name: string;
    completed: number;
    total: number;
}
export declare const TaskPrioritySchema: z.ZodEnum<["low", "medium", "high"]>;
export declare const TaskStatusSchema: z.ZodEnum<["pending", "in_progress", "completed"]>;
export declare const TaskCategorySchema: z.ZodEnum<["creative", "admin", "meeting", "learning", "personal"]>;
export declare const TaskSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    priority: z.ZodEnum<["low", "medium", "high"]>;
    status: z.ZodEnum<["pending", "in_progress", "completed"]>;
    category: z.ZodEnum<["creative", "admin", "meeting", "learning", "personal"]>;
    estimatedDuration: z.ZodNumber;
    actualDuration: z.ZodNullable<z.ZodNumber>;
    completedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    priority: "high" | "low" | "medium";
    title: string;
    description: string | null;
    status: "completed" | "pending" | "in_progress";
    userId: string;
    category: "creative" | "admin" | "meeting" | "learning" | "personal";
    estimatedDuration: number;
    actualDuration: number | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    priority: "high" | "low" | "medium";
    title: string;
    description: string | null;
    status: "completed" | "pending" | "in_progress";
    userId: string;
    category: "creative" | "admin" | "meeting" | "learning" | "personal";
    estimatedDuration: number;
    actualDuration: number | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export type Task = z.infer<typeof TaskSchema>;
