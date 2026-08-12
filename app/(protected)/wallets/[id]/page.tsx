import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, SquarePen, Archive, Trash } from 'lucide-react';
import viewWallet  from "@/features/wallets/get-wallet";

export const metadata: Metadata = {
  title: "Wallet",
};

type Props = {
  params: Promise<{
    id:number
  }>,
}

export default async function Wallet({params}: Props) {
  const { id } = await params;

  const response = await viewWallet(id)

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
                <Link href="/wallets/:id">Details</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator />
        <section className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="opacity-50">{response.data.type}</h2>
            <h3 className="font-semibold text-xl">{response.data.name}</h3>
            <p className="opacity-50">{response.data.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="cursor-pointer">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/account">
                    <SquarePen />
                    Edit wallet
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/account">
                    <Archive />
                    Archive wallet
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" className="cursor-pointer" asChild>
                  <Link href="/account">
                    <Trash />
                    Remove wallet
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </div>
    );
};
