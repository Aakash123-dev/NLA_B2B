'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchChart5DataThunk } from '@/store/slices/chartsSlices';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

dayjs.extend(isoWeek);

// Types
type ChartItem = {
  WeekEnding: string;
  Product: string;
  Retailer: string;
  Price: number;
  Total_Volume: number;
};

type GroupedItem = {
  totalPrice: number;
  totalUnits: number;
  count: number;
  Retailer: string;
};

type GroupedData = {
  [key: string]: {
    [weekEnding: string]: GroupedItem;
  };
};

type SeriesData = {
  name: string;
  data: number[];
};

type TransformedChart = {
  Retailer: string;
  Product: string;
  xAxisTitle: string;
  leftyAxisTitle: string;
  rightyAxisTitle: string;
  data: {
    categories: string[];
    series: SeriesData[];
  };
};

const MultiLine2: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  const chart5Data = useSelector((state: RootState) => state.chart.data5);
  console.log(chart5Data, "allChart5")

  const [isStacked, setIsStacked] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const transformedChartData = useMemo(() => {
    if (!chart5Data || chart5Data.length === 0) return [];

    const cleanedData: ChartItem[] = chart5Data.map((item: any) => ({
      Product: item.Product,
      Retailer: item.Retailer,
      WeekEnding: dayjs(item.WeekEnding, 'MM-DD-YY').format('YYYY-MM-DD'),
      Price: Number(item.Price || 0),
      Total_Volume: Number(item.Total_Volume || 0),
    }));

    const groupedData: GroupedData = {};
    cleanedData.forEach((item) => {
      const weekEnding = item.WeekEnding;
      const product = item.Product;
      const retailer = item.Retailer;
      const key = `${product}_${retailer}`;

      if (!groupedData[key]) groupedData[key] = {};
      if (!groupedData[key][weekEnding]) {
        groupedData[key][weekEnding] = {
          totalPrice: 0,
          totalUnits: 0,
          count: 0,
          Retailer: retailer,
        };
      }

      groupedData[key][weekEnding].totalPrice += item.Price;
      groupedData[key][weekEnding].totalUnits += item.Total_Volume;
      groupedData[key][weekEnding].count += 1;
    });

    const transformedData: TransformedChart[] = [];

    Object.keys(groupedData).forEach((key) => {
      const chart: TransformedChart = {
        Retailer: key.split('_')[1],
        Product: key.split('_')[0],
        xAxisTitle: 'Week-Year',
        leftyAxisTitle: 'Units',
        rightyAxisTitle: 'Price ($)',
        data: {
          categories: [],
          series: [
            { name: 'Units', data: [] },
            { name: 'Price', data: [] },
          ],
        },
      };

      Object.keys(groupedData[key]).forEach((weekYear) => {
        const { totalPrice, totalUnits, count } = groupedData[key][weekYear];
        const avgPrice = totalPrice / count;
        const avgUnits = totalUnits / count;

        chart.data.categories.push(weekYear);
        chart.data.series[0].data.push(avgUnits);
        chart.data.series[1].data.push(avgPrice);
      });

      transformedData.push(chart);
    });

    return transformedData;
  }, [chart5Data]);

  const getEvenIndexElements = (arr: string[]): string[] =>
    arr.map((item, i) => (i % 2 === 0 ? item : ''));

  const getChartOptions = (data: TransformedChart): ApexOptions => ({
    chart: {
      stacked: isStacked,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
          reset: true,
        },
      },
    },
    title: {
      text: `${data.Retailer} - ${data.Product}`,
      align: 'center',
      margin: 10,
      style: { fontSize: '14px' },
    },
    xaxis: {
      categories: getEvenIndexElements(data.data.categories),
      title: { text: data.xAxisTitle },
      axisBorder: { show: true, color: '#000' },
      axisTicks: { show: true, color: '#000', height: 6 },
      labels: {
        rotate: -45,
        style: { fontSize: '10px' },
      },
    },
    yaxis: [
      {
        title: { text: data.leftyAxisTitle },
        labels: {
          formatter: (value: number) =>
            value.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        },
        axisBorder: { show: true, color: '#000' },
      },
      {
        opposite: true,
        title: { text: data.rightyAxisTitle },
        labels: {
          formatter: (value: number) =>
            `$${value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value: number, { seriesIndex, w }: any): string {
          const seriesName = w.globals.seriesNames[seriesIndex];
          if (seriesName === 'Price') {
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            });
          } else {
            return value.toLocaleString('en-US', {
              maximumFractionDigits: 0,
            });
          }
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    dataLabels: { enabled: false },
    markers: {
      size: 3,
      hover: { size: 4 },
    },
    stroke: {
      curve: 'straight',
      width: 4,
      colors: ['#14532d', '#0ea5e9', '#ef4444', '#ea580c'],
    },
    grid: { show: false },
    colors: ['#14532d', '#0ea5e9', '#ef4444', '#ea580c'],
    series: data.data.series.map((series) => ({
      name: series.name,
      data: series.data,
    })),
  });

  const totalPages = Math.ceil(transformedChartData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleChartData = transformedChartData.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const selectedRetailerId4 = useAppSelector(
    (state: RootState) => state.filters.selectedRetailer4
  );
  const selectedBrandId4 = useAppSelector(
    (state: RootState) => state.filters.selectedBrand4
  );
  const selectedProductId4 = useAppSelector(
    (state: RootState) => state.filters.selectedProduct4
  );
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const filterPayload = {
    projectId,
    modelId,
    Product: selectedProductId4,
    Brand: selectedBrandId4,
    Retailer: selectedRetailerId4,
  };

  useEffect(() => {
    if (selectedRetailerId4) {
      dispatch(fetchChart5DataThunk(filterPayload));
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId4,
    selectedBrandId4,
    selectedRetailerId4,
  ]);

  if (!chart5Data || chart5Data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div>
      {visibleChartData.map((val, i) => (
        <div key={i} style={{ marginBottom: '40px' }}>
          <ApexCharts
            options={getChartOptions(val)}
            series={val.data.series}
            type={chartType}
            height={500}
            width="100%"
          />
        </div>
      ))}

      {transformedChartData.length > itemsPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              background: '#14532d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Prev
          </button>
          <span style={{ alignSelf: 'center' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              background: '#14532d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiLine2;
