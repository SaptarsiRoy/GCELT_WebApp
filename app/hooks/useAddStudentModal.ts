// control open and close of register modals
import { create } from 'zustand';

interface StudentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddStudentModal = create<StudentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useAddStudentModal;