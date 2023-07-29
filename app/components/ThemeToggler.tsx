"use client"
import { PiSunBold } from "react-icons/pi";
import { BsMoonStars } from "react-icons/bs";

import { useTheme } from 'next-themes';
import { useState , useEffect } from "react";

const ThemeToggler = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted , setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if(!mounted){
        return null; // wait for mount before rendering anything else.
    }


    return(
        <button className="rounded-lg p-2 transition 
        border-[1px] dark:border-neutral-600
        dark:hover:bg-zinc-900  
        font-bold
        text-purple-800
        dark:text-amber-500
        "
        type='button'
        aria-label='Toggle Dark Mode'
        onClick={()=> {setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}}>
            { resolvedTheme === 'dark' ? (
                <PiSunBold size={18} className="text-amber-500"/>
            ) : (
                <BsMoonStars size={18} className="text-purple-800"/>
            )}
        </button>
    )
} 
export default ThemeToggler;