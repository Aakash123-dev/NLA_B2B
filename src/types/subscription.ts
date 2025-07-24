import { BaseEntity } from './common';

export interface SubscriptionPlan extends BaseEntity {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: PlanFeature[];
  limits: PlanLimits;
  popular?: boolean;
  tier: 'starter' | 'professional' | 'enterprise' | 'custom';
}

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  unlimited?: boolean;
  limit?: number;
}

export interface PlanLimits {
  projects: number | 'unlimited';
  users: number | 'unlimited';
  storage: number | 'unlimited'; // in GB
  apiCalls: number | 'unlimited';
  support: 'community' | 'email' | 'priority' | '24/7';
}

export interface UserSubscription extends BaseEntity {
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  billingCycle: 'monthly' | 'yearly';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  autoRenew: boolean;
  trialEnd?: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  paymentMethod?: PaymentMethod;
  usage: UsageMetrics;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface UsageMetrics {
  projects: {
    used: number;
    limit: number | 'unlimited';
  };
  users: {
    used: number;
    limit: number | 'unlimited';
  };
  storage: {
    used: number; // in GB
    limit: number | 'unlimited';
  };
  apiCalls: {
    used: number;
    limit: number | 'unlimited';
    resetDate: Date;
  };
}

export interface SubscriptionInvoice extends BaseEntity {
  subscriptionId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  invoiceNumber: string;
  dueDate: Date;
  paidAt?: Date;
  downloadUrl?: string;
}

export type SubscriptionStatus = 
  | 'active' 
  | 'trialing' 
  | 'past_due' 
  | 'canceled' 
  | 'unpaid' 
  | 'incomplete' 
  | 'incomplete_expired';

export type InvoiceStatus = 
  | 'draft' 
  | 'open' 
  | 'paid' 
  | 'uncollectible' 
  | 'void';

export interface BillingHistory {
  invoices: SubscriptionInvoice[];
  nextPayment?: {
    amount: number;
    currency: string;
    date: Date;
  };
}

export interface SubscriptionChangePreview {
  newPlan: SubscriptionPlan;
  prorationAmount: number;
  effectiveDate: Date;
  nextBillingDate: Date;
}
