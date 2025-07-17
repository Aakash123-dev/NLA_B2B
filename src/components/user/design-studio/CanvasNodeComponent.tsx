'use client'

import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreVertical, Settings, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CanvasNode, Handle } from './types'

interface CanvasNodeComponentProps {
  node: CanvasNode
  onNodeMouseDown: (nodeId: string, e: React.MouseEvent) => void
  onConnectorMouseDown: (nodeId: string, handle: Handle, e: React.MouseEvent) => void
  onNodeMouseUp: (nodeId: string, e: React.MouseEvent) => void
  onNodeDoubleClick: (node: CanvasNode) => void
  onNodeDelete: (node: CanvasNode) => void
}

export default function CanvasNodeComponent({
  node,
  onNodeMouseDown,
  onConnectorMouseDown,
  onNodeMouseUp,
  onNodeDoubleClick,
  onNodeDelete,
}: CanvasNodeComponentProps) {
  return (
    <Card
      style={{ left: `${node.x}px`, top: `${node.y}px` }}
      className="group canvas-node h-[72px] w-48"
      onMouseDown={(e) => onNodeMouseDown(node.id, e)}
      onMouseUp={(e) => onNodeMouseUp(node.id, e)}
      onDoubleClick={() => onNodeDoubleClick(node)}
    >
      <CardHeader className="flex h-full flex-row items-center gap-3 space-y-0 p-3">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50">
          <node.icon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex flex-col justify-center">
          <CardTitle className="leading-tight text-base text-slate-800">{node.name}</CardTitle>
          {node.version > 0 && (
            <div className="flex items-center">
              <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full">v{node.version}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <TooltipProvider>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-600 hover:bg-slate-100 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Options</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            align="end"
            className="bg-white border border-slate-200 shadow-lg"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <DropdownMenuItem onSelect={() => onNodeDoubleClick(node)}>
              <Settings className="mr-2 h-4 w-4 text-slate-500" /> Configure
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
              onSelect={() => onNodeDelete(node)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>

      {/* Connectors */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onMouseDown={(e) => { e.stopPropagation(); onConnectorMouseDown(node.id, 'top', e) }}
            className="node-connector node-connector-top"
          />
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={5}>
          <p>Connect from top</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onMouseDown={(e) => { e.stopPropagation(); onConnectorMouseDown(node.id, 'right', e) }}
            className="node-connector node-connector-right"
          />
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          <p>Connect from right</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onMouseDown={(e) => { e.stopPropagation(); onConnectorMouseDown(node.id, 'bottom', e) }}
            className="node-connector node-connector-bottom"
          />
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={5}>
          <p>Connect from bottom</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onMouseDown={(e) => { e.stopPropagation(); onConnectorMouseDown(node.id, 'left', e) }}
            className="node-connector node-connector-left"
          />
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={5}>
          <p>Connect from left</p>
        </TooltipContent>
      </Tooltip>
    </Card>
  )
}
