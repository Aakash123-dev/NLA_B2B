'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '@/store';
import ApexCharts from 'react-apexcharts';
import { fetchChart6DataThunk } from '@/store/slices/chartsSlices';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

// Types
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

const PromotionalLiftChart: React.FC = () => {
  const chart7Data = useSelector((state: RootState) => state.chart.data7);

  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [isStacked, setIsStacked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Memoize chart transformation
  const chartData: RetailerChart[] = useMemo(() => {
    const retailers: { [key: string]: RetailerChart } = {};

    chart7Data.forEach((item) => {
      const retailer = item.Retailer;

      if (!retailers[retailer]) {
        retailers[retailer] = {
          Retailer: retailer,
          xAxisTitle: 'Products',
          yAxisTitle: 'TPR Avg',
          data: {
            categories: [],
            series: [{ name: 'TPR Avg', data: [], type: chartType }],
          },
        };
      }

      retailers[retailer].data.categories.push(item.Product);
      retailers[retailer].data.series[0].data.push(item.tpr_avg || 0);
    });

    return Object.values(retailers);
  }, [chart7Data, chartType]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return chartData.slice(start, start + itemsPerPage);
  }, [chartData, currentPage]);

  const selectedRetailerId6 = useAppSelector(
    (state: RootState) => state.filters.selectedRetailer6
  );
  const selectedBrandId6 = useAppSelector(
    (state: RootState) => state.filters.selectedBrand6
  );
  const selectedProductId6 = useAppSelector(
    (state: RootState) => state.filters.selectedProduct6
  );
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const filterPayload = {
    projectId,
    modelId,
    Product: selectedProductId6,
    Brand: selectedBrandId6,
    Retailer: selectedRetailerId6,
  };

  useEffect(() => {
    if (selectedRetailerId6) {
      dispatch(fetchChart6DataThunk(filterPayload));
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId6,
    selectedBrandId6,
    selectedRetailerId6,
    filterPayload
  ]);

  const getChartOptions = (data: RetailerChart): ApexCharts.ApexOptions => ({
    chart: {
      stacked: isStacked,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
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
      style: { fontSize: '16px' },
    },
    xaxis: {
      categories: data.data.categories,
      labels: {
        rotate: -45,
        style: { fontSize: '10px' },
        formatter: (value: string) => {
          if (!value) return '';
          return value.length > 15 ? value.substring(0, 12) + '...' : value;
        },
      },
      title: { text: data.xAxisTitle },
    },
    yaxis: {
      title: { text: data.yAxisTitle },
      labels: {
        formatter: (value: number) => Math.round(value).toString(),
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      floating: false,
      offsetY: 0,
      markers: {
        size: 12,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'straight',
      width: 2, // ✅ was 0 before, which caused invisibility
      colors: ['#2c99f4'],
    },
    markers: {
      size: chartType === 'line' ? 5 : 0,
      hover: { size: 6 },
    },
    colors: ['#2c99f4'],
    tooltip: {
      y: {
        formatter: (value: number) => `${Math.round(value)}%`,
      },
      x: {
        formatter: (_value: number, { dataPointIndex }: any) => {
          const label = data.data.categories?.[dataPointIndex];
          if (!label) return '';
          return label.length > 15 ? label.substring(0, 12) + '...' : label;
        },
      },
    },
  });

  return (
    <div>
      {paginatedData.map((data, index) => (
        <div key={index} style={{ marginBottom: '50px' }}>
          <ApexCharts
            options={getChartOptions(data)}
            series={data.data.series}
            type={chartType} // ✅ Ensure chart type is passed explicitly
            height={500}
            width="100%"
          />
        </div>
      ))}

      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '20px',
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(chartData.length / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(chartData.length / itemsPerPage)
                ? prev + 1
                : prev
            )
          }
          disabled={currentPage === Math.ceil(chartData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PromotionalLiftChart;
