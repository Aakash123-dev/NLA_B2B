'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
// import Pagination from "./pagination/Pagination";
// import ChartSummary from "./ChartSummary";

// Load ApexCharts dynamically to avoid SSR issues in Next.js
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartDataPoint {
  x: string;
  y: number | string;
}

interface SeriesItem {
  name: string;
  type: string;
  data: ChartDataPoint[];
  yAxisIndex: number;
  color: string;
  marker?: {
    size: number;
    colors: string;
  };
}

interface ProductChartData {
  Product: string;
  multiAxes: boolean;
  leftyAxisTitle: string;
  rightyAxisTitle: string;
  series: SeriesItem[];
}

const mockChartData: ProductChartData[] = [
  {
    Product: 'Product A',
    multiAxes: true,
    leftyAxisTitle: 'Base Price Elasticity',
    rightyAxisTitle: 'Sale Revenue (L52 weeks)',
    series: [
      {
        name: 'Base Price Elasticity',
        type: 'line',
        data: [
          { x: 'Retailer 1', y: 1.23 },
          { x: 'Retailer 2', y: 0.95 },
        ],
        yAxisIndex: 0,
        color: '#fa518a',
        marker: {
          size: 10,
          colors: '#fa518a',
        },
      },
      {
        name: 'Total Sales (last 52 weeks)',
        type: 'bar',
        data: [
          { x: 'Retailer 1', y: '$15000' },
          { x: 'Retailer 2', y: '$18000' },
        ],
        yAxisIndex: 1,
        color: '#2c99f4',
      },
    ],
  },
  {
    Product: 'Product B',
    multiAxes: true,
    leftyAxisTitle: 'Base Price Elasticity',
    rightyAxisTitle: 'Sale Revenue (L52 weeks)',
    series: [
      {
        name: 'Base Price Elasticity',
        type: 'line',
        data: [
          { x: 'Retailer A', y: 1.12 },
          { x: 'Retailer B', y: 1.03 },
        ],
        yAxisIndex: 0,
        color: '#fa518a',
        marker: {
          size: 10,
          colors: '#fa518a',
        },
      },
      {
        name: 'Total Sales (last 52 weeks)',
        type: 'bar',
        data: [
          { x: 'Retailer A', y: '$21000' },
          { x: 'Retailer B', y: '$19000' },
        ],
        yAxisIndex: 1,
        color: '#2c99f4',
      },
    ],
  },
];

const MyChart: React.FC = () => {
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const getDataOption = (data: ProductChartData) => ({
    chart: {
      height: 500,
      width: '200%',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
      y: {
        formatter: function (
          value: number,
          { seriesIndex }: { seriesIndex: number }
        ) {
          return seriesIndex === 0 ? value.toFixed(2) :` $${value.toFixed(2)}`;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      markers: {
        size: 7,
        shape: 'circle',
        strokeWidth: 0,
      },
    },
    xaxis: {
      categories: data?.series[0]?.data?.map((item) => item.x),
      labels: {
        style: {
          fontSize: '10px',
        },
        rotate: -45,
        rotateAlways: true,
      },
    },
    yaxis: [
      {
        title: {
          text: data.leftyAxisTitle,
        },
        opposite: false,
        reversed: true,
      },
      {
        title: {
          text: data.rightyAxisTitle,
        },
        opposite: true,
      },
    ],
    series: data.series,
    noData: {
      text: 'No Data Available To Show',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '14px',
      },
    },
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = mockChartData.slice(startIndex, endIndex);

  return (
    <div>
      {/* <ChartSummary chartData={mockChartData} chartType="static" /> */}
      {visibleData.map((data, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h6 style={{ textAlign: 'center' }}>{data.Product}</h6>
          <ApexCharts
            options={getDataOption(data)}
            series={data.series}
            height={600}
            width="100%"
            type="line"
          />
        </div>
      ))}
      {/* {mockChartData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={mockChartData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )} */}
    </div>
  );
};

export default MyChart;