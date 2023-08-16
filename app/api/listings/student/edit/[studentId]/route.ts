import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
    studentId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    console.log("here");
    const currentUser = await getCurrentUser();
    const { studentId } = params;
    // Check if current user exist or not
    if (!currentUser) {
        return NextResponse.error();
    }
    // If Valid StudentId Provided or not
    if (!studentId || typeof studentId !== "string") {
        throw new Error("Invalid ID");
    }
    // check if role of current user is admin
    if (currentUser?.role === "admin" || currentUser?.id === studentId) {

        // retrieve the
        const body = await request.json();
        const {
            imageSrc,
            Name,
            email,
            RollNo,
            RegistrationNo,
            Year,
            Semester,
            Stream,
        } = body;

        const editStudent = await prisma.studentCard.update({
            data: {
                imageSrc,
                Name,
                email,
                RollNo: String(RollNo),
                RegistrationNo: String(RegistrationNo),
                Year: parseInt(Year, 10),
                Semester,
                Stream
            },
            where: {
                id: studentId,
            },
        });

        //And Return the response
        return NextResponse.json(editStudent);
    }
}