// Local imports
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
// import getNotVerifiedUser, { NotVerifiedListingParams } from "@/app/actions/getNotVerifiedUser";


interface VerifyProps {
  // searchParams: NotVerifiedListingParams
};

const VerifyPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  // const registration = await getNotVerifiedUser(searchParams);
  // if (registration.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="No Students found"
  //         subtitle="Looks like No Registration recently."
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <ClientOnly>
      <EmptyState
          title="Page under Development"
          subtitle="Wait for Further Updates"
        />
    </ClientOnly>
  );
}
 
export default VerifyPage;