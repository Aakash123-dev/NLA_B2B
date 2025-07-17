'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface AIFeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  colorClass: string;
}

export const AIFeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  colorClass 
}: AIFeatureCardProps) => {
  return (
    <Card className={`bg-[#0C0E22]/80 backdrop-blur-sm border-${colorClass}/20 hover:border-${colorClass}/40 transition-all duration-300 hover:shadow-2xl hover:shadow-${colorClass}/20 rounded-2xl group`}>
      <CardContent className="p-8 text-center">
        <div className={`w-16 h-16 bg-gradient-to-br from-${colorClass}/20 to-${colorClass.split('-')[0]}-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-8 h-8 text-${colorClass}`} />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 mb-6">
          {description}
        </p>
        <ul className="text-sm text-gray-300 space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className={`w-4 h-4 text-${colorClass} mr-2`} />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AIFeatureCard;
