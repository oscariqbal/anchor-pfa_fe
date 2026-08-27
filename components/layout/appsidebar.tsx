'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import AnchorIcon from "@/public/icon/anchor";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, House, Wallet, ArrowLeftRight } from "lucide-react";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row">
        <SidebarTrigger className="group-data-[state=collapsed]:flex [&_svg]:size-4 cursor-pointer"/>
        <div className="my-auto group-data-[state=collapsed]:hidden">
          <AnchorIcon className="h-4" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                General
                <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link href="/dashboard" className="flex w-full items-center gap-4">
                      <House/>
                        <p>Dashboard</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link href="/wallets" className="flex w-full items-center gap-4">
                      <Wallet />
                       <p>Wallets</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link href="/transactions" className="flex w-full items-center gap-4">
                      <ArrowLeftRight />
                       <p>Transactions</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="flex items-center justify-center text-xs opacity-50">
        © 2026 Anchor v1.0
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}