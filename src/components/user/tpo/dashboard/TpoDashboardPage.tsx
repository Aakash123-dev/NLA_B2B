'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, FileText, Upload, Plus, Filter, SlidersHorizontal, Building, Target, Globe, Package, Users, ShoppingCart, Barcode } from 'lucide-react'
import { motion } from 'framer-motion'
import { DashboardHeader } from './components/DashboardHeader'
import { MetricsGrid } from './components/MetricsGrid'
// import { CalendarGrid } from './components/CalendarGrid'
import Calendar from './components/calendar/Calendar'
import { SidePanel } from './components/SidePanel'
import { TradePlan } from '../types'
import { SharedSmartInsightsDrawer } from '@/components/common'
import { useEvents } from '@/hooks/useEvents'
import { useRetailerBrandData } from '@/hooks/useRetailerBrandData'
import { axiosInstance } from '@/services/projectservices/axiosInstance'
import { fetchProductData } from '@/store/slices/productData/productDataAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getYearCalendarData } from '@/utils/dateUtils'
import { message, Spin } from 'antd'

export function TpoDashboardPage() {
  const { events, createEvent, updateEvent, deleteEvent, refreshEvents } = useEvents()
  const router = useRouter()
  const [tradePlan, setTradePlan] = useState<TradePlan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false)
  const searchParams = useSearchParams();
  const project_id = searchParams.get('project');
  const model_id = searchParams.get('model');
  const event_tpo_id = searchParams.get('tpoId')
  const [tpoData, setTpoData] = useState(null);
  const [targetValues, setTargetValues] = useState({
		volume: 0,
		spend: 0,
		revenue: 0,
	});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<any | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fetchImportedEvents, setFetchImportedEvents] = useState(false)

  const dispatch = useDispatch();
  const { data: productDataRedux, loading: isLoadingRedux } = useSelector(
    (state: any) => state.productDataReducer
  );


  const { retailerBrandProducts, getProductsForBrand} =
    useRetailerBrandData(project_id, model_id);

    useEffect(() => {
      // fetch tpo data
      const fetchTpoData = async () => {
        try {
          const api = `/events/tpo/${event_tpo_id}`;
     
          const response = await axiosInstance.get(api);
          setTpoData(response?.data);
          setTargetValues({
            volume: response?.data?.volume || 0,
            spend: response?.data?.spend || 0,
            revenue: response?.data?.revenue || 0,
          });
        } catch (error) {
          console.log("Error fetching TPO data:", error);
        }
      };
  
      // fetchProjects();
      fetchTpoData();
    }, []);


    const [currentYear, setCurrentYear] = useState<number>(Number((tpoData as any)?.year))
    const weeks = getYearCalendarData(currentYear);
    const safeTpoData = tpoData as any;

  useEffect(() => {
    loadTradePlan()
  }, [])

  const fetchProductDataHandler = async (products: any) => {
		try {
      // @ts-ignore thunk
      await (dispatch as any)(
        fetchProductData(
          products,
          (tpoData as any)?.project_id,
          (tpoData as any)?.model_id,
          (tpoData as any)?.retailer_id
        )
      );
		} catch (error) {
			console.log("Error in fetching promo event simulation data: ", error);
		}
	};

  useEffect(() => {
    if (
      (tpoData as any)?.retailer_id &&
      (tpoData as any)?.brand_id &&
      (retailerBrandProducts as any)[(tpoData as any).retailer_id]
    ) {
          const products = getProductsForBrand(
        (tpoData as any).retailer_id,
        (tpoData as any).brand_id
			);
			setSelectedProducts(products);
			if (products.length > 0) {
        fetchProductDataHandler(products);
			}
		}
	}, [tpoData, retailerBrandProducts]);

  useEffect(() => {
  if ((tpoData as any)?.retailer_id && selectedProducts.length > 0) {
			fetchProductDataHandler(selectedProducts);
		}
	}, [selectedProducts]);

  const handleSaveEvent = async (eventData: any) => {
    try {
        console.log({ eventData })
        setIsSubmitting(true)
    if ((selectedEvent as any)?.id) {
        await updateEvent({ ...eventData, id: (selectedEvent as any).id })
        } else {
            await createEvent(eventData)
        }
    await refreshEvents((tpoData as any).id)
        setSelectedEvent(undefined)
        setSelectedDate(undefined)
    } catch (error) {
        console.error('Failed to save event:', error)
        message.error('Failed to save event')
    } finally {
        setIsSubmitting(false)
    }
}

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event)
    setSelectedDate(undefined)
}

const handleCopyEvent = (event: any) => {
  setSelectedEvent({
      ...event,
      id: '',
      title: `Copy of ${event.title}`,
  })
}

  const handleDeleteEventWrapper = async (eventId: string) => {
  try {
      const res = await deleteEvent(eventId as any);
      if (res) {
          message.success('Event deleted')
      } else {
          message.error('Failed to delete event')
      }
  } catch (error) {
      console.error('Failed to delete event:', error)
  }
}

  const loadTradePlan = async () => {
    try {
      // Load from localStorage for demo
      const storedPlan = localStorage.getItem('currentTradePlan')
      if (storedPlan) {
        setTradePlan(JSON.parse(storedPlan))
      }
    } catch (error) {
      console.error("Error loading trade plan:", error)
    } finally {
      setIsLoading(false)
    }
  }


  const handleAddEvent = (date: Date, product?: any) => {
  setSelectedDate(date)
  setSelectedEvent({
      id: '',
      title: '',
      description: '',
      start_date: date,
      end_date: date,
      color: '',
      status: 'DRAFT',
      channels: [],
      event_tpo_id: (tpoData as any)?.id || '',
      ppg_name: '',
      planned: product ? [{
          productId: product.id,
          productName: product.name,
          financialData: {
              basePrice: product.basePrice,
              basePriceElasticity: product.basePriceElasticity,
              originalBasePrice: product.basePrice,
              originalTotalUnits: product.totalUnits,
              promoPrice: 0,
              discount: 0,
              units: product.totalUnits,
              totalUnits: product.totalUnits,
              tprDist: 0,
              doDist: 0,
              foDist: 0,
              fdDist: 0,
              listPrice: 0,
              spoils: 0,
              cogs: 0,
              edlpPerUnitRate: 0,
              promoPerUnitRate: 0,
              vcm: 0,
              fixedFee: 0,
              increamentalUnits: 0,
              promoPriceElasticity: product.promoPriceElasticity,
              featureEffect: product.featureEffect,
              displayEffect: product.displayEffect,
              featureAndDisplayEffect: product.featureAndDisplayEffect
          }
      }] : [],
      actual: product ? [{
          productId: product.id,
          productName: product.name,
          financialData: {
              basePrice: product.basePrice,
              basePriceElasticity: product.basePriceElasticity,
              originalBasePrice: product.basePrice,
              originalTotalUnits: product.totalUnits,
              promoPrice: 0,
              discount: 0,
              units: product.totalUnits,
              totalUnits: product.totalUnits,
              tprDist: 0,
              doDist: 0,
              foDist: 0,
              fdDist: 0,
              listPrice: 0,
              spoils: 0,
              cogs: 0,
              edlpPerUnitRate: 0,
              promoPerUnitRate: 0,
              vcm: 0,
              fixedFee: 0,
              increamentalUnits: 0,
              promoPriceElasticity: product.promoPriceElasticity,
              featureEffect: product.featureEffect,
              displayEffect: product.displayEffect,
              featureAndDisplayEffect: product.featureAndDisplayEffect
          }
      }] : []
  })
  // Open create modal is managed by header; keep selection here for future use
}

const handleEventUpdate = async (updatedEvent: any) => {
  console.log('Calendar updatedEvent', updatedEvent)
  await refreshEvents((tpoData as any).id)
}

const handleDragEnd = async (event: any, weeksDelta: number) => {
  try {
    const startDate = new Date(event.start_date)
    const endDate = new Date(event.end_date)
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return

    const daysDelta = weeksDelta * 7
    const newStartDate = new Date(startDate)
    newStartDate.setDate(startDate.getDate() + daysDelta)
    const newEndDate = new Date(endDate)
    newEndDate.setDate(endDate.getDate() + daysDelta)

    await updateEvent({ ...event, start_date: newStartDate, end_date: newEndDate })
    await refreshEvents((tpoData as any)?.id)
  } catch (error) {
    console.error('Failed to update event position:', error)
  }
}

console.log(productDataRedux, "ProdutDataReduxSotre")

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-gray-600 font-medium">Loading trade plan...</span>
        </div>
      </div>
    )
  }

  if (!tradePlan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Trade Plan Found</h2>
          <p className="text-gray-600 mb-8">Create your first trade plan to get started with optimization.</p>
          <Button 
            onClick={() => router.push('/user/tpo/setup')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Trade Plan
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Sticky Header */}
      <DashboardHeader 
        tradePlan={tradePlan} 
        onOpenSmartInsights={() => setIsSmartInsightsOpen(true)}
        onSave ={handleSaveEvent}
        initialEvent = {selectedEvent}
        startDate = {selectedDate}
        productData={productDataRedux}
        products={getProductsForBrand(
          tpoData?.retailer_id,
          tpoData?.brand_id
        )}
        getProductsForBrand={getProductsForBrand}
        tpoData={tpoData}
        currentYear = {currentYear}
        events = {events}
        isSubmitting ={isSubmitting}
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Primary Filters */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-xl" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                          <Filter className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">GEO Filter:</span>
                      </div>
                      <Select defaultValue="rma-to-retailer">
                        <SelectTrigger className="w-[200px] bg-white/60 border-2 border-grey-100 shadow-sm hover:border-blue-300/50 hover:bg-white/80 transition-all duration-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl">
                          <SelectItem value="rma-to-retailer">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Building className="w-4 h-4 text-slate-500" />
                              RMA to Retailer
                            </div>
                          </SelectItem>
                          <SelectItem value="to-region-wise">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Target className="w-4 h-4 text-slate-500" />
                             Region wise
                            </div>
                          </SelectItem>
                          <SelectItem value="to-total-us">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Globe className="w-4 h-4 text-slate-500" />
                              Total US
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-6 w-px bg-slate-200/50 hidden lg:block"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                          <SlidersHorizontal className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">Filter by:</span>
                      </div>
                      <Select defaultValue="by-category">
                        <SelectTrigger className="w-[220px] bg-white/60 border-2 border-grey-100 shadow-sm hover:border-emerald-300/50 hover:bg-white/80 transition-all duration-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-1 bg-white/95 backdrop-blur-xl shadow-sm rounded-2xl">
                          <SelectItem value="by-category">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Package className="w-4 h-4 text-slate-500" />
                              Category
                            </div>
                          </SelectItem>
                          <SelectItem value="by-retailer">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Building className="w-4 h-4 text-slate-500" />
                              Retailer 
                            </div>
                          </SelectItem>
                          <SelectItem value="by-brand">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Users className="w-4 h-4 text-slate-500" />
                              Brand 
                            </div>
                          </SelectItem>
                          <SelectItem value="by-ppg">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <ShoppingCart className="w-4 h-4 text-slate-500" />
                              PPG 
                            </div>
                          </SelectItem>
                          <SelectItem value="by-upc">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Barcode className="w-4 h-4 text-slate-500" />
                              UPC
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <MetricsGrid tradePlan={tradePlan} />
            </div>
            
            <div className="lg:col-span-1">
              <SidePanel tradePlan={tradePlan} />
            </div>
          </div>

          {/* Full width calendar - latest design */}
          {!!tpoData && (
            <Calendar
              tpoData={safeTpoData}
              productData={productDataRedux || []}
              fetchImportedEvents={fetchImportedEvents}
              setFetchImportedEvents={setFetchImportedEvents}
              targetValues={targetValues}
              isLoading={isLoadingRedux}
              isCreateEventModalOpen={false}
              setIsCreateEventModalOpen={() => {}}
              products={getProductsForBrand(
                (safeTpoData?.retailer_id as string) ?? '',
                (safeTpoData?.brand_id as string) ?? ''
              )}
              getProductsForBrand={getProductsForBrand}
              availableYears={[]}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent as any}
              onCopyEvent={handleCopyEvent as any}
              onDeleteEventWrapper={handleDeleteEventWrapper as any}
              onEventUpdate={handleEventUpdate as any}
              onDragEnd={handleDragEnd as any}
            />
          )}
        </motion.div>
      </div>
      
      <SharedSmartInsightsDrawer
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
