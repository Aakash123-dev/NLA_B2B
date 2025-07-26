'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DollarSign, TrendingUp, PieChart, Target, ShoppingCart, Factory } from 'lucide-react'
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

  // Calculate unpromoted values based on promoted values (mock calculation)
  const unpromotedData = {
    grossRevenue: results.mfrGrossRevenue * 0.85, // Assume 15% lower without promo
    incrementalRevenue: 0, // No incremental for baseline
    netRevenue: results.mfrNetRevenue * 0.9,
    grossMarginPercent: results.mfrGrossMarginUnpromotedPercent,
    grossMarginDollar: results.mfrGrossMarginUnpromoted
  }

  const promotedData = {
    grossRevenue: results.mfrGrossRevenue,
    incrementalRevenue: results.incrementalRevenue,
    netRevenue: results.mfrNetRevenue,
    grossMarginPercent: results.mfrGrossMarginPercent,
    grossMarginDollar: results.mfrGrossMargin
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="w-full"
    >
      {/* Financial Analysis Table */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center">
              <DollarSign className="w-3 h-3 text-white" />
            </div>
            Financial Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-none hover:bg-slate-50">
                  <TableHead className="font-medium text-slate-600 py-3 px-4 text-sm w-[200px]">Category</TableHead>
                  <TableHead className="font-medium text-slate-600 py-3 px-4 text-sm">Metric</TableHead>
                  <TableHead className="font-medium text-slate-600 py-3 px-4 text-sm text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* MFR Unpromoted Section */}
                <TableRow className="border-b border-slate-100 hover:bg-blue-50/20 transition-colors">
                  <TableCell rowSpan={5} className="font-medium text-slate-700 py-3 px-4 align-top border-r border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">MFR Unpromoted</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Gross Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(unpromotedData.grossRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-blue-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Incremental Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(unpromotedData.incrementalRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-blue-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Net Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(unpromotedData.netRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-blue-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Gross Margin %</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-emerald-600">{formatPercentage(unpromotedData.grossMarginPercent)}</TableCell>
                </TableRow>
                <TableRow className="border-b-2 border-slate-200 hover:bg-blue-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Gross Margin $</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(unpromotedData.grossMarginDollar)}</TableCell>
                </TableRow>

                {/* MFR Promoted Section */}
                <TableRow className="border-b border-slate-100 hover:bg-emerald-50/20 transition-colors">
                  <TableCell rowSpan={5} className="font-medium text-slate-700 py-3 px-4 align-top border-r border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm">MFR Promoted</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Gross Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(promotedData.grossRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-emerald-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Incremental Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-emerald-600">{formatCurrency(promotedData.incrementalRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-emerald-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Net Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(promotedData.netRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-emerald-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Gross Margin %</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-emerald-600">{formatPercentage(promotedData.grossMarginPercent)}</TableCell>
                </TableRow>
                <TableRow className="border-b-2 border-slate-200 hover:bg-emerald-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Gross Margin $</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(promotedData.grossMarginDollar)}</TableCell>
                </TableRow>

                {/* Retailer Section */}
                <TableRow className="border-b border-slate-100 hover:bg-violet-50/20 transition-colors">
                  <TableCell rowSpan={5} className="font-medium text-slate-700 py-3 px-4 align-top border-r border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                      <span className="text-sm">Retailer</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Retail Gross Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(results.retailGrossRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-violet-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Retail Incremental Revenue</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-violet-600">{formatCurrency(results.retailIncrementalRevenue)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-violet-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Retail Promo Margin %</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-violet-600">{formatPercentage(results.retailPromoMarginPercent)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-violet-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Retail Everyday Margin %</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-600">{formatPercentage(results.retailEverydayMarginPercent)}</TableCell>
                </TableRow>
                <TableRow className="border-b-2 border-slate-200 hover:bg-violet-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Retail Profit</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-slate-800">{formatCurrency(results.retailProfit)}</TableCell>
                </TableRow>

                {/* MFR Contribution Section */}
                <TableRow className="border-b border-slate-100 hover:bg-amber-50/20 transition-colors">
                  <TableCell rowSpan={4} className="font-medium text-slate-700 py-3 px-4 align-top border-r border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">MFR Contribution</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Spoils</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-red-600">-{formatCurrency(results.spoils)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-amber-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">Trade Spend</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-red-600">-{formatCurrency(results.tradeSpend)}</TableCell>
                </TableRow>
                <TableRow className="border-b border-slate-100 hover:bg-amber-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm text-slate-600">COGS</TableCell>
                  <TableCell className="py-2 px-4 text-right font-medium text-sm text-red-600">-{formatCurrency(results.cogs)}</TableCell>
                </TableRow>
                <TableRow className="hover:bg-amber-50/20 transition-colors">
                  <TableCell className="py-2 px-4 text-sm font-medium text-slate-700">Sales ROI</TableCell>
                  <TableCell className="py-2 px-4 text-right font-semibold text-sm text-emerald-600">{formatDecimal(results.salesROI)}×</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
