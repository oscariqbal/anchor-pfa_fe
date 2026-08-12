type Type = "CASH" | "BANK" | "E_MONEY";

type Wallet = {
  id: number
  type: Type | null // null nya nanti diilangin kalo udah implement error handling yang rapi, di mvp cukup gitu dulu biar return catch di fetch get wallet nya bisa kosong
  name: string
  description: string
}

type GetAllWallets = {
  data: Wallet[]
};

type GetWallet = {
  data: Wallet
}

export type{
  GetWallet,
  GetAllWallets,
}