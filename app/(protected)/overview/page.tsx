// ui components
import { Card, CardContent, CardHeader, CardDescription, } from "@/components/ui/card"

// custom components
import PeriodicSummary from "@/features/overview/periodic-summary-section"
import CreateTransactionDialog from "@/features/transactions/create-transaction-dialog";

// api
import viewAllWallets from "@/features/wallets/view-all-wallets";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function Overview() {
  const result = await viewAllWallets()

  if (!result.success) {
    return (
      <p>error</p> // error ui
    )
  }
  
  const total = result.data.reduce((sum, item) => sum + Number(item.balance), 0)

  return (
    <div className="flex flex-col gap-4">
      <section>
        <Card className="rounded-md" size="sm">
          <CardHeader>
            <CardDescription className="text-xs md:text-base">
              Available Balance
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg flex justify-between">
            <p>Rp.</p>
            <p className="font-bold">{total}</p>
          </CardContent>
        </Card>
      </section>
      <PeriodicSummary />
      <CreateTransactionDialog walletData={result.data}/>
    </div>
  );
};
