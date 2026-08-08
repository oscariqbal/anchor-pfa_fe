import HeaderProtected from "@/app/(protected)/header";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] flex flex-col mx-auto">
      <HeaderProtected />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="h-[80vh] w-full p-2 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-heading">Welcome </h1>
          <p className="mt-4 opacity-50">Anchor helps you track spending, plan budgets, and build better financial habits.</p>
        </div>
      </section>
    </div>
  );
};
