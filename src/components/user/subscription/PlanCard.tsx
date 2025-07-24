import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  CheckCircle, 
  TrendingUp, 
  Package 
} from 'lucide-react';
import { SubscriptionPlan, UserSubscription } from '@/types/subscription';
import { formatCurrency, getPlanTier, calculateSavings } from './utils';

interface PlanCardProps {
  plan: SubscriptionPlan;
  currentSubscription: UserSubscription;
  onSelectPlan: (planId: string) => void;
  isCurrentPlan: boolean;
}

export default function PlanCard({ plan, currentSubscription, onSelectPlan, isCurrentPlan }: PlanCardProps) {
  const savings = calculateSavings(plan.price.monthly, plan.price.yearly);
  const tierConfig = getPlanTier(plan.tier);

  return (
    <Card 
      className={`bg-white/60 backdrop-blur-sm border-0 shadow-lg transition-all hover:shadow-xl hover:scale-105 ${
        isCurrentPlan 
          ? 'ring-2 ring-blue-500 bg-blue-50/80' 
          : ''
      } ${plan.popular ? 'relative overflow-hidden' : ''}`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          <Star className="w-3 h-3 inline mr-1" />
          Most Popular
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <Badge className={tierConfig.className}>{tierConfig.label}</Badge>
          </div>
          {isCurrentPlan && (
            <Badge className="bg-green-100 text-green-800">Current Plan</Badge>
          )}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-slate-900">
              {formatCurrency(plan.price.monthly)}
            </span>
            <span className="text-sm text-slate-600">/month</span>
          </div>
          
          <div className="text-sm space-y-1">
            <p className="text-slate-600">
              {formatCurrency(plan.price.yearly)} billed annually
            </p>
            {savings.percentage > 0 && (
              <p className="text-green-600 font-medium">
                Save {savings.percentage}% with annual billing
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800">What's included:</h4>
          <div className="space-y-2">
            {plan.features.slice(0, 5).map((feature) => (
              <div key={feature.id} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-slate-700">{feature.name}</span>
                  {feature.limit && !feature.unlimited && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {feature.limit} {feature.name.toLowerCase()}
                    </Badge>
                  )}
                  {feature.unlimited && (
                    <Badge variant="outline" className="ml-2 text-xs bg-green-50 text-green-700">
                      Unlimited
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            {plan.features.length > 5 && (
              <p className="text-xs text-slate-500 pl-6">
                +{plan.features.length - 5} more features
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          {!isCurrentPlan ? (
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={() => onSelectPlan(plan.id)}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {plan.price.monthly > currentSubscription.plan.price.monthly ? 'Upgrade' : 'Downgrade'} to {plan.name}
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              <Package className="w-4 h-4 mr-2" />
              Current Plan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
