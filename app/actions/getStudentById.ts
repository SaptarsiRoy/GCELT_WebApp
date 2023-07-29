import prisma from "@/app/lib/prismadb";


export default async function getListingById(
    Id: any
) {
    try {
        const { studentId } = Id;

        const Student = await prisma.studentCard.findUnique({
            where: {
                id: studentId,
            }
        });

        if (!Student) {
            return null;
        }

        return {
            ...Student,
            createdAt: Student.createdAt.toString(),
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
