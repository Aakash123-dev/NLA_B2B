'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Brain, MessageSquare, Wand2, Cpu, Lightbulb, Bot, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import AIFeatureCard from './AIFeatureCard';
import AIChatPreview from './AIChatPreview';

export const GazelleAISection = () => {
  const aiFeatures = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "AI-powered data analysis that uncovers hidden patterns and insights in your business metrics",
      features: [
        "Automated trend detection",
        "Predictive forecasting",
        "Anomaly identification"
      ],
      colorClass: "blue-500"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Chat with Gazelle AI to get instant answers, strategic advice, and personalized recommendations",
      features: [
        "Natural language queries",
        "Strategic recommendations",
        "Real-time insights"
      ],
      colorClass: "purple-500"
    },
    {
      icon: Wand2,
      title: "Auto Optimization",
      description: "Let AI continuously optimize your pricing, promotions, and business strategies automatically",
      features: [
        "Dynamic pricing",
        "Campaign optimization",
        "Resource allocation"
      ],
      colorClass: "cyan-500"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-amber-200">
              <Brain className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(255,215,0,0.3)]">
            Meet Gazelle AI
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your elite business intelligence partner powered by cutting-edge AI technology. Unlock premium insights,
            advanced predictive analytics, and gold-standard recommendations to elevate your business to new heights.
          </p>
          <Badge className="bg-amber-500/20 text-amber-500 border-amber-400/50 px-6 py-2 text-lg font-medium shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            ✨ Premium AI Intelligence
          </Badge>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aiFeatures.map((feature, index) => (
            <AIFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              colorClass={feature.colorClass}
            />
          ))}
        </div>

        {/* AI Demo Section */}
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-600/10 rounded-3xl p-12 border border-amber-500/20 backdrop-blur-sm shadow-[0_0_25px_rgba(255,215,0,0.15)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Experience AI-Powered Business Intelligence
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Ask Gazelle AI anything about your business data and get instant, actionable insights. 
                From pricing strategies to market analysis, your AI assistant is ready to help.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mt-1">
                    <Cpu className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Advanced Machine Learning</h4>
                    <p className="text-gray-400">Trained on extensive business data and market patterns</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mt-1">
                    <Lightbulb className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Contextual Understanding</h4>
                    <p className="text-gray-400">Understands your business context and industry specifics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center mt-1">
                    <Bot className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">24/7 Availability</h4>
                    <p className="text-gray-400">Always ready to assist with immediate responses</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/user/gazelle-ai">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-xl group shadow-lg hover:shadow-xl transition-all duration-300">
                    <Brain className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Try Gazelle AI Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-blue-400/40 text-blue-400 hover:!bg-blue-500/10 hover:!text-blue-300 hover:border-blue-300 px-8 py-6 text-lg rounded-xl transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch AI Demo
                </Button>
              </div>
            </div>
            
            {/* AI Chat Preview */}
            <AIChatPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GazelleAISection;
