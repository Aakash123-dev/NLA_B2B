'use client'

import React, { useEffect, useState } from 'react'
import { message, Popconfirm, PopconfirmProps } from 'antd'
import { X, Edit, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Event } from '@/types/event'
import { axiosInstance } from '@/services/projectservices/axiosInstance';
import { getProductData } from '@/utils/importUtils'
import { EventBasicInfo } from '../sections/EventBasicInfo'
import { ProductAccordionView } from '../../../ProductAccordionView'

interface EventViewModalProps {
  event: Event
  tpoData: any
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
  onEventUpdate?: (updatedEvent: Event) => void
  currentYear: number
}

export const EventViewModal: React.FC<EventViewModalProps> = ({
  event,
  tpoData,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onEventUpdate,
  currentYear
}) => {
 
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEvent, setCurrentEvent] = useState<Event>(event);

  const handleDeleteProduct = async (productId: string) => {
    try {
        const auth = JSON.parse(localStorage.getItem("auth") || '{}')
        
        const response = await axiosInstance.delete(`/events/${currentEvent.id}/products/${productId}`)

        if (!response.ok) {
            throw new Error('Failed to delete product')
        }

        const result = await response.json()
        const updatedEvent = result.event

        // Update local state
        setCurrentEvent(updatedEvent)
        
        // Update parent component if callback provided
        if (onEventUpdate) {
            console.log('updatedEvent', updatedEvent)
            
            onEventUpdate(updatedEvent)
        }

        // Refresh products list
        await fetchProducts()
    } catch (error) {
        console.error('Error deleting product:', error)
        throw error
    }
}


const fetchProducts = async () => {
  try {
      const productPromises = currentEvent.planned.map(ep =>
          getProductData(ep.productName, tpoData)
      );

      const resolvedProducts = await Promise.all(productPromises);
      setProducts(resolvedProducts);
  } catch (error) {
      console.error('Failed to fetch products:', error);
  } finally {
      setIsLoading(false);
  }
};

useEffect(() => {
  setCurrentEvent(event)
}, [event])

useEffect(() => {
  fetchProducts();
}, [currentEvent]);

if (!isOpen) return null

const handleEdit = () => {
    onClose()
    onEdit()
}

const confirm: PopconfirmProps['onConfirm'] = async (e) => {
    const handleDelete = async () => {
        onClose()
        onDelete()
    }
    handleDelete()
}

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e)
  message.error('Rejected')
}

  
const modalContent = (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden m-4">
          <div className="flex justify-between items-center px-6 py-3 border-b bg-secondary sticky top-0 z-10">
              <h2 className="text-2xl font-medium text-white">Event Details</h2>
              <div className="flex items-center gap-4">
                  {Number(currentYear) === Number(tpoData.year) && (
                      <>
                          <Popconfirm
                              title="Delete the event?"
                              description="Are you sure to delete this event?"
                              onConfirm={confirm}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                          >
                              <button
                                  className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-md transition-colors"
                              >
                                  <Trash2 size={16} />
                                  Delete Event
                              </button>
                          </Popconfirm>

                          <button
                              onClick={handleEdit}
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md transition-colors"
                          >
                              <Edit size={16} />
                              Edit Event
                          </button>
                      </>
                  )}
                  <button
                      onClick={onClose}
                      className="text-white transition-colors"
                  >
                      <X size={24} />
                  </button>
              </div>
          </div>

          <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-6">
                  <EventBasicInfo event={event} />
                  {/* <EventAdditionalInfo event={event} /> */}
                  {isLoading ? (
                      <div>Loading products...</div>
                  ) : (
                      products.length > 0 && (
                          <ProductAccordionView
                              products={products}
                              eventProducts={currentEvent.planned}
                              onDeleteProduct={handleDeleteProduct}
                              canDelete={Number(currentYear) === Number(tpoData.year)}
                          />
                      )
                  )}
              </div>
          </div>
      </div>
  </div>
)

  return createPortal(modalContent, document.body)
}


