import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Brain,
  BarChart3,
  Target,
  Calculator,
  Lightbulb,
  Globe,
  Shield,
  FileText,
  Database,
  Cpu,
  Layers,
  LineChart,
  Gauge,
  GitCompare
} from 'lucide-react';

export const demoProjects = [
  {
    id: 1,
    title: 'Pricing Analytics',
    description: 'Advanced pricing strategies and market analysis',
    icon: DollarSign,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'blue-500',
    data: { views: '15.6K', users: '8.2K', engagement: '42%' }
  },
  {
    id: 2,
    title: 'TPO Framework',
    description: 'Time, Price, and Opportunity optimization',
    icon: Clock,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'purple-500',
    data: { views: '12.4K', users: '5.7K', retention: '78%' }
  },
  {
    id: 3,
    title: 'Market Forecast',
    description: 'Predictive analytics and trend forecasting',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'emerald-500',
    data: { views: '9.3K', users: '4.1K', shares: '526' }
  },
  {
    id: 4,
    title: 'Business Simulations',
    description: 'Scenario modeling and risk assessment',
    icon: Brain,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'cyan-500',
    data: { views: '7.8K', users: '3.5K', revisits: '62%' }
  }
];

export const demoVideos = [
  {
    id: 1,
    title: 'Strategy Masterclass',
    description: 'Learn advanced business techniques',
    thumbnail: '/api/placeholder/300/200',
    duration: '12:34',
    views: '1.2K',
    category: 'Strategy'
  },
  {
    id: 2,
    title: 'TPO Implementation Guide',
    description: 'Step-by-step TPO framework setup',
    thumbnail: '/api/placeholder/300/200',
    duration: '8:45',
    views: '856',
    category: 'TPO'
  },
  {
    id: 3,
    title: 'Market Forecasting Basics',
    description: 'Understanding predictive analytics',
    thumbnail: '/api/placeholder/300/200',
    duration: '15:22',
    views: '2.1K',
    category: 'Forecast'
  }
];

export const allProducts = [
  {
    id: 1,
    name: 'Analytics Pro',
    description: 'Advanced analytics and reporting suite',
    icon: BarChart3,
    features: ['Real-time analytics', 'Custom dashboards', 'API access'],
    popular: true
  },
  {
    id: 2,
    name: 'Forecast Engine',
    description: 'AI-powered forecasting and predictions',
    icon: Brain,
    features: ['ML predictions', 'Trend analysis', 'Risk assessment']
  },
  {
    id: 3,
    name: 'Simulation Studio',
    description: 'Business scenario modeling platform',
    icon: Target,
    features: ['Monte Carlo', 'Scenario testing', 'Risk modeling']
  },
  {
    id: 4,
    name: 'Business Optimizer',
    description: 'Dynamic business optimization',
    icon: Calculator,
    features: ['Resource optimization', 'Competitor analysis', 'A/B testing']
  },
  {
    id: 5,
    name: 'Market Intelligence',
    description: 'Global market insights and analytics',
    icon: Globe,
    features: ['Market trends', 'Competitor tracking', 'Regional analysis'],
    popular: false
  },
  {
    id: 6,
    name: 'Data Shield',
    description: 'Enterprise-grade security for your data',
    icon: Shield,
    features: ['End-to-end encryption', 'Access controls', 'Compliance tools']
  },
  {
    id: 7,
    name: 'Report Master',
    description: 'Comprehensive reporting platform',
    icon: FileText,
    features: ['Custom templates', 'Scheduled reports', 'Export options']
  },
  {
    id: 8,
    name: 'Data Warehouse',
    description: 'Scalable storage for business intelligence',
    icon: Database,
    features: ['Cloud storage', 'Fast queries', 'Data integration'],
    popular: true
  },
  {
    id: 9,
    name: 'AI Insights',
    description: 'Smart analytics with machine learning',
    icon: Lightbulb,
    features: ['Predictive insights', 'Pattern detection', 'Smart alerts']
  },
  {
    id: 10,
    name: 'Processing Engine',
    description: 'High-performance data processing',
    icon: Cpu,
    features: ['Batch processing', 'Stream analytics', 'Low latency']
  },
  {
    id: 11,
    name: 'Integration Suite',
    description: 'Connect all your business systems',
    icon: Layers,
    features: ['API connectors', 'Custom workflows', 'No-code tools'],
    popular: true
  },
  {
    id: 12,
    name: 'Performance Monitor',
    description: 'Track KPIs and business metrics',
    icon: Gauge,
    features: ['Real-time dashboards', 'Alerts & notifications', 'Goal tracking']
  },
  {
    id: 13,
    name: 'Simulator Comparison',
    description: 'Compare promo and price simulation scenarios',
    icon: GitCompare,
    features: ['Multi-scenario analysis', 'Performance metrics', 'Side-by-side comparison'],
    popular: true
  }
];

export const faqs = [
  {
    id: 1,
    question: 'How do I get started with business analytics?',
    answer: 'Start with our demo project to explore business strategies. Our guided tutorials will help you understand market dynamics and implement effective business models.'
  },
  {
    id: 2,
    question: 'What is the TPO framework?',
    answer: 'TPO (Time, Process, Opportunity) is our proprietary framework that helps optimize business decisions by analyzing the relationship between timing, process efficiency, and market opportunities.'
  },
  {
    id: 3,
    question: 'How accurate are the forecasting models?',
    answer: 'Our AI-powered forecasting models achieve 87% accuracy on average, with continuous learning and improvement based on real-time market data.'
  },
  {
    id: 4,
    question: 'Can I integrate with my existing systems?',
    answer: 'Yes! All our products offer comprehensive API access and pre-built integrations with popular business tools and platforms.'
  }
];
