'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  FinancialAnalysisSection,
  ProductConfigurationSection,
  PromotionAnalysisSection,
  EventConfigurationSection,
  PromotionResultsTableSection,
  SalesROIWidget,
  FinancialParametersSection,
  PromoOptimizationHeader,
} from './components';
import {
  SharedSmartInsightsDrawer,
  SimpleSmartInsightsDrawer,
} from '@/components/common';
import { axiosPythonInstance } from '@/services/projectservices/axiosInstance';
import pptxgen from 'pptxgenjs';
import { calculateFinancialResults, calculatePromotionalResults, getResult } from "@/utils/financialCalculations";
import { useDispatch, useSelector } from 'react-redux';
import { getPromoEventSimulation } from '@/store/slices/priceSimulationSlice';

// Debug: Check if functions are imported correctly
console.log('calculatePromotionalResults imported:', typeof calculatePromotionalResults);
console.log('calculateFinancialResults imported:', typeof calculateFinancialResults);
console.log('getResult imported:', typeof getResult);

// Local storage utilities for promo state management
const getStorageKey = (projectId: number, modelId: number) => {
  return `promo_optimization_state_${projectId}_${modelId}`;
};

const getStoredState = (projectId: number, modelId: number) => {
  const key = getStorageKey(projectId, modelId);
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

const saveState = (projectId: number, modelId: number, state: any) => {
  const key = getStorageKey(projectId, modelId);
  localStorage.setItem(key, JSON.stringify(state));
};

export function PromoOptimizationPage() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false);
  const [isGeneratingPPT, setIsGeneratingPPT] = useState(false);

  const [formData, setFormData] = useState({
    selectedRetailer: '',
    selectedBrand: '',
    selectedProduct: '',
    event: '',
    basePrice: 0,
    promoPrice: 0,
    discountPercent: 0,
    units: 0,
    tprACV: 0,
    displayOnlyACV: 0,
    featureOnlyACV: 0,
    featureDisplayACV: 0,
    listPrice: 0,
    spoilPerUnit: 0,
    edlpPerUnit: 0,
    promoPerUnit: 0,
    netPrice: 0,
    cogsPerUnit: 0,
    vcm: 0,
    fixedFees: 0,
    uploadedFile: null as File | null,
  });

  // Promo Event Simulation States
  const [promoEventPriceValues, setPromoEventPriceValues] = useState({
    promoPrice: '',
    discount: '',
    total_units_sum: '',
    promoPriceElasticity: '',
    basePrice: '',
    tprDist: '',
    foDist: '',
    doDist: '',
    fdDist: '',
    vcm: '',
    fixedFee: '',
    promoSpend: '',
    edlpSpend: '',
    listPrice: '',
    edlpPerUnitRate: '',
    promoPerUnitRate: '',
    spoils: '',
    cogs: '',
    originalBasePrice: '',
    originalTotalUnits: '',
    basePriceElasticity: '',
    product: '',
  });

  const [discount, setDiscount] = useState('');
  const [lift, setLift] = useState<any>({});
  const [units, setUnits] = useState<any>({});
  const [dollars, setDollars] = useState<any>({});
  const [promoEventChartData, setPromoEventChartData] = useState<any[]>([]);

  // Get Redux state
  const {
    promoData: promoSimulationData,
    promoLoading: isPriceSimulationLoading,
    promoError,
    promoMeta,
  } = useSelector((state: any) => state.priceSimulation);

  // Mock financial analysis data
  const mockFinancialResults = {
    mfrGrossRevenue: 245000,
    incrementalRevenue: 67500,
    spoils: 4500,
    tradeSpend: 32000,
    mfrNetRevenue: 208500,
    cogs: 125000,
    mfrGrossMarginUnpromoted: 95000,
    mfrGrossMarginUnpromotedPercent: 42.5,
    mfrGrossMargin: 120000,
    mfrGrossMarginPercent: 48.9,
    salesROI: 3.2,
    retailGrossRevenue: 245000,
    retailIncrementalRevenue: 67500,
    retailPromoMarginPercent: 28.5,
    retailEverydayMarginPercent: 35.2,
    retailProfit: 85750,
  };

  const searchParams = useSearchParams();
  const project_id = Number(searchParams.get('project'));
  const model_id = Number(searchParams.get('model'));

  const handleBackToHome = () => {
    // Get URL parameters and preserve them when going back
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');

    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);

    router.push(`/user/design-studio?${params.toString()}`);
  };

  const [retailerBrandProducts, setRetailerBrandProducts] = useState<{[key: string]: {[key: string]: string[]}}>({});
  const [selectedRetailer, setSelectedRetailer] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const retailers = Object.keys(retailerBrandProducts || {});
  let brands =
    selectedRetailer && retailerBrandProducts
      ? Object.keys(retailerBrandProducts[selectedRetailer] || {})
      : [];
  let products =
    selectedBrand && selectedRetailer && retailerBrandProducts
      ? retailerBrandProducts[selectedRetailer][selectedBrand] || []
      : [];

  /* -----start----- Promo Event handler -----start----- */
  const promoEventHandler = async (product: string) => {
    try {
      dispatch(
        getPromoEventSimulation({ 
          projectId: project_id, 
          modelId: model_id, 
          retailer: selectedRetailer, 
          product 
        })
      );
    } catch (error) {
      console.log('Error in fetching promo event simulation data: ', error);
    }
  };
  /* -----end----- Promo Event handler -----end----- */

  const handlePromoEventPriceInputChange = (event: any) => {
    const { name, value } = event.target;
    if (
      name === 'tprDist' ||
      name === 'doDist' ||
      name === 'foDist' ||
      name === 'fdDist'
    ) {
      if (Number(value) > 100) {
        setPromoEventPriceValues((prevInputValues) => ({
          ...prevInputValues,
          [name]: '100',
        }));
      } else {
        setPromoEventPriceValues((prevInputValues) => ({
          ...prevInputValues,
          [name]: value,
        }));
      }
    } else {
      setPromoEventPriceValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: value,
      }));
    }

    // On update of base price find difference between original base price and new base price
    if (name === 'basePrice') {
      const originalBasePrice = Number(promoEventPriceValues.originalBasePrice);
      const newBasePrice = Number(promoEventPriceValues.basePrice);
      const difference = (newBasePrice - originalBasePrice) / originalBasePrice;

      // Update the base price of the products
      const basePriceElasticity = Number(
        promoEventPriceValues.basePriceElasticity
      );
      const newLift = (1 + difference) ** basePriceElasticity - 1;

      const originalTotalUnits = Number(
        promoEventPriceValues.originalTotalUnits
      );
      const newUnits = (newLift + 1) * originalTotalUnits;

      // Update the total units of the products
      setPromoEventPriceValues((prevInputValues) => ({
        ...prevInputValues,
        total_units_sum: newUnits.toString(),
      }));
    }
  };

  // Effect to handle Redux promoMeta changes
  useEffect(() => {
    if (promoMeta && promoMeta.product) {
      setPromoEventPriceValues((prevInputValues) => ({
        ...prevInputValues,
        promoPriceElasticity: promoMeta.promoPriceElasticity || '',
        basePriceElasticity: promoMeta.basePriceElasticity || '',
        basePrice: promoMeta.basePrice || '',
        total_units_sum: promoMeta.total_units_sum || '',
        originalBasePrice: promoMeta.originalBasePrice || '',
        originalTotalUnits: promoMeta.originalTotalUnits || '',
        product: promoMeta.product || '',
      }));
    }
  }, [promoMeta]);

  useEffect(() => {
    const fetchRetailerBrandProductApiHandler = async () => {
      try {
        const api = `/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
        const response = await axiosPythonInstance.get(api);
        if (response.status === 200) {
          setRetailerBrandProducts(response?.data?.data);

          // After getting the data, restore the stored state
          const storedState = getStoredState(project_id, model_id);
          if (storedState) {
            console.log('Restoring stored state:', storedState);
            
            if (storedState.retailer) {
              setSelectedRetailer(storedState.retailer);
            }
            if (storedState.brand) {
              setSelectedBrand(storedState.brand);
            }
            if (storedState.product) {
              setSelectedProduct(storedState.product);
              // Trigger API call for promo and wait for it to complete
              try {
                await promoEventHandler(storedState.product);
              } catch (error) {
                console.log('Error in promoEventHandler during restore:', error);
              }
            }
            
            // Restore other state after a short delay to ensure promoSimulationData is loaded
            setTimeout(() => {
              if (storedState.priceValues) {
                setPromoEventPriceValues(storedState.priceValues);
              }
              if (storedState.lift) {
                setLift(storedState.lift);
              }
              if (storedState.units) {
                setUnits(storedState.units);
              }
              if (storedState.dollars) {
                setDollars(storedState.dollars);
              }
              if (storedState.discount) {
                setDiscount(storedState.discount);
              }
              if (storedState.promoEventChartData) {
                setPromoEventChartData(storedState.promoEventChartData);
              }
            }, 1000); // Wait 1 second for promoSimulationData to load
          }
        }
      } catch (error) {
        console.log('Error in fetching retailers', error);
      }
    };
    fetchRetailerBrandProductApiHandler();
  }, []);

  // Promo Event useEffect for calculations
  useEffect(() => {
    const basePrice = Number(promoEventPriceValues?.basePrice || 0);
    const promoPrice = Number(promoEventPriceValues?.promoPrice || 0);
    const totalUnits = Number(promoEventPriceValues?.total_units_sum || 0);
    const promoPriceElasticity = Number(
      promoEventPriceValues?.promoPriceElasticity || 0
    );
    const tprDist = Number(promoEventPriceValues?.tprDist || 0);
    const foDist = Number(promoEventPriceValues?.foDist || 0);
    const doDist = Number(promoEventPriceValues?.doDist || 0);
    const fdDist = Number(promoEventPriceValues?.fdDist || 0);

    // Get simulation data with fallbacks
    const simulationData = promoSimulationData?.[0] || {};
    const featureEffect = Number(simulationData?.Feature || 0);
    const displayEffect = Number(simulationData?.Display || 0);
    const featureAndDisplayEffect = Number(simulationData?.Feature_And_Display || 0);

    let discount =
      basePrice > 0 ? ((basePrice - promoPrice) * 100) / basePrice : 0;

    let lift = {
      tprLift:
        tprDist === 0
          ? 0
          : ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist,
      foLift:
        foDist === 0 || featureEffect === 0
          ? 0
          : ((1 + -discount / 100) **
              (promoPriceElasticity *
                Math.exp((featureEffect * foDist) / 100)) -
              1) *
              100 -
            ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist,
      doLift:
        doDist === 0 || displayEffect === 0
          ? 0
          : ((1 + -discount / 100) **
              (promoPriceElasticity *
                Math.exp((displayEffect * doDist) / 100)) -
              1) *
              100 -
            ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist,
      fdLift:
        fdDist === 0 || featureAndDisplayEffect === 0
          ? 0
          : ((1 + -discount / 100) **
              (promoPriceElasticity *
                Math.exp(
                  (featureAndDisplayEffect * fdDist) / 100
                )) -
              1) *
              100 -
            ((1 + -discount / 100) ** promoPriceElasticity - 1) * tprDist,
    };

    let units = {
      tprUnits: (lift?.tprLift / 100) * totalUnits,
      foUnits: (lift?.foLift / 100) * totalUnits,
      doUnits: (lift?.doLift / 100) * totalUnits,
      fdUnits: (lift?.fdLift / 100) * totalUnits,
    };

    let dollars = {
      tprDollars: units?.tprUnits * promoPrice,
      foDollars: units?.foUnits * promoPrice,
      doDollars: units?.doUnits * promoPrice,
      fdDollars: units?.fdUnits * promoPrice,
    };

    console.log('Calculating lift, units, dollars:', {
      lift,
      units,
      dollars,
      promoSimulationData: promoSimulationData?.length,
      simulationData
    });

    setDollars(dollars);
    setUnits(units);
    setLift(lift);
    setDiscount(discount.toString());

    setPromoEventChartData([
      {
        xAxisTitle: 'Promotion',
        leftyAxisTitle: 'Percent Lift',
        rightyAxisTitle: '',
        multiAxes: true,
        data: {
          labels: [
            'TPR',
            'Feature Only',
            'Display Only',
            'Feature and Display',
            'Event Incremental',
          ],
          datasets: [
            {
              label: 'TPR',
              data: lift ? [lift.tprLift.toFixed(2), 0, 0, 0, 0] : [0, 0, 0, 0, 0],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgb(75, 192, 192,0.5)',
              yAxisID: 'left-y-axis',
            },
            {
              label: 'Feature Only',
              data: lift ? [0, lift.foLift.toFixed(2), 0, 0, 0] : [0, 0, 0, 0, 0],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgb(255, 99, 132,0.5)',
              yAxisID: 'left-y-axis',
            },
            {
              label: 'Display Only',
              data: lift ? [0, 0, lift.doLift.toFixed(2), 0, 0] : [0, 0, 0, 0, 0],
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgb(54, 162, 235,0.5)',
              yAxisID: 'left-y-axis',
            },
            {
              label: 'Feature and Display',
              data: lift ? [0, 0, 0, lift.fdLift.toFixed(2), 0] : [0, 0, 0, 0, 0],
              borderColor: 'rgb(255, 205, 86)',
              backgroundColor: 'rgb(255, 205, 86,0.5)',
              yAxisID: 'left-y-axis',
            },
            {
              label: 'Event Incremental',
              data: lift
                ? [
                    0,
                    0,
                    0,
                    0,
                    (
                      lift.tprLift +
                      lift.foLift +
                      lift.doLift +
                      lift.fdLift
                    ).toFixed(2),
                  ]
                : [0, 0, 0, 0, 0],
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgb(153, 102, 255,0.5)',
              yAxisID: 'left-y-axis',
            },
          ],
        },
      },
    ]);
  }, [promoEventPriceValues, promoSimulationData]);

  // Add effect to save state when values change
  useEffect(() => {
    if (!retailerBrandProducts) return; // Don't save if data isn't loaded

    const currentState = getStoredState(project_id, model_id) || {};
    const state = {
      retailer: selectedRetailer || currentState.retailer,
      brand: selectedBrand || currentState.brand,
      product: selectedProduct || currentState.product,
      priceValues: Object.keys(promoEventPriceValues).some(
        (key) =>
          promoEventPriceValues[key as keyof typeof promoEventPriceValues]
      )
        ? promoEventPriceValues
        : currentState.priceValues || promoEventPriceValues,
      promoEventChartData: promoEventChartData.length > 0 ? promoEventChartData : currentState.promoEventChartData || [],
      lift: lift,
      units: units,
      dollars: dollars,
      discount: discount,
    };

    saveState(project_id, model_id, state);
  }, [
    retailerBrandProducts,
    selectedRetailer,
    selectedBrand,
    selectedProduct,
    promoEventPriceValues,
    promoEventChartData,
    lift,
    units,
    dollars,
    discount,
    project_id,
    model_id,
  ]);

  const handleRetailerChange = (value: string) => {
    setSelectedRetailer(value);
    setSelectedBrand('');
    setSelectedProduct('');
    setSelectedProducts([]);

    // Clear promo simulation data
    setPromoEventPriceValues({
      promoPrice: '',
      discount: '',
      total_units_sum: '',
      promoPriceElasticity: '',
      basePrice: '',
      tprDist: '',
      foDist: '',
      doDist: '',
      fdDist: '',
      vcm: '',
      fixedFee: '',
      promoSpend: '',
      edlpSpend: '',
      listPrice: '',
      edlpPerUnitRate: '',
      promoPerUnitRate: '',
      spoils: '',
      cogs: '',
      originalBasePrice: '',
      originalTotalUnits: '',
      basePriceElasticity: '',
      product: '',
    });
    setDiscount('');
    setLift({});
    setUnits({});
    setDollars({});
    setPromoEventChartData([]);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedProduct('');
    setSelectedProducts([]);

    // Clear promo simulation data
    setPromoEventPriceValues({
      promoPrice: '',
      discount: '',
      total_units_sum: '',
      promoPriceElasticity: '',
      basePrice: '',
      tprDist: '',
      foDist: '',
      doDist: '',
      fdDist: '',
      vcm: '',
      fixedFee: '',
      promoSpend: '',
      edlpSpend: '',
      listPrice: '',
      edlpPerUnitRate: '',
      promoPerUnitRate: '',
      spoils: '',
      cogs: '',
      originalBasePrice: '',
      originalTotalUnits: '',
      basePriceElasticity: '',
      product: '',
    });
    setDiscount('');
    setLift({});
    setUnits({});
    setDollars({});
    setPromoEventChartData([]);
  };

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);

    if (value) {
      promoEventHandler(value);
    }
  };

  const handleSelectionChange = (field: string, selection: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selection,
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateCommonUIElements = (slide: any, title: string, pptx: any) => {
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.19,
        y: 0.49,
        w: 13,
        h: 6.85,
        line: "cccccc",
        fill: {
            color: "ffffff",
        },
    });

    // Add title
    slide.addText(title, {
        x: 0.2,
        y: 0.5,
        w: 13,
        h: 0.35,
        fontSize: 14,
        fill: {
            color: "F3F9FA",
        },
    });

    // Add logos
    slide.addImage({
        x: 0.3,
        y: "85%",
        w: 1.4,
        h: 0.9,
        // path: Logo,
        objectName: "Company Logo",
    });
};

  const generatePromoPPT = async () => {
    setIsGeneratingPPT(true);
    try {
        // Check if calculatePromotionalResults is available
        if (typeof calculatePromotionalResults !== 'function') {
            throw new Error('calculatePromotionalResults function is not available');
        }

        // Create a new presentation
        let pptx = new pptxgen();
        pptx.layout = "LAYOUT_WIDE";

        // Add master slide
        pptx.defineSlideMaster({
            title: "PLACEHOLDER_SLIDE",
            background: { color: "FFFFFF" },
            objects: [
                {
                    rect: {
                        x: 0, y: 0, w: "100%", h: 0.35,
                        fill: { color: "174F73" }
                    }
                },
                {
                    text: {
                        text: "Promotion Event Simulation",
                        options: {
                            x: 0, y: 0, w: 6, h: 0.35,
                            fontSize: 15, color: "FFFFFF"
                        }
                    }
                }
            ],
            slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
        });

        // SLIDE 1: Chart
        let slide1 = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });
        generateCommonUIElements(slide1, `Promotion Event Simulation - Chart`, pptx);

        // Calculate promotional results for chart data
        let chartPromotionalResults;
        try {
            chartPromotionalResults = calculatePromotionalResults({
                basePrice: Number(promoEventPriceValues.basePrice || 0),
                promoPrice: Number(promoEventPriceValues.promoPrice || 0),
                tprDist: Number(promoEventPriceValues.tprDist || 0),
                foDist: Number(promoEventPriceValues.foDist || 0),
                doDist: Number(promoEventPriceValues.doDist || 0),
                fdDist: Number(promoEventPriceValues.fdDist || 0),
                totalUnits: Number(promoEventPriceValues.total_units_sum || 0),
                promoPriceElasticity: Number(promoEventPriceValues.promoPriceElasticity || 0),
                featureEffect: Number(promoSimulationData[0]?.Feature || 0),
                displayEffect: Number(promoSimulationData[0]?.Display || 0),
                featureAndDisplayEffect: Number(promoSimulationData[0]?.Feature_And_Display || 0)
            });
        } catch (error) {
            console.error('Error calling calculatePromotionalResults:', error);
            throw new Error(`Failed to calculate promotional results: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        const chartTprResult = chartPromotionalResults.find(result => result.promotion === 'TPR');
        const chartFoResult = chartPromotionalResults.find(result => result.promotion === 'Feature Only');
        const chartDoResult = chartPromotionalResults.find(result => result.promotion === 'Display Only');
        const chartFdResult = chartPromotionalResults.find(result => result.promotion === 'Feature and Display');
        const chartEventIncrementalResult = chartPromotionalResults.find(result => result.promotion === 'Event Incremental');

        // Use calculated promotional results for chart data
        const chartLabels = ["TPR", "Feature Only", "Display Only", "Feature and Display", "Event Incremental"];

        // Get lift values from calculated results
        const chartValues = [
            chartTprResult ? parseFloat(chartTprResult.lift.toFixed(2)) : 0,
            chartFoResult ? parseFloat(chartFoResult.lift.toFixed(2)) : 0,
            chartDoResult ? parseFloat(chartDoResult.lift.toFixed(2)) : 0,
            chartFdResult ? parseFloat(chartFdResult.lift.toFixed(2)) : 0,
            chartEventIncrementalResult ? parseFloat(chartEventIncrementalResult.lift.toFixed(2)) : 0
        ];

        // Use exact colors from the web UI
        const chartColors = ['4472C4', '70AD47', 'FFC000', 'ED7D31', '4BACC6'];

        // Create bar chart data structure that matches the web display
        const chartData = [{
            name: 'Percent Lift',
            labels: chartLabels,
            values: chartValues
        }];

        // Calculate appropriate max value for Y axis based on data
        const maxLiftValue = Math.max(...chartValues);
        const yAxisMax = Math.ceil(maxLiftValue / 50) * 50;
        const yAxisInterval = Math.ceil(yAxisMax / 5 / 10) * 10;

        // Add chart to slide with formatting to match the web version
        slide1.addChart((pptx as any).charts.BAR, chartData, {
            x: 0.35,
            y: 1.0,
            w: 12,
            h: 5.5,
            chartColors: chartColors,
            barDir: 'col',
            showLegend: true,
            legendPos: 't',
            legendFontSize: 10,
            dataLabelFontSize: 10,
            showTitle: false,
            showValue: true,
            dataLabelPosition: 't', // position labels on top of bars
            dataLabelFormatCode: '#,##0.00"%"',
            catAxisTitle: "Promotion",
            valAxisTitle: "Percent Lift",
            valAxisMinVal: 0,
            valAxisMaxVal: yAxisMax,
            valAxisMajorUnit: yAxisInterval,
            valGridLine: { style: "solid", color: "CCCCCC" },
            catGridLine: { style: "none" },
            // dataLabels: true, // Removed due to type incompatibility
            // yAxisLabelPos: 'low', // Removed due to type incompatibility
            // yAxisLabelFontSize: 10, // Removed due to type incompatibility
            valAxisLabelFormatCode: '0"%"' // Add percentage symbol to Y-axis labels
        });

        // SLIDE 2: Promotion Details
        let slide2 = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });
        generateCommonUIElements(slide2, `Promotion Details - ${selectedProduct || "No Product Selected"}`, pptx);

        // Calculate promotional results using the same logic as Calendar TPO
        let promotionalResults;
        try {
            promotionalResults = calculatePromotionalResults({
                basePrice: Number(promoEventPriceValues.basePrice || 0),
                promoPrice: Number(promoEventPriceValues.promoPrice || 0),
                tprDist: Number(promoEventPriceValues.tprDist || 0),
                foDist: Number(promoEventPriceValues.foDist || 0),
                doDist: Number(promoEventPriceValues.doDist || 0),
                fdDist: Number(promoEventPriceValues.fdDist || 0),
                totalUnits: Number(promoEventPriceValues.total_units_sum || 0),
                promoPriceElasticity: Number(promoEventPriceValues.promoPriceElasticity || 0),
                featureEffect: Number(promoSimulationData[0]?.Feature || 0),
                displayEffect: Number(promoSimulationData[0]?.Display || 0),
                featureAndDisplayEffect: Number(promoSimulationData[0]?.Feature_And_Display || 0)
            });
        } catch (error) {
            console.error('Error calling calculatePromotionalResults (second call):', error);
            throw new Error(`Failed to calculate promotional results: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        // Extract results for table display
        const tprResult = promotionalResults.find(result => result.promotion === 'TPR');
        const foResult = promotionalResults.find(result => result.promotion === 'Feature Only');
        const doResult = promotionalResults.find(result => result.promotion === 'Display Only');
        const fdResult = promotionalResults.find(result => result.promotion === 'Feature and Display');
        const eventIncrementalResult = promotionalResults.find(result => result.promotion === 'Event Incremental');
        const eventTotalResult = promotionalResults.find(result => result.promotion === 'Event Total');

        // Add event input data box as shown in the image
        slide2.addShape((pptx as any).shapes.RECTANGLE, {
            x: 0.35,
            y: 1.0,
            w: 12,
            h: 1.8,
            line: { color: "cccccc", width: 1 },
            fill: { color: "F7F7F7" }
        });

        // Add Event header
        slide2.addShape((pptx as any).shapes.RECTANGLE, {
            x: 0.35,
            y: 1.0,
            w: 12,
            h: 0.4,
            line: { color: "cccccc", width: 1 },
            fill: { color: "174F73" }
        });

        slide2.addText("Event", {
            x: 0.35,
            y: 1.0,
            w: 12,
            h: 0.4,
            fontSize: 12,
            color: "FFFFFF",
            bold: true,
            align: "center",
            valign: "middle"
        });

        // Add event input fields (using actual values from state)
        const inputFieldsData = [
            { label: "Base Price", value: promoEventPriceValues.basePrice ? `$${Number(promoEventPriceValues.basePrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-" },
            { label: "Promo Price", value: promoEventPriceValues.promoPrice ? `$${Number(promoEventPriceValues.promoPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-" },
            { label: "Discount %", value: discount ? `${Number(discount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-" },
            { label: "Units", value: promoEventPriceValues.total_units_sum ? Number(promoEventPriceValues.total_units_sum).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-" },
            { label: "% TPR ACV", value: promoEventPriceValues.tprDist ? `${promoEventPriceValues.tprDist}%` : "-" },
            { label: "% Display Only ACV", value: promoEventPriceValues.doDist ? `${promoEventPriceValues.doDist}%` : "-" },
            { label: "% Feature Only ACV", value: promoEventPriceValues.foDist ? `${promoEventPriceValues.foDist}%` : "-" },
            { label: "% Feature and Display ACV", value: promoEventPriceValues.fdDist ? `${promoEventPriceValues.fdDist}%` : "-" }
        ];

        // Create a 2-column layout for input fields
        const fieldRows = Math.ceil(inputFieldsData.length / 2);

        inputFieldsData.forEach((field, index) => {
            const isLeftColumn = index < fieldRows;
            const xPos = isLeftColumn ? 0.85 : 6.85;
            const yPos = 1.5 + (isLeftColumn ? index * 0.3 : (index - fieldRows) * 0.3);

            // Label
            slide2.addText(field.label, {
                x: xPos,
                y: yPos,
                w: 2.5,
                h: 0.25,
                fontSize: 10,
                bold: true
            });

            // Value
            slide2.addText(field.value, {
                x: xPos + 2.5,
                y: yPos,
                w: 2.5,
                h: 0.25,
                fontSize: 10
            });
        });

        // Add promotion details table with calculated promotional results
        const promoTableData = [
            [
                { text: "Promotion", options: { bold: true, fill: { color: "f2f2f2" } } },
                { text: "% ACV", options: { bold: true, fill: { color: "f2f2f2" } } },
                { text: "% Lift", options: { bold: true, fill: { color: "f2f2f2" } } },
                { text: "Units", options: { bold: true, fill: { color: "f2f2f2" } } },
                { text: "Dollars", options: { bold: true, fill: { color: "f2f2f2" } } }
            ],
            [
                { text: "TPR" },
                { text: tprResult ? `${tprResult.acv}%` : "-" },
                { text: tprResult ? `${tprResult.lift.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-" },
                { text: tprResult ? tprResult.units.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-" },
                { text: tprResult ? `$${tprResult.dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-" }
            ],
            [
                { text: "Feature Only" },
                { text: foResult ? `${foResult.acv}%` : "-" },
                { text: foResult ? `${foResult.lift.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-" },
                { text: foResult ? foResult.units.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-" },
                { text: foResult ? `$${foResult.dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-" }
            ],
            [
                { text: "Display Only" },
                { text: doResult ? `${doResult.acv}%` : "-" },
                { text: doResult ? `${doResult.lift.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-" },
                { text: doResult ? doResult.units.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-" },
                { text: doResult ? `$${doResult.dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-" }
            ],
            [
                { text: "Feature and Display" },
                { text: fdResult ? `${fdResult.acv}%` : "-" },
                { text: fdResult ? `${fdResult.lift.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-" },
                { text: fdResult ? fdResult.units.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-" },
                { text: fdResult ? `$${fdResult.dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-" }
            ],
            [
                { text: "Event Incremental" },
                { text: "-" },
                { text: eventIncrementalResult ? `${eventIncrementalResult.lift.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-" },
                { text: eventIncrementalResult ? eventIncrementalResult.units.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-" },
                { text: eventIncrementalResult ? `$${eventIncrementalResult.dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-" }
            ],
            [
                { text: "Event Total" },
                { text: "-" },
                { text: eventTotalResult ? `${(eventTotalResult.lift - 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-" },
                { text: eventTotalResult ? eventTotalResult.units.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-" },
                { text: eventTotalResult ? `$${eventTotalResult.dollars.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-" }
            ]
        ];

        slide2.addTable(promoTableData, {
            x: 0.35,
            y: 3.0,
            w: 12,
            colW: [3, 2.25, 2.25, 2.25, 2.25],
            fontSize: 12,
            border: { pt: 1, color: "cccccc" },
            align: "center"
        });

        // SLIDE 3: Financial Analysis
        let slide3 = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });
        generateCommonUIElements(slide3, `Financial Analysis`, pptx);

        // Helper function to safely parse numeric values, treating empty/null as 0
        const safeParseFloat = (value: any) => {
            if (!value || value === "" || value === null) return 0;
            const parsed = parseFloat(value.toString()?.replace(/,/g, ''));
            return isNaN(parsed) ? 0 : parsed;
        };

        // Get financial values with defaults - matching Financials.js logic
        const listPrice = safeParseFloat(promoEventPriceValues.listPrice);
        const spoils = safeParseFloat(promoEventPriceValues.spoils);
        const edlpPerUnitRate = safeParseFloat(promoEventPriceValues.edlpPerUnitRate);
        const promoPerUnitRate = safeParseFloat(promoEventPriceValues.promoPerUnitRate);
        const cogs = safeParseFloat(promoEventPriceValues.cogs);
        const vcm = safeParseFloat(promoEventPriceValues.vcm);
        const fixedFee = safeParseFloat(promoEventPriceValues.fixedFee);
        const units = Number(eventTotalResult?.units || 0);
        const increamentalUnits = Number(eventIncrementalResult?.units || 0);
        const promotedPrice = Number(promoEventPriceValues.promoPrice || 0);
        const basePrice = Number(promoEventPriceValues.basePrice || 0);
        const baseUnits = Number(promoEventPriceValues.total_units_sum || 0);

        // Calculate financial metrics using the same logic as Financials.js
        const grossRevenue = units * listPrice;
        const retailGrossRevenue = units * promotedPrice;
        const spoilsTotal = units * spoils;
        const netPrice = listPrice - spoils - edlpPerUnitRate - promoPerUnitRate;
        const netRevenue = netPrice * units;
        const cogsTotal = cogs * units;
        const grossMargin = netRevenue - cogsTotal;
        const grossMarginPercentage = netRevenue > 0 ? (grossMargin / netRevenue * 100) : 0;

        // Calculate base values for comparison
        const baseNetRevenue = (listPrice - spoils) * baseUnits;
        const baseCogsTotal = cogs * baseUnits;
        const baseGrossMargin = baseNetRevenue - baseCogsTotal;
        const baseGrossMarginPercentage = baseNetRevenue > 0 ? (baseGrossMargin / baseNetRevenue * 100) : 0;

        const variableSpend = (edlpPerUnitRate + promoPerUnitRate) * units;
        const totalSpend = fixedFee + variableSpend;
        const increamentalRevenue = increamentalUnits * listPrice;
        const retailIncrementalRevenue = increamentalUnits * promotedPrice;
        const percentageROI = totalSpend > 0 ? ((grossMargin - baseGrossMargin) / totalSpend * 100) : 0;

        const retailerEverydayMargin = basePrice > 0 ? ((basePrice - listPrice) / basePrice) * 100 : 0;
        const netCost = listPrice - edlpPerUnitRate - promoPerUnitRate - (fixedFee / units);
        const retailerPromoMargin = promotedPrice > 0 ? ((promotedPrice - netCost) / promotedPrice) * 100 : 0;
        const retailerProfit = units * promotedPrice - netCost * units;

        // Create comprehensive Event Results table matching Financials.js
        const eventResultsData = [
            [
                { text: "Event Results", options: { bold: true, fill: { color: "174F73" }, color: "FFFFFF", colspan: 2 } }
            ],
            [
                { text: "Mfr Gross Revenue", options: { bold: true } },
                { text: grossRevenue > 0 ? `$${grossRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: grossRevenue >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Incremental Revenue", options: { bold: true } },
                { text: increamentalRevenue > 0 ? `$${increamentalRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: increamentalRevenue >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Spoils", options: { bold: true } },
                { text: spoilsTotal > 0 ? `$${spoilsTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: spoilsTotal >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Trade Spend", options: { bold: true } },
                { text: totalSpend > 0 ? `$${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: totalSpend >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Mfr Net Revenue", options: { bold: true } },
                { text: netRevenue > 0 ? `$${netRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: netRevenue >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "COGS", options: { bold: true } },
                { text: cogsTotal > 0 ? `$${cogsTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: cogsTotal >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Mfr Gross Margin (Unpromoted)", options: { bold: true } },
                { text: baseGrossMargin > 0 ? `$${baseGrossMargin.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: baseGrossMargin >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Mfr Gross Margin % (Unpromoted)", options: { bold: true } },
                { text: baseGrossMarginPercentage > 0 ? `${baseGrossMarginPercentage.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-", options: { color: baseGrossMarginPercentage >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Mfr Gross Margin", options: { bold: true } },
                { text: grossMargin > 0 ? `$${grossMargin.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: grossMargin >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Mfr Gross Margin %", options: { bold: true } },
                { text: grossMarginPercentage > 0 ? `${grossMarginPercentage.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-", options: { color: grossMarginPercentage >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Sales ROI", options: { bold: true } },
                { text: percentageROI !== 0 ? `${percentageROI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-", options: { color: percentageROI >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Retail Gross Revenue", options: { bold: true } },
                { text: retailGrossRevenue > 0 ? `$${retailGrossRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: retailGrossRevenue >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Retail Incremental Revenue", options: { bold: true } },
                { text: retailIncrementalRevenue > 0 ? `$${retailIncrementalRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: retailIncrementalRevenue >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Retail Promo Margin %", options: { bold: true } },
                { text: retailerPromoMargin !== 0 ? `${retailerPromoMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-", options: { color: retailerPromoMargin >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Retail Everyday Margin %", options: { bold: true } },
                { text: retailerEverydayMargin !== 0 ? `${retailerEverydayMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : "-", options: { color: retailerEverydayMargin >= 0 ? "009900" : "FF0000" } }
            ],
            [
                { text: "Retail Profit", options: { bold: true } },
                { text: retailerProfit > 0 ? `$${retailerProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "-", options: { color: retailerProfit >= 0 ? "009900" : "FF0000" } }
            ]
        ];

        // Add comprehensive Event Results table
        slide3.addTable(eventResultsData, {
            x: 0.35,
            y: 1.0,
            w: 8,
            colW: [4, 4],
            fontSize: 11,
            border: { pt: 1, color: "cccccc" }
        });

        // Financial Input Parameters Table - Updated with new fields
        const financialInputParamsTable = [
            [
                { text: "Financial Input Parameters", options: { bold: true, fill: { color: "174F73" }, color: "FFFFFF", colspan: 2 } }
            ],
            [
                { text: "List Price", options: { bold: true } },
                { text: listPrice ? `$${listPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ],
            [
                { text: "Spoil Per Unit", options: { bold: true } },
                { text: spoils ? `$${spoils.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ],
            [
                { text: "EDLP Per Unit Rate", options: { bold: true } },
                { text: edlpPerUnitRate ? `$${edlpPerUnitRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ],
            [
                { text: "Promo Per Unit Rate", options: { bold: true } },
                { text: promoPerUnitRate ? `$${promoPerUnitRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ],
            [
                { text: "Net Price", options: { bold: true } },
                { text: netPrice ? `$${netPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ],
            [
                { text: "COGS Per Unit", options: { bold: true } },
                { text: cogs ? `$${cogs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ],
            [
                { text: "VCM", options: { bold: true } },
                { text: vcm ? `$${vcm.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ],
            [
                { text: "Fixed Fees", options: { bold: true } },
                { text: fixedFee ? `$${fixedFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-", options: {} }
            ]
        ];

        // Add financial input parameters table to slide 3
        slide3.addTable(financialInputParamsTable, {
            x: 8.85,
            y: 1.0,
            w: 4,
            colW: [2, 2],
            fontSize: 10,
            border: { pt: 1, color: "cccccc" }
        });

        // Save the file
        await pptx.writeFile({
            fileName: `Promo_Event_Simulation_${selectedRetailer || 'All'}_${selectedBrand || 'All'}_${selectedProduct || 'No_Product'}_${new Date().toISOString().slice(0, 10)}.pptx`,
            compression: true
        });
    } catch (error) {
        console.error("Error generating Promo Event PPT:", error);
        alert("There was an error generating the Promo Event PPT. Please try again.");
    } finally {
        setIsGeneratingPPT(false);
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <PromoOptimizationHeader
        onBack={handleBackToHome}
        onOpenSmartInsights={() => setIsSmartInsightsOpen(true)}
      />

      <div className="w-full px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <div className="space-y-6">
            {/* Product Configuration - 100% Width */}
            <ProductConfigurationSection
              retailers={retailers}
              brands={brands}
              products={products}
              selectedRetailer={selectedRetailer}
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              handleRetailerChange={handleRetailerChange}
              handleBrandChange={handleBrandChange}
              handleProductChange={handleProductChange}
              generatePromoPPT={generatePromoPPT}
              onSelectionChange={handleSelectionChange}
              onInputChange={handleInputChange}
              onDownloadTemplate={() => {
                // Implement download template functionality
                console.log('Download template clicked');
              }}
            />

            {/* Promotion Analysis + Event Configuration - Side by Side */}
           
            <div className="col-span-4">
                <EventConfigurationSection
                  formData={formData}
                  onInputChange={handleInputChange}
                  promoEventPriceValues={promoEventPriceValues}
                  promoSimulationData={promoSimulationData}
                  promoEventChartData={promoEventChartData}
                  isPriceSimulationLoading={isPriceSimulationLoading}
                  handlePromoEventPriceInputChange={
                    handlePromoEventPriceInputChange
                  }
                  discount={discount}
                  units={units}
                  lift={lift}
                  dollars={dollars}
                />
              </div>
            {/* Promotion Results Table - 100% Width */}
            <PromotionResultsTableSection
              promoEventPriceValues={promoEventPriceValues}
              promoSimulationData={promoSimulationData}
              promoEventChartData={promoEventChartData}
              isPriceSimulationLoading={isPriceSimulationLoading}
              handlePromoEventPriceInputChange={
                handlePromoEventPriceInputChange
              }
              discount={discount}
              units={units}
              lift={lift}
              dollars={dollars}
            />

            {/* Financial Analysis + Financial Parameters - Side by Side */}
            <div className="gap-6">
              {/* Left Side - Financial Analysis */}
              {/* <div className="col-span-7">
                <FinancialAnalysisSection results={mockFinancialResults} />
              </div> */}

              {/* Right Side - Financial Parameters */}
              <div className="col-span-5">
                <FinancialParametersSection
                  basePrice={Number(promoEventPriceValues.basePrice || 0)}
                  promotedPrice={Number(promoEventPriceValues.promoPrice || 0)}
                  isPriceSimulationLoading={isPriceSimulationLoading}
                  units={Number(promoEventPriceValues?.total_units_sum || 0)}
                  increamentalUnits={
                    (Number(units?.tprUnits || 0) +
                    Number(units?.foUnits || 0) +
                    Number(units?.doUnits || 0) +
                    Number(units?.fdUnits || 0))
                  }
                  handlePromoEventPriceInputChange={
                    handlePromoEventPriceInputChange
                  }
                  promoEventPriceValues={promoEventPriceValues}
                  onInputChange={handleInputChange}
                />
              </div>
            </div>

            {/* Sales ROI Widget - Full Width */}
            <div className="w-full">
              <SalesROIWidget roi={mockFinancialResults.salesROI} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smart Insights Drawer */}
      <SimpleSmartInsightsDrawer
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  );
}
