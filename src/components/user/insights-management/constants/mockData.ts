import { Project, Question } from '../types';

// Mock data for projects - Expanded list to simulate 100+ projects
export const mockProjects: Project[] = [
  { id: 'project-1', name: 'Q4 Marketing Campaign', status: 'active', type: 'Marketing' },
  { id: 'project-2', name: 'Product Launch Analysis', status: 'active', type: 'Product' },
  { id: 'project-3', name: 'Seasonal Forecasting', status: 'active', type: 'Forecasting' },
  { id: 'project-all', name: 'All Projects', status: 'active', type: 'Global' },
  // Marketing Projects
  { id: 'project-4', name: 'Digital Marketing ROI Analysis', status: 'active', type: 'Marketing' },
  { id: 'project-5', name: 'Social Media Campaign Performance', status: 'active', type: 'Marketing' },
  { id: 'project-6', name: 'Email Marketing Optimization', status: 'active', type: 'Marketing' },
  { id: 'project-7', name: 'Brand Awareness Study', status: 'inactive', type: 'Marketing' },
  { id: 'project-8', name: 'Customer Acquisition Cost Analysis', status: 'active', type: 'Marketing' },
  { id: 'project-9', name: 'Influencer Marketing Impact', status: 'active', type: 'Marketing' },
  { id: 'project-10', name: 'Content Marketing Performance', status: 'active', type: 'Marketing' },
  // Product Projects
  { id: 'project-11', name: 'Product Portfolio Analysis', status: 'active', type: 'Product' },
  { id: 'project-12', name: 'New Product Development Pipeline', status: 'active', type: 'Product' },
  { id: 'project-13', name: 'Product Lifecycle Assessment', status: 'active', type: 'Product' },
  { id: 'project-14', name: 'Feature Usage Analytics', status: 'active', type: 'Product' },
  { id: 'project-15', name: 'Product Pricing Strategy', status: 'active', type: 'Product' },
  { id: 'project-16', name: 'Competitive Product Analysis', status: 'inactive', type: 'Product' },
  { id: 'project-17', name: 'Product Market Fit Study', status: 'active', type: 'Product' },
  // Forecasting Projects
  { id: 'project-18', name: 'Revenue Forecasting Model', status: 'active', type: 'Forecasting' },
  { id: 'project-19', name: 'Demand Planning Analysis', status: 'active', type: 'Forecasting' },
  { id: 'project-20', name: 'Market Trend Prediction', status: 'active', type: 'Forecasting' },
  { id: 'project-21', name: 'Supply Chain Forecasting', status: 'active', type: 'Forecasting' },
  { id: 'project-22', name: 'Economic Impact Analysis', status: 'active', type: 'Forecasting' },
  { id: 'project-23', name: 'Weather Impact on Sales', status: 'inactive', type: 'Forecasting' },
  // Sales Projects
  { id: 'project-24', name: 'Sales Performance Dashboard', status: 'active', type: 'Sales' },
  { id: 'project-25', name: 'Territory Optimization', status: 'active', type: 'Sales' },
  { id: 'project-26', name: 'Lead Scoring Model', status: 'active', type: 'Sales' },
  { id: 'project-27', name: 'Customer Retention Analysis', status: 'active', type: 'Sales' },
  { id: 'project-28', name: 'Sales Pipeline Optimization', status: 'active', type: 'Sales' },
  { id: 'project-29', name: 'Cross-selling Opportunity Analysis', status: 'active', type: 'Sales' },
  // Operations Projects
  { id: 'project-30', name: 'Supply Chain Optimization', status: 'active', type: 'Operations' },
  { id: 'project-31', name: 'Inventory Management Analysis', status: 'active', type: 'Operations' },
  { id: 'project-32', name: 'Process Efficiency Study', status: 'active', type: 'Operations' },
  { id: 'project-33', name: 'Quality Control Analytics', status: 'active', type: 'Operations' },
  { id: 'project-34', name: 'Cost Reduction Initiative', status: 'inactive', type: 'Operations' },
  { id: 'project-35', name: 'Logistics Optimization', status: 'active', type: 'Operations' },
  // Additional projects to reach 50+
  ...Array.from({ length: 65 }, (_, i) => ({
    id: `project-${36 + i}`,
    name: `Project ${36 + i} - ${['Analytics', 'Research', 'Study', 'Analysis', 'Initiative', 'Campaign'][i % 6]}`,
    status: ['active', 'inactive', 'active'][i % 3] as 'active' | 'inactive',
    type: ['Marketing', 'Product', 'Sales', 'Operations', 'Finance', 'HR'][i % 6] as 'Marketing' | 'Product' | 'Sales' | 'Operations' | 'Finance' | 'HR'
  }))
];

// Mock data for model configurations
export const modelConfigs = {
  Pricing: [
    { id: 'price_point', name: 'Price Point', type: 'number' as const },
    { id: 'elasticity', name: 'Price Elasticity', type: 'number' as const },
    { id: 'demand', name: 'Demand Volume', type: 'number' as const },
    { id: 'revenue', name: 'Revenue', type: 'number' as const },
    { id: 'margin', name: 'Profit Margin', type: 'number' as const },
    { id: 'competitor_price', name: 'Competitor Price', type: 'number' as const }
  ],
  TPO: [
    { id: 'roi', name: 'ROI', type: 'number' as const },
    { id: 'spend', name: 'Trade Spend', type: 'number' as const },
    { id: 'volume', name: 'Volume Lift', type: 'number' as const },
    { id: 'incremental_sales', name: 'Incremental Sales', type: 'number' as const },
    { id: 'promotional_depth', name: 'Promotional Depth', type: 'number' as const },
    { id: 'event_duration', name: 'Event Duration', type: 'number' as const }
  ],
  Forecast: [
    { id: 'projected_sales', name: 'Projected Sales', type: 'number' as const },
    { id: 'market_share', name: 'Market Share', type: 'number' as const },
    { id: 'seasonal_factor', name: 'Seasonal Factor', type: 'number' as const },
    { id: 'trend', name: 'Trend Coefficient', type: 'number' as const },
    { id: 'confidence_interval', name: 'Confidence Interval', type: 'number' as const },
    { id: 'variance', name: 'Forecast Variance', type: 'number' as const }
  ]
};

// Mock questions data - Comprehensive Insights Library
export const mockQuestions: Question[] = [
  // BASE PRICE QUESTIONS
  {
    id: '1',
    text: 'What is the price across all products by retailers?',
    category: 'base',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: '2',
    text: 'What is the price slope of our products?',
    category: 'base',
    isActive: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: '3',
    text: 'How sensitive are our products to base price changes?',
    category: 'base',
    isActive: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: '4',
    text: 'What is the volume and dollar impact of changing base price?',
    category: 'base',
    isActive: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: '5',
    text: 'How does price elasticity vary across different product categories?',
    category: 'base',
    isActive: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-07-18')
  },
  // PROMOTIONAL QUESTIONS
  {
    id: '6',
    text: 'What is the relationship between average price and volume of our products?',
    category: 'promo',
    isActive: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-07-19')
  },
  {
    id: '7',
    text: 'How sensitive are our products to promotions?',
    category: 'promo',
    isActive: true,
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-07-19')
  },
  {
    id: '8',
    text: 'What is the lift by each merchandise type?',
    category: 'promo',
    isActive: true,
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-07-19')
  },
  {
    id: '9',
    text: 'How much does merchandising add to lift?',
    category: 'promo',
    isActive: true,
    createdAt: new Date('2024-02-04'),
    updatedAt: new Date('2024-07-19')
  },
  {
    id: '10',
    text: 'What is the ROI for all promotional events?',
    category: 'promo',
    isActive: true,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-07-19')
  },
  {
    id: '11',
    text: 'What is the incremental volume impact of promotional activities?',
    category: 'promo',
    isActive: true,
    createdAt: new Date('2024-02-06'),
    updatedAt: new Date('2024-07-19')
  },
  // STRATEGIC QUESTIONS
  {
    id: '12',
    text: 'What is the overall portfolio pricing strategy?',
    category: 'strat',
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-07-15')
  },
  {
    id: '13',
    text: 'How do we maximize our profit-volume mix?',
    category: 'strat',
    isActive: true,
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-07-15')
  },
  {
    id: '14',
    text: 'What are the seasonal trends in demand forecasting?',
    category: 'strat',
    isActive: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-07-15')
  },
  {
    id: '15',
    text: 'What is the competitive positioning analysis?',
    category: 'strat',
    isActive: true,
    createdAt: new Date('2024-03-06'),
    updatedAt: new Date('2024-07-15')
  },
  {
    id: '16',
    text: 'How should we optimize our product mix across channels?',
    category: 'strat',
    isActive: true,
    createdAt: new Date('2024-03-07'),
    updatedAt: new Date('2024-07-15')
  },
  // OVERALL/COMPREHENSIVE QUESTIONS
  {
    id: '17',
    text: 'What is the overall market performance compared to competitors?',
    category: 'overall',
    isActive: true,
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-07-10')
  },
  {
    id: '18',
    text: 'What are the key performance indicators across all business units?',
    category: 'overall',
    isActive: true,
    createdAt: new Date('2024-04-02'),
    updatedAt: new Date('2024-07-10')
  },
  {
    id: '19',
    text: 'How does our performance vary across different geographic regions?',
    category: 'overall',
    isActive: true,
    createdAt: new Date('2024-04-03'),
    updatedAt: new Date('2024-07-10')
  },
  {
    id: '20',
    text: 'What is the comprehensive ROI analysis across all initiatives?',
    category: 'overall',
    isActive: false,
    createdAt: new Date('2024-04-04'),
    updatedAt: new Date('2024-07-10')
  }
];
