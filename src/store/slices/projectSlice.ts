'use client';
// src/store/slices/projectSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createProject,
  deleteProjectById,
  duplicateProjectById,
  fetchProjectsFromAPI,
  toggleFavoriteProject,
} from '@/services/projectservices/projectServices';
import { ProjectType } from '@/components/user/projects/ProjectTypes';

interface ProjectState {
  projects: ProjectType[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  isSearching: boolean;
  creating: boolean;
  createError: string | null;
}

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  isSearching: false,
  creating: false,
  createError: null,
};

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (
    {
      page,
      limit,
      searchQuery,
      userId,
      filterType,
    }: {
      page: number;
      limit: number;
      searchQuery: string;
      userId: number;
      filterType: string;
    },
    thunkAPI
  ) => {
    try {
      const { data, isSearching } = await fetchProjectsFromAPI(
        page,
        limit,
        searchQuery,
        userId
      );

      let filtered: ProjectType[] = [];
      let totalCount = 1;

      if (isSearching) {
        filtered = data?.data?.rows || [];
        totalCount = data?.data?.pagination?.totalPages || 1;
      } else {
        const pinned = data?.data?.pinnedProjects || [];
        const unPinned = data?.data?.unPinnedProjects || [];

        if (filterType === 'Pinned') filtered = pinned;
        else if (filterType === 'Recent') filtered = unPinned;
        else filtered = [...pinned, ...unPinned];

        totalCount = data?.data?.pagination?.totalPages || 1;
      }

      return { projects: filtered, totalPages: totalCount, isSearching };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Failed to fetch projects'
      );
    }
  }
);

export const createNewProject = createAsyncThunk(
  'projects/createProject',
  async (
    newProject: { projectName: string; projectType: string },
    thunkAPI
  ) => {
    try {
      const response = await createProject(newProject);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Failed to create project'
      );
    }
  }
);

export const toggleFavorites = createAsyncThunk(
  'projects/toggleFavorite',
  async (projectId: number, thunkAPI) => {
    try {
      await toggleFavoriteProject(projectId);
      return projectId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Failed to toggle favorite'
      );
    }
  }
);

export const removeProject = createAsyncThunk(
  'projects/removeProject',
  async (projectId: number, thunkAPI) => {
    try {
      await deleteProjectById(projectId);
      return projectId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Failed to delete project'
      );
    }
  }
);

// export const newProject = createAsyncThunk(
//   'projects/duplicateProject',
//   async (projectId: number, thunkAPI) => {
//     try {
//       const duplicatedProject = await duplicateProjectById(projectId);
//       return duplicatedProject;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.message || 'Failed to duplicate project'
//       );
//     }
//   }
// );

export const newDuplicateProject = createAsyncThunk(
  'projects/duplicateProject',
  async (projectId: number, thunkAPI) => {
    try {
      const duplicatedProject = await duplicateProjectById(projectId);
      return duplicatedProject;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Failed to delete project'
      );
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
        state.totalPages = action.payload.totalPages;
        state.isSearching = action.payload.isSearching;
        state.isLoading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create project
      .addCase(createNewProject.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createNewProject.fulfilled, (state, action) => {
        state.creating = false;
        // Optionally push the new project to the list
        state.projects.unshift(action.payload);
      })
      .addCase(createNewProject.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload as string;
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        const projectId = action.payload;

        const index = state.projects.findIndex((p) => p.id === projectId);
        if (index !== -1) {
          const currentStatus = state.projects[index].pin_project || 0;
          state.projects[index].pin_project = currentStatus === 1 ? 0 : 1;
        }
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        const projectId = action.payload;
        state.projects = state.projects.filter(
          (project) => project.id !== projectId
        );
      })
      .addCase(newDuplicateProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(newDuplicateProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
        state.isLoading = false;
      })
      .addCase(newDuplicateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
