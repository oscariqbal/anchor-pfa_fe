"use client";

// ui components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";

// custom components
import DestroyWalletDialog from "./destroy-wallet-dialog";

// api
import viewWallet from "./view-wallet";

// schema and types


// others
import { useEffect, useState } from "react";
import Link from "next/link";
import { EllipsisVertical, SquarePen, Trash } from 'lucide-react';

export default function ViewWallet({id}: {id: number}) {
  const [data, setData] = useState<{ 
    success: boolean;
    message: string;
    data?: Record<string, string>
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
      const result = await viewWallet(id)
      
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
            <CardTitle className="flex gap-4 items-center">
              {data.data.name}
              <Badge variant={"outline"}>
                {data.data.type}
              </Badge>
            </CardTitle>
            <CardDescription>
              {data.data.description}
            </CardDescription>
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
              <DestroyWalletDialog open={deleteOpen} onOpenChange={setDeleteOpen} id={id} />
            </CardAction>
          </CardHeader>
          <CardContent>
            ~ balance ~
          </CardContent>
        </Card>
      )}
    </>
  );
}