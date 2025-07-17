'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Layers, Rocket, Zap } from 'lucide-react';

export const ProjectCreationSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Create Your Project
          </h2>
          <p className="text-xl text-gray-300">
            Start building your next big idea with our comprehensive project creation tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#0C0E22]/80 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl p-8 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quick Start</h3>
              <p className="text-gray-400 mb-6">Use our templates to get started quickly</p>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Rocket className="w-5 h-5 mr-2" />
                Create Project
              </Button>
            </div>
          </Card>
          <Card className="bg-[#0C0E22]/80 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 rounded-2xl p-8 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Custom Build</h3>
              <p className="text-gray-400 mb-6">Build from scratch with full customization</p>
              <Button variant="outline" className="border-purple-500/30 text-purple-500 hover:!bg-purple-500/10 hover:!text-purple-300 hover:border-purple-400 px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <Zap className="w-5 h-5 mr-2" />
                Advanced Setup
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectCreationSection;
