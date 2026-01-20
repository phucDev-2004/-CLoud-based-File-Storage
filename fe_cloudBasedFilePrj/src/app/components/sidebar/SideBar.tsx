'use client';
import Link from 'next/link';
import { Cloud, Folder, User, Settings, Trash2, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { StorageUsage } from './StorageUsage';
import { use, useEffect, useState } from 'react';
import { fetchInfoUser } from '@/api/user.api';

const menus = [
  { label: 'Quản lý file', href: '/dashboard', icon: Folder },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
  { label: 'Cài đặt', href: '/dashboard/settings', icon: Settings },
  { label: 'Thùng rác', href: '/dashboard/trash', icon: Trash2 },
];

export default function Sidebar(props: { infoUser: any }) {
  const pathname = usePathname();
  const route = useRouter();
  const { infoUser } = props;
  // console.log('Sidebar', infoUser);

  const handleLogout = (linkRedirect: string) => {
    const refreshToken = cookieStore.get('refresh_token');

    if (!refreshToken) {
      console.error('Không tìm thấy refresh token');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          cookieStore.delete('access_token');
          cookieStore.delete('refresh_token');
          route.push(linkRedirect);
        }
      });
  };

  return (
    <>
      <aside className="w-80 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/10 p-6 text-white flex flex-col">
        {/* LOGO */}
        <Link href={`/`}>
          <div className="flex items-center gap-2 text-xl font-bold mb-8">
            <Cloud className="text-cyan-300" />
            Cloud Based
          </div>
        </Link>

        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-white/5">
          <div className="w-12 h-12 flex-shrink-0">
            <img
              src={
                infoUser?.avatar_url ||
                'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
              }
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 ">
            <p className="font-semibold leading-tight">{infoUser?.user_name}</p>
            <p className="text-xs text-white/60">{infoUser?.email}</p>
          </div>
          <button
            onClick={() => handleLogout('/auth/login')}
            className="hover:text-red-400"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* MENU */}
        <nav className="space-y-2 flex-1">
          {menus.map((m) => {
            const Icon = m.icon;
            const active = pathname === m.href;

            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? 'bg-cyan-400 text-black font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                {m.label}
              </Link>
            );
          })}
        </nav>
        {/* STORAGE USAGE */}
        <StorageUsage
          usedStorage={infoUser?.used_storage}
          limitStorage={infoUser?.storage_limit}
        />
      </aside>
    </>
  );
}
