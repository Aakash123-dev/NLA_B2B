'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer, 
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Star,
  DollarSign,
  Target,
  Zap,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Sparkles,
  TrendingDown,
  ChevronRight,
  BarChart3,
  PieChart as PieChartIcon,
  Mail,
  Phone,
  MapPin,
  Building2,
  Crown,
  AlertCircle,
  Filter,
  CalendarDays,
  Plus,
  Bell,
  Download,
  RefreshCw
} from 'lucide-react';

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [dateRange, setDateRange] = useState('30d');

  // Core metrics state
  const [metrics, setMetrics] = useState({
    totalOrganizations: 247,
    totalUsers: 12470,
    activeUsers: 8920,
    subscriptionSales: 476500,
    activeSubscriptions: 3420,
    expiring: 124,
    growthRate: 12.5,
    conversionRate: 3.2,
    avgOrderValue: 243.57,
    customerRetention: 92.8,
    churnRate: 2.3
  });

  // Subscription sales data for graph
  const [subscriptionSalesData] = useState([
    { name: 'Jan', sales: 32000, subscriptions: 850, active: 820 },
    { name: 'Feb', sales: 33200, subscriptions: 870, active: 842 },
    { name: 'Mar', sales: 35800, subscriptions: 920, active: 895 },
    { name: 'Apr', sales: 38500, subscriptions: 980, active: 956 },
    { name: 'May', sales: 42000, subscriptions: 1050, active: 1025 },
    { name: 'Jun', sales: 45600, subscriptions: 1180, active: 1156 },
    { name: 'Jul', sales: 47650, subscriptions: 1247, active: 1220 },
    { name: 'Aug', sales: 51200, subscriptions: 1340, active: 1315 },
    { name: 'Sep', sales: 54800, subscriptions: 1420, active: 1392 },
    { name: 'Oct', sales: 58200, subscriptions: 1510, active: 1485 },
    { name: 'Nov', sales: 61500, subscriptions: 1600, active: 1572 },
    { name: 'Dec', sales: 65000, subscriptions: 1680, active: 1648 }
  ]);

  // Active users growth data
  const [activeUsersData] = useState([
    { name: 'Week 1', users: 8200, growth: 2.3 },
    { name: 'Week 2', users: 8350, growth: 1.8 },
    { name: 'Week 3', users: 8620, growth: 3.2 },
    { name: 'Week 4', users: 8920, growth: 3.5 }
  ]);

  // Subscription sources pie chart data
  const [subscriptionSources] = useState([
    { name: 'Direct Sales', value: 35, fill: '#3b82f6', count: 1190 },
    { name: 'Partner Channel', value: 28, fill: '#10b981', count: 952 },
    { name: 'Online Marketing', value: 22, fill: '#f59e0b', count: 748 },
    { name: 'Referrals', value: 15, fill: '#ef4444', count: 510 }
  ]);

  // Users with expiring subscriptions
  const [expiringUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      organization: 'TechCorp Inc.',
      plan: 'Enterprise',
      expiryDate: '2025-07-15',
      daysLeft: 11,
      amount: 499,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a2d5ef?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@startup.io',
      organization: 'StartupXYZ',
      plan: 'Professional',
      expiryDate: '2025-07-18',
      daysLeft: 14,
      amount: 199,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@agency.com',
      organization: 'Creative Agency',
      plan: 'Business',
      expiryDate: '2025-07-12',
      daysLeft: 8,
      amount: 299,
      status: 'Expiring Soon',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@enterprise.com',
      organization: 'Enterprise Solutions',
      plan: 'Enterprise',
      expiryDate: '2025-07-20',
      daysLeft: 16,
      amount: 799,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@consulting.com',
      organization: 'Strategy Consultants',
      plan: 'Professional',
      expiryDate: '2025-07-10',
      daysLeft: 6,
      amount: 199,
      status: 'Expiring Soon',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getExpiryStatusColor = (daysLeft: number) => {
    if (daysLeft <= 7) return 'text-red-600 bg-red-50 border-red-200';
    if (daysLeft <= 14) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getExpiryStatusText = (daysLeft: number) => {
    if (daysLeft <= 7) return 'Expiring Soon';
    if (daysLeft <= 14) return 'Expiring';
    return 'Active';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const statsCards = [
    {
      title: 'Total Organizations',
      value: metrics.totalOrganizations.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: Building2,
      description: 'vs last month',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-600'
    },
    {
      title: 'Total Users Active',
      value: metrics.activeUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      description: 'monthly active users',
      color: 'from-emerald-600 to-emerald-700',
      bgColor: 'from-emerald-50 to-emerald-100',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-600'
    },
    {
      title: 'Subscription Sales',
      value: `$${metrics.subscriptionSales.toLocaleString()}`,
      change: '+15.3%',
      changeType: 'positive',
      icon: Crown,
      description: 'total revenue',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-600'
    },
    {
      title: 'Active Subscriptions',
      value: metrics.activeSubscriptions.toLocaleString(),
      change: '+6.8%',
      changeType: 'positive',
      icon: CheckCircle,
      description: 'currently active',
      color: 'from-orange-600 to-orange-700',
      bgColor: 'from-orange-50 to-orange-100',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Dashboard Overview
                    </h1>
                    <p className="text-slate-600 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Complete business insights and analytics
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <CalendarDays className="h-4 w-4 text-slate-600" />
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-32 border-0 bg-transparent text-sm">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  <Filter className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <Card
              key={card.title}
              className={`group relative overflow-hidden border-0 bg-gradient-to-br ${card.bgColor} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer`}
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out',
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5`} />
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className={`text-sm font-medium ${card.textColor}`}>{card.title}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                      <div className={`flex items-center text-sm font-medium ${
                        card.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {card.changeType === 'positive' ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {card.change}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">{card.description}</p>
                  </div>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500`} />
                    <div className={`relative flex items-center justify-center w-14 h-14 ${card.iconBg} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <card.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Subscription Sales Chart */}
          <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    Subscription Sales
                  </CardTitle>
                  <CardDescription>Monthly subscription revenue and growth</CardDescription>
                </div>
                <div className="flex space-x-2">
                  {['Revenue', 'Count'].map((metric) => (
                    <Button 
                      key={metric}
                      variant={selectedTimeframe === metric.toLowerCase() ? "default" : "outline"} 
                      size="sm" 
                      className="text-xs h-8 px-3"
                      onClick={() => setSelectedTimeframe(metric.toLowerCase())}
                    >
                      {metric}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-slate-900">${metrics.subscriptionSales.toLocaleString()}</h3>
                  <div className="flex items-center text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm font-medium">15.3%</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-blue-600"></div>
                    <span className="text-sm text-slate-600">Sales Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-purple-500"></div>
                    <span className="text-sm text-slate-600">Subscription Count</span>
                  </div>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={subscriptionSalesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        borderRadius: '12px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid #e2e8f0'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Active Users Growth Chart */}
          <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border-b border-emerald-100/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                Active Users Growth
              </CardTitle>
              <CardDescription>Weekly active user growth trend</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-slate-900">{metrics.activeUsers.toLocaleString()}</h3>
                  <div className="flex items-center text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm font-medium">+12.5%</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600">Monthly active users</p>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeUsersData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        borderRadius: '12px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        border: '1px solid #e2e8f0'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Subscription Sources Pie Chart */}
          <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 border-b border-purple-100/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                  <PieChartIcon className="h-4 w-4 text-white" />
                </div>
                Subscription Sources
              </CardTitle>
              <CardDescription>Distribution of subscription channels</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subscriptionSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {subscriptionSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {subscriptionSources.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }}></div>
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{item.value}%</p>
                      <p className="text-xs text-slate-500">{item.count} subs</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscription Ending Users Table */}
          <Card className="xl:col-span-2 border-0 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-orange-50/80 to-red-50/80 border-b border-orange-100/50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    Expiring Subscriptions
                  </CardTitle>
                  <CardDescription>Users with subscriptions ending soon</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {metrics.expiring} Expiring
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-none bg-slate-50/50">
                    <TableHead className="font-semibold text-slate-700">User</TableHead>
                    <TableHead className="font-semibold text-slate-700">Organization</TableHead>
                    <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                    <TableHead className="font-semibold text-slate-700">Expiry Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Days Left</TableHead>
                    <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiringUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-slate-900">{user.name}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium text-slate-700">{user.organization}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {user.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-slate-700">{formatDate(user.expiryDate)}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-bold text-slate-900">{user.daysLeft} days</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-bold text-slate-900">${user.amount}</p>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getExpiryStatusColor(user.daysLeft)}`}
                        >
                          {getExpiryStatusText(user.daysLeft)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}