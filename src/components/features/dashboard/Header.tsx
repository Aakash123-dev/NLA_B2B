'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, Menu, Settings, User, LogOut, MessageSquare, Shield, Moon } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden hover:bg-gray-100 rounded-xl"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Search users, subscriptions, analytics..."
              className="pl-12 w-80 bg-gray-50/50 border-0 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-white rounded-xl transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-200/50">
                ⌘K
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all duration-300">
              <Shield className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-50 rounded-xl transition-all duration-300">
              <Moon className="h-4 w-4" />
            </Button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 group">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs border-2 border-white animate-pulse-slow">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-blue-500/20 transition-all duration-300">
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-lg">
                  <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse-slow" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Admin" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">AM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-600">admin@company.com</p>
                    <Badge variant="secondary" className="text-xs mt-1">Administrator</Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <User className="mr-3 h-4 w-4 text-blue-600" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 rounded-lg hover:bg-purple-50 transition-colors">
                <Settings className="mr-3 h-4 w-4 text-purple-600" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 rounded-lg hover:bg-green-50 transition-colors">
                <Shield className="mr-3 h-4 w-4 text-green-600" />
                <span>Security</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                <LogOut className="mr-3 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}