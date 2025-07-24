export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const calculateDiscountPercent = (basePrice: number, promoPrice: number): number => {
  if (basePrice === 0) return 0
  return ((basePrice - promoPrice) / basePrice) * 100
}

export const calculateVCM = (listPrice: number, cogsPerUnit: number): number => {
  return listPrice - cogsPerUnit
}

export const validateFormData = (formData: any): string[] => {
  const errors: string[] = []
  
  if (!formData.selectedProduct) {
    errors.push('Please select a product')
  }
  
  if (formData.basePrice <= 0) {
    errors.push('Base price must be greater than 0')
  }
  
  if (formData.promoPrice <= 0) {
    errors.push('Promo price must be greater than 0')
  }
  
  if (formData.promoPrice >= formData.basePrice) {
    errors.push('Promo price must be less than base price')
  }
  
  return errors
}

export const generateMockResults = (formData: any) => {
  // Generate realistic mock results based on input data
  const baseLift = 15 + Math.random() * 20 // 15-35% lift
  
  return {
    promotionResults: {
      tpr: { 
        acv: formData.tprACV, 
        lift: baseLift + 5, 
        units: Math.round(formData.units * (baseLift + 5) / 100), 
        dollars: Math.round(formData.units * (baseLift + 5) / 100 * formData.promoPrice) 
      },
      featureOnly: { 
        acv: formData.featureOnlyACV, 
        lift: baseLift - 5, 
        units: Math.round(formData.units * (baseLift - 5) / 100), 
        dollars: Math.round(formData.units * (baseLift - 5) / 100 * formData.promoPrice) 
      },
      displayOnly: { 
        acv: formData.displayOnlyACV, 
        lift: baseLift - 8, 
        units: Math.round(formData.units * (baseLift - 8) / 100), 
        dollars: Math.round(formData.units * (baseLift - 8) / 100 * formData.promoPrice) 
      },
      featureDisplay: { 
        acv: formData.featureDisplayACV, 
        lift: baseLift + 10, 
        units: Math.round(formData.units * (baseLift + 10) / 100), 
        dollars: Math.round(formData.units * (baseLift + 10) / 100 * formData.promoPrice) 
      }
    },
    eventResults: {
      incremental: { 
        units: Math.round(formData.units * baseLift / 100), 
        dollars: Math.round(formData.units * baseLift / 100 * formData.promoPrice) 
      },
      total: { 
        units: Math.round(formData.units * (1 + baseLift / 100)), 
        dollars: Math.round(formData.units * (1 + baseLift / 100) * formData.promoPrice) 
      }
    },
    financialAnalysis: {
      mfrGrossRevenue: Math.round(formData.units * (1 + baseLift / 100) * formData.promoPrice),
      incrementalRevenue: Math.round(formData.units * baseLift / 100 * formData.promoPrice),
      spoils: Math.round(formData.units * 0.02 * formData.cogsPerUnit), // 2% spoilage
      tradeSpend: Math.round(formData.units * (formData.basePrice - formData.promoPrice)),
      mfrNetRevenue: Math.round(formData.units * (1 + baseLift / 100) * formData.promoPrice * 0.85),
      cogs: Math.round(formData.units * (1 + baseLift / 100) * formData.cogsPerUnit),
      mfrGrossMarginUnpromoted: Math.round(formData.units * (formData.basePrice - formData.cogsPerUnit)),
      mfrGrossMarginUnpromotedPercent: ((formData.basePrice - formData.cogsPerUnit) / formData.basePrice) * 100,
      mfrGrossMargin: Math.round(formData.units * (1 + baseLift / 100) * (formData.promoPrice - formData.cogsPerUnit)),
      mfrGrossMarginPercent: ((formData.promoPrice - formData.cogsPerUnit) / formData.promoPrice) * 100,
      salesROI: 2.5 + Math.random() * 2, // 2.5-4.5 ROI
      retailGrossRevenue: Math.round(formData.units * (1 + baseLift / 100) * formData.promoPrice),
      retailIncrementalRevenue: Math.round(formData.units * baseLift / 100 * formData.promoPrice),
      retailPromoMarginPercent: 25 + Math.random() * 10, // 25-35%
      retailEverydayMarginPercent: 30 + Math.random() * 10, // 30-40%
      retailProfit: Math.round(formData.units * (1 + baseLift / 100) * formData.promoPrice * 0.3)
    }
  }
}
