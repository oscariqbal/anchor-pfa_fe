// common components
import ErrorComponent from "@/components/common/error-component";
import { SkeletonCard } from "@/components/common/skeleton-component";

// custom components
import ViewWallet  from "@/features/wallets/view-wallet";
import ActionDropdown from "@/features/wallets/action-dropdown";

// types
import { Params } from "@/features/wallets/types";

// others
import { Suspense } from "react";
import type { Metadata } from "next";
import ErrorBoundary from "@/helpers/error-boundary";

export const metadata: Metadata = {
  title: "Wallet Details",
};

export default async function Wallet({params}: Params) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4">
      <section className="flex">
        <ActionDropdown id={id} className="ml-auto"/>
      </section>
      <section className="w-full">
        <ErrorBoundary fallback={<ErrorComponent message={"Unable to load transaction details"}/>}>
          <Suspense fallback={<SkeletonCard className="bg-transparent"/>}>
            <ViewWallet id={id} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
};
