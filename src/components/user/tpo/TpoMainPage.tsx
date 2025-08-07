'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, Target, TrendingUp, Zap, ArrowLeft, Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { SharedSmartInsightsDrawer } from '@/components/common'

const configurationSteps = [
  {
    number: 1,
    title: "Data Setup",
    description: "Configure your data sources and connections",
    features: ["Database selection", "Data validation", "Connection setup"]
  },
  {
    number: 2,
    title: "Trade Configuration",
    description: "Set up trade plan parameters and targets",
    features: ["Target setting", "Parameter configuration", "Optimization goals"]
  },
  {
    number: 3,
    title: "Optimization",
    description: "Run optimization algorithms and analysis",
    features: ["Algorithm selection", "Performance analysis", "Results optimization"]
  },
  {
    number: 4,
    title: "Results & Reports",
    description: "View results and generate comprehensive reports",
    features: ["Dashboard view", "Report generation", "Performance metrics"]
  }
]

export function TpoMainPage() {
  const router = useRouter()
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = React.useState(false)
  const searchParams = useSearchParams()

  const handleStartConfiguration = () => {
    const project = searchParams.get('project')
    const model = searchParams.get('model')
    const projectName = searchParams.get('projectName')

    const query = new URLSearchParams({
      project: project || '',
      model: model || '',
      projectName: projectName || '',
    })

    router.push(`/user/tpo/setup?${query.toString()}`)
  }

  const handleBackToDesignStudio = () => {
    // Get URL parameters and preserve them when going back
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    router.push(`/user/design-studio?${params.toString()}`);
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full">
        {/* Header with Back Button and Smart Insights */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={handleBackToDesignStudio}
            variant="ghost"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Design Studio</span>
          </Button>
          
          {/* Smart Insights Button */}
          <Button 
            onClick={() => setIsSmartInsightsOpen(true)}
            variant="outline" 
            size="sm" 
            className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-5"
          >
            <Brain className="w-4 h-4" />
            Smart Insights
          </Button>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl mb-8 shadow-2xl shadow-emerald-500/25">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-6">
            Trade Promotion Optimization
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Set up and configure your trade plan optimization parameters through our comprehensive workflow
          </p>
          
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 font-semibold">Ready to Configure</span>
          </div>
        </motion.div>

        {/* Configuration Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {configurationSteps.map((step, index) => {
            const IconComponent = index === 0 ? BarChart3 : index === 1 ? Target : index === 2 ? TrendingUp : Zap
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                
                <div className="space-y-2">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-4xl shadow-2xl shadow-emerald-500/25 p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Optimization?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
            Begin your trade plan configuration journey with our step-by-step guided setup process
          </p>
          
          <Button 
            size="lg"
            onClick={handleStartConfiguration}
            className="bg-white text-emerald-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <span className="mr-3">Configure Trade Plan</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
      
      {/* Smart Insights Drawer */}
      <SharedSmartInsightsDrawer
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
