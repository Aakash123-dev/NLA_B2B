import { 
  SubscriptionPlan, 
  UserSubscription, 
  PaymentMethod, 
  BillingHistory, 
  SubscriptionChangePreview,
  SubscriptionInvoice 
} from '@/types/subscription';

// Mock data for development
const mockPlans: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for individuals and small teams getting started',
    price: {
      monthly: 29,
      yearly: 290,
      currency: 'USD'
    },
    features: [
      {
        id: 'f1',
        name: 'Projects',
        description: 'Create and manage projects',
        included: true,
        limit: 5
      },
      {
        id: 'f2',
        name: 'Team Members',
        description: 'Collaborate with team members',
        included: true,
        limit: 3
      },
      {
        id: 'f3',
        name: 'Storage',
        description: 'Cloud storage for your data',
        included: true,
        limit: 10
      },
      {
        id: 'f4',
        name: 'API Calls',
        description: 'Monthly API call limit',
        included: true,
        limit: 10000
      },
      {
        id: 'f5',
        name: 'Support',
        description: 'Customer support level',
        included: true
      }
    ],
    limits: {
      projects: 5,
      users: 3,
      storage: 10,
      apiCalls: 10000,
      support: 'email'
    },
    tier: 'starter',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Professional',
    description: 'Ideal for growing businesses and professional teams',
    price: {
      monthly: 79,
      yearly: 790,
      currency: 'USD'
    },
    features: [
      {
        id: 'f1',
        name: 'Projects',
        description: 'Create and manage projects',
        included: true,
        limit: 25
      },
      {
        id: 'f2',
        name: 'Team Members',
        description: 'Collaborate with team members',
        included: true,
        limit: 15
      },
      {
        id: 'f3',
        name: 'Storage',
        description: 'Cloud storage for your data',
        included: true,
        limit: 100
      },
      {
        id: 'f4',
        name: 'API Calls',
        description: 'Monthly API call limit',
        included: true,
        limit: 100000
      },
      {
        id: 'f5',
        name: 'Support',
        description: 'Priority customer support',
        included: true
      },
      {
        id: 'f6',
        name: 'Advanced Analytics',
        description: 'Advanced analytics and reporting',
        included: true
      }
    ],
    limits: {
      projects: 25,
      users: 15,
      storage: 100,
      apiCalls: 100000,
      support: 'priority'
    },
    tier: 'professional',
    popular: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'Advanced features for large organizations',
    price: {
      monthly: 199,
      yearly: 1990,
      currency: 'USD'
    },
    features: [
      {
        id: 'f1',
        name: 'Projects',
        description: 'Unlimited projects',
        included: true,
        unlimited: true
      },
      {
        id: 'f2',
        name: 'Team Members',
        description: 'Unlimited team members',
        included: true,
        unlimited: true
      },
      {
        id: 'f3',
        name: 'Storage',
        description: 'Unlimited cloud storage',
        included: true,
        unlimited: true
      },
      {
        id: 'f4',
        name: 'API Calls',
        description: 'Unlimited API calls',
        included: true,
        unlimited: true
      },
      {
        id: 'f5',
        name: 'Support',
        description: '24/7 dedicated support',
        included: true
      },
      {
        id: 'f6',
        name: 'Advanced Analytics',
        description: 'Advanced analytics and reporting',
        included: true
      },
      {
        id: 'f7',
        name: 'Custom Integrations',
        description: 'Custom API integrations',
        included: true
      },
      {
        id: 'f8',
        name: 'SSO',
        description: 'Single Sign-On integration',
        included: true
      }
    ],
    limits: {
      projects: 'unlimited',
      users: 'unlimited',
      storage: 'unlimited',
      apiCalls: 'unlimited',
      support: '24/7'
    },
    tier: 'enterprise',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockSubscription: UserSubscription = {
  id: 'sub_1',
  userId: 'user_1',
  planId: '2',
  plan: mockPlans[1], // Professional plan
  status: 'active',
  billingCycle: 'monthly',
  currentPeriodStart: new Date('2024-01-01'),
  currentPeriodEnd: new Date('2024-02-01'),
  autoRenew: true,
  cancelAtPeriodEnd: false,
  paymentMethod: {
    id: 'pm_1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true
  },
  usage: {
    projects: {
      used: 8,
      limit: 25
    },
    users: {
      used: 5,
      limit: 15
    },
    storage: {
      used: 45.2,
      limit: 100
    },
    apiCalls: {
      used: 45230,
      limit: 100000,
      resetDate: new Date('2024-02-01')
    }
  },
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-15').toISOString()
};

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: true
  },
  {
    id: 'pm_2',
    type: 'card',
    last4: '1234',
    brand: 'MasterCard',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false
  }
];

const mockInvoices: SubscriptionInvoice[] = [
  {
    id: 'inv_1',
    subscriptionId: 'sub_1',
    amount: 79,
    currency: 'USD',
    status: 'paid',
    invoiceNumber: 'INV-2024-001',
    dueDate: new Date('2024-01-01'),
    paidAt: new Date('2024-01-01'),
    downloadUrl: '/invoices/INV-2024-001.pdf',
    createdAt: new Date('2023-12-28').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: 'inv_2',
    subscriptionId: 'sub_1',
    amount: 79,
    currency: 'USD',
    status: 'paid',
    invoiceNumber: 'INV-2023-012',
    dueDate: new Date('2023-12-01'),
    paidAt: new Date('2023-12-01'),
    downloadUrl: '/invoices/INV-2023-012.pdf',
    createdAt: new Date('2023-11-28').toISOString(),
    updatedAt: new Date('2023-12-01').toISOString()
  }
];

export class SubscriptionService {
  // Get all available subscription plans
  static async getPlans(): Promise<SubscriptionPlan[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPlans;
  }

  // Get current user subscription
  static async getCurrentSubscription(): Promise<UserSubscription | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSubscription;
  }

  // Get user's payment methods
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPaymentMethods;
  }

  // Get billing history
  static async getBillingHistory(): Promise<BillingHistory> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      invoices: mockInvoices,
      nextPayment: {
        amount: 79,
        currency: 'USD',
        date: new Date('2024-02-01')
      }
    };
  }

  // Preview subscription change
  static async previewSubscriptionChange(newPlanId: string): Promise<SubscriptionChangePreview> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newPlan = mockPlans.find(p => p.id === newPlanId);
    if (!newPlan) throw new Error('Plan not found');

    return {
      newPlan,
      prorationAmount: 15.50, // Mock proration
      effectiveDate: new Date(),
      nextBillingDate: new Date('2024-02-01')
    };
  }

  // Change subscription plan
  static async changePlan(newPlanId: string): Promise<UserSubscription> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPlan = mockPlans.find(p => p.id === newPlanId);
    if (!newPlan) throw new Error('Plan not found');

    return {
      ...mockSubscription,
      planId: newPlanId,
      plan: newPlan,
      updatedAt: new Date().toISOString()
    };
  }

  // Cancel subscription
  static async cancelSubscription(cancelAtPeriodEnd: boolean = true): Promise<UserSubscription> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      ...mockSubscription,
      cancelAtPeriodEnd,
      canceledAt: cancelAtPeriodEnd ? undefined : new Date(),
      status: cancelAtPeriodEnd ? 'active' : 'canceled',
      updatedAt: new Date().toISOString()
    };
  }

  // Reactivate subscription
  static async reactivateSubscription(): Promise<UserSubscription> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      ...mockSubscription,
      cancelAtPeriodEnd: false,
      canceledAt: undefined,
      status: 'active',
      updatedAt: new Date().toISOString()
    };
  }

  // Update payment method
  static async updatePaymentMethod(paymentMethodId: string): Promise<PaymentMethod[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const updatedMethods = mockPaymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentMethodId
    }));
    return updatedMethods;
  }

  // Add payment method
  static async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    const newMethod: PaymentMethod = {
      ...paymentMethod,
      id: `pm_${Date.now()}`
    };
    return [...mockPaymentMethods, newMethod];
  }

  // Delete payment method
  static async deletePaymentMethod(paymentMethodId: string): Promise<PaymentMethod[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockPaymentMethods.filter(pm => pm.id !== paymentMethodId);
  }

  // Download invoice
  static async downloadInvoice(invoiceId: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const invoice = mockInvoices.find(inv => inv.id === invoiceId);
    if (!invoice || !invoice.downloadUrl) {
      throw new Error('Invoice not found or not available for download');
    }
    return invoice.downloadUrl;
  }
}
