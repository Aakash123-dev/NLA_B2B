import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface ChartSectionProps {
  chartId: number;
  hasChart: boolean;
}

const mockData = [
  { name: 'Q1', roi: 24, spend: 45000 },
  { name: 'Q2', roi: 32, spend: 52000 },
  { name: 'Q3', roi: 28, spend: 48000 },
  { name: 'Q4', roi: 35, spend: 58000 },
];

const pieData = [
  { name: 'Walmart', value: 35, color: '#3B82F6' },
  { name: 'Target', value: 25, color: '#10B981' },
  { name: 'Kroger', value: 20, color: '#8B5CF6' },
  { name: 'Costco', value: 20, color: '#F59E0B' },
];

export function ChartSection({ chartId, hasChart }: ChartSectionProps) {
  if (!hasChart) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Data Processing</h3>
          <p className="text-gray-500 mb-4 max-w-md">
            Your report is being generated. This typically takes 2-3 minutes for complex analysis.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartId) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">ROI Performance Overview</h3>
                <p className="text-gray-600">Return on investment analysis across all events</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="bg-slate-600 text-white px-6 py-4">
                <h4 className="text-lg font-semibold">ROI across all events: -108.42%</h4>
              </div>
              
              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Overall</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Events</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Trade Spend</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Total</td>
                      <td className="py-4 px-6 text-sm text-gray-700">4</td>
                      <td className="py-4 px-6 text-sm text-gray-700">$-3,87,753.7</td>
                      <td className="py-4 px-6 text-sm font-semibold text-red-600">-108.42%</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Positive ROI</td>
                      <td className="py-4 px-6 text-sm text-gray-700">1</td>
                      <td className="py-4 px-6 text-sm text-gray-700">$39,188.9</td>
                      <td className="py-4 px-6 text-sm font-semibold text-emerald-600">93.86%</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Negative ROI</td>
                      <td className="py-4 px-6 text-sm text-gray-700">3</td>
                      <td className="py-4 px-6 text-sm text-gray-700">$4,26,942.6</td>
                      <td className="py-4 px-6 text-sm font-semibold text-red-600">-89.85%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* ROI Chart */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">ROI Performance Visualization</h4>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Bar 
                    dataKey="roi" 
                    fill="url(#roiGradient)" 
                    radius={[8, 8, 0, 0]}
                    strokeWidth={0}
                  />
                  <defs>
                    <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <PieChartIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Analysis Report #{chartId}</h3>
                <p className="text-gray-600">Detailed performance insights</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[400px]">
      {renderChart()}
    </div>
  );
}

export default ChartSection;
