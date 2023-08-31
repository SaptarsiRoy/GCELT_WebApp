"use client";
// Global imports
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// Local imports
import { SafeFacultyListing, SafeStudent, SafeUser } from "@/app/types";
//Components
import Heading from "@/app/components/ui/Heading";
import Container from "@/app/components/Container";
import StudentCard from "@/app/components/customUi/cards/StudentCard";
import FacultyCard from "@/app/components/customUi/cards/FacultyCard";
import AlumniCard from "@/app/components/customUi/cards/AlumniCard";
import { Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";




interface TripsClientProps {
    verification: SafeStudent[] | SafeFacultyListing[] | any;
    currentUser?: SafeUser | null;
}

const VerificationClient: React.FC<TripsClientProps> = ({
    verification,
    currentUser,
}) => {
    const router = useRouter();
    const [VerifyId, setVerifyId] = useState("");

    const onVerify = useCallback(
        (id: string, path: string) => {
            setVerifyId(id);
            // Request
            axios
                .post(`/api/listings/${path}/${id}`)
                .then(() => {
                    toast.success("User Card Verfied Successfully");
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.statusText);
                    console.error(error);
                })
                .finally(() => {
                    setVerifyId("");
                });
        },
        [router]
    );


    const onDelete = useCallback(
        (id: string, path: string) => {
            setVerifyId(id);
            // Request
            axios
                .delete(`/api/listings/${path}/${id}`)
                .then(() => {
                    toast('User Card Deleted!', {
                        icon: <Trash2 />, style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#dc2626',
                        },
                    });
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.statusText);
                    console.error(error);
                })
                .finally(() => {
                    setVerifyId("");
                });
        },
        [router]
    );


    return (
        <Container>
            
            <Tabs defaultValue="student">
                <div className="flex flex-row justify-between">
                <Heading
                title="Waiting for Verification"
                subtitle="Where you've been and where you're going"
                />
                <TabsList>
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="alumni">Alumni</TabsTrigger>
                    <TabsTrigger value="faculty">Faculty</TabsTrigger>
                </TabsList>
                </div>
                <TabsContent value="student">
                    <div
                        className="mt-10
                            grid grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-2 
                            lg:grid-cols-3
                            xl:grid-cols-4
                            2xl:grid-cols-5
                            gap-8
                        "
                    >
                        {verification.map((user: any) => (
                            user.role === 'student' && (
                                <StudentCard
                                    key={user.id}
                                    data={user}
                                    // user={user}
                                    actionId={user.id}
                                    onAction={onVerify}
                                    onDeletion={onDelete}
                                    disabled={VerifyId === user.id}
                                    actionLabel="Verify"
                                    currentUser={currentUser}
                                />
                            )
                            
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="alumni">
                    <div
                        className="mt-10
                            grid grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-2 
                            lg:grid-cols-3
                            xl:grid-cols-4
                            2xl:grid-cols-5
                            gap-8
                        "
                    >
                        {verification.map((user: any) => (
                            user.role === 'alumni' && (
                                <AlumniCard
                                    key={user.id}
                                    data={user}
                                    // user={user}
                                    actionId={user.id}
                                    onAction={onVerify}
                                    onDeletion={onDelete}
                                    disabled={VerifyId === user.id}
                                    actionLabel="Verify"
                                    currentUser={currentUser}
                                />
                            )
                            
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="faculty">
                    <div
                        className="mt-10
                            grid grid-cols-1 
                            sm:grid-cols-2 
                            md:grid-cols-3 
                            lg:grid-cols-3
                            2xl:grid-cols-4
                            gap-6
                            "
                        >
                        {verification.map((user: any) => (
                            user.role === 'faculty' && (
                                <FacultyCard
                                    key={user.id}
                                    data={user}
                                    // user={user}
                                    actionId={user.id}
                                    onAction={onVerify}
                                    onDeletion={onDelete}
                                    disabled={VerifyId === user.id}
                                    actionLabel="Verify"
                                    currentUser={currentUser}
                                />
                            )
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </Container>
    );
};

export default VerificationClient;
