'use client'

// ui components
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogMedia } from "@/components/ui/alert-dialog"

// icons
import { LogOutIcon } from "lucide-react"

// APIs
import logout from "@/features/auth/logout"

// others
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogOutDialog({open, onOpenChange} : {open: boolean, onOpenChange: (open: boolean) => void}) {
  const route = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  
  async function handleLogout() {
    setLoading(true)
    const result = await logout()

    if (result.success) {
      setLoading(false)
      route.replace(`/login`)
    } else {
      toast.error(result.errors.general?.[0] ?? result.message, {description: "Please try again", position: "top-center"})
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <LogOutIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to signing out?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary" className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleLogout} className="cursor-pointer" disabled={loading}>
            {loading ? <Spinner /> : "Sign out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}