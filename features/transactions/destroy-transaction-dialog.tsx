'use client'

// ui components
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogMedia } from "@/components/ui/alert-dialog"

// icons
import { Trash } from 'lucide-react';

// APIs
import deleteTransaction from "@/features/transactions/delete-transaction"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DestroyTransactionDialog({id}: { id: number }) {
  const route = useRouter()
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit() {
    setLoading(true)
    const result = await deleteTransaction(id)

    if (result.success) {
      setLoading(false)
      route.replace(`/transactions`)
    } else {
      toast.error(result.errors.general?.[0] ?? result.message, {description: "Please try again", position: "top-center"})
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer gap-2">
          <Trash data-icon="inline-start" className="size-4"/>
          Destroy
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash />
          </AlertDialogMedia>
          <AlertDialogTitle>Destroy transaction?</AlertDialogTitle>
          <AlertDialogDescription>Are you absolutely sure? This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary" className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleSubmit} className="cursor-pointer" disabled={loading}>
            {loading ? <Spinner /> : "Destroy"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}