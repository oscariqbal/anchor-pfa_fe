import { z } from "zod";

export const enumTransaction = ["INCOME", "EXPENSE", "TRANSFER"]
export const enumTransactionSchema = z.enum(enumTransaction);
export type EnumType = z.infer<typeof enumTransactionSchema>;

// === Params ===

export const paramsSchema = z.object({
  id: z
    .coerce
    .number("Transaction id must be a number")
    .int("Transaction id must be an integer")
    .positive("Transaction id must be positive")
})

// === Query ===
// example, query filters will added soon
export const querySchema = z.object({
  type: z
    .enum(enumTransaction, "Invalid transaction type")
    .optional(),
  search: z 
    .number("Transaction search must be a number")
    .optional(),
});

// === Body ===

export const createSchema = z.object({
  type: z
    .enum(enumTransaction, "Invalid transaction type"),
  amount: z
    .coerce
    .number("Transaction amount must be a number")
    .positive("Transaction amount must be a positive number"),
  note: z
    .string("Transaction note must be a string")
    .trim()
    .min(1, "Transaction note is required")
    .max(255, "Transaction note must be at most 255 characters"),
  time: z
    .iso.datetime({local: true}),
  sourceWalletId: z
    .coerce
    .number("Source Wallet Id amount must be a number")
    .int("Source Wallet Id amount must be an integer")
    .positive("Source Wallet Id must be a positive number")
    .optional(),
  destinationWalletId: z
    .coerce
    .number("Destination Wallet Id amount must be a number")
    .int("Destination Wallet Id amount must be an integer")
    .positive("Destination Wallet Id must be a positive number")
    .optional(),
});

export const updateSchema = createSchema.partial().strict()

// === Types ===

export type CreateType = z.infer<typeof createSchema>;
export type UpdateType = z.infer<typeof updateSchema>;