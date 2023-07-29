'use client';
import { BiSearch } from 'react-icons/bi';

const NavMenu = () => {
    return (
        <div
            onClick={() => { }}
            className="
        w-full 
        md:w-auto 
        py-2 
      "
        >
            <div className="
                    flex 
                    flex-row 
                    items-center 
                    justify-between
                    "
                >
                <div
                    className="
                        text-base 
                        font-semibold 
                        px-6
                        transition 
                        cursor-pointer
                    "
                    // onClick={() => router.push('/reservations')
                >
                    Student
                </div>
                <div
                    className="
                        hidden 
                        sm:block 
                        text-base 
                        font-semibold 
                        px-6 
                        border-x-[1px] 
                        flex-1 
                        text-center
                        transition 
                        cursor-pointer
                    "
                    // onClick={() => router.push('/reservations')
                    >
                    Routine
                </div>
                <div
                    className="
                    hidden 
                    sm:block 
                    text-base 
                    font-semibold 
                    px-6 
                    flex-1 
                    text-center
                    transition 
                    cursor-pointer

                        "
                        // onClick={() => router.push('/reservations')
                    >
                    Exam
                </div>
            </div>
        </div>
    )
}

export default NavMenu;