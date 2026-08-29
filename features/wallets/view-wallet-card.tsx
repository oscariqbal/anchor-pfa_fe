// ui components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

// api
import viewWallet from "./view-wallet";

export default async function ViewWallet({id}: {id: number}) {
  const result = await viewWallet(id)
      
  if (!result.success) {
    return (
      <p>error fetch</p>
    )
  }

  return (
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
  );
}