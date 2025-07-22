'use client'

import React, { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle, Download, X } from 'lucide-react'

interface CsvImportFieldProps {
  label: string
  value: File | null
  onChange: (file: File | null) => void
  required?: boolean
  error?: string
  onTemplateDownload?: () => void
}

export function CsvImportField({ 
  label, 
  value, 
  onChange, 
  required = false, 
  error,
  onTemplateDownload
}: CsvImportFieldProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    // Reset previous status
    setUploadStatus('idle')
    
    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadStatus('error')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('error')
      return
    }

    setUploadStatus('success')
    onChange(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveFile = () => {
    onChange(null)
    setUploadStatus('idle')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <motion.div
      whileHover={{ scale: 1.002 }}
      className="space-y-4 w-full"
    >
      <Label className="text-sm font-medium text-gray-700 flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 w-full ${
          isDragOver
            ? 'border-blue-400 bg-blue-50/50 scale-[1.01]'
            : error
            ? 'border-red-300 bg-red-50/30'
            : value
            ? 'border-green-300 bg-green-50/30'
            : 'border-gray-300 bg-gray-50/30 hover:border-gray-400 hover:bg-gray-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        {value ? (
          // File uploaded state
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">{value.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(value.size)} • CSV File</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Upload prompt state
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Upload CSV File
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Drag and drop your CSV file here, or click to browse
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto"
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose File
              </Button>
              {onTemplateDownload && (
                <Button
                  type="button"
                  variant="ghost"
                  size="default"
                  onClick={onTemplateDownload}
                  className="w-full sm:w-auto text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Template
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Required Information and Rules */}
      <div className="mt-4 p-6 bg-white/90 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-700 mb-2 font-medium">
              <strong>Required:</strong> Upload a CSV file containing your historical promotion data to proceed with the trade plan creation.
            </p>
            <p className="text-xs text-gray-600">
              The CSV should include columns for Start Date, End Date, Product Name, Product Code, Event Type, Base Price, Promotional Price, and Description.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Important Notes</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                All dates should be in YYYY-MM-DD format
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Required fields: Start Date, End Date, Product Name
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Don't modify column headers
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Save file as CSV format before uploading
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Events with different years will be automatically assigned to new TPOs
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-xs text-red-600"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
      
      {uploadStatus === 'error' && !error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-xs text-red-600"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Please upload a valid CSV file (max 10MB)</span>
        </motion.div>
      )}
    </motion.div>
  )
}
