'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authAxiosInstance, axiosInstance } from '@/services/projectservices/axiosInstance';

// Define available roles and their dashboard redirects
export const roleRedirects = {
  admin: '/dashboard',
  manager: '/dashboard',
  audit: '/dashboard',
  user: '/user/dashboard',
  default: '/user/dashboard',
};

// User interface matching the database schema
export interface User {
  user_id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role: 'admin' | 'manager' | 'audit' | 'user';
  status: 'active' | 'inactive';
  phone_number?: string;
  address?: string;
  client_logo?: string;
  show_popup?: '0' | '1';
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
}

// Auth Context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  loginAsDemo: (demoId: string, role?: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize the auth state from localStorage and cookies (client-side only)
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for stored user data
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
        
        if (storedUser && storedToken) {
          try {
            const parsedUser = JSON.parse(storedUser);
            
            // Verify token is still valid (but don't fail if it's not)
            const isTokenValid = await verifyToken(storedToken);
            
            if (isTokenValid) {
              setUser(parsedUser);
            } else {
              // Token is invalid, clear stored data
              console.log('Stored token is invalid, clearing auth data');
              localStorage.removeItem('user');
              localStorage.removeItem('auth-token');
              sessionStorage.removeItem('auth-token');
            }
          } catch (e) {
            console.error('Failed to parse stored user:', e);
            localStorage.removeItem('user');
            localStorage.removeItem('auth-token');
            sessionStorage.removeItem('auth-token');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Don't throw errors during initialization, just log them
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);
  
  // Check if user should be redirected based on auth status and current route
  useEffect(() => {
    if (!isInitialized) return;
    
    // Don't perform any redirects if we're on login or register pages
    if (pathname === '/login') {
      return;
    }
    
    const authRoutes = ['/login'];
    const publicRoutes = ['/', '/user', ...authRoutes];
    const isAuthRoute = authRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.includes(pathname);
    
    // Handle redirects with a small delay to prevent immediate redirects
    setTimeout(() => {
      // Only redirect authenticated users away from auth routes
      if (user && isAuthRoute) {
        // Redirect authenticated users away from auth routes
        const redirectPath = roleRedirects[user.role as keyof typeof roleRedirects] || roleRedirects.default;
        router.push(redirectPath);
      } else if (!user && !isPublicRoute) {
        // Only redirect unauthenticated users from protected routes
        router.push('/login');
      }
    }, 500);
  }, [user, pathname, isInitialized, router]);

  // Verify token with backend
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      // Try external API first
      const externalResponse = await axiosInstance.get('/auth/profile');
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  // Refresh user data from backend
  const refreshUser = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      const userData = response.data.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
    }
  };
  
  // Login function with API integration
  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAxiosInstance.post('/auth/login', {
        email,
        password,
      });

      const data = response.data;

      if (data.code === 200 && data.data) {
        const userData = data.data;
        
        // Save to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Save token with remember me option
        if (rememberMe) {
          localStorage.setItem('auth-token', userData.token);
        } else {
          // Store token in sessionStorage for session-only storage
          sessionStorage.setItem('auth-token', userData.token);
        }
        
        // Redirect to appropriate dashboard based on role
        const redirectPath = roleRedirects[userData.role as keyof typeof roleRedirects] || roleRedirects.default;
        router.push(redirectPath);
        
        toast.success('Login successful!');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo login function
  const loginAsDemo = async (demoId: string, role: string = 'user'): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a demo user based on the database schema
      const demoUser: User = {
        user_id: Date.now(),
        email: `demo-${demoId}@example.com`,
        first_name: 'Demo',
        last_name: 'User',
        full_name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        role: role as User['role'],
        status: 'active',
        phone_number: '+1-555-0123',
        address: '123 Demo Street, Demo City, DC 12345',
        client_logo: '/demo-logo.png',
        show_popup: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
        token: `demo-token-${Date.now()}`,
      };
      
      // Save to state and localStorage
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      if (demoUser.token) {
        localStorage.setItem('auth-token', demoUser.token);
      }
      
      // Redirect to appropriate dashboard based on role and demo
      const redirectPath = roleRedirects[role as keyof typeof roleRedirects] || roleRedirects.default;
      router.push(`${redirectPath}?demo=${demoId}`);
      
      toast.success(`Logged in as ${demoUser.full_name}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Demo login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // Get current token before clearing
      const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
      
      // Clear local state immediately for better UX
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('auth-token');
      sessionStorage.removeItem('auth-token');
      
      // Try to invalidate token on server (but don't block logout if it fails)
      if (token) {
        try {
          // Try external API first
          await axiosInstance.post('/auth/logout');
        } catch (externalError) {
          console.error('External logout API error:', externalError);
          // Try local API as fallback
          try {
            await authAxiosInstance.post('/api/auth/logout');
          } catch (localError) {
            console.error('Local logout API error:', localError);
            // Continue with logout even if both APIs fail
          }
        }
      }
      
      // Redirect to login page
      router.push('/login');
      toast.success('Logged out successfully');
      
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, ensure user is logged out locally
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('auth-token');
      sessionStorage.removeItem('auth-token');
      router.push('/login');
      toast.error('Logout completed with some issues');
    }
  };
  
  // Register function
  const register = async (userData: Partial<User> & { password: string }): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAxiosInstance.post('/auth/register', userData);
      const data = response.data;

      if (data.code === 200 && data.data) {
        toast.success('Registration successful! Please log in.');
        router.push('/login');
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear any error
  const clearError = (): void => {
    setError(null);
  };
  
  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    loginAsDemo,
    logout,
    register,
    clearError,
    refreshUser,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
