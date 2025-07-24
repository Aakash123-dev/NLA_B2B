'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Upload, Package, Calendar, DollarSign, Percent, Hash } from 'lucide-react'
import { PromoOptimizationFormData } from '../types'

interface PromoInputSectionProps {
  formData: PromoOptimizationFormData
  onInputChange: (field: keyof PromoOptimizationFormData, value: any) => void
}

const productOptions = [
  { value: 'applegate-turkey', label: 'APPLEGATE NATURALS Organic Turkey Slices' },
  { value: 'applegate-ham', label: 'APPLEGATE NATURALS Organic Ham' },
  { value: 'applegate-chicken', label: 'APPLEGATE NATURALS Organic Chicken Breast' },
  { value: 'applegate-beef', label: 'APPLEGATE NATURALS Organic Roast Beef' },
  { value: 'real-good-poppers', label: 'Real Good Foods Chicken Poppers' },
  { value: 'real-good-bowl', label: 'Real Good Foods Breakfast Bowl' }
]

export function PromoInputSection({ formData, onInputChange }: PromoInputSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onInputChange('uploadedFile', file)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <Card className="border-gray-200 shadow-xl shadow-gray-100/50 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            Promo Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Product Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="product" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Select Product
              </Label>
              <Select value={formData.selectedProduct} onValueChange={(value) => onInputChange('selectedProduct', value)}>
                <SelectTrigger className="h-12 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200">
                  <SelectValue placeholder="Choose a product..." />
                </SelectTrigger>
                <SelectContent>
                  {productOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload File
              </Label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-12 border-gray-200 bg-white/60 backdrop-blur-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {formData.uploadedFile ? formData.uploadedFile.name : 'No file chosen'}
                </Button>
              </div>
            </div>
          </div>

          {/* Event Field */}
          <div className="space-y-2">
            <Label htmlFor="event" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Event
            </Label>
            <Input
              id="event"
              value={formData.event}
              onChange={(e) => onInputChange('event', e.target.value)}
              placeholder="Enter event name"
              className="h-12 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="basePrice" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Base Price
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="basePrice"
                  type="number"
                  step="0.01"
                  value={formData.basePrice || ''}
                  onChange={(e) => onInputChange('basePrice', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promoPrice" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Promo Price
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="promoPrice"
                  type="number"
                  step="0.01"
                  value={formData.promoPrice || ''}
                  onChange={(e) => onInputChange('promoPrice', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercent" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Discount %
              </Label>
              <Input
                id="discountPercent"
                type="number"
                step="0.01"
                value={formData.discountPercent?.toFixed(2) || ''}
                onChange={(e) => onInputChange('discountPercent', parseFloat(e.target.value) || 0)}
                placeholder="Enter the value"
                className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                readOnly
              />
            </div>
          </div>

          {/* Units Field */}
          <div className="space-y-2">
            <Label htmlFor="units" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Units
            </Label>
            <Input
              id="units"
              type="number"
              value={formData.units || ''}
              onChange={(e) => onInputChange('units', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="h-12 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* ACV Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">ACV Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tprACV" className="text-sm font-semibold text-gray-700">
                  % TPR ACV
                </Label>
                <Input
                  id="tprACV"
                  type="number"
                  step="0.01"
                  value={formData.tprACV || ''}
                  onChange={(e) => onInputChange('tprACV', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayOnlyACV" className="text-sm font-semibold text-gray-700">
                  % Display Only ACV
                </Label>
                <Input
                  id="displayOnlyACV"
                  type="number"
                  step="0.01"
                  value={formData.displayOnlyACV || ''}
                  onChange={(e) => onInputChange('displayOnlyACV', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featureOnlyACV" className="text-sm font-semibold text-gray-700">
                  % Feature Only ACV
                </Label>
                <Input
                  id="featureOnlyACV"
                  type="number"
                  step="0.01"
                  value={formData.featureOnlyACV || ''}
                  onChange={(e) => onInputChange('featureOnlyACV', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featureDisplayACV" className="text-sm font-semibold text-gray-700">
                  % Feature and Display ACV
                </Label>
                <Input
                  id="featureDisplayACV"
                  type="number"
                  step="0.01"
                  value={formData.featureDisplayACV || ''}
                  onChange={(e) => onInputChange('featureDisplayACV', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
