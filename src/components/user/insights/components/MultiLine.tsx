'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '@/store'; // make sure this path is correct for your project
import { fetchChart4DataThunk } from '@/store/slices/chartsSlices';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

// Dynamically load ApexCharts
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointStyle: string;
  pointRadius: number;
  pointHoverRadius: number;
}

interface ChartData {
  multiAxes: boolean;
  xycoordinated: boolean;
  quadrant: boolean;
  Retailer: string;
  Product: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    labels: string[];
    datasets: Dataset[];
  };
}

const StackedLineChart: React.FC = () => {
  const rawChartData = useSelector((state: RootState) => state.chart.data4); // from your Redux slice

  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [isStacked, setIsStacked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const labels = useMemo(
    () => [
      '-10%',
      '-8%',
      '-6%',
      '-4%',
      '-2%',
      '0%',
      '2%',
      '4%',
      '6%',
      '8%',
      '10%',
    ],
    []
  );

  // Transform raw data from Redux only when rawChartData changes
  const chartData: ChartData[] = useMemo(() => {
    if (!rawChartData) return [];

    return rawChartData.map((item: any) => {
      const volumeData = labels.map(
        (label) => item[`${label}_BPE_Volume_Impact`] ?? 0
      );
      const dollarData = labels.map(
        (label) => item[`${label}_BPE_Dollar_Impact`] ?? 0
      );

      return {
        multiAxes: false,
        xycoordinated: false,
        quadrant: true,
        Retailer: item.Retailer,
        Product: item.Product,
        xAxisTitle: 'Price Change %',
        yAxisTitle: 'Volume/Dollar Impact',
        data: {
          labels,
          datasets: [
            {
              label: '% Volume',
              data: volumeData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              pointStyle: 'circle',
              pointRadius: 8,
              pointHoverRadius: 15,
            },
            {
              label: '% Dollar',
              data: dollarData,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              pointStyle: 'triangle',
              pointRadius: 8,
              pointHoverRadius: 15,
            },
          ],
        },
      };
    });
  }, [rawChartData, labels]);

  const getApexOptions = (data: ChartData): ApexOptions => ({
    chart: {
      type: chartType,
      height: 450,
      stacked: isStacked,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          pan: true,
          reset: true,
          customIcons: [
            {
              icon: '<svg width="20" height="20" viewBox="0 0 24 24"><rect x="5" y="5" width="3" height="14"/><rect x="10.5" y="5" width="3" height="14"/><rect x="16" y="5" width="3" height="14"/></svg>',
              title: 'Switch to Bar Chart',
              class: 'custom-icon-bar',
              index: -1,
              click: () => setChartType('bar'),
            },
            {
              icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 16l4-4 4 4 4-8 4 8" stroke="black" fill="none"/></svg>',
              title: 'Switch to Line Chart',
              class: 'custom-icon-line',
              index: -1,
              click: () => setChartType('line'),
            },
          ],
        },
      },
    },
    title: {
      text: `${data.Retailer} - ${data.Product}`,
      align: 'center',
    },
    xaxis: {
      categories: data.data.labels,
      title: { text: data.xAxisTitle },
    },
    yaxis: {
      title: { text: `${data.yAxisTitle} (%)` },
      labels: {
        formatter: (val: number) => `${(val * 100).toFixed(2)}%`,
      },
    },
    annotations: {
      yaxis: [{ y: 0, borderColor: '#000000', strokeDashArray: 0 }],
    },
    series: data.data.datasets.map((d) => ({
      name: d.label,
      data: d.data,
    })),
    colors: ['#2c99f4', '#40d68e'],
    stroke: { curve: 'straight', width: 4 },
  });

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < chartData.length) setCurrentPage((prev) => prev + 1);
  };

  const currentChart = chartData[currentPage - 1];

  const selectedRetailerId3 = useAppSelector(
    (state: RootState) => state.filters.selectedRetailer3
  );
  const selectedBrandId3 = useAppSelector(
    (state: RootState) => state.filters.selectedBrand3
  );
  const selectedProductId3 = useAppSelector(
    (state: RootState) => state.filters.selectedProduct3
  );
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const filterPayload = {
    projectId,
    modelId,
    Product: selectedProductId3,
    Brand: selectedBrandId3,
    Retailer: selectedRetailerId3,
  };

  useEffect(() => {
    if (selectedRetailerId3) {
      dispatch(fetchChart4DataThunk(filterPayload));
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId3,
    selectedBrandId3,
    selectedRetailerId3,
    filterPayload
  ]);

  return (
    <div>
      {currentChart && (
        <ApexCharts
          options={getApexOptions(currentChart)}
          series={getApexOptions(currentChart).series}
          type={chartType}
          height={450}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '20px',
        }}
      >
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {chartData.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === chartData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StackedLineChart;
