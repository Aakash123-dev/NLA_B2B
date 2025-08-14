'use client'

import React, { useState, useRef } from 'react'
type Event = any

import { EventViewModal } from '../EventView/EventViewModal'
import { useDrag } from '@/hooks/useDrag'
import { format } from 'date-fns'
import { toJsDate } from '@/utils/dateUtils'
import { EventHoverCard } from './EventHoverCard'

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

  const handleDragEnd = (weeksDelta: number) => {
    // Only call onDragEnd if there's a valid weeks delta
    if (weeksDelta !== 0) {
        onDragEnd(event, weeksDelta)
    }
}

const { isDragging, weeksDelta, dragProps } = useDrag({
  onDragEnd: handleDragEnd,
  elementRef,
  backgroundColor: event.color || '#4F46E5'
})

const handleDoubleClick = (e: React.MouseEvent) => {
  e.stopPropagation()
  setIsViewModalOpen(true)
}

const formatDatePreview = () => {
  const startDate = toJsDate(event.start_date);
  const endDate = toJsDate(event.end_date);

  if (!startDate || !endDate) return '';

  if (weeksDelta !== 0) {
      // Calculate the new dates based on weeksDelta
      const daysDelta = weeksDelta * 7;
      const newStartDate = new Date(startDate);
      newStartDate.setDate(startDate.getDate() + daysDelta);

      const newEndDate = new Date(endDate);
      newEndDate.setDate(endDate.getDate() + daysDelta);

      return `${format(newStartDate, 'MMM d')} - ${format(newEndDate, 'MMM d, yyyy')}`;
  }

  return '';
}

const handleEventUpdate = (updatedEvent: Event) => {
  console.log('EventItem updatedEvent', updatedEvent)
  onEventUpdate(updatedEvent)
}


return (
  <>
      <div
          ref={elementRef}
          className={`h-8 rounded-md relative group pointer-events-auto w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onDoubleClick={handleDoubleClick}
          {...dragProps}
          style={{
              backgroundColor: event.status == 'COMPLETED' ? '#008503' : event.color || '#4F46E5',
              opacity: isDragging ? 0.3 : 1,
              transition: isDragging ? 'none' : 'opacity 0.2s ease-in-out, box-shadow 0.2s ease',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
              touchAction: 'none', // Disable browser handling of touch events
              userSelect: 'none', // Prevent text selection during drag
          }}
      >
          <div className="absolute inset-0 flex items-center justify-center px-2">
              <span className="text-white text-xs truncate whitespace-nowrap font-medium">
                  {event.title}
                  {isDragging && weeksDelta !== 0 && ` (${weeksDelta > 0 ? '+' : ''}${weeksDelta} weeks)`}
              </span>
          </div>

          {!isDragging && <EventHoverCard event={event} />}
      </div>

      {/* Show date preview during drag */}
      {isDragging && weeksDelta !== 0 && (
          <div
              className="fixed bottom-4 right-4 bg-white shadow-lg rounded-md px-4 py-2 z-50 pointer-events-none"
              style={{
                  animation: 'fadeIn 0.2s ease-out',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                  borderLeft: `4px solid ${event.color || '#4F46E5'}`
              }}
          >
              <p className="text-sm font-medium m-0">New dates: {formatDatePreview()}</p>
              <p className="text-xs text-gray-500 m-0">{weeksDelta > 0 ? `+${weeksDelta}` : weeksDelta} weeks</p>
          </div>
      )}

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


