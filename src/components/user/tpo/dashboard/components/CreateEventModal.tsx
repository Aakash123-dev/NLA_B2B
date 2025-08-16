'use client'

import React from 'react'
import { EventModal } from './calendar'
import type { Event } from '@/types/event'

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (eventData: Omit<Event, 'id'>) => Promise<void>
  initialEvent?: Event
  startDate?: Date
  productData: any[]
  products: string[]
  getProductsForBrand: (retailerId: string, brandId: string) => string[]
  tpoData: any
  currentYear: number
  events: Event[]
  isSubmitting: boolean
  // Optional legacy props kept for compatibility (not used here)
  onEventCreated?: () => void
  tradePlanId?: string
}

export function CreateEventModal({ isOpen, onClose, isSubmitting, onSave, initialEvent, startDate, productData, products, getProductsForBrand, tpoData, currentYear, events }: CreateEventModalProps) {

  return (
    <EventModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      initialEvent={initialEvent}
      startDate={startDate}
      productData={productData}
      products={products}
      getProductsForBrand={getProductsForBrand}
      tpoData={tpoData}
      currentYear={currentYear}
      events={events}
      isSubmitting={isSubmitting}
      
    />
  )
}
