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
  },
};
