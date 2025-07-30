// store/slices/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  selectedRetailerId: string;
  selectedBrandId: string;
  selectedProductId: string;
  selectedRetailer1: string;
  selectedBrand1: string;
  selectedProduct1: string;
  selectedRetailer2: string;
  selectedBrand2: string;
  selectedProduct2: string;
  selectedRetailer3: string;
  selectedBrand3: string;
  selectedProduct3: string;
  selectedRetailer4: string;
  selectedBrand4: string;
  selectedProduct4: string;
  selectedRetailer5: string;
  selectedBrand5: string;
  selectedProduct5: string;
  selectedRetailer6: string;
  selectedBrand6: string;
  selectedProduct6: string;
  selectedRetailer7: string;
  selectedBrand7: string;
  selectedProduct7: string;
  selectedRetailer8: string;
  selectedBrand8: string;
  selectedProduct8: string;
  [key: string]: string;
}

const initialState: FiltersState = {
  selectedRetailerId: '',
  selectedBrandId: '',
  selectedProductId: '',
  selectedRetailer1: '',
  selectedBrand1: '',
  selectedProduct1: '',
  selectedRetailer2: '',
  selectedBrand2: '',
  selectedProduct2: '',
  selectedRetailer3: '',
  selectedBrand3: '',
  selectedProduct3: '',
  selectedRetailer4: '',
  selectedBrand4: '',
  selectedProduct4: '',
  selectedRetailer5: '',
  selectedBrand5: '',
  selectedProduct5: '',
  selectedRetailer6: '',
  selectedBrand6: '',
  selectedProduct6: '',
  selectedRetailer7: '',
  selectedBrand7: '',
  selectedProduct7: '',
  selectedRetailer8: '',
  selectedBrand8: '',
  selectedProduct8: '',
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
    setSelectedRetailer1(state, action: PayloadAction<string>) {
      state.selectedRetailer1 = action.payload;
    },
    setSelectedBrand1(state, action: PayloadAction<string>) {
      state.selectedBrand1 = action.payload;
    },
    setSelectedProduct1(state, action: PayloadAction<string>) {
      state.selectedProduct1 = action.payload;
    },
    setSelectedRetailer2(state, action: PayloadAction<string>) {
      state.selectedRetailer2 = action.payload;
    },
    setSelectedBrand2(state, action: PayloadAction<string>) {
      state.selectedBrand2 = action.payload;
    },
    setSelectedProduct2(state, action: PayloadAction<string>) {
      state.selectedProduct2 = action.payload;
    },
    setSelectedRetailer3(state, action: PayloadAction<string>) {
      state.selectedRetailer3 = action.payload;
    },
    setSelectedBrand3(state, action: PayloadAction<string>) {
      state.selectedBrand3 = action.payload;
    },
    setSelectedProduct3(state, action: PayloadAction<string>) {
      state.selectedProduct3 = action.payload;
    },
    setSelectedRetailer4(state, action: PayloadAction<string>) {
      state.selectedRetailer4 = action.payload;
    },
    setSelectedBrand4(state, action: PayloadAction<string>) {
      state.selectedBrand4 = action.payload;
    },
    setSelectedProduct4(state, action: PayloadAction<string>) {
      state.selectedProduct4 = action.payload;
    },
    setSelectedRetailer5(state, action: PayloadAction<string>) {
      state.selectedRetailer5 = action.payload;
    },
    setSelectedBrand5(state, action: PayloadAction<string>) {
      state.selectedBrand5 = action.payload;
    },
    setSelectedProduct5(state, action: PayloadAction<string>) {
      state.selectedProduct5 = action.payload;
    },
    setSelectedRetailer6(state, action: PayloadAction<string>) {
      state.selectedRetailer6 = action.payload;
    },
    setSelectedBrand6(state, action: PayloadAction<string>) {
      state.selectedBrand6 = action.payload;
    },
    setSelectedProduct6(state, action: PayloadAction<string>) {
      state.selectedProduct6 = action.payload;
    },
    setSelectedRetailer7(state, action: PayloadAction<string>) {
      state.selectedRetailer7 = action.payload;
    },
    setSelectedBrand7(state, action: PayloadAction<string>) {
      state.selectedBrand7 = action.payload;
    },
    setSelectedProduct7(state, action: PayloadAction<string>) {
      state.selectedProduct7 = action.payload;
    },
    setSelectedRetailer8(state, action: PayloadAction<string>) {
      state.selectedRetailer8 = action.payload;
    },
    setSelectedBrand8(state, action: PayloadAction<string>) {
      state.selectedBrand8 = action.payload;
    },
    setSelectedProduct8(state, action: PayloadAction<string>) {
      state.selectedProduct8 = action.payload;
    },
    clearSelections(state) {
      state.selectedRetailerId = '';
      state.selectedBrandId = '';
      state.selectedProductId = '';
      state.selectedRetailer1 = '';
      state.selectedBrand1 = '';
      state.selectedProduct1 = '';
      state.selectedRetailer2 = '';
      state.selectedBrand2 = '';
      state.selectedProduct2 = '';
      state.selectedRetailer3 = '';
      state.selectedBrand3 = '';
      state.selectedProduct3 = '';
      state.selectedRetailer4 = '';
      state.selectedBrand4 = '';
      state.selectedProduct4 = '';
      state.selectedRetailer5 = '';
      state.selectedBrand5 = '';
      state.selectedProduct5 = '';
      state.selectedRetailer6 = '';
      state.selectedBrand6 = '';
      state.selectedProduct6 = '';
      state.selectedRetailer7 = '';
      state.selectedBrand7 = '';
      state.selectedProduct7 = '';
      state.selectedRetailer8 = '';
      state.selectedBrand8 = '';
      state.selectedProduct8 = '';
    },
  },
});

export const {
  setSelectedRetailerId,
  setSelectedBrandId,
  setSelectedProductId,
  setSelectedRetailer1,
  setSelectedBrand1,
  setSelectedProduct1,
  setSelectedRetailer2,
  setSelectedBrand2,
  setSelectedProduct2,
  setSelectedRetailer3,
  setSelectedBrand3,
  setSelectedProduct3,
  setSelectedRetailer4,
  setSelectedBrand4,
  setSelectedProduct4,
  setSelectedRetailer5,
  setSelectedBrand5,
  setSelectedProduct5,
  setSelectedRetailer6,
  setSelectedBrand6,
  setSelectedProduct6,
  setSelectedRetailer7,
  setSelectedBrand7,
  setSelectedProduct7,
  setSelectedRetailer8,
  setSelectedBrand8,
  setSelectedProduct8,
  clearSelections,
} = filtersSlice.actions;

export default filtersSlice.reducer;
