'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MetricCard } from './MetricCard'
import { TradePlan } from '../../types'
import { formatCurrency, formatNumber, formatPercentage } from '../../utils'

interface MetricsGridProps {
  widgetValues: {
    totalVolume?: number | string
    totalRevenue?: number | string
    totalContribution?: number | string
    totalSpend?: number | string
    incrementalVolume?: number | string
    incrementalRevenue?: number | string
    planROI?: number | string
    budgetRemaining?: number | string
  }
}

export function MetricsGrid({ widgetValues }: MetricsGridProps) {
  console.log(widgetValues, "AllWidgetsValue")
  const toNumber = (value: any): number => {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
      const parsed = parseFloat(value.replace(/,/g, ''))
      return Number.isFinite(parsed) ? parsed : 0
    }
    const n = Number(value)
    return Number.isFinite(n) ? n : 0
  }
  const topMetrics = [
    {
      label: "Total Volume",
      value: toNumber(widgetValues?.totalVolume),
      color: "from-blue-500 to-blue-600",
      isNumber: true
    },
    {
      label: "Total Revenue",
      value: toNumber(widgetValues?.totalRevenue),
      color: "from-green-500 to-green-600",
      isCurrency: true
    },
    {
      label: "Total Contribution",
      value: toNumber(widgetValues?.totalContribution),
      color: "from-purple-500 to-purple-600",
      isCurrency: true
    },
    {
      label: "Total Spend",
      value: toNumber(widgetValues?.totalSpend),
      color: "from-orange-500 to-orange-600",
      isCurrency: true
    }
  ]

  const bottomMetrics = [
    {
      label: "Incremental Volume",
      value: toNumber(widgetValues?.incrementalVolume),
      color: "from-cyan-500 to-cyan-600",
      isNumber: true
    },
    {
      label: "Incremental Revenue",
      value: toNumber(widgetValues?.incrementalRevenue), 
      color: "from-emerald-500 to-emerald-600",
      isCurrency: true
    },
    {
      label: "Plan ROI",
      value: toNumber(widgetValues?.planROI),
      color: "from-indigo-500 to-indigo-600",
      isPercentage: true
    },
    {
      label: "Budget Remaining",
      value: toNumber(widgetValues?.budgetRemaining),
      color: "from-pink-500 to-pink-600",
      isCurrency: true
    }
  ]

  return (
    <div className="h-full w-full space-y-6 lg:space-y-8">
      {/* Top Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
      >
        {topMetrics.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} index={index} />
        ))}
      </motion.div>

      {/* Bottom Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
      >
        {bottomMetrics.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} index={index + 4} />
        ))}
      </motion.div>
    </div>
  )
}
