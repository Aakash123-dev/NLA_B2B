'use client'

import React, { useEffect, useState } from 'react'
import { Event } from '../../../../types/event'
import { message, Popconfirm } from 'antd'
import { X, Edit, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'

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
  if (!isOpen) return null

  const confirm = async () => {
    onClose()
    onDelete()
  }

  const cancel = () => {
    message.error('Rejected')
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden m-4">
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
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-md transition-colors">
                    <Trash2 size={16} />
                    Delete Event
                  </button>
                </Popconfirm>

                <button onClick={() => { onClose(); onEdit(); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md transition-colors">
                  <Edit size={16} />
                  Edit Event
                </button>
              </>
            )}
            <button onClick={onClose} className="text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Information</h3>
              <div className='grid grid-cols-[30%_40%_30%] gap-4'>
                <div className="flex items-start gap-2">
                  <div className="text-sm font-medium text-black">Title</div>
                  <div className="text-gray-900">{event.title}</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-sm font-medium text-black">PPG Name</div>
                  <div className="text-gray-900">{event.ppg_name}</div>
                </div>
                {event.description && (
                  <div className="flex items-start gap-2">
                    <div className="text-sm font-medium text-black">Description</div>
                    <div className="text-gray-900">{event.description}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}


