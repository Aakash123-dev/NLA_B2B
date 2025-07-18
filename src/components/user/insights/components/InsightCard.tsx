import React from 'react';
import { FileText, Save, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart as BarChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { InsightType } from '../types';
import { retailers, brands, ppgCategories } from '../data';
import ChartOnly from './chart1';
import PriceSlopeChart from './PriceSlopeChart';
import MyChart from './LineBar';
import StackedLineChart from './MultiLine';
import MultiLine2 from './MultiLine2';

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
  toast: (options: {
    title: string;
    description: string;
    duration: number;
  }) => void;
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
  toast,
  index,
}) => {
  console.log(index, 'filter');
  return (
    <div className="border-t border-gray-200 p-6">
      {/* Chart and Filters Section */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Chart Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{insight.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {index === 0 ? (
                    <ChartOnly />
                  ) : index === 1 ? (
                    <PriceSlopeChart />
                  ) : index === 2 ? (
                    <MyChart />
                  ) : index === 3 ? (
                    <StackedLineChart />
                  ) : index === 4 ? (
                    <MultiLine2 />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                      No chart data available
                    </div>
                  )}

                  {/* <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    {showLegend && <Legend />} */}
                  {/* <Tooltip /> */}
                  {/* <Bar 
                      dataKey="value"
                      fill={getCurrentColors()[0]} 
                      radius={[4, 4, 0, 0]}
                    /> */}
                  {/* </BarChartComponent> */}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section - Minimalist Design */}
          <div className="mx-auto mt-3 w-full lg:col-span-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-sm font-medium text-slate-600">
                  Quick Notes
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-sm transition-shadow duration-200 hover:shadow">
              <Textarea
                placeholder="Add your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="max-h-[50px] min-h-[80px] resize-none border-0 bg-transparent px-3 py-2 text-sm focus:ring-0 focus:ring-offset-0"
              />
              <div className="flex justify-end border-t border-slate-200 bg-white px-3 py-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 rounded-full border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 px-3 text-xs font-medium text-indigo-700 transition-all duration-200 hover:border-indigo-300 hover:from-indigo-100 hover:to-violet-100 hover:text-indigo-800"
                  onClick={() => {
                    toast({
                      title: 'Notes saved',
                      description: 'Your notes have been saved successfully.',
                      duration: 3000,
                    });
                  }}
                >
                  <Save className="mr-1.5 h-3 w-3" />
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
                <Select
                  value={selectedRetailer}
                  onValueChange={setSelectedRetailer}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Retailers</SelectItem>
                    {retailers.map((retailer) => (
                      <SelectItem key={retailer.id} value={retailer.id}>
                        {retailer.name}
                      </SelectItem>
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
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
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
                    {ppgCategories.map((ppg) => (
                      <SelectItem key={ppg.id} value={ppg.id}>
                        {ppg.name}
                      </SelectItem>
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
                  className="flex h-9 w-full items-center justify-center gap-2 rounded-md border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 transition-all duration-200 hover:border-indigo-300 hover:from-indigo-100 hover:to-violet-100 hover:text-indigo-800"
                  onClick={() => {
                    toast({
                      title: 'Chart downloaded',
                      description: `Your ${downloadType} chart has been downloaded successfully.`,
                      duration: 3000,
                    });
                  }}
                >
                  <Download className="h-4 w-4" />
                  <span className="font-medium">
                    Download{' '}
                    {downloadType.charAt(0).toUpperCase() +
                      downloadType.slice(1)}{' '}
                    Chart
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
