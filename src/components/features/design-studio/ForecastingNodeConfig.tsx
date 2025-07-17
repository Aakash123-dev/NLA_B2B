'use client'

// import { CanvasNode, Connection } from '@/app/user/design-studio/types'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { 
  CheckCircle2, 
  Link as LinkIcon, 
  TrendingUp, 
  BarChart4, 
  ArrowLeft,
  ArrowRight, 
  ChevronRight,
  Database,
  Settings2,
  LineChart,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CanvasNode, Connection } from '@/components/user/design-studio/types'

const databases = [
  { id: 'db1', name: 'Primary Database' },
  { id: 'db2', name: 'Analytics Warehouse' },
  { id: 'db3', name: 'Legacy System DB' },
]

const retailers = [
  { id: 'ret1', name: 'SuperMart' },
  { id: 'ret2', name: 'HyperStore' },
  { id: 'ret3', name: 'ValuePlus' },
  { id: 'ret4', name: 'Corner Shop' },
]

const brands = [
  { id: 'brand1', name: 'Brand A' },
  { id: 'brand2', name: 'Brand B' },
  { id: 'brand3', name: 'Brand C' },
]

const products = [
  { id: 'prod1', name: 'Product X' },
  { id: 'prod2', name: 'Product Y' },
  { id: 'prod3', name: 'Product Z' },
  { id: 'prod4', name: 'Product W' },
  { id: 'prod5', name: 'Product V' },
]

const availableColumns = [
  { id: 'col1', name: 'Sales_Units' },
  { id: 'col2', name: 'Sales_Value' },
  { id: 'col3', name: 'Historical_Demand' },
  { id: 'col4', name: 'Seasonal_Index' },
  { id: 'col5', name: 'Marketing_Events' },
  { id: 'col6', name: 'Economic_Indicators' },
]

const forecastingModels = [
  { id: 'arima', name: 'ARIMA', description: 'Auto-regressive integrated moving average' },
  { id: 'lstm', name: 'LSTM Neural Network', description: 'Long short-term memory deep learning' },
  { id: 'exponential', name: 'Exponential Smoothing', description: 'Triple exponential smoothing' },
  { id: 'prophet', name: 'Prophet', description: 'Facebook Prophet algorithm' },
]

const timeHorizons = [
  { id: 'week', name: '1 Week', periods: 1 },
  { id: 'month', name: '1 Month', periods: 4 },
  { id: 'quarter', name: '1 Quarter', periods: 12 },
  { id: 'halfyear', name: '6 Months', periods: 24 },
  { id: 'year', name: '1 Year', periods: 52 },
]

export default function ForecastingNodeConfig({
  node,
  nodes,
  connections,
  onOpenNodeTab,
}: {
  node: CanvasNode
  nodes: CanvasNode[]
  connections: Connection[]
  onOpenNodeTab: (nodeId: string) => void
}) {
  const [step, setStep] = useState(1)

  // Step 1 State
  const [selectedDatabase, setSelectedDatabase] = useState(databases[0].id)
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [forecastHorizon, setForecastHorizon] = useState('quarter')
  const [selectedModel, setSelectedModel] = useState('arima')
  const [confidenceLevel, setConfidenceLevel] = useState('95')

  // Step 2 State
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  // Step 4 State
  const [fetchProgress, setFetchProgress] = useState(0)
  const [modelProgress, setModelProgress] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [isModeling, setIsModeling] = useState(false)
  const [isFetchComplete, setIsFetchComplete] = useState(false)
  const [isModelComplete, setIsModelComplete] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isFetching && fetchProgress < 100) {
      timer = setTimeout(() => setFetchProgress(fetchProgress + 5), 100)
    } else if (fetchProgress >= 100) {
      setIsFetching(false)
      setIsFetchComplete(true)
    }
    return () => clearTimeout(timer)
  }, [isFetching, fetchProgress])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isModeling && modelProgress < 100) {
      timer = setTimeout(() => setModelProgress(modelProgress + 2), 100)
    } else if (modelProgress >= 100) {
        setIsModeling(false)
        setIsModelComplete(true)
        setStep(5)
    }
    return () => clearTimeout(timer)
  }, [isModeling, modelProgress])

  const handleSelection = (
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    id: string
  ) => {
    if (list.includes(id)) {
      setter(list.filter((item) => item !== id))
    } else {
      setter([...list, id])
    }
  }

  const resetAll = () => {
    setFetchProgress(0)
    setModelProgress(0)
    setIsFetching(false)
    setIsModeling(false)
    setIsFetchComplete(false)
    setIsModelComplete(false)
  }

  const handleRun = () => {
    setStep(4)
    resetAll()
    setIsFetching(true)
  }
  
  const handleRunModel = () => {
    setIsModeling(true)
  }

  const handleCancel = () => {
    resetAll()
    setStep(3)
  }
  
  const getSelectedNames = (ids: string[], source: {id: string, name: string}[]) => {
    const names = ids.map(id => source.find(s => s.id === id)?.name).filter(Boolean);
    if (names.length === 0) return 'None Selected';
    if (names.length > 2) return `${names.slice(0, 2).join(', ')} & ${names.length - 2} more`;
    return names.join(', ');
  }

  const getAllSelectedNames = (ids: string[], source: {id: string, name: string}[]) => {
    return ids.map(id => source.find(s => s.id === id)?.name).filter(Boolean).join(', ') || 'None';
  }

  const connectedNodes = connections
    .filter((c) => c.from === node.id || c.to === node.id)
    .map((c) => (c.from === node.id ? c.to : c.from))
    .map((id) => nodes.find((n) => n.id === id))
    .filter((n): n is CanvasNode => !!n)

  const steps = [
    { name: 'Data Selection', icon: Database },
    { name: 'Feature Selection', icon: LineChart },
    { name: 'Model Setup', icon: Info },
    { name: 'Training', icon: BarChart4 },
    { name: 'Forecast Results', icon: CheckCircle2 }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {/* Compact Progress Steps */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Forecast Configuration Progress</h3>
            <span className="text-xs text-gray-500">Step {step} of {steps.length}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                    step === i + 1 
                      ? "bg-teal-500 text-white" 
                      : step > i + 1 
                      ? "bg-teal-500 text-white" 
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {step > i + 1 ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div className={cn(
                    "h-px w-8 transition-colors duration-300",
                    step > i + 1 ? "bg-teal-500" : "bg-gray-200"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-100">
          <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Database Selection */}
              <div className="space-y-2">
                <Label htmlFor="database" className="text-sm font-medium text-slate-900">Select Database</Label>
                <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                  <SelectTrigger id="database" className="h-11 border-slate-200 rounded-xl">
                    <SelectValue placeholder="Choose database" />
                  </SelectTrigger>
                  <SelectContent>
                    {databases.map((db) => (
                      <SelectItem key={db.id} value={db.id}>{db.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Entity Selection - Modern Cards */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900">Data Selection</h4>
                <div className="grid grid-cols-1 gap-4">
                  {/* Retailers */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-slate-700">Retailers</Label>
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-600">{selectedRetailers.length}</Badge>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 max-h-32 overflow-y-auto">
                      <div className="space-y-2">
                        {retailers.map(r => (
                          <div key={r.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`ret-${r.id}`} 
                              checked={selectedRetailers.includes(r.id)} 
                              onCheckedChange={() => handleSelection(selectedRetailers, setSelectedRetailers, r.id)}
                              className="h-4 w-4 rounded border-slate-300"
                            />
                            <Label htmlFor={`ret-${r.id}`} className="text-sm cursor-pointer flex-1 text-slate-600">{r.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Brands */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-slate-700">Brands</Label>
                      <Badge variant="secondary" className="text-xs bg-green-50 text-green-600">{selectedBrands.length}</Badge>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 max-h-32 overflow-y-auto">
                      <div className="space-y-2">
                        {brands.map(b => (
                          <div key={b.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`brand-${b.id}`} 
                              checked={selectedBrands.includes(b.id)} 
                              onCheckedChange={() => handleSelection(selectedBrands, setSelectedBrands, b.id)}
                              className="h-4 w-4 rounded border-slate-300"
                            />
                            <Label htmlFor={`brand-${b.id}`} className="text-sm cursor-pointer flex-1 text-slate-600">{b.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Products */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-slate-700">Products</Label>
                      <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-600">{selectedProducts.length}</Badge>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 max-h-32 overflow-y-auto">
                      <div className="space-y-2">
                        {products.map(p => (
                          <div key={p.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`prod-${p.id}`} 
                              checked={selectedProducts.includes(p.id)} 
                              onCheckedChange={() => handleSelection(selectedProducts, setSelectedProducts, p.id)}
                              className="h-4 w-4 rounded border-slate-300"
                            />
                            <Label htmlFor={`prod-${p.id}`} className="text-sm cursor-pointer flex-1 text-slate-600">{p.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forecast Parameters */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900">Forecast Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="forecast-horizon" className="text-sm text-slate-700">Forecast Horizon</Label>
                    <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
                      <SelectTrigger className="h-11 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select horizon" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeHorizons.map((horizon) => (
                          <SelectItem key={horizon.id} value={horizon.id}>{horizon.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model-type" className="text-sm text-slate-700">Forecasting Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="h-11 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {forecastingModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-xs text-gray-500">{model.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confidence-level" className="text-sm text-slate-700">Confidence Level (%)</Label>
                    <Input 
                      id="confidence-level" 
                      type="number" 
                      placeholder="95" 
                      value={confidenceLevel} 
                      onChange={e => setConfidenceLevel(e.target.value)} 
                      className="h-11 rounded-xl border-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-900">Available Features</Label>
                <Badge variant="secondary" className="text-xs">{selectedColumns.length} selected</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {availableColumns.map(c => (
                  <div 
                    key={c.id} 
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors",
                      selectedColumns.includes(c.id)
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    )}
                    onClick={() => handleSelection(selectedColumns, setSelectedColumns, c.id)}
                  >
                    <Checkbox 
                      id={`col-${c.id}`} 
                      checked={selectedColumns.includes(c.id)} 
                      onChange={() => {}}
                      className="h-4 w-4" 
                    />
                    <Label htmlFor={`col-${c.id}`} className="text-sm cursor-pointer flex-1">{c.name}</Label>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedColumns([])}>
                  Clear All
                </Button>
                <Button size="sm" onClick={() => setSelectedColumns(availableColumns.map(c => c.id))}>
                  Select All
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Model Configuration Summary</h3>
                  <p className="text-slate-600">Review your forecast configuration before training</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Data Summary */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
                    <h4 className="font-semibold">Data Selection</h4>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Database</span>
                      <span className="font-medium text-slate-900">{databases.find(d => d.id === selectedDatabase)?.name}</span>
                    </div>
                    <div className="border-t border-slate-100"></div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Retailers</span>
                      <span className="font-medium text-slate-900 text-right">{getSelectedNames(selectedRetailers, retailers)}</span>
                    </div>
                    <div className="border-t border-slate-100"></div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Brands</span>
                      <span className="font-medium text-slate-900 text-right">{getSelectedNames(selectedBrands, brands)}</span>
                    </div>
                    <div className="border-t border-slate-100"></div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Products</span>
                      <span className="font-medium text-slate-900 text-right">{getSelectedNames(selectedProducts, products)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Model Parameters */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-4">
                    <h4 className="font-semibold">Model Parameters</h4>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Forecast Horizon</span>
                      <span className="font-medium text-slate-900">{timeHorizons.find(h => h.id === forecastHorizon)?.name}</span>
                    </div>
                    <div className="border-t border-slate-100"></div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Model Type</span>
                      <span className="font-medium text-slate-900">{forecastingModels.find(m => m.id === selectedModel)?.name}</span>
                    </div>
                    <div className="border-t border-slate-100"></div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Confidence Level</span>
                      <span className="font-medium text-slate-900">{confidenceLevel}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900">Ready to Train</p>
                    <p className="text-emerald-700 text-sm mt-1">
                      Your forecast model configuration is complete. Click "Train Model" to start the forecasting process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <BarChart4 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Training Forecast Model</h3>
                  <p className="text-slate-600">Processing historical data and training model</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Data Fetching Progress */}
                <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-slate-900 font-medium">Data Processing</Label>
                    <span className="text-blue-600 font-semibold">{fetchProgress}%</span>
                  </div>
                  <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"
                      style={{ width: `${fetchProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    {isFetching ? 'Fetching historical data...' : 'Data processing complete'}
                  </p>
                </div>

                {isFetchComplete && (
                  <>
                    {!isModeling && !isModelComplete && (
                      <Button 
                        onClick={handleRunModel}
                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-medium"
                      >
                        {isModeling || modelProgress > 0 ? (
                          <div className="flex items-center">
                            <div className="animate-spin mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                            Training Model...
                          </div>
                        ) : (
                          <>
                            <TrendingUp className="mr-2 h-5 w-5" />
                            Train Forecast Model
                          </>
                        )}
                      </Button>
                    )}
                    
                    {(isModeling || modelProgress > 0) && (
                      <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                        <div className="flex justify-between items-center mb-3">
                          <Label className="text-slate-900 font-medium">Model Training</Label>
                          <span className="text-blue-600 font-semibold">{modelProgress}%</span>
                        </div>
                        <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300 rounded-full"
                            style={{ width: `${modelProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          Training forecast model using {forecastingModels.find(m => m.id === selectedModel)?.name}...
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          
          {step === 5 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Forecast Complete</h3>
                  <p className="text-emerald-700 text-sm mt-1">
                    Your forecasting model has been successfully trained and is ready to use.
                  </p>
                </div>
              </div>
              
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-4 border-b border-slate-200">
                  <h5 className="font-semibold text-slate-900">Forecast Results</h5>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="text-2xl font-bold text-emerald-700">92.4%</div>
                      <div className="text-emerald-600 text-sm">Model Accuracy</div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">0.15</div>
                      <div className="text-blue-600 text-sm">MAPE Score</div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                      <div className="text-2xl font-bold text-purple-700">+12.3%</div>
                      <div className="text-purple-600 text-sm">Growth Forecast</div>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                      <div className="text-2xl font-bold text-orange-700">High</div>
                      <div className="text-orange-600 text-sm">Confidence</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full justify-start h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
                      <BarChart4 className="mr-3 h-5 w-5" />
                      View Detailed Forecast
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-slate-300 hover:bg-slate-50">
                      <LineChart className="mr-3 h-5 w-5" />
                      Export Forecast Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-slate-300 hover:bg-slate-50">
                      <Settings2 className="mr-3 h-5 w-5" />
                      Adjust Model Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-dashed border-slate-400 hover:bg-slate-50">
                      <ChevronRight className="mr-3 h-5 w-5" />
                      Connect to Another Tool
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          {step > 1 && (
            <Button variant="outline" size="sm" onClick={() => setStep(step - 1)} className="rounded-lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>
        
        <div>
          {step < 3 && (
            <Button size="sm" onClick={() => setStep(step + 1)} className="rounded-lg">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 3 && (
            <Button size="sm" onClick={handleRun} className="rounded-lg">
              <TrendingUp className="mr-2 h-4 w-4" />
              Train Model
            </Button>
          )}
          {step === 5 && (
            <Button size="sm" onClick={() => { setStep(1); resetAll(); }} className="rounded-lg">
              Configure New Forecast
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
