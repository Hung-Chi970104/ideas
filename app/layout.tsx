import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import ConvexClientProvider from "@/components/ConvexProviderWithClerk"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Spark - AI Startup Idea Generator",
  description: "Spark your next startup today with AI-powered idea generation and roadmaps",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
          <head>
            <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-heading: ${spaceGrotesk.variable};
}
        `}</style>
          </head>
          <body className="grid-bg">{children}</body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}
