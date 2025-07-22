'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronRight, Sparkles, ArrowLeft, Target, Zap, TrendingUp, BarChart3, Settings, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { FormField, CsvImportField } from './components'
import { TradePlanFormData, FormErrors } from '../types'
import { retailerOptions, brandOptions, yearOptions } from '../constants'
import { validateTradePlanForm, generateMockTradePlan } from '../utils'

export function TpoSetupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<TradePlanFormData>({
    trade_plan_name: "Trade Plan 12 2025 - Real Good Foods 2",
    project: "Real Good Foods Project",
    model: "Optimization Model v2.1",
    retailer: "",
    brand: "",
    year: 2025,
    csvFile: null
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

  const handleInputChange = (field: keyof TradePlanFormData, value: string | number | File | null) => {
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

  const handleCsvFileChange = (file: File | null) => {
    handleInputChange('csvFile', file)
  }

  const handleTemplateDownload = () => {
    // Create CSV template
    const headers = [
      'Start Date',
      'End Date', 
      'Product Name',
      'Product Code',
      'Event Type',
      'Base Price',
      'Promotional Price',
      'Description'
    ]
    
    const instructionRow = [
      'YYYY-MM-DD',
      'YYYY-MM-DD',
      'Product name (required)',
      'Unique product identifier',
      'Sale/Promotion/Discount/Launch',
      'Original price (e.g., 12.99)',
      'Discounted price (e.g., 9.99)',
      'Event description'
    ]
    
    const csvContent = [
      headers.join(','),
      instructionRow.join(','),
      // Add empty rows for user input
      ',,,,,,,',
      ',,,,,,,',
      ','
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `trade_plan_template_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
      {/* Header Section - Modern & Minimalist with Centered Title */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 border-b border-white/10 backdrop-blur-xl w-full">
        <div className="w-full px-6 lg:px-12 xl:px-16 ">
          <div className="relative flex items-center justify-center py-5">
            {/* Left: Back Button - Absolute positioned */}
            <div className="absolute left-0  flex items-center">
              <Button
                onClick={handleBackToWelcome}
                variant="ghost"
                className="flex items-center gap-2 text-white hover:text-white hover:bg-white/5 transition-all duration-200 rounded-lg px-3 py-2.5 text-md font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>

            {/* Center: Title and Icon - Perfectly Centered */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white tracking-tight">Create Trade Plan</h1>
                <p className="text-blue-100/80 text-sm mt-0.5">Setup your optimization parameters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
        >
          {/* Form Container with Grid Layout */}
          <div className="p-6 lg:p-8"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField
                    label="Trade Plan Name"
                    value={formData.trade_plan_name}
                    onChange={(value) => handleInputChange('trade_plan_name', value)}
                    placeholder="Enter trade plan name"
                    disabled={true}
                  />

                  <FormField
                    label="Project"
                    value={formData.project}
                    onChange={(value) => handleInputChange('project', value)}
                    placeholder="Enter project name"
                    required
                    disabled={true}
                  />

                  <FormField
                    label="Model"
                    value={formData.model}
                    onChange={(value) => handleInputChange('model', value)}
                    placeholder="Enter model name"
                    required
                    disabled={true}
                  />
                </div>
              </div>

              {/* Configuration Parameters Section */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Configuration Parameters</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Year"
                    value={formData.year.toString()}
                    onChange={(value) => handleInputChange('year', parseInt(value))}
                    placeholder="Select year"
                    required
                    error={errors.year}
                    options={yearOptions}
                  />

                  <FormField
                    label="Retailer"
                    value={formData.retailer}
                    onChange={(value) => handleInputChange('retailer', value)}
                    placeholder="Select a retailer"
                    required
                    error={errors.retailer}
                    options={retailerOptions.map(r => ({ value: r.id, label: r.name }))}
                  />

                  <FormField
                    label="Brand"
                    value={formData.brand}
                    onChange={(value) => handleInputChange('brand', value)}
                    placeholder="Select a brand"
                    required
                    error={errors.brand}
                    options={brandOptions.map(b => ({ value: b.id, label: b.name }))}
                  />
                </div>
              </div>

              {/* Data Import Section - Now directly below Configuration */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Data Import (Required)</h2>
                </div>
                
                <div className="space-y-4">
                  <CsvImportField
                    label="Upload Historical Promotion Data"
                    value={formData.csvFile}
                    onChange={handleCsvFileChange}
                    required
                    error={errors.csvFile}
                    onTemplateDownload={handleTemplateDownload}
                  />
                  
                  {!formData.csvFile && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800 font-medium">
                        📋 CSV file is required to proceed
                      </p>
                      <p className="text-xs text-amber-700 mt-1">
                        Download template above to get started
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Highlights Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Platform Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Advanced Analytics</p>
                    <p className="text-sm text-gray-600">Real-time insights & reporting</p>
                  </div>

                  <div className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">AI-Powered</p>
                    <p className="text-sm text-gray-600">Smart optimization engine</p>
                  </div>

                  <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Growth Tracking</p>
                    <p className="text-sm text-gray-600">Monitor performance metrics</p>
                  </div>

                  <div className="group p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Settings className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Customizable</p>
                    <p className="text-sm text-gray-600">Flexible configuration options</p>
                  </div>
                </div>
              </div>

              {/* Submit Button Section */}
              <div className="bg-gradient-to-r flex justify-center from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className=" w-1/2"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.csvFile}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Trade Plan...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-5 h-5" />
                        <span>Continue </span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
