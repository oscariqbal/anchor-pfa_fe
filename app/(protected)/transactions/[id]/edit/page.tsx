// common components
import { SkeletonCard } from "@/components/common/skeleton-component";
import ErrorComponent from "@/components/common/error-component";

// ui components
import { toast } from "sonner"

// features components
import EditTransactionCard  from "@/features/transactions/edit-transaction-card";

// APIs
import viewTransaction from "@/features/transactions/get-transaction";
import viewAllWallets from "@/features/wallets/view-all-wallets";

// types
import { Params } from "@/features/transactions/types";

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
    throw new Error() // abis benerin get all wallet
  }

  if (!oldTransaction.success) {
    throw new Error(oldTransaction.message)
  }

  return (
    <section className="w-full flex flex-col gap-4">
      {oldTransaction.data && 
        <EditTransactionCard id={id} wallets={wallets.data} oldTransaction={oldTransaction.data}/>
      }
    </section>
  );
};