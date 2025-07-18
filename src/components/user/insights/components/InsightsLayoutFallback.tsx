import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, DollarSign, Users, RefreshCw, AlertCircle } from 'lucide-react';

interface InsightsLayoutFallbackProps {
  projectId?: string;
  modelId?: string;
  error?: string;
}

export const InsightsLayoutFallback: React.FC<InsightsLayoutFallbackProps> = ({
  projectId = '1009',
  modelId = '1195',
  error
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Insights Dashboard
          </h1>
          <p className="text-gray-600">
            Project: {projectId} | Model: {modelId}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800">{error}</span>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                Total Insights
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">24</div>
              <p className="text-xs text-blue-600">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">
                Revenue Impact
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">$45.2K</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">
                Growth Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">+12.5%</div>
              <p className="text-xs text-purple-600">Above target</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">1,234</div>
              <p className="text-xs text-orange-600">+5% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Insights List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Latest Insights</span>
                </CardTitle>
                <CardDescription>
                  Recent insights for project {projectId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Base Price Analysis', 'Promotional Strategy', 'Market Trends', 'Customer Segmentation'].map((insight, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{insight}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Generated insights based on current data model
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
                <Button className="w-full" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Trends
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <strong>Project ID:</strong> {projectId}
                </div>
                <div className="text-sm">
                  <strong>Model ID:</strong> {modelId}
                </div>
                <div className="text-sm">
                  <strong>Status:</strong> <span className="text-green-600">Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
