'use client';

import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileOutput, 
  Download, 
  FileText, 
  Image, 
  BarChart3,
  PieChart,
  LineChart,
  Table,
  Mail,
  Share,
  Printer,
  Eye,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function OutputPage() {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  const outputFormats = [
    { id: 'pdf', name: 'PDF Report', icon: FileText, description: 'Professional PDF document' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: Table, description: 'Data tables and charts' },
    { id: 'powerpoint', name: 'PowerPoint', icon: BarChart3, description: 'Presentation slides' },
    { id: 'csv', name: 'CSV Data', icon: FileOutput, description: 'Raw data export' },
  ];

  const templates = [
    { id: 'standard', name: 'Standard Report', preview: 'Professional business report format' },
    { id: 'executive', name: 'Executive Summary', preview: 'High-level overview for executives' },
    { id: 'detailed', name: 'Detailed Analysis', preview: 'Comprehensive analysis with all metrics' },
    { id: 'custom', name: 'Custom Template', preview: 'Your personalized template' },
  ];

  const recentOutputs = [
    {
      id: 1,
      name: 'Q2 Performance Report',
      format: 'PDF',
      size: '2.4 MB',
      created: '2 hours ago',
      status: 'completed',
      downloads: 23
    },
    {
      id: 2,
      name: 'Market Analysis Dataset',
      format: 'Excel',
      size: '8.7 MB',
      created: '1 day ago',
      status: 'completed',
      downloads: 45
    },
    {
      id: 3,
      name: 'Pricing Strategy Presentation',
      format: 'PowerPoint',
      size: '15.2 MB',
      created: '3 days ago',
      status: 'completed',
      downloads: 12
    },
    {
      id: 4,
      name: 'Customer Insights Report',
      format: 'PDF',
      size: '3.1 MB',
      created: '1 week ago',
      status: 'processing',
      downloads: 0
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/user/projects"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Projects</span>
              </Link>
              <div className="w-px h-6 bg-slate-300" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <FileOutput className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Output Center</h1>
                  <p className="text-sm text-slate-600">Generate and manage your reports</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Download className="w-4 h-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Output Configuration */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileOutput className="w-5 h-5 text-blue-500" />
                  Output Settings
                </CardTitle>
                <CardDescription>Configure your report generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Format Selection */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Output Format</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {outputFormats.map((format) => {
                      const Icon = format.icon;
                      return (
                        <button
                          key={format.id}
                          onClick={() => setSelectedFormat(format.id)}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                            selectedFormat === format.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">{format.name}</p>
                              <p className="text-xs text-slate-600">{format.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Template Selection */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Report Template</h4>
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                        }`}
                      >
                        <p className="font-medium text-slate-800">{template.name}</p>
                        <p className="text-xs text-slate-600 mt-1">{template.preview}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-slate-300" defaultChecked />
                      <span className="text-sm text-slate-700">Include charts and graphs</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-slate-300" defaultChecked />
                      <span className="text-sm text-slate-700">Add executive summary</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-slate-300" />
                      <span className="text-sm text-slate-700">Include raw data appendix</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-slate-300" />
                      <span className="text-sm text-slate-700">Add company branding</span>
                    </label>
                  </div>
                </div>

                {/* Generate Button */}
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 gap-2">
                  <FileOutput className="w-4 h-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Eye className="w-4 h-4" />
                    Preview Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    Email Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Generation
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Printer className="w-4 h-4" />
                    Print Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Outputs and Preview */}
          <div className="lg:col-span-2">
            {/* Preview Section */}
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-500" />
                  Report Preview
                </CardTitle>
                <CardDescription>Preview of your {selectedTemplate} template in {selectedFormat.toUpperCase()} format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex justify-center space-x-4 mb-6">
                      <BarChart3 className="w-12 h-12 text-blue-400" />
                      <PieChart className="w-12 h-12 text-green-400" />
                      <LineChart className="w-12 h-12 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Report Preview</h3>
                    <p className="text-slate-500 mb-4">Your {selectedTemplate} template preview will appear here</p>
                    <div className="flex justify-center space-x-4 text-sm text-slate-400">
                      <span>📊 Charts & Graphs</span>
                      <span>📈 Data Analysis</span>
                      <span>📋 Summary Tables</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Outputs */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-600" />
                  Recent Outputs
                </CardTitle>
                <CardDescription>Your recently generated reports and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOutputs.map((output) => (
                    <div 
                      key={output.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(output.status)}
                          <FileText className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">{output.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>{output.format}</span>
                            <span>{output.size}</span>
                            <span>{output.created}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">{output.downloads} downloads</p>
                          <Badge className={`${
                            output.status === 'completed' 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : output.status === 'processing'
                              ? 'bg-orange-100 text-orange-700 border-orange-200'
                              : 'bg-red-100 text-red-700 border-red-200'
                          }`}>
                            {output.status}
                          </Badge>
                        </div>
                        
                        {output.status === 'completed' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
