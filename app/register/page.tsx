// Global imports
import { redirect, useRouter } from "next/navigation";

// Local imports
import prisma from "@/lib/prismadb"

// Components
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "../components/Container";
//clients
import MarkRoleClient from "./markRoleClient";
import RegisterStudentClient from "./registerStudentClient";
import RegisterTeacherClient from "./registerTeacherClient";

// actions
import getCurrentUser from "@/app/actions/getCurrentUser";





const RegistrationPage = async () => {
  const currentUser = await getCurrentUser();
  
  // if(!(await getStudentById(currentUser?.id)) ){
  //     redirect('/register');
  // }    

  //To check the url's storeid if present inside datanase and if present then fetch it
  const s = await prisma.studentCard.findFirst({
    where: {
      id: currentUser?.id,
    }
  })
  if (currentUser && s) {
    redirect('/');
  }
  
  // const user = await prisma.user.findFirst({
  //   where: {
  //     id: currentUser?.id,
  //   }
  // })



  return (
    <ClientOnly>
      <Container>
        <MarkRoleClient user={currentUser}/>
        {currentUser?.role === 'student' && 
        <div>
          <RegisterStudentClient currentUser={currentUser}/>
        </div>
        }
        {currentUser?.role === 'teacher' && 
        <div>
          <RegisterTeacherClient currentUser={currentUser}/>
        </div>
        }
      </Container>
    </ClientOnly>
  )
}

export default RegistrationPage;