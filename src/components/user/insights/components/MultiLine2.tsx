'use client';
import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
// import Pagination from "./pagination/Pagination";
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
// import ChartSummary from "./ChartSummary";

dayjs.extend(isoWeek);

// ✅ Types
type ChartItem = {
  WeekEnding: string;
  Product: string;
  Retailer: string;
  Price: number;
  Total_Volume: number;
};

type GroupedItem = {
  totalPrice: number;
  totalUnits: number;
  count: number;
  Retailer: string;
};

type GroupedData = {
  [key: string]: {
    [weekEnding: string]: GroupedItem;
  };
};

type SeriesData = {
  name: string;
  data: number[];
};

type TransformedChart = {
  Retailer: string;
  Product: string;
  xAxisTitle: string;
  leftyAxisTitle: string;
  rightyAxisTitle: string;
  data: {
    categories: string[];
    series: SeriesData[];
  };
};

// ✅ Static Sample Data
const staticChartData: ChartItem[] = [
  {
    WeekEnding: '2025-07-05',
    Product: 'Product A',
    Retailer: 'Retailer 1',
    Price: 12.5,
    Total_Volume: 100,
  },
  {
    WeekEnding: '2025-07-05',
    Product: 'Product A',
    Retailer: 'Retailer 1',
    Price: 13.0,
    Total_Volume: 110,
  },
  {
    WeekEnding: '2025-07-12',
    Product: 'Product A',
    Retailer: 'Retailer 1',
    Price: 12.8,
    Total_Volume: 105,
  },
  {
    WeekEnding: '2025-07-05',
    Product: 'Product B',
    Retailer: 'Retailer 2',
    Price: 22.0,
    Total_Volume: 80,
  },
  {
    WeekEnding: '2025-07-12',
    Product: 'Product B',
    Retailer: 'Retailer 2',
    Price: 21.5,
    Total_Volume: 90,
  },
];

const MultiLine2: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  const chart5Data: ChartItem[] = staticChartData;
  const [isStacked, setIsStacked] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const transformedData: { [key: string]: TransformedChart } = {};

  const groupByWeek = (data: ChartItem[]): GroupedData => {
    const weeklyData: GroupedData = {};

    data.forEach((item) => {
      const weekEnding = item.WeekEnding;
      const product = item.Product;
      const retailer = item.Retailer;
      const key = `${product}_${retailer}`;

      if (!weeklyData[key]) {
        weeklyData[key] = {};
      }

      if (!weeklyData[key][weekEnding]) {
        weeklyData[key][weekEnding] = {
          totalPrice: 0,
          totalUnits: 0,
          count: 0,
          Retailer: retailer,
        };
      }

      weeklyData[key][weekEnding].totalPrice += item.Price;
      weeklyData[key][weekEnding].totalUnits += item.Total_Volume;
      weeklyData[key][weekEnding].count += 1;
    });

    return weeklyData;
  };

  const groupedData = groupByWeek(chart5Data);

  Object.keys(groupedData).forEach((key) => {
    transformedData[key] = {
      Retailer: key.split('_')[1],
      Product: key.split('_')[0],
      xAxisTitle: 'Week-Year',
      leftyAxisTitle: 'Units',
      rightyAxisTitle: 'Price ($)',
      data: {
        categories: [],
        series: [
          { name: 'Units', data: [] },
          { name: 'Price', data: [] },
        ],
      },
    };

    Object.keys(groupedData[key]).forEach((weekYear) => {
      const { totalPrice, totalUnits, count } = groupedData[key][weekYear];
      const avgPrice = totalPrice / count;
      const avgUnits = totalUnits / count;

      transformedData[key].data.categories.push(weekYear);
      transformedData[key].data.series[0].data.push(avgUnits);
      transformedData[key].data.series[1].data.push(avgPrice);
    });
  });

  const transformedChartData: TransformedChart[] =
    Object.values(transformedData);

  const getEvenIndexElements = (arr: string[]): string[] => {
    return arr.map((item, i) => (i % 2 === 0 ? item : ''));
  };

  const getChartOptions = (data: TransformedChart): ApexCharts.ApexOptions => ({
    chart: {
      stacked: isStacked,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
          reset: true,
        },
      },
    },
    title: {
      text: `${data.Retailer} - ${data.Product}`,
      align: 'center',
      margin: 10,
      style: { fontSize: '14px' },
    },
    xaxis: {
      categories: getEvenIndexElements(data.data.categories),
      title: { text: data.xAxisTitle },
      axisBorder: { show: true, color: '#000', height: 1 },
      axisTicks: { show: true, color: '#000', height: 6 },
      labels: {
        rotate: -45,
        style: { fontSize: '10px' },
      },
    },
    yaxis: [
      {
        title: { text: data.leftyAxisTitle },
        labels: {
          formatter: (value: number) =>
            value.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        },
        axisBorder: { show: true, color: '#000' },
      },
      {
        opposite: true,
        title: { text: data.rightyAxisTitle },
        labels: {
          formatter: (value: number) =>
            `$${value.toFixed(2).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value: number, { seriesIndex, w }: any): string {
          const seriesName = w.globals.seriesNames[seriesIndex];
          if (seriesName === 'Price') {
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            });
          } else {
            return value.toLocaleString('en-US', {
              maximumFractionDigits: 0,
            });
          }
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    dataLabels: { enabled: false },
    markers: {
      size: 3,
      hover: { size: 4 },
    },
    stroke: {
      curve: 'straight',
      width: 4,
      colors: ['#14532d', '#0ea5e9', '#ef4444', '#ea580c'],
    },
    grid: { show: false },
    colors: ['#14532d', '#0ea5e9', '#ef4444', '#ea580c'],
    series: data.data.series.map((series) => ({
      name: series.name,
      data: series.data,
    })),
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleChartData = transformedChartData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* <ChartSummary chartData={staticChartData} chartType="chart5" /> */}
      {visibleChartData.map((val, i) => (
        <div
          key={i}
          style={{
            marginBottom: i !== transformedChartData.length - 1 ? '50px' : '0',
          }}
        >
          <ApexCharts
            options={getChartOptions(val)}
            series={val.data.series}
            type={chartType}
            height={500}
            width="100%"
          />
        </div>
      ))}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={transformedChartData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default MultiLine2;
