import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const robotoSlab = Roboto_Slab({subsets:['latin'],variable:'--font-serif'});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Mohamed Ahmed | Full-Stack Web Developer",
  description:
    "Mohamed Ahmed is a Full-Stack Web Developer specializing in React, Next.js, TypeScript, Node.js, Express.js, and PostgreSQL. Building modern, responsive, and scalable web applications.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Mohamed Ahmed | Full-Stack Web Developer",
    description:
      "Explore Mohamed Ahmed's projects and skills in React, Next.js, TypeScript, Node.js, Express.js, and PostgreSQL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable, "font-serif", robotoSlab.variable)}
    >
      <body>
        <TooltipProvider>
          {children}
          </TooltipProvider>
      </body>
    </html>
  )
}
