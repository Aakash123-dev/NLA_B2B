'use client'

import React from 'react'
import { Button } from '../../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { ArrowLeft, DollarSign, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PricingModelPage() {
  const router = useRouter()

  const handleBackToDesignStudio = () => {
    router.push('/user/design-studio')
  }

  const handleConfigurePricingModel = () => {
    router.push('/user/pricing-model-config')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToDesignStudio}
            className="mb-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Design Studio
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Pricing Models
            </h1>
          </div>
          <p className="text-slate-400">
            Manage and configure your pricing strategies
          </p>
        </div>

        {/* Pricing Model Cards */}
        <div className="grid gap-6">
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
                onClick={handleConfigurePricingModel}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Configure Pricing Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
