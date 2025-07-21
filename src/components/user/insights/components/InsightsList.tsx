"use client"
import React, { useEffect } from 'react';
import { ChevronDown, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { InsightCard } from './InsightCard';
import type { InsightType } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useSelector } from 'react-redux';
import { fetchChartData } from '@/store/slices/chartsSlices';

interface InsightsListProps {
  filteredInsights: InsightType[];
  expandedInsight: string | null;
  setExpandedInsight: (id: string | null) => void;
  generateSummary: () => void;
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
}

export const InsightsList: React.FC<InsightsListProps> = ({
  filteredInsights,
  expandedInsight,
  setExpandedInsight,
  generateSummary,
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
}) => {
 
  const { toast } = useToast();
  return (
    <div className="w-full px-6 py-4 lg:px-12">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Total {filteredInsights.length} insights
        </div>
      </div>

      <div className="space-y-4">
        {filteredInsights.map((insight, index) => (
          <div
            key={insight.id}
            className="overflow-hidden rounded-lg border border-gray-200"
          >
            <div
              className="flex cursor-pointer items-center bg-gray-50 p-4"
              onClick={() =>
                setExpandedInsight(
                  expandedInsight === insight.id ? null : insight.id
                )
              }
            >
              <div
                className={`mr-4 inline-flex items-center justify-center rounded px-2 py-1 text-sm ${
                  insight.type === 'base'
                    ? 'bg-green-100 text-green-800'
                    : insight.type === 'promo'
                      ? 'bg-purple-100 text-purple-800'
                      : insight.type === 'strat'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                }`}
              >
                <span className="uppercase">{insight.type}</span>{' '}
              </div>
              <h3 className="flex-1 text-base font-medium">
                {insight.question}
              </h3>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    generateSummary();
                  }}
                  className="transform rounded-full border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-1.5 text-indigo-700 shadow transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:from-indigo-100 hover:to-violet-100 hover:text-indigo-800 hover:shadow-md"
                >
                  <div className="mr-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  Generate AI Summary
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-transform ${
                    expandedInsight === insight.id ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {expandedInsight === insight.id && (
              <InsightCard
                insight={insight}
                chartData={chartData}
                showLegend={showLegend}
                getCurrentColors={getCurrentColors}
                selectedRetailer={selectedRetailer}
                setSelectedRetailer={setSelectedRetailer}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedPPG={selectedPPG}
                setSelectedPPG={setSelectedPPG}
                viewBy={viewBy}
                setViewBy={setViewBy}
                downloadType={downloadType}
                setDownloadType={setDownloadType}
                notes={notes}
                setNotes={setNotes}
                toast={toast}
                index={index}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
