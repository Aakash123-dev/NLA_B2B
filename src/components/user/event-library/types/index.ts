export interface Brand {
  id: string
  name: string
  description: string
  category: string
  isSelected?: boolean
}

export interface SavedEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  status: 'planned' | 'active' | 'completed' | 'draft'
  type: 'promotion' | 'campaign' | 'launch'
  channel: string
  ppgName?: string
  products?: string[]
  planValue?: number
  actualValue?: number
  tradePlanId?: string
  brandName?: string
  savedAt: string
  tags?: string[]
  category?: string
  notes?: string
}

export interface EventTemplate {
  id: string
  name: string
  description: string
  category: string
  template: Partial<SavedEvent>
  isDefault: boolean
  createdAt: string
}

export interface EventData {
  brandId: string
  brandName: string
  events: {
    [eventName: string]: {
      attribute1: string
      attribute2: string
      attribute3: string
    }
  }
}

export interface EventLibraryState {
  selectedBrands: Brand[]
  eventData: EventData[]
  savedEvents: SavedEvent[]
  eventTemplates: EventTemplate[]
  isConfiguring: boolean
}

export interface EventAttribute {
  name: string
  value: string
  type: 'text' | 'number' | 'currency' | 'percentage'
}

export interface EventFilter {
  status?: string[]
  type?: string[]
  channel?: string[]
  dateRange?: {
    start: string
    end: string
  }
  search?: string
}
