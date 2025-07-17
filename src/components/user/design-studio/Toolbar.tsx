'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ChevronLeft, Undo, Redo, Save, Play, 
  Download, Settings 
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ToolbarProps {
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

export default function Toolbar({ undo, redo, canUndo, canRedo }: ToolbarProps) {
  return (
    <header className="toolbar">
      <div className="flex-1 flex items-center pl-3 gap-2">
        <Link href="/user/projects">
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 rounded-md flex items-center gap-1 px-4 shadow-sm hover:shadow transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="font-medium">Back to Projects</span>
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={undo} 
                disabled={!canUndo}
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                <Undo className="mr-2 h-4 w-4" />Undo
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo last action</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={redo} 
                disabled={!canRedo}
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                <Redo className="mr-2 h-4 w-4" />Redo
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo last action</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="h-5 w-px bg-slate-200 mx-1"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 text-slate-700 hover:bg-slate-50 button-hover-glow"
              >
                <Save className="mr-2 h-4 w-4" />Save
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save workflow</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 text-slate-700 hover:bg-slate-50 button-hover-glow"
              >
                <Play className="mr-2 h-4 w-4" />Run
              </Button>
            </TooltipTrigger>
            <TooltipContent>Run workflow</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-300 text-slate-700 hover:bg-slate-50 button-hover-glow"
              >
                <Download className="mr-2 h-4 w-4" />Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export workflow</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="h-5 w-px bg-slate-200 mx-1"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Workspace settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}
