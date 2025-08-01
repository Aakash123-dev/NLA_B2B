'use client'

import React, { useState } from 'react'
import { 
  Brain,
  MessageSquare,
  Sparkles,
  Loader2,
  MessageCircle,
  Users,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface SimpleSmartInsightsDrawerProps {
  isSmartInsightsOpen: boolean
  setIsSmartInsightsOpen: (open: boolean) => void
}

export const SimpleSmartInsightsDrawer: React.FC<SimpleSmartInsightsDrawerProps> = ({
  isSmartInsightsOpen,
  setIsSmartInsightsOpen
}) => {
  const [textBotPrompt, setTextBotPrompt] = useState('')
  const [textBotResponse, setTextBotResponse] = useState('')
  const [isGeneratingTextBotResponse, setIsGeneratingTextBotResponse] = useState(false)

  const handleGenerateResponse = () => {
    if (textBotPrompt.trim() !== '') {
      setIsGeneratingTextBotResponse(true)
      setTimeout(() => {
        setTextBotResponse(`Based on your data analysis, I can see several opportunities for optimization. Consider adjusting your pricing strategy and promotional mix to maximize revenue while maintaining market share. Your current approach shows potential for improvement in key performance areas.`)
        setIsGeneratingTextBotResponse(false)
      }, 1500)
    }
  }

  return (
    <Sheet open={isSmartInsightsOpen} onOpenChange={setIsSmartInsightsOpen}>
      <SheetContent className="w-full sm:max-w-[38rem] overflow-y-auto" side="right">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSmartInsightsOpen(false)}
              className="absolute left-4 top-4 p-2 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div className="ml-8 flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              <span>Smart Insights</span>
            </div>
          </SheetTitle>
          <SheetDescription>
            AI-powered analysis of your data to help you make better decisions
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-cyan-600" />
                Ask AI Assistant
              </h3>
            </div>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-cyan-100 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div className="text-sm font-medium text-cyan-700">AI Insights Bot</div>
                </div>
                
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  {textBotResponse ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-slate-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-slate-600" />
                        </div>
                        <div className="bg-slate-100 rounded-lg p-3 text-sm max-w-[80%]">
                          {textBotPrompt}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-cyan-100 p-2 rounded-full">
                          <Brain className="h-4 w-4 text-cyan-600" />
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-3 text-sm max-w-[80%]">
                          {textBotResponse}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                      <p>Ask any question about your data or request specific insights</p>
                      <p className="text-xs mt-2">Example: "What are the top pricing opportunities for BLACK RIFLE JUST BLACK?"</p>
                    </div>
                  )}
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Ask anything about your data..."
                    value={textBotPrompt}
                    onChange={(e) => setTextBotPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGenerateResponse()
                      }
                    }}
                  />
                  <Button 
                    disabled={textBotPrompt.trim() === '' || isGeneratingTextBotResponse}
                    onClick={handleGenerateResponse}
                  >
                    {isGeneratingTextBotResponse ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-xs text-slate-500 text-center">
              You can ask specific questions about pricing, promotions, market trends, or request recommendations.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
