// icons
import {
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
    TbHexagonNumber4,
    TbHexagonLetterM,
} from "react-icons/tb";
import {PiGraduationCapDuotone} from "react-icons/pi"


// list for filter
export const categories = [
    {
        label: "1st Year",
        icon: TbHexagonNumber1,
    },
    {
        label: "2nd Year",
        icon: TbHexagonNumber2,
    },
    {
        label: "3rd Year",
        icon: TbHexagonNumber3,
    },
    {
        label: "4th Year",
        icon: TbHexagonNumber4,
    },
    {
        label: "MTech",
        icon: TbHexagonLetterM,
        // description: "This property is in the countryside!",
    },
    {
        label:'Alumn',
        icon:PiGraduationCapDuotone,
    }
];

export const SearchFilter = [
    { value: 'name',
      label: 'Name',
    }, 
    {   value:'email',
        label: 'email',
    }, 
    {   value:'rollno',
        label: 'RollNo',
    },
    {   value:'registrationno',
        label: 'RegistrationNo',
    },
    {   value:'department',
        label: 'Department',
    }, 
    {   value:'qualification',
        label:'Qualification',
    },    
  ];