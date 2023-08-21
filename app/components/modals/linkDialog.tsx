'use client';

import { useState } from "react";
//icons
import { Copy, CopyCheck } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface ModalProps {
    title: string;
    description: string;
    triggerbutton?: string;
    icons?: any;
    isOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
};

export const LinkDialog: React.FC<ModalProps> = ({
    title,
    description,
    triggerbutton,
    icons,
    onClose,
    children

}) => {
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(`${children}`);
        setCopied(true);
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="xs" variant="ghost" className="m-0 p-0 hover:bg-transparent">{icons} {triggerbutton}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2 items-center">
                    <Input value={`${children}`} readOnly className="w-full relative outline-none focus:outline-transparent" />
                    <Button onClick={handleCopyToClipboard} variant="secondary" 
                            size="sm" className="shrink-0 absolute right-6 ">
                        Copy {copied? <CopyCheck className="ml-2 text-green-500"/> : <Copy className="ml-2" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}