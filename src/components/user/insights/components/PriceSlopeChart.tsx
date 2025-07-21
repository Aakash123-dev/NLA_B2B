'use client';

import React, { useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

// Utilities
const calculatePricePerOunce = (item: any): number => {
  if (item.Price_per_ounce != null) {
    return parseFloat(item.Price_per_ounce);
  } else if (item.Price_avg_last_4_weeks != null && item.Ounces != null) {
    const ounces = parseFloat(item.Ounces);
    return parseFloat((item.Price_avg_last_4_weeks / ounces).toFixed(2));
  }
  return 0;
};

const extractOunces = (item: any): number => {
  return item.Ounces ? parseFloat(item.Ounces) : 0;
};

const getProductLabel = (product: string): string => {
  const match = product.match(/^(.*?)\d+\s*OZ/);
  return match ? match[1].trim() : product;
};

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return {
    borderColor: `rgb(${r},${g},${b})`,
    backgroundColor: `rgba(${r},${g},${b}, 0.5)`,
  };
};

// Chart Types
interface DatasetPoint {
  x: number;
  y: number;
}

interface Dataset {
  label: string;
  data: DatasetPoint[];
  borderColor: string;
  backgroundColor: string;
  pointRadius: number;
  pointHoverRadius: number;
}

interface ChartItem {
  RetailerBrand: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    datasets: Dataset[];
  };
}

const PriceSlopeChart: React.FC = () => {
  const data2 = useSelector((state: RootState) => state.chart.data2);
  const isLoading = useSelector((state: RootState) => state.chart.loading);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 1;

  const chartData = useMemo<ChartItem[]>(() => {
    const groupedData: Record<string, ChartItem> = {};

    data2.forEach((item: any) => {
      const key = `${item.Retailer} - ${item.Brand}`;
      const ounces = extractOunces(item);
      const price = calculatePricePerOunce(item);
      const label = getProductLabel(item.Product);

      if (!groupedData[key]) {
        groupedData[key] = {
          RetailerBrand: key,
          xAxisTitle: 'Ounces (OZ)',
          yAxisTitle: 'Price / OZ',
          data: {
            datasets: [],
          },
        };
      }

      const existingDataset = groupedData[key].data.datasets.find(
        (d) => d.label === label
      );

      if (existingDataset) {
        existingDataset.data.push({ x: ounces, y: price });
      } else {
        const color = getRandomColor();
        groupedData[key].data.datasets.push({
          label,
          data: [{ x: ounces, y: price }],
          borderColor: color.borderColor,
          backgroundColor: color.backgroundColor,
          pointRadius: 10,
          pointHoverRadius: 15,
        });
      }
    });

    return Object.values(groupedData);
  }, [data2]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getDataOption2 = (chartData: ChartItem) => ({
    title: {
      text: `${chartData.RetailerBrand}`,
      left: 'center',
      top: 0,
      textStyle: { fontSize: 16 },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        return params
          .map((p) => {
            const [x, y] = p.data;
            return `
              <div>
                <span style="color:${p.color};">&#9679;</span>
                ${p.seriesName}<br/>
                Ounces: ${x}<br/>
                Price: $${y.toFixed(2)}
              </div>
            `;
          })
          .join('<br/>');
      },
      axisPointer: { type: 'shadow' },
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        restore: { show: true },
        magicType: { type: ['line', 'bar', 'stack'] },
        dataView: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      right: 100,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: chartData.xAxisTitle,
      nameLocation: 'middle',
      nameGap: 25,
      axisLabel: {
        formatter: (val: number) => `${val.toFixed(2)} OZ`,
      },
    },
    yAxis: {
      type: 'value',
      name: chartData.yAxisTitle,
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: {
        formatter: (val: number) => `$ ${val.toFixed(2)}`,
      },
    },
    series: chartData.data.datasets.map((dataset) => ({
      name: dataset.label,
      data: dataset.data.map((point) => [point.x, point.y]),
      type: 'line',
      symbolSize: 20,
      itemStyle: {
        borderColor: dataset.borderColor,
        color: dataset.backgroundColor,
      },
    })),
  });

  const paginatedData = chartData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h6 style={{ textAlign: 'center' }}>Price Slope chart</h6>
      <br />
      {paginatedData.map((val, i) => (
        <div id="chart" key={i} style={{ position: 'relative' }}>
          <ReactECharts
            option={getDataOption2(val)}
            showLoading={isLoading}
            lazyUpdate={true}
            notMerge={true}
            style={{
              width: '100%',
              height: '500px',
              marginBottom: i !== paginatedData.length - 1 ? '50px' : '0',
            }}
          />
        </div>
      ))}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(chartData.length / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= Math.ceil(chartData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PriceSlopeChart;
