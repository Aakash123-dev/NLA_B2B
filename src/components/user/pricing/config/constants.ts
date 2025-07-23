import { DatabaseOption, RetailerOption, BrandOption, ProductOption, ColumnOption } from './types'

export const databases: DatabaseOption[] = [
  { id: 'db1', name: 'Primary Analytics Database' },
  { id: 'db2', name: 'Real-time Data Warehouse' },
  { id: 'db3', name: 'Historical Sales Database' },
  { id: 'db4', name: 'Market Research Database' },
]

export const retailers: RetailerOption[] = [
  { id: 'walmart', name: 'Walmart' },
  { id: 'target', name: 'Target' },
  { id: 'kroger', name: 'Kroger' },
  { id: 'costco', name: 'Costco Wholesale' },
  { id: 'amazon', name: 'Amazon Fresh' },
  { id: 'safeway', name: 'Safeway' },
  { id: 'publix', name: 'Publix Super Markets' },
  { id: 'wholefoods', name: 'Whole Foods Market' },
  { id: 'aldi', name: 'ALDI' },
  { id: 'trader-joes', name: 'Trader Joe\'s' },
]

export const brands: BrandOption[] = [
  { id: 'coca-cola', name: 'Coca Cola' },
  { id: 'pepsi', name: 'PepsiCo' },
  { id: 'nestle', name: 'Nestlé' },
  { id: 'unilever', name: 'Unilever' },
  { id: 'procter-gamble', name: 'Procter & Gamble' },
  { id: 'kelloggs', name: 'Kellogg\'s' },
  { id: 'general-mills', name: 'General Mills' },
  { id: 'kraft-heinz', name: 'Kraft Heinz' },
  { id: 'starbucks', name: 'Starbucks' },
  { id: 'folgers', name: 'Folgers' },
]

export const products: ProductOption[] = [
  { id: 'coca-cola-classic-12oz', name: 'Coca-Cola Classic 12oz Can' },
  { id: 'coca-cola-diet-12oz', name: 'Diet Coke 12oz Can' },
  { id: 'pepsi-cola-12oz', name: 'Pepsi Cola 12oz Can' },
  { id: 'pepsi-diet-12oz', name: 'Diet Pepsi 12oz Can' },
  { id: 'starbucks-pike-place-kcup', name: 'Starbucks Pike Place Roast K-Cup' },
  { id: 'folgers-classic-roast-ground', name: 'Folgers Classic Roast Ground Coffee' },
  { id: 'kelloggs-frosted-flakes', name: 'Kellogg\'s Frosted Flakes Cereal' },
  { id: 'general-mills-cheerios', name: 'General Mills Cheerios Original' },
  { id: 'kraft-mac-cheese-original', name: 'Kraft Macaroni & Cheese Original' },
  { id: 'nestle-kitkat-bar', name: 'Nestlé KitKat Chocolate Bar' },
  { id: 'unilever-dove-soap', name: 'Dove Beauty Bar Soap' },
  { id: 'pg-tide-detergent', name: 'Tide Liquid Laundry Detergent' },
  { id: 'starbucks-blonde-roast-whole-bean', name: 'Starbucks Blonde Roast Whole Bean Coffee' },
  { id: 'coca-cola-zero-sugar-12oz', name: 'Coca-Cola Zero Sugar 12oz Can' },
  { id: 'pepsi-zero-sugar-12oz', name: 'Pepsi Zero Sugar 12oz Can' },
]

export const availableColumns: ColumnOption[] = [
  { id: 'sales_units', name: 'Sales Units' },
  { id: 'sales_value', name: 'Sales Value ($)' },
  { id: 'base_price', name: 'Base Price' },
  { id: 'promotional_price', name: 'Promotional Price' },
  { id: 'promotion_flag', name: 'Promotion Flag' },
  { id: 'distribution_points', name: 'Distribution Points' },
  { id: 'market_share', name: 'Market Share (%)' },
  { id: 'inventory_level', name: 'Inventory Level' },
  { id: 'marketing_spend', name: 'Marketing Spend' },
  { id: 'competitor_price', name: 'Competitor Price' },
  { id: 'seasonality_index', name: 'Seasonality Index' },
  { id: 'price_elasticity', name: 'Price Elasticity' },
]

export const STEP_TITLES = [
  'Setup',
  'Column Selection', 
  'Summary',
  'Execution',
  'Results'
] as const

export const TOTAL_STEPS = 5
