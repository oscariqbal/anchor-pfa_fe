import Link from "next/link";
import AccountClient from "@/components/client/accountclient";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function Account() {
  return (
    <div className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] flex flex-col mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/account">Account</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AccountClient />
    </div>
  );
};