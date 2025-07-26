'use client'

import React from 'react'
import { Calendar, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EventConfigurationSectionProps {
  formData: {
    basePrice: number
    promoPrice: number
    discountPercent: number
    units: number
    tprACV: number
    displayOnlyACV: number
    featureOnlyACV: number
    featureDisplayACV: number
  }
  onInputChange: (field: string, value: any) => void
}

export function EventConfigurationSection({
  formData,
  onInputChange
}: EventConfigurationSectionProps) {
  return (
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
                  onChange={(e) => onInputChange('basePrice', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('promoPrice', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('discountPercent', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('units', parseInt(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('tprACV', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('displayOnlyACV', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('featureOnlyACV', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('featureDisplayACV', parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                  className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-9 w-20 text-right"
                />
                <span className="text-sm text-slate-500">%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-11">
            <Sparkles className="w-4 h-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
