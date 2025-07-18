'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define available roles and their dashboard redirects
export const roleRedirects = {
  admin: '/dashboard',
  cxo: '/dashboard/executive',
  brand_manager: '/dashboard/promo-optimization',
  marketing: '/dashboard/campaigns',
  product_manager: '/dashboard/product-performance',
  sales: '/dashboard/sales-analytics',
  analyst: '/dashboard/analytics',
  default: '/dashboard',
};

// User interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
}

// Auth Context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsDemo: (demoId: string, role?: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  clearError: () => void;
}

// Sample users for demo
const sampleUsers: Record<string, User & { password: string }> = {
  'admin@example.com': {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    company: 'Analytics Corp',
  },
  'cxo@example.com': {
    id: '2',
    firstName: 'Executive',
    lastName: 'User',
    email: 'cxo@example.com',
    password: 'password',
    role: 'cxo',
    company: 'Analytics Corp',
  },
  'brand@example.com': {
    id: '3',
    firstName: 'Brand',
    lastName: 'Manager',
    email: 'brand@example.com',
    password: 'password',
    role: 'brand_manager',
    company: 'Analytics Corp',
  },
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize the auth state from localStorage (client-side only)
  useEffect(() => {
    // Add a small delay to avoid immediate redirects
    const initTimeout = setTimeout(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
      setIsInitialized(true);
    }, 100); // Small delay to allow the component to mount
    
    return () => clearTimeout(initTimeout);
  }, []);
  
  // Check if user should be redirected based on auth status and current route
  useEffect(() => {
    // if (!isInitialized) return;
    
    // // Don't perform any redirects if we're on login or register pages
    // if (pathname === '/login' || pathname === '/register') {
    //   return;
    // }
    
    // const authRoutes = ['/login', '/register'];
    // const publicRoutes = ['/', '/user', ...authRoutes]; // Added /user to public routes
    // const isAuthRoute = authRoutes.includes(pathname);
    // const isPublicRoute = publicRoutes.includes(pathname);
    
    // // Handle redirects with a small delay to prevent immediate redirects
    // setTimeout(() => {
    //   // Only redirect authenticated users away from auth routes
    //   if (user && isAuthRoute) {
    //     // Redirect authenticated users away from auth routes
    //     const redirectPath = roleRedirects[user.role as keyof typeof roleRedirects] || roleRedirects.default;
    //     router.push(redirectPath);
    //   } else if (!user && !isPublicRoute) {
    //     // Only redirect unauthenticated users from protected routes
    //     router.push('/login');
    //   }
    // }, 500);
  }, [user, pathname, isInitialized, router]);
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const lowercasedEmail = email.toLowerCase();
      const userRecord = sampleUsers[lowercasedEmail];
      
      if (!userRecord || userRecord.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = userRecord;
      
      // Save to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Redirect to appropriate dashboard based on role
      const redirectPath = roleRedirects[userWithoutPassword.role as keyof typeof roleRedirects] || roleRedirects.default;
      router.push(redirectPath);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo login function
  const loginAsDemo = async (demoId: string, role: string = 'admin') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a demo user
      const demoUser: User = {
        id: `demo-${Date.now()}`,
        firstName: 'Demo',
        lastName: 'User',
        email: `demo@${demoId}.com`,
        role: role,
        company: 'Demo Company',
      };
      
      // Save to state and localStorage
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      // Redirect to appropriate dashboard based on role and demo
      const redirectPath = roleRedirects[role as keyof typeof roleRedirects] || roleRedirects.default;
      router.push(`${redirectPath}?demo=${demoId}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };
  
  // Register function
  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call to register the user
      
      // For demo purposes, just simulate success
      setIsLoading(false);
      
      // Redirect to login page after successful registration
      router.push('/login');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };
  
  // Clear any error
  const clearError = () => {
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
