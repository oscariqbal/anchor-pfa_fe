import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/appsidebar";
import HeaderProtected from "@/app/(protected)/header";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const response = await fetch(
    "http://localhost:5555/api/auth/me",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4 flex flex-col gap-4">
        <HeaderProtected />
        {children}
      </main>
    </SidebarProvider>
  );
}