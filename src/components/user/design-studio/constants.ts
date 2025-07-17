'use client'

import { 
  DollarSign, TrendingUp, CalendarDays, Lightbulb, 
  Sparkles, PieChart, Filter 
} from 'lucide-react'
import { Tool } from './types'

export const NODE_WIDTH = 192 // w-48
export const NODE_HEIGHT = 72 // h-[72px]

export const staticTools: { [key: string]: Tool[] } = {
  'MODELING TOOLS': [
    { name: 'Pricing Model', description: 'Configure pricing strategies and models', type: 'pricing', icon: DollarSign },
    { name: 'Forecasting', description: 'Predictive analytics and forecasting', type: 'forecasting', icon: TrendingUp },
  ],
  'VISUALIZATION TOOLS': [
    { name: 'Insights Template', description: 'Pre-built insight visualization templates', type: 'insights', icon: Lightbulb },
    { name: 'Pie Chart', description: 'Create pie chart visualizations', type: 'pie-chart', icon: PieChart },
  ],
  'PLANNING TOOLS': [
    { name: 'Trade Calendar', description: 'Schedule and track trading activities', type: 'calendar', icon: CalendarDays },
    { name: 'Trade Plan Optimization', description: 'AI-powered trade plan optimization', type: 'trade-plan-optimization', icon: Sparkles },
  ],
  'PROCESSING TOOLS': [
    { name: 'Data Filter', description: 'Filter and transform data streams', type: 'data-filter', icon: Filter },
  ],
}
