import { z } from "zod";
import { enumWalletSchema, createSchema, updateSchema } from "@/features/wallets/schema";

export type EnumType = z.infer<typeof enumWalletSchema>;
export type CreateType = z.infer<typeof createSchema>;
export type UpdateType = z.infer<typeof updateSchema>
export type GetType = {
  id: number,
  type: string,
  name: string,
  description: string,
  balance: string
}
export type GetAllType = GetType[]

export type Params = {
  params: Promise<{
    id:number
  }>,
}