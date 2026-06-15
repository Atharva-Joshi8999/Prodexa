import { redirect } from "next/navigation";

export default function FeedbackNewPage() {
  // This page has moved to /projects/[slug]/feedback/new
  redirect("/dashboard");
}