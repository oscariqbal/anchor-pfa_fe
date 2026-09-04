import { z } from "zod";
import { createFormSchema, createAPISchema, updateSchema } from "@/features/transactions/schema";

export type CreateFormType = z.infer<typeof createFormSchema>;
export type CreateAPIType = z.infer<typeof createAPISchema>;
export type UpdateType = z.infer<typeof updateSchema>;
export type GetType = {
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
}
export type GetAllType = GetType[]