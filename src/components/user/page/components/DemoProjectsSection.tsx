'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { demoProjects } from '../data/mockData';

export const DemoProjectsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Demo Projects
          </h2>
          <p className="text-xl text-gray-300">
            Explore our advanced analytics and optimization tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {demoProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Card 
                key={project.id} 
                className={`bg-[#0C0E22]/80 backdrop-blur-sm border-${project.borderColor}/20 hover:border-${project.borderColor}/40 transition-all duration-300 hover:shadow-2xl hover:shadow-${project.borderColor}/20 rounded-2xl group`}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${project.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${project.borderColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{project.title}</CardTitle>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(project.data).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className={`text-${project.borderColor} font-semibold`}>{value}</div>
                          <div className="text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full bg-${project.borderColor}/10 hover:bg-${project.borderColor}/20 text-${project.borderColor} rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-${project.borderColor}/10`}>
                      Explore Project
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

export default DemoProjectsSection;
