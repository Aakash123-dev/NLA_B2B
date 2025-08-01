# TPO Event Comparison Module

A comprehensive comparison tool for Trade Promotion Optimization (TPO) events, allowing users to analyze and compare multiple events across detailed metrics.

## 🎯 Features

- **Brand-based Filtering**: Select specific brands to compare their events
- **Comprehensive Metrics**: Compare events across Financial Details, Financial Results, and Promotion Results
- **Interactive Comparison**: Expandable rows for detailed metric analysis
- **Best Performer Identification**: Automatic identification of top-performing events
- **Responsive Design**: Clean, minimalist interface with mobile support

## 📁 Folder Structure

```
src/components/user/tpo-events-comparison/
├── TPOEventComparisonMainPage.tsx     # Main component
├── index.ts                           # Module exports
├── components/                        # UI Components
│   ├── index.ts
│   ├── TPOEventComparisonHeader.tsx   # Header with navigation
│   ├── TPOEventSelection.tsx          # Event selection interface
│   ├── TPOEventComparisonTable.tsx    # Main comparison table
│   ├── TPOEventComparisonTableHeader.tsx # Table header
│   ├── MetricRow.tsx                  # Individual metric rows
│   └── TPOEventComparisonSummaryFooter.tsx # Summary footer
├── hooks/                             # Custom hooks
│   ├── index.ts
│   └── useTPOEventComparison.ts      # Main comparison logic
├── types/                             # TypeScript interfaces
│   └── index.ts
├── constants/                         # Static data and configurations
│   └── index.ts
└── utils/                            # Utility functions
    └── index.ts
```

## 🧩 Components

### Main Components
- **TPOEventComparisonMainPage**: Main container managing the comparison flow
- **TPOEventComparisonHeader**: Navigation and branding header
- **TPOEventSelection**: Brand selection and event picker interface
- **TPOEventComparisonTable**: Comprehensive metrics comparison table

### Sub Components
- **TPOEventComparisonTableHeader**: Clean table header with performer indicators
- **MetricRow**: Expandable metric rows with detailed analysis
- **TPOEventComparisonSummaryFooter**: Performance summary and scores

## 📊 Metrics Categories

### Financial Details
- Base Price, Promo Price, Discount
- Units, List Price, Spoil Per Unit
- EDLP/Promo Unit Rates, Net Price
- COGS Per Unit, VCM, Fixed Fees

### Financial Results
- Gross Revenue, Total Spend
- Incremental Revenue/Profit, Sales ROI
- Retail Margins, Retail Profit
- Shared Profit, Retailer Funding %

### Promotion Results
- TPR metrics (ACV, Lift, Units, Dollars)
- Feature Only metrics
- Display Only metrics
- Feature and Display combined
- Event Incremental and Total metrics

## 🎣 Hooks

- **useTPOEventComparison**: Main hook managing comparison state
  - `selectedEvents`: Currently selected events
  - `numberOfEvents`: Count of selected events
  - `columns`: Comparison data columns
  - `selectedBrand`: Currently selected brand filter
  - `handleEventSelection`: Select events for comparison
  - `handleBrandSelection`: Filter by brand
  - `resetComparison`: Reset the comparison
  - `toggleMetric`: Toggle individual metrics

## 📝 Types

- **TPOEvent**: Complete event data structure
- **EventMetrics**: Comprehensive metrics for each event
- **ComparisonColumn**: Individual comparison column data
- **ComparisonState**: Overall comparison state management
- **ComparisonSummary**: Summary calculations

## 🔧 Utils

- **generateEventComparisonColumns**: Creates comparison columns from events
- **markBestPerformingColumn**: Identifies and marks top performer
- **formatMetricValue**: Formats values based on metric type
- **calculateComparisonSummary**: Generates performance summaries

## 📊 Constants

- **eventComparisonAttributes**: All available metrics for comparison
- **metricCategories**: Categorized metrics with styling
- **sampleTPOEvents**: Sample event data for demonstration
- **sampleBrands**: Available brands for filtering

## 🚀 Usage

```tsx
import { TPOEventComparisonMainPage } from '@/components/user/tpo-events-comparison'

// Complete TPO event comparison interface
function App() {
  return <TPOEventComparisonMainPage />
}

// Or import specific components
import { 
  TPOEventComparisonHeader, 
  TPOEventComparisonTable, 
  useTPOEventComparison 
} from '@/components/user/tpo-events-comparison'
```

## 🎨 Design Features

- **Clean Interface**: Minimalist design focused on data clarity
- **Brand-focused**: Brand selection as primary filter
- **Comprehensive Metrics**: All requested financial and promotional metrics
- **Performance Indicators**: Clear identification of best performers
- **Expandable Details**: Detailed analysis for each metric
- **Responsive Grid**: Adaptive layout for different screen sizes

## 🔄 Navigation

The module integrates seamlessly with the existing navigation:
- Added "TPO Events Comparison" to the main user navbar
- Accessible at `/user/tpo-events-comparison`
- Maintains consistent styling with existing modules
