import prisma from "@/lib/prismadb";

export interface VerifiedFacultyListingParam {
    id: string;
    Name?: string;
    email?: string;
    Department?: string,
    Designation?: string,
    Qualification?: string,
    Specialization?: string,
    linkedInurl?: string,
    resumeurl?: string,
    Year?: number;
    verified: Boolean;
}

export default async function getStudents(
    params: VerifiedFacultyListingParam
) {
    try {
        const {
            id,
            Name,
            email,
            Department,
            Designation,
            Qualification,
            Specialization,
            linkedInurl,
            resumeurl,
            Year,
            verified,
        } = params;

        let query: any = {};
        // to check whether
        if (id) {
            query.id = id;
        }
        if (Name) {
            query.Name = Name;
        }
        if (email) {
            query.email = email;
        }
        if (Department) {
            query.RollNo = Department;
        }
        if (Designation) {
            query.RegistrationNo = Designation;
        }
        if (Qualification) {
            query.Semester = Qualification;
        }
        if (Specialization) {
            query.Name = Specialization;
        }
        if (Year) {
            query.Year = Number(Year);
        }
        if (linkedInurl) {
            query.Year = linkedInurl;
        }
        if (resumeurl) {
            query.Year = resumeurl;
        }
        // if(verified){
        //   query.verified === false ;
        // }


        const facultylist = await prisma.teacherCard.findMany({
            where: { AND: [query, { verified: false }] },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = facultylist.map((teacherCard) => ({
            ...teacherCard,
            createdAt: teacherCard.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}