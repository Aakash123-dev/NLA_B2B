'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import {
  SimulatorPageHeader,
  SimulatorFilters,
  ProductSection,
  RelevantCompetitorsSection,
  MarginAnalysisSection,
} from './components';
import { axiosPythonInstance } from '@/services/projectservices/axiosInstance';
import { useSearchParams } from 'next/navigation';
import { fetchPriceSimulationData, getMarginSimulationData } from '@/services/simulation/priceSimulationServices';
import { getPriceSimulation, getMarginSimulation } from '@/store/slices/priceSimulationSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const getStorageKey = (projectId: number, modelId: number) => {
  return `simulator_state_${projectId}_${modelId}`;
};

const getStoredState = (projectId: number, modelId: number) => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  const key = getStorageKey(projectId, modelId);
  const stored = localStorage.getItem(key);

  if (!stored || stored === 'undefined') {
    // If there's no stored value or it's the string "undefined", return null or default
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Invalid JSON in localStorage for key:', key, e);
    // Optionally clear the corrupted storage value
    // localStorage.removeItem(key);
    return null;
  }
};

const saveState = (projectId: number, modelId: number, state: any) => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return;
  }
  
  const key = getStorageKey(projectId, modelId);
  localStorage.setItem(key, JSON.stringify(state));
};

export default function SimulatorPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [hasRunAnalysis, setHasRunAnalysis] = useState(false);
  const searchParams = useSearchParams();
  const project_id = Number(searchParams.get('project'));
  const model_id = Number(searchParams.get('model'));
  const [isPriceSimulationLoading, setIsPriceSimulationLoading] =
    useState(false);
  const [retailerBrandProducts, setRetailerBrandProducts] = useState<any>({});
  // const [priceSimulationData, setPriceSimulationData] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [competitorNewPrice, setCompetitorNewPrice] = useState<string[]>([]);
  // Price simulation states
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filteredSelectedPriceProducts, setFilteredSelectedPriceProducts] =
    useState<any[]>([]);
  const [newPrices, setNewPrices] = useState<string[]>([]);
  const [showProductResults, setShowProductResults] = useState(false);
  const [showCompetitorResults, setShowCompetitorResults] = useState(false);
  const [marginPriceValues, setMarginPriceValues] = useState({
    listPrice: '',
    edlpSpend: '',
    netUnitPrice: '',
    cogs: '',
    basePriceElasticity: '',
    basePrice: '',
  });

  const [marginChartData, setMarginChartData] = useState({
    manufacturerProfit: [] as number[],
    annualProfit: [] as number[],
  });

  // Margin simulation states
  const [marginSimulationData, setMarginSimulationData] = useState<any[]>([]);

  // Common Price/Margin simulator states
  const [selectedRetailer, setSelectedRetailer] = useState<any>('');
  const [selectedBrand, setSelectedBrand] = useState<any>('');
  const [selectedProduct, setSelectedProduct] = useState<any>('');
  const [selectedProduct1, setSelectedProduct1] = useState<any>('');

  const retailers = Object?.keys(retailerBrandProducts || {});
  let brands =
    selectedRetailer && retailerBrandProducts
      ? Object?.keys(retailerBrandProducts[selectedRetailer] || {})
      : [];
  let products =
    selectedBrand && selectedRetailer && retailerBrandProducts
      ? retailerBrandProducts[selectedRetailer][selectedBrand] || []
      : [];

  /* -----start----- Common handlers -----start----- */
  const [isAllProductSelected, setIsAllProductSelected] = useState(false);

  const dispatch = useDispatch<any>();

  const {
    data: priceSimulationData,
    loading,
    error,
    marginData,
    marginLoading,
    marginError,
  } = useSelector((state: any) => state.priceSimulation);

  const marginSimulationApiHandler = async (product: string) => {
    const storedState = getStoredState(project_id, model_id);
    
    dispatch(
      getMarginSimulation({ 
        projectId: project_id, 
        modelId: model_id, 
        retailer: selectedRetailer || storedState?.retailer || '', 
        product 
      })
    );
  };

  const handleProductsChangeForPrice = (values: string[]) => {
    console.log(values, 'handleProductsChnageForPrice');
    setIsAllProductSelected(false);
    if (values && values.length && values.includes('select-all')) {
      if (values.length === products.length + 1) {
        setIsAllProductSelected(false);
        return setSelectedProducts([]);
      }
      setIsAllProductSelected(true);
      return setSelectedProducts([...products]);
    }
    if (values.length === products.length) {
      setIsAllProductSelected(true);
    }
    setSelectedProducts(values);

    // If a single product is selected, also set it for margin analysis
    // if (values.length === 1) {
    //   setSelectedProduct(values[0]);
    //   // Call margin API for the selected product
    //   if (selectedRetailer && values[0]) {
    //     marginSimulationApiHandler(values[0]);
    //   }
    // } else {
    //   setSelectedProduct('');
    // }
  };

  // Retailer change handler
  const handleRetailerChange = (value: string) => {
    setIsAllProductSelected(false);
    setSelectedRetailer(value);
    setSelectedBrand('');
    setSelectedProduct('');
    setSelectedProducts([]);

    // Clear all related simulator states, regardless of type
    setFilteredSelectedPriceProducts([]);
    setCompetitors([]);
    setNewPrices([]);
    setCompetitorNewPrice([]);
    setNewPriceChange([]);
    setVolumeImpact([]);
    setDollarImpact([]);
    setShowProductResults(false);
    setShowCompetitorResults(false);

    setMarginSimulationData([]);
    setMarginPriceValues({
      listPrice: '',
      edlpSpend: '',
      netUnitPrice: '',
      cogs: '',
      basePriceElasticity: '',
      basePrice: '',
    });
    setMarginChartData({
      manufacturerProfit: [],
      annualProfit: [],
    });

    // Always call price simulation API handler
    getPriceSimulationApiHandler(value);
    // Remove the incorrect marginSimulationApiHandler call here since it needs a product parameter

    // Clear localStorage when retailer changes
    const key = getStorageKey(project_id, model_id);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }

    // Save only the new retailer state
    const newState = {
      retailer: value,
      brand: '',
      product: '',
      products: [],
      newPrices: [],
      competitorNewPrice: [],
      newPriceChange: [],
      priceValues: {
        listPrice: '',
        edlpSpend: '',
        netUnitPrice: '',
        cogs: '',
        basePriceElasticity: '',
        basePrice: '',
      },
    };

    saveState(project_id, model_id, newState);
  };

  // Brand change handler
  const handleBrandChange = (value: string) => {
    setIsAllProductSelected(false);
    setSelectedBrand(value);
    setSelectedProduct('');
    setSelectedProducts([]);

    // Clear all product-dependent data unconditionally
    setNewPrices([]);
    setCompetitorNewPrice([]);
    setNewPriceChange([]);
    setVolumeImpact([]);
    setDollarImpact([]);
    setShowProductResults(false);
    setShowCompetitorResults(false);

    setMarginSimulationData([]);
    setMarginPriceValues({
      listPrice: '',
      edlpSpend: '',
      netUnitPrice: '',
      cogs: '',
      basePriceElasticity: '',
      basePrice: '',
    });
    setMarginChartData({
      manufacturerProfit: [],
      annualProfit: [],
    });

    // Save the updated state without simulatorType key
    const currentState = getStoredState(project_id, model_id);
    const newState = {
      ...currentState,
      brand: value,
      product: '',
      products: [],
      newPrices: [],
      competitorNewPrice: [],
      priceValues: {
        listPrice: '',
        edlpSpend: '',
        netUnitPrice: '',
        cogs: '',
        basePriceElasticity: '',
        basePrice: '',
      },
    };
    saveState(project_id, model_id, newState);
  };

  // Product change handler (for direct product selection)
  const handleProductChange = (value: string) => {
    setSelectedProduct(value);

    // Call margin simulation API handler when a product is selected
    // if (value && selectedRetailer) {
    //   marginSimulationApiHandler(value);
    // }

    // Save the updated state immediately
    const currentState = getStoredState(project_id, model_id);
    const newState = {
      ...currentState,
      product: value,
    };
    saveState(project_id, model_id, newState);
  };
  /* -----end----- Common handlers -----end----- */

  /* -----start----- Api Handler -----start----- */
  const getPriceSimulationApiHandler = async (retailer: string) => {
    dispatch(
      getPriceSimulation({ projectId: project_id, modelId: model_id, retailer })
    );
  };
  /* -----end----- Api Handler -----end----- */

  /* -----start----- Price change Handler -----start----- */
  const [newPriceChange, setNewPriceChange] = useState<any[]>([]);
  const [isRestoringPrices, setIsRestoringPrices] = useState(false);
  const isRestoringRef = React.useRef(false);

  const handleNewPriceOnChange = (
    index: number,
    event: any,
    product: any,
    type: string
  ) => {
    const newValue = event.target?.value || event.value || event; // Handle both event types
    
    // Set flag to prevent restoration during active price changes
    isRestoringRef.current = true;
    
    let temp = [...newPriceChange];

    if (newPriceChange && newPriceChange.length > 0) {
      let found = false;
      for (let i = 0; i < newPriceChange.length; i++) {
        if (product?.Product === newPriceChange[i]?.Product) {
          temp[i].newPrice = newValue;
          found = true;
          break;
        }
      }
      if (!found) {
        temp.push({
          ...product,
          type: type,
          newPrice: newValue,
        });
      }
    } else {
      temp.push({
        ...product,
        type: type,
        newPrice: newValue,
      });
    }

    setNewPriceChange(temp);

    if (type === 'product') {
      const updatedPrices = [...newPrices];
      updatedPrices[index] = newValue;
      setNewPrices(updatedPrices);
    }
    if (type === 'competitor') {
      const updatedPrices = [...competitorNewPrice];
      updatedPrices[index] = newValue;
      setCompetitorNewPrice(updatedPrices);
    }

    // Save the updated state to localStorage without simulatorType nesting
    const currentState = getStoredState(project_id, model_id);
    const newState = {
      ...currentState,
      newPrices:
        type === 'product'
          ? [...newPrices].map((price, i) => (i === index ? newValue : price))
          : currentState.newPrices || [],
      competitorNewPrice:
        type === 'competitor'
          ? [...competitorNewPrice].map((price, i) =>
              i === index ? newValue : price
            )
          : currentState.competitorNewPrice || [],
      newPriceChange: temp,
    };
    saveState(project_id, model_id, newState);
    
    // Reset the flag after a short delay
    setTimeout(() => {
      isRestoringRef.current = false;
    }, 100);
  };

  /* -----end----- Price change Handler -----end----- */

  /* -----start------ Impact handler function when there is a change in Price -----start----- */
  const [volumeImpact, setVolumeImpact] = useState<any[]>([]);
  const [dollarImpact, setDollarImpact] = useState<any[]>([]);

  const impactHandler = () => {
    let tempVolumeImpact: any[] = [];
    let tempDollarImpact: any[] = [];
    newPriceChange &&
      newPriceChange.length > 0 &&
      newPriceChange.map((ele, j) => {
        if (ele.newPrice !== '' && ele.newPrice !== '0' && ele.Product) {
          //Volume Impact
          let Product = ele.Product;
          let productOunces = 0;

          // Safely extract product ounces with error handling
          try {
            const matches = Product.match(/[+-]?\d+(\.\d+)?/g);
            if (matches && matches.length >= 2) {
              productOunces = matches[matches.length - 2];
            }
          } catch (error) {
            console.log('Error extracting product ounces:', error);
            productOunces = 1; // Default value if extraction fails
          }

          let PercentageChangeInPrice =
            ((ele.newPrice - ele.Price_avg_last_4_weeks) * 100) /
            ele.Price_avg_last_4_weeks;

          let NewUnits =
            ele.total_units_sum +
            ele.total_units_sum *
              ((1 + PercentageChangeInPrice / 100) **
                ele.Base_Price_Elasticity -
                1);

          let ChangeInUnits = NewUnits - ele.total_units_sum;
          let PercentageChangeInUnits =
            (ChangeInUnits * 100) / ele.total_units_sum;

          tempVolumeImpact.push({
            Product: Product,
            Base_Price_Elasticity: ele.Base_Price_Elasticity,
            total_units_sum: ele.total_units_sum,
            NewPrice: ele.newPrice,
            type: ele.type,
            NewUnits: ele.newPrice != 0 ? NewUnits : 0,
            ChangeInUnits: ele.newPrice != 0 ? ChangeInUnits : 0,
            PercentageChangeInUnits:
              ele.newPrice != 0 ? PercentageChangeInUnits : 0,
            NewVolume: ele.newPrice != 0 ? NewUnits * productOunces : 0,
            ChangeInVolume:
              ele.newPrice != 0 ? ChangeInUnits * productOunces : 0,
          });

          //Dollar Impact
          let NewDollars = NewUnits * ele.newPrice;
          let ChangeInDollars =
            NewDollars - ele.total_units_sum * ele.Price_avg_last_4_weeks;
          let PercentageChangeInDollars =
            (ChangeInDollars * 100) /
            (ele.total_units_sum * ele.Price_avg_last_4_weeks);
          tempDollarImpact.push({
            Product: Product,
            NewPrice: ele.newPrice,
            Base_Price_Elasticity: ele.Base_Price_Elasticity,
            totalDollars: ele.total_units_sum * ele.Price_avg_last_4_weeks,
            type: ele.type,
            NewDollars: ele.newPrice != 0 ? NewDollars : 0,
            ChangeInDollars: ele.newPrice != 0 ? ChangeInDollars : 0,
            PercentageChangeInDollars:
              ele.newPrice != 0 ? PercentageChangeInDollars : 0,
          });
        }
      });

    // Rest of the impactHandler function...
    crossEffectHandler(tempVolumeImpact, tempDollarImpact);
  };

  /* -----end------ Impact handler function when there is a change in Price -----end----- */

  /* -----start------ cross Effects handler function -----start----- */

  const crossEffectHandler = (volumeImpact: any[], dollarImpact: any[]) => {
    let productCompetitorCrossEffects: any[] = [];
    if (volumeImpact.length > 0) {
      //gets cross effect values within selected products
      volumeImpact.map((ele) => {
        filteredSelectedPriceProducts.map((val) => {
          if (val.Product === ele.Product && ele.type === 'product') {
            let crossEffects: any[] = [];
            let sum = 0;
            let comps = JSON.parse(val.Competitors).filter(
              (comp: any) => comp.cross_effect > 0
            );
            comps.length > 0 &&
              comps.map((comp: any) => {
                if (comp.cross_effect > 0) {
                  sum = sum + comp.cross_effect;
                }
              });
            comps.length > 0 &&
              comps.map((comp: any) => {
                if (comp.cross_effect > 0) {
                  crossEffects.push((comp.cross_effect * comps.length) / sum);
                }
              });
            crossEffects.map((eff, i) => {
              let productOunces =
                comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g)[
                  comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g).length - 2
                ];

              productCompetitorCrossEffects.push({
                competitor: comps[i].competitor,
                crossEffectValue:
                  ele.ChangeInVolume < 0
                    ? (eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces
                    : -(eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces,
              });
            });
          }
        });
        //gets cross effect values within competitor products
        competitors.map((val) => {
          if (
            val.Product === ele.Product &&
            ele.type === 'competitor' &&
            ele.NewPrice !== ''
          ) {
            let crossEffects: any[] = [];
            let comps = JSON.parse(val.Competitors).filter(
              (comp: any) => comp.cross_effect > 0
            );
            // console.log("comps", comps, val);
            let sum = 0;
            comps.length > 0 &&
              comps.map((comp: any) => {
                if (comp.cross_effect > 0) {
                  sum = sum + comp.cross_effect;
                }
              });
            comps.length > 0 &&
              comps.map((comp: any) => {
                if (comp.cross_effect > 0) {
                  crossEffects.push((comp.cross_effect * comps.length) / sum);
                }
              });
            crossEffects.map((eff, i) => {
              let productOunces =
                comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g)[
                  comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g).length - 2
                ];
              productCompetitorCrossEffects.push({
                competitor: comps[i].competitor,
                crossEffectValue:
                  ele.ChangeInVolume < 0
                    ? (eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces
                    : -(eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces,
              });
            });
          }
        });
      });
    }

    productCompetitorCrossEffects.map((ele, i) => {
      for (let j = i + 1; j < productCompetitorCrossEffects.length; j++) {
        if (productCompetitorCrossEffects[j].competitor === ele.competitor) {
          productCompetitorCrossEffects[i].crossEffectValue =
            productCompetitorCrossEffects[i].crossEffectValue +
            productCompetitorCrossEffects[j].crossEffectValue;
          productCompetitorCrossEffects.splice(j, 1);
        }
      }
    });
    let tempVolumeImpact = [...volumeImpact];
    let tempDollarImpact = [...dollarImpact];
    productCompetitorCrossEffects.length > 0 &&
      productCompetitorCrossEffects.map((ele, j) => {
        for (let id = 0; id < volumeImpact.length; id++) {
          if (volumeImpact[id].Product === ele.competitor) {
            tempVolumeImpact[id] = {
              ...volumeImpact[id],
              NewUnits: volumeImpact[id].NewUnits + ele.crossEffectValue,
              ChangeInUnits:
                volumeImpact[id].ChangeInUnits + ele.crossEffectValue,
              PercentageChangeInUnits:
                ((volumeImpact[id].ChangeInUnits + ele.crossEffectValue) *
                  100) /
                volumeImpact[id].total_units_sum,
            };
            tempDollarImpact[id] = {
              ...tempDollarImpact[id],
              NewDollars:
                (volumeImpact[id].NewUnits + ele.crossEffectValue) *
                parseInt(volumeImpact[id].NewPrice),
              ChangeInDollars:
                (volumeImpact[id].NewUnits + ele.crossEffectValue) *
                  parseInt(volumeImpact[id].NewPrice) -
                tempDollarImpact[id].totalDollars,
              PercentageChangeInDollars:
                (((volumeImpact[id].NewUnits + ele.crossEffectValue) *
                  parseInt(volumeImpact[id].NewPrice) -
                  tempDollarImpact[id].totalDollars) *
                  100) /
                tempDollarImpact[id].totalDollars,
            };
            productCompetitorCrossEffects.splice(j, 1);
          }
        }
      });
    productCompetitorCrossEffects.length > 0 &&
      productCompetitorCrossEffects.map((ele) => {
        filteredSelectedPriceProducts.map((prod) => {
          if (prod.Product === ele.competitor) {
            let Product = prod.Product;
            let NewUnits = prod.total_units_sum + ele.crossEffectValue;
            let ChangeInUnits = NewUnits - prod.total_units_sum;
            let PercentageChangeInUnits =
              (ChangeInUnits * 100) / prod.total_units_sum;
            tempVolumeImpact.push({
              Product: Product,
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              total_units_sum: prod.total_units_sum,
              NewPrice: '',
              type: 'product',
              NewUnits: NewUnits,
              ChangeInUnits: ChangeInUnits,
              PercentageChangeInUnits: PercentageChangeInUnits,
            });
            let NewDollars = NewUnits * prod.Price_avg_last_4_weeks;
            let ChangeInDollars =
              NewDollars - prod.total_units_sum * prod.Price_avg_last_4_weeks;
            let PercentageChangeInDollars =
              (ChangeInDollars * 100) /
              (prod.total_units_sum * prod.Price_avg_last_4_weeks);
            tempDollarImpact.push({
              Product: Product,
              NewPrice: '',
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              totalDollars: prod.total_units_sum * prod.Price_avg_last_4_weeks,
              type: 'product',
              NewDollars: NewDollars,
              ChangeInDollars: ChangeInDollars,
              PercentageChangeInDollars: PercentageChangeInDollars,
            });
          }
        });
        competitors.map((prod) => {
          if (prod.Product === ele.competitor) {
            let Product = prod.Product;
            let NewUnits = prod.total_units_sum + ele.crossEffectValue;
            let ChangeInUnits = NewUnits - prod.total_units_sum;
            let PercentageChangeInUnits =
              (ChangeInUnits * 100) / prod.total_units_sum;
            tempVolumeImpact.push({
              Product: Product,
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              total_units_sum: prod.total_units_sum,
              NewPrice: '',
              type: 'competitor',
              NewUnits: NewUnits,
              ChangeInUnits: ChangeInUnits,
              PercentageChangeInUnits: PercentageChangeInUnits,
            });
            let NewDollars = NewUnits * prod.Price_avg_last_4_weeks;
            let ChangeInDollars =
              NewDollars - prod.total_units_sum * prod.Price_avg_last_4_weeks;
            let PercentageChangeInDollars =
              (ChangeInDollars * 100) /
              (prod.total_units_sum * prod.Price_avg_last_4_weeks);
            tempDollarImpact.push({
              Product: Product,
              NewPrice: '',
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              totalDollars: prod.total_units_sum * prod.Price_avg_last_4_weeks,
              type: 'competitor',
              NewDollars: NewDollars,
              ChangeInDollars: ChangeInDollars,
              PercentageChangeInDollars: PercentageChangeInDollars,
            });
          }
        });
      });
    setVolumeImpact(tempVolumeImpact);
    setDollarImpact(tempDollarImpact);
  };

  /* -----start------ updating the state of the respective products with their impacts -----start------ */
  useEffect(() => {
    let productImpacts = [...filteredSelectedPriceProducts];
    filteredSelectedPriceProducts.map((ele, i) => {
      if (volumeImpact.length > 0) {
        for (let volImp of volumeImpact) {
          if (ele.Product === volImp.Product) {
            productImpacts[i] = {
              ...productImpacts[i],
              newVolume: volImp.NewUnits,
              changeInVolume: volImp.ChangeInUnits,
              percentageChangeInVolume: volImp.PercentageChangeInUnits,
            };
            break;
          } else {
            delete productImpacts[i].newVolume;
            delete productImpacts[i].changeInVolume;
            delete productImpacts[i].percentageChangeInVolume;
          }
        }
        for (let dolImp of dollarImpact) {
          if (ele.Product === dolImp.Product) {
            productImpacts[i] = {
              ...productImpacts[i],
              newDollars: dolImp.NewDollars,
              changeInDollars: dolImp.ChangeInDollars,
              percentageChangeInDollars: dolImp.PercentageChangeInDollars,
            };
            break;
          } else {
            delete productImpacts[i].newDollars;
            delete productImpacts[i].changeInDollars;
            delete productImpacts[i].percentageChangeInDollars;
          }
        }
      } else {
        delete productImpacts[i].newVolume;
        delete productImpacts[i].changeInVolume;
        delete productImpacts[i].percentageChangeInVolume;
        delete productImpacts[i].newDollars;
        delete productImpacts[i].changeInDollars;
        delete productImpacts[i].percentageChangeInDollars;
      }
    });
    let competitorImpacts = [...competitors];
    competitors.map((ele, i) => {
      if (volumeImpact.length > 0) {
        for (let volImp of volumeImpact) {
          if (ele.Product === volImp.Product) {
            competitorImpacts[i] = {
              ...competitorImpacts[i],
              newVolume: volImp.NewUnits,
              changeInVolume: volImp.ChangeInUnits,
              percentageChangeInVolume: volImp.PercentageChangeInUnits,
            };
            break;
          } else {
            delete competitorImpacts[i].newVolume;
            delete competitorImpacts[i].changeInVolume;
            delete competitorImpacts[i].percentageChangeInVolume;
          }
        }
        for (let dolImp of dollarImpact) {
          if (ele.Product === dolImp.Product) {
            competitorImpacts[i] = {
              ...competitorImpacts[i],
              newDollars: dolImp.NewDollars,
              changeInDollars: dolImp.ChangeInDollars,
              percentageChangeInDollars: dolImp.PercentageChangeInDollars,
            };
            break;
          } else {
            delete competitorImpacts[i].newDollars;
            delete competitorImpacts[i].changeInDollars;
            delete competitorImpacts[i].percentageChangeInDollars;
          }
        }
      } else {
        delete competitorImpacts[i].newVolume;
        delete competitorImpacts[i].changeInVolume;
        delete competitorImpacts[i].percentageChangeInVolume;
        delete competitorImpacts[i].newDollars;
        delete competitorImpacts[i].changeInDollars;
        delete competitorImpacts[i].percentageChangeInDollars;
      }
    });

    setCompetitors(competitorImpacts);
    setFilteredSelectedPriceProducts(productImpacts);
  }, [volumeImpact, dollarImpact]);
  /* -----end------ updating the state of the respective products with their impacts -----end------ */

  /* -----start------ Calls Impact handler function on price change -----start------ */
  useEffect(() => {
    if (newPrices.length > 0 || competitorNewPrice.length > 0) {
      impactHandler();
    } else {
      setDollarImpact([]);
      setVolumeImpact([]);
    }
  }, [newPriceChange]);

  /*======================= END ===================================== PRICE SIMULATOR ================================= END ========================*/
  /**************************************************************************************************************************************************/

  /*======================= START ===================================== MARGIN SIMULATOR ================================= START ========================*/

  const handleMarginPriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMarginPriceValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  /*======================= END ===================================== MARGIN SIMULATOR ================================= END ========================*/
  /**************************************************************************************************************************************************/

  function filterCompetitorsHandler(products: any[]) {
    const seenProducts = new Set();
    const uniqueCompetitors = [];

    for (const filteredProduct of products) {
      const competitors = JSON.parse(filteredProduct.Competitors);
      for (const competitor of competitors) {
        const competitorName = competitor.competitor;
        if (!seenProducts.has(competitorName)) {
          const competitorData = priceSimulationData?.find(
            (item: any) =>
              item.Product === competitorName &&
              item.Product !== filteredProduct.Product &&
              !products.some((p) => p.Product === competitorName)
          );
          if (competitorData && competitor.cross_effect > 0) {
            // Create a new object instead of modifying the frozen Redux state
            const modifiedCompetitorData = {
              ...competitorData,
              cross_effect: competitor.cross_effect,
              competitorNewChangeInVolumn: 0,
            };
            uniqueCompetitors.push(modifiedCompetitorData);
            seenProducts.add(competitorName);
          }
        }
      }
    }

    const updatedCompetitors = uniqueCompetitors.map((product) => {
      const competitorTo: any[] = [];
      // Find products that are competitors to the current product
      products.forEach((otherProduct) => {
        if (otherProduct.Product !== product.Product) {
          const otherCompetitors = JSON.parse(otherProduct.Competitors);
          const isCompetitor = otherCompetitors.some(
            (competitor: any) =>
              competitor.competitor === product.Product &&
              competitor.cross_effect > 0
          );
          if (isCompetitor) {
            competitorTo.push({
              Product: otherProduct.Product,
              crossEffect: otherCompetitors.find(
                (competitor: any) => competitor.competitor === product.Product
              ).cross_effect,
            });
          }
        }
      });
      return {
        ...product,
        competitorTo,
      };
    });
    setCompetitors(updatedCompetitors);
  }

  useEffect(() => {
    const fetchRetailerBrandProductApiHandler = async () => {
      try {
        setIsPriceSimulationLoading(true);
        const api = `/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
        const response = await axiosPythonInstance.get(api);

        if (response.status === 200) {
          setRetailerBrandProducts(response?.data?.data);

          // After getting the data, restore the stored state
          const storedState = getStoredState(project_id, model_id);
          console.log(storedState, 'Stored state restored');

          if (storedState) {
            // Restore retailer
            if (storedState.retailer) {
              setSelectedRetailer(storedState.retailer);

              // Call price simulation API handler
              dispatch(
                getPriceSimulation({ 
                  projectId: project_id, 
                  modelId: model_id, 
                  retailer: storedState.retailer 
                })
              );

              // Restore brand
              if (storedState.brand) {
                setSelectedBrand(storedState.brand);
              }

              // Restore products
              if (storedState.products && storedState.products.length > 0) {
                setSelectedProducts(storedState.products);
              }

              // Restore margin values
              if (storedState.priceValues) {
                setMarginPriceValues(storedState.priceValues);
              }
            }
          }

          setIsPriceSimulationLoading(false);
        }
      } catch (error) {
        setIsPriceSimulationLoading(false);
        console.log('Error in fetching retailers', error);
      }
    };

    fetchRetailerBrandProductApiHandler();
  }, []);

  useEffect(() => {
    // Filter data based on selected retailers
    const filteredData = priceSimulationData?.filter((item: any) =>
      selectedProducts.includes(item.Product)
    );
    setFilteredSelectedPriceProducts(filteredData);
    filterCompetitorsHandler(filteredData);

    // Get stored state
    const storedState = getStoredState(project_id, model_id);
    const storedNewPriceChange = storedState?.newPriceChange || [];

    // Restore prices for currently selected products
    if (filteredData && filteredData.length > 0) {
      // Create new prices array for current selection, preserving stored values
      const restoredPrices: string[] = [];
      filteredData.forEach((product: any, index:number) => {
        // Find stored price for this specific product from newPriceChange
        const productPriceData = storedNewPriceChange.find(
          (item: any) =>
            item.Product === product.Product && item.type === 'product'
        );
        restoredPrices[index] = productPriceData
          ? productPriceData.newPrice
          : '';
      });
      setNewPrices(restoredPrices);

      // Recreate newPriceChange for calculations
      const priceChanges = filteredData
        .map((product: any, index: number) => ({
          ...product,
          type: 'product',
          newPrice: restoredPrices[index] || '',
        }))
        .filter((item: any) => item.newPrice !== ''); // Only include items with actual prices

      setNewPriceChange(priceChanges);
    } else {
      // No filtered data, initialize empty arrays
      setNewPrices([]);
      setNewPriceChange([]);
    }

    setShowCompetitorResults(true);
    setShowProductResults(true);
  }, [selectedProducts, priceSimulationData]);

  // Separate useEffect to handle competitor price restoration after competitors are set
  useEffect(() => {
    if (!competitors || competitors.length === 0 || isRestoringRef.current) return;

    isRestoringRef.current = true;

    const storedState = getStoredState(project_id, model_id);
    const storedNewPriceChange = storedState?.newPriceChange || [];

    // Handle competitor prices for the UI arrays
    const restoredCompetitorPrices: string[] = [];
    competitors.forEach((competitor: any, index) => {
      const competitorPriceData = storedNewPriceChange.find(
        (item: any) =>
          item.Product === competitor.Product && item.type === 'competitor'
      );
      restoredCompetitorPrices[index] = competitorPriceData
        ? competitorPriceData.newPrice
        : '';
    });
    setCompetitorNewPrice(restoredCompetitorPrices);

    // Handle competitor prices for calculations
    const competitorChanges = competitors
      .map((competitor, index) => {
        const competitorPriceData = storedNewPriceChange.find(
          (item: any) =>
            item.Product === competitor.Product && item.type === 'competitor'
        );
        return {
          ...competitor,
          type: 'competitor',
          newPrice: competitorPriceData ? competitorPriceData.newPrice : '',
        };
      })
      .filter((item) => item.newPrice !== '');

    // Update newPriceChange to include competitor changes
    setNewPriceChange((prev) => {
      const productChanges = prev.filter((item) => item.type === 'product');
      return [...productChanges, ...competitorChanges];
    });

    // Reset the flag after a short delay
    setTimeout(() => {
      isRestoringRef.current = false;
    }, 100);
  }, [competitors, project_id, model_id]);

  // Add useEffect to trigger impact calculation when newPriceChange is updated
  useEffect(() => {
    if (newPriceChange && newPriceChange.length > 0) {
      impactHandler();
    }
  }, [newPriceChange]);

  // Add useEffect to trigger impact calculation when newPriceChange is updated
  useEffect(() => {
    if (newPriceChange && newPriceChange.length > 0) {
      impactHandler();
    }
  }, [newPriceChange]);

  // Handle margin data from Redux
  useEffect(() => {
    if (marginData && marginData.length > 0) {
      setMarginSimulationData(marginData);
      
      const basePrice = !isNaN(marginData[0]?.Price_avg_last_4_weeks)
        ? marginData[0]?.Price_avg_last_4_weeks
        : 0;
      
      setMarginPriceValues((prevInputValues) => ({
        ...prevInputValues,
        basePriceElasticity: marginData[0]?.Base_Price_Elasticity,
        basePrice: parseFloat(basePrice).toFixed(2),
      }));
    }
  }, [marginData]);

  useEffect(() => {
    if (selectedProduct1 && typeof selectedProduct1 === 'object' && selectedProduct1.Product && selectedRetailer) {
      marginSimulationApiHandler(selectedProduct1.Product);

      // Save updated state with selectedProduct1.product
      const currentState = getStoredState(project_id, model_id) || {};
      const newState = {
        ...currentState,
        product: selectedProduct1.Product,
      };
      saveState(project_id, model_id, newState);
    }
  }, [selectedProduct1, selectedRetailer]);

  // Margin simulator useEffect
  useEffect(() => {
    const changeInPrice = [
      -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11,
      -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    ];
    const TotalVolume = marginSimulationData[0]?.total_units_sum || 0;
    const BasePriceElasticity = parseFloat(
      marginPriceValues.basePriceElasticity || '0'
    );
    const listPrice = parseFloat(marginPriceValues.listPrice || '0');
    const basePrice = parseFloat(marginPriceValues.basePrice || '0');
    const cogs = parseFloat(marginPriceValues.cogs?.toString() || '0');

    // Formula
    const newUnits = changeInPrice.map(
      (change) =>
        TotalVolume +
        TotalVolume * ((1 + change / 100) ** BasePriceElasticity - 1)
    ); // Volume (pounds)
    const baseMrev = newUnits.map((unit) => unit * listPrice);
    const baseMtrade = changeInPrice.map(
      (change, index) =>
        newUnits[index] * (basePrice - basePrice * (1 + change / 100))
    );
    const baseMnetRev = baseMrev.map((rev, index) => rev - baseMtrade[index]);
    const mProfit = baseMnetRev.map(
      (netRev, index) => netRev - newUnits[index] * cogs
    ); // Manufacture profit
    // Annual Sales
    const annualSales = newUnits.map(
      (unit, index) => unit * basePrice * (1 + changeInPrice[index] / 100)
    );

    setMarginChartData({
      ...marginChartData,
      manufacturerProfit: mProfit,
      annualProfit: annualSales,
    });
  }, [marginPriceValues]);

  // Add effect to save state when values change
  useEffect(() => {
    if (!retailerBrandProducts) return; // Don't save if data isn't loaded

    const currentState = getStoredState(project_id, model_id) || {};
    const state = {
      retailer: selectedRetailer || currentState.retailer,
      brand: selectedBrand || currentState.brand,
      product: selectedProduct || currentState.product,
      products: selectedProducts?.length
        ? selectedProducts
        : currentState.products,
      newPrices: newPrices?.length ? newPrices : currentState.newPrices,
      competitorNewPrice: competitorNewPrice?.length
        ? competitorNewPrice
        : currentState.competitorNewPrice,
      newPriceChange: newPriceChange?.length ? newPriceChange : currentState.newPriceChange,
      priceValues: Object.keys(marginPriceValues).some(
        (key) => marginPriceValues[key as keyof typeof marginPriceValues]
      )
        ? marginPriceValues
        : currentState.priceValues || marginPriceValues,
    };

    saveState(project_id, model_id, state);
  }, [
    retailerBrandProducts,
    selectedRetailer,
    selectedBrand,
    selectedProduct,
    selectedProducts,
    newPrices,
    competitorNewPrice,
    newPriceChange,
    marginPriceValues,
    project_id,
    model_id,
  ]);

  const runSimulation = () => {
    setIsRunning(true);
    setSimulationProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setHasRunAnalysis(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      {/* Header */}
      {/* <SimulatorPageHeader
      // (pass necessary props accordingly)
      /> */}
      {/* Main Content */}
      <div className="w-full">
        <div className="space-y-8">
          {/* Filters Section */}
          <div className="px-8">
            <SimulatorFilters
              onRunAnalysis={runSimulation} // your runSimulation handler here
              isRunning={isRunning}
              selectedRetailer={selectedRetailer}
              setSelectedRetailer={setSelectedRetailer}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              retailers={retailers}
              brands={brands}
              products={products}
              handleRetailerChange={handleRetailerChange}
              handleBrandChange={handleBrandChange}
              handleProductsChangeForPrice={handleProductsChangeForPrice}
              handleProductChange={handleProductChange}
            />
          </div>

          {/* Analysis Results - Only show after running analysis */}
          {hasRunAnalysis && (
            <>
              {/* Price Simulator Section */}
              <div className="px-8">
                <ProductSection
                  products={priceSimulationData}
                  newPrice={newPrices}
                  filteredSelectedPriceProducts={filteredSelectedPriceProducts}
                  type="product"
                  showProductResults={showProductResults}
                  showResults={showProductResults}
                  selectedProducts={selectedProducts}
                  onPriceChange={handleNewPriceOnChange}
                  marginPriceValues={marginPriceValues}
                  marginSimulationData={marginSimulationData}
                  marginChartData={marginChartData}
                  isPriceSimulationLoading={isPriceSimulationLoading}
                  handleMarginPriceInputChange={handleMarginPriceInputChange}
                  setSelectedProduct1={setSelectedProduct1}
                />
              </div>

              {/* Relevant Competitors Section */}
              <div className="px-8">
                <RelevantCompetitorsSection
                  type="competitor"
                  newPrice={competitorNewPrice}
                  filteredSelectedPriceProducts={competitors}
                  handleNewPriceChange={handleNewPriceOnChange}
                  showResults={showCompetitorResults}
                  selctedProducts={selectedProducts}
                />
              </div>
            </>
          )}

          {/* Loading State */}
          {isRunning && (
            <div className="px-8 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="h-8 w-8 rounded-full border-2 border-white border-t-transparent"
                />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Applying ....
              </h3>
              <p className="mb-4 text-gray-600">
                Processing your simulation data...
              </p>
              <div className="mx-auto h-2 w-64 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${simulationProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {simulationProgress}% complete
              </p>
            </div>
          )}

          {/* Empty State */}
          {!hasRunAnalysis && !isRunning && (
            <div className="px-8 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Play className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Price Analysis
              </h3>
              <p className="text-gray-600">
                Configure your filters above and click on apply the analysis to
                see simulation results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
