import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
    facultyId?: string;
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
        // Retrieve the facultyId passed as parameters
        const { facultyId } = params;

        // If Valid facultyId Provided or not
        if (!facultyId || typeof facultyId !== "string") {
            throw new Error("Invalid ID");
        }

        // Get the data of faculty from registeredCard whose facultyId is provided
        const faculty = await prisma.teacherCard.findFirst({
            where: {
                id: facultyId,
                verified: false,
            },
        });

        // If we don't get the faculty details from database return null
        if (!faculty) {
            return null;
        }

        const verifiedfaculty = await prisma.teacherCard.update({
            data: {
                verified: true,
            },
            where: {
                id: faculty.id,
            },
        });

        //And Return the response
        return NextResponse.json(verifiedfaculty);
    }
}

export async function DELETE(
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
        // Retrieve the facultyId passed as parameters
        const { facultyId } = params;

        // If Valid facultyId Provided or not
        if (!facultyId || typeof facultyId !== "string") {
            throw new Error("Invalid ID");
        }

        // Get the data of faculty from registeredCard whose facultyId is provided
        const faculty = await prisma.teacherCard.findFirst({
            where: {
                id: facultyId,
            },
        });

        // If we don't get the faculty details from database return null
        if (!faculty) {
            return null;
        }

        const Deletefaculty = await prisma.teacherCard.delete({
            where: {
                id: faculty.id,
            },
        });

        //And Return the response
        return NextResponse.json(Deletefaculty);
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: IParams }
) {
    console.log("here");
    const currentUser = await getCurrentUser();
    const { facultyId } = params;
    // Check if current user exist or not
    if (!currentUser) {
        return NextResponse.error();
    }
    // If Valid facultyId Provided or not
    if (!facultyId || typeof facultyId !== "string") {
        throw new Error("Invalid ID");
    }
    // check if role of current user is admin
    if (currentUser?.role === "admin" || currentUser?.id === facultyId) {

        // retrieve the
        const body = await request.json();
        const {
            imageSrc,
            Name,
            email,
            Year,
            Department,
            Designation,
            Qualification,
            Specialization,
            linkedInurl,
            resumeurl
        } = body;

        const editfaculty = await prisma.teacherCard.update({
            data: {
                imageSrc,
                Name,
                email,
                Year: parseInt(Year, 10),
                Department,
                Designation,
                Qualification,
                Specialization,
                linkedInurl,
                resumeurl
            },
            where: {
                id: facultyId,
            },
        });

        //And Return the response
        return NextResponse.json(editfaculty);
    }
}