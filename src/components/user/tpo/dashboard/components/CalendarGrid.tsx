'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Event {
  id: string
  title: string
  date: string
  time: string
  type: 'promotion' | 'campaign' | 'launch'
  channel: string
  color: string
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Sale Launch',
    date: '2025-07-25',
    time: '09:00',
    type: 'promotion',
    channel: 'In-Store Display',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Digital Campaign Start',
    date: '2025-07-28',
    time: '08:00',
    type: 'campaign',
    channel: 'Digital Advertising',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Product Launch Event',
    date: '2025-08-02',
    time: '10:00',
    type: 'launch',
    channel: 'Social Media',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Back to School Promo',
    date: '2025-08-15',
    time: '07:00',
    type: 'promotion',
    channel: 'Email Marketing',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    title: 'Weekend Flash Sale',
    date: '2025-07-26',
    time: '12:00',
    type: 'promotion',
    channel: 'Digital Advertising',
    color: 'bg-red-500'
  }
]

export function CalendarGrid() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1)
    } else {
      newDate.setMonth(currentMonth + 1)
    }
    setCurrentDate(newDate)
  }

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return sampleEvents.filter(event => event.date === dateStr)
  }

  const formatDateForComparison = (date: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
  }

  const renderCalendarDays = () => {
    const days = []
    
    // Empty cells for previous month
    for (let i = 0; i < firstDayWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-28 border border-white/20 bg-slate-50/30"></div>
      )
    }

    // Days of current month
    for (let date = 1; date <= daysInMonth; date++) {
      const dateStr = formatDateForComparison(date)
      const dayEvents = getEventsForDate(date)
      const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, date).toDateString()
      const isSelected = selectedDate === dateStr

      days.push(
        <motion.div
          key={date}
          whileHover={{ scale: 1.02 }}
          className={`h-28 border border-white/20 p-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
            isToday ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300/50' : 'bg-white/60 hover:bg-white/80'
          } ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
          onClick={() => setSelectedDate(isSelected ? null : dateStr)}
        >
          <div className={`text-sm font-semibold mb-2 transition-colors ${
            isToday ? 'text-blue-600' : 'text-slate-900 group-hover:text-slate-700'
          }`}>
            {date}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, idx) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded-lg text-white truncate shadow-sm ${event.color} font-medium`}
                title={`${event.title} - ${event.time}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-slate-500 font-medium bg-slate-100/80 px-2 py-1 rounded-lg">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
          {isToday && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
          )}
        </motion.div>
      )
    }

    return days
  }

  const selectedDateEvents = selectedDate ? sampleEvents.filter(event => event.date === selectedDate) : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-xl" />
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Event Calendar</h3>
              <p className="text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {monthNames[currentMonth]} {currentYear}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="h-10 w-10 p-0 bg-white/60 border-2 border-white/20 hover:bg-white/80 rounded-xl shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="h-10 w-10 p-0 bg-white/60 border-2 border-white/20 hover:bg-white/80 rounded-xl shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-slate-700 py-3 bg-gradient-to-r from-slate-50 to-slate-100 first:rounded-l-xl last:rounded-r-xl border-r border-slate-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 border-2 border-white/20 rounded-2xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-sm">
              {renderCalendarDays()}
            </div>
          </div>

          {/* Event Details Panel */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 rounded-2xl blur-lg" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-700">
                    {selectedDate ? 'Selected Events' : 'Upcoming Events'}
                  </h4>
                </div>
                
                <div className="space-y-4">
                  {(selectedDate ? selectedDateEvents : sampleEvents.slice(0, 4)).map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className={`absolute inset-0 ${event.color.replace('bg-', 'from-')} to-transparent opacity-5`} />
                      <div className="relative flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full ${event.color} shadow-sm mt-1`}></div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-slate-900 text-sm truncate group-hover:text-slate-800">{event.title}</h5>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center justify-center w-5 h-5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                              <Clock className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-medium text-slate-600">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center justify-center w-5 h-5 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                              <MapPin className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-medium text-slate-600">{event.channel}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {selectedDate && selectedDateEvents.length === 0 && (
                    <div className="text-center py-8">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-500">No events on this date</p>
                    </div>
                  )}
                </div>
                
                {!selectedDate && sampleEvents.length > 4 && (
                  <div className="mt-6 text-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg text-xs px-4 py-2 rounded-xl"
                    >
                      View All Events
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
