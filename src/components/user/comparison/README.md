# Comparison Module - Minimalist Design

This module has been redesigned with a clean, minimalist approach featuring a white background and subtle colors. The module is organized into a well-structured, modular architecture.

## 🎨 Design Philosophy

- **Clean White Background**: Pure white (#ffffff) base for maximum clarity
- **Minimal Color Palette**: 
  - Primary text: Gray-900 (#111827)
  - Secondary text: Gray-600 (#4b5563) and Gray-500 (#6b7280)
  - Borders: Gray-200 (#e5e7eb) and Gray-100 (#f3f4f6)
  - Accent: Simple gray-900 (#111827) for highlights
  - Success/Error: Clean green (#10b981) and red (#ef4444)
- **Subtle Interactions**: Minimal hover states and transitions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Generous whitespace for breathing room

## 📁 Folder Structure

```
src/components/user/comparison/
├── ComparisonMainPage.tsx          # Main component (clean & minimal)
├── index.ts                        # Main module exports
├── components/                     # UI Components
│   ├── index.ts
│   ├── ComparisonHeader.tsx        # Minimal header with subtle styling
│   ├── ComparisonSelection.tsx     # Clean selection interface
│   ├── ComparisonTable.tsx         # Simple table layout
│   ├── ComparisonTableHeader.tsx   # Minimal table header
│   ├── AttributeRow.tsx            # Clean attribute rows
│   └── ComparisonSummaryFooter.tsx # Simple summary display
├── hooks/                          # Custom hooks
│   ├── index.ts
│   └── useComparison.ts
├── types/                          # TypeScript interfaces
│   └── index.ts
├── constants/                      # Static data and configurations
│   └── index.ts
└── utils/                          # Utility functions
    └── index.ts
```

## 🧩 Components (Redesigned)

### Main Components
- **ComparisonMainPage**: Clean container with white background
- **ComparisonHeader**: Minimal header with simple navigation
- **ComparisonSelection**: Clean selection cards with subtle borders
- **ComparisonTable**: Simple table with minimal styling

### Sub Components
- **ComparisonTableHeader**: Clean header with gray background and expansion hints
- **AttributeRow**: Expandable rows with detailed metrics comparison
- **DetailedMetricsExpansion**: Comprehensive metrics breakdown with categories
- **ComparisonSummaryFooter**: Simple summary with clean badges

## 🎯 Design Features

### Color Scheme
- **Background**: Pure white (`bg-white`)
- **Text**: Dark gray (`text-gray-900`, `text-gray-600`, `text-gray-500`)
- **Borders**: Light gray (`border-gray-200`, `border-gray-100`)
- **Accents**: Simple gray-900 highlights
- **Interactive States**: Subtle hover effects (`hover:bg-gray-50`)

### Typography
- **Headers**: Clean sans-serif fonts
- **Body Text**: Readable medium weights
- **Hierarchy**: Clear size and weight distinctions

### Spacing
- **Padding**: Reduced from large (`p-6`) to medium (`p-4`)
- **Margins**: Minimal spacing for clean appearance
- **Grid Gaps**: Consistent 4-unit spacing

### Interactive Elements
- **Buttons**: Clean borders with subtle hover states
- **Cards**: Simple white cards with minimal shadows
- **Icons**: Smaller, cleaner icons (16px vs 20px)

## 🎣 Hooks

- **useComparison**: Custom hook that manages all comparison state and logic
  - `numberOfTpos`: Number of selected TPO events
  - `columns`: Comparison data for each column
  - `handleNumberSelection`: Function to select number of events
  - `resetComparison`: Function to reset the comparison
  - `toggleAttribute`: Function to toggle attribute values

## 📝 Types

- **ComparisonColumn**: Interface for comparison column data
- **ComparisonState**: Interface for overall comparison state
- **ComparisonSummary**: Interface for summary calculations

## 🔧 Utils

- **generateRandomAttributes**: Generates random attribute data for demo
- **generateComparisonColumns**: Creates comparison columns with random data
- **calculateComparisonSummary**: Calculates percentage and totals for summary

## 📊 Constants

- **defaultAttributes**: Array of attribute names
- **COMPARISON_OPTIONS**: Available comparison options [2, 3, 4, 5]
- **MAX_COMPARISON_ITEMS**: Maximum number of items to compare
- **MIN_COMPARISON_ITEMS**: Minimum number of items to compare

## 🚀 Benefits of Minimalist Design

1. **Clarity**: Clean focus on content without distractions
2. **Performance**: Reduced visual complexity improves loading
3. **Accessibility**: High contrast and clear typography
4. **Scalability**: Simple design scales well across devices
5. **Maintainability**: Fewer styling complexities to manage
6. **Timeless**: Minimalist design doesn't go out of style

## 💡 Usage

```tsx
import { ComparisonMainPage } from '@/components/user/comparison'

// Clean, minimalist comparison interface
function App() {
  return <ComparisonMainPage />
}

// Or import specific components
import { 
  ComparisonHeader, 
  ComparisonTable, 
  useComparison 
} from '@/components/user/comparison'
```

## 🔄 Migration Notes

### Visual Changes Made:
- Removed gradient backgrounds → Pure white background
- Simplified color palette → Gray scale with minimal accents
- Reduced shadows and effects → Subtle borders and minimal shadows
- Smaller interactive elements → Cleaner, more focused UI
- Simplified animations → Faster, subtler transitions
- Clean typography → Better readability and hierarchy

### Component Size Reductions:
- Icons: 20px → 16px
- Padding: 6 units → 4 units
- Buttons: Larger → Compact sizing
- Cards: Heavy shadows → Minimal borders
- Animations: Complex → Simple fade/slide effects

The result is a clean, professional, and highly usable interface that focuses on functionality over visual complexity.
