import { ContactDock } from "@/components/contactsdock";

export default function FooterPublic(){
  return (
    <footer className="my-6 w-full">
      <div className='flex flex-col md:flex-row items-center md:justify-between py-2 px-2 bg-foreground/5 backdrop-blur-xs rounded-lg'>
        <div className="py-2 px-4 bg-background/20">
          <p className="font-extralight tracking-wide text-[10px] sm:text-xs md:text-sm opacity-60">© 2026 All rights reserved. Builded by Oscar Iqbal Mustofa</p>
        </div>
        <ContactDock className="border-none"/>
      </div>
    </footer>
  )
}