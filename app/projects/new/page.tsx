"use client";

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
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { createProject } from "@/lib/project-actions";
import { toast } from "sonner";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function handleCreateProject(
  prevState: { error: string },
  formData: FormData
) {
  try {
    await createProject(formData);
    return { error: "" };
  } catch (err: any) {
    toast.error(err.message || "Failed to create project");
    return { error: err.message || "Failed to create project" };
  }
}

export default function NewProjectPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);

  const [state, action, isPending] = useActionState(handleCreateProject, {
    error: "",
  });

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugManual) {
      setSlug(slugify(value));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4 py-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Project</h1>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>New Project</CardTitle>
              <CardDescription>
                Set up a new feedback board for your product or team.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Acme App"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">
                URL Slug
                <span className="text-xs text-muted-foreground ml-2 font-normal">
                  /projects/{slug || "…"}
                </span>
              </Label>
              <Input
                id="slug"
                name="slug"
                placeholder="acme-app"
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugManual(true);
                }}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description
                <span className="text-xs text-muted-foreground ml-2 font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="What is this project about?"
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
                    defaultChecked
                    className="accent-indigo-600"
                  />
                  <div>
                    <p className="text-sm font-medium">Public</p>
                    <p className="text-xs text-muted-foreground">Anyone can view feedback</p>
                  </div>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl border border-border/60 bg-card cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors flex-1">
                  <input
                    type="radio"
                    name="isPublic"
                    value="false"
                    className="accent-indigo-600"
                  />
                  <div>
                    <p className="text-sm font-medium">Private</p>
                    <p className="text-xs text-muted-foreground">Members only</p>
                  </div>
                </label>
              </div>
            </div>

            {state.error && (
              <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {state.error}
              </p>
            )}

            <div className="flex gap-4 pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0 shadow-md shadow-indigo-500/25"
              >
                {isPending ? "Creating…" : "Create Project"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
