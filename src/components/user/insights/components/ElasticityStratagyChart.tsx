'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
// import Pagination from './pagination/Pagination';
// import ChartSummary from './ChartSummary';

type ChartPoint = {
  x: number;
  y: number;
};

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
  const [chartData, setChartData] = useState<RetailerChart[]>([]);

  // Static raw input data
  const rawData = [
    {
      Retailer: 'Retailer A',
      Product: 'Product 1',
      Base_Price_Elasticity: -1.5,
      Promo_Price_Elasticity: -2.3,
    },
    {
      Retailer: 'Retailer A',
      Product: 'Product 2',
      Base_Price_Elasticity: -0.8,
      Promo_Price_Elasticity: -1.9,
    },
    {
      Retailer: 'Retailer B',
      Product: 'Product 1',
      Base_Price_Elasticity: -1.2,
      Promo_Price_Elasticity: -0.7,
    },
    {
      Retailer: 'Retailer B',
      Product: 'Product 3',
      Base_Price_Elasticity: -2.4,
      Promo_Price_Elasticity: -2.1,
    },
    {
      Retailer: 'Retailer C',
      Product: 'Product 4',
      Base_Price_Elasticity: -3.5,
      Promo_Price_Elasticity: -3.0,
    },
    {
      Retailer: 'Retailer C',
      Product: 'Product 5',
      Base_Price_Elasticity: -1.1,
      Promo_Price_Elasticity: -2.8,
    },
  ];

  // Convert raw input data into structured chart data
  const transformData = (data: typeof rawData): RetailerChart[] => {
    const chartDataMap: Record<string, RetailerChart> = {};

    data.forEach((item) => {
      const retailer = item.Retailer;
      if (!chartDataMap[retailer]) {
        chartDataMap[retailer] = {
          Retailer: retailer,
          multiAxes: false,
          xycoordinated: false,
          xAxisTitle: 'Base Price Elasticity',
          yAxisTitle: 'Promo Price Elasticity',
          data: {
            datasets: [],
          },
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
  };

  useEffect(() => {
    const transformed = transformData(rawData);
    setChartData(transformed);
  }, []);

  const getDataOption = (chartData: RetailerChart) => {
    const datasets = chartData?.data?.datasets ?? [];

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
          const dataItem = dataset?.data[params.dataIndex];
          return `${dataset?.label}<br />Base Price Elasticity: ${dataItem.x.toFixed(
            2
          )}<br />Promo Price Elasticity: ${dataItem.y.toFixed(2)}`;
        },
      },
      xAxis: {
        type: 'value',
        name: chartData.xAxisTitle,
        inverse: true,
        min: -4,
        max: 0,
        axisLabel: {
          formatter: (value: number) => value.toFixed(2),
        },
        nameLocation: 'middle',
        nameGap: 25,
        nameTextStyle: { fontWeight: 'bold' },
        splitLine: { show: true },
      },
      yAxis: {
        type: 'value',
        name: chartData.yAxisTitle,
        inverse: true,
        min: -4,
        max: 0,
        axisLabel: {
          formatter: (value: number) => value.toFixed(2),
          rotate: 90,
          align: 'center',
        },
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: { fontWeight: 'bold' },
        splitLine: { show: true },
      },
      series: datasets.map((dataset) => ({
        name: dataset.label,
        type: 'scatter',
        data: dataset.data.map((d) => [d.x, d.y]),
        symbolSize: 20,
        itemStyle: {
          borderColor: dataset.borderColor,
          backgroundColor: dataset.backgroundColor,
        },
        emphasis: {
          focus: 'series',
        },
        markLine: {
          data: [{ xAxis: -2 }, { yAxis: -2 }],
          symbol: ['none', 'none'],
          lineStyle: {
            color: '#93969E',
            type: 'solid',
            width: 1,
          },
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

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;

  const paginate = (
    data: RetailerChart[],
    currentPage: number,
    itemsPerPage: number
  ) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const paginatedData = paginate(chartData, currentPage, itemsPerPage);

  return (
    <div>
      {/* <ChartSummary chartData={rawData} chartType="chart9" /> */}
      {paginatedData.map((chart, i) => (
        <ReactECharts
          key={i}
          option={getDataOption(chart)}
          showLoading={isLoading}
          style={{
            width: '100%',
            height: '500px',
            marginBottom: i !== paginatedData.length - 1 ? '50px' : '0',
          }}
          lazyUpdate
          notMerge
        />
      ))}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={chartData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      /> */}
    </div>
  );
};

export default ElasticityStratagyChart;
