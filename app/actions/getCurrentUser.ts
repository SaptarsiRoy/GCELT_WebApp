import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/lib/prismadb";

// from the session we get the authoptions and also the provider
export async function getSession() {
  return await getServerSession(authOptions)
}
// it is not a api call , it is direct communication with the database through 
// our server component

export default async function getCurrentUser() {
  try {
    // intitiate session
    const session = await getSession();

    // To check if the session exists or not?
    if (!session?.user?.email) {
      return null;
    }

    // to find the current user by the session logged in user
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    // check if user really exists or not?
    if (!currentUser) {
      return null;
    }

    // if exists then return the current user
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

