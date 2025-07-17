'use client';

import { useState, createContext, useContext } from 'react';
import Sidebar from '@/components/features/dashboard/Sidebar';
import GlobalHeader from '@/components/ui/global-header';
import GlobalFooter from '@/components/ui/global-footer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 lg:z-auto h-screen
        `}>
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        
        {/* Main Content Area - This contains the header, content, and footer */}
        <div className="flex-1 overflow-hidden lg:ml-0 flex flex-col">
          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed top-4 left-4 z-30">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="bg-white border-gray-300 shadow-sm"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Header - positioned after sidebar */}
          <GlobalHeader />
          
          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          
          {/* Footer - positioned after sidebar */}
          <GlobalFooter />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}