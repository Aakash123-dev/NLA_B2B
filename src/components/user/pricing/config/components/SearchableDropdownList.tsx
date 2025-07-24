'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Search, ChevronDown, X, Plus } from 'lucide-react'

interface SearchableDropdownListProps {
  title: string
  items: { id: string; name: string }[]
  selectedItems: string[]
  onSelectionChange: (selectedIds: string[]) => void
  placeholder?: string
  maxHeight?: string
  maxDisplayHeight?: string
  colorScheme?: 'blue' | 'emerald' | 'purple' | 'default'
}

export const SearchableDropdownList = React.memo(function SearchableDropdownList({ 
  title, 
  items, 
  selectedItems, 
  onSelectionChange, 
  placeholder = "Search items...",
  maxHeight = "300px",
  maxDisplayHeight = "150px"
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
    const newSelection = selectedItems.includes(id)
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id]
    onSelectionChange(newSelection)
  }, [selectedItems, onSelectionChange])

  const handleRemoveSelection = useCallback((id: string) => {
    const newSelection = selectedItems.filter(item => item !== id)
    onSelectionChange(newSelection)
  }, [selectedItems, onSelectionChange])

  const selectedItemsData = items.filter(item => selectedItems.includes(item.id))

  return (
    <div className="space-y-3">
      {/* Header with Title and Count */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-slate-700">
          {title}
        </Label>
        <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
          {selectedItems.length} selected
        </Badge>
      </div>

      {/* Selected Items Display */}
      {selectedItems.length > 0 && (
        <div className="border border-slate-200 rounded-lg bg-slate-50/50 overflow-hidden">
          <div className="px-3 py-2 bg-slate-100/70 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {selectedItems.length} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectionChange([])}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 h-5"
              >
                Clear all
              </Button>
            </div>
          </div>
          <ScrollArea style={{ maxHeight: maxDisplayHeight }} className="px-3 py-2">
            <div className="flex flex-wrap gap-1.5">
              {selectedItemsData.map(item => (
                <Badge 
                  key={item.id} 
                  variant="secondary"
                  className="bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm pr-1 pl-2 py-1 text-xs font-medium max-w-[200px]"
                  title={item.name}
                >
                  <span className="truncate">{item.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSelection(item.id)}
                    className="ml-1 h-3 w-3 p-0 hover:bg-red-100 rounded-full flex-shrink-0"
                  >
                    <X className="w-2.5 h-2.5 text-red-500" />
                  </Button>
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Dropdown Selector */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-between h-11 bg-white border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:border-blue-500 transition-all duration-200 shadow-sm ${
              selectedItems.length > 0 
                ? 'border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-500' 
                : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600 text-sm font-medium truncate">
                {selectedItems.length > 0 
                  ? selectedItems.length > 5 
                    ? `${selectedItems.length} ${title.toLowerCase()} selected`
                    : `Add more ${title.toLowerCase()}`
                  : `Select ${title.toLowerCase()}`
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              {selectedItems.length > 0 && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5">
                  {selectedItems.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[var(--radix-dropdown-menu-trigger-width)] p-0 bg-white border border-slate-200 shadow-lg rounded-lg"
          align="start"
          sideOffset={4}
        >
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              {/* Search Header */}
              <div className="p-3 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 text-sm rounded-md"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 text-xs text-slate-500">
                    {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="p-2">
                <ScrollArea style={{ maxHeight }} className="pr-2">
                  <div className="space-y-1">
                    {filteredItems.length > 0 ? (
                      filteredItems.map(item => {
                        const isSelected = selectedItems.includes(item.id)
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center space-x-3 p-2.5 rounded-md hover:bg-slate-50 transition-colors duration-200 cursor-pointer ${
                              isSelected ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'
                            }`}
                            onClick={() => handleToggle(item.id)}
                          >
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleToggle(item.id)}
                              className="border-slate-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded"
                            />
                            <Label className={`text-sm cursor-pointer flex-1 font-normal ${
                              isSelected ? 'text-blue-800 font-medium' : 'text-slate-700'
                            }`}>
                              {item.name}
                            </Label>
                            {isSelected && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        <div className="text-sm">No items found</div>
                        {searchQuery && (
                          <div className="text-xs text-slate-400 mt-1">
                            Try a different search term
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center p-3 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    {selectedItems.length} of {items.length} selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectionChange([])}
                    className="text-xs text-slate-600 hover:text-red-600 hover:bg-red-50 px-2 py-1 h-6"
                    disabled={selectedItems.length === 0}
                  >
                    Clear all
                  </Button>
                  {filteredItems.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const allIds = filteredItems.map(item => item.id)
                        const newSelection = [...new Set([...selectedItems, ...allIds])]
                        onSelectionChange(newSelection)
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 h-6"
                    >
                      Select all
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 h-6 rounded-md"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
})
