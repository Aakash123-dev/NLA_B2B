'use client'

import React from 'react'
import { format } from 'date-fns'

interface WeekHeaderProps {
  weeks: { weekNumber: number; startDate: Date }[]
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ weeks }) => {
  return (
    <thead>
      <tr>
        <th className="sticky left-0 z-10 bg-gray-50 border-b border-r border-gray-200 p-2 text-left min-w-[120px] max-w-[120px] font-semibold text-gray-700">
          Product
        </th>
        {weeks.map((week) => (
          <th
            key={`week-${week.weekNumber}-${format(week.startDate, 'yyyy-MM-dd')}`}
            className="border-b border-r border-gray-200 p-2 text-xs font-medium text-gray-600 whitespace-nowrap"
            title={`Week ${week.weekNumber} (${format(week.startDate, 'MMM d')})`}
          >
            W{week.weekNumber}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default WeekHeader


