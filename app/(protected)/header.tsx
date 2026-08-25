// ui components
import { SidebarTrigger } from "@/components/ui/sidebar"

// layout components
import DropdownAccount from "@/components/layout/dropdownaccount";

export default function HeaderProtected(){
  return (
    <header className="w-full">
      <nav className="w-full font-heading">
        <ul className="py-2 md:py-3 px-4 w-full flex justify-between items-center gap-2 bg-foreground/5 backdrop-blur-xs rounded-lg">
          <li>
            <SidebarTrigger />
          </li>
          <li>
            <DropdownAccount />
          </li>
        </ul>
      </nav>
    </header>
  )
}