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
    <div className="flex flex-col gap-4">
      <section className="flex">
        <ActionDropdown id={id} className="ml-auto"/>
      </section>
      <section className="w-full">
        <ViewWallet id={id} />
      </section>
    </div>
  );
};
