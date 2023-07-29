
import getCurrentUser from "@/app/actions/getCurrentUser";
import getStudentById from "@/app/actions/getStudentById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ProfileClient from "./ProfileClient";

interface IParams {
  studentId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

  const listing = await getStudentById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ProfileClient
        listing={listing}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ProfilePage;