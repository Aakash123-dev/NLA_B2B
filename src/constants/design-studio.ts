import {
  DollarSign,
  TrendingUp,
  CalendarDays,
  Lightbulb,
  Sparkles,
  FileText,
  PieChart,
  BarChart3,
  Target,
  Brain,
} from 'lucide-react';

import type { DatabaseOption, RetailerOption, BrandOption, ProductOption, EventType, PriorityLevel, OptimizationGoal, TimeHorizon } from '@/types/project';

// Design Studio Constants
export const NODE_TYPES = {
  PRICING: 'pricing',
  INSIGHTS: 'insights',
  CALENDAR: 'calendar',
  TRADE_PLAN_OPTIMIZATION: 'trade-plan-optimization',
  PIE_CHART: 'pie-chart',
  FORECASTING: 'forecasting',
} as const;

export const STATIC_TOOLS = {
  'MODELING TOOLS': [
    { name: 'Pricing Model', description: 'Configure pricing strategies and models', type: 'pricing', icon: DollarSign },
    { name: 'Forecasting', description: 'Predictive analytics and forecasting', type: 'forecasting', icon: TrendingUp },
  ],
  'VISUALIZATION TOOLS': [
    { name: 'Insights Template', description: 'Pre-built insight visualization templates', type: 'insights', icon: Lightbulb },
    { name: 'Pie Chart', description: 'Create pie chart visualizations', type: 'pie-chart', icon: PieChart },
  ],
  'PLANNING TOOLS': [
    { name: 'Trade Calendar', description: 'Schedule and track trading activities', type: 'calendar', icon: CalendarDays },
    { name: 'Trade Plan Optimization', description: 'AI-powered trade plan optimization', type: 'trade-plan-optimization', icon: Sparkles },
  ],
  'PROCESSING TOOLS': [
    { name: 'Data Processing', description: 'Process and transform data', type: 'processing', icon: FileText },
  ],
} as const;

// Database Options
export const DATABASE_OPTIONS: DatabaseOption[] = [
  { id: 'db1', name: 'Primary Database' },
  { id: 'db2', name: 'Analytics Warehouse' },
  { id: 'db3', name: 'Legacy System DB' },
];

// Retailer Options
export const RETAILER_OPTIONS: RetailerOption[] = [
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

// Brand Options
export const BRAND_OPTIONS: BrandOption[] = [
  { id: 'brand1', name: 'Brand A' },
  { id: 'brand2', name: 'Brand B' },
  { id: 'brand3', name: 'Brand C' },
  { id: 'brand4', name: 'Brand D' },
  { id: 'brand5', name: 'Brand E' },
];

// Product Options
export const PRODUCT_OPTIONS: ProductOption[] = [
  { id: 'prod1', name: 'Product X' },
  { id: 'prod2', name: 'Product Y' },
  { id: 'prod3', name: 'Product Z' },
];

// Event Types for Trade Calendar
export const EVENT_TYPES: EventType[] = [
  { id: 'promotion', name: 'Promotion Launch', color: 'bg-green-500' },
  { id: 'pricing', name: 'Price Change', color: 'bg-blue-500' },
  { id: 'campaign', name: 'Marketing Campaign', color: 'bg-purple-500' },
  { id: 'seasonal', name: 'Seasonal Event', color: 'bg-orange-500' },
  { id: 'competitor', name: 'Competitor Activity', color: 'bg-red-500' },
];

// Priority Levels
export const PRIORITY_LEVELS: PriorityLevel[] = [
  { id: 'low', name: 'Low', color: 'text-green-400' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-400' },
  { id: 'high', name: 'High', color: 'text-red-400' },
];

// Optimization Goals
export const OPTIMIZATION_GOALS: OptimizationGoal[] = [
  { id: 'revenue', name: 'Maximize Revenue', icon: DollarSign, description: 'Focus on increasing total revenue' },
  { id: 'profit', name: 'Maximize Profit', icon: TrendingUp, description: 'Optimize for highest profit margins' },
  { id: 'market_share', name: 'Market Share Growth', icon: Target, description: 'Increase market penetration' },
  { id: 'efficiency', name: 'Operational Efficiency', icon: BarChart3, description: 'Improve resource utilization' },
];

// Time Horizons
export const TIME_HORIZONS: TimeHorizon[] = [
  { id: 'short', name: 'Short Term (1-3 months)', weight: 1.2 },
  { id: 'medium', name: 'Medium Term (3-6 months)', weight: 1.0 },
  { id: 'long', name: 'Long Term (6-12 months)', weight: 0.8 },
];
