import { StudentCard, User } from "@prisma/client";

export type SafeListing = Omit<StudentCard, "createdAt"> & {
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