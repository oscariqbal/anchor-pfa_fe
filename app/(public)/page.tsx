// ui components
import { Button } from "@/components/ui/button";

// others
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto">
      <section className="h-[80vh] flex items-center justify-center">
        <div className="max-w-[80vw] text-center flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-heading">Build better financial habits with <span className="text-identity font-bold">Anchor</span></h1>
            <p className="text-sm md:text-base opacity-50">Anchor helps you track spending, plan budgets, and build better financial habits.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="cursor-pointer" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button variant="outline" className="cursor-pointer bg-identity/80 hover:bg-identity" asChild>
              <Link href="/register">Create account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
