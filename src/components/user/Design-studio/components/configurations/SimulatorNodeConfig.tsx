'use client';

import React from 'react';
import { NodeConfigWrapper } from './NodeConfigWrapper';
import { NodeConfigProps } from '../../types';
import { Button } from '@/components/ui/button';
import { Settings, Play, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SimulatorNodeConfig({ nodeId, nodeType, nodeName, onClose }: NodeConfigProps) {
  const router = useRouter();

  const handleConfigureSimulator = () => {
    // Get URL parameters and preserve them when navigating to simulator
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    // Navigate to simulator page
    router.push(`/user/simulator?${params.toString()}`);
    onClose();
  };

  return (
    <NodeConfigWrapper 
      nodeId={nodeId} 
      nodeType={nodeType} 
      nodeName={nodeName} 
      onClose={onClose}
    >
      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Simulator Configuration</h3>
          <p className="text-gray-600 mb-6">
            Launch the pricing and scenario simulator to run advanced simulations and analyze different pricing strategies.
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            <Button
              onClick={handleConfigureSimulator}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            >
              <Settings className="w-5 h-5" />
              Configure Simulator
            </Button>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-700">Scenarios</span>
                </div>
                <p className="text-xs text-red-600">Run multiple pricing scenarios</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Analysis</span>
                </div>
                <p className="text-xs text-orange-600">Detailed margin analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NodeConfigWrapper>
  );
}
