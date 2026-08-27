// ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// APIs
import viewTransaction from "./view-transaction";

export default async function ViewTransaction({id}: {id: number}) {
  const result = await viewTransaction(id)
      
  if (!result.success) {
    return (
      <p>failed to fetch</p>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-2">
          <div className="grid grid-cols-2">
            <dt>Type</dt>
            <dd>{result.data.type}</dd>
          </div>
          <div className="grid grid-cols-2">
            <dt>Amount</dt>
            <dd>Rp. {result.data.amount}</dd>
          </div>
          <div className="grid grid-cols-2">
            <dt>Note</dt>
            <dd>{result.data.note}</dd>
          </div>
          <div className="grid grid-cols-2">
            <dt>Time</dt>
            <dd>{result.data.time}</dd>
          </div>
          <div className="grid grid-cols-2">
            <dt>Source Wallet</dt>
            <dd>{result.data.sourceWallet ? result.data.sourceWallet.name : "-"}</dd>
          </div>
          <div className="grid grid-cols-2">
            <dt>Destination Wallet</dt>
            <dd>{result.data.destinationWallet ? result.data.destinationWallet.name : "-"}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}