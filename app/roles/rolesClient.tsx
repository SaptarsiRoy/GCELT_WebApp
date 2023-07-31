"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import UserList from "@/app/components/listings/UserList";

interface RolesClientProps {
  allUsers: SafeUser[];
  currentUser?: SafeUser | null;
}

const RolesClient: React.FC<RolesClientProps> = ({
  allUsers,
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
          mt-3
          flex
          flex-col
          gap-3
        "
      >
        {allUsers.map((user: any) => (
          <UserList
            key={user.id}
            data={user}
            // user={user}
            actionId={user.id}
            onAction={onCancel}
            disabled={deletingId === user.id}
            actionLabel="Verify"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default RolesClient;
