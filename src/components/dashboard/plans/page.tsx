'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  CreditCard,
  Users,
  Zap,
  Calendar,
  DollarSign,
  Building2,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  Activity,
  Target,
  BarChart3
} from 'lucide-react';

// Sample data for plans
const samplePlans = [
  {
    id: 1,
    name: 'Basic Plan',
    price: 29.99,
    currency: 'USD',
    billingCycle: 'Monthly',
    maxUsers: 5,
    modules: ['Price Optimization', 'Basic Analytics'],
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    extraInfo: 'Perfect for small teams getting started',
    status: 'Active',
    subscribersCount: 142,
    revenue: 4257.58
  },
  {
    id: 2,
    name: 'Professional Plan',
    price: 79.99,
    currency: 'USD',
    billingCycle: 'Monthly',
    maxUsers: 25,
    modules: ['Price Optimization', 'TPO', 'Forecasting', 'Advanced Analytics'],
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    extraInfo: 'Best for growing businesses',
    status: 'Active',
    subscribersCount: 89,
    revenue: 7119.11
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    price: 199.99,
    currency: 'USD',
    billingCycle: 'Monthly',
    maxUsers: 100,
    modules: ['Price Optimization', 'TPO', 'Forecasting', 'Advanced Analytics', 'Custom Reports', 'API Access'],
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    extraInfo: 'For large organizations with complex needs',
    status: 'Active',
    subscribersCount: 34,
    revenue: 6799.66
  }
];

// Sample billing data
const sampleBillingData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    company: 'Tech Corp',
    subscription: 'Professional Plan',
    invoiceNumber: 'INV-2024-001',
    paymentMode: 'Credit Card',
    paymentStatus: 'Paid',
    paymentDate: '2024-01-15',
    renewalDate: '2024-02-15',
    amount: 79.99,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@startup.io',
    company: 'StartupCo',
    subscription: 'Basic Plan',
    invoiceNumber: 'INV-2024-002',
    paymentMode: 'PayPal',
    paymentStatus: 'Pending',
    paymentDate: '2024-01-20',
    renewalDate: '2024-02-20',
    amount: 29.99,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@enterprise.com',
    company: 'Enterprise Ltd',
    subscription: 'Enterprise Plan',
    invoiceNumber: 'INV-2024-003',
    paymentMode: 'Bank Transfer',
    paymentStatus: 'Paid',
    paymentDate: '2024-01-25',
    renewalDate: '2024-02-25',
    amount: 199.99,
    avatar: '/api/placeholder/40/40'
  }
];

const availableModules = [
  { id: 'price-optimization', name: 'Price Optimization', description: 'AI-powered pricing strategies' },
  { id: 'tpo', name: 'TPO', description: 'Total Price Optimization' },
  { id: 'forecasting', name: 'Forecasting', description: 'Predictive analytics and forecasting' },
  { id: 'advanced-analytics', name: 'Advanced Analytics', description: 'Deep insights and reporting' },
  { id: 'custom-reports', name: 'Custom Reports', description: 'Personalized reporting tools' },
  { id: 'api-access', name: 'API Access', description: 'Full API integration capabilities' },
  { id: 'white-labeling', name: 'White Labeling', description: 'Brand customization options' },
  { id: 'priority-support', name: 'Priority Support', description: '24/7 premium support' }
];

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState('plans');
  const [showAddPlanDrawer, setShowAddPlanDrawer] = useState(false);
  const [showEditPlanDrawer, setShowEditPlanDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [plans, setPlans] = useState(samplePlans);
  const [billingData, setBillingData] = useState(sampleBillingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Form states
  const [planForm, setPlanForm] = useState({
    name: '',
    price: '',
    currency: 'USD',
    billingCycle: 'Monthly',
    maxUsers: '',
    modules: [] as string[],
    startDate: '',
    endDate: '',
    extraInfo: ''
  });

  const handleAddPlan = () => {
    const newPlan = {
      id: Date.now(),
      ...planForm,
      price: parseFloat(planForm.price),
      maxUsers: parseInt(planForm.maxUsers),
      status: 'Active',
      subscribersCount: 0,
      revenue: 0
    };
    setPlans([...plans, newPlan]);
    setShowAddPlanDrawer(false);
    resetForm();
  };

  const handleEditPlan = () => {
    setPlans(plans.map(plan => 
      plan.id === currentPlan.id 
        ? { ...plan, ...planForm, price: parseFloat(planForm.price), maxUsers: parseInt(planForm.maxUsers) }
        : plan
    ));
    setShowEditPlanDrawer(false);
    resetForm();
  };

  const handleDeletePlan = () => {
    setPlans(plans.filter(plan => plan.id !== currentPlan.id));
    setShowDeleteDialog(false);
    setCurrentPlan(null);
  };

  const resetForm = () => {
    setPlanForm({
      name: '',
      price: '',
      currency: 'USD',
      billingCycle: 'Monthly',
      maxUsers: '',
      modules: [],
      startDate: '',
      endDate: '',
      extraInfo: ''
    });
  };

  const openEditDrawer = (plan: any) => {
    setCurrentPlan(plan);
    setPlanForm({
      name: plan.name,
      price: plan.price.toString(),
      currency: plan.currency,
      billingCycle: plan.billingCycle,
      maxUsers: plan.maxUsers.toString(),
      modules: plan.modules,
      startDate: plan.startDate,
      endDate: plan.endDate,
      extraInfo: plan.extraInfo
    });
    setShowEditPlanDrawer(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Inactive': 'bg-gray-100 text-gray-800 border-gray-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Paid': 'bg-green-100 text-green-800 border-green-200',
      'Overdue': 'bg-red-100 text-red-800 border-red-200'
    };
    return (
      <Badge className={`${variants[status] || 'bg-gray-100 text-gray-800 border-gray-200'} font-medium`}>
        {status}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Paid': 'bg-green-100 text-green-800 border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Failed': 'bg-red-100 text-red-800 border-red-200',
      'Overdue': 'bg-red-100 text-red-800 border-red-200'
    };
    return (
      <Badge className={`${variants[status] || 'bg-gray-100 text-gray-800 border-gray-200'} font-medium`}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || plan.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredBilling = billingData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = plans.reduce((sum, plan) => sum + plan.subscribersCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl" />
          <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">Plans & Billing Management</CardTitle>
                    <p className="text-blue-100 text-lg">Create and manage subscription plans and billing</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowAddPlanDrawer(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Plan
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Total Plans</p>
                  <p className="text-3xl font-bold text-blue-900">{plans.length}</p>
                  <p className="text-xs text-blue-600 mt-1">Active plans</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-900">{formatCurrency(totalRevenue)}</p>
                  <p className="text-xs text-green-600 mt-1">Monthly revenue</p>
                </div>
                <div className="p-3 bg-green-100 rounded-2xl">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">Total Subscribers</p>
                  <p className="text-3xl font-bold text-purple-900">{totalSubscribers}</p>
                  <p className="text-xs text-purple-600 mt-1">Active subscribers</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-2xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Avg. Revenue per User</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {formatCurrency(totalSubscribers > 0 ? totalRevenue / totalSubscribers : 0)}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">Monthly ARPU</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 px-6 py-4 border-b border-gray-100/50">
                <div className="flex items-center justify-between">
                  <TabsList className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-1">
                    <TabsTrigger value="plans" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-2">
                      <Zap className="w-4 h-4 mr-2" />
                      Plans
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-2">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Billing & Invoicing
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <TabsContent value="plans" className="m-0">
                <div className="p-6">
                  <div className="space-y-6">
                    {filteredPlans.map((plan) => (
                      <Card key={plan.id} className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-blue-100 rounded-xl">
                                <Zap className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                  {getStatusBadge(plan.status)}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <Label className="text-sm text-gray-500">Price</Label>
                                    <p className="text-lg font-semibold text-gray-900">
                                      {formatCurrency(plan.price)}/{plan.billingCycle.toLowerCase()}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Max Users</Label>
                                    <p className="text-lg font-semibold text-gray-900">{plan.maxUsers}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Subscribers</Label>
                                    <p className="text-lg font-semibold text-gray-900">{plan.subscribersCount}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Revenue</Label>
                                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(plan.revenue)}</p>
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <Label className="text-sm text-gray-500">Modules</Label>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {plan.modules.map((module, index) => (
                                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                        {module}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm text-gray-500">Start Date</Label>
                                    <p className="text-sm font-medium text-gray-900">{plan.startDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">End Date</Label>
                                    <p className="text-sm font-medium text-gray-900">{plan.endDate}</p>
                                  </div>
                                </div>
                                {plan.extraInfo && (
                                  <div className="mt-4">
                                    <Label className="text-sm text-gray-500">Description</Label>
                                    <p className="text-sm text-gray-700 mt-1">{plan.extraInfo}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditDrawer(plan)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => {
                                    setCurrentPlan(plan);
                                    setShowDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="m-0">
                <div className="p-6">
                  <div className="space-y-6">
                    {filteredBilling.map((item) => (
                      <Card key={item.id} className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
                                <AvatarImage src={item.avatar} alt={item.name} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                  {item.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                  {getPaymentStatusBadge(item.paymentStatus)}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <Label className="text-sm text-gray-500">Email</Label>
                                    <p className="text-sm font-medium text-gray-900">{item.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Company</Label>
                                    <p className="text-sm font-medium text-gray-900">{item.company}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Subscription</Label>
                                    <p className="text-sm font-medium text-gray-900">{item.subscription}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Amount</Label>
                                    <p className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  <div>
                                    <Label className="text-sm text-gray-500">Payment Mode</Label>
                                    <p className="text-sm font-medium text-gray-900">{item.paymentMode}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Payment Date</Label>
                                    <p className="text-sm font-medium text-gray-900">{item.paymentDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Renewal Date</Label>
                                    <p className="text-sm font-medium text-gray-900">{item.renewalDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-gray-500">Invoice</Label>
                                    <p className="text-sm font-medium text-gray-900">{item.invoiceNumber}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download Invoice
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Reminder
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Plan Drawer */}
        <Sheet open={showAddPlanDrawer} onOpenChange={setShowAddPlanDrawer}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white to-gray-50/30">
            <SheetHeader className="pb-6 border-b border-gray-200/50">
              <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Plan
              </SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                      id="name"
                      value={planForm.name}
                      onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                      placeholder="e.g., Professional Plan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={planForm.price}
                      onChange={(e) => setPlanForm({...planForm, price: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={planForm.currency} onValueChange={(value) => setPlanForm({...planForm, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="billingCycle">Billing Cycle</Label>
                    <Select value={planForm.billingCycle} onValueChange={(value) => setPlanForm({...planForm, billingCycle: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Plan Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Plan Details</h3>
                <div>
                  <Label htmlFor="maxUsers">Number of Users</Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={planForm.maxUsers}
                    onChange={(e) => setPlanForm({...planForm, maxUsers: e.target.value})}
                    placeholder="e.g., 25"
                  />
                </div>
              </div>

              {/* Modules */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableModules.map((module) => (
                    <div key={module.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={module.id}
                        checked={planForm.modules.includes(module.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPlanForm({...planForm, modules: [...planForm.modules, module.name]});
                          } else {
                            setPlanForm({...planForm, modules: planForm.modules.filter(m => m !== module.name)});
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={module.id} className="text-sm font-medium cursor-pointer">
                          {module.name}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{module.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Plan Duration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={planForm.startDate}
                      onChange={(e) => setPlanForm({...planForm, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={planForm.endDate}
                      onChange={(e) => setPlanForm({...planForm, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Extra Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div>
                  <Label htmlFor="extraInfo">Description</Label>
                  <Textarea
                    id="extraInfo"
                    value={planForm.extraInfo}
                    onChange={(e) => setPlanForm({...planForm, extraInfo: e.target.value})}
                    placeholder="Brief description of the plan..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setShowAddPlanDrawer(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPlan}>
                Create Plan
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Edit Plan Drawer */}
        <Sheet open={showEditPlanDrawer} onOpenChange={setShowEditPlanDrawer}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white to-gray-50/30">
            <SheetHeader className="pb-6 border-b border-gray-200/50">
              <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Plan
              </SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              {/* Same form fields as Add Plan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Plan Name</Label>
                    <Input
                      id="edit-name"
                      value={planForm.name}
                      onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Price</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={planForm.price}
                      onChange={(e) => setPlanForm({...planForm, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-currency">Currency</Label>
                    <Select value={planForm.currency} onValueChange={(value) => setPlanForm({...planForm, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-billingCycle">Billing Cycle</Label>
                    <Select value={planForm.billingCycle} onValueChange={(value) => setPlanForm({...planForm, billingCycle: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Plan Details</h3>
                <div>
                  <Label htmlFor="edit-maxUsers">Number of Users</Label>
                  <Input
                    id="edit-maxUsers"
                    type="number"
                    value={planForm.maxUsers}
                    onChange={(e) => setPlanForm({...planForm, maxUsers: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableModules.map((module) => (
                    <div key={module.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={`edit-${module.id}`}
                        checked={planForm.modules.includes(module.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPlanForm({...planForm, modules: [...planForm.modules, module.name]});
                          } else {
                            setPlanForm({...planForm, modules: planForm.modules.filter(m => m !== module.name)});
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={`edit-${module.id}`} className="text-sm font-medium cursor-pointer">
                          {module.name}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{module.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Plan Duration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-startDate">Start Date</Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={planForm.startDate}
                      onChange={(e) => setPlanForm({...planForm, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-endDate">End Date</Label>
                    <Input
                      id="edit-endDate"
                      type="date"
                      value={planForm.endDate}
                      onChange={(e) => setPlanForm({...planForm, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div>
                  <Label htmlFor="edit-extraInfo">Description</Label>
                  <Textarea
                    id="edit-extraInfo"
                    value={planForm.extraInfo}
                    onChange={(e) => setPlanForm({...planForm, extraInfo: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setShowEditPlanDrawer(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditPlan}>
                Save Changes
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Plan</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600">
              Are you sure you want to delete this plan? This action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeletePlan}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}