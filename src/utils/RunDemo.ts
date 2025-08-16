'use client';
import { InsightType } from '@/components/user/insights';
import { RootState, useAppSelector } from '@/store';
import pptxgen from 'pptxgenjs';
import { toast } from 'sonner';
import Logo from '../assests/images/darkLogo.png';
import { colors } from './color';
import dayjs from 'dayjs';

// Type definitions for better type safety
interface ChartDataItem {
  Brand?: string;
  Retailer?: string;
  Product?: string;
  Price_avg_last_4_weeks?: number;
  Price_per_ounce?: number;
  Ounces?: string | number;
  Dollar_sales_last_52_weeks?: number;
  Base_Price_Elasticity?: number;
  Price?: number;
  Total_Volume?: number;
  WeekEnding?: string;
  Promo_Price_Elasticity?: number;
  Average_discount_depth?: number;
  tpr_avg?: number;
  fo_avg?: number;
  do_avg?: number;
  fd_avg?: number;
  [key: string]: any; // For dynamic properties
}

interface GroupedData {
  [key: string]: {
    name: string;
    labels: string[];
    values: (number | null)[];
  };
}

interface TransformedChartData {
  multiAxes: boolean;
  xycoordinated: boolean;
  quadrant: boolean;
  Retailer: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    datasets: Array<{
      label: string;
      data: Array<{ x: number; y: number }>;
      borderColor: string;
      backgroundColor: string;
      pointRadius: number;
      pointHoverRadius: number;
    }>;
  };
}

interface ProductChartData {
  labels: string[];
  dollarSales: number[];
  priceElasticity: number[];
}

interface ProductRetailerData {
  Retailer: string;
  Product: string;
  data: {
    labels: string[];
    units: number[];
    dollars: number[];
  };
}

interface RetailerData {
  Product: string[];
  Promo_Price_Elasticity: number[];
  Average_discount_depth: number[];
}

interface LiftChartData {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

interface ProfitCurveData {
  Retailer: string;
  multiAxes: boolean;
  xycoordinated: boolean;
  xAxisTitle: string;
  yAxisTitle: string;
  data: {
    datasets: Array<{
      label: string;
      data: Array<{ x: number; y: number }>;
      borderColor: string;
      backgroundColor: string;
      pointRadius: number;
      pointHoverRadius: number;
    }>;
  };
}

// Type for pptxgen with proper typing
interface PptxGenWithCharts {
  charts: {
    BAR: string;
    LINE: string;
    SCATTER: string;
    COMBO: string;
  };
  slides: any[];
  shapes: {
    RECTANGLE: string;
  };
  layout: string;
  defineSlideMaster: (options: any) => void;
  addSlide: (options: any) => any;
  writeFile: (options: any) => Promise<string>;
}

export const calculatePricePerOunce = (item: ChartDataItem): number => {
  // Priority: Use Price_per_ounce if available, otherwise calculate from Price_avg_last_4_weeks / Ounces
  if (item.Price_per_ounce !== undefined && item.Price_per_ounce !== null) {
    return parseFloat(item.Price_per_ounce.toString());
  } else if (
    item.Price_avg_last_4_weeks !== undefined &&
    item.Ounces !== undefined
  ) {
    return parseFloat(
      (item.Price_avg_last_4_weeks / parseFloat(item.Ounces.toString())).toFixed(2)
    );
  }
  return 0;
};

// Shared utility function for consistent X-axis calculation (Ounces)
export const extractOunces = (item: ChartDataItem): number => {
  if (item.Ounces !== undefined && item.Ounces !== null) {
    return parseFloat(item.Ounces.toString());
  }
  return 0;
};

// Helper to add common UI elements to each slide
export const generateCommonUIElements = (
  slide: any,
  value: InsightType,
  pptx: any,
  noteY = 6.4
): void => {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.19,
    y: 0.49,
    w: 13,
    h: 6.85,
    line: 'cccccc',
    fill: { color: 'ffffff' },
  });
  slide.addText(value.question || 'No question provided', {
    x: 0.2,
    y: 0.5,
    w: 13,
    h: 0.35,
    fontSize: 14,
    fill: { color: 'F3F9FA' },
  });
  slide.addText(value.name || '', {
    x: 0.2,
    y: 1,
    w: 12,
    h: 0.35,
    fontSize: 14,
    bold: true,
  });
  slide.addImage({
    x: 0.3,
    y: '85%',
    w: 1.2,
    h: 0.8,
    path: typeof Logo === 'string' ? Logo : Logo.src,
    objectName: 'Company Logo',
  });
  // Note: Removed Notes handling since InsightType doesn't have this property
};

// Download handler with brand/retailer logic for chart 1
export const RunDemo = async (
  value: InsightType,
  id: number,
  viewBy: string,
  setIsDownloading: (isDownloading: boolean) => void,
  chart1Data: ChartDataItem[],
  chart2Data: ChartDataItem[],
  chart3Data: ChartDataItem[],
  chart4Data: ChartDataItem[],
  chart5Data: ChartDataItem[],
  chart6Data: ChartDataItem[],
  chart7Data: ChartDataItem[],
  chart8Data: ChartDataItem[],
  chart9Data: ChartDataItem[]
): Promise<void> => {
  console.log(viewBy, 'ViewBy');
  try {
    setIsDownloading(true);

    let pptx = new pptxgen() as unknown as PptxGenWithCharts;
    pptx.layout = 'LAYOUT_WIDE';
    pptx.defineSlideMaster({
      title: 'PLACEHOLDER_SLIDE',
      background: { color: 'FFFFFF' },
      objects: [
        {
          rect: { x: 0, y: 0, w: '100%', h: 0.35, fill: { color: '174F73' } },
        },
        {
          text: {
            text: 'North Light Analytics Report',
            options: {
              x: 0,
              y: 0,
              w: 6,
              h: 0.35,
              fontSize: 15,
              color: 'FFFFFF',
            },
          },
        },
      ],
      slideNumber: { x: 13, y: 0, color: 'ffffff', fontSize: 15 },
    });

    let slide = pptx.addSlide({ masterName: 'PLACEHOLDER_SLIDE' });

    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.19,
      y: 0.49,
      w: 13,
      h: 6.85,
      line: 'cccccc',
      fill: {
        color: 'ffffff',
      },
    });

    // -- Chart 1: Brand/Retailer wise --
    if (id === 0 && (viewBy === 'Brand' || viewBy === 'Retailer')) {
      const data = chart1Data;
      if (viewBy === 'Brand') {
        const groupedData: { [key: string]: { [key: string]: GroupedData[string] } } = {};
        const brandProductMap: { [key: string]: Set<string> } = {};

        // First pass: collect all unique products per brand for consistent labels
        data.forEach((item) => {
          const brand = item.Brand;
          const product = item.Product;

          if (brand && product) {
            if (!brandProductMap[brand]) {
              brandProductMap[brand] = new Set();
            }
            brandProductMap[brand].add(product);
          }
        });

        // Group data by brand and retailer
        data.forEach((item) => {
          const brand = item.Brand;
          const retailer = item.Retailer;
          const product = item.Product;
          const price = item.Price_avg_last_4_weeks;

          if (brand && retailer && product && price !== undefined) {
            if (!groupedData[brand]) {
              groupedData[brand] = {};
            }

            if (!groupedData[brand][retailer]) {
              // Initialize with all products from this brand, with null values
              const allProducts = Array.from(brandProductMap[brand] || []);
              groupedData[brand][retailer] = {
                name: retailer,
                labels: allProducts,
                values: allProducts.map(() => null),
              };
            }

            // Find the index of this product and update its value
            const productIndex =
              groupedData[brand][retailer].labels.indexOf(product);
            if (productIndex !== -1) {
              groupedData[brand][retailer].values[productIndex] = price;
            }
          }
        });

        // Create slides for each brand
        Object.entries(groupedData).forEach(([brand, retailers], index) => {
          // Create new slide for each brand except first one
          if (index > 0) {
            pptx.layout = 'LAYOUT_WIDE';
            pptx.defineSlideMaster({
              title: 'PLACEHOLDER_SLIDE',
              background: { color: 'FFFFFF' },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: '100%',
                    h: 0.35,
                    fill: { color: '174F73' },
                  },
                },
                {
                  text: {
                    text: 'North Light Analytics Report',
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: 'FFFFFF',
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: 'ffffff',
                fontSize: 15,
              },
            });
            pptx.addSlide({ masterName: 'PLACEHOLDER_SLIDE' });
          }

          slide = pptx.slides[index];
          generateCommonUIElements(slide, value, pptx);

          const chartData = Object.values(retailers);
          console.log({ chartData });

          slide.addChart(pptx.charts.BAR, chartData, {
            x: 0.35,
            y: 1.0,
            w: '95%',
            h: 5.3,
            showGridlines: false,
            valGridLine: { color: 'cc6699', style: 'none', size: 1 },
            catAxisTitle: 'Product',
            catAxisLabelFontSize: 8,
            valAxisTitle: 'Price Mean ($)',
            showCatAxisTitle: true,
            showValAxisTitle: true,
            showLegend: true,
            legendPos: 't',
            title: brand,
            showTitle: true,
            titleFontSize: 14,
            titleColor: '000000',
            chartColors: colors,
            valAxisMajorUnit: 5,
          } as any);
        });
      } else {
        const retailers: { [key: string]: GroupedData[string] } = {};

        // First, collect all unique products
        const allProducts = new Set(data.map((item) => item.Product).filter((product): product is string => Boolean(product)));

        // Group data by retailer
        data.forEach((item) => {
          const retailer = item.Retailer;
          const product = item.Product;
          const price = item.Price_avg_last_4_weeks;

          if (retailer && product && price !== undefined) {
            if (!retailers[retailer]) {
              retailers[retailer] = {
                name: retailer,
                labels: Array.from(allProducts),
                values: Array(allProducts.size).fill(null),
              };
            }

            // Find the index of the product in the labels array
            const productIndex = retailers[retailer].labels.indexOf(product);
            if (productIndex !== -1) {
              retailers[retailer].values[productIndex] = price;
            }
          }
        });

        // Convert retailers object to array
        const chartData = Object.values(retailers);

        generateCommonUIElements(slide, value, pptx);
        slide.addChart(pptx.charts.BAR, chartData, {
          x: 0.35,
          y: 1.0,
          w: '95%',
          h: 5.3,
          showGridlines: false,
          valGridLine: { color: 'cc6699', style: 'none', size: 1 },
          catAxisTitle: 'Retailers',
          catAxisLabelFontSize: 8,
          valAxisTitle: 'Price Mean ($)',
          showCatAxisTitle: true,
          showValAxisTitle: true,
          showLegend: true,
          legendPos: 't',
          chartColors: colors,
          legendSymbol: 'circle',
          valAxisMajorUnit: 5,
        } as any);
      }
    } else {
      // -- Chart cases 1 to 8 --
      switch (id) {
        case 1: {
          // Chart 2: Price Slope (Scatter/Line)
          const data = chart2Data || [];
          const transformedData: { [key: string]: TransformedChartData } = {};

          // Iterate through the chart2Data and group it by Retailer
          if (data) {
            // console.log("PPT@C2:", chart2Data);
            data.forEach((item) => {
              const retailer = `${item.Retailer} - ${item.Brand}`;
              const product = item.Product;

              if (retailer && product) {
                // Extract the common part of the label before numeric values
                const match = product.match(/^(.*?)\d+\s*OZ/);
                if (match) {
                  const commonLabel = match[1];

                  // Check if the retailer key already exists in transformedData
                  if (!transformedData[retailer]) {
                    transformedData[retailer] = {
                      multiAxes: false,
                      xycoordinated: true,
                      quadrant: false,
                      Retailer: retailer,
                      xAxisTitle: 'Ounces(OZ)',
                      yAxisTitle: 'Price/OZ',
                      data: {
                        datasets: [],
                      },
                    };
                  }

                  // Check if the dataset label already exists in the retailer's datasets
                  const datasetIndex = transformedData[
                    retailer
                  ].data.datasets.findIndex(
                    (dataset) => dataset.label === commonLabel
                  );

                  if (datasetIndex === -1) {
                    // If the dataset doesn't exist, create it
                    transformedData[retailer].data.datasets.push({
                      label: commonLabel,
                      data: [
                        {
                          x: extractOunces(item), // Use shared function for consistent calculation
                          y: calculatePricePerOunce(item), // Use shared function for consistent calculation
                        },
                      ],
                      borderColor: getRandomColor(), // You can define this function to get random colors
                      backgroundColor: getRandomColor(),
                      pointRadius: 8,
                      pointHoverRadius: 20,
                    });
                  } else {
                    // If the dataset exists, push the data point to it
                    transformedData[retailer].data.datasets[datasetIndex].data.push(
                      {
                        x: extractOunces(item), // Use shared function for consistent calculation
                        y: calculatePricePerOunce(item), // Use shared function for consistent calculation
                      }
                    );
                  }
                }
              }
            });
          }
          function getRandomColor(): string {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }
          console.log({ transformedData });

          // Convert the object values into an array
          const formattedChartData = Object.values(transformedData);

          formattedChartData.forEach((retailer, index) => {
            // Create a new slide for each chart (except the first one)
            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }

            // Add chart to the slide
            const slide = pptx.slides[index];
            // Assuming you have a function to generate common UI elements
            generateCommonUIElements(slide, value, pptx, 6.4);
            console.log('PPtC2:', retailer);

            let labels: number[] = [];
            retailer.data.datasets.forEach((dataset) => {
              labels.push(
                ...dataset.data.map((point) => parseFloat(point.x.toFixed(2)))
              );
            });
            // Sort and get unique values
            labels = [...new Set(labels)].sort((a, b) => a - b);

            // Transform data to match web version - group points by series properly
            const datasets = retailer.data.datasets.map((dataset) => {
              // Create a map of x values to y values for this dataset
              const xyMap: { [key: number]: number } = {};
              dataset.data.forEach((point) => {
                const x = parseFloat(point.x.toFixed(2));
                const y = parseFloat(point.y.toFixed(2));
                xyMap[x] = y;
              });

              // Create yValues array matching the sorted labels order
              const yValues = labels.map((label) => xyMap[label] || null);
              console.log({ yValues, labels });

              return {
                name: dataset.label,
                labels: labels,
                values: yValues,
                symbolType: 'circle',
                symbolSize: 12,
                lineSize: 2,
              };
            });

            const chartOptions = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showGridlines: true,
              catAxisLabelColor: '494949',
              catAxisLabelFontFace: 'Arial',
              catAxisLabelFontSize: 10,
              catAxisOrientation: 'minMax' as const,
              showTitle: true,
              titleFontFace: 'Calibri Light',
              titleFontSize: 14,
              title: `${retailer.Retailer}`,
              catAxisTitle: 'Ounces(OZ)',
              valAxisTitle: 'Price/OZ',
              showCatAxisTitle: true,
              showValAxisTitle: true,
              // Fixed to match web version formatting exactly
              valAxisLabelFormatCode: '$ 0.00', // Changed from "$0.00" to match web "$ " + value.toFixed(2)
              catAxisLabelFormatCode: '0.00 " OZ"', // Changed to match web value.toFixed(2) + " OZ"
              showAxisColor: true,
              axisColor: '000000',
              catAxisLineShow: true,
              valAxisLineShow: true,
              plotArea: { fill: { color: 'FFFFFF' } },
              border: { pt: 1, color: '000000' },
              catGridLine: { style: 'solid', size: 1, color: 'DDDDDD' },
              valGridLine: { style: 'solid', size: 1, color: 'DDDDDD' },
              dataLabelFormatCode: '$ 0.00', // Fixed to match web version
              lineWidth: 2.5,
              showMarker: true,
              markerSize: 12,
              smooth: false,
            } as any;
            slide.addChart(pptx.charts.LINE, datasets, chartOptions);
          });
          break;
        }
        case 2: {
          // Chart 3: Multi-metric Combo Bar + Line (with secondaryAxis fix)
          const data = chart3Data || [];
          const productChartData: { [product: string]: any } = {};
          data.forEach((item) => {
            const product = item.Product;
            if (product) {
              if (!productChartData[product]) {
                productChartData[product] = {
                  labels: [],
                  dollarSales: [],
                  priceElasticity: [],
                };
              }
              productChartData[product].labels.push(item.Retailer || '');
              productChartData[product].dollarSales.push(
                item.Dollar_sales_last_52_weeks || 0
              );
              productChartData[product].priceElasticity.push(
                item.Base_Price_Elasticity || 0
              );
            }
          });

          Object.keys(productChartData).forEach((product, index) => {
            const productProps = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showGridlines: false,
              barDir: 'col',
              barGrouping: 'stacked',
              catAxisLabelColor: '494949',
              catAxisLabelFontFace: 'Arial',
              catAxisLabelFontSize: 10,
              catAxisOrientation: 'maxMin' as const,
              showLegend: true,
              legendPos: 't',
              showTitle: true,
              titleFontFace: 'Calibri Light',
              titleFontSize: 14,
              title: `${product}`,
              valAxes: [
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Sale Revenue (L52 weeks)',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  valGridLine: { style: 'none' },
                  valAxisOrientation: 'minMax' as const,
                  valAxisLabelFormatCode: '$#,##0',
                },
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Base Price Elasticity',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  valGridLine: { style: 'none' },
                  valAxisOrientation: 'maxMin' as const,
                },
              ],
              catAxes: [{ catAxisTitle: 'Retailer' }, { catAxisHidden: true }],
            };

            const productComboTypes = [
              {
                type: pptx.charts.BAR,
                data: [
                  {
                    name: 'Total Sales (last 52 weeks)',
                    labels: productChartData[product].labels,
                    values: productChartData[product].dollarSales,
                  },
                ],
                options: { chartColors: ['75BEFF'], barGrouping: 'stacked' },
              },
              {
                type: pptx.charts.LINE,
                data: [
                  {
                    name: 'Base Price Elasticity',
                    labels: productChartData[product].labels,
                    values: productChartData[product].priceElasticity,
                  },
                ],
                options: {
                  chartColors: ['FF6384'],
                  secondaryValAxis: true,
                  secondaryCatAxis: true,
                },
              },
            ];

            // Create a new slide for each chart (except the first one)
            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }

            slide = pptx.slides[index];
            // Generate common UI elements
            generateCommonUIElements(slide, value, pptx, 6.4);

            slide.addChart(productComboTypes, productProps);
          });
          break;
        }
        case 3: {
          // Chart 4: StackedLineChart (Volume/Dollar Impact) unchanged
          const chartData = chart4Data || [];
          const productRetailerMap: { [key: string]: ChartDataItem[] } = {};
          chartData.forEach((item) => {
            const product = item.Product;
            const retailer = item.Retailer;

            if (product && retailer) {
              // Create a key that includes both the product and retailer
              const key = `${product} - ${retailer}`;

              // Check if the key exists in the map; if not, create an array to store data
              if (!productRetailerMap[key]) {
                productRetailerMap[key] = [];
              }

              // Add the data to the array
              productRetailerMap[key].push(item);
            }
          });
          Object.keys(productRetailerMap).forEach((ddd, index) => {
            const productRetailer = ddd.split(' - ');
            console.log('productRetailer::: ', productRetailer);
            const productChartData = productRetailerMap[ddd];
            const chartProps = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showGridlines: false,
              catAxisLabelColor: '6E7079',
              catAxisLabelFontFace: 'Arial',
              catAxisLabelFontSize: 10,
              catAxisOrientation: 'minMax' as const,
              showLegend: true,
              legendPos: 't',
              showTitle: true,
              titleFontFace: 'Calibri Light',
              titleFontSize: 14,
              title: `${productRetailer[1]} - ${productRetailer[0]}`,
              chartColors: ['5C7BD9', '9FE080'],
              catAxisTitle: 'Price Change %',
              showCatAxisTitle: true,
              catAxisTitleColor: '6E7079',
              valAxes: [
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Volume/Dollar Impact (%)',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  valAxisOrientation: 'minMax' as const,
                  valGridLine: { style: 'none' },
                  valAxisLabelFormatCode: '#', // Show numbers as decimals since % is in axis title
                },
              ],
              catAxes: [{ catAxisTitle: 'Price Change %' }],
            } as any;

            // Extract unique change values from the data
            const uniqueChanges = Array.from(
              new Set(
                chartData.reduce((acc: string[], item: ChartDataItem) => {
                  const changes = Object.keys(item)
                    .filter((key) => key.endsWith('_BPE_Volume_Impact'))
                    .map((key) => key.replace('_BPE_Volume_Impact', ''));
                  return acc.concat(changes);
                }, [])
              )
            );

            // Map unique change values to their corresponding values
            const volumeLabels = uniqueChanges;
            const volumeValues = uniqueChanges.map((change) => {
              const correspondingValue = chartData.find((item) =>
                Object.keys(item).includes(`${change}_BPE_Volume_Impact`)
              );
              const value = correspondingValue
                ? parseFloat(correspondingValue[`${change}_BPE_Volume_Impact`])
                : null;
              // Convert to percentage for tooltip display (multiply by 100)
              return value !== null
                ? parseFloat((value * 100).toFixed(2))
                : null;
            });

            const volumeData = {
              name: 'Volume Impact',
              labels: volumeLabels,
              values: volumeValues,
              catAxisGroup: 1,
              // color: "5C7BD9",
              options: { chartColors: ['5C7BD9'] },
            };

            // Extract unique change values for Dollar Impact from the data
            const dollarChangeValues = Array.from(
              new Set(
                productChartData.reduce((acc: string[], item: ChartDataItem) => {
                  const changes = Object.keys(item)
                    .filter((key) => key.endsWith('_BPE_Dollar_Impact'))
                    .map((key) => key.replace('_BPE_Dollar_Impact', ''));
                  return acc.concat(changes);
                }, [])
              )
            );

            // Map unique change values to their corresponding values for Dollar Impact
            const dollarLabels = dollarChangeValues;
            const dollarValues = dollarChangeValues.map((change) => {
              const correspondingValue = productChartData.find((item) =>
                Object.keys(item).includes(`${change}_BPE_Dollar_Impact`)
              );
              const value = correspondingValue
                ? parseFloat(correspondingValue[`${change}_BPE_Dollar_Impact`])
                : null;
              // Convert to percentage for tooltip display (multiply by 100)
              return value !== null
                ? parseFloat((value * 100).toFixed(2))
                : null;
            });

            const dollarData = {
              name: 'Dollar Impact',
              labels: dollarLabels,
              values: dollarValues,
              catAxisGroup: 1,
              // color: "9FE080",
              options: { chartColors: ['9FE080'] },
            };

            const chartDataArray = [volumeData, dollarData];
            // console.log("chartDataArray::: ", chartDataArray);

            // Create a new slide for each chart except the first one
            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }

            slide = pptx.slides[index];
            generateCommonUIElements(slide, value, pptx);
            slide.addChart(pptx.charts.LINE, [volumeData, dollarData], {
              ...chartProps,
              chartColors: ['2c99f4', '40d68e'],
            });
          });
          break;
        }
        case 4: {
          // Chart 5: PromotedDepthChart unchanged
          const chartsData = chart5Data || [];
          const transformedData: { [key: string]: ProductRetailerData } = {};

          // Restructure the data
          chartsData.forEach((item) => {
            const product = item.Product;
            const retailer = item.Retailer;
            if (product && retailer) {
              const key = `${product} - ${retailer}`; // Create a unique key based on both Product and Retailer

              if (!transformedData[key]) {
                transformedData[key] = {
                  Retailer: item.Retailer || '',
                  Product: item.Product || '',
                  data: {
                    labels: [],
                    units: [],
                    dollars: [],
                  },
                };
              }

              // Add data to the "Units" and "Dollars" arrays
              const dollars = item.Price || 0;
              const units = item.Total_Volume || 0;
              const weekEnding = item.WeekEnding;

              if (weekEnding) {
                const weekLabel = dayjs(weekEnding).format('YYYY-[W]W');
                transformedData[key].data.labels.push(weekLabel);
                transformedData[key].data.units.push(units);
                transformedData[key].data.dollars.push(dollars);
              }
            }
          });
          Object.keys(transformedData).forEach((key, index) => {
            const chartData = transformedData[key];
            const retailer = chartData.Retailer;
            const product = chartData.Product;
            const labels = chartData.data.labels;
            const units = chartData.data.units;
            const dollars = chartData.data.dollars;

            const chartProps = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showGridlines: false,
              catAxisLabelColor: '6E7079',
              catAxisLabelFontFace: 'Arial',
              catAxisLabelFontSize: 10,
              catAxisOrientation: 'minMax' as const,
              showLegend: true,
              legendPos: 't',
              showTitle: true,
              titleFontFace: 'Calibri Light',
              titleFontSize: 14,
              title: `${retailer} - ${product}`, // Replace with your retailer and product names
              chartColors: ['14532d', '0ea5e9'],
              catAxisTitle: ' ',
              showCatAxisTitle: true,
              valAxes: [
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Units',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  valAxisOrientation: 'minMax' as const,
                  valGridLine: { style: 'none' },
                },
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Price ($)',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  valAxisOrientation: 'minMax' as const,
                  valGridLine: { style: 'none' },
                  valAxisLabelFormatCode: '$0.00',
                  // secondaryValAxis: true,
                },
              ],
              catAxes: [{ catAxisTitle: 'Weeks' }, { catAxisHidden: true }],
            } as any;

            const volumeData = {
              type: pptx.charts.LINE,
              data: [{ name: 'Units', labels: labels, values: units }],
              catAxisGroup: 1,
              options: { chartColors: ['14532d'] },
            };

            const dollarData = {
              type: pptx.charts.LINE,
              data: [{ name: 'Price', labels: labels, values: dollars }],
              catAxisGroup: 1,
              options: {
                chartColors: ['0ea5e9'],
                secondaryValAxis: true,
                secondaryCatAxis: true,
              },
            };
            const chartDataArray = [volumeData, dollarData];
            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }

            slide = pptx.slides[index];
            generateCommonUIElements(slide, value, pptx);
            slide.addChart(chartDataArray, chartProps);
          });
          break;
        }
        case 5: {
          // Chart 6: Promotional Lift (Bar + Line) with secondaryAxis fix
          const chartsData = chart6Data || [];
          const retailers: { [key: string]: RetailerData } = {};

          chartsData.forEach((item) => {
            const retailer = item.Retailer;

            if (retailer) {
              if (!retailers[retailer]) {
                retailers[retailer] = {
                  Product: [],
                  Promo_Price_Elasticity: [],
                  Average_discount_depth: [],
                };
              }

              retailers[retailer].Product.push(item.Product || '');
              retailers[retailer].Promo_Price_Elasticity.push(
                item.Promo_Price_Elasticity || 0
              );
              retailers[retailer].Average_discount_depth.push(
                item.Average_discount_depth || 0
              );
            }
          });

          Object.keys(retailers).forEach((retailer, index) => {
            const retailerData = retailers[retailer];

            const chartProps = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showGridlines: false,
              catAxisLabelColor: '494949',
              catAxisLabelFontFace: 'Arial',
              catAxisLabelFontSize: 10,
              catAxisOrientation: 'minMax' as const,
              showLegend: true,
              legendPos: 't',
              showTitle: true,
              titleFontFace: 'Calibri Light',
              titleFontSize: 14,
              title: `${retailer}`,
              chartColors: ['#2c99f4', '#fa518a', '#f9be56', '#b386e1'],
              valAxes: [
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Average Discount Depth',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  valGridLine: { style: 'none' },
                  valAxisLabelFormatCode: '0%',
                },
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Promo Price Elasticity',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  valAxisOrientation: 'maxMin' as const,
                  valGridLine: { style: 'none' },
                  secondaryValAxis: true,
                  valAxisLabelFormatCode: '0.00',
                },
              ],
              catAxes: [
                { catAxisTitle: 'Products', catAxisTickLabelPosition: 'low' },
                { catAxisHidden: true },
              ],
            } as any;

            const promoPriceElasticityData = {
              type: pptx.charts.BAR,
              data: [
                {
                  name: 'Promo Price Elasticity',
                  labels: retailerData.Product,
                  values: retailerData.Promo_Price_Elasticity,
                },
              ],
              catAxisGroup: 1,
              options: {
                chartColors: ['#2c99f4'],
                secondaryValAxis: true,
                secondaryCatAxis: true,
              },
            };

            const avgDiscountDepthData = {
              type: pptx.charts.LINE,
              data: [
                {
                  name: 'Average Discount Depth',
                  labels: retailerData.Product,
                  values: retailerData.Average_discount_depth.map((value) =>
                    (value / 100).toFixed(2)
                  ),
                },
              ],
              catAxisGroup: 1,
              options: {
                chartColors: ['#fa518a'],
              },
            };

            const chartDataArray = [
              avgDiscountDepthData,
              promoPriceElasticityData,
            ];

            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }

            slide = pptx.slides[index];
            generateCommonUIElements(slide, value, pptx);
            slide.addChart(chartDataArray, chartProps);
          });
          break;
        }
        case 6: {
          // Chart 7: LiftChart (Stacked Bar) unchanged
          const data = chart7Data || [];
          const retailers: { [key: string]: LiftChartData } = {};

          data.forEach((item) => {
            const retailer = item.Retailer;

            if (retailer) {
              if (!retailers[retailer]) {
                retailers[retailer] = {
                  data: {
                    labels: [],
                    datasets: [
                      {
                        label: 'TPR',
                        data: [],
                      },
                      {
                        label: 'Feature Only',
                        data: [],
                      },
                      {
                        label: 'Display Only',
                        data: [],
                      },
                      {
                        label: 'Feature and Display',
                        data: [],
                      },
                    ],
                  },
                };
              }

              retailers[retailer].data.labels.push(item.Product || '');
              retailers[retailer].data.datasets[0].data.push(item.tpr_avg || 0);
              retailers[retailer].data.datasets[1].data.push(item.fo_avg || 0);
              retailers[retailer].data.datasets[2].data.push(item.do_avg || 0);
              retailers[retailer].data.datasets[3].data.push(item.fd_avg || 0);
            }
          });

          Object.keys(retailers).forEach((retailer, index) => {
            const retailerData = retailers[retailer];

            // Define chart properties
            const chartProps = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showGridlines: false,
              catAxisLabelColor: '494949',
              catAxisLabelFontFace: 'Arial',
              catAxisLabelFontSize: 10,
              catAxisOrientation: 'minMax' as const,
              showLegend: true,
              legendPos: 't',
              showTitle: true,
              titleFontFace: 'Calibri Light',
              titleFontSize: 14,
              title: `${retailer}`,
              chartColors: ['#2c99f4', '#fa518a', '#f9be56', '#b386e1'],
              valAxes: [
                {
                  showValAxisTitle: true,
                  valAxisTitle: 'Promotional Lifts',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  // valAxisOrientation: "maxMin",
                  valGridLine: { style: 'none' },
                },
              ],
              catAxes: [{ catAxisTitle: 'Change' }],
            } as any;
            const chartDataArray = [
              {
                name: 'TPR',
                labels: retailerData.data.labels,
                values: retailerData.data.datasets[0].data,
              },
              {
                name: 'Feature Only',
                labels: retailerData.data.labels,
                values: retailerData.data.datasets[1].data,
              },
              {
                name: 'Display Only',
                labels: retailerData.data.labels,
                values: retailerData.data.datasets[2].data,
              },
              {
                name: 'Feature and Display',
                labels: retailerData.data.labels,
                values: retailerData.data.datasets[3].data,
              },
            ];
            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }

            slide = pptx.slides[index];
            generateCommonUIElements(slide, value, pptx);
            slide.addChart(pptx.charts.BAR, chartDataArray, chartProps);
          });
          break;
        }
        case 7: {
          // Chart 8: ElasticityStratagyChart (Line) unchanged
          const data = chart8Data || [];

          data.forEach((item, index) => {
            const transformedItem: {
              multiAxes: boolean;
              xycoordinated: boolean;
              quadrant: boolean;
              Retailer: string;
              Product: string;
              xAxisTitle: string;
              yAxisTitle: string;
              data: {
                labels: string[];
                datasets: Array<{
                  label: string;
                  data: number[];
                  borderColor: string;
                  backgroundColor: string;
                  pointStyle: string;
                  pointRadius: number;
                  pointHoverRadius: number;
                }>;
              };
            } = {
              multiAxes: false,
              xycoordinated: false,
              quadrant: false,
              Retailer: item.Retailer || '',
              Product: item.Product || '',
              xAxisTitle: '% Discount',
              yAxisTitle: '% Volume Lift',
              data: {
                labels: [],
                datasets: [],
              },
            };
            const chartProps = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showGridlines: false,
              catAxisLabelColor: '494949',
              catAxisLabelFontFace: 'Arial',
              catAxisLabelFontSize: 10,
              catAxisOrientation: 'minMax' as const,
              showLegend: true,
              legendPos: 't',
              showTitle: true,
              titleFontFace: 'Calibri Light',
              titleFontSize: 14,
              title: `${transformedItem.Retailer} - ${transformedItem.Product}`,
              chartColors: ['5C7BD9', '9FE080'],
              showCatAxisTitle: true,
              valAxes: [
                {
                  showValAxisTitle: true,
                  valAxisTitle: '% Volume Lift',
                  valAxisTitleColor: '6E7079',
                  valAxisLabelColor: '6E7079',
                  // valAxisOrientation: "maxMin",
                  valGridLine: { style: 'none' },
                },
              ],
              catAxes: [{ catAxisTitle: '% Discount' }],
            } as any;

            // Create a mapping to group datasets by label name
            const datasetMapping: { [key: string]: {
              label: string;
              data: number[];
              pointStyle: string;
            } } = {};

            // Iterate through the original data properties to dynamically populate labels and datasets
            for (const key in item) {
              if (key.includes('%_')) {
                const originalLabel = key.split('_')[1];
                const label = getRenamedLabel(originalLabel); // Get the renamed label
                const match = key.match(/\d+/);
                if (match) {
                  const percentage = parseFloat(match[0]); // Extract the numeric value before %

                  transformedItem.data.labels.push(`${percentage}%`); // Push the extracted percentage value
                  if (!datasetMapping[label]) {
                    datasetMapping[label] = {
                      label: label,
                      data: [],
                      pointStyle: getPointStyle(label),
                    };
                  }
                  datasetMapping[label].data.push((item as any)[key]);
                }
              }
            }

            // Add non-repetitive baseLabel data
            transformedItem.data.labels = [
              ...new Set(transformedItem.data.labels),
            ];

            // Populate datasets with grouped data
            for (const label in datasetMapping) {
              transformedItem.data.datasets.push({
                label: datasetMapping[label].label,
                data: datasetMapping[label].data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointStyle: datasetMapping[label].pointStyle,
                pointRadius: 10,
                pointHoverRadius: 15,
              });
            }

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

            // Function to determine point style based on label
            function getPointStyle(label: string): string {
              switch (label) {
                case 'Feature Only':
                  return 'triangle';
                case 'Display Only':
                  return 'rectRot';
                case 'Feature and Display':
                  return 'crossRot';
                case 'TPR':
                default:
                  return 'circle';
              }
            }

            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }
            const slide = pptx.slides[index];
            const chartDataArray = [
              {
                type: pptx.charts.LINE,
                data: transformedItem.data.datasets.map((dataset) => ({
                  name: dataset.label,
                  labels: transformedItem.data.labels,
                  values: dataset.data,
                })),
                options: {
                  title: `${transformedItem.Retailer} - ${transformedItem.Product}`,
                  chartColors: ['#5470C6', '#91CC75', '#FAC858', '#ee6666'],
                },
              },
            ];
            generateCommonUIElements(slide, value, pptx);
            slide.addChart(chartDataArray, chartProps);
          });
          break;
        }
        case 8: {
          // Chart 9: ProfitCurvesChart (Scatter) unchanged
          const data = chart9Data || [];
          const chartDataMap: { [key: string]: ProfitCurveData } = {};
          data?.forEach((item, index) => {
            const retailer = item.Retailer;
            if (retailer) {
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
                label: item.Product || '',
                data: [
                  {
                    x: item.Base_Price_Elasticity || 0,
                    y: item.Promo_Price_Elasticity || 0,
                  },
                ],
                borderColor: 'rgb(60,146,109)',
                backgroundColor: 'rgba(60,146,109, 0.5)',
                pointRadius: 15,
                pointHoverRadius: 20,
              });
            }
          });
          console.log('chartDataMap::: ', chartDataMap);
          const transformedChartData = Object.values(chartDataMap);

          transformedChartData.forEach((retailerData, index) => {
            const chartData: any[] = [];

            // First object with 'X-Axis' containing only x values
            chartData.push({
              name: 'X-Axis',
              values: retailerData?.data?.datasets
                ?.map((val) => {
                  return val.data.map((point) => point.x).flat();
                })
                .flat(),
            });

            // Subsequent objects with 'labels' and 'values' structure
            retailerData.data.datasets.forEach((val, index) => {
              const labels = retailerData?.data?.datasets
                .map((dataset) => dataset.data.map((point) => point.x))
                .flat();

              if (labels && labels.length > 0) {
                const values = new Array(labels.length).fill(null);
                values[index] = val.data[0]?.y;

                chartData.push({
                  name: val.label,
                  labels: labels,
                  values: values,
                });
              }
            });

            const chartProps = {
              x: 0.35,
              y: 1.0,
              w: '95%',
              h: 5.3,
              showValAxisTitle: true,
              lineSize: 0,
              catAxisTitle: 'Base Price Elasticity',
              catAxisTitleColor: '428442',
              catAxisTitleFontSize: 14,
              catAxisOrientation: 'maxMin' as const,
              catAxisMinVal: -4,
              catAxisMaxVal: 0,
              showCatAxisTitle: true,
              showLabel: true, // Must be set to true or labels will not be shown
              dataLabelPosition: 'b',
              valAxisMinVal: -4, // Set minimum value for y-axis
              valAxisMaxVal: 0, // Set maximum value for y-axis
              valAxisMajorUnit: 1,
              valAxisOrientation: 'maxMin' as const,
              //   catAxisTitle: "Product",
              valAxisTitle: 'Price Mean',
              //   showCatAxisTitle: true,
              //   showValAxisTitle: true,
            } as any;
            const combinedChartProps = { ...chartProps };
            if (index > 0) {
              pptx.layout = 'LAYOUT_WIDE';
              pptx.defineSlideMaster({
                title: 'PLACEHOLDER_SLIDE',
                background: {
                  color: 'FFFFFF',
                },
                objects: [
                  {
                    rect: {
                      x: 0,
                      y: 0,
                      w: '100%',
                      h: 0.35,
                      fill: {
                        color: '174F73',
                      },
                    },
                  },
                  {
                    text: {
                      text: 'North Light Analytics Report',
                      options: {
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 0.35,
                        fontSize: 15,
                        color: 'FFFFFF',
                      },
                    },
                  },
                ],
                slideNumber: {
                  x: 13,
                  y: 0,
                  color: 'ffffff',
                  fontSize: 15,
                },
              });
              pptx.addSlide({
                masterName: 'PLACEHOLDER_SLIDE',
              });
            }

            slide = pptx.slides[index];
            generateCommonUIElements(slide, value, pptx);
            slide.addChart(pptx.charts.SCATTER, chartData, combinedChartProps);
          });
          break;
        }
        default: {
          // fallback: do nothing
        }
      }
    }

    await pptx.writeFile({ fileName: `${value.question || 'chart'}.pptx` });

    // Use proper toast function call with sonner
    toast.success('Download Successful', {
      description: 'Professional chart presentation downloaded successfully.',
      duration: 3000,
    });
  } catch (e) {
    console.error('Error generating PPTX: ', e);
    // Use proper toast function call with sonner
    toast.error('Download Failed', {
      description: 'An error occurred while generating the presentation.',
      duration: 4000,
    });
  } finally {
    setIsDownloading(false);
  }
};
