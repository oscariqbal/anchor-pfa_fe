// custom components
import CreateWalletDialog from "@/features/wallets/create-wallet-dialog";
import ViewAllWallets from "@/features/wallets/view-all-wallets-cards";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallets",
};

export default function Wallets() {
  return (
    <div className="w-full flex flex-col gap-4">
      <section className="w-full flex flex-col gap-4">
        <div className="ml-auto">
          <CreateWalletDialog />
        </div>
        <div>
          <ViewAllWallets />
        </div>
      </section>
    </div>
  );
};
