import { Retailer, Brand, PPGCategory, Region, Category, InsightType, ColorScheme, PriceComparisonData, PriceSlopeData, SensitivityData, MerchandisingData, WidgetData } from './types';

// Data configurations
export const retailers: Retailer[] = [
  { id: 'alb-s', name: 'Alb S' },
  { id: 'jewel', name: 'Jewel' },
  { id: 'schnucks', name: 'Schnucks' },
  { id: 'target', name: 'Target' },
  { id: 'wmt-chicago', name: 'WMT Chicago' },
  { id: 'wmt-dallas', name: 'WMT Dallas' },
  { id: 'wmt-mn', name: 'WMT MN' },
  { id: 'kroger', name: 'Kroger' },
  { id: 'whole-foods', name: 'Whole Foods' },
  { id: 'safeway', name: 'Safeway' },
  { id: 'publix', name: 'Publix' },
];

export const brands: Brand[] = [
  { id: 'black-rifle', name: 'BLACK RIFLE COFFEE COMPANY' },
  { id: 'camerons', name: 'CAMERONS' },
  { id: 'caribou', name: 'CARIBOU COFFEE' },
  { id: 'death-wish', name: 'DEATH WISH COFFEE CO' },
  { id: 'eight-o-clock', name: 'EIGHT O CLOCK' },
  { id: 'gevalia', name: 'GEVALIA' },
  { id: 'illy', name: 'ILLY' },
  { id: 'lavazza', name: 'LAVAZZA' },
  { id: 'peets', name: 'PEETS COFFEE' },
  { id: 'starbucks', name: 'STARBUCKS' },
  { id: 'dunkin', name: 'DUNKIN DONUTS' },
];

export const ppgCategories: PPGCategory[] = [
  { id: 'ppg-01', name: 'Ground Coffee - Premium' },
  { id: 'ppg-02', name: 'Ground Coffee - Standard' },
  { id: 'ppg-03', name: 'Ground Coffee - Value' },
  { id: 'ppg-04', name: 'Whole Bean - Premium' },
  { id: 'ppg-05', name: 'K-Cups - Premium' },
  { id: 'ppg-06', name: 'K-Cups - Standard' },
];

export const regions: Region[] = [
  { id: 'rma', name: 'RMA' },
  { id: 'northeast', name: 'Northeast' },
  { id: 'southeast', name: 'Southeast' },
  { id: 'midwest', name: 'Midwest' },
  { id: 'southwest', name: 'Southwest' },
  { id: 'west', name: 'West' },
  { id: 'total-us', name: 'Total US' },
];

export const categories: Category[] = [
  { id: 'ground-coffee', name: 'Ground Coffee' },
  { id: 'whole-bean', name: 'Whole Bean' },
  { id: 'k-cups', name: 'K-Cups' },
  { id: 'instant', name: 'Instant Coffee' },
];

export const insightTypes: InsightType[] = [
  { id: 'base-1', name: 'What is the price across all products by retailers?', category: 'base' },
  { id: 'base-2', name: 'What is the price slope of our products?', category: 'base' },
  { id: 'base-3', name: 'How sensitive are our products to base price changes?', category: 'base' },
  { id: 'base-4', name: 'What is the volume and dollar impact of changing base price?', category: 'base' },
  { id: 'promo-5', name: 'What is the relationship between average price and volume of our products?', category: 'promo' },
  { id: 'promo-6', name: 'How sensitive are our products to promotions?', category: 'promo' },
  { id: 'promo-7', name: 'What is the lift by each merchandise type?', category: 'promo' },
  { id: 'strat-8', name: 'What is the optimal pricing strategy by market?', category: 'strat' },
  { id: 'strat-9', name: 'How do seasonal factors impact sales?', category: 'strat' },
  { id: 'overall-10', name: 'Overall market performance analysis', category: 'overall' },
];

export const colorSchemes: ColorScheme[] = [
  { id: 'default', name: 'Default Blue', colors: ['#3b82f6', '#1d4ed8', '#1e40af'] },
  { id: 'green', name: 'Green Theme', colors: ['#10b981', '#059669', '#047857'] },
  { id: 'purple', name: 'Purple Theme', colors: ['#8b5cf6', '#7c3aed', '#6d28d9'] },
  { id: 'orange', name: 'Orange Theme', colors: ['#f59e0b', '#d97706', '#b45309'] },
  { id: 'monochrome', name: 'Monochrome', colors: ['#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db'] },
  { id: 'modern', name: 'Modern', colors: ['#06b6d4', '#0284c7', '#7c3aed', '#2563eb', '#059669'] },
];

// Sample data
export const priceComparisonData: PriceComparisonData[] = [
  { retailer: 'Alb S', product: 'BLACK RIFLE JUST BLACK GROUND', price: 12.99, volume: 1250, size: '12 OZ' },
  { retailer: 'Jewel', product: 'BLACK RIFLE JUST BLACK GROUND', price: 13.49, volume: 980, size: '12 OZ' },
  { retailer: 'Target', product: 'BLACK RIFLE LOYALTY ROAST', price: 11.99, volume: 1580, size: '12 OZ' },
  { retailer: 'Kroger', product: 'BLACK RIFLE SPIRIT OF 76', price: 12.79, volume: 1120, size: '12 OZ' },
  { retailer: 'Whole Foods', product: 'BLACK RIFLE TACTISQUATCH', price: 14.99, volume: 840, size: '12 OZ' },
];

export const priceSlopeData: PriceSlopeData[] = [
  { size: '8 OZ', price: 9.99, product: 'BLACK RIFLE JUST BLACK' },
  { size: '12 OZ', price: 12.99, product: 'BLACK RIFLE JUST BLACK' },
  { size: '16 OZ', price: 16.99, product: 'BLACK RIFLE JUST BLACK' },
  { size: '24 OZ', price: 22.99, product: 'BLACK RIFLE JUST BLACK' },
];

export const sensitivityData: SensitivityData[] = [
  { price: 10.99, volume: 1800, profit: 45000, elasticity: -1.2 },
  { price: 11.99, volume: 1580, profit: 52000, elasticity: -0.8 },
  { price: 12.99, volume: 1250, profit: 48000, elasticity: -0.6 },
  { price: 13.99, volume: 980, profit: 42000, elasticity: -1.1 },
  { price: 14.99, volume: 750, profit: 38000, elasticity: -1.5 },
];

export const merchandisingData: MerchandisingData[] = [
  { type: 'End Cap', lift: 15.2, revenue: 125000, cost: 8500, roi: 13.7 },
  { type: 'Feature Ad', lift: 8.5, revenue: 95000, cost: 12000, roi: 6.9 },
  { type: 'Display', lift: 12.1, revenue: 110000, cost: 7200, roi: 14.3 },
  { type: 'Shelf Talker', lift: 4.8, revenue: 78000, cost: 3500, roi: 21.3 },
];

// Widget data (simulated)
export const widgetData: WidgetData = {
  elasticProducts: 156,
  inelasticProducts: 89,
  growthPercentage: 12.5,
  totalSales: 2450000,
  recommendedUplift: 8.3,
  topProducts: [
    { 
      name: 'BLACK RIFLE JUST BLACK', 
      performance: 'High Volume', 
      metric: '+15%',
      price: '$12.99',
      units: '2,340',
      revenue: '$30,381',
      category: 'Ground Coffee - Premium'
    },
    { 
      name: 'BLACK RIFLE LOYALTY ROAST', 
      performance: 'High Margin', 
      metric: '+22%',
      price: '$14.50',
      units: '1,890',
      revenue: '$27,405',
      category: 'Ground Coffee - Premium'
    },
    { 
      name: 'BLACK RIFLE SPIRIT OF 76', 
      performance: 'Trending Up', 
      metric: '+8%',
      price: '$13.25',
      units: '1,560',
      revenue: '$20,670',
      category: 'Ground Coffee - Premium'
    },
    { 
      name: 'BLACK RIFLE CAF & CAF', 
      performance: 'Stable Growth', 
      metric: '+5%',
      price: '$11.99',
      units: '1,234',
      revenue: '$14,796',
      category: 'Ground Coffee - Standard'
    },
    { 
      name: 'BLACK RIFLE SILENCER SMOOTH', 
      performance: 'New Entry', 
      metric: '+32%',
      price: '$15.99',
      units: '892',
      revenue: '$14,267',
      category: 'Ground Coffee - Premium'
    }
  ]
};

// Analysis summaries
export const getAnalysisSummary = (type: 'overall' | 'base' | 'promo' | 'strat'): string => {
  switch (type) {
    case 'overall':
      return `Based on comprehensive analysis of your coffee product portfolio, we've identified several key insights:
      
1. Price elasticity varies significantly across product lines, with premium products showing lower elasticity (-0.6 to -0.8) compared to standard offerings (-1.2 to -1.5).

2. BLACK RIFLE JUST BLACK performs exceptionally well at the $12.99 price point, maximizing both volume and profit margin.

3. Overall market share has increased by 2.3% year-over-year, primarily driven by growth in premium ground coffee categories.

4. Competitive analysis suggests opportunity to increase prices on specialized offerings like SPIRIT OF 76 without significant volume impact.

5. Customer segmentation reveals price sensitivity is lowest in urban markets and highest in suburban regions, suggesting geographical pricing strategies.`;
    case 'base':
      return `Base price analysis for your coffee products reveals important insights:

1. The optimal price point for BLACK RIFLE JUST BLACK is $12.99, which balances maximum volume with profit margin.

2. Price elasticity is lowest (-0.6) in the premium category, indicating opportunity for modest price increases.

3. Current base prices are positioned competitively, with your products averaging 3.2% below key competitors in premium segments.

4. Price slope analysis shows ideal price gaps between size variants (8oz, 12oz, 16oz, 24oz) should maintain a 30% increment relationship.

5. Historical pricing data indicates customer acceptance of up to 5% annual base price increases without significant volume impact.`;
    case 'promo':
      return `Promotional effectiveness analysis has uncovered several actionable insights:

1. End cap displays deliver the highest promotional ROI (13.7), significantly outperforming feature ads (6.9).

2. Temporary price reductions of 15-20% generate optimal lift (12.1%) while preserving margin integrity.

3. Promotional frequency analysis indicates diminishing returns when running more than 6 promotions per quarter.

4. Cross-category promotion (pairing coffee with complementary products) increases basket size by an average of 24%.

5. Competitive promotion tracking shows opportunities to counterprogram during weak competitor periods, particularly in weeks 2-3 of each month.`;
    case 'strat':
      return `Strategic pricing analysis of your coffee product portfolio provides long-term guidance:

1. Price architecture optimization suggests creating clear good-better-best tiers with 15-20% price gaps between tiers.

2. Long-term elasticity trends indicate decreasing price sensitivity in premium coffee segments, creating room for strategic upward pricing.

3. Channel-specific strategies should focus on maintaining premium positioning in specialty stores while offering value packs in mass retail.

4. Seasonal pricing opportunities exist for limited-time special editions, with Q4 showing 23% higher price tolerance.

5. Portfolio rationalization identifies 3 SKUs for potential discontinuation due to cannibalization of higher-margin products.`;
    default:
      return '';
  }
};
