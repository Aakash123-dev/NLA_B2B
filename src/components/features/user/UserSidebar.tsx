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
  ChevronLeft,
  ChevronRight,
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
  Mail,
  Library
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
import { useAuth } from '@/components/features/auth/AuthProvider';

const UserSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

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

  const navItems = [
    { name: 'Dashboard', href: '/user/dashboard', icon: Gauge },
    { name: 'Projects', href: '/user/projects', icon: FolderOpen },
    { name: 'Comparison', href: '/user/comparison', icon: BarChart3 },
    { name: 'Simulator Comparison', href: '/user/simulator-comparison', icon: TrendingUp },
    { name: 'TPO Events Comparison', href: '/user/tpo-events-comparison', icon: PieChart },
    { name: 'Event Library', href: '/user/event-library', icon: Library },
    { name: 'Insights Management', href: '/user/insights-management', icon: Lightbulb },
    { name: 'Gazelle AI', href: '/user/chat-with-ai', icon: Brain },
    { name: 'Help & Support', href: '/user/help', icon: HelpCircle },
  ];

  const additionalItems = [
    { name: 'Profile', href: '/user/profile', icon: User },
    { name: 'Settings', href: '/user/settings', icon: Settings },
    { name: 'DB Import', href: '/user/db-import', icon: Upload },
    { name: 'User Management', href: '/user/management', icon: Users },
    { name: 'Subscription', href: '/user/subscription', icon: CreditCard },
    { name: 'Payment History', href: '/user/payment-history', icon: Clock },
  ];

  const isActive = (href: string) => pathname === href;

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const button = document.getElementById('mobile-menu-button');
      if (isMobileOpen && sidebar && !sidebar.contains(event.target as Node) && !button?.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Menu Button - Fixed positioned */}
      <Button
        id="mobile-menu-button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 bg-slate-800/90 backdrop-blur-sm text-white hover:bg-slate-700 border border-white/20 shadow-lg"
        size="sm"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />
      )}

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen bg-slate-900 border-r border-white/20 shadow-xl
          transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className={`flex items-center border-b border-white/20 ${isCollapsed ? 'justify-center p-2' : 'justify-between p-3'}`}>
            {!isCollapsed ? (
              <>
                <Link href="/user" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                  <div className="w-10 h-10 bg-[#009bcc] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-[#009bcc]">Gazelle</span>
                </Link>
                
                {/* Collapse button - only on desktop */}
                <Button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex text-white bg-slate-800 hover:bg-slate-700 border border-white/30 p-1.5 w-7 h-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="w-full flex flex-col items-center space-y-2">
                <Link href="/user" className="w-10 h-10 bg-[#009bcc] rounded-xl flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
                  <span className="text-white font-bold text-lg">G</span>
                </Link>
                
                {/* Collapse button for collapsed state - below logo */}
                <Button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex text-white bg-slate-800 hover:bg-slate-700 border border-white/30 p-1 w-8 h-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  title="Expand sidebar"
                >
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          {!isCollapsed && (
            <div className="p-3 border-b border-white/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <input
                  type="text"
                  placeholder="Search metrics, optimizations..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-[#009bcc]/50 focus:border-[#009bcc]/50 transition-all"
                />
              </div>
            </div>
          )}

          {/* User Profile Section */}
          <div className="p-3 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-white/30 shadow-lg">
                <AvatarImage src={user?.client_logo || "/placeholder-avatar.jpg"} alt="User" />
                <AvatarFallback className="bg-white text-slate-900 font-semibold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{getUserDisplayName()}</div>
                  <div className="text-xs text-white/70 truncate">{user?.role || 'User'}</div>
                </div>
              )}
              {!isCollapsed && (
                <div className="flex items-center space-x-1">
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative text-white/70 hover:text-white hover:bg-white/10 p-1">
                        <Bell className="w-4 h-4" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-1 text-xs bg-red-500 text-white hover:bg-red-500 border border-slate-900/20 font-bold">
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
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto scrollbar-none">
            <div className="p-3 space-y-2">
              {/* Main Navigation */}
              <div className="space-y-1">
                {!isCollapsed && (
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider px-3 py-2">
                    Main Menu
                  </p>
                )}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive(item.href)
                          ? 'text-white bg-[#009bcc]/20 border border-[#009bcc]/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      onClick={() => setIsMobileOpen(false)}
                      title={isCollapsed ? item.name : ''}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>

              {/* Additional Items */}
              <div className="space-y-1 pt-4">
                {!isCollapsed && (
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider px-3 py-2">
                    Account
                  </p>
                )}
                {additionalItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive(item.href)
                          ? 'text-white bg-[#009bcc]/20 border border-[#009bcc]/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      onClick={() => setIsMobileOpen(false)}
                      title={isCollapsed ? item.name : ''}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-3 border-t border-white/20">
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? 'Sign out' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Sign out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
