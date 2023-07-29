'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";
import { useClickOutside } from "@/app/hooks/useClickOutside";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  justify?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  footer, 
  disabled,
  secondaryAction,
  secondaryActionLabel,
  justify,
}) => {
  //Check whether Modal is open for this state is   
  const [showModal, setShowModal] = useState(isOpen);
  // On clicking outside , this function Collapse the Modal
  const modalref =  useClickOutside(()=>{
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }); 

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);


  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div 
        className={`
          ${justify}
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0           
          outline-none 
          focus:outline-none
          ${justify==="justify-center"?'bg-neutral-800/70':'bg-neutral-700/20'}
          z-50 
        `}
      >
        <div  ref={modalref} className={`
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          ${justify==="justify-center"?'mx-auto':''} 
          h-full 
          lg:h-auto
          md:h-auto
          `}
        >
          {/*content*/}
          <div className={`
            translate
            duration-300
            h-full
            ${justify==="justify-center"? (showModal ? 'translate-y-0' : 'translate-y-full')  : (showModal ?'translate-x-0' : 'translate-x-full')}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              dark:bg-zinc-950
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                
                <div className="text-2xl font-semibold">
                  {title}
                </div>
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                    text-red-500
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={20}/>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div 
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      outline
                    />  
                  )}
                  <Button 
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
