'use client';
import { SafeUser } from "@/app/types";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useAddStudentModal from "@/app/hooks/useAddStudentModal";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import ThemeToggler from "../ThemeToggler";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const router = useRouter();
    const [isExpand, setIsExpand] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const addStudentModal = useAddStudentModal();
    const menuref =  useClickOutside(()=>setIsExpand(false));

    const onAdd = useCallback(() => {
        if (!currentUser) {
          return loginModal.onOpen();
        }
    
        addStudentModal.onOpen();
      }, [loginModal, addStudentModal, currentUser]);

    const toggleExpand = useCallback(() => {
        setIsExpand((value) => !value);
    }, []);
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => { }}
                    className="
                        hidden
                        md:block
                        text-sm 
                        font-semibold 
                        py-3 
                        px-4 
                        rounded-full 
                        hover:bg-neutral-100 
                        dark:hover:bg-zinc-900
                        transition 
                        cursor-pointer
                    "
                >
                    {currentUser ? currentUser.role === "admin" ? "Admin Portal" : "Student Profile" : "View Mode"}
                </div>
                <div
                    // Here toogleExpand is used to toggle between expand and collapsing menuitems 
                    onClick={toggleExpand}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px] 
                        border-neutral-200 
                        dark:border-neutral-600
                        flex 
                        flex-row 
                        items-center 
                        gap-3 
                        rounded-full 
                        cursor-pointer 
                        hover:shadow-md 
                        transition
                        "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
                {!currentUser &&<div className="hidden
                        md:block
                        text-sm 
                        font-semibold 
                        py-3 
                        px-4 
                        rounded-full 
                        hover:bg-neutral-100  
                        dark:hover:bg-zinc-900                        
                        transition 
                        cursor-pointer"
                    onClick={loginModal.onOpen}
                >
                     Login
                    
                </div>}
                <ThemeToggler />
            </div>
            {/* Dropdown Menu List
                State of the MenuItem is checked is it 
            */}
            {isExpand && (
                <div ref={menuref}
                    className="
                        absolute 
                        rounded-xl 
                        shadow-md
                        w-[40vw]
                        md:w-3/4 
                        bg-white 
                        dark:bg-neutral-700
                        overflow-hidden 
                        right-0 
                        top-12 
                        text-sm
                        z-10
                        "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? currentUser.role === "admin" ? (
                            <>
                                <MenuItem
                                    label="Verify Student"
                                    onClick={() => router.push('/verification')}
                                />
                                <MenuItem
                                    label="Add Student"
                                    onClick={onAdd}
                                />
                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="My Profile"
                                    onClick={onAdd}
                                />
                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={loginModal.onOpen}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={registerModal.onOpen}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu;