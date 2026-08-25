// ui components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// custom components
import EditWalletCard  from "@/features/wallets/edit-wallet-card";

// others
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wallet Edit",
};

type Props = {
  params: Promise<{
    id:number
  }>,
}

export default async function WalletEdit({params}: Props) {
  const { id } = await params;
  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/wallets">Wallets</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/wallets/${id}`}>Details</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/wallets/${id}/edit`}>Edit</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
      <section className="w-full">
        <EditWalletCard id={id} />
      </section>
    </div>
  );
};
