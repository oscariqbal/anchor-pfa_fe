'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import destroyTransaction from "./destroy-transaction"
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: number
}

export default function DestroyTransactionDialog({open, onOpenChange, id }: Props) {
  const [error, setError] = useState<{
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);

  const route = useRouter()

  async function handleSubmit() {
    const result = await destroyTransaction(id)

    if (result.success) {
      route.replace(`/transactions`)
    } else {
      setError(result)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleSubmit} className="cursor-pointer">Destroy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}