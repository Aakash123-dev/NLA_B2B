'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Rocket } from 'lucide-react';

export const WelcomeSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <Badge className="bg-[#009bcc]/20 text-[#009bcc] border-[#009bcc]/30 px-4 py-2 text-sm font-medium">
            Welcome to Gazelle
          </Badge>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Transform Your Business
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Advanced analytics, pricing optimization, and forecasting tools to drive your business forward
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Rocket className="w-5 h-5 mr-2" />
            Start Free Trial
          </Button>
          <Button variant="outline" className="border-blue-400/40 text-blue-400 hover:!bg-blue-500/10 hover:!text-blue-300 hover:border-blue-300 px-8 py-6 text-lg rounded-xl transition-all duration-300">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
