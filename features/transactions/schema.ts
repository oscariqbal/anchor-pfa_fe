import { z } from "zod";

export const enumTransaction = ["INCOME", "EXPENSE", "TRANSFER"]
export const enumTransactionSchema = z.enum(enumTransaction);

export const baseSchema = z.object({
  type: z
    .enum(enumTransaction, "Invalid transaction type"),
  amount: z
    .number("Transaction amount must be a number")
    .positive("Transaction amount must be a positive number"),
  note: z
    .string("Transaction note must be a string")
    .trim()
    .min(1, "Transaction note is required")
    .max(255, "Transaction note must be at most 255 characters"),
  sourceWalletId: z
    .number("Source Wallet Id amount must be a number")
    .int("Source Wallet Id amount must be an integer")
    .positive("Source Wallet Id must be a positive number")
    .optional(),
  destinationWalletId: z
    .number("Destination Wallet Id amount must be a number")
    .int("Destination Wallet Id amount must be an integer")
    .positive("Destination Wallet Id must be a positive number")
    .optional(),
})

export const createFormSchema = baseSchema.extend({
  date: z.date(),
  time: z.string()
})

export const createAPISchema = baseSchema.extend({
  datetime: z.iso.datetime()
})

export const updateFormSchema = createFormSchema.partial().strict()
export const updateAPISchema = createAPISchema.partial().strict()