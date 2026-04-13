import Link from "next/link";
import { Sparkles, Map, MessageSquare, BarChart3 } from "lucide-react";
import ThemeToggle from "./themeToggle";
import { Button } from "@/components/ui/button"; 

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">
          
          <Link href="/">
            <div className="flex items-center gap-2">
              
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>

              <span className="text-xl font-bold">
                Prodexa
              </span>

            </div>
          </Link>

          <Link
            href="/roadmap"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <Map className="h-4 w-4" />
            Roadmap
          </Link>

          <Link
            href="/feedback"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>
        </div>

        
        <div className="flex items-center gap-4">
          
          <ThemeToggle />

          <SignedOut>
            <SignInButton>
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

        </div>

      </div>
    </nav>
  );
}