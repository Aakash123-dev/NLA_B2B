'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home,
  ArrowLeft,
  Building,
  Package,
  Play,
  Clock,
  RotateCcw,
  Download,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SimulatorHeaderProps {
  testDate: string;
  company: string;
  selectedBrand: string;
  selectedProducts: string[];
  onBackToHome: () => void;
}

export function SimulatorHeader({
  testDate,
  company,
  selectedBrand,
  selectedProducts,
  onBackToHome
}: SimulatorHeaderProps) {

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-8xl mx-auto px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Top Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBackToHome}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home Page
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <div className="text-sm text-gray-600">Price</div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Test Date */}
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-900">{testDate}</div>
          </div>

          {/* Company and Brand Selection */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-600" />
              <Select defaultValue={company}>
                <SelectTrigger className="w-64 bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={company}>{company}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-600" />
              <Select defaultValue={selectedBrand}>
                <SelectTrigger className="w-48 bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={selectedBrand}>{selectedBrand}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">+ 3 ...</div>
              <Button variant="outline" size="sm" className="gap-2">
                Unselect all
              </Button>
            </div>
          </div>

          {/* Selected Products */}
          <div className="space-y-2">
            {selectedProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                <span className="text-sm text-gray-700">{product}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            ))}
          </div>

          {/* Metric Headers */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">Total Change Wkly Dollar</div>
              <div className="text-lg font-bold text-gray-900">-</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">Total % Change Wkly Dollar</div>
              <div className="text-lg font-bold text-gray-900">-</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
