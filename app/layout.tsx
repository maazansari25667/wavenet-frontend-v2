import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, Roboto_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from "next/font/google"
import { LanguageProvider } from "@/hooks/use-language"
import { MobileNavProvider } from "@/components/mobile-nav"

// Initialize fonts aligned with a professional, text-forward brand
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-mono",
})
const sourceSerif = V0_Font_Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Wavenet - AI-driven telefoni med extra allt",
  description: "AI. Växel. Telefoni. Ärendehantering. Samarbete. Allt i ett.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv">
      <body className={`${inter.variable} ${robotoMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <LanguageProvider>
          <MobileNavProvider>{children}</MobileNavProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
