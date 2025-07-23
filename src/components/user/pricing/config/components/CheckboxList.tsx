'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Search, CheckSquare, Square } from 'lucide-react'

interface CheckboxListProps {
  title: string
  items: { id: string; name: string }[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  height?: string
  searchable?: boolean
  showSelectAll?: boolean
}

export function CheckboxList({ 
  title, 
  items, 
  selectedItems, 
  onSelectionChange, 
  height = "h-40",
  searchable = false,
  showSelectAll = false 
}: CheckboxListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleToggle = (id: string) => {
    const newSelection = selectedItems.includes(id)
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id]
    onSelectionChange(newSelection)
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(filteredItems.map(item => item.id))
    }
  }

  const filteredItems = searchable 
    ? items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items

  const isAllSelected = filteredItems.length > 0 && 
    filteredItems.every(item => selectedItems.includes(item.id))

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <Label className="text-slate-800 font-semibold text-base">
            {title}
          </Label>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
            {selectedItems.length} selected
          </Badge>
        </div>
      )}

      {/* Search and Select All Controls */}
      {(searchable || showSelectAll) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-300 hover:border-slate-400 focus:border-indigo-500 transition-colors h-10"
              />
            </div>
          )}
          {showSelectAll && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSelectAll}
              className="h-10 px-4 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              {isAllSelected ? (
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
          )}
        </div>
      )}

      {/* Items List */}
      <ScrollArea className={`${height} rounded-lg border border-slate-200 bg-white p-3 shadow-sm`}>
        <div className="space-y-2">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200">
                <Checkbox 
                  id={`${title.toLowerCase().replace(/\s+/g, '-')}-${item.id}`} 
                  checked={selectedItems.includes(item.id)} 
                  onCheckedChange={() => handleToggle(item.id)}
                  className="border-slate-300 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 shadow-sm"
                />
                <Label 
                  htmlFor={`${title.toLowerCase().replace(/\s+/g, '-')}-${item.id}`} 
                  className="text-sm text-slate-700 cursor-pointer flex-1 font-medium"
                >
                  {item.name}
                </Label>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm">
                {searchable && searchQuery ? `No items found matching "${searchQuery}"` : 'No items available'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {selectedItems.length === 0 && (
        <p className="text-xs text-slate-500 mt-2 text-center py-2">No items selected</p>
      )}
    </div>
  )
}
