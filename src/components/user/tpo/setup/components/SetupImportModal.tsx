'use client'

import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Upload, Download, FileText, AlertCircle, CheckCircle, X } from 'lucide-react'
import { generateCSVTemplate } from '../../utils'

interface SetupImportModalProps {
  isOpen: boolean
  onClose: () => void
  retailer: string
  brand: string
}

export function SetupImportModal({ isOpen, onClose, retailer, brand }: SetupImportModalProps) {
  const [importType, setImportType] = useState<'basic' | 'advanced'>('basic')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.name.endsWith('.csv')) {
        setUploadError('Please select a CSV file')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB')
        return
      }

      setSelectedFile(file)
      setUploadError('')
      setUploadSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload')
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      // Here you would typically upload the file to your API
      // For now, we'll simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Uploading file:', selectedFile.name)
      console.log('Import type:', importType)
      console.log('Retailer:', retailer)
      console.log('Brand:', brand)
      
      setUploadSuccess(true)
      
      // Auto-close after success
      setTimeout(() => {
        handleClose()
      }, 1500)
      
    } catch (error) {
      setUploadError('Upload failed. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate(importType, retailer)
    const filename = `${importType}_events_template_${retailer.toLowerCase().replace(/\s+/g, '_')}.csv`
    
    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null)
      setUploadError('')
      setUploadSuccess(false)
      setImportType('basic')
      onClose()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.endsWith('.csv')) {
        setSelectedFile(file)
        setUploadError('')
        setUploadSuccess(false)
      } else {
        setUploadError('Please select a CSV file')
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Upload className="w-5 h-5 text-blue-600" />
            Import Events
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Import Type Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Select Import Type</Label>
            <RadioGroup
              value={importType}
              onValueChange={(value: 'basic' | 'advanced') => setImportType(value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="basic" id="basic" />
                <div className="flex-1">
                  <Label htmlFor="basic" className="font-medium cursor-pointer">
                    Basic Import
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Import events with basic fields: Title, Description, Dates, Status, PPG Name
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="advanced" id="advanced" />
                <div className="flex-1">
                  <Label htmlFor="advanced" className="font-medium cursor-pointer">
                    Advanced Import
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Import events with additional fields: Products, Channels, Plan Value, Actual Value
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Download Template */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Download Template</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Download the CSV template for {importType} import to ensure proper formatting.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {importType.charAt(0).toUpperCase() + importType.slice(1)} Template
                </Button>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Upload CSV File</Label>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                selectedFile 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                  <p className="font-medium text-green-900">{selectedFile.name}</p>
                  <p className="text-sm text-green-700">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose Different File
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="font-medium text-gray-700">
                    Drag and drop your CSV file here
                  </p>
                  <p className="text-sm text-gray-500">or</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Upload Status */}
          {uploadError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-700">{uploadError}</p>
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">
                Events imported successfully! The page will refresh shortly.
              </p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading || uploadSuccess}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Uploading...' : 'Import Events'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
