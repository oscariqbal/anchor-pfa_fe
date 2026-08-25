// custom components
import HeaderPublic from "@/app/(public)/header";
import FooterPublic from "@/app/(public)/footer";

// others
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PublicLayout({ children } : { children: React.ReactNode }) {
  const cookieStore = await cookies();

  const response = await fetch("http://localhost:5555/api/auth/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (response.ok) {
    redirect("/dashboard")
  }

  return (
    <>
      <HeaderPublic />
      {children}
      <FooterPublic />
    </>
  );
}