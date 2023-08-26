//Global imports
import { redirect } from "next/navigation";

// Local imports
import { SafeUser } from "@/app/types";

//components
import Container from "@/app/components/Container";
import { NavMenu } from "@/app/components/customUi/navMenu";
import  UserMenu   from "@/app/components/customUi/userMenu";
import Logo from "./customUi/Logo";
import Filter from "./customUi/filter/Filter";



interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = async ({
    currentUser,
}) =>{
    // if(!currentUser){
    //     redirect("/signIn");
    // }

    return(
        <div className="fixed w-full bg-white dark:bg-transparent z-20 drop-shadow-sm">
            <div className=" py-3 dark:bg-gray-800 border-b-[1px] dark:border-gray-700" >
                <Container>
                    <div className="flex  flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <NavMenu />
                        <UserMenu currentUser={currentUser} />

                    </div>
                </Container>                
            </div>
             {/* <Categories /> */}
            <Filter/>           
        </div>
    )
}
export default Navbar;