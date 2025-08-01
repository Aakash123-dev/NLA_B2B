'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Calendar, Plus, X } from 'lucide-react'
import { SavedEvent } from '../types'

interface SaveEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: Omit<SavedEvent, 'id' | 'savedAt'>) => void
  initialData?: Partial<SavedEvent>
}

export function SaveEventModal({ isOpen, onClose, onSave, initialData }: SaveEventModalProps) {
  const [formData, setFormData] = useState<Omit<SavedEvent, 'id' | 'savedAt'>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    status: initialData?.status || 'draft',
    type: initialData?.type || 'promotion',
    channel: initialData?.channel || '',
    ppgName: initialData?.ppgName || '',
    products: initialData?.products || [],
    planValue: initialData?.planValue || undefined,
    actualValue: initialData?.actualValue || undefined,
    tradePlanId: initialData?.tradePlanId || '',
    brandName: initialData?.brandName || '',
    tags: initialData?.tags || [],
    category: initialData?.category || '',
    notes: initialData?.notes || ''
  })

  const [newTag, setNewTag] = useState('')
  const [newProduct, setNewProduct] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    if (!formData.channel.trim()) {
      newErrors.channel = 'Channel is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      onClose()
      // Reset form
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'draft',
        type: 'promotion',
        channel: '',
        ppgName: '',
        products: [],
        planValue: undefined,
        actualValue: undefined,
        tradePlanId: '',
        brandName: '',
        tags: [],
        category: '',
        notes: ''
      })
      setErrors({})
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }))
  }

  const addProduct = () => {
    if (newProduct.trim() && !formData.products?.includes(newProduct.trim())) {
      setFormData(prev => ({
        ...prev,
        products: [...(prev.products || []), newProduct.trim()]
      }))
      setNewProduct('')
    }
  }

  const removeProduct = (productToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products?.filter(product => product !== productToRemove) || []
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            {initialData ? 'Edit Event' : 'Save New Event'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  className={errors.title ? 'border-red-300' : ''}
                />
                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel">Channel *</Label>
                <Input
                  id="channel"
                  value={formData.channel}
                  onChange={(e) => setFormData(prev => ({ ...prev, channel: e.target.value }))}
                  placeholder="e.g., Digital Advertising, In-Store Display"
                  className={errors.channel ? 'border-red-300' : ''}
                />
                {errors.channel && <p className="text-sm text-red-600">{errors.channel}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the event..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="campaign">Campaign</SelectItem>
                    <SelectItem value="launch">Launch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Event category"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Event Schedule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className={errors.startDate ? 'border-red-300' : ''}
                />
                {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className={errors.endDate ? 'border-red-300' : ''}
                />
                {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ppgName">PPG Name</Label>
                <Input
                  id="ppgName"
                  value={formData.ppgName}
                  onChange={(e) => setFormData(prev => ({ ...prev, ppgName: e.target.value }))}
                  placeholder="Product Planning Group name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandName">Brand</Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                  placeholder="Brand name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planValue">Plan Value ($)</Label>
                <Input
                  id="planValue"
                  type="number"
                  value={formData.planValue || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, planValue: e.target.value ? Number(e.target.value) : undefined }))}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actualValue">Actual Value ($)</Label>
                <Input
                  id="actualValue"
                  type="number"
                  value={formData.actualValue || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, actualValue: e.target.value ? Number(e.target.value) : undefined }))}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            
            <div className="flex gap-2">
              <Input
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Add product..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
              />
              <Button type="button" onClick={addProduct} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.products && formData.products.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.products.map((product, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {product}
                    <X className="w-3 h-3 ml-1" onClick={() => removeProduct(product)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tags</h3>
            
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer">
                    {tag}
                    <X className="w-3 h-3 ml-1" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {initialData ? 'Update Event' : 'Save Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
