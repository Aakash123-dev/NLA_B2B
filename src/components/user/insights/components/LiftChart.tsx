'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '@/store';
import { fetchChart7DataThunk } from '@/store/slices/chartsSlices';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

// Types
type RawDataItem = {
  Retailer: string;
  Product: string;
  [key: string]: string | number;
};

type TransformedSeries = {
  name: string;
  data: number[];
};

type TransformedItem = {
  Retailer: string;
  Product: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    categories: string[];
    series: TransformedSeries[];
  };
};

const LiftChart: React.FC = () => {
  const [isStacked, setIsStacked] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const chart8Data = useSelector(
    (state: RootState) => state.chart.data8 || []
  ) as RawDataItem[];

  const transformedData = useMemo(() => {
    return chart8Data.map((item) => {
      const transformedItem: TransformedItem = {
        Retailer: item.Retailer,
        Product: item.Product,
        xAxisTitle: '% Discount',
        yAxisTitle: '% Volume Lift',
        data: {
          categories: [],
          series: [],
        },
      };

      const seriesMap: { [label: string]: TransformedSeries } = {};

      for (const key in item) {
        if (key.includes('%_')) {
          const [percent, originalLabel] = key.split('_');
          const label = originalLabel === 'TPR' ? 'TPR' : originalLabel;

          if (!seriesMap[label]) {
            seriesMap[label] = {
              name: label,
              data: [],
            };
          }

          transformedItem.data.categories.push(percent);
          seriesMap[label].data.push(Number(item[key]));
        }
      }

      transformedItem.data.series = Object.values(seriesMap);
      return transformedItem;
    });
  }, [chart8Data]);

  const visibleChartData = useMemo(
    () =>
      transformedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [transformedData, currentPage]
  );

  const selectedRetailerId7 = useAppSelector(
    (state: RootState) => state.filters.selectedRetailer7
  );
  const selectedBrandId7 = useAppSelector(
    (state: RootState) => state.filters.selectedBrand7
  );
  const selectedProductId7 = useAppSelector(
    (state: RootState) => state.filters.selectedProduct7
  );
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const filterPayload = {
    projectId,
    modelId,
    Product: selectedProductId7,
    Brand: selectedBrandId7,
    Retailer: selectedRetailerId7,
  };

  useEffect(() => {
    if (selectedRetailerId7) {
      dispatch(fetchChart7DataThunk(filterPayload));
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId7,
    selectedBrandId7,
    selectedRetailerId7,
  ]);

  const getChartOptions = (data: TransformedItem): ApexCharts.ApexOptions => ({
    chart: {
      stacked: isStacked,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [
            {
              icon: '<svg fill="#000" width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M7 10h6v16H11V12H8v14H7zM15 19h6v7h-2v-5h-3v5h-1zM23 16h6v10h-2V18h-3v8h-1z"/></svg>',
              title: 'Bar Chart',
              class: 'custom-icon-bar',
              index: -1,
              click: () => setChartType('bar'),
            },
            {
              icon: '<svg fill="#000" width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><polygon points="6,20 14,14 20,18 26,10 30,20 6,20" /></svg>',
              title: 'Line Chart',
              class: 'custom-icon-line',
              index: -1,
              click: () => setChartType('line'),
            },
            {
              icon: '<svg fill="#000" width="20px" height="20px" viewBox="0 0 24 24"><path d="M12 2L3 6v2l9 4 9-4V6l-9-4zm0 7l-9-4v10l9 4 9-4V5l-9 4z"/></svg>',
              title: isStacked ? 'Unstack' : 'Stack',
              class: 'custom-icon-stack',
              index: -1,
              click: () => setIsStacked((prev) => !prev),
            },
          ],
        },
      },
    },
    title: {
      text: `${data.Retailer} - ${data.Product}`,
      align: 'center',
      style: { fontSize: '14px' },
    },
    xaxis: {
      categories: data.data.categories,
      title: { text: data.xAxisTitle },
    },
    yaxis: {
      title: { text: data.yAxisTitle },
      labels: {
        formatter: (value) => `${value.toFixed(0)}%`,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `${value.toFixed(0)}%`,
      },
    },
    stroke: {
      curve: 'straight',
      width: 4,
      colors: ['#2c99f4', '#fa518a', '#f9be56', '#b386e1'],
    },
    colors: ['#2c99f4', '#fa518a', '#f9be56', '#b386e1'],
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      borderColor: '#e7e7e7',
    },
  });

  return (
    <div>
      {visibleChartData.map((data, index) => (
        <div key={index} style={{ marginBottom: '50px' }}>
          <ApexCharts
            options={getChartOptions(data)}
            series={data.data.series}
            type={chartType}
            height={400}
            width="100%"
          />
        </div>
      ))}

      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          marginTop: 20,
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of{' '}
          {Math.ceil(transformedData.length / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(transformedData.length / itemsPerPage)
              )
            )
          }
          disabled={
            currentPage === Math.ceil(transformedData.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LiftChart;
