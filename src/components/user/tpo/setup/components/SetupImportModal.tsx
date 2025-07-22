'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  X, 
  Upload, 
  Download, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  FileSpreadsheet,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SetupImportModalProps {
  isOpen: boolean
  onClose: () => void
  retailer?: string
  brand?: string
}

export function SetupImportModal({ isOpen, onClose, retailer, brand }: SetupImportModalProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedRetailer, setSelectedRetailer] = useState(retailer || '')
  const [selectedBrand, setSelectedBrand] = useState(brand || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample retailers and brands for selection
  const retailers = [
    { id: 'walmart', name: 'Walmart', label: 'Walmart' },
    { id: 'target', name: 'Target', label: 'Target' },
    { id: 'costco', name: 'Costco', label: 'Costco' },
    { id: 'kroger', name: 'Kroger', label: 'Kroger' },
    { id: 'amazon', name: 'Amazon Fresh', label: 'Amazon Fresh' }
  ]

  const brands = [
    { id: 'real-good-foods', name: 'Real Good Foods', label: 'Real Good Foods' },
    { id: 'applegate', name: 'Applegate', label: 'Applegate' },
    { id: 'organic-valley', name: 'Organic Valley', label: 'Organic Valley' },
    { id: 'kelloggs', name: 'Kellogg\'s', label: 'Kellogg\'s' },
    { id: 'general-mills', name: 'General Mills', label: 'General Mills' }
  ]

  const handleFileSelect = (file: File) => {
    // Reset previous errors
    setErrorMessage('')
    setUploadStatus('idle')
    
    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setErrorMessage('Please upload a CSV file only. Other file formats are not supported.')
      setUploadStatus('error')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size too large. Please upload a file smaller than 10MB.')
      setUploadStatus('error')
      return
    }

    // Basic CSV validation by reading first few lines
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const lines = content.split('\n').filter(line => line.trim())
      
      if (lines.length < 2) {
        setErrorMessage('CSV file appears to be empty or has no data rows.')
        setUploadStatus('error')
        return
      }

      // Check if required headers are present
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''))
      const requiredHeaders = ['start date', 'end date', 'product name']
      const missingHeaders = requiredHeaders.filter(header => 
        !headers.some(h => h.includes(header.replace(' ', '')))
      )

      if (missingHeaders.length > 0) {
        setErrorMessage(`Missing required columns: ${missingHeaders.join(', ')}. Please use the template format.`)
        setUploadStatus('error')
        return
      }

      setUploadedFile(file)
      setUploadStatus('success')
    }
    
    reader.onerror = () => {
      setErrorMessage('Error reading file. Please try again.')
      setUploadStatus('error')
    }
    
    reader.readAsText(file.slice(0, 1024)) // Read first 1KB for validation
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

  const handleUpload = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setErrorMessage('')
    
    try {
      // Simulate file processing with progress
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Read and parse the CSV file
      const reader = new FileReader()
      reader.onload = async (e) => {
        const content = e.target?.result as string
        const lines = content.split('\n').filter(line => line.trim())
        
        // Simulate processing each row
        const rowCount = lines.length - 1 // Exclude header
        console.log(`Processing ${rowCount} events from file: ${uploadedFile.name}`)
        
        // Simulate API call to process the data
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Simulate success response
        const result = {
          totalRows: rowCount,
          processedRows: rowCount,
          errors: [],
          warnings: [],
          newTPOs: rowCount > 50 ? 2 : 1 // Simulate creating multiple TPOs for large datasets
        }
        
        console.log('Import completed successfully:', result)
        
        // Show success message or close modal
        alert(`Successfully imported ${result.processedRows} events. ${result.newTPOs > 1 ? `Created ${result.newTPOs} TPOs based on event years.` : ''}`)
        onClose()
      }
      
      reader.onerror = () => {
        throw new Error('Failed to read file content')
      }
      
      reader.readAsText(uploadedFile)
      
    } catch (error) {
      console.error('Upload error:', error)
      setErrorMessage('Failed to process file. Please check the format and try again.')
      setUploadStatus('error')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadBasicTemplate = () => {
    // Create basic CSV template with detailed headers and instructions
    const headers = [
      'Start Date',
      'End Date', 
      'Product Name',
      'Product Code',
      'Event Type',
      'Base Price',
      'Promotional Price',
      'Description'
    ]
    
    const instructionRow = [
      'YYYY-MM-DD',
      'YYYY-MM-DD',
      'Product name (required)',
      'Unique product identifier',
      'Sale/Promotion/Discount/Launch',
      'Original price (e.g., 12.99)',
      'Discounted price (e.g., 9.99)',
      'Event description'
    ]
    
    const csvContent = [
      headers.join(','),
      instructionRow.join(','),
      // Add empty rows for user input
      ',,,,,,,',
      ',,,,,,,',
      ','
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `basic_template_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadAdvancedTemplate = () => {
    if (!selectedRetailer) {
      setErrorMessage('Please select a retailer first')
      setUploadStatus('error')
      return
    }

    // Create advanced CSV template with realistic sample data based on retailer and brand
    const headers = [
      'Start Date',
      'End Date',
      'Product Name',
      'Product Code',
      'Event Type',
      'Base Price',
      'Promotional Price',
      'Description'
    ]
    
    // Generate realistic sample data based on selected retailer/brand
    const getProductData = () => {
      if (selectedBrand === 'real-good-foods') {
        return [
          ['2025-01-01', '2025-01-31', 'Real Good Chicken & Veggie Bowl', 'RGF001', 'New Year Sale', '6.99', '5.49', 'Healthy start to the new year'],
          ['2025-02-01', '2025-02-14', 'Real Good Cauliflower Crust Pizza', 'RGF002', 'Valentine Special', '8.99', '7.49', 'Perfect for date night'],
          ['2025-03-01', '2025-03-31', 'Real Good Chicken Poppers', 'RGF003', 'Spring Promotion', '5.99', '4.99', 'Spring into flavor'],
          ['2025-04-01', '2025-04-30', 'Real Good Enchilada Bowl', 'RGF004', 'Spring Sale', '7.49', '6.29', 'Fresh spring flavors']
        ]
      } else if (selectedBrand === 'applegate') {
        return [
          ['2025-01-01', '2025-01-31', 'Applegate Organic Turkey Slices', 'APL001', 'New Year Health Focus', '7.99', '6.49', 'Start the year healthy'],
          ['2025-02-01', '2025-02-14', 'Applegate Organic Ham', 'APL002', 'Valentine Breakfast', '8.49', '6.99', 'Perfect for brunch'],
          ['2025-03-01', '2025-03-31', 'Applegate Chicken Breast', 'APL003', 'Spring Clean Eating', '6.99', '5.79', 'Clean protein choice'],
          ['2025-04-01', '2025-04-30', 'Applegate Roast Beef', 'APL004', 'Easter Special', '9.49', '7.99', 'Premium deli meat']
        ]
      } else {
        // Default generic products
        return [
          ['2025-01-01', '2025-01-31', 'Premium Product A', 'PP001', 'New Year Launch', '12.99', '9.99', 'New product introduction'],
          ['2025-02-01', '2025-02-14', 'Seasonal Product B', 'SP002', 'Valentine Promotion', '15.99', '12.49', 'Limited time offer'],
          ['2025-03-01', '2025-03-31', 'Spring Collection C', 'SC003', 'Spring Sale', '18.99', '15.99', 'Fresh spring lineup'],
          ['2025-04-01', '2025-04-30', 'Feature Product D', 'FP004', 'Featured Deal', '22.99', '19.99', 'Customer favorite']
        ]
      }
    }
    
    const sampleData = getProductData()
    
    const csvContent = [
      headers.join(','),
      ...sampleData.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `advanced_template_${selectedRetailer}${selectedBrand ? `_${selectedBrand}` : ''}_${new Date().getFullYear()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setUploadStatus('idle')
    setErrorMessage('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Import Events</h2>
                  <p className="text-blue-100 text-sm">Upload your event data or download templates</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6 max-h-[calc(90vh-100px)] overflow-y-auto">
            {/* Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload File</h3>
              
              {/* File Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                  ${isDragOver 
                    ? 'border-blue-400 bg-blue-50' 
                    : uploadStatus === 'success'
                    ? 'border-green-400 bg-green-50'
                    : uploadStatus === 'error'
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                
                {uploadedFile ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      {uploadStatus === 'success' ? (
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                      ) : (
                        <AlertCircle className="w-12 h-12 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    {uploadStatus === 'success' && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          resetUpload()
                        }}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        Choose Different File
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <FileSpreadsheet className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Click or drag CSV file to this area to upload
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Support for CSV files only. Please use the template for correct format.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {errorMessage && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              {uploadedFile && uploadStatus === 'success' && (
                <div className="flex justify-end space-x-3">
                  <Button onClick={resetUpload} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={isProcessing}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Templates Section */}
            <div className="border-t pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Templates</h3>
                <p className="text-sm text-gray-600">Choose a template that best fits your needs. Templates help ensure your data is properly formatted for import.</p>
              </div>
              
              <div className="space-y-4">
                {/* Basic Template Card */}
                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">Basic Template</h4>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Blank</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          A blank template with headers only. Perfect for starting from scratch with your own product data.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Empty template with proper column headers
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Manual data entry required
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Format guidelines included
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Button
                        onClick={downloadBasicTemplate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <span className="text-xs text-gray-400 mt-2">No setup required</span>
                    </div>
                  </div>
                </div>

                {/* Advanced Template Card */}
                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    {/* Header Section */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <FileSpreadsheet className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">Advanced Template</h4>
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Pre-filled</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Pre-populated template with sample product data based on your selected retailer and brand.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center text-xs text-gray-500">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Sample products with realistic data
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Pre-filled prices and product codes
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Customizable for your needs
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Selection Controls */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <h5 className="text-sm font-medium text-gray-900">Configure Template Data</h5>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Retailer Selection */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                            Select Retailer *
                          </label>
                          <select
                            value={selectedRetailer}
                            onChange={(e) => setSelectedRetailer(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white"
                          >
                            <option value="">Choose a retailer...</option>
                            {retailers.map((retailer) => (
                              <option key={retailer.id} value={retailer.id}>
                                {retailer.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Brand Selection */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                            Select Brand (Optional)
                          </label>
                          <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white"
                          >
                            <option value="">Generic products...</option>
                            {brands.map((brand) => (
                              <option key={brand.id} value={brand.id}>
                                {brand.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Current Selection Display */}
                      {selectedRetailer && (
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <div className="flex items-center space-x-4 text-xs">
                            <div>
                              <span className="text-gray-500">Retailer: </span>
                              <span className="font-medium text-gray-900">
                                {retailers.find(r => r.id === selectedRetailer)?.label || selectedRetailer}
                              </span>
                            </div>
                            {selectedBrand && (
                              <div>
                                <span className="text-gray-500">Brand: </span>
                                <span className="font-medium text-gray-900">
                                  {brands.find(b => b.id === selectedBrand)?.label || selectedBrand}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button
                            onClick={downloadAdvancedTemplate}
                            disabled={!selectedRetailer}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Template
                          </Button>
                        </div>
                      )}

                      {!selectedRetailer && (
                        <div className="flex items-center justify-center py-2">
                          <span className="text-xs text-gray-500">Please select a retailer to download the advanced template</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900">Important Notes</h4>
                  <ul className="text-sm text-amber-800 mt-2 space-y-1">
                    <li>• All dates should be in YYYY-MM-DD format</li>
                    <li>• Required fields: Start Date, End Date, Product Name</li>
                    <li>• Don't modify column headers</li>
                    <li>• Save file as CSV format before uploading</li>
                    <li>• Events with different years will be automatically assigned to new TPOs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}