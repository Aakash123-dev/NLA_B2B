// src/constants/apiEndpoints.ts

interface ApiEndpoints {
  PROJECTS: {
    ADD: string;
    BY_USER: (userId: number) => string;
    SEARCH: (userId: number) => string;
    TOGGLE_FAVORITE: (projectId: number) => string;
    DELETE: (projectId: number) => string;
    DUPLICATE: (projectId: number) => string;
  };
  INSIGHTS: {
    CHART1: (projectId: number, modelId: number) => string;
    CHART_2: (projectId: number, modelId: number) => string;
    CHART3: (projectId: number, modelId: number) => string;
    CHART4: (projectId: number, modelId: number) => string;
    CHART5: (projectId: number, modelId: number) => string;
    CHART6: (projectId: number, modelId: number) => string;
    CHART7: (projectId: number, modelId: number) => string;
    CHART8: (projectId: number, modelId: number) => string;
    CHART9: (projectId: number, modelId: number) => string;
  };
  FILTERS: {
    FILTER_DATA: (projectId: number, modelId: number) => string;
    ADD_FILTERS: string;
    FETCH_FILTERS: (modelId: number) => string;
  };
  getAllQuestions: (modelId: string) => string;
  getQuestionsByType: (modelId: string, type: string) => string;
  SIMULATION: {
    GET_PRICE_SIMULATION: (projectId: number, modelId: number, retailer: string) => string;
    MARGIN_SIMULATION_ENDPOINT: string;
    PRODUCT_SIMULATION_DATA: (projectId: number, modelId: number, retailer: string, product: string) => string;
  };
  QUESTION_TYPES: {
    GET_QUESTION_TYPES: (modelId: string) => string;
  };
}

export const API_ENDPOINTS: ApiEndpoints = {
  PROJECTS: {
    ADD: `/project/add`,
    BY_USER: (userId: number) => `/project/by-user/${userId}/`,
    SEARCH: (userId: number) => `/project/search/${userId}`,
    TOGGLE_FAVORITE: (projectId: number) =>
      `/project/pin-or-unpin/${projectId}`,
    DELETE: (projectId: number) => `/project/delete/${projectId}`,
    DUPLICATE: (projectId: number) => `/project/duplicate/${projectId}`,
  },
  INSIGHTS: {
    CHART1: (projectId: number, modelId: number) =>
      `/insights/chart1?project_id=${projectId}&model_id=${modelId}`,
    CHART_2: (projectId: number, modelId: number) =>
      `/insights/chart2?project_id=${projectId}&model_id=${modelId}`,
    CHART3: (projectId: number, modelId: number) =>
      `/insights/chart3?project_id=${projectId}&model_id=${modelId}`,
    CHART4: (projectId: number, modelId: number) =>
      `/insights/chart4?project_id=${projectId}&model_id=${modelId}`,
    CHART5: (projectId: number, modelId: number) =>
      `/insights/chart5?project_id=${projectId}&model_id=${modelId}`,
    CHART6: (projectId: number, modelId: number) =>
      `/insights/chart6?project_id=${projectId}&model_id=${modelId}`,
    CHART7: (projectId: number, modelId: number) =>
      `/insights/chart7?project_id=${projectId}&model_id=${modelId}`,
    CHART8: (projectId: number, modelId: number) =>
      `/insights/chart8?project_id=${projectId}&model_id=${modelId}`,
    CHART9: (projectId: number, modelId: number) =>
      `/insights/chart9?project_id=${projectId}&model_id=${modelId}`,
  },
  FILTERS: {
    FILTER_DATA: (projectId: number, modelId: number) =>
      `/insights/retailer_brands_products?project_id=${projectId}&model_id=${modelId}`,
    ADD_FILTERS: '/insights/global/filters/add',
    FETCH_FILTERS: (modelId: number) =>
      `/insights/global/filters/get/${modelId}`,
  },
  getAllQuestions: (modelId: string): string => `/admin/get-admin-questions/${modelId}`,
  getQuestionsByType: (modelId: string, type: string): string =>
    `/insights/questions-per-type/${modelId}/${type}`,
  SIMULATION: {
    GET_PRICE_SIMULATION: (projectId: number, modelId: number, retailer: string): string =>
      `/insights/simulation/price/product-data?project_id=${projectId}&model_id=${modelId}&Retailer=${retailer}`,
    MARGIN_SIMULATION_ENDPOINT: '/insights/simulation/price/product-data',
    PRODUCT_SIMULATION_DATA: (projectId: number, modelId: number, retailer: string, product: string): string =>
      `/insights/simulation/price/product-data?project_id=${projectId}&model_id=${modelId}&Retailer=${retailer}&Product=${product}`,
  },
  QUESTION_TYPES: {
    GET_QUESTION_TYPES: (modelId: string): string => `/insights/question-types/${modelId}`,
  }
};
