'use client';

import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { faqs } from '../data/mockData';

export const FAQSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about our platform
          </p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const colors = ['blue-500', 'purple-500', 'emerald-500', 'cyan-500'];
            const color = colors[index % colors.length];
            
            return (
              <Card 
                key={faq.id} 
                className={`bg-[#0C0E22]/80 backdrop-blur-sm border-${color}/20 hover:border-${color}/40 transition-all duration-300 hover:shadow-xl hover:shadow-${color}/10 rounded-2xl group`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 bg-${color}/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300`}>
                      <HelpCircle className={`w-5 h-5 text-${color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
