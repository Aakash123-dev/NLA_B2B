import Link from 'next/link';
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CreditCard, 
  Smartphone, 
  Globe,
  Home,
  FolderOpen,
  Gauge,
  Percent,
  Brain,
  HelpCircle,
  Upload,
  Users,
  Settings,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function UserFooter() {
  const quickLinks = [
    { name: 'Home', href: '/user', icon: Home },
    { name: 'Price Optimization', href: '/user/projects', icon: FolderOpen },
    { name: 'Key Metrics', href: '/user/metrics', icon: Gauge },
    { name: 'Promo Optimization', href: '/user/promo-optimization', icon: Percent },
    { name: 'Gazelle AI', href: '/user/gazelle-ai', icon: Brain },
    { name: 'Help & Support', href: '/user/help', icon: HelpCircle },
  ];

  const utilityLinks = [
    { name: 'DB Import', href: '/user/db-import', icon: Upload },
    { name: 'User Management', href: '/user/management', icon: Users },
    { name: 'Settings', href: '/user/settings', icon: Settings },
    { name: 'Profile', href: '/user/profile', icon: Users },
  ];

  const supportLinks = [
    { name: '1-800-GAZELLE', href: 'tel:1-800-GAZELLE', icon: Phone },
    { name: 'support@gazelle.com', href: 'mailto:support@gazelle.com', icon: Mail },
    { name: '24/7 Support', href: '/user/help', icon: Clock },
    { name: 'Global Locations', href: '/locations', icon: MapPin },
  ];

  const resourceLinks = [
    { name: 'Mobile App', href: '/mobile', icon: Smartphone },
    { name: 'API Documentation', href: '/docs', icon: Globe },
    { name: 'Learning Center', href: '/learn', icon: Brain },
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
  ];

  return (
    <footer className="w-full bg-slate-900 text-white border-t border-white/20 shadow-xl mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          {/* Top Section with Logo and Main Info */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
            {/* Company Brand Section */}
            <div className="lg:w-1/3 space-y-6">
              <Link href="/user" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-[#009bcc] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#009bcc]">Gazelle</span>
              </Link>
              
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                Advanced analytics and business intelligence platform for modern enterprises. 
                Optimize pricing, analyze markets, and drive growth with AI-powered insights.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Shield className="w-3 h-3 mr-1" />
                  SOC 2 Certified
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300">
                  ISO 27001
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300">
                  Enterprise Security
                </Badge>
              </div>
            </div>

            {/* Navigation Links Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Quick Navigation */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Navigation</h4>
                  <ul className="space-y-3">
                    {quickLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            href={link.href}
                            className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-300 text-sm group"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{link.name}</span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Utility Links */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Tools</h4>
                  <ul className="space-y-3">
                    {utilityLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            href={link.href}
                            className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-300 text-sm group"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{link.name}</span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Support */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Support</h4>
                  <ul className="space-y-3">
                    {supportLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            href={link.href}
                            className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-300 text-sm group"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{link.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Resources */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Resources</h4>
                  <ul className="space-y-3">
                    {resourceLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            href={link.href}
                            className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-300 text-sm group"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{link.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - matching navbar style */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-sm text-white/60">
                © 2025 Gazelle. All rights reserved.
              </div>
              <div className="flex items-center gap-4 text-xs text-white/50">
                <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
                <span>•</span>
                <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
                <span>•</span>
                <Link href="/cookies" className="hover:text-white/70 transition-colors">Cookies</Link>
              </div>
            </div>

            {/* Right side - Status and Version */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All Systems Operational</span>
              </div>
              <Badge className="bg-white/10 text-white/70 border-white/20 text-xs">
                v2.1.0
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
