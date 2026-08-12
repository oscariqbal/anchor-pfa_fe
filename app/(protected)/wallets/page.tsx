import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import CreateWalletForm from "@/features/wallets/create-wallet-form";
import viewAllWallets  from "@/features/wallets/view-all-wallets";
import { BaseType, EnumType } from "@/features/wallets/schema";

export const metadata: Metadata = {
  title: "Wallet",
};

export default async function Wallet() {
  const response = await viewAllWallets()
  const grouped = response.data.reduce<
    {
      type: EnumType;
      wallets: Omit<BaseType, "type">[];
    }[]
  >((acc, wallet) => {
    const group = acc.find(g => g.type === wallet.type);

    if (group) {
      group.wallets.push({
        id: wallet.id,
        name: wallet.name,
        description: wallet.description,
      });
    } else {
      acc.push({
        type: wallet.type,
        wallets: [wallet],
      });
    }

    return acc;
  }, []);

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
        <section className="w-full flex items-center justify-between">
          {grouped.map(({type, wallets}) => {
            return (
              <div key={type} className="w-full flex flex-col gap-4">
                <h2 className="opacity-50">{type}</h2>
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wallets.map(({id, name, description}, i) => (
                  <Link href={`/wallets/${id}`} key={id}>
                    <Card className="rounded-md">
                      <CardHeader>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        content
                      </CardContent>
                    </Card>
                  </Link>
                  ))}
                  <div className="h-full w-full">
                    <CreateWalletForm type={type}/>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    );
};
