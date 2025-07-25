'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Check, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FormFieldProps { 
  label: string
  value: string | number
  onChange: (value: string) => void
  placeholder: string
  required?: boolean
  disabled?: boolean
  type?: string
  error?: string
  options?: { value: string | number; label: string }[]
}

export function FormField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  disabled = false, 
  type = "text",
  error,
  options = undefined
}: FormFieldProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  // Filter options based on search
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  ) || []

  // Find selected option for display
  const selectedOption = options?.find((option) => option.value.toString() === value.toString())

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className="space-y-2"
    >
      <Label className="text-sm font-medium text-gray-700 flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {options ? (
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
                !selectedOption && "text-muted-foreground"
              )}>
                {selectedOption ? selectedOption.label : placeholder}
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
                      onSelect={() => {
                        onChange(option.value.toString())
                        setOpen(false)
                        setSearchValue("")
                      }}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.toString() === option.value.toString() ? "opacity-100" : "opacity-0"
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
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-10 rounded-lg border-2 transition-all duration-200 shadow-sm ${
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
              : disabled
              ? 'bg-gray-50 border-gray-200 text-gray-500'
              : 'border-slate-300 focus:border-slate-500 focus:ring-slate-500/20 hover:border-slate-400'
          }`}
        />
      )}
      
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
