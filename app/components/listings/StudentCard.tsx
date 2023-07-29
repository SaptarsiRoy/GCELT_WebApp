'use client';
import { BsLinkedin, BsGithub, BsMedium } from "react-icons/bs";
import { FiPhoneCall, FiAtSign } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { HiOutlineDocumentSearch, HiBadgeCheck, HiOutlineClock } from "react-icons/hi";
import { VscVerifiedFilled } from "react-icons/vsc";


import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
    SafeListing,
    SafeUser
} from "@/app/types";

import Button from "../Button";
import ClientOnly from "../ClientOnly";
import getYear from "@/app/actions/getYear";

interface ListingCardProps {
    data: SafeListing;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const StudentCard: React.FC<ListingCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {

    const [Year , Sem] = getYear(data?.Year)

    const router = useRouter();


    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId)
        }, [disabled, onAction, actionId]);


    return (
        <div
            className="col-span-1 cursor-pointer group pt-7"
        >
            <div
                className="
                        w-full
                        p-5
                        h-72
                        relative 
                        border-[3px] 
                        dark:border-[1px]
                        dark:border-neutral-600
                        dark:bg-zinc-800
                        flex
                        flex-row
                        gap-3
                        rounded-xl
                        shadow-lg
                        hover:-translate-y-4
                        transition
                        "
            >
                {/* group-hover:scale-125
                    transition */}
                <div className="
                            aspect-square
                            absolute
                            w-24
                            h-24
                            rounded-full
                            overflow-hidden">
                    <Image
                        fill
                        style={{ objectFit: 'cover' }}
                        src={data.imageSrc}
                        alt="Listing"
                    />
                </div>
                <div className="flex flex-col 
                        w-full 
                        absolute 
                        left-[2.3em] 
                        top-[4em]
                        overflow-hidden ">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center gap-1">
                            <span className="bg-purple-200  dark:bg-slate-800 p-1  
                                            font-semibold rounded-md text-purple-600 dark:text-purple-300">
                                <HiOutlineClock size={18} />
                            </span>
                            <div className="font-light text-base">
                                {Year} year
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <span className="bg-purple-200 dark:bg-slate-800 p-1 
                                        font-semibold rounded-md text-purple-600 dark:text-purple-300">
                                <PiGraduationCapDuotone size={18} />
                            </span>
                            <div className="font-light text-base">
                                {Sem} Sem
                            </div>
                        </div>
                    </div>
                </div>
                {(currentUser?.role === 'admin' || currentUser?.id === data.id) && 
                <span className={` absolute 
                            ${data.verified === false ? 'w-28' : 'w-11'}
                            rounded-md
                            right-3
                            flex flex-row gap-2
                            `}>
                    {onAction && actionLabel && (
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}
                        />
                    )}
                    <Button
                        disabled={disabled}
                        small
                        bgcolor="bg-zinc-200 dark:bg-zinc-700"
                        outlinecolor="border-zinc-400 dark:border-zinc-600"
                        fontcolor="dark:text-stone-300 text-stone-500 font-semibold"
                        label="Edit"
                        onClick={() => router.push(`/profile/${data.id}`)}
                    />
                </span>}
                <div className="flex flex-col 
                        w-full 
                        absolute 
                        top-[8em]
                        left-5 
                        overflow-hidden ">
                    <div className="flex flex-row items-center gap-2">
                        <div className="font-bold text-lg">
                            {data?.Name}
                        </div>
                        {data?.verified === true &&
                            <span className="rounded-md text-green-600">
                                < VscVerifiedFilled size={20} />
                            </span>
                        }
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <span className="bg-emerald-100 dark:bg-emerald-950 p-1 rounded-md text-green-600 dark:text-green-300">
                            <FiAtSign size={16} />
                        </span>
                        <div className="font-light dark:font-semibold text-green-600 text-base ">
                            {data.email}
                        </div>
                    </div>
                    <div className="font-semibold pt-2 text-base justify-center">
                        {data.Stream}
                    </div>
                    <div className="font-semibold text-neutral-500 dark:text-neutral-400 text-sm">
                        Roll No: {data?.RollNo}
                        <br />
                        Registration No: {data?.RegistrationNo}
                    </div>
                </div>
                <span className="pt-5 flex flex-col absolute gap-3 right-3 top-[7em] ">
                    <FiPhoneCall size={16} onClick={() => { }} />
                    <BsLinkedin size={16} onClick={() => { }} />
                    <BsGithub size={16} onClick={() => { }} />
                    <SiLeetcode size={16} onClick={() => { }} />
                    <HiOutlineDocumentSearch size={16} onClick={() => { }} />
                </span>
            </div>
        </div>
    );
}

export default StudentCard;