'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import {
  SimulatorPageHeader,
  SimulatorFilters,
  ProductSection,
  RelevantCompetitorsSection,
} from './components';
import { axiosPythonInstance } from '@/services/projectservices/axiosInstance';
import { useSearchParams } from 'next/navigation';

const getStorageKey = (projectId: number, modelId: number) => {
  return `simulator_state_${projectId}_${modelId}`;
};

const getStoredState = (projectId: number, modelId: number) => {
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
  const [retailerBrandProducts, setRetailerBrandProducts] = useState([]);
  const [priceSimulationData, setPriceSimulationData] = useState([]);
  const [marginSimulationData, setMarginSimulationData] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [competitorNewPrice, setCompetitorNewPrice] = useState([]);
  const [simulatorType, setSimulatorType] = React.useState('price');
  // Price simulation states
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredSelectedPriceProducts, setFilteredSelectedPriceProducts] =
    useState([]);
  const [newPrices, setNewPrices] = useState([]);
  const [showProductResults, setShowProductResults] = useState(false);
  const [showCompetitorResults, setShowCompetitorResults] = useState(false);
  // Margin simulation states
  const [marginPriceValues, setMarginPriceValues] = useState({
    listPrice: '',
    edlpSpend: '',
    netUnitPrice: '',
    cogs: null,
    basePriceElasticity: '',
    basePrice: '',
  });

  const [marginChartData, setMarginChartData] = useState({
    manufacturerProfit: [],
    annualProfit: [],
  });

  // Common Pirce/Margin simulator states
  const [selectedRetailer, setSelectedRetailer] = useState<any>('');
  const [selectedBrand, setSelectedBrand] = useState<any>('');
  const [selectedProduct, setSelectedProduct] = useState<any>('');
  /* Promo Event Simulation States */
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

  const [promoSimulationData, setPromoSimulationData] = useState([]);
  const [discount, setDiscount] = React.useState('');
  const [lift, setLift] = React.useState({});
  const [units, setUnits] = React.useState({});
  const [dollars, setDollars] = React.useState({});
  const [promoEventChartData, setpromoEventChartData] = React.useState([]);

  const retailers = Object?.keys(retailerBrandProducts || {});
  let brands =
    selectedRetailer && retailerBrandProducts
      ? Object?.keys(retailerBrandProducts[selectedRetailer] || {})
      : [];
  let products =
    selectedBrand && selectedRetailer && retailerBrandProducts
      ? retailerBrandProducts[selectedRetailer][selectedBrand] || []
      : [];

  /* -----start----- Margin API handler -----start----- */
  const marginSimulationApiHandler = async (product: any) => {
    setIsPriceSimulationLoading(true);
    try {
      const api = `/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${selectedRetailer}&Product=${product}`;
      const response = await axiosPythonInstance.get(api);
      if (response.status === 200) {
        setMarginSimulationData(response?.data?.data);
        const basePrice = !isNaN(
          response?.data?.data[0]?.Price_avg_last_4_weeks
        )
          ? response?.data?.data[0]?.Price_avg_last_4_weeks
          : 0;
        setMarginPriceValues((prevInputValues) => ({
          ...prevInputValues,
          basePriceElasticity: response?.data?.data[0]?.Base_Price_Elasticity,
          basePrice: parseFloat(basePrice).toFixed(2),
        }));
        setIsPriceSimulationLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsPriceSimulationLoading(false);
      console.log('Error in fetching margin simulation data: ', error);
      return null;
    }
  };

  /* -----end----- Margin API handler -----end----- */

  /* -----start----- Common handlers -----start----- */
  const [isAllProductSelected, setIsAllProductSelected] = useState(false);

  const handleProductsChangeForPrice = (values: any) => {
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
    return setSelectedProducts(values);
  };

  // Retailer change handler
  const handleRetailerChange = (value: any) => {
    setIsAllProductSelected(false);
    setSelectedRetailer(value);
    setSelectedBrand('');
    setSelectedProduct('');
    setSelectedProducts([]);

    // Clear related data for all simulator types
    if (simulatorType === 'price') {
      setFilteredSelectedPriceProducts([]);
      setCompetitors([]);
      setNewPrices([]);
      setCompetitorNewPrice([]);
      setNewPriceChange([]);
      setVolumeImpact([]);
      setDollarImpact([]);
      setShowProductResults(false);
      setShowCompetitorResults(false);
      getPriceSimulationApiHandler(value);
    } else if (simulatorType === 'margin') {
      setMarginSimulationData([]);
      setMarginPriceValues({
        listPrice: '',
        edlpSpend: '',
        netUnitPrice: '',
        cogs: null,
        basePriceElasticity: '',
        basePrice: '',
      });
      setMarginChartData({
        manufacturerProfit: [],
        annualProfit: [],
      });
    } else if (simulatorType === 'promo') {
      setPromoSimulationData([]);
      setPromoEventPriceValues({
        promoPrice: '',
        discount: '',
        total_units_sum: '',
        discount: null,
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
      });
      setDiscount('');
      setLift({});
      setUnits({});
      setDollars({});
      setpromoEventChartData([]);
    }

    // Save the updated state immediately
    const currentState = getStoredState(project_id, model_id);
    const newState = {
      ...currentState,
      [simulatorType]: {
        ...currentState[simulatorType],
        retailer: value,
        brand: '',
        product: '',
        products: [],
        newPrices: [],
        competitorNewPrice: [],
        priceValues:
          simulatorType === 'margin'
            ? {
                listPrice: '',
                edlpSpend: '',
                netUnitPrice: '',
                cogs: null,
                basePriceElasticity: '',
                basePrice: '',
              }
            : simulatorType === 'promo'
              ? {
                  promoPrice: '',
                  discount: '',
                  total_units_sum: '',
                  discount: null,
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
                }
              : {},
      },
    };
    saveState(project_id, model_id, newState);
  };

  // Brand change handler
  const handleBrandChange = (value: any) => {
    setIsAllProductSelected(false);
    setSelectedBrand(value);
    setSelectedProduct('');
    setSelectedProducts([]);

    // Clear product-dependent data for all simulator types
    if (simulatorType === 'price') {
      setNewPrices([]);
      setCompetitorNewPrice([]);
      setNewPriceChange([]);
      setVolumeImpact([]);
      setDollarImpact([]);
      setShowProductResults(false);
      setShowCompetitorResults(false);
    } else if (simulatorType === 'margin') {
      setMarginSimulationData([]);
      setMarginPriceValues({
        listPrice: '',
        edlpSpend: '',
        netUnitPrice: '',
        cogs: null,
        basePriceElasticity: '',
        basePrice: '',
      });
      setMarginChartData({
        manufacturerProfit: [],
        annualProfit: [],
      });
    } else if (simulatorType === 'promo') {
      setPromoSimulationData([]);
      setPromoEventPriceValues({
        promoPrice: '',
        discount: '',
        total_units_sum: '',
        discount: null,
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
      });
      setDiscount('');
      setLift({});
      setUnits({});
      setDollars({});
      setpromoEventChartData([]);
    }

    // Save the updated state immediately
    const currentState = getStoredState(project_id, model_id);
    const newState = {
      ...currentState,
      [simulatorType]: {
        ...currentState[simulatorType],
        brand: value,
        product: '',
        products: [],
        newPrices: [],
        competitorNewPrice: [],
      },
    };
    saveState(project_id, model_id, newState);
  };
  /* -----end----- Common handlers -----end----- */

  /******************************************************************************************************************************************************/
  /*======================= START ===================================== PRICE SIMULATOR ================================= START ========================*/

  /* -----start----- Api Handler -----start----- */
  const getPriceSimulationApiHandler = async (retailer) => {
    setIsPriceSimulationLoading(true);
    try {
      const api = `/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${retailer}`;
      const response = await axiosPythonInstance.get(api);
      if (response.status === 200) {
        setPriceSimulationData(response?.data?.data);
        setIsPriceSimulationLoading(false);
        return response.data;
      }
    } catch (error) {
      setIsPriceSimulationLoading(false);
      console.log('Error in fetching simulation data: ', error);
      return null;
    }
  };
  /* -----start----- Api Handler -----start----- */

  /* -----start----- Price change Handler -----start----- */
  const [newPriceChange, setNewPriceChange] = useState([]);

  const handleNewPriceOnChange = (index, event, product, type) => {
    const newValue = event.target?.value || event.value || event; // Handle both event types
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

    // Save the updated state to localStorage
    const currentState = getStoredState(project_id, model_id);
    const newState = {
      ...currentState,
      [simulatorType]: {
        ...currentState[simulatorType],
        newPrices:
          type === 'product'
            ? [...newPrices].map((price, i) => (i === index ? newValue : price))
            : currentState[simulatorType]?.newPrices || [],
        competitorNewPrice:
          type === 'competitor'
            ? [...competitorNewPrice].map((price, i) =>
                i === index ? newValue : price
              )
            : currentState[simulatorType]?.competitorNewPrice || [],
        newPriceChange: temp,
      },
    };
    saveState(project_id, model_id, newState);
  };
  /* -----end----- Price change Handler -----end----- */

  /* -----start------ Impact handler function when there is a change in Price -----start----- */
  const [volumeImpact, setVolumeImpact] = useState([]);
  const [dollarImpact, setDollarImpact] = useState([]);

  const impactHandler = () => {
    let tempVolumeImpact = [];
    let tempDollarImpact = [];
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

  const crossEffectHandler = (volumeImpact, dollarImpact) => {
    let productCompetitorCrossEffects = [];
    if (volumeImpact.length > 0) {
      //gets cross effect values within selected products
      volumeImpact.map((ele) => {
        filteredSelectedPriceProducts.map((val) => {
          if (val.Product === ele.Product && ele.type === 'product') {
            let crossEffects = [];
            let sum = 0;
            let comps = JSON.parse(val.Competitors).filter(
              (comp) => comp.cross_effect > 0
            );
            comps.length > 0 &&
              comps.map((comp) => {
                if (comp.cross_effect > 0) {
                  sum = sum + comp.cross_effect;
                }
              });
            comps.length > 0 &&
              comps.map((comp) => {
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
            let crossEffects = [];
            let comps = JSON.parse(val.Competitors).filter(
              (comp) => comp.cross_effect > 0
            );
            // console.log("comps", comps, val);
            let sum = 0;
            comps.length > 0 &&
              comps.map((comp) => {
                if (comp.cross_effect > 0) {
                  sum = sum + comp.cross_effect;
                }
              });
            comps.length > 0 &&
              comps.map((comp) => {
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

  function filterCompetitorsHandler(products) {
    // console.log("\n\nproducts from filterCompetitorsHandler:::::::: ", products);

    const seenProducts = new Set();
    const uniqueCompetitors = [];

    for (const filteredProduct of products) {
      const competitors = JSON.parse(filteredProduct.Competitors);
      for (const competitor of competitors) {
        const competitorName = competitor.competitor;
        if (!seenProducts.has(competitorName)) {
          const competitorData = priceSimulationData?.find(
            (item) =>
              item.Product === competitorName &&
              item.Product !== filteredProduct.Product &&
              !products.some((p) => p.Product === competitorName)
          );
          if (competitorData && competitor.cross_effect > 0) {
            competitorData.cross_effect = competitor.cross_effect;
            competitorData.competitorNewChangeInVolumn = 0;
            uniqueCompetitors.push(competitorData);
            seenProducts.add(competitorName);
          }
        }
      }
    }

    const updatedCompetitors = uniqueCompetitors.map((product) => {
      const competitorTo = [];
      // Find products that are competitors to the current product
      products.forEach((otherProduct) => {
        if (otherProduct.Product !== product.Product) {
          const otherCompetitors = JSON.parse(otherProduct.Competitors);
          const isCompetitor = otherCompetitors.some(
            (competitor) =>
              competitor.competitor === product.Product &&
              competitor.cross_effect > 0
          );
          if (isCompetitor) {
            competitorTo.push({
              Product: otherProduct.Product,
              crossEffect: otherCompetitors.find(
                (competitor) => competitor.competitor === product.Product
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
          if (storedState) {
            // Set simulator type
            setSimulatorType(storedState.currentType || 'price');

            // Restore price simulator state
            if (storedState.price) {
              const priceState = storedState.price;

              if (priceState.retailer) {
                setSelectedRetailer(priceState.retailer);
                // Trigger API call for price simulation
                const priceResponse = await getPriceSimulationApiHandler(
                  priceState.retailer
                );

                // Only proceed with other settings if API call was successful
                if (priceResponse) {
                  if (priceState.brand) {
                    setSelectedBrand(priceState.brand);
                  }

                  if (priceState.products && priceState.products.length > 0) {
                    setSelectedProducts(priceState.products);

                    // First get the filtered products data
                    const filteredData = priceResponse.data?.filter((item) =>
                      priceState.products.includes(item.Product)
                    );
                    setFilteredSelectedPriceProducts(filteredData);
                    filterCompetitorsHandler(filteredData);

                    // Then restore prices and trigger calculations
                    if (
                      priceState.newPrices &&
                      priceState.newPrices.length > 0
                    ) {
                      setNewPrices(priceState.newPrices);

                      // Create price change events with complete product data
                      const priceChanges = filteredData.map(
                        (product, index) => ({
                          ...product,
                          type: 'product',
                          newPrice: priceState.newPrices[index],
                        })
                      );

                      // If there are competitor prices, add them
                      if (
                        priceState.competitorNewPrice &&
                        priceState.competitorNewPrice.length > 0
                      ) {
                        setCompetitorNewPrice(priceState.competitorNewPrice);

                        // Get competitor data and add their price changes
                        const competitorChanges = competitors.map(
                          (competitor, index) => ({
                            ...competitor,
                            type: 'competitor',
                            newPrice: priceState.competitorNewPrice[index],
                          })
                        );

                        // Combine product and competitor changes
                        setNewPriceChange([
                          ...priceChanges,
                          ...competitorChanges,
                        ]);
                      } else {
                        setNewPriceChange(priceChanges);
                      }

                      // Show results sections
                      setShowProductResults(true);
                      setShowCompetitorResults(true);
                    }
                  }
                }
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
    const filteredData = priceSimulationData?.filter((item) =>
      selectedProducts.includes(item.Product)
    );
    setFilteredSelectedPriceProducts(filteredData);
    filterCompetitorsHandler(filteredData);

    // Get stored state
    const storedState = getStoredState(project_id, model_id);
    const storedPrices = storedState?.price?.newPrices;
    const storedCompetitorPrices = storedState?.price?.competitorNewPrice;

    // Restore prices for currently selected products
    if (storedPrices && filteredData && filteredData.length > 0) {
      // Create new prices array for current selection, preserving stored values
      const restoredPrices = [];
      filteredData.forEach((product, index) => {
        // Find stored price for this specific product (look for it in stored newPriceChange)
        const storedPriceChange = storedState?.price?.newPriceChange || [];
        const productPriceData = storedPriceChange.find(
          (item) => item.Product === product.Product && item.type === 'product'
        );
        restoredPrices[index] = productPriceData
          ? productPriceData.newPrice
          : '';
      });
      setNewPrices(restoredPrices);

      // Recreate newPriceChange for calculations
      const priceChanges = filteredData
        .map((product, index) => ({
          ...product,
          type: 'product',
          newPrice: restoredPrices[index] || '',
        }))
        .filter((item) => item.newPrice !== ''); // Only include items with actual prices

      if (
        storedCompetitorPrices &&
        storedCompetitorPrices.length > 0 &&
        competitors
      ) {
        const competitorChanges = competitors
          .map((competitor, index) => ({
            ...competitor,
            type: 'competitor',
            newPrice: storedCompetitorPrices[index] || '',
          }))
          .filter((item) => item.newPrice !== '');
        setNewPriceChange([...priceChanges, ...competitorChanges]);
      } else {
        setNewPriceChange(priceChanges);
      }
    } else {
      // No stored prices, initialize empty arrays based on current selection
      setNewPrices(new Array(filteredData.length).fill(''));
      setNewPriceChange([]);
    }

    // Handle competitor prices separately
    if (storedCompetitorPrices && competitors?.length > 0) {
      setCompetitorNewPrice(
        storedCompetitorPrices.slice(0, competitors.length)
      );
    } else {
      setCompetitorNewPrice(new Array(competitors?.length || 0).fill(''));
    }

    setShowCompetitorResults(true);
    setShowProductResults(true);
  }, [selectedProducts, priceSimulationData]);

  // Add useEffect to trigger impact calculation when newPriceChange is updated
  useEffect(() => {
    if (newPriceChange && newPriceChange.length > 0) {
      impactHandler();
    }
  }, [newPriceChange]);

  // Add effect to save state when values change
  useEffect(() => {
    if (!retailerBrandProducts) return; // Don't save if data isn't loaded

    const currentState = getStoredState(project_id, model_id) || {};
    const state = {
      currentType: simulatorType,
      price: {
        ...currentState.price,
        retailer: selectedRetailer || currentState.price?.retailer,
        brand: selectedBrand || currentState.price?.brand,
        products: selectedProducts?.length
          ? selectedProducts
          : currentState.price?.products,
        newPrices: newPrices?.length
          ? newPrices
          : currentState.price?.newPrices,
        competitorNewPrice: competitorNewPrice?.length
          ? competitorNewPrice
          : currentState.price?.competitorNewPrice,
      },
    };

    saveState(project_id, model_id, state);
  }, [
    retailerBrandProducts,
    simulatorType,
    selectedRetailer,
    selectedBrand,
    selectedProducts,
    selectedProduct,
    newPrices,
    competitorNewPrice,
    marginPriceValues,
    promoEventPriceValues,
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
              handleRetailerChange={handleRetailerChange}
              selectedBrand={selectedBrand}
              handleBrandChange={handleBrandChange}
              selectedProducts={selectedProducts}
              handleProductsChangeForPrice={handleProductsChangeForPrice}
              retailers={retailers}
              brands={brands}
              products={products}
            />
          </div>

          {/* Analysis Results - Only show after running analysis */}
          {hasRunAnalysis && (
            <>
              {/* Product Analysis Section */}
              <div className="px-8">
                <ProductSection
                  products={priceSimulationData}
                  newPrice={newPrices}
                  filteredSelectedPriceProducts={filteredSelectedPriceProducts}
                  type="product"
                  showResults={showProductResults}
                  selectedProducts={selectedProducts}
                  onPriceChange={handleNewPriceOnChange}
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
                For Analyze
              </h3>
              <p className="text-gray-600">
                Configure your filters above and click on apply the analysis to
                see results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
