'use client'

import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";
import useAddStudentModal from "@/app/hooks/useAddStudentModal";

import Modal from "./Modal";
import Input from '../inputs/Input';
import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import DropdownSelect from '../inputs/DrowdownSelect';

export let stream = [
  {
      label: 'Computer Science Engineering',
      // icon: TbHexagonNumber1,
      description: 'This property is close to the beach!',
  },
  {
      label: 'Information Technology',
      // icon: TbHexagonNumber2,
      description: 'This property is has windmills!',
  },
  {
      label: 'Leather Technology',
      // icon: TbHexagonNumber3,
      description: 'This property is modern!'
  },
];


enum STEPS {
    BASIC = 0,
    DESCRIPTION = 1,
}

interface AddStudentModalProps{
  isOpen: boolean;
}

const AddStudentModal:React.FC<AddStudentModalProps> = ({
  isOpen
}) => {
    const router = useRouter();
    const addstudentModal = useAddStudentModal();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.BASIC);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            imageSrc: '',
            Name: '',
            email:'',
            RollNo: 1,
            RegistrationNo: '',            
            Year: 2000,
            Semester: '',
            Stream: '',
        }
    });
    const Stream = watch('Stream');
    const imageSrc = watch('imageSrc');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
    
    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.DESCRIPTION) {
          return onNext();
        }
        
        setIsLoading(true);
    
        axios.post('/api/listings', data)
        .then(() => {
          toast.success('Registration Successful!');
          router.refresh();
          reset();
          setStep(STEPS.BASIC)
          addstudentModal.onClose();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })
      }

    const actionLabel = useMemo(() => {
        if (step === STEPS.DESCRIPTION) {
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.BASIC) {
            return undefined
        }

        return 'Back'
    }, [step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                heading1="Provide your Name and Digital Picture"
            />
            <ImageUpload
                onChange={(value) => setCustomValue('imageSrc', value)}
                value={imageSrc}
                justify_place="justify-center items-center"
            />
            <Input
                id="Name"
                label="Enter Student's Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
             <Input
                id="email"
                label="Enter Student's Email Id"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="How would you describe your place?"
              subtitle="Short and sweet works best!"
            />
            <Input
              id="RollNo"
              label="Enter 11 digit Roll Number "
              type="number" 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="RegistrationNo"
              label="Enter 15 digit Registration Number"
              type="number" 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <div className='flex flex-row gap-2'>
            <Input
              id="Year"
              label="Enter Year you Joined"
              type="number" 
              disabled={isLoading}
              register={register}
              errors={errors}              
              required
            />
            <Input
              id="Semester"
              label="CurrentSemester"
              disabled={isLoading}
              register={register}
              errors={errors}              
              required
            />
            </div>
            <DropdownSelect
                value={Stream}   
                placeholder="Select Stream"     
                control_style="p-3 border-2"         
                onChange={(value) => setCustomValue('Stream', value)} 
             />
             
          </div>
        )
      }


    return (
        <Modal
            disabled={isLoading}
            isOpen={addstudentModal.isOpen || isOpen}
            title="Add Student Details"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.BASIC ? undefined : onBack}
            onClose={addstudentModal.onClose}
            body={bodyContent}
            justify="justify-end"
        />
    )
}
export default AddStudentModal;

