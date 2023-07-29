'use client';

import { BsSliders } from "react-icons/bs";
import Select , { DropdownIndicatorProps, GroupBase, components } from 'react-select'

import useDropdown from '@/app/hooks/useDropdowm';
import { JSX } from "react";

const Filter = [
  {
      label: 'Name',
      description: 'Search by Name',
  },
  {
      label: 'Roll No',
      description: 'Search by Roll Number',
  },
  {
      label: 'Registration No',
      description: 'Search by Registration Number'
  },
]

export type DropdownSelectValue = {
  label: string;
  value: string
}

interface DropdownSelectProps {
  value?: DropdownSelectValue;
  placeholder?: string;
  onChange: (value: DropdownSelectValue) => void;
}

const DropdownIndicator = (props: JSX.IntrinsicAttributes & DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>) => {
    return (
      <components.DropdownIndicator {...props}>
        <BsSliders 
        size={16}/>
      </components.DropdownIndicator>
    );
  };

const FilterSelect: React.FC<DropdownSelectProps> = ({
  value,
  placeholder,
  onChange
}) => {
  const { getAll } = useDropdown(Filter);


  return ( 
    
    <div>
      <Select
        placeholder= {placeholder || "Select"}
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as DropdownSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3 absolute z-50">
            <div>{option.icon}</div>
            <div>
              {option.label},
              {/* <span className="text-neutral-500 ml-1">
                {option.region}
              </span> */}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'relatove p-1  border-1 rounded-full shadow-sm hover:border-1',
          input: () => 'text-base',
          option: () => 'text-base'
        }}
        components={{ DropdownIndicator }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#c3a3f7'
          }
        })}
      />
    </div>
   );
}
 
export default FilterSelect;