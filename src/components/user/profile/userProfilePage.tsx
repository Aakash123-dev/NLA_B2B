'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Edit3,
  Camera,
  Save,
  X,
  Shield,
  Award,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Button
} from '@/components/ui/button';
import {
  Input
} from '@/components/ui/input';
import {
  Label
} from '@/components/ui/label';
import {
  Textarea
} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Badge
} from '@/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Separator
} from '@/components/ui/separator';

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Pricing Analyst',
    department: 'Revenue Operations',
    company: 'TechCorp Industries',
    location: 'San Francisco, CA',
    bio: 'Experienced pricing analyst with over 5 years in revenue optimization and competitive analysis. Passionate about data-driven decision making and strategic pricing models.',
    joinDate: 'January 2020',
    timezone: 'PST',
    language: 'English'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data or fetch from backend
    setIsEditing(false);
  };

  // Sample achievements data
  const achievements = [
    {
      id: 1,
      title: 'Pricing Optimization Expert',
      description: 'Achieved 15% revenue increase through strategic pricing',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      title: 'AI Integration Pioneer',
      description: 'Successfully implemented Gazelle AI across 3 product lines',
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      title: 'Team Collaborator',
      description: 'Led cross-functional pricing strategy initiatives',
      icon: Award,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  // Sample activity data
  const recentActivity = [
    {
      id: 1,
      action: 'Updated pricing model for Electronics category',
      time: '2 hours ago',
      type: 'update'
    },
    {
      id: 2,
      action: 'Generated AI insights report',
      time: '1 day ago',
      type: 'report'
    },
    {
      id: 3,
      action: 'Completed competitor analysis',
      time: '3 days ago',
      type: 'analysis'
    },
    {
      id: 4,
      action: 'Optimized promo campaign performance',
      time: '5 days ago',
      type: 'optimization'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-600 mt-1">Manage your personal information and preferences</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>
                    Your basic profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Profile Picture and Basic Info */}
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                        <AvatarFallback className="bg-[#009bcc] text-white text-2xl font-semibold">
                          {profileData.firstName[0]}{profileData.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#009bcc] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#007a99] transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          {isEditing ? (
                            <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                            />
                          ) : (
                            <p className="text-sm text-slate-700 py-2">{profileData.firstName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          {isEditing ? (
                            <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                            />
                          ) : (
                            <p className="text-sm text-slate-700 py-2">{profileData.lastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center space-x-2 py-2">
                              <Mail className="w-4 h-4 text-slate-500" />
                              <p className="text-sm text-slate-700">{profileData.email}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          {isEditing ? (
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                          ) : (
                            <div className="flex items-center space-x-2 py-2">
                              <Phone className="w-4 h-4 text-slate-500" />
                              <p className="text-sm text-slate-700">{profileData.phone}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Professional Information</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        {isEditing ? (
                          <Input
                            id="title"
                            value={profileData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <Shield className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-700">{profileData.title}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        {isEditing ? (
                          <Select 
                            value={profileData.department} 
                            onValueChange={(value) => handleInputChange('department', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Revenue Operations">Revenue Operations</SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Product">Product</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-slate-700 py-2">{profileData.department}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        {isEditing ? (
                          <Input
                            id="company"
                            value={profileData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <Building className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-700">{profileData.company}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-700">{profileData.location}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Bio Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">About Me</h3>
                    {isEditing ? (
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-slate-700 text-sm leading-relaxed">{profileData.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Achievements</span>
                  </CardTitle>
                  <CardDescription>
                    Your accomplishments and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg ${achievement.bgColor} border border-slate-200`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${achievement.color}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm text-slate-900">{achievement.title}</h4>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600">{achievement.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Sidebar Info */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Member Since</span>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">{profileData.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Projects Completed</span>
                    <Badge className="bg-green-100 text-green-800">24</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Success Rate</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Team Rating</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#009bcc] rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">{activity.action}</p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Account Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Account Type</span>
                    <Badge className="bg-[#009bcc]/10 text-[#009bcc]">Premium</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Verification</span>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Verified</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Security Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-10/12 h-full bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
