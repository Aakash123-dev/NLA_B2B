'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import MetricsGrid from './MetricsGrid';
import ChartsSection from './ChartsSection';
import RecentProjects from './RecentProjects';
import Sidebar from './Sidebar';
import DemoProjects from './DemoProjects';
import QuickActions from './QuickActions';

export default function UserDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Core metrics state for user
  const [metrics] = useState({
    totalProjects: 24,
    activeProjects: 18,
    completedOptimizations: 156,
    totalRevenue: 1247500,
    aiInsights: 42,
    dataPoints: 89230,
    modelAccuracy: 94.7,
    timesSaved: 340,
    avgROI: 187.5,
    successRate: 92.3
  });

  // Project performance data
  const [projectPerformanceData] = useState([
    { name: 'Jan', projects: 8, revenue: 85000, optimizations: 12, accuracy: 91.2 },
    { name: 'Feb', projects: 12, revenue: 98000, optimizations: 18, accuracy: 92.1 },
    { name: 'Mar', projects: 15, revenue: 112000, optimizations: 24, accuracy: 93.5 },
    { name: 'Apr', projects: 18, revenue: 127000, optimizations: 28, accuracy: 94.2 },
    { name: 'May', projects: 21, revenue: 145000, optimizations: 35, accuracy: 94.8 },
    { name: 'Jun', projects: 24, revenue: 156000, optimizations: 42, accuracy: 95.1 }
  ]);

  // AI optimization results
  const [aiOptimizationData] = useState([
    { name: 'Week 1', priceOptimization: 85, promoOptimization: 78, demandForecast: 91, inventoryOpt: 88 },
    { name: 'Week 2', priceOptimization: 89, promoOptimization: 82, demandForecast: 93, inventoryOpt: 90 },
    { name: 'Week 3', priceOptimization: 92, promoOptimization: 85, demandForecast: 95, inventoryOpt: 92 },
    { name: 'Week 4', priceOptimization: 95, promoOptimization: 88, demandForecast: 97, inventoryOpt: 94 }
  ]);

  // Category performance pie chart
  const [categoryPerformance] = useState([
    { name: 'Electronics', value: 32, fill: '#3b82f6', revenue: 398500 },
    { name: 'Fashion', value: 24, fill: '#10b981', revenue: 298200 },
    { name: 'Home & Garden', value: 20, fill: '#f59e0b', revenue: 249000 },
    { name: 'Sports', value: 15, fill: '#ef4444', revenue: 186300 },
    { name: 'Books', value: 9, fill: '#8b5cf6', revenue: 115500 },
  ]);

  // Recent projects
  const [recentProjects] = useState([
    {
      id: 1,
      name: 'Electronics Price Optimization',
      category: 'Electronics',
      status: 'Active',
      progress: 85,
      lastUpdated: '2025-07-18',
      roi: 142.5,
      revenue: 89500,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Fashion Demand Forecasting',
      category: 'Fashion',
      status: 'Completed',
      progress: 100,
      lastUpdated: '2025-07-17',
      roi: 156.8,
      revenue: 67200,
      color: 'emerald'
    },
    {
      id: 3,
      name: 'Home Promo Strategy',
      category: 'Home & Garden',
      status: 'In Progress',
      progress: 65,
      lastUpdated: '2025-07-16',
      roi: 98.2,
      revenue: 45300,
      color: 'orange'
    },
    {
      id: 4,
      name: 'Sports Inventory Optimization',
      category: 'Sports',
      status: 'Planning',
      progress: 25,
      lastUpdated: '2025-07-15',
      roi: 0,
      revenue: 0,
      color: 'purple'
    },
    {
      id: 2,
      name: 'Fashion Demand Forecasting',
      category: 'Fashion',
      status: 'Completed',
      progress: 100,
      lastUpdated: '2025-07-17',
      roi: 156.8,
      revenue: 67200,
      color: 'emerald'
    }
  ]);

  // AI insights
  const [aiInsights] = useState([
    {
      type: 'price',
      title: 'Price Opportunity Detected',
      message: 'Electronics category shows 15% price elasticity improvement potential',
      priority: 'high',
      action: 'Review Pricing Strategy',
      category: 'Electronics',
      impact: '+$12,500 estimated revenue'
    },
    {
      type: 'demand',
      title: 'Demand Surge Predicted',
      message: 'Fashion category expected to see 28% demand increase next week',
      priority: 'medium',
      action: 'Adjust Inventory',
      category: 'Fashion',
      impact: '+$8,200 estimated revenue'
    },
    {
      type: 'promo',
      title: 'Promotion Optimization',
      message: 'Current promotion in Home & Garden can be optimized for better ROI',
      priority: 'medium',
      action: 'Optimize Campaign',
      category: 'Home & Garden',
      impact: '+$5,800 estimated savings'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <DashboardHeader 
          selectedTimeframe={selectedTimeframe} 
          onTimeframeChange={setSelectedTimeframe} 
        />

        {/* Key Metrics Grid */}
        <MetricsGrid metrics={metrics} />

        {/* Charts Row */}
        <ChartsSection 
          projectPerformanceData={projectPerformanceData}
          aiOptimizationData={aiOptimizationData}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <RecentProjects projects={recentProjects} />
          </div>

          {/* Right Sidebar */}
          <Sidebar 
            categoryPerformance={categoryPerformance}
            aiInsights={aiInsights}
          />
        </div>

        {/* Demo Projects Section */}
        <DemoProjects />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}
