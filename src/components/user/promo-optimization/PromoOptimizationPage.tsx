'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  Calendar, 
  DollarSign, 
  Package,
  BarChart3,
  FileText,
  TrendingUp,
  ChevronRight,
  Target,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { SearchableSelect } from '@/components/user/pricing/config/components/SearchableSelect'
import { retailers, brands, products } from '@/components/user/pricing/config/constants'

export function PromoOptimizationPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    selectedRetailer: '',
    selectedBrand: '',
    selectedProduct: '',
    event: '',
    basePrice: 0,
    promoPrice: 0,
    discountPercent: 0,
    units: 0,
    tprACV: 0,
    displayOnlyACV: 0,
    featureOnlyACV: 0,
    featureDisplayACV: 0,
    listPrice: 0,
    spoilPerUnit: 0,
    edlpPerUnit: 0,
    promoPerUnit: 0,
    netPrice: 0,
    cogsPerUnit: 0,
    vcm: 0,
    fixedFees: 0,
    uploadedFile: null as File | null
  })

  const handleBackToHome = () => {
    router.push('/user/dashboard')
  }

  const handleSelectionChange = (field: string, selection: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: selection
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleInputChange('uploadedFile', file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToHome}
              variant="ghost"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Promo Optimization</h1>
                <p className="text-sm text-slate-600">Analyze promotional effectiveness and optimize performance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Insights
              </Button>
              <Button variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <div className="space-y-6">
              
              {/* Product Configuration - 100% Width */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded-md">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    Product Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selection Section - Clean 3-column layout */}
                  <div className="grid grid-cols-3 gap-4">
                    <SearchableSelect
                      title="Retailer"
                      items={retailers}
                      selectedItem={formData.selectedRetailer}
                      onSelectionChange={(selection: string) => handleSelectionChange('selectedRetailer', selection)}
                      placeholder="Search retailers..."
                      maxHeight="250px"
                    />
                    <SearchableSelect
                      title="Brand"
                      items={brands}
                      selectedItem={formData.selectedBrand}
                      onSelectionChange={(selection: string) => handleSelectionChange('selectedBrand', selection)}
                      placeholder="Search brands..."
                      maxHeight="250px"
                    />
                    <SearchableSelect
                      title="Product"
                      items={products}
                      selectedItem={formData.selectedProduct}
                      onSelectionChange={(selection: string) => handleSelectionChange('selectedProduct', selection)}
                      placeholder="Search products..."
                      maxHeight="250px"
                    />
                  </div>
                  
                  {/* File Upload Section - Simplified */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <Label className="text-sm font-medium text-slate-700">Event Data:</Label>
                      <div className="flex items-center gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".csv,.xlsx,.xls"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleUploadClick}
                          className="border-slate-300 text-slate-600 hover:bg-slate-50 h-8"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                        <span className="text-xs text-slate-500">
                          {formData.uploadedFile ? formData.uploadedFile.name : 'No file chosen'}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white h-8"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Promotion Analysis + Event Configuration - Side by Side */}
              <div className="grid grid-cols-12 gap-6">
                {/* Left Side - Promotion Analysis */}
                <div className="col-span-8">
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
                </div>

                {/* Right Side - Event Configuration */}
                <div className="col-span-4">
                  <Card className="border border-slate-200 shadow-sm h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        Event Configuration
                      </CardTitle>
                      <p className="text-sm text-slate-600 mt-1">Configure pricing and promotional parameters</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Price Configuration Section */}
                      <div className="space-y-4">
                        <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide text-slate-500 border-b border-slate-200 pb-2">
                          Price Configuration
                        </div>
                        
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between py-2">
                            <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                              Base Price
                            </Label>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-sm font-medium text-slate-600">$</span>
                              <Input
                                type="number"
                                step="0.01"
                                value={formData.basePrice || ''}
                                onChange={(e) => handleInputChange('basePrice', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                              Promo Price
                            </Label>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-sm font-medium text-slate-600">$</span>
                              <Input
                                type="number"
                                step="0.01"
                                value={formData.promoPrice || ''}
                                onChange={(e) => handleInputChange('promoPrice', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                                className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                              Discount %
                            </Label>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-sm font-medium text-slate-600">%</span>

                              <Input
                                type="number"
                                step="0.1"
                                value={formData.discountPercent || ''}
                                onChange={(e) => handleInputChange('discountPercent', parseFloat(e.target.value) || 0)}
                                placeholder="0.0"
                                className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                              Units
                            </Label>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Input
                                type="number"
                                value={formData.units || ''}
                                onChange={(e) => handleInputChange('units', parseInt(e.target.value) || 0)}
                                placeholder="0"
                                className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                  {/* ACV Distribution Section */}
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide text-slate-500 border-b border-slate-200 pb-2">
                      ACV Distribution
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                          TPR ACV %
                        </Label>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.tprACV || ''}
                            onChange={(e) => handleInputChange('tprACV', parseFloat(e.target.value) || 0)}
                            placeholder="0.0"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                          />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                          Display Only ACV %
                        </Label>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.displayOnlyACV || ''}
                            onChange={(e) => handleInputChange('displayOnlyACV', parseFloat(e.target.value) || 0)}
                            placeholder="0.0"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                          />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                          Feature Only ACV %
                        </Label>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.featureOnlyACV || ''}
                            onChange={(e) => handleInputChange('featureOnlyACV', parseFloat(e.target.value) || 0)}
                            placeholder="0.0"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                          />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-sm font-medium text-slate-700 min-w-0 flex-1">
                          Feature & Display ACV %
                        </Label>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.featureDisplayACV || ''}
                            onChange={(e) => handleInputChange('featureDisplayACV', parseFloat(e.target.value) || 0)}
                            placeholder="0.0"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                          />
                          <span className="text-sm text-slate-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>                      {/* Action Button */}
                      <div className="pt-4 border-t border-slate-200">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-11">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Run Analysis
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Promotion Results Table - 100% Width */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    Promotion Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-hidden border-t border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                          <TableHead className="font-semibold text-slate-700 py-3 px-4">Promotion Type</TableHead>
                          <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">% ACV</TableHead>
                          <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">% Lift</TableHead>
                          <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">Units</TableHead>
                          <TableHead className="font-semibold text-slate-700 text-center py-3 px-4">Dollars</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-blue-50/50 transition-colors">
                          <TableCell className="font-medium py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              TPR
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-emerald-50/50 transition-colors">
                          <TableCell className="font-medium py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              Feature Only
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-amber-50/50 transition-colors">
                          <TableCell className="font-medium py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              Display Only
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-red-50/50 transition-colors">
                          <TableCell className="font-medium py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              Feature and Display
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                        </TableRow>
                        <TableRow className="bg-purple-50/70 hover:bg-purple-100/70 transition-colors">
                          <TableCell className="font-semibold py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              Event Incremental
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 py-3 px-4">-</TableCell>
                        </TableRow>
                        <TableRow className="bg-slate-100/70 hover:bg-slate-200/70 transition-colors border-t-2 border-slate-300">
                          <TableCell className="font-bold py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                              Event Total
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
                          <TableCell className="text-center text-slate-500 font-semibold py-3 px-4">-</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Analysis + Financial Parameters - Side by Side */}
              <div className="grid grid-cols-12 gap-6">
                {/* Left Side - Financial Analysis */}
                <div className="col-span-6">
                  <Card className="border border-slate-200 shadow-sm h-full">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        Financial Analysis
                      </CardTitle>
                      <p className="text-sm text-slate-600 mt-1">Event performance and profitability metrics</p>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {[
                          { label: 'Mfr Gross Revenue', value: '-', highlight: false },
                          { label: 'Incremental Revenue', value: '-', highlight: false },
                          { label: 'Spoils', value: '-', highlight: false },
                          { label: 'Trade Spend', value: '$0', highlight: true, color: 'red' },
                          { label: 'Mfr Net Revenue', value: '$0', highlight: true, color: 'red' },
                          { label: 'COGS', value: '$0', highlight: true, color: 'red' },
                          { label: 'Mfr Gross Margin (Unpromoted)', value: '$0', highlight: true, color: 'red' },
                          { label: 'Mfr Gross Margin % (Unpromoted)', value: '-', highlight: false },
                          { label: 'Mfr Gross Margin', value: '$0', highlight: true, color: 'red' },
                          { label: 'Mfr Gross Margin %', value: '-', highlight: false },
                          { label: 'Sales ROI', value: '-', highlight: false },
                          { label: 'Retail Gross Revenue', value: '-', highlight: false },
                          { label: 'Retail Incremental Revenue', value: '-', highlight: false },
                          { label: 'Retail Promo Margin %', value: '-', highlight: false },
                          { label: 'Retail Everyday Margin %', value: '-', highlight: false },
                          { label: 'Retail Profit', value: '-', highlight: false }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors rounded px-2">
                            <span className="text-xs font-medium text-slate-700">{item.label}</span>
                            <span className="text-xs font-semibold">
                              {item.highlight ? (
                                <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${item.color === 'red' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-slate-100 text-slate-700'}`}>
                                  {item.value}
                                </Badge>
                              ) : (
                                <span className="text-slate-500">{item.value}</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Side - Financial Parameters */}
                <div className="col-span-6">
              
     {/* Right Side - Financial Parameters */}
            <div className="col-span-6">
              <Card className="border border-slate-200 shadow-sm h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    Financial Parameters
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Configure cost structure and pricing parameters</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pricing Structure Section */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide text-slate-500 border-b border-slate-200 pb-1">
                      Pricing Structure
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          List Price
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.listPrice || ''}
                            onChange={(e) => handleInputChange('listPrice', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          COGS Per Unit
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.cogsPerUnit || ''}
                            onChange={(e) => handleInputChange('cogsPerUnit', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <div className="min-w-0 flex-1">
                          <Label className="text-xs font-medium text-slate-700">VCM</Label>
                          <div className="text-xs text-slate-500">Variable Contribution Margin</div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.vcm || ''}
                            onChange={(e) => handleInputChange('vcm', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trade Terms Section */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide text-slate-500 border-b border-slate-200 pb-1">
                      Trade Terms
                    </div>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Spoil Per Unit
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.spoilPerUnit || ''}
                            onChange={(e) => handleInputChange('spoilPerUnit', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <div className="min-w-0 flex-1">
                          <Label className="text-xs font-medium text-slate-700">EDLP Per Unit</Label>
                          <div className="text-xs text-slate-500">Everyday Low Price</div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.edlpPerUnit || ''}
                            onChange={(e) => handleInputChange('edlpPerUnit', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Promo Per Unit
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.promoPerUnit || ''}
                            onChange={(e) => handleInputChange('promoPerUnit', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Net Price
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.netPrice || ''}
                            onChange={(e) => handleInputChange('netPrice', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-slate-700 min-w-0 flex-1">
                          Fixed Fees
                        </Label>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs font-medium text-slate-600">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.fixedFees || ''}
                            onChange={(e) => handleInputChange('fixedFees', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-8 w-16 text-right text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-9 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Generate Report
                      </Button>
                      <Button variant="outline" className="w-full border-slate-300 text-slate-600 hover:bg-slate-50 h-9 text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  )
}
