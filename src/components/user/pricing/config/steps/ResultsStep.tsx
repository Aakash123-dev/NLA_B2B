'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CheckCircle2, 
  Download, 
  Share2, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Calendar,
  Database,
  Store,
  Package,
  Columns,
  FileText,
  Eye,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  Trophy,
  AlertCircle,
  Info,
  Link as LinkIcon
} from 'lucide-react'
import { ConfigStepProps } from '../types'
import { getSelectedNames, getDisplayValue, formatCurrency, getAllSelectedNames } from '../utils'
import { databases, retailers, brands, products, availableColumns } from '../constants'

interface ResultsStepProps extends ConfigStepProps {
  connectedNodes?: any[]
  onOpenNodeTab?: (nodeId: string) => void
  onRestart: () => void
  onBackToSummary: () => void
}

// Mock results data
const mockResults = {
  executionSummary: {
    totalProcessingTime: '3m 42s',
    dataPointsProcessed: '1.2M',
    modelsExecuted: 5,
    accuracy: '94.7%'
  },
  keyInsights: [
    {
      title: 'Optimal Price Point Identified',
      description: 'Found 23% revenue increase opportunity at $12.99 price point',
      impact: 'High',
      confidence: 94
    },
    {
      title: 'Seasonal Patterns Detected',
      description: 'Q4 shows 31% higher price elasticity than Q2',
      impact: 'Medium',  
      confidence: 87
    },
    {
      title: 'Regional Variations Found',
      description: 'West Coast markets can support 15% premium pricing',
      impact: 'High',
      confidence: 91
    }
  ],
  performanceMetrics: {
    revenueImpact: '+$2.4M',
    marginImprovement: '+18.5%',
    demandResponse: '8.3%',
    competitiveAdvantage: '+2.1pts'
  }
}

export function ResultsStep({ 
  formData, 
  connectedNodes = [], 
  onOpenNodeTab,
  onRestart,
  onBackToSummary 
}: ResultsStepProps) {
  const selectedDatabase = databases.find(db => db.id === formData.selectedDatabase)

  return (
    <div className="h-full max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-50 rounded-xl shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Analysis Complete</h2>
            <p className="text-slate-600">Your pricing model has been successfully executed and results are ready for review</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={onBackToSummary}
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Summary
            </Button>
            <Button 
              onClick={onRestart}
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left Section - Results Details */}
        <div className="col-span-8 space-y-6">
          
          {/* Execution Summary */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                Execution Summary
                <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200">
                  Completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-800 mb-1">
                    {mockResults.executionSummary.totalProcessingTime}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">Processing Time</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-800 mb-1">
                    {mockResults.executionSummary.dataPointsProcessed}
                  </div>
                  <div className="text-sm text-purple-600 font-medium">Data Points</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-800 mb-1">
                    {mockResults.executionSummary.modelsExecuted}
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">Models Run</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-800 mb-1">
                    {mockResults.executionSummary.accuracy}
                  </div>
                  <div className="text-sm text-orange-600 font-medium">Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                Key Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResults.keyInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          insight.impact === 'High' ? 'bg-red-100' : 'bg-yellow-100'
                        }`}>
                          {insight.impact === 'High' ? (
                            <Trophy className="w-4 h-4 text-red-600" />
                          ) : (
                            <Info className="w-4 h-4 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800">{insight.title}</h4>
                          <p className="text-xs text-slate-600 mt-1">{insight.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            insight.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {insight.impact} Impact
                        </Badge>
                        <div className="text-xs text-slate-500">{insight.confidence}% confidence</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500 rounded-lg">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-emerald-700">Revenue Impact</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-800">
                    {mockResults.performanceMetrics.revenueImpact}
                  </div>
                  <div className="text-xs text-emerald-600 mt-1">Projected annual increase</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-blue-700">Margin Improvement</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    {mockResults.performanceMetrics.marginImprovement}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">Gross margin increase</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-purple-700">Demand Response</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-800">
                    {mockResults.performanceMetrics.demandResponse}
                  </div>
                  <div className="text-xs text-purple-600 mt-1">Price elasticity coefficient</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-orange-700">Competitive Edge</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-800">
                    {mockResults.performanceMetrics.competitiveAdvantage}
                  </div>
                  <div className="text-xs text-orange-600 mt-1">Market share advantage</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Summary */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                Model Configuration Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-sm text-purple-700 font-medium">Market Share</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {getDisplayValue(formData.marketShare, '%')}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-sm text-green-700 font-medium">Min Revenue</div>
                  <div className="text-2xl font-bold text-green-900">
                    {formatCurrency(formData.minRevenue)}
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-sm text-orange-700 font-medium">Weeks to Model</div>
                  <div className="text-2xl font-bold text-orange-900">
                    {getDisplayValue(formData.numWeeks)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Actions & Summary */}
        <div className="col-span-4">
          <div className="sticky top-6 space-y-6">
            
            {/* Actions Card */}
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4" />
                  View Detailed Report
                </Button>
                
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Export Results
                </Button>
                
                <Button variant="outline" className="w-full gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Data Summary Card */}
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  Data Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Database</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {selectedDatabase?.name}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Retailers</span>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {formData.selectedRetailers.length} Selected
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Brands</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {formData.selectedBrands.length} Selected
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">Products</span>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {formData.selectedProducts.length} Selected
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                  <div className="flex items-center gap-2">
                    <Columns className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm font-medium text-cyan-700">Columns</span>
                  </div>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                    {formData.selectedColumns.length} Selected
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Success Status */}
            <Card className="border border-emerald-200 shadow-sm bg-emerald-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Analysis Complete</h3>
                    <p className="text-xs text-emerald-600">All models executed successfully</p>
                  </div>
                </div>
                <div className="text-sm text-emerald-700">
                  <p className="font-medium mb-1">Ready for Implementation</p>
                  <p className="text-xs opacity-75">Use the insights above to optimize your pricing strategy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
