'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Upload, File, Download, AlertCircle, Library } from 'lucide-react'
import { motion } from 'framer-motion'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const [importType, setImportType] = useState<'csv' | 'excel' | ''>('')
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !importType) return

    setIsUploading(true)
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real implementation, you would:
      // 1. Upload the file to your server
      // 2. Process and validate the data
      // 3. Import into the trade plan
      
      onClose()
      setFile(null)
      setImportType('')
      
      // Optionally refresh the page or update state
      window.location.reload()
    } catch (error) {
      console.error('Import failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const downloadTemplate = () => {
    // Create a sample CSV content
    const csvContent = `Event Name,Start Date,End Date,PPG Name,Product,Channel,Plan Value,Actual Value,Status
"Summer Sale Q2","2025-06-01","2025-06-30","Summer PPG","APPLEGATE NATURALS Organic Turkey Slices","In-Store Display",50000,0,"draft"
"Back to School Promo","2025-08-15","2025-09-15","BTS PPG","APPLEGATE NATURALS Organic Ham","Digital Advertising",25000,0,"planned"`
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trade_events_template.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleSaveToEventLibrary = () => {
    // Redirect to Event Library with a flag to show import from calendar
    window.open('/user/event-library?tab=save-from-calendar', '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Import Trade Events
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Import Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Import Format</Label>
            <Select value={importType} onValueChange={(value: 'csv' | 'excel') => setImportType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select file format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="excel">Excel File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Template Download */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Need a template?</p>
                <p className="text-xs text-blue-700 mb-3">Download our template to ensure your data is formatted correctly.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadTemplate}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Upload File</Label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : file
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept={importType === 'csv' ? '.csv' : '.xlsx,.xls'}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="text-center">
                {file ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-2"
                  >
                    <File className="w-8 h-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium text-green-900">{file.name}</p>
                    <p className="text-xs text-green-700">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-sm font-medium text-gray-700">
                      Drop your file here or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      {importType === 'csv' ? 'CSV files only' : importType === 'excel' ? 'Excel files only' : 'Select format first'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save to Event Library */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-start gap-3">
              <Library className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-900 mb-1">Save Events to Library</p>
                <p className="text-xs text-indigo-700 mb-3">
                  Save your Trade Calendar events to the Event Library for easy access and management.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveToEventLibrary}
                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                >
                  <Library className="w-4 h-4 mr-2" />
                  Open Event Library
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!file || !importType || isUploading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isUploading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Importing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Import Data</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
