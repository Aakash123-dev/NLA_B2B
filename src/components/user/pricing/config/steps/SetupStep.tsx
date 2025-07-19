'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Database, Store, Package, DollarSign, Calendar } from 'lucide-react'
import { CheckboxList } from '../components'
import { ConfigStepProps } from '../types'
import { databases, retailers, brands, products } from '../constants'

export function SetupStep({ formData, onFormDataChange }: ConfigStepProps) {
  const handleSelectionChange = (field: keyof typeof formData, value: string | string[]) => {
    onFormDataChange({ [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Database Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Data Source</h3>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <Label htmlFor="database" className="text-slate-700 font-medium">
            Select Database
          </Label>
          <Select 
            value={formData.selectedDatabase} 
            onValueChange={(value) => handleSelectionChange('selectedDatabase', value)}
          >
            <SelectTrigger id="database" className="w-full mt-2 bg-white border-slate-300 shadow-sm hover:border-slate-400 hover:bg-slate-50 transition-all duration-200">
              <SelectValue placeholder="Choose a database connection" />
            </SelectTrigger>
            <SelectContent>
              {databases.map((db) => (
                <SelectItem key={db.id} value={db.id}>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-500" />
                    {db.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selection Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Store className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Selection Filters</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <CheckboxList
              title="Retailers"
              items={retailers}
              selectedItems={formData.selectedRetailers}
              onSelectionChange={(selection: string[]) => handleSelectionChange('selectedRetailers', selection)}
            />
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <CheckboxList
              title="Brands"
              items={brands}
              selectedItems={formData.selectedBrands}
              onSelectionChange={(selection: string[]) => handleSelectionChange('selectedBrands', selection)}
            />
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <CheckboxList
              title="Products"
              items={products}
              selectedItems={formData.selectedProducts}
              onSelectionChange={(selection: string[]) => handleSelectionChange('selectedProducts', selection)}
            />
          </div>
        </div>
      </div>

      {/* Model Parameters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Model Parameters</h3>
        </div>
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="market-share" className="text-slate-700 font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-500" />
                Market Share (%)
              </Label>
              <Input 
                id="market-share" 
                type="number" 
                placeholder="e.g. 10" 
                value={formData.marketShare} 
                onChange={(e) => handleSelectionChange('marketShare', e.target.value)}
                className="mt-2 bg-white border-slate-300 shadow-sm hover:border-slate-400 focus:border-blue-500 transition-all duration-200" 
              />
            </div>
            <div>
              <Label htmlFor="min-revenue" className="text-slate-700 font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-500" />
                Minimum Revenue ($)
              </Label>
              <Input 
                id="min-revenue" 
                type="number" 
                placeholder="e.g. 100000" 
                value={formData.minRevenue} 
                onChange={(e) => handleSelectionChange('minRevenue', e.target.value)}
                className="mt-2 bg-white border-slate-300 shadow-sm hover:border-slate-400 focus:border-blue-500 transition-all duration-200" 
              />
            </div>
            <div>
              <Label htmlFor="num-weeks" className="text-slate-700 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                Number of Weeks
              </Label>
              <Input 
                id="num-weeks" 
                type="number" 
                placeholder="e.g. 52" 
                value={formData.numWeeks} 
                onChange={(e) => handleSelectionChange('numWeeks', e.target.value)}
                className="mt-2 bg-white border-slate-300 shadow-sm hover:border-slate-400 focus:border-blue-500 transition-all duration-200" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
