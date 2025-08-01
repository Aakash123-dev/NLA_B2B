'use client'

import React, { useState } from 'react'
import { ArrowLeft, RotateCcw, TrendingUp, Settings, ChevronDown, ChevronRight, Eye, EyeOff, Brain } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { 
  ComparisonTableProps,
  ComparisonSimulationScenario,
  PromoSimulationScenario,
  PriceSimulationScenario 
} from '../types'
import { COMPARISON_METRICS, METRIC_CATEGORIES } from '../constants'
import { 
  formatCurrency, 
  formatPercentage, 
  formatNumber, 
  getStatusColor, 
  getTypeColor,
  generateComparisonInsights,
  getBestPerformingScenario
} from '../utils'

export function SimulatorComparisonTable({ 
  scenarios, 
  columns, 
  onToggleMetric, 
  expandedRows, 
  onToggleRowExpansion,
  onBack,
  onNewComparison,
  onOpenSmartInsights 
}: ComparisonTableProps) {
  const [isConfigureOpen, setIsConfigureOpen] = useState(false)

  const insights = generateComparisonInsights(scenarios)
  const bestRevenue = getBestPerformingScenario(scenarios, 'revenue')
  const bestUnits = getBestPerformingScenario(scenarios, 'units')

  const getMetricValue = (scenario: ComparisonSimulationScenario, metricId: string): string => {
    const data = scenario.data
    
    if (scenario.type === 'promo') {
      const promoData = data as PromoSimulationScenario
      switch (metricId) {
        case 'basePrice': return formatCurrency(promoData.basePrice)
        case 'promoPrice': return formatCurrency(promoData.promoPrice)
        case 'discountPercent': return formatPercentage(promoData.discountPercent)
        case 'projectedRevenue': return formatCurrency(promoData.projectedRevenue)
        case 'actualRevenue': return promoData.actualRevenue ? formatCurrency(promoData.actualRevenue) : '-'
        case 'projectedUnits': return formatNumber(promoData.projectedUnits)
        case 'actualUnits': return promoData.actualUnits ? formatNumber(promoData.actualUnits) : '-'
        case 'roi': return formatPercentage(promoData.roi)
        case 'lift': return formatPercentage(promoData.lift)
        case 'eventType': return promoData.eventType
        case 'duration': 
          const start = new Date(promoData.startDate)
          const end = new Date(promoData.endDate)
          const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          return `${days} days`
        case 'status': return promoData.status
        default: return '-'
      }
    } else {
      const priceData = data as PriceSimulationScenario
      switch (metricId) {
        case 'currentPrice': return formatCurrency(priceData.currentPrice)
        case 'newPrice': return formatCurrency(priceData.newPrice)
        case 'priceChangePercent': return formatPercentage(priceData.priceChangePercent)
        case 'projectedRevenue': return formatCurrency(priceData.projectedRevenue)
        case 'actualRevenue': return priceData.actualRevenue ? formatCurrency(priceData.actualRevenue) : '-'
        case 'projectedUnits': return formatNumber(priceData.projectedUnits)
        case 'actualUnits': return priceData.actualUnits ? formatNumber(priceData.actualUnits) : '-'
        case 'elasticity': return priceData.elasticity.toFixed(1)
        case 'competitorResponse': return priceData.competitorResponse
        case 'simulationType': return priceData.simulationType
        case 'status': return priceData.status
        default: return '-'
      }
    }
  }

  const isMetricVisible = (metricId: string): boolean => {
    return columns.some(column => column.metrics[metricId])
  }

  const getVisibleMetrics = () => {
    const uniqueMetrics = new Map()
    
    // Check if there are any promo scenarios and add metrics
    const hasPromoScenarios = scenarios.some(scenario => scenario.type === 'promo')
    if (hasPromoScenarios) {
      COMPARISON_METRICS.promo.forEach(metric => {
        // Use the metric ID as the key to avoid duplicates
        if (!uniqueMetrics.has(metric.id)) {
          uniqueMetrics.set(metric.id, { ...metric, uniqueId: metric.id })
        }
      })
    }
    
    // Check if there are any price scenarios and add metrics
    const hasPriceScenarios = scenarios.some(scenario => scenario.type === 'price')
    if (hasPriceScenarios) {
      COMPARISON_METRICS.price.forEach(metric => {
        // Use the metric ID as the key to avoid duplicates
        if (!uniqueMetrics.has(metric.id)) {
          uniqueMetrics.set(metric.id, { ...metric, uniqueId: metric.id })
        }
      })
    }
    
    return Array.from(uniqueMetrics.values())
  }

  const getMetricsByCategory = () => {
    const visibleMetrics = getVisibleMetrics()
    return METRIC_CATEGORIES.map(category => ({
      ...category,
      metrics: visibleMetrics.filter(metric => metric.category === category.id)
    })).filter(category => category.metrics.length > 0)
  }

  const categorizedMetrics = getMetricsByCategory()

  return (
    <div className="w-full h-full p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Selection
          </Button>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Scenario Comparison ({scenarios.length})
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {scenarios.map((scenario, index) => (
                  <Badge key={scenario.id} className={getTypeColor(scenario.type)}>
                    {scenario.type === 'promo' ? '🏷️' : '💰'} {scenario.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu open={isConfigureOpen} onOpenChange={setIsConfigureOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Configure Metrics
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px] max-h-[500px] overflow-y-auto" align="end">
              <DropdownMenuLabel className="text-base font-semibold">
                Metric Visibility Controls
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-4">
                <Tabs defaultValue={categorizedMetrics[0]?.id} className="w-full">
                  <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${categorizedMetrics.length}, 1fr)` }}>
                    {categorizedMetrics.map(category => (
                      <TabsTrigger key={category.id} value={category.id} className="text-xs">
                        {category.icon} {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {categorizedMetrics.map(category => (
                    <TabsContent key={category.id} value={category.id} className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.metrics.map(metric => {
                          return (
                            <div key={metric.uniqueId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                {isMetricVisible(metric.uniqueId) ? (
                                  <Eye className="w-4 h-4 text-green-600" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                )}
                                <span className="text-sm font-medium text-gray-700">
                                  {metric.label}
                                </span>
                              </div>
                              <Switch
                                checked={isMetricVisible(metric.uniqueId)}
                                onCheckedChange={() => onToggleMetric(metric.id)}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-5"
            onClick={onOpenSmartInsights}
          >
            <Brain className="w-4 h-4" />
            Smart Insights
          </Button>
          <Button variant="outline" size="sm" onClick={onNewComparison}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Comparison
          </Button>
        </div>
      </motion.div>

      {/* Insights Summary */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <TrendingUp className="w-5 h-5" />
                Comparison Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-blue-800">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Metric Categories Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Settings className="w-5 h-5" />
              Metric Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {categorizedMetrics.map(category => (
                <Button
                  key={category.id}
                  variant={expandedRows.has(category.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => onToggleRowExpansion(category.id)}
                  className="gap-2"
                >
                  {expandedRows.has(category.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  {category.icon} {category.label} ({category.metrics.filter(m => isMetricVisible(m.uniqueId)).length})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-0">
            <div 
              className="overflow-x-auto custom-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db #f3f4f6',
              }}
            >
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[250px] sticky left-0 bg-gray-50 z-10">
                      Scenario Name
                    </th>
                    {categorizedMetrics.map(category => 
                      expandedRows.has(category.id) && category.metrics.map(metric => 
                        isMetricVisible(metric.uniqueId) && (
                          <th key={metric.uniqueId} className="text-center p-4 font-semibold text-gray-900 min-w-[140px]">
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500">{category.icon} {category.label}</div>
                              <div className="font-medium text-sm text-gray-900">{metric.label}</div>
                            </div>
                          </th>
                        )
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {scenarios.map((scenario, index) => (
                    <motion.tr
                      key={scenario.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50"
                    >
                      {/* Scenario Info Column */}
                      <td className="p-4 sticky left-0 bg-white z-10 border-r border-gray-100">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(scenario.type)}>
                              {scenario.type === 'promo' ? '🏷️' : '💰'} {scenario.type}
                            </Badge>
                            {(bestRevenue?.id === scenario.id || bestUnits?.id === scenario.id) && (
                              <Badge className="bg-yellow-100 text-yellow-800">⭐ Best</Badge>
                            )}
                          </div>
                          <div className="font-semibold text-gray-900">{scenario.name}</div>
                          <div className="text-sm text-gray-600">
                            <div>{scenario.data.brand}</div>
                            <div>{scenario.data.retailer}</div>
                            <div className="text-xs text-gray-500">{scenario.data.product}</div>
                          </div>
                          <Badge className={getStatusColor(scenario.data.status)}>
                            {scenario.data.status}
                          </Badge>
                        </div>
                      </td>
                      
                      {/* Metric Values */}
                      {categorizedMetrics.map(category => 
                        expandedRows.has(category.id) && category.metrics.map(metric => 
                          isMetricVisible(metric.uniqueId) && (
                            <td key={metric.uniqueId} className="p-4 text-center">
                              {(() => {
                                const value = getMetricValue(scenario, metric.id)
                                const isBest = (metric.id === 'projectedRevenue' && bestRevenue?.id === scenario.id) ||
                                              (metric.id === 'actualRevenue' && bestRevenue?.id === scenario.id) ||
                                              (metric.id === 'projectedUnits' && bestUnits?.id === scenario.id) ||
                                              (metric.id === 'actualUnits' && bestUnits?.id === scenario.id)
                                
                                return (
                                  <div className={`${isBest ? 'bg-yellow-50 rounded px-2 py-1' : ''}`}>
                                    <span className={`${isBest ? 'font-semibold text-yellow-800' : 'text-gray-900'}`}>
                                      {value}
                                    </span>
                                    {isBest && <span className="ml-1">⭐</span>}
                                  </div>
                                )
                              })()}
                            </td>
                          )
                        )
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
      >
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Best Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {bestRevenue && (
              <div>
                <div className="text-lg font-semibold text-green-600">
                  {formatCurrency(bestRevenue.data.projectedRevenue)}
                </div>
                <div className="text-sm text-gray-600 mt-1">{bestRevenue.name}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Best Units</CardTitle>
          </CardHeader>
          <CardContent>
            {bestUnits && (
              <div>
                <div className="text-lg font-semibold text-blue-600">
                  {formatNumber(bestUnits.data.projectedUnits)}
                </div>
                <div className="text-sm text-gray-600 mt-1">{bestUnits.name}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-purple-600">{scenarios.length}</div>
            <div className="text-sm text-gray-600 mt-1">
              {scenarios.filter(s => s.type === 'promo').length} Promo, {scenarios.filter(s => s.type === 'price').length} Price
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
