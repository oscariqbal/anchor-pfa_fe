// ui components
import { SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator";

// layout components
import AppSidebar from "@/app/(protected)/appsidebar";

// custom components
import HeaderProtected from "@/app/(protected)/header";

// others
import { UserProvider } from "@/contexts/UserContext"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

//  try {
    const response = await fetch( "http://localhost:5555/api/auth/me", {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    })

    const body = await response.json();
    
    if (!response.ok) {
      redirect("/login");
    }

    return (
      <UserProvider user={body.data}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <HeaderProtected />
            <Separator />
            <div className="p-4">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </UserProvider>
    )
//  } catch (error) {
//    return 
//  }
}