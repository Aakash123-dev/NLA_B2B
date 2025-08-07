import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPriceSimulationData,
  getMarginSimulationData,
  fetchPromoEventSimulationData,
} from '@/services/simulation/priceSimulationServices';

// 👉 Thunk for Price Simulation
export const getPriceSimulation = createAsyncThunk(
  'priceSimulation/getPriceSimulation',
  async (
    { projectId, modelId, retailer }: { projectId: number; modelId: number; retailer: string },
    thunkAPI
  ) => {
    try {
      const data = await fetchPriceSimulationData(projectId, modelId, retailer);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
    }: { projectId: number; modelId: number; retailer: string; product: string },
    thunkAPI
  ) => {
    try {
      const data = await getMarginSimulationData(projectId, modelId, retailer, product);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
    }: { projectId: number; modelId: number; retailer: string; product: string },
    thunkAPI
  ) => {
    try {
      const data = await fetchPromoEventSimulationData(projectId, modelId, retailer, product);
      return { data, product };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 👉 Slice
const priceSimulationSlice = createSlice({
  name: 'priceSimulation',
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,

    marginData: [],
    marginLoading: false,
    marginError: null as string | null,

    promoData: [],
    promoLoading: false,
    promoError: null as string | null,

    promoMeta: {
      product: '',
      basePrice: '',
      total_units_sum: '',
      originalBasePrice: '',
      originalTotalUnits: '',
      promoPriceElasticity: '',
      basePriceElasticity: '',
    },
  },
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
        state.data = action.payload;
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
        state.marginData = action.payload;
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
        state.promoData = action.payload.data;

        const firstItem = action.payload.data?.[0] || {};

        const basePrice = !isNaN(firstItem?.Price_avg_last_4_weeks)
          ? firstItem?.Price_avg_last_4_weeks
          : 0;

        const totalUnits = firstItem?.total_units_sum / 52 || 0;

        state.promoMeta = {
          product: action.payload.product,
          basePrice: basePrice.toString(),
          originalBasePrice: basePrice.toString(),
          total_units_sum: totalUnits.toString(),
          originalTotalUnits: totalUnits.toString(),
          promoPriceElasticity: firstItem?.Promo_Price_Elasticity || '',
          basePriceElasticity: firstItem?.Base_Price_Elasticity || '',
        };
      })
      .addCase(getPromoEventSimulation.rejected, (state, action) => {
        state.promoLoading = false;
        state.promoError = action.payload as string;
      });
  },
});

export default priceSimulationSlice.reducer;
