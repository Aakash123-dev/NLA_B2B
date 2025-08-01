'use client'

import React, { useState, useMemo } from 'react'
import { Search, Calendar, TrendingUp, CheckCircle2, PieChart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MAX_COMPARISON_EVENTS, MIN_COMPARISON_EVENTS, sampleTPOEvents, sampleBrands } from '../constants'
import { TPOEvent } from '../types'

interface TPOEventSelectionProps {
  onEventSelection: (selectedEvents: TPOEvent[]) => void
  onBrandSelection: (brand: string) => void
  selectedBrand?: string
}

export function TPOEventSelection({ onEventSelection, onBrandSelection, selectedBrand }: TPOEventSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])

  // Filter events by brand and search query
  const filteredEvents = useMemo(() => {
    let events = sampleTPOEvents
    
    // Filter by brand if selected (exclude "all" as it means show all brands)
    if (selectedBrand && selectedBrand !== "all") {
      events = events.filter(event => event.brand === selectedBrand)
    }
    
    // Filter by search query
    if (searchQuery) {
      events = events.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.retailer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.eventType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return events
  }, [searchQuery, selectedBrand])

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId)
      } else if (prev.length < MAX_COMPARISON_EVENTS) {
        return [...prev, eventId]
      }
      return prev
    })
  }

  const handleCompare = () => {
    const selectedEventObjects = sampleTPOEvents.filter(event => selectedEvents.includes(event.id))
    onEventSelection(selectedEventObjects)
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
      case 'TPR': return 'bg-purple-100 text-purple-700'
      case 'Feature': return 'bg-blue-100 text-blue-700'
      case 'Display': return 'bg-green-100 text-green-700'
      case 'Promotion': return 'bg-red-100 text-red-700'
      case 'Bundle': return 'bg-cyan-100 text-cyan-700'
      case 'BOGO': return 'bg-emerald-100 text-emerald-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  const canCompare = selectedEvents.length >= MIN_COMPARISON_EVENTS

  return (
    <div className="w-full px-6 py-8 min-h-[calc(100vh-120px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
            <PieChart className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Compare TPO Events
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Select a brand and compare TPO events across comprehensive metrics
          </p>

          {/* Brand Selection and Controls */}
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6 mb-10">
            {/* Brand Selection */}
            <div className="flex-1 min-w-0">
              <Select value={selectedBrand} onValueChange={onBrandSelection}>
                <SelectTrigger className="w-full h-14 px-6 rounded-2xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-base shadow-sm">
                  <SelectValue placeholder="Select a Plan to compare events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  {sampleBrands.filter(brand => brand && brand.trim() !== '').map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search events, retailers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            {/* Compare Button */}
            {selectedEvents.length > 0 && (
              <Button
                onClick={handleCompare}
                disabled={!canCompare}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
                  canCompare
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Compare ({selectedEvents.length})
                {!canCompare && ` - Need ${MIN_COMPARISON_EVENTS - selectedEvents.length} more`}
              </Button>
            )}
          </div>
        </div>

        {/* Selection Status */}
        {selectedEvents.length > 0 && (
          <div className="mb-6 flex justify-center">
            <Alert className="max-w-md">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                {selectedEvents.length} events selected. 
                {selectedEvents.length < MIN_COMPARISON_EVENTS && ` Select at least ${MIN_COMPARISON_EVENTS - selectedEvents.length} more to compare.`}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.map((event) => {
            const isSelected = selectedEvents.includes(event.id)

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' 
                      : 'hover:shadow-lg hover:border-gray-300'
                  }`}
                  onClick={() => handleEventToggle(event.id)}
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
                          {event.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                          <Badge variant="outline" className={getEventTypeColor(event.eventType)}>
                            {event.eventType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{event.brand}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Retailer:</span>
                        <span className="font-medium">{event.retailer}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-semibold text-gray-900">{formatPrice(event.basePrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Promo Price:</span>
                        <span className="font-semibold text-purple-600">{formatPrice(event.promoPrice)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try selecting a different brand or adjusting your search criteria</p>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Select at least {MIN_COMPARISON_EVENTS} events to compare their performance, metrics, and insights
          </p>
        </div>
      </motion.div>
    </div>
  )
}
