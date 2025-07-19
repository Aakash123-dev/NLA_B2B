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
  BarChart3
} from 'lucide-react'
import { ConfigStepProps } from '../types'
import { getSelectedNames, getAllSelectedNames, getDisplayValue, formatCurrency } from '../utils'
import { databases, retailers, brands, products, availableColumns } from '../constants'

export function SummaryStep({ formData }: ConfigStepProps) {
  const selectedDatabase = databases.find(db => db.id === formData.selectedDatabase)
  const totalSelections = formData.selectedRetailers.length + formData.selectedBrands.length + formData.selectedProducts.length + formData.selectedColumns.length
  
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Configuration Summary</h3>
          <p className="text-slate-600 text-sm">Review your settings before running the analysis</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <Database className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-lg font-bold text-blue-800">1</div>
          <div className="text-xs text-blue-600">Retailer</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
          <Store className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-lg font-bold text-emerald-800">{formData.selectedRetailers.length}</div>
          <div className="text-xs text-emerald-600">Brand</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <Package className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-lg font-bold text-purple-800">{formData.selectedBrands.length + formData.selectedProducts.length}</div>
          <div className="text-xs text-purple-600"> Products</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
          <Columns className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <div className="text-lg font-bold text-indigo-800">{formData.selectedColumns.length}</div>
          <div className="text-xs text-indigo-600">Data Columns</div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Data Source */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-blue-600" />
            <h4 className="text-base font-semibold text-slate-800">Data Source & Scope</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium">Database:</span>
                <span className="text-slate-800 font-semibold">
                  {selectedDatabase?.name || 'None selected'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium">Retailers:</span>
                <span className="text-slate-800 text-right max-w-xs truncate" title={getAllSelectedNames(formData.selectedRetailers, retailers)}>
                  {getSelectedNames(formData.selectedRetailers, retailers)}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium">Brands:</span>
                <span className="text-slate-800 text-right max-w-xs truncate" title={getAllSelectedNames(formData.selectedBrands, brands)}>
                  {getSelectedNames(formData.selectedBrands, brands)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600 font-medium">Products:</span>
                <span className="text-slate-800 text-right max-w-xs truncate" title={getAllSelectedNames(formData.selectedProducts, products)}>
                  {getSelectedNames(formData.selectedProducts, products)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Model Parameters */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <h4 className="text-base font-semibold text-slate-800">Model Parameters</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm text-slate-600">Market Share</div>
                <div className="font-semibold text-slate-800">{getDisplayValue(formData.marketShare, '%')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-slate-600">Min Revenue</div>
                <div className="font-semibold text-slate-800">{formatCurrency(formData.minRevenue)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-sm text-slate-600">Weeks</div>
                <div className="font-semibold text-slate-800">{getDisplayValue(formData.numWeeks)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Columns */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Columns className="w-5 h-5 text-indigo-600" />
            <h4 className="text-base font-semibold text-slate-800">Selected Data Columns</h4>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            {formData.selectedColumns.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.selectedColumns.map(columnId => {
                  const column = availableColumns.find(col => col.id === columnId)
                  return (
                    <span key={columnId} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {column?.name}
                    </span>
                  )
                })}
              </div>
            ) : (
              <p className="text-slate-500 italic">No columns selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Ready to Run */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-emerald-800">Ready to Execute</h4>
            <p className="text-emerald-700">
              Your configuration is complete with {totalSelections} selections. 
              Click "Run Analysis" to start the pricing model processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
