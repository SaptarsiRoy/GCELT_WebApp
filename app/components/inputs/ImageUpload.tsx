'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbCameraPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any
}

const uploadPreset = "gktjrrsb";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    justify_place: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
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
                            <div className=" absolute 
                            w-48
                            h-48
                            rounded-full
                            overflow-hidden
                            ">
                                <Image
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    src={value}
                                    alt="Person"
                                />
                            </div>
                        )}
                    </div>
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;
