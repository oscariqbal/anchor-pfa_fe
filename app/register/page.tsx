import Image from "next/image";
import RegisterForm from "@/components/registerform";

export default function Register() {
  
  return (
    <div className="h-[72vh] sm:h-[80vh] md:h-[82vh] lg:h-[81vh] w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] mx-auto flex flex-col gap-6 items-center justify-center">
      Sign Up Page
      <RegisterForm />
    </div>
  );
};
