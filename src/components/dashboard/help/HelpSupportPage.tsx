'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Video, 
  Search, 
  Send, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  ExternalLink,
  Users,
  Zap,
  Shield,
  Settings,
  CreditCard,
  Database,
  BarChart3,
  Globe,
  Headphones,
  MessageCircle,
  Star,
  Calendar,
  ArrowRight,
  PlayCircle,
  BookOpen,
  Info,
  Lightbulb,
  User,
  Building2
} from 'lucide-react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful: number;
  tags: string[];
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  lastUpdated: string;
  assignedTo?: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'guide' | 'video' | 'api' | 'tutorial';
  category: string;
  description: string;
  duration?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  views: number;
  rating: number;
}

export default function HelpSupportPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    email: '',
    phone: ''
  });

  const [faqs] = useState<FAQ[]>([
    {
      id: '1',
      category: 'Getting Started',
      question: 'How do I create a new user account?',
      answer: 'To create a new user account, navigate to the User Management section in your dashboard. Click the "Add User" button and fill in the required information including name, email, company details, and assign appropriate permissions.',
      helpful: 45,
      tags: ['users', 'account', 'setup']
    },
    {
      id: '2',
      category: 'Billing',
      question: 'How do I update my billing information?',
      answer: 'You can update your billing information by going to Settings > Billing. From there, you can update your payment method, billing address, and view your subscription details.',
      helpful: 32,
      tags: ['billing', 'payment', 'subscription']
    },
    {
      id: '3',
      category: 'Security',
      question: 'How do I enable two-factor authentication?',
      answer: 'To enable 2FA, go to Security Settings in your account. Turn on the Two-Factor Authentication toggle and follow the setup wizard to configure your authenticator app or SMS verification.',
      helpful: 67,
      tags: ['security', '2fa', 'authentication']
    },
    {
      id: '4',
      category: 'Analytics',
      question: 'How do I export analytics data?',
      answer: 'In the Analytics dashboard, you can export data by clicking the "Export" button in the top-right corner. Choose your preferred format (CSV, PDF, or Excel) and select the date range for your export.',
      helpful: 28,
      tags: ['analytics', 'export', 'data']
    },
    {
      id: '5',
      category: 'Integrations',
      question: 'What third-party integrations are available?',
      answer: 'We support integrations with Slack, Google Workspace, Microsoft Teams, Salesforce, HubSpot, and Zapier. You can configure these in the Integrations section of your settings.',
      helpful: 41,
      tags: ['integrations', 'third-party', 'api']
    }
  ]);

  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Getting Started Guide',
      type: 'guide',
      category: 'Getting Started',
      description: 'Complete guide to setting up your account and basic features',
      level: 'beginner',
      url: '#',
      views: 1250,
      rating: 4.8
    },
    {
      id: '2',
      title: 'User Management Tutorial',
      type: 'video',
      category: 'User Management',
      description: 'Learn how to manage users, roles, and permissions',
      duration: '12 min',
      level: 'intermediate',
      url: '#',
      views: 890,
      rating: 4.6
    },
    {
      id: '3',
      title: 'API Documentation',
      type: 'api',
      category: 'Development',
      description: 'Complete API reference and integration examples',
      level: 'advanced',
      url: '#',
      views: 567,
      rating: 4.9
    },
    {
      id: '4',
      title: 'Security Best Practices',
      type: 'guide',
      category: 'Security',
      description: 'Implement security best practices for your organization',
      level: 'intermediate',
      url: '#',
      views: 743,
      rating: 4.7
    }
  ]);

  const [myTickets] = useState<SupportTicket[]>([
    {
      id: 'TK-001',
      subject: 'Unable to export user data',
      category: 'Technical',
      priority: 'medium',
      status: 'in_progress',
      createdAt: '2024-07-05 10:30:00',
      lastUpdated: '2024-07-06 09:15:00',
      assignedTo: 'Support Agent Mike'
    },
    {
      id: 'TK-002',
      subject: 'Billing invoice question',
      category: 'Billing',
      priority: 'low',
      status: 'resolved',
      createdAt: '2024-07-04 14:20:00',
      lastUpdated: '2024-07-05 11:45:00',
      assignedTo: 'Support Agent Sarah'
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitTicket = () => {
    if (!ticketForm.subject || !ticketForm.description || !ticketForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been submitted successfully. We'll get back to you soon.",
    });

    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: '',
      email: '',
      phone: ''
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low': return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'high': return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'urgent': return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case 'in_progress': return <Badge className="bg-purple-100 text-purple-800">In Progress</Badge>;
      case 'resolved': return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'closed': return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'video': return <PlayCircle className="h-5 w-5 text-red-600" />;
      case 'api': return <FileText className="h-5 w-5 text-green-600" />;
      case 'tutorial': return <Video className="h-5 w-5 text-purple-600" />;
      default: return <Book className="h-5 w-5 text-gray-600" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner': return <Badge className="bg-green-100 text-green-800">Beginner</Badge>;
      case 'intermediate': return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>;
      case 'advanced': return <Badge className="bg-red-100 text-red-800">Advanced</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <HelpCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                      Help & Support
                    </h1>
                    <p className="text-slate-600 flex items-center gap-2 mt-2">
                      <Headphones className="h-4 w-4 text-blue-500" />
                      Get help, find answers, and connect with our expert support team
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline"
                  className="border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 rounded-xl px-6 py-3 flex items-center gap-2 backdrop-blur-sm"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Live Chat</span>
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-medium">Contact Support</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-100/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl cursor-pointer backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 group-hover:from-blue-500/10 group-hover:to-indigo-600/10 transition-all duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Browse FAQs</p>
                  <p className="text-xl font-bold text-blue-900">Find Quick Answers</p>
                  <p className="text-sm text-blue-600/80">Most common questions and solutions</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <HelpCircle className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl cursor-pointer backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 group-hover:from-emerald-500/10 group-hover:to-green-600/10 transition-all duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Create Ticket</p>
                  <p className="text-xl font-bold text-emerald-900">Get Personalized Help</p>
                  <p className="text-sm text-emerald-600/80">Direct access to our support experts</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-violet-100/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl cursor-pointer backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-600/5 group-hover:from-purple-500/10 group-hover:to-violet-600/10 transition-all duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Learning Center</p>
                  <p className="text-xl font-bold text-purple-900">Tutorials & Guides</p>
                  <p className="text-sm text-purple-600/80">Comprehensive self-service resources</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Book className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full h-14 grid-cols-4 bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-slate-200/50">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Info className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="faq" 
              className="flex items-center gap-2 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger 
              value="tickets" 
              className="flex items-center gap-2 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <MessageSquare className="h-4 w-4" />
              Support Tickets
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="flex items-center gap-2 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Book className="h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border-b border-blue-100/50 rounded-t-3xl p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-slate-800">Contact Information</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Multiple ways to reach our support team</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50/70 rounded-xl border border-blue-100/50 group/item hover:bg-blue-50 transition-all duration-300">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Phone Support</p>
                      <p className="text-sm text-blue-700 font-medium">+1 (555) 123-4567</p>
                      <p className="text-xs text-blue-600">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-emerald-50/70 rounded-xl border border-emerald-100/50 group/item hover:bg-emerald-50 transition-all duration-300">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">Email Support</p>
                      <p className="text-sm text-emerald-700 font-medium">support@northlight.com</p>
                      <p className="text-xs text-emerald-600">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50/70 rounded-xl border border-purple-100/50 group/item hover:bg-purple-50 transition-all duration-300">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-900">Live Chat</p>
                      <p className="text-sm text-purple-700 font-medium">Available 24/7</p>
                      <p className="text-xs text-purple-600">Instant response</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-violet-50/90 to-purple-50/90 border-b border-violet-100/50 rounded-t-3xl p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-slate-800">Support Hours</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">When our team is available to help</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 px-4 bg-slate-50/70 rounded-xl border border-slate-100/50">
                      <span className="text-sm font-semibold text-slate-900">Monday - Friday</span>
                      <span className="text-sm text-slate-700 font-medium">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 bg-slate-50/70 rounded-xl border border-slate-100/50">
                      <span className="text-sm font-semibold text-slate-900">Saturday</span>
                      <span className="text-sm text-slate-700 font-medium">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 bg-slate-50/70 rounded-xl border border-slate-100/50">
                      <span className="text-sm font-semibold text-slate-900">Sunday</span>
                      <span className="text-sm text-slate-700 font-medium">Emergency only</span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 bg-emerald-50/70 rounded-xl border border-emerald-100/50">
                      <span className="text-sm font-semibold text-slate-900">Live Chat</span>
                      <span className="text-sm text-emerald-700 font-bold">24/7 Available</span>
                    </div>
                  </div>

                  <Alert className="border-emerald-200/70 bg-emerald-50/70 mt-6 rounded-xl">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-emerald-800 font-medium">
                      For urgent issues outside business hours, use our emergency hotline or live chat.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Popular Help Topics */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-amber-50/90 to-orange-50/90 border-b border-amber-100/50 rounded-t-3xl p-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800">Popular Help Topics</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Most frequently searched topics</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: User, title: 'User Management', desc: 'Adding and managing users', color: 'blue' },
                    { icon: CreditCard, title: 'Billing & Payments', desc: 'Subscription and billing help', color: 'emerald' },
                    { icon: Shield, title: 'Security Settings', desc: '2FA and security features', color: 'violet' },
                    { icon: BarChart3, title: 'Analytics & Reports', desc: 'Data insights and exports', color: 'indigo' },
                    { icon: Settings, title: 'Account Settings', desc: 'Profile and preferences', color: 'slate' },
                    { icon: Database, title: 'Data Management', desc: 'Import/export data', color: 'teal' }
                  ].map((topic, index) => (
                    <div key={index} className="p-4 bg-slate-50/70 rounded-xl hover:bg-slate-50 transition-all duration-300 cursor-pointer group/topic border border-slate-100/50 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 bg-white rounded-xl shadow-sm group-hover/topic:shadow-md transition-all duration-300 border border-${topic.color}-100/50`}>
                          <topic.icon className={`h-5 w-5 text-${topic.color}-600`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{topic.title}</p>
                          <p className="text-xs text-slate-600">{topic.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-blue-50/90 to-violet-50/90 border-b border-blue-100/50 rounded-t-3xl p-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl shadow-lg">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800">Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-56 h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Getting Started">Getting Started</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Integrations">Integrations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* FAQ List */}
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border border-slate-200/70 rounded-xl px-5 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300">
                      <AccordionTrigger className="text-left hover:no-underline py-5">
                        <div className="flex items-start gap-4 w-full">
                          <Badge variant="outline" className="text-xs mt-1 px-3 py-1 bg-blue-50/80 text-blue-700 border-blue-200 font-medium">{faq.category}</Badge>
                          <span className="text-sm font-semibold text-slate-800 flex-1">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="space-y-4 pl-4">
                          <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {faq.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-2 py-1 bg-slate-50/80 text-slate-600 border-slate-200">{tag}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className="font-medium">{faq.helpful} people found this helpful</span>
                              <Button variant="ghost" size="sm" className="h-7 px-2 hover:bg-blue-50">
                                <Star className="h-3 w-3 text-yellow-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="p-6 bg-slate-100/70 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Search className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">No FAQs Found</h3>
                    <p className="text-slate-600 max-w-md mx-auto">No FAQs match your search criteria. Try different keywords or contact our support team for personalized assistance.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tickets */}
          <TabsContent value="tickets" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Ticket */}
              <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-emerald-50/90 to-green-50/90 border-b border-emerald-100/50 rounded-t-3xl p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-slate-800">Create Support Ticket</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Submit a new support request</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticket-email" className="text-sm font-semibold text-slate-700">Email *</Label>
                      <Input
                        id="ticket-email"
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                        className="h-11 border-2 border-slate-200 focus:border-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ticket-phone" className="text-sm font-semibold text-slate-700">Phone (Optional)</Label>
                      <Input
                        id="ticket-phone"
                        value={ticketForm.phone}
                        onChange={(e) => setTicketForm({...ticketForm, phone: e.target.value})}
                        className="h-11 border-2 border-slate-200 focus:border-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticket-subject" className="text-sm font-semibold text-slate-700">Subject *</Label>
                    <Input
                      id="ticket-subject"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                      className="h-11 border-2 border-slate-200 focus:border-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticket-category" className="text-sm font-semibold text-slate-700">Category</Label>
                      <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                        <SelectTrigger className="h-11 border-2 border-slate-200 focus:border-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ticket-priority" className="text-sm font-semibold text-slate-700">Priority</Label>
                      <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                        <SelectTrigger className="h-11 border-2 border-slate-200 focus:border-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ticket-description" className="text-sm font-semibold text-slate-700">Description *</Label>
                    <Textarea
                      id="ticket-description"
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                      className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl bg-white/80 backdrop-blur-sm font-medium"
                      rows={5}
                      placeholder="Please provide detailed information about your issue..."
                    />
                  </div>

                  <Button
                    onClick={handleSubmitTicket}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg rounded-xl font-semibold transition-all duration-300 hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>

              {/* My Tickets */}
              <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-violet-50/90 to-purple-50/90 border-b border-violet-100/50 rounded-t-3xl p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-slate-800">My Support Tickets</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Track your submitted tickets</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {myTickets.map((ticket) => (
                      <div key={ticket.id} className="p-5 border border-slate-200/70 rounded-xl bg-slate-50/40 hover:bg-slate-50/70 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{ticket.subject}</p>
                            <p className="text-xs text-slate-600 font-medium">Ticket #{ticket.id}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(ticket.priority)}
                            {getStatusBadge(ticket.status)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                          <div className="space-y-1">
                            <p><span className="font-medium">Created:</span> {ticket.createdAt}</p>
                            <p><span className="font-medium">Updated:</span> {ticket.lastUpdated}</p>
                          </div>
                          <div className="space-y-1">
                            <p><span className="font-medium">Category:</span> {ticket.category}</p>
                            {ticket.assignedTo && <p><span className="font-medium">Assigned to:</span> {ticket.assignedTo}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-blue-50/90 to-violet-50/90 border-b border-blue-100/50 rounded-t-3xl p-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl shadow-lg">
                    <Book className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800">Learning Resources</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Guides, tutorials, and comprehensive documentation</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resources.map((resource) => (
                    <div key={resource.id} className="p-5 border border-slate-200/70 rounded-xl bg-slate-50/40 hover:bg-slate-50/70 transition-all duration-300 group/resource cursor-pointer backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100/50 group-hover/resource:shadow-md transition-all duration-300">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-sm font-bold text-slate-900 group-hover/resource:text-blue-600 transition-colors leading-tight">
                              {resource.title}
                            </h3>
                            <ExternalLink className="h-4 w-4 text-slate-400 group-hover/resource:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                          </div>
                          <p className="text-xs text-slate-600 mb-3 leading-relaxed">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getLevelBadge(resource.level)}
                              {resource.duration && (
                                <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50/80 text-blue-700 border-blue-200">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {resource.duration}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-yellow-500" />
                                <span className="font-medium">{resource.rating}</span>
                              </div>
                              <span>•</span>
                              <span className="font-medium">{resource.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
