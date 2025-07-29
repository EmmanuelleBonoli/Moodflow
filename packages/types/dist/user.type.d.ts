import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}, {
    name: string;
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export type User = z.infer<typeof UserSchema>;
