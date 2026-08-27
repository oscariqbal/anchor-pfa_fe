'use client'

// ui components
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// custom components
import DestroyWalletDialog from "./destroy-wallet-dialog";

// icons
import { EllipsisVertical, SquarePen, Trash } from 'lucide-react';

// others
import Link from "next/link";
import { useState, useEffect } from "react"

export default function ActionDropdown ({id}: {id: number}) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
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
    </>
  )
}