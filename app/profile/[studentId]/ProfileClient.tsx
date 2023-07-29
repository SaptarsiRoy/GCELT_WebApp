'use client';

//icons
import { MdAlternateEmail, MdLockOutline, MdOutlineCalendarMonth } from "react-icons/md"
import { HiOutlineUser, HiOutlineDocumentSearch, HiBadgeCheck, HiOutlineClock } from "react-icons/hi"
import { Tb123 } from "react-icons/tb"
import { BsLinkedin, BsGithub, BsMedium } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { PiGraduationCapDuotone } from "react-icons/pi";

// import important libraries
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

// types safety
import { SafeListing, SafeUser } from "@/app/types";

//components
import Container from "@/app/components/Container";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import { useRouter } from "next/navigation";
import DropdownSelect from "@/app/components/inputs/DrowdownSelect";
import Heading from "@/app/components/Heading";

interface ListingClientProps {
    listing: SafeListing;
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            imageSrc: listing.imageSrc,
            Name: listing.Name,
            email: listing.email,
            RollNo: listing.RollNo,
            RegistrationNo: listing.RegistrationNo,
            Year: listing.Year,
            Semester: listing.Semester,
            Stream: listing.Stream,
        }
    });
    const Stream = watch('Stream');
    const imageSrc = watch('imageSrc');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div
                    className="grid grid-cols-1 md:grid-cols-8 md:gap-10 mt-6"
                >
                    <div className="col-span-4 flex flex-col gap-4">
                        <ImageUpload
                            onChange={() => { }}
                            value={imageSrc}
                            justify_place="justify-end"
                        />
                        <Heading
                                title="Your Social Handles"
                                subtitle="Connect Your Social Accounts"
                        />
                        <Input
                            formaticon={<FiPhoneCall size={24} />}
                            id="Phone"
                            label="Phone Number"
                            type="number"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            formaticon={<BsLinkedin size={24} />}
                            id="linkedin"
                            label="LinkedIn Account"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            formaticon={<BsGithub size={24} />}
                            id="Github"
                            label="Github Account"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            formaticon={<SiLeetcode size={24} />}
                            id="LeetCode"
                            label="LeetCode Account"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                    <div className="order-first mb-10 md:order-last md:col-span-4 ">
                        <div className="flex flex-col gap-2">
                            <Heading
                                title="Your Personal Profile"
                                subtitle="Make Changes to Update Your Profile"
                            />
                            <Input
                                formaticon={<HiOutlineUser size={24} />}
                                id="Name"
                                label="Student's Name"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                            />
                            <Input
                                formaticon={<MdAlternateEmail size={24} />}
                                id="email"
                                label="Email Id"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                            />
                            <span className="flex flex-row gap-3">
                                <Input
                                    formaticon={<Tb123 size={24} />}
                                    id="RollNo"
                                    label="Roll Number "
                                    type="number"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <Input
                                    formaticon={<Tb123 size={24} />}
                                    id="RegistrationNo"
                                    label="Registration Number"
                                    type="number"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </span>
                            <span className="flex flex-row gap-3">
                                <Input
                                    formaticon={<MdOutlineCalendarMonth size={24} />}
                                    id="Year"
                                    label="Year of Joining"
                                    type="number"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <Input
                                    formaticon={<HiOutlineUser size={24} />}
                                    id="Semester"
                                    label="CurrentSemester"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </span>
                            <DropdownSelect
                                value={Stream}
                                placeholder="Select Stream"
                                control_style="p-3 border-2"
                                onChange={() => { }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;
