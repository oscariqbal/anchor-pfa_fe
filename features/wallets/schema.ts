import { z } from "zod";

export const enumWallet = ["CASH", "BANK", "E_MONEY"]
export const enumWalletSchema = z.enum(enumWallet);
export type EnumType = z.infer<typeof enumWalletSchema>;

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

// === Types ===

export type CreateType = z.infer<typeof createSchema>;
export type UpdateType = z.infer<typeof updateSchema>
export type ViewAllType = {
  id: number,
  type: string,
  name: string,
  description: string,
  balance: string
}

// === Props Types ===

export type Params = {
  params: Promise<{
    id:number
  }>,
}