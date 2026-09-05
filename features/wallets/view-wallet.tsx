// ui components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

// APIs
import getWallet from "@/features/wallets/get-wallet";

export default async function ViewWallet({id}: {id: number}) {
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  const result = await getWallet(id)
      
  // throw new Error()
  if (!result.success) {
    throw new Error(result.message)
  }

  return (
    <>
      {result.data && (
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="flex gap-4 items-center">
              {result.data.name}
              <Badge variant={"outline"}>
                {result.data.type}
              </Badge>
            </CardTitle>
            <CardDescription>
              {result.data.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg md:text-xl flex justify-between">
            <p>Rp.</p>
            <p className="font-bold">{result.data.balance}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}