import { Toaster } from 'sonner';
import { FormProfile } from './FormProfile';

export default function ProfilePage() {
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="max-w-4xl space-y-8 text-white">
        <h1 className="text-3xl font-bold">Profile</h1>

        {/* CARD */}
        <FormProfile />
      </div>
    </>
  );
}
