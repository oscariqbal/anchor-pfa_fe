import { z } from "zod";

export const enumWallet = ["CASH", "BANK", "E_MONEY"]
export const enumWalletSchema = z.enum(enumWallet);
export type EnumType = z.infer<typeof enumWalletSchema>;

// base
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
export type BaseType = z.infer<typeof baseSchema>;

// create
export const createSchema = baseSchema.omit({
  id: true,
})
export type CreateType = z.infer<typeof createSchema>;

// update

// archive

// dearchive


// get
export const getSchema = z.object({
  data: baseSchema
})
export type GetType = z.infer<typeof getSchema>;

// get all
export const getListSchema = z.object({
  data: z.array(baseSchema)
})
export type GetListType = z.infer<typeof getListSchema>;

// 

// type