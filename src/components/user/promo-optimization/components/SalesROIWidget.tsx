'use client'

import React from 'react'
import { TrendingUp, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SalesROIWidgetProps {
  roi?: number
}

export function SalesROIWidget({ roi }: SalesROIWidgetProps) {
  const getROIStatus = (roiValue: number) => {
    if (roiValue >= 4) return { label: 'Excellent', color: 'bg-emerald-500' }
    if (roiValue >= 3) return { label: 'Good', color: 'bg-green-500' }
    if (roiValue >= 2) return { label: 'Fair', color: 'bg-yellow-500' }
    if (roiValue >= 1) return { label: 'Poor', color: 'bg-orange-500' }
    return { label: 'Loss', color: 'bg-red-500' }
  }

  const roiValue = roi || 0
  const roiStatus = getROIStatus(roiValue)

  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <Award className="w-4 h-4 text-white" />
          </div>
          Sales ROI Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Main ROI Display */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-700 mb-2">
                {roi ? roi.toFixed(1) : '-'}
                {roi && <span className="text-xl font-medium text-emerald-600">:1</span>}
              </div>
              <div className="text-sm text-slate-600">Return on Investment</div>
            </div>
            
            <div className="h-12 w-px bg-slate-200"></div>
            
            <div className="text-center">
              <Badge className={`${roiStatus.color} text-white mb-2`}>
                {roiStatus.label}
              </Badge>
              <div className="text-sm text-slate-600">Performance</div>
            </div>
          </div>

          {/* Simple Progress Indicator */}
          <div className="flex-1 max-w-xs ml-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600">Progress</span>
              <span className="text-sm font-medium text-slate-700">{roi ? roi.toFixed(1) : '0'}/5.0</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((roiValue / 5) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Every $1 invested returns ${roi ? roi.toFixed(1) : '0'} in sales
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
