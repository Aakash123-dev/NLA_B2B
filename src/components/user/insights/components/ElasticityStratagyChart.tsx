'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, useAppSelector } from '@/store';
import {
  fetchChart8DataThunk,
  fetchChart9DataThunk,
} from '@/store/slices/chartsSlices';
import { useSearchParams } from 'next/navigation';

type ChartPoint = { x: number; y: number };

type Dataset = {
  label: string;
  data: ChartPoint[];
  borderColor: string;
  backgroundColor: string;
  pointRadius: number;
  pointHoverRadius: number;
};

type RetailerChart = {
  Retailer: string;
  multiAxes: boolean;
  xycoordinated: boolean;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    datasets: Dataset[];
  };
};

const ElasticityStratagyChart: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data9, loading } = useSelector((state: RootState) => state.chart);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!data9 || data9.length === 0) {
      dispatch(fetchChart9DataThunk({ projectId: 762, modelId: 916 }));
    }
  }, [data9, dispatch]);

  const transformedData = useMemo(() => {
    const chartDataMap: Record<string, RetailerChart> = {};

    data9?.forEach((item: any) => {
      const retailer = item.Retailer;
      if (!chartDataMap[retailer]) {
        chartDataMap[retailer] = {
          Retailer: retailer,
          multiAxes: false,
          xycoordinated: false,
          xAxisTitle: 'Base Price Elasticity',
          yAxisTitle: 'Promo Price Elasticity',
          data: { datasets: [] },
        };
      }

      chartDataMap[retailer].data.datasets.push({
        label: item.Product,
        data: [
          { x: item.Base_Price_Elasticity, y: item.Promo_Price_Elasticity },
        ],
        borderColor: 'rgb(60,146,109)',
        backgroundColor: 'rgba(60,146,109, 0.5)',
        pointRadius: 15,
        pointHoverRadius: 20,
      });
    });

    return Object.values(chartDataMap);
  }, [data9]);

  const getDataOption = (chartData: RetailerChart) => {
    const datasets = chartData?.data?.datasets?.filter(Boolean) || [];

    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;

    datasets.forEach((dataset) => {
      dataset.data.forEach(({ x, y }) => {
        maxX = Math.max(maxX, x);
        minX = Math.min(minX, x);
        maxY = Math.max(maxY, y);
        minY = Math.min(minY, y);
      });
    });

    const absMax = Math.max(
      Math.abs(minX),
      Math.abs(maxX),
      Math.abs(minY),
      Math.abs(maxY)
    );
    const buffer = 0.1;
    const max = absMax + absMax * buffer;
    const min = -max;

    return {
      title: {
        text: chartData.Retailer,
        left: 'center',
        top: 0,
        textStyle: { fontSize: 16 },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const dataset = datasets[params.seriesIndex];
          const dataItem = dataset?.data?.[params.dataIndex];
          if (!dataItem) return '';
          return `${dataset.label}<br />Base Price Elasticity: ${dataItem.x.toFixed(2)}<br />Promo Price Elasticity: ${dataItem.y.toFixed(2)}`;
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: 'value',
        name: chartData.xAxisTitle,
        nameLocation: 'middle',
        nameGap: 25,
        inverse: true,
        min,
        max: 0,
        splitLine: { show: true },
        nameTextStyle: { fontWeight: 'bold' },
        axisLabel: { formatter: (val: number) => val.toFixed(2) },
      },
      yAxis: {
        type: 'value',
        name: chartData.yAxisTitle,
        nameLocation: 'middle',
        nameGap: 40,
        inverse: true,
        min,
        max: 0,
        splitLine: { show: true },
        nameTextStyle: { fontWeight: 'bold' },
        axisLabel: { rotate: 90, formatter: (val: number) => val.toFixed(2) },
      },
      series: datasets.map((dataset) => ({
        name: dataset.label,
        type: 'scatter',
        data: dataset.data.map(({ x, y }) => [x, y]),
        symbolSize: 20,
        itemStyle: {
          borderColor: dataset.borderColor,
          backgroundColor: dataset.backgroundColor,
        },
        emphasis: { focus: 'series' },
        markLine: {
          data: [{ xAxis: -2 }, { yAxis: -2 }],
          symbol: ['none', 'none'],
          lineStyle: { color: '#93969E', type: 'solid', width: 1 },
        },
      })),
      graphic: [
        {
          type: 'text',
          left: '14%',
          top: '14%',
          style: {
            text: 'Hi-Lo',
            fill: 'rgb(255, 205, 86)',
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        {
          type: 'text',
          right: '14%',
          top: '14%',
          style: {
            text: 'Price Disruptor',
            fill: 'rgb(75, 192, 192)',
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        {
          type: 'text',
          left: '14%',
          bottom: '18%',
          style: {
            text: 'Margin Builder',
            fill: 'rgb(153, 102, 255)',
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        {
          type: 'text',
          right: '14%',
          bottom: '18%',
          style: {
            text: 'EDLP',
            fill: 'rgb(54, 162, 235)',
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
      ],
    };
  };

  const selectedRetailerId8 = useAppSelector(
    (state: RootState) => state.filters.selectedRetailer8
  );
  const selectedBrandId8 = useAppSelector(
    (state: RootState) => state.filters.selectedBrand8
  );
  const selectedProductId8 = useAppSelector(
    (state: RootState) => state.filters.selectedProduct8
  );

  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const filterPayload = useMemo(() => ({
    projectId,
    modelId,
    Product: selectedProductId8,
    Brand: selectedBrandId8,
    Retailer: selectedRetailerId8,
  }), [projectId, modelId, selectedProductId8, selectedBrandId8, selectedRetailerId8]);

  useEffect(() => {
    if (selectedRetailerId8) {
      dispatch(fetchChart8DataThunk(filterPayload));
    }
  }, [
    dispatch,
    projectId,
    modelId,
    selectedProductId8,
    selectedBrandId8,
    selectedRetailerId8,
    filterPayload
  ]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return transformedData.slice(start, start + itemsPerPage);
  }, [transformedData, currentPage]);

  const totalPages = Math.ceil(transformedData.length / itemsPerPage);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {paginatedData.map((chart, i) => (
            <ReactECharts
              key={i}
              option={getDataOption(chart)}
              showLoading={isLoading}
              style={{ width: '100%', height: '500px', marginBottom: '50px' }}
              ref={chartRef}
              lazyUpdate
              notMerge
            />
          ))}

          {/* Custom Pagination Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
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
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ElasticityStratagyChart;
