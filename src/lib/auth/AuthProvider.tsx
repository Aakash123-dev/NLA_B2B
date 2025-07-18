'use client';

import { useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from '@/store/hooks';
// import { setUser, setToken } from '@/store/slices/authSlice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const dispatch = useAppDispatch();
  // const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check for existing token in localStorage or cookies
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Verify token and set user
      // dispatch(setToken(token));
    }
  }, []);

  return <>{children}</>;
} 