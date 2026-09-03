// custom components
import EditTransactionCard  from "@/features/transactions/edit-transaction-card";

// APIs
import viewTransaction from "@/features/transactions/get-transaction";
import viewAllWallets from "@/features/wallets/view-all-wallets";

// schemas and types
import { Params } from "@/features/transactions/schema";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Edit",
};

export default async function TransactionEdit({ params }: Params) {
  const { id } = await params;

  const wallets = await viewAllWallets()
  const oldTransaction = await viewTransaction(id)
  
  if (!wallets.success) {
    return (
      <p>error fetch wallet data</p>
    )
  }

  if (!oldTransaction.success) {
    return (
      <p>error fetch prefill data</p>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <section className="w-full">
        <EditTransactionCard id={id} wallets={wallets.data} oldTransaction={oldTransaction.data}/>
      </section>
    </div>
  );
};
