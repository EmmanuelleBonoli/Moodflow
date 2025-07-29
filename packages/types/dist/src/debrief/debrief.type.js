"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebriefSchema = void 0;
const zod_1 = require("zod");
exports.DebriefSchema = zod_1.z.object({
    id: zod_1.z.string(),
    planningId: zod_1.z.string(),
    userReflexion: zod_1.z.string(),
    aiAnalysis: zod_1.z.string(),
    success: zod_1.z.string(),
    improvementAvenues: zod_1.z.string(),
    createdAt: zod_1.z.date(),
});
