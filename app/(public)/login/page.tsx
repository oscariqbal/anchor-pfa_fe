import AnchorIcon from "@/public/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "@/components/client/loginform";

export default function Login() {
  
  return (
    <div className="h-[100vh] w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] flex flex-col mx-auto gap-2">
      <header className="h-1/10 w-full flex justify-between items-center">
        <nav className="h-1/2 w-full font-heading">
          <ul className="h-full w-full flex justify-between items-center gap-2">
            <li>
              <Button variant={"ghost"} size={"sm"} className="hover:bg-transparent dark:hover:bg-transparent hover:text-primary" asChild>
                <Link href='/'>
                  <AnchorIcon className="h-6 text-primary" />
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <section className="h-8/10 w-full flex items-center justify-center">
        <LoginForm />
      </section>
    </div>
  );
};
