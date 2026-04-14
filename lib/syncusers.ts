import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export default async function syncUser() {
  try {
    const user = await currentUser();

    if (!user) return null;

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("Email not found for the user.");
    }

    let dbUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (dbUser) {
      dbUser = await prisma.user.update({
        where: { clerkUserId: user.id },
        data: {
          email,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          image: user.imageUrl,
        },
      });
    } else {


      const userCount = await prisma.user.count();
                          
      const isFirstUser = userCount === 0;

      dbUser = await prisma.user.create({
        data: {
          clerkUserId: user.id,
          email,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          image: user.imageUrl,
          role: isFirstUser ? "Admin" : "User",
        },
      });

      console.log(`New user created: ${email} with role: ${dbUser.role}`);
    }

    return dbUser;
  } catch (error) {
    console.error("Error syncing user from Clerk:", error);
    throw error;
  }
}