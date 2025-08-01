import { TPOEvent, EventMetrics } from '../types'

// Helper function to generate sample metrics
const createSampleMetrics = (baseMultiplier: number = 1): EventMetrics => {
  const base = baseMultiplier * 100
  return {
    // Financial Details
    basePrice: 5.99 + (baseMultiplier * 0.5),
    promoPrice: 4.99 + (baseMultiplier * 0.4),
    discount: 1.00 + (baseMultiplier * 0.1),
    units: 500 + (base * 2),
    listPrice: 6.99 + (baseMultiplier * 0.6),
    spoilPerUnit: 0.50 + (baseMultiplier * 0.05),
    edlpPerUnitRate: 4.50 + (baseMultiplier * 0.3),
    promoPerUnitRate: 3.99 + (baseMultiplier * 0.25),
    netPrice: 4.49 + (baseMultiplier * 0.35),
    cogsPerUnit: 2.50 + (baseMultiplier * 0.2),
    vcm: 2.00 + (baseMultiplier * 0.15),
    fixedFees: 1000 + (base * 5),

    // Financial Results
    grossRevenue: 10000 + (base * 50),
    totalSpend: 3000 + (base * 15),
    incrementalRevenue: 2500 + (base * 12),
    incrementalProfit: 1500 + (base * 8),
    salesROI: 2.5 + (baseMultiplier * 0.3),
    retailPromoMarginPercent: 15 + (baseMultiplier * 2),
    retailEverydayMarginPercent: 25 + (baseMultiplier * 1.5),
    retailProfit: 2000 + (base * 10),
    sharedProfitCreated: 1200 + (base * 6),
    percentFundedByRetailer: 60 + (baseMultiplier * 2),

    // Promotion Results
    tprACV: 45 + (baseMultiplier * 3),
    tprLift: 15 + (baseMultiplier * 1.2),
    tprUnits: 300 + (base * 1.5),
    tprDollars: 1500 + (base * 7),
    featureOnlyACV: 30 + (baseMultiplier * 2),
    featureOnlyLift: 12 + (baseMultiplier * 0.8),
    featureOnlyUnits: 200 + (base),
    featureOnlyDollars: 1000 + (base * 5),
    displayOnlyACV: 25 + (baseMultiplier * 1.5),
    displayOnlyLift: 10 + (baseMultiplier * 0.6),
    displayOnlyUnits: 150 + (base * 0.8),
    displayOnlyDollars: 750 + (base * 3.5),
    featureAndDisplayACV: 55 + (baseMultiplier * 4),
    featureAndDisplayLift: 20 + (baseMultiplier * 1.5),
    featureAndDisplayUnits: 400 + (base * 2),
    featureAndDisplayDollars: 2000 + (base * 9),
    eventIncrementalACV: 35 + (baseMultiplier * 2.5),
    eventIncrementalLift: 18 + (baseMultiplier * 1.3),
    eventIncrementalUnits: 250 + (base * 1.2),
    eventIncrementalDollars: 1250 + (base * 6),
    eventTotalACV: 80 + (baseMultiplier * 5),
    eventTotalLift: 25 + (baseMultiplier * 2),
    eventTotalUnits: 600 + (base * 3),
    eventTotalDollars: 3000 + (base * 15)
  }
}

// TPO Events comparison attributes - all the metrics the user specified
export const eventComparisonAttributes = [
  // Financial Details
  '$ Base Price',
  'Promo Price',
  '$ Discount',
  '@ Units',
  '$ List Price',
  '$ Spoil Per Unit',
  '$ EDLP Per Unit Rate',
  '$ Promo Per Unit Rate',
  '$ Net Price',
  '$ COGS Per Unit',
  '$ VCM',
  '$ Fixed Fees',

  // Financial Results
  'Gross Revenue',
  'Total Spend',
  'Incremental Revenue',
  'Incremental Profit',
  'Sales ROI',
  'Retail Promo Margin %',
  'Retail Everyday Margin %',
  'Retail Profit',
  'Shared Profit Created',
  '% Funded by Retailer',

  // Promotion Results
  'Promotion',
  'TPR %ACV',
  'TPR %Lift',
  'TPR Units',
  'TPR Dollars',
  'Feature Only %ACV',
  'Feature Only %Lift',
  'Feature Only %Units',
  'Feature Only Dollars',
  'Display Only %ACV',
  'Display Only %Lift',
  'Display Only %Units',
  'Display Only Dollars',
  'Feature and Display %ACV',
  'Feature and Display %Lift',
  'Feature and Display %Units',
  'Feature and Display %Dollars',
  'Event Incremental %ACV',
  'Event Incremental %Lift',
  'Event Incremental %Units',
  'Event Incremental %Dollars',
  'Event Total %ACV',
  'Event Total %Lift',
  'Event Total %Units',
  'Event Total %Dollars'
]

export const metricCategories = {
  'Financial Details': {
    color: 'from-blue-500 to-blue-600',
    metrics: [
      '$ Base Price',
      'Promo Price',
      '$ Discount',
      '@ Units',
      '$ List Price',
      '$ Spoil Per Unit',
      '$ EDLP Per Unit Rate',
      '$ Promo Per Unit Rate',
      '$ Net Price',
      '$ COGS Per Unit',
      '$ VCM',
      '$ Fixed Fees'
    ]
  },
  'Financial Results': {
    color: 'from-green-500 to-green-600',
    metrics: [
      'Gross Revenue',
      'Total Spend',
      'Incremental Revenue',
      'Incremental Profit',
      'Sales ROI',
      'Retail Promo Margin %',
      'Retail Everyday Margin %',
      'Retail Profit',
      'Shared Profit Created',
      '% Funded by Retailer'
    ]
  },
  'Promotion Results': {
    color: 'from-purple-500 to-purple-600',
    metrics: [
      'Promotion',
      'TPR %ACV',
      'TPR %Lift',
      'TPR Units',
      'TPR Dollars',
      'Feature Only %ACV',
      'Feature Only %Lift',
      'Feature Only %Units',
      'Feature Only Dollars',
      'Display Only %ACV',
      'Display Only %Lift',
      'Display Only %Units',
      'Display Only Dollars',
      'Feature and Display %ACV',
      'Feature and Display %Lift',
      'Feature and Display %Units',
      'Feature and Display %Dollars',
      'Event Incremental %ACV',
      'Event Incremental %Lift',
      'Event Incremental %Units',
      'Event Incremental %Dollars',
      'Event Total %ACV',
      'Event Total %Lift',
      'Event Total %Units',
      'Event Total %Dollars'
    ]
  }
}

export const sampleBrands = [
  'Plan A',
  'Plan B', 
  'Plan C',
  'Plan D',
  'Plan E'
]

// Sample TPO events data with proper metrics
export const sampleTPOEvents: TPOEvent[] = [
  {
    id: 'event-001',
    name: 'Event 1',
    brand: 'Brand A',
    retailer: 'Walmart',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    eventType: 'TPR',
    status: 'Completed',
    basePrice: 5.99,
    promoPrice: 4.99,
    description: 'Summer promotional campaign with TPR strategy',
    metrics: generateRandomMetrics()
  },
  {
    id: 'event-002',
    name: 'Event 2',
    brand: 'Brand A',
    retailer: 'Target',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    eventType: 'Feature',
    status: 'Completed',
    basePrice: 7.49,
    promoPrice: 6.49,
    description: 'Feature-only promotional strategy for brand visibility',
    metrics: generateRandomMetrics()
  },
  {
    id: 'event-003',
    name: 'Event 3',
    brand: 'Brand B',
    retailer: 'Kroger',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    eventType: 'Display',
    status: 'Active',
    basePrice: 4.99,
    promoPrice: 3.99,
    description: 'Display-focused campaign for high-traffic locations',
    metrics: generateRandomMetrics()
  },
  {
    id: 'event-004',
    name: 'Event 4',
    brand: 'Brand B',
    retailer: 'Safeway',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    eventType: 'Promotion',
    status: 'Scheduled',
    basePrice: 6.99,
    promoPrice: 5.49,
    description: 'Multi-channel promotional campaign with feature and display',
    metrics: generateRandomMetrics()
  },
  {
    id: 'event-005',
    name: 'Event 5',
    brand: 'Brand C',
    retailer: 'Whole Foods',
    startDate: '2024-05-15',
    endDate: '2024-06-15',
    eventType: 'Bundle',
    status: 'Completed',
    basePrice: 8.99,
    promoPrice: 7.99,
    description: 'Bundle promotion targeting premium customer segment',
    metrics: generateRandomMetrics()
  }
]

function generateRandomMetrics(): EventMetrics {
  const basePrice = 5 + Math.random() * 5 // $5-10
  const promoPrice = basePrice * (0.7 + Math.random() * 0.2) // 70-90% of base
  const units = Math.floor(1000 + Math.random() * 9000) // 1k-10k units
  
  return {
    // Financial Details
    basePrice: basePrice,
    promoPrice: promoPrice,
    discount: basePrice - promoPrice,
    units: units,
    listPrice: basePrice * 1.2,
    spoilPerUnit: 0.1 + Math.random() * 0.2,
    edlpPerUnitRate: basePrice * (0.8 + Math.random() * 0.1),
    promoPerUnitRate: promoPrice,
    netPrice: promoPrice * (0.9 + Math.random() * 0.1),
    cogsPerUnit: basePrice * (0.4 + Math.random() * 0.2),
    vcm: (promoPrice - basePrice * 0.5) * units,
    fixedFees: 500 + Math.random() * 1500,

    // Financial Results
    grossRevenue: promoPrice * units,
    totalSpend: units * basePrice * 0.6,
    incrementalRevenue: (promoPrice - basePrice * 0.8) * units,
    incrementalProfit: (promoPrice - basePrice * 0.6) * units,
    salesROI: 150 + Math.random() * 100, // 150-250%
    retailPromoMarginPercent: 15 + Math.random() * 10, // 15-25%
    retailEverydayMarginPercent: 20 + Math.random() * 10, // 20-30%
    retailProfit: promoPrice * units * 0.2,
    sharedProfitCreated: promoPrice * units * 0.1,
    percentFundedByRetailer: 40 + Math.random() * 20, // 40-60%

    // Promotion Results
    tprACV: 60 + Math.random() * 30, // 60-90%
    tprLift: 20 + Math.random() * 30, // 20-50%
    tprUnits: units * 0.6,
    tprDollars: promoPrice * units * 0.6,
    featureOnlyACV: 30 + Math.random() * 20, // 30-50%
    featureOnlyLift: 10 + Math.random() * 15, // 10-25%
    featureOnlyUnits: units * 0.2,
    featureOnlyDollars: promoPrice * units * 0.2,
    displayOnlyACV: 25 + Math.random() * 15, // 25-40%
    displayOnlyLift: 8 + Math.random() * 12, // 8-20%
    displayOnlyUnits: units * 0.15,
    displayOnlyDollars: promoPrice * units * 0.15,
    featureAndDisplayACV: 80 + Math.random() * 15, // 80-95%
    featureAndDisplayLift: 40 + Math.random() * 20, // 40-60%
    featureAndDisplayUnits: units * 0.8,
    featureAndDisplayDollars: promoPrice * units * 0.8,
    eventIncrementalACV: 70 + Math.random() * 20, // 70-90%
    eventIncrementalLift: 30 + Math.random() * 25, // 30-55%
    eventIncrementalUnits: units * 0.7,
    eventIncrementalDollars: promoPrice * units * 0.7,
    eventTotalACV: 85 + Math.random() * 10, // 85-95%
    eventTotalLift: 50 + Math.random() * 30, // 50-80%
    eventTotalUnits: units,
    eventTotalDollars: promoPrice * units
  }
}

export const MAX_COMPARISON_EVENTS = 5
export const MIN_COMPARISON_EVENTS = 2
export const COMPARISON_OPTIONS = [2, 3, 4, 5]
