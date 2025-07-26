'use client'

import React, { useRef } from 'react'
import { 
  Upload, 
  Download, 
  Package,
  FileText,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { SearchableSelect } from '@/components/user/pricing/config/components/SearchableSelect'
import { retailers, brands, products } from '@/components/user/pricing/config/constants'

interface ProductConfigurationSectionProps {
  formData: {
    selectedRetailer: string
    selectedBrand: string
    selectedProduct: string
    uploadedFile: File | null
  }
  onSelectionChange: (field: string, selection: string) => void
  onInputChange: (field: string, value: any) => void
  onDownloadTemplate: () => void
}

export function ProductConfigurationSection({
  formData,
  onSelectionChange,
  onInputChange,
  onDownloadTemplate
}: ProductConfigurationSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onInputChange('uploadedFile', file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-md">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          Product Configuration 
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selection Section - Clean 3-column layout */}
        <div className="grid grid-cols-3 gap-4">
          <SearchableSelect
            title="Retailer"
            items={retailers}
            selectedItem={formData.selectedRetailer}
            onSelectionChange={(selection: string) => onSelectionChange('selectedRetailer', selection)}
            placeholder="Search retailers..."
            maxHeight="250px"
          />
          <SearchableSelect
            title="Brand"
            items={brands}
            selectedItem={formData.selectedBrand}
            onSelectionChange={(selection: string) => onSelectionChange('selectedBrand', selection)}
            placeholder="Search brands..."
            maxHeight="250px"
          />
          <SearchableSelect
            title="Product"
            items={products}
            selectedItem={formData.selectedProduct}
            onSelectionChange={(selection: string) => onSelectionChange('selectedProduct', selection)}
            placeholder="Search products..."
            maxHeight="250px"
          />
        </div>
        
        {/* File Upload Section - Modern Template & Upload */}
        <div className="pt-4 border-t border-slate-100">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-slate-800">Event Data Upload</Label>
                <p className="text-xs text-slate-500 mt-1">Upload your promotional event data using our template format</p>
              </div>
            </div>
            
            {/* Template Download Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">Download Template</h4>
                    <p className="text-xs text-blue-700">Get the required format for data upload</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDownloadTemplate}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Get Template
                </Button>
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".csv,.xlsx,.xls"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUploadClick}
                        className="border-slate-300 text-slate-600 hover:bg-white hover:border-slate-400 transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      <span className="text-sm text-slate-600">
                        {formData.uploadedFile ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            {formData.uploadedFile.name}
                          </div>
                        ) : (
                          <span className="text-slate-400">No file selected</span>
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Supports CSV, Excel files (.csv, .xlsx, .xls)</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  disabled={!formData.uploadedFile}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-300 disabled:text-slate-500 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Process Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
