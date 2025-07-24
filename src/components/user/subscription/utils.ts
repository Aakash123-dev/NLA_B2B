import { UserSubscription, SubscriptionPlan, PaymentMethod } from '@/types/subscription';

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { label: 'Active', className: 'bg-green-100 text-green-800 border-green-200' },
    trialing: { label: 'Trial', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    past_due: { label: 'Past Due', className: 'bg-orange-100 text-orange-800 border-orange-200' },
    canceled: { label: 'Canceled', className: 'bg-red-100 text-red-800 border-red-200' },
    unpaid: { label: 'Unpaid', className: 'bg-red-100 text-red-800 border-red-200' },
  };
  
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
};

export const getUsagePercentage = (used: number, limit: number | 'unlimited') => {
  if (limit === 'unlimited') return 0;
  return Math.min((used / limit) * 100, 100);
};

export const getUsageColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-red-500';
  if (percentage >= 75) return 'bg-orange-500';
  return 'bg-blue-500';
};

export const getPlanTier = (tier: string) => {
  const tierConfig = {
    starter: { label: 'Starter', className: 'bg-blue-100 text-blue-800' },
    professional: { label: 'Professional', className: 'bg-purple-100 text-purple-800' },
    enterprise: { label: 'Enterprise', className: 'bg-green-100 text-green-800' },
    custom: { label: 'Custom', className: 'bg-gray-100 text-gray-800' },
  };
  
  return tierConfig[tier as keyof typeof tierConfig] || tierConfig.starter;
};

export const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
  const monthlyTotal = monthlyPrice * 12;
  const savings = monthlyTotal - yearlyPrice;
  const percentage = Math.round((savings / monthlyTotal) * 100);
  return { amount: savings, percentage };
};

export const isTrialActive = (subscription: UserSubscription) => {
  return subscription.status === 'trialing' && subscription.trialEnd && new Date(subscription.trialEnd) > new Date();
};

export const getDaysUntilExpiry = (date: Date | string) => {
  const expiryDate = new Date(date);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
