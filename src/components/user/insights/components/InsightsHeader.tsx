import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Download,
  Eye,
  Share,
  BarChart3,
  Settings,
  RefreshCw,
  Filter,
  SlidersHorizontal,
  Package,
  Building,
  Users,
  ShoppingCart,
  Barcode,
  Target,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InsightsHeaderProps {
  onShowPasswordShare: () => void;
}

export const InsightsHeader: React.FC<InsightsHeaderProps> = ({ onShowPasswordShare }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="w-full px-6 lg:px-12 py-6">
        {/* Top Row - Navigation & Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/user/projects"
              className="flex items-center justify-center w-10 h-10 text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#009bcc] to-[#0080a8] rounded-lg flex items-center justify-center shadow-sm">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Project Test</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                Active
              </Badge>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="px-4 py-2 gap-2 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200 text-sky-700 hover:from-sky-100 hover:to-blue-100 hover:border-sky-300 hover:text-sky-800 transition-all duration-300 shadow hover:shadow-md hover:-translate-y-0.5 transform"
            >
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <Eye className="w-3 h-3 text-white" />
              </div>
              <span className="hidden sm:inline font-medium">Simulator</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="px-4 py-2 gap-2 rounded-full bg-gradient-to-r from-fuchsia-50 to-pink-50 border-fuchsia-200 text-fuchsia-700 hover:from-fuchsia-100 hover:to-pink-100 hover:border-fuchsia-300 hover:text-fuchsia-800 transition-all duration-300 shadow hover:shadow-md hover:-translate-y-0.5 transform"
              onClick={onShowPasswordShare}
            >
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center">
                <Share className="w-3 h-3 text-white" />
              </div>
              <span className="hidden sm:inline font-medium">Share</span>
            </Button>
            
            <div className="relative group">
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700 hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-300 hover:text-emerald-800 transition-all duration-300 shadow hover:shadow-md hover:-translate-y-0.5 transform"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Download className="w-3 h-3 text-white" />
                </div>
                <span className="hidden sm:inline font-medium">Download</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Primary Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Main Filter:</span>
                </div>
                <Select defaultValue="rma-to-retailer">
                  <SelectTrigger className="w-[200px] bg-slate-50 border-slate-300 shadow-sm hover:border-slate-400 hover:bg-white transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rma-to-retailer">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Building className="w-4 h-4 text-slate-500" />
                        RMA to Retailer
                      </div>
                    </SelectItem>
                    <SelectItem value="to-region-wise">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Target className="w-4 h-4 text-slate-500" />
                        To Region wise
                      </div>
                    </SelectItem>
                    <SelectItem value="to-total-us">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Globe className="w-4 h-4 text-slate-500" />
                        To Total US
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="h-6 w-px bg-slate-200 hidden lg:block"></div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Filter by:</span>
                </div>
                <Select defaultValue="by-category">
                  <SelectTrigger className="w-[220px] bg-slate-50 border-slate-300 shadow-sm hover:border-slate-400 hover:bg-white transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="by-category">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Package className="w-4 h-4 text-slate-500" />
                        Category
                      </div>
                    </SelectItem>
                    <SelectItem value="by-retailer">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Building className="w-4 h-4 text-slate-500" />
                        Retailer 
                      </div>
                    </SelectItem>
                    <SelectItem value="by-brand">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Users className="w-4 h-4 text-slate-500" />
                        Brand 
                      </div>
                    </SelectItem>
                    <SelectItem value="by-ppg">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <ShoppingCart className="w-4 h-4 text-slate-500" />
                        PPG 
                      </div>
                    </SelectItem>
                    <SelectItem value="by-upc">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Barcode className="w-4 h-4 text-slate-500" />
                        UPC
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Version & Settings */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Version:</span>
                </div>
                <Select defaultValue="1">
                  <SelectTrigger className="w-[120px] bg-slate-50 border-slate-300 shadow-sm hover:border-slate-400 hover:bg-white transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Version 1
                      </div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Version 2
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Version 3
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 bg-slate-50 border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden lg:inline">Refresh Data</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
