import {z} from "zod/index";

export const TaskPrioritySchema = z.enum(['low', 'medium', 'high']);
export const TaskStatusSchema = z.enum(['pending', 'in_progress', 'completed', 'cancelled']);
export const TaskCategorySchema = z.enum(['creative', 'admin', 'meeting', 'learning', 'personal']);

export const TaskSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    priority: TaskPrioritySchema,
    status: TaskStatusSchema,
    category: TaskCategorySchema,
    estimatedDuration: z.number(), // minutes
    actualDuration: z.number().optional(),
    scheduledFor: z.date().optional(),
    completedAt: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type TaskCategory = z.infer<typeof TaskCategorySchema>;
