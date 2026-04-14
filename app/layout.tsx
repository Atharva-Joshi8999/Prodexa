import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import {  SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/themeProvider";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import syncUser from "@/lib/syncusers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Prodexa",
  description: "View and manage your feedback in one place",
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
      <body className={`${geistSans.variable} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
         
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        <Footer />
    </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  );
}