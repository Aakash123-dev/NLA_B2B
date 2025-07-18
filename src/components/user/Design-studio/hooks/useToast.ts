'use client';

import { useState, useCallback } from 'react';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const useToast = () => {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const showToast = useCallback((notification: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: ToastNotification = {
      id,
      duration: 3000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, newNotification.duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showToast,
    removeToast,
    clearAllToasts
  };
};
