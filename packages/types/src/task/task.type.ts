import {z} from "zod";
import {DashboardTotal} from "../dashboard/dashboard.type";

export interface TaskCompletion {
    name: string;
    completed: number;
    total: number;
}

export const TaskPrioritySchema = z.enum(['low', 'medium', 'high']);
export const TaskStatusSchema = z.enum(['pending', 'in_progress', 'completed']);
export const TaskCategorySchema = z.enum(['creative', 'admin', 'meeting', 'learning', 'personal']);

export const TaskSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    priority: TaskPrioritySchema,
    status: TaskStatusSchema,
    category: TaskCategorySchema,
    estimatedDuration: z.number(),
    actualDuration: z.number().nullable(),
    completedAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type TaskCategory = z.infer<typeof TaskCategorySchema>;

export type TaskFilter = {
    category: TaskCategory | null,
    status: TaskStatus | null,
}

export type TasksAndTotals = {
    tasks: Task[],
    totals: DashboardTotal
}

export type TaskOperationResponse = {
    task: Task;
    totals: DashboardTotal;
}

export type TaskDeleteResponse = {
    success: boolean;
    totals: DashboardTotal;
}
