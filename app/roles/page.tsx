
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllUser, { StudentListingParams } from "@/app/actions/getAllUsers";

import RolesClient from "./rolesClient";

interface VerifyProps {
  searchParams: StudentListingParams
};

const VerifyPage = async ({ searchParams }: VerifyProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !=="admin") {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const allUsers = await getAllUser(searchParams);
  if (allUsers.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Users found"
          subtitle="Looks like No Registration recently."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RolesClient
        allUsers={allUsers}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default VerifyPage;
