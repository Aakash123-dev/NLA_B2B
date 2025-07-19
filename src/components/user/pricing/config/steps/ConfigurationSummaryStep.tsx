'use client'

import React from 'react'
import { databases, retailers, brands, products, availableColumns } from '../../data'
import { PricingModelConfig } from '../../types'
import { getSelectedNames, getAllSelectedNames, formatCurrency } from '../../utils'

interface ConfigurationSummaryStepProps {
  config: PricingModelConfig
}

export function ConfigurationSummaryStep({ config }: ConfigurationSummaryStepProps) {
  return (
    <div className="space-y-8">
      <h4 className="text-lg font-semibold text-black">Review Your Configuration</h4>

      <div className="space-y-6 text-sm">
        <div>
          <h5 className="mb-2 text-base font-medium text-black">Data & Scope</h5>
          <div className="space-y-2 rounded-lg border border-slate-600 bg-slate-700/30 p-4">
            <div className="flex justify-between">
              <span className="text-black">Database:</span>
              <span className="text-right font-medium text-black">
                {databases.find(db => db.id === config.selectedDatabase)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Retailers:</span>
              <span className="text-right font-medium text-black">
                {getSelectedNames(config.selectedRetailers, retailers)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Brands:</span>
              <span className="text-right font-medium text-black">
                {getSelectedNames(config.selectedBrands, brands)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Products:</span>
              <span className="text-right font-medium text-black">
                {getSelectedNames(config.selectedProducts, products)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-base font-medium text-black">Model Parameters</h5>
          <div className="space-y-2 rounded-lg border border-slate-600 bg-slate-700/30 p-4">
            <div className="flex justify-between">
              <span className="text-black">Market Share:</span>
              <span className="text-right font-medium text-black">
                {config.marketShare || 'Not set'}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Minimum Revenue:</span>
              <span className="text-right font-medium text-black">
                {formatCurrency(config.minRevenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Weeks to Model:</span>
              <span className="text-right font-medium text-black">
                {config.numWeeks || 'Not set'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-base font-medium text-black">Selected Columns</h5>
          <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4">
            <p className="font-medium text-black">
              {getAllSelectedNames(config.selectedColumns, availableColumns)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
