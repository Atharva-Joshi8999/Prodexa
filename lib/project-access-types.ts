import { ProjectRole } from "@/generated/client/client";

export type ProjectAccessResult = {
  projectId: number;
  projectSlug: string;
  projectName: string;
  isPublic: boolean;
  brandingColor: string | null;
  customCategories: string[];
  ownerId: number;
  userRole: ProjectRole | null;
  dbUserId: number | null;
  isOwner: boolean;
};
