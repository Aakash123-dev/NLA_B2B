'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Target, 
  Timer, 
  DollarSign,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { NodeConfigWrapper } from './NodeConfigWrapper';
import { NodeConfigProps } from '../../types';

interface TradePlanConfig {
  strategy: 'scalping' | 'day-trading' | 'swing-trading' | 'position-trading';
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';
  riskTolerance: 'low' | 'medium' | 'high';
  maxDrawdown: number;
  targetProfit: number;
  stopLoss: number;
  takeProfit: number;
  positionSize: number;
  currency: string;
  instruments: string[];
  optimization: {
    enabled: boolean;
    algorithm: 'genetic' | 'particle-swarm' | 'random-search' | 'grid-search';
    parameters: string[];
  };
  backtesting: {
    enabled: boolean;
    startDate: string;
    endDate: string;
    capital: number;
  };
  alerts: {
    enabled: boolean;
    channels: ('email' | 'sms' | 'webhook')[];
  };
}

export function TradePlanOptimizationConfig({ nodeId, nodeType, nodeName, onClose }: NodeConfigProps) {
  const [config, setConfig] = useState<TradePlanConfig>({
    strategy: 'day-trading',
    timeframe: '1h',
    riskTolerance: 'medium',
    maxDrawdown: 10,
    targetProfit: 15,
    stopLoss: 2,
    takeProfit: 5,
    positionSize: 10000,
    currency: 'USD',
    instruments: ['EURUSD', 'GBPUSD'],
    optimization: {
      enabled: true,
      algorithm: 'genetic',
      parameters: ['stop_loss', 'take_profit', 'position_size']
    },
    backtesting: {
      enabled: true,
      startDate: '2023-01-01',
      endDate: '2024-01-01',
      capital: 100000
    },
    alerts: {
      enabled: true,
      channels: ['email']
    }
  });

  const strategies = [
    { value: 'scalping', label: 'Scalping', description: 'Quick trades for small profits' },
    { value: 'day-trading', label: 'Day Trading', description: 'Positions closed within the day' },
    { value: 'swing-trading', label: 'Swing Trading', description: 'Positions held for days to weeks' },
    { value: 'position-trading', label: 'Position Trading', description: 'Long-term positions' }
  ];

  const timeframes = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
    { value: '1w', label: '1 Week' }
  ];

  const handleSave = () => {
    // Save configuration logic here
    console.log('Saving trade plan configuration:', config);
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
        <Tabs defaultValue="strategy" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="backtesting">Backtesting</TabsTrigger>
          </TabsList>

          <TabsContent value="strategy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Trading Strategy</span>
                </CardTitle>
                <CardDescription>
                  Configure your trading strategy and basic parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="strategy">Strategy Type</Label>
                    <Select value={config.strategy} onValueChange={(value: any) => setConfig({...config, strategy: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {strategies.map(strategy => (
                          <SelectItem key={strategy.value} value={strategy.value}>
                            <div>
                              <div className="font-medium">{strategy.label}</div>
                              <div className="text-sm text-slate-500">{strategy.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Select value={config.timeframe} onValueChange={(value: any) => setConfig({...config, timeframe: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeframes.map(timeframe => (
                          <SelectItem key={timeframe.value} value={timeframe.value}>
                            {timeframe.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="instruments">Trading Instruments</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {config.instruments.map((instrument, index) => (
                      <Badge key={index} variant="secondary">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                  <Input 
                    className="mt-2"
                    placeholder="Add instrument (e.g., EURUSD)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const value = (e.target as HTMLInputElement).value.trim();
                        if (value && !config.instruments.includes(value)) {
                          setConfig({
                            ...config,
                            instruments: [...config.instruments, value]
                          });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Risk Management</span>
                </CardTitle>
                <CardDescription>
                  Configure risk parameters and position sizing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                    <Select value={config.riskTolerance} onValueChange={(value: any) => setConfig({...config, riskTolerance: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maxDrawdown">Max Drawdown (%)</Label>
                    <Input
                      type="number"
                      value={config.maxDrawdown}
                      onChange={(e) => setConfig({...config, maxDrawdown: parseFloat(e.target.value)})}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                    <Input
                      type="number"
                      value={config.stopLoss}
                      onChange={(e) => setConfig({...config, stopLoss: parseFloat(e.target.value)})}
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="takeProfit">Take Profit (%)</Label>
                    <Input
                      type="number"
                      value={config.takeProfit}
                      onChange={(e) => setConfig({...config, takeProfit: parseFloat(e.target.value)})}
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="positionSize">Position Size</Label>
                    <Input
                      type="number"
                      value={config.positionSize}
                      onChange={(e) => setConfig({...config, positionSize: parseFloat(e.target.value)})}
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetProfit">Target Profit (%)</Label>
                    <Input
                      type="number"
                      value={config.targetProfit}
                      onChange={(e) => setConfig({...config, targetProfit: parseFloat(e.target.value)})}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Strategy Optimization</span>
                </CardTitle>
                <CardDescription>
                  Configure optimization algorithms and parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.optimization.enabled}
                    onCheckedChange={(enabled) => setConfig({
                      ...config,
                      optimization: {...config.optimization, enabled}
                    })}
                  />
                  <Label>Enable Optimization</Label>
                </div>

                {config.optimization.enabled && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="algorithm">Optimization Algorithm</Label>
                      <Select 
                        value={config.optimization.algorithm} 
                        onValueChange={(value: any) => setConfig({
                          ...config,
                          optimization: {...config.optimization, algorithm: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                          <SelectItem value="particle-swarm">Particle Swarm</SelectItem>
                          <SelectItem value="random-search">Random Search</SelectItem>
                          <SelectItem value="grid-search">Grid Search</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Parameters to Optimize</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['stop_loss', 'take_profit', 'position_size', 'timeframe'].map(param => (
                          <div key={param} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={param}
                              checked={config.optimization.parameters.includes(param)}
                              onChange={(e) => {
                                const parameters = e.target.checked
                                  ? [...config.optimization.parameters, param]
                                  : config.optimization.parameters.filter(p => p !== param);
                                setConfig({
                                  ...config,
                                  optimization: {...config.optimization, parameters}
                                });
                              }}
                            />
                            <Label htmlFor={param} className="text-sm">
                              {param.replace('_', ' ').toUpperCase()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backtesting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Backtesting Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure backtesting parameters and historical data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={config.backtesting.enabled}
                    onCheckedChange={(enabled) => setConfig({
                      ...config,
                      backtesting: {...config.backtesting, enabled}
                    })}
                  />
                  <Label>Enable Backtesting</Label>
                </div>

                {config.backtesting.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        type="date"
                        value={config.backtesting.startDate}
                        onChange={(e) => setConfig({
                          ...config,
                          backtesting: {...config.backtesting, startDate: e.target.value}
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        type="date"
                        value={config.backtesting.endDate}
                        onChange={(e) => setConfig({
                          ...config,
                          backtesting: {...config.backtesting, endDate: e.target.value}
                        })}
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="capital">Initial Capital</Label>
                      <Input
                        type="number"
                        value={config.backtesting.capital}
                        onChange={(e) => setConfig({
                          ...config,
                          backtesting: {...config.backtesting, capital: parseFloat(e.target.value)}
                        })}
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </div>
    </NodeConfigWrapper>
  );
}
