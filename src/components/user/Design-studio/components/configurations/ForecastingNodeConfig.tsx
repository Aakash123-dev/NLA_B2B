'use client';

import React from 'react';
import { NodeConfigWrapper } from './NodeConfigWrapper';
import { NodeConfigProps } from '../../types';

export function ForecastingNodeConfig({ nodeId, nodeType, nodeName, onClose }: NodeConfigProps) {
  return (
    <NodeConfigWrapper 
      nodeId={nodeId} 
      nodeType={nodeType} 
      nodeName={nodeName} 
      onClose={onClose}
    >
      <div className="p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Forecasting Configuration</h3>
          <p className="text-slate-500">This configuration panel is under development.</p>
        </div>
      </div>
    </NodeConfigWrapper>
  );
}
