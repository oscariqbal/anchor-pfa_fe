"use client";

// ui components
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator";

// api
import viewAllTransactions from "./view-all-transactions";

// others
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ViewAllTransactions() {
  const [data, setData] = useState<{ 
    success: boolean;
    message: string;
    data?: [
      {
        id: number,
        type: string,
        amount: string,
        note: string,
        time: string,
        sourceWallet?: {
          id: number,
          name: string
        },
        destinationWallet?: {
          id: number,
          name: string
        },
      }
    ]
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
      const result = await viewAllTransactions()
      
      if (result.success) {
        setData(result)
      } else {
        setError(result)
      }
    }

    result()
  }, [])

  console.log(data)

  return (
    <div>
      {data?.data && (
        data.data.map(({ id, type, amount, note, time, sourceWallet, destinationWallet }) => (
          <div key={id}>
            <Link href={`/transactions/${id}`}>
              <Item size="sm">
                <ItemContent className="grid grid-flow-col grid-rows-2">
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
                  <p className="text-right text-muted-foreground">{time}</p>
                </ItemContent>
              </Item>
            </Link>
            <Separator />
          </div>
        ))
      )}
    </div>
  );
}