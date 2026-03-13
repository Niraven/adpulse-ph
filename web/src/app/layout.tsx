import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AdPulse — Manage All Your Meta Ad Accounts in One Dashboard",
  description: "The simplest way to manage hundreds of Facebook ad accounts, Business Managers, and Fan Pages. Built for Philippine e-commerce sellers, media buyers, and agencies.",
  keywords: "facebook ads manager, meta ads, ad account management, business manager, philippines, e-commerce",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
