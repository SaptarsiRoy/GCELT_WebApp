'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  bgcolor?: string;
  outline?: boolean;
  outlinecolor?: string;
  small?: boolean;
  fontcolor?: string
  icon?: IconType;
  rounded?: string;
  hover?: string;
  selected?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled, 
  bgcolor,
  outline,
  outlinecolor,
  small,
  fontcolor,
  icon: Icon,
  rounded,
  hover,
  selected,

}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed    
        transition
        w-full
        ${outline ? hover? hover:'bg-white dark:bg-zinc-800' : bgcolor? bgcolor : 'bg-violet-700'}
        ${outline ? 'border-black' : outlinecolor ? outlinecolor : 'border-violet-700'}
        ${outline ? 'text-black dark:text-neutral-200' : fontcolor? fontcolor : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px] border-neutral-400' : 'border-2'}
        ${rounded? rounded:'rounded-lg'}
        ${hover? hover:'hover:opacity-80'}    
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
   );
}
 
export default Button;