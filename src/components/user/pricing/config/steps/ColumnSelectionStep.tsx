'use client'

import React, { useState, useMemo } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Columns, Search, CheckSquare, Square, Database } from 'lucide-react'
import { ConfigStepProps } from '../types'
import { availableColumns } from '../constants'

export function ColumnSelectionStep({ formData, onFormDataChange }: ConfigStepProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter columns based on search query
  const filteredColumns = useMemo(() => {
    if (!searchQuery) return availableColumns
    return availableColumns.filter(column => 
      column.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleColumnSelectionChange = (selectedColumns: string[]) => {
    onFormDataChange({ selectedColumns })
  }

  const handleSelectAll = () => {
    if (formData.selectedColumns.length === filteredColumns.length) {
      // If all filtered columns are selected, deselect them
      const remainingSelected = formData.selectedColumns.filter(id => 
        !filteredColumns.some(col => col.id === id)
      )
      handleColumnSelectionChange(remainingSelected)
    } else {
      // Select all filtered columns
      const allFilteredIds = filteredColumns.map(col => col.id)
      const newSelected = [...new Set([...formData.selectedColumns, ...allFilteredIds])]
      handleColumnSelectionChange(newSelected)
    }
  }

  const handleToggleColumn = (columnId: string) => {
    const newSelection = formData.selectedColumns.includes(columnId)
      ? formData.selectedColumns.filter(id => id !== columnId)
      : [...formData.selectedColumns, columnId]
    handleColumnSelectionChange(newSelection)
  }

  const isAllFilteredSelected = filteredColumns.length > 0 && 
    filteredColumns.every(col => formData.selectedColumns.includes(col.id))

  return (
    <div className="h-full max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-50 rounded-xl shadow-sm">
            <Database className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Data Columns Selection</h2>
            <p className="text-slate-600">Choose the data columns to include in your pricing model analysis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-8 space-y-6">
          {/* Data Columns Card */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Columns className="w-5 h-5 text-indigo-600" />
                </div>
                Available Data Columns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search and Select All Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search columns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-slate-300 hover:border-slate-400 focus:border-purple-500 transition-colors h-11"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSelectAll}
                  className="h-11 px-6 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  {isAllFilteredSelected ? (
                    <>
                      <CheckSquare className="w-4 h-4" />
                      Deselect All
                    </>
                  ) : (
                    <>
                      <Square className="w-4 h-4" />
                      Select All
                    </>
                  )}
                </Button>
              </div>

              {/* Column Selection List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-medium text-slate-700">
                    Data Columns {searchQuery && `(${filteredColumns.length} found)`}
                  </Label>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                    {formData.selectedColumns.length} selected
                  </Badge>
                </div>

                <ScrollArea className="h-96 rounded-lg border border-slate-200 bg-white p-4">
                  <div className="space-y-2">
                    {filteredColumns.length > 0 ? (
                      filteredColumns.map(column => (
                        <div key={column.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <Checkbox 
                            id={`column-${column.id}`} 
                            checked={formData.selectedColumns.includes(column.id)} 
                            onCheckedChange={() => handleToggleColumn(column.id)}
                            className="border-slate-300 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                          />
                          <Label 
                            htmlFor={`column-${column.id}`} 
                            className="text-sm text-slate-700 cursor-pointer flex-1 font-medium"
                          >
                            {column.name}
                          </Label>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Database className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm">No columns found matching "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Panel */}
        <div className="col-span-4">
          <div className="sticky top-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">Selection Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Total Columns:</span>
                    <span className="font-semibold text-slate-800">{availableColumns.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Selected:</span>
                    <span className="font-semibold text-indigo-600">{formData.selectedColumns.length}</span>
                  </div>
                  {searchQuery && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Filtered:</span>
                      <span className="font-semibold text-slate-800">{filteredColumns.length}</span>
                    </div>
                  )}
                </div>

                {formData.selectedColumns.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <Label className="text-sm font-medium text-slate-700">Selected Columns:</Label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {formData.selectedColumns.map(columnId => {
                        const column = availableColumns.find(col => col.id === columnId)
                        return (
                          <div key={columnId} className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                            <span className="text-xs font-medium text-indigo-700">{column?.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleColumn(columnId)}
                              className="h-6 w-6 p-0 hover:bg-indigo-100"
                            >
                              ×
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {formData.selectedColumns.length === 0 && (
                  <div className="text-center py-6 text-slate-500">
                    <Columns className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">No columns selected</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
