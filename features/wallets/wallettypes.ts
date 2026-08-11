type Type = "CASH" | "BANK" | "E_MONEY";

type Wallet = {
  type: Type
  name: string
  description: string
}

export type GetAll = {
  data: Wallet[]
};