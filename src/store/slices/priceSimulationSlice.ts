import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPriceSimulationData,
  getMarginSimulationData,
  fetchPromoEventSimulationData,
} from '@/services/simulation/priceSimulationServices';

// 👉 Type definitions
interface PriceSimulationPayload {
  projectId: number;
  modelId: number;
  retailer: string;
}

interface MarginSimulationPayload extends PriceSimulationPayload {
  product: string;
}

interface PromoEventSimulationPayload extends MarginSimulationPayload {}

interface PromoMeta {
  product: string;
  basePrice: string;
  total_units_sum: string;
  originalBasePrice: string;
  originalTotalUnits: string;
  promoPriceElasticity: string;
  basePriceElasticity: string;
}

interface PriceSimulationState {
  data: any[];
  loading: boolean;
  error: string | null;

  marginData: any[];
  marginLoading: boolean;
  marginError: string | null;

  promoData: any[];
  promoLoading: boolean;
  promoError: string | null;

  promoMeta: PromoMeta;
}

// 👉 Thunk for Price Simulation
export const getPriceSimulation = createAsyncThunk(
  'priceSimulation/getPriceSimulation',
  async (
    { projectId, modelId, retailer }: PriceSimulationPayload,
    thunkAPI
  ) => {
    try {
      const data = await fetchPriceSimulationData(projectId, modelId, retailer);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch price simulation data');
    }
  }
);

// 👉 Thunk for Margin Simulation
export const getMarginSimulation = createAsyncThunk(
  'priceSimulation/getMarginSimulation',
  async (
    {
      projectId,
      modelId,
      retailer,
      product,
    }: MarginSimulationPayload,
    thunkAPI
  ) => {
    try {
      const data = await getMarginSimulationData(projectId, modelId, retailer, product);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch margin simulation data');
    }
  }
);

// 👉 Thunk for Promo Event Simulation
export const getPromoEventSimulation = createAsyncThunk(
  'priceSimulation/getPromoEventSimulation',
  async (
    {
      projectId,
      modelId,
      retailer,
      product,
    }: PromoEventSimulationPayload,
    thunkAPI
  ) => {
    try {
      const data = await fetchPromoEventSimulationData(projectId, modelId, retailer, product);
      return { data, product };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch promo event simulation data');
    }
  }
);

// 👉 Initial state
const initialState: PriceSimulationState = {
  data: [],
  loading: false,
  error: null,

  marginData: [],
  marginLoading: false,
  marginError: null,

  promoData: [],
  promoLoading: false,
  promoError: null,

  promoMeta: {
    product: '',
    basePrice: '',
    total_units_sum: '',
    originalBasePrice: '',
    originalTotalUnits: '',
    promoPriceElasticity: '',
    basePriceElasticity: '',
  },
};

// 👉 Slice
const priceSimulationSlice = createSlice({
  name: 'priceSimulation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 👉 Price Simulation Cases
    builder
      .addCase(getPriceSimulation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPriceSimulation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(getPriceSimulation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 👉 Margin Simulation Cases
    builder
      .addCase(getMarginSimulation.pending, (state) => {
        state.marginLoading = true;
        state.marginError = null;
      })
      .addCase(getMarginSimulation.fulfilled, (state, action) => {
        state.marginLoading = false;
        state.marginData = action.payload || [];
      })
      .addCase(getMarginSimulation.rejected, (state, action) => {
        state.marginLoading = false;
        state.marginError = action.payload as string;
      });

    // 👉 Promo Event Simulation Cases
    builder
      .addCase(getPromoEventSimulation.pending, (state) => {
        state.promoLoading = true;
        state.promoError = null;
      })
      .addCase(getPromoEventSimulation.fulfilled, (state, action) => {
        state.promoLoading = false;
        state.promoData = action.payload?.data || [];

        const firstItem = action.payload?.data?.[0] || {};

        const basePrice = !isNaN(Number(firstItem?.Price_avg_last_4_weeks))
          ? Number(firstItem?.Price_avg_last_4_weeks)
          : 0;

        const totalUnits = (firstItem?.total_units_sum / 52) || 0;

        state.promoMeta = {
          product: action.payload?.product || '',
          basePrice: basePrice.toString(),
          originalBasePrice: basePrice.toString(),
          total_units_sum: totalUnits.toString(),
          originalTotalUnits: totalUnits.toString(),
          promoPriceElasticity: firstItem?.Promo_Price_Elasticity?.toString() || '',
          basePriceElasticity: firstItem?.Base_Price_Elasticity?.toString() || '',
        };
      })
      .addCase(getPromoEventSimulation.rejected, (state, action) => {
        state.promoLoading = false;
        state.promoError = action.payload as string;
      });
  },
});

export default priceSimulationSlice.reducer;
