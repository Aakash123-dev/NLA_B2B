'use client';

import { Button } from '@/components/ui/button';
import { Rocket, ArrowRight, Zap, Users, CheckCircle } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl p-12 border border-blue-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using our platform to drive growth and optimize their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="border-purple-400/40 text-purple-400 hover:!bg-purple-500/10 hover:!text-purple-300 hover:border-purple-300 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <Users className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
