import { getProjectAccess, canAdmin, DEFAULT_CATEGORIES } from "@/lib/project-access";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { GradientHeader } from "@/components/gradient-header";
import ProjectSettingsForm from "@/components/project-settings-form";

export default async function ProjectSettingsPage({
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

  // Fetch full project data + members for settings
  const project = await prisma.project.findUnique({
    where: { id: access.projectId },
    include: {
      owner: { select: { id: true, name: true, email: true, image: true } },
      members: {
        include: {
          user: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!project) notFound();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <GradientHeader
        title={`${access.projectName} — Settings`}
        subtitle="Configure your project, manage team members, and customize your feedback board."
      />

      <ProjectSettingsForm
        project={{
          id: project.id,
          name: project.name,
          description: project.description || "",
          slug: project.slug,
          isPublic: project.isPublic,
          brandingColor: project.brandingColor || "",
          customCategories: project.customCategories,
          ownerId: project.ownerId,
          owner: project.owner,
          members: project.members.map((m) => ({
            id: m.id,
            role: m.role,
            user: m.user,
            isOwner: m.userId === project.ownerId,
          })),
        }}
      />
    </div>
  );
}
