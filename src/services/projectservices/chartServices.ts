// src/services/chartApi.ts

import { axiosPythonInstance } from './axiosInstance';

export const getChart1RawData = async (projectId: number, modelId: number) => {
  const response = await axiosPythonInstance.get(
    `/insights/chart1?project_id=${projectId}&model_id=${modelId}`
  );
  console.log(response, 'Alldata');
  return response?.data?.data;
};
