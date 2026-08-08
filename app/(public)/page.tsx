import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderPublic from "@/app/(public)/header";
import FooterPublic from "@/app/(public)/footer";

export default function Home() {
  return (
    <div className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] flex flex-col mx-auto">
      <HeaderPublic />
      <section className="h-[90vh] w-full p-2 flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-6 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-3xl md:text-5xl font-heading">Your financial anchor.</h1>
            <p className="text-sm md:text-base opacity-50">Anchor helps you track spending, plan budgets, and build better financial habits.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="cursor-pointer" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="outline" className="cursor-pointer" asChild>
              <Link href="/register">Create account</Link>
            </Button>
          </div>
        </div>
      </section>
      <FooterPublic />
    </div>
  );
};
