// ui components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// custom components
import CreateWalletDialog from "@/features/wallets/create-wallet-dialog";
import ViewAllWallets from "@/features/wallets/view-all-wallets-cards";

// others
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wallets",
};

export default async function Wallets() {
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
          <CreateWalletDialog />
        </div>
        <div>
          <ViewAllWallets />
        </div>
      </section>
    </div>
  );
};
