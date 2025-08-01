'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ArrowLeft, Plus, PieChart, Brain, Settings, ChevronDown, Eye, EyeOff } from 'lucide-react'
import { metricCategories } from '../constants'

interface TPOEventComparisonHeaderProps {
  numberOfEvents: number | null
  onBack: () => void
  onNewComparison: () => void
  showNewComparisonButton?: boolean
  brand?: string
  onOpenSmartInsights?: () => void
  visibleMetrics: Set<string>
  onToggleMetric: (metric: string) => void
}

export function TPOEventComparisonHeader({ 
  numberOfEvents, 
  onBack, 
  onNewComparison, 
  showNewComparisonButton = false,
  brand,
  onOpenSmartInsights,
  visibleMetrics,
  onToggleMetric
}: TPOEventComparisonHeaderProps) {
  const [isConfigureOpen, setIsConfigureOpen] = useState(false)

  const isMetricVisible = (metric: string): boolean => {
    return visibleMetrics.has(metric)
  }

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100/80 sticky top-0 z-40 shadow-sm">
      <div className="max-w-full px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-xl"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-sm">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {numberOfEvents ? (
                    `TPO Event Comparison${brand && brand !== 'all' ? ` • ${brand}` : ''}`
                  ) : (
                    'TPO Event Comparison'
                  )}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu open={isConfigureOpen} onOpenChange={setIsConfigureOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Configure Metrics
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[600px] max-h-[500px] overflow-y-auto custom-scrollbar" 
                align="end"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d1d5db #f3f4f6',
                }}
              >
                <DropdownMenuLabel className="text-base font-semibold">
                  Metric Visibility Controls
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="p-4">
                  <Tabs defaultValue="Financial Details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      {Object.keys(metricCategories).map(category => (
                        <TabsTrigger key={category} value={category} className="text-xs">
                          {category === 'Financial Details' && '💰'} 
                          {category === 'Financial Results' && '📊'} 
                          {category === 'Promotion Results' && '🏷️'} {category.split(' ')[0]}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(metricCategories).map(([categoryName, categoryData]) => (
                      <TabsContent key={categoryName} value={categoryName} className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {categoryData.metrics.map(metric => (
                            <div key={metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                {isMetricVisible(metric) ? (
                                  <Eye className="w-4 h-4 text-green-600" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                )}
                                <span className="text-sm font-medium text-gray-700">
                                  {metric}
                                </span>
                              </div>
                              <Switch
                                checked={isMetricVisible(metric)}
                                onCheckedChange={() => onToggleMetric(metric)}
                              />
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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
            {showNewComparisonButton && (
              <Button 
                variant="outline"
                size="sm"
                onClick={onNewComparison}
                className="h-9 px-5 text-purple-600 border-purple-200 bg-purple-50 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 rounded-xl font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Comparison
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
