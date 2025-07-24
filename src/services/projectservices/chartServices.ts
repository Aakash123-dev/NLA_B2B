// src/services/chartApi.ts

import { API_ENDPOINTS } from '@/constants/endPoints/endPoints';
import { axiosPythonInstance } from './axiosInstance';

export const getChart1RawData = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  // Base URL with project and model IDs
  let url = API_ENDPOINTS.INSIGHTS.CHART1(projectId, modelId);

  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }

  const response = await axiosPythonInstance.get(url);
  return response?.data?.data;
};

export const getChart2RawData = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART_2(projectId, modelId);

  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }

  const response = await axiosPythonInstance.get(url);
  return response.data.data;
};

export const fetchChart3Data = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART3(projectId, modelId);
  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }

  const response = await axiosPythonInstance.get(url);
  return response.data.data;
};

export const fetchChart4Data = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART4(projectId, modelId);
  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  const response = await axiosPythonInstance.get(url);
  return response.data.data;
};

export const fetchChart5Data = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART5(projectId, modelId);
  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  const response = await axiosPythonInstance.get(url);
  return response.data.data;
};

export const fetchChart6Data = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART6(projectId, modelId);
  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  const response = await axiosPythonInstance.get(url);
  return response?.data?.data;
};

export const fetchChart7Data = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART7(projectId, modelId);
  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  const response = await axiosPythonInstance.get(url);
  return response?.data?.data || [];
};

export const fetchChart8Data = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART8(projectId, modelId);
  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  const response = await axiosPythonInstance.get(url);
  return response?.data?.data || [];
};

export const fetchChart9Data = async (
  projectId: number,
  modelId: number,
  filters?: { Product?: string; Brand?: string; Retailer?: string }
) => {
  let url = API_ENDPOINTS.INSIGHTS.CHART9(projectId, modelId);
  const params = new URLSearchParams();

  // Append filters if present (with comma-separated values)
  if (filters?.Product) params.append('Product', filters.Product);
  if (filters?.Brand) params.append('Brand', filters.Brand);
  if (filters?.Retailer) params.append('Retailer', filters.Retailer);

  // Append filters to URL if any exist
  if (Array.from(params).length > 0) {
    url += (url.includes('?') ? '&' : '?') + params.toString();
  }
  const response = await axiosPythonInstance.get(url);
  return response?.data?.data || [];
};
