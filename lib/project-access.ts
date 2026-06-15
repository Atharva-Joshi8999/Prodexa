/**
 * Server-only project access helpers.
 * This file uses auth() and prisma — do NOT import it from Client Components.
 * For pure utilities (DEFAULT_CATEGORIES, canView, etc.) use @/lib/project-utils.
 */
import "server-only";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ProjectRole } from "@/generated/client/client";

export type { ProjectAccessResult } from "./project-access-types";
export {
  DEFAULT_CATEGORIES,
  getProjectCategories,
  canView,
  canContribute,
  canAdmin,
} from "./project-utils";

/**
 * Get the user's role in a project by slug.
 * Returns null if the project doesn't exist.
 * `userRole` will be null if the user is not a member.
 */
export async function getProjectAccess(slug: string) {
  const { userId: clerkUserId } = await auth();

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      members: {
        include: { user: true },
      },
    },
  });

  if (!project) return null;

  let dbUserId: number | null = null;
  let userRole: ProjectRole | null = null;
  let isOwner = false;

  if (clerkUserId) {
    const dbUser = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (dbUser) {
      dbUserId = dbUser.id;
      isOwner = project.ownerId === dbUser.id;

      // Owner always has ADMIN access
      if (isOwner) {
        userRole = "ADMIN" as ProjectRole;
      } else {
        const membership = project.members.find((m) => m.userId === dbUser.id);
        userRole = membership?.role ?? null;
      }
    }
  }

  return {
    projectId: project.id,
    projectSlug: project.slug,
    projectName: project.name,
    isPublic: project.isPublic,
    brandingColor: project.brandingColor,
    customCategories: project.customCategories,
    ownerId: project.ownerId,
    userRole,
    dbUserId,
    isOwner,
  };
}
