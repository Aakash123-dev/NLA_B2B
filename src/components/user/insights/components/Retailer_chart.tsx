'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactApexCharts from 'react-apexcharts';
import { AppDispatch, RootState, useAppSelector } from '@/store';
import { fetchChartData } from '@/store/slices/chartsSlices';
import { useSearchParams } from 'next/navigation';

interface DataItem {
  Product: string;
  Retailer: string;
  Price_avg_last_4_weeks: number;
}

interface GroupedData {
  [key: string]: {
    label: string;
    data: { x: string; y: number }[];
    borderColor: string;
    backgroundColor: string;
  };
}

interface SeriesItem {
  name: string;
  type: string;
  data: number[];
}

const BarRetailor: React.FC = () => {
  const { data: chart1Reducer, loading } = useSelector(
    (state: RootState) => state.chart
  );

  const [sData, setSData] = useState<SeriesItem[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [isStacked, setIsStacked] = useState(false);
  const [retailerLabels, setRetailerLabels] = useState<string[]>([]);
  const [isChartLoaded, setIsChartLoaded] = useState(false);

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
    Product: selectedProductId,
    Brand: selectedBrandId,
    Retailer: selectedRetailerId,
  };

  // Fetch chart data on initial mount or filter change
  useEffect(() => {
    if (selectedRetailerId) {
      dispatch(fetchChartData(filterPayload));
      setIsChartLoaded(false); // Mark chart as needing reload
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId,
    selectedBrandId,
    selectedRetailerId,
  ]);

  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    return (
      '#' +
      Array.from(
        { length: 6 },
        () => letters[Math.floor(Math.random() * 16)]
      ).join('')
    );
  }

  // Memoize the grouped data to avoid recomputing
  const groupedData: GroupedData = useMemo(() => {
    if (!chart1Reducer || chart1Reducer.length === 0) return {};

    const result: GroupedData = {};
    chart1Reducer.forEach((item: DataItem) => {
      const product = item.Product;

      if (!result[product]) {
        result[product] = {
          label: product,
          data: [],
          borderColor: getRandomColor(),
          backgroundColor: getRandomColor(),
        };
      }

      result[product].data.push({
        y: item.Price_avg_last_4_weeks,
        x: item.Retailer,
      });
    });

    return result;
  }, [chart1Reducer]);

  // Convert groupedData to chart series whenever data or chartType changes
  useEffect(() => {
    if (!groupedData) return;

    const newData = Object.values(groupedData);

    const xLabels: string[] = Array.from(
      new Set(
        newData.flatMap((retailer) => retailer.data.map((item) => item.x))
      )
    );

    setRetailerLabels(xLabels);

    const seriesData: SeriesItem[] = newData.map((retailer) => {
      const data = xLabels.map((label) => {
        const point = retailer.data.find((item) => item.x === label);
        return point ? point.y : 0;
      });

      return {
        name: retailer.label,
        type: chartType,
        data,
      };
    });

    setSData(seriesData);
    setIsChartLoaded(true);
  }, [groupedData, chartType]);

  // Reset isChartLoaded when chart1Reducer changes (new data fetched)
  useEffect(() => {
    setIsChartLoaded(false);
  }, [chart1Reducer]);

  const chartData = {
    options: {
      chart: {
        height: 450,
        stacked: isStacked,
        toolbar: {
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [
              {
                icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M7 10 L13 10 L13 26 L11.4 26 L11.4 11.6 L8.6 11.6 L8.6 26 L7 26 Z"></path><path d="M15 19 L21 19 L21 26 L19.4 26 L19.4 20.6 L16.6 20.6 L16.6 26 L15 26 Z"></path><path d="M23 16 L29 16 L29 26 L27.4 26 L27.4 17.6 L24.6 17.6 L24.6 26 L23 26 Z"></path></svg>`,
                title: 'Switch to Bar Chart',
                class: 'custom-icon-bar',
                index: -1,
                click: () => {
                  setChartType('bar');
                  setIsChartLoaded(false);
                },
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 0,
      },
      xaxis: {
        categories: retailerLabels,
        labels: {
          rotate: -45,
          rotateAlways: true,
          formatter: (value: string) => {
            const maxLabelLength = 15;
            return value.length > maxLabelLength
              ? value.substring(0, maxLabelLength - 3) + '...'
              : value;
          },
          style: {
            fontSize: '10px',
          },
        },
        title: {
          text: 'Retailers',
          style: {
            fontWeight: 'bold',
          },
        },
        axisBorder: {
          show: true,
          color: '#000000',
        },
      },
      yaxis: {
        title: {
          text: 'Price Mean ($)',
          style: {
            fontWeight: 'bold',
          },
        },
        labels: {
          formatter: (value: number) => `$${value.toFixed(2)}`,
          style: {
            fontSize: '10px',
          },
        },
        axisBorder: {
          show: true,
          color: '#000000',
        },
      },
      fill: {
        opacity: 1,
        type: 'solid',
      },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        followCursor: true,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      noData: {
        text: 'No Data Available To Show',
        align: 'center' as const,
        verticalAlign: 'middle' as const,
        style: {
          fontSize: '14px',
        },
      },
      markers: {
        size: 4,
        hover: {
          size: 5,
        },
      },
    },
    series: sData,
  };

  return (
    <div>
      {loading || !chart1Reducer || chart1Reducer.length === 0 ? (
        <div>Loading or No Data Available</div>
      ) : (
        <div style={{ position: 'relative' }}>
          <ReactApexCharts
            options={chartData.options}
            series={chartData.series}
            type={chartType}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(BarRetailor);
