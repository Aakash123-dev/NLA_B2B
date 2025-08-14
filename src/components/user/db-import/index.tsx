'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Database, Check, X, AlertCircle, FileSpreadsheet, Settings } from 'lucide-react';

import CSVImport from './CSVImport';
import ConfigImport from './ConfigImport';

export default function DBImportPage() {
  const [importMethod, setImportMethod] = useState<'csv' | 'config'>('csv');

  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Database Import</h1>
        <p className="mt-2 text-lg text-gray-600">
          Import your data using CSV files or API configuration
        </p>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {/* Import Method Selection */}
        <Card className="mb-8 shadow-sm border border-gray-200">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-gray-800">Select Import Method</CardTitle>
            <CardDescription className="text-gray-600">
              Choose how you want to import your data
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setImportMethod('csv')} 
                className={`flex items-center gap-2 ${importMethod === 'csv' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'}`}
              >
                <FileSpreadsheet className="h-5 w-5" />
                CSV Import
              </Button>
              <Button 
                onClick={() => setImportMethod('config')} 
                className={`flex items-center gap-2 ${importMethod === 'config' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'}`}
              >
                <Settings className="h-5 w-5" />
                API Import
              </Button>
            </div>
          </CardContent>
        </Card>
      
        {/* Import Content */}
        <div className="mb-8">
          {importMethod === 'csv' ? <CSVImport /> : <ConfigImport />}
        </div>
      </div>
    </div>
  );
}
