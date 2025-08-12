'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/features/auth/AuthProvider';

const UserTopHeader = () => {
  const { user } = useAuth();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    if (user.first_name && user.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    }
    if (user.full_name) {
      return user.full_name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'User';
    if (user.full_name) return user.full_name;
    if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/95 backdrop-blur-sm border-b border-white/20 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search Bar - takes up most of the space */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
            <input
              type="text"
              placeholder="Search metrics, optimizations, reports..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#009bcc]/50 focus:border-[#009bcc]/50 text-sm text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center space-x-4 ml-6">
          {/* User Profile - Desktop only */}
          <div className="hidden md:flex items-center space-x-3">
            <Avatar className="w-9 h-9 border-2 border-white/30 shadow-lg">
              <AvatarImage src={user?.client_logo || "/placeholder-avatar.jpg"} alt="User" />
              <AvatarFallback className="bg-white text-slate-900 font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">{getUserDisplayName()}</div>
              <div className="text-xs text-white/70">{user?.role || 'User'}</div>
            </div>
          </div>

          {/* Mobile Avatar only */}
          <div className="md:hidden">
            <Avatar className="w-9 h-9 border-2 border-white/30 shadow-lg">
              <AvatarImage src={user?.client_logo || "/placeholder-avatar.jpg"} alt="User" />
              <AvatarFallback className="bg-white text-slate-900 font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserTopHeader;
