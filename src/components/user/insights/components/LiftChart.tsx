'use client';

import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
// import Pagination from './pagination/Pagination';
// import ChartSummary from './ChartSummary';

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

// Static mock data
const mockChartData: RawDataItem[] = [
  {
    Retailer: 'Retailer A',
    Product: 'Product 1',
    '10%_TPR': 5,
    '20%_TPR': 12,
    '10%_FO': 8,
    '20%_FO': 15,
    '10%_DO': 6,
    '20%_DO': 10,
  },
  {
    Retailer: 'Retailer B',
    Product: 'Product 2',
    '10%_TPR': 7,
    '20%_TPR': 13,
    '10%_FD': 9,
    '20%_FD': 16,
  },
];

// Function to rename label names
function getRenamedLabel(originalLabel: string): string {
  switch (originalLabel) {
    case 'FO':
      return 'Feature Only';
    case 'DO':
      return 'Display Only';
    case 'FD':
      return 'Feature and Display';
    case 'TPR':
    default:
      return originalLabel;
  }
}

const LiftChart: React.FC = () => {
  const [isStacked, setIsStacked] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Transform static data
  const transformedData: TransformedItem[] = mockChartData.map((item) => {
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

    const seriesMapping: { [label: string]: TransformedSeries } = {};

    for (const key in item) {
      if (key.includes('%_')) {
        const [percent, originalLabel] = key.split('_');
        const label = getRenamedLabel(originalLabel);
        const percentage = percent.replace('%', '');

        transformedItem.data.categories.push(`${percentage}%`);

        if (!seriesMapping[label]) {
          seriesMapping[label] = {
            name: label,
            data: [],
          };
        }

        seriesMapping[label].data.push(Number(item[key]));
      }
    }

    transformedItem.data.series = Object.values(seriesMapping);
    return transformedItem;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleChartData = transformedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
      margin: 10,
      style: {
        fontSize: '14px',
      },
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
    markers: {
      size: 5,
      hover: { size: 6 },
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
      {/* <ChartSummary chartData={mockChartData} chartType="chart8" /> */}
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
      {/* <Pagination
        currentPage={currentPage}
        totalItems={transformedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default LiftChart;
