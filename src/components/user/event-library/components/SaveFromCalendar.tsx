'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Save, 
  Tag,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  AlertCircle
} from 'lucide-react'

interface TradeCalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: 'promotion' | 'campaign' | 'launch'
  channel: string
  color: string
  description?: string
}

interface SaveFromCalendarProps {
  events: TradeCalendarEvent[]
  onSaveEvent: (event: TradeCalendarEvent) => void
  savedEventIds: string[]
}

export function SaveFromCalendar({ events, onSaveEvent, savedEventIds }: SaveFromCalendarProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'promotion':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'campaign':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'launch':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Save Events from Trade Calendar</h2>
        <p className="text-gray-600">Select events from your Trade Calendar to save to your Event Library</p>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events available</h3>
            <p className="text-gray-500">There are no events in your Trade Calendar to save</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const isAlreadySaved = savedEventIds.includes(event.id)
            
            return (
              <Card key={event.id} className={`group transition-all duration-300 ${
                isAlreadySaved ? 'bg-green-50 border-green-200' : 'hover:shadow-lg'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {event.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={`text-xs ${getTypeColor(event.type)}`}>
                          {event.type}
                        </Badge>
                        {isAlreadySaved && (
                          <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Saved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{event.channel}</span>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="pt-2">
                    <Button
                      onClick={() => onSaveEvent(event)}
                      disabled={isAlreadySaved}
                      className={`w-full ${
                        isAlreadySaved 
                          ? 'bg-green-100 text-green-800 border-green-200 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      variant={isAlreadySaved ? 'outline' : 'default'}
                    >
                      {isAlreadySaved ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Already Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save to Library
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
