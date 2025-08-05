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

export function PromoOptimizationPage() {
  const router = useRouter();
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false);

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

  const [retailerBrandProducts, setRetailerBrandProducts] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const retailers = Object?.keys(retailerBrandProducts || {});
  let brands =
    selectedRetailer && retailerBrandProducts
      ? Object?.keys(retailerBrandProducts[selectedRetailer] || {})
      : [];
  let products =
    selectedBrand && selectedRetailer && retailerBrandProducts
      ? retailerBrandProducts[selectedRetailer][selectedBrand] || []
      : [];

  useEffect(() => {
    const fetchRetailerBrandProductApiHandler = async () => {
      try {
        const api = `/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
        const response = await axiosPythonInstance.get(api);
        if (response.status === 200) {
          setRetailerBrandProducts(response?.data?.data);
        }
      } catch (error) {
        console.log('Error in fetching retailers', error);
      }
    };
    fetchRetailerBrandProductApiHandler();
  }, []);

  console.log(project_id, "newProjectId")
  console.log(model_id, "newModel_id")

  const handleRetailerChange = (value) => {
    // setIsAllProductSelected(false);
    setSelectedRetailer(value);
    setSelectedBrand('');
    setSelectedProduct('');
    setSelectedProducts([]);

    // // Clear related data for all simulator types
    // if (simulatorType === "price") {
    //     setFilteredSelectedPriceProducts([]);
    //     setCompetitors([]);
    //     setNewPrices([]);
    //     setCompetitorNewPrice([]);
    //     setNewPriceChange([]);
    //     setVolumeImpact([]);
    //     setDollarImpact([]);
    //     setShowProductResults(false);
    //     setShowCompetitorResults(false);
    //     getPriceSimulationApiHandler(value);
    // } else if (simulatorType === "margin") {
    //     setMarginSimulationData([]);
    //     setMarginPriceValues({
    //         listPrice: "",
    //         edlpSpend: "",
    //         netUnitPrice: "",
    //         cogs: null,
    //         basePriceElasticity: "",
    //         basePrice: "",
    //     });
    //     setMarginChartData({
    //         manufacturerProfit: [],
    //         annualProfit: [],
    //     });
    // } else if (simulatorType === "promo") {
    //     setPromoSimulationData([]);
    //     setPromoEventPriceValues({
    //         promoPrice: "",
    //         discount: "",
    //         total_units_sum: "",
    //         discount: null,
    //         promoPriceElasticity: "",
    //         basePrice: "",
    //         tprDist: "",
    //         foDist: "",
    //         doDist: "",
    //         fdDist: "",
    //         vcm: "",
    //         fixedFee: "",
    //         promoSpend: "",
    //         edlpSpend: "",
    //         listPrice: "",
    //     });
    //     setDiscount("");
    //     setLift({});
    //     setUnits({});
    //     setDollars({});
    //     setpromoEventChartData([]);
    // }

    // // Save the updated state immediately
    // const currentState = getStoredState(project_id, model_id);
    // const newState = {
    //     ...currentState,
    //     [simulatorType]: {
    //         ...currentState[simulatorType],
    //         retailer: value,
    //         brand: "",
    //         product: "",
    //         products: [],
    //         newPrices: [],
    //         competitorNewPrice: [],
    //         priceValues: simulatorType === "margin" ? {
    //             listPrice: "",
    //             edlpSpend: "",
    //             netUnitPrice: "",
    //             cogs: null,
    //             basePriceElasticity: "",
    //             basePrice: "",
    //         } : simulatorType === "promo" ? {
    //             promoPrice: "",
    //             discount: "",
    //             total_units_sum: "",
    //             discount: null,
    //             promoPriceElasticity: "",
    //             basePrice: "",
    //             tprDist: "",
    //             foDist: "",
    //             doDist: "",
    //             fdDist: "",
    //             vcm: "",
    //             fixedFee: "",
    //             promoSpend: "",
    //             edlpSpend: "",
    //             listPrice: "",
    //         } : {}
    //     }
    // };
    // saveState(project_id, model_id, newState);
  };

  const handleBrandChange = (value) => {
    // setIsAllProductSelected(false);
    setSelectedBrand(value);
    setSelectedProduct('');
    setSelectedProducts([]);

    // Clear product-dependent data for all simulator types
    // if (simulatorType === "price") {
    //     setNewPrices([]);
    //     setCompetitorNewPrice([]);
    //     setNewPriceChange([]);
    //     setVolumeImpact([]);
    //     setDollarImpact([]);
    //     setShowProductResults(false);
    //     setShowCompetitorResults(false);
    // } else if (simulatorType === "margin") {
    //     setMarginSimulationData([]);
    //     setMarginPriceValues({
    //         listPrice: "",
    //         edlpSpend: "",
    //         netUnitPrice: "",
    //         cogs: null,
    //         basePriceElasticity: "",
    //         basePrice: "",
    //     });
    //     setMarginChartData({
    //         manufacturerProfit: [],
    //         annualProfit: [],
    //     });
    // } else if (simulatorType === "promo") {
    //     setPromoSimulationData([]);
    //     setPromoEventPriceValues({
    //         promoPrice: "",
    //         discount: "",
    //         total_units_sum: "",
    //         discount: null,
    //         promoPriceElasticity: "",
    //         basePrice: "",
    //         tprDist: "",
    //         foDist: "",
    //         doDist: "",
    //         fdDist: "",
    //         vcm: "",
    //         fixedFee: "",
    //         promoSpend: "",
    //         edlpSpend: "",
    //         listPrice: "",
    //     });
    //     setDiscount("");
    //     setLift({});
    //     setUnits({});
    //     setDollars({});
    //     setpromoEventChartData([]);
    // }

    // // Save the updated state immediately
    // const currentState = getStoredState(project_id, model_id);
    // const newState = {
    //     ...currentState,
    //     [simulatorType]: {
    //         ...currentState[simulatorType],
    //         brand: value,
    //         product: "",
    //         products: [],
    //         newPrices: [],
    //         competitorNewPrice: [],
    //         priceValues: simulatorType === "margin" ? {
    //             listPrice: "",
    //             edlpSpend: "",
    //             netUnitPrice: "",
    //             cogs: null,
    //             basePriceElasticity: "",
    //             basePrice: "",
    //         } : simulatorType === "promo" ? {
    //             promoPrice: "",
    //             discount: "",
    //             total_units_sum: "",
    //             discount: null,
    //             promoPriceElasticity: "",
    //             basePrice: "",
    //             tprDist: "",
    //             foDist: "",
    //             doDist: "",
    //             fdDist: "",
    //             vcm: "",
    //             fixedFee: "",
    //             promoSpend: "",
    //             edlpSpend: "",
    //             listPrice: "",
    //         } : {}
    //     }
    // };
    // saveState(project_id, model_id, newState);
  };

  const handleProductChange = (value) => {
    setSelectedProduct(value);

    // if (simulatorType === "margin") {
    //     marginSimulationApiHandler(value);
    // }
    // if (simulatorType === "promo") {
    //     promoEventHandler(value);
    // }

    // // Save the updated state immediately
    // const currentState = getStoredState(project_id, model_id);
    // const newState = {
    //     ...currentState,
    //     [simulatorType]: {
    //         ...currentState[simulatorType],
    //         product: value
    //     }
    // };
    // saveState(project_id, model_id, newState);
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

  const handleDownloadTemplate = () => {
    // Create a sample CSV template
    const templateData = [
      [
        'Event Name',
        'Start Date',
        'End Date',
        'Base Price',
        'Promo Price',
        'Expected Units',
        'TPR ACV %',
        'Feature Only ACV %',
        'Display Only ACV %',
        'Feature + Display ACV %',
      ],
      [
        'Summer Sale 2025',
        '2025-07-01',
        '2025-07-15',
        '4.99',
        '3.99',
        '5000',
        '75',
        '25',
        '30',
        '85',
      ],
      [
        'Back to School',
        '2025-08-15',
        '2025-08-30',
        '6.49',
        '4.99',
        '3200',
        '80',
        '20',
        '25',
        '90',
      ],
      [
        'Holiday Special',
        '2025-12-01',
        '2025-12-25',
        '7.99',
        '5.99',
        '8000',
        '85',
        '30',
        '35',
        '95',
      ],
    ];

    const csvContent = templateData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'promo-optimization-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
              formData={{
                selectedRetailer: formData.selectedRetailer,
                selectedBrand: formData.selectedBrand,
                selectedProduct: formData.selectedProduct,
                uploadedFile: formData.uploadedFile,
              }}
              onSelectionChange={handleSelectionChange}
              onInputChange={handleInputChange}
              onDownloadTemplate={handleDownloadTemplate}
            />

            {/* Promotion Analysis + Event Configuration - Side by Side */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Side - Promotion Analysis */}
              <div className="col-span-8">
                <PromotionAnalysisSection />
              </div>

              {/* Right Side - Event Configuration */}
              <div className="col-span-4">
                <EventConfigurationSection
                  formData={{
                    basePrice: formData.basePrice,
                    promoPrice: formData.promoPrice,
                    discountPercent: formData.discountPercent,
                    units: formData.units,
                    tprACV: formData.tprACV,
                    displayOnlyACV: formData.displayOnlyACV,
                    featureOnlyACV: formData.featureOnlyACV,
                    featureDisplayACV: formData.featureDisplayACV,
                  }}
                  onInputChange={handleInputChange}
                />
              </div>
            </div>

            {/* Promotion Results Table - 100% Width */}
            <PromotionResultsTableSection />

            {/* Financial Analysis + Financial Parameters - Side by Side */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Side - Financial Analysis */}
              <div className="col-span-7">
                <FinancialAnalysisSection results={mockFinancialResults} />
              </div>

              {/* Right Side - Financial Parameters */}
              <div className="col-span-5">
                <FinancialParametersSection
                  formData={{
                    listPrice: formData.listPrice,
                    spoilPerUnit: formData.spoilPerUnit,
                    edlpPerUnit: formData.edlpPerUnit,
                    promoPerUnit: formData.promoPerUnit,
                    netPrice: formData.netPrice,
                    cogsPerUnit: formData.cogsPerUnit,
                    vcm: formData.vcm,
                    fixedFees: formData.fixedFees,
                  }}
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
