'use client'

// ui components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// APIs
import logout from "@/features/auth/logout";

// icons
import { UserIcon, LogOutIcon } from "lucide-react"

// others
import { usePathname } from "next/navigation"
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HeaderProtected(){
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleLogout () {
    const result = await logout()

    if (result.success) {
      router.replace("/");
    } else {
      console.error(error) // nanti pake toast
      setError(result.message)
    }
  }

  return (
    <header className="w-full flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/")
            return (
              <div key={segment} className="flex items-center gap-2">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">{segment}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/account">
                <UserIcon />
                View account
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleLogout}>
              <LogOutIcon />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}