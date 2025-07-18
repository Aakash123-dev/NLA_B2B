'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  BarChart3,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  Building2,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Sparkles,
  TrendingUp,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface NavigationSubItem {
  name: string;
  href: string;
  icon: any;
  description: string;
}

interface NavigationItem {
  name: string;
  href: string | null;
  icon: any;
  badge?: string | null;
  description: string;
  hasDropdown?: boolean;
  subItems?: NavigationSubItem[];
}

const navigation: NavigationItem[] = [
  { 
    name: 'Overview', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    badge: null,
    description: 'Main dashboard'
  },
  { 
    name: 'Manage Companies', 
    href: null, // No direct href for dropdown
    icon: Building2,
    badge: null,
    description: 'Manage company operations',
    hasDropdown: true,
    subItems: [
      {
        name: 'Manage Companies',
        href: '/dashboard/users',
        icon: Building2,
        description: 'Manage companies & users'
      },
      {
        name: 'B2B Users',
        href: '/dashboard/company-users',
        icon: Users,
        description: 'Business user accounts'
      }
    ]
  },
  { 
    name: 'Subscriptions', 
    href: null, // No direct href for dropdown
    icon: CreditCard,
    badge: 'New',
    description: 'Billing & plans',
    hasDropdown: true,
    subItems: [
      {
        name: 'Plans',
        href: '/dashboard/plans',
        icon: Zap,
        description: 'Manage subscription plans'
      },
      {
        name: 'Subscriptions',
        href: '/dashboard/subscriptions',
        icon: CreditCard,
        description: 'Active subscriptions'
      }
    ]
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: BarChart3,
    badge: null,
    description: 'Data insights'
  },
  { 
    name: 'Reports', 
    href: '/dashboard/reports', 
    icon: FileText,
    badge: '3',
    description: 'Generate reports'
  },
  { 
    name: 'Notifications', 
    href: '/dashboard/notifications', 
    icon: Bell,
    badge: '12',
    description: 'Alerts & messages'
  },
];

const secondaryNavigation = [
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    description: 'App configuration'
  },
  { 
    name: 'Security', 
    href: '/dashboard/security', 
    icon: Shield,
    description: 'Security settings'
  },
  { 
    name: 'Help & Support', 
    href: '/dashboard/help', 
    icon: HelpCircle,
    description: 'Get assistance'
  },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  const toggleDropdown = (itemName: string) => {
    setExpandedDropdown(expandedDropdown === itemName ? null : itemName);
  };

  const isDropdownItemActive = (subItems: any[]) => {
    return subItems.some(subItem => pathname === subItem.href);
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col h-full w-64 shadow-2xl border-r border-blue-800/30">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      
      {/* Logo Section */}
      <div className="relative p-6 border-b border-blue-800/30 bg-gradient-to-r from-blue-900/50 to-transparent">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white tracking-wide" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
            Gazelle
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
        {/* Main Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Main Menu
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/30 to-transparent ml-3" />
          </div>
          
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = item.href ? pathname === item.href : false;
              const isDropdownActive = item.hasDropdown && item.subItems ? isDropdownItemActive(item.subItems) : false;
              const isHovered = hoveredItem === item.name;
              const isExpanded = expandedDropdown === item.name;
              
              if (item.hasDropdown && item.subItems) {
                return (
                  <div key={item.name} className="space-y-1">
                    {/* Dropdown trigger */}
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "group relative flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02]",
                        isDropdownActive
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30"
                          : "text-blue-100 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-blue-700/30 hover:text-white hover:shadow-md"
                      )}
                    >
                      {/* Active indicator */}
                      {isDropdownActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full" />
                      )}
                      
                      {/* Icon with glow effect */}
                      <div className={cn(
                        "relative flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200",
                        isDropdownActive 
                          ? "bg-white/20 shadow-inner" 
                          : isHovered 
                            ? "bg-blue-600/30" 
                            : "bg-transparent"
                      )}>
                        <item.icon className={cn(
                          "h-4 w-4 transition-all duration-200",
                          isDropdownActive 
                            ? "text-white drop-shadow-sm" 
                            : "text-blue-300 group-hover:text-white"
                        )} />
                        {isDropdownActive && (
                          <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "truncate transition-all duration-200",
                            isDropdownActive ? "font-semibold" : "font-medium"
                          )}>
                            {item.name}
                          </span>
                          
                          {/* Badge */}
                          {item.badge && (
                            <Badge className={cn(
                              "ml-2 text-xs px-1.5 py-0.5 font-bold transition-all duration-200",
                              isDropdownActive
                                ? "bg-white/20 text-white border-white/30"
                                : item.badge === 'New'
                                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none shadow-sm"
                                  : "bg-blue-600/50 text-blue-100 border-blue-400/30"
                            )}>
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Description on hover */}
                        {isHovered && (
                          <p className="text-xs text-blue-200 mt-1 animate-in fade-in duration-200">
                            {item.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Chevron indicator */}
                      <ChevronDown className={cn(
                        "h-4 w-4 ml-2 transition-all duration-200",
                        isExpanded ? "rotate-180" : "",
                        isDropdownActive 
                          ? "text-white" 
                          : "text-blue-400 group-hover:text-white"
                      )} />
                    </button>

                    {/* Dropdown menu */}
                    {isExpanded && (
                      <div className="ml-4 pl-4 border-l border-blue-600/30 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          const isSubHovered = hoveredItem === subItem.name;
                          
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onMouseEnter={() => setHoveredItem(subItem.name)}
                              onMouseLeave={() => setHoveredItem(null)}
                              className={cn(
                                "group relative flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out",
                                isSubActive
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                                  : "text-blue-200 hover:bg-blue-700/30 hover:text-white"
                              )}
                            >
                              {/* Sub-item icon */}
                              <div className={cn(
                                "flex items-center justify-center w-6 h-6 rounded-md mr-3 transition-all duration-200",
                                isSubActive 
                                  ? "bg-white/20" 
                                  : isSubHovered 
                                    ? "bg-blue-600/30" 
                                    : "bg-transparent"
                              )}>
                                <subItem.icon className={cn(
                                  "h-3 w-3 transition-all duration-200",
                                  isSubActive 
                                    ? "text-white" 
                                    : "text-blue-300 group-hover:text-white"
                                )} />
                              </div>
                              
                              <span className={cn(
                                "truncate transition-all duration-200",
                                isSubActive ? "font-semibold" : "font-medium"
                              )}>
                                {subItem.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group relative flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02]",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30"
                      : "text-blue-100 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-blue-700/30 hover:text-white hover:shadow-md"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full" />
                  )}
                  
                  {/* Icon with glow effect */}
                  <div className={cn(
                    "relative flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200",
                    isActive 
                      ? "bg-white/20 shadow-inner" 
                      : isHovered 
                        ? "bg-blue-600/30" 
                        : "bg-transparent"
                  )}>
                    <item.icon className={cn(
                      "h-4 w-4 transition-all duration-200",
                      isActive 
                        ? "text-white drop-shadow-sm" 
                        : "text-blue-300 group-hover:text-white"
                    )} />
                    {isActive && (
                      <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "truncate transition-all duration-200",
                        isActive ? "font-semibold" : "font-medium"
                      )}>
                        {item.name}
                      </span>
                      
                      {/* Badge */}
                      {item.badge && (
                        <Badge className={cn(
                          "ml-2 text-xs px-1.5 py-0.5 font-bold transition-all duration-200",
                          isActive
                            ? "bg-white/20 text-white border-white/30"
                            : item.badge === 'New'
                              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none shadow-sm"
                              : "bg-blue-600/50 text-blue-100 border-blue-400/30"
                        )}>
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Description on hover */}
                    {isHovered && (
                      <p className="text-xs text-blue-200 mt-1 animate-in fade-in duration-200">
                        {item.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Chevron indicator */}
                  <ChevronRight className={cn(
                    "h-4 w-4 ml-2 transition-all duration-200",
                    isActive 
                      ? "text-white transform translate-x-1" 
                      : "text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  )} />
                </Link>
              );
            })}
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />

        {/* Secondary Navigation */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="h-3.5 w-3.5" />
              System
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/30 to-transparent ml-3" />
          </div>
          
          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              const isHovered = hoveredItem === item.name;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group relative flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02]",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30"
                      : "text-blue-100 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-blue-700/30 hover:text-white hover:shadow-md"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full" />
                  )}
                  
                  <div className={cn(
                    "relative flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200",
                    isActive 
                      ? "bg-white/20 shadow-inner" 
                      : isHovered 
                        ? "bg-blue-600/30" 
                        : "bg-transparent"
                  )}>
                    <item.icon className={cn(
                      "h-4 w-4 transition-all duration-200",
                      isActive 
                        ? "text-white drop-shadow-sm" 
                        : "text-blue-300 group-hover:text-white"
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "truncate transition-all duration-200",
                      isActive ? "font-semibold" : "font-medium"
                    )}>
                      {item.name}
                    </span>
                    
                    {isHovered && (
                      <p className="text-xs text-blue-200 mt-1 animate-in fade-in duration-200">
                        {item.description}
                      </p>
                    )}
                  </div>
                  
                  <ChevronRight className={cn(
                    "h-4 w-4 ml-2 transition-all duration-200",
                    isActive 
                      ? "text-white transform translate-x-1" 
                      : "text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  )} />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-blue-800/30 bg-gradient-to-r from-blue-900/30 to-transparent space-y-4">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-800/40 to-cyan-800/40 rounded-xl p-4 border border-blue-600/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-200">System Status</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Online</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-semibold text-white">99.9% Uptime</span>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full group relative justify-start text-white bg-gradient-to-r from-red-900/30 to-red-800/30 hover:from-red-700 hover:to-red-600 border border-red-600/30 hover:border-red-500 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-600/25"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg mr-3 bg-red-600/20 group-hover:bg-white/20 transition-all duration-200">
            <LogOut className="h-4 w-4 text-red-300 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="font-medium">Logout</span>
          <ChevronRight className="h-4 w-4 ml-auto text-red-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
        </Button>
      </div>
    </div>
  );
}