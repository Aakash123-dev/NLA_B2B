// src/services/simulationService.js

import { API_ENDPOINTS } from '../../constants/endPoints/endPoints';
import { axiosPythonInstance } from '../projectservices/axiosInstance';

export const fetchPriceSimulationData = async (
  projectId,
  modelId,
  retailer
) => {
  try {
    const url = API_ENDPOINTS.SIMULATION.GET_PRICE_SIMULATION(
      projectId,
      modelId,
      retailer
    );
    const response = await axiosPythonInstance.get(url);
    if (response.status === 200) {
      return response.data?.data;
    }
    return null;
  } catch (error) {
    console.error('Error in fetching simulation data: ', error);
    return null;
  }
};


export const getMarginSimulationData = async (projectId, modelId, retailer, product) => {
  try {
    const api = `${API_ENDPOINTS.SIMULATION.MARGIN_SIMULATION_ENDPOINT}?project_id=${projectId}&model_id=${modelId}&Retailer=${retailer}&Product=${product}`;
    const response = await axiosPythonInstance.get(api);

    if (response.status === 200) {
      return response.data?.data || [];
    }
    return null;
  } catch (error) {
    console.error('Error in fetching margin simulation data: ', error);
    return null;
  }
};

export const fetchPromoEventSimulationData = async (projectId, modelId, retailer, product) => {
  const url = API_ENDPOINTS.SIMULATION.PRODUCT_SIMULATION_DATA(projectId, modelId, retailer, product);
  const response = await axiosPythonInstance.get(url);
  return response?.data?.data;
};

