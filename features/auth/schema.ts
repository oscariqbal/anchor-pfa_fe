import { z } from "zod";

// === Request ===

export const registerReqSchema = z.object({
  name: z
    .string("Account name must be a string")
    .trim()
    .min(3, "Account name must be at least 3 characters")
    .max(20, "Account name must be at most 20 characters"),
  email: z
    .email("Invalid email address")
    .min(1, "Email is required"),
  password: z
    .string("Password must be a string")
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
}).strict()

export const loginReqSchema = registerReqSchema.omit({
  name: true
}).strict()

// === Response ===

export const getResSchema = registerReqSchema.omit({
  password: true
}).strict()

// === Types ===

export type RegisterReqType = z.infer<typeof registerReqSchema>;
export type LoginReqType = z.infer<typeof loginReqSchema>;
export type GetResType = z.infer<typeof getResSchema>;