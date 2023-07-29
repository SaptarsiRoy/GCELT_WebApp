//https://vscode.dev/github/batuhanbilginn/search-nextjs13/tree/main/app/server/search-params

"use client";
import { Fragment } from "react";
import{
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
    TbHexagonNumber4,
} from "react-icons/tb";
import { BsSliders } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import MenuItem from "./MenuItem";
import getYear from "@/app/actions/getYear";

export const categories = [
    {
        label: "1st Year",
        icon: TbHexagonNumber1,
        description: "This property is close to the beach!",
    },
    {
        label: "2nd Year",
        icon: TbHexagonNumber2,
        description: "This property is has windmills!",
    },
    {
        label: "3rd Year",
        icon: TbHexagonNumber3,
        description: "This property is modern!",
    },
    {
        label: "4th Year",
        icon: TbHexagonNumber4,
        description: "This property is in the countryside!",
    },
];

const selectOptions: string[] = ["Name", "RollNo", "RegistrationNo", "email"];

const Categories = () => {
    const router = useRouter();
    // Holds the default path name
    const params = useSearchParams();
    const YearParams = params?.get("Year");
    let [Year, Sem] = getYear(Number(YearParams));
    Year = Year + " Year";
    const pathname = usePathname();
    const isMainPage = pathname === "/";

    // used to Toggle the openning Clossing of
    const [isExpand, setIsExpand] = useState(false);
    const menuref = useClickOutside(() => setIsExpand(false));
    const toggleExpand = useCallback(() => {
        setIsExpand((value) => !value);
    }, []);

    if (!isMainPage) {
        return null;
    }

    ///Start of Search Functionality
    const [inputValue, setInputValue] = useState<string>("");
    const [filterValue, setfilterValue] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>("");
    const [mounted, setMounted] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    //Below functions says if there is debouncedvalue then set Params and if no deboundcedValue then delete params
    const handleSearchParams = useCallback(
        (debouncedValue: string) => {
            let params = new URLSearchParams(window.location.search);
            if (debouncedValue.length > 0) {
                params.set("Name", debouncedValue);
            } else {
                params.delete("Name");
            }
            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`);
            });
        },
        [pathname, router, filterValue]
    );

    // EFFECT: Set Initial Params `${filterValue}`
    // When Someone Share the link , we need to save the params and save it as input value
    // The whole thing is two way connection: set params with search keyword
    // and then set search key word with search param value
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.forEach((value, key) => {
            console.log(value, key);
            if(selectOptions.includes(key))
            {
                const searchQuery = params.get(key) ?? "";
                setfilterValue(key);
                setInputValue(searchQuery);
            } 
        });
    }, []); // Pass this empty string so that we can run it once for intital stage only
    // when we mounting a component

    // EFFECT: Set Mounted
    //To check whether have debounced value and if mounted component or not , if not then setmounted as true
    useEffect(() => {
        if (debouncedValue.length > 0 && !mounted) {
            setMounted(true);
        }
    }, [debouncedValue, mounted]);

    // EFFECT: Debounce Input Value
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [inputValue]);

    // EFFECT: Search Params
    //if have mounted value true then only run search handlesearchParams
    useEffect(() => {
        if (mounted) handleSearchParams(debouncedValue);
    }, [debouncedValue, handleSearchParams, mounted]);

    ///End of Search Functionality

    return (
        <Container>
            <div
                className="
                    pt-2 flex flex-row items-center justify-between
                    overflow-x-auto z-10
                    "
            >
                {/* Mapping the yearwise categories  */}
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={Year === item.label}
                    />
                ))}

                {/* Search Bar */}
                <div
                    className=" 
                        w-full md:w-1/2  flex flex-row items-center 
                        gap-3 relative z-100
                        "
                >
                    <div
                        onClick={toggleExpand}
                        className="border-[1px] 
                            dark:border-neutral-600
                            w-full md:w-1/5 py-2 
                            rounded-full 
                            shadow-sm 
                            hover:shadow-md 
                            dark:hover:bg-neutral-800
                            transition 
                            cursor-pointer
                            flex flex-row items-center gap-3
                            relative                            
                            z-0
                        "
                    >
                        <div className="px-2 font-light text-neutral-600 dark:text-neutral-400 text-base">
                            {filterValue ? `${filterValue}` : "Select"}
                        </div>
                        <div className=" m-1 absolute right-3 bg-white dark:bg-zinc-900 ">
                            <BsSliders size={18} />
                        </div>

                        {/* <FilterSelect 
                        placeholder="select"
                        onChange={() => {}}/> */}
                    </div>

                    <div
                        className="border-[1px] 
                            dark:border-neutral-600
                            w-full 
                            md:w-4/5
                            py-2 
                            dark:hover:bg-neutral-800
                            rounded-full 
                            shadow-sm 
                            hover:shadow-md 
                            transition 
                            cursor-pointer
                            flex flex-row items-center gap-3
                            relative
                            z-0
                        "
                    >
                        <input
                            id="Search bar"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            placeholder="Search Here "
                            type="Search bar"
                            className={`
                            peer
                            w-full
                            px-4
                            font-light 
                            bg-white 
                            dark:bg-transparent
                            rounded-full
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                        `}
                        />
                        <div
                            className="
                            p-2 
                            bg-violet-700 
                            rounded-full 
                            text-white
                            absolute
                            right-3
                            "
                        >
                            <BiSearch size={18} />
                        </div>
                    </div>
                </div>
                {isExpand && (
                    <div
                        ref={menuref}
                        className="
                                    absolute 
                                    rounded-xl 
                                    shadow-md                                    
                                    w-[10vw]
                                    md:w-[10vw] 
                                    bg-white 
                                    dark:bg-neutral-800
                                    overflow-hidden  
                                    top-40 
                                    left-1/2
                                    text-sm
                                    z-100
                                    "
                    >
                        <div className="flex flex-col cursor-pointer">
                            {selectOptions.map((item, index) => (
                                //If you want to pass key to a Fragment, you can’t use the <>...</> syntax. You have to explicitly import Fragment from 'react' and render <Fragment key={yourKey}>...</Fragment>.
                                <Fragment key={index}><MenuItem
                                    // key={index}
                                    label={item}
                                    onClick={() => {
                                        console.log(item);
                                        setfilterValue(item);
                                    } } /><hr /></Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Categories;
