'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Search, ChevronDown, Check } from 'lucide-react'

interface SearchableSelectProps {
  title: string
  items: { id: string; name: string }[]
  selectedItem: string
  onSelectionChange: (selectedId: string) => void
  placeholder?: string
  maxHeight?: string
}

export const SearchableSelect = React.memo(function SearchableSelect({ 
  title, 
  items, 
  selectedItem, 
  onSelectionChange, 
  placeholder = "Search items...",
  maxHeight = "300px"
}: SearchableSelectProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [items, searchQuery])

  const handleSelect = useCallback((id: string) => {
    onSelectionChange(id)
    setIsOpen(false)
  }, [onSelectionChange])

  const selectedItemData = items.find(item => item.id === selectedItem)

  return (
    <div className="space-y-2">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-slate-700">
          {title}
        </Label>
        {selectedItem && (
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
            Selected
          </Badge>
        )}
      </div>

      {/* Dropdown Selector */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-11 bg-white border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:border-blue-500 transition-all duration-200 shadow-sm"
          >
            <span className="text-slate-600 text-sm font-medium truncate">
              {selectedItemData ? selectedItemData.name : `Select ${title.toLowerCase()}...`}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
                        const isSelected = selectedItem === item.id
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center space-x-3 p-2.5 rounded-md hover:bg-slate-50 transition-colors duration-200 cursor-pointer ${
                              isSelected ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'
                            }`}
                            onClick={() => handleSelect(item.id)}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                            }`}>
                              {isSelected && (
                                <Check className="w-2.5 h-2.5 text-white" />
                              )}
                            </div>
                            <Label className={`text-sm cursor-pointer flex-1 font-normal ${
                              isSelected ? 'text-blue-800 font-medium' : 'text-slate-700'
                            }`}>
                              {item.name}
                            </Label>
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
                    {selectedItem ? '1 selected' : 'None selected'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedItem && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectionChange('')}
                      className="text-xs text-slate-600 hover:text-red-600 hover:bg-red-50 px-2 py-1 h-6"
                    >
                      Clear
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
