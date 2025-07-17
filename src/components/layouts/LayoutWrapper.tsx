'use client';

import { usePathname } from 'next/navigation';
import GlobalHeader from '@/components/ui/global-header';
import GlobalFooter from '@/components/ui/global-footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if we're on dashboard2 pages (excluding them from header/footer)
  const isDashboard2 = pathname?.startsWith('/dashboard2');
  
  // Check if we're on dashboard pages (with sidebar)
  const isDashboard = pathname?.startsWith('/dashboard') && !isDashboard2;
  
  // Check if we're on user pages
  const isUserPage = pathname?.startsWith('/user');
  
  // Check if we're on login/register pages
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // Don't show header/footer on dashboard2 pages, user pages, or auth pages
  if (isDashboard2 || isUserPage || isAuthPage) {
    return <>{children}</>;
  }

  // For dashboard pages (with sidebar), header/footer should be inside the dashboard layout
  // The dashboard layout handles the sidebar, so we just return children here
  if (isDashboard) {
    return <>{children}</>;
  }

  // For other pages (like home page), show full-width header/footer
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />
      <main className="flex-1">
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
}
