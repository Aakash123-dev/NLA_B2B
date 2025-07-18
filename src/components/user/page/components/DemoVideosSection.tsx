'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ChevronRight, Users } from 'lucide-react';
import { demoVideos } from '../data/mockData';

export const DemoVideosSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Demo Videos
          </h2>
          <p className="text-xl text-gray-300">
            Learn from our expert tutorials and guides
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoVideos.map((video, index) => {
            const colors = [
              { bg: 'from-blue-500/20 to-indigo-500/20', accent: 'blue-500', border: 'blue-500/20' },
              { bg: 'from-purple-500/20 to-violet-500/20', accent: 'purple-500', border: 'purple-500/20' },
              { bg: 'from-emerald-500/20 to-teal-500/20', accent: 'emerald-500', border: 'emerald-500/20' }
            ];
            const colorScheme = colors[index % colors.length];
            
            return (
              <Card 
                key={video.id} 
                className={`bg-[#0C0E22]/80 backdrop-blur-sm border-${colorScheme.border} hover:border-${colorScheme.accent}/40 transition-all duration-300 hover:shadow-2xl hover:shadow-${colorScheme.accent}/20 rounded-2xl overflow-hidden group`}
              >
                <div className="relative">
                  <div className={`aspect-video bg-gradient-to-br ${colorScheme.bg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <Button className={`bg-${colorScheme.accent} hover:bg-${colorScheme.accent}/80 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                    {video.duration}
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-${colorScheme.accent}/20 text-${colorScheme.accent} border-${colorScheme.accent}/30 backdrop-blur-sm`}>
                      {video.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{video.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {video.views} views
                    </span>
                    <Button variant="ghost" className={`text-${colorScheme.accent} hover:text-${colorScheme.accent}/80 hover:bg-${colorScheme.accent}/10 p-2 rounded-lg transition-all duration-300`}>
                      Watch Now <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
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

export default DemoVideosSection;
