import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { InsightType } from '@/components/user/insights';

interface InsightsState {
  insights: InsightType[];
}

const initialState: InsightsState = {
  insights: [],
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setInsights(state, action: PayloadAction<InsightType[]>) {
      state.insights = action.payload;
    },
    clearInsights(state) {
      state.insights = [];
    },
  },
});

export const { setInsights, clearInsights } = insightsSlice.actions;
export default insightsSlice.reducer;
