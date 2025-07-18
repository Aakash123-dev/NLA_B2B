'use client';

import { Brain, ThumbsUp, ThumbsDown, Copy, Share2 } from 'lucide-react';
import { Avatar } from '@/components/ui';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex ${role === 'assistant' ? 'flex-row' : 'flex-row-reverse'} gap-4 max-w-[85%] group`}>
        <Avatar className={`h-9 w-9 shadow-sm flex items-center justify-center ${
          role === 'assistant' 
            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 ring-2 ring-indigo-100' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600'
        }`}>
          {role === 'assistant' ? (
            <div className="flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
          ) : (
            <span className="text-sm text-white font-medium">You</span>
          )}
        </Avatar>
        
        <div className="max-w-full">
          <div className={`rounded-2xl px-4 py-3 ${
            role === 'assistant' 
              ? 'bg-white border border-slate-200 text-slate-700 shadow-sm' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
          }`}>
            <div className="whitespace-pre-wrap text-sm leading-relaxed overflow-auto max-h-[400px]">
              {content}
            </div>
            <div className={`text-xs mt-2 ${role === 'assistant' ? 'text-slate-400' : 'text-blue-200'}`}>
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          {/* Action buttons for AI responses */}
          {role === 'assistant' && (
            <div className="mt-1.5 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <ThumbsDown className="h-4 w-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <Copy className="h-4 w-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
