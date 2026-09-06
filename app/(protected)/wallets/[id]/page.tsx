// ui components
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

// common components
import ErrorComponent from "@/components/common/error-component";
import { SkeletonCard } from "@/components/common/skeleton-component";

// features components
import ViewWallet  from "@/features/wallets/view-wallet";
import DestroyWalletDialog from "@/features/wallets/destroy-wallet-dialog";

// types
import { Params } from "@/features/wallets/types";

// icons
import { SquarePen } from 'lucide-react';

// others
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import ErrorBoundary from "@/helpers/error-boundary";

export const metadata: Metadata = {
  title: "Wallet Details",
};

export default async function Wallet({params}: Params) {
  const { id } = await params;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex">
        <ButtonGroup className="ml-auto">
          <ButtonGroup>
            <Button variant="secondary" className="cursor-pointer gap-2" asChild>
              <Link href={`/wallets/${id}/edit`}>
                <SquarePen data-icon="inline-start" className="size-4"/>
                Edit
              </Link>
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <DestroyWalletDialog id={id} />
          </ButtonGroup>
        </ButtonGroup>
      </div>
      <div className="w-full">
        <ErrorBoundary fallback={<ErrorComponent message={"Unable to load wallet details"}/>}>
          <Suspense fallback={<SkeletonCard className="bg-transparent"/>}>
            <ViewWallet id={id} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
};
