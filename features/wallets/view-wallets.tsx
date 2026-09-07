// ui components
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"

// api
import getWallets from "@/features/wallets/get-wallets";

// others
import Link from "next/link";

export default async function ViewWallets() {
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  const result = await getWallets()
    
  // throw new Error()
  if (!result.success) {
    throw new Error(result.message)
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {result.data && result.data.map(({ id, type, name, description, balance }) => (
          <Link href={`/wallets/${id}`} key={id}>
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle className="line-clamp-1 text-sm md:text-base">{name}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs md:text-sm min-h-[2rem] md:min-h-[3rem] leading-4 md:leading-6">{description ?? ""}</CardDescription>
                <CardAction>
                  <Badge variant="secondary">{type}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="text-lg flex justify-between">
                <p>Rp.</p>
                <p className="font-bold">{balance}</p>
              </CardContent>
            </Card>
          </Link>
        ))
      }
    </div>
  );
}