'use client';

import { Brain, Loader2 } from 'lucide-react';
import { Avatar } from '@/components/ui';

export default function ChatThinking() {
  return (
    <div className="flex justify-start">
      <div className="flex flex-row gap-4 max-w-[85%]">
        <Avatar className="h-9 w-9 bg-gradient-to-br from-purple-500 to-indigo-600 ring-2 ring-indigo-100 shadow-sm">
          <div className="flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
        </Avatar>
        
        <div className="rounded-2xl px-5 py-4 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse delay-150"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-indigo-400 animate-pulse delay-300"></div>
            </div>
            <span className="text-sm text-slate-600 font-medium">Gazelle AI is analyzing your data...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
