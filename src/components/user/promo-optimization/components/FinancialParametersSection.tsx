'use client'

import React from 'react'
import { DollarSign, Sparkles, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FinancialParametersSectionProps {
  formData: {
    listPrice: number
    spoilPerUnit: number
    edlpPerUnit: number
    promoPerUnit: number
    netPrice: number
    cogsPerUnit: number
    vcm: number
    fixedFees: number
  }
  onInputChange: (field: string, value: any) => void
}

export function FinancialParametersSection({
  formData,
  onInputChange
}: FinancialParametersSectionProps) {
  return (
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
                  onChange={(e) => onInputChange('listPrice', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('cogsPerUnit', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('vcm', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('spoilPerUnit', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('edlpPerUnit', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('promoPerUnit', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('netPrice', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => onInputChange('fixedFees', parseFloat(e.target.value) || 0)}
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
  )
}
