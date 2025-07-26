'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Crown, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck,
  Clock,
  BarChart3,
  Package,
  Info,
  Sparkles,
  RefreshCcw,
  AlertTriangle,
  Users,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

import { SubscriptionService } from '@/services/subscriptionServices/subscriptionService';
import { 
  UserSubscription, 
  SubscriptionPlan, 
  SubscriptionChangePreview 
} from '@/types/subscription';

// Import utility functions from user subscription
import { formatCurrency, formatDate, getStatusBadge, isTrialActive, getDaysUntilExpiry } from '@/components/user/subscription/utils';

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [showPlanChangeDialog, setShowPlanChangeDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [changePreview, setChangePreview] = useState<SubscriptionChangePreview | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      const [subscriptionData, plansData] = await Promise.all([
        SubscriptionService.getCurrentSubscription(),
        SubscriptionService.getPlans()
      ]);
      setSubscription(subscriptionData);
      setPlans(plansData);
    } catch (error) {
      console.error('Error loading subscription data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = async (planId: string) => {
    try {
      setIsProcessing(true);
      const preview = await SubscriptionService.previewSubscriptionChange(planId);
      setChangePreview(preview);
      setSelectedPlan(planId);
      setShowPlanChangeDialog(true);
    } catch (error) {
      console.error('Error previewing plan change:', error);
      toast({
        title: "Error",
        description: "Failed to preview plan change",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmPlanChange = async () => {
    try {
      setIsProcessing(true);
      await SubscriptionService.changePlan(selectedPlan);
      toast({
        title: "Success",
        description: "Subscription plan updated successfully",
      });
      setShowPlanChangeDialog(false);
      loadSubscriptionData();
    } catch (error) {
      console.error('Error changing plan:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription plan",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsProcessing(true);
      await SubscriptionService.cancelSubscription();
      toast({
        title: "Success",
        description: "Subscription cancelled successfully",
      });
      setShowCancelDialog(false);
      loadSubscriptionData();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCcw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Company Subscription</h1>
          <p className="text-muted-foreground">
            Manage your organization's subscription and billing
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span className="text-sm font-medium">Dashboard View</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Subscription Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <CardTitle>Current Plan</CardTitle>
                </div>
                {subscription && (
                  <Badge className={getStatusBadge(subscription.status).className}>
                    {getStatusBadge(subscription.status).label}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan Name</p>
                    <p className="text-lg font-semibold">{subscription.plan.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-lg font-semibold">{formatCurrency(subscription.plan.price.monthly)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing</p>
                    <p className="text-lg font-semibold">{formatDate(subscription.currentPeriodEnd)}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
                  <p className="text-muted-foreground mb-4">
                    Your organization doesn't have an active subscription.
                  </p>
                  <Button onClick={() => setActiveTab('plans')}>
                    View Available Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {subscription && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-lg font-semibold">{subscription.usage?.users?.used || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">API Calls</p>
                      <p className="text-lg font-semibold">{subscription.usage?.apiCalls?.used || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Storage Used</p>
                      <p className="text-lg font-semibold">{subscription.usage?.storage?.used || 0} GB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Days Remaining</p>
                      <p className="text-lg font-semibold">
                        {subscription.currentPeriodEnd ? getDaysUntilExpiry(subscription.currentPeriodEnd) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Overview</CardTitle>
              <CardDescription>
                Monitor your organization's usage across all features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Usage analytics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${subscription?.planId === plan.id ? 'ring-2 ring-blue-500' : ''}`}>
                {subscription?.planId === plan.id && (
                  <Badge className="absolute -top-2 -right-2">Current</Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="h-5 w-5" />
                    <span>{plan.name}</span>
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold">
                    {formatCurrency(plan.price.monthly)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  {subscription?.planId !== plan.id && (
                    <Button 
                      className="w-full" 
                      onClick={() => handlePlanChange(plan.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Upgrade to this plan'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage payment methods and billing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4" />
                <p>Billing information will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Plan Change Dialog */}
      <Dialog open={showPlanChangeDialog} onOpenChange={setShowPlanChangeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Plan Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change your subscription plan?
            </DialogDescription>
          </DialogHeader>
          {changePreview && (
            <div className="space-y-4">
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-muted-foreground">{subscription?.plan.name}</p>
                </div>
                <div>
                  <p className="font-medium">New Plan</p>
                  <p className="text-muted-foreground">{changePreview.newPlan.name}</p>
                </div>
                <div>
                  <p className="font-medium">Prorated Amount</p>
                  <p className="text-muted-foreground">{formatCurrency(changePreview.prorationAmount)}</p>
                </div>
                <div>
                  <p className="font-medium">Next Billing</p>
                  <p className="text-muted-foreground">{formatDate(changePreview.nextBillingDate)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanChangeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPlanChange} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Confirm Change'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your subscription? This action cannot be undone and you will lose access to all premium features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelSubscription}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? 'Processing...' : 'Cancel Subscription'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
