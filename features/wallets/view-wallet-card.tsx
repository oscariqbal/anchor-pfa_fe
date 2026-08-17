"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, SquarePen, Archive, Trash } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import viewWallet from "./view-wallet";

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
  })

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
                      <Link href="/account">
                        <SquarePen />
                        Edit wallet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/account">
                        <Archive />
                        Archive wallet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" className="cursor-pointer" asChild>
                      <Link href="/account">
                        <Trash />
                        Remove wallet
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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