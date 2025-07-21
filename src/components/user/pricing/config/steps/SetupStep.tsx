'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Store, Package, DollarSign, Calendar } from 'lucide-react'
import { CheckboxList } from '../components'
import { ConfigStepProps } from '../types'
import { databases, retailers, brands, products } from '../constants'

export function SetupStep({ formData, onFormDataChange }: ConfigStepProps) {
  const handleSelectionChange = (field: keyof typeof formData, value: string | string[]) => {
    onFormDataChange({ [field]: value })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
          <Database className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Setup</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Configure your pricing model data sources and parameters</p>
      </div>

      {/* Database Selection */}
      <Card className="border-0 shadow-sm bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-slate-900 flex items-center gap-3 text-xl font-semibold">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            Data Source
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-6 border border-slate-200">
            <Label htmlFor="database" className="text-slate-700 font-medium text-sm mb-3 block">
              Select Database Connection
            </Label>
            <Select 
              value={formData.selectedDatabase} 
              onValueChange={(value) => handleSelectionChange('selectedDatabase', value)}
            >
              <SelectTrigger id="database" className="w-full bg-white border-slate-300 shadow-sm hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 h-12">
                <SelectValue placeholder="Choose a database connection" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200 shadow-lg">
                {databases.map((db) => (
                  <SelectItem key={db.id} value={db.id} className="hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-slate-500" />
                      {db.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Selection Filters */}
      <Card className="border-0 shadow-sm bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-slate-900 flex items-center gap-3 text-xl font-semibold">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Store className="w-5 h-5 text-emerald-600" />
            </div>
            Selection Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <CheckboxList
                title="Retailers"
                items={retailers}
                selectedItems={formData.selectedRetailers}
                onSelectionChange={(selection: string[]) => handleSelectionChange('selectedRetailers', selection)}
              />
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
              <CheckboxList
                title="Brands"
                items={brands}
                selectedItems={formData.selectedBrands}
                onSelectionChange={(selection: string[]) => handleSelectionChange('selectedBrands', selection)}
              />
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <CheckboxList
                title="Products"
                items={products}
                selectedItems={formData.selectedProducts}
                onSelectionChange={(selection: string[]) => handleSelectionChange('selectedProducts', selection)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Parameters */}
      <Card className="border-0 shadow-sm bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-slate-900 flex items-center gap-3 text-xl font-semibold">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Package className="w-5 h-5 text-indigo-600" />
            </div>
            Model Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-6 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="market-share" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                  <div className="p-1 bg-purple-100 rounded">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                  </div>
                  Market Share (%)
                </Label>
                <Input 
                  id="market-share" 
                  type="number" 
                  placeholder="e.g. 32" 
                  value={formData.marketShare} 
                  onChange={(e) => handleSelectionChange('marketShare', e.target.value)}
                  className="bg-white border-slate-300 shadow-sm hover:border-slate-400 focus:border-purple-500 transition-all duration-200 h-11" 
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="min-revenue" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                  <div className="p-1 bg-green-100 rounded">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  Minimum Revenue ($)
                </Label>
                <Input 
                  id="min-revenue" 
                  type="number" 
                  placeholder="e.g. 23" 
                  value={formData.minRevenue} 
                  onChange={(e) => handleSelectionChange('minRevenue', e.target.value)}
                  className="bg-white border-slate-300 shadow-sm hover:border-slate-400 focus:border-green-500 transition-all duration-200 h-11" 
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="num-weeks" className="text-slate-700 font-medium flex items-center gap-2 text-sm">
                  <div className="p-1 bg-orange-100 rounded">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  Number of Weeks
                </Label>
                <Input 
                  id="num-weeks" 
                  type="number" 
                  placeholder="e.g. 23" 
                  value={formData.numWeeks} 
                  onChange={(e) => handleSelectionChange('numWeeks', e.target.value)}
                  className="bg-white border-slate-300 shadow-sm hover:border-slate-400 focus:border-orange-500 transition-all duration-200 h-11" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
