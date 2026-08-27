// custom components
import EditWalletCard  from "@/features/wallets/edit-wallet-card";

// APIs
import viewWallet from "@/features/wallets/view-wallet";

// schemas and types
import { Params } from "@/features/wallets/schema";

// others
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wallet Edit",
};

export default async function WalletEdit({ params }: Params) {
  const { id } = await params;

  const oldWallet = await viewWallet(id)

  if (!oldWallet.success) {
    console.log(oldWallet)
    return (
      <p>error fetch prefill data</p>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <section className="w-full">
        <EditWalletCard id={id} oldWallet={oldWallet.data}/>
      </section>
    </div>
  );
};
