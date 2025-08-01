import { useState, useEffect } from 'react'
import { Brand, EventData, SavedEvent, EventTemplate, EventFilter } from '../types'
import { generateEventData } from '../utils'

export const useEventLibrary = () => {
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([])
  const [eventData, setEventData] = useState<EventData[]>([])
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([])
  const [eventTemplates, setEventTemplates] = useState<EventTemplate[]>([])
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [eventFilter, setEventFilter] = useState<EventFilter>({})

  // Load saved events from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('eventLibrary_savedEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }

    const templates = localStorage.getItem('eventLibrary_templates')
    if (templates) {
      setEventTemplates(JSON.parse(templates))
    } else {
      // Set default templates
      const defaultTemplates: EventTemplate[] = [
        {
          id: 'template-1',
          name: 'Promotional Campaign',
          description: 'Standard promotional campaign template',
          category: 'Promotion',
          template: {
            type: 'promotion',
            status: 'planned',
            channel: 'Digital Advertising'
          },
          isDefault: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'template-2',
          name: 'Product Launch',
          description: 'Product launch event template',
          category: 'Launch',
          template: {
            type: 'launch',
            status: 'planned',
            channel: 'Social Media'
          },
          isDefault: true,
          createdAt: new Date().toISOString()
        }
      ]
      setEventTemplates(defaultTemplates)
      localStorage.setItem('eventLibrary_templates', JSON.stringify(defaultTemplates))
    }
  }, [])

  // Save events to localStorage whenever savedEvents changes
  useEffect(() => {
    localStorage.setItem('eventLibrary_savedEvents', JSON.stringify(savedEvents))
  }, [savedEvents])

  const handleBrandSelection = (brands: Brand[]) => {
    setSelectedBrands(brands)
    const newEventData = generateEventData(brands)
    setEventData(newEventData)
    setIsConfiguring(true)
  }

  const resetEventLibrary = () => {
    setSelectedBrands([])
    setEventData([])
    setIsConfiguring(false)
  }

  const saveEvent = (event: Omit<SavedEvent, 'id' | 'savedAt'>) => {
    const newEvent: SavedEvent = {
      ...event,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date().toISOString()
    }
    setSavedEvents(prev => [newEvent, ...prev])
    return newEvent
  }

  const updateEvent = (eventId: string, updates: Partial<SavedEvent>) => {
    setSavedEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      )
    )
  }

  const deleteEvent = (eventId: string) => {
    setSavedEvents(prev => prev.filter(event => event.id !== eventId))
  }

  const duplicateEvent = (eventId: string) => {
    const eventToDuplicate = savedEvents.find(event => event.id === eventId)
    if (eventToDuplicate) {
      const duplicatedEvent = {
        ...eventToDuplicate,
        title: `${eventToDuplicate.title} (Copy)`,
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        savedAt: new Date().toISOString()
      }
      setSavedEvents(prev => [duplicatedEvent, ...prev])
      return duplicatedEvent
    }
  }

  const saveEventTemplate = (template: Omit<EventTemplate, 'id' | 'createdAt'>) => {
    const newTemplate: EventTemplate = {
      ...template,
      id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    setEventTemplates(prev => [newTemplate, ...prev])
    localStorage.setItem('eventLibrary_templates', JSON.stringify([newTemplate, ...eventTemplates]))
    return newTemplate
  }

  const deleteEventTemplate = (templateId: string) => {
    const updatedTemplates = eventTemplates.filter(template => template.id !== templateId)
    setEventTemplates(updatedTemplates)
    localStorage.setItem('eventLibrary_templates', JSON.stringify(updatedTemplates))
  }

  const getFilteredEvents = () => {
    return savedEvents.filter(event => {
      if (eventFilter.status && eventFilter.status.length > 0 && !eventFilter.status.includes(event.status)) {
        return false
      }
      if (eventFilter.type && eventFilter.type.length > 0 && !eventFilter.type.includes(event.type)) {
        return false
      }
      if (eventFilter.channel && eventFilter.channel.length > 0 && !eventFilter.channel.includes(event.channel)) {
        return false
      }
      if (eventFilter.search && !event.title.toLowerCase().includes(eventFilter.search.toLowerCase())) {
        return false
      }
      if (eventFilter.dateRange) {
        const eventStart = new Date(event.startDate)
        const filterStart = new Date(eventFilter.dateRange.start)
        const filterEnd = new Date(eventFilter.dateRange.end)
        if (eventStart < filterStart || eventStart > filterEnd) {
          return false
        }
      }
      return true
    })
  }

  return {
    selectedBrands,
    eventData,
    savedEvents,
    eventTemplates,
    isConfiguring,
    eventFilter,
    handleBrandSelection,
    resetEventLibrary,
    saveEvent,
    updateEvent,
    deleteEvent,
    duplicateEvent,
    saveEventTemplate,
    deleteEventTemplate,
    setEventFilter,
    getFilteredEvents
  }
}
