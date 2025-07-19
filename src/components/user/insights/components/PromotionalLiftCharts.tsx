'use client';

import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
// import Pagination from "./pagination/Pagination";
// import ChartSummary from "./ChartSummary";

// Types
type ChartDataItem = {
  Retailer: string;
  Product: string;
  tpr_avg: number;
  fo_avg: number;
  do_avg: number;
  fd_avg: number;
};

type SeriesItem = {
  name: string;
  data: number[];
  type: 'bar' | 'line';
};

type RetailerChart = {
  Retailer: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    categories: string[];
    series: SeriesItem[];
  };
};

// Static mock data
const mockChart7Data: ChartDataItem[] = [
  {
    Retailer: "Retailer A",
    Product: "Product 1",
    tpr_avg: 10,
    fo_avg: 5,
    do_avg: 3,
    fd_avg: 7,
  },
  {
    Retailer: "Retailer A",
    Product: "Product 2",
    tpr_avg: 12,
    fo_avg: 4,
    do_avg: 6,
    fd_avg: 8,
  },
  {
    Retailer: "Retailer B",
    Product: "Product X",
    tpr_avg: 8,
    fo_avg: 6,
    do_avg: 5,
    fd_avg: 4,
  },
  {
    Retailer: "Retailer B",
    Product: "Product Y",
    tpr_avg: 11,
    fo_avg: 7,
    do_avg: 2,
    fd_avg: 5,
  },
];

// Component
const PromotionalLiftChart: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [isStacked, setIsStacked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const retailers: { [key: string]: RetailerChart } = {};

  mockChart7Data.forEach((item) => {
    const retailer = item.Retailer;

    if (!retailers[retailer]) {
      retailers[retailer] = {
        Retailer: retailer,
        xAxisTitle: "Products",
        yAxisTitle: "Promotional Lifts",
        data: {
          categories: [],
          series: [
            { name: "TPR", data: [], type: chartType },
            { name: "Feature Only", data: [], type: chartType },
            { name: "Display Only", data: [], type: chartType },
            { name: "Feature and Display", data: [], type: chartType },
          ],
        },
      };
    }

    retailers[retailer].data.categories.push(item.Product);
    retailers[retailer].data.series[0].data.push(item.tpr_avg || 0);
    retailers[retailer].data.series[1].data.push(item.fo_avg || 0);
    retailers[retailer].data.series[2].data.push(item.do_avg || 0);
    retailers[retailer].data.series[3].data.push(item.fd_avg || 0);
  });

  const restructuredData: RetailerChart[] = Object.values(retailers);

  const paginate = (
    data: RetailerChart[],
    currentPage: number,
    itemsPerPage: number
  ) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const paginatedData = paginate(restructuredData, currentPage, itemsPerPage);

  const getChartOptions = (data: RetailerChart): ApexCharts.ApexOptions => ({
    chart: {
      stacked: isStacked,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    title: {
      text: data.Retailer,
      align: 'center',
      style: {
        fontSize: '16px',
      },
    },
    xaxis: {
      categories: data.data.categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: '10px',
        },
        rotateAlways: true,
        formatter: (value: string) => {
          const maxLabelLength = 15;
          return value?.length > maxLabelLength
            ? value.substring(0, maxLabelLength - 3) + "..."
            : value;
        },
      },
      axisBorder: {
        show: true,
        color: '#000000',
      },
      title: {
        text: data.xAxisTitle,
      },
    },
    yaxis: {
      title: {
        text: data.yAxisTitle,
      },
      labels: {
        formatter: (value: number) => Math.round(value),
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: true,
      offsetY: -20,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
      hover: {
        size: 6,
      },
    },
    stroke: {
      curve: 'straight',
      width: 0,
      colors: ["#ea580c", "#14532d", "#ef4444", "#0ea5e9"],
    },
    grid: {
      show: false,
      borderColor: '#e7e7e7',
    },
    colors: ["#2c99f4", "#fa518a", "#f9be56", "#b386e1"],
    tooltip: {
      shared: false,
      intersect: true,
      y: {
        formatter: (value: number) => `${Math.round(value)}%`,
      },
      x: {
        formatter: (_value: string, { dataPointIndex }: any) => {
          return data.data.categories[dataPointIndex];
        },
      },
    },
  });

  return (
    <div>
      {/* Optional: Add ChartSummary if needed */}
      {/* <ChartSummary chartData={mockChart7Data} chartType="chart7" /> */}

      {paginatedData.map((data, index) => (
        <div key={index} style={{ marginBottom: "50px" }}>
          <ApexCharts
            options={getChartOptions(data)}
            series={data.data.series}
            height={500}
            width="100%"
          />
        </div>
      ))}

      {/* Optional: Add Pagination component */}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={restructuredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default PromotionalLiftChart;
