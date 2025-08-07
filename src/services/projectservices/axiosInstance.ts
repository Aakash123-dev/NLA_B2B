import axios from 'axios';

// Base URL configurations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL_PYTHON = process.env.NEXT_PUBLIC_API_BASE_URL_PYTHON;

// Helper function to get token from localStorage or sessionStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
};

// Axios instance for authentication (no token required)
export const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for authenticated requests (with dynamic token)
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for Python backend (with dynamic token)
export const axiosPythonInstance = axios.create({
  baseURL: API_BASE_URL_PYTHON,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token dynamically
const addAuthToken = (config: any) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Add request interceptors to authenticated instances
axiosInstance.interceptors.request.use(addAuthToken);
axiosPythonInstance.interceptors.request.use(addAuthToken);

// Response interceptor to handle token expiration
const handleTokenExpiration = (error: any) => {
  if (error.response?.status === 401) {
    // Token is expired or invalid
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token');
      sessionStorage.removeItem('auth-token');
      localStorage.removeItem('user');
      
      // Redirect to login page
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
};

// Add response interceptors to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  handleTokenExpiration
);

axiosPythonInstance.interceptors.response.use(
  (response) => response,
  handleTokenExpiration
);

// Export types for better TypeScript support
export interface ApiResponse<T = any> {
  code: number;
  status: string;
  msg: string;
  data: T;
}

export interface ApiError {
  error: string;
  details?: any;
}
