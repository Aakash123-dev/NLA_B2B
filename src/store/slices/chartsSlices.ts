// src/store/slices/chartSlice.ts
import { getChart1RawData } from '@/services/projectservices/chartServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type ChartItem = {
  Brand: string;
  Retailer: string;
  Product: string;
  Price_avg_last_4_weeks: number;
};

interface ChartState {
  data: ChartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk to fetch chart data
export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async (
    { projectId, modelId }: { projectId: number; modelId: number },
    thunkAPI
  ) => {
    try {
      const data = await getChart1RawData(projectId, modelId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch chart data');
    }
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chartSlice.reducer;
