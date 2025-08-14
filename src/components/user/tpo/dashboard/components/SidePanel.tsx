'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { 
  Edit, 
  Target, 
  DollarSign, 
  TrendingUp,
  Play,
  Calendar,
  PieChart
} from 'lucide-react'
import { TradePlan } from '../../types'

interface SidePanelProps {
  tradePlan: TradePlan
}

export function SidePanel({ tradePlan, setTempTargets, setIsEditingTargets, targetValues }: SidePanelProps) {
  const toNumber = (value: any): number => {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string') {
      const parsed = parseFloat(value.replace(/,/g, ''))
      return Number.isFinite(parsed) ? parsed : 0
    }
    const n = Number(value)
    return Number.isFinite(n) ? n : 0
  }
  const formatNumber = (value: any) => toNumber(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  const formatCurrency = (value: any) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(toNumber(value))
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-3xl blur-xl" />
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-grey-100 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Target Settings</h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  <Target className="w-3 h-3 text-white" />
                </div>
                Target Volume
              </div>
              <Edit onClick={ () => {
                setTempTargets(targetValues);
                setIsEditingTargets(true);
              }} className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" />
            </Label>
            <div className="h-12 rounded-xl border-2 border-white/20 bg-white/60 backdrop-blur-sm transition-all duration-200 shadow-sm px-3 flex items-center text-slate-900">
              {targetValues.volume || 0}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
                  <DollarSign className="w-3 h-3 text-white" />
                </div>
                Target Spend
              </div>
              {/* <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" /> */}
            </Label>
            <div className="h-12 rounded-xl border-2 border-white/20 bg-white/60 backdrop-blur-sm transition-all duration-200 shadow-sm px-3 flex items-center text-slate-900">
              ${targetValues?.spend || 0}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                Target Revenue
              </div>
              {/* <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" /> */}
            </Label>
            <div className="h-12 rounded-xl border-2 border-white/20 bg-white/60 backdrop-blur-sm transition-all duration-200 shadow-sm px-3 flex items-center text-slate-900">
              ${targetValues?.revenue || 0}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
