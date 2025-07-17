'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tool } from './types'

export default function ToolPaletteItem({ tool }: { tool: Tool }) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('toolType', tool.type)
    e.dataTransfer.setData('toolName', tool.name)
    // Add visual feedback
    e.currentTarget.classList.add('opacity-50')
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // Remove visual feedback
    e.currentTarget.classList.remove('opacity-50')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="tool-item border border-slate-200 hover:border-blue-300"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
                <tool.icon className="tool-icon" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate">{tool.name}</p>
                <p className="text-slate-500 text-xs line-clamp-1">{tool.description}</p>
              </div>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="font-medium">{tool.name}</p>
          <p className="text-xs text-slate-500">{tool.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
