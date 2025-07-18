"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInView } from 'react-intersection-observer';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  PieChart as PieChartIcon,
  BarChart3,
  Star,
  Award,
  Activity,
  Eye,
  ChefHat,
  Utensils,
  Pizza,
  Coffee,
  Sandwich,
  Soup,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  Home,
  Package,
  Zap,
  Target,
  Calendar,
  MessageSquare,
  Heart,
  Shield,
  Moon,
  Sun,
  Flame,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
  LucideIcon
} from 'lucide-react';

// Types
interface StatCardProps {
  title: string;
  value: React.ReactNode;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  delay?: number;
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  icon: LucideIcon;
  delay?: number;
}

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

interface OrderStatusBadgeProps {
  status: 'preparing' | 'ready' | 'delivered' | 'cancelled';
}

// Sample data for charts
const revenueData = [
  { name: 'Mon', revenue: 4200, orders: 45, avg: 93 },
  { name: 'Tue', revenue: 3800, orders: 52, avg: 73 },
  { name: 'Wed', revenue: 5200, orders: 68, avg: 76 },
  { name: 'Thu', revenue: 4800, orders: 61, avg: 79 },
  { name: 'Fri', revenue: 7200, orders: 89, avg: 81 },
  { name: 'Sat', revenue: 8900, orders: 95, avg: 94 },
  { name: 'Sun', revenue: 6800, orders: 78, avg: 87 }
];

const menuPerformance = [
  { name: 'Burgers', value: 35, color: '#ef4444' },
  { name: 'Pizza', value: 25, color: '#f97316' },
  { name: 'Salads', value: 15, color: '#fb923c' },
  { name: 'Desserts', value: 12, color: '#fbbf24' },
  { name: 'Beverages', value: 13, color: '#dc2626' }
];

const hourlyOrders = [
  { hour: '6AM', orders: 8 },
  { hour: '7AM', orders: 15 },
  { hour: '8AM', orders: 25 },
  { hour: '9AM', orders: 18 },
  { hour: '10AM', orders: 12 },
  { hour: '11AM', orders: 22 },
  { hour: '12PM', orders: 45 },
  { hour: '1PM', orders: 52 },
  { hour: '2PM', orders: 38 },
  { hour: '3PM', orders: 25 },
  { hour: '4PM', orders: 15 },
  { hour: '5PM', orders: 28 },
  { hour: '6PM', orders: 48 },
  { hour: '7PM', orders: 65 },
  { hour: '8PM', orders: 72 },
  { hour: '9PM', orders: 45 },
  { hour: '10PM', orders: 25 },
  { hour: '11PM', orders: 8 }
];

const customerSatisfaction = [
  { name: 'Excellent', value: 85, color: '#f97316' },
  { name: 'Good', value: 75, color: '#fb923c' },
  { name: 'Average', value: 65, color: '#fbbf24' },
  { name: 'Poor', value: 25, color: '#ef4444' }
];

const topDishes = [
  { name: 'Truffle Burger', sales: 234, revenue: 4680, trend: 'up', icon: Sandwich },
  { name: 'Margherita Pizza', sales: 198, revenue: 3960, trend: 'up', icon: Pizza },
  { name: 'Caesar Salad', sales: 156, revenue: 2340, trend: 'down', icon: Soup },
  { name: 'Iced Coffee', sales: 287, revenue: 1435, trend: 'up', icon: Coffee },
  { name: 'Chocolate Cake', sales: 92, revenue: 1840, trend: 'up', icon: Coffee }
];

const recentOrders = [
  { id: '#3421', customer: 'John Doe', items: 3, total: 45.50, status: 'preparing' as const, time: '2 min ago' },
  { id: '#3420', customer: 'Jane Smith', items: 2, total: 32.00, status: 'ready' as const, time: '5 min ago' },
  { id: '#3419', customer: 'Mike Johnson', items: 1, total: 18.50, status: 'delivered' as const, time: '8 min ago' },
  { id: '#3418', customer: 'Sarah Wilson', items: 4, total: 67.25, status: 'preparing' as const, time: '12 min ago' },
  { id: '#3417', customer: 'Tom Brown', items: 2, total: 28.75, status: 'cancelled' as const, time: '15 min ago' }
];

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend, delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border-red-900/30 shadow-2xl hover:shadow-red-500/10 transition-all duration-300 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg"
          >
            <Icon className="h-4 w-4 text-white" />
          </motion.div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white mb-1">{value}</div>
          <div className="flex items-center text-xs">
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
            )}
            <span className={`${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </span>
            <span className="text-gray-400 ml-1">from last week</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children, icon: Icon, delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-red-900/30 shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Icon className="h-5 w-5 text-orange-400" />
              {title}
            </CardTitle>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-1 bg-gray-800 rounded-full"
            >
              <Eye className="h-4 w-4 text-gray-400" />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < value) {
            return Math.min(prev + Math.ceil(value / 50), value);
          }
          return value;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    preparing: { color: 'bg-orange-500', text: 'Preparing' },
    ready: { color: 'bg-green-500', text: 'Ready' },
    delivered: { color: 'bg-blue-500', text: 'Delivered' },
    cancelled: { color: 'bg-red-500', text: 'Cancelled' }
  };

  const config = statusConfig[status] || statusConfig.preparing;

  return (
    <Badge className={`${config.color} text-white font-medium`}>
      {config.text}
    </Badge>
  );
};

export default function Dashboard2() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.15),rgba(255,255,255,0))] opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-600/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 bg-black/90 backdrop-blur-md border-b border-red-900/20 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Gazelle
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" className="text-white hover:bg-red-900/20 hover:text-red-300">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:bg-red-900/20 hover:text-red-300"
                onClick={() => window.location.href = '/dashboard2/orders'}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Orders
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:bg-red-900/20 hover:text-red-300"
                onClick={() => window.location.href = '/dashboard2/menu'}
              >
                <Package className="h-4 w-4 mr-2" />
                Menu
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:bg-red-900/20 hover:text-red-300"
                onClick={() => window.location.href = '/dashboard2/customers'}
              >
                <Users className="h-4 w-4 mr-2" />
                Customers
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:bg-red-900/20 hover:text-red-300">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search orders, customers..." 
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
              />
            </div>
            
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-red-900/20 hover:text-red-300 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              </Button>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Chef" />
                    <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500">
                      CK
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">Chef Kitchen</p>
                    <p className="text-xs leading-none text-gray-400">chef@firekitchen.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Restaurant Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Today's Revenue"
            value={<AnimatedCounter value={8945} prefix="$" />}
            change="+12.5%"
            icon={DollarSign}
            trend="up"
            delay={0}
          />
          <StatCard
            title="Total Orders"
            value={<AnimatedCounter value={234} />}
            change="+8.2%"
            icon={ShoppingCart}
            trend="up"
            delay={0.1}
          />
          <StatCard
            title="Active Customers"
            value={<AnimatedCounter value={1247} />}
            change="+5.7%"
            icon={Users}
            trend="up"
            delay={0.2}
          />
          <StatCard
            title="Avg Order Time"
            value="12 min"
            change="-2.3 min"
            icon={Clock}
            trend="up"
            delay={0.3}
          />
        </motion.div>

        {/* Main Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <ChartCard title="Weekly Revenue Trend" icon={TrendingUp} delay={0.4}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #ef4444',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#f97316"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Menu Performance */}
          <ChartCard title="Menu Performance" icon={PieChartIcon} delay={0.5}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={menuPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {menuPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        {/* Secondary Charts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Hourly Orders */}
          <ChartCard title="Hourly Order Pattern" icon={BarChart3} delay={0.6}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #ef4444',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Customer Satisfaction */}
          <ChartCard title="Customer Satisfaction" icon={Star} delay={0.7}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={customerSatisfaction}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="#f97316" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #ef4444',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Top Dishes */}
          <ChartCard title="Top Performing Dishes" icon={Award} delay={0.8}>
            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <motion.div
                  key={dish.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                      <dish.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{dish.name}</div>
                      <div className="text-sm text-gray-400">{dish.sales} orders</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">${dish.revenue}</div>
                    <div className="flex items-center gap-1">
                      {dish.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                      <span className={`text-xs ${dish.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {dish.trend === 'up' ? '+' : '-'}5.2%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>

          {/* Recent Orders */}
          <ChartCard title="Recent Orders" icon={Activity} delay={0.9}>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                      <Utensils className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{order.id}</div>
                      <div className="text-sm text-gray-400">{order.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">${order.total}</div>
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={order.status} />
                      <span className="text-xs text-gray-400">{order.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>
        </motion.div>
      </div>
    </div>
  );
}
