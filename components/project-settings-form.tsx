"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  Palette,
  Tag,
  Globe,
  Lock,
  Users,
  Trash2,
  UserPlus,
  Shield,
  Crown,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  updateProjectSettings,
  deleteProject,
  inviteMember,
  changeMemberRole,
  removeMember,
} from "@/lib/project-actions";

interface ProjectMember {
  id: number;
  role: string;
  user: { id: number; name: string; email: string; image: string };
  isOwner: boolean;
}

interface ProjectData {
  id: number;
  name: string;
  description: string;
  slug: string;
  isPublic: boolean;
  brandingColor: string;
  customCategories: string[];
  ownerId: number;
  owner: { id: number; name: string; email: string; image: string };
  members: ProjectMember[];
}

export default function ProjectSettingsForm({
  project,
}: {
  project: ProjectData;
}) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>(
    project.customCategories
  );
  const [brandingColor, setBrandingColor] = useState(project.brandingColor);

  const handleAddCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const handleDelete = async () => {
    try {
      await deleteProject(project.slug);
      toast.success("Project deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete project");
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    const fd = new FormData();
    fd.set("slug", project.slug);
    fd.set("email", inviteEmail.trim());
    fd.set("role", "MEMBER");
    try {
      await inviteMember(fd);
      toast.success(`Invited ${inviteEmail}`);
      setInviteEmail("");
    } catch (err: any) {
      toast.error(err.message || "Failed to invite member");
    }
  };

  const handleRoleChange = async (memberId: number, role: string) => {
    const fd = new FormData();
    fd.set("slug", project.slug);
    fd.set("memberId", String(memberId));
    fd.set("role", role);
    try {
      await changeMemberRole(fd);
      toast.success("Role updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to change role");
    }
  };

  const handleRemoveMember = async (memberId: number) => {
    const fd = new FormData();
    fd.set("slug", project.slug);
    fd.set("memberId", String(memberId));
    try {
      await removeMember(fd);
      toast.success("Member removed");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove member");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ── General Settings ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
              <Settings className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle className="text-base">General</CardTitle>
              <CardDescription className="text-xs">
                Update your project name, description, and URL slug.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              formData.set("customCategories", categories.join(","));
              formData.set("brandingColor", brandingColor);
              try {
                await updateProjectSettings(formData);
                toast.success("Settings saved");
              } catch (err: any) {
                toast.error(err.message || "Failed to save");
              }
            }}
            className="space-y-4"
          >
            <input type="hidden" name="slug" value={project.slug} />

            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" name="name" defaultValue={project.name} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newSlug">URL Slug</Label>
              <Input id="newSlug" name="newSlug" defaultValue={project.slug} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={project.description}
                rows={3}
              />
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <Label>Visibility</Label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-border/60 bg-card cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors flex-1">
                  <input
                    type="radio"
                    name="isPublic"
                    value="true"
                    defaultChecked={project.isPublic}
                    className="accent-indigo-600"
                  />
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Public</p>
                    <p className="text-xs text-muted-foreground">
                      Anyone can view
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl border border-border/60 bg-card cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors flex-1">
                  <input
                    type="radio"
                    name="isPublic"
                    value="false"
                    defaultChecked={!project.isPublic}
                    className="accent-indigo-600"
                  />
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Private</p>
                    <p className="text-xs text-muted-foreground">
                      Members only
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 shadow-md shadow-indigo-500/25"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ── Appearance ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-pink-100 dark:bg-pink-500/15 flex items-center justify-center">
              <Palette className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <CardTitle className="text-base">Appearance</CardTitle>
              <CardDescription className="text-xs">
                Customize your project's branding color.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl border-2 border-border shadow-sm shrink-0"
              style={{
                background: brandingColor || "#6366f1",
              }}
            />
            <div className="flex-1 space-y-1">
              <Label htmlFor="brandingColor">Hex Color</Label>
              <Input
                id="brandingColor"
                placeholder="#6366f1"
                value={brandingColor}
                onChange={(e) => setBrandingColor(e.target.value)}
              />
            </div>
            <input
              type="color"
              value={brandingColor || "#6366f1"}
              onChange={(e) => setBrandingColor(e.target.value)}
              className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Categories ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
              <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base">Categories</CardTitle>
              <CardDescription className="text-xs">
                Custom feedback categories. Leave empty to use defaults.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="text-sm py-1 px-3 flex items-center gap-1.5"
              >
                {cat}
                <button
                  onClick={() => handleRemoveCategory(cat)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {categories.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                Using default categories: Feature Request, Bug Report,
                Improvement, Other
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add category..."
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCategory();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCategory}
              className="shrink-0"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Team Members ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
              <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-base">Team Members</CardTitle>
              <CardDescription className="text-xs">
                Invite members and manage roles.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Invite */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter email to invite..."
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleInvite();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleInvite}
              className="shrink-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 shadow-sm"
            >
              <UserPlus className="h-4 w-4 mr-1.5" />
              Invite
            </Button>
          </div>

          {/* Member list */}
          <div className="space-y-2">
            {project.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-card/60"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {member.user.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate flex items-center gap-1.5">
                    {member.user.name}
                    {member.isOwner && (
                      <Crown className="h-3 w-3 text-amber-500" />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.user.email}
                  </p>
                </div>

                {member.isOwner ? (
                  <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs">
                    Owner
                  </Badge>
                ) : (
                  <>
                    <Select
                      defaultValue={member.role}
                      onValueChange={(value) =>
                        handleRoleChange(member.id, value)
                      }
                    >
                      <SelectTrigger className="w-[110px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIEWER">Viewer</SelectItem>
                        <SelectItem value="MEMBER">Member</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Danger Zone ── */}
      <Card className="border-red-200 dark:border-red-500/20 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
              <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-base text-red-600 dark:text-red-400">
                Danger Zone
              </CardTitle>
              <CardDescription className="text-xs">
                Permanently delete this project and all its data.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Delete Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete &quot;{project.name}&quot;?</DialogTitle>
                <DialogDescription>
                  This will permanently delete the project and all its feedback,
                  votes, and settings. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white border-0"
                >
                  Delete permanently
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
