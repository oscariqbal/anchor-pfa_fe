import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import ViewTransaction  from "@/features/transactions/view-transaction-card";

export const metadata: Metadata = {
  title: "Wallet",
};

type Props = {
  params: Promise<{
    id:number
  }>,
}

export default async function Transaction({params}: Props) {
  const { id } = await params;
  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/transactions">Transactions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/transactions/${id}`}>Details</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
      <section className="w-full">
        <ViewTransaction id={id} />
      </section>
    </div>
  );
};
