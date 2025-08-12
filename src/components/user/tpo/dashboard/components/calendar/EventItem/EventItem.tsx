'use client'

import React, { useState, useRef } from 'react'
type Event = any

import { EventViewModal } from '../EventView/EventViewModal'
import EventHoverCard from './EventHoverCard'

interface EventItemProps {
  event: Event
  tpoData: any
  onEdit: () => void
  onDelete: (id: string) => void
  onCopy: (event: Event) => void
  onDragEnd: (event: Event, weeksDelta: number) => void
  currentYear: number
  onEventUpdate: (updatedEvent: Event) => void
}

export const EventItem: React.FC<EventItemProps> = ({
  event,
  tpoData,
  onEdit,
  onDelete,
  onCopy,
  onDragEnd,
  onEventUpdate,
  currentYear
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsViewModalOpen(true)
  }

  const handleEventUpdate = (updatedEvent: Event) => {
    onEventUpdate(updatedEvent)
  }

  return (
    <>
      <div
        ref={elementRef}
        className="h-8 rounded-md relative group pointer-events-auto w-full cursor-pointer"
        onDoubleClick={handleDoubleClick}
        style={{
          backgroundColor: event.status == 'COMPLETED' ? '#008503' : event.color || '#4F46E5',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center px-2">
          <span className="text-white text-xs truncate whitespace-nowrap font-medium">
            {event.title}
          </span>
        </div>
        <EventHoverCard event={event} />
      </div>

      <EventViewModal
        event={event}
        currentYear={currentYear}
        tpoData={tpoData}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={onEdit}
        onDelete={() => onDelete(event.id)}
        onEventUpdate={handleEventUpdate}
      />
    </>
  )
}

export default EventItem


