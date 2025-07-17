'use client'

import { CanvasNode, Connection } from '@/app/user/design-studio/types'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react'

const optimizationGoals = [
  { id: 'revenue', name: 'Maximize Revenue', icon: DollarSign, description: 'Focus on increasing total revenue' },
  { id: 'profit', name: 'Maximize Profit', icon: TrendingUp, description: 'Optimize for highest profit margins' },
  { id: 'market_share', name: 'Market Share Growth', icon: Target, description: 'Increase market penetration' },
  { id: 'efficiency', name: 'Operational Efficiency', icon: BarChart3, description: 'Improve resource utilization' },
]

const timeHorizons = [
  { id: 'short', name: 'Short Term (1-3 months)', weight: 1.2 },
  { id: 'medium', name: 'Medium Term (3-6 months)', weight: 1.0 },
  { id: 'long', name: 'Long Term (6-12 months)', weight: 0.8 },
]

const constraintTypes = [
  { id: 'budget', name: 'Budget Constraints', icon: DollarSign },
  { id: 'capacity', name: 'Production Capacity', icon: Target },
  { id: 'regulatory', name: 'Regulatory Limits', icon: AlertTriangle },
  { id: 'seasonal', name: 'Seasonal Factors', icon: Calendar },
]

export default function TradePlanOptimizationNodeConfig({
  node,
  nodes,
  connections,
  onOpenNodeTab,
}: {
  node: CanvasNode
  nodes?: CanvasNode[]
  connections?: Connection[]
  onOpenNodeTab?: (nodeId: string) => void
}) {
  const [selectedGoal, setSelectedGoal] = useState('revenue')
  const [timeHorizon, setTimeHorizon] = useState('medium')
  const [riskTolerance, setRiskTolerance] = useState([50])
  const [budgetLimit, setBudgetLimit] = useState('1000000')
  const [targetROI, setTargetROI] = useState('15')
  const [enableMLOptimization, setEnableMLOptimization] = useState(true)
  const [includeSeasonality, setIncludeSeasonality] = useState(true)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationComplete, setOptimizationComplete] = useState(false)
  const [currentScenario, setCurrentScenario] = useState(1)

  const [constraints, setConstraints] = useState([
    { id: 1, type: 'budget', name: 'Marketing Budget', value: '500000', enabled: true },
    { id: 2, type: 'capacity', name: 'Production Limit', value: '10000', enabled: true },
    { id: 3, type: 'regulatory', name: 'Pricing Floor', value: '10', enabled: false },
  ])

  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: 'Conservative Growth',
      description: 'Low risk, steady growth approach',
      projectedROI: 12.5,
      riskScore: 25,
      confidence: 85,
      recommendations: [
        'Increase budget allocation to top-performing channels by 15%',
        'Maintain current pricing strategy with minor adjustments',
        'Focus on customer retention programs'
      ]
    },
    {
      id: 2,
      name: 'Aggressive Expansion',
      description: 'High growth potential with higher risk',
      projectedROI: 22.8,
      riskScore: 75,
      confidence: 68,
      recommendations: [
        'Launch new product lines in Q3',
        'Increase marketing spend by 40%',
        'Expand to 2 new geographic markets'
      ]
    },
    {
      id: 3,
      name: 'Balanced Approach',
      description: 'Moderate risk with solid returns',
      projectedROI: 18.2,
      riskScore: 45,
      confidence: 78,
      recommendations: [
        'Optimize pricing across all channels',
        'Implement dynamic pricing strategy',
        'Increase digital marketing by 25%'
      ]
    }
  ])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isOptimizing && optimizationProgress < 100) {
      timer = setTimeout(() => setOptimizationProgress(optimizationProgress + 3), 150)
    } else if (optimizationProgress >= 100) {
      setIsOptimizing(false)
      setOptimizationComplete(true)
    }
    return () => clearTimeout(timer)
  }, [isOptimizing, optimizationProgress])

  const handleStartOptimization = () => {
    setOptimizationProgress(0)
    setOptimizationComplete(false)
    setIsOptimizing(true)
  }

  const handlePauseOptimization = () => {
    setIsOptimizing(false)
  }

  const handleResetOptimization = () => {
    setOptimizationProgress(0)
    setIsOptimizing(false)
    setOptimizationComplete(false)
  }

  const getGoalIcon = (goalId: string) => {
    const goal = optimizationGoals.find(g => g.id === goalId)
    return goal ? goal.icon : DollarSign
  }

  const getConstraintIcon = (typeId: string) => {
    const constraint = constraintTypes.find(c => c.id === typeId)
    return constraint ? constraint.icon : Target
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-400'
    if (score < 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getConfidenceColor = (score: number) => {
    if (score > 80) return 'text-green-400'
    if (score > 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-foreground">
            {node.name}
            {node.version && ` v${node.version}`} - AI-Powered Trade Plan Optimization
          </CardTitle>
          <CardDescription>
            Advanced machine learning optimization for trade planning and strategy development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="configuration" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="constraints">Constraints</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="configuration" className="space-y-6">
              {/* Primary Objective */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Primary Objective</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {optimizationGoals.map((goal) => {
                    const Icon = goal.icon
                    return (
                      <Card
                        key={goal.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedGoal === goal.id
                            ? 'border-primary bg-primary/10'
                            : 'border-primary/20 bg-background/30 hover:border-primary/40'
                        }`}
                        onClick={() => setSelectedGoal(goal.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <Icon className="h-6 w-6 text-primary mt-1" />
                            <div className="flex-1">
                              <h5 className="font-medium text-foreground">{goal.name}</h5>
                              <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Time Horizon & Risk */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Time Horizon</h4>
                  
                  <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                    <SelectTrigger className="bg-background/50 border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeHorizons.map(horizon => (
                        <SelectItem key={horizon.id} value={horizon.id}>
                          {horizon.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Risk Tolerance</h4>
                  
                  <div className="space-y-3">
                    <Slider
                      value={riskTolerance}
                      onValueChange={setRiskTolerance}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Conservative</span>
                      <span className="font-medium text-foreground">{riskTolerance[0]}%</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Parameters */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Financial Parameters</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-muted-foreground">Budget Limit ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={budgetLimit}
                      onChange={(e) => setBudgetLimit(e.target.value)}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roi" className="text-muted-foreground">Target ROI (%)</Label>
                    <Input
                      id="roi"
                      type="number"
                      value={targetROI}
                      onChange={(e) => setTargetROI(e.target.value)}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Advanced Options</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-foreground">Enable ML Optimization</Label>
                      <p className="text-sm text-muted-foreground">Use machine learning algorithms for optimization</p>
                    </div>
                    <Switch checked={enableMLOptimization} onCheckedChange={setEnableMLOptimization} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-foreground">Include Seasonality</Label>
                      <p className="text-sm text-muted-foreground">Factor in seasonal trends and patterns</p>
                    </div>
                    <Switch checked={includeSeasonality} onCheckedChange={setIncludeSeasonality} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="constraints" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-foreground">Optimization Constraints</h4>
                  <Button variant="outline" className="border-primary/20">
                    <Settings className="w-4 h-4 mr-2" />
                    Add Constraint
                  </Button>
                </div>

                <ScrollArea className="h-80 rounded-md border border-primary/20 bg-background/30">
                  <div className="p-4 space-y-4">
                    {constraints.map(constraint => {
                      const Icon = getConstraintIcon(constraint.type)
                      return (
                        <Card key={constraint.id} className="border-primary/20 bg-background/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Icon className="h-5 w-5 text-primary" />
                                <div>
                                  <h5 className="font-medium text-foreground">{constraint.name}</h5>
                                  <p className="text-sm text-muted-foreground capitalize">{constraint.type.replace('_', ' ')}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Input
                                  value={constraint.value}
                                  onChange={(e) => {
                                    setConstraints(constraints.map(c => 
                                      c.id === constraint.id ? { ...c, value: e.target.value } : c
                                    ))
                                  }}
                                  className="w-24 bg-background/50 border-primary/20"
                                />
                                <Switch
                                  checked={constraint.enabled}
                                  onCheckedChange={(checked) => {
                                    setConstraints(constraints.map(c => 
                                      c.id === constraint.id ? { ...c, enabled: checked } : c
                                    ))
                                  }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Optimization Engine</h4>

                <Card className="border-primary/20 bg-background/30">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center">
                          <Brain className="h-16 w-16 text-primary" />
                        </div>
                        <div>
                          <h5 className="text-xl font-semibold text-foreground">AI Optimization Engine</h5>
                          <p className="text-muted-foreground">
                            {isOptimizing ? 'Analyzing trade scenarios...' : 
                             optimizationComplete ? 'Optimization complete!' : 
                             'Ready to optimize your trade plan'}
                          </p>
                        </div>
                      </div>

                      {(isOptimizing || optimizationComplete) && (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">{optimizationProgress}%</span>
                          </div>
                          <Progress value={optimizationProgress} className="h-2" />
                          
                          {optimizationProgress > 20 && (
                            <div className="text-sm text-muted-foreground">
                              {optimizationProgress < 40 ? 'Analyzing market data...' :
                               optimizationProgress < 70 ? 'Running optimization algorithms...' :
                               optimizationProgress < 90 ? 'Generating scenarios...' :
                               'Finalizing recommendations...'}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex justify-center space-x-3">
                        {!isOptimizing && !optimizationComplete && (
                          <Button onClick={handleStartOptimization} className="bg-primary hover:bg-primary/90">
                            <Play className="w-4 h-4 mr-2" />
                            Start Optimization
                          </Button>
                        )}
                        
                        {isOptimizing && (
                          <>
                            <Button onClick={handlePauseOptimization} variant="outline" className="border-primary/20">
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </Button>
                            <Button onClick={handleResetOptimization} variant="outline" className="border-primary/20">
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Reset
                            </Button>
                          </>
                        )}

                        {optimizationComplete && (
                          <Button onClick={handleResetOptimization} variant="outline" className="border-primary/20">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Run Again
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {optimizationComplete && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Optimization completed successfully</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Generated {scenarios.length} optimized scenarios based on your objectives and constraints.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {optimizationComplete ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-foreground">Optimization Results</h4>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="border-primary/20">
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scenarios.map(scenario => (
                      <Card
                        key={scenario.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          currentScenario === scenario.id
                            ? 'border-primary bg-primary/10'
                            : 'border-primary/20 bg-background/30 hover:border-primary/40'
                        }`}
                        onClick={() => setCurrentScenario(scenario.id)}
                      >
                        <CardContent className="p-4 space-y-4">
                          <div>
                            <h5 className="font-semibold text-foreground">{scenario.name}</h5>
                            <p className="text-sm text-muted-foreground">{scenario.description}</p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Projected ROI</span>
                              <span className="text-sm font-medium text-green-400">{scenario.projectedROI}%</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Risk Score</span>
                              <span className={`text-sm font-medium ${getRiskColor(scenario.riskScore)}`}>
                                {scenario.riskScore}/100
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Confidence</span>
                              <span className={`text-sm font-medium ${getConfidenceColor(scenario.confidence)}`}>
                                {scenario.confidence}%
                              </span>
                            </div>
                          </div>

                          {currentScenario === scenario.id && (
                            <Badge className="w-full justify-center bg-primary text-primary-foreground">
                              Selected
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Selected Scenario Details */}
                  {currentScenario && (
                    <Card className="border-primary/20 bg-background/30">
                      <CardHeader>
                        <CardTitle className="text-foreground">
                          {scenarios.find(s => s.id === currentScenario)?.name} - Detailed Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          {scenarios.find(s => s.id === currentScenario)?.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                              <Info className="h-5 w-5 text-primary mt-0.5" />
                              <p className="text-sm text-foreground">{rec}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex space-x-3 mt-6">
                          <Button className="bg-primary hover:bg-primary/90">
                            Implement Scenario
                          </Button>
                          <Button variant="outline" className="border-primary/20">
                            Compare Scenarios
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <Brain className="h-16 w-16 text-muted-foreground/50 mx-auto" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">No Results Yet</h4>
                    <p className="text-muted-foreground">
                      Run the optimization to see AI-generated trade plan scenarios
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
