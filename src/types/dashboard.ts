import { BaseEntity, Status, Plan, BillingCycle } from './common';
import { User } from './auth';

// Dashboard related types
export interface Subscription extends BaseEntity {
  customerName: string;
  customerEmail: string;
  companyName: string;
  plan: Plan;
  status: Status;
  price: number;
  billingCycle: BillingCycle;
  startDate: string;
  endDate: string;
  nextBilling: string;
  usage: {
    users: number;
    storage: number;
    apiCalls: number;
  };
}

export interface Invoice extends BaseEntity {
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Overdue';
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface SecurityEvent extends BaseEntity {
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'account_locked' | 'suspicious_activity';
  user: string;
  email: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  status: 'success' | 'failed' | 'warning';
  details: string;
}

export interface ActiveSession extends BaseEntity {
  user: string;
  email: string;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  loginTime: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeSubscriptions: number;
  securityAlerts: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  category?: string;
}
