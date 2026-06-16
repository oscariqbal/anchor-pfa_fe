import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-[12vh] sm:h-[13vh] md:h-[14vh] lg:h-[15vh] w-full sticky top-0 z-50 flex items-center">
      <nav className='h-1/2 w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] mx-auto font-heading bg-background/5 backdrop-blur-xs rounded-xl px-2 md:px-4 border border-foreground/15'>
        <ul className='h-full w-full flex items-center text-muted-foreground gap-2'>
          <li>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href='/'>
                ICON
              </Link>
            </Button>
          </li>
          <li>
            <Button variant={"ghost"} size={"sm"} asChild className="cursor-pointer font-heading text-xs sm:text-sm md:text-base ">
              <Link className="hover:text-foreground" href='/#about'>About</Link>
            </Button>
          </li>
          <li>
            <Button variant={"ghost"} size={"sm"} asChild className="cursor-pointer font-heading text-xs sm:text-sm md:text-base ">
              <Link className="hover:text-foreground" href='/#projects'>Projects</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}