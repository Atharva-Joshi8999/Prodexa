import { NextRequest, NextResponse } from "next/server";
import syncUser from "@/lib/syncusers";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const dbUser = await syncUser();
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, projectSlug } = body;

    if (!projectSlug) {
      return NextResponse.json(
        { error: "Project slug is required" },
        { status: 400 }
      );
    }

    // Find the project
    const project = await prisma.project.findUnique({
      where: { slug: projectSlug },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Check if user is a member with contribute permissions (MEMBER or ADMIN)
    const isOwner = project.ownerId === dbUser.id;
    let hasAccess = isOwner;

    if (!isOwner) {
      const membership = await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId: project.id,
            userId: dbUser.id,
          },
        },
      });
      hasAccess =
        membership?.role === "MEMBER" || membership?.role === "ADMIN";
    }

    if (!hasAccess) {
      return NextResponse.json(
        { error: "You don't have permission to submit feedback to this project" },
        { status: 403 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        authorId: dbUser.id,
        projectId: project.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectSlug = searchParams.get("projectSlug");

    const where = projectSlug
      ? { project: { slug: projectSlug } }
      : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}