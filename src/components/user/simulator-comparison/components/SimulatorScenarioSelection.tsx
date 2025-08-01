'use client'

import React, { useState, useMemo } from 'react'
import { Search, Filter, TrendingUp, CheckCircle2, X, BarChart3, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ComparisonSimulationScenario, 
  PromoSimulationScenario, 
  PriceSimulationScenario,
  ScenarioSelectionProps 
} from '../types'
import { 
  MIN_COMPARISON_SCENARIOS, 
  SCENARIO_TYPES, 
  STATUS_OPTIONS 
} from '../constants'
import { 
  formatCurrency, 
  formatPercentage, 
  formatNumber, 
  getStatusColor, 
  getTypeColor, 
  getEventTypeColor,
  getCompetitorResponseColor,
  filterScenarios, 
  sortScenarios 
} from '../utils'

// Sample data for scenarios
const samplePromoScenarios: PromoSimulationScenario[] = [
  {
    id: 'promo-sim-001',
    name: 'Promo 4',
    brand: 'Brand Alpha',
    retailer: 'Target',
    product: 'Product X Premium',
    basePrice: 29.99,
    promoPrice: 22.99,
    discountPercent: 23.3,
    startDate: '2024-06-01',
    endDate: '2024-06-15',
    eventType: 'TPR',
    status: 'Completed',
    projectedRevenue: 285000,
    actualRevenue: 312000,
    projectedUnits: 12500,
    actualUnits: 13600,
    roi: 18.2,
    lift: 25.4,
    description: 'High-impact promotional campaign targeting summer season',
    createdDate: '2024-05-20'
  },
  {
    id: 'promo-sim-002',
    name: 'Promo 1 ',
    brand: 'Brand Beta',
    retailer: 'Walmart',
    product: 'Product Y Essential',
    basePrice: 19.99,
    promoPrice: 15.99,
    discountPercent: 20.0,
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    eventType: 'Bundle',
    status: 'Active',
    projectedRevenue: 195000,
    projectedUnits: 12200,
    roi: 14.7,
    lift: 22.1,
    description: 'Strategic bundle promotion for back-to-school season',
    createdDate: '2024-07-15'
  },
  {
    id: 'promo-sim-003',
    name: 'Promo 2 ',
    brand: 'Brand Alpha',
    retailer: 'Kroger',
    product: 'Product Z Deluxe',
    basePrice: 45.99,
    promoPrice: 35.99,
    discountPercent: 21.7,
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    eventType: 'Feature + Display',
    status: 'Scheduled',
    projectedRevenue: 420000,
    projectedUnits: 11700,
    roi: 16.9,
    lift: 28.3,
    description: 'Premium holiday promotional display campaign',
    createdDate: '2024-10-01'
  },
  {
    id: 'promo-sim-004',
    name: 'Promo 3 ',
    brand: 'Brand Gamma',
    retailer: 'CVS',
    product: 'Product A Compact',
    basePrice: 12.99,
    promoPrice: 12.99,
    discountPercent: 50.0,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    eventType: 'BOGO',
    status: 'Completed',
    projectedRevenue: 165000,
    actualRevenue: 178000,
    projectedUnits: 25400,
    actualUnits: 27300,
    roi: 12.4,
    lift: 34.6,
    description: 'Buy-one-get-one promotional strategy for spring launch',
    createdDate: '2024-02-10'
  }
]

const samplePriceScenarios: PriceSimulationScenario[] = [
  {
    id: 'price-sim-001',
    name: 'Pricing Model 1',
    brand: 'Brand Alpha',
    retailer: 'Target',
    product: 'Product X Premium',
    currentPrice: 29.99,
    newPrice: 27.99,
    priceChangePercent: -6.7,
    effectiveDate: '2024-07-01',
    simulationType: 'Competitive Response',
    status: 'Active',
    projectedRevenue: 235000,
    actualRevenue: 248000,
    projectedUnits: 8900,
    actualUnits: 8860,
    elasticity: -1.4,
    competitorResponse: 'Follow',
    description: 'Strategic price reduction to match competitor pricing',
    createdDate: '2024-06-20'
  },
  {
    id: 'price-sim-002',
    name: 'Pricing Model 2',
    brand: 'Brand Beta',
    retailer: 'Whole Foods',
    product: 'Product Y Essential',
    currentPrice: 19.99,
    newPrice: 22.99,
    priceChangePercent: 15.0,
    effectiveDate: '2024-08-15',
    simulationType: 'Gradual',
    status: 'Scheduled',
    projectedRevenue: 285000,
    projectedUnits: 12400,
    elasticity: -0.8,
    competitorResponse: 'None',
    description: 'Testing premium price positioning strategy',
    createdDate: '2024-07-30'
  },
  {
    id: 'price-sim-003',
    name: 'Pricing Model 3',
    brand: 'Brand Gamma',
    retailer: 'Walmart',
    product: 'Product A Compact',
    currentPrice: 12.99,
    newPrice: 10.99,
    priceChangePercent: -15.4,
    effectiveDate: '2024-05-01',
    simulationType: 'Immediate',
    status: 'Completed',
    projectedRevenue: 198000,
    actualRevenue: 215000,
    projectedUnits: 19500,
    actualUnits: 19600,
    elasticity: -1.8,
    competitorResponse: 'Aggressive',
    description: 'Aggressive pricing for market share expansion',
    createdDate: '2024-04-15'
  },
  {
    id: 'price-sim-004',
    name: 'Pricing Model 4',
    brand: 'Brand Delta',
    retailer: 'Amazon',
    product: 'Product B Standard',
    currentPrice: 34.99,
    newPrice: 32.99,
    priceChangePercent: -5.7,
    effectiveDate: '2024-09-01',
    simulationType: 'Gradual',
    status: 'Draft',
    projectedRevenue: 315000,
    projectedUnits: 9550,
    elasticity: -1.2,
    competitorResponse: 'None',
    description: 'Value-focused pricing optimization',
    createdDate: '2024-08-10'
  }
]

const allScenarios: ComparisonSimulationScenario[] = [
  ...samplePromoScenarios.map(scenario => ({
    id: scenario.id,
    name: scenario.name,
    type: 'promo' as const,
    data: scenario,
    isSelected: false
  })),
  ...samplePriceScenarios.map(scenario => ({
    id: scenario.id,
    name: scenario.name,
    type: 'price' as const,
    data: scenario,
    isSelected: false
  }))
]

interface ScenarioCardProps {
  scenario: ComparisonSimulationScenario
  isSelected: boolean
  isDisabled: boolean
  onToggle: () => void
  index: number
}

function ScenarioCard({ scenario, isSelected, isDisabled, onToggle, index }: ScenarioCardProps) {
  const data = scenario.data
  const isPromo = scenario.type === 'promo'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 h-full ${
          isSelected 
            ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg' 
            : isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-md hover:ring-1 hover:ring-gray-200'
        }`}
        onClick={!isDisabled ? onToggle : undefined}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isSelected}
                disabled={isDisabled}
                className="mt-1"
                onChange={onToggle}
              />
              <div className="flex flex-col gap-1">
                <Badge className={getTypeColor(scenario.type)}>
                  {SCENARIO_TYPES.find(t => t.value === scenario.type)?.icon} {scenario.type}
                </Badge>
                <Badge className={getStatusColor(data.status)}>
                  {data.status}
                </Badge>
              </div>
            </div>
            {isSelected && (
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            )}
          </div>
          
          <div className="mt-3">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {scenario.name}
            </CardTitle>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Brand:</span> {data.brand}</p>
              <p><span className="font-medium">Retailer:</span> {data.retailer}</p>
              <p><span className="font-medium">Product:</span> {data.product}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {isPromo ? (
                <>
                  <div>
                    <p className="text-gray-600">Base Price</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency((data as PromoSimulationScenario).basePrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Promo Price</p>
                    <p className="font-semibold text-green-600">
                      {formatCurrency((data as PromoSimulationScenario).promoPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Discount</p>
                    <p className="font-semibold text-orange-600">
                      {formatPercentage((data as PromoSimulationScenario).discountPercent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">ROI</p>
                    <p className="font-semibold text-blue-600">
                      {formatPercentage((data as PromoSimulationScenario).roi)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sales Lift</p>
                    <p className="font-semibold text-purple-600">
                      {formatPercentage((data as PromoSimulationScenario).lift)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Event Type</p>
                    <Badge className={getEventTypeColor((data as PromoSimulationScenario).eventType)}>
                      {(data as PromoSimulationScenario).eventType}
                    </Badge>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-600">Current Price</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency((data as PriceSimulationScenario).currentPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">New Price</p>
                    <p className={`font-semibold ${
                      (data as PriceSimulationScenario).priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency((data as PriceSimulationScenario).newPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Price Change</p>
                    <p className={`font-semibold ${
                      (data as PriceSimulationScenario).priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {(data as PriceSimulationScenario).priceChangePercent > 0 ? '+' : ''}
                      {formatPercentage((data as PriceSimulationScenario).priceChangePercent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Elasticity</p>
                    <p className="font-semibold text-blue-600">
                      {(data as PriceSimulationScenario).elasticity.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Simulation Type</p>
                    <Badge className="bg-indigo-100 text-indigo-700">
                      {(data as PriceSimulationScenario).simulationType}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-600">Competitor Response</p>
                    <Badge className={getCompetitorResponseColor((data as PriceSimulationScenario).competitorResponse)}>
                      {(data as PriceSimulationScenario).competitorResponse}
                    </Badge>
                  </div>
                </>
              )}
            </div>

            {/* Revenue and Units */}
            <div className="pt-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Projected Revenue</p>
                  <p className="font-semibold text-emerald-600">
                    {formatCurrency(data.projectedRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Projected Units</p>
                  <p className="font-semibold text-emerald-600">
                    {formatNumber(data.projectedUnits)}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <p className="text-xs text-gray-500 line-clamp-2">
                {data.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SimulatorScenarioSelection({ onScenarioSelection, onBack }: ScenarioSelectionProps) {
  const [selectedScenarios, setSelectedScenarios] = useState<ComparisonSimulationScenario[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'promo' | 'price'>('promo')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'revenue'>('name')

  const filteredScenarios = useMemo(() => {
    let scenarios = allScenarios

    // Tab filter - always filter by active tab since we removed "all"
    scenarios = scenarios.filter(s => s.type === activeTab)

    // Status filter
    if (statusFilter !== 'all') {
      scenarios = scenarios.filter(s => s.data.status === statusFilter)
    }

    // Search filter
    if (searchQuery) {
      scenarios = filterScenarios(scenarios, {
        type: [],
        brand: [],
        retailer: [],
        status: [],
        searchQuery
      })
    }

    return sortScenarios(scenarios, sortBy)
  }, [activeTab, statusFilter, searchQuery, sortBy])

  const handleToggleScenario = (scenario: ComparisonSimulationScenario) => {
    setSelectedScenarios(prev => {
      const isSelected = prev.some(s => s.id === scenario.id)
      if (isSelected) {
        return prev.filter(s => s.id !== scenario.id)
      } else {
        return [...prev, scenario]
      }
    })
  }

  const handleCompare = () => {
    if (selectedScenarios.length >= MIN_COMPARISON_SCENARIOS) {
      onScenarioSelection(selectedScenarios)
    }
  }

  const clearSelection = () => {
    setSelectedScenarios([])
  }

  const canCompare = selectedScenarios.length >= MIN_COMPARISON_SCENARIOS

  return (
    <div className="w-full h-full p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Compare Simulation Scenarios
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Select multiple scenarios to compare their performance metrics and outcomes side by side.
        </p>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-lg border border-gray-200 p-6 space-y-4"
      >
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search scenarios, brands, retailers, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {STATUS_OPTIONS.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value: 'name' | 'date' | 'revenue') => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'promo' | 'price')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="promo">🏷️ Promo ({samplePromoScenarios.length})</TabsTrigger>
            <TabsTrigger value="price">💰 Price ({samplePriceScenarios.length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Selection Summary */}
      <AnimatePresence>
        {selectedScenarios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="font-medium text-blue-900 flex-shrink-0">
                  {selectedScenarios.length} scenario{selectedScenarios.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2 flex-wrap max-h-20 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
                  {selectedScenarios.map(scenario => (
                    <Badge key={scenario.id} variant="secondary" className="flex items-center gap-1 flex-shrink-0">
                      <span className="max-w-[150px] truncate">{scenario.name}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-600 flex-shrink-0" 
                        onClick={() => handleToggleScenario(scenario)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear All
                </Button>
                <Button 
                  onClick={handleCompare}
                  disabled={!canCompare}
                  className={`${
                    canCompare
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Compare Scenarios
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Requirements Alert */}
      {selectedScenarios.length > 0 && selectedScenarios.length < MIN_COMPARISON_SCENARIOS && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Select at least {MIN_COMPARISON_SCENARIOS} scenarios to enable comparison.
          </AlertDescription>
        </Alert>
      )}

      {/* Scenarios Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6"
      >
        {filteredScenarios.map((scenario, index) => {
          const isSelected = selectedScenarios.some(s => s.id === scenario.id)
          // Since we're now filtering by tab, all scenarios shown are of the same type
          const isDisabled = false
          
          return (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onToggle={() => handleToggleScenario(scenario)}
              index={index}
            />
          )
        })}
      </motion.div>

      {/* No Results */}
      {filteredScenarios.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <BarChart3 className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scenarios found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </motion.div>
      )}

      {/* Bottom Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-between items-center pt-6 border-t border-gray-200"
      >
        <Button variant="outline" onClick={onBack}>
          Back to Dashboard
        </Button>
        
        {selectedScenarios.length > 0 && (
          <div className="text-sm text-gray-600">
            Selected: {selectedScenarios.length} scenarios
          </div>
        )}
      </motion.div>
    </div>
  )
}
