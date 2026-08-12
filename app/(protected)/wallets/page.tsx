import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import viewAllWallets  from "@/features/wallets/get-all-wallets";

export const metadata: Metadata = {
  title: "Wallet",
};

export default async function Wallet() {
  const response = await viewAllWallets()

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
          {["CASH", "BANK", "E_MONEY"].map((type) => {
            const items = response.data.filter((item) => item.type === type)

            if (items.length === 0) return null;

            return (
              <div key={type} className="w-full flex flex-col gap-4">
                <h2 className="opacity-50">{type}</h2>
                <div className="w-full grid grid-cols-4 gap-4">
                  {items.map(({id, name, description}, i) => (
                    <Link href={`/wallets/${id}`} key={id}>
                      <Card>
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
                </div>
              </div>
            )
          })}
        </section>
      </div>
    );
};
