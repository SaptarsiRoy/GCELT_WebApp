"use client";
// Global imports
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// Local imports
import { SafeListing, SafeUser } from "@/app/types";
//Components
import Heading from "@/app/components/ui/Heading";
import Container from "@/app/components/Container";
import StudentCard from "@/app/components/customUi/cards/StudentCard";
import { Trash2 } from "lucide-react";




interface TripsClientProps {
  verification: SafeListing[];
  currentUser?: SafeUser | null;
}

const VerificationClient: React.FC<TripsClientProps> = ({
  verification,
  currentUser,
}) => {
  const router = useRouter();
  const [VerifyId, setVerifyId] = useState("");

  const onVerify = useCallback(
    (id: string) => {
      setVerifyId(id);
      // Request
      axios
        .post(`/api/listings/student/${id}`)
        .then(() => {
          toast.success("Student Verfied Successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.statusText);
          console.error(error);
        })
        .finally(() => {
          setVerifyId("");
        });
    },
    [router]
  );


  const onDelete = useCallback(
    (id: string) => {
      setVerifyId(id);
      // Request
      axios
        .delete(`/api/listings/student/${id}`)
        .then(() => {
          toast('Student Deleted!', {icon: <Trash2/>, style: {
            borderRadius: '10px',
            background: '#333',
            color: '#dc2626',
          },});
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.statusText);
          console.error(error);
        })
        .finally(() => {
          setVerifyId("");
        });
    },
    [router]
  );


  return (
    <Container>
      <Heading
        title="Waiting for Verification"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-8
        "
      >
        {verification.map((student: any) => (
          <StudentCard
            key={student.id}
            data={student}
            // student={student}
            actionId={student.id}
            onAction={onVerify}
            onDeletion={onDelete}
            disabled={VerifyId === student.id}
            actionLabel="Verify"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default VerificationClient;
