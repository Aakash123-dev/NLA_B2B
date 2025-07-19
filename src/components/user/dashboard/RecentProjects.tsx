'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, MoreHorizontal, Eye } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  category: string;
  status: string;
  progress: number;
  lastUpdated: string;
  roi: number;
  revenue: number;
  color: string;
}

interface RecentProjectsProps {
  projects: Project[];
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in progress': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'planning': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Recent Projects</CardTitle>
            <CardDescription className="text-gray-600">Track your optimization projects and their performance</CardDescription>
          </div>
          <Button className="bg-[#009bcc] hover:bg-[#007ba3] text-white gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div 
              key={`${project.id}-${project.name}`}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-white/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${project.color}-100`}>
                    <FolderOpen className={`w-5 h-5 text-${project.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(project.status)} border`}>
                    {project.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${project.color}-500 h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">ROI</p>
                  <p className="text-lg font-bold text-gray-900">
                    {project.roi > 0 ? `${project.roi}%` : 'TBD'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-gray-900">
                    {project.revenue > 0 ? formatCurrency(project.revenue) : 'TBD'}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                </p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
