import { z } from "zod";

export const enumWallet = ["CASH", "BANK", "E_MONEY"]
export const enumWalletSchema = z.enum(enumWallet);

// === Body ===

export const createSchema = z.object({
  type: enumWalletSchema,
  name: z
    .string()
    .trim()
    .min(1, "Username must be at least 1 characters")
    .max(10, "Username must be at most 10 characters"),
  description: z
    .string()
    .max(255, "Description")
    .optional(),
})

export const updateSchema = createSchema.partial()