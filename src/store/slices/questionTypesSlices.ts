import { fetchQuestionTypes } from "@/services/questionTypesServices/questionTypesServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the TabType interface
interface TabType {
  type: string;
}

// Define the state interface
interface QuestionTypesState {
  tabs: TabType[];
  isLoading: boolean;
  error: string | null;
}

// Async thunk to get question types
export const getQuestionTypes = createAsyncThunk(
  "questionTypes/getQuestionTypes",
  async (modelId: string, thunkAPI) => {
    try {
      const data = await fetchQuestionTypes(modelId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch question types");
    }
  }
);

const initialState: QuestionTypesState = {
  tabs: [],
  isLoading: false,
  error: null,
};

const questionTypeSlice = createSlice({
  name: "questionTypes",
  initialState,
  reducers: {
    clearQuestionTypes: (state) => {
      state.tabs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuestionTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tabs = action.payload;
      })
      .addCase(getQuestionTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Something went wrong";
      });
  },
});

export const { clearQuestionTypes } = questionTypeSlice.actions;

export default questionTypeSlice.reducer;
