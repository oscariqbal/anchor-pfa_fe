'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import updateWallet from "./edit-wallet"
import { useRouter } from "next/navigation";
import { useState } from "react";

type WalletType = "CASH" | "BANK" | "E_WALLET";

type UpdateWallets = {
  type: WalletType;
  name: string;
  description: string;
} | undefined;

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: number
  updateData: UpdateWallets
}

export default function EditWalletDialog({open, onOpenChange, id, updateData}: Props) {
  const [error, setError] = useState<{
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);

  const route = useRouter()
  async function handleConfirm() {
    const updateResult = await updateWallet(updateData, id)

    if (updateResult.success) {
      route.replace(`/wallets/${id}`)
    } else {
      setError(updateResult)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will affect transactions related.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button onClick={handleConfirm} className="cursor-pointer">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}