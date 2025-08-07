import { TradePlanFormData } from '../types'

export const formatCurrency = (value: string | number): string => {
  if (value === 0) return '$0'
  if (!value) return 'Not set'
  const numValue = typeof value === 'string' ? Number(value) : value
  if (isNaN(numValue)) return 'Invalid'
  return `$${numValue.toLocaleString()}`
}

export const formatNumber = (value: string | number): string => {
  if (value === 0) return '0'
  if (!value) return '0'
  const numValue = typeof value === 'string' ? Number(value) : value
  if (isNaN(numValue)) return '0'
  return numValue.toLocaleString()
}

export const formatPercentage = (value: string | number): string => {
  if (value === 0) return '0.0%'
  if (!value) return '0.0%'
  const numValue = typeof value === 'string' ? Number(value) : value
  if (isNaN(numValue)) return '0.0%'
  return `${numValue.toFixed(1)}%`
}

export const validateTradePlanForm = (formData: TradePlanFormData): { [key: string]: string } => {
  const newErrors: { [key: string]: string } = {}
  
  if (!formData.trade_plan_name.trim()) {
    newErrors.trade_plan_name = "Trade plan name is required"
  }
  
  if (!formData.selectedDatabase) {
    newErrors.selectedDatabase = "Database selection is required"
  }
  
  if (formData.selectedRetailers.length === 0) {
    newErrors.selectedRetailers = "At least one retailer must be selected"
  }
  
  if (formData.selectedBrands.length === 0) {
    newErrors.selectedBrands = "At least one brand must be selected"
  }
  
  if (!formData.year) {
    newErrors.year = "Year is required"
  }
  
  return newErrors
}

export const createPageUrl = (page: string): string => {
  // This utility function creates URLs for navigation
  // Adjust the base path according to your routing structure
  const routes: { [key: string]: string } = {
    // 'Welcome': '/user/tpo',
    'Setup': '/user/tpo/setup',
    'Dashboard': '/user/tpo/dashboard',
    'PromotionReport': '/user/tpo/reports'
  }
  
  return routes[page] || '/user/tpo'
}

export const generateMockTradePlan = (formData: TradePlanFormData) => {
  return {
    id: `tpo_${Date.now()}`,
    trade_plan_name: formData.trade_plan_name,
    project: formData.project,
    model: formData.model,
    retailer: formData.selectedRetailers.join(', '),
    brand: formData.selectedBrands.join(', '),
    products: formData.selectedProducts,
    year: formData.year,
    total_volume: formData.targetVolume ? parseInt(formData.targetVolume) : 61894,
    total_revenue: formData.targetRevenue ? parseInt(formData.targetRevenue) : 951262,
    total_contribution: 427229,
    total_spend: formData.targetSpend ? parseInt(formData.targetSpend) : 161564,
    incremental_volume: 24415,
    incremental_revenue: 41152,
    plan_roi: 90.3,
    budget_remaining: 49240,
    target_volume: formData.targetVolume ? parseInt(formData.targetVolume) : 65000,
    target_spend: formData.targetSpend ? parseInt(formData.targetSpend) : 170000,
    target_revenue: formData.targetRevenue ? parseInt(formData.targetRevenue) : 1000000,
    created_date: new Date().toISOString()
  }
}

export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const generateCSVTemplate = (type: 'basic' | 'advanced', retailer?: string) => {
  if (type === 'basic') {
    return "Title,Description,Start Date,End Date,Status,PPG Name\n"
  } else {
    return `Title,Description,Start Date,End Date,Status,PPG Name,Products,Channels,Plan Value,Actual Value
Summer Sale,Summer promotional event,2025-06-01,2025-06-30,planned,Summer PPG,"APPLEGATE NATURALS Organic Turkey Slices",In-Store Display,5000.00,0.00
Back to School,Back to school promotion,2025-08-15,2025-09-15,draft,BTS PPG,"APPLEGATE NATURALS Organic Ham",Digital Advertising,3000.00,0.00`
  }
}
