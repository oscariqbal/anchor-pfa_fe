import { z } from "zod";

export const enumWallet = ["CASH", "BANK", "E_MONEY"]
export const enumWalletSchema = z.enum(enumWallet);
export type EnumType = z.infer<typeof enumWalletSchema>;

// === Params ===

export const paramsSchema = z.object({
  id: z
    .coerce
    .number("Wallet id must be a number")
    .int("Wallet id must be an integer")
    .positive("Wallet id must be positive")
})

// === Query ===

export const querySchema = z.object({
  archived: z.
    coerce
    .boolean("Wallet archived must be boolean")
    .optional(),
  type: z
    .enum(["CASH", "BANK", "E_MONEY", "Wallet type must be one of the provided type"])
    .optional(),
  search: z
    .string("Wallet search must be a string")
    .trim()
    .optional(),
});

// === Body ===

export const baseSchema = z.object({
  id: z
    .number()
    .int()
    .positive(),
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

export const createSchema = baseSchema.omit({
  id: true,
})

export const getSchema = z.object({
  data: baseSchema
})

export const getListSchema = z.object({
  data: z.array(baseSchema)
})

// === Types ===

export type BaseType = z.infer<typeof baseSchema>;
export type CreateType = z.infer<typeof createSchema>;
export type GetType = z.infer<typeof getSchema>;
export type GetListType = z.infer<typeof getListSchema>;