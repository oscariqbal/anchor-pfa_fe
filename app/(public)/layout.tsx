// custom components
import HeaderPublic from "@/app/(public)/header";
import FooterPublic from "@/app/(public)/footer";

// others
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PublicLayout({ children } : { children: React.ReactNode }) {
  const cookieStore = await cookies()
  try {
    const response = await fetch("http://localhost:5555/api/auth/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    })

    if (response.ok) {
      redirect("/overview")
    } else {
      return (
        <>
          <HeaderPublic />
          {children}
          <FooterPublic />
        </>
      )
    }
  } catch (error) {
    return (
      <>
        <HeaderPublic />
        {children}
        <FooterPublic />
      </>
    )
  }
}