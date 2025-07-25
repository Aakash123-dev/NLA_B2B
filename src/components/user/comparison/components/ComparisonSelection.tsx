'use client'

import React, { useState, useMemo } from 'react'
import { BarChart2, Search, Calendar, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MAX_COMPARISON_ITEMS, MIN_COMPARISON_ITEMS } from '../constants'

interface TPOEvent {
  id: string
  name: string
  brand: string
  retailer: string
  startDate: string
  endDate: string
  eventType: 'Promotion' | 'Discount' | 'Bundle' | 'BOGO'
  status: 'Active' | 'Completed' | 'Scheduled'
  revenue: number
  description: string
}

// Sample TPO events data
const sampleTPOEvents: TPOEvent[] = [
  {
    id: 'tpo-001',
    name: 'Summer Sale Campaign',
    brand: 'Coca Cola',
    retailer: 'Walmart',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    eventType: 'Promotion',
    status: 'Completed',
    revenue: 245000,
    description: 'Summer promotional campaign with 20% discount on all Coca Cola products'
  },
  {
    id: 'tpo-002',
    name: 'Back to School Bundle',
    brand: 'PepsiCo',
    retailer: 'Target',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    eventType: 'Bundle',
    status: 'Active',
    revenue: 180000,
    description: 'Bundle offer for snacks and beverages targeting back-to-school season'
  },
  {
    id: 'tpo-003',
    name: 'Holiday BOGO Special',
    brand: 'Nestlé',
    retailer: 'Kroger',
    startDate: '2024-12-01',
    endDate: '2024-12-25',
    eventType: 'BOGO',
    status: 'Scheduled',
    revenue: 320000,
    description: 'Buy One Get One offer on chocolate and confectionery products'
  },
  {
    id: 'tpo-004',
    name: 'Spring Fresh Launch',
    brand: 'Unilever',
    retailer: 'Safeway',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    eventType: 'Discount',
    status: 'Completed',
    revenue: 155000,
    description: 'Product launch campaign with introductory pricing'
  },
  {
    id: 'tpo-005',
    name: 'Weekend Flash Sale',
    brand: 'Procter & Gamble',
    retailer: 'Costco',
    startDate: '2024-07-15',
    endDate: '2024-07-17',
    eventType: 'Promotion',
    status: 'Completed',
    revenue: 89000,
    description: 'Limited time flash sale on household products'
  },
  {
    id: 'tpo-006',
    name: 'Winter Warmth Bundle',
    brand: 'Kellogg\'s',
    retailer: 'Publix',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    eventType: 'Bundle',
    status: 'Completed',
    revenue: 198000,
    description: 'Breakfast bundle promotion for winter season'
  }
]

interface ComparisonSelectionProps {
  onTPOSelection: (selectedTPOs: TPOEvent[]) => void
}

export function ComparisonSelection({ onTPOSelection }: ComparisonSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTPOs, setSelectedTPOs] = useState<string[]>([])

  // Filter TPO events based on search query
  const filteredTPOs = useMemo(() => {
    if (!searchQuery) return sampleTPOEvents
    return sampleTPOEvents.filter(tpo => 
      tpo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpo.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpo.retailer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpo.eventType.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleTPOToggle = (tpoId: string) => {
    setSelectedTPOs(prev => {
      if (prev.includes(tpoId)) {
        return prev.filter(id => id !== tpoId)
      } else {
        return [...prev, tpoId]
      }
    })
  }

  const handleCompare = () => {
    const selectedEvents = sampleTPOEvents.filter(tpo => selectedTPOs.includes(tpo.id))
    onTPOSelection(selectedEvents)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200'
      case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Scheduled': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Promotion': return 'bg-purple-100 text-purple-700'
      case 'Discount': return 'bg-red-100 text-red-700'
      case 'Bundle': return 'bg-cyan-100 text-cyan-700'
      case 'BOGO': return 'bg-emerald-100 text-emerald-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatRevenue = (revenue: number) => {
    return `$${(revenue / 1000).toFixed(0)}K`
  }

  const canCompare = selectedTPOs.length >= MIN_COMPARISON_ITEMS

  return (
    <div className="w-full px-6 py-8 min-h-[calc(100vh-120px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <BarChart2 className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Compare TPO Events
          </h2>
          
          <p className="text-gray-600 mb-6">
            Search and select TPO events to compare their performance and insights
          </p>

          {/* Search Bar and Compare Button */}
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search TPO events, brands, retailers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            
            {/* Compare Button next to search */}
            {selectedTPOs.length > 0 && (
              <Button
                onClick={handleCompare}
                disabled={!canCompare}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
                  canCompare
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Compare ({selectedTPOs.length})
                {!canCompare && ` - Need ${MIN_COMPARISON_ITEMS - selectedTPOs.length} more`}
              </Button>
            )}
          </div>
        </div>

        {/* Selection Status */}
        {selectedTPOs.length > 0 && (
          <div className="mb-6 flex justify-center">
            <Alert className="max-w-md">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                {selectedTPOs.length} events selected. 
                {selectedTPOs.length < MIN_COMPARISON_ITEMS && ` Select at least ${MIN_COMPARISON_ITEMS - selectedTPOs.length} more to compare.`}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* TPO Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTPOs.map((tpo) => {
            const isSelected = selectedTPOs.includes(tpo.id)

            return (
              <motion.div
                key={tpo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-emerald-500 bg-emerald-50 border-emerald-200' 
                      : 'hover:shadow-lg hover:border-gray-300'
                  }`}
                  onClick={() => handleTPOToggle(tpo.id)}
                >
                  {/* Checkbox */}
                  <div className="absolute top-4 right-4 z-10">
                    <Checkbox 
                      checked={isSelected}
                      className="w-5 h-5"
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {tpo.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(tpo.status)}>
                            {tpo.status}
                          </Badge>
                          <Badge variant="outline" className={getEventTypeColor(tpo.eventType)}>
                            {tpo.eventType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{tpo.brand}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Retailer:</span>
                        <span className="font-medium">{tpo.retailer}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-semibold text-emerald-600">{formatRevenue(tpo.revenue)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(tpo.startDate).toLocaleDateString()} - {new Date(tpo.endDate).toLocaleDateString()}</span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tpo.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredTPOs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No TPO events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Select at least {MIN_COMPARISON_ITEMS} TPO events to compare their performance, insights, and metrics
          </p>
        </div>
      </motion.div>
    </div>
  )
}
