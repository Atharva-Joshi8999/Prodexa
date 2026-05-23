import AdminFeedbackTable from "@/components/admin-feedback-table";
import { GradientHeader } from "@/components/gradient-header";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user || user.role !== "Admin") {
    redirect("/");
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
    <div className="container mx-auto px-4 py-8">
      <GradientHeader
        title="Admin Dashboard"
        subtitle="Manage feedbacks, update their status, and monitor your product's progress."
      />
      <AdminFeedbackTable posts={posts} />
    </div>
  );
}