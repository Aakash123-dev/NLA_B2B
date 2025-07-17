import React from 'react';
import { FileText, Save, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart as BarChartComponent, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { InsightType } from '../types';
import { retailers, brands, ppgCategories } from '../data';

interface InsightCardProps {
  insight: InsightType;
  chartData: any[];
  showLegend: boolean;
  getCurrentColors: () => string[];
  selectedRetailer: string;
  setSelectedRetailer: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedPPG: string;
  setSelectedPPG: (value: string) => void;
  viewBy: string;
  setViewBy: (value: string) => void;
  downloadType: string;
  setDownloadType: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  toast: (options: { title: string; description: string; duration: number }) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  chartData,
  showLegend,
  getCurrentColors,
  selectedRetailer,
  setSelectedRetailer,
  selectedBrand,
  setSelectedBrand,
  selectedPPG,
  setSelectedPPG,
  viewBy,
  setViewBy,
  downloadType,
  setDownloadType,
  notes,
  setNotes,
  toast
}) => {
  return (
    <div className="p-6 border-t border-gray-200">
      {/* Chart and Filters Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Chart Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{insight.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChartComponent data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    {showLegend && <Legend />}
                    <Tooltip />
                    <Bar 
                      dataKey="value"
                      fill={getCurrentColors()[0]} 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChartComponent>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Notes Section - Minimalist Design */}
          <div className="mt-3 lg:col-span-3 mx-auto w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-sm font-medium text-slate-600">Quick Notes</span>
              </div>
            </div>
            <div className="border border-slate-200 rounded-md bg-slate-50 overflow-hidden shadow-sm hover:shadow transition-shadow duration-200">
              <Textarea 
                placeholder="Add your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px] max-h-[50px] resize-none border-0 bg-transparent focus:ring-0 focus:ring-offset-0 text-sm px-3 py-2"
              />
              <div className="flex justify-end border-t border-slate-200 bg-white px-3 py-1.5">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-7 px-3 text-xs font-medium bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 rounded-full"
                  onClick={() => {
                    toast({
                      title: "Notes saved",
                      description: "Your notes have been saved successfully.",
                      duration: 3000,
                    });
                  }}
                >
                  <Save className="h-3 w-3 mr-1.5" />
                  Save Notes
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chart Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Retailer</Label>
                <Select value={selectedRetailer} onValueChange={setSelectedRetailer}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Retailers</SelectItem>
                    {retailers.map(retailer => (
                      <SelectItem key={retailer.id} value={retailer.id}>{retailer.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Brand</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>PPG</Label>
                <Select value={selectedPPG} onValueChange={setSelectedPPG}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ppgCategories.map(ppg => (
                      <SelectItem key={ppg.id} value={ppg.id}>{ppg.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>View By</Label>
                <Select value={viewBy} onValueChange={setViewBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="ppg">PPG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Chart Type</Label>
                <Select value={downloadType} onValueChange={setDownloadType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="ppg">PPG</SelectItem>
                    <SelectItem value="upc">UPC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 h-9 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 rounded-md"
                  onClick={() => {
                    toast({
                      title: "Chart downloaded",
                      description: `Your ${downloadType} chart has been downloaded successfully.`,
                      duration: 3000,
                    });
                  }}
                >
                  <Download className="h-4 w-4" />
                  <span className="font-medium">Download {downloadType.charAt(0).toUpperCase() + downloadType.slice(1)} Chart</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
