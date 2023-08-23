// control open and close of register modals
import { create } from 'zustand';

interface GenerateModalStore {
  isOpen: boolean;
  role : string | any;
  onOpen: (role: string | any ) => void;
  onClose: () => void;
}

export const useGenerate = create<GenerateModalStore>((set) => ({
  isOpen: false,
  role:null,
  onOpen: (role) => set({ isOpen: true, role }),
  onClose: () => set({ isOpen: false, role:null })
}));