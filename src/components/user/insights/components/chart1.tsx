'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchChartData } from '@/store/slices/chartsSlices';


// Load ApexCharts dynamically to avoid SSR issues
const ReactApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type RetailerGroup = {
  label: string;
  data: { x: string; y: number }[];
};

type ChartGroup = {
  brand: string;
  retailers: RetailerGroup[];
};

const ChartOnly: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: chartItems, loading } = useSelector(
    (state: RootState) => state.chart
  );

  const [chartDataArray, setChartDataArray] = useState<ChartGroup[]>([]);

  // Fetch from Redux on mount
  useEffect(() => {
    dispatch(fetchChartData({ projectId: 762, modelId: 916 }));
  }, [dispatch]);

  // Transform Redux chartItems into chartDataArray
  useEffect(() => {
    if (!chartItems || chartItems.length === 0) return;

    const groupedData: Record<string, Record<string, RetailerGroup>> = {};

    chartItems.forEach(
      ({ Brand, Retailer, Product, Price_avg_last_4_weeks }) => {
        if (!groupedData[Brand]) groupedData[Brand] = {};
        if (!groupedData[Brand][Retailer]) {
          groupedData[Brand][Retailer] = { label: Retailer, data: [] };
        }

        groupedData[Brand][Retailer].data.push({
          x: Product,
          y: Price_avg_last_4_weeks,
        });
      }
    );

    const newDataArray: ChartGroup[] = Object.entries(groupedData).map(
      ([brand, retailers]) => ({
        brand,
        retailers: Object.values(retailers),
      })
    );

    setChartDataArray(newDataArray);
  }, [chartItems]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading chart data...</p>
      </div>
    );
  }

  return (
    <div>
      {chartDataArray.map((chartData, index) => {
        const allXAxisLabels = Array.from(
          new Set(
            chartData.retailers.reduce(
              (labels, retailer) =>
                labels.concat(retailer.data.map((item) => item.x)),
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
            <ReactApexCharts
              options={options}
              series={seriesData}
              type="bar"
              height={450}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChartOnly;
