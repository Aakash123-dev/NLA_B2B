'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

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
  const { data: chartItems, loading } = useSelector(
    (state: RootState) => state.chart
  );

  const [currentPage, setCurrentPage] = useState(1);
  const chartsPerPage = 2;

  const chartDataArray = useMemo<ChartGroup[]>(() => {
    if (!chartItems || chartItems.length === 0) return [];

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

    return Object.entries(groupedData).map(([brand, retailers]) => ({
      brand,
      retailers: Object.values(retailers),
    }));
  }, [chartItems]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        Loading chart data...
      </div>
    );
  }

  if (chartDataArray.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        No chart data available.
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(chartDataArray.length / chartsPerPage);
  const startIdx = (currentPage - 1) * chartsPerPage;
  const endIdx = startIdx + chartsPerPage;
  const chartsToShow = chartDataArray.slice(startIdx, endIdx);

  return (
    <div>
      {chartsToShow.map((chartData, index) => {
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

      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
          gap: '1rem',
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChartOnly;
