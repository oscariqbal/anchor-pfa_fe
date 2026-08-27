// ui components
import { Button } from "@/components/ui/button";

// icons
import AnchorIcon from "@/public/icon/anchor";

// others
import Link from "next/link";

export default function HeaderPublic(){
  return (
    <header className="flex mx-auto justify-between items-center">
      <nav className="w-full font-heading">
        <ul className="my-4 md:my-6 w-full flex justify-center items-center gap-2">
          <li>
            <Button variant={"ghost"} size={"sm"} className="hover:bg-transparent dark:hover:bg-transparent hover:text-primary" asChild>
              <Link href='/'>
                <AnchorIcon className="h-5 md:h-6 text-primary" />
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}