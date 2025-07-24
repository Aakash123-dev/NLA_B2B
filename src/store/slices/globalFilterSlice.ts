import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGlobalFilters } from '@/services/filterServices/chartFilters';

interface GlobalFiltersState {
  products: string[];
  retailers: string[];
  brands: string[];
  loading: boolean;
  error: string | null;
}

const initialState: GlobalFiltersState = {
  products: [],
  retailers: [],
  brands: [],
  loading: false,
  error: null,
};

export const fetchGlobalFiltersThunk = createAsyncThunk(
  'globalFilters/fetch',
  async (modelId: number, thunkAPI) => {
    try {
      const response = await fetchGlobalFilters(modelId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch global filters');
    }
  }
);

const globalFiltersSlice = createSlice({
  name: 'globalFilters',
  initialState,
  reducers: {
    clearGlobalFilters(state) {
      state.products = [];
      state.retailers = [];
      state.brands = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalFiltersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalFiltersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.retailers = action.payload.retailers || [];
        state.brands = action.payload.brands || [];
      })
      .addCase(fetchGlobalFiltersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGlobalFilters } = globalFiltersSlice.actions;
export default globalFiltersSlice.reducer;
