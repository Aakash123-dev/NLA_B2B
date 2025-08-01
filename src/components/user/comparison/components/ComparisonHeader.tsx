'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, BarChart3, Brain } from 'lucide-react'

interface ComparisonHeaderProps {
  numberOfTpos: number | null
  onBack: () => void
  onNewComparison: () => void
  showNewComparisonButton?: boolean
  onSmartInsightsOpen?: () => void
}

export function ComparisonHeader({ 
  numberOfTpos, 
  onBack, 
  onNewComparison, 
  showNewComparisonButton = false,
  onSmartInsightsOpen
}: ComparisonHeaderProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-full"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg shadow-sm">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Plan Comparison
                </h1>
                {!numberOfTpos && (
                  <p className="text-sm text-gray-500">
                    Compare plans and analyze performance
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onSmartInsightsOpen && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-5"
                onClick={onSmartInsightsOpen}
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
                className="h-8 px-4 text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200 rounded-full"
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
