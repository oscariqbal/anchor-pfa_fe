import RegisterForm from "@/components/client/registerform";
import HeaderPublic from "@/app/(public)/header";
import FooterPublic from "@/app/(public)/footer";

export default function Register() {
  
  return (
    <div className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] flex flex-col mx-auto">
      <HeaderPublic />
      <section className="h-[90vh] w-full p-2 flex items-center justify-center">
        <RegisterForm />
      </section>
      <FooterPublic />
    </div>
  );
};
