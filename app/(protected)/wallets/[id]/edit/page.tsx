// features components
import EditWalletCard  from "@/features/wallets/edit-wallet-card";

// APIs
import getWallet from "@/features/wallets/get-wallet";

// types
import { Params } from "@/features/wallets/types";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet Edit",
};

export default async function WalletEdit({ params }: Params) {
  const { id } = await params;

  const oldWallet = await getWallet(id)

  if (!oldWallet.success) {
    throw new Error(oldWallet.message)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <section className="w-full">
        {oldWallet.data && (
          <EditWalletCard id={id} oldWallet={oldWallet.data}/>
        )}
      </section>
    </div>
  );
};
