'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ArrowLeft, Target, Database, Store, Package, DollarSign, Calendar, TrendingUp, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { SearchableDropdownList } from './components'
import { TradePlanFormData, FormErrors } from '../types'
import { databaseOptions, retailerOptions, brandOptions, productOptions, yearOptions } from '../constants'
import { validateTradePlanForm, generateMockTradePlan } from '../utils'

export function TpoSetupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<TradePlanFormData>({
    trade_plan_name: "Trade Plan 12 2025 - Real Good Foods 2",
    project: "Real Good Foods Project",
    model: "Optimization Model v2.1",
    selectedDatabase: 'db1',
    selectedRetailers: [],
    selectedBrands: [],
    selectedProducts: [],
    year: 2025,
    marketShare: '',
    minRevenue: '',
    numWeeks: '',
    targetVolume: '',
    targetSpend: '',
    targetRevenue: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleBackToDesignStudio = () => {
    // Get URL parameters and preserve them when going back
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    router.push(`/user/design-studio?${params.toString()}`);
  }

  const handleBackToWelcome = () => {
    // Get URL parameters and preserve them when going back
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    router.push(`/user/tpo?${params.toString()}`);
  }

  const handleSelectionChange = (field: keyof TradePlanFormData, value: string | string[] | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleRemoveSelection = (field: keyof TradePlanFormData, itemId: string) => {
    const currentSelection = formData[field] as string[]
    const newSelection = currentSelection.filter(id => id !== itemId)
    setFormData(prev => ({
      ...prev,
      [field]: newSelection
    }))
  }

  const getItemName = (items: { id: string; name: string }[], id: string) => {
    return items.find(item => item.id === id)?.name || id
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateTradePlanForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate mock trade plan and store in localStorage for demo
      const tradePlan = generateMockTradePlan(formData)
      localStorage.setItem('currentTradePlan', JSON.stringify(tradePlan))
      
      router.push('/user/tpo/dashboard')
    } catch (error) {
      console.error("Error creating trade plan:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToWelcome}
              variant="ghost"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Target className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Create Trade Plan</h1>
                <p className="text-sm text-slate-600">Configure your trade plan optimization</p>
              </div>
            </div>
            <Button
              onClick={handleBackToDesignStudio}
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Design Studio
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6 h-full">
            
            {/* Left Section - Configuration */}
            <div className="col-span-8 space-y-6">
              
              {/* Basic Information */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Target className="w-5 h-5 text-indigo-600" />
                    </div>
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trade-plan-name" className="text-sm font-medium text-slate-700">
                        Trade Plan Name
                      </Label>
                      <Input 
                        id="trade-plan-name" 
                        value={formData.trade_plan_name} 
                        onChange={(e) => handleSelectionChange('trade_plan_name', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 transition-colors h-11" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm font-medium text-slate-700">Year</Label>
                      <Select 
                        value={formData.year.toString()} 
                        onValueChange={(value) => handleSelectionChange('year', parseInt(value))}
                      >
                        <SelectTrigger className="w-full bg-white border-slate-300 hover:border-slate-400 transition-colors h-11">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 shadow-lg">
                          {yearOptions.map((year) => (
                            <SelectItem key={year.value} value={year.value.toString()}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                      {databaseOptions.map((db) => (
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
                        items={retailerOptions}
                        selectedItems={formData.selectedRetailers}
                        onSelectionChange={(selection: string[]) => handleSelectionChange('selectedRetailers', selection)}
                        placeholder="Search retailers..."
                        maxHeight="200px"
                        colorScheme="blue"
                      />
                    </div>
                    <div className="space-y-3">
                      <SearchableDropdownList
                        title="Brands"
                        items={brandOptions}
                        selectedItems={formData.selectedBrands}
                        onSelectionChange={(selection: string[]) => handleSelectionChange('selectedBrands', selection)}
                        placeholder="Search brands..."
                        maxHeight="200px"
                        colorScheme="emerald"
                      />
                    </div>
                  </div>

                  {/* Products - Full Width Below */}
                  <div className="space-y-3">
                    <SearchableDropdownList
                      title="Products"
                      items={productOptions}
                      selectedItems={formData.selectedProducts}
                      onSelectionChange={(selection: string[]) => handleSelectionChange('selectedProducts', selection)}
                      placeholder="Search products..."
                      maxHeight="200px"
                      colorScheme="purple"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Trade Plan Parameters */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </div>
                    Trade Plan Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
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

                  {/* Target Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-volume" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-blue-100 rounded">
                          <Package className="w-3 h-3 text-blue-600" />
                        </div>
                        Target Volume
                      </Label>
                      <Input 
                        id="target-volume" 
                        type="number" 
                        placeholder="e.g. 5000" 
                        value={formData.targetVolume} 
                        onChange={(e) => handleSelectionChange('targetVolume', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-spend" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-red-100 rounded">
                          <DollarSign className="w-3 h-3 text-red-600" />
                        </div>
                        Target Spend ($)
                      </Label>
                      <Input 
                        id="target-spend" 
                        type="number" 
                        placeholder="e.g. 150000" 
                        value={formData.targetSpend} 
                        onChange={(e) => handleSelectionChange('targetSpend', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-red-500 transition-colors h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-revenue" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-emerald-100 rounded">
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                        </div>
                        Target Revenue ($)
                      </Label>
                      <Input 
                        id="target-revenue" 
                        type="number" 
                        placeholder="e.g. 800000" 
                        value={formData.targetRevenue} 
                        onChange={(e) => handleSelectionChange('targetRevenue', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-10" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Section - Current Selections */}
            <div className="col-span-4">
              <Card className="border border-slate-200 shadow-sm h-fit sticky top-24">
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
                          {databaseOptions.find(db => db.id === formData.selectedDatabase)?.name || 'Unknown'}
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
                              {getItemName(retailerOptions, retailerId)}
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
                              {getItemName(brandOptions, brandId)}
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
                              {getItemName(productOptions, productId)}
                              <X className="w-3 h-3 ml-1" />
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">No products selected</span>
                      )}
                    </div>
                  </div>

                  {/* Parameters Summary */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Parameters</Label>
                    <div className="p-3 bg-slate-50 rounded-lg border space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Market Share:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.marketShare ? `${formData.marketShare}%` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Min Revenue:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.minRevenue ? `$${formData.minRevenue}` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Weeks:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.numWeeks || 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Target Volume:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.targetVolume || 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Target Spend:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.targetSpend ? `$${formData.targetSpend}` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Target Revenue:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.targetRevenue ? `$${formData.targetRevenue}` : 'Not set'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating Trade Plan...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Create Trade Plan
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
