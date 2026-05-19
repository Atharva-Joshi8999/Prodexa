import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/themeProvider";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import syncUser from "@/lib/syncusers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prodexa — Intelligent Feedback Management Platform",
  description:
    "Turn customer feedback into your product roadmap. Prodexa unifies feedback, surfaces what matters most, and keeps every stakeholder aligned — from idea to shipped feature.",
  keywords: ["feedback", "product management", "roadmap", "customer feedback", "prioritization"],
  openGraph: {
    title: "Prodexa — Intelligent Feedback Management Platform",
    description: "Turn customer feedback into your product roadmap.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser();
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}