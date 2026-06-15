import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/sign-in");
  }

  // Redirect to dashboard — admin is now per-project at /projects/[slug]/admin
  redirect("/dashboard");
}