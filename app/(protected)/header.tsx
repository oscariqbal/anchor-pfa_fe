import Link from "next/link";
import AnchorIcon from "@/public/icon";
import { Button } from "@/components/ui/button";
import DropdownAccount from "@/components/client/dropdownaccount";

export default function HeaderProtected(){
  return (
    <header className="w-full flex justify-between items-center">
      <nav className="w-full font-heading">
        <ul className="my-2 md:my-3 py-2 md:py-3 px-4 w-full flex justify-between items-center gap-2 bg-foreground/5 backdrop-blur-xs rounded-lg">
          <li>
            menu
          </li>
          <li>
            <Button variant={"ghost"} size={"sm"} className="hover:bg-transparent dark:hover:bg-transparent hover:text-primary" asChild>
              <Link href='/dashboard'>
                <AnchorIcon className="h-5 md:h-6 text-primary" />
              </Link>
            </Button>
          </li>
          <li>
            <DropdownAccount />
          </li>
        </ul>
      </nav>
    </header>
  )
}