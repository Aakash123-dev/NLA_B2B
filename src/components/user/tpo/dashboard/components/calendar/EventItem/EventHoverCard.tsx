import React from 'react'

import { format } from 'date-fns'
import { Calendar, DollarSign, BarChart2, Tag } from 'lucide-react'
import { Event } from '@/types/event'
import { toJsDate } from '@/utils/dateUtils'

interface EventHoverCardProps {
    event: Event
}

export const EventHoverCard: React.FC<EventHoverCardProps> = ({ event }) => {
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

    return (
        <div className="absolute -left-64 top-1/2 -translate-y-1/2 hidden group-hover:block bg-white border border-gray-200 p-3 rounded-lg shadow-lg w-full max-w-full min-w-64 mb-2 z-[999]">
            <h4 className="mb-2 text-[18px] font-medium text-gray-800">{event.title}</h4>

            <div className="space-y-2 text-sm">
                <div className='flex flex-col gap-2'>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className='text-[#009bcc]' />
                        <span>
                            {format(toJsDate(event.start_date) ?? new Date(), 'MMM d, yyyy')} - {format(toJsDate(event.end_date) ?? new Date(), 'MMM d, yyyy')}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Tag size={16} className='text-[#009bcc]' />
                        <span>Status: <span className="capitalize">{event.status}</span></span>
                    </div>
                </div>

               
            </div>
        </div>
    )
}