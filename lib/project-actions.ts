"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProjectAccess, canAdmin } from "@/lib/project-access";

// ────────────────────────────────────────────
// Create Project
// ────────────────────────────────────────────
export async function createProject(formData: FormData) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId },
  });
  if (!dbUser) throw new Error("User not found");

  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || "";
  const slugRaw = (formData.get("slug") as string) || "";
  const isPublic = formData.get("isPublic") !== "false";

  // Generate slug from name if not provided
  const slug =
    slugRaw.trim() ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  // Check slug uniqueness
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) throw new Error("A project with this slug already exists");

  const project = await prisma.project.create({
    data: {
      name,
      description,
      slug,
      ownerId: dbUser.id,
      isPublic,
    },
  });

  // Auto-add the owner as an ADMIN member
  await prisma.projectMember.create({
    data: {
      projectId: project.id,
      userId: dbUser.id,
      role: "ADMIN",
    },
  });

  redirect(`/projects/${project.slug}/feedback`);
}

// ────────────────────────────────────────────
// Update Project Settings
// ────────────────────────────────────────────
export async function updateProjectSettings(formData: FormData) {
  const slug = formData.get("slug") as string;
  const access = await getProjectAccess(slug);
  if (!access || !canAdmin(access)) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || "";
  const newSlug = (formData.get("newSlug") as string) || slug;
  const isPublic = formData.get("isPublic") === "true";
  const brandingColor = (formData.get("brandingColor") as string) || null;
  const categoriesRaw = (formData.get("customCategories") as string) || "";
  const customCategories = categoriesRaw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  await prisma.project.update({
    where: { id: access.projectId },
    data: {
      name,
      description,
      slug: newSlug,
      isPublic,
      brandingColor,
      customCategories,
    },
  });

  revalidatePath(`/projects/${newSlug}`);
  if (newSlug !== slug) {
    redirect(`/projects/${newSlug}/settings`);
  }
}

// ────────────────────────────────────────────
// Delete Project
// ────────────────────────────────────────────
export async function deleteProject(slug: string) {
  const access = await getProjectAccess(slug);
  if (!access || !access.isOwner) throw new Error("Only the owner can delete this project");

  await prisma.project.delete({
    where: { id: access.projectId },
  });

  redirect("/dashboard");
}

// ────────────────────────────────────────────
// Invite Member
// ────────────────────────────────────────────
export async function inviteMember(formData: FormData) {
  const slug = formData.get("slug") as string;
  const email = formData.get("email") as string;
  const role = (formData.get("role") as string) || "MEMBER";

  const access = await getProjectAccess(slug);
  if (!access || !canAdmin(access)) throw new Error("Unauthorized");

  const targetUser = await prisma.user.findUnique({ where: { email } });
  if (!targetUser) throw new Error("No user found with that email. They must sign up first.");

  // Check if already a member
  const existing = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId: access.projectId,
        userId: targetUser.id,
      },
    },
  });
  if (existing) throw new Error("User is already a member of this project");

  await prisma.projectMember.create({
    data: {
      projectId: access.projectId,
      userId: targetUser.id,
      role: role as any,
    },
  });

  revalidatePath(`/projects/${slug}/settings`);
}

// ────────────────────────────────────────────
// Change Member Role
// ────────────────────────────────────────────
export async function changeMemberRole(formData: FormData) {
  const slug = formData.get("slug") as string;
  const memberId = Number(formData.get("memberId"));
  const newRole = formData.get("role") as string;

  const access = await getProjectAccess(slug);
  if (!access || !canAdmin(access)) throw new Error("Unauthorized");

  const member = await prisma.projectMember.findUnique({
    where: { id: memberId },
  });
  if (!member) throw new Error("Member not found");

  // Can't change the owner's role
  if (member.userId === access.ownerId) {
    throw new Error("Cannot change the owner's role");
  }

  await prisma.projectMember.update({
    where: { id: memberId },
    data: { role: newRole as any },
  });

  revalidatePath(`/projects/${slug}/settings`);
}

// ────────────────────────────────────────────
// Remove Member
// ────────────────────────────────────────────
export async function removeMember(formData: FormData) {
  const slug = formData.get("slug") as string;
  const memberId = Number(formData.get("memberId"));

  const access = await getProjectAccess(slug);
  if (!access || !canAdmin(access)) throw new Error("Unauthorized");

  const member = await prisma.projectMember.findUnique({
    where: { id: memberId },
  });
  if (!member) throw new Error("Member not found");

  // Can't remove the owner
  if (member.userId === access.ownerId) {
    throw new Error("Cannot remove the project owner");
  }

  await prisma.projectMember.delete({
    where: { id: memberId },
  });

  revalidatePath(`/projects/${slug}/settings`);
}
