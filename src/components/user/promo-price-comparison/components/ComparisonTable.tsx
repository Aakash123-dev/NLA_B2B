'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Eye, EyeOff, Download, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ComparisonColumn, ComparisonScenario } from '../types'
import { COMPARISON_METRICS } from '../constants'
import { getStatusColor, getTypeColor, formatCurrency, exportToCSV } from '../utils'

interface ComparisonTableProps {
  columns: ComparisonColumn[]
  scenarios: ComparisonScenario[]
  numberOfScenarios: number
  onToggleMetric: (metricId: string) => void
  expandedRows: Set<string>
  onToggleRowExpansion: (rowId: string) => void
}

export function ComparisonTable({
  columns,
  scenarios,
  numberOfScenarios,
  onToggleMetric,
  expandedRows,
  onToggleRowExpansion
}: ComparisonTableProps) {
  const [visibleMetrics, setVisibleMetrics] = useState<Set<string>>(new Set())

  // Get all unique metrics across all scenario types
  const allMetrics = React.useMemo(() => {
    const scenarioTypes = [...new Set(scenarios.map(s => s.type))]
    const metrics: { id: string; label: string; type: string }[] = []
    
    scenarioTypes.forEach(type => {
      COMPARISON_METRICS[type].forEach(metric => {
        if (!metrics.find(m => m.id === metric.id)) {
          metrics.push(metric)
        }
      })
    })
    
    return metrics
  }, [scenarios])

  const handleExportCSV = () => {
    exportToCSV(scenarios, 'scenario-comparison.csv')
  }

  const toggleMetricVisibility = (metricId: string) => {
    setVisibleMetrics(prev => {
      const newSet = new Set(prev)
      if (newSet.has(metricId)) {
        newSet.delete(metricId)
      } else {
        newSet.add(metricId)
      }
      return newSet
    })
  }

  const isMetricVisible = (metricId: string) => {
    return visibleMetrics.size === 0 || visibleMetrics.has(metricId)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Scenario Comparison</h2>
          <p className="text-gray-600">Comparing {numberOfScenarios} scenarios across key metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Charts
          </Button>
        </div>
      </motion.div>

      {/* Metric Visibility Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Metric Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {allMetrics.map(metric => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`metric-${metric.id}`}
                    checked={isMetricVisible(metric.id)}
                    onCheckedChange={() => toggleMetricVisibility(metric.id)}
                  />
                  <label
                    htmlFor={`metric-${metric.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {metric.label}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {scenarios.map((scenario, index) => (
          <Card key={scenario.id} className="bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(scenario.type)}>
                    {scenario.type === 'promo' ? '🏷️ Promo' : '💰 Price'}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(scenario.data.status)}>
                    {scenario.data.status}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                {scenario.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">{scenario.data.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retailer:</span>
                  <span className="font-medium">{scenario.data.retailer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(scenario.data.projectedRevenue)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Detailed Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Detailed Metrics Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-64 sticky left-0 bg-white z-10">
                      Metric
                    </TableHead>
                    {scenarios.map(scenario => (
                      <TableHead key={scenario.id} className="text-center min-w-48">
                        {scenario.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allMetrics
                    .filter(metric => isMetricVisible(metric.id))
                    .map(metric => (
                    <MetricRow
                      key={metric.id}
                      metric={metric}
                      scenarios={scenarios}
                      columns={columns}
                      isExpanded={expandedRows.has(metric.id)}
                      onToggleExpansion={() => onToggleRowExpansion(metric.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Metric Row Component
interface MetricRowProps {
  metric: { id: string; label: string; type: string }
  scenarios: ComparisonScenario[]
  columns: ComparisonColumn[]
  isExpanded: boolean
  onToggleExpansion: () => void
}

function MetricRow({ metric, scenarios, columns, isExpanded, onToggleExpansion }: MetricRowProps) {
  const hasDetails = columns.some(column => 
    column.detailedMetrics && column.detailedMetrics[metric.label]
  )

  return (
    <>
      <TableRow className="hover:bg-gray-50">
        <TableCell className="sticky left-0 bg-white z-10 font-medium">
          <div className="flex items-center gap-2">
            {hasDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExpansion}
                className="w-6 h-6 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            )}
            <span>{metric.label}</span>
          </div>
        </TableCell>
        {scenarios.map((scenario, index) => {
          const column = columns[index]
          const value = column?.detailedMetrics?.[metric.label]?.[`scenario_${index}`]
          
          // Check if this scenario type supports this metric
          const scenarioMetrics = COMPARISON_METRICS[scenario.type]
          const supportsMetric = scenarioMetrics.some(m => m.id === metric.id)
          
          return (
            <TableCell key={scenario.id} className="text-center">
              {supportsMetric && value !== undefined ? (
                <span className={`${
                  metric.type === 'currency' ? 'text-green-600 font-semibold' :
                  metric.type === 'percentage' ? 'text-blue-600 font-semibold' :
                  'text-gray-900'
                }`}>
                  {value}
                </span>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </TableCell>
          )
        })}
      </TableRow>
      
      {/* Expanded Details Row */}
      {isExpanded && hasDetails && (
        <TableRow className="bg-gray-50">
          <TableCell className="sticky left-0 bg-gray-50 z-10 pl-12 text-sm text-gray-600">
            Additional Details
          </TableCell>
          {scenarios.map((scenario, index) => {
            const column = columns[index]
            const details = column?.detailedMetrics?.[metric.label]
            
            return (
              <TableCell key={scenario.id} className="text-center">
                {details && (
                  <div className="text-xs text-gray-600 space-y-1">
                    {Object.entries(details)
                      .filter(([key]) => key !== `scenario_${index}`)
                      .map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      ))}
                  </div>
                )}
              </TableCell>
            )
          })}
        </TableRow>
      )}
    </>
  )
}
