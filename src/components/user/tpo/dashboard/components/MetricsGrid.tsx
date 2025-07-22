'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MetricCard } from './MetricCard'
import { TradePlan } from '../../types'
import { formatCurrency, formatNumber, formatPercentage } from '../../utils'

interface MetricsGridProps {
  tradePlan: TradePlan
}

export function MetricsGrid({ tradePlan }: MetricsGridProps) {
  const topMetrics = [
    {
      label: "Total Volume",
      value: tradePlan.total_volume || 61894,
      color: "from-blue-500 to-blue-600",
      isNumber: true
    },
    {
      label: "Total Revenue",
      value: tradePlan.total_revenue || 951262,
      color: "from-green-500 to-green-600",
      isCurrency: true
    },
    {
      label: "Total Contribution",
      value: tradePlan.total_contribution || 427229,
      color: "from-purple-500 to-purple-600",
      isCurrency: true
    },
    {
      label: "Total Spend",
      value: tradePlan.total_spend || 161564,
      color: "from-orange-500 to-orange-600",
      isCurrency: true
    }
  ]

  const bottomMetrics = [
    {
      label: "Incremental Volume",
      value: tradePlan.incremental_volume || 24415,
      color: "from-cyan-500 to-cyan-600",
      isNumber: true
    },
    {
      label: "Incremental Revenue",
      value: tradePlan.incremental_revenue || 41152,
      color: "from-emerald-500 to-emerald-600",
      isCurrency: true
    },
    {
      label: "Plan ROI",
      value: tradePlan.plan_roi || 90.3,
      color: "from-indigo-500 to-indigo-600",
      isPercentage: true
    },
    {
      label: "Budget Remaining",
      value: tradePlan.budget_remaining || 49240,
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
