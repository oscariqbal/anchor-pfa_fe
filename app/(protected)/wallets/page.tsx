// common components
import { SkeletonCard } from "@/components/common/skeleton-component";
import ErrorComponent from "@/components/common/error-component";

// custom components
import CreateWalletDialog from "@/features/wallets/create-wallet-dialog";
import ViewWallets from "@/features/wallets/view-wallets";

// others
import { Suspense } from "react";
import type { Metadata } from "next";
import ErrorBoundary from "@/helpers/error-boundary";

export const metadata: Metadata = {
  title: "Wallets",
};

export default function Wallets() {
  return (
    <section className="w-full flex flex-col gap-4">
      <div className="ml-auto">
        <CreateWalletDialog />
      </div>
      <div>
        <ErrorBoundary fallback={<ErrorComponent message={"Unable to load wallets"} />}>
          <Suspense fallback={<SkeletonCard className="w-1/4 h-32" />}>
            <ViewWallets />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
};
