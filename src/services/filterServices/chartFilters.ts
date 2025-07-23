import { API_ENDPOINTS } from '@/constants/endPoints/endPoints';
import { axiosPythonInstance } from '../projectservices/axiosInstance';

export const getInsightsFilterData = async (
  projectId: number,
  modelId: number
) => {
  const response = await axiosPythonInstance.get(
    API_ENDPOINTS.FILTERS.FILTER_DATA(projectId, modelId)
  );
  return response.data;
};
