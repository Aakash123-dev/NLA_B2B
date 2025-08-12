'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Form, Collapse, type CollapseProps, Tabs, Button } from 'antd'
// Types (local aliases to fit current codebase)
type Event = any
type EventProduct = any
type EventStatus = any

const MOCK_CHANNELS = [] as any[]
import { createPortal } from 'react-dom'
import { CaretRightOutlined } from '@ant-design/icons'
type ProductAccordionItem = { key: string; label: React.ReactNode; children: React.ReactNode }
import dayjs from 'dayjs'
type ActualResultsType = any
import axios from 'axios'
import { axiosPythonInstance } from '@/services/projectservices/axiosInstance'
import FinancialFields from './FinancialFields'
import FinancialResults from './FinancialResults'
import ActualResultsEditor from './ActualResults'
import EventDetails from './EventDetails'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (eventData: Omit<Event, 'id'>) => Promise<void>
  initialEvent?: Event
  startDate?: Date
  endDate?: Date
  productData: any[]
  products: string[]
  getProductsForBrand: (retailerId: string, brandId: string) => string[]
  tpoData: any
  isSubmitting: boolean
  currentYear: number
  events: Event[]
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
      initialEvent,
      startDate,
      productData,
      products,
      getProductsForBrand,
      tpoData,
      currentYear,
      endDate,
       events,
       isSubmitting
}) => {
  const [form] = Form.useForm()

  const initialFormData = {
    title: '',
    description: '',
    start_date: startDate ? dayjs(startDate) : undefined,
    end_date: endDate ? dayjs(endDate) : undefined,
    color: '#4F46E5',
    status: 'DRAFT' as EventStatus,
    channels: [],
    event_tpo_id: tpoData?.id || '',
    planned: [],
    actual: [],
    ppg_name: '',
  }

  const [formData, setFormData] = useState<Omit<Event, 'id'>>(initialFormData)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  useEffect(() => {
    if (initialEvent) {
      setFormData({
        ...initialEvent,
        start_date: initialEvent?.start_date ? dayjs(initialEvent.start_date) : undefined,
        end_date: initialEvent?.end_date ? dayjs(initialEvent.end_date) : undefined,
      })
    }
  }, [initialEvent])

  const safelyConvertToDate = (date: any): Date | null => {
    if (!date) return null
    try {
      if (date instanceof Date) return date
      if (date && typeof date === 'object' && typeof (date as any).toDate === 'function') {
        return (date as any).toDate()
      }
      const parsed = dayjs(date).toDate()
      if (!isNaN(parsed.getTime())) return parsed
      return null
    } catch (error) {
      console.error('Error converting date:', error, date)
      return null
    }
  }

  const findOverlappingEdlpEvents = (startDateInput: any, endDateInput: any) => {
    console.log('findOverlappingEdlpEvents inputs:', {
        startDateType: startDateInput ? typeof startDateInput : 'undefined',
        startDate: startDateInput,
        endDateType: endDateInput ? typeof endDateInput : 'undefined',
        endDate: endDateInput,
        isDayjsStart: startDateInput && typeof startDateInput.toDate === 'function',
        isDayjsEnd: endDateInput && typeof endDateInput.toDate === 'function',
        eventsCount: events.length
    });

    // Safely convert dates
    const start = safelyConvertToDate(startDateInput);
    const end = safelyConvertToDate(endDateInput);

    if (!start || !end || events.length === 0) {
        console.log('Not proceeding with EDLP check: invalid dates or no events');
        return [];
    }

    const newEventDuration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    console.log(`Finding EDLP events overlapping with ${start.toISOString()} - ${end.toISOString()}, duration: ${newEventDuration} days`);
    console.log(`Total events to check: ${events.length}`);

    const overlappingEvents = events.filter(event => {
        // Skip if this is the same event we're editing
        if (initialEvent && event.id === initialEvent.id) return false;

        // Safely convert event dates
        const eventStart = safelyConvertToDate(event.start_date);
        const eventEnd = safelyConvertToDate(event.end_date);

        if (!eventStart || !eventEnd) {
            console.log(`Skipping event ${event.id}: invalid dates`);
            return false;
        }

        // Calculate event duration
        const eventDuration = Math.ceil((eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60 * 24));

        // Check if this is a longer event (EDLP)
        if (eventDuration > newEventDuration) {
            // Check if dates overlap
            const overlaps = (
                (start >= eventStart && start <= eventEnd) || // New event starts during existing event
                (end >= eventStart && end <= eventEnd) || // New event ends during existing event
                (start <= eventStart && end >= eventEnd) // New event spans the entire existing event
            );

            if (overlaps) {
                console.log(`Found overlapping EDLP event: "${event.title}" (${eventStart.toISOString()} - ${eventEnd.toISOString()}, duration: ${eventDuration} days)`);
            }

            return overlaps;
        }
        return false;
    });

    console.log(`Found ${overlappingEvents.length} overlapping EDLP events`);
    return overlappingEvents;
};


const applyEdlpPromoPricesAsBasePrices = (plannedProducts: EventProduct[]) => {
  try {
      // Verify we have valid form data and products to process
      if (!formData || !plannedProducts || plannedProducts.length === 0) {
          console.log("No products to apply EDLP prices to");
          return plannedProducts;
      }

      if (!formData.start_date || !formData.end_date) {
          console.log("Cannot apply EDLP prices: missing start or end date");
          return plannedProducts;
      }

      // Extra log to debug date types
      console.log('applyEdlpPromoPricesAsBasePrices form dates:', {
          startDate: formData.start_date,
          startDateType: typeof formData.start_date,
          endDate: formData.end_date,
          endDateType: typeof formData.end_date
      });

      const overlappingEdlpEvents = findOverlappingEdlpEvents(
          formData.start_date,
          formData.end_date
      );

      if (overlappingEdlpEvents.length === 0) {
          console.log("No overlapping EDLP events found");
          return plannedProducts;
      }

      console.log(`Checking ${plannedProducts.length} products in new event against ${overlappingEdlpEvents.length} EDLP events`);

      const updatedProducts = plannedProducts.map(product => {
          console.log(`Processing product: ${product.productName} (ID: ${product.productId}, current basePrice: ${product.financialData.basePrice})`);

          // Look for matching products in the EDLP events
          for (const edlpEvent of overlappingEdlpEvents) {
              console.log(`Checking EDLP event: ${edlpEvent.title}`);
              const matchingProduct = edlpEvent.planned.find(p => p.productId === product.productId);

              if (matchingProduct) {
                  console.log(`Found matching product in EDLP event. Promo price: ${matchingProduct.financialData.promoPrice}`);

                  if (matchingProduct.financialData.promoPrice > 0) {
                      // Use the EDLP promo price as the base price for this product
                      console.log(`APPLYING EDLP promo price ${matchingProduct.financialData.promoPrice} as base price for ${product.productName}`);
                      return {
                          ...product,
                          financialData: {
                              ...product.financialData,
                              basePrice: matchingProduct.financialData.promoPrice,
                              originalBasePrice: matchingProduct.financialData.promoPrice,
                          }
                      };
                  } else {
                      console.log(`Skipping: EDLP promo price is not greater than 0`);
                  }
              } else {
                  console.log(`No matching product found in this EDLP event`);
              }
          }
          console.log(`No changes made to product ${product.productName}`);
          return product;
      });

      // Log the changes
      updatedProducts.forEach((product, index) => {
          const original = plannedProducts[index];
          if (product.financialData.basePrice !== original.financialData.basePrice) {
              console.log(`Changed base price for ${product.productName}: ${original.financialData.basePrice} -> ${product.financialData.basePrice}`);
          }
      });

      return updatedProducts;
  } catch (error) {
      console.error('Error in applyEdlpPromoPricesAsBasePrices:', error);
      return plannedProducts;
  }
};

  useEffect(() => {
    if ((formData as any).start_date && (formData as any).end_date && (formData as any).planned.length > 0) {
      const updatedPlanned = applyEdlpPromoPricesAsBasePrices((formData as any).planned)
      const hasChanges = (updatedPlanned as any[]).some((product: any, index: number) =>
        product.financialData.basePrice !== (formData as any).planned[index].financialData.basePrice
      )
      if (hasChanges) {
        setFormData(prev => ({ ...(prev as any), planned: updatedPlanned } as any))
      }
    }
  }, [(formData as any).start_date, (formData as any).end_date, (formData as any).planned, events])

  const handleProductDataChange = (productId: string, productName: string, financialData: any) => {
    setFormData(prev => ({
      ...(prev as any),
      planned: (prev as any).planned.map((p: any) =>
        p.productId === productId ? { ...p, financialData, productName } : p
      ),
    } as any))
  }

  const handleActualResultsChange = (productId: string, actualResults: ActualResultsType) => {
    setFormData(prev => ({
      ...(prev as any),
      actual: (prev as any).actual.map((p: any) =>
        p.productId === productId ? { ...p, actualResults } : p
      ),
    } as any))
  }

  useEffect(() => {
    if ((formData as any).planned.length > 0) {
      setFormData(prev => ({
        ...(prev as any),
        actual: (prev as any).planned.map((plannedProduct: any) => {
          const existingActual = (prev as any).actual.find((a: any) => a.productId === plannedProduct.productId)
          if (existingActual) return existingActual
          return { ...plannedProduct, actualResults: undefined }
        })
      } as any))
    }
  }, [(formData as any).planned])

  useEffect(() => {
    console.log('[DEBUG] useEffect (auto-select product):', {
        start_date: formData.start_date,
        end_date: formData.end_date,
        plannedLength: formData.planned.length,
        selectedProductId
    });
    if (
        formData.start_date &&
        formData.end_date &&
        formData.planned.length > 0 &&
        !selectedProductId
    ) {
        console.log('[DEBUG] Auto-selecting first product:', formData.planned[0].productId);
        setSelectedProductId(formData.planned[0].productId);
    }
}, [formData.start_date, formData.end_date, formData.planned, selectedProductId]);

useEffect(() => {
  console.log('[DEBUG] useEffect (API call for units):', {
      start_date: formData.start_date,
      end_date: formData.end_date,
      plannedLength: formData.planned.length,
      tpoData,
      selectedProductId
  });
  // Only run if all required data is present and a product is selected
  if (
      formData.start_date &&
      formData.end_date &&
      formData.planned.length > 0 &&
      tpoData?.model_id &&
      tpoData?.project_id &&
      tpoData?.retailer_id &&
      tpoData?.brand_id &&
      selectedProductId
  ) {
      // Helper to format date as dd-mm-yy
      const formatDate = (date: any) => {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = String(d.getFullYear()).slice(-2);
          return `${day}-${month}-${year}`;
      };

      // Find the selected product in planned
      const idx = formData.planned.findIndex(p => p.productId === selectedProductId);
      console.log('[DEBUG] Selected product index:', idx);
      if (idx !== -1) {
          const product = formData.planned[idx];
          const params = {
              model_id: tpoData.model_id,
              project_id: tpoData.project_id,
              retailer: tpoData.retailer_id, // If you need the name, adjust accordingly
              brand: tpoData.brand_id, // If you need the name, adjust accordingly
              product: product.productName, // If you need the ID, adjust accordingly
              start_date: formatDate(formData.start_date),
              end_date: formatDate(formData.end_date),
          };
          const apiUrl = `/insights/base-units/historical?model_id=${params.model_id}&project_id=${params.project_id}&retailer=${encodeURIComponent(params.retailer)}&brand=${encodeURIComponent(params.brand)}&product=${encodeURIComponent(params.product)}&start_date=${params.start_date}&end_date=${params.end_date}`;
          console.log('[DEBUG] API URL:', apiUrl);
          (async () => {
              try {
                  const response = await axiosPythonInstance.get(apiUrl);
                  console.log('[DEBUG] API response:', response.data);
                  if (response.data && response.data.data && response.data.data.sum_base_units) {
                      console.log('[DEBUG] Setting units to:', Math.round(response.data.data.sum_base_units), 'for product', product.productName);
                      setFormData(prev => {
                          const newPlanned = prev.planned.map((p, i) =>
                              i === idx
                                  ? {
                                      ...p,
                                      financialData: {
                                          ...p.financialData,
                                          units: Math.round(response.data.data.sum_base_units),
                                          totalUnits: Math.round(response.data.data.sum_base_units),
                                          originalTotalUnits: Math.round(response.data.data.sum_base_units),
                                      },
                                  }
                                  : p
                          );
                          console.log('[DEBUG] Updated planned array:', newPlanned);
                          return { ...prev, planned: newPlanned };
                      });
                  }
              } catch (error) {
                  console.error('[DEBUG] Failed to fetch base units:', error);
              }
          })();
      } else {
          console.log('[DEBUG] No product found for selectedProductId');
      }
  } else {
      console.log('[DEBUG] Not all conditions met for API call');
  }
  // eslint-disable-next-line
}, [formData.start_date, formData.end_date, selectedProductId, tpoData]);

  const handleSubmit = async () => {
    try {
      let updatedPlanned
      try {
        updatedPlanned = applyEdlpPromoPricesAsBasePrices((formData as any).planned)
      } catch (error) {
        console.error('Error applying EDLP prices:', error)
        updatedPlanned = (formData as any).planned
      }
      const updatedFormData = { ...(formData as any), planned: updatedPlanned }
      await onSave(updatedFormData)
      form.resetFields()
      setFormData(initialFormData as any)
    } catch (error) {
      console.error('Failed to submit form:', error)
    }
  }

  if (!isOpen) return null

  const getEdlpBasePriceMap = () => {
    try {
        // Only attempt to find overlaps if we have valid form data
        if (!formData || !formData.start_date || !formData.end_date) {
            console.log('Cannot get EDLP prices: missing start or end date in form data');
            return new Map();
        }

        // Extra safeguard: log date information
        console.log('getEdlpBasePriceMap form dates:', {
            startDate: formData.start_date,
            startDateType: typeof formData.start_date,
            endDate: formData.end_date,
            endDateType: typeof formData.end_date
        });

        const overlappingEdlpEvents = findOverlappingEdlpEvents(
            formData.start_date,
            formData.end_date
        );

        // Create a map of productId -> EDLP base price for quick lookup
        const edlpPriceMap = new Map<string, number>();

        if (overlappingEdlpEvents.length > 0) {
            formData.planned.forEach(product => {
                for (const edlpEvent of overlappingEdlpEvents) {
                    const matchingProduct = edlpEvent.planned.find(p => p.productId === product.productId);
                    if (matchingProduct && matchingProduct.financialData.promoPrice > 0) {
                        edlpPriceMap.set(product.productId, matchingProduct.financialData.promoPrice);
                        break; // Use the first matching EDLP event with a valid promo price
                    }
                }
            });
        }

        return edlpPriceMap;
    } catch (error) {
        console.error('Error in getEdlpBasePriceMap:', error);
        return new Map();
    }
};


  let edlpBasePriceMap: Map<string, number>
  try {
    edlpBasePriceMap = getEdlpBasePriceMap()
  } catch (error) {
    edlpBasePriceMap = new Map()
  }

  const planProductItems: CollapseProps['items'] = (formData as any).planned
    .map((eventProduct: any) => {
      const product = productData?.find((p: any) => p.id === eventProduct.productId)
      if (product) {
        eventProduct.financialData.originalBasePrice = product.originalBasePrice
        eventProduct.financialData.originalTotalUnits = product.originalTotalUnits
        eventProduct.financialData.basePriceElasticity = product.basePriceElasticity
      }
      if (!product) return null
      const edlpBasePrice = edlpBasePriceMap.get(eventProduct.productId)
      const item: ProductAccordionItem = {
        key: eventProduct.productId,
        label: eventProduct.productName,
        children: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-4">Financial Details</h4>
              {edlpBasePrice && (
                <div className="mt-2 text-xs text-blue-600">
                  Using EDLP price: ${edlpBasePrice.toFixed(2)} (original: ${product.basePrice.toFixed(2)})
                </div>
              )}
              <FinancialFields
                productId={eventProduct.productId}
                financialData={eventProduct.financialData}
                onChange={(data: any) => handleProductDataChange(eventProduct.productId, eventProduct.productName, data)}
                basePrice={product.basePrice}
                totalUnits={eventProduct.financialData.totalUnits ? eventProduct.financialData.totalUnits : product.units}
                onFocus={() => setSelectedProductId(eventProduct.productId)}
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Results</h4>
              <FinancialResults financialData={eventProduct.financialData} />
            </div>
          </div>
        )
      }
      return item
    })
    .filter((item: any) => item !== null)

  const actualProductItems: CollapseProps['items'] = (formData as any).actual
    .map((eventProduct: any) => {
      const product = productData?.find((p: any) => p.id === eventProduct.productId)
      if (!product) return null
      const item: ProductAccordionItem = {
        key: eventProduct.productId,
        label: eventProduct.productName,
        children: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-4">Financial Details (Read Only)</h4>
              <FinancialFields
                productId={eventProduct.productId}
                financialData={eventProduct.financialData}
                onChange={() => {}}
                basePrice={product?.basePrice || 0}
                totalUnits={product?.totalUnits || 0}
                readonly={true}
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Actual Results</h4>
              <ActualResultsEditor
                financialData={eventProduct.financialData}
                actualResults={eventProduct.actualResults}
                onChange={(actualResults: any) => handleActualResultsChange(eventProduct.productId, actualResults)}
              />
            </div>
          </div>
        )
      }
      return item
    })
    .filter((item: any) => item !== null)

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg w-full max-w-[95vw] max-h-[90vh] overflow-hidden m-4">
        <div className="flex justify-between items-center px-6 py-2 bg-secondary border-b">
          <h2 className="text-xl font-medium text-white">
            {initialEvent && startDate == undefined ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <Form form={form} onFinish={handleSubmit} className="flex flex-col h-[calc(90vh-80px)]" layout="vertical">
          <div className="flex-1 overflow-auto">
            <div className="flex">
              <div className="border-r border-gray-200 p-6 w-[30%]">
                <EventDetails
                  formData={formData}
                  setFormData={setFormData}
                  channels={MOCK_CHANNELS}
                  planned={(formData as any).planned}
                  actual={(formData as any).actual}
                  products={products}
                  tpoData={tpoData}
                  getProductsForBrand={getProductsForBrand}
                />
              </div>
              <Tabs defaultActiveKey="1" className="p-4 w-[70%]">
                <Tabs.TabPane tab="Plan" key="1">
                  <div className="p-2 overflow-auto">
                    <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                    {(formData as any).planned.length > 0 ? (
                      <Collapse items={planProductItems} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} />
                    ) : (
                      <div className="text-center text-gray-500 py-8">Select products to view details</div>
                    )}
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Actual" key="2">
                  <div className="p-2 overflow-auto">
                    <h3 className="text-lg font-semibold mb-4">Actual Product Details</h3>
                    {(formData as any).actual.length > 0 ? (
                      <Collapse items={actualProductItems} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} />
                    ) : (
                      <div className="text-center text-gray-500 py-8">Add products in Plan tab to view actual details</div>
                    )}
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <Button key="cancel" onClick={onClose} className="btn btn-outline-secondary h-auto">Cancel</Button>
              <Button type="primary" className="btn btn-primary h-auto" disabled={isSubmitting} loading={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? 'Submitting...' : initialEvent && startDate == undefined ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default EventModal



