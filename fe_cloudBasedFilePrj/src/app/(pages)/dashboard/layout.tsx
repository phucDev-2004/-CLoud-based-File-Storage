'use client';
import { fetchInfoUser } from '@/api/user.api';
import Sidebar from '@/app/components/sidebar/SideBar';
import { createContext, useEffect, useState } from 'react';
export const DashboardContext = createContext<{
  refreshProfile: () => Promise<void>;
} | null>(null);
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [infoUser, setInfoUser] = useState<any>(null);

  const refreshProfile = async () => {
    const data = await fetchInfoUser();
    // console.log(data);
    setInfoUser(data);
  };

  useEffect(() => {
    refreshProfile();
  }, []);
  return (
    <>
      <DashboardContext.Provider value={{ refreshProfile }}>
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#1e3a8a] to-[#0ea5e9]">
          <Sidebar infoUser={infoUser} />

          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-10">{children}</div>
          </main>
        </div>
      </DashboardContext.Provider>
    </>
  );
}
