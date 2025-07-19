'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Settings } from 'lucide-react'

interface PricingModelCardProps {
  onConfigure: () => void
}

export function PricingModelCard({ onConfigure }: PricingModelCardProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-emerald-400" />
          Pricing Model Configuration
        </CardTitle>
        <CardDescription className="text-slate-400">
          Set up and configure your pricing analysis parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 mb-6">
          Configure databases, select retailers, brands, and products, set model parameters, 
          and choose relevant data columns for your pricing analysis.
        </p>
        <Button 
          onClick={onConfigure}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Configure Pricing Model
        </Button>
      </CardContent>
    </Card>
  )
}
