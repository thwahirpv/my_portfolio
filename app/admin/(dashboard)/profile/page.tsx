import { getProfile } from '@/actions/profile';
import { ProfileForm } from '@/app/admin/_components/profile-form';

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Profile</h1>
      <ProfileForm initialData={profile || null} />
    </div>
  );
}
