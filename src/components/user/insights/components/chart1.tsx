'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Load ApexCharts dynamically to avoid SSR issues in Next.js
const ReactApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

// Type definitions
type ChartItem = {
  Brand: string;
  Retailer: string;
  Product: string;
  Price_avg_last_4_weeks: number;
};

type RetailerGroup = {
  label: string;
  data: { x: string; y: number }[];
};

type ChartGroup = {
  brand: string;
  retailers: RetailerGroup[];
};

// Dummy chart data simulating API or Redux
const dummyChartData: ChartItem[] = [
  { Brand: 'Nike', Retailer: 'Amazon', Product: 'Shoe A', Price_avg_last_4_weeks: 100 },
  { Brand: 'Nike', Retailer: 'Flipkart', Product: 'Shoe A', Price_avg_last_4_weeks: 110 },
  { Brand: 'Nike', Retailer: 'Amazon', Product: 'Shoe B', Price_avg_last_4_weeks: 120 },
  { Brand: 'Adidas', Retailer: 'Amazon', Product: 'Sneaker A', Price_avg_last_4_weeks: 130 },
  { Brand: 'Adidas', Retailer: 'Flipkart', Product: 'Sneaker B', Price_avg_last_4_weeks: 125 },
];

const ChartOnly: React.FC = () => {
  const [chartDataArray, setChartDataArray] = useState<ChartGroup[]>([]);

  useEffect(() => {
    const groupedData: Record<string, Record<string, RetailerGroup>> = {};

    dummyChartData.forEach((item) => {
      const { Brand, Retailer, Product, Price_avg_last_4_weeks } = item;

      if (!groupedData[Brand]) groupedData[Brand] = {};
      if (!groupedData[Brand][Retailer]) {
        groupedData[Brand][Retailer] = { label: Retailer, data: [] };
      }

      groupedData[Brand][Retailer].data.push({ x: Product, y: Price_avg_last_4_weeks });
    });

    const newDataArray: ChartGroup[] = Object.entries(groupedData).map(([brand, retailers]) => ({
      brand,
      retailers: Object.values(retailers),
    }));

    setChartDataArray(newDataArray);
  }, []);

  return (
    <div>
      {chartDataArray.map((chartData, index) => {
        const allXAxisLabels = Array.from(
          new Set(
            chartData.retailers.reduce(
              (labels, retailer) => labels.concat(retailer.data.map((item) => item.x)),
              [] as string[]
            )
          )
        );

        const seriesData = chartData.retailers.map((retailer) => {
          const data = allXAxisLabels.map((label) => {
            const dataPoint = retailer.data.find((item) => item.x === label);
            return dataPoint ? dataPoint.y : 0;
          });

          return {
            name: retailer.label,
            type: 'bar' as const,
            data,
          };
        });

        const options: ApexOptions = {
          chart: {
            type: 'bar',
            height: 450,
            toolbar: { show: true },
          },
          xaxis: {
            categories: allXAxisLabels,
            title: { text: 'Product' },
            labels: {
              rotate: -45,
              style: { fontSize: '10px' },
            },
          },
          yaxis: {
            title: { text: 'Price Mean' },
            labels: {
              formatter: (value) => `$${value.toFixed(2)}`,
              style: { fontSize: '10px' },
            },
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          legend: { position: 'top' },
        };

        return (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h6 style={{ textAlign: 'center' }}>{chartData.brand}</h6>
            <ReactApexCharts options={options} series={seriesData} type="bar" height={450} />
          </div>
        );
      })}
    </div>
  );
};

export default ChartOnly;
