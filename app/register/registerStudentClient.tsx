'use client';

//icons
import { MdAlternateEmail, MdLockOutline, MdOutlineCalendarMonth } from "react-icons/md"
import { HiOutlineUser, HiOutlineDocumentSearch } from "react-icons/hi"
import { Tb123 } from "react-icons/tb"
import { BsLinkedin, BsGithub, BsMedium } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { PiGraduationCapDuotone } from "react-icons/pi";

// Global import 
import axios from "axios";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

// types safety
import { SafeUser } from "@/app/types";

//components
import Container from "@/app/components/Container";
import { Input } from "@/app/components/ui/input";
import { Button } from '@/app/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"
import Heading from "@/app/components/ui/Heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import ImageUpload from "@/app/components/modals/ImageUpload";


const studentRegistration = z.object({
    imageSrc: z.string().url().optional(),
    Name: z.string().min(3), //.optional().transform(e => e === "" ? undefined : e) , // atleast 3 character is required to properly name our store
    email: z.string().email(),
    RollNo: z.coerce.number().min(11),
    RegistrationNo: z.coerce.number().min(16),
    Year: z.coerce.number().min(4),
    Stream: z.string({
        required_error: "Please select Stream You are Enrolled in.",
    }).min(10),
});

interface ProfileClientProps {
    currentUser?: SafeUser | null;
}

const RegisterStudentClient: React.FC<ProfileClientProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<z.infer<typeof studentRegistration>>({
        resolver: zodResolver(studentRegistration),
        defaultValues: {
            imageSrc: "",
            Name: "",
            email: String(currentUser?.email),
            RollNo: 0,
            RegistrationNo: 0,
            Year: 1999,
            Stream: "",
        },
    })

    // const setCustomValue = (id: string, value: any) => {
    //     form.setValue(id, value, {
    //         shouldDirty: true,
    //         shouldTouch: true,
    //         shouldValidate: true
    //     })
    // }
    const imageSrc = form.watch('imageSrc');

    const onSubmit = async (data: z.infer<typeof studentRegistration>) => {
        setIsLoading(true);
        await axios.post('/api/listings/student', data)
            .then(() => {
                toast.success('Updated Successful!');
                router.refresh();
                form.reset();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <Container>
            <Form {...form} >
                <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="max-w-screen-lg mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-8 md:gap-10 mt-6">

                            <div className="col-span-4 flex flex-col gap-4 pr-18">

                                {/*  Div for Avatar and Constant Details */}
                                <div className="flex flex-row gap-x-20">
                                    <FormField
                                        control={form.control}
                                        name="imageSrc"
                                        render={({ field, formState }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <ImageUpload
                                                        disabled={isLoading}
                                                        onChange={(url) => field.onChange(url)}
                                                        value={field.value}
                                                        justify_place="justify-center items-center"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex flex-col gap-3 w-1/2">
                                        <span className="flex flex-row gap-3 mb-5">
                                            <Button className="w-2/3 rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white transition-all ease-out duration-300"
                                                type="submit" disabled={isLoading} >
                                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                                Register
                                            </Button>
                                        </span>
                                        <FormField
                                            control={form.control}
                                            name="Year"
                                            render={({ field, formState }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel className="flex gap-2 items-center"><MdOutlineCalendarMonth size={18} />Year of Joining</FormLabel>
                                                    <FormControl>
                                                        {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                        <Input required type="number" {...field} disabled={isLoading}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                </div>

                                {/*  Area for Social Accounts Details and inputs */}
                                <Heading
                                    heading1="Your Social Handles"
                                />


                            </div>
                            {/* End of Social Account Section  */}


                            <div className="order-first mb-10 md:order-last md:col-span-4 ">

                                {/* Div for Personal Important Details */}
                                <div className="flex flex-col gap-2">
                                    <Heading
                                        title="Your Personal Profile"
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex gap-3 items-center"><HiOutlineUser size={16} />Name</FormLabel>
                                                <FormControl>
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <Input type="text" placeholder="Name" {...field} disabled={isLoading}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex gap-3 items-center"><MdAlternateEmail size={16} />Email</FormLabel>
                                                <FormControl>
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <Input type="email" placeholder="johndoe@email.com" {...field} disabled={isLoading}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-row gap-4">
                                        <FormField
                                            control={form.control}
                                            name="RollNo"
                                            render={({ field, formState }) => (
                                                <FormItem className="w-1/2">
                                                    <FormLabel className="flex gap-2 items-center"><Tb123 size={22} />Roll Number</FormLabel>
                                                    <FormControl>
                                                        {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                        <Input required type="number" {...field} disabled={isLoading}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="RegistrationNo"
                                            render={({ field }) => (
                                                <FormItem className="w-1/2">
                                                    <FormLabel className="flex gap-2 items-center"><Tb123 size={22} />Registration Number</FormLabel>
                                                    <FormControl>
                                                        {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                        <Input type="number" {...field} disabled={isLoading}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="Stream"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex gap-2 items-center"><PiGraduationCapDuotone size={18} />Stream</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a verified email to display" {...field} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Computer Science Engineering">Computer Science Engineering</SelectItem>
                                                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                                                        <SelectItem value="Leather Technology">Leather Technology</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/*  End of Profile Section */}
                        </div>
                    </div>
                </form>
            </Form>
        </Container >
    );
}

export default RegisterStudentClient;
