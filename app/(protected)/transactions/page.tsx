// ui components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

// custom components
import CreateTransactionDialog from "@/features/transactions/create-transaction-dialog";
import ViewAllTransactions from "@/features/transactions/view-all-transactions-items";
import viewAllWallets from "@/features/wallets/view-all-wallets";

// others
import type { Metadata } from "next";
import Link from "next/link";

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/transactions">Transactions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
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
