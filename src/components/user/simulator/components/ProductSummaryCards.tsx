'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { ChartData } from '../types/product';

interface ProductSummaryCardsProps {
  chartData: ChartData[];
}

export function ProductSummaryCards({ chartData }: ProductSummaryCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Current Revenue</p>
              <p className="text-2xl font-bold text-blue-900">
                ${chartData.reduce((sum, item) => sum + item.currentRevenue, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/50 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Projected Revenue</p>
              <p className="text-2xl font-bold text-emerald-900">
                ${chartData.reduce((sum, item) => sum + item.newRevenue, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Revenue Change</p>
              <p className="text-2xl font-bold text-purple-900">
                ${chartData.reduce((sum, item) => sum + item.revenueChange, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
