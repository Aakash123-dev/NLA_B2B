"use client"
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
// import ChartSummary from "./ChartSummary";
// import Pagination from "./pagination/Pagination";

// Load ApexCharts dynamically to avoid SSR issues in Next.js
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointStyle: string;
  pointRadius: number;
  pointHoverRadius: number;
}

interface ChartData {
  multiAxes: boolean;
  xycoordinated: boolean;
  quadrant: boolean;
  Retailer: string;
  Product: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    labels: string[];
    datasets: Dataset[];
  };
}

const mockChart4Data = [
  {
    Retailer: "Retailer A",
    Product: "Product A",
    "-10%_BPE_Volume_Impact": -20,
    "-8%_BPE_Volume_Impact": -15,
    "-6%_BPE_Volume_Impact": -10,
    "-4%_BPE_Volume_Impact": -5,
    "-2%_BPE_Volume_Impact": 0,
    "0%_BPE_Volume_Impact": 5,
    "2%_BPE_Volume_Impact": 10,
    "4%_BPE_Volume_Impact": 15,
    "6%_BPE_Volume_Impact": 20,
    "8%_BPE_Volume_Impact": 25,
    "10%_BPE_Volume_Impact": 30,
    "-10%_BPE_Dollar_Impact": -5,
    "-8%_BPE_Dollar_Impact": -3,
    "-6%_BPE_Dollar_Impact": -1,
    "-4%_BPE_Dollar_Impact": 0,
    "-2%_BPE_Dollar_Impact": 2,
    "0%_BPE_Dollar_Impact": 4,
    "2%_BPE_Dollar_Impact": 6,
    "4%_BPE_Dollar_Impact": 8,
    "6%_BPE_Dollar_Impact": 10,
    "8%_BPE_Dollar_Impact": 12,
    "10%_BPE_Dollar_Impact": 14,
  },
  // Add more mock objects as needed
];

const StackedLineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [isStacked, setIsStacked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const transformedData: ChartData[] = [];
    mockChart4Data.forEach((item) => {
      const retailer = item.Retailer;
      const product = item.Product;

      const labels = [
        "-10%", "-8%", "-6%", "-4%", "-2%",
        "0%", "2%", "4%", "6%", "8%", "10%",
      ];

      const volumeData = labels.map((label) => item[`${label}_BPE_Volume_Impact`] ?? 0);
      const dollarData = labels.map((label) => item[`${label}_BPE_Dollar_Impact`] ?? 0);

      transformedData.push({
        multiAxes: false,
        xycoordinated: false,
        quadrant: true,
        Retailer: retailer,
        Product: product,
        xAxisTitle: "Price Change %",
        yAxisTitle: "Volume/Dollar Impact",
        data: {
          labels,
          datasets: [
            {
              label: "% Volume",
              data: volumeData,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              pointStyle: "circle",
              pointRadius: 8,
              pointHoverRadius: 15,
            },
            {
              label: "% Dollar",
              data: dollarData,
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              pointStyle: "triangle",
              pointRadius: 8,
              pointHoverRadius: 15,
            },
          ],
        },
      });
    });
    setChartData(transformedData);
  }, []);

  const getApexOptions = (data: ChartData) => ({
    chart: {
      type: chartType,
      height: 450,
      stacked: isStacked,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          pan: true,
          reset: true,
          customIcons: [
            {
              icon: '<svg width="20" height="20" viewBox="0 0 24 24"><rect x="5" y="5" width="3" height="14"/><rect x="10.5" y="5" width="3" height="14"/><rect x="16" y="5" width="3" height="14"/></svg>',
              title: 'Switch to Bar Chart',
              class: 'custom-icon-bar',
              index: -1,
              click: () => setChartType('bar'),
            },
            {
              icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 16l4-4 4 4 4-8 4 8" stroke="black" fill="none"/></svg>',
              title: 'Switch to Line Chart',
              class: 'custom-icon-line',
              index: -1,
              click: () => setChartType('line'),
            },
          ],
        },
      },
    },
    title: {
      text: `${data.Retailer} - ${data.Product}`,
      align: 'center',
    },
    xaxis: {
      categories: data.data.labels,
      title: { text: data.xAxisTitle },
    },
    yaxis: {
      title: { text: `${data.yAxisTitle} (%)` },
      labels: {
        formatter: (val: number) => `${val.toFixed(2)}%`,
      },
    },
    annotations: {
      yaxis: [{ y: 0, borderColor: '#000000', strokeDashArray: 0 }],
    },
    series: data.data.datasets.map((d) => ({
      name: d.label,
      data: d.data,
    })),
    colors: ["#2c99f4", "#40d68e"],
    stroke: { curve: 'straight', width: 4 },
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleChartData = chartData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* <ChartSummary chartData={mockChart4Data} chartType="chart4" /> */}
      {visibleChartData.map((chart, i) => (
        <div key={i} style={{ marginBottom: '40px' }}>
          <ApexCharts
            options={getApexOptions(chart)}
            series={getApexOptions(chart).series}
            type={chartType}
            height={450}
          />
        </div>
      ))}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={chartData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      /> */}
    </div>
  );
};

export default StackedLineChart;
