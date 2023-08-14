'use client';

import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/ui/Heading";
import { useTheme } from "next-themes";


const Logo = () => {
    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <div className="flex 
        flex-row 
        items-center 
        justify-between
        gap-2">
            {/* <Link href="/"> */}
            <Image
                onClick={() => router.push('/')}
                className="xs:block  cursor-pointer"
                src={resolvedTheme === 'dark'?"/images/dark_logo.png":"/images/logo.png"}
                height="70"
                width="70"
                alt="Logo"
            />
            {/* </Link> */}
            <Heading
                heading1="Government College Of Engineering"
                heading2="and Leather Technology"
                subtitle="Student Portal"
            />
        </div>
    )
}

export default Logo;