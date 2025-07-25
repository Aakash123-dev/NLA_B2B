import { 
  Banknote, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Activity, 
  Sparkles, 
  Upload, 
  Download, 
  Brain,
  Lightbulb,
  Paintbrush,
  Shapes,
  Target,
  Zap,
  CalendarDays,
  Filter,
  FileText,
  DollarSign,
  Megaphone
} from 'lucide-react';
import { ToolCategory, InsightTemplate } from '../types';

// Mock insight templates from setup page
export const insightTemplates: InsightTemplate[] = [
  { id: '1', name: 'Revenue Forecasting', type: 'Forecasting', dataSource: 'Production Database', created: '2024-01-15' },
  { id: '2', name: 'Customer Churn Analysis', type: 'Analytics', dataSource: 'Customer CRM', created: '2024-01-10' },
  { id: '3', name: 'Market Trend Dashboard', type: 'Visualization', dataSource: 'Marketing Data', created: '2024-01-08' },
];

// Tool categories configuration with pastel colors
export const getToolCategories = (): ToolCategory[] => [
  {
    name: 'Modeling Tools',
    tools: [
      { id: 'pricing', name: 'Pricing Model', icon: DollarSign, color: 'from-emerald-100 to-emerald-200' },
      { id: 'forecasting', name: 'Forecasting', icon: Brain, color: 'from-violet-100 to-violet-200' },
    ]
  },
  {
    name: 'Visualization Tools',
    tools: [
      { id: 'insights-template', name: 'Insights Template', icon: Lightbulb, color: 'from-yellow-100 to-yellow-200' },
      { id: 'pie-chart', name: 'Pie Chart', icon: PieChart, color: 'from-rose-100 to-rose-200' },
      { id: 'standard-insights-report', name: 'Standard Insights Report', icon: FileText, color: 'from-blue-100 to-blue-200' },
      { id: 'template-1', name: 'Revenue Forecasting', icon: TrendingUp, color: 'from-sky-100 to-sky-200' },
      { id: 'template-2', name: 'Customer Churn Analysis', icon: Activity, color: 'from-orange-100 to-orange-200' },
      { id: 'template-3', name: 'Market Trend Dashboard', icon: BarChart3, color: 'from-amber-100 to-amber-200' },
    ]
  },
  {
    name: 'Planning Tools',
    tools: [
      { id: 'trade-calendar', name: 'Trade Calendar', icon: CalendarDays, color: 'from-green-100 to-green-200' },
      { id: 'trade-plan-optimization', name: 'Trade Plan Optimization', icon: Target, color: 'from-lime-100 to-lime-200' },
      { id: 'promo-optimization', name: 'Promo Optimization', icon: Megaphone, color: 'from-fuchsia-100 to-fuchsia-200' },
    ]
  },
  {
    name: 'Processing Tools',
    tools: [
      { id: 'data-filter', name: 'Data Filter', icon: Filter, color: 'from-purple-100 to-purple-200' },
    ]
  },
  {
    name: 'Data Tools',
    tools: [
      { id: 'import-file', name: 'Import File', icon: Upload, color: 'from-indigo-100 to-indigo-200' },
      { id: 'export-file', name: 'Export File', icon: Download, color: 'from-cyan-100 to-cyan-200' },
    ]
  },
  {
    name: 'Creative Tools',
    tools: [
      { id: 'design-canvas', name: 'Design Canvas', icon: Paintbrush, color: 'from-pink-100 to-pink-200' },
      { id: 'shape-builder', name: 'Shape Builder', icon: Shapes, color: 'from-slate-100 to-slate-200' },
      { id: 'insights-generator', name: 'Insights Generator', icon: Sparkles, color: 'from-teal-100 to-teal-200' },
    ]
  }
];
