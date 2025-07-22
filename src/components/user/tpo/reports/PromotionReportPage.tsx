import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ChevronDown, ChevronUp, Building, Target, Globe, Package, Users, ShoppingCart, Barcode, Sparkles, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChartSection from "./components/ChartSection";
import { SmartInsightsDrawer } from "./components/SmartInsightsDrawer";

interface TradePlan {
  trade_plan_name: string;
  id: string;
}

interface ChartQuestion {
  id: number;
  question: string;
  hasChart: boolean;
  category: "roi" | "analysis" | "performance";
}

type SummaryType = "overall" | "roi" | "performance" | "optimization";

const chartQuestions: ChartQuestion[] = [
  {
    id: 1,
    question: "What is the ROI for all events?",
    hasChart: true,
    category: "roi"
  },
  {
    id: 2,
    question: "What is driving the variation in ROI across different retailers?",
    hasChart: false,
    category: "analysis"
  },
  {
    id: 3,
    question: "Trade spend versus incremental case consumption and ROI (%)",
    hasChart: false,
    category: "performance"
  },
  {
    id: 4,
    question: "What is the ROI by event types?",
    hasChart: false,
    category: "roi"
  },
  {
    id: 5,
    question: "What is the ROI at different discount levels?",
    hasChart: false,
    category: "roi"
  },
  {
    id: 6,
    question: "What is the performance of PPGs?",
    hasChart: false,
    category: "performance"
  },
  {
    id: 7,
    question: "What is the Incremental Profit Per Dollar Invested on Promo By Retailer?",
    hasChart: false,
    category: "analysis"
  },
  {
    id: 8,
    question: "What is the relationship between ROI and Incremental Profit Pool?",
    hasChart: false,
    category: "analysis"
  }
];

function PromotionReportPage() {
  const [tradePlan, setTradePlan] = useState<TradePlan | null>(null);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [expandedCharts, setExpandedCharts] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Smart Insights state
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showTextBot, setShowTextBot] = useState(false);
  const [summaryType, setSummaryType] = useState<SummaryType>("overall");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState("");
  const [textBotPrompt, setTextBotPrompt] = useState("");
  const [textBotResponse, setTextBotResponse] = useState("");
  const [isGeneratingTextBotResponse, setIsGeneratingTextBotResponse] = useState(false);

  useEffect(() => {
    loadTradePlan();
  }, []);

  const loadTradePlan = async () => {
    try {
      const storedPlan = localStorage?.getItem('currentTradePlan');
      if (storedPlan) {
        setTradePlan(JSON.parse(storedPlan));
      } else {
        setTradePlan({
          trade_plan_name: "Q4 Promotional Strategy",
          id: "1"
        });
      }
    } catch (error) {
      console.error("Error loading trade plan:", error);
      setTradePlan({
        trade_plan_name: "Q4 Promotional Strategy",
        id: "1"
      });
    }
  };

  const toggleChart = (chartId: number) => {
    setExpandedCharts(prev => ({
      ...prev,
      [chartId]: !prev[chartId]
    }));
  };

  const downloadAllPPT = () => {
    const content = "Trade Plan Analysis Report\n\nGenerated on: " + new Date().toLocaleDateString();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trade_plan_report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleBackToDashboard = () => {
    // Get URL parameters and preserve them when going back
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    // Navigate back to TPO dashboard with preserved parameters
    window.location.href = `/user/tpo/dashboard?${params.toString()}`;
  };

  const handleBackToDesignStudio = () => {
    // Get URL parameters and preserve them when going back
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    // Navigate back to design studio with preserved parameters
    window.location.href = `/user/design-studio?${params.toString()}`;
  };

  const generateSummary = () => {
    setIsSmartInsightsOpen(true);
    setShowSummary(false);
    setShowTextBot(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      roi: "bg-emerald-50 text-emerald-700 border-emerald-200",
      performance: "bg-blue-50 text-blue-700 border-blue-200",
      analysis: "bg-violet-50 text-violet-700 border-violet-200"
    };
    return colors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getStatusIndicator = (hasChart: boolean) => {
    if (hasChart) {
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-emerald-600">Ready</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
        <span className="text-xs font-medium text-amber-600">Processing</span>
      </div>
    );
  };

  if (!tradePlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading trade plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      {/* Ultra-Modern Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            
            {/* Left Section - Enhanced Navigation */}
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                onClick={handleBackToDesignStudio}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-medium">Back</span>
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                    {tradePlan.trade_plan_name}
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">Promotion Analysis Reports</p>
                </div>
              </div>
            </div>
            
            {/* Center Section - Refined Filters */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">Geography</span>
                  <Select defaultValue="rma-to-retailer">
                    <SelectTrigger className="w-48 h-9 bg-gray-50/50 border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-gray-200 shadow-xl">
                      <SelectItem value="rma-to-retailer" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span>RMA to Retailer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="to-region-wise" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <Target className="w-4 h-4 text-green-500" />
                          <span>Region wise</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="to-total-us" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <Globe className="w-4 h-4 text-indigo-500" />
                          <span>Total US</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-px h-6 bg-gray-200"></div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">Analysis</span>
                  <Select defaultValue="by-category">
                    <SelectTrigger className="w-40 h-9 bg-gray-50/50 border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-gray-200 shadow-xl">
                      <SelectItem value="by-category" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-orange-500" />
                          <span>Category</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="by-retailer" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span>Retailer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="by-brand" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-purple-500" />
                          <span>Brand</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="by-ppg" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <ShoppingCart className="w-4 h-4 text-pink-500" />
                          <span>PPG</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="by-upc" className="rounded-md">
                        <div className="flex items-center gap-2.5">
                          <Barcode className="w-4 h-4 text-cyan-500" />
                          <span>UPC</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-20 h-9 rounded-lg border-gray-200 bg-gray-50/50 text-sm font-medium hover:bg-gray-50 transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={downloadAllPPT}
                size="sm"
                className="h-9 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Ultra-Clean Reports Grid */}
      <div className="max-w-8xl mx-auto px-8 py-8">
        <div className="grid gap-4">
          {chartQuestions.map((chart, index) => (
            <motion.div
              key={chart.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleChart(chart.id)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/40 transition-all duration-200"
              >
                <div className="flex items-center gap-6">
                  {/* Elegant Number Badge */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-lg">{chart.id}</span>
                    </div>
                    {chart.hasChart && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                    )}
                  </div>
                  
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md tracking-wide">
                        REPORT {chart.id}
                      </span>
                      {chart.category && (
                        <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md border ${getCategoryColor(chart.category)}`}>
                          {chart.category.toUpperCase()}
                        </span>
                      )}
                      {getStatusIndicator(chart.hasChart)}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug mb-1">
                      {chart.question}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {chart.hasChart ? "Interactive data visualization available" : "Data processing in progress"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      generateSummary();
                    }}
                    className="h-8 px-3 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-200 rounded-lg font-medium transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Generate AI Summary 
                  </Button>
                  
                  <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                    {expandedCharts[chart.id] ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedCharts[chart.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="border-t border-gray-50"
                  >
                    <div className="p-8 bg-gradient-to-br from-gray-50/30 to-blue-50/20">
                      <ChartSection chartId={chart.id} hasChart={chart.hasChart} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Smart Insights Drawer */}
      <SmartInsightsDrawer
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        showTextBot={showTextBot}
        setShowTextBot={setShowTextBot}
        summaryType={summaryType}
        setSummaryType={setSummaryType}
        isGeneratingSummary={isGeneratingSummary}
        setIsGeneratingSummary={setIsGeneratingSummary}
        generatedSummary={generatedSummary}
        setGeneratedSummary={setGeneratedSummary}
        textBotPrompt={textBotPrompt}
        setTextBotPrompt={setTextBotPrompt}
        textBotResponse={textBotResponse}
        setTextBotResponse={setTextBotResponse}
        isGeneratingTextBotResponse={isGeneratingTextBotResponse}
        setIsGeneratingTextBotResponse={setIsGeneratingTextBotResponse}
      />
    </div>
  );
}

export default PromotionReportPage;
export { PromotionReportPage };
