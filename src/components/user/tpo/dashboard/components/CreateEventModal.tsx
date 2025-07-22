'use client'

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Calendar, Palette } from "lucide-react";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
  tradePlanId?: string;
}

const channelOptions = [
  "In-Store Display", "Digital Advertising", "Print Media", "Social Media", 
  "Email Marketing", "Radio", "TV", "Outdoor", "Direct Mail"
];

const productOptions = [
  "APPLEGATE NATURALS Organic Turkey Slices",
  "APPLEGATE NATURALS Organic Ham",
  "APPLEGATE NATURALS Organic Chicken Breast",
  "APPLEGATE NATURALS Organic Roast Beef"
];

const colorOptions = [
  { value: "#3B82F6", label: "Blue", bg: "bg-blue-500" },
  { value: "#10B981", label: "Green", bg: "bg-green-500" },
  { value: "#F59E0B", label: "Orange", bg: "bg-orange-500" },
  { value: "#EF4444", label: "Red", bg: "bg-red-500" },
  { value: "#8B5CF6", label: "Purple", bg: "bg-purple-500" },
  { value: "#06B6D4", label: "Cyan", bg: "bg-cyan-500" }
];

export function CreateEventModal({ isOpen, onClose, onEventCreated, tradePlanId }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    color: "#3B82F6",
    status: "draft",
    channels: [] as string[],
    ppg_name: "",
    products: [] as string[],
    plan_value: 0,
    actual_value: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleArrayToggle = (field: 'channels' | 'products', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onEventCreated();
      onClose();
      // Reset form
      setFormData({
        title: "", description: "", start_date: "", end_date: "",
        color: "#3B82F6", status: "draft", channels: [],
        ppg_name: "", products: [], plan_value: 0, actual_value: 0
      });
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            Add New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Details Section */}
          <div className="bg-gray-50/50 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Event Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event title"
                  className={errors.title ? "border-red-300" : ""}
                />
                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter event description"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                  className={errors.start_date ? "border-red-300" : ""}
                />
                {errors.start_date && <p className="text-sm text-red-600">{errors.start_date}</p>}
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange('end_date', e.target.value)}
                  className={errors.end_date ? "border-red-300" : ""}
                />
                {errors.end_date && <p className="text-sm text-red-600">{errors.end_date}</p>}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Color
                </Label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleInputChange('color', color.value)}
                      className={`w-8 h-8 rounded-lg ${color.bg} border-2 transition-all ${
                        formData.color === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Channels & PPG Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Channels</Label>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 max-h-40 overflow-y-auto">
                {channelOptions.map((channel) => (
                  <label key={channel} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channels.includes(channel)}
                      onChange={() => handleArrayToggle('channels', channel)}
                      className="rounded"
                    />
                    <span className="text-sm">{channel}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.channels.map((channel) => (
                  <Badge key={channel} variant="secondary" className="text-xs">
                    {channel}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleArrayToggle('channels', channel)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>PPG Name</Label>
              <Input
                value={formData.ppg_name}
                onChange={(e) => handleInputChange('ppg_name', e.target.value)}
                placeholder="Enter PPG name"
              />
            </div>
          </div>

          {/* Products & Plan/Actual Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Products</Label>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 max-h-40 overflow-y-auto">
                {productOptions.map((product) => (
                  <label key={product} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.products.includes(product)}
                      onChange={() => handleArrayToggle('products', product)}
                      className="rounded"
                    />
                    <span className="text-sm">{product}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.products.map((product) => (
                  <Badge key={product} variant="secondary" className="text-xs">
                    {product.length > 30 ? `${product.substring(0, 30)}...` : product}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleArrayToggle('products', product)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Plan Value</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.plan_value}
                  onChange={(e) => handleInputChange('plan_value', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Actual Value</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.actual_value}
                  onChange={(e) => handleInputChange('actual_value', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
