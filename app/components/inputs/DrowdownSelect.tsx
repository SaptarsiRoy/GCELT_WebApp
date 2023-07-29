'use client';

import Select from 'react-select'

import useDropdown from '@/app/hooks/useDropdowm';

const stream = [
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
]

export type DropdownSelectValue = {
  label: string;
  value: string
}

interface DropdownSelectProps {
  value?: DropdownSelectValue;
  placeholder?: string;
  control_style?: string;
  onChange: (value: DropdownSelectValue) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  value,
  placeholder,
  control_style,
  onChange
}) => {
  const { getAll } = useDropdown(stream);


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
          flex flex-row items-center gap-3">
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
          control: () => `${control_style}`,
          input: () => 'text-base',
          option: () => 'text-base'          
        }}
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black dar:bg-neutral-800',
            primary25: '#c3a3f7'
          }
        })}
      />
    </div>
   );
}
 
export default DropdownSelect;