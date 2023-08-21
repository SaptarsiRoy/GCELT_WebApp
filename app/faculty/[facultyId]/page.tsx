
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFacultyById from "@/app/actions/getFacultyById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ProfileClient from "./ProfileClient";

interface IParams {
  facultyId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

  const facultyListing = await getFacultyById(params);
  const currentUser = await getCurrentUser();

  if (!facultyListing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ProfileClient
        FacultyList={facultyListing}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ProfilePage;