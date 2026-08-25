"use client";

// ui components
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// custom components
// import DestroyWalletDialog from "./destroy-wallet-dialog";

// api
import viewTransaction from "./view-transaction";

// icons
import { EllipsisVertical, SquarePen, Trash } from 'lucide-react';

// others
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ViewTransaction({id}: {id: number}) {
  const [data, setData] = useState<{ 
    success: boolean;
    message: string;
    data?: {
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
  } | null>(null);
  const [error, setError] = useState<{ 
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    async function result () {
      const result = await viewTransaction(id)
      
      if (result.success) {
        setData(result)
      } else {
        setError(result)
      }
    }

    result()
  }, [])

  return (
    <>
      {data?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Detail</CardTitle>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="cursor-pointer">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href={`/wallets/${id}/edit`}>
                        <SquarePen />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setDeleteOpen(true)} variant="destructive" className="cursor-pointer">
                      <Trash />
                      Destroy
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <DestroyWalletDialog open={deleteOpen} onOpenChange={setDeleteOpen} id={id} /> */}
            </CardAction>
          </CardHeader>
          <CardContent>
            {data?.data ? (
              <dl className="flex flex-col gap-2">
                <div className="grid grid-cols-2">
                  <dt>Type</dt>
                  <dd>{data.data.type}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt>Amount</dt>
                  <dd>Rp. {data.data.amount}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt>Note</dt>
                  <dd>{data.data.note}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt>Time</dt>
                  <dd>{data.data.time}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt>Source Wallet</dt>
                  <dd>{data.data.sourceWallet ? data.data.sourceWallet.name : "-"}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt>Destination Wallet</dt>
                  <dd>{data.data.destinationWallet ? data.data.destinationWallet.name : "-"}</dd>
                </div>
              </dl>
            ) : (
              <p>no data found</p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}