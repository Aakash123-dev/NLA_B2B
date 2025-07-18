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
import type { SummaryType } from '../types';
import { getAnalysisSummary } from '../data';

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
        setTextBotResponse(`Based on your coffee products data, I can see that BLACK RIFLE JUST BLACK has significant pricing variations across retailers, ranging from $11.99 to $13.49. The optimal price point appears to be $12.99, which maximizes both volume and profit. Consider adjusting pricing at Jewel (currently $13.49) to improve sales volume while maintaining margin.`);
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
              onClick={() => {
                if (showSummary || showTextBot) {
                  setShowSummary(false);
                  setShowTextBot(false);
                } else {
                  setIsSmartInsightsOpen(false);
                }
              }}
              className="absolute left-4 top-4 p-2 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div className="ml-8 flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              <span>Smart Insights</span>
            </div>
          </SheetTitle>
          <SheetDescription>
            AI-powered analysis of your data to help you make better decisions
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          {showTextBot ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-cyan-600" />
                  Ask AI Assistant
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowTextBot(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              </div>
              
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-cyan-100 p-2 rounded-full">
                      <Brain className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div className="text-sm font-medium text-cyan-700">AI Insights Bot</div>
                  </div>
                  
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    {textBotResponse ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-slate-100 p-2 rounded-full">
                            <Users className="h-4 w-4 text-slate-600" />
                          </div>
                          <div className="bg-slate-100 rounded-lg p-3 text-sm max-w-[80%]">
                            {textBotPrompt}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-cyan-100 p-2 rounded-full">
                            <Brain className="h-4 w-4 text-cyan-600" />
                          </div>
                          <div className="bg-cyan-50 rounded-lg p-3 text-sm max-w-[80%]">
                            {textBotResponse}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                        <p>Ask any question about your data or request specific insights</p>
                        <p className="text-xs mt-2">Example: "What are the top pricing opportunities for BLACK RIFLE JUST BLACK?"</p>
                      </div>
                    )}
                  </ScrollArea>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ask anything about your data..."
                      value={textBotPrompt}
                      onChange={(e) => setTextBotPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleGenerateResponse();
                        }
                      }}
                    />
                    <Button 
                      disabled={textBotPrompt.trim() === '' || isGeneratingTextBotResponse}
                      onClick={handleGenerateResponse}
                    >
                      {isGeneratingTextBotResponse ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="text-xs text-slate-500 text-center">
                You can ask specific questions about pricing, promotions, market trends, or request recommendations.
              </div>
            </div>
          ) : !showSummary ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">What type of insights do you need?</h3>
                <p className="text-sm text-slate-500">Select an insight type to generate an AI summary</p>
              </div>

              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className={`justify-start gap-3 h-auto py-3 ${summaryType === 'overall' ? 'border-blue-500 bg-blue-50 text-blue-700' : ''}`}
                  onClick={() => handleGenerateSummary('overall')}
                >
                  <Globe className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Overall Analysis</div>
                    <div className="text-xs text-slate-500">Comprehensive view of all metrics</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className={`justify-start gap-3 h-auto py-3 ${summaryType === 'base' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : ''}`}
                  onClick={() => handleGenerateSummary('base')}
                >
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  <div className="text-left">
                    <div className="font-medium">Base Price Analysis</div>
                    <div className="text-xs text-slate-500">Focus on base pricing strategies</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className={`justify-start gap-3 h-auto py-3 ${summaryType === 'promo' ? 'border-orange-500 bg-orange-50 text-orange-700' : ''}`}
                  onClick={() => handleGenerateSummary('promo')}
                >
                  <Tag className="h-5 w-5 text-orange-600" />
                  <div className="text-left">
                    <div className="font-medium">Promotional Analysis</div>
                    <div className="text-xs text-slate-500">Focus on promotional effectiveness</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className={`justify-start gap-3 h-auto py-3 ${summaryType === 'strat' ? 'border-purple-500 bg-purple-50 text-purple-700' : ''}`}
                  onClick={() => handleGenerateSummary('strat')}
                >
                  <BarChart4 className="h-5 w-5 text-purple-600" />
                  <div className="text-left">
                    <div className="font-medium">Strategic Analysis</div>
                    <div className="text-xs text-slate-500">Long-term pricing strategy insights</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  className="justify-start gap-3 h-auto py-3 hover:bg-cyan-50 hover:text-cyan-700"
                  onClick={() => {
                    setShowSummary(false);
                    setShowTextBot(true);
                  }}
                >
                  <MessageSquare className="h-5 w-5 text-cyan-600" />
                  <div className="text-left">
                    <div className="font-medium">Ask Anything Gazelle AI</div>
                    <div className="text-xs text-slate-500">Get custom insights with AI</div>
                  </div>
                </Button>
              </div>

              <Button
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                onClick={() => handleGenerateSummary(summaryType)}
              >
                {isGeneratingSummary ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating insights...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate AI Summary
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSummary(false)}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-blue-700">AI-Generated Summary</div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{generatedSummary}</p>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-600">Actions</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2 text-left h-auto py-3"
                  >
                    <Download className="h-4 w-4" />
                    <div>
                      <div className="text-sm font-medium">Save Summary</div>
                      <div className="text-xs text-slate-500">Export as PDF</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2 text-left h-auto py-3"
                    onClick={() => setShowTextBot(true)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <div>
                      <div className="text-sm font-medium">Ask AI</div>
                      <div className="text-xs text-slate-500">Get more insights</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
