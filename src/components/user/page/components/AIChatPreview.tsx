'use client';

import { Brain, Sparkles } from 'lucide-react';

const AIChatPreview = () => {
  return (
    <div className="bg-[#0C0E22]/60 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-500/20">
        <div className="w-10 h-10 bg-[#009bcc] rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[#009bcc]">Gazelle AI</h4>
          <p className="text-sm text-gray-400">Your Business Intelligence Assistant</p>
        </div>
        <div className="ml-auto">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs font-semibold text-white">
            You
          </div>
          <div className="bg-gray-700 rounded-lg p-3 text-sm text-white max-w-[80%]">
            What are the top pricing opportunities for my coffee products?
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div className="bg-blue-500/20 rounded-lg p-3 text-sm text-white max-w-[80%]">
            Based on your data analysis, I've identified 3 key opportunities:
            <br />
            <br />
            🎯 <strong>Premium Blend pricing</strong> can be increased by 8-12%
            <br />
            📈 <strong>Seasonal promotions</strong> show 24% higher conversion
            <br />
            🔄 <strong>Dynamic pricing</strong> could boost revenue by $1.2M annually
            <br />
            <br />
            Would you like me to create a detailed optimization plan?
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Sparkles className="w-3 h-3" />
          <span>AI is typing...</span>
        </div>
      </div>
    </div>
  );
};

export default AIChatPreview;
