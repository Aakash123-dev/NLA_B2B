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
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Mail, 
  Smartphone, 
  Monitor, 
  Moon, 
  Sun, 
  Save, 
  RefreshCw, 
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Building2,
  CreditCard,
  Zap,
  Lock,
  FileText,
  Download,
  Upload,
  Trash2,
  Edit,
  Info
} from 'lucide-react';

export default function SettingsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      companyName: 'NORTHLIGHT ANALYTIC PARTNERS',
      companyEmail: 'contact@northlight.com',
      companyPhone: '+1 (555) 123-4567',
      companyAddress: '123 Business Ave, San Francisco, CA 94105',
      timezone: 'America/New_York',
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      securityAlerts: true,
      systemUpdates: true,
      userRegistrations: true,
      paymentReminders: true,
      weeklyReports: true,
      monthlyReports: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      requirePasswordChange: true,
      allowRememberMe: true,
      ipWhitelist: true,
      apiRateLimit: 1000
    },
    billing: {
      billingEmail: 'billing@northlight.com',
      invoicePrefix: 'NLA',
      taxRate: 8.25,
      paymentMethod: 'credit_card',
      billingCycle: 'monthly',
      autoRenewal: true,
      creditLimit: 10000,
      sendInvoiceEmail: true
    },
    integrations: {
      slackIntegration: true,
      googleWorkspace: true,
      microsoftTeams: false,
      salesforce: true,
      hubspot: false,
      zapier: true,
      webhook: true,
      apiAccess: true
    }
  });

  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = (category: string) => {
    toast({
      title: "Settings Saved",
      description: `${category} settings have been updated successfully.`,
    });
  };

  const handleReset = (category: string) => {
    toast({
      title: "Settings Reset",
      description: `${category} settings have been reset to default values.`,
      variant: "destructive"
    });
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'settings_export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Settings Exported",
      description: "Your settings have been exported successfully.",
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                    <Settings className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Settings
                    </h1>
                    <p className="text-slate-600 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Configure your platform settings and preferences
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleExportSettings}
                  variant="outline"
                  className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export Settings
                </Button>
                <Button 
                  onClick={() => handleSave('All')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl px-6 py-3"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save All Changes
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full h-14 grid-cols-5 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <TabsTrigger value="general" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Zap className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  Company Information
                </CardTitle>
                <CardDescription>Update your company details and basic settings</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name" className="text-sm font-medium text-gray-700">Company Name</Label>
                    <Input
                      id="company-name"
                      value={settings.general.companyName}
                      onChange={(e) => setSettings({...settings, general: {...settings.general, companyName: e.target.value}})}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email" className="text-sm font-medium text-gray-700">Company Email</Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={settings.general.companyEmail}
                      onChange={(e) => setSettings({...settings, general: {...settings.general, companyEmail: e.target.value}})}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone" className="text-sm font-medium text-gray-700">Company Phone</Label>
                    <Input
                      id="company-phone"
                      value={settings.general.companyPhone}
                      onChange={(e) => setSettings({...settings, general: {...settings.general, companyPhone: e.target.value}})}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-sm font-medium text-gray-700">Timezone</Label>
                    <Select value={settings.general.timezone} onValueChange={(value) => setSettings({...settings, general: {...settings.general, timezone: value}})}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address" className="text-sm font-medium text-gray-700">Company Address</Label>
                  <Textarea
                    id="company-address"
                    value={settings.general.companyAddress}
                    onChange={(e) => setSettings({...settings, general: {...settings.general, companyAddress: e.target.value}})}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    rows={3}
                  />
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-medium text-gray-700">Language</Label>
                    <Select value={settings.general.language} onValueChange={(value) => setSettings({...settings, general: {...settings.general, language: value}})}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-sm font-medium text-gray-700">Currency</Label>
                    <Select value={settings.general.currency} onValueChange={(value) => setSettings({...settings, general: {...settings.general, currency: value}})}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format" className="text-sm font-medium text-gray-700">Date Format</Label>
                    <Select value={settings.general.dateFormat} onValueChange={(value) => setSettings({...settings, general: {...settings.general, dateFormat: value}})}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    onClick={() => handleReset('General')}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSave('General')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  Notification Preferences
                </CardTitle>
                <CardDescription>Manage how you receive notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <Label className="text-sm font-medium">Email Notifications</Label>
                        </div>
                        <p className="text-xs text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, emailNotifications: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-green-600" />
                          <Label className="text-sm font-medium">SMS Notifications</Label>
                        </div>
                        <p className="text-xs text-gray-600">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={settings.notifications.smsNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, smsNotifications: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-purple-600" />
                          <Label className="text-sm font-medium">Push Notifications</Label>
                        </div>
                        <p className="text-xs text-gray-600">Receive browser push notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, pushNotifications: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-600" />
                          <Label className="text-sm font-medium">Security Alerts</Label>
                        </div>
                        <p className="text-xs text-gray-600">Important security notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.securityAlerts}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, securityAlerts: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-orange-600" />
                          <Label className="text-sm font-medium">User Registrations</Label>
                        </div>
                        <p className="text-xs text-gray-600">New user sign-ups and registrations</p>
                      </div>
                      <Switch
                        checked={settings.notifications.userRegistrations}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, userRegistrations: checked}})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-indigo-600" />
                          <Label className="text-sm font-medium">Payment Reminders</Label>
                        </div>
                        <p className="text-xs text-gray-600">Billing and payment notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.paymentReminders}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, paymentReminders: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-teal-600" />
                          <Label className="text-sm font-medium">System Updates</Label>
                        </div>
                        <p className="text-xs text-gray-600">Platform updates and maintenance</p>
                      </div>
                      <Switch
                        checked={settings.notifications.systemUpdates}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, systemUpdates: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-cyan-600" />
                          <Label className="text-sm font-medium">Weekly Reports</Label>
                        </div>
                        <p className="text-xs text-gray-600">Weekly analytics and summaries</p>
                      </div>
                      <Switch
                        checked={settings.notifications.weeklyReports}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, weeklyReports: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-pink-600" />
                          <Label className="text-sm font-medium">Monthly Reports</Label>
                        </div>
                        <p className="text-xs text-gray-600">Monthly analytics and summaries</p>
                      </div>
                      <Switch
                        checked={settings.notifications.monthlyReports}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, monthlyReports: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-yellow-600" />
                          <Label className="text-sm font-medium">Marketing Emails</Label>
                        </div>
                        <p className="text-xs text-gray-600">Product updates and promotions</p>
                      </div>
                      <Switch
                        checked={settings.notifications.marketingEmails}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: {...settings.notifications, marketingEmails: checked}})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    onClick={() => handleReset('Notifications')}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSave('Notifications')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  Security Configuration
                </CardTitle>
                <CardDescription>Manage security settings and access controls</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <Alert className="border-blue-200 bg-blue-50/50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    These settings affect the security of your entire platform. Changes may require admin approval.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-green-600" />
                          <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                        </div>
                        <p className="text-xs text-gray-600">Require 2FA for all users</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) => setSettings({...settings, security: {...settings.security, twoFactorAuth: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-orange-600" />
                          <Label className="text-sm font-medium">IP Whitelist</Label>
                        </div>
                        <p className="text-xs text-gray-600">Restrict access to specific IP addresses</p>
                      </div>
                      <Switch
                        checked={settings.security.ipWhitelist}
                        onCheckedChange={(checked) => setSettings({...settings, security: {...settings.security, ipWhitelist: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <Label className="text-sm font-medium">Remember Me</Label>
                        </div>
                        <p className="text-xs text-gray-600">Allow users to stay logged in</p>
                      </div>
                      <Switch
                        checked={settings.security.allowRememberMe}
                        onCheckedChange={(checked) => setSettings({...settings, security: {...settings.security, allowRememberMe: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <Label className="text-sm font-medium">Force Password Change</Label>
                        </div>
                        <p className="text-xs text-gray-600">Require password change on first login</p>
                      </div>
                      <Switch
                        checked={settings.security.requirePasswordChange}
                        onCheckedChange={(checked) => setSettings({...settings, security: {...settings.security, requirePasswordChange: checked}})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({...settings, security: {...settings.security, sessionTimeout: parseInt(e.target.value)}})}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        min={5}
                        max={480}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Password Expiry (days)</Label>
                      <Input
                        type="number"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => setSettings({...settings, security: {...settings.security, passwordExpiry: parseInt(e.target.value)}})}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        min={30}
                        max={365}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Max Login Attempts</Label>
                      <Input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => setSettings({...settings, security: {...settings.security, maxLoginAttempts: parseInt(e.target.value)}})}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        min={3}
                        max={10}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">API Rate Limit (requests/hour)</Label>
                      <Input
                        type="number"
                        value={settings.security.apiRateLimit}
                        onChange={(e) => setSettings({...settings, security: {...settings.security, apiRateLimit: parseInt(e.target.value)}})}
                        className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        min={100}
                        max={10000}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    onClick={() => handleReset('Security')}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSave('Security')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  Billing Configuration
                </CardTitle>
                <CardDescription>Manage billing settings and payment preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="billing-email" className="text-sm font-medium text-gray-700">Billing Email</Label>
                    <Input
                      id="billing-email"
                      type="email"
                      value={settings.billing.billingEmail}
                      onChange={(e) => setSettings({...settings, billing: {...settings.billing, billingEmail: e.target.value}})}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix" className="text-sm font-medium text-gray-700">Invoice Prefix</Label>
                    <Input
                      id="invoice-prefix"
                      value={settings.billing.invoicePrefix}
                      onChange={(e) => setSettings({...settings, billing: {...settings.billing, invoicePrefix: e.target.value}})}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-rate" className="text-sm font-medium text-gray-700">Tax Rate (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      step="0.01"
                      value={settings.billing.taxRate}
                      onChange={(e) => setSettings({...settings, billing: {...settings.billing, taxRate: parseFloat(e.target.value)}})}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credit-limit" className="text-sm font-medium text-gray-700">Credit Limit ($)</Label>
                    <Input
                      id="credit-limit"
                      type="number"
                      value={settings.billing.creditLimit}
                      onChange={(e) => setSettings({...settings, billing: {...settings.billing, creditLimit: parseInt(e.target.value)}})}
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-method" className="text-sm font-medium text-gray-700">Default Payment Method</Label>
                    <Select value={settings.billing.paymentMethod} onValueChange={(value) => setSettings({...settings, billing: {...settings.billing, paymentMethod: value}})}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing-cycle" className="text-sm font-medium text-gray-700">Billing Cycle</Label>
                    <Select value={settings.billing.billingCycle} onValueChange={(value) => setSettings({...settings, billing: {...settings.billing, billingCycle: value}})}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select billing cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Auto Renewal</Label>
                      <p className="text-xs text-gray-600">Automatically renew subscriptions</p>
                    </div>
                    <Switch
                      checked={settings.billing.autoRenewal}
                      onCheckedChange={(checked) => setSettings({...settings, billing: {...settings.billing, autoRenewal: checked}})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Send Invoice Emails</Label>
                      <p className="text-xs text-gray-600">Email invoices to customers</p>
                    </div>
                    <Switch
                      checked={settings.billing.sendInvoiceEmail}
                      onCheckedChange={(checked) => setSettings({...settings, billing: {...settings.billing, sendInvoiceEmail: checked}})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    onClick={() => handleReset('Billing')}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSave('Billing')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-blue-100/50 rounded-t-3xl">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  Integration Settings
                </CardTitle>
                <CardDescription>Configure third-party integrations and API access</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-600 rounded"></div>
                          <Label className="text-sm font-medium">Slack Integration</Label>
                        </div>
                        <p className="text-xs text-gray-600">Connect with Slack for notifications</p>
                      </div>
                      <Switch
                        checked={settings.integrations.slackIntegration}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, slackIntegration: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          <Label className="text-sm font-medium">Google Workspace</Label>
                        </div>
                        <p className="text-xs text-gray-600">Integrate with Google services</p>
                      </div>
                      <Switch
                        checked={settings.integrations.googleWorkspace}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, googleWorkspace: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                          <Label className="text-sm font-medium">Microsoft Teams</Label>
                        </div>
                        <p className="text-xs text-gray-600">Connect with Microsoft Teams</p>
                      </div>
                      <Switch
                        checked={settings.integrations.microsoftTeams}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, microsoftTeams: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-cyan-600 rounded"></div>
                          <Label className="text-sm font-medium">Salesforce</Label>
                        </div>
                        <p className="text-xs text-gray-600">CRM integration with Salesforce</p>
                      </div>
                      <Switch
                        checked={settings.integrations.salesforce}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, salesforce: checked}})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-600 rounded"></div>
                          <Label className="text-sm font-medium">HubSpot</Label>
                        </div>
                        <p className="text-xs text-gray-600">Marketing automation with HubSpot</p>
                      </div>
                      <Switch
                        checked={settings.integrations.hubspot}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, hubspot: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                          <Label className="text-sm font-medium">Zapier</Label>
                        </div>
                        <p className="text-xs text-gray-600">Workflow automation with Zapier</p>
                      </div>
                      <Switch
                        checked={settings.integrations.zapier}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, zapier: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-600 rounded"></div>
                          <Label className="text-sm font-medium">Webhook Support</Label>
                        </div>
                        <p className="text-xs text-gray-600">Enable webhook notifications</p>
                      </div>
                      <Switch
                        checked={settings.integrations.webhook}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, webhook: checked}})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-600 rounded"></div>
                          <Label className="text-sm font-medium">API Access</Label>
                        </div>
                        <p className="text-xs text-gray-600">Enable REST API access</p>
                      </div>
                      <Switch
                        checked={settings.integrations.apiAccess}
                        onCheckedChange={(checked) => setSettings({...settings, integrations: {...settings.integrations, apiAccess: checked}})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    onClick={() => handleReset('Integrations')}
                    variant="outline"
                    className="border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button
                    onClick={() => handleSave('Integrations')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl"
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
