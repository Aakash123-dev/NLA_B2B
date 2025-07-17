'use client'

import { CanvasNode, Connection } from '@/app/user/design-studio/types'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Eye, 
  Download, 
  Settings, 
  RefreshCw,
  Filter,
  ChevronDown,
  Lightbulb
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart as RechartLineChart,
  Line,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Sector,
  ScatterChart,
  Scatter,
  ZAxis,
  Area,
  AreaChart
} from 'recharts'

interface Template {
  id: string
  name: string
  description: string
  category: string
}

// Sample retailers from screenshots
const retailers = [
  { id: 'alb-s', name: 'Alb S' },
  { id: 'jewel', name: 'Jewel' },
  { id: 'schnucks', name: 'Schnucks' },
  { id: 'target', name: 'Target' },
  { id: 'wmt-chicago', name: 'WMT Chicago' },
  { id: 'wmt-dallas', name: 'WMT Dallas' },
  { id: 'wmt-mn', name: 'WMT MN' },
]

// Sample brands from screenshots
const brands = [
  { id: 'black-rifle', name: 'BLACK RIFLE COFFEE COMPANY' },
  { id: 'camerons', name: 'CAMERONS' },
  { id: 'caribou', name: 'CARIBOU COFFEE' },
  { id: 'death-wish', name: 'DEATH WISH COFFEE CO' },
  { id: 'eight-o-clock', name: 'EIGHT O CLOCK' },
  { id: 'gevalia', name: 'GEVALIA' },
  { id: 'illy', name: 'ILLY' },
]

// Insight types from screenshots
const insightTypes = [
  { id: 'base-1', name: 'What is the price across all products by retailers? test', category: 'base' },
  { id: 'base-2', name: 'What is the price slope of our products?', category: 'base' },
  { id: 'base-3', name: 'How sensitive are our products to base price changes?', category: 'base' },
  { id: 'base-4', name: 'What is the volume and dollar impact of changing base price?', category: 'base' },
  { id: 'promo-5', name: 'What is the relationship between average price and volume of our products?', category: 'promo' },
  { id: 'promo-6', name: 'How sensitive are our products to promotions?', category: 'promo' },
  { id: 'promo-7', name: 'What is the lift by each merchandise type?', category: 'promo' },
]

const chartTypes = [
  { id: 'bar', name: 'Bar Chart', icon: BarChart3 },
  { id: 'line', name: 'Line Chart', icon: LineChart },
  { id: 'pie', name: 'Pie Chart', icon: PieChart },
  { id: 'trend', name: 'Trend Analysis', icon: TrendingUp },
]

const colorSchemes = [
  { id: 'default', name: 'Default Blue', colors: ['#3b82f6', '#1d4ed8', '#1e40af'] },
  { id: 'green', name: 'Green Theme', colors: ['#10b981', '#059669', '#047857'] },
  { id: 'purple', name: 'Purple Theme', colors: ['#8b5cf6', '#7c3aed', '#6d28d9'] },
  { id: 'orange', name: 'Orange Theme', colors: ['#f59e0b', '#d97706', '#b45309'] },
]

// Sample product variants from screenshots
const productVariants = [
  { id: 'just-black-ground', name: 'BLACK RIFLE COFFEE COMPANY JUST BLACK GROUND COFFEE NON ORGANIC FOIL BAG 12 OZ' },
  { id: 'loyalty-roast', name: 'BLACK RIFLE COFFEE COMPANY LOYALTY ROAST GROUND COFFEE NON ORGANIC FOIL BAG 12 OZ' },
  { id: 'spirit-of-76', name: 'BLACK RIFLE COFFEE COMPANY SPIRIT OF 76 GROUND COFFEE NON ORGANIC FOIL BAG 12 OZ' },
  { id: 'tactisquatch', name: 'BLACK RIFLE COFFEE COMPANY TACTISQUATCH GROUND COFFEE NON ORGANIC FOIL BAG 12 OZ' },
  { id: 'jamaican-blue', name: 'CAMERONS JAMAICAN BLUE MOUNTAIN BLEND GROUND COFFEE NON ORGANIC BAG 12 OZ' },
  { id: 'caribou-blend-medium', name: 'CARIBOU COFFEE CARIBOU BLEND GROUND COFFEE NON ORGANIC PACKAGE 12 OZ' },
]

// Sample time periods for filtering
const timePeriods = [
  { id: 'last-30-days', name: 'Last 30 Days' },
  { id: 'last-90-days', name: 'Last 90 Days' },
  { id: 'last-6-months', name: 'Last 6 Months' },
  { id: 'last-12-months', name: 'Last 12 Months' },
  { id: 'ytd', name: 'Year to Date' },
  { id: 'custom', name: 'Custom Range' },
]

// Sample categories for filtering
const categories = [
  { id: 'ground-coffee', name: 'Ground Coffee' },
  { id: 'whole-bean', name: 'Whole Bean' },
  { id: 'k-cups', name: 'K-Cups' },
  { id: 'instant-coffee', name: 'Instant Coffee' },
  { id: 'cold-brew', name: 'Cold Brew' }
]

// Enhanced price comparison data with more detailed information
const priceComparisonData = [
  { retailer: 'Alb S', price: 15.99, volume: 120, product: 'Just Black Ground', size: '12 OZ' },
  { retailer: 'Alb S', price: 16.49, volume: 85, product: 'Loyalty Roast', size: '12 OZ' },
  { retailer: 'Alb S', price: 17.29, volume: 65, product: 'Spirit of 76', size: '12 OZ' },
  { retailer: 'Alb S', price: 16.79, volume: 90, product: 'Tactisquatch', size: '12 OZ' },
  { retailer: 'Jewel', price: 17.49, volume: 150, product: 'Just Black Ground', size: '12 OZ' },
  { retailer: 'Jewel', price: 17.99, volume: 110, product: 'Loyalty Roast', size: '12 OZ' },
  { retailer: 'Jewel', price: 18.49, volume: 80, product: 'Spirit of 76', size: '12 OZ' },
  { retailer: 'Jewel', price: 17.99, volume: 95, product: 'Tactisquatch', size: '12 OZ' },
  { retailer: 'Target', price: 16.29, volume: 180, product: 'Just Black Ground', size: '12 OZ' },
  { retailer: 'Target', price: 16.99, volume: 130, product: 'Loyalty Roast', size: '12 OZ' },
  { retailer: 'Target', price: 17.49, volume: 95, product: 'Spirit of 76', size: '12 OZ' },
  { retailer: 'WMT Chicago', price: 15.89, volume: 200, product: 'Just Black Ground', size: '12 OZ' },
  { retailer: 'WMT Chicago', price: 16.39, volume: 150, product: 'Loyalty Roast', size: '12 OZ' },
  { retailer: 'WMT Dallas', price: 16.79, volume: 140, product: 'Just Black Ground', size: '12 OZ' },
  { retailer: 'WMT Dallas', price: 17.29, volume: 110, product: 'Loyalty Roast', size: '12 OZ' },
]

// Sample price slope data with more size options
const priceSlopeData = [
  { size: '2.00 OZ', price: 4.99, product: 'Just Black Ground' },
  { size: '4.00 OZ', price: 8.99, product: 'Just Black Ground' },
  { size: '6.00 OZ', price: 10.99, product: 'Just Black Ground' },
  { size: '8.00 OZ', price: 12.99, product: 'Just Black Ground' },
  { size: '10.00 OZ', price: 14.99, product: 'Just Black Ground' },
  { size: '12.00 OZ', price: 16.99, product: 'Just Black Ground' },
]

// Enhanced price sensitivity data with more price points
const sensitivityData = [
  { price: 12.99, volume: 300, profit: 3897, elasticity: -1.2 },
  { price: 13.99, volume: 275, profit: 3847, elasticity: -1.3 },
  { price: 14.99, volume: 250, profit: 3747, elasticity: -1.4 },
  { price: 15.99, volume: 225, profit: 3598, elasticity: -1.6 },
  { price: 16.99, volume: 200, profit: 3398, elasticity: -1.8 },
  { price: 17.99, volume: 170, profit: 3058, elasticity: -2.0 },
  { price: 18.99, volume: 120, profit: 2278, elasticity: -2.5 },
  { price: 19.99, volume: 95, profit: 1899, elasticity: -2.8 },
  { price: 20.99, volume: 80, profit: 1679, elasticity: -3.0 }
]

// Enhanced merchandising lift data with more types
const merchandisingData = [
  { type: 'End Cap', lift: 35, revenue: 12500, cost: 1800, roi: 6.94 },
  { type: 'Front Shelf', lift: 28, revenue: 9800, cost: 1200, roi: 8.16 },
  { type: 'TPR', lift: 22, revenue: 7600, cost: 950, roi: 8.00 },
  { type: 'BOGO', lift: 45, revenue: 15800, cost: 4200, roi: 3.76 },
  { type: 'Special Pack', lift: 18, revenue: 6300, cost: 850, roi: 7.41 },
  { type: 'In-Store Display', lift: 31, revenue: 10900, cost: 1600, roi: 6.81 },
  { type: 'Digital Coupon', lift: 26, revenue: 9100, cost: 780, roi: 11.67 },
]

export default function InsightsNodeConfig({
  node,
  nodes,
  connections,
  onOpenNodeTab,
  template,
}: {
  node: CanvasNode
  nodes?: CanvasNode[]
  connections?: Connection[]
  onOpenNodeTab?: (nodeId: string) => void
  template?: Template
}) {
  const [selectedChartType, setSelectedChartType] = useState('bar')
  const [selectedColorScheme, setSelectedColorScheme] = useState('default')
  const [selectedInsightType, setSelectedInsightType] = useState('base-1')
  const [selectedBrand, setSelectedBrand] = useState('black-rifle')
  const [selectedRetailer, setSelectedRetailer] = useState('all')
  const [title, setTitle] = useState(template?.name || 'Insight Analysis')
  const [description, setDescription] = useState(template?.description || '')
  const [showLegend, setShowLegend] = useState(true)
  const [showDataLabels, setShowDataLabels] = useState(false)
  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState('60')
  const [dataView, setDataView] = useState('chart') // 'chart' or 'table'
  const [activeDataTab, setActiveDataTab] = useState('graph') // 'graph' or 'data'
  const [filterText, setFilterText] = useState('')
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>(['alb-s', 'jewel']) // Default selected retailers
  const [dataViewType, setDataViewType] = useState('product') // 'product' or 'retailer'
  
  // Filter data by selected brand or retailer if needed
  const filterDataBySelection = () => {
    if (selectedRetailer !== 'all' && selectedInsightType === 'base-1') {
      return priceComparisonData.filter(item => item.retailer === selectedRetailer);
    }
    return null; // No filtering needed
  }

  // Get appropriate data based on insight type with enhanced details
  const getChartData = () => {
    // Get filtered data if applicable
    const filteredData = filterDataBySelection();
    
    switch (selectedInsightType) {
      case 'base-1':
        // Price comparison by retailer for BLACK RIFLE COFFEE products
        // Filter by product if needed and show multiple values by retailer
        if (filteredData) {
          // Just showing one retailer with multiple products
          return filteredData.map(item => ({
            name: item.product.split(' ').slice(0, 2).join(' '), // Shortened product name
            value: item.price,
            fullName: item.product,
            volume: item.volume,
            size: item.size
          }));
        }
        
        // Get data based on the selected view type (product or retailer)
        if (dataViewType === 'retailer') {
          // Show all products for selected retailers
          const filteredRetailers = selectedRetailers.length > 0 
            ? selectedRetailers 
            : ['alb-s', 'jewel'];
          
          // Group by retailer and calculate average price
          const retailerData = filteredRetailers.map(retailerId => {
            const retailerName = retailers.find(r => r.id === retailerId)?.name || retailerId;
            const retailerProducts = priceComparisonData.filter(
              item => item.retailer.toLowerCase().replace(' ', '-') === retailerId
            );
            
            const avgPrice = retailerProducts.length > 0
              ? retailerProducts.reduce((sum, item) => sum + item.price, 0) / retailerProducts.length
              : 0;
            
            const totalVolume = retailerProducts.reduce((sum, item) => sum + item.volume, 0);
            
            return {
              name: retailerName,
              value: parseFloat(avgPrice.toFixed(2)),
              volume: totalVolume,
              products: retailerProducts.length,
              retailerId
            };
          });
          
          return retailerData;
        } else {
          // Show specific product across selected retailers - focus on BLACK RIFLE products
          const filteredProducts = priceComparisonData.filter(item => {
            // If retailers are selected, filter by them
            if (selectedRetailers.length > 0) {
              return selectedRetailers.some(r => 
                item.retailer.toLowerCase().replace(' ', '-') === r
              );
            }
            // Default to Alb S and Jewel
            return item.retailer === 'Alb S' || item.retailer === 'Jewel';
          });
          
          // Group products for BLACK RIFLE COFFEE
          const blackRifleProducts = filteredProducts.filter(
            item => item.product.includes('Black') || item.product.includes('BLACK')
          );
          
          return blackRifleProducts.map(item => ({
            name: item.retailer,
            value: item.price,
            volume: item.volume,
            product: item.product,
            size: item.size
          }));
        }
        
      case 'base-2':
        // Price slope showing price/oz relationship
        return priceSlopeData.map(item => ({
          name: item.size,
          value: item.price,
          product: item.product,
          pricePerOz: parseFloat((item.price / parseFloat(item.size)).toFixed(2))
        }));
        
      case 'base-3':
        // Price sensitivity - show more metrics
        return sensitivityData.map(item => ({
          name: `$${item.price}`,
          value: item.volume,
          profit: item.profit,
          elasticity: item.elasticity
        }));
        
      case 'promo-5':
        // Price-volume relationship
        return sensitivityData.map(item => ({
          name: `$${item.price}`,
          value: item.volume,
          profit: item.profit,
          elasticity: item.elasticity
        }));
        
      case 'promo-7':
        // Merchandising lift with ROI data
        return merchandisingData.map(item => ({
          name: item.type,
          value: item.lift,
          revenue: item.revenue,
          cost: item.cost,
          roi: item.roi
        }));
        
      default:
        return priceComparisonData
          .filter(item => item.retailer === 'Alb S' || item.retailer === 'Jewel')
          .map(item => ({
            name: item.retailer,
            value: item.price,
            volume: item.volume,
            product: item.product
          }));
    }
  }

  const chartData = getChartData()

  const getChartIcon = (chartId: string) => {
    const chart = chartTypes.find(c => c.id === chartId)
    return chart ? chart.icon : BarChart3
  }

  const getCurrentColors = () => {
    const scheme = colorSchemes.find(c => c.id === selectedColorScheme)
    return scheme ? scheme.colors : colorSchemes[0].colors
  }
  
  const getInsightTitle = () => {
    const insight = insightTypes.find(i => i.id === selectedInsightType)
    return insight ? insight.name : 'Insight Analysis'
  }

  // Update the title when insight type changes
  useEffect(() => {
    setTitle(getInsightTitle())
  }, [selectedInsightType])

  // ChartSelector component to easily switch between chart types
  const ChartSelector = ({
    selectedChartType,
    setSelectedChartType,
    chartTypes
  }: {
    selectedChartType: string,
    setSelectedChartType: (type: string) => void,
    chartTypes: { id: string, name: string, icon: React.ElementType }[]
  }) => {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {chartTypes.map((chart) => {
          const Icon = chart.icon;
          return (
            <Button
              key={chart.id}
              variant="ghost"
              size="sm"
              className={`h-9 gap-1 ${
                selectedChartType === chart.id 
                  ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => setSelectedChartType(chart.id)}
            >
              <Icon className={`h-4 w-4 ${selectedChartType === chart.id ? 'text-primary' : ''}`} />
              <span>{chart.name}</span>
            </Button>
          );
        })}
      </div>
    );
  };

  // A component to display retailer comparison options
  const RetailerComparisonControls = ({
    retailers,
    selectedRetailers,
    setSelectedRetailers
  }: {
    retailers: { id: string, name: string }[],
    selectedRetailers: string[],
    setSelectedRetailers: (retailers: string[]) => void
  }) => {
    const toggleRetailer = (retailerId: string) => {
      if (selectedRetailers.includes(retailerId)) {
        setSelectedRetailers(selectedRetailers.filter(id => id !== retailerId));
      } else {
        setSelectedRetailers([...selectedRetailers, retailerId]);
      }
    };

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {retailers.map((retailer) => (
          <Button
            key={retailer.id}
            variant={selectedRetailers.includes(retailer.id) ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => toggleRetailer(retailer.id)}
          >
            {retailer.name}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-foreground">
            {node.name}
            {node.version && ` v${node.version}`} - Insights Configuration
          </CardTitle>
          <CardDescription>
            {template ? `Template: ${template.name}` : 'Custom insight visualization'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Basic Settings</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-muted-foreground">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background/50 border-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand-selector" className="text-muted-foreground">Brand</Label>
                <Select
                  value={selectedBrand}
                  onValueChange={setSelectedBrand}
                >
                  <SelectTrigger className="bg-background/50 border-primary/20">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="refresh" className="text-muted-foreground">Auto-refresh (seconds)</Label>
                <Input
                  id="refresh"
                  type="number"
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(e.target.value)}
                  className="bg-background/50 border-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insight-focus" className="text-muted-foreground">Focus</Label>
                <Select defaultValue="price">
                  <SelectTrigger className="bg-background/50 border-primary/20">
                    <SelectValue placeholder="Select focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="volume">Volume</SelectItem>
                    <SelectItem value="profit">Profit</SelectItem>
                    <SelectItem value="elasticity">Elasticity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-muted-foreground">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background/50 border-primary/20"
                rows={3}
              />
            </div>
          </div>

          {/* Insight Type Selection */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Insight Type</h4>
            
            <Tabs defaultValue="base" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="base">Base Price Analysis</TabsTrigger>
                <TabsTrigger value="promo">Promotion Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="base" className="space-y-4">
                {insightTypes
                  .filter(insight => insight.category === 'base')
                  .map(insight => (
                    <div 
                      key={insight.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedInsightType === insight.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border/40 hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedInsightType(insight.id)}
                    >
                      <div className="flex items-start space-x-2">
                        <div className={`rounded-full w-5 h-5 mt-0.5 flex items-center justify-center ${
                          selectedInsightType === insight.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {insight.id.split('-')[1]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{insight.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="promo" className="space-y-4">
                {insightTypes
                  .filter(insight => insight.category === 'promo')
                  .map(insight => (
                    <div 
                      key={insight.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedInsightType === insight.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border/40 hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedInsightType(insight.id)}
                    >
                      <div className="flex items-start space-x-2">
                        <div className={`rounded-full w-5 h-5 mt-0.5 flex items-center justify-center ${
                          selectedInsightType === insight.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {insight.id.split('-')[1]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{insight.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Chart Configuration */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Chart Configuration</h4>
            
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Chart Type</Label>
                <ChartSelector 
                  selectedChartType={selectedChartType} 
                  setSelectedChartType={setSelectedChartType} 
                  chartTypes={chartTypes} 
                />
              </div>

              <div>
                <Label className="text-muted-foreground">Color Scheme</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {colorSchemes.map((scheme) => (
                    <Button
                      key={scheme.id}
                      variant={selectedColorScheme === scheme.id ? "default" : "outline"}
                      className={`h-auto p-3 flex-col space-y-2 ${
                        selectedColorScheme === scheme.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background/50 border-primary/20'
                      }`}
                      onClick={() => setSelectedColorScheme(scheme.id)}
                    >
                      <div className="flex space-x-1">
                        {scheme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-xs">{scheme.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Display Options */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Display Options</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Show Legend</Label>
                  <p className="text-sm text-muted-foreground">Display chart legend</p>
                </div>
                <Switch checked={showLegend} onCheckedChange={setShowLegend} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Show Data Labels</Label>
                  <p className="text-sm text-muted-foreground">Display values on chart elements</p>
                </div>
                <Switch checked={showDataLabels} onCheckedChange={setShowDataLabels} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Enable Animations</Label>
                  <p className="text-sm text-muted-foreground">Animate chart transitions</p>
                </div>
                <Switch checked={animationEnabled} onCheckedChange={setAnimationEnabled} />
              </div>
            </div>
          </div>

          {/* Data Filters */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Data Filters</h4>
            
            <div className="space-y-2">
              <Label htmlFor="filter" className="text-muted-foreground">Filter Expression</Label>
              <Input
                id="filter"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="e.g., value > 100 AND trend > 0"
                className="bg-background/50 border-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Use SQL-like expressions to filter data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time-period" className="text-muted-foreground">Time Period</Label>
                <Select
                  defaultValue="last-30-days"
                >
                  <SelectTrigger className="bg-background/50 border-primary/20">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timePeriods.map((period) => (
                      <SelectItem key={period.id} value={period.id}>
                        {period.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-muted-foreground">Category</Label>
                <Select
                  defaultValue="ground-coffee"
                >
                  <SelectTrigger className="bg-background/50 border-primary/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-variant" className="text-muted-foreground">Product Variant</Label>
              <Select
                defaultValue="just-black-ground"
              >
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue placeholder="Select product variant" />
                </SelectTrigger>
                <SelectContent>
                  {productVariants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand-selector" className="text-muted-foreground">Brand</Label>
              <Select
                value={selectedBrand}
                onValueChange={setSelectedBrand}
              >
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retailer-selector" className="text-muted-foreground">Retailer</Label>
              <Select
                value={selectedRetailer}
                onValueChange={setSelectedRetailer}
              >
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue placeholder="Select retailer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Retailers</SelectItem>
                  {retailers.map((retailer) => (
                    <SelectItem key={retailer.id} value={retailer.id}>
                      {retailer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-foreground">Preview</h4>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setDataView('chart')}
                  className={cn(
                    "p-1 h-8",
                    dataView === 'chart' && "bg-muted"
                  )}
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Chart
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setDataView('table')}
                  className={cn(
                    "p-1 h-8",
                    dataView === 'table' && "bg-muted"
                  )}
                >
                  <LineChart className="h-4 w-4 mr-1" />
                  Table
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="p-1 h-8"
                  onClick={() => {}}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Card className="border-primary/20 bg-background/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{title}</CardTitle>
                    {description && (
                      <CardDescription className="text-sm mt-1">{description}</CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedInsightType.split('-')[0].toUpperCase()}
                    </Badge>
                    {selectedBrand === 'black-rifle' && (
                      <Badge variant="secondary" className="bg-black text-white text-xs">
                        BLACK RIFLE
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {brands.find(b => b.id === selectedBrand)?.name || 'All Brands'}
                    </Badge>
                    {selectedRetailer !== 'all' && (
                      <Badge variant="secondary" className="text-xs">
                        {retailers.find(r => r.id === selectedRetailer)?.name}
                      </Badge>
                    )}
                    {selectedInsightType === 'base-1' && (
                      <div className="flex items-center mt-2 gap-2">
                        <label className="inline-flex items-center">
                          <input 
                            type="radio" 
                            className="h-3 w-3 text-primary" 
                            name="viewType" 
                            checked={dataViewType === 'product'}
                            onChange={() => setDataViewType('product')}
                          />
                          <span className="ml-1 text-xs text-muted-foreground">Product View</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input 
                            type="radio" 
                            className="h-3 w-3 text-primary" 
                            name="viewType"
                            checked={dataViewType === 'retailer'} 
                            onChange={() => setDataViewType('retailer')}
                          />
                          <span className="ml-1 text-xs text-muted-foreground">Retailer View</span>
                        </label>
                      </div>
                    )}
                  </div>
                  {selectedInsightType === 'base-1' && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Compare with competitors
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-end">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Generate Summary
                  </Button>
                </div>
                <Tabs value={activeDataTab} onValueChange={setActiveDataTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="graph">Graph</TabsTrigger>
                    <TabsTrigger value="data">Data Table</TabsTrigger>
                  </TabsList>
                  <TabsContent value="graph">
                    <div className="mb-4 border-b pb-3">
                      <ChartSelector 
                        selectedChartType={selectedChartType} 
                        setSelectedChartType={setSelectedChartType} 
                        chartTypes={chartTypes}
                      />
                      
                      {selectedInsightType === 'base-1' && (
                        <div className="mt-3">
                          <div className="text-xs text-muted-foreground mb-2 flex justify-between items-center">
                            <span>Select retailers to compare:</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => setSelectedRetailers(['alb-s', 'jewel'])}
                            >
                              Reset to Alb S & Jewel
                            </Button>
                          </div>
                          <RetailerComparisonControls
                            retailers={retailers}
                            selectedRetailers={selectedRetailers}
                            setSelectedRetailers={setSelectedRetailers}
                          />
                        </div>
                      )}
                    </div>
                    
                    {dataView === 'chart' ? (
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          {(() => {
                            switch(selectedChartType) {
                              case 'bar':
                                return (
                                  <BarChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    {showLegend && <Legend />}
                                    {showDataLabels && <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />}
                                    <Bar 
                                      dataKey="value"
                                      fill={getCurrentColors()[0]} 
                                      radius={[4, 4, 0, 0]}
                                      animationDuration={animationEnabled ? 1500 : 0}
                                    >
                                      {showDataLabels && chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getCurrentColors()[index % getCurrentColors().length]} />
                                      ))}
                                    </Bar>
                                  </BarChart>
                                );
                              case 'line':
                                return (
                                  <RechartLineChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <defs>
                                      <filter id="shadow" height="200%">
                                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={getCurrentColors()[0]} />
                                      </filter>
                                    </defs>
                                    {showLegend && <Legend />}
                                    {showDataLabels && <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />}
                                    <Line 
                                      type="monotone" 
                                      dataKey="value"
                                      stroke={getCurrentColors()[0]}
                                      strokeWidth={2}
                                      dot={{ r: 4, strokeWidth: 1 }}
                                      activeDot={{ r: 6, filter: 'url(#shadow)' }}
                                      animationDuration={animationEnabled ? 1500 : 0}
                                    />
                                  </RechartLineChart>
                                );
                              case 'pie':
                                return (
                                  <RechartPieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    {showDataLabels && <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />}
                                    {showLegend && <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />}
                                    <Pie
                                      data={chartData}
                                      cx="40%"
                                      cy="50%"
                                      labelLine={showDataLabels}
                                      outerRadius={80}
                                      innerRadius={showDataLabels ? 40 : 0} // Donut when labels shown
                                      paddingAngle={2}
                                      cornerRadius={3}
                                      fill="#8884d8"
                                      dataKey="value"
                                      nameKey="name"
                                      animationDuration={animationEnabled ? 1500 : 0}
                                      label={showDataLabels ? {
                                        fill: '#666',
                                        fontSize: 12
                                      } : undefined}
                                    >
                                      {chartData.map((entry, index) => (
                                        <Cell 
                                          key={`cell-${index}`} 
                                          fill={getCurrentColors()[index % getCurrentColors().length]} 
                                          strokeWidth={1}
                                        />
                                      ))}
                                    </Pie>
                                  </RechartPieChart>
                                );
                              case 'trend':
                                return (
                                  <AreaChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <defs>
                                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={getCurrentColors()[0]} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={getCurrentColors()[0]} stopOpacity={0.1}/>
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    {showLegend && <Legend />}
                                    {showDataLabels && <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />}
                                    <Area 
                                      type="monotone"
                                      dataKey="value"
                                      stroke={getCurrentColors()[0]}
                                      strokeWidth={2}
                                      fillOpacity={1}
                                      fill="url(#colorValue)"
                                      animationDuration={animationEnabled ? 1500 : 0}
                                    />
                                  </AreaChart>
                                );
                              default:
                                return (
                                  <BarChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    {showLegend && <Legend />}
                                    {showDataLabels && <Tooltip />}
                                    <Bar 
                                      dataKey="value"
                                      fill={getCurrentColors()[0]} 
                                      animationDuration={animationEnabled ? 1500 : 0}
                                    />
                                  </BarChart>
                                );
                            }
                          })()}
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="text-center space-y-2 p-12">
                        {React.createElement(getChartIcon(selectedChartType), { 
                          className: "h-12 w-12 mx-auto text-muted-foreground" 
                        })}
                        <p className="text-sm text-muted-foreground">Chart Preview (Table View)</p>
                      </div>
                    )}
                    
                    {showLegend && dataView === 'chart' && (
                      <div className="mt-4 flex justify-center space-x-4">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCurrentColors()[0] }}></div>
                          <span>
                            {selectedInsightType === 'base-1' ? 'Price ($)' : 
                             selectedInsightType === 'base-2' ? 'Price per Oz' :
                             selectedInsightType === 'promo-7' ? 'Lift (%)' : 'Volume'}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Insight summary */}
                    {selectedInsightType === 'base-1' && dataView === 'chart' && (
                      <div className="mt-6 border-t pt-4">
                        <div className="text-xs text-muted-foreground mb-2">Summary</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-3 bg-slate-50">
                            <div className="text-xs text-muted-foreground">Price Range</div>
                            <div className="text-base font-medium">
                              ${Math.min(...chartData.map(d => d.value))} - ${Math.max(...chartData.map(d => d.value))}
                            </div>
                            {dataViewType === 'retailer' && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Across {chartData.length} retailers
                              </div>
                            )}
                          </div>
                          <div className="border rounded-lg p-3 bg-slate-50">
                            <div className="text-xs text-muted-foreground">
                              {dataViewType === 'retailer' ? 'Best Value Retailer' : 'Pricing Insight'}
                            </div>
                            <div className="text-base font-medium">
                              {dataViewType === 'retailer' 
                                ? chartData.reduce((a, b) => a.value < b.value ? a : b).name
                                : 'BLACK RIFLE COFFEE COMPANY'}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {dataViewType === 'retailer' 
                                ? 'Lowest average price'
                                : `Best sellers at ${selectedRetailers.map(r => retailers.find(ret => ret.id === r)?.name).join(', ')}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="data">
                    <ScrollArea className="h-64 w-full rounded-md border">
                      <div className="p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left pb-2 text-sm font-medium text-muted-foreground">
                                {selectedInsightType === 'base-1' ? 'Retailer/Product' : 
                                 selectedInsightType === 'base-2' ? 'Size' :
                                 selectedInsightType === 'promo-7' ? 'Type' : 'Price'}
                              </th>
                              <th className="text-right pb-2 text-sm font-medium text-muted-foreground">
                                {selectedInsightType === 'base-1' ? 'Price ($)' : 
                                 selectedInsightType === 'base-2' ? 'Price ($)' :
                                 selectedInsightType === 'promo-7' ? 'Lift (%)' : 'Volume'}
                              </th>
                              {/* Additional columns based on insight type */}
                              {selectedInsightType === 'base-1' && (
                                <>
                                  <th className="text-right pb-2 text-sm font-medium text-muted-foreground">Volume</th>
                                  <th className="text-left pb-2 text-sm font-medium text-muted-foreground">Product</th>
                                </>
                              )}
                              {selectedInsightType === 'base-2' && (
                                <th className="text-right pb-2 text-sm font-medium text-muted-foreground">$/Oz</th>
                              )}
                              {(selectedInsightType === 'base-3' || selectedInsightType === 'promo-5') && (
                                <>
                                  <th className="text-right pb-2 text-sm font-medium text-muted-foreground">Profit ($)</th>
                                  <th className="text-right pb-2 text-sm font-medium text-muted-foreground">Elasticity</th>
                                </>
                              )}
                              {selectedInsightType === 'promo-7' && (
                                <>
                                  <th className="text-right pb-2 text-sm font-medium text-muted-foreground">Revenue ($)</th>
                                  <th className="text-right pb-2 text-sm font-medium text-muted-foreground">Cost ($)</th>
                                  <th className="text-right pb-2 text-sm font-medium text-muted-foreground">ROI</th>
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {chartData.map((row, index) => (
                              <tr 
                                key={index} 
                                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                              >
                                <td className="py-2 text-sm font-medium">
                                  {row.name}
                                </td>
                                <td className="py-2 text-sm text-right">
                                  {selectedInsightType === 'base-1' || selectedInsightType === 'base-2' 
                                    ? `$${row.value.toFixed(2)}` 
                                    : selectedInsightType === 'promo-7' 
                                      ? `${row.value}%` 
                                      : row.value}
                                </td>
                                
                                {/* Additional data columns based on insight type */}
                                {selectedInsightType === 'base-1' && (
                                  <>
                                    <td className="py-2 text-sm text-right">{'volume' in row ? row.volume : 'N/A'}</td>
                                    <td className="py-2 text-sm text-left">
                                      <div className="truncate max-w-[120px]" title={String('product' in row ? row.product : ('fullName' in row ? row.fullName : 'N/A'))}>
                                        {'product' in row ? row.product : ('fullName' in row ? row.fullName : 'N/A')}
                                      </div>
                                    </td>
                                  </>
                                )}
                                {selectedInsightType === 'base-2' && (
                                  <td className="py-2 text-sm text-right">{'pricePerOz' in row ? `$${row.pricePerOz.toFixed(2)}` : 'N/A'}</td>
                                )}
                                {(selectedInsightType === 'base-3' || selectedInsightType === 'promo-5') && (
                                  <>
                                    <td className="py-2 text-sm text-right">{'profit' in row ? `$${row.profit.toLocaleString()}` : 'N/A'}</td>
                                    <td className="py-2 text-sm text-right">{'elasticity' in row ? row.elasticity.toFixed(1) : 'N/A'}</td>
                                  </>
                                )}
                                {selectedInsightType === 'promo-7' && (
                                  <>
                                    <td className="py-2 text-sm text-right">{'revenue' in row ? `$${row.revenue.toLocaleString()}` : 'N/A'}</td>
                                    <td className="py-2 text-sm text-right">{'cost' in row ? `$${row.cost.toLocaleString()}` : 'N/A'}</td>
                                    <td className="py-2 text-sm text-right">{'roi' in row ? row.roi.toFixed(2) : 'N/A'}</td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <Eye className="w-4 h-4 mr-2" />
              Preview Full Chart
            </Button>
            <Button variant="outline" className="border-primary/20">
              <Download className="w-4 h-4 mr-2" />
              Export Configuration
            </Button>
            <Button variant="outline" className="border-primary/20">
              <Settings className="w-4 h-4 mr-2" />
              Advanced Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
