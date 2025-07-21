'use client';

import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ProfitCurvesChartData } from '../../../../constants/chartData/data';

// Pagination component
const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: any) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span style={{ margin: '0 10px' }}>
        {`Page ${currentPage} of ${totalPages}`}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

const ProfitCurvesChart: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [isStacked, setIsStacked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const getOptions = (data: any): ApexOptions => {
    const {
      xAxisTitle,
      leftyAxisTitle,
      rightyAxisTitle,
      data: chartData,
    } = data;

    return {
      chart: {
        id: 'profit-curves-chart',
        type: chartType,
        stacked: isStacked,
        zoom: { enabled: false },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
            customIcons: [
              {
                icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5Z"/></svg>`,
                title: 'Switch to Bar Chart',
                class: 'custom-icon-bar',
                index: -1,
                click: () => setChartType('bar'),
              },
              {
                icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5Z"/></svg>`,
                title: 'Switch to Line Chart',
                class: 'custom-icon-line',
                index: -1,
                click: () => setChartType('line'),
              },
              {
                icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M19 8.04L12 4L5 8.04V9.77L12 13.81L19 9.77V8.04Z" fill="#000"/></svg>`,
                title: isStacked ? 'Tile' : 'Stack',
                class: 'custom-icon-stack',
                index: -1,
                click: () => setIsStacked(!isStacked),
              },
            ],
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      grid: {
        show: false,
        borderColor: '#e7e7e7',
      },
      xaxis: {
        categories: chartData.labels,
        title: { text: xAxisTitle },
        labels: {
          rotate: -45,
          style: { fontSize: '10px' },
        },
      },
      stroke: {
        curve: 'straight',
        width: 4,
      },
      markers: {
        size: 3,
        strokeColors: ['#0ea5e9', '#14532d'],
        strokeWidth: 1,
        shape: 'circle',
        fillOpacity: 1,
        hover: { size: 4 },
      },
      yaxis: [
        {
          title: { text: leftyAxisTitle },
          labels: {
            formatter: (value: number) => value.toLocaleString(),
          },
        },
        {
          opposite: true,
          title: { text: rightyAxisTitle },
          labels: {
            formatter: (value: number) => `$${value.toFixed(2)}`,
          },
        },
      ],
      colors: ['#2c99f4', '#40d68e'],
    };
  };

  const getSeries = (data: any) => {
    return data.data.datasets.map((ds: any) => ({
      name: ds.label,
      data: ds.data,
      type: chartType,
    }));
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = ProfitCurvesChartData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      {visibleData.map((val, i) => (
        <div
          key={i}
          style={{
            marginBottom: i !== visibleData.length - 1 ? '50px' : '0',
          }}
        >
          <ApexCharts
            options={getOptions(val)}
            series={getSeries(val)}
            type={chartType}
            height={500}
          />
        </div>
      ))}
      {ProfitCurvesChartData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={ProfitCurvesChartData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProfitCurvesChart;
