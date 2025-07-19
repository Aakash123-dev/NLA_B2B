'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Link as LinkIcon } from 'lucide-react'
import { ConfigStepProps } from '../types'
import { getSelectedNames, getAllSelectedNames, getDisplayValue, formatCurrency } from '../utils'
import { databases, retailers, brands, products, availableColumns } from '../constants'

interface ResultsStepProps extends ConfigStepProps {
  connectedNodes?: any[]
  onOpenNodeTab?: (nodeId: string) => void
  onRestart: () => void
  onBackToSummary: () => void
}

export function ResultsStep({ 
  formData, 
  connectedNodes = [], 
  onOpenNodeTab,
  onRestart,
  onBackToSummary 
}: ResultsStepProps) {
  return (
    <div className="space-y-8 text-sm">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Connected Tools</h4>
        {connectedNodes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {connectedNodes.map(connectedNode => (
              <Button
                key={connectedNode.id}
                variant="outline"
                className="justify-start"
                onClick={() => onOpenNodeTab?.(connectedNode.id)}
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                {connectedNode.name} {connectedNode.version && `v${connectedNode.version}`}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No tools are connected to this node.</p>
        )}
      </div>

      <Separator className="bg-primary/20" />

      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-foreground">Final Summary</h4>
        
        <div>
          <h5 className="mb-2 text-base font-medium text-accent">Data & Scope</h5>
          <div className="space-y-2 rounded-lg border border-primary/20 bg-background/30 p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Database:</span>
              <span className="text-right font-medium text-foreground">
                {databases.find(db => db.id === formData.selectedDatabase)?.name || 'None selected'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retailers:</span>
              <span className="text-right font-medium text-foreground">
                {getSelectedNames(formData.selectedRetailers, retailers)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Brands:</span>
              <span className="text-right font-medium text-foreground">
                {getSelectedNames(formData.selectedBrands, brands)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Products:</span>
              <span className="text-right font-medium text-foreground">
                {getSelectedNames(formData.selectedProducts, products)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-base font-medium text-accent">Model Parameters</h5>
          <div className="space-y-2 rounded-lg border border-primary/20 bg-background/30 p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Share:</span>
              <span className="text-right font-medium text-foreground">
                {getDisplayValue(formData.marketShare, '%')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Minimum Revenue:</span>
              <span className="text-right font-medium text-foreground">
                {formatCurrency(formData.minRevenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weeks to Model:</span>
              <span className="text-right font-medium text-foreground">
                {getDisplayValue(formData.numWeeks)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-base font-medium text-accent">Selected Columns</h5>
          <div className="rounded-lg border border-primary/20 bg-background/30 p-4">
            <p className="font-medium text-foreground">
              {getAllSelectedNames(formData.selectedColumns, availableColumns)}
            </p>
          </div>
        </div>
      </div>
      
      <Separator className="bg-primary/20" />

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-foreground">Model Status</h4>
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle2 className="h-5 w-5" />
          <span>Completed</span>
        </div>
      </div>
    </div>
  )
}
