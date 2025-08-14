'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Database, Check, X, AlertCircle, ArrowRight, Settings } from 'lucide-react';

// Step Components
import ApiConfigStep from './steps/ApiConfigStep';
import SanityCheck from './steps/SanityCheck';
import RenameFields from './steps/RenameFields';
import Conditions from './steps/Conditions';

export default function ConfigImport() {
  const [currentStep, setCurrentStep] = useState(0);
  const [apiConfigured, setApiConfigured] = useState(false);
  
  const steps = [
    { id: 'api-config', label: 'API Configuration', component: <ApiConfigStep onApiConfigured={() => setApiConfigured(true)} /> },
    { id: 'sanity-check', label: 'Sanity Check', component: <SanityCheck /> },
    { id: 'rename-fields', label: 'Rename Fields', component: <RenameFields /> },
    { id: 'conditions', label: 'Conditions', component: <Conditions /> },
  ];
  
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm bg-white w-full">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-xl font-bold text-purple-700 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          API Import
        </CardTitle>
        <CardDescription className="text-gray-600">
          Import your database using API configuration settings
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 bg-white">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      ${index < currentStep 
                        ? 'bg-green-500 text-white' 
                        : index === currentStep 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 text-gray-600'}`}
                  >
                    {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-xs mt-1 hidden md:block text-gray-700">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="min-h-[400px] md:min-h-[500px]">
          {steps[currentStep].component}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t border-gray-200 bg-white">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className="border-gray-300 text-gray-700"
        >
          Previous
        </Button>
        <Button
          onClick={goToNextStep}
          disabled={currentStep === 0 && !apiConfigured}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          {currentStep !== steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
