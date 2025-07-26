'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Link as LinkIcon, Settings } from 'lucide-react';
import { NodeConfigProps } from '../types';
import { useRouter } from 'next/navigation';

interface ToolContentProps extends NodeConfigProps {
  connectedNodes?: any[];
  onBackToStudio: () => void;
  tabs: any[];
  handleTabClick: (tabId: string) => void;
  handleNodeDoubleClick: (toolType: string, toolName: string, nodeId: string) => void;
}

export function ToolContent({ 
  nodeType, 
  nodeName, 
  nodeId,
  connectedNodes = [], 
  onBackToStudio,
  tabs,
  handleTabClick,
  handleNodeDoubleClick
}: ToolContentProps) {
  const router = useRouter();

  const handlePricingConfigure = () => {
    // Get URL parameters and preserve them when navigating to pricing
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    router.push(`/user/pricing-model?${params.toString()}`);
  };

  const handleTpoConfigure = () => {
    // Get URL parameters and preserve them when navigating to TPO
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    // Navigate to TPO main page first, then user can proceed to setup
    router.push(`/user/tpo?${params.toString()}`);
  };

  const handlePromoConfigure = () => {
    // Get URL parameters and preserve them when navigating to promo optimization
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    router.push(`/user/promo-optimization?${params.toString()}`);
  };

  const handleSimulatorConfigure = () => {
    // Get URL parameters and preserve them when navigating to simulator
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    router.push(`/user/simulator?${params.toString()}`);
  };
  const toolHeader = (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{nodeName}</h1>
                    <p className="text-slate-600 dark:text-slate-400">
            {nodeType === 'pricing' && 'Configure pricing models and competitive analysis'}
            {nodeType === 'forecasting' && 'Build predictive models for future trends'}
            {nodeType === 'insights-template' && 'Pre-built insight visualization templates'}
            {nodeType === 'trade-plan-optimization' && 'Optimize trading strategies and execution plans'}
            {nodeType === 'promo-optimization' && 'Optimize promotional campaigns and marketing strategies'}
            {nodeType === 'simulator' && 'Run pricing and scenario simulations with margin analysis'}
            {nodeType.startsWith('template-') && 'Visualization dashboard and analytics'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBackToStudio}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Studio</span>
          </Button>
          {connectedNodes.length > 0 && (
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Connected to:</span>
              <div className="flex space-x-2">
                {connectedNodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => {
                      const nodeTab = tabs.find(tab => tab.sourceItemId === node.id);
                      if (nodeTab) {
                        handleTabClick(nodeTab.id);
                      } else {
                        handleNodeDoubleClick(node.data.type, node.data.label, node.id);
                      }
                    }}
                    className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-medium hover:bg-cyan-200 dark:hover:bg-cyan-900/50 transition-colors"
                  >
                    {node.data.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  switch (nodeType) {
    case 'pricing':
      return (
        <div className="p-8 space-y-6">
          {toolHeader}
          <div className="mb-6">
            <Button
              onClick={handlePricingConfigure}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Settings className="w-4 h-4" />
              Configure Pricing Model
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Pricing Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pricing Model</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <option>Cost-Plus Pricing</option>
                    <option>Value-Based Pricing</option>
                    <option>Competitive Pricing</option>
                    <option>Dynamic Pricing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Margin (%)</label>
                  <input type="number" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg" placeholder="25" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Competitor Average</span>
                  <span className="font-medium text-slate-900 dark:text-white">$299</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Market Premium</span>
                  <span className="font-medium text-slate-900 dark:text-white">15%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
      
    case 'forecasting':
      return (
        <div className="p-8 space-y-6">
          {toolHeader}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Forecast Period</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                    <option>2 Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Algorithm</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <option>ARIMA</option>
                    <option>Linear Regression</option>
                    <option>Neural Network</option>
                    <option>Ensemble</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-2">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle>Historical Data Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-400 rounded mb-2 mx-auto"></div>
                      <p className="text-slate-500 dark:text-slate-400">Connect data source to view historical trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
      
    case 'trade-plan-optimization':
      return (
        <div className="p-8 space-y-6">
          {toolHeader}
          <div className="mb-6">
            <Button
              onClick={handleTpoConfigure}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Settings className="w-4 h-4" />
              Configure Trade Plan Optimization
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Optimization Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Risk Tolerance</label>
                  <input type="range" min="1" max="10" className="w-full" />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Return (%)</label>
                  <input type="number" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg" placeholder="12" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Equities</span>
                  <span className="font-medium text-slate-900 dark:text-white">60%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Bonds</span>
                  <span className="font-medium text-slate-900 dark:text-white">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Alternatives</span>
                  <span className="font-medium text-slate-900 dark:text-white">10%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
      
    case 'simulator':
      return (
        <div className="p-8 space-y-6">
          {toolHeader}
          <div className="mb-6">
            <Button
              onClick={handleSimulatorConfigure}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Settings className="w-4 h-4" />
              Configure Simulator
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Simulation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Scenario Type</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <option>Price Optimization</option>
                    <option>Volume Analysis</option>
                    <option>Margin Analysis</option>
                    <option>Competitive Response</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time Horizon</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <option>1 Month</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confidence Level (%)</label>
                  <input type="number" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg" placeholder="95" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Simulation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Expected Revenue Impact</span>
                  <span className="font-medium text-green-600">+12.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Margin Improvement</span>
                  <span className="font-medium text-green-600">+8.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Volume Change</span>
                  <span className="font-medium text-red-600">-3.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Risk Score</span>
                  <span className="font-medium text-orange-600">Medium</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
      
    case 'promo-optimization':
      return (
        <div className="p-8 space-y-6">
          {toolHeader}
          <div className="mb-6">
            <Button
              onClick={handlePromoConfigure}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Settings className="w-4 h-4" />
              Configure Promo Optimization
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Campaign Type</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <option>Discount Promotion</option>
                    <option>BOGO (Buy One Get One)</option>
                    <option>Bundle Deals</option>
                    <option>Volume Discounts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Discount (%)</label>
                  <input type="number" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg" placeholder="15" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Conversion Rate</span>
                  <span className="font-medium text-slate-900 dark:text-white">3.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">ROI</span>
                  <span className="font-medium text-slate-900 dark:text-white">225%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Customer Acquisition</span>
                  <span className="font-medium text-slate-900 dark:text-white">1,247</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
      
    default:
      if (nodeType.startsWith('template-')) {
        return (
          <div className="p-8 space-y-6">
            {toolHeader}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle>Chart Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Chart Type</label>
                    <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                      <option>Line Chart</option>
                      <option>Bar Chart</option>
                      <option>Area Chart</option>
                      <option>Scatter Plot</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time Period</label>
                    <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg">
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                      <option>Last Year</option>
                      <option>All Time</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle>Data Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-400 rounded mb-2 mx-auto"></div>
                      <p className="text-slate-500 dark:text-slate-400">Connect data source to preview visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      }
      
      return (
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            {toolHeader}
            <p className="text-slate-600 dark:text-slate-400">Tool configuration and content will be displayed here</p>
          </div>
        </div>
      );
  }
}
