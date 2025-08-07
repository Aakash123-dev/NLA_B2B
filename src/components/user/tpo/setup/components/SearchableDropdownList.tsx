'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

interface SearchableDropdownListProps {
  title: string
  items: { id: string; name: string }[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  placeholder?: string
  maxHeight?: string
  colorScheme?: 'blue' | 'emerald' | 'purple' | 'default'
  singleSelect?: boolean
  disabled?: boolean
}

export const SearchableDropdownList = React.memo(function SearchableDropdownList({ 
  title, 
  items, 
  selectedItems, 
  onSelectionChange, 
  placeholder = "Search items...",
  maxHeight = "300px",
  colorScheme = 'default',
  singleSelect = false,
  disabled = false
}: SearchableDropdownListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [items, searchQuery])

  const handleToggle = useCallback((id: string) => {
    if (singleSelect) {
      // For single select, replace the selection
      onSelectionChange([id])
    } else {
      // For multi select, toggle the selection
      const newSelection = selectedItems.includes(id)
        ? selectedItems.filter(item => item !== id)
        : [...selectedItems, id]
      onSelectionChange(newSelection)
    }
  }, [selectedItems, onSelectionChange, singleSelect])

  const handleRemoveSelection = useCallback((id: string) => {
    const newSelection = selectedItems.filter(item => item !== id)
    onSelectionChange(newSelection)
  }, [selectedItems, onSelectionChange])

  const handleSelectAll = useCallback(() => {
    if (singleSelect) return // Don't allow select all for single select
    
    const allFilteredIds = filteredItems.map(item => item.id)
    const allSelected = allFilteredIds.every(id => selectedItems.includes(id))
    
    if (allSelected) {
      // Deselect all filtered items
      const newSelection = selectedItems.filter(id => !allFilteredIds.includes(id))
      onSelectionChange(newSelection)
    } else {
      // Select all filtered items
      const newSelection = [...new Set([...selectedItems, ...allFilteredIds])]
      onSelectionChange(newSelection)
    }
  }, [filteredItems, selectedItems, onSelectionChange, singleSelect])

  const selectedItemsData = useMemo(() => {
    return items.filter(item => selectedItems.includes(item.id))
  }, [items, selectedItems])
  
  // Check if all filtered items are selected
  const allFilteredSelected = useMemo(() => {
    if (singleSelect) return false // Don't show select all for single select
    return filteredItems.length > 0 && 
      filteredItems.every(item => selectedItems.includes(item.id))
  }, [filteredItems, selectedItems, singleSelect])

  const getColorClasses = useMemo(() => {
    switch (colorScheme) {
      case 'blue':
        return {
          badge: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
          border: 'focus:border-blue-500'
        }
      case 'emerald':
        return {
          badge: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
          border: 'focus:border-emerald-500'
        }
      case 'purple':
        return {
          badge: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
          border: 'focus:border-purple-500'
        }
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
          border: 'focus:border-slate-500'
        }
    }
  }, [colorScheme])

  const colorClasses = getColorClasses

  // Get display text for single select
  const getDisplayText = () => {
    if (disabled) {
      return `Select ${title.toLowerCase()}...`
    }
    if (singleSelect) {
      if (selectedItems.length > 0) {
        const selectedItem = items.find(item => item.id === selectedItems[0])
        return selectedItem?.name || `Select ${title.toLowerCase()}...`
      }
      return `Select ${title.toLowerCase()}...`
    } else {
      if (selectedItems.length > 0) {
        return `${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''} selected`
      }
      return `Select ${title.toLowerCase()}...`
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-slate-700">{title}</Label>
      
      {/* Dropdown Trigger */}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full justify-between bg-white border-2 border-slate-300 hover:border-slate-400 focus:border-slate-500 transition-colors h-11 shadow-sm ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span className="text-slate-600 truncate">
            {getDisplayText()}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {/* Dropdown Content */}
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border-2 border-slate-300 rounded-lg shadow-lg">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 bg-white border-2 border-slate-300 hover:border-slate-400 ${colorClasses.border} transition-colors`}
                />
              </div>
            </div>

            {/* Select All Option - Only for multi-select */}
            {!singleSelect && filteredItems.length > 0 && (
              <div className="p-3 border-b border-slate-200 bg-slate-50/50">
                <div className="flex items-center space-x-3 p-2 hover:bg-slate-100 rounded-md cursor-pointer">
                  <Checkbox
                    checked={allFilteredSelected}
                    onCheckedChange={handleSelectAll}
                    className="w-4 h-4"
                  />
                  <span 
                    className="text-sm font-medium text-slate-700 flex-1"
                    onClick={handleSelectAll}
                  >
                    {allFilteredSelected ? 'Deselect All' : 'Select All'}
                    {searchQuery && ` (${filteredItems.length} items)`}
                  </span>
                </div>
              </div>
            )}

            {/* Items List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredItems.length > 0 ? (
                <div className="p-2 space-y-1">
                  {filteredItems.map(item => {
                    const isSelected = selectedItems.includes(item.id)
                    return (
                      <div 
                        key={item.id}
                        className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-md"
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleToggle(item.id)}
                          className="w-4 h-4"
                        />
                        <span 
                          className="text-sm text-slate-700 flex-1 cursor-pointer"
                          onClick={() => handleToggle(item.id)}
                        >
                          {item.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-slate-500 text-sm">
                  No items found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
