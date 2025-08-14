'use client'

import React, { useEffect, useState } from 'react'
import { startOfYear } from 'date-fns'
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import EventRow from './EventRow'
import WeekHeader from './WeekHeader'
import { Spin } from 'antd'
import { format } from 'date-fns'
import { getYearCalendarData } from '@/utils/dateUtils'
import { useEvents } from '@/hooks/useEvents'
import CopyEventModal from './CopyEventModal'
import { Event as TpoEvent } from '@/types/event'

interface CalendarProps {
  tpoData: any
  productData: Array<any>
  fetchImportedEvents: boolean
  setFetchImportedEvents: (fetchImportedEvents: boolean) => void
  targetValues: { volume: number; spend: number; revenue: number }
  isLoading: boolean
  isCreateEventModalOpen: boolean
  setIsCreateEventModalOpen: (isCreateEventModalOpen: boolean) => void
  products: string[]
  getProductsForBrand: (retailerId: string, brandId: string) => string[]
  availableYears: any[]
  onAddEvent: (date: Date, product?: any) => void
  onEditEvent: (event: TpoEvent) => void
  onCopyEvent: (event: TpoEvent) => void
  onCopyEvents: (events: any[]) => Promise<void>
  onDeleteEventWrapper: (eventId: string) => Promise<void>
  onEventUpdate: (updatedEvent: TpoEvent) => void
  onDragEnd: (event: TpoEvent, weeksDelta: number) => Promise<void>
  handlePrevYear: () => void
  handleNextYear: () => void
  currentYear: number
  setCurrentYear: (y: number) => void
  events?: any[]
  refreshEvents?: (eventTpoId?: string | null) => Promise<void>
}

const Calendar: React.FC<CalendarProps> = ({
  tpoData,
  productData,
  fetchImportedEvents,
  setFetchImportedEvents,
  targetValues,
  isLoading,
  isCreateEventModalOpen,
  setIsCreateEventModalOpen,
  products,
  getProductsForBrand,
  availableYears,
  onAddEvent,
  onEditEvent,
  onCopyEvent,
  onCopyEvents,
  onDeleteEventWrapper,
  onEventUpdate,
  onDragEnd,
  handlePrevYear,
  handleNextYear,
  currentYear,
  setCurrentYear,
  events: externalEvents,
  refreshEvents: externalRefreshEvents

}) => {
  const { events: hookEvents, refreshEvents: hookRefreshEvents } = useEvents()
  const events = externalEvents ?? hookEvents
  const refreshEvents = externalRefreshEvents ?? hookRefreshEvents
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)
  const weeks = getYearCalendarData(currentYear)

  useEffect(() => {
    setCurrentYear(Number(tpoData.year))
    refreshEvents(tpoData.id)
  }, [tpoData])

  useEffect(() => {
    if (!tpoData?.id) return
    // Always refetch when the toggle changes so CRUD operations reflect immediately
    refreshEvents(tpoData.id)
  }, [fetchImportedEvents, tpoData?.id])


  return (
    <div className='flex-1 flex flex-col'>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin />
        </div>
      ) : (
        <div className="bg-white rounded-lg w-full shadow-md flex flex-col h-full flex-1">
          <div className="bg-white rounded-lg shadow-lg w-full flex-1 flex flex-col">
            <div className="flex items-center justify-between px-4 py-1 border-b">
              <h2 className="text-xl font-semibold">{currentYear}</h2>
              <div className="flex gap-2">
                                <button
                                    onClick={() => setIsCopyModalOpen(true)}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                    title="Copy events from another year"
                                >
                                    <Copy size={20} />
                                </button>
                                <button
                                    onClick={handlePrevYear}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={handleNextYear}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
            </div>

            <div className="flex-1 overflow-auto flex flex-col">
              <table className="w-full border-collapse tpo-calendar flex-1">
                <WeekHeader weeks={weeks} />
                <tbody>
                  {productData && productData.length > 0 && productData.map((product: any) => (
                    <EventRow
                      key={product.id}
                      tpoData={tpoData}
                      productName={product.name}
                      product={product}
                      weeks={weeks}
                      events={events.filter((event: any) => event.planned.some((p: any) => p.productName === product.name))}
                      onAddEvent={onAddEvent}
                      onEditEvent={onEditEvent}
                      onCopyEvent={onCopyEvent}
                      onDeleteEvent={onDeleteEventWrapper}
                      onDragEnd={onDragEnd}
                      yearStart={startOfYear(new Date(currentYear, 0, 1))}
                      currentYear={currentYear}
                      onEventUpdate={onEventUpdate}
                    />
                  ))}

                  {(!productData || productData.length === 0) && (
                    <tr>
                      <td colSpan={weeks.length + 1} className="text-center py-4">No products selected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Copy modal should not be inside table markup */}
      <CopyEventModal
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        availableYears={availableYears}
        currentYear={currentYear}
        onCopyEvents={onCopyEvents as any}
        tpoData={tpoData}
      />
    </div>
  )
}

export default Calendar


