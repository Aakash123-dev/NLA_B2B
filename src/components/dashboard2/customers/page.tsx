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
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  DollarSign,
  ShoppingCart,
  Eye,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Package,
  User,
  Home,
  Flame,
  Bell,
  Settings,
  LogOut,
  Users,
  BarChart3,
  Heart,
  MessageSquare,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';

// Sample customer data
const customers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-15',
    lastOrder: '2024-07-04',
    totalOrders: 24,
    totalSpent: 486.50,
    avgOrderValue: 20.27,
    status: 'VIP',
    rating: 4.8,
    tags: ['VIP', 'Regular', 'Local'],
    favoriteItems: ['Spicy Chicken Burger', 'Truffle Fries', 'Chocolate Cake'],
    preferences: {
      deliveryTime: 'Evening',
      paymentMethod: 'Credit Card',
      cuisine: 'American'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, City, State 12345',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-02-20',
    lastOrder: '2024-07-03',
    totalOrders: 18,
    totalSpent: 324.75,
    avgOrderValue: 18.04,
    status: 'Regular',
    rating: 4.6,
    tags: ['Regular', 'Healthy Options'],
    favoriteItems: ['Caesar Salad', 'Grilled Chicken', 'Fresh Juice'],
    preferences: {
      deliveryTime: 'Lunch',
      paymentMethod: 'PayPal',
      cuisine: 'Healthy'
    }
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine Rd, City, State 12345',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-03-10',
    lastOrder: '2024-07-02',
    totalOrders: 12,
    totalSpent: 298.40,
    avgOrderValue: 24.87,
    status: 'Regular',
    rating: 4.4,
    tags: ['BBQ Lover', 'Weekend Orders'],
    favoriteItems: ['BBQ Ribs', 'Pulled Pork', 'Cornbread'],
    preferences: {
      deliveryTime: 'Weekend',
      paymentMethod: 'Cash',
      cuisine: 'BBQ'
    }
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 321-0987',
    address: '321 Elm St, City, State 12345',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-04-05',
    lastOrder: '2024-06-28',
    totalOrders: 8,
    totalSpent: 156.20,
    avgOrderValue: 19.53,
    status: 'New',
    rating: 4.2,
    tags: ['New Customer', 'Vegetarian'],
    favoriteItems: ['Vegetarian Wrap', 'Quinoa Salad', 'Smoothie'],
    preferences: {
      deliveryTime: 'Morning',
      paymentMethod: 'Credit Card',
      cuisine: 'Vegetarian'
    }
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 654-3210',
    address: '654 Maple Dr, City, State 12345',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-05-12',
    lastOrder: '2024-06-15',
    totalOrders: 3,
    totalSpent: 87.50,
    avgOrderValue: 29.17,
    status: 'Inactive',
    rating: 4.0,
    tags: ['Inactive', 'Pizza Lover'],
    favoriteItems: ['Margherita Pizza', 'Pepperoni Pizza'],
    preferences: {
      deliveryTime: 'Evening',
      paymentMethod: 'Credit Card',
      cuisine: 'Italian'
    }
  }
];

const CustomerCard = ({ customer, index }: { customer: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Regular': return 'bg-green-500';
      case 'New': return 'bg-blue-500';
      case 'Inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

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
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                    {customer.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(customer.status)} border-2 border-gray-800`} />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-white">{customer.name}</CardTitle>
                <p className="text-sm text-gray-400">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(customer.status)} text-white`}>
                {customer.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-red-900/20">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700">
                  <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Customer
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-red-900/20">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Orders</p>
                <p className="text-lg font-semibold text-white">{customer.totalOrders}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Total Spent</p>
                <p className="text-lg font-semibold text-white">${customer.totalSpent}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-orange-400 fill-current" />
              <div>
                <p className="text-sm text-gray-400">Rating</p>
                <p className="text-lg font-semibold text-white">{customer.rating}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Last Order</p>
                <p className="text-sm font-semibold text-white">
                  {new Date(customer.lastOrder).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {customer.tags.map((tag: string, tagIndex: number) => (
              <Badge key={tagIndex} variant="outline" className="border-orange-500/30 text-orange-400">
                {tag}
              </Badge>
            ))}
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
                  <h4 className="text-sm font-semibold text-white mb-2">Contact Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-3 w-3" />
                      {customer.address}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Favorite Items</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    {customer.favoriteItems.map((item: string, idx: number) => (
                      <p key={idx}>• {item}</p>
                    ))}
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

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
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
              <Button variant="ghost" className="text-white hover:bg-red-900/20 hover:text-red-300">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Customer Management
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your valued customers and their preferences
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </motion.div>
          </div>
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
                placeholder="Search customers by name, email, or phone..." 
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-red-900/30 text-white hover:bg-red-900/20">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('All')}
                >
                  All Customers
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('VIP')}
                >
                  VIP
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('Regular')}
                >
                  Regular
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('New')}
                >
                  New
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 hover:bg-red-900/20"
                  onClick={() => setStatusFilter('Inactive')}
                >
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Customer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredCustomers.map((customer, index) => (
              <CustomerCard key={customer.id} customer={customer} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredCustomers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Customers Found</h3>
            <p className="text-gray-400">No customers match your current filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
