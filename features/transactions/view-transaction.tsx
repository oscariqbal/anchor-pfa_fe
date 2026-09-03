// ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// APIs
import getTransaction from "@/features/transactions/get-transaction";

export default async function ViewTransaction({id}: {id: number}) {
  //await new Promise((resolve) => setTimeout(resolve, 5000))
  const result = await getTransaction(id)
      
  //throw new Error()
  if (!result.success) {
    throw new Error(result.message)
  }

  return (
    <>
      {result.data && (
        <Card className="rounded-md bg-transparent">
          <CardHeader>
            <CardTitle className="text-sm md:text-base">Transaction Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="flex flex-col gap-2">
              <div className="grid grid-cols-2 md:grid-cols-4">
                <dt className="text-xs md:text-sm">Type</dt>
                <dd className="text-xs md:text-sm">{result.data.type}</dd>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4">
                <dt className="text-xs md:text-sm">Amount</dt>
                <dd className="text-xs md:text-sm">Rp. {result.data.amount}</dd>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4">
                <dt className="text-xs md:text-sm">Note</dt>
                <dd className="text-xs md:text-sm">{result.data.note}</dd>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4">
                <dt className="text-xs md:text-sm">Time</dt>
                <dd className="text-xs md:text-sm">{result.data.time}</dd>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4">
                <dt className="text-xs md:text-sm">Source Wallet</dt>
                <dd className="text-xs md:text-sm">{result.data.sourceWallet ? result.data.sourceWallet.name : "-"}</dd>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4">
                <dt>Destination Wallet</dt>
                <dd>{result.data.destinationWallet ? result.data.destinationWallet.name : "-"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </>
  )
}