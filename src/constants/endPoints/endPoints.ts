// src/constants/apiEndpoints.ts

export const API_ENDPOINTS = {
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
  getAllQuestions: (modelId: string) => `/admin/get-admin-questions/${modelId}`,
  getQuestionsByType: (modelId: string, type: string) =>
    `/insights/questions-per-type/${modelId}/${type}`,
};
