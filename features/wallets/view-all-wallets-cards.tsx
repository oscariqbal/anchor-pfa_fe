// ui components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";

// api
import viewAllWallets from "./view-all-wallets";

// schemas and types
import { BaseType } from "./schema";

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
      {result.data && (
        result.data.map(({ id, type, name, description }: BaseType) => (
          <Link href={`/wallets/${id}`} key={id}>
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle className="line-clamp-1 text-xs md:text-base">{name}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs md:text-base">{description}</CardDescription>
                <CardAction>
                  <Badge variant="secondary">{type}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                ~ balance ~
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}