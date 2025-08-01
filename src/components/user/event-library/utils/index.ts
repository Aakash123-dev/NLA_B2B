import { Brand, EventData } from '../types'
import { eventNames, attributeNames } from '../constants'

export const generateEventData = (brands: Brand[]): EventData[] => {
  return brands.map(brand => {
    const events: { [eventName: string]: { attribute1: string; attribute2: string; attribute3: string } } = {}
    
    eventNames.forEach(eventName => {
      events[eventName] = {
        attribute1: generateMockValue('attribute1', brand.id, eventName),
        attribute2: generateMockValue('attribute2', brand.id, eventName),
        attribute3: generateMockValue('attribute3', brand.id, eventName)
      }
    })

    return {
      brandId: brand.id,
      brandName: brand.name,
      events
    }
  })
}

const generateMockValue = (attribute: string, brandId: string, eventName: string): string => {
  const hash = brandId.charCodeAt(brandId.length - 1) + eventName.charCodeAt(0) + attribute.charCodeAt(0)
  const seedValue = Math.abs(hash * 123456) % 10000
  
  // Generate different types of values based on attribute
  if (attribute === 'attribute1') {
    const values = ['High Performance', 'Medium Performance', 'Standard Performance', 'Premium Quality', 'Basic Quality']
    return values[seedValue % values.length]
  }
  
  if (attribute === 'attribute2') {
    const percentage = (seedValue % 100) + 10
    return `${percentage}%`
  }
  
  if (attribute === 'attribute3') {
    const currency = (seedValue * 10) + 1000
    return `$${currency.toLocaleString()}`
  }
  
  return `Value ${seedValue % 100}`
}

export const filterBrandsBySearch = (brands: Brand[], searchQuery: string): Brand[] => {
  if (!searchQuery.trim()) return brands
  
  const query = searchQuery.toLowerCase()
  return brands.filter(brand => 
    brand.name.toLowerCase().includes(query) ||
    brand.description.toLowerCase().includes(query) ||
    brand.category.toLowerCase().includes(query)
  )
}
