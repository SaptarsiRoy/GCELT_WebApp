// Global imports
import { Nunito } from "next/font/google";

// local imports
import './globals.css'
import ClientOnly from '@/app/components/ClientOnly'
import { ModalProvider } from '@/providers/modalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import Navbar from "@/app/components/navbar";
import AuthContextProvider from '@/providers/AuthContextProvider'

// services
import getCurrentUser from "@/app/actions/getCurrentUser"
import LogInModal from "./components/modals/LoginModal";
import Feedback from "./components/Feedback";



export const metadata = {
    title: "Student Portal",
    description: "In card format Students Information are kept",
};
const font = Nunito({
    subsets: ["latin-ext","cyrillic"],
});


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();

    return (
        <AuthContextProvider>
            <html lang="en">
                <body className={font.className}>
                    <ClientOnly>
                        <ToasterProvider />
                        <ModalProvider />
                        <Navbar currentUser={currentUser} />
                        <Feedback/>
                    </ClientOnly>
                    <div className="pb-20 pt-28">{children}</div>
                </body>
            </html >
        </AuthContextProvider>
    )
}
