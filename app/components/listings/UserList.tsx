'use client';

//icons
import { MdAlternateEmail, MdOutlineCalendarMonth } from "react-icons/md"
import { HiOutlineUser, HiOutlineBookOpen } from "react-icons/hi"
import { HiBadgeCheck, HiOutlineClock } from "react-icons/hi";
import { VscVerifiedFilled } from "react-icons/vsc";


import Image from "next/image";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo ,useState } from "react";

import {
    SafeUser
} from "@/app/types";

import Button from "../Button";
import ClientOnly from "../ClientOnly";
import getYear from "@/app/actions/getYear";
import Avatar from "../Avatar";

interface ListingCardProps {
    data: SafeUser;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const UserList: React.FC<ListingCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {

    const [assignRoleId, setAssignRoleId] = useState("");
    const router = useRouter();


    const onAssign = useCallback(
        (id: string , role:string) => {
          setAssignRoleId(id);
          const data ={ role };
          console.log(data);
          // Request
          axios
            .post(`/api/role/${id}`, data)
            .then(() => {
              toast.success("Successfully Role assigned to user ");
              router.refresh();
            })
            .catch((error) => {
              toast.error(error?.response?.statusText);
              console.error(error);
            })
            .finally(() => {
            setAssignRoleId("");
            });
        },
        [router]
      );


    return (
        <div className="col-span-1 cursor-pointer group pt-3">
            {(currentUser?.role === 'admin') &&
                <div
                    className="
                        w-full
                        p-3
                        border-[3px] 
                        dark:border-[1px]
                        dark:border-neutral-600
                        dark:bg-zinc-800
                        grid
                        grid-cols-12
                        gap-2
                        rounded-xl
                        shadow-lg
                        "
                >
                    <span className="ml-3"><Avatar src={data?.image} /></span>
                    <div className="col-span-3 flex flex-row justify-start gap-2 text-base">
                        <HiOutlineUser size={24} />
                        <span className="text-ellipsis overflow-hidden font-semibold text-base">
                            {data?.name}
                        </span>
                    </div>
                    <div className="col-span-3 flex flex-row gap-2 text-base">
                        <MdAlternateEmail size={24} />
                        <span className=" text-ellipsis overflow-hidden font-semibold text-base">
                            {data?.email}
                        </span>
                    </div>
                    <div className="col-span-2 flex flex-row  gap-2 text-base">
                        <HiOutlineClock size={24} />
                        <span className=" truncate font-semibold text-base">
                            {data?.createdAt}
                        </span>
                    </div>
                    <div className="col-span-3 flex flex-row gap-0 text-base">
                        <Button
                            outlinecolor='border-neutral-400'
                            label="Student"
                            outline={'student'===data.role? false: true}
                            rounded='rounded-l-full'
                            hover='hover:bg-violet-700 hover:border-violet-700'
                            small
                            onClick={() => onAssign(data.id , 'student')}
                        />
                        <Button
                            outline={'teacher'===data.role? false: true}
                            outlinecolor='border-neutral-400'
                            label="Teacher"
                            rounded='rounded-none'
                            hover='hover:bg-violet-700 hover:border-violet-700'
                            small
                            onClick={() => onAssign(data.id , 'teacher')}
                        />
                        <Button
                            outline={'admin'===data.role? false: true}
                            outlinecolor='border-neutral-400'
                            label="Admin"
                            rounded='rounded-r-full'
                            hover='hover:bg-violet-700 hover:border-violet-700'
                            small
                            onClick={() => onAssign(data.id , 'admin')}
                        />
                    </div>
                </div>}
        </div>
    );
}

export default UserList;