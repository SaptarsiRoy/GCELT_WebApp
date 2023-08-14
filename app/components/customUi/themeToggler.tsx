"use client"

//icons
import { PiSunBold } from "react-icons/pi";
import { BsMoonStars } from "react-icons/bs";

//Global imports
import { useTheme } from 'next-themes';
import { useState , useEffect } from "react";

//Local imports
import { Button } from "@/app/components/ui/button"

export function ThemeModeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted , setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if(!mounted){
        return null; // wait for mount before rendering anything else.
    }


    return(
      <Button variant="outline" size="icon" className="rounded-lg p-2 transition 
        border-[1px] dark:border-neutral-600
        dark:bg-gray-800
        dark:hover:bg-slate-900  
        font-bold
        text-purple-800
        dark:text-amber-500
        "        //drop-shadow-md
        aria-label='Toggle Dark Mode'
        onClick={()=> {setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}}>
            { resolvedTheme === 'dark' ? (
                <PiSunBold size={18} className="text-amber-500"/>
            ) : (
                <BsMoonStars size={18} className="text-purple-800"/>
            )}
        </Button>
    )
} 


// <Button variant="outline" size="icon">
// <PiSunBold className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
// <BsMoonStars  className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
// <span className="sr-only">Toggle theme</span>
// </Button>