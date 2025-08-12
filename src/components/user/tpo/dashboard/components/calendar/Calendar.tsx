'use client'

import React, { useEffect, useState } from 'react'
import { startOfYear } from 'date-fns'
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import EventRow from './EventRow'
import WeekHeader from './WeekHeader'
import { message, Spin } from 'antd'
import { format } from 'date-fns'
import { getYearCalendarData } from '@/utils/dateUtils'
import { useEvents } from '@/hooks/useEvents'

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
  onEditEvent: (event: Event) => void
  onCopyEvent: (event: Event) => void
  onDeleteEventWrapper: (eventId: string) => Promise<void>
  onEventUpdate: (updatedEvent: Event) => void
  onDragEnd: (event: Event, weeksDelta: number) => Promise<void>
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
  onDeleteEventWrapper,
  onEventUpdate,
  onDragEnd
}) => {
  const [currentYear, setCurrentYear] = useState<number>(Number(tpoData.year))
  const { events, refreshEvents } = useEvents()
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)
  const weeks = getYearCalendarData(currentYear)

  useEffect(() => {
    setCurrentYear(Number(tpoData.year))
    refreshEvents(tpoData.id)
  }, [tpoData])

  useEffect(() => {
    if (fetchImportedEvents) {
      refreshEvents(tpoData.id)
    }
  }, [fetchImportedEvents])

  const handlePrevYear = () => {
    const eventTPO = availableYears.find((year: any) => Number(year.year) === Number(currentYear) - 1)
    if (eventTPO) {
      setCurrentYear(Number(eventTPO.year))
      refreshEvents(eventTPO.id)
    }
  }

  const handleNextYear = () => {
    const eventTPO = availableYears.find((year: any) => Number(year.year) === Number(currentYear) + 1)
    if (eventTPO) {
      setCurrentYear(Number(eventTPO.year))
      refreshEvents(eventTPO.id)
    }
  }

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
                <button onClick={handlePrevYear} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={handleNextYear} className="p-2 hover:bg-gray-100 rounded-full">
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
                      onAddEvent={(date: Date, p: unknown) => onAddEvent(date, p as any)}
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
    </div>
  )
}

export default Calendar


