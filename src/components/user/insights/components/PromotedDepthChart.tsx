'use client';
import React, { useEffect, useMemo, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchChart6DataThunk } from '@/store/slices/chartsSlices';

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

const PromotedDepthChart: React.FC = () => {
  const [isStacked, setIsStacked] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [chartType2, setChartType2] = useState<'bar' | 'line'>('line');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // ✅ Access chart6 data from Redux
  const chart6Data = useSelector((state: RootState) => state.chart.data6);

  // ✅ Transform data using useMemo
  const restructuredData = useMemo(() => {
    const retailers: { [key: string]: RetailerChart } = {};

    chart6Data?.forEach((item) => {
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

    return Object.values(retailers);
  }, [chart6Data, chartType, chartType2]);

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
        formatter: function (_value: number, { dataPointIndex }: any) {
          return data.data.categories[dataPointIndex] || '';
        },
      },
      y: {
        formatter: (value: number) => value.toFixed(2),
      },
    },
    legend: {
      show: true,
      position: 'top' as const,
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
      shape: 'circle' as const,
      hover: { size: 6 },
    },
    stroke: {
      curve: 'straight' as const,
      width: 4,
    },
    colors: ['#eb974e', '#2c99f4'],
    grid: {
      show: false,
      borderColor: '#e7e7e7',
    },
  });

  const paginate = (
    data: RetailerChart[],
    currentPage: number,
    itemsPerPage: number
  ) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const paginatedData = paginate(restructuredData, currentPage, itemsPerPage);

  const selectedRetailerId5 = useAppSelector(
    (state: RootState) => state.filters.selectedRetailer5
  );
  const selectedBrandId5 = useAppSelector(
    (state: RootState) => state.filters.selectedBrand5
  );
  const selectedProductId5 = useAppSelector(
    (state: RootState) => state.filters.selectedProduct5
  );
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const filterPayload = {
    projectId,
    modelId,
    Product: selectedProductId5,
    Brand: selectedBrandId5,
    Retailer: selectedRetailerId5,
  };

  useEffect(() => {
    if (selectedRetailerId5) {
      dispatch(fetchChart6DataThunk(filterPayload));
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId5,
    selectedBrandId5,
    selectedRetailerId5,
  ]);

  return (
    <div>
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

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of{' '}
          {Math.ceil(restructuredData.length / itemsPerPage)}
        </span>
        <button
          disabled={
            currentPage === Math.ceil(restructuredData.length / itemsPerPage)
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PromotedDepthChart;
