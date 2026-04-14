import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] right-1/2 translate-x-1/2 w-[700px] h-[700px] bg-blue-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Hero */}
      <div className="container mx-auto px-6 py-20 text-center space-y-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-zinc-700 text-sm text-muted-foreground backdrop-blur">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Smart Productivity Platform
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Turn your work into{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            measurable progress
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          Prodexa helps you track, analyze, and improve your workflow with
          powerful insights. Stay consistent and achieve more every day.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/20"
          >
            <Link href="/feedback/new">
              Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-zinc-700"
          >
            <Link href="/roadmap">
              Explore Roadmap
            </Link>
          </Button>

        </div>
      {/* How It Works Section */}
<div className="container mx-auto px-6 pb-20">

  <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
    How It Works
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* Card 1 */}
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)]  transition">
      <Sparkles className="h-8 w-8 text-purple-400 mb-4" />
      <h3 className="font-semibold mb-2">Submit Ideas</h3>
      <p className="text-sm text-muted-foreground">
        Share your suggestions and feature requests in one place.
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)]  transition">
      <ArrowRightIcon className="h-8 w-8 text-blue-400 mb-4" />
      <h3 className="font-semibold mb-2">Vote & Prioritize</h3>
      <p className="text-sm text-muted-foreground">
        Upvote ideas to highlight what matters most.
      </p>
    </div>

    {/* Card 3 */}
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)]  transition">
      <Sparkles className="h-8 w-8 text-pink-400 mb-4" />
      <h3 className="font-semibold mb-2">Track Progress</h3>
      <p className="text-sm text-muted-foreground">
        Follow your roadmap and see what's being built next.
      </p>
    </div>

    {/* Card 4 */}
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)]  transition">
      <ArrowRightIcon className="h-8 w-8 text-indigo-400 mb-4" />
      <h3 className="font-semibold mb-2">See Results</h3>
      <p className="text-sm text-muted-foreground">
        Watch ideas turn into real features and improvements.
      </p>
    </div>

  </div>

  {/* Stats */}
  <div className="flex flex-wrap justify-center gap-10 mt-12 text-center">

    <div>
      <p className="text-2xl font-bold hover:-translate-y-1 duration-300">1,200+</p>
      <p className="text-sm text-muted-foreground">Ideas Submitted</p>
    </div>

    <div>
      <p className="text-2xl font-bold hover:-translate-y-1 duration-300">8,500+</p>
      <p className="text-sm text-muted-foreground">Votes Cast</p>
    </div>

    <div>
      <p className="text-2xl font-bold hover:-translate-y-1 duration-300">250+</p>
      <p className="text-sm text-muted-foreground">Features Built</p>
    </div>

  </div>

</div>
      </div>
    
    </div>
      


  );
}