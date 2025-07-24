'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, BarChart3 } from 'lucide-react'
import { OptimizationResults } from '../types'

interface PromotionResultsTableProps {
  results: OptimizationResults | null
}

export function PromotionResultsTable({ results }: PromotionResultsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  if (!results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Card className="border-gray-200 shadow-xl shadow-gray-100/50 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              Promotion Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Awaiting Calculation</h3>
                <p className="text-gray-500">
                  Configure your promo parameters and click "Calculate Optimization" to see results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <Card className="border-gray-200 shadow-xl shadow-gray-100/50 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            Promotion Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Main Promotion Results Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="font-semibold text-gray-700">Promotion</TableHead>
                    <TableHead className="font-semibold text-gray-700">% ACV</TableHead>
                    <TableHead className="font-semibold text-gray-700">% Lift</TableHead>
                    <TableHead className="font-semibold text-gray-700">Units</TableHead>
                    <TableHead className="font-semibold text-gray-700">Dollars</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium">TPR</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.tpr.acv)}</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.tpr.lift)}</TableCell>
                    <TableCell>{formatNumber(results.promotionResults.tpr.units)}</TableCell>
                    <TableCell>{formatCurrency(results.promotionResults.tpr.dollars)}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium">Feature Only</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.featureOnly.acv)}</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.featureOnly.lift)}</TableCell>
                    <TableCell>{formatNumber(results.promotionResults.featureOnly.units)}</TableCell>
                    <TableCell>{formatCurrency(results.promotionResults.featureOnly.dollars)}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium">Display Only</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.displayOnly.acv)}</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.displayOnly.lift)}</TableCell>
                    <TableCell>{formatNumber(results.promotionResults.displayOnly.units)}</TableCell>
                    <TableCell>{formatCurrency(results.promotionResults.displayOnly.dollars)}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium">Feature and Display</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.featureDisplay.acv)}</TableCell>
                    <TableCell>{formatPercentage(results.promotionResults.featureDisplay.lift)}</TableCell>
                    <TableCell>{formatNumber(results.promotionResults.featureDisplay.units)}</TableCell>
                    <TableCell>{formatCurrency(results.promotionResults.featureDisplay.dollars)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Event Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-900">Event Incremental</h4>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-blue-700">
                    Units: <span className="font-semibold">{formatNumber(results.eventResults.incremental.units)}</span>
                  </p>
                  <p className="text-sm text-blue-700">
                    Dollars: <span className="font-semibold">{formatCurrency(results.eventResults.incremental.dollars)}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-emerald-900">Event Total</h4>
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-emerald-700">
                    Units: <span className="font-semibold">{formatNumber(results.eventResults.total.units)}</span>
                  </p>
                  <p className="text-sm text-emerald-700">
                    Dollars: <span className="font-semibold">{formatCurrency(results.eventResults.total.dollars)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
