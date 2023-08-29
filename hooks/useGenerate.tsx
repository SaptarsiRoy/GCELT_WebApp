// control open and close of register modals
import { create } from 'zustand';
import axios from "axios";
import { generateAccessCode } from '@/lib/generateAccessCode';

interface GenerateModalStore {
  isOpen: boolean;
  role : string | any;
  accessCode : string;
  ExpiredAt: string | any;
  onOpen: (role: string | any ) => void;
  onClose: () => void;
}

export const useGenerate = create<GenerateModalStore>((set) => ({
  isOpen: false,
  role:null,
  accessCode: "",
  ExpiredAt: null,
  onOpen: async (role) => {
    //get the data from referral code collection when we open the model
    // var result : any;
    // if(role === 'admin'){
    //   result = (await axios.get('/api/refferalcode')).data;
    // }
    const result = (await axios.get('/api/refferalcode')).data;
    set({ isOpen: true, role , accessCode: result.accessCode, ExpiredAt: result.codeExpiration });
  },
  onClose: () => set({ isOpen: false, role:null })
}));