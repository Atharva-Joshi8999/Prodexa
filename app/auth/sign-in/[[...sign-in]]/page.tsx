"use client"
import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { useTheme } from "next-themes"; 

export default function Page() {
  const { theme } = useTheme();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <SignIn appearance={{
        baseTheme: theme === "light" ? dark : undefined,
      }} />
    </main>
  );
}