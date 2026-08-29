// custom components
import CreateTransactionDialog from "@/features/transactions/create-transaction-dialog";
import ViewAllTransactions from "@/features/transactions/view-all-transactions-items";

// APIs
import viewAllWallets from "@/features/wallets/view-all-wallets";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function Transactions() {
  const result = await viewAllWallets()

  if (!result.success) {
    return (
      <p>error fetch wallet data</p>
    )
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <section className="w-full flex flex-col gap-4">
        <div className="ml-auto">
          {/* ganti ke component create transaction */}
          <CreateTransactionDialog walletData={result.data}/>
        </div>
        <div>
          <ViewAllTransactions />
        </div>
      </section>
    </div>
  );
};
