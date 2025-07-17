// src/services/projectService.ts
import { API_ENDPOINTS } from '@/constants/endPoints/endPoints';
import axiosInstance from './axiosInstance';

export const fetchProjectsFromAPI = async (
  page: number,
  limit: number,
  searchQuery: string,
  userId: number
) => {
  const isSearching = searchQuery.trim() !== '';

  const basePath = isSearching
    ? API_ENDPOINTS.PROJECTS.SEARCH(userId)
    : API_ENDPOINTS.PROJECTS.BY_USER(userId);

  const response = await axiosInstance.get(basePath, {
    params: {
      page: page + 1,
      limit,
      project_name: searchQuery,
    },
  });

  return {
    isSearching,
    data: response.data,
  };
};

// src/services/projectService.ts
export const createProject = async (newProject: {
  projectName: string;
  projectType: string;
}) => {
  const formData = new FormData();
  formData.append('user_id', '7'); // static
  formData.append('project_name', newProject.projectName);
  formData.append('type_of_project', newProject.projectType);
  formData.append('client_name', 'client');
  formData.append('product_name', 'product');
  formData.append('retailers', JSON.stringify([]));
  formData.append('brands', JSON.stringify([]));
  formData.append('products', JSON.stringify([]));
  formData.append(
    'logo_from_list',
    'https://storage.googleapis.com/nla_image_bucket/Pringles.jpeg'
  );

  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PROJECTS.ADD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('API Error:', error?.response?.data || error.message);
    throw new Error('Failed to create project');
  }
};

export const toggleFavoriteProject = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PROJECTS.TOGGLE_FAVORITE(projectId)
    );

    if (response.status !== 200) {
      throw new Error('Failed to pin/unpin the project');
    }

    return response.data;
  } catch (error: any) {
    console.error(
      'Error in toggleFavoriteProject:',
      error?.response?.data || error.message
    );
    throw new Error('Failed to toggle favorite status');
  }
};

export const deleteProjectById = async (projectId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/project/delete/${projectId}`);

    if (response.status !== 200) {
      throw new Error('Failed to delete project');
    }
  } catch (error: any) {
    console.error(
      'Error deleting project:',
      error?.response?.data || error.message
    );
    throw new Error('Failed to delete project');
  }
};

export const duplicateProjectById = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(`/project/duplicate/${projectId}`);
    return response.data;
  } catch (error: any) {
    // Log it or throw for component-level handling
    console.error('Error duplicating project:', error);
    throw error;
  }
};
