'use client'

import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Upload, Download, FileText, AlertCircle, CheckCircle, X } from 'lucide-react'
import { generateCSVTemplate } from '../../utils'
import Papa from 'papaparse'

interface SetupImportModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (events: any[]) => Promise<void>
  retailerBrandProducts: any
  event_tpo_id?: any
  tpoData?: any
}

export function SetupImportModal({ isOpen, onClose, onImport, retailerBrandProducts, event_tpo_id, tpoData }: SetupImportModalProps) {
  const [importType, setImportType] = useState<'basic' | 'advanced'>('basic')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')
  const [previewData, setPreviewData] = useState<any[]>([])
  const [validationErrors, setValidationErrors] = useState<string[]>([])
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

  const parseCsvFile = async (file: File) => {
    return new Promise<{ events: any[]; errors: string[] }>((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = Array.isArray(results.data) ? (results.data as any[]) : []
          const errors: string[] = []
          const events = rows.map((row, idx) => {
            const start_date = row.start_date || row.startDate
            const end_date = row.end_date || row.endDate
            const productId = row.productId || row.product

            if (!start_date) errors.push(`Row ${idx + 1}: start_date is required`)
            if (!end_date) errors.push(`Row ${idx + 1}: end_date is required`)
            if (!productId) errors.push(`Row ${idx + 1}: productId is required`)

            return {
              ...row,
              event_tpo_id: event_tpo_id ?? row.event_tpo_id,
              retailer_id: tpoData?.retailer_id ?? row.retailer_id,
              brand_id: tpoData?.brand_id ?? row.brand_id,
              status: (row.status || 'draft')?.toString()?.toUpperCase(),
            }
          })
          resolve({ events, errors })
        },
      })
    })
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload')
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      console.debug('[SetupImportModal] Starting upload parse...')
      const { events, errors } = await parseCsvFile(selectedFile)
      console.debug('[SetupImportModal] Parsed events:', events?.length || 0)
      console.debug('[SetupImportModal] Validation errors:', errors?.length || 0)
      setPreviewData(events)
      setValidationErrors(errors)

      // Proceed with valid rows even if some validation errors exist
      const validEvents = events.filter((row: any) => {
        const hasDates = (row.start_date || row.startDate) && (row.end_date || row.endDate)
        const hasProduct = row.productId || row.product
        return hasDates && hasProduct
      })

      if (validEvents.length === 0) {
        setUploadError('No valid rows to import. Please check your CSV file.')
        setIsUploading(false)
        return
      }

      console.debug('[SetupImportModal] Calling onImport with valid rows:', validEvents.length)
      await onImport(validEvents)
      console.debug('[SetupImportModal] onImport completed')
      setUploadSuccess(true)
      setTimeout(() => {
        handleClose()
      }, 800)
    } catch (error) {
      setUploadError('Upload failed. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownloadTemplate = () => {
    // If basic, use simple sample template
    if (importType === 'basic') {
      downloadSampleTemplate()
      return
    }

    // Advanced template: infer retailer/brand products directly
    const retailerId = tpoData?.retailer_id
    const brandId = tpoData?.brand_id

    if (!retailerId) {
      setUploadError('Retailer not found for this TPO. Please create the TPO with a retailer.')
      return
    }

    // Resolve product list for retailer (+ optional brand scope)
    let products: any[] = []
    try {
      if (brandId && retailerBrandProducts?.[retailerId]?.[brandId]) {
        products = retailerBrandProducts[retailerId][brandId]
      } else if (retailerBrandProducts?.[retailerId]) {
        // Flatten all products under retailer
        const brandMap = retailerBrandProducts[retailerId]
        products = Object.keys(brandMap).flatMap((b) => brandMap[b] || [])
      }
    } catch (e) {
      // fallback to empty products
    }

    downloadAdvancedTemplate(products, retailerId, brandId || '')
  }

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null)
      setUploadError('')
      setUploadSuccess(false)
      setImportType('basic')
      setPreviewData([])
      setValidationErrors([])
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

  const downloadSampleTemplate = () => {
    // Create sample data with two products for the same event
    const template = [
        {
            eventId: 'event1', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign',
            start_date: '2024-06-01',
            end_date: '2024-06-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            ppg_name: 'P1',
            // Product 1 data
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            spoils: '0.10',
            cogs: '3.00',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event2', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 2',
            start_date: '2024-07-05',
            end_date: '2024-07-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            ppg_name: 'P1',
            // Product 1 data
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            spoils: '0.10',
            cogs: '3.00',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event3', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 3',
            start_date: '2024-08-05',
            end_date: '2024-08-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            // budget: '10000',
            ppg_name: 'P1',
            // Product 1 data
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            spoils: '0.10',
            cogs: '3.00',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event4', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 4',
            start_date: '2024-09-05',
            end_date: '2024-09-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            // budget: '10000',
            ppg_name: 'P1',
            productId: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ 081166302903-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            spoils: '0.10',
            cogs: '3.00',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
        {
            eventId: 'event4', // Same eventId to group products under one event
            title: 'Summer Sale 2024',
            description: 'Summer promotional campaign 4',
            start_date: '2024-09-05',
            end_date: '2024-09-30',
            status: 'draft',
            color: '#4F46E5',
            channels: 'Online,Retail',
            retailer_id: 'ALBSCO Jewel Div TA',
            brand_id: 'JACK DANIELS',
            // budget: '10000',
            ppg_name: 'P1',
            productId: 'Completely Fresh Foods Jack Daniels Old No 7 Brand Bbqck Pulled Chicken Entree 16OZ 089533400108-JACK DANIELS',
            promoPrice: '7.49',
            tprDist: '85',
            doDist: '45',
            foDist: '35',
            fdDist: '25',
            listPrice: '6.99',
            spoils: '0.10',
            cogs: '3.00',
            edlpPerUnitRate: '0.25',
            promoPerUnitRate: '0.50',
            vcm: '2.50',
            fixedFee: '1000',
        },
    ]

    const csv = Papa.unparse(template)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'event_import_template.csv')
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const generateSampleData = (products: string[], retailerId: string, brandId: string) => {
    const eventId = `event${Math.floor(Math.random() * 1000)}`;

    return products.map((product: string) => ({
        eventId, // Same eventId to group products under one event
        title: 'New Promotion Campaign',
        description: 'Sample promotional campaign',
        start_date: '', // Leave empty for template
        end_date: '', // Leave empty for template
        status: 'draft',
        color: '#4F46E5',
        channels: 'Online,Retail',
        ppg_name: 'P1',
        productId: product,
        promoPrice: '', // Leave empty for template
        tprDist: '', // Leave empty for template
        doDist: '', // Leave empty for template
        foDist: '', // Leave empty for template
        fdDist: '', // Leave empty for template
        listPrice: '', // Leave empty for template
        spoils: '', // Leave empty for template
        cogs: '', // Leave empty for template
        edlpPerUnitRate: '', // Leave empty for template
        promoPerUnitRate: '', // Leave empty for template
        vcm: '', // Leave empty for template
        fixedFee: '', // Leave empty for template
    }));
};

 const downloadAdvancedTemplate = async (products: any[], retailerId: string, brandId: string) => {
    const data = generateSampleData(products, retailerId, brandId);

    // Convert to CSV
    const headers = [
        'eventId',
        'title',
        'description',
        'start_date',
        'end_date',
        'status',
        'color',
        'channels',
        'ppg_name',
        'productId',
        'promoPrice',
        'tprDist',
        'doDist',
        'foDist',
        'fdDist',
        'listPrice',
        'spoils',
        'cogs',
        'basePrice',
        'edlpPerUnitRate',
        'promoPerUnitRate',
        'vcm',
        'fixedFee'
    ];

    const csvContent = [
        headers.join(','),
        ...data.map((row: any) =>
            headers.map(header =>
                // Wrap values in quotes if they contain commas
                typeof row[header] === 'string' && row[header].includes(',')
                    ? `"${row[header]}"`
                    : row[header] || ''
            ).join(',')
        )
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `event_template_${retailerId}_${brandId}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

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
