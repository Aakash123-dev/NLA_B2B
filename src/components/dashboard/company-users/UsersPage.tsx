'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Settings,
  Building,
  Phone,
  MapPin,
  Calendar,
  Database,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Crown,
  Briefcase,
  TrendingUp,
  UserPlus,
  MoreVertical,
  ExternalLink,
  Lock,
  Unlock,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Key,
  Mail,
  User,
  Activity,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Star,
  Copy,
  RefreshCw
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  companyName: string;
  address: string;
  subscription: {
    plan: 'Basic' | 'Pro' | 'Enterprise';
    status: 'Active' | 'Inactive' | 'Cancelled';
    validUntil: string;
  };
  dbAccess: {
    db1: boolean;
    db2: boolean;
    db3: boolean;
  };
  createdDate: string;
  modifiedDate: string;
  companyLogo?: string;
  status: 'Active' | 'Inactive';
  role: 'CXO' | 'Brand Manager' | 'Sales Manager';
  avatar?: string;
  lastLogin: string;
  permissions: string[];
  department?: string;
  location?: string;
}

export default function UsersPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [showAddUserDrawer, setShowAddUserDrawer] = useState(false);
  const [showEditUserDrawer, setShowEditUserDrawer] = useState(false);
  const [showViewUserDrawer, setShowViewUserDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    address: '',
    subscription: {
      plan: 'Basic' as 'Basic' | 'Pro' | 'Enterprise',
      status: 'Active' as 'Active' | 'Inactive' | 'Cancelled',
      validUntil: ''
    },
    dbAccess: {
      db1: false,
      db2: false,
      db3: false
    },
    companyLogo: '',
    status: 'Active' as 'Active' | 'Inactive',
    role: 'Sales Manager' as 'CXO' | 'Brand Manager' | 'Sales Manager',
    department: '',
    location: ''
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const { toast } = useToast();

  // Sample data for the B2B user management system
  const initialUsers: User[] = useMemo(() => [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      companyName: 'NLA',
      address: '123 Business Ave, San Francisco, CA 94105',
      subscription: {
        plan: 'Enterprise',
        status: 'Active',
        validUntil: '2024-12-31'
      },
      dbAccess: {
        db1: true,
        db2: true,
        db3: true
      },
      createdDate: '2024-01-15',
      modifiedDate: '2024-07-01',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop&crop=entropy',
      status: 'Active',
      role: 'CXO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-07-01',
      permissions: ['full_access', 'user_management', 'billing', 'settings'],
      department: 'IT',
      location: 'San Francisco'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@innovate.com',
      phone: '+1 (555) 234-5678',
      companyName: 'NLA',
      address: '456 Innovation Blvd, Austin, TX 78701',
      subscription: {
        plan: 'Pro',
        status: 'Active',
        validUntil: '2024-10-15'
      },
      dbAccess: {
        db1: true,
        db2: true,
        db3: false
      },
      createdDate: '2024-02-20',
      modifiedDate: '2024-06-30',
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=40&h=40&fit=crop&crop=entropy',
      status: 'Active',
      role: 'Brand Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a2d5ef?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-06-30',
      permissions: ['user_management', 'analytics', 'reporting'],
      department: 'Marketing',
      location: 'Austin'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.chen@startup.io',
      phone: '+1 (555) 345-6789',
      companyName: 'NLA',
      address: '789 Startup St, Seattle, WA 98101',
      subscription: {
        plan: 'Basic',
        status: 'Active',
        validUntil: '2024-08-20'
      },
      dbAccess: {
        db1: true,
        db2: false,
        db3: false
      },
      createdDate: '2024-03-10',
      modifiedDate: '2024-06-28',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=40&h=40&fit=crop&crop=entropy',
      status: 'Active',
      role: 'Sales Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-06-28',
      permissions: ['basic_access'],
      department: 'Development',
      location: 'Seattle'
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@enterprise.com',
      phone: '+1 (555) 456-7890',
      companyName: 'NLA',
      address: '321 Enterprise Way, New York, NY 10001',
      subscription: {
        plan: 'Enterprise',
        status: 'Inactive',
        validUntil: '2024-07-15'
      },
      dbAccess: {
        db1: false,
        db2: false,
        db3: false
      },
      createdDate: '2024-01-05',
      modifiedDate: '2024-07-15',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=entropy',
      status: 'Inactive',
      role: 'Brand Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-07-10',
      permissions: ['user_management', 'analytics'],
      department: 'Operations',
      location: 'New York'
    },
    {
      id: '5',
      name: 'David Kim',
      email: 'david.kim@growth.co',
      phone: '+1 (555) 567-8901',
      companyName: 'NLA',
      address: '654 Growth Ave, Los Angeles, CA 90210',
      subscription: {
        plan: 'Pro',
        status: 'Active',
        validUntil: '2024-11-30'
      },
      dbAccess: {
        db1: true,
        db2: true,
        db3: false
      },
      createdDate: '2024-04-01',
      modifiedDate: '2024-06-25',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=40&h=40&fit=crop&crop=entropy',
      status: 'Active',
      role: 'Sales Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-06-25',
      permissions: ['basic_access', 'reporting'],
      department: 'Sales',
      location: 'Los Angeles'
    }
  ], []);

  // Initialize users state
  useEffect(() => {
    setUsers(initialUsers);
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initialUsers is memoized and stable

  const formatDate = (dateString: string): string => {
    if (!dateString || dateString === 'Never') return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesSubscription = subscriptionFilter === 'all' || user.subscription.plan === subscriptionFilter;
    return matchesSearch && matchesStatus && matchesRole && matchesSubscription;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortField as keyof User];
    let bValue = b[sortField as keyof User];

    // Handle undefined values
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

  const handleAddUser = () => {
    // Validate required fields
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.companyName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Create new user object
    const newUserData: User = {
      id: `${Date.now()}`, // Simple ID generation
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      companyName: newUser.companyName,
      address: newUser.address,
      subscription: newUser.subscription,
      dbAccess: newUser.dbAccess,
      createdDate: new Date().toISOString().split('T')[0],
      modifiedDate: new Date().toISOString().split('T')[0],
      status: newUser.status,
      role: newUser.role,
      lastLogin: 'Never',
      permissions: newUser.role === 'CXO' ? ['full_access', 'user_management', 'billing', 'settings'] : 
                  newUser.role === 'Brand Manager' ? ['user_management', 'analytics', 'reporting'] : ['basic_access'],
      department: newUser.department,
      location: newUser.location
    };

    // Add user to state
    setUsers(prevUsers => [...prevUsers, newUserData]);
    
    toast({
      title: "Success",
      description: "User added successfully",
    });
    setShowAddUserDrawer(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      address: '',
      subscription: {
        plan: 'Basic',
        status: 'Active',
        validUntil: ''
      },
      dbAccess: {
        db1: false,
        db2: false,
        db3: false
      },
      companyLogo: '',
      status: 'Active',
      role: 'Sales Manager',
      department: '',
      location: ''
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditUserDrawer(true);
  };

  const handleViewUser = (user: User) => {
    setCurrentUser(user);
    setShowViewUserDrawer(true);
  };

  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setShowDeleteDialog(true);
  };

  const handleViewDashboard = (user: User) => {
    // Navigate to user's dashboard
    window.open(`/dashboard?user=${user.id}`, '_blank');
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
    
    // Update currentUser if it's the one being toggled
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, status: prev.status === 'Active' ? 'Inactive' : 'Active' } : null);
    }
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === 'Active' ? 'Inactive' : 'Active';
    
    toast({
      title: "Success",
      description: `User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`,
    });
  };

  const handleSubscriptionChange = (userId: string, newPlan: string) => {
    // Update subscription logic here
    toast({
      title: "Success",
      description: `Subscription updated to ${newPlan}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900"><Clock className="w-3 h-3 mr-1" />Unknown</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: User['subscription']) => {
    const isExpiring = new Date(subscription.validUntil) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const planColors = {
      Basic: 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900',
      Pro: 'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900',
      Enterprise: 'bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900'
    };

    return (
      <div className="flex flex-col gap-1">
        <Badge className={`${planColors[subscription.plan]} transition-colors duration-200`}>
          {subscription.plan}
        </Badge>
        {isExpiring && (
          <Badge className="bg-red-100 text-red-800 text-xs hover:bg-red-200 hover:text-red-900 transition-colors duration-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expiring Soon
          </Badge>
        )}
      </div>
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'CXO':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900 text-xs whitespace-nowrap"><Crown className="w-3 h-3 mr-1" />CXO</Badge>;
      case 'Brand Manager':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 text-xs whitespace-nowrap"><Briefcase className="w-3 h-3 mr-1" />Brand Mgr</Badge>;
      case 'Sales Manager':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 text-xs whitespace-nowrap"><TrendingUp className="w-3 h-3 mr-1" />Sales Mgr</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 text-xs whitespace-nowrap">{role}</Badge>;
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                      NORTHLIGHT ANALYTIC PARTNERS
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage your B2B users, subscriptions, and database access</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setShowAddUserDrawer(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Add User
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
          {/* Total Users */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-blue-900">{users.length}</p>
                  <p className="text-xs text-blue-600 mt-1">+12% from last month</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Users */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-emerald-900">{users.filter(u => u.status === 'Active').length}</p>
                  <p className="text-xs text-emerald-600 mt-1">+8% from last week</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Plans */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700 mb-1">Enterprise Plans</p>
                  <p className="text-3xl font-bold text-amber-900">{users.filter(u => u.subscription.plan === 'Enterprise').length}</p>
                  <p className="text-xs text-amber-600 mt-1">Premium subscribers</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Super Admins */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-600/10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-4 translate-x-4"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 mb-1">CXO</p>
                  <p className="text-3xl font-bold text-red-900">{users.filter(u => u.role === 'CXO').length}</p>
                  <p className="text-xs text-red-600 mt-1">Full access granted</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Filter Panel */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
                  <Search className="w-4 h-4 text-white" />
                </div>
                Search & Filter
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {filteredUsers.length} of {users.length} users
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Enhanced Search */}
              <div className="lg:col-span-2 relative group">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Search users, emails, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-emerald-100 rounded-md">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      </div>
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role Filter */}
              <div className="relative">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-purple-100 rounded-md">
                        <Shield className="w-3 h-3 text-purple-600" />
                      </div>
                      <SelectValue placeholder="Role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="CXO">CXO</SelectItem>
                    <SelectItem value="Brand Manager">Brand Manager</SelectItem>
                    <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subscription Filter */}
              <div className="relative">
                <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-orange-500 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-orange-500/20">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-orange-100 rounded-md">
                        <Crown className="w-3 h-3 text-orange-600" />
                      </div>
                      <SelectValue placeholder="Plan" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg">
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button 
                variant="outline" 
                className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-xl flex items-center gap-2"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setRoleFilter('all');
                  setSubscriptionFilter('all');
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modern Professional Users Table */}
        <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Enhanced Modern Header */}
                <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200/80 px-8 py-6">
                  <div className="grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors group" onClick={() => handleSort('name')}>
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 group-hover:border-blue-300 transition-all">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 text-sm">User & Company</span>
                          {sortField === 'name' && (
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
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">Contact Info</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">Subscription</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                          <Shield className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">Role</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">Status & Access</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="font-semibold text-gray-800 text-sm">Actions</span>
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                          <Settings className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced User Rows */}
                <div className="divide-y divide-gray-100/80">
                  {sortedUsers.map((user, index) => (
                    <div 
                      key={user.id} 
                      className={`
                        grid grid-cols-12 gap-8 px-8 py-6 
                        hover:bg-gradient-to-r hover:from-blue-50/40 hover:via-indigo-50/20 hover:to-purple-50/40 
                        transition-all duration-500 ease-in-out
                        group cursor-pointer
                        hover:shadow-lg hover:shadow-blue-100/50
                        relative
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                      `}
                    >
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/3 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
                      
                      {/* User & Company */}
                      <div className="col-span-3 flex items-center gap-4 min-w-0 relative z-10">
                        <div className="relative">
                          <Avatar className="w-12 h-12 ring-4 ring-white group-hover:ring-blue-200 transition-all duration-300 flex-shrink-0 shadow-md">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-base truncate group-hover:text-blue-900 transition-colors duration-300">{user.name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                            <Building className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium text-gray-600 truncate">{user.companyName}</span>
                            <span className="text-gray-400">•</span>
                            <span className="truncate">{user.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="col-span-2 flex flex-col justify-center min-w-0 relative z-10">
                        <div className="mb-2">
                          <div className="flex items-center gap-2 text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200 group-hover:border-blue-300 group-hover:bg-blue-50" title={user.email}>
                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="truncate">
                              {user.email.length > 18 ? `${user.email.substring(0, 18)}...` : user.email}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium truncate">{user.phone}</span>
                        </div>
                      </div>

                      {/* Subscription */}
                      <div className="col-span-2 flex flex-col justify-center min-w-0 relative z-10">
                        <div className="mb-2">
                          {getSubscriptionBadge(user.subscription)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate font-medium">Until {formatDate(user.subscription.validUntil)}</span>
                        </div>
                      </div>

                      {/* Role */}
                      <div className="col-span-1 flex items-center justify-center relative z-10">
                        <div className="text-center">
                          {getRoleBadge(user.role)}
                        </div>
                      </div>

                      {/* Status & Access */}
                      <div className="col-span-2 flex flex-col justify-center min-w-0 relative z-10">
                        <div className="mb-2">
                          {getStatusBadge(user.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="flex gap-1 flex-wrap">
                            {user.dbAccess.db1 && <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors">DB1</Badge>}
                            {user.dbAccess.db2 && <Badge variant="outline" className="text-xs px-2 py-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors">DB2</Badge>}
                            {user.dbAccess.db3 && <Badge variant="outline" className="text-xs px-2 py-1 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors">DB3</Badge>}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex items-center justify-end gap-3 relative z-10">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDashboard(user)}
                          className="h-9 px-4 text-sm font-medium border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-gray-100 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52 shadow-xl border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm">
                            <DropdownMenuLabel className="text-sm font-semibold text-gray-700 px-4 py-3">User Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewUser(user)} className="text-sm hover:bg-blue-50 rounded-lg mx-2 px-3 py-2">
                              <Eye className="mr-3 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditUser(user)} className="text-sm hover:bg-green-50 rounded-lg mx-2 px-3 py-2">
                              <Edit className="mr-3 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(user.id)} className="text-sm hover:bg-yellow-50 rounded-lg mx-2 px-3 py-2">
                              {user.status === 'Active' ? (
                                <>
                                  <Lock className="mr-3 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Unlock className="mr-3 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600 text-sm hover:bg-red-50 rounded-lg mx-2 px-3 py-2"
                            >
                              <Trash2 className="mr-3 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add User Drawer */}
        <Sheet open={showAddUserDrawer} onOpenChange={setShowAddUserDrawer}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>
                Create a new B2B user account with company details and access permissions.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as any })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CXO">CXO</SelectItem>
                        <SelectItem value="Brand Manager">Brand Manager</SelectItem>
                        <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={newUser.companyName}
                      onChange={(e) => setNewUser({ ...newUser, companyName: e.target.value })}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={newUser.address}
                      onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                      placeholder="Enter company address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={newUser.department}
                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                        placeholder="Enter department"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newUser.location}
                        onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subscription</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subscriptionPlan">Plan</Label>
                    <Select 
                      value={newUser.subscription.plan} 
                      onValueChange={(value) => setNewUser({ 
                        ...newUser, 
                        subscription: { ...newUser.subscription, plan: value as any } 
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={newUser.subscription.validUntil}
                      onChange={(e) => setNewUser({ 
                        ...newUser, 
                        subscription: { ...newUser.subscription, validUntil: e.target.value } 
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Database Access */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Database Access</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="db1"
                      checked={newUser.dbAccess.db1}
                      onCheckedChange={(checked) => setNewUser({
                        ...newUser,
                        dbAccess: { ...newUser.dbAccess, db1: checked as boolean }
                      })}
                    />
                    <Label htmlFor="db1" className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Database 1
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="db2"
                      checked={newUser.dbAccess.db2}
                      onCheckedChange={(checked) => setNewUser({
                        ...newUser,
                        dbAccess: { ...newUser.dbAccess, db2: checked as boolean }
                      })}
                    />
                    <Label htmlFor="db2" className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Database 2
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="db3"
                      checked={newUser.dbAccess.db3}
                      onCheckedChange={(checked) => setNewUser({
                        ...newUser,
                        dbAccess: { ...newUser.dbAccess, db3: checked as boolean }
                      })}
                    />
                    <Label htmlFor="db3" className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Database 3
                    </Label>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Status</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={newUser.status === 'Active'}
                    onCheckedChange={(checked) => setNewUser({
                      ...newUser,
                      status: checked ? 'Active' : 'Inactive'
                    })}
                  />
                  <Label htmlFor="status">
                    {newUser.status === 'Active' ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setShowAddUserDrawer(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>
                Create User
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Modern View User Drawer */}
        <Sheet open={showViewUserDrawer} onOpenChange={setShowViewUserDrawer}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white to-gray-50/30">
            {currentUser && (
              <>
                <SheetHeader className="pb-6 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                            {currentUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-sm flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <SheetTitle className="text-2xl font-bold text-gray-900">{currentUser.name}</SheetTitle>
                        <SheetDescription className="text-lg text-gray-600 mt-1">
                          {currentUser.email}
                        </SheetDescription>
                        <div className="flex items-center gap-3 mt-3">
                          {getRoleBadge(currentUser.role)}
                          {getStatusBadge(currentUser.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingUser(currentUser);
                          setShowViewUserDrawer(false);
                          setShowEditUserDrawer(true);
                        }}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (currentUser) {
                            handleToggleStatus(currentUser.id);
                            // Close the drawer after status change
                            setTimeout(() => setShowViewUserDrawer(false), 500);
                          }
                        }}
                        className={currentUser.status === 'Active' ? 'border-red-200 text-red-700 hover:bg-red-50' : 'border-green-200 text-green-700 hover:bg-green-50'}
                      >
                        {currentUser.status === 'Active' ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </SheetHeader>

                <div className="space-y-8 py-6">
                  {/* Company Information Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Company Information</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Company Name</Label>
                        <p className="text-lg font-semibold text-gray-900">{currentUser.companyName}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Phone</Label>
                        <p className="text-lg font-semibold text-gray-900">{currentUser.phone}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Department</Label>
                        <p className="text-lg font-semibold text-gray-900">{currentUser.department}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Location</Label>
                        <p className="text-lg font-semibold text-gray-900">{currentUser.location}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label className="text-sm font-medium text-gray-500">Address</Label>
                      <p className="text-lg font-semibold text-gray-900 bg-gray-50 p-3 rounded-lg">{currentUser.address}</p>
                    </div>
                  </div>

                  {/* Subscription Details Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <CreditCard className="w-5 h-5 text-orange-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Subscription Details</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Plan</Label>
                        <div className="flex items-center gap-2">
                          {getSubscriptionBadge(currentUser.subscription)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Status</Label>
                        <p className="text-lg font-semibold text-gray-900">{currentUser.subscription.status}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Valid Until</Label>
                        <p className="text-lg font-semibold text-gray-900">{formatDate(currentUser.subscription.validUntil)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Database Access Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Database className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Database Access</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {currentUser.dbAccess.db1 && (
                        <Badge variant="outline" className="text-sm px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
                          <Database className="w-4 h-4 mr-2" />
                          Database 1
                        </Badge>
                      )}
                      {currentUser.dbAccess.db2 && (
                        <Badge variant="outline" className="text-sm px-4 py-2 bg-green-50 text-green-700 border-green-200">
                          <Database className="w-4 h-4 mr-2" />
                          Database 2
                        </Badge>
                      )}
                      {currentUser.dbAccess.db3 && (
                        <Badge variant="outline" className="text-sm px-4 py-2 bg-purple-50 text-purple-700 border-purple-200">
                          <Database className="w-4 h-4 mr-2" />
                          Database 3
                        </Badge>
                      )}
                      {!currentUser.dbAccess.db1 && !currentUser.dbAccess.db2 && !currentUser.dbAccess.db3 && (
                        <div className="text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                          <XCircle className="w-4 h-4 mr-2 inline" />
                          No database access
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Activity Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Activity & Timeline</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Created Date</Label>
                        <p className="text-lg font-semibold text-gray-900">{formatDate(currentUser.createdDate)}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Last Modified</Label>
                        <p className="text-lg font-semibold text-gray-900">{formatDate(currentUser.modifiedDate)}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Last Login</Label>
                        <p className="text-lg font-semibold text-gray-900">{formatDate(currentUser.lastLogin)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>

        {/* Modern Edit User Drawer */}
        <Sheet open={showEditUserDrawer} onOpenChange={setShowEditUserDrawer}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white to-gray-50/30">
            {editingUser && (
              <>
                <SheetHeader className="pb-6 border-b border-gray-200/50">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                      <AvatarImage src={editingUser.avatar} alt={editingUser.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                        {editingUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <SheetTitle className="text-2xl font-bold text-gray-900">Edit User</SheetTitle>
                      <SheetDescription className="text-lg text-gray-600 mt-1">
                        Update information for {editingUser.name}
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                <div className="space-y-8 py-6">
                  {/* Basic Information Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Basic Information</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="editName" className="text-sm font-medium text-gray-700">Full Name *</Label>
                        <Input
                          id="editName"
                          value={editingUser.name}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editEmail" className="text-sm font-medium text-gray-700">Email *</Label>
                        <Input
                          id="editEmail"
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editPhone" className="text-sm font-medium text-gray-700">Phone</Label>
                        <Input
                          id="editPhone"
                          value={editingUser.phone}
                          onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editRole" className="text-sm font-medium text-gray-700">Role</Label>
                        <Select value={editingUser.role} onValueChange={(value) => setEditingUser({ ...editingUser, role: value as any })}>
                          <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CXO">CXO</SelectItem>
                            <SelectItem value="Brand Manager">Brand Manager</SelectItem>
                            <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Company Information Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Building className="w-5 h-5 text-orange-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Company Information</h4>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="editCompanyName" className="text-sm font-medium text-gray-700">Company Name *</Label>
                          <Input
                            id="editCompanyName"
                            value={editingUser.companyName}
                            onChange={(e) => setEditingUser({ ...editingUser, companyName: e.target.value })}
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                            placeholder="Enter company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editDepartment" className="text-sm font-medium text-gray-700">Department</Label>
                          <Input
                            id="editDepartment"
                            value={editingUser.department}
                            onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                            placeholder="Enter department"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editLocation" className="text-sm font-medium text-gray-700">Location</Label>
                          <Input
                            id="editLocation"
                            value={editingUser.location}
                            onChange={(e) => setEditingUser({ ...editingUser, location: e.target.value })}
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                            placeholder="Enter location"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editAddress" className="text-sm font-medium text-gray-700">Address</Label>
                        <Textarea
                          id="editAddress"
                          value={editingUser.address}
                          onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                          placeholder="Enter company address"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subscription Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Subscription</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="editSubscriptionPlan" className="text-sm font-medium text-gray-700">Plan</Label>
                        <Select 
                          value={editingUser.subscription.plan} 
                          onValueChange={(value) => setEditingUser({ 
                            ...editingUser, 
                            subscription: { ...editingUser.subscription, plan: value as any } 
                          })}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300">
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Pro">Pro</SelectItem>
                            <SelectItem value="Enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editSubscriptionStatus" className="text-sm font-medium text-gray-700">Status</Label>
                        <Select 
                          value={editingUser.subscription.status} 
                          onValueChange={(value) => setEditingUser({ 
                            ...editingUser, 
                            subscription: { ...editingUser.subscription, status: value as any } 
                          })}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editValidUntil" className="text-sm font-medium text-gray-700">Valid Until</Label>
                        <Input
                          id="editValidUntil"
                          type="date"
                          value={editingUser.subscription.validUntil}
                          onChange={(e) => setEditingUser({ 
                            ...editingUser, 
                            subscription: { ...editingUser.subscription, validUntil: e.target.value } 
                          })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Database Access Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Database className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Database Access</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <Checkbox
                          id="editDb1"
                          checked={editingUser.dbAccess.db1}
                          onCheckedChange={(checked) => setEditingUser({
                            ...editingUser,
                            dbAccess: { ...editingUser.dbAccess, db1: checked as boolean }
                          })}
                        />
                        <Label htmlFor="editDb1" className="flex items-center gap-2 text-sm font-medium text-blue-900">
                          <Database className="w-4 h-4" />
                          Database 1
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                        <Checkbox
                          id="editDb2"
                          checked={editingUser.dbAccess.db2}
                          onCheckedChange={(checked) => setEditingUser({
                            ...editingUser,
                            dbAccess: { ...editingUser.dbAccess, db2: checked as boolean }
                          })}
                        />
                        <Label htmlFor="editDb2" className="flex items-center gap-2 text-sm font-medium text-green-900">
                          <Database className="w-4 h-4" />
                          Database 2
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <Checkbox
                          id="editDb3"
                          checked={editingUser.dbAccess.db3}
                          onCheckedChange={(checked) => setEditingUser({
                            ...editingUser,
                            dbAccess: { ...editingUser.dbAccess, db3: checked as boolean }
                          })}
                        />
                        <Label htmlFor="editDb3" className="flex items-center gap-2 text-sm font-medium text-purple-900">
                          <Database className="w-4 h-4" />
                          Database 3
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Status Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Account Status</h4>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <Switch
                        id="editStatus"
                        checked={editingUser.status === 'Active'}
                        onCheckedChange={(checked) => setEditingUser({
                          ...editingUser,
                          status: checked ? 'Active' : 'Inactive'
                        })}
                      />
                      <Label htmlFor="editStatus" className="text-lg font-medium">
                        {editingUser.status === 'Active' ? (
                          <span className="text-green-700">Active User</span>
                        ) : (
                          <span className="text-red-700">Inactive User</span>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>

                <SheetFooter className="pt-6 border-t border-gray-200/50">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditUserDrawer(false)}
                    className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      if (editingUser) {
                        // Update user in state
                        setUsers(prevUsers => 
                          prevUsers.map(user => 
                            user.id === editingUser.id 
                              ? { ...editingUser, modifiedDate: new Date().toISOString().split('T')[0] }
                              : user
                          )
                        );
                        
                        // Update currentUser if it's the one being edited
                        if (currentUser && currentUser.id === editingUser.id) {
                          setCurrentUser({ ...editingUser, modifiedDate: new Date().toISOString().split('T')[0] });
                        }
                        
                        toast({
                          title: "Success",
                          description: "User updated successfully",
                        });
                        setShowEditUserDrawer(false);
                        setEditingUser(null);
                      }
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Save Changes
                  </Button>
                </SheetFooter>
              </>
            )}
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {currentUser?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (currentUser) {
                    // Remove user from state
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== currentUser.id));
                    
                    toast({
                      title: "Success",
                      description: "User deleted successfully",
                    });
                    setShowDeleteDialog(false);
                    setCurrentUser(null);
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
