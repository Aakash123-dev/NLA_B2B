'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ApexOptions } from 'apexcharts';

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

const MyChart: React.FC = () => {
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const { data3, loading, error } = useSelector(
    (state: RootState) => state.chart
  );

  const chartData: ProductChartData[] = useMemo(() => {
    const grouped = new Map<string, ProductChartData>();

    data3.forEach((item: any) => {
      if (!grouped.has(item.Product)) {
        grouped.set(item.Product, {
          Product: item.Product,
          multiAxes: true,
          leftyAxisTitle: 'Base Price Elasticity',
          rightyAxisTitle: 'Sale Revenue (L52 weeks)',
          series: [
            {
              name: 'Base Price Elasticity',
              type: 'line',
              data: [],
              yAxisIndex: 0,
              color: '#fa518a',
              marker: {
                size: 10,
                colors: '#fa518a',
              },
            },
            {
              name: 'Total Sales (last 52 weeks)',
              type: chartType,
              data: [],
              yAxisIndex: 1,
              color: '#2c99f4',
            },
          ],
        });
      }

      const product = grouped.get(item.Product);
      product!.series[0].data.push({
        x: item.Retailer,
        y: parseFloat(item.Base_Price_Elasticity),
      });
      product!.series[1].data.push({
        x: item.Retailer,
        y: parseFloat(item.Dollar_sales_last_52_weeks),
      });
    });

    return Array.from(grouped.values());
  }, [data3, chartType]);

  const getDataOption = (data: ProductChartData): ApexOptions => ({
    chart: {
      height: 500,
      width: '200%',
      zoom: { enabled: false },
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
          customIcons: [
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z"></path></svg>`,
              title: 'Bar Chart',
              class: 'custom-bar',
              index: -1,
              click: () => setChartType('bar'),
            },
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145"></polygon></svg>`,
              title: 'Line Chart',
              class: 'custom-line',
              index: -1,
              click: () => setChartType('line'),
            },
          ],
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
          return seriesIndex === 0
            ? value.toFixed(2)
            : `$${Number(value).toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}`;
        },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'top',
      markers: { size: 7, shape: 'circle', strokeWidth: 0 },
    },
    xaxis: {
      categories: data?.series[0]?.data.map((item) => item.x),
      labels: {
        style: { fontSize: '10px' },
        rotate: -45,
        rotateAlways: true,
        formatter: function (value: string) {
          const maxLen = 30;
          return value.length > maxLen
            ? value.slice(0, maxLen - 3) + '...'
            : value;
        },
      },
    },
    yaxis: [
      {
        title: { text: data.leftyAxisTitle },
        opposite: false,
        reversed: true,
        labels: {
          formatter: (value) => `${value.toFixed(2)}`,
        },
      },
      {
        title: { text: data.rightyAxisTitle },
        opposite: true,
        labels: {
          formatter: (value) => `$${value.toLocaleString('en-US')}`,
        },
      },
    ],
    grid: {
      show: false,
      borderColor: '#e7e7e7',
    },
    markers: {
      size: 5,
      strokeColors: '#000',
      strokeWidth: 1,
      strokeOpacity: 0.7,
      fillOpacity: 0.8,
      shape: 'square',
      showNullDataPoints: true,
      hover: {
        size: 6,
        sizeOffset: 1,
      },
    },
    stroke: {
      width: 2,
    },
    series: data.series,
    noData: {
      text: 'No Data Available To Show',
      align: 'center',
      verticalAlign: 'middle',
      style: { fontSize: '14px' },
    },
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = chartData.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    const totalPages = Math.ceil(chartData.length / itemsPerPage);
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!chartData.length) return <p>No data available</p>;

  return (
    <div>
      {visibleData.map((data, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h6 style={{ textAlign: 'center' }}>{data.Product}</h6>
          <ApexCharts
            options={getDataOption(data)}
            series={data.series}
            height={600}
            width="100%"
            type={chartType}
          />
        </div>
      ))}

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(chartData.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(chartData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyChart;
