import { LucideIcon } from 'lucide-react';

// Common types used across the application
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface SelectOption {
  id: string;
  name: string;
  value: string;
  disabled?: boolean;
}

export interface MenuItemType {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  disabled?: boolean;
  children?: MenuItemType[];
}

export interface StatCardData {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
}

export type Status = 'Active' | 'Inactive' | 'Pending' | 'Cancelled' | 'Trial';
export type Plan = 'Basic' | 'Pro' | 'Enterprise' | 'Custom';
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly';
