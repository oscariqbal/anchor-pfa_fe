import { z } from "zod";

export const enumWallet = ["CASH", "BANK", "E_MONEY"]
export const enumWalletSchema = z.enum(enumWallet);
export type EnumType = z.infer<typeof enumWalletSchema>;

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

export const updateSchema = createSchema.partial()

export const getSchema = z.object({
  data: baseSchema
})

export const getListSchema = z.object({
  data: z.array(baseSchema)
})

// === Types ===

export type BaseType = z.infer<typeof baseSchema>;
export type CreateType = z.infer<typeof createSchema>;
export type UpdateType = z.infer<typeof updateSchema>
export type GetType = z.infer<typeof getSchema>;
export type GetListType = z.infer<typeof getListSchema>;

// === Props Types ===

export type Params = {
  params: Promise<{
    id:number
  }>,
}

export type EditDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}