import { NextRequest , NextResponse } from "next/server";
import syncUser from "@/lib/syncusers";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
    try{

            const dbUser = await syncUser();
            if(!dbUser)
            {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const body = await request.json();

            const{title , description , category} = body;

            const post = await prisma.post.create({
                data:{
                    title,
                    description,
                    category,
                    authorId: dbUser.id,
                }
            });
            return NextResponse.json(post);



    }
    catch(error)
    {
            console.error("Error creating post:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

   
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
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