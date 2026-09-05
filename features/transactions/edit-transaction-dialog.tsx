'use client'

// ui components
import { Spinner } from "@/components/ui/spinner"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogMedia } from "@/components/ui/alert-dialog"

// icons
import { SquarePen } from 'lucide-react';

type EditDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isSubmitting: boolean
}

export default function EditTransactionDialog({open, onOpenChange, onConfirm, isSubmitting}: EditDialog) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-yellow/10 text-yellow dark:bg-yellow/20 dark:text-yellow"><SquarePen /></AlertDialogMedia>
          <AlertDialogTitle>Edit transaction?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary" className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Edit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}