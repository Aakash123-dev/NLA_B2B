import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { ArrowLeft, Download, ChevronDown, ChevronUp, Building, Target, Globe, Package, Users, ShoppingCart, Barcode, Sparkles, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Removed ChartSection per request
import { SmartInsightsDrawer } from "./components/SmartInsightsDrawer";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/services/projectservices/axiosInstance";
import { eventService } from "@/services/eventServices/eventServices";
import pptxgen from "pptxgenjs";
import Logo from "@/assests/images/darkLogo.png";
import { getResult } from "@/utils/financialCalculations";
import { useEvents } from "@/hooks/useEvents";
import { calculateEventROI } from "@/utils/widgetCalculations";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

const generateCommonUIElements = (slide: any, title: any, pptx: any) => {
  slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.19,
      y: 0.49,
      w: 13,
      h: 6.85,
      line: "cccccc",
      fill: {
          color: "ffffff",
      },
  });

  // Add title
  slide.addText(title, {
      x: 0.2,
      y: 0.5,
      w: 13,
      h: 0.35,
      fontSize: 14,
      fill: {
          color: "F3F9FA",
      },
  });

  // Add logos
  slide.addImage({
      x: 0.3,
      y: "85%",
      w: 1.4,
      h: 0.9,
      path: Logo,
      objectName: "Company Logo",
  });
};


function PromotionReportPage() {
  const authData = JSON.parse(localStorage.getItem("user"));
  const searchParams = useSearchParams();
  const project_name = searchParams.get('project_name') || '';
  const project_id = searchParams.get('project_id') || '';
  const model_id = searchParams.get('model_id') || '';
  const tpoIdStr = searchParams.get('tpo_id') || '';
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [tradePlan, setTradePlan] = useState<TradePlan | null>(null);
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

  const { events, refreshEvents } = useEvents();
  const [chartData, setChartData] = useState<any>({
      series: [{
          name: 'ROI',
          data: []
      }],
      options: {
          chart: {
              type: 'bar',
              height: 400,
              toolbar: { show: false }
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  distributed: true,
              }
          },
          dataLabels: {
              enabled: true,
              formatter: function (val) {
                  return val.toFixed(2) + '%';
              },
              style: {
                  colors: ['#fff']
              }
          },
          xaxis: {
              categories: [],
              title: {
                  text: 'Events'
              }
          },
          yaxis: {
              title: {
                  text: 'ROI (%)'
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          },
          legend: {
              show: false
          },
          colors: ['#52c41a'],
          theme: {
              mode: 'light'
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          }
      }
  });
  const [summaryData, setSummaryData] = useState({
      total: 0,
      positiveROI: 0,
      negativeROI: 0,
      avgROI: 0,
      totalSpend: 0,
      positiveSpend: 0,
      negativeSpend: 0,
      positiveCount: 0,
      negativeCount: 0
  });
  const [presentationGenerated, setPresentationGenerated] = React.useState(false);
  const [chart2Data, setChart2Data] = useState<any>({
      series: [{
          name: 'ROI',
          data: []
      }],
      options: {
          chart: {
              type: 'bar',
              height: 400,
              toolbar: { show: false },
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  distributed: true,
                  dataLabels: {
                      position: 'top'
                  }
              }
          },
          grid: {
              padding: {
                  bottom: 20
              }
          },
          xaxis: {
              categories: [],
              title: {
                  text: 'Events',
                  offsetY: 80,
                  style: {
                      fontSize: '14px'
                  }
              },
              labels: {
                  style: {
                      fontSize: '12px'
                  }
              },
              axisBorder: {
                  show: true
              },
              axisTicks: {
                  show: true
              }
          },
          dataLabels: {
              enabled: true,
              formatter: function (val) {
                  return val.toFixed(2) + '%';
              },
              style: {
                  colors: ['#000']
              },
              offsetY: -20,
              position: 'top'
          },
          annotations: {
              yaxis: [{
                  y: 20, // Average ROI line at 20%
                  borderColor: '#000',
                  label: {
                      text: 'Avg. ROI: 20%',
                      position: 'left',
                      style: {
                          color: '#000'
                      }
                  }
              }]
          },
          yaxis: {
              title: {
                  text: 'ROI (%)'
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          },
          legend: {
              show: true,
              position: 'top',
              horizontalAlign: 'center'
          },
          colors: ['#52c41a'],
          theme: {
              mode: 'light'
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          }
      }
  });
  const [chart3Data, setChart3Data] = useState<any>({
      series1: [{
          name: 'Incremental Volume',
          data: [],
          type: 'scatter'
      }],
      series2: [{
          name: 'ROI (%)',
          data: [],
          type: 'scatter'
      }],
      options1: {
          chart: {
              type: 'scatter',
              height: 400,
              toolbar: { show: false },
              zoom: {
                  enabled: false,
              }
          },
          xaxis: {
              title: {
                  text: 'Spend ($)'
              },
              tickAmount: 5,
              labels: {
                  formatter: function (val) {
                      return '$' + val.toFixed(2);
                  }
              }
          },
          yaxis: {
              title: {
                  text: 'Incremental Volume'
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(2);
                  }
              }
          },
          annotations: {
              yaxis: [{
                  y: 0,
                  borderColor: '#000',
                  strokeDashArray: 0,
                  opacity: 0.1,
              }]
          },
          tooltip: {
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                  return `<div class="p-2">
                      <div><b>${data.eventName}</b></div>
                      <div>Spend: $${formatCurrency(data.x)}</div>
                      <div>Volume: ${formatCurrency(data.y)}</div>
                  </div>`;
              }
          },
          legend: {
              show: false
          }
      },
      options2: {
          chart: {
              type: 'scatter',
              height: 400,
              toolbar: { show: false },
              zoom: {
                  enabled: false,
              }
          },
          xaxis: {
              title: {
                  text: 'Spend ($)'
              },
              tickAmount: 5,
              labels: {
                  formatter: function (val) {
                      return '$' + val.toFixed(2);
                  }
              }
          },
          yaxis: {
              title: {
                  text: 'ROI (%)'
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          },
          annotations: {
              yaxis: [{
                  y: 0,
                  borderColor: '#000',
                  strokeDashArray: 0,
                  opacity: 0.1,
              }]
          },
          tooltip: {
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                  return `<div class="p-2">
                      <div><b>${data.eventName}</b></div>
                      <div>Spend: $${formatCurrency(data.x)}</div>
                      <div>ROI: ${data.y.toFixed(2)}%</div>
                  </div>`;
              }
          },
          legend: {
              show: false
          }
      }
  });
  const [chart4Data, setChart4Data] = useState<any>({
      eventCount: {
          series: [{
              name: 'Event Count',
              data: []
          }],
          options: {
              chart: {
                  type: 'bar',
                  height: 350,
                  toolbar: { show: false }
              },
              plotOptions: {
                  bar: {
                      horizontal: true,
                      distributed: true,
                      barHeight: '40%'
                  }
              },
              dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  },
                  style: { colors: ['#000'] }
              },
              xaxis: {
                  categories: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                  title: { text: '' },
                  labels: {
                      show: true,
                      formatter: function (val) {
                          return val + '%';
                      }
                  }
              },
              yaxis: {
                  labels: {
                      style: {
                          fontSize: '12px'
                      }
                  }
              },
              grid: {
                  xaxis: {
                      lines: {
                          show: false
                      }
                  }
              },
              colors: ['#2196f3']
          }
      },
      incrementalLift: {
          series: [{
              name: 'Incremental Lift',
              data: []
          }],
          options: {
              chart: {
                  type: 'bar',
                  height: 350,
                  toolbar: { show: false }
              },
              plotOptions: {
                  bar: {
                      horizontal: true,
                      distributed: true,
                      barHeight: '40%'
                  }
              },
              dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  },
                  style: { colors: ['#000'] }
              },
              xaxis: {
                  categories: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                  labels: {
                      show: true,
                      formatter: function (val) {
                          return val + '%';
                      }
                  },
                  title: { text: '' }
              },
              yaxis: {
                  labels: {
                      style: {
                          fontSize: '12px'
                      }
                  }
              },
              grid: {
                  xaxis: {
                      lines: {
                          show: true
                      }
                  }
              },
              colors: ['#00e396'],
              tooltip: {
                  y: {
                      formatter: function (val) {
                          return val.toFixed(2) + '%';
                      }
                  }
              }
          }
      },
      weightedROI: {
          series: [{
              name: 'Weighted ROI',
              data: []
          }],
          options: {
              chart: {
                  type: 'bar',
                  height: 350,
                  toolbar: { show: false }
              },
              plotOptions: {
                  bar: {
                      horizontal: true,
                      distributed: true,
                      barHeight: '40%'
                  }
              },
              dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  },
                  style: { colors: ['#000'] }
              },
              xaxis: {
                  categories: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                  labels: {
                      show: true,
                      formatter: function (val) {
                          return val + '%';
                      }
                  },
                  title: { text: '' }
              },
              yaxis: {
                  labels: {
                      style: {
                          fontSize: '12px'
                      }
                  }
              },
              grid: {
                  xaxis: {
                      lines: {
                          show: true
                      }
                  }
              },
              colors: ['#feb019'],
              tooltip: {
                  y: {
                      formatter: function (val) {
                          return val.toFixed(2) + '%';
                      }
                  }
              }
          }
      }
  });
  const [chart5Data, setChart5Data] = useState<any>({
      series: [{
          name: 'ROI',
          data: []
      }],
      options: {
          chart: {
              type: 'bar',
              height: 400,
              toolbar: { show: false }
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '45%',
                  distributed: true
              }
          },
          dataLabels: {
              enabled: true,
              formatter: function (val) {
                  return val.toFixed(2) + '%';
              },
              style: {
                  colors: ['#000']
              }
          },
          colors: ['#2196f3'],
          xaxis: {
              categories: ['0-10', '10-20', '20-30', '30-40', '40-50'],
              title: {
                  text: 'Discount Depth'
              }
          },
          yaxis: {
              title: {
                  text: 'ROI (%)'
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          },
          grid: {
              borderColor: '#e7e7e7',
              row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.5
              }
          },
          legend: {
              show: false
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          }
      },
      summaryData: {
          noOfEvents: [],
          avgWeightedROI: [],
          tradeSpend: [],
          avgLift: [],
          fndEvents: []
      }
  });
  const [chart6Data, setChart6Data] = useState<any>({
      series: [],
      options: {
          chart: {
              type: 'bar',
              height: 400,
              toolbar: { show: false },
              stacked: false
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  distributed: false
              }
          },
          dataLabels: {
              enabled: true,
              formatter: function (val) {
                  // Only show label if value exists and is not zero
                  return val != null && val !== 0 ? val.toFixed(2) + '%' : '';
              },
              style: {
                  colors: ['#000']
              }
          },
          xaxis: {
              categories: [],
              title: {
                  text: 'Price Point Groups'
              },
              labels: {
                  style: {
                      fontSize: '12px'
                  }
              }
          },
          yaxis: {
              title: {
                  text: 'ROI (%)'
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(2) + '%';
                  }
              }
          },
          colors: ['#4472C4', '#00B050', '#FFC000', '#7030A0'], // Different colors for different events
          title: {
              text: 'Performance by Price Point Group',
              align: 'center',
              style: {
                  fontSize: '16px'
              }
          },
          legend: {
              show: true,
              position: 'bottom'
          }
      },
      summaryData: {
          ppgGroups: []
      }
  });
  const [chart7Data, setChart7Data] = useState<any>({
      series: [{
          name: 'Previous Year',
          data: []
      }, {
          name: 'Current Year',
          data: [],
          percentageChanges: []
      }],
      options: {
          chart: {
              type: 'bar',
              height: 400,
              toolbar: { show: false }
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  dataLabels: {
                      position: 'center' // Change from 'top' to 'center'
                  }
              }
          },
          dataLabels: {
              enabled: true,
              formatter: function (val, { seriesIndex, dataPointIndex, w }) {
                  if (seriesIndex === 1) { // Only show percentage change on current year bars
                      const percentageChanges = w.config.series[1].percentageChanges || [];
                      const change = percentageChanges[dataPointIndex];
                      if (isNaN(change) || change === undefined) return `$${val.toFixed(2)}`;
                      const arrow = change >= 0 ? '↑' : '↓';
                      return `$${val.toFixed(2)} (${arrow}${Math.abs(change).toFixed(1)}%)`;
                  }
                  return `$${val.toFixed(2)}`;
              },
              style: {
                  colors: ['#fff'] // Change text color to white for better visibility
              }
          },
          colors: ['#2196f3', '#00e396'],
          xaxis: {
              categories: [], // Will be populated with channel names
              title: {
                  text: 'Channels'
              }
          },
          yaxis: {
              title: {
                  text: 'Incremental Profit'
              },
              labels: {
                  formatter: function (val) {
                      return `$${val.toFixed(2)}`;
                  }
              }
          },
          title: {
              text: 'Incremental Profit Pool per Dollar Invested on Promo',
              align: 'center',
              style: {
                  fontSize: '14px'
              }
          },
          subtitle: {
              // Will show the current year and the previous year
              text: `52 Weeks Ending ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
              align: 'center'
          },
          legend: {
              position: 'top',
              horizontalAlign: 'center'
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return `$${val.toFixed(2)}`;
                  }
              }
          }
      }
  });
  const [chart8Data, setChart8Data] = useState<any>({
      series: [{
          name: 'Incremental Profit per Dollar',
          data: []
      }],
      options: {
          chart: {
              type: 'scatter',
              height: 400,
              toolbar: { show: false },
              zoom: {
                  enabled: false,
              }
          },
          xaxis: {
              title: {
                  text: 'Manufacturer ROI (%)',
                  style: {
                      fontSize: '14px'
                  }
              },
              tickAmount: 10,
              labels: {
                  formatter: function (val) {
                      return val.toFixed(0) + '%';
                  }
              }
          },
          yaxis: {
              title: {
                  text: 'Incremental Profit Pool per Dollar Invested',
                  style: {
                      fontSize: '14px'
                  }
              },
              labels: {
                  formatter: function (val) {
                      return '$' + val.toFixed(2);
                  }
              }
          },
          title: {
              text: 'Relationship between ROI and Incremental Profit Pool per Event',
              align: 'center',
              style: {
                  fontSize: '16px'
              }
          },
          tooltip: {
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                  return `<div class="p-2">
                      <div><b>${point.name}</b></div>
                      <div>ROI: ${point.x.toFixed(1)}%</div>
                      <div>Profit per $: $${point.y.toFixed(2)}</div>
                  </div>`;
              }
          },
          markers: {
              size: 6,
              colors: ['#00B3E5'],
              strokeColors: '#fff',
              strokeWidth: 2
          },
          grid: {
              borderColor: '#e7e7e7',
              row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.5
              }
          }
      }
  });
  const [chart9Data, setChart9Data] = useState({
      series: [
          {
              name: '$6.99',
              data: []
          },
          {
              name: '$5.99',
              data: []
          },
          {
              name: '$4.99',
              data: []
          }
      ],
      options: {
          chart: {
              type: 'line',
              height: 400,
              toolbar: { show: false }
          },
          stroke: {
              width: 2,
              curve: 'smooth'
          },
          colors: ['#00B3E5', '#4CAF50', '#FFC107'],
          xaxis: {
              title: {
                  text: '% of Promo Funded by Retailer',
                  style: {
                      fontSize: '14px'
                  }
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(0) + '%';
                  }
              }
          },
          yaxis: {
              title: {
                  text: 'Manufacturer Promo ROI',
                  style: {
                      fontSize: '14px'
                  }
              },
              labels: {
                  formatter: function (val) {
                      return val.toFixed(0) + '%';
                  }
              }
          },
          annotations: {
              yaxis: [{
                  y: 25,
                  borderColor: '#00E396',
                  label: {
                      text: 'Minimum Acceptable ROI (25%)',
                      style: {
                          color: '#fff',
                          background: '#00E396'
                      }
                  }
              }],
              points: [
                  {
                      x: 20,
                      y: 25,
                      marker: {
                          size: 6,
                          fillColor: '#fff',
                          strokeColor: '#2196F3',
                          radius: 2
                      },
                      label: {
                          text: 'To get ROI of 25% at $6.99 would need retailer to fund ~20%',
                          style: {
                              color: '#333'
                          }
                      }
                  },
                  {
                      x: 35,
                      y: 25,
                      marker: {
                          size: 6,
                          fillColor: '#fff',
                          strokeColor: '#2196F3',
                          radius: 2
                      },
                      label: {
                          text: 'To get ROI of 25% at $5.99 would need retailer to fund ~35%',
                          style: {
                              color: '#333'
                          }
                      }
                  },
                  {
                      x: 50,
                      y: 25,
                      marker: {
                          size: 6,
                          fillColor: '#fff',
                          strokeColor: '#2196F3',
                          radius: 2
                      },
                      label: {
                          text: 'To get ROI of 25% at $4.99 would need retailer to fund ~50%',
                          style: {
                              color: '#333'
                          }
                      }
                  }
              ]
          },
          grid: {
              borderColor: '#e7e7e7',
              row: {
                  colors: ['transparent', 'transparent'],
                  opacity: 0.5
              }
          },
          markers: {
              size: 4
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return val.toFixed(1) + '%';
                  }
              },
              x: {
                  formatter: function (val) {
                      return val.toFixed(1) + '%';
                  }
              }
          },
          fill: {
              type: 'gradient',
              gradient: {
                  shadeIntensity: 1,
                  inverseColors: false,
                  opacityFrom: 0.45,
                  opacityTo: 0.05,
                  stops: [20, 100, 100, 100]
              }
          }
      }
  });

  const [chart5View, setChart5View] = useState('retailer');
  const [currentYearEvents, setCurrentYearEvents] = useState<any[]>([]);
  const [previousYearEvents, setPreviousYearEvents] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState<any[]>([]);
  const [isLoadingYears, setIsLoadingYears] = useState(false);
  const [tpoData, setTpoData] = useState(null);
  const [isLoadingTpo, setIsLoadingTpo] = useState(false);
  const [previousYearTpoEvents, setPreviousYearTpoEvents] = useState<any[]>([]);
  const [isLoadingPrevYear, setIsLoadingPrevYear] = useState(false);

  useEffect(() => {
    const fetchTpoData = async () => {
        try {
            setIsLoadingTpo(true);
            const api = `/events/tpo/${tpoIdStr}`;
            const response = await axiosInstance.get(api);
            setTpoData(response?.data);
        } catch (error) {
            console.error("Error fetching TPO data:", error);
        } finally {
            setIsLoadingTpo(false);
        }
    };

    fetchTpoData();
}, [tpoIdStr]);

useEffect(() => {
  if (tpoData) {
      refreshEvents(String(tpoIdStr));
  }
}, [tpoData, tpoIdStr]);

useEffect(() => {
  const fetchAvailableYears = async () => {
      if (!tpoData || !events.length) return;

      try {
          setIsLoadingYears(true);
          const api = `/events/tpo/available-years`;
          const config = {
              params: {
                  project_id,
                  model_id,
                  retailer_id: tpoData.retailer_id,
                  brand_id: tpoData.brand_id,
                  year: tpoData.year
              }
          };
          const response = await axiosInstance.get(api, config);
          setAvailableYears(response.data);

          // Set initial year from TPO data
          const eventYear = new Date(events[0].start_date).getFullYear();
          setSelectedYear(eventYear);
      } catch (error) {
          console.error('Error fetching available years:', error);
      } finally {
          setIsLoadingYears(false);
      }
  };
  setCurrentYearEvents(events);
  fetchAvailableYears();
}, [tpoData, events]);

// (removed duplicate fetch using axios and REACT_APP_Base_URL)

useEffect(() => {
  // Fetch events for the selected year
  if (selectedYear) {
      const getTPOID = availableYears.find(year => Number(year.year) === Number(selectedYear));
      if (getTPOID)
          refreshEvents(getTPOID.id);
  }
}, [selectedYear]);

// Add function to fetch previous year events
const fetchPreviousYearEvents = async (tpoId: string) => {
  try {
      setIsLoadingPrevYear(true);
      const events = await eventService.getEvents(tpoId);
      setPreviousYearTpoEvents(events);
  } catch (error) {
      console.error("Error fetching previous year events:", error);
  } finally {
      setIsLoadingPrevYear(false);
  }
};

useEffect(() => {
  if (availableYears) {
      const previousYearTPO = availableYears.find(year => Number(year.year) === Number(selectedYear) - 1);
      if (previousYearTPO) {
          fetchPreviousYearEvents(previousYearTPO.id);
      } else {
          setPreviousYearTpoEvents([]); // Clear previous year data if not available
      }
  }
}, [availableYears]);

useEffect(() => {
  if (currentYearEvents.length) {
      calculateChartData();
      calculateChart2Data();
      calculateChart3Data();
      calculateChart4Data();
      calculateChart5Data();
      calculateChart6Data();
      calculateChart7Data();
      calculateChart8Data();
      calculateChart9Data();
  }
}, [currentYearEvents]);

useEffect(() => {
  if (previousYearTpoEvents.length) {
      calculateChart7Data();
  }
}, [previousYearTpoEvents]);

const calculateChartData = () => {
  // let totalSpend = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let eventNames = [];
  let roiValues = [];
  let negativeROI = [];
  let positiveROI = [];

  let positiveIncrementalContribution = [];
  let negativeIncrementalContribution = [];
  let positiveSpend = [];
  let negativeSpend = [];

  // Transform events data for chart
  currentYearEvents.forEach(event => {
      const { roi, totalSpend: eventTotalSpend, incrementalContribution } = calculateEventROI(event);

      // totalSpend += eventTotalSpend;
      if (roi > 0) {
          positiveCount++;
          positiveROI.push(roi);
          positiveSpend.push(eventTotalSpend);
          positiveIncrementalContribution.push(incrementalContribution);
      }
      if (roi < 0) {
          negativeCount++;
          negativeROI.push(roi);
          negativeSpend.push(eventTotalSpend);
          negativeIncrementalContribution.push(incrementalContribution);
      }

      eventNames.push(event.title || `Event ${event.id}`);
      roiValues.push(roi);
  });

  // Sort by ROI descending
  const sortedIndices = roiValues.map((val, idx) => idx)
      .sort((a, b) => roiValues[b] - roiValues[a]);

  const sortedNames = sortedIndices.map(i => eventNames[i]);
  const sortedValues = sortedIndices.map(i => roiValues[i]);

  // Create colors array based on ROI values
  const colors = sortedValues.map(value => value >= 0 ? '#52c41a' : '#ff4d4f');

  setChartData(prev => ({
      ...prev,
      series: [{
          name: 'ROI',
          data: sortedValues
      }],
      options: {
          ...prev.options,
          colors: colors,
          xaxis: {
              ...prev.options.xaxis,
              categories: sortedNames
          }
      }
  }));

  const totalIncrementalContribution = positiveIncrementalContribution.reduce((acc, curr) => acc + curr, 0) - negativeIncrementalContribution.reduce((acc, curr) => acc + curr, 0);
  const totalSpend = positiveSpend.reduce((acc, curr) => acc + curr, 0) - negativeSpend.reduce((acc, curr) => acc + curr, 0);
  const totalRoi = (((totalIncrementalContribution - totalSpend) / totalSpend) * 100);

  setSummaryData({
      total: currentYearEvents.length,
      positiveROI: positiveROI.length > 0 ? (((positiveIncrementalContribution.reduce((acc, curr) => acc + curr, 0) - positiveSpend.reduce((acc, curr) => acc + curr, 0)) / positiveSpend.reduce((acc, curr) => acc + curr, 0)) * 100) : 0,
      positiveCount: positiveCount,
      negativeROI: negativeROI.length > 0 ? (((negativeIncrementalContribution.reduce((acc, curr) => acc + curr, 0) - negativeSpend.reduce((acc, curr) => acc + curr, 0)) / negativeSpend.reduce((acc, curr) => acc + curr, 0)) * 100) : 0,
      negativeCount: negativeCount,
      avgROI: totalRoi,
      totalSpend: totalSpend,
      positiveSpend: positiveSpend.length > 0 ? Number(positiveSpend.reduce((acc, curr) => acc + curr, 0)) : 0,
      negativeSpend: negativeSpend.length > 0 ? Number(negativeSpend.reduce((acc, curr) => acc + curr, 0)) : 0
  });
};

const calculateChart2Data = () => {
  // Group events by retailer and calculate average ROI
  const retailerROIs = {};
  let eventCount = 0;
  let totalSpend = 0;
  let totalIncrementalContribution = 0;

  currentYearEvents.forEach(event => {
      const retailer = tpoData.retailer_id;

      if (!retailerROIs[retailer]) {
          retailerROIs[retailer] = {
              totalROI: 0,
              count: 0,
              totalSpend: 0,
              totalIncrementalContribution: 0
          };
      }

      const { totalSpend: eventTotalSpend, incrementalContribution } = calculateEventROI(event);

      totalSpend += eventTotalSpend;
      totalIncrementalContribution += incrementalContribution;
      retailerROIs[retailer].totalSpend += eventTotalSpend;
      retailerROIs[retailer].totalIncrementalContribution += incrementalContribution;
      retailerROIs[retailer].count += 1;
      eventCount++;
  });

  // Calculate average ROI for each retailer
  const accounts = [];
  const roiValues = [];
  Object.entries(retailerROIs).forEach(([retailer, data]) => {
      const retailerName = events.find(e => e.retailer_id === retailer)?.retailer_name || retailer;
      const roi = (((data.totalIncrementalContribution - data.totalSpend) / data.totalSpend) * 100);

      accounts.push(retailerName);
      roiValues.push(roi);
  });

  // Calculate overall average ROI
  const totalRoi = (((totalIncrementalContribution - totalSpend) / totalSpend) * 100);

  // Create colors array based on ROI values
  const colors = roiValues.map(value => {
      if (value >= 35) return '#52c41a';  // High positive - Green
      if (value > 0) return '#ffd700';     // Low positive - Yellow
      return '#ff4d4f';                    // Negative - Red
  });

  setChart2Data(prev => ({
      ...prev,
      series: [{
          name: 'ROI',
          data: roiValues
      }],
      options: {
          ...prev.options,
          colors: colors,
          xaxis: {
              ...prev.options.xaxis,
              categories: accounts
          },
          annotations: {
              yaxis: [{
                  y: totalRoi,
                  borderColor: '#000',
                  label: {
                      text: `Avg. ROI: ${totalRoi.toFixed(2)}%`,
                      position: 'left',
                      style: {
                          color: '#000'
                      }
                  }
              }]
          }
      }
  }));
};

const calculateChart3Data = () => {
  const spendVolumeData = [];
  const spendROIData = [];
  let correlation1 = 0;
  let correlation2 = 0;

  currentYearEvents.forEach(event => {
      let volume = 0;
      event.planned.forEach(product => {
          const { financialResults } = getResult(product.financialData);
          volume += Number(financialResults.find(r => r.name === "Incremental Revenue")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
      });

      const { roi: eventROI, totalSpend: eventTotalSpend } = calculateEventROI(event);
      // Add event name to the data points
      spendVolumeData.push({
          x: eventTotalSpend,
          y: volume,
          eventName: `${event.title}`,
          originalX: eventTotalSpend // Store original value for tooltip
      });
      spendROIData.push({
          x: eventTotalSpend,
          y: eventROI,
          eventName: `${event.title}`,
          originalX: eventTotalSpend // Store original value for tooltip
      });
  });

  // Calculate correlations
  correlation1 = calculateCorrelation(spendVolumeData.map(d => [d.x, d.y]));
  correlation2 = calculateCorrelation(spendROIData.map(d => [d.x, d.y]));

  // Create round, equidistant X-axis values
  if (spendVolumeData.length > 0) {
      // Find min and max spend values
      const minSpend = Math.min(...spendVolumeData.map(d => d.x));
      const maxSpend = Math.max(...spendVolumeData.map(d => d.x));

      const roundInterval = (min, max) => {
          const interval = Math.round((max - min) / 6);
          return Math.ceil(interval / 1000) * 1000;
      }

      // Round to nearest 1000 for better readability
      const roundedMin = Math.floor(minSpend / roundInterval(minSpend, maxSpend)) * roundInterval(minSpend, maxSpend);
      const roundedMax = Math.ceil(maxSpend / roundInterval(minSpend, maxSpend)) * roundInterval(minSpend, maxSpend);

      // Create 7 equidistant points
      const interval = Math.round((roundedMax - roundedMin) / 6);
      const roundedInterval = Math.ceil(interval / roundInterval(minSpend, maxSpend)) * roundInterval(minSpend, maxSpend);

      // Generate tick values
      const tickValues = [];
      for (let i = 0; i < 7; i++) {
          tickValues.push(roundedMin + (i * roundedInterval));
      }

      setChart3Data(prev => ({
          ...prev,
          series1: [{
              name: 'Incremental Volume',
              data: spendVolumeData
          }],
          series2: [{
              name: 'ROI (%)',
              data: spendROIData
          }],
          options1: {
              ...prev.options1,
              xaxis: {
                  ...prev.options1.xaxis,
                  min: roundedMin,
                  max: roundedMin + (6 * roundedInterval),
                  tickAmount: 7,
                  axisTicks: {
                      show: true
                  },
                  axisBorder: {
                      show: true
                  },
                  labels: {
                      formatter: function (val) {
                          return '$' + formatNumber(val);
                      }
                  }
              },
              title: {
                  text: 'Incremental Volume vs Spend',
                  align: 'center'
              },
              tooltip: {
                  custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                      const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                      return `<div class="p-2">
                          <div><b>${data.eventName}</b></div>
                          <div>Spend: $${formatCurrency(data.originalX)}</div>
                          <div>Volume: ${formatCurrency(data.y)}</div>
                      </div>`;
                  }
              },
              subtitle: {
                  text: `Correlation: ${correlation1.toFixed(2)}`,
                  align: 'right',
                  style: {
                      fontSize: '12px'
                  }
              }
          },
          options2: {
              ...prev.options2,
              xaxis: {
                  ...prev.options2.xaxis,
                  min: roundedMin,
                  max: roundedMin + (6 * roundedInterval),
                  tickAmount: 7,
                  axisTicks: {
                      show: true
                  },
                  axisBorder: {
                      show: true
                  },
                  labels: {
                      formatter: function (val) {
                          return '$' + formatNumber(val);
                      }
                  }
              },
              title: {
                  text: 'ROI vs Spend',
                  align: 'center'
              },
              tooltip: {
                  custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                      const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                      return `<div class="p-2">
                          <div><b>${data.eventName}</b></div>
                          <div>Spend: $${formatCurrency(data.originalX)}</div>
                          <div>ROI: ${data.y.toFixed(2)}%</div>
                      </div>`;
                  }
              },
              subtitle: {
                  text: `Correlation: ${correlation2.toFixed(2)}`,
                  align: 'right',
                  style: {
                      fontSize: '12px'
                  }
              }
          }
      }));
  }
};

const calculateCorrelation = (data) => {
  const n = data.length;
  if (n === 0) return 0;

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

  data.forEach(([x, y]) => {
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
      sumY2 += y * y;
  });

  const numerator = (n * sumXY) - (sumX * sumY);
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
};

const calculateChart4Data = () => {
  const eventTypes = {
      'TPR': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 },
      'Feature Only': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 },
      'Display Only': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 },
      'Feature and Display': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 }
  };

  let totalEvents = 0;
  let totalSpend = 0;
  let totalROI = 0;
  let totalIncrementalLift = 0;
  let totalProductCount = 0;
  let totalUnits = 0;
  let totalROIUnits = 0;

  // First pass: Calculate totals
  currentYearEvents.forEach(event => {
      // Determine event type from the first product's promotional results
      const firstProduct = event.planned[0];
      const { promotionalResults: firstProductPromo } = getResult(firstProduct.financialData);

      if (firstProductPromo) {
          // Check event type once per event
          const tprEvent = firstProductPromo.find(p => p.promotion === 'TPR')?.acv > 0;
          const featureEvent = firstProductPromo.find(p => p.promotion === 'Feature Only')?.acv > 0;
          const displayEvent = firstProductPromo.find(p => p.promotion === 'Display Only')?.acv > 0;
          const featureAndDisplayEvent = firstProductPromo.find(p => p.promotion === 'Feature and Display')?.acv > 0;

          // Increment counts once per event
          if (tprEvent) eventTypes.TPR.count++;
          if (featureEvent) eventTypes['Feature Only'].count++;
          if (displayEvent) eventTypes['Display Only'].count++;
          if (featureAndDisplayEvent) eventTypes['Feature and Display'].count++;
      }

      // Process each product's financial data

      const { roi: eventROI, totalSpend: eventTotalSpend } = calculateEventROI(event);
      event.planned.forEach(product => {
          const { promotionalResults } = getResult(product.financialData);
          if (!promotionalResults) return;

          // const roi = Number(financialResults.find(r => r.name === "Sales ROI")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
          // const spend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

          // Get promotional results
          const tprResult = promotionalResults.find(p => p.promotion === 'TPR');
          const featureResult = promotionalResults.find(p => p.promotion === 'Feature Only');
          const displayResult = promotionalResults.find(p => p.promotion === 'Display Only');
          const featureAndDisplayResult = promotionalResults.find(p => p.promotion === 'Feature and Display');
          const eventTotalUnits = Number(promotionalResults.find(result => result.promotion === 'Event Total')?.units);

          // Add to total units and total ROI units
          totalUnits += eventTotalUnits;
          totalROIUnits += eventTotalUnits * eventROI;

          // Accumulate metrics without incrementing counts
          if (tprResult && tprResult.acv > 0) {
              eventTypes.TPR.productCount++;
              eventTypes.TPR.incrementalLift += tprResult.lift;
              eventTypes.TPR.roi += (eventROI);
              eventTypes.TPR.spend += eventTotalSpend;
              eventTypes.TPR.totalROIUnits += eventTotalUnits * eventROI;
              eventTypes.TPR.totalUnits += eventTotalUnits;
              totalIncrementalLift += tprResult.lift;
              totalProductCount++;

          }

          if (featureResult && featureResult.acv > 0) {
              eventTypes['Feature Only'].productCount++;
              eventTypes['Feature Only'].incrementalLift += featureResult.lift;
              eventTypes['Feature Only'].roi += (eventROI);
              eventTypes['Feature Only'].spend += eventTotalSpend;
              eventTypes['Feature Only'].totalROIUnits += eventTotalUnits * eventROI;
              eventTypes['Feature Only'].totalUnits += eventTotalUnits;
              totalIncrementalLift += featureResult.lift;
              totalProductCount++;
          }

          if (displayResult && displayResult.acv > 0) {
              eventTypes['Display Only'].productCount++;
              eventTypes['Display Only'].incrementalLift += displayResult.lift;
              eventTypes['Display Only'].roi += (eventROI);
              eventTypes['Display Only'].spend += eventTotalSpend;
              eventTypes['Display Only'].totalROIUnits += eventTotalUnits * eventROI;
              eventTypes['Display Only'].totalUnits += eventTotalUnits;
              totalIncrementalLift += displayResult.lift;
              totalProductCount++;
          }

          if (featureAndDisplayResult && featureAndDisplayResult.acv > 0) {
              eventTypes['Feature and Display'].productCount++;
              eventTypes['Feature and Display'].incrementalLift += featureAndDisplayResult.lift;
              eventTypes['Feature and Display'].roi += (eventROI);
              eventTypes['Feature and Display'].spend += eventTotalSpend;
              eventTypes['Feature and Display'].totalROIUnits += eventTotalUnits * eventROI;
              eventTypes['Feature and Display'].totalUnits += eventTotalUnits;
              totalIncrementalLift += featureAndDisplayResult.lift;
              totalProductCount++;
          }

          totalSpend += eventTotalSpend;
          totalROI += (eventROI);
      });

      totalEvents++;
  });

  const categories = ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', `All ${totalEvents} Events`];

  // Calculate percentages and weighted averages
  const eventCount = [
      (eventTypes.TPR.count / totalEvents) * 100,
      (eventTypes['Feature Only'].count / totalEvents) * 100,
      (eventTypes['Display Only'].count / totalEvents) * 100,
      (eventTypes['Feature and Display'].count / totalEvents) * 100,
      100 // All events is always 100%
  ];

  // Calculate average incremental lift for each type
  const avgLift = [
      eventTypes.TPR.productCount > 0 ? eventTypes.TPR.incrementalLift / eventTypes.TPR.productCount : 0,
      eventTypes['Feature Only'].productCount > 0 ? eventTypes['Feature Only'].incrementalLift / eventTypes['Feature Only'].productCount : 0,
      eventTypes['Display Only'].productCount > 0 ? eventTypes['Display Only'].incrementalLift / eventTypes['Display Only'].productCount : 0,
      eventTypes['Feature and Display'].productCount > 0 ? eventTypes['Feature and Display'].incrementalLift / eventTypes['Feature and Display'].productCount : 0,
      totalProductCount > 0 ? totalIncrementalLift / totalProductCount : 0
  ];

  const weightedROI = [
      eventTypes.TPR.totalUnits > 0 ? (eventTypes.TPR.totalROIUnits / eventTypes.TPR.totalUnits) : 0,
      eventTypes['Feature Only'].totalUnits > 0 ? (eventTypes['Feature Only'].totalROIUnits / eventTypes['Feature Only'].totalUnits) : 0,
      eventTypes['Display Only'].totalUnits > 0 ? (eventTypes['Display Only'].totalROIUnits / eventTypes['Display Only'].totalUnits) : 0,
      eventTypes['Feature and Display'].totalUnits > 0 ? (eventTypes['Feature and Display'].totalROIUnits / eventTypes['Feature and Display'].totalUnits) : 0,
      totalUnits > 0 ? (totalROIUnits / totalUnits) : 0
  ];
  setChart4Data(prev => ({
      eventCount: {
          ...prev.eventCount,
          series: [{
              name: 'Event Count',
              data: eventCount
          }],
          options: {
              ...prev.eventCount.options,
              xaxis: {
                  ...prev.eventCount.options.xaxis,
                  categories
              },
              colors: eventCount.map(value => value >= 0 ? '#2196f3' : '#ff4d4f')
          }
      },
      incrementalLift: {
          ...prev.incrementalLift,
          series: [{
              name: 'Incremental Lift',
              data: avgLift
          }],
          options: {
              ...prev.incrementalLift.options,
              xaxis: {
                  ...prev.incrementalLift.options.xaxis,
                  categories
              },
              colors: avgLift.map(value => value >= 0 ? '#00e396' : '#ff4d4f')
          }
      },
      weightedROI: {
          ...prev.weightedROI,
          series: [{
              name: 'Weighted ROI',
              data: weightedROI
          }],
          options: {
              ...prev.weightedROI.options,
              xaxis: {
                  ...prev.weightedROI.options.xaxis,
                  categories
              },
              colors: weightedROI.map(value => value >= 0 ? '#feb019' : '#ff4d4f')
          }
      }
  }));
};

const calculateChart5Data = () => {
  // Initialize data structure for discount ranges
  const discountRanges = [
      { min: 0, max: 10, events: [] },
      { min: 10, max: 20, events: [] },
      { min: 20, max: 30, events: [] },
      { min: 30, max: 40, events: [] },
      { min: 40, max: 50, events: [] }
  ];

  let totalEventCount = 0;
  let totalEventsSpend = 0;
  // Process each event
  currentYearEvents.forEach(event => {
      // Calculate average discount for the event
      let eventTotalDiscount = 0;
      let eventProductCount = 0;

      const { roi, totalSpend, eventLift, eventTotalUnits, incrementalContribution, eventROIUnits } = calculateEventROI(event);
      totalEventCount++;
      totalEventsSpend += totalSpend;
      // Calculate event metrics
      event.planned.forEach(product => {
          const basePrice = Number(product.financialData.basePrice) || 0;
          const promoPrice = Number(product.financialData.promoPrice) || 0;
          const productDiscount = ((basePrice - promoPrice) / basePrice) * 100;
          eventTotalDiscount += productDiscount;
          eventProductCount++;
      });

      // Calculate event averages
      const avgDiscount = eventTotalDiscount / eventProductCount;

      // Find appropriate discount range and add event
      const rangeIndex = discountRanges.findIndex(range =>
          avgDiscount >= range.min && avgDiscount < range.max
      );

      if (rangeIndex !== -1) {
          discountRanges[rangeIndex].events.push({
              name: event.title,
              roi: roi,
              spend: totalSpend,
              eventLift: eventLift,
              eventTotalUnits: eventTotalUnits,
              incrementalContribution: incrementalContribution,
              eventROIUnits: eventROIUnits
          });
      }
  });

  // Prepare summary data
  const summaryData = {
      noOfEvents: discountRanges.map(range => range.events.length),
      tradeSpend: discountRanges.map(range =>
          (range.events.reduce((sum, event) => sum + event.spend, 0) / totalEventsSpend) * 100
      ),
      avgLift: discountRanges.map(range =>
          range.events.length > 0
              ? range.events.reduce((sum, event) => sum + event.eventLift * event.eventTotalUnits, 0) / range.events.reduce((sum, event) => sum + event.eventTotalUnits, 0)
              : 0
      ),
      avgWeightedROI: discountRanges.map(range =>
          range.events.length > 0
              ? range.events.reduce((sum, event) => sum + (event.eventROIUnits), 0) / range.events.reduce((sum, event) => sum + event.eventTotalUnits, 0)
              : 0
      ),
      fndEvents: discountRanges.map(range => range.events.length) // Using event count as F&D count for now
  };

  // Prepare series data - one bar per discount range using weighted ROI
  const series = [{
      name: 'Weighted ROI',
      data: summaryData.avgWeightedROI.map(roi => parseFloat((roi).toFixed(2)))
  }];
  // Create colors array based on ROI values
  const colors = summaryData.avgWeightedROI.map(roi => roi >= 0 ? '#52c41a' : '#ff4d4f');
  setChart5Data(prev => ({
      ...prev,
      series: series,
      options: {
          ...prev.options,
          xaxis: {
              ...prev.options.xaxis,
              categories: ['0-10', '10-20', '20-30', '30-40', '40-50']
          },
          colors: colors,
          title: {
              text: 'ROI by Discount Depth',
              align: 'center'
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return val === 0 ? 'N/A' : val.toFixed(2) + '%';
                  }
              }
          },
          dataLabels: {
              ...prev.options.dataLabels,
              formatter: function (val) {
                  return val === 0 ? '' : val.toFixed(2) + '%';
              }
          },
          plotOptions: {
              ...prev.options.plotOptions,
              bar: {
                  ...prev.options.plotOptions?.bar,
                  columnWidth: '50%', // Wider bars since we only have one series
                  distributed: true, // Distribute colors
              }
          }
      },
      summaryData: summaryData
  }));
};

// Add this function at the top level of the component
const createPPGGroups = (events) => {
  // Map to store PPG groups and their events
  const ppgMap = new Map();

  events.forEach(event => {
      // Use ppg_name as the key instead of product combinations
      const ppgName = event.ppg_name || 'Ungrouped';

      if (!ppgMap.has(ppgName)) {
          ppgMap.set(ppgName, {
              products: event.planned.map(p => p.productId),
              events: [],
              name: ppgName // Use the actual PPG name instead of generating A, B, C
          });
      }

      ppgMap.get(ppgName).events.push(event);
  });

  return ppgMap;
};

// Update calculateChart6Data function
const calculateChart6Data = () => {
  const ppgGroups = createPPGGroups(currentYearEvents);
  const summaryData = [];
  const categories = [];

  // Create a single series for the average ROI
  const avgRoiSeries = {
      name: 'Average ROI',
      data: []
  };

  // Process each PPG group
  ppgGroups.forEach((group, productIds) => {
      const ppgName = group.name;
      const ppgEvents = [];
      const ppgProducts = new Map();
      categories.push(ppgName);

      let totalROI = 0;
      let totalUnits = 0;
      let eventCount = 0;

      // Process events in the group
      group.events.forEach((event) => {
          const eventData = {
              name: event.title,
              roi: 0,
              sharedProfitPerDollar: 0,
              retailerFunding: 0,
              products: []
          };

          // Calculate event metrics
          const { roi: eventRoi, totalSpend: eventSpend, eventTotalUnits, eventROIUnits } = calculateEventROI(event);
          totalROI += eventROIUnits;
          totalUnits += eventTotalUnits;
          eventCount++;

          event.planned.forEach(product => {
              const { financialResults } = getResult(product.financialData);
              const basePrice = Number(product.financialData.basePrice) || 0;
              const promoPrice = Number(product.financialData.promoPrice) || 0;
              const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
              const productRoi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;

              const shelfPriceInvestment = (basePrice - promoPrice) * Number(product.financialData.units);
              const mftTradeInvestment = Number(product.financialData.fixedFee + (product.financialData.edlpPerUnitRate + product.financialData.promoPerUnitRate) * Number(product.financialData.units)) || 0;
              const retailerFunding = ((shelfPriceInvestment - mftTradeInvestment) / shelfPriceInvestment) * 100;

              eventData.retailerFunding += retailerFunding;

              // Track product-level data

              const productData = {
                  name: product.productName,
                  roi: productRoi,
                  sharedProfitPerDollar: shelfPriceInvestment ? (shelfPriceInvestment - mftTradeInvestment) / shelfPriceInvestment : 0,
                  retailerFunding: retailerFunding,
                  pricePoints: [promoPrice.toFixed(2)]
              };

              eventData.products.push(productData);
              if (!ppgProducts.has(product.productId)) {
                  ppgProducts.set(product.productId, productData);
              }
          });

          // Calculate average ROI for the event
          eventData.roi = eventRoi;
          eventData.retailerFunding /= event.planned.length;
          ppgEvents.push(eventData);
      });

      // Calculate weighted average ROI for this PPG group
      const avgRoi = totalUnits > 0 ? totalROI / totalUnits : 0;
      avgRoiSeries.data.push(parseFloat((avgRoi).toFixed(2))); // Convert to percentage and fix to 2 decimal places

      // Add to summary data
      summaryData.push({
          ppgName: ppgName,
          events: ppgEvents,
          products: Array.from(ppgProducts.values()),
          avgRoi: avgRoi
      });
  });

  // Create colors array based on ROI values
  const colors = avgRoiSeries.data.map(roi => roi >= 0 ? '#52c41a' : '#ff4d4f');
  // Update chart data with the single series
  setChart6Data(prev => ({
      ...prev,
      series: [avgRoiSeries],
      options: {
          ...prev.options,
          xaxis: {
              ...prev.options.xaxis,
              categories: categories
          },
          colors: colors,
          dataLabels: {
              ...prev.options.dataLabels,
              formatter: function (val) {
                  return val === 0 ? '' : val.toFixed(2) + '%';
              }
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return val === 0 ? 'N/A' : val.toFixed(2) + '%';
                  }
              }
          },
          plotOptions: {
              ...prev.options.plotOptions,
              bar: {
                  ...prev.options.plotOptions?.bar,
                  columnWidth: '50%', // Wider bars since we only have one series
                  distributed: true, // Distribute colors
              }
          }
      },
      summaryData: {
          ppgGroups: summaryData
      }
  }));
};

const calculateChart7Data = () => {
  // Extract unique channels from events
  // let retailerName = "";
  const channels = [...new Set([
      ...events.flatMap(event => event.channels ? (Array.isArray(event.channels) ? event.channels : [event.channels]) : []),
      ...previousYearTpoEvents.flatMap(event => event.channels ? (Array.isArray(event.channels) ? event.channels : [event.channels]) : [])
  ])];

  // Initialize data structure for year comparison
  const channelData = {};
  channels.forEach(channel => {
      channelData[channel] = {
          previousYear: {
              profit: 0,
              spend: 0
          },
          currentYear: {
              profit: 0,
              spend: 0
          }
      };
  });

  // Process current year events
  events.forEach(event => {
      const eventChannels = Array.isArray(event.channels) ? event.channels : [event.channels];

      eventChannels.forEach(channel => {
          if (!channel || !channelData[channel]) return;

          event.planned.forEach(product => {
              const { financialResults } = getResult(product.financialData);

              // Calculate incremental profit
              const incrementalRevenue = Number(financialResults.find(r => r.name === "Incremental Revenue")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
              const totalSpend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

              channelData[channel].currentYear.profit += incrementalRevenue;
              channelData[channel].currentYear.spend += totalSpend;
          });
      });
  });

  // Process previous year events
  previousYearTpoEvents.forEach(event => {
      const eventChannels = Array.isArray(event.channels) ? event.channels : [event.channels];

      eventChannels.forEach(channel => {
          if (!channel || !channelData[channel]) return;

          event.planned.forEach(product => {
              const { financialResults } = getResult(product.financialData);

              // Calculate incremental profit
              const incrementalRevenue = Number(financialResults.find(r => r.name === "Incremental Revenue")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
              const totalSpend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

              channelData[channel].previousYear.profit += incrementalRevenue;
              channelData[channel].previousYear.spend += totalSpend;
          });
      });
  });

  // Calculate profit per dollar and percentage changes
  const previousYearData = [];
  const currentYearData = [];
  const percentageChanges = [];

  channels.forEach(channel => {
      const prevProfitPerDollar = channelData[channel].previousYear.spend > 0
          ? channelData[channel].previousYear.profit / channelData[channel].previousYear.spend
          : 0;

      const currProfitPerDollar = channelData[channel].currentYear.spend > 0
          ? channelData[channel].currentYear.profit / channelData[channel].currentYear.spend
          : 0;

      previousYearData.push(prevProfitPerDollar);
      currentYearData.push(currProfitPerDollar);

      // Calculate percentage change between previous and current year
      const percentChange = prevProfitPerDollar > 0
          ? ((currProfitPerDollar - prevProfitPerDollar) / prevProfitPerDollar) * 100
          : 0;
      percentageChanges.push(percentChange);
  });

  // Update chart data
  setChart7Data(prev => ({
      ...prev,
      series: [
          {
              name: 'Previous Year',
              data: previousYearData
          },
          {
              name: 'Current Year',
              data: currentYearData,
              percentageChanges: percentageChanges
          }
      ],
      options: {
          ...prev.options,
          xaxis: {
              ...prev.options.xaxis,
              categories: channels
          }
      }
  }));
};

const calculateChart8Data = () => {
  const scatterData = [];

  currentYearEvents.forEach(event => {
      // Calculate event metrics
      const { roi: eventRoi } = calculateEventROI(event);
      let totalIncrementalProfitPerDollar = 0;
      event.planned.forEach(product => {
          const { promotionalResults } = getResult(product.financialData);

          // Calculate Shared Profit Created
          const baseUnits = Number(product.financialData.units) || 0;
          const promoUnits = Number(promotionalResults.find(r => r.promotion === "Event Total")?.units) || 0;
          const baseShelfPrice = Number(product.financialData.basePrice) || 0;
          const promoShelfPrice = Number(product.financialData.promoPrice) || 0;
          const mfrCOGS = Number(product.financialData.basePrice / 2) || 0;

          const baseSharedProfit = (baseShelfPrice - mfrCOGS) * baseUnits;
          const promoSharedProfit = (promoShelfPrice - mfrCOGS) * promoUnits;
          const sharedProfitCreated = promoSharedProfit - baseSharedProfit;

          // Calculate Shelf Price Investment
          const shelfPriceInvestment = (baseShelfPrice - promoShelfPrice) * promoUnits;

          // Calculate Incremental Profit per Dollar
          const incrementalProfitPerDollar = shelfPriceInvestment !== 0 ?
              sharedProfitCreated / shelfPriceInvestment : 0;
          totalIncrementalProfitPerDollar += incrementalProfitPerDollar;


      });

      // Only add points with valid values
      if (!isNaN(eventRoi) && !isNaN(totalIncrementalProfitPerDollar) &&
          isFinite(eventRoi) && isFinite(totalIncrementalProfitPerDollar)) {
          scatterData.push({
              x: eventRoi,
              y: totalIncrementalProfitPerDollar,
              name: `${event.title}`
          });
      }
  });

  // Calculate correlation
  const correlationData = scatterData.map(point => [point.x, point.y]);
  const correlation = calculateCorrelation(correlationData);

  // Update chart data
  setChart8Data(prev => ({
      ...prev,
      series: [{
          name: 'Incremental Profit per Dollar',
          data: scatterData
      }],
      options: {
          ...prev.options,
          xaxis: {
              ...prev.options.xaxis,
              min: Math.min(...scatterData.map(d => d.x)) - 5,
              max: Math.max(...scatterData.map(d => d.x)) + 5
          },
          yaxis: {
              ...prev.options.yaxis,
              min: Math.min(...scatterData.map(d => d.y)) - 0.5,
              max: Math.max(...scatterData.map(d => d.y)) + 0.5
          }
      },
      correlation: correlation
  }));
};

const calculateChart9Data = () => {
  const ppgGroups = createPPGGroups(currentYearEvents);
  const retailerFundingData = new Map();

  ppgGroups.forEach((group, productIds) => {
      const fundingPoints = [];

      // Process each event in the PPG
      group.events.forEach(event => {
          let eventRetailerFunding = 0;
          let eventROI = 0;

          event.planned.forEach(product => {
              const { financialResults, promotionalResults } = getResult(product.financialData);
              const basePrice = Number(product.financialData.basePrice) || 0;
              const promoPrice = Number(product.financialData.promoPrice) || 0;
              const promoUnits = Number(promotionalResults.find(result =>
                  result.promotion === 'Event Total')?.units) || 0;

              // Calculate Shelf Price Investment
              const shelfPriceInvestment = (basePrice - promoPrice) * promoUnits;

              // Calculate ROI
              const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
              const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;

              // Calculate Retailer Funding
              const mftTradeInvestment = Number(product.financialData.mft_trade_investment) || 0;
              const retailerFunding = ((shelfPriceInvestment - mftTradeInvestment) / shelfPriceInvestment) * 100;

              eventRetailerFunding += retailerFunding;
              eventROI += roi;
          });

          // Average metrics for the event
          const avgRetailerFunding = eventRetailerFunding / event.planned.length;
          const avgROI = eventROI / event.planned.length;

          fundingPoints.push([avgRetailerFunding, avgROI]);
      });

      retailerFundingData.set(group.name, fundingPoints);
  });

  // Generate series data
  const series = Array.from(retailerFundingData.entries()).map(([ppgName, points]) => ({
      name: ppgName,
      data: points.sort((a, b) => a[0] - b[0]) // Sort by retailer funding percentage
  }));

  setChart9Data(prev => ({
      ...prev,
      series
  }));
};

const generatePPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      // Create a new pptx instance if not provided
      let pptx = existingPptx || new pptxgen();

      // Ensure pptx is properly initialized
      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";

          // Add master slide
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      // Create slide
      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the ROI for all events?", pptx);

      // Add ROI text on the right side of the title
      slide.addText(`ROI across all events: ${formatNumber(summaryData.avgROI)}%`, {
          x: 6.35,
          y: 0.4,
          w: 6,
          h: 0.4,
          fontSize: 14,
          bold: true,
          color: "000000",
          align: "right"
      });

      // Create table headers with gray background
      const tableHeaders = [
          { text: "Overall", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } },
          { text: "Events", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } },
          { text: "Trade Spend", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } },
          { text: "ROI", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } }
      ];

      // Create table rows
      const tableRows = [
          [
              { text: "Total", options: { bold: true, border: { pt: 0 } } },
              { text: summaryData.total.toString(), options: { border: { pt: 0 } } },
              { text: `$${formatCurrency(summaryData.totalSpend)}`, options: { border: { pt: 0 } } },
              { text: `${formatNumber(summaryData.avgROI)}%`, options: { border: { pt: 0 } } }
          ],
          [
              { text: "Positive ROI", options: { bold: true, border: { pt: 0 } } },
              { text: summaryData.positiveCount.toString(), options: { border: { pt: 0 } } },
              { text: `$${formatCurrency(summaryData.positiveSpend)}`, options: { border: { pt: 0 } } },
              { text: `${formatNumber(summaryData.positiveROI)}%`, options: { border: { pt: 0 } } }
          ],
          [
              { text: "Negative ROI", options: { bold: true, border: { pt: 0 } } },
              { text: summaryData.negativeCount.toString(), options: { border: { pt: 0 } } },
              { text: `$${formatCurrency(summaryData.negativeSpend)}`, options: { border: { pt: 0 } } },
              { text: `${formatNumber(summaryData.negativeROI)}%`, options: { border: { pt: 0 } } }
          ]
      ];

      // Add the table to the slide - remove border to eliminate lines
      slide.addTable([tableHeaders, ...tableRows], {
          x: 0.35,
          y: 1.0,
          w: 12,
          colW: [3, 3, 3, 3],
          rowH: [0.4, 0.4, 0.4, 0.4],
          fontSize: 12,
          border: { pt: 0, color: "FFFFFF" },
          fill: { color: "FFFFFF" }
      });

      // Prepare and add chart with adjusted position
      const chartValues = chartData.series[0].data;
      const chartLabels = chartData.options.xaxis.categories;

      // Create the chart data with the exact values
      const pptChartData = [{
          name: 'Event ROI',
          labels: chartLabels,
          values: chartValues,
          dataLabels: chartValues.map(value => value.toFixed(2))
      }];

      slide.addChart(pptx.charts.BAR, pptChartData, {
          x: 0.35,
          y: 2.5,
          w: 12,
          h: 4.5,
          barDir: 'col',
          barGrouping: "standard",
          dataLabelColor: "000000",
          dataLabelFontFace: "Arial",
          dataLabelFontSize: 10,
          dataLabelPosition: "outEnd",
          dataLabelFormatCode: '#,##0.00"%"',
          showValue: true,
          chartColors: chartValues.map(value => {
              if (value >= 35) return '52c41a';
              if (value > 0) return 'ffd700';
              return 'ff4d4f';
          }),
          showLegend: false,
          showTitle: false,
          catAxisTitle: "Events",
          catAxisTitleColor: "000000",
          catAxisTitleFontSize: 12,
          catAxisTitleBold: true,
          catAxisTitleOffset: 50,
          catAxisLabelRotate: 0,
          valAxisTitle: "ROI (%)",
          valAxisTitleColor: "000000",
          valAxisTitleFontSize: 12,
          valAxisTitleBold: true,
          valAxisMinVal: Math.min(...chartValues) * 1.1,
          valAxisMaxVal: Math.max(...chartValues) * 1.1,
          valGridLine: { style: "solid", color: "CCCCCC" },
          catGridLine: { style: "none" },
          valAxisLabelFormatCode: '0"%"',
          valAxisMajorUnit: 50,
          showCatAxisTitle: true,
          showValAxisTitle: true,
          catAxisLabelFontSize: 10,
          valAxisLabelFontSize: 10,
          plotArea: { border: { pt: 1, color: "CCCCCC" } },
          margin: 50
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      // Only save if this is not part of a combined presentation
      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the ROI for all events.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart2PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is driving the variation in ROI across different retailers?", pptx);

      // Add chart
      const chartValues = chart2Data.series[0].data;
      const chartLabels = chart2Data.options.xaxis.categories;

      // Calculate min and max values for better Y-axis scaling
      const maxValue = Math.max(...chartValues);

      // Calculate appropriate interval (round to nearest 50)
      const interval = Math.ceil(maxValue / 6 / 50) * 50;

      // Calculate adjusted max for Y-axis (always start from 0)
      const yMax = Math.ceil(maxValue / 50) * 50;

      const pptChartData = [{
          name: 'Account ROI',
          labels: chartLabels,
          values: chartValues,
          dataLabels: chartValues.map(value => value.toFixed(1))
      }];

      slide.addChart(pptx.charts.BAR, pptChartData, {
          x: 0.35,
          y: 1.2,
          w: 12,
          h: 5,
          barDir: 'col',
          barGrouping: "standard",
          dataLabelColor: "000000",
          dataLabelFontFace: "Arial",
          dataLabelFontSize: 12,
          dataLabelPosition: "outEnd",
          dataLabelFormatCode: '#,##0.0"%"',
          showValue: true,
          chartColors: chartValues.map(value => {
              if (value >= 35) return '52c41a';
              if (value > 0) return 'ffd700';
              return 'ff4d4f';
          }),
          showLegend: false,
          showTitle: false,
          catAxisTitle: "Accounts",
          catAxisTitleColor: "000000",
          catAxisTitleFontSize: 12,
          catAxisTitleBold: true,
          valAxisTitle: "ROI (%)",
          valAxisTitleColor: "000000",
          valAxisTitleFontSize: 12,
          valAxisTitleBold: true,
          valAxisMinVal: 0,
          valAxisMaxVal: yMax,
          valAxisMajorUnit: interval,
          valAxisLabelFormatCode: '#,##0"%"',
          valGridLine: { style: "solid", color: "CCCCCC", width: 1 },
          catGridLine: { style: "none" },
          catAxisLabelFontSize: 10,
          valAxisLabelFontSize: 10,
          showCatAxisTitle: true,
          showValAxisTitle: true,
          plotArea: { border: { pt: 1, color: "CCCCCC" } },
          chartArea: { border: { pt: 1, color: "CCCCCC" } }
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is driving the variation in ROI across different retailers.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart3PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the relationship between trade spend, incremental volume, and ROI?", pptx);

      // Format data for volume scatter plot
      const volumeChartData = [];


      // First object with 'X-Axis' containing only x values
      volumeChartData.push({
          name: "X-Axis",
          values: chart3Data.series1[0].data.map(point => point.x)
      });

      // Add volume data
      volumeChartData.push({
          name: "Incremental Volume",
          values: chart3Data.series1[0].data.map(point => point.y)
      });

      // Format data for ROI scatter plot
      const roiChartData = [];
      // First object with 'X-Axis' containing only x values
      roiChartData.push({
          name: "X-Axis",
          values: chart3Data.series2[0].data.map(point => point.x)
      });

      // Add ROI data
      roiChartData.push({
          name: "ROI",
          values: chart3Data.series2[0].data.map(point => point.y)
      });

      console.log({ chart3Data, volumeChartData, roiChartData });

      // Common chart options
      const commonChartOptions = {
          x: 0.35,
          y: 1.5,
          w: 5.9,
          h: 3.5,
          showValAxisTitle: true,
          lineSize: 0,
          showLegend: true,
          legendPos: 't',
          chartColors: ['4472C4'],
          showTitle: true,
          titleFontSize: 14,
          titleColor: '000000',
          dataLabelFontSize: 10,
          showGridlines: true,
          valAxisLineColor: 'cccccc',
          catAxisLineColor: 'cccccc',
          plotArea: { border: { pt: 1, color: "cccccc" } },
          dataLabelFormatCode: '#,##0.0',
          valAxisLabelFormatCode: '#,##0.0',
          catAxisLabelFormatCode: '$#,##0',
          catAxisMinVal: 0, // Start X-axis from 0
          chartArea: { border: { pt: 1, color: "cccccc" } },
          chartArea: {
              border: { pt: 1, color: "cccccc" },
              padding: { left: 20, bottom: 20 } // Add padding to prevent overlap
          },
          margin: 25  // Add margin to ensure axes labels have space
      };

      // Add volume scatter chart
      slide.addChart(pptx.charts.SCATTER, volumeChartData, {
          ...commonChartOptions,
          title: 'Trade Spend vs Incremental Volume',
          valAxisTitle: 'Incremental Volume',
          catAxisTitle: 'Trade Spend ($)',
          valAxisTitleColor: '000000',
          catAxisTitleColor: '000000',
          showCatAxisTitle: true,
          showValAxisTitle: true,
          // Calculate min/max values for y-axis to properly show negative values
          valAxisMinVal: Math.min(0, Math.min(...chart3Data.series1[0].data.map(point => point.y)) * 1.1),
          valAxisMaxVal: Math.max(...chart3Data.series1[0].data.map(point => point.y)) * 1.1,
          // Ensure proper axis placement and visibility
          catAxisLabelPos: 'low', // Position X-axis labels at bottom
          valAxisLabelPos: 'low', // Position Y-axis labels on left
          catAxisOrientation: 'minMax', // Ensure proper X-axis direction
          valAxisOrientation: 'minMax', // Ensure proper Y-axis direction
          catGridLine: { style: 'solid', color: 'cccccc', size: 1 },
          valGridLine: { style: 'solid', color: 'cccccc', size: 1 },
          catAxisHidden: false,
          valAxisHidden: false,
          catAxisLabelOffset: 10 // Offset to prevent overlap
      });

      // Add ROI scatter chart
      slide.addChart(pptx.charts.SCATTER, roiChartData, {
          ...commonChartOptions,
          x: 6.45,  // Position on right side
          title: 'Trade Spend vs ROI',
          valAxisTitle: 'ROI (%)',
          catAxisTitle: 'Trade Spend ($)',
          valAxisTitleColor: '000000',
          catAxisTitleColor: '000000',
          showCatAxisTitle: true,
          showValAxisTitle: true,
          valAxisLabelFormatCode: '#,##0.0"%"',
          // Calculate min/max values for y-axis to properly show negative values
          valAxisMinVal: Math.min(0, Math.min(...chart3Data.series2[0].data.map(point => point.y)) * 1.1),
          valAxisMaxVal: Math.max(...chart3Data.series2[0].data.map(point => point.y)) * 1.1,
          // Ensure proper axis placement and visibility
          catAxisLabelPos: 'low', // Position X-axis labels at bottom
          valAxisLabelPos: 'low', // Position Y-axis labels on left
          catAxisOrientation: 'minMax', // Ensure proper X-axis direction
          valAxisOrientation: 'minMax', // Ensure proper Y-axis direction
          catGridLine: { style: 'solid', color: 'cccccc', size: 1 },
          valGridLine: { style: 'solid', color: 'cccccc', size: 1 },
          catAxisHidden: false,
          valAxisHidden: false,
          catAxisLabelOffset: 10 // Offset to prevent overlap
      });

      // Add correlations text
      slide.addText(`Volume Correlation: ${chart3Data.options1.subtitle.text}`, {
          x: 0.35,
          y: 5.0,
          w: 5.9,
          h: 0.3,
          fontSize: 12,
          color: '000000'
      });

      slide.addText(`ROI Correlation: ${chart3Data.options2.subtitle.text}`, {
          x: 6.45,
          y: 5.0,
          w: 5.9,
          h: 0.3,
          fontSize: 12,
          color: '000000'
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the relationship between trade spend, incremental volume, and ROI.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart4PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the ROI by event types?", pptx);

      // Create a labels-only chart on the left
      const labelsData = [{
          name: 'Labels',
          labels: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
          values: [0, 0, 0, 0, 0]
      }];

      // Add labels-only chart
      slide.addChart(pptx.charts.BAR, labelsData, {
          x: 0.35,
          y: 1.3,
          w: 1.8,
          h: 5.6,
          barDir: 'bar',
          showTitle: false,
          showLegend: false,
          chartColors: ['FFFFFF'],
          showValue: false,
          catAxisOrientation: 'maxMin',
          valAxisHidden: true, // Hide value axis
          valAxisMaxVal: 0.1, // Very small max value to ensure bars don't show
          plotArea: { fill: { color: 'FFFFFF' }, border: { pt: 0, color: "FFFFFF" } }, // White background, no border
          barGapWidthPct: 60,
          dataLabelPosition: 'outEnd',
          catGridLine: { style: "none" }, // Hide category grid lines
          valGridLine: { style: "none" }, // Hide value grid lines
          catAxisLineShow: false, // Hide category axis line
          valAxisLineShow: false, // Hide value axis line
          dataBorder: { pt: 0 }, // No border on data elements
          border: { pt: 0, color: "FFFFFF" }, // No border on chart
          chartArea: { border: { pt: 0, color: "FFFFFF" } } // No border on chart area

      });

      // Event Count chart - Left section
      slide.addShape(pptx.shapes.RECTANGLE, {
          x: 2.25,
          y: 0.9,
          w: 3.2,
          h: 0.4,
          fill: { color: "0072bc" }
      });

      slide.addText("Event Count (% of Total)", {
          x: 2.25,
          y: 0.9,
          w: 3.2,
          h: 0.4,
          align: 'center',
          fontSize: 12,
          bold: true,
          color: "FFFFFF"
      });

      const eventCountData = [{
          name: 'Event Count',
          labels: ['', '', '', '', ''],
          values: chart4Data.eventCount.series[0].data
      }];

      slide.addChart(pptx.charts.BAR, eventCountData, {
          x: 2.25,
          y: 1.3,
          w: 3.2,
          h: 5.6,
          barDir: 'bar',
          showTitle: false,
          showLegend: false,
          dataLabelFormatCode: '#,##0.0"%"',
          chartColors: ['4472C4'],
          showValue: true,
          dataLabelPosition: 'outEnd',
          catAxisOrientation: 'maxMin',
          barGapWidthPct: 60,
          catAxisHidden: true,
          catAxisLabelPos: 'low',
          valAxisLabelFormatCode: '0"%"'
      });

      // Incremental Lift chart - Middle section
      slide.addShape(pptx.shapes.RECTANGLE, {
          x: 5.55,
          y: 0.9,
          w: 3.2,
          h: 0.4,
          fill: { color: "0072bc" }
      });

      slide.addText("Average Incremental Lift (%)", {
          x: 5.55,
          y: 0.9,
          w: 3.2,
          h: 0.4,
          align: 'center',
          fontSize: 12,
          bold: true,
          color: "FFFFFF"
      });

      const incrementalLiftData = [{
          name: 'Incremental Lift',
          labels: ['', '', '', '', ''],
          values: chart4Data.incrementalLift.series[0].data
      }];

      slide.addChart(pptx.charts.BAR, incrementalLiftData, {
          x: 5.55,
          y: 1.3,
          w: 3.2,
          h: 5.6,
          barDir: 'bar',
          showTitle: false,
          showLegend: false,
          dataLabelFormatCode: '#,##0.0"%"',
          chartColors: ['00e396'],
          showValue: true,
          dataLabelPosition: 'outEnd',
          catAxisOrientation: 'maxMin',
          barGapWidthPct: 60,
          catAxisHidden: true,
          catAxisLabelPos: 'low',
          valAxisLabelFormatCode: '0"%"'
      });

      // Weighted ROI chart - Right section
      slide.addShape(pptx.shapes.RECTANGLE, {
          x: 8.85,
          y: 0.9,
          w: 3.2,
          h: 0.4,
          fill: { color: "0072bc" }
      });

      slide.addText("Weighted Average ROI (%)", {
          x: 8.85,
          y: 0.9,
          w: 3.2,
          h: 0.4,
          align: 'center',
          fontSize: 12,
          bold: true,
          color: "FFFFFF"
      });

      const weightedROIData = [{
          name: 'Weighted ROI',
          labels: ['', '', '', '', ''],
          values: chart4Data.weightedROI.series[0].data
      }];

      slide.addChart(pptx.charts.BAR, weightedROIData, {
          x: 8.85,
          y: 1.3,
          w: 3.2,
          h: 5.6,
          barDir: 'bar',
          showTitle: false,
          showLegend: false,
          dataLabelFormatCode: '#,##0.0"%"',
          chartColors: ['feb019'],
          showValue: true,
          dataLabelPosition: 'outEnd',
          catAxisOrientation: 'maxMin',
          barGapWidthPct: 60,
          catAxisHidden: true,
          catAxisLabelPos: 'low',
          valAxisLabelFormatCode: '0"%"'
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the ROI by event types.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart5PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the ROI at different discount levels?", pptx);

      // Add main chart
      const chartData = [{
          name: 'Weighted ROI',
          labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
          values: chart5Data.series[0].data.map(val => val === 0 ? null : val)
      }];

      slide.addChart(pptx.charts.BAR, chartData, {
          x: 0.25,
          y: 1.5,
          w: 12,
          h: 3,
          barDir: 'col',
          showLegend: true,
          legendPos: 't',
          showTitle: true,
          title: `ROI by Discount Depth`,
          dataLabelFormatCode: '#,##0.00"%"',
          showValue: true,
          chartColors: chart5Data.series[0].data.map(value => {
              if (value >= 35) return '52c41a';
              if (value > 0) return 'ffd700';
              return 'ff4d4f';
          }),
          catAxisTitle: "Discount Depth",
          valAxisTitle: "ROI (%)",
          dataLabelPosition: "outEnd",
          showCatAxisTitle: true,
          showValAxisTitle: true
      });

      // Add summary table
      const summaryData = chart5Data.summaryData;
      slide.addTable([
          [
              { text: "Discount Depth", options: { bold: true, fill: { color: "f2f2f2" } } },
              { text: "0-10", options: { bold: true, fill: { color: "f2f2f2" } } },
              { text: "10-20", options: { bold: true, fill: { color: "f2f2f2" } } },
              { text: "20-30", options: { bold: true, fill: { color: "f2f2f2" } } },
              { text: "30-40", options: { bold: true, fill: { color: "f2f2f2" } } },
              { text: "40-50", options: { bold: true, fill: { color: "f2f2f2" } } }
          ],
          ["No. of events", ...summaryData.noOfEvents.map(val => val === 0 ? '-' : val)],
          ["Avg. Wtd. ROI", ...summaryData.avgWeightedROI.map(val => val === 0 ? '-' : (val).toFixed(2) + '%')],
          ["% of Trade Spend", ...summaryData.tradeSpend.map(val => val === 0 ? '-' : val.toFixed(1) + '%')],
          ["Avg. Wtd. Lift", ...summaryData.avgLift.map(val => val === 0 ? '-' : val.toFixed(1) + '%')],
          ["No. of F&D Events", ...summaryData.fndEvents.map(val => val === 0 ? '-' : val)]
      ], {
          x: 0.35,
          y: 5.0,
          w: 12,
          colW: [2, 2, 2, 2, 2, 2],
          fontSize: 10,
          border: { pt: 1, color: "cccccc" }
      });

      // Add table title
      slide.addText("Result Summary", {
          x: 0.30,
          y: 4.5,
          w: 12,
          h: 0.4,
          fontSize: 14,
          bold: true,
          color: "000000"
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the ROI at different discount levels.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart6PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the performance of PPGs?", pptx);

      // Add main chart
      const chartData = [{
          name: 'Average ROI',
          labels: chart6Data.options.xaxis.categories,
          values: chart6Data.series[0].data.map(val => val === 0 ? null : val)
      }];

      slide.addChart(pptx.charts.BAR, chartData, {
          x: 0.35,
          y: 1.0,
          w: 12,
          h: 4,
          barDir: 'col',
          showTitle: true,
          title: "Performance by Price Point Group",
          showLegend: false,
          dataLabelFormatCode: '#,##0.00"%"',
          showValue: true,
          chartColors: chart6Data.series[0].data.map(value => {
              if (value >= 35) return '52c41a';
              if (value > 0) return 'ffd700';
              return 'ff4d4f';
          }),
          catAxisTitle: "Price Point Groups",
          valAxisTitle: "ROI (%)",
          dataLabelPosition: "outEnd",
          showCatAxisTitle: true,
          showValAxisTitle: true
      });

      // Add summary table
      const summaryData = chart6Data.summaryData;
      const headerRow = [
          { text: "Metric", options: { bold: true, fill: { color: "f2f2f2" } } }
      ];

      chart6Data.options.xaxis.categories.forEach(ppgName => {
          headerRow.push({ text: ppgName, options: { bold: true, fill: { color: "f2f2f2" } } });
      });

      const tableRows = [headerRow];

      const eventsRow = ["No. of events"];
      const roiRow = ["Avg. Wtd. ROI"];
      const productsRow = ["No. of Products"];

      summaryData.ppgGroups.forEach(group => {
          eventsRow.push(group.events.length === 0 ? '-' : group.events.length);
          roiRow.push(group.avgRoi === 0 ? '-' : (group.avgRoi).toFixed(2) + '%');
          productsRow.push(group.products.length === 0 ? '-' : group.products.length);
      });

      tableRows.push(eventsRow, roiRow, productsRow);
      // Add table title
      slide.addText("Result Summary", {
          x: 0.30,
          y: 5.0,
          w: 12,
          h: 0.4,
          fontSize: 14,
          bold: true,
          color: "000000"
      });

      slide.addTable(tableRows, {
          x: 0.35,
          y: 5.5,
          w: 12,
          colW: Array(headerRow.length).fill(12 / headerRow.length),
          fontSize: 10,
          border: { pt: 1, color: "cccccc" }
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the performance of PPGs.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart7PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the Incremental Profit Per Dollar Invested on Promo By Retailer?", pptx);

      // Add main chart
      console.log({ series: chart7Data.series });

      const chartData = chart7Data.series.map(series => ({
          name: series.name,
          labels: chart7Data.options.xaxis.categories,
          values: series.data
      }));

      const yAxisMax = Math.max(...chartData[0].values, ...chartData[1].values);
      const yAxisMin = 0; // Math.min(...chartData[0].values, ...chartData[1].values);

      slide.addChart(pptx.charts.BAR, chartData, {
          x: 0.35,
          y: 1.0,
          w: 12,
          h: 5,
          barDir: 'col',
          showTitle: true,
          title: "Incremental Profit Pool per Dollar Invested on Promo",
          showLegend: true,
          legendPos: 'b',
          dataLabelFormatCode: '#,##0.00',
          showValue: true,
          chartColors: ['2196f3', '00e396', 'feb019'],
          catAxisTitle: "Channels",
          valAxisTitle: "Incremental Profit per Dollar",
          valAxisLabelFormatCode: '#,##0.00',
          valAxisMaxVal: yAxisMax,
          valAxisMinVal: yAxisMin,
          valAxisLabelFontSize: 10,
          valAxisTitleFontSize: 12,
          valAxisTitleBold: true,
          showCatAxisTitle: true,
          showValAxisTitle: true
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the Incremental Profit Per Dollar Invested on Promo By Retailer.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart8PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the relationship between ROI and Incremental Profit Pool?", pptx);

      // Format data for scatter plot
      const scatterData = [];

      // First object with 'X-Axis' containing only x values
      scatterData.push({
          name: "X-Axis",
          values: chart8Data.series[0].data.map(point => point.x)
      });

      // Add Incremental Profit data
      scatterData.push({
          name: "Incremental Profit per Dollar",
          values: chart8Data.series[0].data.map(point => point.y)
      });

      // Chart options
      const chartOptions = {
          x: 0.35,
          y: 1.5,
          w: 12,
          h: 5,
          showValAxisTitle: true,
          lineSize: 0,
          showLegend: true,
          legendPos: 't',
          chartColors: ['00B3E5'],
          showTitle: true,
          titleFontSize: 14,
          titleColor: '000000',
          dataLabelFontSize: 10,
          showGridlines: true,
          valAxisLineColor: 'cccccc',
          catAxisLineColor: 'cccccc',
          plotArea: { border: { pt: 1, color: "cccccc" } },
          title: 'Relationship between ROI and Incremental Profit Pool',
          valAxisTitle: 'Incremental Profit Pool per Dollar Invested',
          catAxisTitle: 'Manufacturer ROI (%)',
          valAxisTitleColor: '000000',
          catAxisTitleColor: '000000',
          showCatAxisTitle: true,
          showValAxisTitle: true,

          // Axis ranges and formatting
          valAxisMinVal: -2,
          valAxisMaxVal: 1,
          catAxisMinVal: -200,
          catAxisMaxVal: 600,

          // Axis label formatting
          dataLabelFormatCode: '$#,##0.00',
          valAxisLabelFormatCode: '$#,##0.00',
          catAxisLabelFormatCode: '#,##0"%"',

          // Axis positioning and styling
          catAxisLabelPos: 'low',        // Places X-axis labels at bottom
          valAxisLabelPos: 'low',        // Places Y-axis labels on left
          catAxisOrientation: 'minMax',  // Ensures proper X-axis direction
          valAxisOrientation: 'minMax',  // Ensures proper Y-axis direction

          // Additional axis customization
          catAxisLabelFontSize: 10,
          valAxisLabelFontSize: 10,
          catAxisMajorTickMark: 'out',   // Shows tick marks outside
          valAxisMajorTickMark: 'out',   // Shows tick marks outside
          markerSize: 10,

          // Grid styling
          catGridLine: { style: 'solid', color: 'cccccc', size: 1 },
          valGridLine: { style: 'solid', color: 'cccccc', size: 1 }
      };

      // Add scatter chart
      slide.addChart(pptx.charts.SCATTER, scatterData, chartOptions);

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the relationship between ROI and Incremental Profit Pool.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const generateChart9PPT = async (existingPptx = null) => {
  try {
      if (!existingPptx) {
          setPresentationGenerated(true);
      }

      let pptx = existingPptx || new pptxgen();

      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      if (!existingPptx) {
          pptx.layout = "LAYOUT_WIDE";
          pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: { color: "FFFFFF" },
              objects: [
                  {
                      rect: {
                          x: 0, y: 0, w: "100%", h: 0.35,
                          fill: { color: "174F73" }
                      }
                  },
                  {
                      text: {
                          text: "North Light Analytics Report",
                          options: {
                              x: 0, y: 0, w: 6, h: 0.35,
                              fontSize: 15, color: "FFFFFF"
                          }
                      }
                  }
              ],
              slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
          });
      }

      let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Use the common UI elements function
      generateCommonUIElements(slide, "What is the relationship between retailer funding and ROI at different price points?", pptx);

      // Format data for scatter plot
      const scatterData = [];
      chart9Data.series.forEach(series => {
          scatterData.push({
              name: series.name,
              labels: series.data.map(point => point[0]),
              values: series.data.map(point => point[1])
          });
      });

      // Add scatter plot
      slide.addChart(pptx.charts.SCATTER, scatterData, {
          x: 0.35,
          y: 1.5,
          w: 12,
          h: 5,
          showTitle: false,
          showLegend: true,
          legendPos: 'b',
          lineSize: 0,
          chartColors: ['4472C4', '00B050', 'FFC000', '7030A0'],
          lineWidth: 0,
          markerSize: 10,
          dataLabelFormatCode: '#,##0.0"%"',
          valAxisTitle: "ROI (%)",
          catAxisTitle: "Retailer Funding (%)",
          plotArea: { border: { pt: 1, color: "888888" } },
          showValAxisTitle: true,
          showCatAxisTitle: true,
          valAxisTitleColor: "000000",
          catAxisTitleColor: "000000"
      });

      // Add company logo if available
      if (authData?.company_logo) {
          slide.addImage({
              path: authData.company_logo,
              x: 11.3,
              y: 7.0,
              w: 1.4,
              h: 0.5,
              sizing: { type: "contain", w: 1.4, h: 0.5 }
          });
      }

      if (!existingPptx) {
          await pptx.writeFile({
              fileName: "What is the relationship between retailer funding and ROI at different price points.pptx",
              compression: true
          });
      }

      return pptx;
  } catch (error) {
      console.error("PPT Generation Error:", error);
      return null;
  } finally {
      if (!existingPptx) {
          setPresentationGenerated(false);
      }
  }
};

const formatNumber = (num) => {
  if (num === undefined || num === null) return '0.0';

  // Convert to number to ensure proper formatting
  const numValue = Number(num);

  return numValue.toFixed(2);
};

// Add a new function for formatting currency with commas
const formatCurrency = (num) => {
  if (num === undefined || num === null) return '$0.0';

  // Convert to number to ensure proper formatting
  const numValue = Number(num);

  // Format with commas for thousands and 1 decimal place
  return numValue.toLocaleString('en-IN', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
  });
};

const generateAllPPT = async () => {
  try {
      setPresentationGenerated(true);

      // Create a new presentation
      let pptx = new pptxgen();

      // Ensure pptx is properly initialized
      if (!pptx.addSlide) {
          console.error("Invalid pptx object, creating a new one");
          pptx = new pptxgen();
      }

      // Set presentation properties
      pptx.layout = "LAYOUT_WIDE";
      pptx.title = `${project_name} Complete Report ${selectedYear}`;
      pptx.subject = "Trade Promotion Optimization Report";
      pptx.company = "North Light Analytics";
      pptx.author = authData?.name || "User";
      pptx.revision = "1";

      // Add master slide
      pptx.defineSlideMaster({
          title: "PLACEHOLDER_SLIDE",
          background: { color: "FFFFFF" },
          objects: [
              {
                  rect: {
                      x: 0, y: 0, w: "100%", h: 0.35,
                      fill: { color: "174F73" }
                  }
              },
              {
                  text: {
                      text: "North Light Analytics Report",
                      options: {
                          x: 0, y: 0, w: 6, h: 0.35,
                          fontSize: 15, color: "FFFFFF"
                      }
                  }
              }
          ],
          slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
      });

      // Add a title slide
      let titleSlide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

      // Add title
      titleSlide.addText(`${project_name} - Trade Promotion Optimization Report`, {
          x: 0.5,
          y: 1.5,
          w: 12,
          h: 1.0,
          fontSize: 24,
          bold: true,
          color: "000000",
          align: "center"
      });

      // Add year
      titleSlide.addText(`Year: ${selectedYear}`, {
          x: 0.5,
          y: 2.5,
          w: 12,
          h: 0.5,
          fontSize: 18,
          color: "000000",
          align: "center"
      });

      // Add date
      titleSlide.addText(`Generated on: ${new Date().toLocaleDateString()}`, {
          x: 0.5,
          y: 3.5,
          w: 12,
          h: 0.5,
          fontSize: 14,
          color: "000000",
          align: "center"
      });

      // Add logos to title slide
      titleSlide.addImage({
          path: Logo,
          x: 5.3,
          y: 5.0,
          w: 2.4,
          h: 1.0,
          sizing: { type: "contain", w: 2.4, h: 1.0 }
      });

      if (authData?.company_logo) {
          titleSlide.addImage({
              path: authData.company_logo,
              x: 5.3,
              y: 6.0,
              w: 2.4,
              h: 1.0,
              sizing: { type: "contain", w: 2.4, h: 1.0 }
          });
      }

      // Generate all chart slides sequentially with proper error handling
      try {
          // Chart 1
          try {
              const pptx1 = await generatePPT(pptx);
              if (pptx1 && pptx1.addSlide) pptx = pptx1;
          } catch (err) {
              console.error("Error generating Chart 1:", err);
          }

          // Chart 2
          try {
              const pptx2 = await generateChart2PPT(pptx);
              if (pptx2 && pptx2.addSlide) pptx = pptx2;
          } catch (err) {
              console.error("Error generating Chart 2:", err);
          }

          // Chart 3
          try {
              const pptx3 = await generateChart3PPT(pptx);
              if (pptx3 && pptx3.addSlide) pptx = pptx3;
          } catch (err) {
              console.error("Error generating Chart 3:", err);
          }

          // Chart 4
          try {
              const pptx4 = await generateChart4PPT(pptx);
              if (pptx4 && pptx4.addSlide) pptx = pptx4;
          } catch (err) {
              console.error("Error generating Chart 4:", err);
          }

          // Chart 5
          try {
              const pptx5 = await generateChart5PPT(pptx);
              if (pptx5 && pptx5.addSlide) pptx = pptx5;
          } catch (err) {
              console.error("Error generating Chart 5:", err);
          }

          // Chart 6
          try {
              const pptx6 = await generateChart6PPT(pptx);
              if (pptx6 && pptx6.addSlide) pptx = pptx6;
          } catch (err) {
              console.error("Error generating Chart 6:", err);
          }

          // Chart 7
          try {
              const pptx7 = await generateChart7PPT(pptx);
              if (pptx7 && pptx7.addSlide) pptx = pptx7;
          } catch (err) {
              console.error("Error generating Chart 7:", err);
          }

          // Chart 8
          try {
              const pptx8 = await generateChart8PPT(pptx);
              if (pptx8 && pptx8.addSlide) pptx = pptx8;
          } catch (err) {
              console.error("Error generating Chart 8:", err);
          }

          // Chart 9
          // try {
          //     const pptx9 = await generateChart9PPT(pptx);
          //     if (pptx9 && pptx9.addSlide) pptx = pptx9;
          // } catch (err) {
          //     console.error("Error generating Chart 9:", err);
          // }
      } catch (chartError) {
          console.error("Error generating chart slides:", chartError);
      }

      // Verify the pptx object is valid before saving
      if (!pptx || !pptx.writeFile) {
          console.error("Invalid pptx object before saving");
          alert("There was an error generating the complete PPT. Please try again.");
          setPresentationGenerated(false);
          return;
      }

      // Save the presentation with proper error handling
      try {
          await pptx.writeFile({
              fileName: `${project_name}_Complete_Report_${selectedYear}.pptx`,
              compression: true
          });
          console.log("Complete PPT file saved successfully");
      } catch (saveError) {
          console.error("Error saving PPT file:", saveError);
          alert("There was an error saving the complete PPT file. Please try again.");
      }
  } catch (error) {
      console.error("Error in generateAllPPT:", error);
      alert("There was an error generating the complete PPT. Please try again.");
  } finally {
      setPresentationGenerated(false);
  }
};

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

  const renderChartContent = (chartId: number) => {
    switch (chartId) {
      case 1:
        return (
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-[#164f73] text-white">
                      <th colSpan={4} className="py-2 px-4 text-left text-lg">ROI across all events: {formatNumber(summaryData.avgROI)}%</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 text-left">Overall</th>
                      <th className="py-2 px-4 text-left">Events</th>
                      <th className="py-2 px-4 text-left">Trade Spend</th>
                      <th className="py-2 px-4 text-left">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300 text-left">
                      <th className="py-2 px-4">Total</th>
                      <th className="py-2 px-4">{summaryData.total}</th>
                      <th className="py-2 px-4">${formatCurrency(summaryData.totalSpend)}</th>
                      <th className="py-2 px-4">{formatNumber(summaryData.avgROI)}%</th>
                    </tr>
                    <tr className="border-b border-gray-300 text-left">
                      <th className="py-2 px-4">Positive ROI</th>
                      <td className="py-2 px-4">{summaryData.positiveCount}</td>
                      <td className="py-2 px-4">${formatCurrency(summaryData.positiveSpend)}</td>
                      <th className="py-2 px-4">{formatNumber(summaryData.positiveROI)}%</th>
                    </tr>
                    <tr className="border-b border-gray-300 text-left">
                      <th className="py-2 px-4">Negative ROI</th>
                      <td className="py-2 px-4">{summaryData.negativeCount}</td>
                      <td className="py-2 px-4">${formatCurrency(summaryData.negativeSpend)}</td>
                      <th className="py-2 px-4">{formatNumber(summaryData.negativeROI)}%</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => generatePPT()}
                disabled={presentationGenerated}
              >
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <ReactApexChart options={chartData.options as any} series={chartData.series as any} type="bar" height={400} />
          </div>
        );
      case 2:
        return (
          <div>
            <div className="flex justify-between mb-4">
              <div></div>
              <button className="btn btn-primary" onClick={() => generateChart2PPT()} disabled={presentationGenerated}>
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <ReactApexChart options={chart2Data.options as any} series={chart2Data.series as any} type="bar" height={400} />
          </div>
        );
      case 3:
        return (
          <div>
            <div className="flex justify-between mb-4">
              <div></div>
              <button className="btn btn-primary" onClick={() => generateChart3PPT()} disabled={presentationGenerated}>
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReactApexChart options={chart3Data.options1 as any} series={chart3Data.series1 as any} type="scatter" height={400} />
              <ReactApexChart options={chart3Data.options2 as any} series={chart3Data.series2 as any} type="scatter" height={400} />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <div className="flex justify-between mb-4">
              <div></div>
              <button className="btn btn-primary" onClick={() => generateChart4PPT()} disabled={presentationGenerated}>
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="bg-[#0072bc] text-white p-2 mb-2 text-center">Event Count (% of Total)</div>
                <ReactApexChart options={chart4Data.eventCount.options as any} series={chart4Data.eventCount.series as any} type="bar" height={400} />
              </div>
              <div>
                <div className="bg-[#0072bc] text-white p-2 mb-2 text-center">Average Incremental Lift (%)</div>
                <ReactApexChart options={chart4Data.incrementalLift.options as any} series={chart4Data.incrementalLift.series as any} type="bar" height={400} />
              </div>
              <div>
                <div className="bg-[#0072bc] text-white p-2 mb-2 text-center">Weighted Average ROI (%)</div>
                <ReactApexChart options={chart4Data.weightedROI.options as any} series={chart4Data.weightedROI.series as any} type="bar" height={400} />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <div className="flex justify-between mb-4">
              <div></div>
              <button className="btn btn-primary" onClick={() => generateChart5PPT()} disabled={presentationGenerated}>
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <ReactApexChart options={chart5Data.options as any} series={chart5Data.series as any} type="bar" height={500} />
              </div>
              <div className="bg-gray-50 p-4 rounded w-full">
                <h4 className="text-lg font-bold mb-3">Result Summary</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Discount Depth</th>
                        <th className="border px-4 py-2">0-10</th>
                        <th className="border px-4 py-2">10-20</th>
                        <th className="border px-4 py-2">20-30</th>
                        <th className="border px-4 py-2">30-40</th>
                        <th className="border px-4 py-2">40-50</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">No. of events</td>
                        {chart5Data.summaryData.noOfEvents.map((val: number, i: number) => (
                          <td key={i} className="border px-4 py-2">{val}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Avg. Wtd. ROI</td>
                        {chart5Data.summaryData.avgWeightedROI.map((val: number, i: number) => (
                          <td key={i} className="border px-4 py-2">{val.toFixed(1)}%</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">% of Trade Spend</td>
                        {chart5Data.summaryData.tradeSpend.map((val: number, i: number) => (
                          <td key={i} className="border px-4 py-2">{val.toFixed(1)}%</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Avg. Wtd. Lift</td>
                        {chart5Data.summaryData.avgLift.map((val: number, i: number) => (
                          <td key={i} className="border px-4 py-2">{val.toFixed(1)}%</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">No. of F&D Events</td>
                        {chart5Data.summaryData.fndEvents.map((val: number, i: number) => (
                          <td key={i} className="border px-4 py-2">{val}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <div className="flex justify-between mb-4">
              <div></div>
              <button className="btn btn-primary" onClick={() => generateChart6PPT()} disabled={presentationGenerated}>
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <div className="w-full mb-8">
              <ReactApexChart options={chart6Data.options as any} series={chart6Data.series as any} type="bar" height={500} />
            </div>
            <div className="bg-gray-50 p-4 rounded w-full mb-8">
              <h4 className="text-lg font-bold mb-3">Result Summary</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Metric</th>
                      <th className="border px-4 py-2 font-semibold">No. of events</th>
                      <th className="border px-4 py-2 font-semibold">Avg. Wtd. ROI</th>
                      <th className="border px-4 py-2 font-semibold">No. of Products</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chart6Data.summaryData.ppgGroups.map((group: any, i: number) => (
                      <tr key={i}>
                        <th className="border px-4 py-2">{group.ppgName}</th>
                        <td className="border px-4 py-2">{group.events.length === 0 ? '-' : group.events.length}</td>
                        <td className="border px-4 py-2">{group.avgRoi === 0 ? '-' : (group.avgRoi).toFixed(2) + '%'}</td>
                        <td className="border px-4 py-2">{group.products.length === 0 ? '-' : group.products.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <div className="flex justify-between mb-4">
              <div></div>
              <button className="btn btn-primary" onClick={() => generateChart7PPT()} disabled={presentationGenerated}>
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <ReactApexChart options={chart7Data.options as any} series={chart7Data.series as any} type="bar" height={400} />
          </div>
        );
      case 8:
        return (
          <div>
            <div className="flex justify-between mb-4">
              <div></div>
              <button className="btn btn-primary" onClick={() => generateChart8PPT()} disabled={presentationGenerated}>
                {presentationGenerated ? 'Generating...' : 'Download PPT'}
              </button>
            </div>
            <ReactApexChart options={chart8Data.options as any} series={chart8Data.series as any} type="scatter" height={500} />
          </div>
        );
      default:
        return null;
    }
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
              <Select value={String(selectedYear)} onValueChange={(v) => setSelectedYear(Number(v))}>
                <SelectTrigger className="w-20 h-9 rounded-lg border-gray-200 bg-gray-50/50 text-sm font-medium hover:bg-gray-50 transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {availableYears.map((y: any) => (
                    <SelectItem key={y.year} value={String(y.year)}>
                      {y.year} {y.name ? `(${y.name})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={generateAllPPT}
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

      <div className="max-w-8xl mx-auto px-8 py-8">
        <div className="grid gap-4">
          {chartQuestions.map((chart, index) => (
            <motion.div key={chart.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.4 }} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <button onClick={() => toggleChart(chart.id)} className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/40 transition-all duration-200">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-lg">{chart.id}</span>
                    </div>
                    {chart.hasChart && (<div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>)}
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md tracking-wide">REPORT {chart.id}</span>
                      {chart.category && (<span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md border ${getCategoryColor(chart.category)}`}>{chart.category.toUpperCase()}</span>)}
                      {getStatusIndicator(chart.hasChart)}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug mb-1">{chart.question}</h3>
                    <p className="text-sm text-gray-500">{chart.hasChart ? "Interactive data visualization available" : "Data processing in progress"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); generateSummary(); }} className="h-8 px-3 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-200 rounded-lg font-medium transition-all duration-200">
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Generate AI Summary
                  </Button>
                  <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                    {expandedCharts[chart.id] ? (<ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />) : (<ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />)}
                  </div>
                </div>
              </button>
              <AnimatePresence>
                {expandedCharts[chart.id] && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="border-t border-gray-50">
                    <div className="p-8 bg-gradient-to-br from-gray-50/30 to-blue-50/20">
                      {renderChartContent(chart.id)}
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
