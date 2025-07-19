'use client'

import React from 'react'
import { Label } from '../../../../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select'
import { ScrollArea } from '../../../../ui/scroll-area'
import { Checkbox } from '../../../../ui/checkbox'
import { Input } from '../../../../ui/input'
import { databases, retailers, brands, products } from '../../data'
import { PricingModelConfig } from '../../types'

interface DatabaseSelectionStepProps {
  config: PricingModelConfig
  updateConfig: (field: keyof PricingModelConfig, value: any) => void
  handleSelection: (list: string[], id: string, field: 'selectedRetailers' | 'selectedBrands' | 'selectedProducts' | 'selectedColumns') => void
}

export function DatabaseSelectionStep({
  config,
  updateConfig,
  handleSelection,
}: DatabaseSelectionStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="database" className="text-slate-300">Select Database</Label>
        <Select
          value={config.selectedDatabase}
          onValueChange={(value) => updateConfig('selectedDatabase', value)}
        >
          <SelectTrigger id="database" className="w-full mt-1 bg-slate-700/50 border-slate-600 text-white">
            <SelectValue placeholder="Select a database" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {databases.map((db) => (
              <SelectItem key={db.id} value={db.id} className="text-white">
                {db.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Retailers</Label>
          <ScrollArea className="h-40 rounded-md border border-slate-600 bg-slate-700/30 p-2">
            {retailers.map(r => (
              <div key={r.id} className="flex items-center space-x-2 p-1">
                <Checkbox
                  id={`ret-${r.id}`}
                  checked={config.selectedRetailers.includes(r.id)}
                  onCheckedChange={() => handleSelection(config.selectedRetailers, r.id, 'selectedRetailers')}
                  className="border-slate-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <Label htmlFor={`ret-${r.id}`} className="font-normal text-slate-300">{r.name}</Label>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Brands</Label>
          <ScrollArea className="h-40 rounded-md border border-slate-600 bg-slate-700/30 p-2">
            {brands.map(b => (
              <div key={b.id} className="flex items-center space-x-2 p-1">
                <Checkbox
                  id={`brand-${b.id}`}
                  checked={config.selectedBrands.includes(b.id)}
                  onCheckedChange={() => handleSelection(config.selectedBrands, b.id, 'selectedBrands')}
                  className="border-slate-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <Label htmlFor={`brand-${b.id}`} className="font-normal text-slate-300">{b.name}</Label>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Products</Label>
          <ScrollArea className="h-40 rounded-md border border-slate-600 bg-slate-700/30 p-2">
            {products.map(p => (
              <div key={p.id} className="flex items-center space-x-2 p-1">
                <Checkbox
                  id={`prod-${p.id}`}
                  checked={config.selectedProducts.includes(p.id)}
                  onCheckedChange={() => handleSelection(config.selectedProducts, p.id, 'selectedProducts')}
                  className="border-slate-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <Label htmlFor={`prod-${p.id}`} className="font-normal text-slate-300">{p.name}</Label>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="market-share" className="text-slate-300">Market Share (%)</Label>
          <Input
            id="market-share"
            type="number"
            placeholder="e.g. 10"
            value={config.marketShare}
            onChange={e => updateConfig('marketShare', e.target.value)}
            className="mt-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
        <div>
          <Label htmlFor="min-revenue" className="text-slate-300">Minimum Revenue ($)</Label>
          <Input
            id="min-revenue"
            type="number"
            placeholder="e.g. 100000"
            value={config.minRevenue}
            onChange={e => updateConfig('minRevenue', e.target.value)}
            className="mt-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
        <div>
          <Label htmlFor="num-weeks" className="text-slate-300">Number of Weeks to Model</Label>
          <Input
            id="num-weeks"
            type="number"
            placeholder="e.g. 52"
            value={config.numWeeks}
            onChange={e => updateConfig('numWeeks', e.target.value)}
            className="mt-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  )
}
