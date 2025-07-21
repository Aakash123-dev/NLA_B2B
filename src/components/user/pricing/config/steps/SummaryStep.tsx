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
  TrendingUp
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Summary</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Review your pricing model configuration before execution</p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">1</div>
              <div className="text-sm text-slate-600">Database</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Store className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{formData.selectedRetailers.length}</div>
              <div className="text-sm text-slate-600">Retailers</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{formData.selectedBrands.length + formData.selectedProducts.length}</div>
              <div className="text-sm text-slate-600">Items</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Columns className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{formData.selectedColumns.length}</div>
              <div className="text-sm text-slate-600">Columns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Source & Scope */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Data & Scope
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Database</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {selectedDatabase?.name || 'None selected'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Retailers</span>
                <span className="text-slate-800 font-semibold text-right">
                  {getSelectedNames(formData.selectedRetailers, retailers)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Brands</span>
                <span className="text-slate-800 font-semibold text-right">
                  {getSelectedNames(formData.selectedBrands, brands)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Products</span>
                <span className="text-slate-800 font-semibold text-right">
                  {getSelectedNames(formData.selectedProducts, products)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Parameters */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Model Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-emerald-700 font-medium">Market Share</div>
                  <div className="text-lg font-bold text-emerald-800">{getDisplayValue(formData.marketShare, '%')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-blue-700 font-medium">Min Revenue</div>
                  <div className="text-lg font-bold text-blue-800">{formatCurrency(formData.minRevenue)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-orange-700 font-medium">Weeks to Model</div>
                  <div className="text-lg font-bold text-orange-800">{getDisplayValue(formData.numWeeks)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Columns */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
            <Columns className="w-5 h-5 text-indigo-600" />
            Selected Data Columns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
            {formData.selectedColumns.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.selectedColumns.map(columnId => {
                  const column = availableColumns.find(col => col.id === columnId)
                  return (
                    <Badge key={columnId} variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                      {column?.name}
                    </Badge>
                  )
                })}
              </div>
            ) : (
              <p className="text-slate-500 italic">No columns selected</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ready to Execute */}
      <Card className="border-emerald-200 shadow-sm">
        <CardContent className="p-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-emerald-800">Ready to Execute</h3>
                <p className="text-emerald-700 mt-1">
                  Configuration completed with {totalSelections} total selections. Click "Run Analysis" to start processing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
