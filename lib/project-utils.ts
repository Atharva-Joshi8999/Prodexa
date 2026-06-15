/**
 * Pure project utilities — safe to import from both Server and Client Components.
 * Do NOT add any server-only imports (e.g. auth, prisma) to this file.
 */

import { ProjectAccessResult } from "@/lib/project-access-types";

export const DEFAULT_CATEGORIES = [
  "Feature Request",
  "Bug Report",
  "Improvement",
  "Other",
];

export function getProjectCategories(customCategories: string[]): string[] {
  return customCategories.length > 0 ? customCategories : DEFAULT_CATEGORIES;
}

/**
 * Check if the user can view this project.
 * Public projects: anyone can view.
 * Private projects: must be a member (any role) or owner.
 */
export function canView(access: ProjectAccessResult): boolean {
  if (access.isPublic) return true;
  return access.userRole !== null;
}

/**
 * Check if the user can submit feedback or vote.
 * Must be MEMBER or ADMIN (not VIEWER).
 */
export function canContribute(access: ProjectAccessResult): boolean {
  return access.userRole === "MEMBER" || access.userRole === "ADMIN";
}

/**
 * Check if the user can administer the project (settings, status changes, member mgmt).
 * Must be ADMIN or owner.
 */
export function canAdmin(access: ProjectAccessResult): boolean {
  return access.userRole === "ADMIN";
}
