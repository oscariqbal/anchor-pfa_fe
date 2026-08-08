import LoginForm from "@/components/client/loginform";
import HeaderPublic from "@/app/(public)/header";
import FooterPublic from "@/app/(public)/footer";

export default function Login() {
  return (
    <div className="w-[90vw] sm:w-[88vw] md:w-[86vw] lg:w-[84vw] flex flex-col mx-auto">
      <HeaderPublic />
      <section className="h-[90vh] w-full p-2 flex items-center justify-center">
        <LoginForm />
      </section>
      <FooterPublic />
    </div>
  );
};