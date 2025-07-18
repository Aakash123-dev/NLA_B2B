'use client';

import { useState } from 'react';
import { Send, Loader2, Sparkles, Mic, Image, PlusCircle } from 'lucide-react';
import { Button, Textarea } from '@/components/ui';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    onSendMessage(input);
    setInput('');
  };
  
  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col">
        <Textarea 
          placeholder="Ask about pricing optimization, market trends, competitive analysis..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[80px] text-slate-700 placeholder:text-slate-400 bg-white"
        />
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <PlusCircle className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Image className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Mic className="h-5 w-5" />
            </button>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
            disabled={input.trim() === '' || isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
