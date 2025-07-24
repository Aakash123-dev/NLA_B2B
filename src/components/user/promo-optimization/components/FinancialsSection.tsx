'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DollarSign, Calculator } from 'lucide-react'
import { PromoOptimizationFormData } from '../types'

interface FinancialsSectionProps {
  formData: PromoOptimizationFormData
  onInputChange: (field: keyof PromoOptimizationFormData, value: any) => void
}

export function FinancialsSection({ formData, onInputChange }: FinancialsSectionProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Card className="border-gray-200 shadow-xl shadow-gray-100/50 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            Financials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* List Price */}
            <div className="space-y-2">
              <Label htmlFor="listPrice" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                List Price
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="listPrice"
                  type="number"
                  step="0.01"
                  value={formData.listPrice || ''}
                  onChange={(e) => onInputChange('listPrice', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Spoil Per Unit */}
            <div className="space-y-2">
              <Label htmlFor="spoilPerUnit" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Spoil Per Unit
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="spoilPerUnit"
                  type="number"
                  step="0.01"
                  value={formData.spoilPerUnit || ''}
                  onChange={(e) => onInputChange('spoilPerUnit', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* EDLP Per Unit */}
            <div className="space-y-2">
              <Label htmlFor="edlpPerUnit" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                EDLP Per Unit
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="edlpPerUnit"
                  type="number"
                  step="0.01"
                  value={formData.edlpPerUnit || ''}
                  onChange={(e) => onInputChange('edlpPerUnit', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Promo Per Unit */}
            <div className="space-y-2">
              <Label htmlFor="promoPerUnit" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Promo Per Unit
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="promoPerUnit"
                  type="number"
                  step="0.01"
                  value={formData.promoPerUnit || ''}
                  onChange={(e) => onInputChange('promoPerUnit', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Net Price */}
            <div className="space-y-2">
              <Label htmlFor="netPrice" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Net Price
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="netPrice"
                  type="number"
                  step="0.01"
                  value={formData.netPrice?.toFixed(2) || '0.00'}
                  readOnly
                  className="h-12 pl-10 border-gray-200 bg-gray-50/60 backdrop-blur-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* COGS Per Unit */}
            <div className="space-y-2">
              <Label htmlFor="cogsPerUnit" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                COGS Per Unit
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="cogsPerUnit"
                  type="number"
                  step="0.01"
                  value={formData.cogsPerUnit || ''}
                  onChange={(e) => onInputChange('cogsPerUnit', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* VCM */}
            <div className="space-y-2">
              <Label htmlFor="vcm" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                VCM
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="vcm"
                  type="number"
                  step="0.01"
                  value={formData.vcm?.toFixed(2) || 'Auto-calculated'}
                  readOnly
                  className="h-12 pl-10 border-gray-200 bg-gray-50/60 backdrop-blur-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Fixed Fees */}
            <div className="space-y-2">
              <Label htmlFor="fixedFees" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Fixed Fees
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="fixedFees"
                  type="number"
                  step="0.01"
                  value={formData.fixedFees || ''}
                  onChange={(e) => onInputChange('fixedFees', parseFloat(e.target.value) || 0)}
                  placeholder="Enter the value"
                  className="h-12 pl-10 border-gray-200 bg-white/60 backdrop-blur-sm focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
