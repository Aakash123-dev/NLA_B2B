'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Upload, FileDown, Database, File } from 'lucide-react';
import { DataToolsSidebarProps } from '../types';

export function DataToolsSidebar({ isOpen, onClose, toolType }: DataToolsSidebarProps) {
  const renderImportContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Import Data</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Connect to data sources or upload files to import data into your analysis.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="database">Select Database</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a database" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="db1">Primary Database</SelectItem>
                <SelectItem value="db2">Analytics Warehouse</SelectItem>
                <SelectItem value="db3">Legacy System DB</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">
            <Database className="w-4 h-4 mr-2" />
            Connect to Database
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            File Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
            <File className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Drag and drop files here or click to browse
            </p>
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Supported formats: CSV, Excel, JSON, Parquet
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExportContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Export Data</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Export your analysis results and visualizations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            Export Format
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="export-format">Format</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose export format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="export-name">File Name</Label>
            <Input placeholder="analysis-results" />
          </div>
          <Button className="w-full">
            <FileDown className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>
              {toolType === 'import' ? 'Import Data' : 'Export Data'}
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto">
          {toolType === 'import' ? renderImportContent() : renderExportContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
}
