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
    const currentUser = await getCurrentUser();

    // Check if current user exist or not
    if (!currentUser) {
        return NextResponse.error();
    }

    // check if role of current user is admin
    if (currentUser?.role === "admin") {
        // Retrieve the studentId passed as parameters
        const { studentId } = params;

        // If Valid StudentId Provided or not
        if (!studentId || typeof studentId !== "string") {
            throw new Error("Invalid ID");
        }

        // Get the data of student from registeredCard whose studentId is provided
        const Student = await prisma.studentCard.findFirst({
            where: {
                id: studentId,
                verified: false,
            },
        });

        // If we don't get the Student details from database return null
        if (!Student) {
            return null;
        }

        const verifiedStudent = await prisma.studentCard.update({
            data: {
                verified: true,
            },
            where: {
                id: Student.id,
            },
        });

        //And Return the response
        return NextResponse.json(verifiedStudent);
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
        // Retrieve the studentId passed as parameters
        const { studentId } = params;

        // If Valid StudentId Provided or not
        if (!studentId || typeof studentId !== "string") {
            throw new Error("Invalid ID");
        }

        // Get the data of student from registeredCard whose studentId is provided
        const Student = await prisma.studentCard.findFirst({
            where: {
                id: studentId,
                verified: false,
            },
        });

        // If we don't get the Student details from database return null
        if (!Student) {
            return null;
        }

        const DeleteStudent = await prisma.studentCard.delete({
            where: {
                id: Student.id,
            },
        });

        //And Return the response
        return NextResponse.json(DeleteStudent);
    }
}


// import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/lib/prismadb";

// interface IParams {
//     studentId?: string;
// }

// export async function DELETE(
//     request: Request,
//     { params }: { params: IParams }
// ) {
//     const currentUser = await getCurrentUser();
//     // get the current user
//     console.log(currentUser);
//     // Check if current user exist or not
//     if (!currentUser) {
//         return NextResponse.error();
//     };

//     // check if role of current user is admin
//     if (currentUser?.role === "admin") {

//         // Retrieve the studentId passed as parameters
//         const { studentId } = params;

//         // If Valid StudentId Provided or not
//         if (!studentId || typeof studentId !== "string") {
//             throw new Error("Invalid ID");
//         }

//         // Get the data of student from registeredCard whose studentId is provided
//         const Student = await prisma.studentCard.findFirst({
//             where: {
//                 id: studentId,
//                 verified: false,
//             },
//         });

//         // If we don't get the Student details from database return null
//         if (!Student) {
//             return null;
//         }
//         // Delete Student from the registerdCard Collection
//         const deleteStudent = await prisma.studentCard.deleteMany({
//             where: {
//                 id: studentId,
//             },
//         });
//         // copy the student details from registeredCard Collection to studentCard Collection
//         const verifiedStudent = await prisma.studentCard.create({
//             data: {
//                 id: Student.id,
//                 Name: Student.Name,
//                 email: Student.email,
//                 RollNo: Student.RollNo,
//                 imageSrc: Student.imageSrc,
//                 createdAt: Student.createdAt,
//                 RegistrationNo: Student.RegistrationNo,
//                 Year: Student.Year,
//                 Semester: Student.Semester,
//                 Stream: Student.Stream,
//                 verified: true,
//             },
//         });

//         //And Return the response
//         return NextResponse.json(verifiedStudent);
//     };
// }
