import React from 'react';
import { 
  ArrowLeft,
  Brain,
  Globe,
  BarChart3,
  Tag,
  BarChart4,
  MessageSquare,
  Sparkles,
  Loader2,
  Download,
  MessageCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SummaryType = "overall" | "roi" | "performance" | "optimization";

interface SmartInsightsDrawerProps {
  isSmartInsightsOpen: boolean;
  setIsSmartInsightsOpen: (open: boolean) => void;
  showSummary: boolean;
  setShowSummary: (show: boolean) => void;
  showTextBot: boolean;
  setShowTextBot: (show: boolean) => void;
  summaryType: SummaryType;
  setSummaryType: (type: SummaryType) => void;
  isGeneratingSummary: boolean;
  setIsGeneratingSummary: (loading: boolean) => void;
  generatedSummary: string;
  setGeneratedSummary: (summary: string) => void;
  textBotPrompt: string;
  setTextBotPrompt: (prompt: string) => void;
  textBotResponse: string;
  setTextBotResponse: (response: string) => void;
  isGeneratingTextBotResponse: boolean;
  setIsGeneratingTextBotResponse: (loading: boolean) => void;
}

const getAnalysisSummary = (type: SummaryType): string => {
  const summaries = {
    overall: `## Overall Trade Plan Analysis

Based on comprehensive analysis of your trade plan performance, here are the key findings:

**Performance Highlights:**
• Total ROI across all events: 45% above industry benchmark
• Strong performance in Q2 and Q4 promotional periods
• Highest performing retailer: Target (78% ROI)
• Best performing product category: Ready-to-eat meals

**Key Opportunities:**
• Optimize promotional depth for better margin preservation
• Increase investment in high-performing channels
• Reallocate budget from underperforming initiatives

**Recommendations:**
1. Focus 60% of promotional budget on top 3 performing retailers
2. Implement tiered promotional strategy by region
3. Enhance digital promotion mix for younger demographics`,

    roi: `## ROI Performance Analysis

**Current ROI Status:**
• Average ROI across all events: 2.3x investment
• Positive ROI events: 78% of total campaigns
• Top performing promotion type: In-store displays (3.2x ROI)

**ROI Drivers:**
• Promotional depth optimization yielding 15% improvement
• Strategic timing alignment with consumer demand peaks
• Cross-retailer promotional coordination

**Improvement Areas:**
• Events with negative ROI need strategic review
• Opportunity to increase ROI by 25% through better targeting
• Digital channel integration showing 40% higher returns`,

    performance: `## Performance Analysis by Segment

**Retailer Performance:**
• Target: Leading performance with consistent growth
• Walmart: Strong volume but margin pressure
• Regional chains: High growth potential

**Product Performance:**
• Premium SKUs showing 35% higher profit margins
• New product launches exceeding expectations by 20%
• Core products maintaining stable market share

**Channel Performance:**
• In-store displays: Highest conversion rates
• Digital advertising: Strong brand awareness lift
• Traditional media: Declining effectiveness`,

    optimization: `## Optimization Recommendations

**Budget Reallocation:**
• Shift 20% budget from low-performing to high-ROI initiatives
• Increase investment in digital channels by 30%
• Focus on premium product promotions

**Timing Optimization:**
• Align promotional calendar with seasonal demand patterns
• Coordinate cross-retailer timing for maximum impact
• Implement dynamic pricing strategies

**Strategic Improvements:**
• Enhance data collection for real-time optimization
• Implement A/B testing for promotional strategies
• Develop retailer-specific promotional approaches`
  };

  return summaries[type] || summaries.overall;
};

export const SmartInsightsDrawer: React.FC<SmartInsightsDrawerProps> = ({
  isSmartInsightsOpen,
  setIsSmartInsightsOpen,
  showSummary,
  setShowSummary,
  showTextBot,
  setShowTextBot,
  summaryType,
  setSummaryType,
  isGeneratingSummary,
  setIsGeneratingSummary,
  generatedSummary,
  setGeneratedSummary,
  textBotPrompt,
  setTextBotPrompt,
  textBotResponse,
  setTextBotResponse,
  isGeneratingTextBotResponse,
  setIsGeneratingTextBotResponse
}) => {

  const handleGenerateResponse = () => {
    if (textBotPrompt.trim() !== '') {
      setIsGeneratingTextBotResponse(true);
      setTimeout(() => {
        setTextBotResponse(`Based on your trade plan data, I can see that your promotional events are performing well overall with a 2.3x ROI. However, there are opportunities to optimize discount levels and timing. Consider reducing promotional depth by 5-10% while extending duration to maintain volume while improving margins. Your in-store display events are particularly effective and should be prioritized in future planning.`);
        setIsGeneratingTextBotResponse(false);
      }, 1500);
    }
  };

  const handleGenerateSummary = (type: SummaryType) => {
    setSummaryType(type);
    setIsGeneratingSummary(true);
    setTimeout(() => {
      setShowSummary(true);
      setGeneratedSummary(getAnalysisSummary(type));
      setIsGeneratingSummary(false);
    }, 1000);
  };

  return (
    <Sheet open={isSmartInsightsOpen} onOpenChange={setIsSmartInsightsOpen}>
      <SheetContent className="w-full sm:max-w-[38rem] overflow-y-auto" side="right">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSmartInsightsOpen(false)}
              className="p-1 h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              Smart Trade Plan Insights
            </div>
          </SheetTitle>
          <SheetDescription>
            AI-powered analysis and insights for your trade plan performance
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Analysis Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              Generate Analysis Summary
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 border-2 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                onClick={() => handleGenerateSummary('overall')}
                disabled={isGeneratingSummary}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900">Overall Analysis</div>
                    <div className="text-sm text-slate-600">Complete trade plan performance overview</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 border-2 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                onClick={() => handleGenerateSummary('roi')}
                disabled={isGeneratingSummary}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900">ROI Analysis</div>
                    <div className="text-sm text-slate-600">Return on investment breakdown</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 border-2 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                onClick={() => handleGenerateSummary('performance')}
                disabled={isGeneratingSummary}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                    <BarChart4 className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900">Performance Analysis</div>
                    <div className="text-sm text-slate-600">Detailed performance metrics</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 border-2 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                onClick={() => handleGenerateSummary('optimization')}
                disabled={isGeneratingSummary}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                    <Tag className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900">Optimization</div>
                    <div className="text-sm text-slate-600">Strategic recommendations</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Generated Summary */}
          {(showSummary && generatedSummary) && (
            <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Analysis Summary
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <ScrollArea className="h-64">
                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line">
                    {generatedSummary}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isGeneratingSummary && (
            <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                  <span className="text-indigo-800 font-medium">Generating AI analysis...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chat Interface */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              Ask Questions
            </h3>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask about your trade plan performance..."
                value={textBotPrompt}
                onChange={(e) => setTextBotPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerateResponse()}
                className="flex-1"
              />
              <Button
                onClick={handleGenerateResponse}
                disabled={isGeneratingTextBotResponse || !textBotPrompt.trim()}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
              >
                {isGeneratingTextBotResponse ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
              </Button>
            </div>

            {textBotResponse && (
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex-shrink-0">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-slate-700 text-sm leading-relaxed">
                      {textBotResponse}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
