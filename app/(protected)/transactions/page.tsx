// ui components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

// custom components
import CreateWalletDialog from "@/features/wallets/create-wallet-dialog";
import ViewAllTransactions from "@/features/transactions/view-all-transactions-items";

// others
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function Transactions() {
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
          <CreateWalletDialog />
        </div>
        <div>
          <ViewAllTransactions />
        </div>
      </section>
    </div>
  );
};
