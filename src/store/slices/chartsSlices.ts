// src/store/chartSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getChart1RawData,
  getChart2RawData,
  fetchChart3Data,
  fetchChart4Data,
  fetchChart5Data,
  fetchChart6Data,
  fetchChart7Data,
  fetchChart8Data,
  fetchChart9Data,
} from '@/services/projectservices/chartServices';

export type ChartItem = {
  Brand: string;
  Retailer: string;
  Product: string;
  Price_avg_last_4_weeks: number;
};

export type Chart2Item = {
  Brand: string;
  Retailer: string;
  Product: string;
  Promo_Price_Elasticity: number;
};

export type Chart3Item = {
  Brand: string;
  Product: string;
  Retailer: string;
  Incremental_Sales: number;
};

export type Chart6Item = {
  Retailer: string;
  Product: string;
  Average_discount_depth: number;
  Promo_Price_Elasticity: number;
};

export type Chart7Item = {
  Retailer: string;
  Product: string;
  tpr_avg: number;
};

export type Chart8Item = {
  Retailer: string;
  Product: string;
  [key: string]: string | number;
};

export type Chart9Item = {
  Retailer: string;
  Product: string;
  Base_Price_Elasticity: number;
  Promo_Price_Elasticity: number;
};

interface ChartState {
  data: ChartItem[]; // Chart 1
  data2: Chart2Item[]; // Chart 2
  data3: Chart3Item[]; // Chart 3
  data4: any[]; // Chart 4 raw data
  data5: any[]; //Chart 5 raw data
  data6: Chart6Item[]; //chart 6 raw data
  data7: Chart7Item[]; // chart 7 raw data
  data8: Chart8Item[]; // chart 8 raw data
  data9: Chart9Item[]; // chart 9 raw data
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

const initialState: ChartState = {
  data: [],
  data2: [],
  data3: [],
  data4: [],
  data5: [],
  data6: [],
  data7: [],
  data8: [],
  data9: [],
  loading: false,
  error: null,
  hasLoaded: false,
};

// Chart 1 thunk
export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await getChart1RawData(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 1 data');
    }
  }
);

// Chart 2 thunk
export const fetchChart2Data = createAsyncThunk(
  'chart/fetchChart2Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await getChart2RawData(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 2 data');
    }
  }
);

// Chart 3 thunk
export const fetchChart3DataThunk = createAsyncThunk(
  'chart/fetchChart3Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await fetchChart3Data(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 3 data');
    }
  }
);

// Chart 4 thunk (raw data only)
export const fetchChart4DataThunk = createAsyncThunk(
  'chart/fetchChart4Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await fetchChart4Data(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 4 data');
    }
  }
);

// Chart 5 thunk
export const fetchChart5DataThunk = createAsyncThunk(
  'chart/fetchChart5Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await fetchChart5Data(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 5 data');
    }
  }
);

// chart 6 thunk
export const fetchChart6DataThunk = createAsyncThunk(
  'chart/fetchChart6Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await fetchChart6Data(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 6 data');
    }
  }
);

// chart 7 thunk
export const fetchChart7DataThunk = createAsyncThunk(
  'chart/fetchChart7Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await fetchChart7Data(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 7 data');
    }
  }
);

export const fetchChart8DataThunk = createAsyncThunk(
  'chart/fetchChart8Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await fetchChart8Data(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 8 data');
    }
  }
);

export const fetchChart9DataThunk = createAsyncThunk(
  'chart/fetchChart9Data',
  async (
    {
      projectId,
      modelId,
      Product,
      Brand,
      Retailer,
    }: {
      projectId: number;
      modelId: number;
      Product?: string;
      Brand?: string;
      Retailer?: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await fetchChart9Data(projectId, modelId, {
        Product,
        Brand,
        Retailer,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart 9 data');
    }
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Chart 1
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      });

    // Chart 2
    builder
      .addCase(fetchChart2Data.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart2Data.fulfilled, (state, action) => {
        state.loading = false;
        state.data2 = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChart2Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      });

    // Chart 3
    builder
      .addCase(fetchChart3DataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart3DataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data3 = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChart3DataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      });

    // Chart 4
    builder
      .addCase(fetchChart4DataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart4DataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data4 = action.payload; // raw chart 4 data
        state.hasLoaded = true;
      })
      .addCase(fetchChart4DataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      })
      //chart 5
      .addCase(fetchChart5DataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart5DataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data5 = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChart5DataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      })
      //chart 6
      .addCase(fetchChart6DataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart6DataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data6 = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChart6DataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      })
      // chart 7
      .addCase(fetchChart7DataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart7DataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data7 = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChart7DataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      })
      // chart 8
      .addCase(fetchChart8DataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart8DataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data8 = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChart8DataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      });
    // Chart 9
    builder
      .addCase(fetchChart9DataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart9DataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data9 = action.payload;
        state.hasLoaded = true;
      })
      .addCase(fetchChart9DataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasLoaded = false;
      });
  },
});

export default chartSlice.reducer;
