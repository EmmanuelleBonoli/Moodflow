"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodSchema = void 0;
const zod_1 = require("zod");
exports.MoodSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    value: zod_1.z.number().min(1).max(10),
    emotions: zod_1.z.array(zod_1.z.string()).nullable(),
    energy: zod_1.z.number().min(1).max(10).nullable(),
    context: zod_1.z.string().nullable(),
    createdAt: zod_1.z.date(),
});
