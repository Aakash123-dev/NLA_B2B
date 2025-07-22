'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  ShoppingBag,
  BarChart3,
  PieChart,
  Percent,
  Wallet
} from 'lucide-react'
import { formatCurrency, formatNumber, formatPercentage } from '../../utils'

interface MetricCardProps { 
  label: string
  value: number
  color: string
  isNumber?: boolean
  isCurrency?: boolean
  isPercentage?: boolean
  index: number
}

export function MetricCard({ 
  label, 
  value, 
  color, 
  isNumber = false, 
  isCurrency = false, 
  isPercentage = false, 
  index 
}: MetricCardProps) {
  const formatValue = () => {
    if (isCurrency) {
      return formatCurrency(value)
    }
    if (isPercentage) {
      return formatPercentage(value)
    }
    if (isNumber) {
      return formatNumber(value)
    }
    return value.toString()
  }

  const getIcon = () => {
    const iconClass = "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
    
    switch (label) {
      case 'Total Volume':
      case 'Incremental Volume':
        return <BarChart3 className={iconClass} />
      case 'Total Revenue':
      case 'Incremental Revenue':
        return <TrendingUp className={iconClass} />
      case 'Total Contribution':
        return <Target className={iconClass} />
      case 'Total Spend':
        return <DollarSign className={iconClass} />
      case 'Plan ROI':
        return <Percent className={iconClass} />
      case 'Budget Remaining':
        return <Wallet className={iconClass} />
      default:
        return <PieChart className={iconClass} />
    }
  }

  const getBgColorFromGradient = () => {
    switch (color) {
      case 'from-blue-500 to-blue-600':
        return 'from-blue-50 to-blue-100'
      case 'from-green-500 to-green-600':
        return 'from-emerald-50 to-emerald-100'
      case 'from-purple-500 to-purple-600':
        return 'from-purple-50 to-purple-100'
      case 'from-orange-500 to-orange-600':
        return 'from-orange-50 to-orange-100'
      case 'from-cyan-500 to-cyan-600':
        return 'from-cyan-50 to-cyan-100'
      case 'from-emerald-500 to-emerald-600':
        return 'from-emerald-50 to-emerald-100'
      case 'from-indigo-500 to-indigo-600':
        return 'from-indigo-50 to-indigo-100'
      case 'from-pink-500 to-pink-600':
        return 'from-pink-50 to-pink-100'
      default:
        return 'from-slate-50 to-slate-100'
    }
  }

  const getTextColor = () => {
    switch (color) {
      case 'from-blue-500 to-blue-600':
        return 'text-blue-700'
      case 'from-green-500 to-green-600':
        return 'text-emerald-700'
      case 'from-purple-500 to-purple-600':
        return 'text-purple-700'
      case 'from-orange-500 to-orange-600':
        return 'text-orange-700'
      case 'from-cyan-500 to-cyan-600':
        return 'text-cyan-700'
      case 'from-emerald-500 to-emerald-600':
        return 'text-emerald-700'
      case 'from-indigo-500 to-indigo-600':
        return 'text-indigo-700'
      case 'from-pink-500 to-pink-600':
        return 'text-pink-700'
      default:
        return 'text-slate-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden border-grey-100 bg-gradient-to-br ${getBgColorFromGradient()} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer rounded-2xl min-h-[140px] flex flex-col`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color}  opacity-5`} />
      <div className="relative p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between h-full gap-3">
          <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
            <p className={`text-xs sm:text-sm font-medium ${getTextColor()} leading-tight truncate`}>
              {label}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight break-all">
                {formatValue()}
              </p>
              <div className="flex items-center text-xs sm:text-sm font-medium text-emerald-600">
                <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">+12.5%</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 truncate">vs last period</p>
          </div>
          <div className="relative flex-shrink-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500`} />
            <div className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${color} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              {getIcon()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
