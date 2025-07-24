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
  AlertTriangle
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

// Import modular components
import UsageCard from './UsageCard';
import PlanCard from './PlanCard';
import { formatCurrency, formatDate, getStatusBadge, isTrialActive, getDaysUntilExpiry } from './utils';

export default function UserSubscriptionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [showPlanChangeDialog, setShowPlanChangeDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showTrialInfoDialog, setShowTrialInfoDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [changePreview, setChangePreview] = useState<SubscriptionChangePreview | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      const [subData, plansData] = await Promise.all([
        SubscriptionService.getCurrentSubscription(),
        SubscriptionService.getPlans()
      ]);
      
      setSubscription(subData);
      setPlans(plansData);
    } catch (error) {
      console.error('Error loading subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = async () => {
    if (!selectedPlan) return;
    
    try {
      const updatedSubscription = await SubscriptionService.changePlan(selectedPlan);
      setSubscription(updatedSubscription);
      setShowPlanChangeDialog(false);
      setSelectedPlan('');
      setChangePreview(null);
      
      toast({
        title: "Plan Changed Successfully",
        description: `Your subscription has been updated to ${updatedSubscription.plan.name}.`,
      });
    } catch (error) {
      console.error('Error changing plan:', error);
      toast({
        title: "Error",
        description: "Failed to change subscription plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const updatedSubscription = await SubscriptionService.cancelSubscription(true);
      setSubscription(updatedSubscription);
      setShowCancelDialog(false);
      
      toast({
        title: "Subscription Canceled",
        description: "Your subscription will be canceled at the end of the current billing period.",
      });
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      const updatedSubscription = await SubscriptionService.reactivateSubscription();
      setSubscription(updatedSubscription);
      
      toast({
        title: "Subscription Reactivated",
        description: "Your subscription has been successfully reactivated.",
      });
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to reactivate subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const previewPlanChange = async (planId: string) => {
    try {
      const preview = await SubscriptionService.previewSubscriptionChange(planId);
      setChangePreview(preview);
    } catch (error) {
      console.error('Error previewing plan change:', error);
      toast({
        title: "Error",
        description: "Failed to preview plan change. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusConfig = (status: string) => {
    const config = getStatusBadge(status);
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const isTrialSubscription = subscription ? isTrialActive(subscription) : false;
  const trialDaysLeft = subscription?.trialEnd ? getDaysUntilExpiry(subscription.trialEnd) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse mx-auto"></div>
          <p className="text-slate-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
            <CreditCard className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">No Active Subscription</h1>
          <p className="text-slate-600">You don't have an active subscription. Choose a plan to get started.</p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            View Available Plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Subscription Management</h1>
              <p className="text-slate-600">Manage your subscription and usage</p>
            </div>
          </div>

          {/* Trial Alert */}
          {isTrialSubscription && trialDaysLeft > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Trial Active - {trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''} remaining
                    </p>
                    <p className="text-sm text-blue-700">
                      Your trial expires on {subscription?.trialEnd && formatDate(subscription.trialEnd)}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowTrialInfoDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Info className="w-3 h-3 mr-1" />
                  Learn More
                </Button>
              </div>
            </div>
          )}

          {/* Cancellation Alert */}
          {subscription?.cancelAtPeriodEnd && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Subscription Cancellation Scheduled</p>
                    <p className="text-sm text-orange-700">
                      Your subscription will end on {formatDate(subscription.currentPeriodEnd)}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleReactivateSubscription}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <RefreshCcw className="w-3 h-3 mr-1" />
                  Reactivate
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Plan</p>
                  <p className="text-2xl font-bold text-slate-900">{subscription.plan.name}</p>
                </div>
                <Crown className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Monthly Cost</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(
                      subscription.billingCycle === 'monthly' 
                        ? subscription.plan.price.monthly 
                        : subscription.plan.price.yearly / 12
                    )}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Next Billing</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatDate(subscription.currentPeriodEnd).split(',')[0]}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Status</p>
                  <div className="mt-1">{getStatusConfig(subscription.status)}</div>
                </div>
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm p-1 rounded-xl shadow-lg">
              <TabsTrigger 
                value="overview"
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:via-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <BarChart3 className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-blue-700 transition-colors duration-300">Overview</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="usage"
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:via-green-50 hover:to-teal-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:via-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <TrendingUp className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-emerald-700 transition-colors duration-300">Usage</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="plans"
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-50 hover:via-violet-50 hover:to-fuchsia-50 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:via-violet-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white data-[state=active]:shadow-2xl group"
              >
                <Package className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-600 group-data-[state=active]:text-white" />
                <span className="hidden sm:inline font-medium group-hover:text-purple-700 transition-colors duration-300">Plans</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Current Plan Details */}
                <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>Current Plan</span>
                    </CardTitle>
                    <CardDescription>Your active subscription details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{subscription.plan.name}</h3>
                        <p className="text-slate-600">{subscription.plan.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">
                          {formatCurrency(
                            subscription.billingCycle === 'monthly' 
                              ? subscription.plan.price.monthly 
                              : subscription.plan.price.yearly
                          )}
                        </p>
                        <p className="text-sm text-slate-600">per {subscription.billingCycle === 'monthly' ? 'month' : 'year'}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Plan Features</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {subscription.plan.features.map((feature) => (
                          <div key={feature.id} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-slate-700">{feature.name}</span>
                            {feature.limit && !feature.unlimited && (
                              <Badge variant="outline" className="ml-auto">
                                {feature.limit} {feature.name.toLowerCase()}
                              </Badge>
                            )}
                            {feature.unlimited && (
                              <Badge variant="outline" className="ml-auto bg-green-50 text-green-700">
                                Unlimited
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => setShowPlanChangeDialog(true)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Upgrade Plan
                      </Button>
                      
                      {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
                        <Button 
                          variant="outline" 
                          onClick={() => setShowCancelDialog(true)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      )}
                      
                      {subscription.cancelAtPeriodEnd && (
                        <Button 
                          onClick={handleReactivateSubscription}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <RefreshCcw className="w-4 h-4 mr-2" />
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="space-y-6">
              <UsageCard subscription={subscription} />
            </TabsContent>

            {/* Plans Tab */}
            <TabsContent value="plans" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    currentSubscription={subscription}
                    onSelectPlan={(planId) => {
                      setSelectedPlan(planId);
                      previewPlanChange(planId);
                      setShowPlanChangeDialog(true);
                    }}
                    isCurrentPlan={plan.id === subscription.planId}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Plan Change Dialog */}
        <Dialog open={showPlanChangeDialog} onOpenChange={setShowPlanChangeDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Subscription Plan</DialogTitle>
              <DialogDescription>
                {changePreview && (
                  <div className="space-y-3 mt-3">
                    <p>You're changing from <strong>{subscription.plan.name}</strong> to <strong>{changePreview.newPlan.name}</strong>.</p>
                    {changePreview.prorationAmount > 0 && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm">
                          <strong>Proration Credit:</strong> {formatCurrency(changePreview.prorationAmount)}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          This will be applied to your next invoice.
                        </p>
                      </div>
                    )}
                    <div className="text-sm text-slate-600">
                      <p><strong>Effective Date:</strong> {formatDate(changePreview.effectiveDate)}</p>
                      <p><strong>Next Billing:</strong> {formatDate(changePreview.nextBillingDate)}</p>
                    </div>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowPlanChangeDialog(false);
                  setSelectedPlan('');
                  setChangePreview(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePlanChange}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Confirm Change
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Trial Information Dialog */}
        <Dialog open={showTrialInfoDialog} onOpenChange={setShowTrialInfoDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>Trial Information</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Your Trial is Active</h3>
                <p className="text-slate-600">
                  You have <strong>{trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''}</strong> remaining in your free trial.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">What happens when my trial ends?</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Your account will be automatically upgraded to a paid plan</li>
                  <li>• You'll be charged based on your selected billing cycle</li>
                  <li>• All your data and settings will be preserved</li>
                  <li>• You can cancel anytime before the trial ends</li>
                </ul>
              </div>
            </div>
            <DialogFooter className="flex-col space-y-2">
              <Button 
                onClick={() => {
                  setShowTrialInfoDialog(false);
                  setActiveTab('plans');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Choose Your Plan
              </Button>
              <Button variant="outline" onClick={() => setShowTrialInfoDialog(false)} className="w-full">
                Continue Trial
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Subscription Dialog */}
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>Are you sure you want to cancel your subscription?</p>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">
                    Your subscription will remain active until <strong>{formatDate(subscription.currentPeriodEnd)}</strong>, 
                    after which you'll lose access to all premium features.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCancelSubscription}
                className="bg-red-600 hover:bg-red-700"
              >
                Cancel Subscription
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

