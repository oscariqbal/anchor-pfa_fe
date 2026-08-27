// custom components
import LoginForm from "@/features/auth/login-form";

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <div className="flex flex-col mx-auto">
      <section className="h-[80vh] flex items-center justify-center">
        <LoginForm />
      </section>
    </div>
  );
};