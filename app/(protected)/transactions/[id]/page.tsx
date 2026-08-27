// custom components
import ViewTransaction  from "@/features/transactions/view-transaction-card";

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
    <div className="w-full flex flex-col gap-4">
      <section className="w-full">
        <ViewTransaction id={id} />
      </section>
    </div>
  );
};
