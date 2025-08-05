'use client';

import React, { useRef } from 'react';
import { Upload, Download, Package, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/user/pricing/config/components/SearchableSelect';
import {
  retailers,
  brands,
  products,
} from '@/components/user/pricing/config/constants';

interface ProductConfigurationSectionProps {
  formData: {
    selectedRetailer: string;
    selectedBrand: string;
    selectedProduct: string;
    uploadedFile: File | null;
  };
  onSelectionChange: (field: string, selection: string) => void;
  onInputChange: (field: string, value: any) => void;
  onDownloadTemplate: () => void;
}

export function ProductConfigurationSection({
  formData,
  onSelectionChange,
  onInputChange,
  onDownloadTemplate,
  retailers,
  brands,
  products,
  selectedRetailer,
  selectedBrand,
  selectedProduct,
  handleRetailerChange,
  handleBrandChange,
  handleProductChange,
}: ProductConfigurationSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onInputChange('uploadedFile', file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  console.log(retailers, "newlyBrands")

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <div className="rounded-md bg-blue-50 p-1.5">
            <Package className="h-4 w-4 text-blue-600" />
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
            selectedItem={selectedRetailer}
            onSelectionChange={handleRetailerChange}
            placeholder="Search retailers..."
            maxHeight="250px"
          />
          <SearchableSelect
            title="Brand"
            items={brands}
            selectedItem={selectedBrand}
            onSelectionChange={handleBrandChange}
            placeholder="Search brands..."
            maxHeight="250px"
          />
          <SearchableSelect
            title="Product"
            items={products}
            selectedItem={selectedProduct}
            onSelectionChange={handleProductChange}
            placeholder="Search products..."
            maxHeight="250px"
          />
        </div>

        {/* File Upload Section - Modern Template & Upload */}
        <div className="border-t border-slate-100 pt-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-slate-800">
                  Event Data Upload
                </Label>
                <p className="mt-1 text-xs text-slate-500">
                  Upload your promotional event data using our template format
                </p>
              </div>
            </div>

            {/* Template Download Section */}
            <div className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">
                      Download Template
                    </h4>
                    <p className="text-xs text-blue-700">
                      Get the required format for data upload
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDownloadTemplate}
                  className="border-blue-200 text-blue-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Get Template
                </Button>
              </div>
            </div>

            {/* Upload Section */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Upload className="h-5 w-5 text-emerald-600" />
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
                        className="border-slate-300 text-slate-600 transition-all duration-200 hover:border-slate-400 hover:bg-white"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </Button>
                      <span className="text-sm text-slate-600">
                        {formData.uploadedFile ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                            {formData.uploadedFile.name}
                          </div>
                        ) : (
                          <span className="text-slate-400">
                            No file selected
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Supports CSV, Excel files (.csv, .xlsx, .xls)
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={!formData.uploadedFile}
                  className="bg-emerald-600 text-white transition-all duration-200 hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Process Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
