'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  MapPin, 
  Tag, 
  Edit, 
  Trash2, 
  Copy, 
  CheckCircle, 
  PlayCircle, 
  PauseCircle, 
  Clock,
  DollarSign,
  Package,
  Building,
  AlertCircle,
  FileText,
  Hash
} from 'lucide-react'
import { SavedEvent } from '../types'
import { SaveEventModal } from './SaveEventModal'

interface EventDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  event: SavedEvent
  onUpdate: (updates: Partial<SavedEvent>) => void
  onDelete: () => void
  onDuplicate: () => void
}

export function EventDetailsModal({
  isOpen,
  onClose,
  event,
  onUpdate,
  onDelete,
  onDuplicate
}: EventDetailsModalProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'active':
        return <PlayCircle className="w-5 h-5 text-blue-500" />
      case 'planned':
        return <Clock className="w-5 h-5 text-orange-500" />
      case 'draft':
        return <PauseCircle className="w-5 h-5 text-gray-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'planned':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'promotion':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'campaign':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'launch':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateDuration = () => {
    const start = new Date(event.startDate)
    const end = new Date(event.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleUpdateEvent = (updatedEvent: Omit<SavedEvent, 'id' | 'savedAt'>) => {
    onUpdate(updatedEvent)
    setIsEditModalOpen(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {event.title}
                </DialogTitle>
                <div className="flex items-center gap-3">
                  <Badge className={`text-sm ${getStatusColor(event.status)}`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(event.status)}
                      {event.status}
                    </span>
                  </Badge>
                  <Badge className={`text-sm ${getTypeColor(event.type)}`}>
                    {event.type}
                  </Badge>
                  {event.category && (
                    <Badge variant="outline" className="text-sm">
                      {event.category}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={onDuplicate}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" onClick={onDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Event Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Start Date</p>
                      <p className="text-gray-900">{formatDate(event.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">End Date</p>
                      <p className="text-gray-900">{formatDate(event.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Duration</p>
                      <p className="text-gray-900">{calculateDuration()} days</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Channel & Location */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Channel & Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Channel</p>
                      <p className="text-gray-900">{event.channel}</p>
                    </div>
                    {event.brandName && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Brand</p>
                        <p className="text-gray-900">{event.brandName}</p>
                      </div>
                    )}
                    {event.ppgName && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">PPG</p>
                        <p className="text-gray-900">{event.ppgName}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Financial Information */}
                {(event.planValue || event.actualValue) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Financial Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {event.planValue && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Plan Value</p>
                          <p className="text-gray-900 text-lg font-semibold">${event.planValue.toLocaleString()}</p>
                        </div>
                      )}
                      {event.actualValue && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Actual Value</p>
                          <p className="text-gray-900 text-lg font-semibold">${event.actualValue.toLocaleString()}</p>
                        </div>
                      )}
                      {event.planValue && event.actualValue && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Variance</p>
                          <p className={`text-lg font-semibold ${
                            event.actualValue >= event.planValue ? 'text-green-600' : 'text-red-600'
                          }`}>
                            ${(event.actualValue - event.planValue).toLocaleString()} 
                            ({((event.actualValue - event.planValue) / event.planValue * 100).toFixed(1)}%)
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Meta Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="w-5 h-5 text-purple-600" />
                      Meta Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Event ID</p>
                      <p className="text-gray-900 font-mono text-sm">{event.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Saved At</p>
                      <p className="text-gray-900">{formatDateTime(event.savedAt)}</p>
                    </div>
                    {event.tradePlanId && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Trade Plan ID</p>
                        <p className="text-gray-900 font-mono text-sm">{event.tradePlanId}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                      <p className="text-gray-900 whitespace-pre-wrap">{event.description}</p>
                    </div>
                  )}
                  
                  {event.tags && event.tags.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Associated Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {event.products && event.products.length > 0 ? (
                    <div className="space-y-2">
                      {event.products.map((product, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Package className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-900">{product}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No products associated with this event</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {event.notes ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-900 whitespace-pre-wrap">{event.notes}</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No notes added to this event</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <SaveEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateEvent}
        initialData={event}
      />
    </>
  )
}
