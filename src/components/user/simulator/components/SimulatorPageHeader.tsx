'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface SimulatorPageHeaderProps {
  testDate: string;
  company: string;
  selectedBrand: string;
  onBackToHome: () => void;
  onOpenSmartInsights?: () => void;
}

export function SimulatorPageHeader({
  testDate,
  company,
  selectedBrand,
  onBackToHome,
  onOpenSmartInsights
}: SimulatorPageHeaderProps) {
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 bg-white border-b border-gray-200/60"
    >
      <div className="max-w-8xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Left Section - Navigation */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={onBackToHome}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm">Back</span>
            </Button>
            
            <div className="h-6 w-px bg-gray-200"></div>
            
            <div>
              <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                NLA B2B Analytics
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedBrand} • {company} • {testDate}
              </p>
            </div>
          </div>

          {/* Right Section - Smart Insights */}
          {onOpenSmartInsights && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-5"
              onClick={onOpenSmartInsights}
            >
              <Brain className="w-4 h-4" />
              Smart Insights
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
