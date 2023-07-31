import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
    userId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    // Check if current user exist or not
    if (!currentUser) {
        return NextResponse.error();
    }

    // check if role of current user is admin
    if (currentUser?.role === "admin") {
        // Retrieve the userId passed as parameters
        const { userId } = params;
        console.log(userId);
        // If Valid userId Provided or not
        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }

        const body = await request.json();
        const { 
        role
        } = body;
        console.log(role);
        // Get the data of student from registeredCard whose studentId is provided
        const markedUser = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        });

        // If we don't get the Student details from database return null
        if (!markedUser) {
            return null;
        }

        const verifiedStudent = await prisma.user.update({
            data: {
                role: role,
            },
            where: {
                id: markedUser.id,
            },
        });

        //And Return the response
        return NextResponse.json(verifiedStudent);
    }
}