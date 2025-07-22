'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
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

export function SidePanel({ tradePlan }: SidePanelProps) {
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
              <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" />
            </Label>
            <Input
              type="number"
              defaultValue={tradePlan.target_volume || 0}
              className="h-12 rounded-xl border-2 border-white/20 bg-white/60 backdrop-blur-sm focus:border-blue-500/50 focus:bg-white/80 transition-all duration-200 shadow-sm"
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
                  <DollarSign className="w-3 h-3 text-white" />
                </div>
                Target Spend
              </div>
              <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" />
            </Label>
            <Input
              type="number"
              defaultValue={tradePlan.target_spend || 0}
              className="h-12 rounded-xl border-2 border-white/20 bg-white/60 backdrop-blur-sm focus:border-emerald-500/50 focus:bg-white/80 transition-all duration-200 shadow-sm"
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                Target Revenue
              </div>
              <Edit className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" />
            </Label>
            <Input
              type="number"
              defaultValue={tradePlan.target_revenue || 0}
              className="h-12 rounded-xl border-2 border-white/20 bg-white/60 backdrop-blur-sm focus:border-purple-500/50 focus:bg-white/80 transition-all duration-200 shadow-sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
