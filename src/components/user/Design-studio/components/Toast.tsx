'use client';

import React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastNotification } from '../hooks/useToast';

interface ToastProps {
  notification: ToastNotification;
  onClose: (id: string) => void;
}

const getToastStyles = (type: ToastNotification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300';
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300';
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-300';
  }
};

const getToastIcon = (type: ToastNotification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5" />;
    case 'error':
      return <XCircle className="w-5 h-5" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5" />;
    case 'info':
      return <Info className="w-5 h-5" />;
    default:
      return <Info className="w-5 h-5" />;
  }
};

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  return (
    <div className={`flex items-start space-x-3 p-4 rounded-lg border backdrop-blur-sm ${getToastStyles(notification.type)}`}>
      {getToastIcon(notification.type)}
      <div className="flex-1">
        <h4 className="font-medium">{notification.title}</h4>
        <p className="text-sm opacity-90">{notification.message}</p>
      </div>
      <Button
        onClick={() => onClose(notification.id)}
        variant="ghost"
        size="sm"
        className="p-1 hover:bg-white/50 dark:hover:bg-black/50 rounded"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

interface ToastContainerProps {
  notifications: ToastNotification[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="space-y-2 max-w-sm w-full">
      {notifications.map(notification => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={onRemove}
        />
      ))}
    </div>
  );
};
