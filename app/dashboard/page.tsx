import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GradientHeader } from "@/components/gradient-header";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Globe,
  Lock,
  Users,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default async function DashboardPage() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    redirect("/auth/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!dbUser) {
    redirect("/auth/sign-in");
  }

  // Get all projects the user owns or is a member of
  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: dbUser.id },
    include: {
      _count: {
        select: { posts: true, members: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const memberProjects = await prisma.project.findMany({
    where: {
      members: {
        some: {
          userId: dbUser.id,
          NOT: { project: { ownerId: dbUser.id } },
        },
      },
    },
    include: {
      owner: { select: { name: true } },
      members: {
        where: { userId: dbUser.id },
        select: { role: true },
      },
      _count: {
        select: { posts: true, members: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const hasAnyProject = ownedProjects.length > 0 || memberProjects.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <GradientHeader
        title="Your Projects"
        subtitle="Manage all your product feedback boards in one place."
      >
        <Button
          asChild
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-semibold h-9 px-4 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          <Link href="/projects/new" className="flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            New Project
          </Link>
        </Button>
      </GradientHeader>

      {!hasAnyProject ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="h-20 w-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
            <MessageSquare className="h-10 w-10 text-indigo-400" />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="text-2xl font-bold tracking-tight">
              Create your first project
            </h2>
            <p className="text-muted-foreground">
              Projects let you organize feedback from different products, apps, or teams
              into separate boards with their own roadmaps and settings.
            </p>
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 h-12 px-8 font-semibold shadow-md shadow-indigo-500/25">
            <Link href="/projects/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Owned Projects */}
          {ownedProjects.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                <span className="h-6 w-6 rounded-md bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
                  <Users className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                </span>
                Your Projects
                <Badge variant="secondary" className="text-xs ml-1">{ownedProjects.length}</Badge>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ownedProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}/feedback`}
                    className="group relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 space-y-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-500/30"
                  >
                    {/* Color indicator */}
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0"
                        style={{
                          background: project.brandingColor || "linear-gradient(135deg, #6366f1, #3b82f6)",
                        }}
                      >
                        {project.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          /{project.slug}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        {project.isPublic ? (
                          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Public</span>
                        ) : (
                          <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Private</span>
                        )}
                      </Badge>
                    </div>

                    {project.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/30">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {project._count.posts} posts
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project._count.members} members
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Member Projects */}
          {memberProjects.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                <span className="h-6 w-6 rounded-md bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                  <Users className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                </span>
                Shared with You
                <Badge variant="secondary" className="text-xs ml-1">{memberProjects.length}</Badge>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memberProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}/feedback`}
                    className="group relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 space-y-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-emerald-200 dark:hover:border-emerald-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0"
                        style={{
                          background: project.brandingColor || "linear-gradient(135deg, #10b981, #06b6d4)",
                        }}
                      >
                        {project.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          by {project.owner.name}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-[10px] capitalize">
                        {project.members[0]?.role.toLowerCase() || "member"}
                      </Badge>
                    </div>

                    {project.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/30">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {project._count.posts} posts
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project._count.members} members
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
