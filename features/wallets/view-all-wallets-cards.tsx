// ui components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

// api
import viewAllWallets from "./view-all-wallets";

// schemas and types
import { ViewAllType } from "./schema";

// others
import Link from "next/link";

export default async function ViewAllWallets() {
  const result = await viewAllWallets()
    
  if (!result.success) {
    return (
      <p>error</p> // error ui
    )
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {result.data.map(({ id, type, name, description, balance }: ViewAllType) => (
          <Link href={`/wallets/${id}`} key={id}>
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle className="line-clamp-1 text-xs md:text-base">{name}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs md:text-base min-h-[2rem] md:min-h-[3rem] leading-4 md:leading-6">{description ?? ""}</CardDescription>
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