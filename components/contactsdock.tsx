import Link from "next/link";
import { EmailIcon } from "@/public/icon/email";
import { InstagramIcon } from "@/public/icon/instagram";
import { WhatsAppIcon } from "@/public/icon/whatsApp";

type Props = {
  className? : string
}

type ContactTypes = {
  name: string
  link: string
  comp: React.ComponentType<any>
};

export const Contacts: ContactTypes[] = [
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

function ContactDock({className}: Props) {
  return (
    <ul className={`flex gap-4 md:gap-6 py-2 px-2 rounded-xl border-2 border-border bg-background/20 ${className}`} >
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
    
  )
}

export {ContactDock}