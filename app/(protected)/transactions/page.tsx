import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import CreateWalletDialog from "@/features/wallets/create-wallet-dialog";
import ViewAllTransactions from "@/features/transactions/view-all-transactions-items";

export const metadata: Metadata = {
  title: "Wallet",
};

export default async function Wallet() {
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
