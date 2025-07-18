'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Building2,
  ChevronLeft,
  TrendingUp,
  Target,
  Workflow,
  PieChart,
  LineChart,
  BarChart,
  Activity,
  Filter,
  GitBranch,
  MousePointer,
  Layers,
  Palette,
  Sparkles,
  Folder
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

export default function UserHelpPage() {
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
      category: 'Design Studio',
      question: 'How do I create my first design workflow?',
      answer: 'Start by dragging tools from the palette on the left onto the canvas. Connect them using the connectors on each node to create your data flow. Double-click any node to configure its settings.',
      helpful: 89,
      tags: ['design-studio', 'workflow', 'getting-started']
    },
    {
      id: '2',
      category: 'Design Studio',
      question: 'How do I connect different nodes in my workflow?',
      answer: 'Click and drag from any connector point (top, right, bottom, left) on a node to another node\'s connector. The system will automatically find the best connection point.',
      helpful: 67,
      tags: ['design-studio', 'connections', 'nodes']
    },
    {
      id: '3',
      category: 'Analytics',
      question: 'How do I interpret my trading insights?',
      answer: 'Visit the Insights section to view AI-generated analysis of your trading patterns. Each insight includes confidence scores, trend analysis, and actionable recommendations.',
      helpful: 78,
      tags: ['insights', 'analytics', 'trading']
    },
    {
      id: '4',
      category: 'Projects',
      question: 'How do I save and organize my work?',
      answer: 'All your work is automatically saved in real-time. Use the Projects section to create folders, rename projects, and collaborate with team members.',
      helpful: 92,
      tags: ['projects', 'save', 'organization']
    },
    {
      id: '5',
      category: 'Simulator',
      question: 'How accurate is the trading simulator?',
      answer: 'Our simulator uses real market data and advanced algorithms to provide 95%+ accuracy. It includes realistic slippage, spread, and market impact modeling.',
      helpful: 84,
      tags: ['simulator', 'accuracy', 'trading']
    },
    {
      id: '6',
      category: 'Output',
      question: 'How do I export my results and reports?',
      answer: 'In the Output section, you can export data in multiple formats (CSV, PDF, Excel). Use the export button and select your preferred format and date range.',
      helpful: 73,
      tags: ['output', 'export', 'reports']
    }
  ]);

  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Design Studio Masterclass',
      type: 'video',
      category: 'Design Studio',
      description: 'Complete walkthrough of building complex trading workflows',
      duration: '25 min',
      level: 'beginner',
      url: '#',
      views: 2840,
      rating: 4.9
    },
    {
      id: '2',
      title: 'Advanced Node Configuration',
      type: 'guide',
      category: 'Design Studio',
      description: 'Deep dive into pricing models and forecasting tools',
      level: 'advanced',
      url: '#',
      views: 1560,
      rating: 4.7
    },
    {
      id: '3',
      title: 'Trading Insights API',
      type: 'api',
      category: 'Development',
      description: 'Programmatic access to AI-generated trading insights',
      level: 'advanced',
      url: '#',
      views: 890,
      rating: 4.8
    },
    {
      id: '4',
      title: 'Portfolio Optimization Tutorial',
      type: 'tutorial',
      category: 'Analytics',
      description: 'Step-by-step guide to optimizing your trading strategies',
      duration: '18 min',
      level: 'intermediate',
      url: '#',
      views: 1940,
      rating: 4.6
    },
    {
      id: '5',
      title: 'Simulator Best Practices',
      type: 'guide',
      category: 'Simulator',
      description: 'Tips and tricks for effective backtesting and simulation',
      level: 'intermediate',
      url: '#',
      views: 1230,
      rating: 4.5
    },
    {
      id: '6',
      title: 'Data Export & Integration',
      type: 'tutorial',
      category: 'Output',
      description: 'Connect your results to external systems and platforms',
      duration: '15 min',
      level: 'beginner',
      url: '#',
      views: 1780,
      rating: 4.4
    }
  ]);

  const [myTickets] = useState<SupportTicket[]>([
    {
      id: 'TK-2001',
      subject: 'Design Studio node connection issue',
      category: 'Technical',
      priority: 'medium',
      status: 'in_progress',
      createdAt: '2024-07-10 14:30:00',
      lastUpdated: '2024-07-11 09:15:00',
      assignedTo: 'Support Agent Alex'
    },
    {
      id: 'TK-2002',
      subject: 'Export functionality not working',
      category: 'Bug',
      priority: 'high',
      status: 'resolved',
      createdAt: '2024-07-09 11:20:00',
      lastUpdated: '2024-07-10 16:45:00',
      assignedTo: 'Support Agent Sam'
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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Link href="/user">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 rounded-md flex items-center gap-1 px-4 shadow-sm hover:shadow transition-all duration-200"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="font-medium">Back to Home Page</span>
                    </Button>
                  </Link>
                </div>
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
                      Get help with your trading workspace and analytics tools
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
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-100/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl cursor-pointer backdrop-blur-sm"
                onClick={() => setActiveTab('faq')}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 group-hover:from-blue-500/10 group-hover:to-indigo-600/10 transition-all duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Browse FAQs</p>
                  <p className="text-xl font-bold text-blue-900">Find Quick Answers</p>
                  <p className="text-sm text-blue-600/80">Common questions about your workspace</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <HelpCircle className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-green-100/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl cursor-pointer backdrop-blur-sm"
                onClick={() => setActiveTab('tickets')}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 group-hover:from-emerald-500/10 group-hover:to-green-600/10 transition-all duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Get Help</p>
                  <p className="text-xl font-bold text-emerald-900">Submit Support Ticket</p>
                  <p className="text-sm text-emerald-600/80">Direct access to our expert team</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50/80 to-violet-100/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl cursor-pointer backdrop-blur-sm"
                onClick={() => setActiveTab('resources')}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-600/5 group-hover:from-purple-500/10 group-hover:to-violet-600/10 transition-all duration-300"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Learning Hub</p>
                  <p className="text-xl font-bold text-purple-900">Tutorials & Guides</p>
                  <p className="text-sm text-purple-600/80">Master your trading workspace</p>
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
          <TabsList className="grid w-full grid-cols-4 h-20 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-slate-200/50">
            <TabsTrigger 
              value="overview" 
              className="flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 hover:bg-blue-50/50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:shadow-md py-4 px-4 h-full"
            >
              <Info className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="faq" 
              className="flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 hover:bg-blue-50/50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:shadow-md py-4 px-4 h-full"
            >
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger 
              value="tickets" 
              className="flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 hover:bg-blue-50/50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:shadow-md py-4 px-4 h-full"
            >
              <MessageSquare className="h-4 w-4" />
              Support
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 hover:bg-blue-50/50 hover:text-blue-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:shadow-md py-4 px-4 h-full"
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
                    <span className="font-bold text-slate-800">Quick Support</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Get help when you need it most</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50/70 rounded-xl border border-blue-100/50 group/item hover:bg-blue-50 transition-all duration-300">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Live Chat</p>
                      <p className="text-sm text-blue-700 font-medium">Available 24/7</p>
                      <p className="text-xs text-blue-600">Instant responses for workspace questions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-emerald-50/70 rounded-xl border border-emerald-100/50 group/item hover:bg-emerald-50 transition-all duration-300">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">Email Support</p>
                      <p className="text-sm text-emerald-700 font-medium">user-support@northlight.com</p>
                      <p className="text-xs text-emerald-600">Response within 4 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50/70 rounded-xl border border-purple-100/50 group/item hover:bg-purple-50 transition-all duration-300">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Book className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-900">Knowledge Base</p>
                      <p className="text-sm text-purple-700 font-medium">Self-service help</p>
                      <p className="text-xs text-purple-600">Guides, tutorials, and best practices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Workspace Topics */}
              <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
                <CardHeader className="bg-gradient-to-r from-amber-50/90 to-orange-50/90 border-b border-amber-100/50 rounded-t-3xl p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-slate-800">Popular Topics</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Most searched workspace help topics</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { icon: Workflow, title: 'Design Studio', desc: 'Creating and managing workflows', color: 'blue' },
                      { icon: TrendingUp, title: 'Trading Insights', desc: 'Understanding AI-generated analysis', color: 'emerald' },
                      { icon: Target, title: 'Simulator', desc: 'Backtesting and strategy validation', color: 'violet' },
                      { icon: BarChart, title: 'Analytics Output', desc: 'Exporting and interpreting results', color: 'indigo' },
                      { icon: Folder, title: 'Project Management', desc: 'Organizing and sharing work', color: 'slate' },
                      { icon: User, title: 'Profile Settings', desc: 'Account and preferences', color: 'teal' }
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
            </div>

            {/* Workspace Features Guide */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl group hover:shadow-2xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-violet-50/90 to-purple-50/90 border-b border-violet-100/50 rounded-t-3xl p-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800">Workspace Features</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Master your trading workspace capabilities</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Palette,
                      title: 'Design Studio',
                      features: ['Drag & drop workflow builder', 'Node-based connections', 'Real-time collaboration', 'Version control']
                    },
                    {
                      icon: Activity,
                      title: 'Trading Insights',
                      features: ['AI-powered analysis', 'Pattern recognition', 'Risk assessment', 'Performance metrics']
                    },
                    {
                      icon: Target,
                      title: 'Simulator',
                      features: ['Historical backtesting', 'Strategy validation', 'Performance tracking', 'Risk modeling']
                    }
                  ].map((feature, index) => (
                    <div key={index} className="p-5 bg-slate-50/70 rounded-xl border border-slate-100/50 group/feature hover:bg-slate-50 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100/50">
                          <feature.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
                <CardDescription className="text-slate-600">Find answers to common workspace questions</CardDescription>
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
                      <SelectItem value="Design Studio">Design Studio</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Projects">Projects</SelectItem>
                      <SelectItem value="Simulator">Simulator</SelectItem>
                      <SelectItem value="Output">Output</SelectItem>
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
                    <span className="font-bold text-slate-800">Get Support</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Submit a support request for your workspace</CardDescription>
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
                          <SelectItem value="design-studio">Design Studio</SelectItem>
                          <SelectItem value="insights">Trading Insights</SelectItem>
                          <SelectItem value="simulator">Simulator</SelectItem>
                          <SelectItem value="output">Output & Export</SelectItem>
                          <SelectItem value="projects">Projects</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
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
                      placeholder="Please provide detailed information about your workspace issue..."
                    />
                  </div>

                  <Button
                    onClick={handleSubmitTicket}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg rounded-xl font-semibold transition-all duration-300 hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Support Request
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
                    <span className="font-bold text-slate-800">My Support Requests</span>
                  </CardTitle>
                  <CardDescription className="text-slate-600">Track your submitted support tickets</CardDescription>
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
                <CardDescription className="text-slate-600">Master your trading workspace with comprehensive guides and tutorials</CardDescription>
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
