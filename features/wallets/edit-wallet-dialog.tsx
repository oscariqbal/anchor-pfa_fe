'use client'

// ui components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

type EditDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function EditWalletDialog({open, onOpenChange, onConfirm}: EditDialog) {

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
          <Button onClick={onConfirm} className="cursor-pointer">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}