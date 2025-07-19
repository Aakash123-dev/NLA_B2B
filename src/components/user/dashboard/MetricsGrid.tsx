'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen, Brain, DollarSign, Target, ArrowUpRight } from 'lucide-react';

interface MetricsProps {
  metrics: {
    totalProjects: number;
    completedOptimizations: number;
    totalRevenue: number;
    modelAccuracy: number;
  };
}

export default function MetricsGrid({ metrics }: MetricsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Projects */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-blue-900">{metrics.totalProjects}</p>
              <p className="text-blue-700 text-sm mt-1 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +12% vs last month
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-xl">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Optimizations */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium text-sm">AI Optimizations</p>
              <p className="text-3xl font-bold text-purple-900">{metrics.completedOptimizations}</p>
              <p className="text-purple-700 text-sm mt-1 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +24% accuracy improved
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 font-medium text-sm">Revenue Generated</p>
              <p className="text-3xl font-bold text-emerald-900">{formatCurrency(metrics.totalRevenue)}</p>
              <p className="text-emerald-700 text-sm mt-1 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +18.7% ROI increase
              </p>
            </div>
            <div className="bg-emerald-500 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Accuracy */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 font-medium text-sm">Model Accuracy</p>
              <p className="text-3xl font-bold text-orange-900">{metrics.modelAccuracy}%</p>
              <p className="text-orange-700 text-sm mt-1 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +2.3% improvement
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
