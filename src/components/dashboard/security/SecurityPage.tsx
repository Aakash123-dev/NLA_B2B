'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  Fingerprint, 
  UserX,
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Ban,
  Unlock,
  Trash2,
  AlertCircle,
  Settings,
  Info,
  Save
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'account_locked' | 'suspicious_activity';
  user: string;
  email: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  status: 'success' | 'failed' | 'warning';
  details: string;
}

interface ActiveSession {
  id: string;
  user: string;
  email: string;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  loginTime: string;
  lastActivity: string;
  status: 'active' | 'idle' | 'expired';
}

export default function SecurityPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [showApiKey, setShowApiKey] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginNotifications: true,
    suspiciousActivityDetection: true,
    ipWhitelisting: false,
    sessionTimeout: 30,
    maxConcurrentSessions: 3,
    passwordComplexity: 'high',
    accountLockoutThreshold: 5,
    autoLogoutInactive: true,
    apiAccess: true,
    webhookSecurity: true,
    encryptionLevel: 'AES-256'
  });

  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login',
      user: 'John Smith',
      email: 'john.smith@northlight.com',
      timestamp: '2024-07-06 14:30:22',
      ipAddress: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'MacBook Pro',
      status: 'success',
      details: 'Successful login from trusted device'
    },
    {
      id: '2',
      type: 'failed_login',
      user: 'Unknown',
      email: 'admin@northlight.com',
      timestamp: '2024-07-06 13:45:11',
      ipAddress: '203.0.113.1',
      location: 'Unknown',
      device: 'Unknown Browser',
      status: 'failed',
      details: 'Failed login attempt - invalid credentials'
    },
    {
      id: '3',
      type: 'suspicious_activity',
      user: 'Sarah Johnson',
      email: 'sarah.johnson@northlight.com',
      timestamp: '2024-07-06 12:15:33',
      ipAddress: '198.51.100.25',
      location: 'Austin, TX',
      device: 'iPhone 15',
      status: 'warning',
      details: 'Login from new location detected'
    },
    {
      id: '4',
      type: 'password_change',
      user: 'Michael Chen',
      email: 'michael.chen@northlight.com',
      timestamp: '2024-07-06 11:20:44',
      ipAddress: '192.168.1.50',
      location: 'Seattle, WA',
      device: 'Windows 11',
      status: 'success',
      details: 'Password changed successfully'
    },
    {
      id: '5',
      type: 'account_locked',
      user: 'Emily Rodriguez',
      email: 'emily.rodriguez@northlight.com',
      timestamp: '2024-07-06 10:05:17',
      ipAddress: '10.0.0.15',
      location: 'New York, NY',
      device: 'Chrome Browser',
      status: 'warning',
      details: 'Account locked after 5 failed login attempts'
    }
  ]);

  const [activeSessions] = useState<ActiveSession[]>([
    {
      id: '1',
      user: 'John Smith',
      email: 'john.smith@northlight.com',
      ipAddress: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'MacBook Pro',
      browser: 'Chrome 91.0',
      loginTime: '2024-07-06 09:00:00',
      lastActivity: '2024-07-06 14:30:00',
      status: 'active'
    },
    {
      id: '2',
      user: 'Sarah Johnson',
      email: 'sarah.johnson@northlight.com',
      ipAddress: '198.51.100.25',
      location: 'Austin, TX',
      device: 'iPhone 15',
      browser: 'Safari 14.0',
      loginTime: '2024-07-06 08:30:00',
      lastActivity: '2024-07-06 13:45:00',
      status: 'idle'
    },
    {
      id: '3',
      user: 'Michael Chen',
      email: 'michael.chen@northlight.com',
      ipAddress: '192.168.1.50',
      location: 'Seattle, WA',
      device: 'Windows 11',
      browser: 'Edge 91.0',
      loginTime: '2024-07-06 07:15:00',
      lastActivity: '2024-07-06 14:00:00',
      status: 'active'
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.ipAddress.includes(searchTerm);
    const matchesFilter = eventFilter === 'all' || event.type === eventFilter;
    return matchesSearch && matchesFilter;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'logout': return <XCircle className="h-4 w-4 text-blue-600" />;
      case 'failed_login': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'password_change': return <Key className="h-4 w-4 text-purple-600" />;
      case 'account_locked': return <Lock className="h-4 w-4 text-orange-600" />;
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEventBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getSessionStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'idle': return <Badge className="bg-yellow-100 text-yellow-800">Idle</Badge>;
      case 'expired': return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleTerminateSession = (sessionId: string) => {
    toast({
      title: "Session Terminated",
      description: "The user session has been terminated successfully.",
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveSecuritySettings = () => {
    toast({
      title: "Settings Saved",
      description: "Security settings have been updated successfully.",
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-orange-600/5 rounded-3xl blur-xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 shadow-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Security Center
                    </h1>
                    <p className="text-slate-600 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Monitor and manage your platform security
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export Logs
                </Button>
                <Button 
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg rounded-xl px-6 py-3"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Security Scan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Security Score</p>
                  <p className="text-3xl font-bold text-green-900">94%</p>
                  <p className="text-xs text-green-600 mt-1">Excellent</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <Progress value={94} className="mt-4 h-2" />
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Active Sessions</p>
                  <p className="text-3xl font-bold text-blue-900">{activeSessions.length}</p>
                  <p className="text-xs text-blue-600 mt-1">Current users</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-600/10"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700 mb-1">Failed Logins</p>
                  <p className="text-3xl font-bold text-yellow-900">12</p>
                  <p className="text-xs text-yellow-600 mt-1">Last 24 hours</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">2FA Enabled</p>
                  <p className="text-3xl font-bold text-purple-900">87%</p>
                  <p className="text-xs text-purple-600 mt-1">of total users</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <Fingerprint className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full h-14 grid-cols-4 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <TabsTrigger value="overview" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Shield className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Activity className="h-4 w-4" />
              Security Events
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Monitor className="h-4 w-4" />
              Active Sessions
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Security Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Password Security */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50 rounded-t-3xl">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Key className="h-5 w-5 text-white" />
                    </div>
                    Password Security
                  </CardTitle>
                  <CardDescription>Update your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showApiKey ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl pr-10"
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-b border-green-100/50 rounded-t-3xl">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                      <Fingerprint className="h-5 w-5 text-white" />
                    </div>
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Secure your account with 2FA</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Enable 2FA</Label>
                      <p className="text-xs text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                    />
                  </div>

                  {securitySettings.twoFactorAuth && (
                    <Alert className="border-green-200 bg-green-50/50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Two-factor authentication is enabled. Your account is more secure.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full rounded-xl border-2">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Configure Authenticator App
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl border-2">
                      <Key className="w-4 h-4 mr-2" />
                      Generate Backup Codes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Security Events Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-orange-50/80 to-red-50/80 border-b border-orange-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  Recent Security Events
                </CardTitle>
                <CardDescription>Latest security activities and alerts</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {securityEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        {getEventIcon(event.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.details}</p>
                          <p className="text-xs text-gray-600">{event.user} • {event.timestamp}</p>
                        </div>
                      </div>
                      {getEventBadge(event.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Events */}
          <TabsContent value="events" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  Security Event Log
                </CardTitle>
                <CardDescription>Monitor all security-related activities</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search events, users, or IP addresses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <Select value={eventFilter} onValueChange={setEventFilter}>
                    <SelectTrigger className="w-48 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="logout">Logout</SelectItem>
                      <SelectItem value="failed_login">Failed Login</SelectItem>
                      <SelectItem value="password_change">Password Change</SelectItem>
                      <SelectItem value="account_locked">Account Locked</SelectItem>
                      <SelectItem value="suspicious_activity">Suspicious Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Events Table */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50/50">
                      <TableRow>
                        <TableHead className="font-semibold">Event</TableHead>
                        <TableHead className="font-semibold">User</TableHead>
                        <TableHead className="font-semibold">IP Address</TableHead>
                        <TableHead className="font-semibold">Location</TableHead>
                        <TableHead className="font-semibold">Time</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => (
                        <TableRow key={event.id} className="hover:bg-gray-50/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getEventIcon(event.type)}
                              <span className="text-sm font-medium">{event.details}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">{event.user}</p>
                              <p className="text-xs text-gray-600">{event.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm font-mono">{event.ipAddress}</TableCell>
                          <TableCell className="text-sm">{event.location}</TableCell>
                          <TableCell className="text-sm">{event.timestamp}</TableCell>
                          <TableCell>{getEventBadge(event.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Sessions */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-b border-green-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <Monitor className="h-5 w-5 text-white" />
                  </div>
                  Active User Sessions
                </CardTitle>
                <CardDescription>Monitor and manage current user sessions</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Monitor className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{session.user}</p>
                            <p className="text-xs text-gray-600">{session.email}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1">
                                <Globe className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{session.ipAddress}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{session.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">Login: {session.loginTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getSessionStatusBadge(session.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTerminateSession(session.id)}
                            className="text-red-600 hover:bg-red-50 border-red-200 rounded-lg"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Terminate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 border-b border-purple-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  Security Configuration
                </CardTitle>
                <CardDescription>Configure advanced security settings</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <Alert className="border-orange-200 bg-orange-50/50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Changes to security settings may affect all users. Please review carefully before saving.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Login Notifications</Label>
                        <p className="text-xs text-gray-600">Notify users of new login attempts</p>
                      </div>
                      <Switch
                        checked={securitySettings.loginNotifications}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, loginNotifications: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Suspicious Activity Detection</Label>
                        <p className="text-xs text-gray-600">Automatically detect unusual patterns</p>
                      </div>
                      <Switch
                        checked={securitySettings.suspiciousActivityDetection}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, suspiciousActivityDetection: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">IP Whitelisting</Label>
                        <p className="text-xs text-gray-600">Restrict access to approved IP addresses</p>
                      </div>
                      <Switch
                        checked={securitySettings.ipWhitelisting}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipWhitelisting: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Auto Logout Inactive Users</Label>
                        <p className="text-xs text-gray-600">Automatically log out inactive sessions</p>
                      </div>
                      <Switch
                        checked={securitySettings.autoLogoutInactive}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, autoLogoutInactive: checked})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        min={5}
                        max={480}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Max Concurrent Sessions</Label>
                      <Input
                        type="number"
                        value={securitySettings.maxConcurrentSessions}
                        onChange={(e) => setSecuritySettings({...securitySettings, maxConcurrentSessions: parseInt(e.target.value)})}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        min={1}
                        max={10}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Password Complexity</Label>
                      <Select value={securitySettings.passwordComplexity} onValueChange={(value) => setSecuritySettings({...securitySettings, passwordComplexity: value})}>
                        <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                          <SelectValue placeholder="Select complexity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="very_high">Very High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Account Lockout Threshold</Label>
                      <Input
                        type="number"
                        value={securitySettings.accountLockoutThreshold}
                        onChange={(e) => setSecuritySettings({...securitySettings, accountLockoutThreshold: parseInt(e.target.value)})}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        min={3}
                        max={10}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button
                    onClick={handleSaveSecuritySettings}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
