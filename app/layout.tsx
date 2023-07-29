import { Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import AddStudentModal from "./components/modals/AddStudentModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";


export const metadata = {
  title: "Student Portal",
  description: "In card format Students Information are kept",
};
const font = Nunito({
  subsets: ["latin"],
});

async function getverifiedUser(currentUser:any) {
  return currentUser ? await prisma?.studentCard.findUnique({
    where: {
      id: currentUser?.id as string,
    },
  }): null
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const verifieduser = await getverifiedUser(currentUser);

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          {(currentUser)&&(!verifieduser) && (
            <AddStudentModal isOpen={false}/>
          )}          
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
