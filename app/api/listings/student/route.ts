import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// we no longer have to use request methods in a switch method
// we can create out custom POST request method
export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    // if current user exits or not
    if (!currentUser) {
        return NextResponse.error();
    }

    // retrieve the
    const body = await request.json();
    const {
        imageSrc,
        Name,
        email,
        RollNo,
        RegistrationNo,
        Year,
        Stream,
    } = body;

    // Object.keys(body).forEach((value: any) => {
    //     if (!body[value]) {
    //         NextResponse.error();
    //     }
    // });

    // Now insert into database table RegisteredCard as a new student and pass the retrieved details
    const verificationListing = await prisma.studentCard.create({
        data: {
            imageSrc,
            Name,
            email,
            RollNo: String(RollNo),
            RegistrationNo: String(RegistrationNo),
            Year: parseInt(Year, 10),
            Semester:"1st",
            Stream: Stream,
            id: currentUser.id,
        },
    });

    return NextResponse.json(verificationListing);
}