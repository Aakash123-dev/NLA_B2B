// src/services/projectService.ts
import axiosInstance from './axiosInstance';

export const fetchProjectsFromAPI = async (
  page: number,
  limit: number,
  searchQuery: string,
  userId: number
) => {
  const isSearching = searchQuery.trim() !== '';

  const basePath = isSearching
    ? `/project/search/${userId}`
    : `/project/by-user/${userId}/`;

  const response = await axiosInstance.get(basePath, {
    params: {
      page: page + 1, // page starts from 1 in backend
      limit,
      project_name: searchQuery,
    },
  });

  return {
    isSearching,
    data: response.data,
  };
};
