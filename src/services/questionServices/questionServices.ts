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

    const response = await axiosInstance.get(url); // Axios auto parses JSON
    if (Array.isArray(response?.data?.data)) {
      return response?.data?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching insights:', error);
    return [];
  }
};
