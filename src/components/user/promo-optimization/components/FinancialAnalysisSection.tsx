'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, TrendingUp, PieChart } from 'lucide-react'
import { FinancialAnalysis } from '../types'

interface FinancialAnalysisSectionProps {
  results: FinancialAnalysis
}

export function FinancialAnalysisSection({ results }: FinancialAnalysisSectionProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const formatDecimal = (value: number) => {
    return value.toFixed(2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="space-y-6"
    >
      {/* Financial Analysis */}
      <Card className="border-gray-200 shadow-xl shadow-gray-100/50 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            Financial Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Event Results Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Event Results</h4>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Mfr Gross Revenue', value: formatCurrency(results.mfrGrossRevenue) },
                  { label: 'Incremental Revenue', value: formatCurrency(results.incrementalRevenue) },
                  { label: 'Spoils', value: formatCurrency(results.spoils) },
                  { label: 'Trade Spend', value: formatCurrency(results.tradeSpend) },
                  { label: 'Mfr Net Revenue', value: formatCurrency(results.mfrNetRevenue) },
                  { label: 'COGS', value: formatCurrency(results.cogs) },
                  { label: 'Mfr Gross Margin (Unpromoted)', value: formatCurrency(results.mfrGrossMarginUnpromoted) },
                  { label: 'Mfr Gross Margin % (Unpromoted)', value: formatPercentage(results.mfrGrossMarginUnpromotedPercent) },
                  { label: 'Mfr Gross Margin', value: formatCurrency(results.mfrGrossMargin) },
                  { label: 'Mfr Gross Margin %', value: formatPercentage(results.mfrGrossMarginPercent) },
                  { label: 'Sales ROI', value: formatDecimal(results.salesROI) },
                  { label: 'Retail Gross Revenue', value: formatCurrency(results.retailGrossRevenue) },
                  { label: 'Retail Incremental Revenue', value: formatCurrency(results.retailIncrementalRevenue) },
                  { label: 'Retail Promo Margin %', value: formatPercentage(results.retailPromoMarginPercent) },
                  { label: 'Retail Everyday Margin %', value: formatPercentage(results.retailEverydayMarginPercent) },
                  { label: 'Retail Profit', value: formatCurrency(results.retailProfit) }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.05, duration: 0.4 }}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Summary */}
      <Card className="border-gray-200 shadow-xl shadow-gray-100/50 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Key Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatDecimal(results.salesROI)}
              </div>
              <div className="text-sm font-medium text-blue-800">Sales ROI</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {formatPercentage(results.mfrGrossMarginPercent)}
              </div>
              <div className="text-sm font-medium text-emerald-800">Mfr Margin %</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {formatCurrency(results.retailProfit)}
              </div>
              <div className="text-sm font-medium text-purple-800">Retail Profit</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
