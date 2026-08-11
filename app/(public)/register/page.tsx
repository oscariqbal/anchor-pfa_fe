import RegisterForm from "@/features/auth/registerform";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};
export default function Register() {
  
  return (
    <div className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] flex flex-col mx-auto">
      <section className="h-[90vh] w-full p-2 flex items-center justify-center">
        <RegisterForm />
      </section>
    </div>
  );
};
