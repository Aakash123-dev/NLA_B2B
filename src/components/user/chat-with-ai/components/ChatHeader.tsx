'use client';

import Link from 'next/link';
import { 
  ArrowLeft, 
  Brain, 
  Plus, 
} from 'lucide-react';
import { 
  Button,
} from '@/components/ui';

interface ChatHeaderProps {
  onNewChat: () => void;
  onClearHistory: () => void;
}

export default function ChatHeader({ onNewChat, onClearHistory }: ChatHeaderProps) {
  return (
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="w-full px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/user/projects"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Projects</span>
            </Link>
            <div className="w-px h-6 bg-slate-300" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Gazelle AI</h1>
                <p className="text-sm text-slate-600">Your intelligent retail analytics assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-100"
              onClick={onNewChat}
            >
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
