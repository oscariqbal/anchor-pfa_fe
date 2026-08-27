'use client'

// ui components
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// custom components
// import DestroyWalletDialog from "./destroy-transaction-dialog";

// icons
import { EllipsisVertical, SquarePen, Trash } from 'lucide-react';

// others
import Link from "next/link";
import { useState } from "react"

export default function ActionDropdown ({id, className}: {id: number, className?: string}) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/transactions/${id}/edit`}>
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
    </div>
  )
}