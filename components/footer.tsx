import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className='bg-border/10'>
      <Separator />
      <div className='h-full w-full flex container mx-auto py-4 lg:py-5'>
        <div className="my-auto mx-auto font-heading flex flex-col items-center gap-1 lg:gap-2">
          <p className="font-semibold tracking-wider text-sm sm:text-base md:text-lg">Oscar Iqbal Mustofa</p>
          <p className="font-extralight tracking-wide text-xs sm:text-sm md:text-base opacity-80">Central Java, Indonesia • Open to Work</p>
          <p className="font-extralight tracking-wide text-[10px] sm:text-xs md:text-sm pt-3 opacity-60">©2026 Oscar Iqbal Mustofa — All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}