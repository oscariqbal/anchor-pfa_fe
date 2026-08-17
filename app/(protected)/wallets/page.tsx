import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import CreateWalletForm from "@/features/wallets/create-wallet-form";
import ViewAllWallets from "@/features/wallets/view-all-wallets-card";

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
              <Link href="/wallets">Wallets</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
      <section className="w-full flex flex-col gap-4">
        <div className="ml-auto">
          <CreateWalletForm />
        </div>
        <div>
          <ViewAllWallets />
        </div>
      </section>
    </div>
  );
};
