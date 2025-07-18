'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  Moon, 
  Sun, 
  Monitor,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
  VolumeX,
  Settings as SettingsIcon,
  Key,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    general: {
      theme: 'system',
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD'
    },
    notifications: {
      email: {
        marketing: true,
        updates: true,
        security: true,
        reports: false
      },
      push: {
        enabled: true,
        marketing: false,
        updates: true,
        security: true
      },
      sms: {
        enabled: false,
        security: true
      }
    },
    privacy: {
      profileVisibility: 'team',
      dataSharing: false,
      analytics: true,
      crashReports: true
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: '24h',
      loginNotifications: true
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleNestedSettingChange = (category: string, subcategory: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...(prev[category as keyof typeof prev] as any)[subcategory],
          [key]: value
        }
      }
    }));
  };

  const saveSettings = () => {
    // Implement save logic here
    console.log('Saving settings:', settings);
  };

  const exportData = () => {
    // Implement data export logic
    console.log('Exporting user data...');
  };

  const deleteAccount = () => {
    // Implement account deletion logic
    console.log('Deleting account...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="text-slate-600">Manage your account preferences and configurations</p>
            </div>
          </div>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white/60 backdrop-blur-sm p-1 rounded-xl shadow-lg">
              <TabsTrigger 
                value="general" 
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-indigo-50 hover:via-blue-50 hover:to-cyan-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:via-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <Palette className="w-4 h-4 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-indigo-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-indigo-700 transition-colors duration-300">General</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-amber-50 hover:via-yellow-50 hover:to-orange-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500 data-[state=active]:via-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <Bell className="w-4 h-4 transition-all duration-300 group-hover:animate-pulse group-hover:scale-110 group-hover:text-amber-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-amber-700 transition-colors duration-300">Notifications</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:via-green-50 hover:to-teal-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:via-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <Shield className="w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-3 group-hover:text-emerald-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-emerald-700 transition-colors duration-300">Security</span>
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-rose-50 hover:via-pink-50 hover:to-purple-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-rose-500 data-[state=active]:via-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <Lock className="w-4 h-4 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-rose-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-rose-700 transition-colors duration-300">Privacy</span>
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-red-50 hover:via-orange-50 hover:to-yellow-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:via-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <AlertTriangle className="w-4 h-4 transition-all duration-300 group-hover:animate-bounce group-hover:scale-110 group-hover:text-red-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-red-700 transition-colors duration-300">Advanced</span>
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Appearance & Localization</span>
                  </CardTitle>
                  <CardDescription>
                    Customize how the application looks and behaves for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'system', label: 'System', icon: Monitor }
                      ].map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() => handleSettingChange('general', 'theme', theme.value)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              settings.general.theme === theme.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">{theme.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Language & Region */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        value={settings.general.language} 
                        onValueChange={(value) => handleSettingChange('general', 'language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        value={settings.general.timezone} 
                        onValueChange={(value) => handleSettingChange('general', 'timezone', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="EST">Eastern Time</SelectItem>
                          <SelectItem value="PST">Pacific Time</SelectItem>
                          <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select 
                        value={settings.general.dateFormat} 
                        onValueChange={(value) => handleSettingChange('general', 'dateFormat', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        value={settings.general.currency} 
                        onValueChange={(value) => handleSettingChange('general', 'currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="JPY">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold">Email Notifications</h3>
                    </div>
                    <div className="space-y-3 pl-7">
                      {Object.entries(settings.notifications.email).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                            <div className="text-sm text-slate-600">
                              {key === 'marketing' && 'Product updates, tips, and promotional content'}
                              {key === 'updates' && 'Important platform updates and announcements'}
                              {key === 'security' && 'Security alerts and login notifications'}
                              {key === 'reports' && 'Weekly and monthly report summaries'}
                            </div>
                          </div>
                          <Switch
                            checked={value as boolean}
                            onCheckedChange={(checked) => 
                              handleNestedSettingChange('notifications', 'email', key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Push Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold">Push Notifications</h3>
                    </div>
                    <div className="space-y-3 pl-7">
                      {Object.entries(settings.notifications.push).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                            <div className="text-sm text-slate-600">
                              {key === 'enabled' && 'Enable all push notifications'}
                              {key === 'marketing' && 'Marketing and promotional push notifications'}
                              {key === 'updates' && 'Platform updates and announcements'}
                              {key === 'security' && 'Security-related push notifications'}
                            </div>
                          </div>
                          <Switch
                            checked={value as boolean}
                            onCheckedChange={(checked) => 
                              handleNestedSettingChange('notifications', 'push', key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* SMS Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold">SMS Notifications</h3>
                    </div>
                    <div className="space-y-3 pl-7">
                      {Object.entries(settings.notifications.sms).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                            <div className="text-sm text-slate-600">
                              {key === 'enabled' && 'Enable SMS notifications'}
                              {key === 'security' && 'Critical security alerts via SMS'}
                            </div>
                          </div>
                          <Switch
                            checked={value as boolean}
                            onCheckedChange={(checked) => 
                              handleNestedSettingChange('notifications', 'sms', key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Change */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-slate-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? 'text' : 'password'}
                              placeholder="Enter new password"
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4 text-slate-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm new password"
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-slate-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full md:w-auto">
                        <Key className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Two-Factor Authentication */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {settings.security.twoFactorEnabled && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Enabled
                          </Badge>
                        )}
                        <Switch
                          checked={settings.security.twoFactorEnabled}
                          onCheckedChange={(checked) => 
                            handleSettingChange('security', 'twoFactorEnabled', checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Security Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Security Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Login Notifications</div>
                          <div className="text-sm text-slate-600">Get notified when someone signs into your account</div>
                        </div>
                        <Switch
                          checked={settings.security.loginNotifications}
                          onCheckedChange={(checked) => 
                            handleSettingChange('security', 'loginNotifications', checked)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout</Label>
                        <Select 
                          value={settings.security.sessionTimeout} 
                          onValueChange={(value) => handleSettingChange('security', 'sessionTimeout', value)}
                        >
                          <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="8h">8 hours</SelectItem>
                            <SelectItem value="24h">24 hours</SelectItem>
                            <SelectItem value="7d">7 days</SelectItem>
                            <SelectItem value="30d">30 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Privacy Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Control your privacy and data sharing preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Profile Visibility</div>
                        <div className="text-sm text-slate-600">Control who can see your profile information</div>
                      </div>
                      <Select 
                        value={settings.privacy.profileVisibility} 
                        onValueChange={(value) => handleSettingChange('privacy', 'profileVisibility', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="team">Team Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Data Sharing</div>
                        <div className="text-sm text-slate-600">Share anonymized usage data to help improve our services</div>
                      </div>
                      <Switch
                        checked={settings.privacy.dataSharing}
                        onCheckedChange={(checked) => 
                          handleSettingChange('privacy', 'dataSharing', checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Analytics</div>
                        <div className="text-sm text-slate-600">Allow us to collect analytics data to improve your experience</div>
                      </div>
                      <Switch
                        checked={settings.privacy.analytics}
                        onCheckedChange={(checked) => 
                          handleSettingChange('privacy', 'analytics', checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Crash Reports</div>
                        <div className="text-sm text-slate-600">Automatically send crash reports to help us fix issues</div>
                      </div>
                      <Switch
                        checked={settings.privacy.crashReports}
                        onCheckedChange={(checked) => 
                          handleSettingChange('privacy', 'crashReports', checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Advanced Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Advanced options and account management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Data Export */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Export</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                      <div>
                        <div className="font-medium">Export Account Data</div>
                        <div className="text-sm text-slate-600">Download a copy of all your account data</div>
                      </div>
                      <Button variant="outline" onClick={exportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Account Deletion */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                    <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-red-800">Delete Account</div>
                          <div className="text-sm text-red-600">
                            Permanently delete your account and all associated data
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove all your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={deleteAccount}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Yes, delete my account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Save Button */}
        <motion.div 
          className="flex justify-end mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button onClick={saveSettings} size="lg" className="px-8">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
