// common components
import { SkeletonCard } from "@/components/common/skeleton-component";
import ErrorComponent from "@/components/common/error-component";

// custom components
import ViewTransaction  from "@/features/transactions/view-transaction";
import ActionDropdown from "@/features/transactions/action-dropdown";

// schema and types
import { Params } from "@/features/transactions/schema";

// others
import { Suspense } from "react";
import ErrorBoundary from "@/helpers/error-boundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Details",
};

export default async function Transaction({params}: Params) {
  const { id } = await params;
  
  return (
    <section className="flex flex-col gap-4">
      <div className="flex">
        <ActionDropdown id={id} className="ml-auto"/>
      </div>
      <div className="w-full">
        <ErrorBoundary fallback={<ErrorComponent message={"Unable to load transaction details"}/>}>
          <Suspense fallback={<SkeletonCard className="bg-transparent"/>}>
            <ViewTransaction id={id} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  )
}