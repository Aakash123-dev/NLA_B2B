'use client'

import { CanvasNode, Connection } from '@/app/user/design-studio/types'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar } from '@/components/ui/calendar'
import { CalendarDays, Clock, AlertCircle, Plus, Save, Download, Link as LinkIcon } from 'lucide-react'

const eventTypes = [
  { id: 'promotion', name: 'Promotion Launch', color: 'bg-green-500' },
  { id: 'pricing', name: 'Price Change', color: 'bg-blue-500' },
  { id: 'campaign', name: 'Marketing Campaign', color: 'bg-purple-500' },
  { id: 'seasonal', name: 'Seasonal Event', color: 'bg-orange-500' },
  { id: 'competitor', name: 'Competitor Activity', color: 'bg-red-500' },
]

const priorityLevels = [
  { id: 'low', name: 'Low', color: 'text-green-400' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-400' },
  { id: 'high', name: 'High', color: 'text-red-400' },
]

export default function TradeCalendarNodeConfig({
  node,
  nodes,
  connections,
  onOpenNodeTab,
}: {
  node: CanvasNode
  nodes: CanvasNode[]
  connections: Connection[]
  onOpenNodeTab: (nodeId: string) => void
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [eventTitle, setEventTitle] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventType, setEventType] = useState('promotion')
  const [eventPriority, setEventPriority] = useState('medium')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('17:00')
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringPattern, setRecurringPattern] = useState('weekly')
  const [notifications, setNotifications] = useState(true)
  const [notificationTime, setNotificationTime] = useState('1')

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Summer Sale Launch',
      description: 'Launch of summer promotional campaign',
      date: new Date(2025, 6, 15),
      type: 'promotion',
      priority: 'high',
      startTime: '08:00',
      endTime: '18:00',
    },
    {
      id: 2,
      title: 'Price Adjustment - Electronics',
      description: 'Quarterly price review for electronics category',
      date: new Date(2025, 6, 20),
      type: 'pricing',
      priority: 'medium',
      startTime: '10:00',
      endTime: '16:00',
    },
    {
      id: 3,
      title: 'Competitor Analysis',
      description: 'Weekly competitor price monitoring',
      date: new Date(2025, 6, 25),
      type: 'competitor',
      priority: 'low',
      startTime: '09:00',
      endTime: '11:00',
    },
  ])

  const connectedNodes = connections
    .filter((c) => c.from === node.id || c.to === node.id)
    .map((c) => (c.from === node.id ? c.to : c.from))
    .map((id) => nodes.find((n) => n.id === id))
    .filter((n): n is CanvasNode => !!n)

  const handleAddEvent = () => {
    if (!eventTitle.trim() || !selectedDate) return

    const newEvent = {
      id: events.length + 1,
      title: eventTitle,
      description: eventDescription,
      date: selectedDate,
      type: eventType,
      priority: eventPriority,
      startTime,
      endTime,
    }

    setEvents([...events, newEvent])
    
    // Reset form
    setEventTitle('')
    setEventDescription('')
    setEventType('promotion')
    setEventPriority('medium')
    setStartTime('09:00')
    setEndTime('17:00')
  }

  const getEventTypeColor = (typeId: string) => {
    const type = eventTypes.find(t => t.id === typeId)
    return type ? type.color : 'bg-gray-500'
  }

  const getEventTypeName = (typeId: string) => {
    const type = eventTypes.find(t => t.id === typeId)
    return type ? type.name : 'Unknown'
  }

  const getPriorityColor = (priorityId: string) => {
    const priority = priorityLevels.find(p => p.id === priorityId)
    return priority ? priority.color : 'text-gray-400'
  }

  const getPriorityName = (priorityId: string) => {
    const priority = priorityLevels.find(p => p.id === priorityId)
    return priority ? priority.name : 'Unknown'
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-foreground">
            {node.name}
            {node.version && ` v${node.version}`} - Trade Calendar Configuration
          </CardTitle>
          <CardDescription>
            Schedule and track trading activities, promotions, and market events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connected Tools */}
          {connectedNodes.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Connected Tools</h4>
              <div className="flex flex-wrap gap-2">
                {connectedNodes.map(connectedNode => (
                  <Button
                    key={connectedNode.id}
                    variant="outline"
                    size="sm"
                    className="justify-start border-primary/20"
                    onClick={() => onOpenNodeTab(connectedNode.id)}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    {connectedNode.name} {connectedNode.version && `v${connectedNode.version}`}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar View */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Calendar</h4>
              
              <Card className="border-primary/20 bg-background/30">
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0"
                    modifiers={{
                      hasEvents: (date) => getEventsForDate(date).length > 0
                    }}
                    modifiersStyles={{
                      hasEvents: { 
                        backgroundColor: 'hsl(var(--primary))', 
                        color: 'hsl(var(--primary-foreground))',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </CardContent>
              </Card>

              {/* Events for Selected Date */}
              {selectedDate && (
                <div className="space-y-3">
                  <h5 className="font-medium text-foreground">
                    Events for {selectedDate.toLocaleDateString()}
                  </h5>
                  
                  <ScrollArea className="h-40 rounded-md border border-primary/20 bg-background/30">
                    <div className="p-3 space-y-2">
                      {getEventsForDate(selectedDate).map(event => (
                        <div key={event.id} className="flex items-start space-x-3 p-2 rounded-lg bg-background/50">
                          <div className={`w-3 h-3 rounded-full mt-2 ${getEventTypeColor(event.type)}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.startTime} - {event.endTime}</p>
                            <Badge variant="outline" className={`text-xs mt-1 ${getPriorityColor(event.priority)}`}>
                              {getPriorityName(event.priority)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {getEventsForDate(selectedDate).length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No events scheduled for this date
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>

            {/* Add Event Form */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Add New Event</h4>
              
              <Card className="border-primary/20 bg-background/30">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title" className="text-muted-foreground">Event Title</Label>
                    <Input
                      id="event-title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Enter event title"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-description" className="text-muted-foreground">Description</Label>
                    <Textarea
                      id="event-description"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Event description..."
                      className="bg-background/50 border-primary/20"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Event Type</Label>
                      <Select value={eventType} onValueChange={setEventType}>
                        <SelectTrigger className="bg-background/50 border-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map(type => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${type.color}`} />
                                <span>{type.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Priority</Label>
                      <Select value={eventPriority} onValueChange={setEventPriority}>
                        <SelectTrigger className="bg-background/50 border-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityLevels.map(priority => (
                            <SelectItem key={priority.id} value={priority.id}>
                              <span className={priority.color}>{priority.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time" className="text-muted-foreground">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="bg-background/50 border-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-time" className="text-muted-foreground">End Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="bg-background/50 border-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-foreground">Recurring Event</Label>
                        <p className="text-sm text-muted-foreground">Repeat this event</p>
                      </div>
                      <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
                    </div>

                    {isRecurring && (
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Repeat Pattern</Label>
                        <Select value={recurringPattern} onValueChange={setRecurringPattern}>
                          <SelectTrigger className="bg-background/50 border-primary/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-foreground">Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get reminded about this event</p>
                      </div>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>

                    {notifications && (
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Notify Before (hours)</Label>
                        <Select value={notificationTime} onValueChange={setNotificationTime}>
                          <SelectTrigger className="bg-background/50 border-primary/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">30 minutes</SelectItem>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="2">2 hours</SelectItem>
                            <SelectItem value="24">1 day</SelectItem>
                            <SelectItem value="168">1 week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <Button onClick={handleAddEvent} className="w-full bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* All Events List */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">All Events</h4>
            
            <Card className="border-primary/20 bg-background/30">
              <CardContent className="p-4">
                <ScrollArea className="h-60">
                  <div className="space-y-3">
                    {events.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-primary/10">
                        <div className="flex items-start space-x-3">
                          <div className={`w-4 h-4 rounded-full mt-1 ${getEventTypeColor(event.type)}`} />
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground">{event.title}</h5>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <CalendarDays className="w-3 h-3 mr-1" />
                                {event.date.toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {event.startTime} - {event.endTime}
                              </span>
                              <Badge variant="outline" className={`${getPriorityColor(event.priority)}`}>
                                {getPriorityName(event.priority)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getEventTypeName(event.type)}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Calendar
            </Button>
            <Button variant="outline" className="border-primary/20">
              <Download className="w-4 h-4 mr-2" />
              Export Events
            </Button>
            <Button variant="outline" className="border-primary/20">
              <AlertCircle className="w-4 h-4 mr-2" />
              Manage Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
