'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formaticon?: any;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  width?: string;
  small?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formaticon,
  register,
  required,
  errors,
  width,
  small,
}) => {
  return (
    <div className="w-full relative">
      {formaticon && (
        <div className="text-neutral-700  dark:text-neutral-200 absolute top-5 left-2">
          {formaticon}
        </div>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          ${width? width: 'w-full'}
          p-3
          pt-5 
          font-light 
          bg-white 
          dark:bg-zinc-900
          border-2
          dark:border-neutral-600
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formaticon ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black dark:focus:border-white'}
        `}
      />
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-4 
          top-5 
          z-10 
          origin-[0] 
          ${formaticon ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
export default Input;