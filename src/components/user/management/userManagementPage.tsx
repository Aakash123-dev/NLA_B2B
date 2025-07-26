'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Crown,
  Briefcase,
  TrendingUp,
  Shield,
  ChevronUp,
  ChevronDown,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  RefreshCw,
  Monitor,
  MoreVertical
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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
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

export default function UserManagementPage() {
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

  // Sample data
  const initialUsers: User[] = [
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
  ];

  // Initialize users state
  useEffect(() => {
    setUsers(initialUsers);
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initialUsers is a static array defined in component

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

    const newUserData: User = {
      id: `${Date.now()}`,
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

  const confirmDeleteUser = () => {
    if (currentUser) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== currentUser.id));
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      setShowDeleteDialog(false);
      setCurrentUser(null);
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === 'Active' ? 'Inactive' : 'Active';
    
    toast({
      title: "Success",
      description: `User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'Inactive':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">
            <Clock className="w-3 h-3 mr-1" />
            Unknown
          </Badge>
        );
    }
  };

  const getSubscriptionBadge = (subscription: User['subscription']) => {
    const isExpiring = new Date(subscription.validUntil) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const planColors = {
      Basic: 'bg-blue-100 text-blue-800 border-blue-200',
      Pro: 'bg-purple-100 text-purple-800 border-purple-200',
      Enterprise: 'bg-orange-100 text-orange-800 border-orange-200'
    };

    return (
      <div className="flex flex-col gap-1">
        <Badge className={`${planColors[subscription.plan]} transition-colors duration-200`}>
          {subscription.plan}
        </Badge>
        {isExpiring && (
          <Badge className="bg-red-100 text-red-800 text-xs border-red-200">
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
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 text-xs whitespace-nowrap">
            <Crown className="w-3 h-3 mr-1" />
            CXO
          </Badge>
        );
      case 'Brand Manager':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs whitespace-nowrap">
            <Briefcase className="w-3 h-3 mr-1" />
            Brand Mgr
          </Badge>
        );
      case 'Sales Manager':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 text-xs whitespace-nowrap">
            <TrendingUp className="w-3 h-3 mr-1" />
            Sales Mgr
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200 text-xs whitespace-nowrap">
            {role}
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
          <p className="text-gray-600">Loading user management...</p>
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
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                      User Management
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage users, permissions, and access control</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setShowAddUserDrawer(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add User
                  </Button>
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
                  <p className="text-sm font-medium text-blue-700 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-blue-900">{users.length}</p>
                  <p className="text-xs text-blue-600 mt-1">All registered users</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-emerald-900">{users.filter(u => u.status === 'Active').length}</p>
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
                  <p className="text-3xl font-bold text-amber-900">{users.filter(u => u.subscription.plan === 'Enterprise').length}</p>
                  <p className="text-xs text-amber-600 mt-1">Premium subscribers</p>
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
                  <p className="text-sm font-medium text-purple-700 mb-1">CXO</p>
                  <p className="text-3xl font-bold text-purple-900">{users.filter(u => u.role === 'CXO').length}</p>
                  <p className="text-xs text-purple-600 mt-1">Executive access</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
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
        >
          <Card className="bg-white/60 backdrop-blur-md border-white/20 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50/50 to-gray-50/50 border-b border-white/20 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  Search & Filter
                </CardTitle>
                <Badge variant="outline" className="text-xs bg-white/50">
                  {filteredUsers.length} of {users.length} users
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2 relative group">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    placeholder="Search users, emails, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-blue-500 rounded-xl transition-all duration-300"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-emerald-500 rounded-xl transition-all duration-300">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-purple-500 rounded-xl transition-all duration-300">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="CXO">CXO</SelectItem>
                    <SelectItem value="Brand Manager">Brand Manager</SelectItem>
                    <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                  <SelectTrigger className="border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-orange-500 rounded-xl transition-all duration-300">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  className="border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300 rounded-xl"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setRoleFilter('all');
                    setSubscriptionFilter('all');
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Table Header */}
                  <div className="bg-gradient-to-r from-slate-50/80 via-blue-50/80 to-indigo-50/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6">
                    <div className="grid grid-cols-12 gap-8 items-center">
                      <div className="col-span-3">
                        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors group" onClick={() => handleSort('name')}>
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50 group-hover:border-blue-300 transition-all">
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
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Contact Info</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Status & Role</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <Crown className="w-4 h-4 text-amber-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Subscription</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm border border-gray-200/50">
                            <Calendar className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">Last Login</span>
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
                      {sortedUsers.map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-8 py-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-300 group"
                        >
                          <div className="grid grid-cols-12 gap-8 items-center">
                            {/* User & Company */}
                            <div className="col-span-3">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center">
                                    {user.companyLogo ? (
                                      <Image src={user.companyLogo} alt="Company" width={12} height={12} className="rounded-full" />
                                    ) : (
                                      <Building className="w-2 h-2 text-gray-400" />
                                    )}
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                    {user.name}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">{user.companyName}</p>
                                  <p className="text-xs text-gray-400 truncate">{user.department}</p>
                                </div>
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div className="col-span-2">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-900 truncate">{user.email}</p>
                                <p className="text-sm text-gray-500 truncate">{user.phone}</p>
                                <p className="text-xs text-gray-400 truncate">{user.location}</p>
                              </div>
                            </div>

                            {/* Status & Role */}
                            <div className="col-span-2">
                              <div className="space-y-2">
                                {getStatusBadge(user.status)}
                                {getRoleBadge(user.role)}
                              </div>
                            </div>

                            {/* Subscription */}
                            <div className="col-span-2">
                              {getSubscriptionBadge(user.subscription)}
                            </div>

                            {/* Last Login */}
                            <div className="col-span-2">
                              <div className="text-sm text-gray-600">
                                {formatDate(user.lastLogin)}
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
                                  <DropdownMenuItem onClick={() => handleViewUser(user)} className="hover:bg-blue-50">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditUser(user)} className="hover:bg-blue-50">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleStatus(user.id)} className="hover:bg-yellow-50">
                                    <Monitor className="w-4 h-4 mr-2" />
                                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="hover:bg-red-50 text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
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

      {/* Add User Drawer */}
      <Sheet open={showAddUserDrawer} onOpenChange={setShowAddUserDrawer}>
        <SheetContent className="w-[600px] sm:max-w-[600px] bg-white/95 backdrop-blur-md border-l border-gray-200/50">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Add New User
            </SheetTitle>
            <SheetDescription>
              Create a new user account with appropriate permissions and access levels.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={newUser.companyName}
                  onChange={(e) => setNewUser({ ...newUser, companyName: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newUser.location}
                  onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as any })}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-xl">
                    <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                    <SelectItem value="Brand Manager">Brand Manager</SelectItem>
                    <SelectItem value="CXO">CXO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Subscription Plan</Label>
                <Select value={newUser.subscription.plan} onValueChange={(value) => setNewUser({ ...newUser, subscription: { ...newUser.subscription, plan: value as any } })}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-xl">
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Database Access</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="db1"
                    checked={newUser.dbAccess.db1}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, dbAccess: { ...newUser.dbAccess, db1: checked as boolean } })}
                  />
                  <Label htmlFor="db1" className="text-sm">Database 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="db2"
                    checked={newUser.dbAccess.db2}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, dbAccess: { ...newUser.dbAccess, db2: checked as boolean } })}
                  />
                  <Label htmlFor="db2" className="text-sm">Database 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="db3"
                    checked={newUser.dbAccess.db3}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, dbAccess: { ...newUser.dbAccess, db3: checked as boolean } })}
                  />
                  <Label htmlFor="db3" className="text-sm">Database 3</Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleAddUser}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
              >
                Add User
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddUserDrawer(false)}
                className="flex-1 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Delete User Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete <span className="font-semibold">{currentUser?.name}</span>? 
              This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-2 border-gray-200 hover:bg-gray-50 rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteUser}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View User Drawer */}
      <Sheet open={showViewUserDrawer} onOpenChange={setShowViewUserDrawer}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-md">
          {currentUser && (
            <>
              <SheetHeader className="pb-6 border-b border-gray-200/50">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-4 border-white shadow-xl">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-2xl font-bold text-gray-900 mb-1">
                      {currentUser.name}
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 text-base">
                      {currentUser.role} at {currentUser.companyName}
                    </SheetDescription>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(currentUser.status)}
                      {getRoleBadge(currentUser.role)}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-8 py-6">
                {/* Personal Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                        <p className="text-gray-900 font-medium">{currentUser.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-900">{currentUser.email}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-900">{currentUser.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Department</Label>
                        <p className="text-gray-900">{currentUser.department || 'Not specified'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Location</Label>
                        <p className="text-gray-900">{currentUser.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Last Login</Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-900">{formatDate(currentUser.lastLogin)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Company Name</Label>
                        <p className="text-gray-900 font-medium">{currentUser.companyName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Role</Label>
                        <p className="text-gray-900">{currentUser.role}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Address</Label>
                        <p className="text-gray-900">{currentUser.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Crown className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Subscription Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Plan</Label>
                      {getSubscriptionBadge(currentUser.subscription)}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Status</Label>
                      <Badge className={
                        currentUser.subscription.status === 'Active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      }>
                        {currentUser.subscription.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Valid Until</Label>
                      <p className="text-gray-900">{formatDate(currentUser.subscription.validUntil)}</p>
                    </div>
                  </div>
                </div>

                {/* Database Access Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Monitor className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Database Access</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">Database 1</span>
                      <Badge className={currentUser.dbAccess.db1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {currentUser.dbAccess.db1 ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">Database 2</span>
                      <Badge className={currentUser.dbAccess.db2 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {currentUser.dbAccess.db2 ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">Database 3</span>
                      <Badge className={currentUser.dbAccess.db3 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {currentUser.dbAccess.db3 ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Account Timestamps Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Clock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Account History</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Created Date</Label>
                      <p className="text-gray-900">{formatDate(currentUser.createdDate)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Last Modified</Label>
                      <p className="text-gray-900">{formatDate(currentUser.modifiedDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200/50">
                <Button 
                  onClick={() => {
                    setShowViewUserDrawer(false);
                    handleEditUser(currentUser);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit User
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowViewUserDrawer(false)}
                  className="flex-1 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit User Drawer */}
      <Sheet open={showEditUserDrawer} onOpenChange={setShowEditUserDrawer}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-md">
          {editingUser && (
            <>
              <SheetHeader className="pb-6 border-b border-gray-200/50">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-4 border-white shadow-xl">
                    <AvatarImage src={editingUser.avatar} alt={editingUser.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
                      {editingUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-2xl font-bold text-gray-900 mb-1">
                      Edit User: {editingUser.name}
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 text-base">
                      Update user information and permissions
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-8 py-6">
                {/* Personal Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="editName">Full Name *</Label>
                        <Input
                          id="editName"
                          value={editingUser.name}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="editEmail">Email Address *</Label>
                        <Input
                          id="editEmail"
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="editPhone">Phone Number</Label>
                        <Input
                          id="editPhone"
                          value={editingUser.phone}
                          onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="editDepartment">Department</Label>
                        <Input
                          id="editDepartment"
                          value={editingUser.department || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="editLocation">Location</Label>
                        <Input
                          id="editLocation"
                          value={editingUser.location || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, location: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="editRole">Role</Label>
                        <Select 
                          value={editingUser.role} 
                          onValueChange={(value) => setEditingUser({ ...editingUser, role: value as any })}
                        >
                          <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200 shadow-xl">
                            <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                            <SelectItem value="Brand Manager">Brand Manager</SelectItem>
                            <SelectItem value="CXO">CXO</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="editCompanyName">Company Name *</Label>
                      <Input
                        id="editCompanyName"
                        value={editingUser.companyName}
                        onChange={(e) => setEditingUser({ ...editingUser, companyName: e.target.value })}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editAddress">Address</Label>
                      <Input
                        id="editAddress"
                        value={editingUser.address}
                        onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Subscription Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Crown className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Subscription Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="editPlan">Subscription Plan</Label>
                      <Select 
                        value={editingUser.subscription.plan} 
                        onValueChange={(value) => setEditingUser({ 
                          ...editingUser, 
                          subscription: { ...editingUser.subscription, plan: value as any }
                        })}
                      >
                        <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-xl">
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Pro">Pro</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editSubscriptionStatus">Subscription Status</Label>
                      <Select 
                        value={editingUser.subscription.status} 
                        onValueChange={(value) => setEditingUser({ 
                          ...editingUser, 
                          subscription: { ...editingUser.subscription, status: value as any }
                        })}
                      >
                        <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 shadow-xl">
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="editValidUntil">Valid Until</Label>
                      <Input
                        id="editValidUntil"
                        type="date"
                        value={editingUser.subscription.validUntil}
                        onChange={(e) => setEditingUser({ 
                          ...editingUser, 
                          subscription: { ...editingUser.subscription, validUntil: e.target.value }
                        })}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Database Access Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Monitor className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Database Access</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="editDb1"
                        checked={editingUser.dbAccess.db1}
                        onCheckedChange={(checked) => setEditingUser({
                          ...editingUser,
                          dbAccess: { ...editingUser.dbAccess, db1: checked as boolean }
                        })}
                      />
                      <Label htmlFor="editDb1" className="text-sm font-medium">Database 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="editDb2"
                        checked={editingUser.dbAccess.db2}
                        onCheckedChange={(checked) => setEditingUser({
                          ...editingUser,
                          dbAccess: { ...editingUser.dbAccess, db2: checked as boolean }
                        })}
                      />
                      <Label htmlFor="editDb2" className="text-sm font-medium">Database 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="editDb3"
                        checked={editingUser.dbAccess.db3}
                        onCheckedChange={(checked) => setEditingUser({
                          ...editingUser,
                          dbAccess: { ...editingUser.dbAccess, db3: checked as boolean }
                        })}
                      />
                      <Label htmlFor="editDb3" className="text-sm font-medium">Database 3</Label>
                    </div>
                  </div>
                </div>

                {/* Status Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <Label htmlFor="editStatus" className="font-medium text-gray-700">
                      User Status: 
                    </Label>
                    <Select 
                      value={editingUser.status} 
                      onValueChange={(value) => setEditingUser({ ...editingUser, status: value as any })}
                    >
                      <SelectTrigger className="w-40 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 shadow-xl">
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200/50">
                <Button 
                  onClick={() => {
                    if (editingUser) {
                      // Update the user in the users array
                      setUsers(prevUsers => 
                        prevUsers.map(user => 
                          user.id === editingUser.id 
                            ? { ...editingUser, modifiedDate: new Date().toISOString().split('T')[0] }
                            : user
                        )
                      );
                      
                      toast({
                        title: "Success",
                        description: "User updated successfully",
                      });
                      setShowEditUserDrawer(false);
                      setEditingUser(null);
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEditUserDrawer(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}