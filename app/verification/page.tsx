// Local imports
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getStudents, { StudentListingParams } from "@/app/actions/getStudents";

import VerificationClient from "./VerificationClient";





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

  const registration = await getStudents(searchParams);
  if (registration.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Students found"
          subtitle="Looks like No Registration recently."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <VerificationClient
        verification={registration}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default VerifyPage;
