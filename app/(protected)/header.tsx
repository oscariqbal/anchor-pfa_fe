'use client'

// ui components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"

// others
import { usePathname } from "next/navigation"
import Link from "next/link";

export default function HeaderProtected(){
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="h-[3rem] px-4 w-full flex items-center gap-2">
      <SidebarTrigger className="block md:hidden h-10 cursor-pointer group-data-[state=collapsed]:flex [&_svg]:size-6"/>
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
    </header>
  )
}