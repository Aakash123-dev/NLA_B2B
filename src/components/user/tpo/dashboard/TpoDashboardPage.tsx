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
import { getYearCalendarData, toJsDate } from '@/utils/dateUtils'
import { Spin } from 'antd'
import toast from 'react-hot-toast'
import { calculateWidgetValues } from '@/utils/widgetCalculations'
import { Event } from '@/types/event'
import { TargetUpdate } from './TargetUpdated'

const getTpoStorageKey = (projectId, modelId, eventTpoId) => {
	return `tpo_state_${projectId}_${modelId}_${eventTpoId}`;
};

const getTpoStoredState = (projectId, modelId, eventTpoId) => {
	const key = getTpoStorageKey(projectId, modelId, eventTpoId);
	const stored = localStorage.getItem(key);
	return stored ? JSON.parse(stored) : null;
};

const saveTpoState = (projectId, modelId, eventTpoId, state) => {
	const key = getTpoStorageKey(projectId, modelId, eventTpoId);
	localStorage.setItem(key, JSON.stringify(state));
};

export function TpoDashboardPage() {
  const router = useRouter()
  const [tradePlan, setTradePlan] = useState<TradePlan | null>(null)
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false)
  const searchParams = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()
  const [fetchImportedEvents, setFetchImportedEvents] = useState(false);

  const project_id = searchParams.get('project');
  const model_id = searchParams.get('model');
  const event_tpo_id = searchParams.get('tpoId')
  const [tpoData, setTpoData] = useState(null);

  const { retailerBrandProducts, getProductsForBrand, isLoading } =
		useRetailerBrandData(project_id, model_id);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isAllProductSelected, setIsAllProductSelected] = useState(false);

  const dispatch = useDispatch();
  const { data: productDataRedux, loading: isLoadingRedux } = useSelector(
    (state: any) => state.productDataReducer
  );


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


    useEffect(() => {
      if (
        tpoData?.retailer_id &&
        tpoData?.brand_id &&
        retailerBrandProducts[tpoData.retailer_id]
      ) {
        const products = getProductsForBrand(
          tpoData.retailer_id,
          tpoData.brand_id
        );
        setSelectedProducts(products);
        if (products.length > 0) {
          fetchProductDataHandler(products, tpoData.retailer_id);
        }
      }
    }, [tpoData, retailerBrandProducts]);

    const handleProductsChange = (values) => {
      if (values && values.length && values.includes("select-all")) {
        const availableProducts =
          getProductsForBrand(tpoData.retailer_id, tpoData.brand_id) || [];
        if (values.length === availableProducts.length + 1) {
          setIsAllProductSelected(false);
          return setSelectedProducts([]);
        }
        setIsAllProductSelected(true);
        return setSelectedProducts(availableProducts);
      }
  
      const availableProducts =
        getProductsForBrand(tpoData.retailer_id, tpoData.brand_id) || [];
      if (values.length === availableProducts.length) {
        setIsAllProductSelected(true);
      }
  
      setSelectedProducts(values);
  
      // Save the updated state
      const currentState =
        getTpoStoredState(project_id, model_id, event_tpo_id) || {};
      const newState = {
        ...currentState,
        products: values,
      };
      saveTpoState(project_id, model_id, event_tpo_id, newState);
    };

    const fetchProductDataHandler = async (products) => {
      try {
        await dispatch(
          fetchProductData(
            products,
            tpoData?.project_id,
            tpoData?.model_id,
            tpoData?.retailer_id
          )
        );
      } catch (error) {
        console.log("Error in fetching promo event simulation data: ", error);
      }
    };

    useEffect(() => {
      if (tpoData?.retailer_id && selectedProducts.length > 0) {
        fetchProductDataHandler(selectedProducts);
      }
    }, [selectedProducts]);

    useEffect(() => {
      if (tpoData) {
        setTargetValues({
          volume: tpoData.volume || 0,
          spend: tpoData.spend || 0,
          revenue: tpoData.revenue || 0,
        });
      }
    }, [tpoData]);

    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
	const [isEditingTargets, setIsEditingTargets] = useState(false);
	const [targetValues, setTargetValues] = useState({
		volume: 0,
		spend: 0,
		revenue: 0,
	});
	const [tempTargets, setTempTargets] = useState({});
	const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
		const fetchAvailableYears = async () => {
			try {
				const api = `/events/tpo/available-years`;
				const config = {
					params: {
						project_id,
						model_id,
						retailer_id: tpoData?.retailer_id,
						brand_id: tpoData?.brand_id,
						year: tpoData.year,
					},
				};
				const response = await axiosInstance.get(api, config);
				setAvailableYears(response.data);
			} catch (error) {
				console.error("Error fetching available years:", error);
			}
		};

		if (tpoData?.retailer_id && tpoData?.brand_id) {
			fetchAvailableYears();
		}
	}, [tpoData]);


  const { events, createEvent, updateEvent, deleteEvent, refreshEvents } = useEvents()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentYear, setCurrentYear] = useState<number>(Number((tpoData as any)?.year))
    const safeTpoData = tpoData as any;

    const [widgetValues, setWidgetValues] = useState(calculateWidgetValues(events, targetValues.spend, Number(tpoData?.year)))
    const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

    useEffect(() => {
      setCurrentYear(Number(tpoData?.year))
      refreshEvents(tpoData?.id)
      setWidgetValues(calculateWidgetValues(events, targetValues.spend, Number(tpoData?.year)))
  }, [tpoData])

  useEffect(() => {
      setWidgetValues(calculateWidgetValues(events, targetValues.spend, Number(tpoData?.year)))
  }, [events, targetValues.spend]);

  const handlePrevYear = () => {
    const eventTPO = availableYears.find(year => Number(year?.year) === Number(currentYear) - 1)
    if (eventTPO) {
        setCurrentYear(Number(eventTPO?.year))
        refreshEvents(eventTPO.id)
    }
}
const handleNextYear = () => {
    const eventTPO = availableYears.find(year => Number(year.year) === Number(currentYear) + 1)
    if (eventTPO) {
        setCurrentYear(Number(eventTPO.year))
        refreshEvents(eventTPO.id)
    }
  }

const handleEventUpdate = async (updatedEvent: Event) => {
  console.log('Calendar updatedEvent', updatedEvent)
  await refreshEvents(tpoData.id)
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
      event_tpo_id: tpoData?.id || '',
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
  setIsModalOpen(true)
}

const handleEditEvent = (event: Event) => {
  setSelectedEvent(event)
  setSelectedDate(undefined)
  setIsModalOpen(true)
}

  useEffect(() => {
    loadTradePlan()
  }, [])

  useEffect(() => {
    if (fetchImportedEvents) {
        refreshEvents(tpoData.id)
    }
}, [fetchImportedEvents])

const handleCopyEvent = (event: any) => {
  setSelectedEvent({
      ...event,
      id: '',
      title: `Copy of ${event.title}`,
  })
  setIsModalOpen(true)
}

const handleDragEnd = async (event: Event, weeksDelta: number) => {
  try {
      // Use the safer toJsDate utility function to handle different date formats
      const startDate = toJsDate(event.start_date);
      const endDate = toJsDate(event.end_date);

      if (!startDate) {
          console.error('Invalid start date:', event.start_date);
          toast.error('Could not update event: Invalid start date')
          return;
      }

      if (!endDate) {
          console.error('Invalid end date:', event.end_date);
          toast.error('Could not update event: Invalid end date')
          return;
      }
      // Calculate exact day delta instead of just weeksDelta
      const daysDelta = weeksDelta * 7;

      // Update dates by adding the exact number of days
      const newStartDate = new Date(startDate);
      newStartDate.setDate(startDate.getDate() + daysDelta);

      const newEndDate = new Date(endDate);
      newEndDate.setDate(endDate.getDate() + daysDelta);

      // Optimistic update
      const updatedEvent = {
          ...event,
          start_date: newStartDate,
          end_date: newEndDate,
      };

      // Show loading message
      const loadingToastId = toast.loading('Updating event...')

      await updateEvent(updatedEvent);

      // Success feedback
      toast.success('Event updated successfully', { id: loadingToastId })
      await refreshEvents(tpoData.id);
  } catch (error) {
      console.error('Failed to update event position:', error);
      toast.error(`Failed to update event: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const handleSaveEvent = async (eventData: Omit<Event, 'id'>) => {
  try {
      console.log({ eventData })
      setIsSubmitting(true)
      if (selectedEvent?.id) {
          await updateEvent({ ...eventData, id: selectedEvent.id })
      } else {
          await createEvent(eventData)
      }
      await refreshEvents(tpoData.id)
      setIsModalOpen(false)
      setSelectedEvent(undefined)
      setSelectedDate(undefined)
  } catch (error) {
      console.error('Failed to save event:', error)
      toast.error('Failed to save event')
  } finally {
      setIsSubmitting(false)
  }
}

const handleDeleteEventWrapper = async (eventId: string) => {
  try {
      const res = await deleteEvent(eventId);
      if (res) {
          toast.success('Event deleted')
          await refreshEvents(tpoData.id)
      } else {
          toast.error('Failed to delete event')
      }
  } catch (error) {
      console.error('Failed to delete event:', error)
  }
}

useEffect(() => {
  if (isCreateEventModalOpen) {
      setIsModalOpen(true)
      console.log({ isCreateEventModalOpen });

  }
}, [isCreateEventModalOpen])

useEffect(() => {
  if (!isModalOpen) {
      setIsCreateEventModalOpen(false)
  }
}, [isModalOpen])

const handleCopyEvents = async (eventsToCopy: Event[]) => {
  try {
      for (const event of eventsToCopy) {
          await createEvent(event)
      }
      await refreshEvents(tpoData.id)
      toast.success('Events copied successfully')
  } catch (error) {
      console.error('Failed to copy events:', error)
      toast.error('Failed to copy events')
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
      // setIsLoading(false)
    }
  }

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
        isOpen = {isModalOpen}
        onClose = {() => setIsModalOpen(false)}
        setIsCreateEventModalOpen={setIsCreateEventModalOpen}
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
              
              <MetricsGrid widgetValues={widgetValues} />
            </div>
            
            <div className="lg:col-span-1">
              <SidePanel setIsEditingTargets={setIsEditingTargets} setTempTargets={setTempTargets} targetValues = {targetValues} setTargetValues = {setTargetValues} tradePlan={tradePlan} />
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
              isCreateEventModalOpen={isCreateEventModalOpen}
              setIsCreateEventModalOpen={setIsCreateEventModalOpen}
              products={getProductsForBrand(
                (safeTpoData?.retailer_id as string) ?? '',
                (safeTpoData?.brand_id as string) ?? ''
              )}
              getProductsForBrand={getProductsForBrand}
              availableYears={availableYears}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent as any}
              onCopyEvent={handleCopyEvent as any}
              onCopyEvents={handleCopyEvents}
              onDeleteEventWrapper={handleDeleteEventWrapper as any}
              onEventUpdate={handleEventUpdate as any}
              onDragEnd={handleDragEnd as any}
              handlePrevYear = {handlePrevYear}
              handleNextYear = {handleNextYear}
              currentYear = {currentYear}
              setCurrentYear = {setCurrentYear}
              events={events}
              refreshEvents={refreshEvents}
            />
          )}
        </motion.div>
      </div>

      <TargetUpdate
      isEditingTargets = {isEditingTargets}
      setIsEditingTargets={setIsEditingTargets}
      setTempTargets={setTempTargets}
      tempTargets={tempTargets}
      targetValues={targetValues}
      setTargetValues={setTargetValues}
      event_tpo_id={event_tpo_id}
      />
      
      <SharedSmartInsightsDrawer
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
