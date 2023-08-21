'use client';

//icons
import { MdAlternateEmail, MdOutlineCalendarMonth, MdKeyboardBackspace } from "react-icons/md"
import { HiOutlineUser, HiOutlineDocumentSearch, HiOutlineClock } from "react-icons/hi"
import { Tb123 } from "react-icons/tb"
import { BsLinkedin, BsGithub, BsMedium } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { PiGraduationCapDuotone, PiWarningOctagonBold } from "react-icons/pi";
import { VscVerifiedFilled } from "react-icons/vsc";

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
import { SafeListing, SafeUser } from "@/app/types";

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


const editProfileSchema = z.object({
    imageSrc: z.string().url().optional(),
    Name: z.string().min(3), //.optional().transform(e => e === "" ? undefined : e) , // atleast 3 character is required to properly name our store
    email: z.string().email(),
    RollNo: z.coerce.number().min(11),
    RegistrationNo: z.coerce.number().min(16),
    Year: z.coerce.number().min(4),
    Semester: z.string().min(1),
    Stream: z.string({
        required_error: "Please select Stream You are Enrolled in.",
    }),
});

interface ProfileClientProps {
    Studentlist: SafeListing;
    currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({
    Studentlist,
    currentUser
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            imageSrc: Studentlist.imageSrc,
            Name: Studentlist.Name,
            email: Studentlist.email,
            RollNo: Number(Studentlist.RollNo),
            RegistrationNo: Number(Studentlist.RegistrationNo),
            Year: Number(Studentlist.Year),
            Semester: Studentlist.Semester,
            Stream: Studentlist.Stream,
        },
    })
    const Stream = form.watch('Stream');
    const imageSrc = form.watch('imageSrc');

    // const setCustomValue = (id: string, value: any) => {
    //     form.setValue(id, value, {
    //         shouldDirty: true,
    //         shouldTouch: true,
    //         shouldValidate: true
    //     })
    // }
    const id:String = Studentlist.id;

    const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
        setIsLoading(true);
        await axios.post(`/api/listings/student/edit/${Studentlist?.id}`, data)
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
                                    <Avatar className="w-48 h-48 aspect-square">
                                        <AvatarImage src={imageSrc} />
                                        <AvatarFallback>ST</AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col gap-3 ml-5 w-1/2">
                                        <span className="flex flex-row gap-3 ">
                                            <Button variant="destructive" onClick={() => router.push('/')}
                                                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium  transition duration-300 ease-out border-2 dark:border-red-900 shadow-md group"
                                                disabled={isLoading}
                                            >
                                                <span className="absolute inset-100 flex items-center justify-center w-full h-full text-white duration-300 translate-x-full bg-red-600 group-hover:translate-x-0 ease"><MdKeyboardBackspace size={26} /></span>
                                                <span className="absolute flex items-center justify-center w-full h-full  transition-all duration-300 transform group-hover:-translate-x-full ease">Back</span>
                                                <span className="relative invisible">Back</span>
                                            </Button>
                                            <Button className="w-2/3 rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white transition-all ease-out duration-300"
                                                type="submit" disabled={isLoading} >
                                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" />
                                                Update
                                            </Button>
                                        </span>
                                        {Studentlist.verified ? (
                                            <div className="rounded-md text-green-500 dark:text-green-600 flex gap-2 text-lg items-center">
                                                <VscVerifiedFilled size={28} /> Verified Student
                                            </div>
                                        ) : (
                                            <div className="rounded-md text-red-600 dark:text-red-700 flex gap-2 text-lg items-center">
                                                <PiWarningOctagonBold /> Need Verification
                                            </div>
                                        )}
                                    </div>

                                </div>

                                {/*  Area for Social Accounts Details and inputs */}
                                <Heading
                                    heading1="Your Social Handles"
                                    subtitle="Make Changes to Update Your Profile's Social Handles"
                                />


                            </div>
                            {/* End of Social Account Section  */}


                            <div className="order-first mb-10 md:order-last md:col-span-4 ">

                                {/* Div for Personal Important Details */}
                                <div className="flex flex-col gap-2">
                                    <Heading
                                        title="Your Personal Profile"
                                        subtitle="Make Changes to Update Your Profile's Academic Details"
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex gap-3 items-center"><HiOutlineUser size={16} />Name</FormLabel>
                                                <FormControl>
                                                    {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                    <Input placeholder="Name" {...field} disabled={isLoading}/>
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
                                    <div className="flex flex-row gap-4">
                                        <FormField
                                            control={form.control}
                                            name="Year"
                                            render={({ field, formState }) => (
                                                <FormItem className="w-1/2">
                                                    <FormLabel className="flex gap-2 items-center"><MdOutlineCalendarMonth size={18} />Year of Joining</FormLabel>
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
                                            name="Semester"
                                            render={({ field }) => (
                                                <FormItem className="w-1/2">
                                                    <FormLabel className="flex gap-2 items-center"><HiOutlineClock size={18} />Semester</FormLabel>
                                                    <FormControl>
                                                        {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                        <Input placeholder="Name" {...field} disabled={isLoading}/>
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
                                                        <SelectItem value="Computer Science Engineering">Computer Science and Engineering</SelectItem>
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

export default ProfileClient;
