'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Columns } from 'lucide-react'
import { CheckboxList } from '../components'
import { ConfigStepProps } from '../types'
import { availableColumns } from '../constants'

export function ColumnSelectionStep({ formData, onFormDataChange }: ConfigStepProps) {
  const handleColumnSelectionChange = (selectedColumns: string[]) => {
    onFormDataChange({ selectedColumns })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Columns className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Data Columns</h3>
          <p className="text-slate-600 text-sm">Select the data columns to include in your pricing model analysis</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <CheckboxList
          title="Available Data Columns"
          items={availableColumns}
          selectedItems={formData.selectedColumns}
          onSelectionChange={handleColumnSelectionChange}
          height="h-80"
        />
        
        {formData.selectedColumns.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Selected Columns:</h4>
            <div className="flex flex-wrap gap-2">
              {formData.selectedColumns.map(columnId => {
                const column = availableColumns.find(col => col.id === columnId)
                return (
                  <span key={columnId} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {column?.name}
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
