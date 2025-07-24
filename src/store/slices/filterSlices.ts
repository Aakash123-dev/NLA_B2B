// store/slices/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  selectedRetailerId: string;
  selectedBrandId: string;
  selectedProductId: string;
}

const initialState: FiltersState = {
  selectedRetailerId: '',
  selectedBrandId: '',
  selectedProductId: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedRetailerId(state, action: PayloadAction<string>) {
      state.selectedRetailerId = action.payload;
    },
    setSelectedBrandId(state, action: PayloadAction<string>) {
      state.selectedBrandId = action.payload;
    },
    setSelectedProductId(state, action: PayloadAction<string>) {
      state.selectedProductId = action.payload;
    },
    clearSelections(state) {
      state.selectedRetailerId = '';
      state.selectedBrandId = '';
      state.selectedProductId = '';
    },
  },
});

export const {
  setSelectedRetailerId,
  setSelectedBrandId,
  setSelectedProductId,
  clearSelections,
} = filtersSlice.actions;

export default filtersSlice.reducer;
