'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Database, Store, Package, DollarSign, Calendar, TrendingUp, X } from 'lucide-react'
import { SearchableDropdownList } from '../components'
import { ConfigStepProps } from '../types'
import { databases, retailers, brands, products } from '../constants'
import { getSelectedNames } from '../utils'

export function SetupStep({ formData, onFormDataChange }: ConfigStepProps) {
  const handleSelectionChange = (field: keyof typeof formData, value: string | string[]) => {
    onFormDataChange({ [field]: value })
  }

  const handleRemoveSelection = (field: keyof typeof formData, itemId: string) => {
    const currentSelection = formData[field] as string[]
    const newSelection = currentSelection.filter(id => id !== itemId)
    onFormDataChange({ [field]: newSelection })
  }

  const getItemName = (items: { id: string; name: string }[], id: string) => {
    return items.find(item => item.id === id)?.name || id
  }

  return (
    <div className="h-full max-w-full mx-auto">
      {/* Single Page Layout */}
      <div className="grid grid-cols-12 gap-6 h-full">
        
        {/* Left Section - Configuration */}
        <div className="col-span-8 space-y-6">
          {/* Database Selection */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                Data Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={formData.selectedDatabase} 
                onValueChange={(value) => handleSelectionChange('selectedDatabase', value)}
              >
                <SelectTrigger className="w-full bg-white border-slate-300 hover:border-slate-400 transition-colors h-11">
                  <SelectValue placeholder="Choose database connection" />
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
            </CardContent>
          </Card>

          {/* Selection Filters */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Store className="w-5 h-5 text-emerald-600" />
                </div>
                Selection Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Retailers and Brands - Side by Side */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <SearchableDropdownList
                    title="Retailers"
                    items={retailers}
                    selectedItems={formData.selectedRetailers}
                    onSelectionChange={(selection: string[]) => handleSelectionChange('selectedRetailers', selection)}
                    placeholder="Search retailers..."
                    maxHeight="200px"
                  />
                </div>
                <div className="space-y-3">
                  <SearchableDropdownList
                    title="Brands"
                    items={brands}
                    selectedItems={formData.selectedBrands}
                    onSelectionChange={(selection: string[]) => handleSelectionChange('selectedBrands', selection)}
                    placeholder="Search brands..."
                    maxHeight="200px"
                  />
                </div>
              </div>

              {/* Products - Full Width Below */}
              <div className="space-y-3">
                <SearchableDropdownList
                  title="Products"
                  items={products}
                  selectedItems={formData.selectedProducts}
                  onSelectionChange={(selection: string[]) => handleSelectionChange('selectedProducts', selection)}
                  placeholder="Search products..."
                  maxHeight="200px"
                />
              </div>
            </CardContent>
          </Card>

          {/* Model Parameters */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                Model Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="market-share" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <div className="p-1 bg-purple-100 rounded">
                      <DollarSign className="w-3 h-3 text-purple-600" />
                    </div>
                    Market Share (%)
                  </Label>
                  <Input 
                    id="market-share" 
                    type="number" 
                    placeholder="e.g. 32" 
                    value={formData.marketShare} 
                    onChange={(e) => handleSelectionChange('marketShare', e.target.value)}
                    className="bg-white border-slate-300 hover:border-slate-400 focus:border-purple-500 transition-colors h-10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-revenue" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <div className="p-1 bg-green-100 rounded">
                      <DollarSign className="w-3 h-3 text-green-600" />
                    </div>
                    Min Revenue ($)
                  </Label>
                  <Input 
                    id="min-revenue" 
                    type="number" 
                    placeholder="e.g. 10000" 
                    value={formData.minRevenue} 
                    onChange={(e) => handleSelectionChange('minRevenue', e.target.value)}
                    className="bg-white border-slate-300 hover:border-slate-400 focus:border-green-500 transition-colors h-10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="num-weeks" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <div className="p-1 bg-orange-100 rounded">
                      <Calendar className="w-3 h-3 text-orange-600" />
                    </div>
                    Number of Weeks
                  </Label>
                  <Input 
                    id="num-weeks" 
                    type="number" 
                    placeholder="e.g. 12" 
                    value={formData.numWeeks} 
                    onChange={(e) => handleSelectionChange('numWeeks', e.target.value)}
                    className="bg-white border-slate-300 hover:border-slate-400 focus:border-orange-500 transition-colors h-10" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Current Selections */}
        <div className="col-span-4">
          <Card className="border border-slate-200 shadow-sm h-fit sticky top-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                Current Selections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Database Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Database</Label>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  {formData.selectedDatabase ? (
                    <span className="text-sm text-slate-800 font-medium">
                      {databases.find(db => db.id === formData.selectedDatabase)?.name || 'Unknown'}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-500">No database selected</span>
                  )}
                </div>
              </div>

              {/* Retailers */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Retailers ({formData.selectedRetailers.length})
                </Label>
                <div className="p-3 bg-slate-50 rounded-lg border min-h-[60px]">
                  {formData.selectedRetailers.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {formData.selectedRetailers.map(retailerId => (
                        <Badge 
                          key={retailerId} 
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs cursor-pointer"
                          onClick={() => handleRemoveSelection('selectedRetailers', retailerId)}
                        >
                          {getItemName(retailers, retailerId)}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500">No retailers selected</span>
                  )}
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Brands ({formData.selectedBrands.length})
                </Label>
                <div className="p-3 bg-slate-50 rounded-lg border min-h-[60px]">
                  {formData.selectedBrands.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {formData.selectedBrands.map(brandId => (
                        <Badge 
                          key={brandId} 
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs cursor-pointer"
                          onClick={() => handleRemoveSelection('selectedBrands', brandId)}
                        >
                          {getItemName(brands, brandId)}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500">No brands selected</span>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Products ({formData.selectedProducts.length})
                </Label>
                <div className="p-3 bg-slate-50 rounded-lg border min-h-[60px]">
                  {formData.selectedProducts.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {formData.selectedProducts.map(productId => (
                        <Badge 
                          key={productId} 
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs cursor-pointer"
                          onClick={() => handleRemoveSelection('selectedProducts', productId)}
                        >
                          {getItemName(products, productId)}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500">No products selected</span>
                  )}
                </div>
              </div>

              {/* Model Parameters Summary */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Parameters</Label>
                <div className="p-3 bg-slate-50 rounded-lg border space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Market Share:</span>
                    <span className="text-xs font-medium text-slate-800">
                      {formData.marketShare || 'Not set'}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Min Revenue:</span>
                    <span className="text-xs font-medium text-slate-800">
                      ${formData.minRevenue || 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Weeks:</span>
                    <span className="text-xs font-medium text-slate-800">
                      {formData.numWeeks || 'Not set'}
                    </span>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
