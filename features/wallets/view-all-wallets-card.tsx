"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import viewAllWallets from "./view-all-wallets";

export default function ViewAllWallets() {
  const [data, setData] = useState<{ 
    success: boolean;
    message: string;
    data?: Record<string, string>[]
  } | null>(null);
  const [error, setError] = useState<{ 
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);

  useEffect(() => {
    async function result () {
      const result = await viewAllWallets()
      
      if (result.success) {
        setData(result)
      } else {
        setError(result)
      }
    }

    result()
  })

  return (
    <>
      {data && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.data?.map(({ id, type, name, description}) => (
            <Link href={`/wallets/${id}`} key={id}>
              <Card className="rounded-md">
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                  <CardAction>
                    <Badge variant="secondary">{type}</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  ~balance~
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}