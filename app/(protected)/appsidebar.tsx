'use client'

// ui components
import {
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
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";

// APIs
import viewAccount from "@/features/auth/view-account";
import logout from "@/features/auth/logout";

// icons
import AnchorIcon from "@/public/icon/anchor";
import { UserIcon, LogOutIcon } from "lucide-react"
import { House, Wallet, ArrowLeftRight } from "lucide-react";

// others
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AppSidebar() {
  const [accountData, setAccountData] = useState<{
    id: number
    name: string
    email: string
  } | null>(null)
  const [accountError, setAccountError] = useState()
  const router = useRouter();

  useEffect(() => {
    async function getAccountData() {
      const result = await viewAccount()

      if (result.success) {
        setAccountData(result.data)
      } else {
        setAccountError(result.errors)
      }
    }

    getAccountData()
  }, [])

  async function handleLogout() {
    const result = await logout()

    if (result.success) {
      router.replace("/");
    } else {
      return (
        <p>failed to sign out</p>
      )
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
          <SidebarGroupContent className="flex flex-col gap-2 group-data-[state=collapsed]flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:gap-6">
            <SidebarMenuItem>
              <Link href="/overview">
                <SidebarMenuButton className="p-3 gap-4 [&_svg]:size-6 group-data-[state=collapsed]:mt-2 group-data-[state=collapsed]:mx-auto">
                  <House />
                  <span>Overview</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/wallets">
                <SidebarMenuButton className="p-3 gap-4 [&_svg]:size-6 group-data-[state=collapsed]:mx-auto">
                  <Wallet/>
                  <span>Wallets</span>
                </SidebarMenuButton >
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/transactions">
                <SidebarMenuButton className="p-3 gap-4 [&_svg]:size-6 group-data-[state=collapsed]:mx-auto">
                  <ArrowLeftRight/>
                  <span>Transactions</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="flex flex-row">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full cursor-pointer group-data-[state=collapsed]:mx-auto">
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
        {accountData ? (
          <div className="group-data-[state=collapsed]:hidden">
            <p className="text-sm">{accountData.name}</p>
            <p className="text-xs opacity-50">{accountData.email}</p>
          </div>
        ) : accountError && (
          <div className="group-data-[state=collapsed]:hidden">
            <p className="text-xs">Failed to fetch account data</p>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}