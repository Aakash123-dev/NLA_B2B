'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  ChevronDown,
  Home,
  BarChart3,
  Database,
  FolderOpen,
  HelpCircle,
  LineChart,
  Tags,
  Percent,
  Brain,
  Upload,
  Users,
  CreditCard,
  Clock,
  Gauge,
  PieChart,
  Lightbulb,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  Calendar,
  Mail
} from 'lucide-react';
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

const UserNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Price Optimization Complete',
      message: 'Your pricing strategy for Electronics category has been successfully optimized.',
      time: '2 minutes ago',
      read: false,
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Competitor Price Alert',
      message: 'Competitor ABC Corp has reduced prices by 15% in Home & Garden category.',
      time: '15 minutes ago',
      read: true,
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      id: 3,
      type: 'info',
      title: 'New AI Insights Available',
      message: 'Gazelle AI has generated new market insights for your business.',
      time: '1 hour ago',
      read: false,
      icon: Brain,
      color: 'text-[#009bcc]'
    },
    {
      id: 4,
      type: 'info',
      title: 'Monthly Report Ready',
      message: 'Your monthly performance report is ready for download.',
      time: '2 hours ago',
      read: true,
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      id: 5,
      type: 'success',
      title: 'Promo Campaign Success',
      message: 'Your summer promotion campaign achieved 127% of target ROI.',
      time: '1 day ago',
      read: true,
      icon: TrendingUp,
      color: 'text-green-400'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/user/dashboard', icon: Gauge },
    { name: 'Projects', href: '/user/projects', icon: FolderOpen },
    { name: 'Gazelle AI', href: '/user/chat-with-ai', icon: Brain },
    { name: 'Help & Support', href: '/user/help', icon: HelpCircle },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900 border-b border-white/20 shadow-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Top row with logo and search */}
        <div className="flex items-center justify-between h-16 pt-2">
          {/* Logo */}
          <Link href="/user" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-[#009bcc] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#009bcc]">Gazelle</span>
          </Link>
          
          {/* Search - Desktop */}
          <div className="flex items-center flex-1 max-w-2xl ml-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70 z-10" />
              <input
                type="text"
                placeholder="Search metrics, optimizations, reports..."
                className="pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl w-full focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/15 text-sm text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Right side items on top row */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-1 text-xs bg-red-500 text-white hover:bg-red-500 border-2 border-slate-900/20 font-bold animate-pulse">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-slate-800 border-white/20 shadow-xl rounded-xl p-0 max-h-96 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/10 bg-slate-800/95">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    <Badge variant="secondary" className="bg-[#009bcc]/20 text-[#009bcc] border-[#009bcc]/30">
                      {unreadCount} new
                    </Badge>
                  </div>
                </div>
                
                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer ${
                          !notification.read ? 'bg-white/[0.02] border-l-2 border-l-[#009bcc]' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center ${notification.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className={`text-sm font-medium ${!notification.read ? 'text-white' : 'text-white/80'}`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#009bcc] rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs text-white/60 mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                              {notification.message}
                            </p>
                            <p className="text-xs text-white/40">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/10 bg-slate-800/95">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-[#009bcc] hover:text-white hover:bg-[#009bcc]/20 transition-all duration-200"
                  >
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 hover:bg-white/10 rounded-xl p-2 transition-all duration-300">
                <Avatar className="w-9 h-9 border-2 border-white/30 shadow-lg">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-white text-slate-900 font-semibold">JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-white">John Doe</div>
                  <div className="text-xs text-white/70">Admin</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white/70 hidden md:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 bg-slate-800 border-white/20 shadow-xl rounded-xl">
                <Link href="/user/profile">
                  <DropdownMenuItem className="text-white hover:bg-white/10 p-3">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/settings">
                  <DropdownMenuItem className="text-white hover:bg-white/10 p-3">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/db-import">
                  <DropdownMenuItem className="text-white hover:bg-white/10 p-3">
                    <Upload className="w-4 h-4 mr-3" />
                    DB Import
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/management">
                  <DropdownMenuItem className="text-white hover:bg-white/10 p-3">
                    <Users className="w-4 h-4 mr-3" />
                    User Management
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/user/subscription">
                  <DropdownMenuItem className="text-white hover:bg-white/10 p-3">
                    <CreditCard className="w-4 h-4 mr-3" />
                    Subscription Details
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/payment-history">
                  <DropdownMenuItem className="text-white hover:bg-white/10 p-3">
                    <Clock className="w-4 h-4 mr-3" />
                    Payment History
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 p-3">
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white hover:bg-blue-600/20 rounded-xl transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom row with navigation */}
        <div className="hidden lg:flex flex-col w-full border-t border-white/20 mt-1">
          {/* Main navigation row with proper alignment */}
          <div className="flex items-center justify-between px-2 py-3">
            {/* Left side - primary navigation menu */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-white bg-white/20 shadow-lg border border-white/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right side - intentionally left empty to maintain layout */}
            <div></div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/98 backdrop-blur-lg border-t border-white/20">
              {/* Mobile Search */}
              <div className="relative mb-4 mt-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70 z-10" />
                <input
                  type="text"
                  placeholder="Search metrics, optimizations..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-sm text-white placeholder-white/50"
                />
              </div>
              {/* Main Navigation Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 mt-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium whitespace-nowrap transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-white bg-white/20 border border-white/30 shadow-lg'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
              
              <div className="border-t border-blue-500/20 pt-3">
                <p className="text-blue-400 text-xs font-semibold px-3 mb-2">ADDITIONAL OPTIONS</p>
                
                <Link
                  href="/user/settings"
                  className="flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-blue-600/10 transition-all duration-300 mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
