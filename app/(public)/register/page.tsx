// custom components
import RegisterForm from "@/features/auth/register-form";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Register() {
  return (
    <div className="flex flex-col mx-auto">
      <section className="h-[80vh] flex items-center justify-center">
        <RegisterForm />
      </section>
    </div>
  );
};
