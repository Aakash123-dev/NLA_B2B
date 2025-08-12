'use client';

import { ReactNode } from 'react';
import UserSidebar from '@/components/features/user/UserSidebar';
import UserFooter from '@/components/features/user/UserFooter';

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0C0E22] via-[#0D0E23] to-[#0C0E22]">
      {/* Sidebar */}
      <UserSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content - now takes full height */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        
        {/* Footer */}
        <UserFooter />
      </div>
    </div>
  );
}
