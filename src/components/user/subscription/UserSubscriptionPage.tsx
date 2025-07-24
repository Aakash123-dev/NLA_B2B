'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Crown,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  planName: string;
  planType: 'Basic' | 'Pro' | 'Enterprise' | 'Custom';
  status: 'Active' | 'Expired' | 'Cancelled' | 'Pending';
  userEmail: string;
  userName: string;
  companyName: string;
  startDate: string;
  endDate: string;
  price: number;
  billingCycle: 'Monthly' | 'Yearly';
  features: string[];
  usage: {
    users: number;
    maxUsers: number;
    storage: number;
    maxStorage: number;
    apiCalls: number;
    maxApiCalls: number;
  };
  paymentMethod: string;
  nextBilling: string;
  autoRenew: boolean;
  companyLogo?: string;
  avatar?: string;
}

export default function UserSubscriptionPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [billingFilter, setBillingFilter] = useState('all');
  const [showViewSubscriptionDrawer, setShowViewSubscriptionDrawer] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [sortField, setSortField] = useState('planName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const { toast } = useToast();

  // Sample data
  const initialSubscriptions: Subscription[] = [
    {
      id: '1',
      planName: 'Enterprise Premium',
      planType: 'Enterprise',
      status: 'Active',
      userEmail: 'john.smith@techcorp.com',
      userName: 'John Smith',
      companyName: 'TechCorp Solutions',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      price: 999,
      billingCycle: 'Yearly',
      features: ['Unlimited Users', 'Advanced Analytics', 'Priority Support', 'Custom Integrations', 'API Access'],
      usage: {
        users: 45,
        maxUsers: -1, // unlimited
        storage: 850,
        maxStorage: 1000,
        apiCalls: 15000,
        maxApiCalls: 50000
      },
      paymentMethod: '**** **** **** 1234',
      nextBilling: '2024-12-31',
      autoRenew: true,
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop&crop=entropy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      planName: 'Professional',
      planType: 'Pro',
      status: 'Active',
      userEmail: 'sarah.johnson@innovate.com',
      userName: 'Sarah Johnson',
      companyName: 'Innovate Solutions',
      startDate: '2024-02-20',
      endDate: '2024-10-15',
      price: 299,
      billingCycle: 'Yearly',
      features: ['Up to 25 Users', 'Standard Analytics', 'Email Support', 'Basic Integrations'],
      usage: {
        users: 18,
        maxUsers: 25,
        storage: 250,
        maxStorage: 500,
        apiCalls: 8500,
        maxApiCalls: 25000
      },
      paymentMethod: '**** **** **** 5678',
      nextBilling: '2024-10-15',
      autoRenew: true,
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=40&h=40&fit=crop&crop=entropy',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a2d5ef?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '3',
      planName: 'Basic Plan',
      planType: 'Basic',
      status: 'Expired',
      userEmail: 'michael.chen@startup.io',
      userName: 'Michael Chen',
      companyName: 'StartupIO',
      startDate: '2024-03-10',
      endDate: '2024-08-20',
      price: 99,
      billingCycle: 'Yearly',
      features: ['Up to 5 Users', 'Basic Features', 'Community Support'],
      usage: {
        users: 5,
        maxUsers: 5,
        storage: 45,
        maxStorage: 100,
        apiCalls: 2500,
        maxApiCalls: 10000
      },
      paymentMethod: '**** **** **** 9012',
      nextBilling: '2024-08-20',
      autoRenew: false,
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=40&h=40&fit=crop&crop=entropy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '4',
      planName: 'Professional Plus',
      planType: 'Pro',
      status: 'Cancelled',
      userEmail: 'emily.rodriguez@enterprise.com',
      userName: 'Emily Rodriguez',
      companyName: 'Enterprise Corp',
      startDate: '2024-01-05',
      endDate: '2024-07-15',
      price: 499,
      billingCycle: 'Yearly',
      features: ['Up to 50 Users', 'Advanced Analytics', 'Priority Support', 'Custom Reports'],
      usage: {
        users: 32,
        maxUsers: 50,
        storage: 450,
        maxStorage: 750,
        apiCalls: 18000,
        maxApiCalls: 35000
      },
      paymentMethod: '**** **** **** 3456',
      nextBilling: '2024-07-15',
      autoRenew: false,
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=entropy',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '5',
      planName: 'Custom Enterprise',
      planType: 'Custom',
      status: 'Pending',
      userEmail: 'david.kim@growth.co',
      userName: 'David Kim',
      companyName: 'Growth Dynamics',
      startDate: '2024-08-01',
      endDate: '2025-07-31',
      price: 1499,
      billingCycle: 'Yearly',
      features: ['Unlimited Everything', 'White-label Solution', 'Dedicated Support', '24/7 Monitoring'],
      usage: {
        users: 0,
        maxUsers: -1,
        storage: 0,
        maxStorage: -1,
        apiCalls: 0,
        maxApiCalls: -1
      },
      paymentMethod: '**** **** **** 7890',
      nextBilling: '2025-07-31',
      autoRenew: true,
      companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=40&h=40&fit=crop&crop=entropy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  // Initialize subscriptions state
  useEffect(() => {
    setSubscriptions(initialSubscriptions);
    setIsLoaded(true);
  }, []);

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatStorage = (storage: number): string => {
    return storage >= 1000 ? `${(storage / 1000).toFixed(1)}TB` : `${storage}GB`;
  };

  const formatNumber = (num: number): string => {
    if (num === -1) return 'Unlimited';
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Filter subscriptions
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    const matchesPlan = planFilter === 'all' || subscription.planType === planFilter;
    const matchesBilling = billingFilter === 'all' || subscription.billingCycle === billingFilter;
    
    return matchesSearch && matchesStatus && matchesPlan && matchesBilling;
  });

  // Sort subscriptions
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    let aValue = a[sortField as keyof Subscription];
    let bValue = b[sortField as keyof Subscription];
    
    if (aValue === undefined) aValue = '';
    if (bValue === undefined) bValue = '';

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewSubscription = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setShowViewSubscriptionDrawer(true);
  };

  const handleUpgrade = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setShowUpgradeDialog(true);
  };

  const handleCancel = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    if (currentSubscription) {
      setSubscriptions(prevSubs => 
        prevSubs.map(sub => 
          sub.id === currentSubscription.id 
            ? { ...sub, status: 'Cancelled' as const, autoRenew: false }
            : sub
        )
      );
      
      toast({
        title: "Success",
        description: "Subscription cancelled successfully",
      });
      setShowCancelDialog(false);
      setCurrentSubscription(null);
    }
  };

  const getStatusBadge = (status: Subscription['status']) => {
    switch (status) {
      case 'Active':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-xs whitespace-nowrap">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'Expired':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 text-xs whitespace-nowrap">
            <XCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        );
      case 'Cancelled':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200 text-xs whitespace-nowrap">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'Pending':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 text-xs whitespace-nowrap">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const getPlanBadge = (planType: Subscription['planType']) => {
    switch (planType) {
      case 'Basic':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs whitespace-nowrap">
            <Package className="w-3 h-3 mr-1" />
            Basic
          </Badge>
        );
      case 'Pro':
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 text-xs whitespace-nowrap">
            <Zap className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        );
      case 'Enterprise':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 text-xs whitespace-nowrap">
            <Crown className="w-3 h-3 mr-1" />
            Enterprise
          </Badge>
        );
      case 'Custom':
        return (
          <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 hover:from-purple-200 hover:to-pink-200 border-purple-200 text-xs whitespace-nowrap">
            <Star className="w-3 h-3 mr-1" />
            Custom
          </Badge>
        );
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading subscriptions...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl"></div>
          
          <Card className="relative bg-white/60 backdrop-blur-md border-white/20 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                      Subscription Management
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Monitor and manage all subscription plans</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline"
                    className="border-2 border-white/50 bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 rounded-xl px-6 py-3"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Import
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-white/50 bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 rounded-xl px-6 py-3"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-100/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Total Subscriptions</p>
                  <p className="text-3xl font-bold text-blue-900">{subscriptions.length}</p>
                  <p className="text-xs text-blue-600 mt-1">All plans</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 mb-1">Active</p>
                  <p className="text-3xl font-bold text-emerald-900">{subscriptions.filter(s => s.status === 'Active').length}</p>
                  <p className="text-xs text-emerald-600 mt-1">Currently active</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50/80 to-orange-100/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700 mb-1">Enterprise</p>
                  <p className="text-3xl font-bold text-amber-900">{subscriptions.filter(s => s.planType === 'Enterprise' || s.planType === 'Custom').length}</p>
                  <p className="text-xs text-amber-600 mt-1">Premium plans</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-pink-100/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {formatCurrency(subscriptions.reduce((sum, s) => sum + (s.billingCycle === 'Monthly' ? s.price : s.price / 12), 0))}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">Recurring</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl"></div>
          <Card className="relative bg-white/60 backdrop-blur-md border-white/20 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search subscriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white/80">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="w-40 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white/80">
                      <SelectValue placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={billingFilter} onValueChange={setBillingFilter}>
                    <SelectTrigger className="w-40 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white/80">
                      <SelectValue placeholder="Billing" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
                      <SelectItem value="all">All Billing</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscriptions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>
          <Card className="relative bg-white/70 backdrop-blur-lg border-white/30 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Table Header */}
                  <div className="bg-gradient-to-r from-slate-50/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6">
                    <div className="grid grid-cols-12 gap-8 items-center">
                      <div className="col-span-3">
                        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors group" onClick={() => handleSort('planName')}>
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50 group-hover:border-blue-300 transition-all">
                            <CreditCard className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800 text-sm">Plan & Company</span>
                            {sortField === 'planName' && (
                              <div className="flex items-center gap-1 mt-1">
                                {sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-blue-600" /> : <ChevronDown className="w-3 h-3 text-blue-600" />}
                                <span className="text-xs text-blue-600">Sorted</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <Package className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Status & Type</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <DollarSign className="w-4 h-4 text-amber-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Pricing</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Usage</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <Calendar className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Next Billing</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <span className="font-semibold text-gray-800 text-sm">Actions</span>
                      </div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-100/50">
                    <AnimatePresence>
                      {sortedSubscriptions.map((subscription, index) => (
                        <motion.div
                          key={subscription.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-8 py-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-300 group"
                        >
                          <div className="grid grid-cols-12 gap-8 items-center">
                            {/* Plan & Company */}
                            <div className="col-span-3">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                                    <AvatarImage src={subscription.avatar} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                      {subscription.userName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center">
                                    {subscription.companyLogo ? (
                                      <img src={subscription.companyLogo} alt="Company" className="w-3 h-3 rounded-full" />
                                    ) : (
                                      <Crown className="w-2 h-2 text-gray-400" />
                                    )}
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                    {subscription.planName}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">{subscription.companyName}</p>
                                  <p className="text-xs text-gray-400 truncate">{subscription.userName}</p>
                                </div>
                              </div>
                            </div>

                            {/* Status & Type */}
                            <div className="col-span-2">
                              <div className="space-y-2">
                                {getStatusBadge(subscription.status)}
                                {getPlanBadge(subscription.planType)}
                              </div>
                            </div>

                            {/* Pricing */}
                            <div className="col-span-2">
                              <div className="space-y-1">
                                <p className="text-lg font-bold text-gray-900">{formatCurrency(subscription.price)}</p>
                                <p className="text-xs text-gray-500">{subscription.billingCycle}</p>
                                <div className="flex items-center gap-1">
                                  {subscription.autoRenew ? (
                                    <Badge className="bg-green-100 text-green-800 text-xs">Auto-renew</Badge>
                                  ) : (
                                    <Badge className="bg-gray-100 text-gray-800 text-xs">Manual</Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Usage */}
                            <div className="col-span-2">
                              <div className="space-y-1">
                                <div className="text-xs text-gray-600">
                                  Users: {formatNumber(subscription.usage.users)}/{formatNumber(subscription.usage.maxUsers)}
                                </div>
                                <div className="text-xs text-gray-600">
                                  Storage: {formatStorage(subscription.usage.storage)}/{formatStorage(subscription.usage.maxStorage)}
                                </div>
                                <div className="text-xs text-gray-600">
                                  API: {formatNumber(subscription.usage.apiCalls)}/{formatNumber(subscription.usage.maxApiCalls)}
                                </div>
                              </div>
                            </div>

                            {/* Next Billing */}
                            <div className="col-span-2">
                              <div className="text-sm text-gray-600">
                                {formatDate(subscription.nextBilling)}
                              </div>
                              <div className="text-xs text-gray-400">
                                {subscription.paymentMethod}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                                  <DropdownMenuItem onClick={() => handleViewSubscription(subscription)} className="hover:bg-blue-50">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  {subscription.status === 'Active' && (
                                    <DropdownMenuItem onClick={() => handleUpgrade(subscription)} className="hover:bg-green-50">
                                      <TrendingUp className="w-4 h-4 mr-2" />
                                      Upgrade Plan
                                    </DropdownMenuItem>
                                  )}
                                  {subscription.status === 'Active' && (
                                    <DropdownMenuItem onClick={() => handleCancel(subscription)} className="hover:bg-red-50 text-red-600">
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Cancel Subscription
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-2xl rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to cancel this subscription? This action cannot be undone and the subscription will be cancelled immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="border-2 border-gray-200 hover:bg-gray-50 rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCancel}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl"
            >
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Subscription Drawer */}
      <Sheet open={showViewSubscriptionDrawer} onOpenChange={setShowViewSubscriptionDrawer}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-md">
          {currentSubscription && (
            <>
              <SheetHeader className="pb-6 border-b border-gray-200/50">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-4 border-white shadow-xl">
                    <AvatarImage src={currentSubscription.avatar} alt={currentSubscription.userName} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
                      {currentSubscription.userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-2xl font-bold text-gray-900 mb-1">
                      {currentSubscription.planName}
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 text-base">
                      {currentSubscription.companyName} • {currentSubscription.userName}
                    </SheetDescription>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(currentSubscription.status)}
                      {getPlanBadge(currentSubscription.planType)}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-8 py-6">
                {/* Plan Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Plan Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Plan Name</Label>
                        <p className="text-gray-900 font-medium">{currentSubscription.planName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Plan Type</Label>
                        {getPlanBadge(currentSubscription.planType)}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Status</Label>
                        {getStatusBadge(currentSubscription.status)}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Price</Label>
                        <p className="text-gray-900 font-bold text-xl">{formatCurrency(currentSubscription.price)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Billing Cycle</Label>
                        <p className="text-gray-900">{currentSubscription.billingCycle}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Auto Renew</Label>
                        <Badge className={currentSubscription.autoRenew ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {currentSubscription.autoRenew ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Usage Statistics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Users</Label>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{formatNumber(currentSubscription.usage.users)} / {formatNumber(currentSubscription.usage.maxUsers)}</span>
                          <span className="text-sm text-gray-500">
                            {currentSubscription.usage.maxUsers === -1 ? '∞' : `${Math.round((currentSubscription.usage.users / currentSubscription.usage.maxUsers) * 100)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: currentSubscription.usage.maxUsers === -1 ? '20%' : `${Math.min((currentSubscription.usage.users / currentSubscription.usage.maxUsers) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Storage</Label>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{formatStorage(currentSubscription.usage.storage)} / {formatStorage(currentSubscription.usage.maxStorage)}</span>
                          <span className="text-sm text-gray-500">
                            {currentSubscription.usage.maxStorage === -1 ? '∞' : `${Math.round((currentSubscription.usage.storage / currentSubscription.usage.maxStorage) * 100)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ 
                              width: currentSubscription.usage.maxStorage === -1 ? '30%' : `${Math.min((currentSubscription.usage.storage / currentSubscription.usage.maxStorage) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">API Calls</Label>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{formatNumber(currentSubscription.usage.apiCalls)} / {formatNumber(currentSubscription.usage.maxApiCalls)}</span>
                          <span className="text-sm text-gray-500">
                            {currentSubscription.usage.maxApiCalls === -1 ? '∞' : `${Math.round((currentSubscription.usage.apiCalls / currentSubscription.usage.maxApiCalls) * 100)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ 
                              width: currentSubscription.usage.maxApiCalls === -1 ? '25%' : `${Math.min((currentSubscription.usage.apiCalls / currentSubscription.usage.maxApiCalls) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Plan Features</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentSubscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                        <p className="text-gray-900">{formatDate(currentSubscription.startDate)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">End Date</Label>
                        <p className="text-gray-900">{formatDate(currentSubscription.endDate)}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Next Billing</Label>
                        <p className="text-gray-900">{formatDate(currentSubscription.nextBilling)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Payment Method</Label>
                        <p className="text-gray-900">{currentSubscription.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200/50">
                {currentSubscription.status === 'Active' && (
                  <Button 
                    onClick={() => {
                      setShowViewSubscriptionDrawer(false);
                      handleUpgrade(currentSubscription);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => setShowViewSubscriptionDrawer(false)}
                  className="flex-1 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
