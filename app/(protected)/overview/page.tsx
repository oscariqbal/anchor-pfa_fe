// ui components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";

// api
import viewAllWallets from "@/features/wallets/view-all-wallets";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
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
    <div>
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
      {/* CASH FLOW DI RENTANG WAKTU TERTENTU */}
      {/* PERBANDINGAN CASH FLOW DI RENTANG WAKTU TERTENTU DENGAN RENTANG WAKTU SEBELUMNYA*/}
      {/* INCOME DI RENTANG WAKTU TERTENTU */}
      {/* PERBANDINGAN INCOME DI RENTANG WAKTU TERTENTU DENGAN RENTANG WAKTU SEBELUMNYA */}
      {/* EXPENSE DI RENTANG WAKTU TERTENTU */}
      {/* PERBANDINGAN EXPENSE DI RENTANG WAKTU TERTENTU DENGAN RENTANG WAKTU SEBELUMNYA */}
      {/* LATEST TRANSACTION */}
      {/* BUTTON ADD TRANSACTION */}
    </div>
  );
};
