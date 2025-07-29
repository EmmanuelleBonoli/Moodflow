"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanningSchema = void 0;
const zod_1 = require("zod");
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
