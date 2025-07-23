// src/store/slices/chartFilterSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInsightsFilterData } from '@/services/filterServices/chartFilters';

interface Product {
  name: string;
}

interface Brand {
  name: string;
  products: Product[];
}

interface Retailer {
  name: string;
  brands: Brand[];
}

interface ChartFilterState {
  data: Retailer[];
  loading: boolean;
  error: string | null;
}

const initialState: ChartFilterState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk to fetch filter data by projectId and modelId
export const fetchChartFilterData = createAsyncThunk(
  'chartFilter/fetchData',
  async (
    { projectId, modelId }: { projectId: number; modelId: number },
    thunkAPI
  ) => {
    try {
      const response = await getInsightsFilterData(projectId, modelId);
      return response.data; // structure: { [retailer]: { [brand]: string[] } }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Failed to fetch chart filter data'
      );
    }
  }
);

// Slice definition
export const chartFilterSlice = createSlice({
  name: 'chartFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartFilterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartFilterData.fulfilled, (state, action) => {
        state.loading = false;

        const rawData = action.payload;

        // Transform the nested data into structured format
        const transformedData: Retailer[] = Object.entries(rawData).map(
          ([retailerName, brandObj]) => {
            const brands: Brand[] = Object.entries(
              brandObj as Record<string, string[]>
            ).map(([brandName, productList]) => ({
              name: brandName,
              products: productList.map((p) => ({ name: p })),
            }));

            return {
              name: retailerName,
              brands,
            };
          }
        );

        state.data = transformedData;
      })
      .addCase(fetchChartFilterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chartFilterSlice.reducer;
