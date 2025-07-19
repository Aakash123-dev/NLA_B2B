'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CheckboxListProps {
  title: string
  items: { id: string; name: string }[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  height?: string
}

export function CheckboxList({ title, items, selectedItems, onSelectionChange, height = "h-40" }: CheckboxListProps) {
  const handleToggle = (id: string) => {
    const newSelection = selectedItems.includes(id)
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id]
    onSelectionChange(newSelection)
  }

  return (
    <div className="space-y-3">
      {title && (
        <Label className="text-slate-700 font-medium text-sm">
          {title} ({selectedItems.length} selected)
        </Label>
      )}
      <ScrollArea className={`${height} rounded-lg border border-slate-200 bg-white p-3`}>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-50 transition-colors duration-150">
              <Checkbox 
                id={`${title.toLowerCase().replace(/\s+/g, '-')}-${item.id}`} 
                checked={selectedItems.includes(item.id)} 
                onCheckedChange={() => handleToggle(item.id)}
                className="border-slate-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label 
                htmlFor={`${title.toLowerCase().replace(/\s+/g, '-')}-${item.id}`} 
                className="text-sm text-slate-700 cursor-pointer flex-1 font-normal"
              >
                {item.name}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
      {selectedItems.length === 0 && (
        <p className="text-xs text-slate-500 mt-2">No items selected</p>
      )}
    </div>
  )
}
