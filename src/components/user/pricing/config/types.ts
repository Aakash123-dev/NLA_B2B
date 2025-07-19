export interface DatabaseOption {
  id: string
  name: string
}

export interface RetailerOption {
  id: string
  name: string
}

export interface BrandOption {
  id: string
  name: string
}

export interface ProductOption {
  id: string
  name: string
}

export interface ColumnOption {
  id: string
  name: string
}

export interface ConfigFormData {
  // Step 1 - Setup
  selectedDatabase: string
  selectedRetailers: string[]
  selectedBrands: string[]
  selectedProducts: string[]
  marketShare: string
  minRevenue: string
  numWeeks: string
  
  // Step 2 - Column Selection
  selectedColumns: string[]
}

export interface ProcessingState {
  fetchProgress: number
  modelProgress: number
  isFetching: boolean
  isModeling: boolean
  isFetchComplete: boolean
  isModelComplete: boolean
}

export interface ConfigStepProps {
  formData: ConfigFormData
  onFormDataChange: (data: Partial<ConfigFormData>) => void
  onNext: () => void
  onBack: () => void
}

export interface ConfigProgress {
  currentStep: number
  totalSteps: number
  canProceed: boolean
}
