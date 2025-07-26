'use client'

import React from 'react'
import { BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PromotionAnalysisSection() {
  return (
    <Card className="border border-slate-200 shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
          </div>
          Promotion Analysis
        </CardTitle>
        
        {/* Legend */}
        <div className="flex items-center gap-6 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">TPR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">Feature Only</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">Display Only</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">Feature and Display</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-600">Event Incremental</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 border-t border-slate-200">
          <div className="text-center text-slate-500">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium text-slate-600">Chart visualization will appear here</p>
            <p className="text-sm text-slate-500">Upload event data to view promotion analysis</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
