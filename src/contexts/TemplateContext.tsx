'use client'

import React, { createContext, useContext, useState } from 'react'

export interface Template {
  id: string
  name: string
  description: string
  category: string
  config?: any
}

interface TemplateContextType {
  templates: Template[]
  addTemplate: (template: Template) => void
  updateTemplate: (id: string, template: Partial<Template>) => void
  deleteTemplate: (id: string) => void
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

const defaultTemplates: Template[] = [
  {
    id: 'sales-overview',
    name: 'Sales Overview',
    description: 'Comprehensive sales dashboard with key metrics',
    category: 'Sales',
  },
  {
    id: 'pricing-analysis',
    name: 'Pricing Analysis',
    description: 'Price optimization and competitor analysis',
    category: 'Pricing',
  },
  {
    id: 'market-trends',
    name: 'Market Trends',
    description: 'Market trend analysis and forecasting',
    category: 'Analytics',
  },
  {
    id: 'revenue-forecast',
    name: 'Revenue Forecast',
    description: 'Revenue prediction and planning dashboard',
    category: 'Finance',
  },
]

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates)

  const addTemplate = (template: Template) => {
    setTemplates(prev => [...prev, template])
  }

  const updateTemplate = (id: string, updates: Partial<Template>) => {
    setTemplates(prev => prev.map(template => 
      template.id === id ? { ...template, ...updates } : template
    ))
  }

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id))
  }

  return (
    <TemplateContext.Provider value={{ templates, addTemplate, updateTemplate, deleteTemplate }}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplates() {
  const context = useContext(TemplateContext)
  if (context === undefined) {
    throw new Error('useTemplates must be used within a TemplateProvider')
  }
  return context
}
