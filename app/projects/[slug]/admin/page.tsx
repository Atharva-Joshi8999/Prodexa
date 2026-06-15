import AdminFeedbackTable from "@/components/admin-feedback-table";
import { GradientHeader } from "@/components/gradient-header";
import prisma from "@/lib/prisma";
import { getProjectAccess, canAdmin } from "@/lib/project-access";
import { notFound, redirect } from "next/navigation";

export default async function ProjectAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const access = await getProjectAccess(slug);
  if (!access) notFound();

  if (!canAdmin(access)) {
    redirect(`/projects/${slug}/feedback`);
  }

  const posts = await prisma.post.findMany({
    where: { projectId: access.projectId },
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
        title={`${access.projectName} — Admin`}
        subtitle="Manage feedbacks, update their status, and monitor your product's progress."
      />
      <AdminFeedbackTable posts={posts} />
    </div>
  );
}
