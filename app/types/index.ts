import { StudentCard, SocialLinks, TeacherCard , User } from "@prisma/client";

type safeListing = StudentCard&SocialLinks

export type SafeStudent = Omit<safeListing,"createdAt"> & {
  Year: number,
  createdAt: string;
};

export type SafeFacultyListing = Omit<TeacherCard, "createdAt"> & {
  Year: number,
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};