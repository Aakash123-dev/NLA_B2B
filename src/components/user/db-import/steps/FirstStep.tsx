'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileSpreadsheet, Check } from 'lucide-react';

interface FirstStepProps {
  onFileUpload: () => void;
}

export default function FirstStep({ onFileUpload }: FirstStepProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      onFileUpload();
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      onFileUpload();
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Upload CSV File</h3>
        <p className="text-sm text-gray-600">
          Upload your CSV file containing the database you want to import
        </p>
      </div>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800 text-lg">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-1">
                CSV files only (max. 10MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="p-8 bg-green-50 border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-lg text-gray-800 truncate">
                {file.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFile(null);
                document.getElementById('file-upload')?.click();
              }}
              className="border-gray-300 text-gray-700"
            >
              Change
            </Button>
          </div>
        </Card>
      )}

      <div className="pt-6">
        <h4 className="text-base font-medium mb-3 text-gray-800">CSV Format Requirements:</h4>
        <ul className="list-disc pl-6 text-base text-gray-600 space-y-2">
          <li>First row should contain column headers</li>
          <li>Data should be comma-separated</li>
          <li>Required columns: Product, Brand, Retailer, Price</li>
          <li>Date format should be YYYY-MM-DD</li>
          <li>Numbers should use period (.) as decimal separator</li>
        </ul>
      </div>
    </div>
  );
}
