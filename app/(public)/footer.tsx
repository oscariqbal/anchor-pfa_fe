// ui components
import { Separator } from "@/components/ui/separator";

// layout components
import { ContactDock } from "@/components/layout/appcontacts";

export default function FooterPublic(){
  return (
    <footer>
      <Separator />
      <div className='flex flex-col md:flex-row items-center md:justify-between py-2 px-2 bg-border/10'>
        <div className="py-2 px-4 bg-background/20">
          <p className="font-extralight tracking-wide text-xs sm:text-xs md:text-sm opacity-60">© 2026 Anchor. Builded by Oscar Iqbal Mustofa</p>
        </div>
        <ContactDock className="border-none"/>
      </div>
    </footer>
  )
}