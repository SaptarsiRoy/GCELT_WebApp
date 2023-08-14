import prisma from "@/lib/prismadb";

export interface StudentListingParams {
  id: string;
  Name?: string;
  email?: string;
  RollNo?: string;
  RegistrationNo?: string;
  Year?: number;
  Semester?: string;
  Stream?: string;
  verified: Boolean;
}

export default async function getStudents(
  params: StudentListingParams
) {
  try {
    const {
        id,
        Name,
        email,
        RollNo,
        RegistrationNo,
        Year,
        Semester,
        Stream,
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
    if (RollNo) {
      query.RollNo = RollNo;
    }
    if (RegistrationNo) {
      query.RegistrationNo = RegistrationNo;
    }
    if (Semester) {
      query.Semester = Semester;
    }
    if (Stream) {
      query.Name = Name;
    }
    if (Year) {
      query.Year = Number(Year);
    }

    const userlist = await prisma.user.findMany({
      where: {AND: [query,] },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeUser = userlist.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: 
        user.emailVerified?.toISOString() || null,
    }));

    return safeUser;
  } catch (error: any) {
    throw new Error(error);
  }
}