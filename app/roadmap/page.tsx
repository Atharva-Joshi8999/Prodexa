import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Map } from "lucide-react";

export default async function RoadmapPage() {
  const { userId: clerkUserId } = await auth();

  // If signed in, redirect to dashboard where they can pick a project
  if (clerkUserId) {
    redirect("/dashboard");
  }

  // Unauthenticated intro page
  return (
    <div className="container mx-auto px-4 py-32 space-y-8 text-center max-w-3xl min-h-[80vh] flex flex-col items-center justify-center animate-fade-up">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 text-sm font-medium text-indigo-700 dark:text-indigo-400">
        <Map className="w-4 h-4" />
        <span>Product Roadmap</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
        See where we&apos;re going
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
        Our public roadmap gives you an exclusive look into the future of Prodexa.
        Sign in to view planned features, track our progress, and celebrate what we&apos;ve shipped recently.
      </p>
      <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-500 hover:to-blue-500 border-0 h-12 px-8 text-[15px] font-semibold transition-all duration-200 shadow-md shadow-indigo-500/25">
          <Link href="/auth/sign-up">Sign Up to View</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-12 px-8 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-200">
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}