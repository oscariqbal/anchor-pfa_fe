import Link from "next/link";
import AccountClient from "@/features/auth/account-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function Account() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/account">Account</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
      <AccountClient />
    </div>
  );
};