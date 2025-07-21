'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Link as LinkIcon, Database, Store, Package, Columns, TrendingUp, DollarSign, Calendar, BarChart3 } from 'lucide-react'
import { ConfigStepProps } from '../types'
import { getSelectedNames, getAllSelectedNames, getDisplayValue, formatCurrency } from '../utils'
import { databases, retailers, brands, products, availableColumns } from '../constants'

interface ResultsStepProps extends ConfigStepProps {
  connectedNodes?: any[]
  onOpenNodeTab?: (nodeId: string) => void
  onRestart: () => void
  onBackToSummary: () => void
}

export function ResultsStep({ 
  formData, 
  connectedNodes = [], 
  onOpenNodeTab,
  onRestart,
  onBackToSummary 
}: ResultsStepProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Connected Tools Section */}
      <Card className="border-0 shadow-sm bg-white/50 backdrop-blur-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-slate-900 flex items-center gap-3 text-xl font-semibold">
            <div className="p-2 bg-blue-50 rounded-lg">
              <LinkIcon className="w-5 h-5 text-blue-600" />
            </div>
            Connected Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {connectedNodes.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {connectedNodes.map(connectedNode => (
                <Button
                  key={connectedNode.id}
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  onClick={() => onOpenNodeTab?.(connectedNode.id)}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {connectedNode.name} {connectedNode.version && `v${connectedNode.version}`}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No tools are connected to this node.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Summary Section */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="text-2xl text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Final Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Data & Scope Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              Data & Scope
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Database</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-blue-700 font-medium">Database:</span>
                    <span className="text-blue-900 font-bold">Primary Database</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-blue-700 font-medium">Retailers:</span>
                    <span className="text-blue-900 font-bold">ValuePlus</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <Store className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-800">Products & Brands</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-emerald-700 font-medium">Brands:</span>
                    <span className="text-emerald-900 font-bold">Brand B</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-emerald-700 font-medium">Products:</span>
                    <span className="text-emerald-900 font-bold">Product Y</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Parameters Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Model Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-purple-700 font-medium">Market Share</span>
                </div>
                <div className="text-3xl font-bold text-purple-900">32%</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-green-700 font-medium">Minimum Revenue</span>
                </div>
                <div className="text-3xl font-bold text-green-900">$23</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-orange-700 font-medium">Weeks to Model</span>
                </div>
                <div className="text-3xl font-bold text-orange-900">23</div>
              </div>
            </div>
          </div>

          {/* Selected Columns */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Columns className="w-5 h-5 text-cyan-600" />
              Selected Columns
            </h3>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
              <div className="flex items-center gap-3 mb-3">
                <Columns className="w-6 h-6 text-cyan-600" />
                <span className="text-cyan-700 font-medium">Data Columns Used</span>
              </div>
              <div className="text-2xl font-bold text-cyan-900">Marketing_Spend</div>
              <p className="text-cyan-700 text-sm mt-2">Primary analysis column for model processing</p>
            </div>
          </div>

          {/* Model Status */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Model Status
            </h3>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-900">Completed</div>
                <p className="text-emerald-700 font-medium">Your pricing model has been successfully executed and results are ready</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
