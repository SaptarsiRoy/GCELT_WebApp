'use client';

import { useTheme } from "next-themes";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  const { resolvedTheme, setTheme } = useTheme();
  return ( 
    <Image 
      className="rounded-full" 
      height="30" 
      width="30" 
      alt="Avatar" 
      src={src || (resolvedTheme === 'dark'? '/images/dark_avatar.jpg':'/images/placeholder.jpg')}
    />
   );
}
 
export default Avatar;