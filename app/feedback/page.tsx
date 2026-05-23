import { GradientHeader } from "@/components/gradient-header";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { PlusIcon, Map } from "lucide-react";
import Link from "next/link";
import FeedbackList from "../../components/feedback-list";

export default async function FeedbackPage() {
  // Get the Clerk userId from auth
  const { userId: clerkUserId } = await auth();

  // Resolve to internal DB integer ID so hasVoted check works correctly
  let dbUserId: number | null = null;
  if (clerkUserId) {
    const dbUser = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });
    dbUserId = dbUser?.id ?? null;
  }

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <GradientHeader
        title="Community Feedback"
        subtitle="Explore, vote, and contribute to the features that matter most. Your voice shapes our product's future."
      >
        <div className="flex gap-3 pt-1">
          <Button
            asChild
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-semibold h-9 px-4 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <Link href="/feedback/new" className="flex items-center gap-1.5">
              <PlusIcon className="h-3.5 w-3.5" />
              New Feedback
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 backdrop-blur-sm font-medium h-9 px-4 text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <Link href="/roadmap" className="flex items-center gap-1.5">
              <Map className="h-3.5 w-3.5" />
              View Roadmap
            </Link>
          </Button>
        </div>
      </GradientHeader>

      <FeedbackList initialPosts={posts} dbUserId={dbUserId} />
    </div>
  );
}