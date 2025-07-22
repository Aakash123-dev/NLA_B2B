'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Target } from 'lucide-react'

interface PageHeaderProps {
  onBack: () => void
  title?: string
  subtitle?: string
}

export function PageHeader({ onBack, title = "Trade Plan Optimization", subtitle = "Manage and configure your trade plan strategies" }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-white hover:bg-white/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Design Studio
      </Button>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Target className="h-6 w-6 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <p className="text-slate-400">
        {subtitle}
      </p>
    </div>
  )
}
