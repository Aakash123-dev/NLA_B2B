'use client';

import { ReactNode } from 'react';
import UserNavbar from '@/components/features/user/UserNavbar';
import UserFooter from '@/components/features/user/UserFooter';

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0E22] via-[#0D0E23] to-[#0C0E22] flex flex-col">
      <UserNavbar />
      <main className="flex-1 w-full px-0">
        {children}
      </main>
      <UserFooter />
    </div>
  );
}
