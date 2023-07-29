import { SafeUser } from "@/app/types";

import Container from "../Container";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
}) => {
    return (
        <div className="fixed w-full bg-white dark:bg-neutral-900 z-20 shadow-sm">
            <div className=" py-3 dark:bg-zinc-800 border-b-[1px] dark:border-neutral-700" >
                <Container>
                    <div
                        className="
                        flex 
                        flex-row 
                        items-center 
                        justify-between
                        gap-3
                        md:gap-0
                         "
                    >
                        <Logo />
                        <NavMenu />
                        <UserMenu currentUser={currentUser} />

                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar