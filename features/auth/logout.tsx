"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5555/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleLogout}>
      <LogOutIcon />
      Sign out
    </DropdownMenuItem>
  );
}