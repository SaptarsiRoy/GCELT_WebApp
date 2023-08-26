import prisma from "@/lib/prismadb";

export interface VerifiedListingParams {
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

export default async function getVerifiedStudents(
  params: VerifiedListingParams
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
      query.Name = {contains: Name, mode: 'insensitive'};
    }
    if (email) {
      query.email = {contains: email, mode: 'insensitive'};;
    }
    if (RollNo) {
      query.RollNo = {contains: RollNo, mode: 'insensitive'};
    }
    if (RegistrationNo) {
      query.RegistrationNo = {contains: RegistrationNo, mode: 'insensitive'};
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
    // if(verified){
    //   query.verified = false;
    // }


    const studentlist = await prisma.studentCard.findMany({
      where: {AND: [query, {verified:true}] },
      orderBy: {
        Name: 'asc'
      }
    });

    const safeListings = studentlist.map((studentCard) => ({
      ...studentCard,
      createdAt: studentCard.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
