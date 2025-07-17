"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { 
  Search,
  Filter,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChefHat,
  Utensils,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MoreHorizontal,
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  User,
  Home,
  Flame,
  Bell,
  Settings,
  LogOut,
  ShoppingCart,
  Users,
  BarChart3
} from 'lucide-react';

// Sample order data
const orders = [
  {
    id: '#ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345'
    },
    items: [
      { name: 'Spicy Chicken Burger', quantity: 2, price: 15.99 },
      { name: 'Truffle Fries', quantity: 1, price: 8.99 },
      { name: 'Coca Cola', quantity: 2, price: 2.99 }
    ],
    total: 46.95,
    status: 'preparing',
    orderTime: '2024-07-04T14:30:00Z',
    estimatedDelivery: '2024-07-04T15:15:00Z',
    paymentMethod: 'Credit Card',
    orderType: 'delivery'
  },
  {
    id: '#ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, City, State 12345'
    },
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
      { name: 'Caesar Salad', quantity: 1, price: 12.99 }
    ],
    total: 31.98,
    status: 'ready',
    orderTime: '2024-07-04T14:15:00Z',
    estimatedDelivery: '2024-07-04T15:00:00Z',
    paymentMethod: 'PayPal',
    orderType: 'pickup'
  },
  {
    id: '#ORD-003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd, City, State 12345'
    },
    items: [
      { name: 'BBQ Ribs', quantity: 1, price: 24.99 },
      { name: 'Coleslaw', quantity: 1, price: 6.99 },
      { name: 'Cornbread', quantity: 2, price: 4.99 }
    ],
    total: 41.96,
    status: 'delivered',
    orderTime: '2024-07-04T13:45:00Z',
    estimatedDelivery: '2024-07-04T14:30:00Z',
    paymentMethod: 'Cash',
    orderType: 'delivery'
  },
  {
    id: '#ORD-004',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 321-0987',
      address: '321 Elm St, City, State 12345'
    },
    items: [
      { name: 'Vegetarian Wrap', quantity: 1, price: 11.99 },
      { name: 'Sweet Potato Fries', quantity: 1, price: 7.99 },
      { name: 'Fresh Juice', quantity: 1, price: 4.99 }
    ],
    total: 24.97,
    status: 'cancelled',
    orderTime: '2024-07-04T13:30:00Z',
    estimatedDelivery: '2024-07-04T14:15:00Z',
    paymentMethod: 'Credit Card',
    orderType: 'delivery'
  }
];

const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    preparing: { color: 'bg-orange-500', text: 'Preparing', icon: Clock },
    ready: { color: 'bg-green-500', text: 'Ready', icon: CheckCircle },
    delivered: { color: 'bg-blue-500', text: 'Delivered', icon: CheckCircle },
    cancelled: { color: 'bg-red-500', text: 'Cancelled', icon: XCircle }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.preparing;
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} text-white font-medium flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {config.text}
    </Badge>
  );
};

const OrderCard = ({ order, index }: { order: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-red-900/30 shadow-2xl hover:shadow-red-500/10 transition-all duration-300 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-white">{order.id}</CardTitle>
                <p className="text-sm text-gray-400">{order.customer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <OrderStatusBadge status={order.status} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-red-900/20">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700">
                  <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Customer
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-gray-300">
                {new Date(order.orderTime).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-white font-semibold">
                ${order.total.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-gray-300 capitalize">
                {order.orderType}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isExpanded ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Customer Info</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>{order.customer.email}</p>
                    <p>{order.customer.phone}</p>
                    <p>{order.customer.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            className="w-full mt-4 text-orange-400 hover:bg-red-900/20"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter]);

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
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:bg-red-900/20 hover:text-red-300"
                onClick={() => window.location.href = '/dashboard2'}
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" className="text-white hover:bg-red-900/20 hover:text-red-300">
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
              <Button variant="ghost" className="text-gray-400 hover:bg-red-900/20 hover:text-red-300">
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
                    <p className="text-xs leading-none text-gray-400">chef@gazelle.com</p>
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Orders Management
          </h1>
          <p className="text-gray-400 text-lg">
            Track and manage all your restaurant orders
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search orders by ID, customer name, or email..." 
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-red-900/30 text-white hover:bg-red-900/20">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('all')}
                >
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('preparing')}
                >
                  Preparing
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('ready')}
                >
                  Ready
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('delivered')}
                >
                  Delivered
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('cancelled')}
                >
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {filteredOrders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Orders Found</h3>
            <p className="text-gray-400">No orders match your current filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
