import { ConfigFormData } from './types'
import { databases, retailers, brands, products, availableColumns } from './constants'

export const getSelectedNames = (ids: string[], source: { id: string; name: string }[]) => {
  const names = ids.map(id => source.find(s => s.id === id)?.name).filter(Boolean)
  if (names.length === 0) return 'None Selected'
  if (names.length > 2) return `${names.slice(0, 2).join(', ')} & ${names.length - 2} more`
  return names.join(', ')
}

export const getAllSelectedNames = (ids: string[], source: { id: string; name: string }[]) => {
  return ids.map(id => source.find(s => s.id === id)?.name).filter(Boolean).join(', ') || 'None'
}

export const validateStepData = (step: number, formData: ConfigFormData): boolean => {
  switch (step) {
    case 1:
      return formData.selectedDatabase !== '' &&
             formData.selectedRetailers.length > 0 &&
             formData.selectedBrands.length > 0 &&
             formData.selectedProducts.length > 0
    case 2:
      return formData.selectedColumns.length > 0
    default:
      return true
  }
}

export const getDisplayValue = (value: string | number, suffix = '') => {
  return value ? `${value}${suffix}` : 'Not set'
}

export const formatCurrency = (value: string) => {
  return value ? `$${Number(value).toLocaleString()}` : 'Not set'
}
