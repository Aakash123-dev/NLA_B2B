import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target,
  Search
} from 'lucide-react';
import { TemplateFormData, Project } from '../types';

interface AppliedProjectsSectionProps {
  formData: TemplateFormData;
  filteredProjects: Project[];
  mockProjects: Project[];
  projectSearchQuery: string;
  selectedProjectType: string;
  selectedProjectStatus: string;
  projectTypes: string[];
  onInputChange: (field: keyof TemplateFormData, value: any) => void;
  onProjectToggle: (projectId: string, checked: boolean) => void;
  setProjectSearchQuery: (query: string) => void;
  setSelectedProjectType: (type: string) => void;
  setSelectedProjectStatus: (status: string) => void;
}

export function AppliedProjectsSection({
  formData,
  filteredProjects,
  mockProjects,
  projectSearchQuery,
  selectedProjectType,
  selectedProjectStatus,
  projectTypes,
  onInputChange,
  onProjectToggle,
  setProjectSearchQuery,
  setSelectedProjectType,
  setSelectedProjectStatus
}: AppliedProjectsSectionProps) {
  
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Applied Projects
            <Badge variant="outline" className="ml-2 text-xs">
              {formData.appliedProjects.length} selected
            </Badge>
          </CardTitle>
          <div className="text-sm text-gray-500">
            {filteredProjects.length} of {mockProjects.length} projects
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Search and select projects to apply this template configuration to.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and Filter Controls */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects by name..."
                value={projectSearchQuery}
                onChange={(e) => setProjectSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {projectTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedProjectStatus} onValueChange={setSelectedProjectStatus}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Selection Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onInputChange('appliedProjects', filteredProjects.map(p => p.id))}
              className="text-xs"
            >
              Select All Filtered
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onInputChange('appliedProjects', [])}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-2 max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="flex items-center space-x-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                <Checkbox
                  id={project.id}
                  checked={formData.appliedProjects.includes(project.id)}
                  onCheckedChange={(checked) => onProjectToggle(project.id, checked as boolean)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <div className="flex-1 min-w-0">
                  <label htmlFor={project.id} className="text-sm font-medium cursor-pointer text-gray-900 truncate block">
                    {project.name}
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-2 py-1 ${
                        project.type === 'Marketing' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                        project.type === 'Product' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        project.type === 'Sales' ? 'bg-green-50 text-green-700 border-green-200' :
                        project.type === 'Operations' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        project.type === 'Finance' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        project.type === 'HR' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {project.type}
                    </Badge>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-sm">
                {projectSearchQuery || selectedProjectType !== 'all' || selectedProjectStatus !== 'all'
                  ? 'Try adjusting your search criteria or filters.'
                  : 'No projects are available to select.'}
              </p>
            </div>
          )}
        </div>

        {/* Selected Projects Summary */}
        {formData.appliedProjects.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Selected Projects ({formData.appliedProjects.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {formData.appliedProjects.slice(0, 5).map(projectId => {
                const project = mockProjects.find(p => p.id === projectId);
                return project ? (
                  <Badge key={projectId} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    {project.name}
                  </Badge>
                ) : null;
              })}
              {formData.appliedProjects.length > 5 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  +{formData.appliedProjects.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
