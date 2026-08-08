import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "next-themes"

const inter = Inter({subsets:['latin'],variable:'--font-inter'});
const manrope = Manrope({subsets:['latin'],variable:'--font-manrope'});

export const metadata: Metadata = {
  title: {
    default: "Personal Finance Assistant",
    template: "%s | Anchor - Personal Finance Assistant",
  },
  description: "",
  keywords: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", inter.variable, manrope.variable, "scroll-smooth", "scroll-pt-[12vh]", "sm:scroll-pt-[13vh]", "md:scroll-pt-[14vh]", "lg:scroll-pt-[15vh]")} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
