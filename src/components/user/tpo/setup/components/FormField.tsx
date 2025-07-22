'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'

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
        <Select value={value.toString()} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger 
            className={`h-10 rounded-lg border transition-all duration-200 ${
              error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                : disabled
                ? 'bg-gray-50 border-gray-200 text-gray-500'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
            }`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-10 rounded-lg border transition-all duration-200 ${
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
              : disabled
              ? 'bg-gray-50 border-gray-200 text-gray-500'
              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
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
