"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import StudentCard from "@/app/components/listings/StudentCard";

interface TripsClientProps {
  verification: SafeListing[];
  currentUser?: SafeUser | null;
}

const VerificationClient: React.FC<TripsClientProps> = ({
  verification,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      // Request
      axios
        .post(`/api/listings/${id}`)
        .then(() => {
          toast.success("Student Verfied Successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.statusText);
          console.error(error);
        })
        .finally(() => {
          setDeletingId("");
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
            onAction={onCancel}
            disabled={deletingId === student.id}
            actionLabel="Verify"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default VerificationClient;
