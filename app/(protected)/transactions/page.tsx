// common components
import { SkeletonCardItem } from "@/components/common/skeleton-component";
import ErrorComponent from "@/components/common/error-component";

// features components
import CreateTransactionDialog from "@/features/transactions/create-transaction-dialog";
import ViewTransactions from "@/features/transactions/view-transactions";

// APIs
import viewAllWallets from "@/features/wallets/view-all-wallets";

// others
import { Suspense } from "react";
import ErrorBoundary from "@/helpers/error-boundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function Transactions() {
  const result = await viewAllWallets()

  if (!result.success) {
    throw new Error(result.message)
  }

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="ml-auto">
        <CreateTransactionDialog walletData={result.data}/>
      </div>
      <div>
        <ErrorBoundary fallback={<ErrorComponent message={"Unable to load transactions"}/>}>
          <Suspense fallback={<SkeletonCardItem className="h-16"/>}>
            <ViewTransactions />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
};
