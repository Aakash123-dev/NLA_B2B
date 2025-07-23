'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MultiSelectFieldProps { 
  label: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder: string
  required?: boolean
  disabled?: boolean
  error?: string
  options: { value: string; label: string }[]
  maxSelectedDisplay?: number
}

export function MultiSelectField({ 
  label, 
  values, 
  onChange, 
  placeholder, 
  required = false, 
  disabled = false, 
  error,
  options,
  maxSelectedDisplay = 2
}: MultiSelectFieldProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSelect = (selectedValue: string) => {
    if (values.includes(selectedValue)) {
      onChange(values.filter(value => value !== selectedValue))
    } else {
      onChange([...values, selectedValue])
    }
  }

  const handleRemove = (valueToRemove: string) => {
    onChange(values.filter(value => value !== valueToRemove))
  }

  const clearAll = () => {
    onChange([])
  }

  const selectedOptions = options.filter(option => values.includes(option.value))
  const displayedOptions = selectedOptions.slice(0, maxSelectedDisplay)
  const remainingCount = selectedOptions.length - maxSelectedDisplay

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className="space-y-2"
    >
      <Label className="text-sm font-medium text-gray-700 flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="space-y-2">
        {/* Selected items display */}
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg border-2 border-slate-200">
            {displayedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105 transition-transform"
              >
                {option.label}
                <button
                  type="button"
                  onClick={() => handleRemove(option.value)}
                  className="ml-1 hover:bg-blue-300 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="outline" className="bg-gray-100">
                +{remainingCount} more
              </Badge>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Multi-select dropdown */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={`h-10 w-full justify-between rounded-lg border-2 transition-all duration-200 shadow-sm ${
                error 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                  : disabled
                  ? 'bg-gray-50 border-gray-200 text-gray-500'
                  : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20 hover:border-slate-400'
              }`}
            >
              <span className={cn(
                "truncate text-left",
                selectedOptions.length === 0 && "text-muted-foreground"
              )}>
                {selectedOptions.length > 0 
                  ? `${selectedOptions.length} selected` 
                  : placeholder
                }
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[300px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          values.includes(option.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
