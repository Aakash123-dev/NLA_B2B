'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import ToolPaletteItem from './ToolPaletteItem'
import { Tool } from './types'

interface ToolPaletteProps {
  tools: { [key: string]: Tool[] }
}

export default function ToolPalette({ tools }: ToolPaletteProps) {
  return (
    <aside className="tool-palette animate-slide-in-left">
      <div className="tool-palette-header">
        <h2 className="tool-palette-title">Design Studio</h2>
      </div>
      
      <ScrollArea className="flex-1 pr-3">
        <Accordion type="multiple" defaultValue={Object.keys(tools)} className="w-full">
          {Object.entries(tools).map(([category, toolList]) => (
            <AccordionItem key={category} value={category} className="accordion-category">
              <AccordionTrigger className="accordion-trigger">
                {category}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                {toolList.map((tool) => (
                  <ToolPaletteItem key={tool.type} tool={tool} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  )
}
