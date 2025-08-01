# Simulator Comparison Feature

A comprehensive comparison tool for promo and price simulation scenarios, designed to help users analyze and compare multiple scenarios side by side without margin-related metrics.

## Overview

This feature allows users to:
- Select multiple promo and price simulation scenarios
- Compare key performance metrics excluding margins 
- Analyze scenarios side by side with configurable metric visibility
- Get insights on best performing scenarios
- Export comparison results

## Features

### 🎯 Multi-Scenario Selection
- **Interactive Selection**: Users can select 2-4 scenarios from a grid of available promo and price simulations
- **Smart Filtering**: Filter by scenario type (promo/price), brand, retailer, status, and search query
- **Visual Feedback**: Clear indication of selected scenarios with badges and selection summaries

### 📊 Side-by-Side Comparison
- **Categorized Metrics**: Metrics are organized into Performance, Financial, and Operational categories
- **Configurable Display**: Users can toggle visibility of individual metrics
- **Best Performance Indicators**: Automatically highlights the best performing scenario for key metrics
- **Expandable Sections**: Collapsible metric categories for better organization

### 🏷️ Promo Scenario Metrics
- Base Price & Promo Price
- Discount Percentage
- Projected & Actual Revenue
- Projected & Actual Units
- ROI & Sales Lift
- Event Type & Duration
- Status tracking

### 💰 Price Scenario Metrics
- Current Price & New Price
- Price Change Percentage
- Projected & Actual Revenue
- Projected & Actual Units
- Price Elasticity
- Competitor Response
- Simulation Type & Status

### 💡 Smart Insights
- Automatically generated comparison insights
- Best performing scenario identification
- Revenue and unit performance analysis
- Type-specific performance comparisons

## File Structure

```
src/components/user/simulator-comparison/
├── SimulatorComparisonPage.tsx          # Main page component
├── components/
│   ├── SimulatorScenarioSelection.tsx   # Scenario selection screen
│   ├── SimulatorComparisonTable.tsx     # Comparison table display
│   └── index.ts                         # Component exports
├── hooks/
│   ├── useSimulatorComparison.ts        # Main comparison hook
│   └── index.ts                         # Hook exports
├── types/
│   └── index.ts                         # TypeScript interfaces
├── constants/
│   └── index.ts                         # Constants and configurations
├── utils/
│   └── index.ts                         # Utility functions
└── index.ts                             # Main module exports
```

## Usage

### Accessing the Feature
1. Navigate to the user dashboard
2. Click on "Simulator Comparison" from the Products section
3. Or directly access via `/user/simulator-comparison`

### Comparing Scenarios
1. **Selection Phase**: 
   - Browse available promo and price scenarios
   - Use filters to narrow down options
   - Select 2-4 scenarios to compare
   - Click "Compare Scenarios"

2. **Comparison Phase**:
   - View side-by-side comparison table
   - Toggle metric visibility using the controls
   - Expand/collapse metric categories
   - Review insights and best performing indicators
   - Start new comparison or go back to selection

### Key Interactions
- **Search**: Real-time search across scenario names, brands, retailers, and products
- **Filters**: Filter by status, sort by name/date/revenue
- **Tabs**: Switch between All, Promo, and Price scenarios
- **Selection**: Multi-select with visual feedback and limits
- **Metric Controls**: Toggle individual metric visibility
- **Category Expansion**: Expand/collapse metric groups

## Data Structure

### Sample Promo Scenario
```typescript
{
  id: 'promo-sim-001',
  name: 'Summer Flash Sale Campaign',
  brand: 'Brand Alpha',
  retailer: 'Target',
  product: 'Product X Premium',
  basePrice: 29.99,
  promoPrice: 22.99,
  discountPercent: 23.3,
  startDate: '2024-06-01',
  endDate: '2024-06-15',
  eventType: 'TPR',
  status: 'Completed',
  projectedRevenue: 285000,
  actualRevenue: 312000,
  projectedUnits: 12500,
  actualUnits: 13600,
  roi: 18.2,
  lift: 25.4
}
```

### Sample Price Scenario
```typescript
{
  id: 'price-sim-001',
  name: 'Competitive Price Adjustment',
  brand: 'Brand Alpha',
  retailer: 'Target',
  product: 'Product X Premium',
  currentPrice: 29.99,
  newPrice: 27.99,
  priceChangePercent: -6.7,
  effectiveDate: '2024-07-01',
  simulationType: 'Competitive Response',
  status: 'Active',
  projectedRevenue: 235000,
  projectedUnits: 8900,
  elasticity: -1.4,
  competitorResponse: 'Follow'
}
```

## Technical Implementation

### State Management
- Uses React hooks for local state management
- Centralized state in `useSimulatorComparison` hook
- Immutable state updates for predictable behavior

### Type Safety
- Full TypeScript implementation
- Separate interfaces for different scenario types
- Strong typing for all props and state

### Performance
- Memoized computations for filtering and sorting
- Efficient re-renders using React.memo where appropriate
- Lazy loading and pagination ready

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

## Future Enhancements

### Planned Features
- [ ] Export to CSV/Excel functionality
- [ ] Chart visualizations for metrics
- [ ] Save comparison configurations
- [ ] Email sharing of comparisons
- [ ] Historical comparison tracking
- [ ] Benchmark against industry standards

### Potential Integrations
- [ ] Connect to real simulation data APIs
- [ ] Integration with existing TPO systems
- [ ] Real-time data updates
- [ ] Collaborative comparison sharing

## Contributing

When adding new features or modifying existing ones:

1. Update type definitions in `types/index.ts`
2. Add new constants to `constants/index.ts`
3. Create utility functions in `utils/index.ts`
4. Update the hook logic in `hooks/useSimulatorComparison.ts`
5. Modify UI components as needed
6. Update this documentation

## Design Patterns

The feature follows established patterns from the existing codebase:
- Component-based architecture
- Hook-based state management
- Utility function organization
- Consistent UI component usage
- Motion/animation integration
- Responsive design principles
