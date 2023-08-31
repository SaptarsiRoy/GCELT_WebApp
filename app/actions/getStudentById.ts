import prisma from "@/lib/prismadb";


export default async function getStudentById(
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
        const mySocialLinks = await prisma.socialLinks.findUnique({
            where: {
                studentId: studentId,
            }
        });

        return {
            ...Student,
            ...mySocialLinks,
            createdAt: Student.createdAt.toString(),
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
