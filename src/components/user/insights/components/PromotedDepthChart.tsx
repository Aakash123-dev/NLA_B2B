'use client';
import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
// import Pagination from './pagination/Pagination';
// import ChartSummary from './ChartSummary';

type ChartDataItem = {
  Retailer: string;
  Product: string;
  Average_discount_depth: number;
  Promo_Price_Elasticity: number;
};

type SeriesItem = {
  name: string;
  type: string;
  data: number[];
};

type RetailerChart = {
  Retailer: string;
  xAxisTitle: string;
  yAxisTitle: string;
  y1AxisTitle: string;
  data: {
    categories: string[];
    series: SeriesItem[];
  };
};

// --- Static Data ---
const mockChart6Data: ChartDataItem[] = [
  {
    Retailer: 'Retailer A',
    Product: 'Product 1',
    Average_discount_depth: 12.5,
    Promo_Price_Elasticity: -1.5,
  },
  {
    Retailer: 'Retailer A',
    Product: 'Product 2',
    Average_discount_depth: 15,
    Promo_Price_Elasticity: -2.0,
  },
  {
    Retailer: 'Retailer B',
    Product: 'Product X',
    Average_discount_depth: 10,
    Promo_Price_Elasticity: -1.8,
  },
  {
    Retailer: 'Retailer B',
    Product: 'Product Y',
    Average_discount_depth: 8.2,
    Promo_Price_Elasticity: -1.3,
  },
];

const PromotedDepthChart: React.FC = () => {
  const [isStacked, setIsStacked] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [chartType2, setChartType2] = useState<'bar' | 'line'>('line');

  const retailers: { [key: string]: RetailerChart } = {};

  mockChart6Data.forEach((item) => {
    const retailer = item.Retailer;
    if (!retailers[retailer]) {
      retailers[retailer] = {
        Retailer: retailer,
        xAxisTitle: 'Products',
        yAxisTitle: 'Promo Price Elasticity',
        y1AxisTitle: 'Average Discount Depth',
        data: {
          categories: [],
          series: [
            {
              name: 'Average Discount Depth',
              type: chartType2,
              data: [],
            },
            {
              name: 'Promo Price Elasticity',
              type: chartType,
              data: [],
            },
          ],
        },
      };
    }

    retailers[retailer].data.categories.push(item.Product);
    retailers[retailer].data.series[0].data.push(item.Average_discount_depth);
    retailers[retailer].data.series[1].data.push(item.Promo_Price_Elasticity);
  });

  const restructuredData: RetailerChart[] = Object.values(retailers);

  const getChartOptions = (data: RetailerChart) => ({
    chart: {
      stacked: isStacked,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
    tooltip: {
      x: {
        formatter: function (_value: string, { dataPointIndex }: any) {
          return data.data.categories[dataPointIndex] || '';
        },
      },
      y: {
        formatter: (value: number) => value.toFixed(2),
      },
    },
    legend: {
      show: true,
      position: 'top',
    },
    xaxis: {
      categories: data.data.categories,
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          fontSize: '10px',
        },
        formatter: (value: unknown) => {
          const str = typeof value === 'string' ? value : '';
          const maxLabelLength = 15;
          return str.length > maxLabelLength
            ? str.substring(0, maxLabelLength - 3) + '...'
            : str;
        },
      },
      axisBorder: {
        show: true,
        color: '#000000',
      },
    },
    yaxis: [
      {
        title: {
          text: data.y1AxisTitle,
        },
        labels: {
          formatter: (value: number) => `${value.toFixed(2)}%`,
        },
      },
      {
        title: {
          text: data.yAxisTitle,
        },
        opposite: true,
        max: 0,
        reversed: true,
        labels: {
          formatter: (value: number) => value.toFixed(2),
        },
      },
    ],
    dataLabels: { enabled: false },
    markers: {
      size: 5,
      shape: 'circle',
      hover: { size: 6 },
    },
    stroke: {
      curve: 'straight',
      width: 4,
    },
    colors: ['#eb974e', '#2c99f4'],
    grid: {
      show: false,
      borderColor: '#e7e7e7',
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const paginate = (
    data: RetailerChart[],
    currentPage: number,
    itemsPerPage: number
  ) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const paginatedData = paginate(restructuredData, currentPage, itemsPerPage);

  return (
    <div>
      {/* <ChartSummary chartData={mockChart6Data} chartType="chart6" /> */}
      {paginatedData.map((data, index) => (
        <div key={index} style={{ marginBottom: '50px' }}>
          <h6 style={{ textAlign: 'center' }}>{data.Retailer}</h6>
          <ApexCharts
            options={getChartOptions(data)}
            series={data.data.series}
            height={500}
            width="100%"
          />
        </div>
      ))}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={restructuredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default PromotedDepthChart;
