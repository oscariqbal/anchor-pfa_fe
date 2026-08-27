// custom components
import ViewWallet  from "@/features/wallets/view-wallet-card";
import ActionDropdown from "@/features/wallets/action-dropdown";

// schema and types
import { Params } from "@/features/wallets/schema";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet Details",
};

export default async function Wallet({params}: Params) {
  const { id } = await params;
  return (
    <div className="w-full flex flex-col gap-4">
      <ActionDropdown id={id} />
      <section className="w-full">
        <ViewWallet id={id} />
      </section>
    </div>
  );
};
