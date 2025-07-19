'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Target, TrendingUp, Activity } from 'lucide-react';

export default function DemoProjects() {
  const demoProjects = [
    {
      icon: DollarSign,
      title: 'Pricing Analytics',
      description: 'Advanced pricing strategies and market analysis',
      gradient: 'from-blue-500 to-blue-600',
      stats: [
        { label: 'views', value: '15.6K' },
        { label: 'users', value: '8.2K' },
        { label: 'engagement', value: '42%', highlight: true }
      ]
    },
    {
      icon: Target,
      title: 'TPO Framework',
      description: 'Time, Price, and Opportunity optimization',
      gradient: 'from-purple-500 to-purple-600',
      stats: [
        { label: 'views', value: '12.4K' },
        { label: 'users', value: '5.7K' },
        { label: 'retention', value: '78%', highlight: true }
      ]
    },
    {
      icon: TrendingUp,
      title: 'Market Forecast',
      description: 'Predictive analytics and trend forecasting',
      gradient: 'from-emerald-500 to-emerald-600',
      stats: [
        { label: 'views', value: '9.3K' },
        { label: 'users', value: '4.1K' },
        { label: 'shares', value: '526', highlight: true }
      ]
    },
    {
      icon: Activity,
      title: 'Business Simulations',
      description: 'Scenario modeling and risk assessment',
      gradient: 'from-orange-500 to-orange-600',
      stats: [
        { label: 'views', value: '7.8K' },
        { label: 'users', value: '3.5K' },
        { label: 'revisits', value: '89%', highlight: true }
      ]
    }
  ];

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Projects</h2>
        <p className="text-gray-600">Explore our advanced analytics and optimization tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {demoProjects.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center mb-3`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  {project.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{stat.label}</span>
                      <span className={`text-sm font-bold ${stat.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-[#009bcc] hover:bg-[#007ba3] text-white">
                  Explore Project
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
