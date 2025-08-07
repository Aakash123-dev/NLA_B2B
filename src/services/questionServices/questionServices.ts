// src/services/questionServices.ts

import { InsightType } from '@/components/user/insights';
import { API_ENDPOINTS } from '../../constants/endPoints/endPoints';
import { axiosInstance } from '../projectservices/axiosInstance';

export const fetchInsights = async (
  modelId: string,
  selectedTab: string
): Promise<InsightType[]> => {
  try {
    const url =
      selectedTab === 'all'
        ? API_ENDPOINTS.getAllQuestions(modelId)
        : API_ENDPOINTS.getQuestionsByType(modelId, selectedTab);

    console.log(`API Call - URL: ${url}, Tab: ${selectedTab}, ModelId: ${modelId}`);
    
    const response = await axiosInstance.get(url); // Axios auto parses JSON
    
    console.log(`API Response for ${selectedTab}:`, response?.data);
    
    if (Array.isArray(response?.data?.data)) {
      const insights = response?.data?.data;
      console.log(`Returning ${insights.length} insights for ${selectedTab}:`, insights);
      return insights;
    } else {
      console.warn(`Invalid response format for ${selectedTab}:`, response?.data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching insights for ${selectedTab}:`, error);
    return [];
  }
};
