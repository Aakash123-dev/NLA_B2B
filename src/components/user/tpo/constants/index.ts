import { RetailerOption, BrandOption } from '../types'

export const retailerOptions: RetailerOption[] = [
  { id: "walmart", name: "Walmart" },
  { id: "target", name: "Target" },
  { id: "kroger", name: "Kroger" },
  { id: "costco", name: "Costco" },
  { id: "amazon", name: "Amazon" },
  { id: "safeway", name: "Safeway" },
  { id: "publix", name: "Publix" }
]

export const brandOptions: BrandOption[] = [
  { id: "real-good-foods", name: "Real Good Foods" },
  { id: "applegate", name: "Applegate Naturals" },
  { id: "beyond-meat", name: "Beyond Meat" },
  { id: "impossible-foods", name: "Impossible Foods" },
  { id: "lightlife", name: "Lightlife" },
  { id: "gardein", name: "Gardein" }
]

export const yearOptions = [
  { value: 2024, label: "2024" },
  { value: 2025, label: "2025" },
  { value: 2026, label: "2026" },
  { value: 2027, label: "2027" }
]

export const channelOptions = [
  "In-Store Display", 
  "Digital Advertising", 
  "Print Media", 
  "Social Media", 
  "Email Marketing", 
  "Radio", 
  "TV", 
  "Outdoor", 
  "Direct Mail"
]

export const productOptions = [
  "APPLEGATE NATURALS Organic Turkey Slices",
  "APPLEGATE NATURALS Organic Ham",
  "APPLEGATE NATURALS Organic Chicken Breast",
  "APPLEGATE NATURALS Organic Roast Beef"
]

export const colorOptions = [
  { value: "#3B82F6", label: "Blue", bg: "bg-blue-500" },
  { value: "#10B981", label: "Green", bg: "bg-green-500" },
  { value: "#F59E0B", label: "Orange", bg: "bg-orange-500" },
  { value: "#EF4444", label: "Red", bg: "bg-red-500" },
  { value: "#8B5CF6", label: "Purple", bg: "bg-purple-500" },
  { value: "#06B6D4", label: "Cyan", bg: "bg-cyan-500" }
]

export const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "planned", label: "Planned" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" }
]

export const configurationSteps = [
  {
    number: "01",
    title: "Data Connection",
    description: "Connect to your data sources and validate data quality",
    features: [
      "Database connectivity setup",
      "Data validation & quality checks",
      "Historical data import",
      "Real-time data streaming"
    ]
  },
  {
    number: "02",
    title: "Filter Configuration", 
    description: "Set up retailer, brand, and product filtering parameters",
    features: [
      "Multi-retailer selection",
      "Brand portfolio filtering",
      "Product category mapping",
      "Geographic market selection"
    ]
  },
  {
    number: "03",
    title: "Model Parameters",
    description: "Configure advanced pricing model settings and algorithms",
    features: [
      "Elasticity model selection",
      "Price sensitivity thresholds",
      "Seasonality adjustments",
      "Competitive response modeling"
    ]
  },
  {
    number: "04",
    title: "Output Configuration",
    description: "Define analysis outputs and visualization preferences",
    features: [
      "Custom report templates",
      "KPI dashboard setup",
      "Alert configurations",
      "Export format preferences"
    ]
  }
]

export const chartQuestions = [
  {
    id: 1,
    question: "What is the ROI for all events?",
    hasChart: true
  },
  {
    id: 2,
    question: "What is driving the variation in ROI across different retailers?",
    hasChart: false
  },
  {
    id: 3,
    question: "Trade spend versus incremental case consumption and ROI (%)",
    hasChart: false
  },
  {
    id: 4,
    question: "What is the ROI by event types?",
    hasChart: false
  },
  {
    id: 5,
    question: "What is the ROI at different discount levels?",
    hasChart: false
  },
  {
    id: 6,
    question: "What is the performance of PPGs?",
    hasChart: false
  },
  {
    id: 7,
    question: "What is the Incremental Profit Per Dollar Invested on Promo By Retailer?",
    hasChart: false
  },
  {
    id: 8,
    question: "What is the relationship between ROI and Incremental Profit Pool?",
    hasChart: false
  }
]
