// Global imports
import { redirect } from "next/navigation";

// Local imports
import prisma from "@/lib/prismadb"

// Components
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import StudentCard from "@/app/components/customUi/cards/StudentCard";

// actions
import getVerifiedStudents, { VerifiedListingParams } from "@/app/actions/getVerifiedStudents";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getStudentById from "./actions/getStudentById";




interface HomeProps {
    searchParams: VerifiedListingParams
};

const Home = async ({ searchParams }: HomeProps) => {
    const students = await getVerifiedStudents(searchParams);
    const currentUser = await getCurrentUser();
    const isEmpty = true;
    if (students.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset />
            </ClientOnly>
        );
    }

    // if(!(await getStudentById(currentUser?.id)) ){
    //     redirect('/register');
    // }    

    //To check the url's storeid if present inside datanase and if present then fetch it
    const s = await prisma.studentCard.findFirst({
        where: {
            id: currentUser?.id,
        }
    })
    if(currentUser && !s && currentUser.role !== 'admin'){
        redirect(`/register`);
    } 

    const Profile = students.filter((my) => { return (my.id === currentUser?.id) });
    const other = students.filter((item) => { return (item.id !== currentUser?.id) });


    return (

        <ClientOnly>
            <Container>
                <div
                    className="
                        pt-24
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-2 
                        lg:grid-cols-3
                        xl:grid-cols-4
                        2xl:grid-cols-5
                        gap-6
                        "
                >
                    {Profile.map((studentCard: any) => (
        				<StudentCard
        					currentUser={currentUser}
        					key={studentCard.id}
        					data={studentCard}
        				/>))
        			}
        			{other.map((studentCard: any) => (
        				<StudentCard
        					currentUser={currentUser}
        					key={studentCard.id}
        					data={studentCard}
        				/>))}
        		</div>
            </Container>
        </ClientOnly>
        			
    )
}

export default Home;