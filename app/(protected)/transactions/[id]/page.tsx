// custom components
import ViewTransaction  from "@/features/transactions/view-transaction-card";
import ActionDropdown from "@/features/transactions/action-dropdown";

// schema and types
import { Params } from "@/features/transactions/schema";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Details",
};

export default async function Transaction({params}: Params) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4">
      <section className="flex">
        <ActionDropdown id={id} className="ml-auto"/>
      </section>
      <section className="w-full">
        <ViewTransaction id={id} />
      </section>
    </div>
  )
}