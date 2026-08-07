import Image from "next/image";
import AccountClient from "@/components/client/accountclient";

export default function Account() {
  
  return (
    <div className="border border-red-500 h-[72vh] sm:h-[80vh] md:h-[82vh] lg:h-[81vh] w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] mx-auto flex flex-col">
      Profile Page
      <AccountClient />
    </div>
  );
};