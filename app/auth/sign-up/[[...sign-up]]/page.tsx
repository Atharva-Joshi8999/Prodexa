"use client"
import { SignUp } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { useTheme } from "next-themes"; 

export default function Page() {
  const { theme } = useTheme();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <SignUp appearance={{
        baseTheme: theme === "light" ? dark : undefined,
      }} />
    </main>
  );
}