'use client';

import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  Clock,
  BarChart3,
  ArrowLeft,
  Save,
  Download
} from 'lucide-react';
import Link from 'next/link';

export default function SimulatorPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('base');
  const [simulationProgress, setSimulationProgress] = useState(0);

  const scenarios = [
    {
      id: 'base',
      name: 'Base Scenario',
      description: 'Current market conditions',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      id: 'optimistic',
      name: 'Optimistic Growth',
      description: '25% market growth scenario',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 'conservative',
      name: 'Conservative Model',
      description: 'Risk-averse projections',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      id: 'aggressive',
      name: 'Aggressive Strategy',
      description: 'High-risk, high-reward',
      icon: Zap,
      color: 'bg-purple-500'
    }
  ];

  const simulationResults = [
    {
      metric: 'Revenue Projection',
      base: '$2.4M',
      optimistic: '$3.1M',
      conservative: '$2.0M',
      aggressive: '$3.8M',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      metric: 'User Acquisition',
      base: '12.5K',
      optimistic: '18.2K',
      conservative: '9.8K',
      aggressive: '25.1K',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      metric: 'Market Share',
      base: '8.2%',
      optimistic: '12.1%',
      conservative: '6.5%',
      aggressive: '15.8%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      metric: 'ROI',
      base: '234%',
      optimistic: '312%',
      conservative: '189%',
      aggressive: '445%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setSimulationProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/user/projects"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Projects</span>
              </Link>
              <div className="w-px h-6 bg-slate-300" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Business Simulator</h1>
                  <p className="text-sm text-slate-600">Model and test different scenarios</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Save className="w-4 h-4" />
                Save Config
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Simulation Controls */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-500" />
                  Simulation Controls
                </CardTitle>
                <CardDescription>Configure and run your simulation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scenario Selection */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Select Scenario</h4>
                  <div className="space-y-2">
                    {scenarios.map((scenario) => {
                      const Icon = scenario.icon;
                      return (
                        <button
                          key={scenario.id}
                          onClick={() => setSelectedScenario(scenario.id)}
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                            selectedScenario === scenario.id
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${scenario.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">{scenario.name}</p>
                              <p className="text-xs text-slate-600">{scenario.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Simulation Parameters */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Parameters</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Time Period</label>
                      <select className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                        <option>6 Months</option>
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>5 Years</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Market Conditions</label>
                      <select className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                        <option>Normal</option>
                        <option>Recession</option>
                        <option>Growth</option>
                        <option>Volatile</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Investment Level ($)</label>
                      <input 
                        type="range" 
                        min="100000" 
                        max="1000000" 
                        defaultValue="500000"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>$100K</span>
                        <span>$1M</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleRunSimulation}
                    disabled={isRunning}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Running... {simulationProgress}%
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Pause className="w-4 h-4" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                {(isRunning || simulationProgress > 0) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium text-slate-800">{simulationProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${simulationProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {/* Results Overview */}
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Simulation Results
                </CardTitle>
                <CardDescription>Comparative analysis across all scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-800">Metric</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-800">Base</th>
                        <th className="text-center py-3 px-4 font-semibold text-green-600">Optimistic</th>
                        <th className="text-center py-3 px-4 font-semibold text-orange-600">Conservative</th>
                        <th className="text-center py-3 px-4 font-semibold text-purple-600">Aggressive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {simulationResults.map((result, index) => {
                        const Icon = result.icon;
                        return (
                          <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${result.color}`} />
                                <span className="font-medium text-slate-800">{result.metric}</span>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4 font-semibold text-slate-800">{result.base}</td>
                            <td className="text-center py-4 px-4 font-semibold text-green-600">{result.optimistic}</td>
                            <td className="text-center py-4 px-4 font-semibold text-orange-600">{result.conservative}</td>
                            <td className="text-center py-4 px-4 font-semibold text-purple-600">{result.aggressive}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Charts and Visualizations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue Projection Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Projection</CardTitle>
                  <CardDescription>12-month revenue forecast</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <p className="text-slate-600 font-medium">Revenue Chart</p>
                      <p className="text-sm text-slate-500">Interactive visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                  <CardDescription>Scenario risk analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { scenario: 'Base', risk: 'Low', confidence: '89%', color: 'bg-blue-500' },
                      { scenario: 'Optimistic', risk: 'Medium', confidence: '76%', color: 'bg-green-500' },
                      { scenario: 'Conservative', risk: 'Very Low', confidence: '94%', color: 'bg-orange-500' },
                      { scenario: 'Aggressive', risk: 'High', confidence: '62%', color: 'bg-purple-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 ${item.color} rounded-full`} />
                          <span className="font-medium text-slate-800">{item.scenario}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">{item.risk} Risk</p>
                          <p className="text-xs text-slate-600">{item.confidence} confidence</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
