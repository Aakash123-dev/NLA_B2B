'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export default function GlobalHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-4 py-2.5 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-sm">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Search..."
              className="pl-9 h-8 text-sm bg-gray-50/50 border-gray-200/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:bg-white rounded-md transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md transition-colors">
              <MessageSquare className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md transition-colors">
              <HelpCircle className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0 hover:bg-gray-100 rounded-md transition-colors">
            <Bell className="h-3.5 w-3.5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-white">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 p-0 rounded-full hover:ring-2 hover:ring-blue-500/20 transition-all">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-2" align="end">
              <DropdownMenuLabel className="font-normal p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-600">john@example.com</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 rounded-lg hover:bg-blue-50 transition-colors">
                <User className="mr-2 h-3.5 w-3.5 text-blue-600" />
                <span className="text-sm">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="mr-2 h-3.5 w-3.5 text-gray-600" />
                <span className="text-sm">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                <LogOut className="mr-2 h-3.5 w-3.5" />
                <span className="text-sm">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
