"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanningSchema = exports.TaskSchema = exports.TaskCategorySchema = exports.TaskStatusSchema = exports.TaskPrioritySchema = void 0;
// base.types.ts
const zod_1 = require("zod");
exports.TaskPrioritySchema = zod_1.z.enum(['low', 'medium', 'high']);
exports.TaskStatusSchema = zod_1.z.enum(['pending', 'in_progress', 'completed']);
exports.TaskCategorySchema = zod_1.z.enum(['creative', 'admin', 'meeting', 'learning', 'personal']);
exports.TaskSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    priority: exports.TaskPrioritySchema,
    status: exports.TaskStatusSchema,
    category: exports.TaskCategorySchema,
    estimatedDuration: zod_1.z.number(),
    actualDuration: zod_1.z.number().nullable(),
    completedAt: zod_1.z.date().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.PlanningSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    date: zod_1.z.date(),
    mood: zod_1.z.number(),
    aiRecommendations: zod_1.z.string(),
    totalEstimatedTime: zod_1.z.number(),
    actualProductivity: zod_1.z.number().nullable(),
    createdAt: zod_1.z.date(),
});
