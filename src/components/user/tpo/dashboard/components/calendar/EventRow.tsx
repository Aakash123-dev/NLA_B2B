'use client'

import React, { CSSProperties } from 'react'
// Local loosened event/product types to avoid missing imports
type Product = any
import { addDays, differenceInCalendarDays, format, isAfter, isBefore } from 'date-fns'
import EventItem from './EventItem/EventItem'
import { message, Tooltip } from 'antd'
import { toJsDate } from '@/utils/dateUtils'
import { Event } from '@/types/event'

interface EventRowProps {
  productName: string
  product: Product
  tpoData: any
  weeks: { weekNumber: number; startDate: Date }[]
  events: Event[]
  onAddEvent: (date: Date, product: Product) => void
  onEditEvent: (event: Event) => void
  onCopyEvent: (event: Event) => void
  onDeleteEvent: (id: string) => void
  onDragEnd: (event: Event, weeksDelta: number) => void
  yearStart: Date
  currentYear: number
  onEventUpdate: (updatedEvent: Event) => void
}

const EventRow: React.FC<EventRowProps> = ({
  productName,
  product,
  tpoData,
  weeks,
  events,
  onAddEvent,
  onEditEvent,
  onCopyEvent,
  onDeleteEvent,
  onDragEnd,
  yearStart,
  currentYear,
  onEventUpdate
}) => {
  const handleCellDoubleClick = (date: Date) => {
    const dateYear = date.getFullYear()
    const tpoYear = Number(tpoData.year)
    if (dateYear === tpoYear) {
      onAddEvent(date, product)
    } else {
      message.error('Date is not in the current year')
    }
  }

  const calculateEventPosition = (event: Event, rowIndex: number = 0): CSSProperties => {
    const startDate = toJsDate(event.start_date);
    const endDate = toJsDate(event.end_date);

    if (!startDate || !endDate) {
        return {
            left: '0%',
            width: '0%',
            display: 'none'
        };
    }

    // Ensure dates are in the current year's range for better positioning
    const currentYearStart = new Date(yearStart);
    const currentYearEnd = new Date(yearStart);
    currentYearEnd.setFullYear(currentYearStart.getFullYear() + 1);
    currentYearEnd.setDate(currentYearEnd.getDate() - 1); // Last day of the year


    // Get the first and last week in our calendar
    const firstWeekStart = weeks[0].startDate;
    const lastWeekStart = weeks[weeks.length - 1].startDate;
    const lastWeekEnd = addDays(lastWeekStart, 6);

    // Calculate the total number of days in our calendar
    const totalDays = differenceInCalendarDays(lastWeekEnd, firstWeekStart) + 1;

    // Calculate days from the first day of the calendar to the start and end dates
    const daysFromStart = Math.max(0, differenceInCalendarDays(startDate, firstWeekStart));
    const daysToEnd = Math.min(totalDays - 1, differenceInCalendarDays(endDate, firstWeekStart));

    // Calculate positions as percentages of the total width
    const startPosition = (daysFromStart / totalDays) * 100;
    const endPosition = (daysToEnd / totalDays) * 100;

    // Calculate the width based on the difference between start and end positions
    // Add 1 day to include the end date itself (e.g., Mar 4 to Mar 4 should have 1 day width)
    const width = endPosition - startPosition + (100 / totalDays);

    // Ensure minimum width for visibility (at least 1 day)
    const minWidth = 100 / totalDays;
    const finalWidth = Math.max(width, minWidth);

    // Vertical stacking for overlapping events
    const eventHeight = 28; // Height of each event in pixels
    const topOffset = rowIndex * (eventHeight + 10); // Add some spacing between rows

    return {
        left: `${startPosition}%`,
        width: `${finalWidth}%`,
        top: `${topOffset}px`,
        transition: 'left 0.3s ease, width 0.3s ease',
        position: 'absolute' as 'absolute',
        height: '24px', // Fixed height for events
    }
}

  const isEventVisible = (event: Event) => {
    const yearEnd = new Date(yearStart)
    yearEnd.setFullYear(yearEnd.getFullYear() + 1)
    yearEnd.setDate(yearEnd.getDate() - 1)

    const startDate = toJsDate(event.start_date)
    const endDate = toJsDate(event.end_date)

    return endDate && startDate && !isBefore(endDate, yearStart) && !isAfter(startDate, yearEnd)
  }

  const assignRowIndices = (events: Event[]): Map<string, number> => {
    const visibleEvents = events.filter(isEventVisible)
    const rowIndices = new Map<string, number>()
    if (visibleEvents.length === 0) return rowIndices

    const sortedEvents = [...visibleEvents].sort((a, b) => {
      const aStart = toJsDate(a.start_date) || new Date()
      const bStart = toJsDate(b.start_date) || new Date()
      return aStart.getTime() - bStart.getTime()
    })

    const rows: Date[] = []
    for (const event of sortedEvents) {
      const startDate = toJsDate(event.start_date)
      const endDate = toJsDate(event.end_date)
      if (!startDate || !endDate) continue

      let rowIndex = 0
      while (rowIndex < rows.length) {
        if (isBefore(rows[rowIndex], startDate)) break
        rowIndex++
      }

      rowIndices.set(event.id, rowIndex)
      if (rowIndex === rows.length) rows.push(endDate)
      else rows[rowIndex] = endDate
    }

    return rowIndices
  }

  const rowIndices = assignRowIndices(events)
  const maxRowIndex = Math.max(0, ...Array.from(rowIndices.values()))
  const rowHeight = (maxRowIndex + 1) * 38

  const handleEventUpdate = (updatedEvent: Event) => {
    onEventUpdate(updatedEvent)
  }

  return (
    <tr className="relative">
        <td className="product-title border-b border-r border-gray-200 p-2 font-medium bg-gray-50 left-0 z-10 min-w-[120px] max-w-[120px]">
            <Tooltip placement="topLeft" title={productName}>
                <span>{productName}</span>
            </Tooltip>
        </td>
        {weeks.map((week) => (
            <td
                key={`cell-${product?.id}-${format(week.startDate, 'yyyy-MM-dd')}`}
                className="border-b border-r border-gray-200 p-1 relative"
                style={{ height: `${Math.max(52, rowHeight)}px` }}
                onDoubleClick={() => handleCellDoubleClick(week.startDate)}
            />
        ))}
        <td className="absolute inset-y-0 left-0 right-0 pointer-events-none">
            <div className="relative h-full ml-[120px]">
                {events.filter(isEventVisible).map((event) => {
                    const rowIndex = rowIndices.get(event.id) || 0;
                    const style = calculateEventPosition(event, rowIndex);
                    return (
                        <div
                            key={`event-${event.id}-${product?.id}`}
                            className="absolute"
                            style={style}
                            title={`${event.title}: ${format(toJsDate(event.start_date) || new Date(), 'MMM d, yyyy')} - ${format(toJsDate(event.end_date) || new Date(), 'MMM d, yyyy')}`}
                        >
                            <EventItem
                                event={event}
                                tpoData={tpoData}
                                onEdit={() => onEditEvent(event)}
                                onCopy={() => onCopyEvent(event)}
                                onDragEnd={onDragEnd}
                                onDelete={() => onDeleteEvent(event.id)}
                                currentYear={currentYear}
                                onEventUpdate={handleEventUpdate}
                            />
                        </div>
                    )
                })}
            </div>
        </td>
    </tr>
)
}

export default EventRow


