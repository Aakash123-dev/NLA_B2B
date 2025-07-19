'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft,
  DollarSign,
  Settings,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Brain,
  Package,
  Activity,
  Database,
  Filter,
  Sliders,
  FileText,
  PieChart,
  LineChart,
  Users,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PricingModelPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get project and model parameters from URL
  const projectId = searchParams.get('project')
  const modelId = searchParams.get('model')

  const handleBackToDesignStudio = () => {
    // Preserve the project and model parameters when going back
    const params = new URLSearchParams()
    if (projectId) params.set('project', projectId)
    if (modelId) params.set('model', modelId)
    
    router.push(`/user/design-studio?${params.toString()}`)
  }

  const handleConfigurePricingModel = () => {
    // Pass the project and model parameters to the config page
    const params = new URLSearchParams()
    if (projectId) params.set('project', projectId)
    if (modelId) params.set('model', modelId)
    
    router.push(`/user/pricing-model-config?${params.toString()}`)
  }


  const keyMetrics = [
    {
      icon: Brain,
      title: "AI Models",
      value: "12",
      label: "Active Models",
      description: "Machine learning algorithms",
      color: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-100"
    },
    {
      icon: TrendingUp,
      title: "Elasticity Score",
      value: "87%",
      label: "Average Score",
      description: "Price sensitivity analysis",
      color: "from-emerald-500 to-green-600", 
      bgGradient: "from-emerald-50 to-green-100"
    },
    {
      icon: Target,
      title: "Revenue Impact",
      value: "+24%",
      label: "Projected Lift",
      description: "Revenue optimization",
      color: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100"
    },
    {
      icon: Activity,
      title: "Processing",
      value: "Live",
      label: "Real-time",
      description: "Data processing status",
      color: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-100"
    }
  ]

  const configurationSteps = [
    {
      step: "01",
      icon: Database,
      title: "Data Connection",
      description: "Connect to your data sources and validate data quality",
      features: [
        "Database connectivity setup",
        "Data validation & quality checks", 
        "Historical data import",
        "Real-time data streaming"
      ]
    },
    {
      step: "02", 
      icon: Filter,
      title: "Filter Configuration",
      description: "Set up retailer, brand, and product filtering parameters",
      features: [
        "Multi-retailer selection",
        "Brand portfolio filtering",
        "Product category grouping",
        "Geographic market selection"
      ]
    },
    {
      step: "03",
      icon: Sliders,
      title: "Model Parameters", 
      description: "Configure advanced pricing model settings and algorithms",
      features: [
        "Elasticity model selection",
        "Price sensitivity thresholds",
        "Seasonality adjustments",
        "Competitive response modeling"
      ]
    },
    {
      step: "04",
      icon: BarChart3,
      title: "Output Configuration",
      description: "Define analysis outputs and visualization preferences",
      features: [
        "Custom report templates",
        "KPI dashboard setup",
        "Alert configurations",
        "Export format preferences"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="w-full px-6 lg:px-12 py-6">
          {/* Navigation & Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link 
                href="/user/design-studio"
                onClick={handleBackToDesignStudio}
                className="flex items-center justify-center w-10 h-10 text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pricing Models</h1>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  Active
                </Badge>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Key Metrics */}
      <div className="w-full px-6 lg:px-12 py-6">
        {/* Configuration Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Configuration Progress</h2>
                <p className="text-slate-600 text-lg">Set up and configure your pricing analysis parameters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
              {configurationSteps.map((step, index) => (
                <Card key={index} className="group relative overflow-hidden border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold">
                        {step.step}
                      </div>
                      <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all duration-300">
                        <step.icon className="w-6 h-6 text-slate-700 group-hover:text-emerald-700 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                      <ul className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-xs text-slate-600">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleConfigurePricingModel}
                className="px-8 py-3 gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 transform"
              >
                <Zap className="w-5 h-5" />
                Configure Pricing Model
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
