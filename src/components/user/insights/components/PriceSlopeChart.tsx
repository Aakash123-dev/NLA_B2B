'use client';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Pagination from "./pagination/Pagination";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import {
  BarChart,
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
} from "echarts/components";
import {
  CanvasRenderer,
} from "echarts/renderers";
// import ChartSummary from './ChartSummary';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

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

const PriceSlopeChart: React.FC<{ isLoading?: boolean }> = ({ isLoading = false }) => {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const staticData: ChartItem[] = [
      {
        RetailerBrand: "Retailer A - Brand A",
        xAxisTitle: "Ounces(OZ)",
        yAxisTitle: "Price/OZ",
        data: {
          datasets: [
            {
              label: "Product A",
              data: [
                { x: 8, y: 1.5 },
                { x: 12, y: 1.7 },
                { x: 16, y: 1.8 },
              ],
              borderColor: "rgb(60,146,109)",
              backgroundColor: "rgba(60,146,109, 0.5)",
              pointRadius: 10,
              pointHoverRadius: 15,
            },
          ],
        },
      },
      {
        RetailerBrand: "Retailer B - Brand B",
        xAxisTitle: "Ounces(OZ)",
        yAxisTitle: "Price/OZ",
        data: {
          datasets: [
            {
              label: "Product B",
              data: [
                { x: 6, y: 2.0 },
                { x: 10, y: 2.3 },
              ],
              borderColor: "rgb(90,46,209)",
              backgroundColor: "rgba(90,46,209, 0.5)",
              pointRadius: 10,
              pointHoverRadius: 15,
            },
          ],
        },
      },
    ];

    setChartData(staticData);
  }, []);

  const paginate = (data: ChartItem[], currentPage: number, itemsPerPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const paginatedData = paginate(chartData, currentPage, itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getDataOption2 = (chartData: ChartItem) => {
    return {
      title: {
        text: `${chartData.RetailerBrand}`,
        left: "center",
        top: 0,
        textStyle: { fontSize: 16 },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          restore: { show: true },
          magicType: { type: ["line", "bar", "stack"] },
          dataView: { show: true },
          saveAsImage: { show: true },
        },
      },
      grid: {
        right: 100,
        containLabel: true,
      },
      xAxis: {
        type: "value",
        name: chartData.xAxisTitle,
        nameLocation: "middle",
        nameGap: 25,
        axisLabel: {
          formatter: (val: number) => val.toFixed(2) + " OZ",
        },
      },
      yAxis: {
        type: "value",
        name: chartData.yAxisTitle,
        nameLocation: "middle",
        nameGap: 40,
        axisLabel: {
          formatter: (val: number) => "$ " + val.toFixed(2),
        },
      },
      series: chartData.data.datasets.map((dataset) => ({
        name: dataset.label,
        data: dataset.data.map((point) => [point.x, point.y]),
        type: "line",
        symbolSize: 20,
        itemStyle: {
          borderColor: dataset.borderColor,
          backgroundColor: dataset.backgroundColor,
        },
      })),
    };
  };

  return (
    <div>
      {/* <ChartSummary chartData={chartData} chartType="chart2" /> */}
      <h6 style={{ textAlign: "center" }}>Price Slope chart</h6>
      <br />
      {paginatedData.map((val, i) => (
        <div id="chart" key={i} style={{ position: "relative" }}>
          <ReactECharts
            option={getDataOption2(val)}
            showLoading={isLoading}
            lazyUpdate={true}
            notMerge={true}
            style={{
              width: "100%",
              height: "500px",
              marginBottom: i !== paginatedData.length - 1 ? "50px" : "0",
            }}
          />
        </div>
      ))}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={chartData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default PriceSlopeChart;
