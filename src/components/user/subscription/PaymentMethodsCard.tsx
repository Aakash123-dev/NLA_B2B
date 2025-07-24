import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Edit, 
  Trash2, 
  Plus 
} from 'lucide-react';
import { PaymentMethod } from '@/types/subscription';

interface PaymentMethodsCardProps {
  paymentMethods: PaymentMethod[];
  onAddPaymentMethod: () => void;
  onEditPaymentMethod: (methodId: string) => void;
  onDeletePaymentMethod: (methodId: string) => void;
  onSetDefaultPaymentMethod: (methodId: string) => void;
}

export default function PaymentMethodsCard({ 
  paymentMethods, 
  onAddPaymentMethod,
  onEditPaymentMethod,
  onDeletePaymentMethod,
  onSetDefaultPaymentMethod
}: PaymentMethodsCardProps) {
  const getCardIcon = (brand?: string) => {
    // You can add more card brand icons here
    return <CreditCard className="w-5 h-5 text-slate-600" />;
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Methods</span>
          </div>
          <Button 
            size="sm" 
            onClick={onAddPaymentMethod}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Method
          </Button>
        </CardTitle>
        <CardDescription>Manage your payment methods and billing information</CardDescription>
      </CardHeader>
      <CardContent>
        {paymentMethods.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <CreditCard className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-slate-600">No payment methods added</p>
            <Button 
              size="sm" 
              onClick={onAddPaymentMethod}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Add Your First Payment Method
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div 
                key={method.id} 
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getCardIcon(method.brand)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-slate-900">
                        {method.brand} ending in {method.last4}
                      </p>
                      {method.isDefault && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      Expires {String(method.expiryMonth).padStart(2, '0')}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSetDefaultPaymentMethod(method.id)}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      Set Default
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditPaymentMethod(method.id)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  {!method.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDeletePaymentMethod(method.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
