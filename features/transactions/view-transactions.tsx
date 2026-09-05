// ui components
import { Card, CardContent } from "@/components/ui/card"

// api
import getTransactions from "./get-transactions";

// others
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function ViewTransactions() {
  // await new Promise((resolve) => setTimeout(resolve, 5000))

  const result = await getTransactions()

  // throw new Error()
  if (!result.success) {
    throw new Error(result.message)
  }

  return (
    <div className="flex flex-col gap-2">
      {result.data && result.data.map(({ id, type, amount, note, datetime, sourceWallet, destinationWallet }) => (
        <div key={id}>
          <Link href={`/transactions/${id}`}>
            <Card size="sm" className="rounded-md">
              <CardContent className="grid grid-flow-col grid-rows-2">
                { sourceWallet && destinationWallet ? (
                  <p>{sourceWallet.name} to {destinationWallet.name}</p>
                ) : sourceWallet ? (
                  <p>{sourceWallet.name}</p>
                ) : destinationWallet ? (
                  <p>{destinationWallet.name}</p>
                ) : (
                  <p></p>
                )}
                <p className="text-muted-foreground">{note}</p>
                <p className={cn(
                  "text-right",
                  type === "INCOME" && "text-green-500",
                  type === "EXPENSE" && "text-red-500",
                  type === "TRANSFER" && "text-yellow-500"
                  )}>Rp. {amount}</p>
                <p className="text-right text-muted-foreground">{datetime}</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}