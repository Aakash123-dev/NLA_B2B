'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ExternalLink,
  Coffee
} from 'lucide-react';

export default function GlobalFooter() {
  return (
    <footer className="bg-white/95 backdrop-blur-sm border-t border-gray-200/50 px-4 py-3 mt-auto">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span className="text-xs text-gray-600">© 2024 Analytics Dashboard</span>
          </div>
          <Separator orientation="vertical" className="h-3" />
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Social Links */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 rounded-md transition-colors">
              <Github className="h-3 w-3 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
              <Twitter className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
              <Linkedin className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 rounded-md transition-colors">
              <Mail className="h-3 w-3 text-gray-600" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-4" />

          {/* Quick Links */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-xs h-6 px-2 hover:bg-gray-100 rounded-md transition-colors">
              <Coffee className="h-3 w-3 mr-1" />
              Support
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-6 px-2 hover:bg-gray-100 rounded-md transition-colors">
              <ExternalLink className="h-3 w-3 mr-1" />
              Docs
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
