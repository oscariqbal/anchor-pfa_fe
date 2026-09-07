'use client'

// ui components
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// APIs
import logout from "@/features/auth/logout";

// icons
import AnchorIcon from "@/public/icon/anchor";
import { UserIcon, LogOutIcon } from "lucide-react"
import { House, Wallet, ArrowLeftRight } from "lucide-react";

// others
import Link from "next/link";
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/UserContext"
import { useRouter, usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Overview",
    href: "/overview",
    icon: House,
  },
  {
    title: "Wallets",
    href: "/wallets",
    icon: Wallet,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
]

export default function AppSidebar() {
  const user = useUser()
  const router = useRouter();
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  async function handleLogout() {
    const result = await logout()

    if (result.success) {
      router.replace("/");
    } else {
      toast.error("Failed to sign out")
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-[3rem] flex flex-row gap-3 items-center group-data-[state=collapsed]:mx-auto">
        <SidebarTrigger className="h-10 cursor-pointer group-data-[state=collapsed]:flex [&_svg]:size-6"/>
        <div className="my-auto group-data-[state=collapsed]:hidden">
          <AnchorIcon className="h-4" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup className="mt-2 p-0">
          <SidebarGroupContent className="flex flex-col gap-2 group-data-[state=collapsed]:flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:mt-2">
            {menuItems.map(({title, href, icon: Icon}) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <SidebarMenuItem key={title}>
                  <Link href={href} onClick={() => setOpenMobile(false)}>
                    <SidebarMenuButton className={cn("p-2 gap-4 [&_svg]:size-8 group-data-[state=collapsed]:mx-auto", isActive && "bg-identity/80 hover:bg-identity text-background hover:text-background")}>
                      <Icon className="p-1"/>
                      <span>{title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="flex flex-row">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full cursor-pointer group-data-[state=collapsed]:mx-auto" >
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/10.x/thumbs/svg?seed=user123" alt="default" />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account" onClick={() => setOpenMobile(false)}>
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
          <div className="group-data-[state=collapsed]:hidden">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs opacity-50">{user.email}</p>
          </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}