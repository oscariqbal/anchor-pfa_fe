import Link from "next/link";
import AnchorIcon from "@/public/icon";
import { Button } from "@/components/ui/button";

export default function HeaderPublic(){
  return (
    <header className="w-full flex justify-between items-center">
      <nav className="w-full font-heading">
        <ul className="my-4 md:my-6 w-full flex justify-between items-center gap-2">
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