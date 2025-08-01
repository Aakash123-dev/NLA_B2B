'use client'

import React, { useState, useMemo } from 'react'
import { Search, Calendar, TrendingUp, AlertCircle, CheckCircle2, Tag, DollarSign, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAX_COMPARISON_SCENARIOS, MIN_COMPARISON_SCENARIOS, SCENARIO_TYPES } from '../constants'
import { ComparisonScenario, PromoScenario, PriceScenario, ScenarioFilterOptions } from '../types'
import { getStatusColor, getTypeColor, formatCurrency } from '../utils'

// Sample data for scenarios
const samplePromoScenarios: PromoScenario[] = [
  {
    id: 'promo-001',
    name: 'Summer Sale Campaign',
    brand: 'Brand A',
    retailer: 'Target',
    product: 'Product X',
    basePrice: 25.99,
    promoPrice: 19.99,
    discountPercent: 23.1,
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    eventType: 'TPR',
    status: 'Completed',
    projectedRevenue: 245000,
    actualRevenue: 268000,
    roi: 15.2,
    units: 12000,
    description: 'Summer promotional campaign with TPR strategy',
    createdDate: '2024-05-15'
  },
  {
    id: 'promo-002',
    name: 'Back to School Promo',
    brand: 'Brand B',
    retailer: 'Walmart',
    product: 'Product Y',
    basePrice: 45.00,
    promoPrice: 35.99,
    discountPercent: 20.0,
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    eventType: 'Feature + Display',
    status: 'Active',
    projectedRevenue: 180000,
    roi: 12.5,
    units: 8500,
    description: 'Back to school promotional campaign',
    createdDate: '2024-07-10'
  },
  {
    id: 'promo-003',
    name: 'Holiday Special',
    brand: 'Brand A',
    retailer: 'Kroger',
    product: 'Product Z',
    basePrice: 32.99,
    promoPrice: 24.99,
    discountPercent: 24.2,
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    eventType: 'Display',
    status: 'Scheduled',
    projectedRevenue: 320000,
    roi: 18.7,
    units: 15000,
    description: 'Holiday promotional campaign with display focus',
    createdDate: '2024-10-01'
  }
]

const samplePriceScenarios: PriceScenario[] = [
  {
    id: 'price-001',
    name: 'Competitive Price Adjustment',
    brand: 'Brand A',
    retailer: 'Target',
    product: 'Product X',
    currentPrice: 25.99,
    newPrice: 24.99,
    priceChangePercent: -3.8,
    effectiveDate: '2024-07-01',
    simulationType: 'Competitive Response',
    status: 'Active',
    projectedRevenue: 195000,
    expectedUnits: 9500,
    elasticity: -1.2,
    description: 'Price adjustment to match competitor pricing',
    createdDate: '2024-06-20'
  },
  {
    id: 'price-002',
    name: 'Premium Positioning Test',
    brand: 'Brand B',
    retailer: 'Whole Foods',
    product: 'Product Y',
    currentPrice: 45.00,
    newPrice: 49.99,
    priceChangePercent: 11.1,
    effectiveDate: '2024-08-15',
    simulationType: 'Gradual',
    status: 'Scheduled',
    projectedRevenue: 225000,
    expectedUnits: 6800,
    elasticity: -0.8,
    description: 'Testing premium price positioning',
    createdDate: '2024-07-30'
  },
  {
    id: 'price-003',
    name: 'Market Penetration Strategy',
    brand: 'Brand C',
    retailer: 'Walmart',
    product: 'Product Z',
    currentPrice: 32.99,
    newPrice: 29.99,
    priceChangePercent: -9.1,
    effectiveDate: '2024-09-01',
    simulationType: 'Immediate',
    status: 'Draft',
    projectedRevenue: 280000,
    expectedUnits: 14500,
    elasticity: -1.5,
    description: 'Aggressive pricing for market penetration',
    createdDate: '2024-08-15'
  }
]

interface ScenarioSelectionProps {
  onScenarioSelection: (scenarios: ComparisonScenario[]) => void
}

export function ScenarioSelection({ onScenarioSelection }: ScenarioSelectionProps) {
  const [selectedScenarios, setSelectedScenarios] = useState<ComparisonScenario[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState<ScenarioFilterOptions>({
    type: ['promo', 'price'],
    brand: [],
    retailer: [],
    status: [],
    dateRange: { startDate: null, endDate: null }
  })

  // Combine all scenarios
  const allScenarios: ComparisonScenario[] = useMemo(() => {
    const promoScenarios = samplePromoScenarios.map(promo => ({
      id: promo.id,
      name: promo.name,
      type: 'promo' as const,
      data: promo
    }))
    
    const priceScenarios = samplePriceScenarios.map(price => ({
      id: price.id,
      name: price.name,
      type: 'price' as const,
      data: price
    }))
    
    return [...promoScenarios, ...priceScenarios]
  }, [])

  // Filter scenarios based on search and filters
  const filteredScenarios = useMemo(() => {
    return allScenarios.filter(scenario => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch = 
          scenario.name.toLowerCase().includes(searchLower) ||
          scenario.data.brand.toLowerCase().includes(searchLower) ||
          scenario.data.retailer.toLowerCase().includes(searchLower) ||
          scenario.data.product.toLowerCase().includes(searchLower)
        
        if (!matchesSearch) return false
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(scenario.type)) {
        return false
      }

      // Tab filter
      if (activeTab !== 'all' && scenario.type !== activeTab) {
        return false
      }

      return true
    })
  }, [allScenarios, searchQuery, filters, activeTab])

  const handleScenarioToggle = (scenario: ComparisonScenario) => {
    setSelectedScenarios(prev => {
      const isSelected = prev.some(s => s.id === scenario.id)
      
      if (isSelected) {
        return prev.filter(s => s.id !== scenario.id)
      } else {
        if (prev.length >= MAX_COMPARISON_SCENARIOS) {
          return prev
        }
        return [...prev, scenario]
      }
    })
  }

  const handleCompareScenarios = () => {
    if (selectedScenarios.length >= MIN_COMPARISON_SCENARIOS) {
      onScenarioSelection(selectedScenarios)
    }
  }

  const canCompare = selectedScenarios.length >= MIN_COMPARISON_SCENARIOS
  const isMaxReached = selectedScenarios.length >= MAX_COMPARISON_SCENARIOS

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Selection Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Compare Scenarios
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select promo and price scenarios to compare their performance, metrics, and outcomes side by side.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search scenarios by name, brand, retailer, or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </motion.div>

      {/* Scenario Type Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="all">All Scenarios</TabsTrigger>
            <TabsTrigger value="promo">🏷️ Promo</TabsTrigger>
            <TabsTrigger value="price">💰 Price</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Selection Summary */}
      {selectedScenarios.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="flex items-center justify-between">
                <span>
                  {selectedScenarios.length} scenario{selectedScenarios.length !== 1 ? 's' : ''} selected 
                  {selectedScenarios.length < MIN_COMPARISON_SCENARIOS && (
                    ` (minimum ${MIN_COMPARISON_SCENARIOS} required)`
                  )}
                </span>
                <Button
                  onClick={handleCompareScenarios}
                  disabled={!canCompare}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Compare Scenarios
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Warning for max selection */}
      {isMaxReached && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Maximum of {MAX_COMPARISON_SCENARIOS} scenarios can be compared at once.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Scenarios Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredScenarios.map((scenario, index) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenarios.some(s => s.id === scenario.id)}
            isDisabled={!selectedScenarios.some(s => s.id === scenario.id) && isMaxReached}
            onToggle={() => handleScenarioToggle(scenario)}
            index={index}
          />
        ))}
      </motion.div>

      {filteredScenarios.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scenarios found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find scenarios.</p>
        </motion.div>
      )}
    </div>
  )
}

// Scenario Card Component
interface ScenarioCardProps {
  scenario: ComparisonScenario
  isSelected: boolean
  isDisabled: boolean
  onToggle: () => void
  index: number
}

function ScenarioCard({ scenario, isSelected, isDisabled, onToggle, index }: ScenarioCardProps) {
  const isPromo = scenario.type === 'promo'
  const data = scenario.data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isSelected 
            ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50' 
            : isDisabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:ring-1 hover:ring-gray-300'
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
              />
              {isPromo ? (
                <Tag className="w-4 h-4 text-purple-600" />
              ) : (
                <DollarSign className="w-4 h-4 text-indigo-600" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Badge className={getTypeColor(scenario.type)}>
                {scenario.type === 'promo' ? 'Promo' : 'Price'}
              </Badge>
              <Badge variant="outline" className={getStatusColor(data.status)}>
                {data.status}
              </Badge>
            </div>
          </div>
          
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
            {scenario.name}
          </CardTitle>
          
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Brand:</span> {data.brand}</p>
            <p><span className="font-medium">Retailer:</span> {data.retailer}</p>
            <p><span className="font-medium">Product:</span> {data.product}</p>
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
                      {formatCurrency((data as PromoScenario).basePrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Promo Price</p>
                    <p className="font-semibold text-green-600">
                      {formatCurrency((data as PromoScenario).promoPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Discount</p>
                    <p className="font-semibold text-orange-600">
                      {(data as PromoScenario).discountPercent.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">ROI</p>
                    <p className="font-semibold text-blue-600">
                      {(data as PromoScenario).roi.toFixed(1)}%
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-600">Current Price</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency((data as PriceScenario).currentPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">New Price</p>
                    <p className={`font-semibold ${
                      (data as PriceScenario).priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency((data as PriceScenario).newPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Change</p>
                    <p className={`font-semibold ${
                      (data as PriceScenario).priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {(data as PriceScenario).priceChangePercent > 0 ? '+' : ''}
                      {(data as PriceScenario).priceChangePercent.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Elasticity</p>
                    <p className="font-semibold text-blue-600">
                      {(data as PriceScenario).elasticity.toFixed(1)}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Revenue */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-600">Projected Revenue</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(data.projectedRevenue)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
