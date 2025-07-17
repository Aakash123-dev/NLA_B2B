'use client';

import { ReactNode } from 'react';
import UserNavbar from '@/components/features/user/UserNavbar';
import UserFooter from '@/components/features/user/UserFooter';

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0C0E22] via-[#0D0E23] to-[#0C0E22]">
      <UserNavbar />
      <main className="w-full flex-1 px-0">{children}</main>
      <UserFooter />
    </div>
  );
}
