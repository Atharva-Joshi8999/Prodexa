import { getProjectAccess, canView } from "@/lib/project-access";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const access = await getProjectAccess(slug);

  if (!access) {
    notFound();
  }

  // If the project is private and the user can't view it, show access denied
  if (!canView(access)) {
    const { userId } = await auth();
    if (!userId) {
      redirect("/auth/sign-in");
    }

    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg min-h-[60vh] flex flex-col items-center justify-center animate-fade-up space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-2">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground">
          This project is private. Ask the project owner to invite you as a member.
        </p>
      </div>
    );
  }

  // Apply branding color as a CSS variable
  return (
    <div
      style={{
        ...(access.brandingColor
          ? ({ "--project-accent": access.brandingColor } as React.CSSProperties)
          : {}),
      }}
    >
      {children}
    </div>
  );
}
