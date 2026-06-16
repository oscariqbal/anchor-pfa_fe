import Image from "next/image";
import LoginForm from "@/components/loginform";

export default function Login() {
  
  return (
    <div className="h-[72vh] sm:h-[80vh] md:h-[82vh] lg:h-[81vh] w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] mx-auto flex flex-col items-center justify-center gap-6">
      <p>Sign In Page</p>
      <LoginForm />
    </div>
  );
};
