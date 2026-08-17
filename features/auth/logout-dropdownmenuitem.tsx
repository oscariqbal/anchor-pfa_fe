"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import logout from "./logout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"

export default function Logout() {
  const router = useRouter();
  const [error, setError] = useState<{ 
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);

  async function handleLogout () {
    const result = await logout()

    if (result.success) {
      router.replace("/");
    } else {
      console.error(error) // nanti pake toast
      setError(result)
    }
  };

  return (
    <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleLogout}>
      <LogOutIcon />
      Sign out
    </DropdownMenuItem>
  );
}