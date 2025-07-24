import { API_ENDPOINTS } from '@/constants/endPoints/endPoints';
import {
  axiosInstance,
  axiosPythonInstance,
} from '../projectservices/axiosInstance';

export const getInsightsFilterData = async (
  projectId: number,
  modelId: number
) => {
  const response = await axiosPythonInstance.get(
    API_ENDPOINTS.FILTERS.FILTER_DATA(projectId, modelId)
  );
  return response.data;
};

export const postInsightsFilterData = async (
  modelId: number,
  retailers: string[],
  brands: string[],
  products: string[],
  startDate: string | null = null,
  endDate: string | null = null
) => {
  const payload = {
    model_id: modelId.toString(),
    retailers,
    brands,
    products,
    startDate,
    endDate,
  };

  const response = await axiosInstance.post(
    API_ENDPOINTS.FILTERS.ADD_FILTERS,
    payload
  );

  return response.data;
};

export const fetchGlobalFilters = async (modelId: number) => {
  const url = `/insights/global/filters/get/${modelId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
