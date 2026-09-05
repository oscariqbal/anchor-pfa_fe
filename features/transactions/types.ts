import { z } from "zod";
import { enumTransactionSchema, createFormSchema, createAPISchema, updateAPISchema, updateFormSchema } from "@/features/transactions/schema";

export type EnumType = z.infer<typeof enumTransactionSchema>;
export type CreateFormType = z.infer<typeof createFormSchema>;
export type CreateAPIType = z.infer<typeof createAPISchema>;
export type UpdateAPIType = z.infer<typeof updateAPISchema>;
export type UpdateFormType = z.infer<typeof updateFormSchema>;
export type GetType = {
  id: number,
  type: EnumType,
  amount: number,
  note: string,
  datetime: string,
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

export type Params = {
  params: Promise<{
    id:number
  }>,
}