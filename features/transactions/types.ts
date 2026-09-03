import { z } from "zod";
import { createSchema, updateSchema } from "@/features/transactions/schema";

export type CreateType = z.infer<typeof createSchema>;
export type UpdateType = z.infer<typeof updateSchema>;
export type GetAllType = {
  id: number,
  type: string,
  amount: string,
  note: string,
  time: string,
  sourceWallet?: {
    id: number,
    name: string
  },
  destinationWallet?: {
    id: number,
    name: string
  },
}[]