'use client'

import React from 'react'
import { 
  CheckCircle2, 
  Database, 
  Store, 
  Package, 
  DollarSign, 
  Calendar, 
  Columns,
  Target,
  BarChart3,
  TrendingUp,
  Settings,
  Play
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ConfigStepProps } from '../types'
import { getSelectedNames, getAllSelectedNames, getDisplayValue, formatCurrency } from '../utils'
import { databases, retailers, brands, products, availableColumns } from '../constants'

export function SummaryStep({ formData }: ConfigStepProps) {
  const selectedDatabase = databases.find(db => db.id === formData.selectedDatabase)
  const totalSelections = formData.selectedRetailers.length + formData.selectedBrands.length + formData.selectedProducts.length + formData.selectedColumns.length
  
  return (
    <div className="h-full max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-50 rounded-xl shadow-sm">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Configuration Summary</h2>
            <p className="text-slate-600">Review your pricing model configuration before execution</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left Section - Configuration Details */}
        <div className="col-span-8 space-y-6">
          
          {/* Data Source & Scope */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-600" />
                Data Source & Scope
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-blue-100 rounded-md">
                      <Database className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Database</span>
                  </div>
                  <p className="text-slate-800 font-semibold">
                    {selectedDatabase?.name || 'None selected'}
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-emerald-100 rounded-md">
                      <Store className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">Retailers</span>
                      <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                        {formData.selectedRetailers.length}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-800 font-semibold text-sm">
                    {getSelectedNames(formData.selectedRetailers, retailers)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-purple-100 rounded-md">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">Brands</span>
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        {formData.selectedBrands.length}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-800 font-semibold text-sm">
                    {getSelectedNames(formData.selectedBrands, brands)}
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-orange-100 rounded-md">
                      <Package className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">Products</span>
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                        {formData.selectedProducts.length}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-800 font-semibold text-sm">
                    {getSelectedNames(formData.selectedProducts, products)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Parameters */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <Settings className="w-5 h-5 text-indigo-600" />
                Model Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-emerald-700">Market Share</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-800">
                    {getDisplayValue(formData.marketShare, '%')}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-blue-700">Min Revenue</span>
                  </div>
                  <p className="text-xl font-bold text-blue-800">
                    {formatCurrency(formData.minRevenue)}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-orange-700">Weeks</span>
                  </div>
                  <p className="text-xl font-bold text-orange-800">
                    {getDisplayValue(formData.numWeeks)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Columns */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <Columns className="w-5 h-5 text-cyan-600" />
                Selected Data Columns
                <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                  {formData.selectedColumns.length} selected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                {formData.selectedColumns.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedColumns.map(columnId => {
                      const column = availableColumns.find(col => col.id === columnId)
                      return (
                        <Badge 
                          key={columnId} 
                          variant="secondary" 
                          className="bg-white text-slate-700 border border-slate-200 shadow-sm"
                        >
                          {column?.name}
                        </Badge>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-center py-4">No columns selected</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Summary Panel */}
        <div className="col-span-4">
          <div className="sticky top-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Configuration Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Database</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      1 Selected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">Retailers</span>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      {formData.selectedRetailers.length} Selected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-700">Brands</span>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {formData.selectedBrands.length} Selected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">Products</span>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {formData.selectedProducts.length} Selected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                    <div className="flex items-center gap-2">
                      <Columns className="w-4 h-4 text-cyan-600" />
                      <span className="text-sm font-medium text-cyan-700">Columns</span>
                    </div>
                    <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                      {formData.selectedColumns.length} Selected
                    </Badge>
                  </div>
                </div>

                {/* Execution Ready Status */}
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-emerald-800">Ready to Execute</h3>
                      <p className="text-xs text-emerald-600">All configurations completed</p>
                    </div>
                  </div>
                  <div className="text-sm text-emerald-700">
                    <p className="font-medium mb-1">Total Selections: {totalSelections}</p>
                    <p className="text-xs opacity-75">Click "Run Analysis" to start processing your pricing model</p>
                  </div>
                </div>

                {/* Configuration Health */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Configuration Health</h4>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600">Database connected</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600">Retailers selected</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600">Products configured</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600">Data columns selected</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600">Parameters configured</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
