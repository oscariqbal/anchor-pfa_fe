// ui components
import { Separator } from "@/components/ui/separator";

// icons
import { EmailIcon } from "@/public/icon/email";
import { InstagramIcon } from "@/public/icon/instagram";
import { WhatsAppIcon } from "@/public/icon/whatsApp";

// others
import Link from "next/link";

export const Contacts: {
  name: string
  link: string
  comp: React.ComponentType<any>
}[] = [
  {
    name: "email",
    link: "https://mailto:oiqbalmustofa@gmail.com",
    comp: EmailIcon,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/oscariqbalm",
    comp: InstagramIcon,
  },
  {
    name: "whatsApp",
    link: "https://wa.me/6285800957241",
    comp: WhatsAppIcon,
  },
]

export default function FooterPublic(){
  return (
    <footer>
      <Separator />
      <div className='flex flex-col md:flex-row items-center md:justify-between py-2 px-2 bg-linear-to-b from-border/10 to-background'>
        <div className="py-2 px-4 bg-background/20">
          <p className="font-extralight tracking-wide text-xs sm:text-xs md:text-sm opacity-60">© 2026 <span className="text-identity font-bold">Anchor</span>. Builded by Oscar Iqbal Mustofa</p>
        </div>
        <ul className="flex gap-4 md:gap-6 py-2 px-2 rounded-xl" >
          {Contacts.map(({name, link, comp}, i) => {
            const Comp = comp
            return (
              <li key={name}>
                <Link href={link} target="_blank">
                  <Comp className="p-0 size-7 md:size-8 text-foreground/50 hover:text-foreground hover:bg-background/30 rounded-xl" width={10} height={10}/>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}