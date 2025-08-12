'use client'

import React from 'react'
import { EventModal } from './calendar'

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onEventCreated: () => void
  tradePlanId: string
  products?: string[]
  getProductsForBrand?: (retailerId: string, brandId: string) => string[]
  tpoData?: any
  productData?: any[]
}

export function CreateEventModal({ isOpen, onClose, isSubmitting, onSave, initialEvent, startDate, productData, products, getProductsForBrand, tpoData, currentYear, events}: CreateEventModalProps) {

  return (
    <EventModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      initialEvent={initialEvent}
      startDate={startDate}
      productData = {productData}
      products = { products}
      getProductsForBrand = {getProductsForBrand} 
      tpoData ={tpoData}
      currentYear = {currentYear}
       events ={events}
       isSubmitting={isSubmitting}
      
    />
  )
}
