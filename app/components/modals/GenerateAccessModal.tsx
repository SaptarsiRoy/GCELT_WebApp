'use client'
// icons
import { HiOutlineTicket } from "react-icons/hi";
import { Copy, CopyCheck } from "lucide-react"

// Global imports
import axios from "axios";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Local imports
// Components
import { Button } from '@/app/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { useGenerate } from "@/hooks/useGenerate";
import { Modal } from "@/app/components/customUi/modal";
import prismadb from "@/lib/prismadb";
// Validation with zod for registerschema , only works with signup schema
const accessCodeSchema = z.object({
    code: z.string().min(10), //.optional().transform(e => e === "" ? undefined : e) , // atleast 3 character is required to properly name our store
});


// The main Component
const GenerateAccessModal = () => {
    const [data, setData] = useState<any>([]);   
    const [isLoading, setIsLoading] = useState<any>(false);

    // const fetchData = async () => {
    //     const result = await prismadb.studentCard.findMany();
    //     return result;
    // }  

    // useEffect(() => {
    //     fetchData()
    //     .then((result) => {
    //         setData(result);
    //     })
    // },[])

    // useEffect(() => {
    //     data ? console.log(data) : null;       
    //     setIsLoading(false);
    // },[data])

    const accessModal = useGenerate();
    // To maintain session as need to redirect when singin process is done 
    const router = useRouter();
    // state to control Loading condition  , disable trigger when so submission take place

    const [copied, setCopied] = useState(false);
    const [children, setInputValue] = useState('');
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
    };

    // if we authenticated to our session then show main page or stay in current page of login
    // useEffect(() => {
    //     if (session?.status === 'authenticated') {
    //         router.push('/')
    //     }
    // }, [session?.status, router]);

    // useform function provided by react-hook-form
    const form = useForm<z.infer<typeof accessCodeSchema>>({
        resolver: zodResolver(accessCodeSchema),
        defaultValues: {
            code: "",
        },
    })

    //The main onSubmit function triggers when continue button clicked
    const onSubmit = async (data: z.infer<typeof accessCodeSchema>) => {
        setIsLoading(true);


        // //NextAuth SignIN
        // console.log('Inside Login')
        // signIn('credentials', {
        //     ...data,
        //     redirect: false,
        // })
        //     .then((callback) => {
        //         if (callback?.ok) {
        //             toast.success('Logged in');
        //             //To check the url's storeid if present inside datanase and if present then fetch it
        //             accessModal.onClose();
        //             router.refresh()
        //         }

        //         if (callback?.error) {
        //             toast.error(callback.error);
        //         }
        //     })
        //     .finally(() =>
        //         setIsLoading(false)
        //     )


    }


    return isLoading ? <h1>Ruko zara sabr karo...</h1> : (

        <Modal
            title="Access Code"
            description="This is a Secret Access Code generated for Upgrading Roles. Don't Forward to Unusual Users"
            isOpen={accessModal.isOpen}
            onClose={accessModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                {accessModal.role === 'admin' ? (
                    <>
                        <div className="flex space-x-2 items-center">
                            <Input value={children} readOnly className="w-full relative outline-none focus:outline-transparent" />
                            <Button onClick={handleCopyToClipboard} variant="secondary"
                                size="sm" className="shrink-0 absolute right-6 ">
                                Copy {copied ? <CopyCheck className="ml-2 text-green-500" /> : <Copy className="ml-2" />}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Form {...form} >
                            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Access Code</FormLabel>
                                            <FormControl>
                                                {/* Spread onBlur , onChange , value , name , ref by using ...field , and thus we handle all those fields*/}
                                                <Input type="email" placeholder="Enter Your Access Code Here" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-2 space-x-2 w-full flex justify-end">
                                    <Button className="flex flex-row gap-3 font-bold" type="submit" disabled={isLoading}><HiOutlineTicket size={18} />Continue</Button>

                                </div>
                            </form>
                        </Form>
                    </>
                )}

            </div>
        </Modal>

    )
}
export default GenerateAccessModal;