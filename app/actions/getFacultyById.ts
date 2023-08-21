import prisma from "@/lib/prismadb";


export default async function getFacultyById(
    Id: any
) {
    try {
        const { facultyId } = Id;

        const Faculty = await prisma.teacherCard.findUnique({
            where: {
                id: facultyId,
            }
        });

        if (!Faculty) {
            return null;
        }

        return {
            ...Faculty,
            createdAt: Faculty.createdAt.toString(),
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
