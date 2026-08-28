'use client'

// ui components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb"

// others
import { usePathname } from "next/navigation"
import Link from "next/link";

export default function HeaderProtected(){
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="h-[3rem] px-4 w-full flex items-center justify-between">
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