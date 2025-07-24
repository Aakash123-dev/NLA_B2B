export interface PromoOptimizationFormData {
  selectedProduct: string
  uploadedFile: File | null
  event: string
  basePrice: number
  promoPrice: number
  discountPercent: number
  units: number
  tprACV: number
  displayOnlyACV: number
  featureOnlyACV: number
  featureDisplayACV: number
  // Financials
  listPrice: number
  spoilPerUnit: number
  edlpPerUnit: number
  promoPerUnit: number
  netPrice: number
  cogsPerUnit: number
  vcm: number
  fixedFees: number
}

export interface PromotionResult {
  acv: number
  lift: number
  units: number
  dollars: number
}

export interface PromotionResults {
  tpr: PromotionResult
  featureOnly: PromotionResult
  displayOnly: PromotionResult
  featureDisplay: PromotionResult
}

export interface EventResult {
  units: number
  dollars: number
}

export interface EventResults {
  incremental: EventResult
  total: EventResult
}

export interface FinancialAnalysis {
  mfrGrossRevenue: number
  incrementalRevenue: number
  spoils: number
  tradeSpend: number
  mfrNetRevenue: number
  cogs: number
  mfrGrossMarginUnpromoted: number
  mfrGrossMarginUnpromotedPercent: number
  mfrGrossMargin: number
  mfrGrossMarginPercent: number
  salesROI: number
  retailGrossRevenue: number
  retailIncrementalRevenue: number
  retailPromoMarginPercent: number
  retailEverydayMarginPercent: number
  retailProfit: number
}

export interface OptimizationResults {
  promotionResults: PromotionResults
  eventResults: EventResults
  financialAnalysis: FinancialAnalysis
}
