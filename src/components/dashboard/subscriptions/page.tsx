'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard,
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Settings,
  Building,
  Phone,
  MapPin,
  Calendar,
  Crown,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  AlertCircle,
  Star,
  Copy,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Mail,
  Globe,
  Activity,
  FileText,
  Receipt,
  Building2,
  Package
} from 'lucide-react';

interface Subscription {
  id: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
  plan: 'Basic' | 'Pro' | 'Enterprise' | 'Custom';
  status: 'Active' | 'Inactive' | 'Cancelled' | 'Past Due' | 'Trial';
  price: number;
  billingCycle: 'Monthly' | 'Quarterly' | 'Yearly';
  startDate: string;
  endDate: string;
  nextBilling: string;
  usage: {
    users: number;
    storage: number; // in GB
    apiCalls: number;
  };
  limits: {
    maxUsers: number;
    maxStorage: number; // in GB
    maxApiCalls: number;
  };
  paymentMethod: string;
  lastPayment: string;
  totalPaid: number;
  avatar?: string;
  features: string[];
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    code?: string;
  };
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  subscriptionId: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Failed';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod: string;
  downloadUrl?: string;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
  renewalDate: string;
}

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [sortField, setSortField] = useState('customerName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAddSubscriptionDrawer, setShowAddSubscriptionDrawer] = useState(false);
  const [showViewSubscriptionDrawer, setShowViewSubscriptionDrawer] = useState(false);
  const [showEditSubscriptionDrawer, setShowEditSubscriptionDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [newSubscription, setNewSubscription] = useState<Partial<Subscription>>({
    customerName: '',
    customerEmail: '',
    companyName: '',
    plan: 'Basic',
    status: 'Active',
    price: 29,
    billingCycle: 'Monthly',
    startDate: '',
    endDate: '',
    nextBilling: '',
    usage: {
      users: 0,
      storage: 0,
      apiCalls: 0
    },
    limits: {
      maxUsers: 5,
      maxStorage: 10,
      maxApiCalls: 1000
    },
    paymentMethod: 'Credit Card',
    features: []
  });

  const { toast } = useToast();

  // Sample subscription data
  const initialSubscriptions: Subscription[] = [
    {
      id: '1',
      customerName: 'John Smith',
      customerEmail: 'john.smith@techcorp.com',
      companyName: 'TechCorp Solutions',
      plan: 'Enterprise',
      status: 'Active',
      price: 299,
      billingCycle: 'Monthly',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      nextBilling: '2024-08-15',
      usage: {
        users: 45,
        storage: 85,
        apiCalls: 8500
      },
      limits: {
        maxUsers: 100,
        maxStorage: 500,
        maxApiCalls: 50000
      },
      paymentMethod: 'Credit Card (**** 4567)',
      lastPayment: '2024-07-15',
      totalPaid: 2092,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      features: ['Advanced Analytics', 'Priority Support', 'Custom Integrations', 'SSO', 'API Access']
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@innovate.co',
      companyName: 'Innovate Inc',
      plan: 'Pro',
      status: 'Active',
      price: 99,
      billingCycle: 'Monthly',
      startDate: '2024-02-20',
      endDate: '2025-02-20',
      nextBilling: '2024-08-20',
      usage: {
        users: 12,
        storage: 25,
        apiCalls: 2800
      },
      limits: {
        maxUsers: 25,
        maxStorage: 100,
        maxApiCalls: 10000
      },
      paymentMethod: 'Credit Card (**** 8901)',
      lastPayment: '2024-07-20',
      totalPaid: 495,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      features: ['Advanced Analytics', 'Priority Support', 'Integrations', 'API Access'],
      discount: {
        type: 'percentage',
        value: 20,
        code: 'SAVE20'
      }
    },
    {
      id: '3',
      customerName: 'Michael Chen',
      customerEmail: 'michael.chen@startup.io',
      companyName: 'StartupTech',
      plan: 'Basic',
      status: 'Trial',
      price: 29,
      billingCycle: 'Monthly',
      startDate: '2024-07-01',
      endDate: '2024-07-15',
      nextBilling: '2024-07-15',
      usage: {
        users: 3,
        storage: 5,
        apiCalls: 450
      },
      limits: {
        maxUsers: 5,
        maxStorage: 10,
        maxApiCalls: 1000
      },
      paymentMethod: 'Not Set',
      lastPayment: 'N/A',
      totalPaid: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      features: ['Basic Analytics', 'Standard Support', 'Basic API']
    },
    {
      id: '4',
      customerName: 'Emily Rodriguez',
      customerEmail: 'emily.rodriguez@design.co',
      companyName: 'Design Studios',
      plan: 'Pro',
      status: 'Past Due',
      price: 99,
      billingCycle: 'Yearly',
      startDate: '2023-12-01',
      endDate: '2024-12-01',
      nextBilling: '2024-07-01',
      usage: {
        users: 18,
        storage: 45,
        apiCalls: 5200
      },
      limits: {
        maxUsers: 25,
        maxStorage: 100,
        maxApiCalls: 10000
      },
      paymentMethod: 'Credit Card (**** 3456)',
      lastPayment: '2023-12-01',
      totalPaid: 1188,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b96d3d2d?w=40&h=40&fit=crop&crop=face',
      features: ['Advanced Analytics', 'Priority Support', 'Integrations', 'API Access']
    },
    {
      id: '5',
      customerName: 'David Kim',
      customerEmail: 'david.kim@growth.co',
      companyName: 'Growth Analytics',
      plan: 'Enterprise',
      status: 'Cancelled',
      price: 299,
      billingCycle: 'Monthly',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      nextBilling: 'N/A',
      usage: {
        users: 0,
        storage: 0,
        apiCalls: 0
      },
      limits: {
        maxUsers: 100,
        maxStorage: 500,
        maxApiCalls: 50000
      },
      paymentMethod: 'Credit Card (**** 7890)',
      lastPayment: '2024-05-01',
      totalPaid: 3588,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      features: ['Advanced Analytics', 'Priority Support', 'Custom Integrations', 'SSO', 'API Access']
    }
  ];

  // Sample invoice data
  const initialInvoices: Invoice[] = [
    {
      id: 'inv-001',
      invoiceNumber: 'INV-2024-001',
      subscriptionId: '1',
      customerName: 'John Smith',
      customerEmail: 'john.smith@techcorp.com',
      companyName: 'TechCorp Solutions',
      amount: 299,
      currency: 'USD',
      status: 'Paid',
      issueDate: '2024-07-01',
      dueDate: '2024-07-15',
      paidDate: '2024-07-10',
      paymentMethod: 'Credit Card (**** 4567)',
      downloadUrl: '/invoices/INV-2024-001.pdf',
      taxAmount: 29.9,
      totalAmount: 328.9,
      notes: 'Monthly subscription payment',
      renewalDate: '2024-08-01'
    },
    {
      id: 'inv-002',
      invoiceNumber: 'INV-2024-002',
      subscriptionId: '2',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@innovate.com',
      companyName: 'Innovate Labs',
      amount: 99,
      currency: 'USD',
      status: 'Pending',
      issueDate: '2024-07-15',
      dueDate: '2024-07-30',
      paymentMethod: 'Bank Transfer',
      taxAmount: 9.9,
      totalAmount: 108.9,
      notes: 'Monthly subscription payment',
      renewalDate: '2024-08-15'
    },
    {
      id: 'inv-003',
      invoiceNumber: 'INV-2024-003',
      subscriptionId: '3',
      customerName: 'Michael Chen',
      customerEmail: 'michael.chen@startupx.com',
      companyName: 'StartupX',
      amount: 29,
      currency: 'USD',
      status: 'Overdue',
      issueDate: '2024-06-15',
      dueDate: '2024-06-30',
      paymentMethod: 'Credit Card (**** 8901)',
      taxAmount: 2.9,
      totalAmount: 31.9,
      notes: 'Monthly subscription payment - Payment overdue',
      renewalDate: '2024-07-15'
    },
    {
      id: 'inv-004',
      invoiceNumber: 'INV-2024-004',
      subscriptionId: '4',
      customerName: 'Lisa Rodriguez',
      customerEmail: 'lisa.rodriguez@dataflow.com',
      companyName: 'DataFlow Inc',
      amount: 149,
      currency: 'USD',
      status: 'Paid',
      issueDate: '2024-07-01',
      dueDate: '2024-07-15',
      paidDate: '2024-07-12',
      paymentMethod: 'Credit Card (**** 2345)',
      downloadUrl: '/invoices/INV-2024-004.pdf',
      taxAmount: 14.9,
      totalAmount: 163.9,
      notes: 'Monthly subscription payment',
      renewalDate: '2024-08-01'
    }
  ];

  useEffect(() => {
    setSubscriptions(initialSubscriptions);
    setInvoices(initialInvoices);
  }, []);

  // Filter and sort subscriptions
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    const matchesPlan = planFilter === 'all' || subscription.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    const aValue = a[sortField as keyof Subscription];
    const bValue = b[sortField as keyof Subscription];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddSubscription = () => {
    if (!newSubscription.customerName || !newSubscription.customerEmail || !newSubscription.companyName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const subscriptionData: Subscription = {
      id: Date.now().toString(),
      customerName: newSubscription.customerName!,
      customerEmail: newSubscription.customerEmail!,
      companyName: newSubscription.companyName!,
      plan: newSubscription.plan!,
      status: newSubscription.status!,
      price: newSubscription.price!,
      billingCycle: newSubscription.billingCycle!,
      startDate: newSubscription.startDate!,
      endDate: newSubscription.endDate!,
      nextBilling: newSubscription.nextBilling!,
      usage: newSubscription.usage!,
      limits: newSubscription.limits!,
      paymentMethod: newSubscription.paymentMethod!,
      lastPayment: newSubscription.startDate!,
      totalPaid: 0,
      features: newSubscription.features!
    };

    setSubscriptions(prevSubscriptions => [...prevSubscriptions, subscriptionData]);
    
    toast({
      title: "Success",
      description: "Subscription added successfully",
    });
    setShowAddSubscriptionDrawer(false);
    resetNewSubscription();
  };

  const resetNewSubscription = () => {
    setNewSubscription({
      customerName: '',
      customerEmail: '',
      companyName: '',
      plan: 'Basic',
      status: 'Active',
      price: 29,
      billingCycle: 'Monthly',
      startDate: '',
      endDate: '',
      nextBilling: '',
      usage: {
        users: 0,
        storage: 0,
        apiCalls: 0
      },
      limits: {
        maxUsers: 5,
        maxStorage: 10,
        maxApiCalls: 1000
      },
      paymentMethod: 'Credit Card',
      features: []
    });
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setShowEditSubscriptionDrawer(true);
  };

  const handleViewSubscription = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setShowViewSubscriptionDrawer(true);
  };

  const handleDeleteSubscription = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setShowDeleteDialog(true);
  };

  const confirmDeleteSubscription = () => {
    if (currentSubscription) {
      setSubscriptions(prevSubscriptions => 
        prevSubscriptions.filter(sub => sub.id !== currentSubscription.id)
      );
      toast({
        title: "Success",
        description: "Subscription deleted successfully",
      });
      setShowDeleteDialog(false);
      setCurrentSubscription(null);
    }
  };

  const handleToggleStatus = (subscriptionId: string) => {
    setSubscriptions(prevSubscriptions => 
      prevSubscriptions.map(subscription => 
        subscription.id === subscriptionId 
          ? { 
              ...subscription, 
              status: subscription.status === 'Active' ? 'Inactive' : 'Active' 
            }
          : subscription
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      case 'Past Due':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Past Due</Badge>;
      case 'Trial':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Trial</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Basic':
        return <Badge variant="outline" className="text-gray-700 border-gray-300">Basic</Badge>;
      case 'Pro':
        return <Badge variant="outline" className="text-blue-700 border-blue-300">Pro</Badge>;
      case 'Enterprise':
        return <Badge variant="outline" className="text-purple-700 border-purple-300">Enterprise</Badge>;
      case 'Custom':
        return <Badge variant="outline" className="text-orange-700 border-orange-300">Custom</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-700">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Modern Header Section */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                      Subscription Management
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage customer subscriptions, billing, and plans</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setShowAddSubscriptionDrawer(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Subscription
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Import
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modern Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Subscriptions */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Total Subscriptions</p>
                  <p className="text-3xl font-bold text-blue-900">{subscriptions.length}</p>
                  <p className="text-xs text-blue-600 mt-1">Active customers</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Subscriptions */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 mb-1">Active</p>
                  <p className="text-3xl font-bold text-emerald-900">{subscriptions.filter(s => s.status === 'Active').length}</p>
                  <p className="text-xs text-emerald-600 mt-1">Currently active</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Revenue */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700 mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-amber-900">
                    ${subscriptions.filter(s => s.status === 'Active').reduce((total, sub) => 
                      total + (sub.billingCycle === 'Monthly' ? sub.price : sub.price / 12), 0
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">Recurring revenue</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Plans */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">Enterprise</p>
                  <p className="text-3xl font-bold text-purple-900">{subscriptions.filter(s => s.plan === 'Enterprise').length}</p>
                  <p className="text-xs text-purple-600 mt-1">Premium customers</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Filter Panel */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search subscriptions, customers, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/80 border-gray-200/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-300"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-white/80 border-gray-200/50 rounded-xl">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Trial">Trial</SelectItem>
                    <SelectItem value="Past Due">Past Due</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-40 bg-white/80 border-gray-200/50 rounded-xl">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-4">
              Showing {sortedSubscriptions.length} of {subscriptions.length} subscriptions
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions List */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 px-6 py-4 border-b border-gray-100/50">
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700">
                <div className="col-span-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('customerName')}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Customer
                    {sortField === 'customerName' && (
                      <div className="ml-2 flex items-center gap-1">
                        {sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-blue-600" /> : <ChevronDown className="w-3 h-3 text-blue-600" />}
                        <span className="text-xs text-blue-600">Sorted</span>
                      </div>
                    )}
                  </Button>
                </div>
                <div className="col-span-2">Plan & Status</div>
                <div className="col-span-2">Billing</div>
                <div className="col-span-2">Usage</div>
                <div className="col-span-1">Revenue</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Subscriptions List */}
            <div className="divide-y divide-gray-100/50">
              {sortedSubscriptions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscriptions found</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    {searchTerm || statusFilter !== 'all' || planFilter !== 'all'
                      ? "No subscriptions match your current filters. Try adjusting your search criteria."
                      : "Get started by adding your first subscription."}
                  </p>
                  {!searchTerm && statusFilter === 'all' && planFilter === 'all' && (
                    <Button
                      onClick={() => setShowAddSubscriptionDrawer(true)}
                      className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Subscription
                    </Button>
                  )}
                </div>
              ) : (
                sortedSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="px-6 py-4 hover:bg-blue-50/50 transition-all duration-200 group">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Customer Info */}
                      <div className="col-span-3 flex items-center gap-3 min-w-0">
                        <Avatar className="w-10 h-10 ring-2 ring-white shadow-md">
                          <AvatarImage src={subscription.avatar} alt={subscription.customerName} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {subscription.customerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">{subscription.customerName}</p>
                          <p className="text-xs text-gray-600 truncate">{subscription.customerEmail}</p>
                          <p className="text-xs text-gray-500 truncate">{subscription.companyName}</p>
                        </div>
                      </div>

                      {/* Plan & Status */}
                      <div className="col-span-2 space-y-1">
                        <div className="flex items-center gap-2">
                          {getPlanBadge(subscription.plan)}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(subscription.status)}
                        </div>
                      </div>

                      {/* Billing Info */}
                      <div className="col-span-2 space-y-1">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900">
                            {formatCurrency(subscription.price)}/{subscription.billingCycle.toLowerCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            Next: {subscription.nextBilling === 'N/A' ? 'N/A' : formatDate(subscription.nextBilling)}
                          </span>
                        </div>
                      </div>

                      {/* Usage */}
                      <div className="col-span-2 space-y-1">
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Users:</span>
                            <span className="font-medium">{subscription.usage.users}/{subscription.limits.maxUsers}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full" 
                              style={{ width: `${getUsagePercentage(subscription.usage.users, subscription.limits.maxUsers)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Revenue */}
                      <div className="col-span-1">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(subscription.totalPaid)}
                        </div>
                        <div className="text-xs text-gray-600">Total paid</div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewSubscription(subscription)}
                          className="h-8 px-3 text-sm font-medium border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 rounded-lg"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 transition-all duration-200 rounded-lg">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 shadow-xl border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm">
                            <DropdownMenuLabel className="text-sm font-semibold text-gray-700 px-4 py-3">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewSubscription(subscription)} className="text-sm hover:bg-blue-50 rounded-lg mx-2 px-3 py-2">
                              <Eye className="mr-3 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditSubscription(subscription)} className="text-sm hover:bg-green-50 rounded-lg mx-2 px-3 py-2">
                              <Edit className="mr-3 h-4 w-4" />
                              Edit Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(subscription.id)} className="text-sm hover:bg-yellow-50 rounded-lg mx-2 px-3 py-2">
                              {subscription.status === 'Active' ? (
                                <>
                                  <XCircle className="mr-3 h-4 w-4" />
                                  Suspend
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="mr-3 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteSubscription(subscription)}
                              className="text-red-600 text-sm hover:bg-red-50 rounded-lg mx-2 px-3 py-2"
                            >
                              <Trash2 className="mr-3 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Subscription Drawer */}
        <Sheet open={showAddSubscriptionDrawer} onOpenChange={setShowAddSubscriptionDrawer}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white to-gray-50/30">
            <SheetHeader className="pb-6 border-b border-gray-200/50">
              <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add New Subscription
              </SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer-name">Customer Name *</Label>
                    <Input
                      id="customer-name"
                      value={newSubscription.customerName}
                      onChange={(e) => setNewSubscription({ ...newSubscription, customerName: e.target.value })}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-email">Customer Email *</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      value={newSubscription.customerEmail}
                      onChange={(e) => setNewSubscription({ ...newSubscription, customerEmail: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="company-name">Company Name *</Label>
                    <Input
                      id="company-name"
                      value={newSubscription.companyName}
                      onChange={(e) => setNewSubscription({ ...newSubscription, companyName: e.target.value })}
                      placeholder="Enter company name"
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subscription Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plan">Plan</Label>
                    <Select value={newSubscription.plan} onValueChange={(value) => setNewSubscription({ ...newSubscription, plan: value as any })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic - $29/month</SelectItem>
                        <SelectItem value="Pro">Pro - $99/month</SelectItem>
                        <SelectItem value="Enterprise">Enterprise - $299/month</SelectItem>
                        <SelectItem value="Custom">Custom - Custom pricing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="billing-cycle">Billing Cycle</Label>
                    <Select value={newSubscription.billingCycle} onValueChange={(value) => setNewSubscription({ ...newSubscription, billingCycle: value as any })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select billing cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newSubscription.price}
                      onChange={(e) => setNewSubscription({ ...newSubscription, price: parseFloat(e.target.value) })}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newSubscription.status} onValueChange={(value) => setNewSubscription({ ...newSubscription, status: value as any })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Trial">Trial</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Billing Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Billing Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={newSubscription.startDate}
                      onChange={(e) => setNewSubscription({ ...newSubscription, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={newSubscription.endDate}
                      onChange={(e) => setNewSubscription({ ...newSubscription, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="next-billing">Next Billing</Label>
                    <Input
                      id="next-billing"
                      type="date"
                      value={newSubscription.nextBilling}
                      onChange={(e) => setNewSubscription({ ...newSubscription, nextBilling: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setShowAddSubscriptionDrawer(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubscription}>
                Create Subscription
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* View Subscription Drawer */}
        <Sheet open={showViewSubscriptionDrawer} onOpenChange={setShowViewSubscriptionDrawer}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white to-gray-50/30">
            {currentSubscription && (
              <>
                <SheetHeader className="pb-6 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                        <AvatarImage src={currentSubscription.avatar} alt={currentSubscription.customerName} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                          {currentSubscription.customerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <SheetTitle className="text-2xl font-bold text-gray-900">{currentSubscription.customerName}</SheetTitle>
                        <p className="text-gray-600 mt-1">{currentSubscription.customerEmail}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(currentSubscription.status)}
                          {getPlanBadge(currentSubscription.plan)}
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetHeader>

                <div className="py-6 space-y-8">
                  {/* Subscription Overview */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Subscription Details</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Plan</Label>
                        <p className="text-lg font-semibold text-gray-900">{currentSubscription.plan}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Price</Label>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(currentSubscription.price)}/{currentSubscription.billingCycle.toLowerCase()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Status</Label>
                        <div>{getStatusBadge(currentSubscription.status)}</div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Total Paid</Label>
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(currentSubscription.totalPaid)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Usage Information */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Usage & Limits</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Users</span>
                          <span className="text-sm font-medium text-gray-900">
                            {currentSubscription.usage.users} / {currentSubscription.limits.maxUsers}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${getUsagePercentage(currentSubscription.usage.users, currentSubscription.limits.maxUsers)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Storage (GB)</span>
                          <span className="text-sm font-medium text-gray-900">
                            {currentSubscription.usage.storage} / {currentSubscription.limits.maxStorage}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${getUsagePercentage(currentSubscription.usage.storage, currentSubscription.limits.maxStorage)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">API Calls</span>
                          <span className="text-sm font-medium text-gray-900">
                            {currentSubscription.usage.apiCalls.toLocaleString()} / {currentSubscription.limits.maxApiCalls.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${getUsagePercentage(currentSubscription.usage.apiCalls, currentSubscription.limits.maxApiCalls)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Zap className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Features</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentSubscription.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this subscription? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteSubscription}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
