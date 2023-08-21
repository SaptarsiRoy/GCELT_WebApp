'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbCameraPlus } from 'react-icons/tb'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

declare global {
    var cloudinary: any
}

const uploadPreset = "gktjrrsb";

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void;
    value: string | undefined ;
    justify_place: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    value,
    justify_place,
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div className={`flex
                    flex-col
                    ${justify_place}`}>
                        <div
                            aria-disabled = {disabled} 
                            onClick={() => open?.()}
                            className="
                            w-48
                            h-48  
                            relative
                            cursor-pointer
                            hover:opacity-70
                            dark:opacity-70
                            dark:hover:opacity-100
                            transition
                            border-dashed 
                            border-2 
                            rounded-full                            
                            border-neutral-300
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                            text-neutral-600
                        "
                        >
                            <TbCameraPlus
                                size={40}
                            />
                            <div className="font-semibold text-base">
                                Click to upload
                            </div>
                            {value && (
                                <Avatar className="absolute w-48 h-48 aspect-square overflow-hidden">
                                    <AvatarImage src={value} className="object-cover"/>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;