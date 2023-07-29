'use client';

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import AddStudentModal from "../components/modals/AddStudentModal";
// import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <AddStudentModal />
      {/* <RentModal /> */}
    </>
   );
}
 
export default ModalsProvider;