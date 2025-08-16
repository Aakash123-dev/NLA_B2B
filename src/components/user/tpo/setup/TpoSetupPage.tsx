'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  ChevronRight, ArrowLeft, Target, Database, Store,
  Package, DollarSign, Calendar, TrendingUp, X, Brain
} from 'lucide-react'
import { motion } from 'framer-motion'
import { SearchableDropdownList } from './components'
import { SetupImportModal } from './components/SetupImportModal'
import { TradePlanFormData, FormErrors } from '../types'
import { databaseOptions, yearOptions } from '../constants'
import { validateTradePlanForm, generateMockTradePlan } from '../utils'
import { SimpleSmartInsightsDrawer } from '@/components/common'
import { axiosInstance, axiosPythonInstance } from '@/services/projectservices/axiosInstance'
import { useSearchParamsClient } from '@/hooks/useSearchParamsClient'

export function TpoSetupPage() {
  const router = useRouter()
  const searchParams = useSearchParamsClient()
  const project_id = Number(searchParams.get('project'))
  const model_id = Number(searchParams.get('model'))
  const projectName = searchParams.get('projectName') || ''
  
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [retailerBrandProducts, setRetailerBrandProducts] = useState<any>({})
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
  const [tpoData, setTpoData] = useState<any>(null);
  const [tpoId, setTpoId] = useState<number | null>(null)
  
  // Get user_id from localStorage
  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          return user.user_id || 7 // fallback to 7 if not found
        } catch (e) {
          console.error('Error parsing user from localStorage:', e)
          return 7
        }
      }
    }
    return 7 // default fallback
  }
  
  const [formData, setFormData] = useState<TradePlanFormData>({
    trade_plan_name: "Trade Plan 12 2025 - Real Good Foods 2",
    project: projectName, // Set from URL parameter
    model: "Optimization Model v2.1",
    selectedDatabase: 'db1',
    selectedRetailers: [], // Will be single select
    selectedBrands: [], // Will be single select
    selectedProducts: [], // Added missing required field
    year: 2025,
    marketShare: '',
    minRevenue: '',
    numWeeks: '',
    targetVolume: '',
    targetSpend: '',
    targetRevenue: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // API function to fetch retailers and brands data
  const fetchRetailerBrandProductApiHandler = async () => {
    try {
      setIsLoading(true);
      const api = `/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
      const response = await axiosPythonInstance.get(api);

      if (response.status === 200) {
        setRetailerBrandProducts(response?.data?.data);
      }
    } catch (error) {
      console.log('Error in fetching retailers and brands:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get retailers and brands from API data
  const retailers = Object.keys(retailerBrandProducts || {});
  const brands = formData.selectedRetailers.length > 0 
    ? Object.keys(retailerBrandProducts[formData.selectedRetailers[0]] || {})
    : [];

  // Convert to the format expected by the component
  const retailerOptions = retailers.map(retailer => ({
    id: retailer,
    name: retailer
  }));

  const brandOptions = brands.map(brand => ({
    id: brand,
    name: brand
  }));

  // Load data on component mount
  useEffect(() => {
    if (project_id && model_id) {
      fetchRetailerBrandProductApiHandler();
    }
  }, [project_id, model_id]);

  // Update project name when URL parameter changes
  useEffect(() => {
    if (projectName) {
      setFormData(prev => ({
        ...prev,
        project: projectName
      }))
    }
  }, [projectName])

  // Fetch TPO data and hydrate target values once an event_tpo_id is available
  useEffect(() => {
    const fetchTpoData = async () => {
      try {
        const id = tpoData?.id
        if (!id) return

        const response = await axiosInstance.get(`/events/tpo/${id}`)
        const data = response?.data

        setTpoData(data)

        // Map API values to existing form fields
        setFormData(prev => ({
          ...prev,
          targetVolume: data?.volume != null ? String(data.volume) : prev.targetVolume,
          targetSpend: data?.spend != null ? String(data.spend) : prev.targetSpend,
          targetRevenue: data?.revenue != null ? String(data.revenue) : prev.targetRevenue,
        }))
      } catch (error) {
        console.log('Error fetching TPO data:', error)
      }
    }

    fetchTpoData()
  }, [tpoData?.id])

  const handleBackToDesignStudio = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    router.push(`/user/design-studio?${params.toString()}`);
  }

  const handleBackToWelcome = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    router.push(`/user/tpo?${params.toString()}`);
  }

  const handleSelectionChange = useCallback((field: keyof TradePlanFormData, value: string | string[] | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setErrors((prev: FormErrors) => {
      if (prev[field]) {
        const { [field]: _, ...newErrors } = prev
        return newErrors
      }
      return prev
    })
  }, [])

  const handleRemoveSelection = useCallback((field: keyof TradePlanFormData, itemId: string) => {
    setFormData(prev => {
      const currentSelection = prev[field] as string[]
      const newSelection = currentSelection.filter(id => id !== itemId)
      return {
        ...prev,
        [field]: newSelection
      }
    })
  }, [])

  const getItemName = useCallback((items: { id: string; name: string }[], id: string) => {
    return items.find(item => item.id === id)?.name || id
  }, [])

  // Single select handlers for retailers and brands
  const handleRetailerChange = useCallback((selection: string[]) => {
    setFormData(prev => ({
      ...prev,
      selectedRetailers: selection,
      selectedBrands: [] // Reset brands when retailer changes
    }))
    if (errors.selectedRetailers) {
      setErrors((prev: FormErrors) => {
        const newErrors = { ...prev }
        delete newErrors.selectedRetailers
        return newErrors
      })
    }
  }, [errors.selectedRetailers])

  const handleBrandChange = useCallback((selection: string[]) => {
    setFormData(prev => ({
      ...prev,
      selectedBrands: selection
    }))
    if (errors.selectedBrands) {
      setErrors((prev: FormErrors) => {
        const newErrors = { ...prev }
        delete newErrors.selectedBrands
        return newErrors
      })
    }
  }, [errors.selectedBrands])

  // TPO API submission
  const submitTpoPlan = async (planData: any) => {
    try {
      const user_id = getUserFromStorage()
      
      const payload = {
        id: null,
        name: planData.trade_plan_name,
        project_id: project_id,
        model_id: model_id,
        user_id: user_id,
        retailer_id: planData.selectedRetailers[0] || '',
        brand_id: planData.selectedBrands[0] || '',
        year: planData.year,
        submit_type: "create",
        // Dynamic form fields
        market_share: planData.marketShare ? parseFloat(planData.marketShare) : null,
        min_revenue: planData.minRevenue ? parseFloat(planData.minRevenue) : null,
        num_weeks: planData.numWeeks ? parseInt(planData.numWeeks) : null,
        revenue: planData.targetRevenue ? parseFloat(planData.targetRevenue) : null,
        spend: planData.targetSpend ? parseFloat(planData.targetSpend) : null,
        volume: planData.targetVolume ? parseFloat(planData.targetVolume) : null
      }

      const response = await axiosInstance.post('/events/tpo', payload)
      
      // Check if response has data (successful creation)
      if (response.data && (response.data.id || response.data.name)) {
        console.log('TPO plan created successfully:', response.data)
        setTpoId(response.data.id);
        return response.data
      } else {
        console.warn('API response might indicate failure:', response.data)
        // Still return the response data even if it doesn't have expected fields
        return response.data
      }
    } catch (error: any) {
      console.error('Error creating TPO plan:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      // Don't throw error, just return null to indicate failure
      return null
    }
  }

  console.log(tpoId, "AllTpoId")

  const handleNextClick = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateTradePlanForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    try {
      // Submit to TPO API first
      const tpoResponse = await submitTpoPlan(formData)
      console.log('TPO API Response:', tpoResponse)
      
      // Save created TPO data for modal context
     
      
      // Open the setup modal after successful API call
      setIsSetupModalOpen(true)
    } catch (error) {
      console.error("Error creating trade plan:", error)
      // Still open modal even if there's an error
      setIsSetupModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSetupModalClose = () => {
    setIsSetupModalOpen(false)
    // Navigate to dashboard with identifiers in the URL
    const params = new URLSearchParams()
    if (project_id) params.set('project', String(project_id))
    if (model_id) params.set('model', String(model_id))
    if (tpoId) params.set('tpoId', String(tpoId))
    router.push(`/user/tpo/dashboard?${params.toString()}`)
  }

  // Check if project name is filled to enable retailer/brand selection
  const isProjectNameFilled = formData.project && formData.project.trim() !== ''

  // Get selected retailer and brand names for the modal
  const selectedRetailer = formData.selectedRetailers.length > 0 
    ? getItemName(retailerOptions, formData.selectedRetailers[0])
    : ''

  const selectedBrand = formData.selectedBrands.length > 0 
    ? getItemName(brandOptions, formData.selectedBrands[0])
    : ''

    const [fetchImportedEvents, setFetchImportedEvents] = useState(false);

    const createImportedEvent = async(event: any) => {
      try {
          const user_id = getUserFromStorage()
          const eventData = {
            ...event,
            user_id,
            event_tpo_id: event.event_tpo_id ?? tpoId,
            status: (event.status || 'DRAFT').toUpperCase(),
          }
          const response = await axiosInstance.post(`/events`, eventData)
          return response.data || []
      } catch (error) {
          // @ts-ignore
          console.error('[TpoSetupPage] Create event failed:', error?.response?.status, error?.response?.data)
          throw error
      }
  }

    const handleImportEvents = async (importedEvents: any[]) => {
      try {
        // sequential to preserve order; can be batched if backend supports
        for (const event of importedEvents) {
          await createImportedEvent(event)
        }
        setFetchImportedEvents(true)
      } catch (error) {
        console.error('[TpoSetupPage] Failed to import events:', error)
        throw error
      }
    }

  useEffect(() => {
    // fetch tpo data
    const fetchTpoData = async () => {
        try {
         
            const response = await axiosInstance.get(`/events/tpo/${tpoId}`);
            setTpoData(response?.data);
        } catch (error) {
            console.log("Error fetching TPO data:", error);
        }
    }

    // fetchProjects();
    fetchTpoData();
}, [tpoId]);

console.log(tpoData, "AllTpoData");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToWelcome}
              variant="ghost"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Target className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Create Trade Plan</h1>
                <p className="text-sm text-slate-600">Configure your trade plan optimization</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-4"
                onClick={() => setIsSmartInsightsOpen(true)}
              >
                <Brain className="w-4 h-4" />
                Smart Insights
              </Button>
              <Button
                onClick={handleBackToDesignStudio}
                variant="outline"
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Design Studio
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.form 
          onSubmit={handleNextClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6 h-full">
            
            {/* Left Section - Configuration */}
            <div className="col-span-8 space-y-6">
              
              {/* Basic Information */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Target className="w-5 h-5 text-indigo-600" />
                    </div>
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trade-plan-name" className="text-sm font-medium text-slate-700">
                        Trade Plan Name
                      </Label>
                      <Input 
                        id="trade-plan-name" 
                        value={formData.trade_plan_name} 
                        onChange={(e) => handleSelectionChange('trade_plan_name', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 transition-colors h-11" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm font-medium text-slate-700">Year</Label>
                      <Select 
                        value={formData.year.toString()} 
                        onValueChange={(value) => handleSelectionChange('year', parseInt(value))}
                      >
                        <SelectTrigger className="w-full bg-white border-slate-300 hover:border-slate-400 transition-colors h-11">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 shadow-lg">
                          {yearOptions.map((year) => (
                            <SelectItem key={year.value} value={year.value.toString()}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Database Selection */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    Data Source
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={formData.selectedDatabase} 
                    onValueChange={(value) => handleSelectionChange('selectedDatabase', value)}
                  >
                    <SelectTrigger className="w-full bg-white border-slate-300 hover:border-slate-400 transition-colors h-11">
                      <SelectValue placeholder="Choose database connection" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 shadow-lg">
                      {databaseOptions.map((db) => (
                        <SelectItem key={db.id} value={db.id} className="hover:bg-slate-50">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-slate-500" />
                            {db.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Project Name - Moved Above Selection Filters */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="project" className="text-sm font-medium text-slate-700">
                      Project Name
                    </Label>
                    <Input
                      id="project"
                      value={formData.project}
                      onChange={e => handleSelectionChange('project', e.target.value)}
                      placeholder="Enter project name"
                      className="bg-white border-slate-300 hover:border-slate-400 transition-colors h-11"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Selection Filters */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Store className="w-5 h-5 text-emerald-600" />
                    </div>
                    Selection Filters
                    {!isProjectNameFilled && (
                      <Badge variant="secondary" className="ml-2 bg-yellow-100 text-yellow-800">
                        Fill project name first
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Retailers and Brands - Side by Side */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <SearchableDropdownList
                        title="Retailer"
                        items={retailerOptions}
                        selectedItems={formData.selectedRetailers}
                        onSelectionChange={handleRetailerChange}
                        placeholder="Search retailers..."
                        maxHeight="200px"
                        colorScheme="blue"
                        disabled={!isProjectNameFilled}
                        singleSelect={true}
                      />
                    </div>
                    <div className="space-y-3">
                      <SearchableDropdownList
                        title="Brand"
                        items={brandOptions}
                        selectedItems={formData.selectedBrands}
                        onSelectionChange={handleBrandChange}
                        placeholder="Search brands..."
                        maxHeight="200px"
                        colorScheme="emerald"
                        disabled={!isProjectNameFilled || formData.selectedRetailers.length === 0}
                        singleSelect={true}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trade Plan Parameters */}
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </div>
                    Trade Plan Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="market-share" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-purple-100 rounded">
                          <DollarSign className="w-3 h-3 text-purple-600" />
                        </div>
                        Market Share (%)
                      </Label>
                      <Input 
                        id="market-share" 
                        type="number" 
                        placeholder="e.g. 32" 
                        value={formData.marketShare} 
                        onChange={(e) => handleSelectionChange('marketShare', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-purple-500 transition-colors h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-revenue" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-green-100 rounded">
                          <DollarSign className="w-3 h-3 text-green-600" />
                        </div>
                        Min Revenue ($)
                      </Label>
                      <Input 
                        id="min-revenue" 
                        type="number" 
                        placeholder="e.g. 10000" 
                        value={formData.minRevenue} 
                        onChange={(e) => handleSelectionChange('minRevenue', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-green-500 transition-colors h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="num-weeks" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-orange-100 rounded">
                          <Calendar className="w-3 h-3 text-orange-600" />
                        </div>
                        Number of Weeks
                      </Label>
                      <Input 
                        id="num-weeks" 
                        type="number" 
                        placeholder="e.g. 12" 
                        value={formData.numWeeks} 
                        onChange={(e) => handleSelectionChange('numWeeks', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-orange-500 transition-colors h-10" 
                      />
                    </div>
                  </div>

                  {/* Target Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-volume" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-blue-100 rounded">
                          <Package className="w-3 h-3 text-blue-600" />
                        </div>
                        Target Volume
                      </Label>
                      <Input 
                        id="target-volume" 
                        type="number" 
                        placeholder="e.g. 5000" 
                        value={formData.targetVolume} 
                        onChange={(e) => handleSelectionChange('targetVolume', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-blue-500 transition-colors h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-spend" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-red-100 rounded">
                          <DollarSign className="w-3 h-3 text-red-600" />
                        </div>
                        Target Spend ($)
                      </Label>
                      <Input 
                        id="target-spend" 
                        type="number" 
                        placeholder="e.g. 150000" 
                        value={formData.targetSpend} 
                        onChange={(e) => handleSelectionChange('targetSpend', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-red-500 transition-colors h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-revenue" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <div className="p-1 bg-emerald-100 rounded">
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                        </div>
                        Target Revenue ($)
                      </Label>
                      <Input 
                        id="target-revenue" 
                        type="number" 
                        placeholder="e.g. 800000" 
                        value={formData.targetRevenue} 
                        onChange={(e) => handleSelectionChange('targetRevenue', e.target.value)}
                        className="bg-white border-slate-300 hover:border-slate-400 focus:border-emerald-500 transition-colors h-10" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Section - Current Selections */}
            <div className="col-span-4">
              <Card className="border border-slate-200 shadow-sm h-fit sticky top-24">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Package className="w-5 h-5 text-emerald-600" />
                    </div>
                    Current Selections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Database Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Database</Label>
                    <div className="p-3 bg-slate-50 rounded-lg border">
                      {formData.selectedDatabase ? (
                        <span className="text-sm text-slate-800 font-medium">
                          {databaseOptions.find(db => db.id === formData.selectedDatabase)?.name || 'Unknown'}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-500">No database selected</span>
                      )}
                    </div>
                  </div>

                  {/* Project Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Project Name
                    </Label>
                    <div className="p-3 bg-slate-50 rounded-lg border min-h-[48px] flex items-center">
                      <span className="text-sm text-slate-800 font-medium">
                        {formData.project || <span className="text-slate-500">No project specified</span>}
                      </span>
                    </div>
                  </div>

                  {/* Retailer */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Retailer
                    </Label>
                    <div className="p-3 bg-slate-50 rounded-lg border min-h-[48px] flex items-center">
                      {formData.selectedRetailers.length > 0 ? (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm text-slate-800 font-medium">
                            {getItemName(retailerOptions, formData.selectedRetailers[0])}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSelection('selectedRetailers', formData.selectedRetailers[0])}
                            className="h-6 w-6 p-0 text-slate-500 hover:text-slate-700"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">No retailer selected</span>
                      )}
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Brand
                    </Label>
                    <div className="p-3 bg-slate-50 rounded-lg border min-h-[48px] flex items-center">
                      {formData.selectedBrands.length > 0 ? (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm text-slate-800 font-medium">
                            {getItemName(brandOptions, formData.selectedBrands[0])}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSelection('selectedBrands', formData.selectedBrands[0])}
                            className="h-6 w-6 p-0 text-slate-500 hover:text-slate-700"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">No brand selected</span>
                      )}
                    </div>
                  </div>

                  {/* Parameters Summary */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">Parameters</Label>
                    <div className="p-3 bg-slate-50 rounded-lg border space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Market Share:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.marketShare ? `${formData.marketShare}%` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Min Revenue:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.minRevenue ? `$${formData.minRevenue}` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Weeks:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.numWeeks || 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Target Volume:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.targetVolume || 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Target Spend:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.targetSpend ? `$${formData.targetSpend}` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Target Revenue:</span>
                        <span className="text-xs font-medium text-slate-800">
                          {formData.targetRevenue ? `$${formData.targetRevenue}` : 'Not set'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !isProjectNameFilled}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating Trade Plan...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Setup Import Modal */}
      <SetupImportModal
        isOpen={isSetupModalOpen}
        onClose={handleSetupModalClose}
        onImport={handleImportEvents}
        retailerBrandProducts={retailerBrandProducts}
        event_tpo_id={tpoId}
        tpoData={tpoData}
      />

      {/* Smart Insights Drawer */}
      <SimpleSmartInsightsDrawer 
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
