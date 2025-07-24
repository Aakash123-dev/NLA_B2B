import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Users, 
  HardDrive, 
  Zap, 
  BarChart3 
} from 'lucide-react';
import { UserSubscription } from '@/types/subscription';
import { getUsagePercentage, formatDate } from './utils';

interface UsageCardProps {
  subscription: UserSubscription;
}

export default function UsageCard({ subscription }: UsageCardProps) {
  const usageItems = [
    {
      icon: Package,
      label: 'Projects',
      used: subscription.usage.projects.used,
      limit: subscription.usage.projects.limit,
      color: 'text-blue-600'
    },
    {
      icon: Users,
      label: 'Team Members',
      used: subscription.usage.users.used,
      limit: subscription.usage.users.limit,
      color: 'text-green-600'
    },
    {
      icon: HardDrive,
      label: 'Storage',
      used: subscription.usage.storage.used,
      limit: subscription.usage.storage.limit,
      color: 'text-purple-600',
      unit: 'GB'
    },
    {
      icon: Zap,
      label: 'API Calls',
      used: subscription.usage.apiCalls.used,
      limit: subscription.usage.apiCalls.limit,
      color: 'text-amber-600',
      resetDate: subscription.usage.apiCalls.resetDate
    }
  ];

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Usage Overview</span>
        </CardTitle>
        <CardDescription>Monitor your current usage across all plan limits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usageItems.map((item) => (
            <div key={item.label} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {item.used.toLocaleString()}{item.unit && ` ${item.unit}`} / {
                    item.limit === 'unlimited' 
                      ? '∞' 
                      : `${item.limit.toLocaleString()}${item.unit ? ` ${item.unit}` : ''}`
                  }
                </span>
              </div>
              
              {item.limit !== 'unlimited' && (
                <div className="space-y-1">
                  <Progress 
                    value={getUsagePercentage(item.used, item.limit)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{getUsagePercentage(item.used, item.limit).toFixed(1)}% used</span>
                    {item.limit - item.used > 0 && (
                      <span>{(item.limit - item.used).toLocaleString()}{item.unit && ` ${item.unit}`} remaining</span>
                    )}
                  </div>
                </div>
              )}
              
              {item.resetDate && (
                <p className="text-xs text-slate-600">
                  Resets on {formatDate(item.resetDate)}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
