// ui components
import { Card, CardContent, CardHeader, CardDescription, } from "@/components/ui/card"

// custom components
import PeriodicSummary from "@/features/overview/periodic-summary"
import CreateTransactionDialog from "@/features/transactions/create-transaction-dialog";

// api
import viewAllWallets from "@/features/wallets/get-wallets";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function Overview() {
  const result = await viewAllWallets()

  if (!result.success || !result.data) {
    throw new Error(result.message)
  }
  
  const total = result.data.reduce((sum, item) => sum + Number(item.balance), 0)

  return (
    <section className="flex flex-col gap-4">
      <div>
        <Card className="rounded-md bg-transparent" size="sm">
          <CardHeader>
            <CardDescription className="text-sm md:text-base">
              Available Balance
            </CardDescription>
          </CardHeader>
          <CardContent className="text-2xl flex justify-between">
            <p>Rp.</p>
            <p className="font-bold">{total}</p>
          </CardContent>
        </Card>
      </div>
      <PeriodicSummary />
      <CreateTransactionDialog walletData={result.data}/>
    </section>
  );
};
