'use client';

import React, { useEffect, useMemo, useState, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchChartData, ChartItem } from '@/store/slices/chartsSlices';
import { useSearchParams } from 'next/navigation';

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

const ChartOnly: React.FC = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const { data: chartItems, loading } = useSelector(
    (state: RootState) => state.chart
  );

  const [currentPage, setCurrentPage] = useState(1);
  const chartsPerPage = 2;

  const chartDataArray = useMemo<ChartGroup[]>(() => {
    if (!chartItems || chartItems.length === 0) return [];

    const groupedData: Record<string, Record<string, RetailerGroup>> = {};

    chartItems.forEach((item: ChartItem) => {
      const { Brand, Retailer, Product, Price_avg_last_4_weeks } = item;
      
      // Skip items with missing required data
      if (!Brand || !Retailer || !Product || typeof Price_avg_last_4_weeks !== 'number') {
        return;
      }

      if (!groupedData[Brand]) groupedData[Brand] = {};
      if (!groupedData[Brand][Retailer]) {
        groupedData[Brand][Retailer] = { label: Retailer, data: [] };
      }

      groupedData[Brand][Retailer].data.push({
        x: Product,
        y: Price_avg_last_4_weeks,
      });
    });

    return Object.entries(groupedData).map(([brand, retailers]) => ({
      brand,
      retailers: Object.values(retailers),
    }));
  }, [chartItems]);

  const selectedRetailerId = useAppSelector(
    (state: RootState) => state.filters.selectedRetailerId
  );
  const selectedBrandId = useAppSelector(
    (state: RootState) => state.filters.selectedBrandId
  );
  const selectedProductId = useAppSelector(
    (state: RootState) => state.filters.selectedProductId
  );
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const filterPayload = {
    projectId,
    modelId,
    Product: selectedProductId || undefined,
    Brand: selectedBrandId || undefined,
    Retailer: selectedRetailerId || undefined,
  };

  useEffect(() => {
    if (projectId && modelId) {
      dispatch(fetchChartData(filterPayload));
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId,
    selectedBrandId,
    selectedRetailerId,
  ]);

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
    <div ref={ref}>
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
      {totalPages > 1 && (
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
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
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
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
});

ChartOnly.displayName = 'ChartOnly';

export default ChartOnly;
