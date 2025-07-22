'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Settings } from 'lucide-react'

interface TpoCardProps {
  onConfigure: () => void
}

export function TpoCard({ onConfigure }: TpoCardProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-400" />
          Trade Plan Optimization Configuration
        </CardTitle>
        <CardDescription className="text-slate-400">
          Set up and configure your trade plan optimization parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 mb-6">
          Configure trade plans, create promotional events, set optimization parameters, 
          and analyze performance metrics for your trade planning strategy.
        </p>
        <Button 
          onClick={onConfigure}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Configure Trade Plan
        </Button>
      </CardContent>
    </Card>
  )
}
